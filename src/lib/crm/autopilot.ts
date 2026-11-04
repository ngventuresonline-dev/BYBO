import { randomBytes } from 'node:crypto';
import { rpc, type CrmLead } from './db';
import { normaliseUrl, scanSite, type SiteScan } from './sitescan';
import { generateScenes, scenesConfigured } from './scenes';
import { demoQuality } from './quality';

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
  site?: SiteScan | null;
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
  /** v2: a redesign of the prospect's real site. */
  style?: 'luxe' | 'bold' | 'calm' | 'heritage';
  site_url?: string | null;
  logo?: string | null;
  hero_image?: string | null;
  products?: { title: string; line: string; price: number | null; compare: number | null; image: string | null; url: string }[];
  categories?: string[];
  facts?: string[];
  redesign?: { was: string; now: string }[];
  /** v3: a cinematic scroll story in the brand's own colours and photos. */
  theme?: { bg: string; ink: string; accent: string; soft: string };
  font?: 'editorial' | 'modern' | 'soft';
  hero_cutout?: boolean;
  /** A cut-out product image that floats over the hero scenes. */
  hero_float?: string | null;
  spotlight?: { image: string; title: string; kicker: string; callouts: string[] } | null;
  /** Hero scenes. `float` places the floating product for that scene: centre x and y in % of the screen, s = scale. */
  scenes?: { image: string | null; brief?: string; kicker: string; title: string; text: string; float?: { x: number; y: number; s: number } }[];
  hero_float_pos?: { x: number; y: number; s: number };
  /** An art-directed scene photo for the first hero frame (made for the demo, never lifted from their site). */
  hero_scene?: string | null;
  /** The art direction brief for the first hero scene photo. */
  hero_brief?: string;
  quality?: { score: number; issues: string[] };
  /** A full-screen intro the visitor scrolls into (a fabric or texture macro). */
  intro_image?: string | null;
  /** Collections by origin or line, each with its own image. */
  origins?: { name: string; region: string; text: string; image: string | null }[];
  /** Set when the products shown are a sample range, not their real catalogue. */
  sample_note?: string;
  /** True when the scene photos already show their product: no floating cut-out, a shoppable hotspot instead. */
  scenes_show_product?: boolean;
  /** Their full catalogue (from their store), for the demo's shop, product and cart pages. */
  catalog?: { title: string; handle: string; price: number | null; compare: number | null; image: string | null; images: string[]; type: string | null; description: string }[];
  gallery?: string[];
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
  // Web search answers carry <cite> tags; keep the words, drop the markup.
  const text = data.content.filter((b) => b.type === 'text').map((b) => b.text ?? '').join('\n').replace(/<\/?cite[^>]*>/g, '');
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

const FREE_MAIL = /@(gmail|googlemail|yahoo|ymail|outlook|hotmail|live|icloud|me|rediffmail|proton|protonmail|aol|zoho)\./i;

/** Try the lead's own words and email domain, then likely brand domains, and keep the first site that is clearly theirs. */
async function findSite(l: CrmLead, hint?: string | null): Promise<SiteScan | null> {
  const brand = (hint || l.company || '').split(/[\n,.(|:]/)[0]!.trim();
  const token = brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  const tried = new Set<string>();
  const candidates: string[] = [];
  const add = (u: string | null) => { const n = normaliseUrl(u); if (n && !tried.has(n)) { tried.add(n); candidates.push(n); } };
  for (const m of `${l.company ?? ''} ${l.summary ?? ''}`.matchAll(/\b((?:https?:\/\/)?(?:www\.)?[a-z0-9-]+\.(?:com|in|co\.in|store|shop|co|net|org|io|app|online))\b/gi)) add(m[1]!);
  if (l.email && !FREE_MAIL.test(l.email)) add(l.email.split('@')[1]!);
  if (token.length >= 3) for (const tld of ['com', 'in', 'co.in', 'store', 'shop', 'co']) add(`${token}.${tld}`);
  for (const url of candidates.slice(0, 9)) {
    const scan = await scanSite(url);
    if (!scan) continue;
    const hay = `${scan.title ?? ''} ${scan.description ?? ''} ${scan.text.slice(0, 800)}`.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!token || hay.includes(token)) return scan;
  }
  return null;
}

