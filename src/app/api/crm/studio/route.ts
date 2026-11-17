import { NextResponse } from 'next/server';
import { captureLead, crmConfigured } from '@/lib/crm/db';
import { toCapture } from '@/lib/crm/studio';
import { bearerAuthorized } from '@/lib/instant-call/secrets';

/**
 * BYBO Studio (studio.bybo.in) reports its leads here, so they land in the CRM
 * Leads tab: a new account, a call booked with the team, a payment. The studio
 * signs each call with STUDIO_CRM_KEY. One person is one lead (matched by
 * email); each report adds an activity and only ever moves the stage forward.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!bearerAuthorized(request.headers.get('authorization'), process.env.STUDIO_CRM_KEY?.trim())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const capture = body ? toCapture(body) : null;
  if (!capture) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const id = await captureLead(capture);
  if (!id) return NextResponse.json({ ok: false, reason: 'write_failed' }, { status: 502 });
  return NextResponse.json({ ok: true, id });
}
