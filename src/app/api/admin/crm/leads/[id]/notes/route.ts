import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc, type CrmEvent } from '@/lib/crm/db';

/** Add a note to a lead's timeline. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const { id } = await ctx.params;
  const b = await request.json().catch(() => null) as { body?: unknown } | null;
  const body = String(b?.body ?? '').trim().slice(0, 4000);
  if (!/^[0-9a-f-]{36}$/i.test(id) || !body) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  try {
    const event = await rpc<CrmEvent>('bybo_crm_note', { p_lead: id, p_body: body });
    return NextResponse.json({ ok: true, event });
  } catch (err) {
    console.error('crm note failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'write_failed' }, { status: 502 });
  }
}
