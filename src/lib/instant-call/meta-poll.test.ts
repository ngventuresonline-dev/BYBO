import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { fetchRecentMetaLeads, pollStart, POLL_FROM, processMetaLeads } from './meta-poll';
import { newLead } from './types';

const NOW = new Date('2026-11-02T13:30:00.000Z');

function graph(routes: Record<string, unknown>, status = 200) {
  const urls: URL[] = [];
  const auth: string[] = [];
  const fetchImpl = (async (input: URL, init?: RequestInit) => {
    urls.push(input);
    auth.push(String((init?.headers as Record<string, string>).Authorization));
    const key = Object.keys(routes).find((path) => input.pathname.endsWith(path));
    return new Response(JSON.stringify(key ? routes[key] : {}), { status });
  }) as unknown as typeof fetch;
  return { fetchImpl, urls, auth };
}

const stored = newLead({
  source: 'meta',
  external_id: 'meta-1',
  name: 'Priya',
  email: 'priya@example.com',
  phone_e164: null,
  business: '',
  enquiry: '',
  area: '',
  raw: {},
});

const payload = { id: 'meta-1', field_data: [{ name: 'email', values: ['priya@example.com'] }] };

describe('Meta lead polling', () => {
  it('never reaches back before the start date', () => {
    assert.equal(pollStart(NOW), Date.parse(POLL_FROM));
    const later = new Date('2026-12-01T00:00:00.000Z');
    assert.equal(pollStart(later), later.getTime() - 48 * 3_600_000);
  });

  it('reads every form with a Page token, oldest lead first, and keeps the token out of the URL', async () => {
    const { fetchImpl, urls, auth } = graph({
      '/page-1': { access_token: 'page-token' },
      '/page-1/leadgen_forms': { data: [{ id: 'f1', name: 'Form one' }, { id: 'f2', name: 'Form two' }] },
      '/f1/leads': { data: [{ id: 'new', created_time: '2026-11-02T12:01:00+0000' }] },
      '/f2/leads': { data: [{ id: 'old', created_time: '2026-11-02T09:31:00+0000' }] },
    });
    const leads = await fetchRecentMetaLeads({ token: 'user-token', pageId: 'page-1', now: NOW, fetchImpl });

    assert.deepEqual(leads.map((lead) => (lead as { id: string }).id), ['old', 'new']);
    assert.equal((leads[1] as { form_name: string }).form_name, 'Form one');
    assert.deepEqual(auth.slice(0, 2), ['Bearer user-token', 'Bearer user-token']);
    assert.ok(auth.slice(2).every((value) => value === 'Bearer page-token'));
    assert.ok(urls.every((url) => !url.href.includes('token=') && !url.href.includes('page-token')));

    const filtering = JSON.parse(urls.at(-1)!.searchParams.get('filtering')!) as Array<{ value: number }>;
    assert.equal(filtering[0]!.value, Math.floor(Date.parse(POLL_FROM) / 1000));
  });

  it('uses a token that is already this Page’s token', async () => {
    const { fetchImpl, auth } = graph({
      '/me': { id: 'page-1', name: 'BYBO' },
      '/page-1/leadgen_forms': { data: [] },
    });
    await fetchRecentMetaLeads({ token: 'page-token', pageId: 'page-1', now: NOW, fetchImpl });
    assert.ok(auth.every((value) => value === 'Bearer page-token'));
  });

  it('finds the Page token among the accounts a user token manages', async () => {
    const { fetchImpl, auth } = graph({
      '/me/accounts': { data: [{ id: 'other', access_token: 'other-token' }, { id: 'page-1', access_token: 'page-token' }] },
      '/me': { id: 'user-9', name: 'Owner' },
      '/page-1/leadgen_forms': { data: [] },
    });
    await fetchRecentMetaLeads({ token: 'user-token', pageId: 'page-1', now: NOW, fetchImpl });
    assert.equal(auth.at(-1), 'Bearer page-token');
  });

  it('falls back to the next token, and names whose tokens failed', async () => {
    const first = graph({ '/me': { id: 'page-2', name: 'Other page' }, '/leadgen_forms': { data: [] } });
    const tried: string[] = [];
    const fetchImpl = (async (input: URL, init?: RequestInit) => {
      const token = String((init?.headers as Record<string, string>).Authorization).slice(7);
      tried.push(token);
      if (token === 'ig-token' && input.pathname.endsWith('/page-1')) return new Response(JSON.stringify({ access_token: 'page-token' }));
      return first.fetchImpl(input, init);
    }) as unknown as typeof fetch;
    await fetchRecentMetaLeads({ token: 'wrong-page-token', fallbackTokens: ['ig-token'], pageId: 'page-1', now: NOW, fetchImpl });
    assert.equal(tried.at(-1), 'page-token');

    const { fetchImpl: refusing } = graph({ '/me': { id: 'page-2', name: 'Other page' }, '/leadgen_forms': { error: { message: '(#190) This method must be called with a Page Access Token' } } }, 400);
    await assert.rejects(
      fetchRecentMetaLeads({ token: 'wrong-page-token', pageId: 'page-1', now: NOW, fetchImpl: refusing }),
      /Page Access Token; tokens seen: invalid or expired/,
    );
  });

  it('surfaces a Graph refusal', async () => {
    const { fetchImpl } = graph({ '/leadgen_forms': { error: { message: 'Missing permission' } } }, 403);
    await assert.rejects(
      fetchRecentMetaLeads({ token: 't', pageId: 'page-1', now: NOW, fetchImpl }),
      /graph 403: Missing permission/,
    );
  });

  it('notifies new leads and reruns the notifier for duplicates', async () => {
    const notified: string[] = [];
    const result = await processMetaLeads([payload, payload], {
      capture: (async () => ({ lead: stored, action: notified.length ? 'duplicate' : 'switch_off' })) as never,
      notify: async (lead) => { notified.push(lead.id); return { reported: true, ack: 'sent' as const }; },
    });
    assert.deepEqual(result, { checked: 2, created: 1, failed: 0 });
    assert.equal(notified.length, 2);
  });

  it('holds a lead it could not save, so a retry cannot email it again', async () => {
    let notified = 0;
    const result = await processMetaLeads([payload], {
      capture: (async () => ({ lead: stored, action: 'insert_failed' })) as never,
      notify: async () => { notified += 1; return { reported: true, ack: 'sent' as const }; },
    });
    assert.deepEqual(result, { checked: 1, created: 0, failed: 1 });
    assert.equal(notified, 0);
  });

  it('counts a report that failed to send', async () => {
    const result = await processMetaLeads([payload], {
      capture: (async () => ({ lead: stored, action: 'switch_off' })) as never,
      notify: async () => ({ reported: false, ack: 'sent' as const }),
    });
    assert.equal(result.failed, 1);
  });
});
