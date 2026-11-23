/**
 * Server-side drop list for the /apply enquiry form.
 *
 * Known campaign (23 Nov 2026): the same US number and a "certified Google
 * Premier Partner" pitch were submitted twice under different names. A hit
 * returns a normal success response so the sender is not taught to adapt,
 * and no team alert or visitor acknowledgement is sent.
 */

export type EnquirySpamInput = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  role?: string;
  website?: string;
  industry?: string;
};

export type EnquirySpamReason = 'blocked_phone' | 'spam_template';

/** 10-digit national form of +1 801 204 4681, used on both fake leads. */
const BLOCKED_PHONE_TAILS = ['8012044681'];

/** Distinctive wording from the repeated Google Ads agency pitch. */
const TEMPLATE_MARKERS = ['google premier partner'];

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function enquirySpamReason(input: EnquirySpamInput): EnquirySpamReason | null {
  const digits = phoneDigits(input.phone ?? '');
  if (digits.length >= 10 && BLOCKED_PHONE_TAILS.some((tail) => digits.endsWith(tail))) {
    return 'blocked_phone';
  }

  const haystack = [
    input.message,
    input.role,
    input.company,
    input.email,
    input.name,
    input.website,
    input.industry,
  ]
    .filter(Boolean)
    .join('\n')
    .toLowerCase();

  if (TEMPLATE_MARKERS.some((marker) => haystack.includes(marker))) {
    return 'spam_template';
  }

  return null;
}
