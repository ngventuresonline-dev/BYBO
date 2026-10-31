import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { allowlistAllows, parseAllowlist } from './allowlist';

describe('instant-call allowlist', () => {
  it('defaults to the single test number when unset', () => {
    assert.equal(allowlistAllows(undefined, '+919686613899'), true);
    assert.equal(allowlistAllows(undefined, '+919000000000'), false);
  });

  it('allows only the numbers that were set', () => {
    const raw = '+919686613899, +1 415 555 2671';
    assert.equal(allowlistAllows(raw, '+919686613899'), true);
    assert.equal(allowlistAllows(raw, '+14155552671'), true);
    assert.equal(allowlistAllows(raw, '+919000000000'), false);
    assert.deepEqual(parseAllowlist(raw).numbers, ['+919686613899', '+14155552671']);
  });

  it('fails closed when the list is empty or unparsable', () => {
    for (const raw of ['', '   ', ',,,', 'not-a-number', '+919686613899,garbage']) {
      const parsed = parseAllowlist(raw);
      assert.equal(parsed.closed, true, raw);
      assert.deepEqual(parsed.numbers, []);
      assert.equal(allowlistAllows(raw, '+919686613899'), false);
    }
  });
});
