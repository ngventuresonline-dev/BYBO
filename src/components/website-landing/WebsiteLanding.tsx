'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowDown, Check, X, Plus, MousePointer2, FileText, PenLine, Palette, Smartphone, Gauge, Settings2, ShieldCheck, MessageSquare, BadgeCheck } from 'lucide-react';
import { concepts, ConceptDemo, type ConceptId } from '@/components/studio/WebsiteCinema';
import { trackLead } from '@/lib/analytics';
import { CONTACT } from '@/lib/site';
import './website-landing.css';

const GOALS = ['Get more enquiries', 'Sell products online', 'Take bookings', 'Show my work', 'Explain a product or app', 'Not sure yet'];

const TRUST = ['The first conversation is free', 'Written quote before any work', 'You approve it before launch'];

const BUILT_FOR = ['Online stores', 'Restaurants & cafés', 'Clinics', 'Real estate', 'SaaS & apps', 'Creators', 'Consultants & firms', 'Schools & coaching', 'D2C brands', 'Hotels & stays'];

const PROBLEMS: [string, string][] = [
  ['Squeezed onto phones', 'Most people meet you on a phone. Desktop pages shrunk sideways lose them in seconds.'],
  ['Lots of words, no next step', 'Visitors read, nod and leave, because nothing tells them what to do next.'],
  ['Nobody can update it', 'A price or a paragraph changes, and someone has to call a developer.'],
];

const GET: { Icon: typeof FileText; t: string; d: string }[] = [
  { Icon: FileText, t: 'Strategy & sitemap', d: 'Every page planned with the job it does and where it sends the visitor next.' },
  { Icon: PenLine, t: 'Copy, written for you', d: 'Headlines, pages and calls to action, drafted with you and approved by you.' },
  { Icon: Palette, t: 'A look that is yours', d: 'Typography, colour and layout shown as complete pages, not a mood board.' },
  { Icon: Smartphone, t: 'Mobile first', d: 'Designed for the phone first, then scaled up. Tested across common devices.' },
  { Icon: Gauge, t: 'Fast & findable', d: 'Loading performance, accessible controls and the basics of search, built in.' },
  { Icon: Settings2, t: 'Yours to edit', d: 'Content tools set up for your team, plus a handover session and written guide.' },
];

const COMPARE: [string, string, string][] = [
  ['Copy', 'You write it yourself', 'Written with you, by us'],
  ['On a phone', 'The desktop page, squeezed', 'Designed for the phone first'],
  ['Next step', 'A contact page, somewhere', 'A clear action on every page'],
  ['The look', 'Like everyone else using it', 'Unmistakably yours'],
  ['Changes', 'Call a developer', 'Your team edits it'],
  ['Connections', 'Whatever the plugins allow', 'Scoped to your tools'],
];

const STEPS: [string, string][] = [
  ['Discover', 'Your audience, goals and the job each page does.'],
  ['Shape', 'Sitemap and real copy, in the real order.'],
  ['Design', 'Complete pages, phone and desktop.'],
  ['Review', 'You approve everything before it goes live.'],
  ['Launch', 'Built, tested, published and handed over.'],
];

const FAQ: [string, string][] = [
  ['How much does a website cost?', 'It depends on what the site has to do. A five-page site for a practice and a store with payments and delivery are different builds. We scope it with you, then quote once, in writing, with deliverables, fee and schedule before any paid work starts.'],
  ['We have never written website copy. Is that a problem?', 'No. We draft it. We interview you, work from how you actually describe the business, and write the pages for your review. The business claims stay yours to approve.'],
  ['What if we do not like the design?', 'That is what the review stage is for, and it is the cheapest place to change your mind. You see complete pages with your own content before anything is built.'],
  ['Can our team update the site after launch?', 'Yes. We set up content tools for your team and run a handover session. Ongoing support is optional and scoped separately if you want it.'],
  ['Will it show up on Google?', 'We build the foundations properly: clean structure, sensible titles, fast loading, good mobile behaviour and redirects from any old pages. Rankings depend on more than the build, and we will say so honestly.'],
  ['Are the six sites on this page real clients?', 'No. They are fictional brands we designed and built to show how differently a store, a restaurant or a clinic can feel. Every button in them works, but no order or booking is taken.'],
];

