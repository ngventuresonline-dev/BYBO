import { normalizePhone } from './phone';

/** The only number that may be dialled until someone sets a wider allowlist. */
export const DEFAULT_ALLOWLIST_NUMBER = '+919686613899';

export type AllowlistDecision = {
  closed: boolean;
  numbers: string[];
};

/**
 * Unset → only the default test number.
 * Set but empty, or any token that is not a phone → dial nobody.
 * A single bad token fails the whole list. It does not fall back to the default.
 */
export function parseAllowlist(raw: string | undefined): AllowlistDecision {
  if (raw === undefined) return { closed: false, numbers: [DEFAULT_ALLOWLIST_NUMBER] };
  const tokens = raw.split(',').map((token) => token.trim()).filter(Boolean);
  if (tokens.length === 0) return { closed: true, numbers: [] };
  const numbers: string[] = [];
  for (const token of tokens) {
    const phone = normalizePhone(token);
    if (!phone) return { closed: true, numbers: [] };
    numbers.push(phone);
  }
  return { closed: false, numbers };
}

export function allowlistAllows(raw: string | undefined, phone: string | null): boolean {
  if (!phone) return false;
  return parseAllowlist(raw).numbers.includes(phone);
}
