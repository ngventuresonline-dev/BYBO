import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isWithinCallingHours, istDate, nextRetryStart, nextWindowStart } from './hours';

const SAT_0959 = new Date('2026-10-31T04:29:00.000Z');
const SAT_1000 = new Date('2026-10-31T04:30:00.000Z');
const SAT_1930 = new Date('2026-10-31T14:00:00.000Z');
const SAT_1931 = new Date('2026-10-31T14:01:00.000Z');
const SUN_1130 = new Date('2026-11-01T06:00:00.000Z');
const MON_1000 = new Date('2026-11-02T04:30:00.000Z');

describe('calling hours in IST', () => {
  it('is open Monday to Saturday from 10:00 through 19:30 inclusive', () => {
    assert.equal(isWithinCallingHours(SAT_0959), false);
    assert.equal(isWithinCallingHours(SAT_1000), true);
    assert.equal(isWithinCallingHours(SAT_1930), true);
    assert.equal(isWithinCallingHours(SAT_1931), false);
    assert.equal(istDate(SAT_1000), '2026-10-31');
  });

  it('is closed all Sunday', () => {
    assert.equal(isWithinCallingHours(SUN_1130), false);
  });

  it('queues to the next open, skipping Sunday', () => {
    assert.equal(nextWindowStart(SAT_0959).toISOString(), SAT_1000.toISOString());
    assert.equal(nextWindowStart(SAT_1931).toISOString(), MON_1000.toISOString());
    assert.equal(nextWindowStart(SUN_1130).toISOString(), MON_1000.toISOString());
  });

  it('schedules a retry on the next calling day, not later today', () => {
    assert.equal(nextRetryStart(SAT_1000).toISOString(), MON_1000.toISOString());
    assert.equal(nextRetryStart(new Date('2026-10-30T06:00:00.000Z')).toISOString(), SAT_1000.toISOString());
  });

  it('falls back to 10:00–19:30 when the window is unusable', () => {
    assert.equal(isWithinCallingHours(SAT_1000, 'nope', '19:30'), true);
    assert.equal(isWithinCallingHours(SAT_0959, '19:30', '10:00'), false);
  });
});
