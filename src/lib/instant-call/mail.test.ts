import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { sendCallSummary } from './mail';
import { newLead } from './types';

const lead = newLead({
  source: 'website',
  external_id: null,
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone_e164: '+919686613899',
  business: 'Spice Co',
  enquiry: 'More enquiries',
  area: '',
  raw: {},
  call_status: 'no_answer',
});

afterEach(() => {
  delete process.env.INSTANT_CALL_ENABLED;
  delete process.env.RESEND_API_KEY;
});

describe('call summary email', () => {
  it('does not email when the switch is off', async () => {
    let called = false;
    const original = globalThis.fetch;
    globalThis.fetch = (async () => {
      called = true;
      return new Response('{}', { status: 200 });
    }) as typeof fetch;
    process.env.RESEND_API_KEY = 're_test';
    const sent = await sendCallSummary({ ...lead, call_summary: 'No answer.' });
    assert.equal(sent, false);
    assert.equal(called, false);
    globalThis.fetch = original;
  });

  it('emails only byboonline@gmail.com when the switch is on', async () => {
    const original = globalThis.fetch;
    let to: string[] = [];
    globalThis.fetch = (async (_url, init) => {
      const body = JSON.parse(String(init?.body)) as { to: string[]; subject: string };
      to = body.to;
      assert.match(body.subject, /no answer/);
      return new Response('{}', { status: 200 });
    }) as typeof fetch;
    process.env.INSTANT_CALL_ENABLED = 'true';
    process.env.RESEND_API_KEY = 're_test';
    const sent = await sendCallSummary({ ...lead, call_summary: 'No answer.' });
    assert.equal(sent, true);
    assert.deepEqual(to, ['byboonline@gmail.com']);
    globalThis.fetch = original;
  });
});
