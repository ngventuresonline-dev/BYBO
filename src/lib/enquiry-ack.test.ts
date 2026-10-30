import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ACK_TEMPLATE, firstName, teamRecipients, topicLine, visitorAck } from './enquiry-ack';

describe('firstName', () => {
  it('takes the first word', () => {
    assert.equal(firstName('Priya Sharma'), 'Priya');
  });
  it('keeps a single name', () => {
    assert.equal(firstName('Priya'), 'Priya');
  });
});

describe('topicLine', () => {
  it('is empty when nothing useful was picked', () => {
    assert.equal(topicLine([]), '');
    assert.equal(topicLine(['Not sure — help me choose']), '');
    assert.equal(topicLine(['Not sure yet']), '');
  });
  it('names one system', () => {
    assert.equal(topicLine(['Customer & Workforce AI']), ' about Customer & Workforce AI');
  });
  it('joins two systems', () => {
    assert.equal(
      topicLine(['Customer & Workforce AI', 'Decision Intelligence']),
      ' about Customer & Workforce AI and Decision Intelligence',
    );
  });
  it('joins three with a comma', () => {
    assert.equal(
      topicLine(['A', 'B', 'C']),
      ' about A, B and C',
    );
  });
  it('drops the unsure chip when mixed with a named system', () => {
    assert.equal(topicLine(['Not sure yet', 'Website Design & Development']), ' about Website Design & Development');
  });
});

describe('teamRecipients', () => {
  it('always includes the two Gmail inboxes', () => {
    assert.deepEqual(teamRecipients(''), [
      'byboonline@gmail.com',
      'ngventuresonline@gmail.com',
    ]);
  });
  it('drops support@ even when the env lists only that address', () => {
    assert.deepEqual(teamRecipients('support@bybo.in'), [
      'byboonline@gmail.com',
      'ngventuresonline@gmail.com',
    ]);
  });
  it('adds extra addresses from a comma-separated env', () => {
    assert.deepEqual(teamRecipients('support@bybo.in, ops@bybo.in'), [
      'byboonline@gmail.com',
      'ngventuresonline@gmail.com',
      'ops@bybo.in',
    ]);
  });
  it('dedupes case-insensitively and still drops support@', () => {
    assert.deepEqual(teamRecipients('Support@bybo.in, BYBOONLINE@gmail.com'), [
      'byboonline@gmail.com',
      'ngventuresonline@gmail.com',
    ]);
  });
});

describe('visitorAck', () => {
  it('builds the published template payload', () => {
    const ack = visitorAck('Priya Sharma', ['Customer & Workforce AI']);
    assert.equal(ack.subject, 'We have your note, Priya');
    assert.equal(ack.template.id, ACK_TEMPLATE);
    assert.equal(ack.template.variables.TOPIC_LINE, ' about Customer & Workforce AI');
    assert.equal(ack.template.variables.CTA_URL, 'https://bybo.in/apply');
    assert.ok(!('FIRST_NAME' in ack.template.variables));
  });
});
