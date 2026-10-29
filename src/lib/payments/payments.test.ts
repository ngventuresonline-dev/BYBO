import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';
import { readLink, signLink, type PayLink } from './link';

const originalFetch = globalThis.fetch;
const base: PayLink = { id: 'BYBO-TEST-1', name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543210', company: 'Acme', purpose: 'Blueprint', amount: 15000, exp: Math.floor(Date.now() / 1000) + 3600 };

beforeEach(() => {
  process.env.PAYMENTS_LINK_SECRET = 'test-secret-0123456789';
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const k of ['PAYMENTS_LINK_SECRET', 'PHONEPE_CLIENT_ID', 'PHONEPE_CLIENT_SECRET', 'PHONEPE_CLIENT_VERSION']) delete process.env[k];
});

describe('signed payment details', () => {
  it('round-trips', () => {
    assert.deepEqual(readLink(signLink(base)), base);
  });

  it('rejects a changed amount', () => {
    const [body, mac] = signLink(base).split('.');
    const forged = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(body, 'base64url').toString()), amount: 1 })).toString('base64url');
    assert.equal(readLink(`${forged}.${mac}`), null);
  });

  it('rejects expired details', () => {
    assert.equal(readLink(signLink({ ...base, exp: Math.floor(Date.now() / 1000) - 1 })), null);
  });
});

describe('POST /api/pay/checkout', () => {
  const bodies: Record<string, unknown>[] = [];
  const phonepe = () => {
    process.env.PHONEPE_CLIENT_ID = 'id'; process.env.PHONEPE_CLIENT_SECRET = 's'; process.env.PHONEPE_CLIENT_VERSION = '1';
    bodies.length = 0;
    globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
      if (String(url).includes('oauth')) return new Response(JSON.stringify({ access_token: 't', expires_at: Date.now() / 1000 + 3600 }));
      bodies.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ redirectUrl: 'https://mercury.phonepe.com/x', orderId: 'OMO1' }));
    }) as typeof fetch;
  };
  let n = 0;
  const req = (body: object) => new Request('https://bybo.in/api/pay/checkout', { method: 'POST', headers: { 'x-forwarded-for': `2.2.2.${n++}` }, body: JSON.stringify(body) });
  const buyer = { name: 'Priya', email: 'priya@example.com', phone: '9876543210' };

  it('charges the Blueprint at the catalogue price, whatever the browser sends', async () => {
    phonepe();
    const { POST } = await import('../../app/api/pay/checkout/route');
    const data = await (await POST(req({ ...buyer, product: 'blueprint', amount: 1 }))).json();
    assert.equal(data.redirectUrl, 'https://mercury.phonepe.com/x');
    assert.equal(bodies[0].amount, 1500000);
  });

  it('charges a custom invoice amount', async () => {
    phonepe();
    const { POST } = await import('../../app/api/pay/checkout/route');
    await POST(req({ ...buyer, amount: '42000.5', purpose: 'Milestone 1' }));
    assert.equal(bodies[0].amount, 4200050);
  });

  it('rejects a missing phone number', async () => {
    phonepe();
    const { POST } = await import('../../app/api/pay/checkout/route');
    const res = await POST(req({ ...buyer, phone: '', product: 'blueprint' }));
    assert.equal(res.status, 400);
  });

  it('says not_configured without PhonePe credentials', async () => {
    const { POST } = await import('../../app/api/pay/checkout/route');
    const res = await POST(req({ ...buyer, product: 'blueprint' }));
    assert.equal(res.status, 503);
  });
});
