import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc, STAGES, type CrmEvent, type CrmLead, type Stage } from '@/lib/crm/db';

/** One lead: its timeline, edits and deletion. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };
const UUID = /^[0-9a-f-]{36}$/i;

async function guard(request: Request, ctx: Ctx) {
  if (!adminAuthorized(request)) return { error: NextResponse.json({ ok: false }, { status: 401 }) };
  if (!crmConfigured()) return { error: NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 }) };
  const { id } = await ctx.params;
  if (!UUID.test(id)) return { error: NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 }) };
  return { id };
}

export async function GET(request: Request, ctx: Ctx) {
  const g = await guard(request, ctx);
  if (g.error) return g.error;
  try {
    const events = await rpc<CrmEvent[]>('bybo_crm_events', { p_lead: g.id });
    return NextResponse.json({ ok: true, events });
  } catch (err) {
    console.error('crm events failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'read_failed' }, { status: 502 });
  }
}

const TEXT: Record<string, number> = { name: 120, email: 200, phone: 30, company: 160, need: 300 };

export async function PATCH(request: Request, ctx: Ctx) {
  const g = await guard(request, ctx);
  if (g.error) return g.error;
  const b = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!b) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });

  const patch: Record<string, string> = {};
  for (const [k, max] of Object.entries(TEXT)) if (k in b) patch[k] = String(b[k] ?? '').trim().slice(0, max);
  if ('email' in patch && patch.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(patch.email)) {
    return NextResponse.json({ ok: false, reason: 'invalid_email' }, { status: 400 });
  }
  if ('stage' in b) {
    if (!STAGES.includes(b.stage as Stage)) return NextResponse.json({ ok: false, reason: 'invalid_stage' }, { status: 400 });
    patch.stage = b.stage as Stage;
  }
  if ('temperature' in b) patch.temperature = ['hot', 'warm', 'cold'].includes(String(b.temperature)) ? String(b.temperature) : '';
  if ('value' in b) {
    const v = Number(b.value);
    patch.value = b.value === '' || b.value == null ? '' : Number.isFinite(v) && v >= 0 ? String(v) : '';
  }
  if ('next_follow_up' in b) {
    const t = Date.parse(String(b.next_follow_up ?? ''));
    patch.next_follow_up = Number.isNaN(t) ? '' : new Date(t).toISOString();
  }
  if (!Object.keys(patch).length) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });

  try {
    const lead = await rpc<CrmLead>('bybo_crm_update', { p_lead: g.id, p: patch });
    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    console.error('crm update failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'write_failed' }, { status: 502 });
  }
}

export async function DELETE(request: Request, ctx: Ctx) {
  const g = await guard(request, ctx);
  if (g.error) return g.error;
  try {
    await rpc('bybo_crm_delete', { p_lead: g.id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('crm delete failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'write_failed' }, { status: 502 });
  }
}
