import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { adminOk, readLink, signLink, type PayLink } from './link';

const originalFetch = globalThis.fetch;
const base: PayLink = { id: 'BYBO-TEST-1', name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543210', company: 'Acme', purpose: 'Blueprint', amount: 25000, exp: Math.floor(Date.now() / 1000) + 3600 };

beforeEach(() => {
  process.env.PAYMENTS_LINK_SECRET = 'test-secret-0123456789';
  process.env.PAYMENTS_ADMIN_KEY = 'admin-key-123';
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const k of ['PAYMENTS_LINK_SECRET', 'PAYMENTS_ADMIN_KEY', 'PHONEPE_CLIENT_ID', 'PHONEPE_CLIENT_SECRET', 'PHONEPE_CLIENT_VERSION', 'RESEND_API_KEY']) delete process.env[k];
});

describe('payment links', () => {
  it('round-trips a signed link', () => {
    assert.deepEqual(readLink(signLink(base)), base);
  });

  it('rejects a link whose amount was changed', () => {
    const [body, mac] = signLink(base).split('.');
    const forged = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(body, 'base64url').toString()), amount: 1 })).toString('base64url');
    assert.equal(readLink(`${forged}.${mac}`), null);
  });

  it('rejects an expired link', () => {
    assert.equal(readLink(signLink({ ...base, exp: Math.floor(Date.now() / 1000) - 1 })), null);
  });

  it('rejects links when the secret is missing', () => {
    const token = signLink(base);
    delete process.env.PAYMENTS_LINK_SECRET;
    assert.equal(readLink(token), null);
  });

  it('checks the admin key', () => {
    assert.equal(adminOk('admin-key-123'), true);
    assert.equal(adminOk('wrong'), false);
  });
});

describe('POST /api/pay/link', () => {
  const req = (body: object) => new Request('https://bybo.in/api/pay/link', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': `1.1.1.${Math.floor(Math.random() * 250)}` }, body: JSON.stringify(body) });

  it('refuses without the admin key', async () => {
    const { POST } = await import('../../app/api/pay/link/route');
    const res = await POST(req({ key: 'nope', name: 'A', email: 'a@b.co', purpose: 'x', amount: 10 }));
    assert.equal(res.status, 401);
  });

  it('creates a link that reads back with the same amount', async () => {
    const { POST } = await import('../../app/api/pay/link/route');
    const data = await (await POST(req({ key: 'admin-key-123', name: 'Priya', email: 'priya@example.com', purpose: 'Blueprint', amount: '12500.50' }))).json();
    assert.equal(data.ok, true);
    const link = readLink(data.url.split('/pay/')[1]);
    assert.equal(link?.amount, 12500.5);
  });

  it('rejects an amount out of range', async () => {
    const { POST } = await import('../../app/api/pay/link/route');
    const res = await POST(req({ key: 'admin-key-123', name: 'P', email: 'p@example.com', purpose: 'x', amount: 0 }));
    assert.equal(res.status, 400);
  });
});

describe('POST /api/pay/start', () => {
  it('opens a PhonePe checkout for the exact amount', async () => {
    process.env.PHONEPE_CLIENT_ID = 'id'; process.env.PHONEPE_CLIENT_SECRET = 's'; process.env.PHONEPE_CLIENT_VERSION = '1';
    const bodies: Record<string, unknown>[] = [];
    globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
      if (String(url).includes('oauth')) return new Response(JSON.stringify({ access_token: 't', expires_at: Date.now() / 1000 + 3600 }));
      bodies.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ redirectUrl: 'https://mercury.phonepe.com/x', orderId: 'OMO1' }));
    }) as typeof fetch;
    const { POST } = await import('../../app/api/pay/start/route');
    const res = await POST(new Request('https://bybo.in/api/pay/start', { method: 'POST', body: JSON.stringify({ token: signLink(base) }) }));
    const data = await res.json();
    assert.equal(data.redirectUrl, 'https://mercury.phonepe.com/x');
    assert.equal(bodies[0].amount, 2500000);
    assert.match(String(bodies[0].merchantOrderId), /^bybo_BYBO-TEST-1_/);
  });

  it('refuses a tampered link', async () => {
    process.env.PHONEPE_CLIENT_ID = 'id'; process.env.PHONEPE_CLIENT_SECRET = 's'; process.env.PHONEPE_CLIENT_VERSION = '1';
    const { POST } = await import('../../app/api/pay/start/route');
    const res = await POST(new Request('https://bybo.in/api/pay/start', { method: 'POST', body: JSON.stringify({ token: 'abc.def' }) }));
    assert.equal(res.status, 400);
  });
});
