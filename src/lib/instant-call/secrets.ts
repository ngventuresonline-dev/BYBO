import { createHash, timingSafeEqual } from 'node:crypto';

/** Compare secrets without leaking the length. */
export function safeEqual(a: string, b: string): boolean {
  const left = createHash('sha256').update(a).digest();
  const right = createHash('sha256').update(b).digest();
  return timingSafeEqual(left, right);
}

export function bearerAuthorized(header: string | null, secret: string | undefined): boolean {
  if (!secret) return false;
  return safeEqual(header ?? '', `Bearer ${secret}`);
}
