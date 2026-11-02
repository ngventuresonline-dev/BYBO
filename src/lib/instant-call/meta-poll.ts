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

  // Lead reads need a Page token. A user token can be exchanged for one here.
  const page = await get(opts.pageId, { fields: 'access_token' }, opts.token).catch(() => ({} as Record<string, unknown>));
  const token = typeof page.access_token === 'string' && page.access_token ? page.access_token : opts.token;

  const forms = await get(`${opts.pageId}/leadgen_forms`, { fields: 'id,name', limit: '100' }, token);
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
