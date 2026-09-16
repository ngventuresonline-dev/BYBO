import { CONTACT } from './site';
import { brandedEmail, brandedEmailText, EMAIL, escapeHtml, escapeMultiline } from './email-layout';
import { firstName, topicLine } from './enquiry-ack';

export type EnquiryDetails = {
  name: string;
  email: string;
  company: string;
  phone: string;
  services: string[];
  industry: string;
  role: string;
  website: string;
  message: string;
};

function interest(services: string[]): string {
  return services.length ? services.join(', ') : 'Not sure yet';
}

function rows(details: EnquiryDetails): Array<[string, string]> {
  return [
    ['Name', details.name],
    ['Work email', details.email],
    ['Company', details.company || 'Not provided'],
    ['Phone', details.phone || 'Not provided'],
    ['Interested in', interest(details.services)],
    ['Industry', details.industry || 'Not provided'],
    ['Role', details.role || 'Not provided'],
    ['Website', details.website || 'Not provided'],
  ];
}

function fieldTable(details: EnquiryDetails): string {
  const items = rows(details);
  const cells = items.map(([label, value], i) => {
    const last = i === items.length - 1;
    const border = last ? '' : `border-bottom:1px solid ${EMAIL.hairline};`;
    return `<tr>
      <td style="padding:12px 16px;${border}">
        <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${EMAIL.mutedInk};">${escapeHtml(label)}</p>
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.45;color:${EMAIL.ink};">${escapeHtml(value)}</p>
      </td>
    </tr>`;
  }).join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL.card}" style="border:1px solid ${EMAIL.line};border-radius:8px;background-color:${EMAIL.card};">
      ${cells}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL.card}" style="margin-top:14px;border:1px solid ${EMAIL.line};border-radius:8px;background-color:${EMAIL.card};">
      <tr>
        <td style="padding:14px 16px;">
          <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${EMAIL.mutedInk};">Message</p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${EMAIL.ink};">${escapeMultiline(details.message)}</p>
        </td>
      </tr>
    </table>`;
}

export function teamEnquiry(details: EnquiryDetails) {
  const given = firstName(details.name);
  const picked = details.services.length
    ? ` — ${details.services[0]}${details.services.length > 1 ? ` +${details.services.length - 1}` : ''}`
    : '';
  const subject = `Enquiry from ${details.name}${picked}`;
  const intro = [
    `A note landed on /apply. Reply to this email to write to ${given}.`,
  ];

  return {
    subject,
    html: brandedEmail({
      title: subject,
      eyebrow: 'New enquiry',
      headline: `A note from ${details.name}.`,
      intro,
      innerHtml: fieldTable(details),
      cta: { href: `mailto:${details.email}`, label: `Reply to ${given}` },
    }),
    text: brandedEmailText({
      headline: `Enquiry from ${details.name}`,
      paragraphs: [`A note landed on /apply. Reply to this email to write to ${given}.`],
      fields: [...rows(details), ['Message', details.message]],
      cta: { href: `mailto:${details.email}`, label: `Reply to ${given}` },
    }),
  };
}

/** Themed fallback if the published Resend template cannot send. */
export function visitorAckFallback(name: string, services: string[]) {
  const given = firstName(name);
  const topic = topicLine(services);
  const subject = `We have your note, ${given}`;
  const paragraphs = [
    `Thank you for writing to BYBO${topic}. A person on the team will review what you sent.`,
    'We reply during Indian business hours. You do not need to repeat the details unless something material has changed.',
  ];

  return {
    subject,
    html: brandedEmail({
      title: subject,
      eyebrow: 'Enquiry received',
      headline: `We have your note, ${given}.`,
      intro: paragraphs,
      innerHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL.card}" style="border:1px solid ${EMAIL.line};border-radius:8px;background-color:${EMAIL.card};">
        <tr><td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;color:${EMAIL.mutedInk};border-bottom:1px solid ${EMAIL.hairline};">01&nbsp;&nbsp;Enquiry captured</td></tr>
        <tr><td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;color:${EMAIL.ink};border-bottom:1px solid ${EMAIL.hairline};"><span style="color:${EMAIL.violet};">02</span>&nbsp;&nbsp;With the team for review</td></tr>
        <tr><td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;color:${EMAIL.muted};">03&nbsp;&nbsp;Reply during business hours</td></tr>
      </table>`,
      cta: { href: 'https://bybo.in/apply', label: 'Add more context' },
    }),
    text: brandedEmailText({
      headline: subject,
      paragraphs: [
        ...paragraphs,
        `If it is urgent, WhatsApp is faster: ${CONTACT.phone}.`,
      ],
      cta: { href: 'https://bybo.in/apply', label: 'Add more context' },
    }),
  };
}
