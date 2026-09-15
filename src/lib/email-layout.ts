import { CONTACT } from './site';
import { SITE, siteUrl } from './seo';

/** Tokens from bybo.in — inline only; email clients ignore stylesheets. */
export const EMAIL = {
  ink: '#111116',
  paper: '#f5f4f0',
  muted: '#b9b7c3',
  mutedInk: '#5b5862',
  violet: '#793cff',
  violetLight: '#b794ff',
  violetDeep: '#6532c7',
  card: '#ffffff',
  line: '#e6e2ea',
  hairline: '#eeeaf0',
  creative: siteUrl('/images/reference-enquiry.webp'),
} as const;

const BODY = "font-family:Arial,Helvetica,sans-serif";
const DISPLAY = "font-family:Georgia,'Times New Roman',serif";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n|\n|\r/g, '<br>');
}

export function brandedEmail(opts: {
  title: string;
  eyebrow: string;
  headline: string;
  intro: string[];
  innerHtml?: string;
  cta?: { href: string; label: string };
}): string {
  const intro = opts.intro
    .map((p) => `<p style="margin:0 0 16px 0;${BODY};font-size:16px;line-height:1.65;color:${EMAIL.mutedInk};">${escapeHtml(p)}</p>`)
    .join('');
  const cta = opts.cta
    ? `<table cellpadding="0" cellspacing="0" border="0"><tr>
        <td bgcolor="${EMAIL.violet}" style="background-color:${EMAIL.violet};border-radius:6px;">
          <a href="${escapeHtml(opts.cta.href)}" style="display:inline-block;padding:13px 18px;${BODY};font-size:14px;font-weight:500;line-height:1.35;color:#ffffff;text-decoration:none;">${escapeHtml(opts.cta.label)}&nbsp;&nbsp;&#8594;</a>
        </td>
      </tr></table>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL.ink};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${EMAIL.ink}" style="background-color:${EMAIL.ink};padding-top:32px;padding-bottom:40px;">
  <tr>
    <td align="center" style="padding-left:16px;padding-right:16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
        <tr>
          <td style="padding:4px 4px 18px 4px;">
            <p style="margin:0;${BODY};font-size:28px;font-weight:600;letter-spacing:-0.04em;line-height:1.2;color:${EMAIL.paper};">BYBO<span style="color:${EMAIL.violetLight};">.</span></p>
            <p style="margin:8px 0 0 0;${BODY};font-size:12px;line-height:1.4;color:${EMAIL.muted};">Built around your business.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <img src="${EMAIL.creative}" width="600" height="220" alt="BYBO enquiry" border="0" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:10px 10px 0 0;">
          </td>
        </tr>
        <tr>
          <td bgcolor="${EMAIL.paper}" style="background-color:${EMAIL.paper};padding:36px 36px 8px 36px;">
            <p style="margin:0 0 14px 0;${BODY};font-size:12px;font-weight:500;letter-spacing:0.115em;text-transform:uppercase;color:${EMAIL.violetDeep};">${escapeHtml(opts.eyebrow)}</p>
            <h1 style="margin:0 0 18px 0;${DISPLAY};font-size:32px;font-weight:400;letter-spacing:-0.03em;line-height:1.12;color:${EMAIL.ink};">${escapeHtml(opts.headline)}</h1>
            ${intro}
          </td>
        </tr>
        ${opts.innerHtml ? `<tr><td bgcolor="${EMAIL.paper}" style="background-color:${EMAIL.paper};padding:8px 36px 28px 36px;">${opts.innerHtml}</td></tr>` : ''}
        <tr>
          <td bgcolor="${EMAIL.paper}" style="background-color:${EMAIL.paper};padding:0 36px 40px 36px;border-radius:0 0 10px 10px;">
            ${cta}
          </td>
        </tr>
        <tr>
          <td style="padding:28px 8px 8px 8px;border-top:1px solid #ffffff14;">
            <p style="margin:0 0 10px 0;${DISPLAY};font-size:20px;font-weight:400;letter-spacing:-0.03em;line-height:1.2;color:${EMAIL.paper};">Bring one workflow. We will tell you whether it is worth building.</p>
            <p style="margin:0 0 18px 0;${BODY};font-size:13px;line-height:1.6;color:#cfc6dc;">The first conversation is free — about your work, not a demo.</p>
            <p style="margin:0 0 8px 0;${BODY};font-size:13px;line-height:1.6;color:${EMAIL.muted};">BYBO · ${escapeHtml(CONTACT.city)}</p>
            <p style="margin:0 0 8px 0;${BODY};font-size:13px;line-height:1.6;color:${EMAIL.muted};">
              <a href="${escapeHtml(CONTACT.emailHref)}" style="color:#c7aeff;text-decoration:none;">${escapeHtml(CONTACT.email)}</a>
              &nbsp;·&nbsp;
              <a href="tel:${escapeHtml(CONTACT.phoneHref)}" style="color:${EMAIL.muted};text-decoration:none;">${escapeHtml(CONTACT.phone)}</a>
            </p>
            <p style="margin:0;${BODY};font-size:13px;line-height:1.6;">
              <a href="${escapeHtml(SITE.url)}" style="color:#c7aeff;text-decoration:none;">bybo.in</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function brandedEmailText(opts: {
  headline: string;
  paragraphs: string[];
  fields?: Array<[string, string]>;
  cta?: { href: string; label: string };
}): string {
  const fields = opts.fields?.length
    ? ['', ...opts.fields.map(([k, v]) => `${k}: ${v}`), '']
    : [''];
  const cta = opts.cta ? [`${opts.cta.label}: ${opts.cta.href}`, ''] : [];
  return [
    opts.headline,
    '',
    ...opts.paragraphs,
    ...fields,
    ...cta,
    `BYBO · ${CONTACT.city} · ${CONTACT.email} · ${CONTACT.phone}`,
    SITE.url,
  ].join('\n');
}
