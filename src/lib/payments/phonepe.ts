/**
 * PhonePe Standard Checkout (v2), server-side only.
 *
 * Same API pattern as Lokazen's integration. Credentials come from the
 * environment and never reach the browser:
 *   PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET (required),
 *   PHONEPE_CLIENT_VERSION (defaults to 1), PHONEPE_SANDBOX ("true" for the test environment).
 *
 * Payment state is always confirmed with PhonePe's status API, never taken
 * from the redirect, so a visitor can't fake a successful payment.
 */

const sandbox = () => process.env.PHONEPE_SANDBOX === 'true';
const baseUrl = () => (sandbox() ? 'https://api-preprod.phonepe.com/apis/pg-sandbox' : 'https://api.phonepe.com/apis/pg');
const authUrl = () => (sandbox() ? 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token' : 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token');

export const phonepeConfigured = () => !!(process.env.PHONEPE_CLIENT_ID?.trim() && process.env.PHONEPE_CLIENT_SECRET?.trim());

let token: string | null = null;
let tokenExpires = 0;

async function accessToken() {
  if (token && Date.now() / 1000 < tokenExpires - 60) return token;
  const params = new URLSearchParams({
    client_id: process.env.PHONEPE_CLIENT_ID!.trim(),
    // PhonePe wants the version as an integer ("1", not "1.0").
    client_version: String(parseInt(process.env.PHONEPE_CLIENT_VERSION?.trim() ?? '1', 10) || 1),
    client_secret: process.env.PHONEPE_CLIENT_SECRET!.trim(),
    grant_type: 'client_credentials',
  });
  const res = await fetch(authUrl(), { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() });
  if (!res.ok) throw new Error(`PhonePe auth failed: ${res.status}`);
  const json = await res.json();
  token = json.access_token as string;
  tokenExpires = json.expires_at || Date.now() / 1000 + 3600;
  return token;
}

export type Order = { merchantOrderId: string; redirectUrl: string };

export async function createOrder(opts: { merchantOrderId: string; amountPaisa: number; message: string; redirectUrl: string; meta: Record<string, string> }): Promise<Order> {
  const metaInfo: Record<string, string> = {};
  Object.values(opts.meta).slice(0, 5).forEach((v, i) => { metaInfo[`udf${i + 1}`] = String(v).slice(0, 256); });
  const res = await fetch(`${baseUrl()}/checkout/v2/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `O-Bearer ${await accessToken()}` },
    body: JSON.stringify({
      merchantOrderId: opts.merchantOrderId,
      amount: opts.amountPaisa,
      expireAfter: 1200,
      metaInfo,
      paymentFlow: { type: 'PG_CHECKOUT', message: opts.message.slice(0, 120), merchantUrls: { redirectUrl: opts.redirectUrl } },
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.redirectUrl) throw new Error(json.message || `PhonePe create failed: ${res.status}`);
  return { merchantOrderId: opts.merchantOrderId, redirectUrl: json.redirectUrl };
}

export type OrderStatus = {
  state: 'PENDING' | 'COMPLETED' | 'FAILED';
  amountPaisa: number;
  transactionId: string | null;
  paymentMode: string | null;
  meta: Record<string, string>;
};

export async function orderStatus(merchantOrderId: string): Promise<OrderStatus | null> {
  const res = await fetch(`${baseUrl()}/checkout/v2/order/${encodeURIComponent(merchantOrderId)}/status?details=false&errorContext=true`, {
    headers: { 'Content-Type': 'application/json', Authorization: `O-Bearer ${await accessToken()}` },
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  if (res.status === 404 || json.code === 'INVALID_MERCHANT_ORDER_ID') return null;
  if (!res.ok) throw new Error(json.message || `PhonePe status failed: ${res.status}`);
  const detail = Array.isArray(json.paymentDetails) ? json.paymentDetails[0] : null;
  return {
    state: json.state === 'COMPLETED' || json.state === 'FAILED' ? json.state : 'PENDING',
    amountPaisa: Number(json.amount) || 0,
    transactionId: detail?.transactionId ?? null,
    paymentMode: detail?.paymentMode ?? null,
    meta: (json.metaInfo && typeof json.metaInfo === 'object') ? json.metaInfo : {},
  };
}
