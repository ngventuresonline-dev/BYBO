import { allowlistAllows } from './allowlist';
import { placeOutboundCall } from './dial';
import { isWithinCallingHours, nextRetryStart, nextWindowStart } from './hours';
import { sendCallSummary } from './mail';
import { maskPhone } from './mask';
import { metaLeadSource, type MappedMetaLead } from './meta';
import { getLeadStore, LeadStoreUnavailable, type LeadStore } from './store';
import { normalizePhone } from './phone';
import { leadBrief, newLead, type CallStatus, type CallUpdate, type Lead } from './types';
import { matchedArea } from './webhook';

export type Flags = {
  enabled: boolean;
  dryRun: boolean;
  allowlistRaw: string | undefined;
  hoursStart: string;
  hoursEnd: string;
};

export type Decision = {
  action: 'store' | 'dial' | 'dry_run';
  call_status: CallStatus;
  next_call_at: string | null;
  reason: string;
  dry_run_hold: boolean;
};

export function loadFlags(env: NodeJS.ProcessEnv = process.env): Flags {
  return {
    enabled: env.INSTANT_CALL_ENABLED === 'true',
    dryRun: env.INSTANT_CALL_DRY_RUN === 'true',
    allowlistRaw: Object.prototype.hasOwnProperty.call(env, 'INSTANT_CALL_ALLOWLIST') ? env.INSTANT_CALL_ALLOWLIST : undefined,
    hoursStart: env.CALL_HOURS_START?.trim() || '10:00',
    hoursEnd: env.CALL_HOURS_END?.trim() || '19:30',
  };
}

export function decide(input: { phone: string | null; consent: boolean; flags: Flags; now: Date }): Decision {
  const { phone, consent, flags, now } = input;
  if (!flags.enabled) return { action: 'store', call_status: 'pending', next_call_at: null, reason: 'switch_off', dry_run_hold: false };
  if (!consent) return { action: 'store', call_status: 'pending', next_call_at: null, reason: 'no_consent', dry_run_hold: false };
  if (!phone) return { action: 'store', call_status: 'pending', next_call_at: null, reason: 'invalid_phone', dry_run_hold: false };
  if (!allowlistAllows(flags.allowlistRaw, phone)) {
    return { action: 'store', call_status: 'skipped_allowlist', next_call_at: null, reason: 'allowlist', dry_run_hold: false };
  }
  const inside = isWithinCallingHours(now, flags.hoursStart, flags.hoursEnd);
  if (!inside) {
    const next = nextWindowStart(now, flags.hoursStart, flags.hoursEnd).toISOString();
    if (flags.dryRun) return { action: 'dry_run', call_status: 'queued_hours', next_call_at: next, reason: 'outside_hours', dry_run_hold: true };
    return { action: 'store', call_status: 'queued_hours', next_call_at: next, reason: 'outside_hours', dry_run_hold: false };
  }
  if (flags.dryRun) return { action: 'dry_run', call_status: 'pending', next_call_at: null, reason: 'dry_run', dry_run_hold: true };
  return { action: 'dial', call_status: 'pending', next_call_at: null, reason: 'ready', dry_run_hold: false };
}

export type FlowDeps = {
  store: LeadStore;
  now: Date;
  dial: (lead: Lead) => Promise<string>;
  poll?: (conversationId: string) => Promise<CallUpdate>;
  sendSummary?: (lead: Lead) => Promise<boolean>;
  log?: (message: string, fields?: { leadId?: string; phone?: string | null }) => void;
};

function logDefault(message: string, fields?: { leadId?: string; phone?: string | null }) {
  console.info(message, { leadId: fields?.leadId ?? '', phone: maskPhone(fields?.phone) });
}

export async function captureLead(draft: Lead, consent: boolean, deps: FlowDeps): Promise<{ lead: Lead; action: string }> {
  const flags = loadFlags();
  const phone = normalizePhone(draft.phone_e164);
  const decision = decide({ phone, consent, flags, now: deps.now });
  const lead = newLead({
    ...draft,
    id: draft.id,
    created_at: deps.now.toISOString(),
    phone_e164: phone,
    call_status: decision.call_status,
    next_call_at: decision.next_call_at,
    raw: {
      ...draft.raw,
      consent,
      decision: decision.reason,
      lead_brief: typeof draft.raw.lead_brief === 'string' ? draft.raw.lead_brief : leadBrief(draft),
      ...(decision.dry_run_hold ? { dry_run_hold: true } : {}),
    },
  });
  const log = deps.log ?? logDefault;

  let stored: { lead: Lead; created: boolean };
  try {
    stored = await deps.store.insert(lead, deps.now);
  } catch (err) {
    if (err instanceof LeadStoreUnavailable) {
      log('lead store is not configured');
      return { lead, action: 'unconfigured' };
    }
    log('lead insert failed', { leadId: lead.id, phone: lead.phone_e164 });
    return { lead, action: 'insert_failed' };
  }
  if (!stored.created) return { lead: stored.lead, action: 'duplicate' };

  if (decision.action === 'dry_run') {
    log('would dial', { leadId: stored.lead.id, phone: stored.lead.phone_e164 });
    return { lead: stored.lead, action: 'dry_run' };
  }
  if (decision.action !== 'dial') return { lead: stored.lead, action: decision.reason };

  if (process.env.INSTANT_CALL_ENABLED !== 'true') return { lead: stored.lead, action: 'switch_off' };
  if (process.env.INSTANT_CALL_DRY_RUN === 'true') {
    log('would dial', { leadId: stored.lead.id, phone: stored.lead.phone_e164 });
    return { lead: stored.lead, action: 'dry_run' };
  }

  return dialClaimed(stored.lead, deps, { requireDue: false });
}

