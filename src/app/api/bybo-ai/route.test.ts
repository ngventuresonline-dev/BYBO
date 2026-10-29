import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { upcomingSlots } from '@/lib/bybo-ai/slots';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.ANTHROPIC_API_KEY;
  delete process.env.RESEND_API_KEY;
});

function chat(messages: { role: string; text: string }[], ip = '10.0.0.1') {
  return new Request('http://localhost/api/bybo-ai', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify({ messages, page: '/night-desk' }),
  });
}

type Call = { url: string; body: Record<string, unknown> };

function mock(modelReplies: unknown[], resendOk = true) {
  const calls: Call[] = [];
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body ?? '{}'));
    calls.push({ url: String(url), body });
    if (String(url).includes('anthropic')) return new Response(JSON.stringify(modelReplies.shift()), { status: 200 });
    return new Response('{}', { status: resendOk ? 200 : 500 });
  }) as typeof fetch;
  return calls;
}

describe('POST /api/bybo-ai', () => {
  it('returns not_configured without a model key', async () => {
    const { POST } = await import('./route');
    const res = await POST(chat([{ role: 'user', text: 'hi' }]));
    assert.equal(res.status, 503);
  });

  it('rejects a conversation that does not end on the visitor', async () => {
    process.env.ANTHROPIC_API_KEY = 'test';
    const { POST } = await import('./route');
    const res = await POST(chat([{ role: 'assistant', text: 'hello' }], '10.0.0.2'));
    assert.equal(res.status, 400);
  });

  it('replies with the model text', async () => {
    process.env.ANTHROPIC_API_KEY = 'test';
    const calls = mock([{ content: [{ type: 'text', text: 'What does your business do?' }], stop_reason: 'end_turn' }]);
    const { POST } = await import('./route');
    const res = await POST(chat([{ role: 'user', text: 'I want more leads' }], '10.0.0.3'));
    assert.deepEqual(await res.json(), { ok: true, reply: 'What does your business do?', booked: null });
    assert.equal(calls.length, 1);
    assert.match(String(calls[0].body.system), /AVAILABLE SLOTS/);
  });

  it('books a real slot and emails the team and the visitor', async () => {
    process.env.ANTHROPIC_API_KEY = 'test';
    process.env.RESEND_API_KEY = 'test';
    const slot = upcomingSlots()[0];
    const calls = mock([
      { content: [{ type: 'tool_use', id: 't1', name: 'book_call', input: { slot: slot.id, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', need: 'Night Desk for a clinic', summary: 'Clinic, loses night enquiries.' } }], stop_reason: 'tool_use' },
      { content: [{ type: 'text', text: 'You are booked.' }], stop_reason: 'end_turn' },
    ]);
    const { POST } = await import('./route');
    const res = await POST(chat([{ role: 'user', text: 'Book the first slot. Priya, priya@example.com, +91 98765 43210' }], '10.0.0.4'));
    const data = await res.json();
    assert.equal(data.booked, slot.label);
    const mails = calls.filter((c) => c.url.includes('resend'));
    assert.equal(mails.length, 2);
    assert.ok((mails[0].body.to as string[]).includes('byboonline@gmail.com'));
    assert.deepEqual(mails[1].body.to, ['priya@example.com']);
    assert.equal((mails[0].body.attachments as { filename: string }[])[0].filename, 'bybo-call.ics');
  });

  it('refuses a slot that was never offered', async () => {
    process.env.ANTHROPIC_API_KEY = 'test';
    process.env.RESEND_API_KEY = 'test';
    const calls = mock([
      { content: [{ type: 'tool_use', id: 't1', name: 'book_call', input: { slot: '2020-01-01T05:30:00.000Z', name: 'A', email: 'a@example.com', phone: '9876543210', need: 'x', summary: 'y' } }], stop_reason: 'tool_use' },
      { content: [{ type: 'text', text: 'That time is gone, how about another?' }], stop_reason: 'end_turn' },
    ]);
    const { POST } = await import('./route');
    const data = await (await POST(chat([{ role: 'user', text: 'book it' }], '10.0.0.5'))).json();
    assert.equal(data.booked, null);
    assert.equal(calls.filter((c) => c.url.includes('resend')).length, 0);
  });
});