const compactSite = (s: SiteScan) => ({
  url: s.url, platform: s.platform, title: s.title, description: s.description,
  products: s.products.map((p, i) => ({ i, title: p.title, price: p.price, compare: p.compare, type: p.type })),
  text: s.text.slice(0, 2500),
});

export async function researchLead(l: CrmLead): Promise<Intel> {
  // Their own site first: it is the best evidence of who they are and what they sell.
  let site = await findSite(l);
  const system = `You research inbound leads for BYBO (bybo.in), an Indian studio that builds AI systems, websites, apps and AI films for businesses.
Research THIS lead's business specifically, not the topic. Search for: "<brand> official website", "<brand> instagram", "<brand> amazon" or "flipkart", the owner's name with the brand, and the email domain if it is not Gmail/Yahoo/Outlook. Ignore generic articles and blog posts; only use pages about this business.
If a website scan is given, it is their real site: use it as the main evidence and set business.website to it.
Then judge if the lead is real and worth pursuing.
Rules:
- Never invent. If you can't find something, use null. Only cite what search or the scan shows.
- "fake": gibberish or joke names, "test" entries, nonsense business, disposable email, obvious spam or bots, competitors probing.
- "maybe": looks human but thin or unverifiable (personal email, nothing found online).
- "good": a real person or business with a plausible need BYBO can serve.
- score 0-100 for fit and seriousness. temperature: hot if ready to buy now, warm if interested, cold if vague.
- package: the best first BYBO package id from: ${PRODUCT_IDS.join(', ')}.
- pitch: one or two sentences on what BYBO should offer them, referring to what you actually found (e.g. their current site's weaknesses). demo_angle: one line on what their demo should show.
Reply with JSON only:
{"business":{"name":null,"industry":null,"location":null,"website":null,"socials":[],"what_they_do":null,"size_hint":null},"quality":"good|maybe|fake","score":0,"reasons":["..."],"signals":{"email_type":"business|personal|disposable|none","phone_valid":true,"name_looks_real":true,"business_found":false},"pitch":"","package":"","demo_angle":"","temperature":"hot|warm|cold"}`;
  const user = `Lead:\n${leadFacts(l)}${site ? `\n\nWebsite scan of their real site:\n${JSON.stringify(compactSite(site))}` : '\n\nNo website found yet by direct lookup.'}`;
  const { text, sources } = await claude(system, user, { search: true, maxTokens: 3000 });
  const intel = json<Intel>(text);
  // Search may name a site the direct lookup missed (or their brand name may differ): read it.
  if (!site) site = (intel.business?.website ? await scanSite(intel.business.website) : null) ?? await findSite(l, intel.business?.name);
  if (site) {
    intel.business = { ...(intel.business ?? {}), website: site.url };
    intel.signals = { ...(intel.signals ?? {}), business_found: true };
    intel.reasons = [`Website found and read: ${site.url}${site.platform === 'shopify' ? ` (Shopify store, ${site.products.length} products)` : ''}.`, ...(intel.reasons ?? []).filter((r) => !/no (official )?website/i.test(r))];
  }
  if (!['good', 'maybe', 'fake'].includes(intel.quality ?? '')) intel.quality = 'maybe';
  intel.score = Math.max(0, Math.min(100, Math.round(Number(intel.score) || 0)));
  if (intel.package && !PRODUCT_IDS.includes(intel.package)) intel.package = 'blueprint';
  intel.sources = [...new Set([...(site ? [site.url] : []), ...sources])].slice(0, 8);
  intel.site = site ? { ...site, text: site.text.slice(0, 2500) } : null;
  intel.researched_at = new Date().toISOString();
  const flags = redFlags(l, intel);
  if (flags.length) {
    intel.quality = 'fake';
    intel.score = Math.min(intel.score, 25);
    intel.reasons = [...flags.map((f) => `Red flag: ${f}`), ...(intel.reasons ?? [])];
  }
  return intel;
}

