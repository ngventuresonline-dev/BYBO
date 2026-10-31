import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { importMetaLeads, captureLead, runCadence, applyCallUpdate } from './flow';
import { mapMetaFields } from './meta';
import { MemoryLeadStore } from './store';
import { newLead, type Lead } from './types';

const SAT_10 = new Date('2026-10-31T04:30:00.000Z');
const SAT_1330 = new Date('2026-10-31T08:00:00.000Z');
const SUN_1130 = new Date('2026-11-01T06:00:00.000Z');
const MON_10 = new Date('2026-11-02T04:30:00.000Z');
const TUE_10 = new Date('2026-11-03T04:30:00.000Z');

function draft(phone = '+919686613899', id = 'lead-1'): Lead {
  return newLead({
    id,
    source: 'website',
    external_id: null,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone_e164: phone,
    business: 'Spice Co',
    enquiry: 'We need more enquiries',
    area: 'Food',
    raw: { lead_source: 'the bybo.in website form', lead_brief: 'Priya (Spice Co) asked: We need more enquiries' },
  });
}

function harness(now: Date) {
  const store = new MemoryLeadStore();
  const calls: string[] = [];
  const emails: string[] = [];
  const logs: string[] = [];
  const deps = {
    store,
    now,
    dial: async (lead: Lead) => {
      calls.push(lead.id);
      return `conv-${calls.length}`;
    },
    sendSummary: async (lead: Lead) => {
      emails.push(`${lead.id}:${lead.call_status}`);
      return true;
    },
    log: (message: string) => { logs.push(message); },
  };
  return { store, calls, emails, logs, deps };
}

afterEach(() => {
  delete process.env.INSTANT_CALL_ENABLED;
  delete process.env.INSTANT_CALL_DRY_RUN;
  delete process.env.INSTANT_CALL_ALLOWLIST;
  delete process.env.CALL_HOURS_START;
  delete process.env.CALL_HOURS_END;
});

function enable(allowlist = '+919686613899') {
  process.env.INSTANT_CALL_ENABLED = 'true';
  delete process.env.INSTANT_CALL_DRY_RUN;
  process.env.INSTANT_CALL_ALLOWLIST = allowlist;
}

