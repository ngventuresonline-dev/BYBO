import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { normalizePhone } from './phone';

describe('normalizePhone', () => {
  it('prefixes a 10-digit Indian mobile with +91', () => {
    assert.equal(normalizePhone('9686613899'), '+919686613899');
    assert.equal(normalizePhone('09686613899'), '+919686613899');
    assert.equal(normalizePhone('919686613899'), '+919686613899');
  });

  it('strips spaces, punctuation and a Meta p: prefix', () => {
    assert.equal(normalizePhone('+91 96866 13899'), '+919686613899');
    assert.equal(normalizePhone('p:+919686613899'), '+919686613899');
    assert.equal(normalizePhone('P:+91 96866-13899'), '+919686613899');
    assert.equal(normalizePhone('tel:+919686613899'), '+919686613899');
  });

  it('keeps an explicit international number', () => {
    assert.equal(normalizePhone('+1 (415) 555-2671'), '+14155552671');
  });

  it('rejects values that cannot be dialled', () => {
    assert.equal(normalizePhone(''), null);
    assert.equal(normalizePhone('12345'), null);
    assert.equal(normalizePhone('abcdefghij'), null);
    assert.equal(normalizePhone('++919686613899'), null);
    assert.equal(normalizePhone('5123456789'), null);
  });
});
