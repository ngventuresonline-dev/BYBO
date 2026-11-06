import { crmConfigured, rpc, type CrmLead } from './db';

/**
 * What the lead desk shows beyond the leads themselves: which systems are
 * connected, what runs on its own, the AI call queue and the Instagram queue.
 * Only booleans leave this file for env vars; no secret value is ever sent.
 */

const has = (...keys: string[]) => keys.every((k) => Boolean(process.env[k]?.trim()));
const any = (...keys: string[]) => keys.some((k) => Boolean(process.env[k]?.trim()));

export type Health = { id: string; label: string; ok: boolean; detail: string };

export function systemHealth(): Health[] {
  const callsOn = process.env.INSTANT_CALL_ENABLED === 'true';
  const callsDry = process.env.INSTANT_CALL_DRY_RUN === 'true';
  const igDry = process.env.IG_POST_DRY_RUN === 'true';
  return [
    { id: 'crm', label: 'Lead database', ok: crmConfigured(), detail: crmConfigured() ? 'Supabase · bybo schema' : 'Add BYBO_CRM_SUPABASE_URL and BYBO_CRM_SUPABASE_KEY' },
    { id: 'b', label: 'B, the AI closer', ok: has('ANTHROPIC_API_KEY'), detail: has('ANTHROPIC_API_KEY') ? 'Answering website chats' : 'ANTHROPIC_API_KEY missing; B falls back to guided replies' },
    { id: 'email', label: 'Email (Resend)', ok: has('RESEND_API_KEY'), detail: has('RESEND_API_KEY') ? 'Enquiry, booking, receipt and desk emails' : 'RESEND_API_KEY missing; no email goes out' },
    { id: 'pay', label: 'Payments (PhonePe)', ok: has('PHONEPE_CLIENT_ID', 'PHONEPE_CLIENT_SECRET', 'PAYMENTS_LINK_SECRET'), detail: has('PHONEPE_CLIENT_ID', 'PHONEPE_CLIENT_SECRET') ? (process.env.PHONEPE_SANDBOX === 'true' ? 'Sandbox mode' : 'Live checkout on /pay') : 'Add PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET' },
    { id: 'meta', label: 'Meta lead forms', ok: any('META_PAGE_ACCESS_TOKEN', 'IG_ACCESS_TOKEN') && has('FB_PAGE_ID'), detail: has('FB_PAGE_ID') ? 'Pulled every 5 minutes' : 'FB_PAGE_ID or page token missing' },
    { id: 'store', label: 'Call queue store', ok: any('BLOB_READ_WRITE_TOKEN', 'BLOB_STORE_ID'), detail: any('BLOB_READ_WRITE_TOKEN', 'BLOB_STORE_ID') ? 'Vercel Blob' : 'Blob store not connected' },
    { id: 'calls', label: 'Instant AI calls (ElevenLabs)', ok: callsOn && !callsDry && has('BYBO_ELEVENLABS_API_KEY', 'BYBO_ELEVENLABS_AGENT_ID', 'BYBO_ELEVENLABS_PHONE_NUMBER_ID'),
      detail: !has('BYBO_ELEVENLABS_API_KEY') ? 'ElevenLabs not configured' : !callsOn ? 'Switched off (INSTANT_CALL_ENABLED)' : callsDry ? 'Dry run: logs “would dial”, no real calls' : `Live · ${process.env.CALL_HOURS_START || '10:00'}–${process.env.CALL_HOURS_END || '19:30'} IST, Mon–Sat${process.env.INSTANT_CALL_ALLOWLIST ? ' · allowlist on' : ''}` },
    { id: 'vobiz', label: 'Desk calls (Vobiz)', ok: has('BYBO_VOBIZ_AUTH_ID', 'BYBO_VOBIZ_AUTH_TOKEN', 'BYBO_VOBIZ_NUMBER', 'BYBO_VOBIZ_AGENT_PHONE'),
      detail: has('BYBO_VOBIZ_AUTH_ID', 'BYBO_VOBIZ_AUTH_TOKEN', 'BYBO_VOBIZ_NUMBER', 'BYBO_VOBIZ_AGENT_PHONE') ? 'Call rings your phone, then the lead sees BYBO’s number' : 'Add BYBO_VOBIZ_AUTH_ID, BYBO_VOBIZ_AUTH_TOKEN, BYBO_VOBIZ_NUMBER and BYBO_VOBIZ_AGENT_PHONE' },
    { id: 'ig', label: 'Instagram posting', ok: has('IG_ACCESS_TOKEN', 'IG_USER_ID') && !igDry, detail: !has('IG_ACCESS_TOKEN', 'IG_USER_ID') ? 'IG_ACCESS_TOKEN or IG_USER_ID missing' : igDry ? 'Dry run: nothing reaches Instagram' : 'Approved posts publish on schedule' },
    { id: 'cron', label: 'Scheduled jobs', ok: has('CRON_SECRET'), detail: has('CRON_SECRET') ? 'Vercel cron authorised' : 'CRON_SECRET missing; jobs are refused' },
    { id: 'whatsapp', label: 'WhatsApp API (Kapso)', ok: false, detail: 'Not connected yet: Meta blocked the new number (error 2388386)' },
  ];
}

