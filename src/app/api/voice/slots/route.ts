import { NextResponse } from 'next/server';
import { upcomingSlots } from '@/lib/bybo-ai/slots';
import { voiceGuard } from '@/lib/instant-call/voice-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Open discovery-call slots for the BYBO Voice agent. Same slots as the website booking tool. */

export function GET(request: Request) {
  const denied = voiceGuard(request);
  if (denied) return denied;
  return NextResponse.json({ ok: true, slots: upcomingSlots() });
}
