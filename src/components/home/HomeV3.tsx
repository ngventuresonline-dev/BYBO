'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Plus, UserCheck, Play, Cpu, Globe, Smartphone, Clapperboard } from 'lucide-react';
import { services, industries } from '@/lib/redesign';
import './home-v3.css';

// the same aurora as the app studio; the CSS gradient underneath is the poster
const Aurora = dynamic(() => import('@/components/app-studio/AppShader'), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;
const SYSTEMS = services.filter(s => !['website-design-development', 'app-design-development', 'motion-studio'].includes(s.slug));

/* ---------------- hero: a live feed of work being done ---------------- */

type Ev = { t: string; what: string; who: string; gate?: boolean };
const EVENTS: Ev[] = [
  { t: '23:04', what: 'WhatsApp enquiry answered in 4 seconds', who: 'Customer AI' },
  { t: '23:05', what: 'Site visit booked for Saturday, 11 am', who: 'Customer AI' },
  { t: '09:12', what: 'Invoice matched to its purchase order', who: 'Business Operations' },
  { t: '09:14', what: 'Discount above the limit sent to Priya', who: 'Approval needed', gate: true },
  { t: '09:20', what: 'Policy question answered, with the source', who: 'Enterprise Knowledge' },
  { t: '09:31', what: 'Sales dip in Indiranagar flagged with the cause', who: 'Decision Intelligence' },
  { t: '09:40', what: 'Onboarding checklist moved to step 3', who: 'Agentic Operations' },
  { t: '09:52', what: 'Refund over ₹20,000 waiting for a manager', who: 'Approval needed', gate: true },
  { t: '10:05', what: 'New lead from the website, scored and routed', who: 'Website' },
];

function Feed() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref);
  const reduce = useReducedMotion();
  const [n, setN] = useState(4);
  useEffect(() => {
    if (!live || reduce) return;
    const id = setInterval(() => setN(v => v + 1), 2300);
    return () => clearInterval(id);
  }, [live, reduce]);
  const rows = Array.from({ length: 5 }, (_, i) => ({ ...EVENTS[(n - i + EVENTS.length * 10) % EVENTS.length], k: n - i }));
  return (
    <div className="h3-feed" ref={ref} aria-hidden>
      <div className="h3-feed-top"><span className="h3-dots"><i /><i /><i /></span><b>Your business, today</b><span className="h3-live"><i /> Live</span></div>
      <ol>
        <AnimatePresence initial={false}>
          {rows.map(r => (
            <motion.li key={r.k} layout data-gate={r.gate ? '' : undefined}
              initial={{ opacity: 0, y: -18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55, ease: EASE }}>
              <time>{r.t}</time>
              <span><b>{r.what}</b><small>{r.gate ? <><UserCheck size={12} /> {r.who}</> : r.who}</small></span>
              <i className="h3-feed-state">{r.gate ? 'Waiting' : <Check size={14} />}</i>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
      <p className="h3-feed-foot">Routine work runs itself. Decisions come to your people.</p>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useTransform(scrollYProgress, v => v);
  const y = useTransform(p, [0, 1], [0, 120]);
  const o = useTransform(p, [0, .75], [1, 0]);
  return (
    <section className="h3-hero" ref={ref}>
      <div className="h3-hero-poster" aria-hidden />
      <Aurora />
      <motion.div className="container h3-hero-grid" style={reduce ? undefined : { y, opacity: o }}>
        <div className="h3-hero-copy">
          <p className="h3-pill h3-in"><span className="h3-dot" /> BYBO · AI SYSTEMS & DIGITAL STUDIO · BENGALURU</p>
          <h1>
            <span className="h3-line"><span className="h3-in" style={{ animationDelay: '.05s' }}>Your team has</span></span>
            <span className="h3-line"><em className="h3-in" style={{ animationDelay: '.15s' }}>better things to do.</em></span>
          </h1>
          <p className="h3-lede h3-in" style={{ animationDelay: '.3s' }}>BYBO designs and builds AI systems, websites, apps and brand films for growing Indian businesses. The systems take recurring work off your team. The rest brings the customers in.</p>
          <div className="h3-actions h3-in" style={{ animationDelay: '.42s' }}>
            <Link className="h3-btn" href="/apply">Start a project <ArrowRight size={19} /></Link>
            <a className="h3-link" href="#build">What we do</a>
          </div>
          <nav className="h3-offer-chips h3-in" style={{ animationDelay: '.52s' }} aria-label="Our offerings">
            {OFFERS.map(o => <Link key={o.k} href={o.href}><o.Icon size={16} />{o.chip}</Link>)}
          </nav>
        </div>
        <div className="h3-in" style={{ animationDelay: '.35s' }}><Feed /></div>
      </motion.div>
    </section>
  );
}

/* ---------------- marquee ---------------- */

function Marquee() {
  const words = ['Enquiries', 'Invoices', 'Approvals', 'Onboarding', 'Knowledge', 'Reports', 'Websites', 'Apps', 'Films'];
  return (
    <div className="h3-marquee" aria-hidden>
      <div className="h3-marquee-row">{[0, 1].map(k => <span key={k}>{words.map(w => <b key={w}>{w}<i>✦</i></b>)}</span>)}</div>
    </div>
  );
}

/* ---------------- what we do ---------------- */

const OFFERS = [
  {
    k: 'ai', chip: 'AI systems', Icon: Cpu, href: '/systems', kicker: 'AI Systems',
    title: 'Systems that take recurring work off your team.',
    body: 'Enquiries answered, documents read, approvals routed, reports built and knowledge on tap, connected to the tools you already run.',
    get: ['A Blueprint of the work and where AI helps', 'The system built, connected and tested on your data', 'Approval steps for anything that matters', 'Monitoring, logs and a team that keeps it running'],
    best: 'Operations, sales and support teams carrying repeat work at volume.',
  },
  {
    k: 'web', chip: 'Websites', Icon: Globe, href: '/systems/website-design-development', kicker: 'Website Studio',
    title: 'Websites that win the enquiry.',
    body: 'Strategy, copy, design and build from one studio, mobile first and made to convert.',
    get: ['Positioning and page structure', 'Copy written with you', 'Design for every screen', 'Build, launch and handover'],
    best: 'Brands and businesses whose website should sell, not just exist.',
  },
  {
    k: 'app', chip: 'Apps', Icon: Smartphone, href: '/systems/app-design-development', kicker: 'App Studio',
    title: 'Apps your teams and customers run on.',
    body: 'iPhone, Android and web apps for field teams, operations and customers, from prototype to store.',
    get: ['Product scoping and prototype', 'Design and engineering', 'Back office and admin', 'Store submission and support'],
    best: 'Companies digitising field work, operations or a customer service.',
  },
  {
    k: 'film', chip: 'Films', Icon: Clapperboard, href: '/systems/motion-studio', kicker: 'Motion Studio',
    title: 'Brand films without the film crew.',
    body: 'Launch films, product ads, platform promos and social series, made by a production system and directed by people.',
    get: ['Script and style frames', 'Production and edit', 'Every ratio and cut-down', 'Series for the feed'],
    best: 'Launches, campaigns and brands that need to be seen.',
  },
];

function Build() {
  return (
    <section className="h3-build" id="build" aria-labelledby="h3-build-title">
      <div className="container">
        <div className="h3-head">
          <p className="h3-kicker">What we do</p>
          <h2 id="h3-build-title">One studio. <em>Four ways to grow.</em></h2>
          <p className="h3-sub">Most companies hire four vendors for this. BYBO is one team that builds the systems behind the business and the experiences in front of it, so they work together.</p>
        </div>

        <div className="h3-offers">
          {OFFERS.map((o, i) => (
            <Link key={o.k} href={o.href} className={`h3-offer h3-offer-${o.k}`}>
              <span className="h3-offer-art">
                {o.k === 'film' ? <HoverLoop id="noor" /> : <Image src={['/images/services/custom-ai-platforms.webp', '/images/studio/site.webp', '/images/app-studio/cover.webp'][i]} alt="" fill sizes="(max-width: 1100px) 92vw, 50vw" />}
              </span>
              <span className="h3-offer-body">
                <span className="h3-offer-top"><small><o.Icon size={15} /> {o.kicker}</small><ArrowUpRight size={20} /></span>
                <strong>{o.title}</strong>
                <span className="h3-offer-text">{o.body}</span>
                <span className="h3-offer-get">{o.get.map(g => <span key={g}><Check size={14} />{g}</span>)}</span>
                <span className="h3-offer-best"><b>Best for</b> {o.best}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="h3-sys-head"><p className="h3-kicker">The seven AI systems</p><Link className="h3-link" href="/systems">Compare them <ArrowUpRight size={16} /></Link></div>
        <div className="h3-systems">
          {SYSTEMS.map((s, i) => (
            <Link key={s.slug} href={`/systems/${s.slug}`} className="h3-system">
              <span className="h3-sys-art"><Image src={`/images/services/${s.slug}.webp`} alt="" fill sizes="(max-width: 760px) 80vw, 300px" /></span>
              <span className="h3-sys-n">{String(i + 1).padStart(2, '0')}</span>
              <strong>{s.name}</strong>
              <small>{s.short}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A muted loop that loads near the screen and plays while on it. */
function HoverLoop({ id }: { id: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!v.src) v.src = `/motion/${id}-loop.mp4`; if (!still) v.play().catch(() => {}); } else v.pause();
    }, { rootMargin: '200px 0px' });
    io.observe(v); return () => io.disconnect();
  }, [id]);
  return <video ref={ref} poster={`/motion/${id}.jpg`} muted loop playsInline preload="none" aria-hidden />;
}

/* ---------------- the work ---------------- */

const REELS = [
  ['proxe-launch', 'PROXe', 'Launch film'], ['lokazen-localities', 'Where brands are landing', 'Social series'], ['mirchi', 'Keep your Friday', '3D film'],
  ['leads', 'Nobody replies till morning', 'Explainer'], ['lokazen-padel', 'Padel is exploding', 'Social series'], ['scan2kare', 'Scan2Kare', 'Platform promo'],
];

function Work() {
  return (
    <section className="h3-work" aria-labelledby="h3-work-title">
      <div className="container h3-head h3-head-row">
        <div><p className="h3-kicker">Recent work</p><h2 id="h3-work-title">Proof, <em>not promises.</em></h2></div>
        <Link className="h3-link" href="/systems/motion-studio">All films <ArrowUpRight size={16} /></Link>
      </div>
      <div className="h3-reels">
        {REELS.map(([id, t, k], i) => (
          <Link key={id} href="/systems/motion-studio#work" className="h3-reel" style={{ '--i': i } as CSSProperties}>
            <span className="h3-reel-media"><HoverLoop id={id} /><span className="h3-reel-play"><Play size={16} fill="currentColor" /></span></span>
            <small>{k}</small><strong>{t}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------- ways to work with us ---------------- */

const ENGAGE: { t: string; lead: string; d: string; gets: string[] }[] = [
  { t: 'Blueprint', lead: 'Know before you commit.', d: 'We study the work, the tools and the numbers, then show you where a system or product pays back first.', gets: ['Process and opportunity map', 'Recommended first build', 'Fixed scope and quote in writing'] },
  { t: 'Build', lead: 'One accountable team.', d: 'Design, engineering, AI and content under one roof, tested on real cases from your business, with demos as we go.', gets: ['A named lead and team', 'Regular working demos', 'Your sign-off before anything goes live'] },
  { t: 'Run', lead: 'Keep it getting better.', d: 'We operate, monitor and improve what we built, so it keeps pace with the business.', gets: ['Monitoring and support', 'Monthly improvements', 'Reports on what changed'] },
];

function Engage() {
  return (
    <section className="h3-engage" aria-labelledby="h3-engage-title">
      <div className="container">
        <div className="h3-head">
          <p className="h3-kicker">Ways to work with us</p>
          <h2 id="h3-engage-title">Start small. <em>Scale what works.</em></h2>
          <p className="h3-sub">From a single website or system to a programme across teams. Every engagement starts with a written scope, so the budget is agreed before the work begins.</p>
        </div>
        <div className="h3-engage-grid">
          {ENGAGE.map((e, i) => (
            <article key={e.t}>
              <span className="h3-engage-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{e.t}</h3>
              <p className="h3-engage-lead">{e.lead}</p>
              <p>{e.d}</p>
              <ul>{e.gets.map(g => <li key={g}><Check size={15} />{g}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- who we work with, and how we build ---------------- */

const FOR: [string, string][] = [
  ['Growing companies', 'Teams of 20 to 2,000 where manual work is slowing growth.'],
  ['Funded startups', 'Founders who need product, site and launch film from one team.'],
  ['Multi-location brands', 'Outlets, clinics and stores that need one way of working.'],
  ['Enterprise teams', 'A department proving a system before it scales across the company.'],
];

// [client, partner brand the work came through]
const CLIENTS: [string, string?][] = [['Lokazen'], ['PROXe'], ['Scan2Kare'], ['WOWBUS'], ['Bcon Club'], ['Wind Chasers', 'Bcon Club'], ['Laptop Store', 'Bcon Club'], ['Jamaican Kitchen', 'Bcon Club']];

function Principles() {
  const items: [string, string][] = [
    ['People decide', 'Money, commitments and anything sensitive wait for a named person. The system prepares; your team approves.'],
    ['Everything is recorded', 'What arrived, what the system did and who approved it, kept where you can check it.'],
    ['Built on your tools', 'Accounts, WhatsApp, CRM, spreadsheets and your own software. We connect what you already run.'],
  ];
  return (
    <section className="h3-principles">
      <div className="container">
        <div className="h3-head"><p className="h3-kicker">Who we work with</p><h2>Businesses with <em>serious ambitions.</em></h2></div>
        <div className="h3-for">
          {FOR.map(([t, d]) => <article key={t}><h3>{t}</h3><p>{d}</p></article>)}
        </div>
        <div className="h3-clients">
          <p className="h3-kicker">Work for</p>
          <div className="h3-clients-track">
            {/* the list twice, so the scroll loops without a gap */}
            <ul className="h3-clients-row">
              {[0, 1].map(k => CLIENTS.map(([c, via]) => <li key={k + c} aria-hidden={k === 1 || undefined}>{c}{via && <small>via {via}</small>}</li>))}
            </ul>
          </div>
        </div>
        <div className="h3-head h3-head-tight"><p className="h3-kicker">How we build</p><h2>Automation <em>with judgement.</em></h2></div>
        <div className="h3-pr-grid">
          {items.map(([t, d], i) => <article key={t}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></article>)}
        </div>
        <div className="h3-head h3-head-tight h3-head-row h3-inds-head">
          <div><p className="h3-kicker">Industries</p><h2>Built for how <em>your sector works.</em></h2></div>
          <Link className="h3-link" href="/industries">All industries <ArrowUpRight size={16} /></Link>
        </div>
        <div className="h3-inds">
          {industries.map(x => (
            <Link key={x.name} href="/industries" className="h3-ind">
              <small>{x.group}</small>
              <strong>{x.name}</strong>
              <span>{x.pain}</span>
              <i>{x.uses[0]} <ArrowUpRight size={14} /></i>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ: [string, string][] = [
  ['What exactly is BYBO?', 'An AI systems and digital studio in Bengaluru. We build AI systems that handle recurring business work, and the websites, apps and films that bring customers in. One team, from strategy to launch and beyond.'],
  ['What size of project do you take on?', 'Focused projects with a clear owner, from a single website or system to multi-system programmes across teams. We scope each one with you and quote once, in writing, before any paid work starts.'],
  ['Where do we start?', 'With a Blueprint, or with one clear problem. We map the work, recommend the first build and agree a fixed scope.'],
  ['Will AI make decisions for our business?', 'Only the routine ones you allow. Anything involving money, commitments or sensitive information waits for a named person.'],
  ['Do we have to change our tools?', 'No. We build around what you already use and agree exactly what the system may read, change and escalate.'],
  ['Who owns what you build?', 'Ownership, accounts and handover are agreed in writing in the scope, before work starts.'],
];

function Faq() {
  return (
    <section className="h3-faq">
      <div className="container h3-faq-grid">
        <div><p className="h3-kicker">Questions</p><h2>Asked before <em>every project.</em></h2></div>
        <div className="h3-faq-list">{FAQ.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} /></summary><p>{a}</p></details>)}</div>
      </div>
    </section>
  );
}

export function HomeV3() {
  return (
    <div className="h3">
      <Hero />
      <Marquee />
      <Build />
      <Work />
      <Engage />
      <Principles />
      <Faq />
      <section className="h3-close">
        <div className="h3-close-glow" aria-hidden />
        <div className="container">
          <p className="h3-kicker">Start here</p>
          <h2>Let’s build what <em>moves your business.</em></h2>
          <p className="h3-sub">Tell us what you are trying to change. You will hear back from a person within one working day, with an honest view of whether we are the right team.</p>
          <div className="h3-close-actions"><Link className="h3-btn" href="/apply">Start a project <ArrowRight size={19} /></Link><Link className="h3-link" href="/blueprint">About the Blueprint</Link></div>
        </div>
      </section>
    </div>
  );
}