async function dialClaimed(lead: Lead, deps: FlowDeps, opts: { requireDue: boolean }): Promise<{ lead: Lead; action: string }> {
  const log = deps.log ?? logDefault;
  if (process.env.INSTANT_CALL_ENABLED !== 'true' || process.env.INSTANT_CALL_DRY_RUN === 'true') {
    return { lead, action: 'blocked' };
  }
  const claimed = await deps.store.claimForCall(lead.id, deps.now, opts);
  if (!claimed) return { lead, action: 'not_claimed' };
  try {
    const conversationId = await deps.dial(claimed);
    const updated: Lead = { ...claimed, raw: { ...claimed.raw }, conversation_id: conversationId };
    await deps.store.save(updated);
    return { lead: updated, action: 'dialed' };
  } catch {
    log('outbound call failed', { leadId: claimed.id, phone: claimed.phone_e164 });
    const finished = await applyCallUpdate(claimed, { outcome: 'failed' }, deps);
    return { lead: finished, action: 'failed' };
  }
}

export async function applyCallUpdate(lead: Lead, update: CallUpdate, deps: FlowDeps): Promise<Lead> {
  const flags = loadFlags();
  const log = deps.log ?? logDefault;
  let next: Lead = {
    ...lead,
    raw: { ...lead.raw },
    conversation_id: update.conversationId || lead.conversation_id,
  };
  if (update.outcome === 'in_progress') {
    await deps.store.save(next);
    return next;
  }

  if (update.analysis !== undefined) next.call_analysis = update.analysis;
  if (update.summary) next.call_summary = update.summary;
  const area = matchedArea(update.analysis);
  if (area) next.area = area;

  const alreadyTerminal = lead.call_status === 'done' || lead.call_status === 'whatsapp_only';
  if (!alreadyTerminal) {
    if (update.outcome === 'answered') {
      next.call_status = update.summary || update.analysis ? 'done' : 'answered';
      next.next_call_at = null;
    } else if (next.call_attempts >= 2) {
      next.call_status = 'whatsapp_only';
      next.next_call_at = null;
    } else {
      next.call_status = update.outcome;
      next.next_call_at = nextRetryStart(deps.now, flags.hoursStart, flags.hoursEnd).toISOString();
    }
  }

  const terminal = next.call_status === 'done'
    || next.call_status === 'no_answer'
    || next.call_status === 'busy'
    || next.call_status === 'failed'
    || next.call_status === 'whatsapp_only';
  const emailed = Number(next.raw.emailed_attempt ?? 0);
  const shouldEmail = flags.enabled && terminal && emailed !== next.call_attempts && Boolean(deps.sendSummary);
  if (shouldEmail && deps.sendSummary) {
    const sent = await deps.sendSummary(next).catch(() => {
      log('summary email failed', { leadId: next.id });
      return false;
    });
    if (sent) next.raw = { ...next.raw, emailed_attempt: next.call_attempts };
  }
  await deps.store.save(next);
  return next;
}

export async function runCadence(deps: FlowDeps): Promise<{ dialed: number; polled: number }> {
  const flags = loadFlags();
  const log = deps.log ?? logDefault;
  const leads = await deps.store.listActionable();
  let dialed = 0;
  let polled = 0;

  for (const lead of leads) {
    if (lead.call_status === 'calling' || (lead.call_status === 'answered' && !lead.call_summary)) {
      if (lead.conversation_id && deps.poll) {
        try {
          const update = await deps.poll(lead.conversation_id);
          await applyCallUpdate({ ...lead, conversation_id: lead.conversation_id }, { ...update, conversationId: lead.conversation_id }, deps);
          polled += 1;
        } catch {
          log('conversation poll failed', { leadId: lead.id });
        }
      } else if (
        lead.call_status === 'calling'
        && lead.last_call_at
        && deps.now.getTime() - Date.parse(lead.last_call_at) > 2 * 60 * 60_000
      ) {
        await applyCallUpdate(lead, { outcome: 'failed' }, deps);
      }
      continue;
    }

    if (lead.next_call_at && Date.parse(lead.next_call_at) > deps.now.getTime()) continue;
    if (!flags.enabled) continue;
    if (!isWithinCallingHours(deps.now, flags.hoursStart, flags.hoursEnd)) continue;
    if (flags.dryRun || lead.raw.dry_run_hold === true) {
      log('would dial', { leadId: lead.id, phone: lead.phone_e164 });
      continue;
    }
    if (!lead.phone_e164 || !allowlistAllows(flags.allowlistRaw, lead.phone_e164)) {
      await deps.store.save({ ...lead, raw: { ...lead.raw }, call_status: 'skipped_allowlist', next_call_at: null });
      continue;
    }
    const result = await dialClaimed(lead, deps, { requireDue: true });
    if (result.action === 'dialed' || result.action === 'failed') dialed += 1;
  }
  return { dialed, polled };
}

