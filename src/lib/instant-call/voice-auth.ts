import { NextResponse } from 'next/server';
import { safeEqual } from './secrets';

/** Voice-agent tools stay dark until the instant-call switch is on and the shared secret matches. */
export function voiceGuard(request: Request): Response | null {
  if (process.env.INSTANT_CALL_ENABLED !== 'true') {
    return NextResponse.json({ ok: false, reason: 'disabled' }, { status: 404 });
  }
  const secret = process.env.VOICE_TOOL_SECRET;
  if (!secret) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const got = request.headers.get('x-bybo-voice-secret') ?? '';
  if (!safeEqual(got, secret)) return NextResponse.json({ ok: false }, { status: 401 });
  return null;
}
