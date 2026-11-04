import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { invite, type Booking } from './booking';

const b: Booking = { slot: '2026-11-04T05:30:00.000Z', name: 'Kamat', email: 'lead@example.com', phone: '+910000000000', company: 'Kamat Sarees', need: 'Website', summary: '', page: '', transcript: [] };

describe('booking invite', () => {
  const att = invite(b, new Date(b.slot), ['team@example.com']);
  const ics = Buffer.from(att.content, 'base64').toString('utf8');

  it('is a real invitation the calendar adds on its own', () => {
    assert.match(ics, /METHOD:REQUEST/);
    assert.match(att.content_type, /method=REQUEST/);
    assert.match(ics, /ATTENDEE;[^\r\n]*mailto:team@example\.com/);
  });

  it('carries reminders 30 and 10 minutes before', () => {
    assert.match(ics, /TRIGGER:-PT30M/);
    assert.match(ics, /TRIGGER:-PT10M/);
  });

  it('starts at the slot and uses CRLF lines', () => {
    assert.match(ics, /DTSTART:20261104T053000Z/);
    assert.ok(ics.includes('\r\nEND:VCALENDAR'));
  });
});