export type Automation = { id: string; title: string; trigger: string; does: string; on: boolean; status: string; run?: 'sync' | 'digest' | 'meta_pull' | 'autopilot' };

export function automations(health = systemHealth()): Automation[] {
  const ok = (id: string) => health.find((h) => h.id === id)?.ok ?? false;
  const detail = (id: string) => health.find((h) => h.id === id)?.detail ?? '';
  return [
    { id: 'capture', title: 'Every lead lands here', trigger: 'Form, B chat, Meta form, AI call, booking, payment', does: 'Creates or merges the lead by email, phone or form id and logs the activity', on: ok('crm'), status: detail('crm') },
    { id: 'autopilot', title: 'Lead autopilot', trigger: 'Every 10 minutes, for each new lead', does: 'Researches the lead on the web, scores it, holds likely fakes for review, drafts a personalised demo, emails you to approve, then emails the client', on: ok('crm') && ok('b'), status: ok('b') ? 'Uses Claude with web search; nothing reaches a client without your approval' : 'Needs ANTHROPIC_API_KEY', run: 'autopilot' },
    { id: 'b', title: 'B answers and closes', trigger: 'Visitor opens the chat on bybo.in', does: 'Qualifies, writes a brief, books a 30-minute call, alerts the team on hot leads', on: ok('b'), status: detail('b') },
    { id: 'meta', title: 'Meta lead forms pulled', trigger: 'Every 5 minutes', does: 'Fetches new Instagram/Facebook form leads, emails each one and reports to the team', on: ok('meta'), status: detail('meta'), run: 'meta_pull' },
    { id: 'calls', title: 'Instant AI call', trigger: 'New lead with a phone number and consent', does: 'BYBO Voice calls within minutes in calling hours, retries once, emails the summary', on: ok('calls'), status: detail('calls') },
    { id: 'receipts', title: 'Receipts on payment', trigger: 'PhonePe confirms a payment', does: 'Emails the client and the team a receipt, marks the lead Won with the amount', on: ok('pay') && ok('email'), status: ok('pay') ? 'Ready' : detail('pay') },
    { id: 'ig', title: 'Instagram scheduler', trigger: 'Every 10 minutes', does: 'Publishes approved @byboindia posts at their scheduled time', on: ok('ig'), status: detail('ig') },
    { id: 'digest', title: 'Morning lead digest', trigger: 'Mon–Sat, 9:00 IST', does: 'Emails the team new leads, overdue follow-ups and today’s calls', on: ok('crm') && ok('email') && ok('cron'), status: ok('email') ? 'Emails byboonline@gmail.com and support@bybo.in' : 'Needs email', run: 'digest' },
    { id: 'sync', title: 'Call-queue sync', trigger: 'On demand', does: 'Copies every lead already in the call queue (website and Meta) into this desk', on: ok('crm') && ok('store'), status: ok('store') ? 'Safe to run any time; never duplicates' : detail('store'), run: 'sync' },
  ];
}

export type QueueItem = {
  id: string; name: string; phone: string | null; email: string; business: string; source: string;
  status: string; attempts: number; next_call_at: string | null; last_call_at: string | null; summary: string | null; created_at: string;
};

export async function callQueue(): Promise<QueueItem[] | null> {
  try {
    const { getLeadStore } = await import('@/lib/instant-call/store');
    const store = await getLeadStore();
    const leads = await store.listActionable();
    return leads.map((l) => ({
      id: l.id, name: l.name, phone: l.phone_e164, email: l.email, business: l.business, source: l.source,
      status: l.call_status, attempts: l.call_attempts, next_call_at: l.next_call_at, last_call_at: l.last_call_at,
      summary: l.call_summary, created_at: l.created_at,
    })).sort((a, b) => (a.next_call_at ?? a.created_at).localeCompare(b.next_call_at ?? b.created_at));
  } catch {
    return null;
  }
}

export type IgSummary = { counts: Record<string, number>; next: { caption: string; scheduledAt: string | null; status: string }[]; recent: { caption: string; publishedAt: string | null; permalink: string | null }[] };

