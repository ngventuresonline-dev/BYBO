import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { NextRequest } from 'next/server';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.RESEND_API_KEY;
  delete process.env.ENQUIRY_TO;
});

function form(fields: Record<string, string | string[]>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) value.forEach((item) => data.append(key, item));
    else data.append(key, value);
  }
  return new NextRequest('http://localhost/api/enquiry', { method: 'POST', body: data });
}

describe('POST /api/enquiry', () => {
  it('rejects an invalid payload', async () => {
    const { POST } = await import('./route');
    const res = await POST(form({ name: 'x', email: 'bad', message: 'short' }));
    assert.equal(res.status, 400);
    assert.deepEqual(await res.json(), { ok: false, reason: 'invalid' });
  });

  it('returns not_configured without a key', async () => {
    const { POST } = await import('./route');
    const res = await POST(form({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      message: 'A recurring invoice that waits a week.',
    }));
    assert.equal(res.status, 503);
    assert.deepEqual(await res.json(), { ok: false, reason: 'not_configured' });
  });

  it('accepts the honeypot and sends nothing', async () => {
    process.env.RESEND_API_KEY = 're_test';
    let sent = false;
    globalThis.fetch = (async () => {
      sent = true;
      return new Response('no', { status: 500 });
    }) as typeof fetch;
    const { POST } = await import('./route');
    const res = await POST(form({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      message: 'A recurring invoice that waits a week.',
      company_website: 'https://spam.test',
    }));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
    assert.equal(sent, false);
  });

  it('returns ok after the team send even when the visitor ack fails', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const calls: Array<{ url: string; body: unknown }> = [];
    globalThis.fetch = (async (_url: URL | RequestInfo, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body));
      calls.push({ url: String(_url), body });
      if (body.template) return new Response('template missing', { status: 422 });
      if (body.text && !body.to?.includes('byboonline@gmail.com')) {
        return new Response('fallback failed', { status: 500 });
      }
      return new Response(JSON.stringify({ id: 'team-ok' }), { status: 200 });
    }) as typeof fetch;

    const { POST } = await import('./route');
    const res = await POST(form({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      message: 'A recurring invoice that waits a week.',
      services: 'Customer & Workforce AI',
    }));

    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
    assert.equal(calls.length, 3);
    assert.deepEqual((calls[0].body as { to: string[] }).to, [
      'byboonline@gmail.com',
      'ngventuresonline@gmail.com',
    ]);
    assert.equal((calls[0].body as { reply_to: string }).reply_to, 'priya@example.com');
    assert.match((calls[0].body as { html: string }).html, /#111116/);
    assert.match((calls[0].body as { html: string }).html, /Georgia/);
    assert.match((calls[0].body as { text: string }).text, /Priya Sharma/);
    assert.equal((calls[1].body as { template: { id: string } }).template.id, 'bybo-enquiry-ack');
    assert.deepEqual((calls[1].body as { to: string[] }).to, ['priya@example.com']);
    assert.equal((calls[2].body as { subject: string }).subject, 'We have your note, Priya');
    assert.match((calls[2].body as { html: string }).html, /#111116/);
    assert.match((calls[2].body as { html: string }).html, /We have your note, Priya/);
  });

  it('sends the template ack after the team email and skips the fallback', async () => {
    process.env.RESEND_API_KEY = 're_test';
    const calls: unknown[] = [];
    globalThis.fetch = (async (_url: URL | RequestInfo, init?: RequestInit) => {
      calls.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ id: 'ok' }), { status: 200 });
    }) as typeof fetch;

    const { POST } = await import('./route');
    const res = await POST(form({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      message: 'A recurring invoice that waits a week.',
      services: 'Customer & Workforce AI',
    }));

    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
    assert.equal(calls.length, 2);
    assert.deepEqual((calls[0] as { to: string[] }).to, [
      'byboonline@gmail.com',
      'ngventuresonline@gmail.com',
    ]);
    assert.deepEqual((calls[1] as { to: string[] }).to, ['priya@example.com']);
    assert.match((calls[0] as { html: string }).html, /#793cff/);
    assert.ok((calls[0] as { html?: string }).html);
    assert.ok((calls[0] as { text?: string }).text);
    assert.equal((calls[1] as { template: { id: string } }).template.id, 'bybo-enquiry-ack');
    assert.equal((calls[1] as { subject: string }).subject, 'We have your note, Priya');
    assert.equal((calls[1] as { template: { variables: { TOPIC_LINE: string } } }).template.variables.TOPIC_LINE, ' about Customer & Workforce AI');
  });

  it('still delivers to both Gmail inboxes and never to support@ when ENQUIRY_TO lists only support@', async () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.ENQUIRY_TO = 'support@bybo.in';
    const calls: unknown[] = [];
    globalThis.fetch = (async (_url: URL | RequestInfo, init?: RequestInit) => {
      calls.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ id: 'ok' }), { status: 200 });
    }) as typeof fetch;

    const { POST } = await import('./route');
    const res = await POST(form({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      message: 'A recurring invoice that waits a week.',
    }));

    assert.equal(res.status, 200);
    assert.deepEqual((calls[0] as { to: string[] }).to, [
      'byboonline@gmail.com',
      'ngventuresonline@gmail.com',
    ]);
    assert.ok(!(calls[0] as { to: string[] }).to.includes('support@bybo.in'));
    assert.deepEqual((calls[1] as { to: string[] }).to, ['priya@example.com']);
  });

  it('fails the enquiry when the team send fails', async () => {
    process.env.RESEND_API_KEY = 're_test';
    globalThis.fetch = (async () => new Response('denied', { status: 403 })) as typeof fetch;

    const { POST } = await import('./route');
    const res = await POST(form({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      message: 'A recurring invoice that waits a week.',
    }));

    assert.equal(res.status, 502);
    assert.deepEqual(await res.json(), { ok: false, reason: 'send_failed' });
  });
});
