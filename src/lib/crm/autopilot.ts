import { randomBytes } from 'node:crypto';
import { rpc, type CrmLead } from './db';

/**
 * The lead autopilot. Each new lead moves through:
 *   queued → research + qualify (web search) → needs_review (likely fake, held for a person)
 *          → qualified → demo drafted → awaiting_approval (team emailed) → sent (client emailed)
 * Nothing reaches a client until someone approves the demo in the desk.
 * Research never invents facts: unknowns stay null, and demo copy carries no
 * client stats, testimonials or prices.
 */

const MODEL = process.env.BYBO_AI_MODEL ?? 'claude-sonnet-5-5';
const PRODUCT_IDS = ['blueprint', 'night-desk', 'document-workflow', 'agent-workflow', 'knowledge-pilot', 'decision-dashboard', 'ai-review', 'platform-sprint', 'business-website', 'app-mvp', 'ai-film'];

export type Intel = {
  business?: { name?: string | null; industry?: string | null; location?: string | null; website?: string | null; socials?: string[]; what_they_do?: string | null; size_hint?: string | null };
  quality?: 'good' | 'maybe' | 'fake';
  score?: number;
  reasons?: string[];
  signals?: { email_type?: string; phone_valid?: boolean; name_looks_real?: boolean; business_found?: boolean };
  pitch?: string;
  package?: string;
  demo_angle?: string;
  temperature?: 'hot' | 'warm' | 'cold';
  sources?: string[];
  researched_at?: string;
};

export type DemoContent = {
  brand: string; tagline: string; industry: string;
  palette: { from: string; to: string; accent: string };
  hero: { eyebrow: string; headline: string; sub: string };
  offer: { title: string; text: string }[];
  features: { title: string; text: string }[];
  flow: { step: string; text: string }[];
  pages: string[];
  cta: { headline: string; sub: string };
};

export type Demo = { id: string; lead_id: string; created_at: string; slug: string; kind: 'auto' | 'custom'; status: 'drafting' | 'awaiting_approval' | 'approved' | 'sent' | 'rejected'; url: string | null; content: DemoContent | Record<string, never>; approved_at: string | null; sent_at: string | null; note: string | null };

async function claude(system: string, user: string, opts: { search?: boolean; maxTokens?: number } = {}) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('anthropic_not_configured');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: opts.maxTokens ?? 2000,
      system,
      messages: [{ role: 'user', content: user }],
      ...(opts.search ? { tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 4 }] } : {}),
    }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) throw new Error(`model_failed_${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`);
  const data = await res.json() as { content: { type: string; text?: string; content?: unknown }[] };
  const text = data.content.filter((b) => b.type === 'text').map((b) => b.text ?? '').join('\n');
  const sources = data.content.filter((b) => b.type === 'web_search_tool_result')
    .flatMap((b) => (Array.isArray(b.content) ? b.content : []) as { url?: string }[]).map((r) => r.url).filter(Boolean) as string[];
  return { text, sources };
}

function json<T>(text: string): T {
  const start = text.indexOf('{'), end = text.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('no_json');
  return JSON.parse(text.slice(start, end + 1)) as T;
}

const leadFacts = (l: CrmLead) => JSON.stringify({
  name: l.name, email: l.email, phone: l.phone, company: l.company, need: l.need, summary: l.summary, services: l.services, source: l.source, arrived: l.created_at,
});

export async function researchLead(l: CrmLead): Promise<Intel> {
  const system = `You research inbound leads for BYBO (bybo.in), an Indian studio that builds AI systems, websites, apps and AI films for businesses.
Use web search to find the lead's business: what it does, where, its website and social pages. Then judge if the lead is real and worth pursuing.
Rules:
- Never invent. If you can't find something, use null. Only cite what search shows.
- "fake": gibberish or joke names, "test" entries, nonsense business, disposable email, obvious spam or bots, competitors probing.
- "maybe": looks human but thin or unverifiable (personal email, nothing found online).
- "good": a real person or business with a plausible need BYBO can serve.
- score 0-100 for fit and seriousness. temperature: hot if ready to buy now, warm if interested, cold if vague.
- package: the best first BYBO package id from: ${PRODUCT_IDS.join(', ')}.
- pitch: one or two sentences on what BYBO should offer them. demo_angle: one line on what their demo should show.
Reply with JSON only:
{"business":{"name":null,"industry":null,"location":null,"website":null,"socials":[],"what_they_do":null,"size_hint":null},"quality":"good|maybe|fake","score":0,"reasons":["..."],"signals":{"email_type":"business|personal|disposable|none","phone_valid":true,"name_looks_real":true,"business_found":false},"pitch":"","package":"","demo_angle":"","temperature":"hot|warm|cold"}`;
  const { text, sources } = await claude(system, `Lead:\n${leadFacts(l)}`, { search: true, maxTokens: 2500 });
  const intel = json<Intel>(text);
  if (!['good', 'maybe', 'fake'].includes(intel.quality ?? '')) intel.quality = 'maybe';
  intel.score = Math.max(0, Math.min(100, Math.round(Number(intel.score) || 0)));
  if (intel.package && !PRODUCT_IDS.includes(intel.package)) intel.package = 'blueprint';
  intel.sources = [...new Set(sources)].slice(0, 8);
  intel.researched_at = new Date().toISOString();
  return intel;
}

