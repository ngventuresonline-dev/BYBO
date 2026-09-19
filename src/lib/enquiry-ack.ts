import { ENQUIRY_INBOXES } from './site';
import { siteUrl } from './seo';

/** Published Resend template for the visitor acknowledgement. */
export const ACK_TEMPLATE = 'bybo-enquiry-ack';

/**
 * Phrase spliced after "Thank you for writing to BYBO" in the template.
 * Empty when the visitor has not named a system.
 */
export function topicLine(services: string[]): string {
  const named = services.filter((s) => s && !/^not sure/i.test(s));
  if (named.length === 0) return '';
  if (named.length === 1) return ` about ${named[0]}`;
  if (named.length === 2) return ` about ${named[0]} and ${named[1]}`;
  return ` about ${named.slice(0, -1).join(', ')} and ${named[named.length - 1]}`;
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

/**
 * Team recipients for the enquiry itself.
 * Always includes the Gmail inboxes in ENQUIRY_INBOXES; ENQUIRY_TO may add more
 * (comma-separated). support@bybo.in is From-only and is never a recipient.
 * The visitor acknowledgement does not use this list.
 */
const NO_RECEIVE_MAILBOX = new Set(['support@bybo.in']);

export function teamRecipients(env = process.env.ENQUIRY_TO): string[] {
  const extra = (env ?? '')
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => s.includes('@'));
  const seen = new Set<string>();
  const to: string[] = [];
  for (const address of [...ENQUIRY_INBOXES, ...extra]) {
    const key = address.toLowerCase();
    if (seen.has(key) || NO_RECEIVE_MAILBOX.has(key)) continue;
    seen.add(key);
    to.push(address);
  }
  return to;
}

export function visitorAck(name: string, services: string[]) {
  const given = firstName(name);
  return {
    subject: `We have your note, ${given}`,
    template: {
      id: ACK_TEMPLATE,
      variables: {
        TOPIC_LINE: topicLine(services),
        CTA_URL: siteUrl('/apply'),
      },
    },
  };
}
