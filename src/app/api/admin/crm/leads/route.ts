import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { captureLead, crmConfigured, rpc, SOURCES, STAGES, type CrmLead, type Source, type Stage } from '@/lib/crm/db';

/** CRM list and manual add. Admin cookie (or CRON_SECRET bearer) only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const s = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export async function GET(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  try {
    const leads = await rpc<CrmLead[]>('bybo_crm_list', {});
    return NextResponse.json({ ok: true, leads, at: new Date().toISOString() });
  } catch (err) {
    console.error('crm list failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'read_failed' }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const b = await request.json().catch(() => null) as Record<string, unknown> | null;
  const name = s(b?.name, 120), email = s(b?.email, 200), phone = s(b?.phone, 30);
  if (!name && !email && !phone) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ ok: false, reason: 'invalid_email' }, { status: 400 });
  const stage = STAGES.includes(b?.stage as Stage) ? (b!.stage as Stage) : 'new';
  const source = SOURCES.includes(b?.source as Source) ? (b!.source as Source) : 'manual';
  const value = Number(b?.value);
  const id = await captureLead({
    source, name, email, phone, company: s(b?.company, 160), need: s(b?.need, 300), stage,
    value: Number.isFinite(value) && value > 0 ? value : undefined,
    event: { kind: 'manual', title: 'Added by hand', body: s(b?.note, 2000) || undefined },
  });
  if (!id) return NextResponse.json({ ok: false, reason: 'write_failed' }, { status: 502 });
  return NextResponse.json({ ok: true, id });
}