export async function draftDemo(l: CrmLead, intel: Intel): Promise<DemoContent> {
  const system = `You write the content for a one-page personalised demo that BYBO (bybo.in) shows a prospect: a preview of the website or AI system BYBO would build for their business.
Write in clear, confident, simple English for an Indian business owner. Use their business name only if known.
Strict rules: no invented statistics, results, awards, client names, testimonials, prices or timelines. Describe what the system would do, not what it has achieved. Indian context.
Pick a palette that suits their industry (three hex colours that read well on a dark background).
Reply with JSON only:
{"brand":"","tagline":"","industry":"","palette":{"from":"#","to":"#","accent":"#"},"hero":{"eyebrow":"","headline":"","sub":""},"offer":[{"title":"","text":""}],"features":[{"title":"","text":""}],"flow":[{"step":"","text":""}],"pages":[""],"cta":{"headline":"","sub":""}}
offer: 3 items (what visitors get). features: 4 items (what BYBO builds). flow: 4 steps of how an enquiry is captured and answered. pages: 4-6 page names.`;
  const { text } = await claude(system, `Lead:\n${leadFacts(l)}\n\nResearch:\n${JSON.stringify(intel)}`, { maxTokens: 2000 });
  const c = json<DemoContent>(text);
  const hex = (v: unknown, d: string) => (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) ? v : d);
  c.palette = { from: hex(c.palette?.from, '#7a3cff'), to: hex(c.palette?.to, '#ff6a3d'), accent: hex(c.palette?.accent, '#b794ff') };
  c.offer = (c.offer ?? []).slice(0, 4); c.features = (c.features ?? []).slice(0, 6); c.flow = (c.flow ?? []).slice(0, 5); c.pages = (c.pages ?? []).slice(0, 6);
  return c;
}

const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 40) || 'demo';
export const demoUrl = (slug: string) => `https://bybo.in/demo/${slug}`;

async function log(lead: string, kind: string, title: string, body?: string, meta: Record<string, unknown> = {}) {
  await rpc('bybo_crm_log', { p_lead: lead, p_kind: kind, p_title: title, p_body: body ?? null, p_meta: meta }).catch(() => null);
}

async function email(to: string[], subject: string, headline: string, paragraphs: string[], cta?: { href: string; label: string }, opts: { bcc?: string[]; replyTo?: string; key?: string } = {}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const { brandedEmail, brandedEmailText } = await import('@/lib/email-layout');
  const { CONTACT } = await import('@/lib/site');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(opts.key ? { 'Idempotency-Key': opts.key } : {}) },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? `BYBO <${CONTACT.email}>`, to, ...(opts.bcc ? { bcc: opts.bcc } : {}), reply_to: opts.replyTo ?? CONTACT.email, subject,
      html: brandedEmail({ title: subject, eyebrow: 'BYBO', headline, intro: paragraphs, cta }),
      text: brandedEmailText({ headline, paragraphs, cta }),
    }),
  }).catch(() => null);
  return !!res?.ok;
}

/** Ask the team to approve a demo. */
async function requestApproval(l: CrmLead, d: Demo, intel: Intel) {
  const { teamRecipients } = await import('@/lib/enquiry-ack');
  const who = l.name || l.company || l.email || 'a lead';
  await email(teamRecipients(), `Approve demo for ${who}`, `A demo is ready for ${who}`, [
    `${intel.business?.name ?? l.company ?? 'Business unknown'}${intel.business?.industry ? `, ${intel.business.industry}` : ''}${intel.business?.location ? `, ${intel.business.location}` : ''}.`,
    `Lead quality: ${intel.quality ?? 'unknown'} (${intel.score ?? '?'} / 100). ${intel.pitch ?? ''}`,
    `Preview the demo: ${demoUrl(d.slug)}`,
    'Approve it in the lead desk and it is emailed to the client straight away. Nothing has been sent to them yet.',
  ], { href: 'https://bybo.in/admin/crm#autopilot', label: 'Review and approve' }, { key: `demo-approval/${d.id}` });
}

