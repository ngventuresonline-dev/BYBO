import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { metaLeadReport, notifyMetaLead } from './lead-notify';
import { MemoryLeadStore } from './store';
import { newLead, type Lead } from './types';

const NOW = new Date('2026-11-02T04:30:00.000Z');

function lead(overrides: Partial<Lead> = {}): Lead {
  return {
    ...newLead({
      id: 'lead-1',
      source: 'meta',
      external_id: 'meta-1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone_e164: '+919686613899',
      business: 'Spice Co',
      enquiry: 'We need more enquiries',
      area: '',
      raw: {
        lead_source: 'our Instagram form',
        meta: { campaign_name: 'Bybo Website Leads', ad_name: 'Ad 1', form_name: 'Form 1', created_time: '2026-11-02T04:29:00+0000' },
      },
    }),
    ...overrides,
  };
}

type Sent = { to: string[]; subject: string; reply_to?: string; template?: { id: string }; html?: string; key: string };

function stubResend(respond: (mail: Sent) => number = () => 200) {
  const sent: Sent[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (_url, init) => {
    const headers = init?.headers as Record<string, string>;
    const mail = { ...JSON.parse(String(init?.body)), key: headers['Idempotency-Key'] } as Sent;
    sent.push(mail);
    return new Response('{}', { status: respond(mail) });
  }) as typeof fetch;
  return { sent, restore: () => { globalThis.fetch = original; } };
}

async function seeded(value = lead()) {
  const store = new MemoryLeadStore();
  await store.insert(value, NOW);
  return store;
}

afterEach(() => {
  delete process.env.RESEND_API_KEY;
  delete process.env.ENQUIRY_TO;
});

describe('Meta lead notifications', () => {
  it('confirms to the lead and reports to the team inboxes', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const store = await seeded();
    const { sent, restore } = stubResend();
    const result = await notifyMetaLead(lead(), { store });
    restore();

    assert.deepEqual(result, { reported: true, ack: 'sent' });
    assert.equal(sent.length, 2);
    assert.deepEqual(sent[0]!.to, ['priya@example.com']);
    assert.equal(sent[0]!.template?.id, 'bybo-enquiry-ack');
    assert.equal(sent[0]!.reply_to, 'support@bybo.in');
    assert.deepEqual(sent[1]!.to, ['support@bybo.in', 'byboonline@gmail.com']);
    assert.equal(sent[1]!.subject, 'Meta lead: Priya Sharma (Spice Co)');
    assert.equal(sent[1]!.reply_to, 'priya@example.com');
    assert.equal(sent[1]!.key, 'meta-lead-report/lead-1');
  });

  it('sends nothing twice when Meta redelivers a lead', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const store = await seeded();
    const first = stubResend();
    await notifyMetaLead(lead(), { store });
    first.restore();

    const again = stubResend();
    const result = await notifyMetaLead((await store.get('lead-1'))!, { store });
    again.restore();
    assert.deepEqual(result, { reported: true, ack: 'sent' });
    assert.equal(again.sent.length, 0);
  });

  it('falls back to the themed note when the template fails', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const store = await seeded();
    const { sent, restore } = stubResend((mail) => (mail.template ? 422 : 200));
    const result = await notifyMetaLead(lead(), { store });
    restore();
    assert.equal(result.ack, 'sent');
    assert.equal(sent.length, 3);
    assert.match(sent[1]!.html ?? '', /We have your note, Priya/);
  });

  it('still reports a lead with no usable email, and says so', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const value = lead({ email: 'not-an-email' });
    const store = await seeded(value);
    const { sent, restore } = stubResend();
    const result = await notifyMetaLead(value, { store });
    restore();
    assert.deepEqual(result, { reported: true, ack: 'no_email' });
    assert.equal(sent.length, 1);
    assert.equal(sent[0]!.reply_to, undefined);
    assert.match(sent[0]!.html ?? '', /no valid email/);
  });

  it('reports a failed confirmation without retrying it', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const store = await seeded();
    const { sent, restore } = stubResend((mail) => (mail.to.includes('priya@example.com') ? 500 : 200));
    const result = await notifyMetaLead(lead(), { store });
    restore();
    assert.deepEqual(result, { reported: true, ack: 'failed' });
    assert.match(sent[2]!.html ?? '', /Failed to send/);

    const again = stubResend();
    await notifyMetaLead((await store.get('lead-1'))!, { store });
    again.restore();
    assert.equal(again.sent.length, 0);
  });

  it('retries only the report after it fails', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const store = await seeded();
    const first = stubResend((mail) => (mail.key.includes('report') ? 500 : 200));
    const result = await notifyMetaLead(lead(), { store });
    first.restore();
    assert.deepEqual(result, { reported: false, ack: 'sent' });

    const second = stubResend();
    const retried = await notifyMetaLead((await store.get('lead-1'))!, { store });
    second.restore();
    assert.deepEqual(retried, { reported: true, ack: 'sent' });
    assert.equal(second.sent.length, 1);
    assert.equal(second.sent[0]!.key, 'meta-lead-report/lead-1');
  });

  it('reports failure without a Resend key', async () => {
    const { sent, restore } = stubResend();
    const result = await notifyMetaLead(lead(), { store: await seeded() });
    restore();
    assert.equal(result.reported, false);
    assert.equal(sent.length, 0);
  });

  it('escapes form answers in the report', () => {
    const { html } = metaLeadReport(lead({ enquiry: '<script>x</script>' }), 'sent');
    assert.doesNotMatch(html, /<script>x/);
  });
});
