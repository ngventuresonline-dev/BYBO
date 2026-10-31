import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { assertCanDial } from './guards';
import { placeOutboundCall } from './dial';
import { dynamicVariables } from './dial';
import { newLead } from './types';

const prod = {
  NODE_ENV: 'production',
  INSTANT_CALL_ENABLED: 'true',
  BYBO_ELEVENLABS_API_KEY: 'test-key',
  BYBO_ELEVENLABS_AGENT_ID: 'agent',
  BYBO_ELEVENLABS_PHONE_NUMBER_ID: 'phnum',
} as NodeJS.ProcessEnv;

const lead = newLead({
  id: 'lead-1',
  source: 'website',
  external_id: null,
  name: 'Priya Sharma',
  email: 'priya@example.com',
  phone_e164: '+919686613899',
  business: 'Spice Co',
  enquiry: 'More enquiries',
  area: '',
  raw: { lead_source: 'the bybo.in website form', lead_brief: 'Priya asked for more enquiries' },
});

afterEach(() => {
  delete process.env.INSTANT_CALL_ENABLED;
  delete process.env.BYBO_ELEVENLABS_API_KEY;
  delete process.env.BYBO_ELEVENLABS_AGENT_ID;
  delete process.env.BYBO_ELEVENLABS_PHONE_NUMBER_ID;
});

describe('dial guards', () => {
  it('allows only a production call that passes every gate', () => {
    assert.doesNotThrow(() => assertCanDial(prod, '+919686613899'));
  });

  it('refuses when the switch is off, dry-run is on, or the number is not listed', () => {
    assert.throws(() => assertCanDial({ ...prod, INSTANT_CALL_ENABLED: 'false' }, '+919686613899'), /switch off/);
    assert.throws(() => assertCanDial({ ...prod, INSTANT_CALL_ENABLED: undefined }, '+919686613899'), /switch off/);
    assert.throws(() => assertCanDial({ ...prod, INSTANT_CALL_DRY_RUN: 'true' }, '+919686613899'), /dry run/);
    assert.throws(() => assertCanDial(prod, '+919000000000'), /allowlist/);
    assert.throws(() => assertCanDial({ ...prod, INSTANT_CALL_ALLOWLIST: '' }, '+919686613899'), /allowlist/);
    assert.throws(() => assertCanDial({ ...prod, INSTANT_CALL_ALLOWLIST: 'nope' }, '+919686613899'), /allowlist/);
    assert.throws(() => assertCanDial({ ...prod, NODE_ENV: 'development' }, '+919686613899'), /non-production/);
  });

  it('passes lead_id and the brief to ElevenLabs', () => {
    const vars = dynamicVariables(lead);
    assert.equal(vars.lead_id, 'lead-1');
    assert.equal(vars.first_name, 'Priya');
    assert.equal(vars.business_name, 'Spice Co');
    assert.equal(vars.email, 'priya@example.com');
    assert.equal(vars.lead_source, 'the bybo.in website form');
    assert.match(vars.lead_brief, /Priya/);
  });

  it('does not call ElevenLabs from the test runner', async () => {
    let called = false;
    const original = globalThis.fetch;
    globalThis.fetch = (async () => {
      called = true;
      return new Response('{}', { status: 200 });
    }) as typeof fetch;
    process.env.INSTANT_CALL_ENABLED = 'true';
    process.env.BYBO_ELEVENLABS_API_KEY = 'test-key';
    process.env.BYBO_ELEVENLABS_AGENT_ID = 'agent';
    process.env.BYBO_ELEVENLABS_PHONE_NUMBER_ID = 'phnum';
    await assert.rejects(() => placeOutboundCall(lead), /non-production/);
    assert.equal(called, false);
    globalThis.fetch = original;
  });
});
