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
