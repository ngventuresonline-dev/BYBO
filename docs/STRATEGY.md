# BYBO — Strategy, Design & Build Plan

**AI systems built around your business.**
Status: drafted 2026-07-30 · Owner: founding team · Location: Bengaluru, India

---

## 0. Where the site actually is right now

There are **two BYBOs in this codebase**, built four hours apart, and they don't talk to each other.

| | Old build (21:47–22:18) | New build (23:49–23:53) |
|---|---|---|
| Identity | AI marketing agency for SMBs | AI systems partner |
| Design | Light: `.card`, `.btn-primary`, `bg-paper`, `text-ink` | Dark technical: `.technical-card`, `.signal-button`, void/cream/signal |
| Offer | ₹24,999/mo tiers, posts-per-week, ad ROAS | Diagnose → Deploy → Operate → Productize |
| Files | `page.tsx`, 11 `sections/*`, `/pricing`, `/solutions/ai-marketing` | `globals.css`, `layout.tsx`, `Navbar`, `Footer`, `lib/content.ts`, 4 new components |

**Consequences today:**

1. **The homepage renders broken.** `page.tsx` still imports the 11 legacy sections, which reference ~76 class names (`card`, `btn-primary`, `section-pad`, `bg-paper`, `text-ink`, `border-border`, `text-accent`) that no longer exist in `globals.css`. Nothing defines them. Cards have no borders, buttons are plain links, backgrounds are missing.
2. **Every nav link 404s.** `Navbar` points at `/systems`, `/blueprint`, `/how-we-work`, `/industries`, `/insights`, `/about`, `/apply`. `Footer` adds `/systems/[slug]` ×5 and `/privacy`. **None of these routes exist.** Only `/`, `/pricing`, `/solutions/ai-marketing` do — and the last two aren't linked from anywhere.
3. **Four good components are orphaned.** `HeroUniverse`, `LiveSystemPanel`, `WorkflowExplorer`, `OpportunityFinder` are written but imported nowhere.

The new build is the right one. This document assumes we finish it and retire the old one.

---

## 1. The strategic idea

### The market BYBO is actually in

Bengaluru has several hundred agencies selling "AI marketing." They sell **builds**: a chatbot, a content pipeline, an ad account. Builds are one-time, undifferentiated, and price-compressed toward zero. The old ₹24,999/mo pricing page puts BYBO squarely in that fight — a fight with no winner.

The new `engagementStages` in `lib/content.ts` describe a completely different business:

> Diagnose (paid) → Deploy → Operate → Productize

That is the shape of a **systems firm**, not an agency. It is the Palantir / QuantumBlack / Thoughtworks structure, sold at Indian mid-market prices. It is defensible, it compounds, and almost nobody in this market is executing it properly.

### The one-line thesis

> **Most firms sell you AI. BYBO runs it.**

The money and the moat are not in the build — they're in **operating the system after it goes live**: monitoring, failure review, knowledge maintenance, cost control, evaluation, continuous improvement. Once BYBO operates a company's revenue or support workflow under an SLA, BYBO doesn't get swapped out. The build is the entry fee; operations is the business.

### What "world-class" means here, concretely

Four things, none of them cosmetic:

1. **A paid front door.** Free audits attract tyre-kickers and signal that the thinking is worthless. The Blueprint must be paid.
2. **Accountability language.** Escalation policy, evaluation, confidence thresholds, audit trails, human-in-the-loop as a *design decision*. This is already the voice in `content.ts` — it's the single biggest differentiator on the page.
3. **Evidence over adjectives.** No invented metrics (see §5).
4. **Design that reads as instrumentation, not marketing.** The dark technical system already does this.

---

## 2. The commercial model

Replace the three-tier SaaS-style pricing grid with a four-stage engagement ladder.

### Stage 1 — Blueprint (paid diagnostic, 7–10 days)
**₹75,000 – ₹1,50,000. Credited against implementation if we proceed.**

Deliverables:
- Workflow map of the target function (as-is, with hand-offs and decision points)
- **Leakage quantified in ₹/year** — the number that makes the rest of the conversation easy
- Opportunity ranking scored on impact × feasibility × risk
- Data, integration, and control readiness assessment
- Go / no-go recommendation, including *what not to automate*
- 90-day roadmap with named owners

Why this is the most important page on the site: it converts "interesting" into revenue in week one, filters unserious buyers, and makes the implementation sale nearly automatic. Firms that charge for diagnosis close implementation at 3–5× the rate of firms that give it away.

