import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { enquirySpamReason, phoneDigits } from './enquiry-spam';

const TEMPLATE = `Dear Team,

I'm Chloe Anderson, Director of Marketing & Communications at Lunora Diamond Studio, a jewelry brand specializing in handcrafted engagement rings, wedding bands, unique diamonds, gemstones, and custom fine jewelry.

We're currently selecting a certified Google Premier Partner to manage and scale our Google Ads portfolio across Search, Performance Max, and Shopping, with a focus on increasing online jewelry sales, improving ROAS, and reaching more customers looking for engagement rings, wedding jewelry, and personalized designs.`;

describe('enquirySpamReason', () => {
  it('normalises the blocked US number in common formats', () => {
    assert.equal(phoneDigits('+1 801 204 4681'), '18012044681');
    for (const phone of ['+18012044681', '+1 801 204 4681', '18012044681', '801-204-4681', '(801) 204-4681']) {
      assert.equal(enquirySpamReason({ phone, message: 'We have a recurring invoice delay.' }), 'blocked_phone', phone);
    }
  });

  it('drops the Google Premier Partner template even with a clean phone', () => {
    assert.equal(
      enquirySpamReason({
        name: 'William Hayes',
        email: 'william.hayes@willowhousehotel.com',
        company: 'Willow House Hotel',
        phone: '+44 20 7946 0958',
        message: TEMPLATE.replace('Chloe Anderson', 'William Hayes').replace('Lunora Diamond Studio', 'Willow House Hotel'),
      }),
      'spam_template',
    );
  });

  it('lets a genuine Indian enquiry through', () => {
    assert.equal(
      enquirySpamReason({
        name: 'Priya Sharma',
        email: 'priya@example.com',
        company: 'Example Stores',
        phone: '+91 98765 43210',
        message: 'A recurring invoice that waits a week.',
        role: 'Founder',
      }),
      null,
    );
  });

  it('does not treat a marketing director role as spam on its own', () => {
    assert.equal(
      enquirySpamReason({
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91 98765 43210',
        role: 'Director of Marketing & Communications',
        message: 'We want a site that answers WhatsApp enquiries after hours.',
      }),
      null,
    );
  });
});