const SPAM_WORDS = /(?<![a-z])(lust|sexy|xxx|porn|escort|nude|horny|hookup|onlyfans)/i;
/** Plain signs of spam that the model tends to excuse. Any one marks the lead as likely fake. */
export function redFlags(l: Pick<CrmLead, 'name' | 'email'>, intel: Intel): string[] {
  const flags: string[] = [];
  if (SPAM_WORDS.test(`${l.name ?? ''} ${l.email?.split('@')[0] ?? ''}`)) flags.push('the name or email has adult or spam words');
  if (/(?:^|\s)(?:\S\s+){2,}\S(?:\s|$)/.test(l.name ?? '')) flags.push('the name is spaced-out letters, not a real name');
  const s = intel.signals ?? {};
  if (s.name_looks_real === false && !s.business_found && s.email_type !== 'business') flags.push('the name does not look real, no business was found and the email is personal');
  return flags;
}

const compactMedia = (s: SiteScan) => (s.media ?? s.images.map((src) => ({ src, alt: '' }))).map((m, i) => ({ i, file: m.src.split('/').pop()!.split('?')[0], alt: m.alt }));

export async function draftDemo(l: CrmLead, intel: Intel): Promise<DemoContent> {
  const site = intel.site ?? null;
  const system = `You art-direct a personalised demo website that BYBO (bybo.in) shows a prospect. ${site ? 'They already have a website: the demo is a REDESIGN of it as a cinematic, scroll-driven story (think award-winning brand sites: pinned chapters, a product spotlight with callouts, full-bleed photo scenes, a horizontal shop rail). It must feel dramatically more premium than what they have.' : 'They have no website we could find: the demo shows the cinematic, scroll-driven site BYBO would build for them.'}
Write in clear, confident, simple English for an Indian audience, in the voice of their brand (the demo is their site, not BYBO's). Headlines are short and poetic, never salesy filler.
Use their site for context only (what they sell, who it is for, their promises). Never reuse their headlines, taglines or section copy word for word: say it in a new, more premium way. Their products are the hero of every section.
Strict rules: no invented statistics, ratings, reviews, testimonials, awards, client names or prices. Use only facts that appear in the website scan. Product names and prices come only from the scan. Product feature callouts must be features the scan states.
Art direction:
- theme: build it from the site's own colours (given). bg = their lightest background tone, ink = their darkest text tone, accent = their brand colour, soft = a pale tint of the accent. Keep it light unless the brand is clearly dark.
- font: "editorial" (beauty, fashion, jewellery, lifestyle), "modern" (tech, gadgets, fitness, B2B), "soft" (food, kids, wellness, education).
- Images are referenced by index into the site media list (judge by file name and alt text). hero: their best wide hero, close-up or lifestyle photo (the hero is a full-screen photo scene); set hero_cutout true only if its file name suggests a transparent cut-out or it is a .png/.webp hero. hero_product: index into the scan's products for the product that floats in front of the hero (their signature product). spotlight: their best single product render or close-up. scenes: 2-3 more hero scenes, each a caption that continues the product's story (media: null; BYBO art-directs the visuals). gallery: 4-6 more photos. Never use logos, icons, avatars, banners with text, or blog thumbnails.
Reply with JSON only:
{"brand":"","tagline":"","industry":"","font":"editorial|modern|soft","theme":{"bg":"#","ink":"#","accent":"#","soft":"#"},"hero":{"eyebrow":"","headline":"","sub":"","scene":""},"hero_media":0,"hero_cutout":false,"hero_product":0,"spotlight":{"media":0,"kicker":"","title":"","callouts":["",""]},"scenes":[{"media":null,"kicker":"","title":"","text":"","scene":""}],"gallery":[0],"products":[{"i":0,"line":""}],"categories":[""],"facts":[""],"offer":[{"title":"","text":""}],"flow":[{"step":"","text":""}],"redesign":[{"was":"","now":""}],"cta":{"headline":"","sub":""}}
hero.headline: 3-7 words. spotlight.callouts: 3-4 short feature lines (max 6 words each). scenes: title 2-6 words, text one sentence. products[].i: indexes into the scan's products (best 4-8, line = one benefit). categories: 3-6. facts: 2-5 trust lines from the scan. offer: 3 reasons to choose them. flow: 4 steps of the customer journey. Scene briefs (hero.scene and each scenes[].scene): one or two sentences art-directing a photograph for that frame, like a luxury campaign. For a store, the brand's real product is supplied as a reference image, so describe the product's setting and action only (e.g. "standing on a blush marble plinth with silk and petals", "held near the brow of a woman with glowing skin", "in a hand beside an open handbag", "lying on rippled silk with water droplets"); vary them: studio hero, in use, in context, macro texture. For a service business, describe their place, people or results (a bright clinic reception, a calm classroom). Use their palette.
redesign: 3 kind, concrete comparisons of their current site ("was") with the new one ("now"); [] if no site.`;
  const user = `Lead:\n${leadFacts(l)}\n\nResearch:\n${JSON.stringify({ ...intel, site: undefined })}${site ? `\n\nWebsite scan:\n${JSON.stringify(compactSite(site))}\n\nSite colours (most used first): ${(site.colors ?? []).join(' ')}\n\nSite media:\n${JSON.stringify(compactMedia(site))}` : ''}`;
  const { text } = await claude(system, user, { maxTokens: 3500 });
  type Raw = Omit<DemoContent, 'products' | 'spotlight' | 'scenes' | 'gallery' | 'hero'> & {
    hero: DemoContent['hero'] & { scene?: string };
    hero_media?: number | null; hero_product?: number | null; products?: { i: number; line: string }[];
    spotlight?: { media?: number; kicker?: string; title?: string; callouts?: string[] } | null;
    scenes?: { media?: number; kicker?: string; title?: string; text?: string; scene?: string }[]; gallery?: number[];
  };
  const raw = json<Raw>(text);
  const hex = (v: unknown, d: string) => (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) ? v : d);
  const c: DemoContent = { ...raw, products: undefined, spotlight: null, scenes: [], gallery: [] };
  c.theme = { bg: hex(raw.theme?.bg, '#faf7f2'), ink: hex(raw.theme?.ink, '#1d1b1a'), accent: hex(raw.theme?.accent, '#9a5b4f'), soft: hex(raw.theme?.soft, '#f1e4df') };
  c.palette = { from: c.theme.accent, to: c.theme.soft, accent: c.theme.accent };
  c.font = ['editorial', 'modern', 'soft'].includes(raw.font ?? '') ? raw.font : 'editorial';
  c.style = 'luxe';
  c.offer = (raw.offer ?? []).slice(0, 3); c.features = []; c.flow = (raw.flow ?? []).slice(0, 4); c.pages = (raw.categories ?? []).slice(0, 5);
  c.categories = (raw.categories ?? []).slice(0, 6); c.facts = (raw.facts ?? []).slice(0, 5); c.redesign = site ? (raw.redesign ?? []).slice(0, 3) : [];
  // Every image and product fact comes from the scan, never from the model.
  const media = site ? (site.media ?? site.images.map((src) => ({ src, alt: '' }))) : [];
  const pick = (i: unknown) => (typeof i === 'number' ? media[i]?.src ?? null : null);
  const sp = site?.products ?? [];
  c.products = (raw.products ?? []).map((p) => ({ p: sp[p.i], line: p.line })).filter((x) => x.p)
    .slice(0, 8).map(({ p, line }) => ({ title: p!.title, line: String(line ?? '').slice(0, 120), price: p!.price, compare: p!.compare, image: p!.image, url: p!.url }));
  c.hero_image = pick(raw.hero_media) ?? site?.ogImage ?? c.products[0]?.image ?? null;
  c.hero_cutout = !!raw.hero_cutout && !!pick(raw.hero_media);
  const floatP = typeof raw.hero_product === 'number' ? sp[raw.hero_product] : undefined;
  c.hero_float = [floatP?.image, ...sp.map((p) => p.image)].find((u) => !!u && /\.(png|webp)(\?|$)/i.test(u)) ?? null;
  const spot = pick(raw.spotlight?.media) ?? c.products[0]?.image ?? null;
  c.spotlight = spot && raw.spotlight ? { image: spot, kicker: String(raw.spotlight.kicker ?? ''), title: String(raw.spotlight.title ?? ''), callouts: (raw.spotlight.callouts ?? []).slice(0, 4).map(String) } : null;
  // Hero scenes are captions over studio sets; art-directed scene photos are added by the team.
  c.scenes = (raw.scenes ?? []).map((x) => ({ image: null, brief: String(x.scene ?? '').slice(0, 400), kicker: String(x.kicker ?? ''), title: String(x.title ?? ''), text: String(x.text ?? '') })).filter((x) => x.title).slice(0, 3);
  c.hero_brief = String(raw.hero?.scene ?? '').slice(0, 400);
  c.hero = { eyebrow: raw.hero?.eyebrow ?? '', headline: raw.hero?.headline ?? c.brand, sub: raw.hero?.sub ?? '' };
  c.hero_scene = null;
  const used = new Set([c.hero_image, spot]);
  c.gallery = (raw.gallery ?? []).map(pick).filter((x): x is string => !!x && !used.has(x)).slice(0, 6);
  c.catalog = sp.map((p, i) => ({ title: p.title, handle: p.handle ?? `item-${i + 1}`, price: p.price, compare: p.compare, image: p.image, images: p.images, type: p.type, description: p.description ?? '' }));
  c.site_url = site?.url ?? null;
  c.logo = site?.logo ?? null;
  return c;
}