/** One step for one lead. Returns what happened, for the run log. */
export async function step(l: CrmLead): Promise<string> {
  const who = l.name || l.company || l.email || l.id.slice(0, 8);
  if (l.autopilot === 'queued') {
    await rpc('bybo_ap_set', { p_lead: l.id, p: { autopilot: 'researching' } });
    try {
      const intel = await researchLead(l);
      const fake = intel.quality === 'fake';
      await rpc('bybo_ap_set', { p_lead: l.id, p: {
        autopilot: fake ? 'needs_review' : 'qualified', quality: intel.quality, quality_score: String(intel.score ?? ''),
        intel, temperature: fake ? '' : intel.temperature ?? '', company: intel.business?.name ?? '',
      } });
      await log(l.id, fake ? 'alert' : 'research', fake ? `Likely fake (${intel.score}/100): held for your review` : `Researched: ${intel.quality} lead, ${intel.score}/100`,
        [intel.business?.what_they_do, ...(intel.reasons ?? []).map((r) => `• ${r}`), intel.pitch ? `Pitch: ${intel.pitch}` : ''].filter(Boolean).join('\n'), { sources: intel.sources ?? [] });
      return `${who}: ${intel.quality} (${intel.score})`;
    } catch (err) {
      await rpc('bybo_ap_set', { p_lead: l.id, p: { autopilot: 'failed', intel: { error: (err as Error).message.slice(0, 200) } } });
      return `${who}: research failed`;
    }
  }

  if (l.autopilot === 'qualified') {
    const intel = (l.intel ?? {}) as Intel;
    const existing = (await rpc<Demo[]>('bybo_demo_list', {})).find((d) => d.lead_id === l.id && d.status !== 'rejected');
    if (existing) {
      await rpc('bybo_ap_set', { p_lead: l.id, p: { autopilot: existing.status === 'sent' ? 'sent' : 'awaiting_approval' } });
      return `${who}: demo already exists`;
    }
    try {
      const content = await draftDemo(l, intel);
      const slug = `${slugify(content.brand || l.company || l.name || 'demo')}-${randomBytes(2).toString('hex')}`;
      const demo = await rpc<Demo>('bybo_demo_upsert', { p: { lead_id: l.id, slug, kind: 'auto', status: 'awaiting_approval', content } });
      await rpc('bybo_ap_set', { p_lead: l.id, p: { autopilot: 'awaiting_approval' } });
      await log(l.id, 'demo', 'Demo drafted: waiting for your approval', demoUrl(slug), { slug });
      await requestApproval(l, demo, intel);
      return `${who}: demo drafted`;
    } catch (err) {
      await rpc('bybo_ap_set', { p_lead: l.id, p: { autopilot: 'failed', intel: { error: (err as Error).message.slice(0, 200) } } });
      return `${who}: demo draft failed`;
    }
  }
  return `${who}: nothing to do`;
}

/** Process the next few leads. Called by cron and by "Run autopilot now". */
export async function runAutopilot(limit = 2): Promise<string[]> {
  const due = await rpc<CrmLead[]>('bybo_ap_due', { p_limit: limit });
  const out: string[] = [];
  for (const l of due) out.push(await step(l));
  return out;
}

/** Approved by a person: email the demo to the client and move the lead on. */
export async function sendDemo(demo: Demo, lead: CrmLead): Promise<{ ok: boolean; reason?: string }> {
  if (!lead.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) return { ok: false, reason: 'no_email' };
  const link = demo.kind === 'custom' && demo.url ? demo.url : demoUrl(demo.slug);
  const first = (lead.name ?? '').trim().split(/\s+/)[0] || 'there';
  const brand = (demo.content as DemoContent).brand || lead.company || 'your business';
  const ok = await email([lead.email], `Your BYBO demo for ${brand} is ready`, `${first}, here is what we would build for ${brand}`, [
    `Hi ${first},`,
    `Thanks for your interest in BYBO. We put together a short demo of how ${brand} could look and work online, with every enquiry captured and answered quickly.`,
    'Have a look, and reply with a time that suits you for a 20-minute walkthrough. We can tailor every part of it to you.',
  ], { href: link, label: 'See your demo' }, { bcc: ['byboonline@gmail.com'], key: `demo-send/${demo.id}` });
  if (!ok) return { ok: false, reason: 'send_failed' };
  await rpc('bybo_demo_upsert', { p: { id: demo.id, status: 'sent' } });
  await rpc('bybo_ap_set', { p_lead: lead.id, p: { autopilot: 'sent' } });
  if (['new', 'contacted', 'call_booked'].includes(lead.stage)) await rpc('bybo_crm_update', { p_lead: lead.id, p: { stage: 'proposal' } }).catch(() => null);
  await log(lead.id, 'email', `Demo approved and emailed: ${brand}`, link, { slug: demo.slug });
  return { ok: true };
}
