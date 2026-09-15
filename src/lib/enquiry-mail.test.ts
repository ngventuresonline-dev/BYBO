import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { EMAIL, escapeHtml } from './email-layout';
import { teamEnquiry, visitorAckFallback } from './enquiry-mail';

const sample = {
  name: 'Priya Sharma',
  email: 'priya@example.com',
  company: 'North Wind',
  phone: '+91 90000 00000',
  services: ['Customer & Workforce AI'],
  industry: 'Logistics',
  role: 'Founder',
  website: 'https://northwind.example',
  message: 'Invoices wait a week.\nThen someone chases.',
};

describe('escapeHtml', () => {
  it('neutralises markup in visitor-supplied fields', () => {
    assert.equal(escapeHtml('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;');
  });
});

describe('teamEnquiry', () => {
  it('sends a branded HTML body with a text fallback', () => {
    const mail = teamEnquiry(sample);
    assert.equal(mail.subject, 'Enquiry from Priya Sharma — Customer & Workforce AI');
    assert.match(mail.html, /#111116/);
    assert.match(mail.html, /#f5f4f0/);
    assert.match(mail.html, /#793cff/);
    assert.match(mail.html, /Georgia/);
    assert.match(mail.html, /BYBO<span style="color:#b794ff;">\.<\/span>/);
    assert.match(mail.html, /reference-enquiry\.webp/);
    assert.match(mail.html, /Priya Sharma/);
    assert.match(mail.html, /North Wind/);
    assert.match(mail.html, /Invoices wait a week\.<br>Then someone chases\./);
    assert.match(mail.html, /support@bybo\.in/);
    assert.match(mail.html, /\+91 63643 54899/);
    assert.match(mail.text, /Name: Priya Sharma/);
    assert.match(mail.text, /Invoices wait a week\./);
    assert.match(mail.text, /support@bybo\.in/);
    assert.equal(mail.html.includes(EMAIL.creative), true);
  });

  it('escapes a hostile name in the HTML', () => {
    const mail = teamEnquiry({ ...sample, name: '<script>alert(1)</script>' });
    assert.equal(mail.html.includes('<script>'), false);
    assert.match(mail.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  });
});

describe('visitorAckFallback', () => {
  it('is themed HTML, not text-only', () => {
    const mail = visitorAckFallback('Priya Sharma', ['Customer & Workforce AI']);
    assert.equal(mail.subject, 'We have your note, Priya');
    assert.match(mail.html, /We have your note, Priya/);
    assert.match(mail.html, /about Customer &amp; Workforce AI/);
    assert.match(mail.html, /#111116/);
    assert.match(mail.html, /Georgia/);
    assert.match(mail.text, /Thank you for writing to BYBO about Customer & Workforce AI/);
  });
});