export async function instagramSummary(): Promise<IgSummary | null> {
  try {
    const { getPostStore } = await import('@/lib/instagram/store');
    const posts = await (await getPostStore()).list();
    const counts: Record<string, number> = {};
    for (const p of posts) counts[p.status] = (counts[p.status] ?? 0) + 1;
    const cap = (c: string) => c.replace(/\s+/g, ' ').slice(0, 140);
    return {
      counts,
      next: posts.filter((p) => ['draft', 'approved', 'scheduled', 'publishing', 'failed'].includes(p.status))
        .sort((a, b) => (a.scheduledAt ?? a.createdAt).localeCompare(b.scheduledAt ?? b.createdAt)).slice(0, 8)
        .map((p) => ({ caption: cap(p.caption), scheduledAt: p.scheduledAt, status: p.status })),
      recent: posts.filter((p) => p.status === 'published').sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')).slice(0, 6)
        .map((p) => ({ caption: cap(p.caption), publishedAt: p.publishedAt, permalink: p.permalink })),
    };
  } catch {
    return null;
  }
}

/** Copy every call-queue lead into the CRM. Idempotent: each has a stable key. */
export async function syncCallQueue(): Promise<{ synced: number } | { error: string }> {
  const { getLeadStore } = await import('@/lib/instant-call/store');
  const { recordInCrm } = await import('@/lib/instant-call/flow');
  const store = await getLeadStore();
  if (!store.listAll) return { error: 'store_unavailable' };
  try {
    const leads = await store.listAll();
    for (const lead of leads) await recordInCrm(lead);
    return { synced: leads.length };
  } catch {
    return { error: 'store_unavailable' };
  }
}

type FeedRow = { id: string; lead_id: string; created_at: string; kind: string; title: string; body: string | null; meta: Record<string, unknown>; lead_name: string | null; lead_email: string | null; lead_company: string | null };

/** The morning digest: new leads, overdue follow-ups, calls today. Returns false if nothing was sent. */
export async function sendDigest(now = new Date()): Promise<{ sent: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: 'email_not_configured' };
  const [leads, bookings] = await Promise.all([
    rpc<CrmLead[]>('bybo_crm_list', {}),
    rpc<FeedRow[]>('bybo_crm_feed', { p_limit: 200, p_kinds: ['booking'] }),
  ]);
  const t = now.getTime();
  const fresh = leads.filter((l) => t - Date.parse(l.created_at) < 86_400_000);
  const due = leads.filter((l) => l.stage !== 'won' && l.stage !== 'lost' && l.next_follow_up && Date.parse(l.next_follow_up) <= t + 12 * 3_600_000);
  const today = bookings.filter((b) => { const s = Date.parse(String(b.meta?.slot ?? '')); return s >= t && s < t + 86_400_000; });
  if (!fresh.length && !due.length && !today.length) return { sent: false, reason: 'nothing_to_report' };

  const { brandedEmail, brandedEmailText } = await import('@/lib/email-layout');
  const { teamRecipients } = await import('@/lib/enquiry-ack');
  const { CONTACT } = await import('@/lib/site');
  const who = (l: { name: string | null; company: string | null; email: string | null }) => [l.name, l.company].filter(Boolean).join(', ') || l.email || 'Unnamed lead';
  const lines = [
    fresh.length ? `New in the last 24 hours (${fresh.length}): ${fresh.map((l) => `${who(l)}${l.need ? `, ${l.need}` : ''}`).join('; ')}.` : '',
    due.length ? `Follow up now (${due.length}): ${due.map((l) => who(l)).join('; ')}.` : '',
    today.length ? `Calls in the next 24 hours (${today.length}): ${today.map((b) => `${b.title.replace('Discovery call booked · ', '')} with ${who({ name: b.lead_name, company: b.lead_company, email: b.lead_email })}`).join('; ')}.` : '',
  ].filter(Boolean);
  const subject = `BYBO leads: ${fresh.length} new, ${due.length} to follow up, ${today.length} calls today`;
  const cta = { href: 'https://bybo.in/admin/crm', label: 'Open the lead desk' };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': `crm-digest/${now.toISOString().slice(0, 10)}` },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`,
      to: teamRecipients(),
      subject,
      html: brandedEmail({ title: subject, eyebrow: 'Morning digest', headline: 'Your leads today', intro: lines, cta }),
      text: brandedEmailText({ headline: 'Your leads today', paragraphs: lines, cta }),
    }),
  }).catch(() => null);
  if (!res?.ok) return { sent: false, reason: 'send_failed' };
  return { sent: true };
}