/** The lead form, used in the hero and again at the end. Posts to the same endpoint as /apply. */
function QuickBrief({ id, dark = false }: { id: string; dark?: boolean }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [fallback, setFallback] = useState('');

  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const goal = String(data.get('goal') || 'Not sure yet');
    const site = String(data.get('website') || '').trim();
    data.set('message', `Website enquiry from the website studio page.\nThe site needs to: ${goal}\nCurrent website: ${site || 'None yet'}`);
    data.append('services', 'Website Design & Development');
    setState('sending'); setFallback('');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body: data });
      const out = await res.json().catch(() => ({ ok: false }));
      if (out.ok) { setState('sent'); trackLead({ content_name: 'website_studio_enquiry' }); form.reset(); return; }
      // If the inbox is unavailable, hand the enquiry to the visitor's own email client rather than lose it.
      setFallback(`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Website enquiry from ${data.get('name')}`)}&body=${encodeURIComponent(String(data.get('message')) + `\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}`)}`);
      setState('error');
    } catch { setState('error'); }
  }

  if (state === 'sent') return (
    <div className={`wl-form wl-form-sent${dark ? ' wl-form-dark' : ''}`} role="status">
      <span className="wl-sent-icon"><Check size={28} /></span>
      <h3>That is with us.</h3>
      <p>We read every enquiry ourselves and reply within one working day, usually sooner.</p>
    </div>
  );

  return (
    <form className={`wl-form${dark ? ' wl-form-dark' : ''}`} onSubmit={send} aria-labelledby={`${id}-title`}>
      <p className="wl-form-title" id={`${id}-title`}>Start your website</p>
      <div className="wl-fields">
        <label><span>Your name</span><input name="name" required autoComplete="name" placeholder="Priya Sharma" /></label>
        <label><span>Work email</span><input name="email" type="email" required autoComplete="email" inputMode="email" placeholder="priya@company.in" /></label>
        <label className="wl-field-wide"><span>The site needs to…</span>
          <select name="goal" defaultValue="Get more enquiries">{GOALS.map(g => <option key={g}>{g}</option>)}</select>
        </label>
        <label className="wl-field-wide"><span>Current website <em>(optional)</em></span><input name="website" inputMode="url" autoComplete="url" placeholder="yourbusiness.in" /></label>
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="wl-trap" />
      <button className="wl-cta" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : <>Get started <ArrowRight size={19} /></>}</button>
      <p className="wl-form-note"><ShieldCheck size={14} /> Free to talk. We reply within one working day.</p>
      {state === 'error' && <p className="wl-form-error" role="alert">That did not send. {fallback ? <a href={fallback}>Email it to us instead</a> : <>Please email <a href={CONTACT.emailHref}>{CONTACT.email}</a>.</>}</p>}
    </form>
  );
}

/** Concept covers crossfading inside a phone and a laptop: the hero's proof of craft. */
function DeviceStack() {
  const shots = ['shop', 'restaurant', 'property', 'creator'];
  return (
    <div className="wl-devices" aria-hidden>
      <div className="wl-laptop"><div className="wl-laptop-screen">{shots.map((s, i) => <span key={s} className="wl-shot" style={{ animationDelay: `${i * 3.5}s` }}><Image src={`/images/hero/${s}.webp`} alt="" fill sizes="(max-width: 760px) 90vw, 46vw" priority={i === 0} /></span>)}</div><div className="wl-laptop-base" /></div>
      <div className="wl-phone"><div className="wl-phone-screen">{['consulting', 'saas', 'shop', 'restaurant'].map((s, i) => <span key={s} className="wl-shot" style={{ animationDelay: `${i * 3.5 + 1.75}s` }}><Image src={`/images/hero/m/${s}.webp`} alt="" fill sizes="(max-width: 760px) 40vw, 16vw" /></span>)}</div></div>
      <span className="wl-chip wl-chip-1"><Smartphone size={14} /> Mobile first</span>
      <span className="wl-chip wl-chip-2"><PenLine size={14} /> Copy included</span>
      <span className="wl-chip wl-chip-3"><Settings2 size={14} /> Yours to edit</span>
    </div>
  );
}

/** The six concept sites, live, in a phone frame on small screens and a browser frame on large ones. */
function TryIt() {
  const [sel, setSel] = useState<ConceptId>('shop');
  const c = concepts.find(x => x.id === sel)!;
  return (
    <div className="wl-try">
      <div className="wl-try-tabs" role="tablist" aria-label="Choose a concept website">
        {concepts.map(x => (
          <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}>
            <span className="wl-try-thumb"><Image src={`/images/hero/m/${x.image === 'consulting' ? 'consulting' : x.image}.webp`} alt="" fill sizes="56px" /></span>
            <span><strong>{x.brand}</strong><small>{x.label}</small></span>
          </button>
        ))}
      </div>
      <div className="wl-try-stage">
        <div className="wl-frame">
          <div className="wl-frame-bar"><i /><i /><i /><span>{c.brand.toLowerCase().replaceAll(' / ', '-').replaceAll(' ', '')}.in</span></div>
          {/* the demos were built for the studio page and rely on its scope classes */}
          <div className="wc-page wl-frame-scope"><div className="wc-demo-screen"><ConceptDemo key={sel} id={sel} /></div></div>
        </div>
        <p className="wl-try-hint"><MousePointer2 size={15} /> {c.hint}</p>
      </div>
    </div>
  );
}

export function WebsiteLanding() {
  const heroForm = useRef<HTMLDivElement>(null);
  const endForm = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);

  /* The sticky bar shows between the hero form and the closing section: never over either form, never over the footer. */
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const hero = heroForm.current?.getBoundingClientRect();
      const end = endForm.current?.closest('section')?.getBoundingClientRect();
      if (!hero || !end) return;
      setShowBar(hero.bottom < 0 && end.top > window.innerHeight * 0.85);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="wl">
      {/* ================= hero ================= */}
      <section className="wl-hero">
        <div className="wl-hero-glow" aria-hidden />
        <div className="container wl-hero-grid">
          <div className="wl-hero-copy">
            <p className="wl-eyebrow"><span className="wl-dot" /> BYBO WEBSITE STUDIO · BENGALURU</p>
            <h1>Your website should be your best <em>salesperson.</em></h1>
            <p className="wl-lede">We plan, write, design and build mobile-first websites that turn visitors into enquiries, bookings and sales. One team, from the first call to launch.</p>
            <ul className="wl-trust">{TRUST.map(t => <li key={t}><BadgeCheck size={17} />{t}</li>)}</ul>
          </div>
          <div className="wl-hero-form" ref={heroForm} id="start"><QuickBrief id="hero-brief" /></div>
          <DeviceStack />
        </div>
      </section>

      {/* ================= built for ================= */}
      <div className="wl-marquee" aria-label="Who we build for">
        <div className="wl-marquee-track">{[...BUILT_FOR, ...BUILT_FOR].map((b, i) => <span key={i} aria-hidden={i >= BUILT_FOR.length || undefined}>{b}</span>)}</div>
      </div>

      {/* ================= problem ================= */}
      <section className="wl-problem">
        <div className="container">
          <p className="wl-kicker">The problem</p>
          <h2>Most websites look fine and <em>sell nothing.</em></h2>
          <div className="wl-problem-grid">
            {PROBLEMS.map(([t, d]) => <article key={t}><span className="wl-x"><X size={18} /></span><h3>{t}</h3><p>{d}</p></article>)}
          </div>
          <p className="wl-problem-fix"><Check size={20} /> We design for all three from the first conversation.</p>
        </div>
      </section>

      {/* ================= try it ================= */}
      <section className="wl-proof" id="work">
        <div className="container">
          <p className="wl-kicker">See it, then try it</p>
          <h2>Don’t take our word for it. <em>Tap through one.</em></h2>
          <p className="wl-sub">Six websites for six kinds of business. Every button works. They are fictional brands we built to show range, so no order or booking is taken.</p>
          <TryIt />
        </div>
      </section>

      {/* ================= what you get ================= */}
      <section className="wl-get">
        <div className="container">
          <p className="wl-kicker">What you get</p>
          <h2>Everything, <em>done for you.</em></h2>
          <div className="wl-get-grid">{GET.map(({ Icon, t, d }) => <article key={t}><span className="wl-get-icon"><Icon size={22} /></span><h3>{t}</h3><p>{d}</p></article>)}</div>
        </div>
      </section>

      {/* ================= compare ================= */}
      <section className="wl-compare">
        <div className="container">
          <p className="wl-kicker">Why not a template?</p>
          <h2>A template gives you pages. <em>We give you a website that works.</em></h2>
          <div className="wl-table" role="table" aria-label="A template compared with a BYBO website">
            <div className="wl-row wl-row-head" role="row"><span role="columnheader" /><span role="columnheader">A template</span><span role="columnheader">With BYBO</span></div>
            {COMPARE.map(([k, a, b]) => (
              <div className="wl-row" role="row" key={k}>
                <span role="rowheader">{k}</span>
                <span role="cell" className="wl-no"><X size={15} />{a}</span>
                <span role="cell" className="wl-yes"><Check size={15} />{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= process ================= */}
      <section className="wl-steps">
        <div className="container">
          <p className="wl-kicker">How it works</p>
          <h2>Five steps. <em>No surprises.</em></h2>
          <ol>{STEPS.map(([t, d], i) => <li key={t} data-gate={i === 3 ? '' : undefined}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{t}{i === 3 && <small>Your sign-off</small>}</h3><p>{d}</p></div></li>)}</ol>
        </div>
      </section>

      {/* ================= price ================= */}
      <section className="wl-price">
        <div className="container wl-price-card">
          <div>
            <p className="wl-kicker">The honest part</p>
            <h2>What does it <em>cost?</em></h2>
            <p>There is no price list, because a five-page site for a practice and a store that takes payments are not the same build. Tell us what the site has to do. We scope it with you and quote once, in writing, before any paid work starts.</p>
          </div>
          <ul>{['Number of pages', 'Copy and photography', 'Payments, bookings or accounts', 'Connections to your tools', 'Moving from an old site'].map(t => <li key={t}><Plus size={14} />{t}</li>)}</ul>
          <a className="wl-cta wl-cta-light" href="#final">Get a quote for your site <ArrowDown size={18} /></a>
        </div>
      </section>

      {/* ================= faq ================= */}
      <section className="wl-faq">
        <div className="container">
          <p className="wl-kicker">Questions</p>
          <h2>Asked before <em>every website.</em></h2>
          <div className="wl-faq-list">{FAQ.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<Plus size={20} /></summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      {/* ================= final ================= */}
      <section className="wl-final" id="final">
        <div className="wl-hero-glow" aria-hidden />
        <div className="container wl-final-grid">
          <div>
            <p className="wl-eyebrow"><MessageSquare size={14} /> START HERE</p>
            <h2>Let’s build the website your business <em>deserves.</em></h2>
            <ul className="wl-trust">{TRUST.map(t => <li key={t}><BadgeCheck size={17} />{t}</li>)}</ul>
          </div>
          <div ref={endForm}><QuickBrief id="final-brief" dark /></div>
        </div>
      </section>

      {/* ================= sticky bar (phones) ================= */}
      <div className={`wl-bar${showBar ? ' is-on' : ''}`} aria-hidden={!showBar}>
        <span>Free first conversation</span>
        <a className="wl-cta" href="#final" tabIndex={showBar ? 0 : -1}>Start your website <ArrowRight size={17} /></a>
      </div>
    </div>
  );
}