### Stage 2 — Deploy (4–12 weeks)
**₹3,00,000 – ₹25,00,000** depending on scope, integrations, and control requirements.
Build, connect real tools and data, add guardrails and escalation, test against representative cases, train the team, hand over runbooks.

### Stage 3 — Operate (ongoing retainer + SLA)
**₹50,000 – ₹3,00,000 / month.**
Monitoring, failure review, knowledge maintenance, model/cost management, evaluation runs, workflow improvement. This is the compounding line and should be **the majority of revenue by month 18**.

### Stage 4 — Productize
Patterns that repeat across three or more clients become modules. Deployment time falls, margin rises, quality improves with every implementation.

### Two decisions to make now

- **Retire `/pricing`.** Publishing ₹24,999 permanently caps deal size and contradicts the positioning. Redirect `/pricing` → `/blueprint`.
- **Kill the "Launch" tier.** Sub-₹25K clients consume more support than they generate revenue and anchor the brand at the bottom of the market.

---

## 3. Leading businesses, their use cases, and what BYBO provides

`lib/content.ts` currently has three industry buckets. They're the right taxonomy but too abstract to sell against — a prospect must see *their own business* on the page. Keep the three buckets; populate each with named verticals, real workflows, and a metric that matters to that buyer.

### Bucket A — Consumer brands
*D2C, e-commerce, retail chains, hospitality, salons, multi-location*

| Vertical | What actually hurts | BYBO systems | The metric that closes the deal |
|---|---|---|---|
| **D2C / e-commerce** (₹5–50 Cr) | WISMO tickets swamp support; RTO 25–40%; creative testing is guesswork; thousands of reviews unread | Customer Experience + Revenue + Brand Intelligence + Decision Intelligence | **RTO reduction.** 5 points off RTO on ₹20 Cr GMV ≈ ₹1 Cr to the bottom line — which justifies a ₹25 L/yr engagement in one sentence |
| **Restaurants / hospitality** | Phone bookings lost at peak; reviews unanswered; outlet performance opaque | CX (booking + reschedule), Brand Intelligence (review response at scale, per-outlet sentiment), Decision (outlet league tables) | Covers captured per shift; review response rate |
| **Multi-location retail / salons / spas** | SOP drift between outlets; no-shows; manager reporting by WhatsApp screenshot | CX, Operations (SOP assistant), Decision | No-show rate; per-outlet variance |

### Bucket B — High-consideration businesses
*Long, complex, human buying journeys*

| Vertical | What actually hurts | BYBO systems | The metric that closes the deal |
|---|---|---|---|
| **Real estate / developers / brokerages** | ₹8–15 K cost per lead; under 20% of leads called within an hour; 50%+ site-visit no-shows | Revenue (instant multilingual qualification, site-visit booking, no-show recovery), Decision (channel → booking attribution) | **Cost per site visit** — not cost per lead. Reframing the metric *is* the pitch |
| **Healthcare — clinics, dental, derm, fertility, diagnostics** | Front-desk phone abandonment; 20–30% appointment no-shows; pre-auth paperwork; missed patient recalls | CX (24/7 booking/reschedule, strict no-clinical-advice guardrails), Operations (pre-auth extraction, discharge summaries), Revenue (recall campaigns) | No-show rate; chair/slot utilisation. **Escalation design is the product here** |
| **Education / edtech / test prep / K-12 chains** | Counsellor bandwidth collapses in admissions season; inbound spikes 10×; fee follow-up; parent comms | Revenue (admissions qualification + counsellor routing), CX (parent WhatsApp), Operations (fee reconciliation) | Applications per counsellor; fee collection cycle time |
| **BFSI-adjacent — lending, insurance broking, wealth** | KYC/document processing by hand; compliance-bound comms; agent training; claims paperwork | Operations (document extraction + validation — highest ROI in this table), CX (hard guardrails), Decision (portfolio/risk) | Turnaround time per file. **Sell the audit trail and evaluation harness as the product** |
| **Professional services — law, CA/audit, architecture** | Billable hours burned on document review, proposals, research | Operations (contract/document review, knowledge assistant over past matters), Revenue (proposal generation) | Realisation rate; hours recovered per fee-earner |

### Bucket C — Operations-led teams
*Where documents, approvals and coordination set speed and margin*

