import { createHash } from 'node:crypto';

/** sha256 of the E.164 number. Blob paths use this so the key is not the phone. */
export function phoneHash(e164: string): string {
  return createHash('sha256').update(e164).digest('hex');
}

/**
 * Normalise a visitor or Meta phone to E.164.
 * Numbers without a country code are treated as Indian mobiles (+91).
 * Returns null when the value cannot be dialled.
 */
export function normalizePhone(input: string | null | undefined): string | null {
  if (!input) return null;
  let s = input.trim().replace(/^tel:/i, '').replace(/^p:/i, '').trim();
  s = s.replace(/[\s().-]/g, '');
  if (!s) return null;
  if (s.startsWith('00')) s = `+${s.slice(2)}`;

  if (s.startsWith('+')) {
    const digits = s.slice(1);
    if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
    return `+${digits}`;
  }

  if (!/^\d+$/.test(s)) return null;
  if (s.length === 10 && /^[6-9]/.test(s)) return `+91${s}`;
  if (s.length === 11 && s.startsWith('0') && /^[6-9]/.test(s.slice(1))) return `+91${s.slice(1)}`;
  if (s.length === 12 && s.startsWith('91') && /^[6-9]/.test(s.slice(2))) return `+${s}`;
  return null;
}
