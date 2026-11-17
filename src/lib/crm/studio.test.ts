import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toCapture } from './studio';

test('a studio sign-up is a warm studio lead', () => {
  const c = toCapture({ kind: 'signup', email: 'A@B.in', studio: 'Motion Studio', how: 'Yes (code entered)' });
  assert.equal(c?.source, 'studio');
  assert.equal(c?.email, 'a@b.in');
  assert.equal(c?.stage, undefined);
  assert.match(c!.event.title, /Motion Studio/);
});

test('a booked call moves the lead to call booked', () => {
  const c = toCapture({ kind: 'call', email: 'a@b.in', topic: 'Custom website build', when: '2026-11-18T06:30:00.000Z', phone: '+91 98765 43210' });
  assert.equal(c?.stage, 'call_booked');
  assert.equal(c?.phone, '+91 98765 43210');
  assert.match(c!.event.title, /Custom website build/);
});

test('a payment is won with its value', () => {
  const c = toCapture({ kind: 'payment', email: 'a@b.in', what: 'Website Studio growth plan (monthly)', amount: 999, ref: 'STUDIO-1' });
  assert.equal(c?.stage, 'won');
  assert.equal(c?.value, 999);
});

test('picking a studio adds their number', () => {
  const c = toCapture({ kind: 'picked', email: 'a@b.in', studio: 'Website Studio', phone: '+919876543210', setup: 'Yes' });
  assert.equal(c?.phone, '+919876543210');
  assert.match(c!.event.title, /Website Studio/);
});

test('a replay keeps its real time and is marked as one', () => {
  const c = toCapture({ kind: 'call', email: 'a@b.in', topic: 'Custom website build', when: '2026-11-18T06:30:00.000Z', at: '2026-11-10T05:00:00.000Z', backfill: true });
  assert.equal(c?.created_at, '2026-11-10T05:00:00.000Z');
  assert.equal(c?.backfill, true);
  assert.equal(toCapture({ kind: 'signup', email: 'a@b.in' })?.backfill, undefined);
});

test('bad reports are refused', () => {
  assert.equal(toCapture({ kind: 'signup', email: 'nope' }), null);
  assert.equal(toCapture({ kind: 'call', email: 'a@b.in', when: 'soon' }), null);
  assert.equal(toCapture({ kind: 'other', email: 'a@b.in' }), null);
});
