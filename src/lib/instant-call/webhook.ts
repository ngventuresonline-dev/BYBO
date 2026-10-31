import { createHmac, timingSafeEqual } from 'node:crypto';
import type { CallOutcome, CallUpdate } from './types';

const MAX_SKEW_MS = 30 * 60_000;

export type SignatureResult = { ok: true } | { ok: false; reason: string };

/** ElevenLabs-Signature: t=<unix>,v0=<hex hmac sha256 of `${t}.${rawBody}`>. */
export function verifyElevenLabsSignature(
  rawBody: string,
  header: string | null,
  secret: string | undefined,
  now = Date.now(),
): SignatureResult {
  if (!secret) return { ok: false, reason: 'unconfigured' };
  if (!header) return { ok: false, reason: 'missing' };
  const parts = header.split(',').map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith('t='))?.slice(2);
  const signatures = parts.filter((part) => part.startsWith('v0=')).map((part) => part.slice(3));
  if (!timestamp || signatures.length === 0) return { ok: false, reason: 'malformed' };
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return { ok: false, reason: 'malformed' };
  if (Math.abs(now - ts * 1000) > MAX_SKEW_MS) return { ok: false, reason: 'stale' };

  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
  const expectedBuf = Buffer.from(expected);
  const match = signatures.some((signature) => {
    const got = Buffer.from(signature);
    return got.length === expectedBuf.length && timingSafeEqual(got, expectedBuf);
  });
  return match ? { ok: true } : { ok: false, reason: 'mismatch' };
}

export function verifyMetaSignature(rawBody: string, header: string | null, secret: string | undefined): boolean {
  if (!secret || !header) return false;
  const expected = `sha256=${createHmac('sha256', secret).update(rawBody).digest('hex')}`;
  const a = Buffer.from(expected);
  const b = Buffer.from(header.trim());
  return a.length === b.length && timingSafeEqual(a, b);
}

export function mapInitiationFailure(input: {
  failure_reason?: string;
  sip_status_code?: number;
  error_reason?: string;
}): Exclude<CallOutcome, 'answered' | 'in_progress'> {
  const reason = `${input.failure_reason ?? ''} ${input.error_reason ?? ''}`.toLowerCase();
  const code = input.sip_status_code;
  if (reason.includes('busy') || code === 486 || code === 600 || code === 603) return 'busy';
  if (
    reason.includes('no-answer')
    || reason.includes('no_answer')
    || reason.includes('no answer')
    || reason.includes('unanswered')
    || code === 408
    || code === 480
    || code === 487
  ) return 'no_answer';
  return 'failed';
}

export function mapConversation(data: unknown): CallUpdate {
  const record = asRecord(data);
  const status = String(record.status ?? '');
  const metadata = asRecord(record.metadata);
  const analysis = record.analysis ?? null;
  const summary = transcriptSummary(analysis);
  const duration = Number(metadata.call_duration_secs ?? 0);
  const termination = String(metadata.termination_reason ?? '');
  if (status === 'initiated' || status === 'in-progress' || status === 'processing' || status === '') {
    return { outcome: 'in_progress', summary, analysis };
  }
  if (status === 'failed') {
    return { outcome: mapInitiationFailure({ failure_reason: termination || 'failed' }), summary, analysis };
  }
  if (status === 'done') {
    const success = asRecord(analysis).call_successful === 'success';
    if (duration > 0 || success) return { outcome: 'answered', summary, analysis };
    return { outcome: mapInitiationFailure({ failure_reason: termination || 'no-answer' }), summary, analysis };
  }
  return { outcome: 'in_progress', summary, analysis };
}

export function transcriptSummary(analysis: unknown): string | null {
  const summary = asRecord(analysis).transcript_summary;
  return typeof summary === 'string' && summary.trim() ? summary.trim() : null;
}

export function matchedArea(analysis: unknown): string | null {
  const results = asRecord(asRecord(analysis).data_collection_results);
  for (const [key, value] of Object.entries(results)) {
    if (!/area/i.test(key)) continue;
    const inner = asRecord(value).value;
    const text = typeof inner === 'string' ? inner : typeof value === 'string' ? value : '';
    if (text.trim()) return text.trim().slice(0, 200);
  }
  return null;
}

export function leadIdFromEvent(data: unknown): string | null {
  const dynamic = asRecord(asRecord(asRecord(data).conversation_initiation_client_data).dynamic_variables);
  const id = dynamic.lead_id;
  return typeof id === 'string' && id.trim() ? id.trim() : null;
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? value as Record<string, unknown> : {};
}