describe('instant call flow', () => {
  it('stores a lead and does not dial when the switch is off', async () => {
    const { store, calls, deps } = harness(SAT_10);
    const result = await captureLead(draft(), true, deps);
    assert.equal(result.action, 'switch_off');
    assert.equal(result.lead.call_status, 'pending');
    assert.equal(calls.length, 0);
    assert.equal((await store.get(result.lead.id))?.call_status, 'pending');
    const cadence = await runCadence({ ...deps, now: SAT_10 });
    assert.equal(cadence.dialed, 0);
    assert.equal(calls.length, 0);
  });

  it('does not dial without consent or outside the allowlist', async () => {
    enable();
    const noConsent = harness(SAT_10);
    const skippedConsent = await captureLead(draft(), false, noConsent.deps);
    assert.equal(skippedConsent.action, 'no_consent');
    assert.equal(noConsent.calls.length, 0);

    const blocked = harness(SAT_10);
    const skipped = await captureLead(draft('+919000000000', 'lead-2'), true, blocked.deps);
    assert.equal(skipped.action, 'allowlist');
    assert.equal(skipped.lead.call_status, 'skipped_allowlist');
    assert.equal(blocked.calls.length, 0);

    process.env.INSTANT_CALL_ALLOWLIST = '';
    const closed = harness(SAT_10);
    const nobody = await captureLead(draft(), true, closed.deps);
    assert.equal(nobody.lead.call_status, 'skipped_allowlist');
    assert.equal(closed.calls.length, 0);

    process.env.INSTANT_CALL_ALLOWLIST = 'not-a-phone';
    const garbage = harness(SAT_10);
    const unparsable = await captureLead(draft(), true, garbage.deps);
    assert.equal(unparsable.lead.call_status, 'skipped_allowlist');
    assert.equal(garbage.calls.length, 0);
  });

  it('queues outside calling hours and does not dial', async () => {
    enable();
    const { calls, deps } = harness(SUN_1130);
    const result = await captureLead(draft(), true, deps);
    assert.equal(result.action, 'outside_hours');
    assert.equal(result.lead.call_status, 'queued_hours');
    assert.equal(result.lead.next_call_at, MON_10.toISOString());
    assert.equal(calls.length, 0);
    const sunday = await runCadence(deps);
    assert.equal(sunday.dialed, 0);
    assert.equal(calls.length, 0);
  });

  it('logs would dial and never calls when dry-run is on', async () => {
    enable();
    process.env.INSTANT_CALL_DRY_RUN = 'true';
    const { calls, logs, deps } = harness(SAT_10);
    const result = await captureLead(draft(), true, deps);
    assert.equal(result.action, 'dry_run');
    assert.equal(calls.length, 0);
    assert.ok(logs.includes('would dial'));
    assert.equal(result.lead.raw.dry_run_hold, true);
  });

  it('places one call per IST day, retries the next day, then stops at whatsapp_only', async () => {
    enable();
    const { store, calls, emails, deps } = harness(SAT_10);
    const first = await captureLead(draft(), true, deps);
    assert.equal(first.action, 'dialed');
    assert.equal(first.lead.call_status, 'calling');
    assert.equal(first.lead.call_attempts, 1);
    assert.equal(first.lead.conversation_id, 'conv-1');
    assert.equal(calls.length, 1);

    const missed = await applyCallUpdate(first.lead, { outcome: 'no_answer' }, deps);
    assert.equal(missed.call_status, 'no_answer');
    assert.equal(missed.next_call_at, MON_10.toISOString());
    assert.deepEqual(emails, ['lead-1:no_answer']);

    const sameDay = await runCadence({ ...deps, now: SAT_1330 });
    assert.equal(sameDay.dialed, 0);
    assert.equal(calls.length, 1);

    const retry = await runCadence({ ...deps, now: MON_10 });
    assert.equal(calls.length, 2);
    const second = await store.get('lead-1');
    assert.equal(second?.call_attempts, 2);
    assert.equal(second?.call_status, 'calling');

    const stopped = await applyCallUpdate(second!, { outcome: 'busy', analysis: { transcript_summary: 'Busy.' } }, { ...deps, now: MON_10 });
    assert.equal(stopped.call_status, 'whatsapp_only');
    assert.equal(stopped.next_call_at, null);
    assert.equal(stopped.call_analysis && typeof stopped.call_analysis === 'object', true);

    const later = await runCadence({ ...deps, now: TUE_10 });
    assert.equal(later.dialed, 0);
    assert.equal(calls.length, 2);
  });

  it('treats the same phone within 24 hours as one lead and one call', async () => {
    enable();
    const { calls, deps } = harness(SAT_10);
    const first = await captureLead(draft(), true, deps);
    const second = await captureLead(draft('9686613899', 'lead-2'), true, { ...deps, now: new Date(SAT_10.getTime() + 60_000) });
    assert.equal(first.action, 'dialed');
    assert.equal(second.action, 'duplicate');
    assert.equal(second.lead.id, first.lead.id);
    assert.equal(calls.length, 1);
  });

  it('imports Meta rows as skipped unless place_calls is set', async () => {
    enable();
    const row = mapMetaFields({
      first_name: 'Priya',
      phone_number: 'p:+919686613899',
      email_address: 'priya@example.com',
    }, { id: '55', platform: 'ig' });
    const quiet = harness(SAT_10);
    const imported = await importMetaLeads([row, row], false, quiet.deps);
    assert.equal(imported.inserted, 1);
    assert.equal(imported.duplicates, 1);
    assert.equal(quiet.calls.length, 0);
    const probe = await quiet.store.insert(draft('+910000000000', 'probe'), SAT_10);
    assert.equal(probe.created, true);
    const existing = await quiet.store.insert({ ...draft(), source: 'meta', external_id: '55' }, SAT_10);
    assert.equal(existing.created, false);
    assert.equal(existing.lead.call_status, 'skipped_allowlist');

    const live = harness(SAT_10);
    const flagged = await importMetaLeads([row], true, live.deps);
    assert.equal(flagged.inserted, 1);
    assert.equal(live.calls.length, 1);
    const again = await importMetaLeads([row], true, live.deps);
    assert.equal(again.duplicates, 1);
    assert.equal(live.calls.length, 1);
  });

  it('writes the summary once when a call is answered', async () => {
    enable();
    const { emails, deps } = harness(SAT_10);
    const started = await captureLead(draft(), true, deps);
    const done = await applyCallUpdate(started.lead, {
      outcome: 'answered',
      summary: 'They sell spices and want a site that brings enquiries.',
      analysis: { transcript_summary: 'They sell spices and want a site that brings enquiries.', data_collection_results: { matched_area: { value: 'Websites' } } },
    }, deps);
    assert.equal(done.call_status, 'done');
    assert.match(done.call_summary ?? '', /spices/);
    assert.equal(done.area, 'Websites');
    assert.equal(emails.length, 1);
    await applyCallUpdate(done, { outcome: 'answered', summary: done.call_summary }, deps);
    assert.equal(emails.length, 1);
  });
});
