import { createHmac } from 'node:crypto';
import { bearerAuthorized, safeEqual } from '@/lib/instant-call/secrets';

export const ADMIN_COOKIE = 'bybo_ig_admin';

/** Cookie value is an HMAC of a fixed label. It is not the secret itself. */
export function adminSessionValue(secret: string): string {
  return createHmac('sha256', secret).update('bybo-instagram-admin-v1').digest('base64url');
}

export function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const separator = part.indexOf('=');
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}

export function adminAuthorized(request: Request, env: NodeJS.ProcessEnv = process.env): boolean {
  const secret = env.CRON_SECRET;
  if (!secret) return false;
  if (bearerAuthorized(request.headers.get('authorization'), secret)) return true;
  const cookie = readCookie(request.headers.get('cookie'), ADMIN_COOKIE);
  if (!cookie) return false;
  return safeEqual(cookie, adminSessionValue(secret));
}
