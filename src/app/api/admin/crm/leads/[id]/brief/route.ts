import { NextResponse } from 'next/server';
import { adminAuthorized } from '@/lib/instagram/auth';
import { crmConfigured, rpc, type CrmEvent, type CrmLead } from '@/lib/crm/db';

/** An AI read of one lead: where it stands, what could go wrong, and ready-to-send drafts. Admin only. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type Ctx = { params: Promise<{ id: string }> };
const UUID = /^[0-9a-f-]{36}$/i;
const MODEL = process.env.BYBO_AI_MODEL ?? 'claude-sonnet-5-5';

type Brief = { summary: string; stage_read: string; risks: string[]; next_step: string; whatsapp_draft: string; email_draft: string };

const SYSTEM = `You are the sales lead at BYBO (bybo.in), a studio in India that builds websites, apps and AI workflows for businesses.
You brief the founder on one lead before they reach out.
Use ONLY the lead data and activity you are given. Never invent names, numbers, dates, prices, websites, conversations or promises that are not in the data. If something is unknown, say it is unknown.
Write plainly, in short sentences, in Indian English. No emojis, no hype.
Reply with one JSON object and nothing else:
{"summary": "2-3 sentences: who they are and what they want",
 "stage_read": "1-2 sentences: where the deal really stands and how warm it is, based on the activity",
 "risks": ["up to 3 short risks or gaps, e.g. missing contact details, gone quiet, no budget known"],
 "next_step": "the single best next action, one sentence",
 "whatsapp_draft": "a short WhatsApp message from BYBO, under 60 words, first name only, no links unless one is in the data",
 "email_draft": "a short email body from BYBO, under 120 words, starting with Hi <first name>, no subject line, signed BYBO"}`;

const facts = (l: CrmLead, events: CrmEvent[], now: number) => JSON.stringify({
  today: new Date(now).toISOString().slice(0, 10),
  lead: {
    name: l.name, company: l.company, email: l.email ? 'present' : null, phone: l.phone ? 'present' : null,
    source: l.source, stage: l.stage, temperature: l.temperature, value_inr: l.value, need: l.need, summary: l.summary, services: l.services,
    created_at: l.created_at, last_activity_at: l.last_activity_at, next_follow_up: l.next_follow_up,
    quality: l.quality, quality_score: l.quality_score, research: l.intel,
  },
  activity: events.slice(0, 40).map((e) => ({ at: e.created_at, kind: e.kind, title: e.title, body: e.body?.slice(0, 600) ?? null })),
});

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request, ctx: Ctx) {
  if (!adminAuthorized(request)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!crmConfigured()) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });
  const { id } = await ctx.params;
  if (!UUID.test(id)) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ ok: false, reason: 'anthropic_not_configured' }, { status: 503 });

  let lead: CrmLead | undefined, events: CrmEvent[];
  try {
    [lead, events] = await Promise.all([
      rpc<CrmLead[]>('bybo_crm_list', {}).then((all) => all.find((l) => l.id === id)),
      rpc<CrmEvent[]>('bybo_crm_events', { p_lead: id }),
    ]);
  } catch (err) {
    console.error('crm brief read failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'read_failed' }, { status: 502 });
  }
  if (!lead) return NextResponse.json({ ok: false, reason: 'not_found' }, { status: 404 });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODEL, max_tokens: 1200, system: SYSTEM, messages: [{ role: 'user', content: facts(lead, events, Date.now()) }] }),
      signal: AbortSignal.timeout(55_000),
    });
    if (!res.ok) throw new Error(`model_failed_${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`);
    const data = await res.json() as { content: { type: string; text?: string }[] };
    const text = data.content.filter((b) => b.type === 'text').map((b) => b.text ?? '').join('\n');
    const start = text.indexOf('{'), end = text.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error('no_json');
    const raw = JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>;
    const brief: Brief = {
      summary: str(raw.summary, 800),
      stage_read: str(raw.stage_read, 600),
      risks: (Array.isArray(raw.risks) ? raw.risks : []).map((r) => str(r, 200)).filter(Boolean).slice(0, 4),
      next_step: str(raw.next_step, 300),
      whatsapp_draft: str(raw.whatsapp_draft, 800),
      email_draft: str(raw.email_draft, 1500),
    };
    return NextResponse.json({ ok: true, brief });
  } catch (err) {
    console.error('crm brief failed', (err as Error).message);
    return NextResponse.json({ ok: false, reason: 'brief_failed' }, { status: 502 });
  }
}