| Vertical | What actually hurts | BYBO systems | The metric that closes the deal |
|---|---|---|---|
| **Manufacturing / B2B industrial / exporters** | RFQ → quote takes days; tribal knowledge sits with one person; vendor document chaos; no demand visibility | Operations (RFQ parsing → quote drafting, spec-sheet Q&A), Revenue (dealer/distributor follow-up), Decision (order-book forecasting) | Quote turnaround time; win rate. **Largest whitespace in the Indian market — almost nobody is selling AI properly here** |
| **Logistics / 3PL / fleet** | POD and invoice processing by hand; exception handling; constant status calls | Operations (POD/invoice extraction, exception routing), CX (status) | Documents processed per FTE; exception resolution time |
| **SaaS / tech (₹10–100 Cr ARR)** | Support deflection, onboarding load, churn signals spotted late | CX, Decision (usage → churn risk) | Ticket deflection %; net revenue retention |

**How to use this on the site:** `/industries` shows the three buckets; each expands to its verticals; each vertical gets one honest before → system → after triad in the exact style already written in `content.ts`. A prospect should be able to point at a row and say *that's us*.

---

## 4. The five systems — keep them, sharpen them

The five systems in `content.ts` are well-built and correctly named. No structural change needed.

| # | System | Sells to | Sharpen by |
|---|---|---|---|
| 01 | Revenue Systems | Real estate, education, D2C, manufacturing | Lead with speed-to-first-response; it's measurable on day one |
| 02 | Customer Experience | D2C, healthcare, hospitality, SaaS | Lead with the **escalation policy**, not the bot. Trust is the sale |
| 03 | Brand Intelligence | Consumer brands | Position as research infrastructure, not content generation. This is what separates it from the 500 content agencies |
| 04 | Business Operations | BFSI, manufacturing, logistics, professional services | Highest and most provable ROI in the portfolio. Should probably be the **lead** system, not #04 |
| 05 | Decision Intelligence | Every bucket, sold to the founder/CXO | The natural expansion sale after any of the other four |

**Recommendation:** consider reordering so Business Operations sits earlier. It has the shortest proof cycle, the clearest ₹ math, and the least competitive noise.

---

## 5. The credibility problem (fix before launch)

Every number currently on the site is invented:

- `3× leads in 60 days` · `50% lower CAC` · `3.2× ROAS` · `20+ posts/wk` · `+23% leads today`
- A case study attributed to *"Founder, Bangalore"* — no name, no company, no logo
- A `LogoStrip` of companies BYBO has not worked with

The buyers this positioning targets — a manufacturing MD, a hospital COO, a ₹30 Cr D2C founder — will discount all of it instantly, and it undermines the accountability message that is BYBO's actual advantage.

**The fix, which is also a differentiator:** ship *mechanism transparency* instead of fabricated outcomes. The before → system → after triads already written in `content.ts` are honest, specific, and more persuasive than a fake multiplier:

> *Before:* A new lead arrives after hours and waits until the next morning.
> *System:* The system answers, qualifies intent, captures context, and offers the right next step.
> *After:* The sales team starts the day with a prioritised, documented conversation.

Then add a line the competition cannot copy:

> **We don't publish results we can't attribute.**

Publish real numbers only when a named client goes on record. Until then, sell the method — which is what serious buyers are actually evaluating.

---

## 6. Design direction

The dark technical system in `globals.css` is the right call and is already well-executed. Void `#080808`, cream `#f1f0eb`, single signal orange `#ff5722`, Archivo at `-0.065em` tracking, IBM Plex Mono for labels, grid field, grain, scan line. That reads Linear × Palantir × Vercel — exactly the right neighbourhood for a firm that says it operates production systems.

### Seven rules that make it world-class rather than merely dark

1. **One accent, ruthlessly.** `#ff5722` appears only on: eyebrow markers, the primary CTA, the active nav item, and the single most important number on a page. Never decorative. Discipline here is 80% of the perceived quality.
2. **Mono is the system's voice.** Labels, indices (`01 / Bottleneck`), status, and metadata in Plex Mono uppercase at `0.15em`. It signals *instrumented system*, not *marketing page*.
3. **Evidence over illustration.** No stock 3D orbs, no glowing brains, no neural-net wallpaper. Every visual must be a legible artifact: a workflow diagram, a live system panel, a before/after trace, an evaluation table. `LiveSystemPanel` and `WorkflowExplorer` are exactly the right instinct.
4. **Motion with restraint.** Entrances only, 200–400 ms, on the existing `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`. No parallax, no scroll-jacking. The `prefers-reduced-motion` block is already correct.
5. **Interactive proof, not interactive toys.** `OpportunityFinder` is a genuine asset — three questions, a real recommendation, and a routed `/apply?system=&volume=&readiness=` handoff. Build one more: an **AI Leakage Calculator** (volume × handle time × loaded cost → ₹ leaked per year). That will be the highest-converting page on the site, because it hands the prospect the number they need to justify the Blueprint internally.
6. **Typography is the layout.** `display-title` at `clamp(3.25rem, 8vw, 7.75rem)` / `0.88` line-height. Mostly single-column, generous `--section-y`. Confidence reads as space.
7. **The grid and grain are the entire texture budget.** No gradient decoration, no glassmorphism, no glow.

