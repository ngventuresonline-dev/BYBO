import { normalizePhone } from './phone';

/** The only number that may be dialled until someone sets a wider allowlist. */
export const DEFAULT_ALLOWLIST_NUMBER = '+919686613899';

export type AllowlistDecision = {
  /** True when the value is exactly `*` after trimming: any normalised phone may be dialled. */
  open: boolean;
  closed: boolean;
  numbers: string[];
};

/**
 * Unset → only the default test number.
 * Trimmed value exactly `*` → open to every number normalizePhone accepts.
 * Set but empty, or any token that is not a phone → dial nobody.
 * A single bad token fails the whole list. It does not fall back to the default.
 * `*` only means open when it is the entire value. Consent, the switch, dry-run,
 * calling hours and the one-claim-per-day lock still apply outside this check.
 */
export function parseAllowlist(raw: string | undefined): AllowlistDecision {
  if (raw === undefined) return { open: false, closed: false, numbers: [DEFAULT_ALLOWLIST_NUMBER] };
  const trimmed = raw.trim();
  if (trimmed === '*') return { open: true, closed: false, numbers: [] };
  const tokens = trimmed.split(',').map((token) => token.trim()).filter(Boolean);
  if (tokens.length === 0) return { open: false, closed: true, numbers: [] };
  const numbers: string[] = [];
  for (const token of tokens) {
    const phone = normalizePhone(token);
    if (!phone) return { open: false, closed: true, numbers: [] };
    numbers.push(phone);
  }
  return { open: false, closed: false, numbers };
}

export function allowlistAllows(raw: string | undefined, phone: string | null): boolean {
  if (!phone) return false;
  const decision = parseAllowlist(raw);
  if (decision.open) return normalizePhone(phone) !== null;
  return decision.numbers.includes(phone);
}
