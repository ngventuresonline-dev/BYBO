import { captureMappedMetaLead } from './flow';
import { notifyMetaLead } from './lead-notify';
import { graphLeadToMapped, LEAD_FIELDS } from './meta';
import { asRecord } from './webhook';

/**
 * Pulls recent leads from each form on the Page, so a lead still arrives when
 * the webhook is not subscribed. Both routes share the lead store and the
 * notification state, so a lead is only handled once.
 */

/** Nothing before this is pulled, so turning this on does not email old leads. */
export const POLL_FROM = '2026-11-02T00:00:00+05:30';
const LOOKBACK_MS = 48 * 3_600_000;

export function pollStart(now: Date): number {
  return Math.max(Date.parse(POLL_FROM), now.getTime() - LOOKBACK_MS);
}

type PollOptions = {
  token: string;
  /** More tokens to try, in order, when `token` cannot produce a Page token. */
  fallbackTokens?: string[];
  pageId: string;
  now: Date;
  fetchImpl?: typeof fetch;
};

export async function fetchRecentMetaLeads(opts: PollOptions): Promise<unknown[]> {
  const doFetch = opts.fetchImpl ?? globalThis.fetch;
  if (process.env.NODE_TEST_CONTEXT && !opts.fetchImpl) throw new Error('refusing graph during tests');
  const version = process.env.META_GRAPH_VERSION?.trim() || 'v21.0';

  const get = async (path: string, params: Record<string, string>, token: string) => {
    const url = new URL(`https://graph.facebook.com/${version}/${path}`);
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    const res = await doFetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15_000),
    });
    const json = await res.json().catch(() => null) as unknown;
    if (!res.ok) {
      const message = String(asRecord(asRecord(json).error).message ?? 'graph request failed').slice(0, 200);
      throw new Error(`graph ${res.status}: ${message}`);
    }
    return asRecord(json);
  };

  const { token, seen, via } = await resolvePageToken(get, opts.pageId, [opts.token, ...(opts.fallbackTokens ?? [])]);

  const forms = await get(`${opts.pageId}/leadgen_forms`, { fields: 'id,name', limit: '100' }, token).catch((err: Error) => {
    throw new Error(seen.length ? `${err.message}; tokens seen: ${seen.join(', ')}` : err.message);
  });
  const formList = Array.isArray(forms.data) ? forms.data.map(asRecord) : [];
  if (!process.env.NODE_TEST_CONTEXT) console.log('meta lead forms', { via, forms: formList.map((f) => String(f.name ?? f.id)) });
  const since = Math.floor(pollStart(opts.now) / 1000);
  const filtering = JSON.stringify([{ field: 'time_created', operator: 'GREATER_THAN', value: since }]);

  const leads: unknown[] = [];
  for (const form of Array.isArray(forms.data) ? forms.data : []) {
    const { id, name } = asRecord(form);
    if (id == null) continue;
    const page = await get(`${String(id)}/leads`, { fields: LEAD_FIELDS, filtering, limit: '100' }, token);
    for (const lead of Array.isArray(page.data) ? page.data : []) {
      leads.push({ ...asRecord(lead), form_id: id, form_name: name });
    }
  }
  const time = (lead: unknown) => Date.parse(String(asRecord(lead).created_time)) || 0;
  return leads.sort((a, b) => time(a) - time(b));
}

type GraphGet = (path: string, params: Record<string, string>, token: string) => Promise<Record<string, unknown>>;

/**
 * Lead reads need a Page token for this Page. Each token may already be one, or
 * be a user or system-user token that can be exchanged for one. When none works,
 * the first token is used so Graph's own refusal is reported, along with whose
 * token each one turned out to be.
 */
async function resolvePageToken(get: GraphGet, pageId: string, tokens: string[]): Promise<{ token: string; seen: string[]; via: string }> {
  const seen: string[] = [];
  for (const candidate of tokens.filter(Boolean)) {
    const owner = await get('me', { fields: 'id,name' }, candidate).catch(() => ({} as Record<string, unknown>));
    if (String(owner.id ?? '') === pageId) return { token: candidate, seen, via: `page token #${tokens.indexOf(candidate) + 1}` };
    const page = await get(pageId, { fields: 'access_token' }, candidate).catch(() => ({} as Record<string, unknown>));
    if (typeof page.access_token === 'string' && page.access_token) return { token: page.access_token, seen, via: `exchanged token #${tokens.indexOf(candidate) + 1}` };
    const accounts = await get('me/accounts', { fields: 'id,access_token', limit: '100' }, candidate).catch(() => ({} as Record<string, unknown>));
    const match = (Array.isArray(accounts.data) ? accounts.data : []).map(asRecord).find((a) => String(a.id) === pageId);
    if (typeof match?.access_token === 'string' && match.access_token) return { token: match.access_token, seen, via: `accounts of token #${tokens.indexOf(candidate) + 1}` };
    seen.push(owner.id ? `${String(owner.name ?? 'unnamed')} (${String(owner.id)})` : 'invalid or expired');
  }
  return { token: tokens[0] ?? '', seen, via: 'none' };
}

type ProcessDeps = {
  capture: typeof captureMappedMetaLead;
  notify: typeof notifyMetaLead;
};

/** A failed lead is left for the next run. The look-back window retries it. */
export async function processMetaLeads(
  payloads: unknown[],
  deps: ProcessDeps = { capture: captureMappedMetaLead, notify: notifyMetaLead },
): Promise<{ checked: number; created: number; failed: number }> {
  let created = 0;
  let failed = 0;
  for (const payload of payloads) {
    try {
      const mapped = graphLeadToMapped(payload);
      if (!mapped.externalId) { failed += 1; continue; }
      const saved = await deps.capture(mapped);
      // An unsaved lead has no record of what was sent, so it waits for the store.
      if (saved.action === 'unconfigured' || saved.action === 'insert_failed') { failed += 1; continue; }
      if (saved.action !== 'duplicate') created += 1;
      const { reported } = await deps.notify(saved.lead);
      if (!reported) failed += 1;
    } catch (err) {
      console.error('meta lead poll item failed', err instanceof Error ? err.message : 'error');
      failed += 1;
    }
  }
  return { checked: payloads.length, created, failed };
}
