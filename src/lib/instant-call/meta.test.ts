import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { mapMetaExport, mapMetaFields, metaLeadSource } from './meta';

describe('Meta field mapping', () => {
  it('maps the current lead form, including the p: phone prefix', () => {
    const mapped = mapMetaFields({
      first_name: 'Priya',
      email_address: 'priya@example.com',
      phone_number: 'p:+919686613899',
      'the_site_needs_to…': 'get_more_enquiries',
      'please_tell_us_your_business_name_and_its_core_purpose.': 'We sell spices',
    }, {
      id: '999',
      ad_name: 'Summer',
      adset_name: 'Lookalike',
      campaign_name: 'Launch',
      form_name: 'Website',
      platform: 'ig',
    });
    assert.equal(mapped.externalId, '999');
    assert.equal(mapped.name, 'Priya');
    assert.equal(mapped.email, 'priya@example.com');
    assert.equal(mapped.phoneRaw, '+919686613899');
    assert.equal(mapped.business, 'We sell spices');
    assert.match(mapped.enquiry, /get_more_enquiries/);
    assert.equal(metaLeadSource(mapped.platform), 'our Instagram form');
    assert.equal((mapped.raw.meta as { ad_name: string }).ad_name, 'Summer');
    assert.equal((mapped.raw.fields as Record<string, string>).phone_number, 'p:+919686613899');
  });

  it('still maps renamed fields and keeps the raw bag', () => {
    const mapped = mapMetaFields({
      full_name: 'Asha Rao',
      email: 'asha@example.com',
      mobile_number: '9686613899',
      what_should_the_site_do: 'Take bookings',
    }, { id: '42', platform: 'fb', campaign_name: 'Retarget' });
    assert.equal(mapped.name, 'Asha Rao');
    assert.equal(mapped.phoneRaw, '9686613899');
    assert.match(mapped.enquiry, /Take bookings/);
    assert.equal(metaLeadSource('fb'), 'our Facebook form');
    assert.equal((mapped.raw.fields as Record<string, string>).what_should_the_site_do, 'Take bookings');
  });

  it('reads a UTF-16 tab-separated Leads Center export', () => {
    const tsv = [
      'id\tfirst_name\temail_address\tphone_number\tad_name\tplatform',
      '55\tPriya\tpriya@example.com\tp:+919686613899\tSummer\tig',
      '56\tAsha\tasha@example.com\t9686613899\tSummer\tfb',
    ].join('\n');
    const bytes = Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(tsv, 'utf16le')]);
    const rows = mapMetaExport(bytes);
    assert.equal(rows.length, 2);
    assert.equal(rows[0]?.externalId, '55');
    assert.equal(rows[0]?.phoneRaw, '+919686613899');
    assert.equal(rows[1]?.externalId, '56');
    assert.equal((rows[0]?.raw.meta as { ad_name: string }).ad_name, 'Summer');
  });
});
