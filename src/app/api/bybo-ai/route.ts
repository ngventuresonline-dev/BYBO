import { NextResponse } from 'next/server';
import { systemPrompt } from '@/lib/bybo-ai/prompt';
import { upcomingSlots } from '@/lib/bybo-ai/slots';
import { TOOLS, runTool, type Brief } from '@/lib/bybo-ai/tools';

/**
 * B, BYBO's AI closer, behind the assistant on every page.
 *
 * The browser sends the conversation; this route asks Claude for the next
 * reply and runs whatever B decides to do in between: build a brief, email a
 * summary, alert the team, book a call. Tools are checked in tools.ts, never
 * trusted from the model. ANTHROPIC_API_KEY and RESEND_API_KEY stay on the
 * server.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = process.env.BYBO_AI_MODEL ?? 'claude-sonnet-5-5';
const MAX_TURNS = 40, MAX_CHARS = 1500, MAX_ROUNDS = 4;

const seen = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (seen.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  seen.set(ip, hits);
  if (seen.size > 1000) for (const [k, v] of seen) if (!v.some((t) => now - t < 10 * 60_000)) seen.delete(k);
  return hits.length > 40;
}

type Turn = { role: 'user' | 'assistant'; text: string };
type Block = { type: string; text?: string; id?: string; name?: string; input?: Record<string, unknown> };

async function claude(key: string, system: string, messages: unknown[]) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 1400, system, tools: TOOLS, messages }),
  }).catch(() => null);
  if (!res?.ok) {
    console.error('bybo-ai model call failed', res?.status ?? 0, (await res?.text().catch(() => ''))?.slice(0, 300));
    return null;
  }
  return (await res.json()) as { content: Block[]; stop_reason: string };
}

const textOf = (blocks: Block[]) => blocks.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();

export async function POST(request: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ ok: false, reason: 'not_configured' }, { status: 503 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });

  const body = await request.json().catch(() => null) as { messages?: Turn[]; page?: string } | null;
  const turns = (body?.messages ?? [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string' && m.text.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, text: m.text.slice(0, MAX_CHARS) }));
  while (turns.length && turns[0].role !== 'user') turns.shift();
  if (!turns.length || turns.at(-1)!.role !== 'user') return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });

  const page = String(body?.page ?? '').slice(0, 200);
  const system = systemPrompt(upcomingSlots(), page);
  const messages: unknown[] = turns.map((m) => ({ role: m.role, content: m.text }));

  let booked: string | null = null;
  let brief: Brief | null = null;
  const actions: string[] = [];
  const said: string[] = [];

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const out = await claude(key, system, messages);
    if (!out) {
      if (said.length || actions.length) break;
      return NextResponse.json({ ok: false, reason: 'model_failed' }, { status: 502 });
    }
    const text = textOf(out.content);
    const calls = out.content.filter((b) => b.type === 'tool_use');
    if (text) said.push(text);
    if (!calls.length || round === MAX_ROUNDS - 1) break;

    const results = [];
    for (const call of calls) {
      const o = await runTool(call.name ?? '', call.input ?? {}, { turns, page, ip });
      if (o.brief) brief = o.brief;
      if (o.booked) booked = o.booked;
      if (o.action) actions.push(o.action);
      results.push({ type: 'tool_result', tool_use_id: call.id, content: o.result });
    }
    messages.push({ role: 'assistant', content: out.content });
    messages.push({ role: 'user', content: results });
  }

  return NextResponse.json({ ok: true, reply: said.join('\n\n') || 'Tell me a bit more about your business?', booked, brief, actions });
}
