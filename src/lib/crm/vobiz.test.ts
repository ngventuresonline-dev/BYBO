import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { bridgeXml, verifyAnswer } from './vobiz';

process.env.BYBO_VOBIZ_AUTH_TOKEN = 'secret';

const lead = '2f829ad2-f4af-46ed-ac95-dbd3233ef9c1';
const sig = (l: string, exp: number, key = 'secret') => createHmac('sha256', key).update(`${l}.${exp}`).digest('hex');

test('a signed, unexpired answer URL is accepted', () => {
  const exp = Math.floor(Date.now() / 1000) + 60;
  assert.equal(verifyAnswer(lead, String(exp), sig(lead, exp)), true);
});

test('expired, forged or re-pointed answer URLs are refused', () => {
  const past = Math.floor(Date.now() / 1000) - 1;
  const exp = past + 120;
  assert.equal(verifyAnswer(lead, String(past), sig(lead, past)), false);
  assert.equal(verifyAnswer(lead, String(exp), sig(lead, exp, 'other')), false);
  assert.equal(verifyAnswer('00000000-0000-0000-0000-000000000000', String(exp), sig(lead, exp)), false);
  assert.equal(verifyAnswer(lead, String(exp), 'nope'), false);
});

test('the bridge dials the lead with BYBO’s number as caller ID', () => {
  process.env.BYBO_VOBIZ_NUMBER = '+918012345678';
  const x = bridgeXml('+919686613899');
  assert.match(x, /<Dial callerId="\+918012345678"[^>]*><Number>\+919686613899<\/Number><\/Dial>/);
});
