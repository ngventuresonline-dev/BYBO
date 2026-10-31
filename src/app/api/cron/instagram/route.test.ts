import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { ADMIN_COOKIE } from '@/lib/instagram/auth';

const original = {
  CRON_SECRET: process.env.CRON_SECRET,
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  BLOB_STORE_ID: process.env.BLOB_STORE_ID,
  IG_POST_DRY_RUN: process.env.IG_POST_DRY_RUN,
  IG_ACCESS_TOKEN: process.env.IG_ACCESS_TOKEN,
  IG_USER_ID: process.env.IG_USER_ID,
};

afterEach(() => {
  for (const [key, value] of Object.entries(original)) {
    if (value == null) delete process.env[key];
    else process.env[key] = value;
  }
});

describe('instagram cron route', () => {
  it('rejects a missing bearer and does not publish without the post store', async () => {
    process.env.CRON_SECRET = 'cron-test-secret';
    delete process.env.BLOB_READ_WRITE_TOKEN;
    delete process.env.BLOB_STORE_ID;
    delete process.env.IG_POST_DRY_RUN;
    const { GET } = await import('./route');
    const denied = await GET(new Request('http://localhost/api/cron/instagram'));
    assert.equal(denied.status, 401);
    assert.equal(JSON.stringify(await denied.json()).includes('cron-test-secret'), false);

    const allowed = await GET(new Request('http://localhost/api/cron/instagram', {
      headers: { authorization: 'Bearer cron-test-secret' },
    }));
    assert.equal(allowed.status, 503);
    assert.deepEqual(await allowed.json(), { ok: false, reason: 'store_unconfigured' });
  });
});

describe('instagram session', () => {
  it('sets a session cookie that is not the secret', async () => {
    process.env.CRON_SECRET = 'cron-test-secret';
    const { POST } = await import('../../admin/instagram/session/route');
    const ok = await POST(new Request('http://localhost/api/admin/instagram/session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: 'cron-test-secret' }),
    }));
    assert.equal(ok.status, 200);
    const cookie = ok.headers.get('set-cookie') ?? '';
    assert.equal(cookie.includes(`${ADMIN_COOKIE}=`), true);
    assert.equal(cookie.includes('cron-test-secret'), false);
    const denied = await POST(new Request('http://localhost/api/admin/instagram/session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: 'wrong-password' }),
    }));
    assert.equal(denied.status, 401);
  });
});
