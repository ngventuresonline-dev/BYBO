import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { describe, it } from 'node:test';
import { mapConversation, mapInitiationFailure, verifyElevenLabsSignature, verifyMetaSignature } from './webhook';

function sign(body: string, secret: string, timestamp: number) {
  const hex = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
  return `t=${timestamp},v0=${hex}`;
}

describe('ElevenLabs webhook signature', () => {
  const body = JSON.stringify({ type: 'post_call_transcription', data: { conversation_id: 'c1' } });
  const now = Date.now();
  const ts = Math.floor(now / 1000);

  it('accepts a current HMAC and rejects tampering', () => {
    const header = sign(body, 'secret', ts);
    assert.equal(verifyElevenLabsSignature(body, header, 'secret', now).ok, true);
    assert.equal(verifyElevenLabsSignature(`${body} `, header, 'secret', now).ok, false);
    assert.equal(verifyElevenLabsSignature(body, header, 'other', now).ok, false);
  });

  it('rejects a missing secret, a missing header, and a stale timestamp', () => {
    const header = sign(body, 'secret', ts);
    assert.equal(verifyElevenLabsSignature(body, header, undefined, now).ok, false);
    assert.equal(verifyElevenLabsSignature(body, null, 'secret', now).ok, false);
    const old = verifyElevenLabsSignature(body, sign(body, 'secret', ts - 4000), 'secret', now);
    assert.equal(old.ok, false);
    if (!old.ok) assert.equal(old.reason, 'stale');
  });
});

describe('SIP result mapping', () => {
  it('maps busy, no answer and failure', () => {
    assert.equal(mapInitiationFailure({ failure_reason: 'busy' }), 'busy');
    assert.equal(mapInitiationFailure({ failure_reason: 'no-answer' }), 'no_answer');
    assert.equal(mapInitiationFailure({ failure_reason: 'unknown', sip_status_code: 486 }), 'busy');
    assert.equal(mapInitiationFailure({ failure_reason: 'unknown', sip_status_code: 480 }), 'no_answer');
    assert.equal(mapInitiationFailure({ failure_reason: 'unknown' }), 'failed');
  });

  it('treats a connected conversation as answered and keeps the analysis', () => {
    const mapped = mapConversation({
      status: 'done',
      metadata: { call_duration_secs: 42, termination_reason: '' },
      analysis: {
        transcript_summary: 'They sell spices and want more enquiries.',
        data_collection_results: { matched_area: { value: 'Websites' } },
      },
    });
    assert.equal(mapped.outcome, 'answered');
    assert.match(mapped.summary ?? '', /spices/);
    assert.equal((mapped.analysis as { transcript_summary: string }).transcript_summary.includes('spices'), true);
  });
});

describe('Meta hub signature', () => {
  it('checks X-Hub-Signature-256', () => {
    const body = '{"entry":[]}';
    const hex = createHmac('sha256', 'app').update(body).digest('hex');
    assert.equal(verifyMetaSignature(body, `sha256=${hex}`, 'app'), true);
    assert.equal(verifyMetaSignature(body, `sha256=${hex}`, 'nope'), false);
    assert.equal(verifyMetaSignature(body, null, 'app'), false);
  });
});
