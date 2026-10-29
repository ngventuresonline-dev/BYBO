import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Signed payment details, no database: who is paying, for what and how much,
 * signed with PAYMENTS_LINK_SECRET and carried in PhonePe's return URL, so the
 * result page can check PhonePe's confirmed amount against what was asked for.
 */

export type PayLink = {
  id: string;        // invoice or reference, e.g. BYBO-2026-014
  name: string;
  email: string;
  phone: string;
  company: string;
  purpose: string;
  amount: number;    // rupees
  exp: number;       // unix seconds
};

export const MIN_INR = 1;
export const MAX_INR = 5_000_000;

const b64 = (s: string) => Buffer.from(s).toString('base64url');
const sign = (body: string, secret: string) => createHmac('sha256', secret).update(body).digest('base64url');

export const linksConfigured = () => (process.env.PAYMENTS_LINK_SECRET?.length ?? 0) >= 16;

export function signLink(link: PayLink) {
  const secret = process.env.PAYMENTS_LINK_SECRET!;
  const body = b64(JSON.stringify(link));
  return `${body}.${sign(body, secret)}`;
}

export function readLink(token: string): PayLink | null {
  const secret = process.env.PAYMENTS_LINK_SECRET;
  if (!secret || secret.length < 16) return null;
  const [body, mac] = token.split('.');
  if (!body || !mac) return null;
  const expected = Buffer.from(sign(body, secret));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const link = JSON.parse(Buffer.from(body, 'base64url').toString()) as PayLink;
    if (!(link.amount >= MIN_INR && link.amount <= MAX_INR) || link.exp < Date.now() / 1000) return null;
    return link;
  } catch {
    return null;
  }
}

export const inr = (n: number) => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