/**
 * Art-direct the demo: generate the hero scene photos (their real product in
 * every frame for a store) and score how ready it is to send.
 */
export async function artDirect(c: DemoContent, slug: string): Promise<DemoContent> {
  const briefs = [c.hero_brief, ...(c.scenes ?? []).map((x) => x.brief)].map((b) => (b ?? '').trim());
  if (scenesConfigured() && briefs.some(Boolean)) {
    const store = (c.catalog?.length ?? 0) > 0;
    const product = store ? c.hero_float ?? c.products?.[0]?.image ?? c.catalog?.[0]?.image ?? null : null;
    const palette = c.theme ? `${c.theme.bg}, ${c.theme.soft}, ${c.theme.accent}` : 'their brand colours';
    const made = await generateScenes(slug, briefs.map((b) => b || `${c.brand}, ${c.industry}`), { productImage: product, palette });
    c.hero_scene = made[0] ?? null;
    c.scenes = (c.scenes ?? []).map((x, i) => ({ ...x, image: made[i + 1] ?? null }));
    // Scenes are composed with the subject about 62% across; the hotspot and phone crop follow it.
    const spot = { x: 62, y: 45, s: 1 };
    c.hero_float_pos = spot;
    c.scenes = c.scenes.map((x) => ({ ...x, float: spot }));
    c.scenes_show_product = !!product && made.filter(Boolean).length >= 2;
  }
  c.quality = demoQuality(c);
  return c;
}

