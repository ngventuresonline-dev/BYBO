import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { afterEach, describe, it } from 'node:test';
import { NextRequest } from 'next/server';

afterEach(() => {
  delete process.env.META_VERIFY_TOKEN;
  delete process.env.META_APP_SECRET;
  delete process.env.META_PAGE_ACCESS_TOKEN;
});

describe('/api/meta/leadgen', () => {
  it('answers the hub challenge only when the verify token matches', async () => {
    process.env.META_VERIFY_TOKEN = 'verify-me';
    const { GET } = await import('./route');
    const ok = await GET(new NextRequest('https://bybo.in/api/meta/leadgen?hub.mode=subscribe&hub.verify_token=verify-me&hub.challenge=12345'));
    assert.equal(ok.status, 200);
    assert.equal(await ok.text(), '12345');
    const bad = await GET(new NextRequest('https://bybo.in/api/meta/leadgen?hub.mode=subscribe&hub.verify_token=nope&hub.challenge=12345'));
    assert.equal(bad.status, 403);
  });

  it('rejects a POST whose hub signature does not match', async () => {
    process.env.META_APP_SECRET = 'app-secret';
    const { POST } = await import('./route');
    const body = JSON.stringify({ entry: [] });
    const res = await POST(new NextRequest('https://bybo.in/api/meta/leadgen', {
      method: 'POST',
      headers: { 'x-hub-signature-256': 'sha256=deadbeef', 'content-type': 'application/json' },
      body,
    }));
    assert.equal(res.status, 401);

    const hex = createHmac('sha256', 'app-secret').update(body).digest('hex');
    let fetched = false;
    const original = globalThis.fetch;
    globalThis.fetch = (async () => {
      fetched = true;
      return new Response('{}', { status: 200 });
    }) as typeof fetch;
    const signed = await POST(new NextRequest('https://bybo.in/api/meta/leadgen', {
      method: 'POST',
      headers: { 'x-hub-signature-256': `sha256=${hex}`, 'content-type': 'application/json' },
      body,
    }));
    assert.equal(signed.status, 200);
    assert.equal(fetched, false);
    globalThis.fetch = original;
  });
});
