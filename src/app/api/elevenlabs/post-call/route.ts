import { NextResponse } from 'next/server';
import { applyCallUpdate } from '@/lib/instant-call/flow';
import { getLeadStore, LeadStoreUnavailable } from '@/lib/instant-call/store';
import { sendCallSummary } from '@/lib/instant-call/mail';
import { maskPhone } from '@/lib/instant-call/mask';
import {
  asRecord,
  leadIdFromEvent,
  mapConversation,
  mapInitiationFailure,
  verifyElevenLabsSignature,
} from '@/lib/instant-call/webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * ElevenLabs post-call webhook for BYBO Voice.
 * The agent is already pointed at https://bybo.in/api/elevenlabs/post-call.
 * HMAC secret: ELEVENLABS_WEBHOOK_SECRET. This route never places a call.
 */

export async function POST(request: Request) {
  const raw = await request.text();
  const verified = verifyElevenLabsSignature(raw, request.headers.get('elevenlabs-signature'), process.env.ELEVENLABS_WEBHOOK_SECRET);
  if (!verified.ok) return NextResponse.json({ ok: false }, { status: 401 });

  let event: unknown;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await handlePostCall(event);
  } catch (err) {
    if (err instanceof LeadStoreUnavailable) {
      console.error('post-call webhook store unconfigured');
      return NextResponse.json({ ok: false, reason: 'store_unconfigured' }, { status: 503 });
    }
    console.error('post-call webhook failed', err instanceof Error ? err.message : 'error');
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function handlePostCall(event: unknown) {
  const record = asRecord(event);
  const type = String(record.type ?? '');
  if (type === 'post_call_audio') return;
  const data = asRecord(record.data);
  const conversationId = typeof data.conversation_id === 'string' ? data.conversation_id : '';
  const store = await getLeadStore();
  const leadId = leadIdFromEvent(data);
  const lead = (leadId ? await store.get(leadId) : null) ?? (conversationId ? await store.findByConversation(conversationId) : null);
  if (!lead) {
    console.info('unmatched conversation', conversationId);
    return;
  }

  const update = type === 'call_initiation_failure'
    ? {
        outcome: mapInitiationFailure({
          failure_reason: String(data.failure_reason ?? ''),
          sip_status_code: Number(asRecord(asRecord(data.metadata).body).sip_status_code),
          error_reason: String(asRecord(asRecord(data.metadata).body).error_reason ?? ''),
        }),
        conversationId,
      }
    : { ...mapConversation(data), conversationId };

  await applyCallUpdate(lead, update, {
    store,
    now: new Date(),
    dial: async () => { throw new Error('webhook must not dial'); },
    sendSummary: sendCallSummary,
    log: (message, fields) => console.info(message, { leadId: fields?.leadId ?? '', phone: maskPhone(fields?.phone) }),
  });
}