const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 40) || 'demo';
/** Leads scoring below this are held for a person: no demo is drafted for them. */
const HOLD_BELOW = Number(process.env.BYBO_LEAD_HOLD_BELOW ?? 50);
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
    ...(() => { const q = (d.content as DemoContent).quality; return q ? [`Ready score: ${q.score}/100.${q.issues.length ? ` To check: ${q.issues.join('; ')}.` : ''}`] : []; })(),
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
      const low = !fake && (intel.score ?? 0) < HOLD_BELOW;
      await rpc('bybo_ap_set', { p_lead: l.id, p: {
        autopilot: fake ? 'needs_review' : low ? 'held' : 'qualified', quality: intel.quality, quality_score: String(intel.score ?? ''),
        intel, temperature: fake ? '' : intel.temperature ?? '', company: intel.business?.name ?? '',
      } });
      await log(l.id, fake || low ? 'alert' : 'research', fake ? `Likely fake (${intel.score}/100): held for your review` : low ? `Low score (${intel.score}/100): held, no demo drafted` : `Researched: ${intel.quality} lead, ${intel.score}/100`,
        [intel.business?.what_they_do, ...(intel.reasons ?? []).map((r) => `• ${r}`), intel.pitch ? `Pitch: ${intel.pitch}` : ''].filter(Boolean).join('\n'), { sources: intel.sources ?? [] });
      return `${who}: ${intel.quality} (${intel.score})${low ? ', held' : ''}`;
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
      const draft = await draftDemo(l, intel);
      // Research notes sometimes ride along in names ("Saree (unverified …)"): keep the name itself.
      draft.brand = (draft.brand || intel.business?.name || l.company || l.name || 'Demo').replace(/\s*[([—–-]\s*(unverified|unknown|not found).*$/i, '').replace(/\s*\(.*$/, '').trim();
      const slug = `${slugify(draft.brand)}-${randomBytes(2).toString('hex')}`;
      const content = await artDirect(draft, slug);
      const demo = await rpc<Demo>('bybo_demo_upsert', { p: { lead_id: l.id, slug, kind: 'auto', status: 'awaiting_approval', content } });
      await rpc('bybo_ap_set', { p_lead: l.id, p: { autopilot: 'awaiting_approval' } });
      await log(l.id, 'demo', `Demo drafted (ready score ${content.quality?.score ?? '?'}/100): waiting for your approval`, [demoUrl(slug), ...(content.quality?.issues ?? []).map((i) => `• ${i}`)].join('\n'), { slug });
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
  // Drafting a demo makes several images; one per run keeps it inside the time limit.
  let drafted = false;
  for (const l of due) {
    if (l.autopilot === 'qualified') { if (drafted) continue; drafted = true; }
    out.push(await step(l));
  }
  return out;
}

/** Approved by a person: email the demo to the client and move the lead on. */
export async function sendDemo(demo: Demo, lead: CrmLead, message?: string): Promise<{ ok: boolean; reason?: string }> {
  if (!lead.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) return { ok: false, reason: 'no_email' };
  const link = demo.kind === 'custom' && demo.url ? demo.url : demoUrl(demo.slug);
  const first = (lead.name ?? '').trim().split(/\s+/)[0] || 'there';
  const brand = (demo.content as DemoContent).brand || lead.company || 'your business';
  // A person can write their own note when approving; otherwise the standard one.
  const body = message?.trim()
    ? message.trim().split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean).slice(0, 8)
    : [
      `Hi ${first},`,
      `Thanks for your interest in BYBO. We put together a short demo of how ${brand} could look and work online, with every enquiry captured and answered quickly.`,
      'Have a look, and reply with a time that suits you for a 20-minute walkthrough. We can tailor every part of it to you.',
    ];
  const ok = await email([lead.email], `Your BYBO demo for ${brand} is ready`, `${first}, here is what we would build for ${brand}`, body, { href: link, label: 'See your demo' }, { bcc: ['byboonline@gmail.com'], key: `demo-send/${demo.id}` });
  if (!ok) return { ok: false, reason: 'send_failed' };
  await rpc('bybo_demo_upsert', { p: { id: demo.id, status: 'sent' } });
  await rpc('bybo_ap_set', { p_lead: lead.id, p: { autopilot: 'sent' } });
  // A demo is not a proposal: it moves a lead to Demo sent, and never backwards.
  if (['new', 'contacted'].includes(lead.stage)) await rpc('bybo_crm_update', { p_lead: lead.id, p: { stage: 'demo_sent' } }).catch(() => null);
  await log(lead.id, 'email', `Demo approved and emailed: ${brand}`, [link, ...body].join('\n\n'), { slug: demo.slug });
  return { ok: true };
}