### Explicit anti-patterns

Purple/blue "AI" gradients · rocket emoji · a floating bubble saying "Hi! I'm an AI 👋" · stock photos of people pointing at dashboards · logo strips of companies you haven't worked with · any headline containing "revolutionise" or "unlock the power of."

### One hard constraint

The dark decision is made. **Legacy components must be rebuilt on `.technical-card` / `.signal-button` / `.ghost-button`, not patched.** Do not reintroduce `.card` / `.btn-primary` / `bg-paper`.

---

## 7. Information architecture

**13 routes. 3 exist, 2 of those must be retired.**

| Route | Status | Purpose |
|---|---|---|
| `/` | exists, **broken** | Rebuild on new system with `HeroUniverse`, `LiveSystemPanel`, `WorkflowExplorer`, `OpportunityFinder` |
| `/systems` | 404 | Index of the five systems |
| `/systems/[slug]` ×5 | 404 | Generated from `content.ts` — pains, capabilities, outcomes, before/system/after |
| `/blueprint` | 404 | **The money page.** Paid diagnostic: scope, deliverables, timeline, price, what it excludes |
| `/how-we-work` | 404 | Four stages + governance, evaluation, escalation, cost control |
| `/industries` | 404 | 3 buckets × verticals from §3 |
| `/insights` | 404 | Article index — 3 already outlined in `content.ts` |
| `/insights/[slug]` | 404 | Article detail |
| `/about` | 404 | Thesis, team, BCON Club relationship |
| `/apply` | 404 | Qualification form — accepts `?system=&volume=&readiness=` |
| `/privacy` | 404 | Legal |
| `/pricing` | exists, stale | **301 → `/blueprint`** |
| `/solutions/ai-marketing` | exists, stale | **301 → `/systems/brand-intelligence`** |

### `/apply` is a qualification form, not a contact form

Fields: company · role · revenue band · which bottleneck · current stack · timeline · budget band. It must consume the query params `OpportunityFinder` already sends. Half of this funnel is already built — it just has nowhere to land.

---

## 8. Build roadmap

### Phase 0 — Stop the bleeding *(~2 hours)*
The homepage is broken right now.
- Rewrite `page.tsx` onto the new design system
- Wire in `HeroUniverse`, `LiveSystemPanel`, `WorkflowExplorer`, `OpportunityFinder`
- Quarantine the 11 legacy `sections/*` components
- Verify a clean `next build`

### Phase 1 — Make the navigation honest *(1–2 days)*
- `/systems` + `/systems/[slug]` ×5 — near-free, `content.ts` already holds the data
- `/how-we-work`, `/industries`, `/about`, `/insights`, `/privacy`
- Redirects for `/pricing` and `/solutions/ai-marketing`

### Phase 2 — The money pages *(2–3 days)*
- `/blueprint` — full offer, scope, price, exclusions
- `/apply` — qualification form with param capture and a real submission handler
- **AI Leakage Calculator**

### Phase 3 — Depth *(1 week)*
- `/industries` expanded to the full vertical matrix in §3
- `/how-we-work` with real governance, evaluation and escalation detail
- The three `insightArticles` actually written — they're strong titles and worth real essays

### Phase 4 — Proof and polish
- Real, attributed case studies as they land
- OG images, `sitemap.xml`, `robots.txt`, `schema.org` Organization + Service
- Analytics and conversion tracking on Blueprint / Apply
- Lighthouse pass, accessibility audit, mobile QA

---

## 9. The three decisions that need a call

1. **Retire the ₹24,999 pricing page in favour of a paid Blueprint?** — Recommended: yes. It is the difference between an agency and a firm.
2. **Ship mechanism transparency instead of invented metrics until real cases exist?** — Recommended: yes. It's honest and it out-positions everyone.
3. **Promote Business Operations ahead of Revenue Systems as the lead offer?** — Recommended: yes, for the manufacturing/BFSI/logistics segment. Shortest proof cycle, clearest ₹ math, least competition.
