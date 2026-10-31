import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { afterEach, describe, it } from 'node:test';
import { NextRequest } from 'next/server';

afterEach(() => {
  delete process.env.ELEVENLABS_WEBHOOK_SECRET;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.BLOB_STORE_ID;
});

function signed(body: string, secret: string) {
  const ts = Math.floor(Date.now() / 1000);
  const hex = createHmac('sha256', secret).update(`${ts}.${body}`).digest('hex');
  return new NextRequest('https://bybo.in/api/elevenlabs/post-call', {
    method: 'POST',
    headers: { 'elevenlabs-signature': `t=${ts},v0=${hex}`, 'content-type': 'application/json' },
    body,
  });
}

describe('POST /api/elevenlabs/post-call', () => {
  it('rejects a missing or bad signature', async () => {
    process.env.ELEVENLABS_WEBHOOK_SECRET = 'secret';
    const { POST } = await import('./route');
    const res = await POST(new NextRequest('https://bybo.in/api/elevenlabs/post-call', {
      method: 'POST',
      headers: { 'elevenlabs-signature': 't=1,v0=deadbeef' },
      body: '{}',
    }));
    assert.equal(res.status, 401);
  });

  it('accepts a signed audio event without dialling or storing', async () => {
    process.env.ELEVENLABS_WEBHOOK_SECRET = 'secret';
    let called = false;
    const original = globalThis.fetch;
    globalThis.fetch = (async () => {
      called = true;
      return new Response('no', { status: 500 });
    }) as typeof fetch;
    const { POST } = await import('./route');
    const body = JSON.stringify({ type: 'post_call_audio', data: { conversation_id: 'c1', full_audio: 'abc' } });
    const res = await POST(signed(body, 'secret'));
    assert.equal(res.status, 200);
    assert.equal(called, false);
    globalThis.fetch = original;
  });
});