export type WebsiteLeadInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  services: string[];
  industry: string;
  role: string;
  website: string;
  consent: boolean;
  interest?: string;
};

export async function captureWebsiteLead(input: WebsiteLeadInput, deps?: Partial<FlowDeps>): Promise<{ lead: Lead; action: string }> {
  const phone = normalizePhone(input.phone);
  const enquiry = [
    input.message,
    input.services.length ? `Interested in: ${input.services.join(', ')}` : '',
    input.interest ? `Interest: ${input.interest}` : '',
  ].filter(Boolean).join('\n');
  const draft = newLead({
    source: 'website',
    external_id: null,
    name: input.name,
    email: input.email,
    phone_e164: phone,
    business: input.company,
    enquiry,
    area: input.industry,
    raw: {
      consent: input.consent,
      lead_source: 'the bybo.in website form',
      services: input.services,
      role: input.role,
      website: input.website,
    },
  });
  draft.raw.lead_brief = leadBrief(draft);
  const full = await productionDeps(deps);
  return captureLead(draft, input.consent, full);
}

export async function captureMappedMetaLead(mapped: MappedMetaLead, deps?: Partial<FlowDeps>): Promise<{ lead: Lead; action: string }> {
  const phone = normalizePhone(mapped.phoneRaw);
  const sourceLabel = metaLeadSource(mapped.platform);
  const draft = newLead({
    source: 'meta',
    external_id: mapped.externalId,
    name: mapped.name,
    email: mapped.email,
    phone_e164: phone,
    business: mapped.business,
    enquiry: mapped.enquiry,
    area: '',
    raw: {
      ...mapped.raw,
      consent: true,
      consent_source: 'meta_lead_form',
      lead_source: sourceLabel,
    },
  });
  draft.raw.lead_brief = leadBrief(draft);
  const full = await productionDeps(deps);
  return captureLead(draft, true, full);
}

export async function importMetaLeads(
  rows: MappedMetaLead[],
  placeCalls: boolean,
  deps: FlowDeps,
): Promise<{ inserted: number; duplicates: number; skipped: number }> {
  let inserted = 0;
  let duplicates = 0;
  let skipped = 0;
  for (const row of rows) {
    if (!row.externalId) { skipped += 1; continue; }
    if (!placeCalls) {
      const lead = newLead({
        source: 'meta',
        external_id: row.externalId,
        name: row.name,
        email: row.email,
        phone_e164: normalizePhone(row.phoneRaw),
        business: row.business,
        enquiry: row.enquiry,
        area: '',
        created_at: deps.now.toISOString(),
        call_status: 'skipped_allowlist',
        raw: { ...row.raw, consent: true, imported: true, decision: 'imported', lead_source: metaLeadSource(row.platform) },
      });
      try {
        const result = await deps.store.insert(lead, deps.now);
        if (result.created) inserted += 1;
        else duplicates += 1;
      } catch (err) {
        if (err instanceof LeadStoreUnavailable) throw err;
        skipped += 1;
      }
      continue;
    }
    const result = await captureMappedMetaLead(row, deps);
    if (result.action === 'duplicate') duplicates += 1;
    else if (result.action === 'insert_failed' || result.action === 'unconfigured') skipped += 1;
    else inserted += 1;
  }
  return { inserted, duplicates, skipped };
}

async function productionDeps(partial?: Partial<FlowDeps>): Promise<FlowDeps> {
  return {
    store: partial?.store ?? await getLeadStore(),
    now: partial?.now ?? new Date(),
    dial: partial?.dial ?? ((lead) => placeOutboundCall(lead)),
    poll: partial?.poll,
    sendSummary: partial?.sendSummary ?? sendCallSummary,
    log: partial?.log,
  };
}

export async function pollElevenConversation(conversationId: string): Promise<CallUpdate> {
  if (process.env.NODE_TEST_CONTEXT) throw new Error('refusing elevenlabs during tests');
  const key = process.env.BYBO_ELEVENLABS_API_KEY;
  if (!key) throw new Error('elevenlabs not configured');
  const res = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${encodeURIComponent(conversationId)}`, {
    headers: { 'xi-api-key': key },
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`conversation fetch failed (${res.status})`);
  const { mapConversation } = await import('./webhook');
  return mapConversation(await res.json());
}
