'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Plus, UserCheck, Play } from 'lucide-react';
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
          <p className="h3-pill h3-in"><span className="h3-dot" /> AI SYSTEMS · WEBSITES · APPS · FILMS</p>
          <h1>
            <span className="h3-line"><span className="h3-in" style={{ animationDelay: '.05s' }}>Your team has</span></span>
            <span className="h3-line"><em className="h3-in" style={{ animationDelay: '.15s' }}>better things to do.</em></span>
          </h1>
          <p className="h3-lede h3-in" style={{ animationDelay: '.3s' }}>We build the systems that handle the recurring work, connect your tools and bring the right decisions back to your people. Plus the websites, apps and films that bring the customers in.</p>
          <div className="h3-actions h3-in" style={{ animationDelay: '.42s' }}>
            <Link className="h3-btn" href="/apply">Talk to BYBO <ArrowRight size={19} /></Link>
            <a className="h3-link" href="#build">See what we build</a>
          </div>
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

/* ---------------- what we build ---------------- */

function Build() {
  return (
    <section className="h3-build" id="build" aria-labelledby="h3-build-title">
      <div className="container">
        <div className="h3-head">
          <p className="h3-kicker">What we build</p>
          <h2 id="h3-build-title">Seven systems. <em>Three studios.</em></h2>
          <p className="h3-sub">Systems that take the recurring work off your team, and studios that make the business impossible to ignore.</p>
        </div>

        <div className="h3-studios">
          <Link href="/systems/website-design-development" className="h3-studio h3-st-web">
            <span className="h3-st-art"><Image src="/images/studio/site.webp" alt="" fill sizes="(max-width: 1100px) 92vw, 33vw" /></span>
            <span className="h3-st-copy"><small>Website Studio</small><strong>Websites people can’t scroll past.</strong><i>Explore <ArrowUpRight size={16} /></i></span>
          </Link>
          <Link href="/systems/app-design-development" className="h3-studio h3-st-app">
            <span className="h3-st-art"><Image src="/images/app-studio/e-warehouse.webp" alt="" fill sizes="(max-width: 1100px) 92vw, 33vw" /></span>
            <span className="h3-st-copy"><small>App Studio</small><strong>Apps that run the business.</strong><i>Explore <ArrowUpRight size={16} /></i></span>
          </Link>
          <Link href="/systems/motion-studio" className="h3-studio h3-st-motion">
            <span className="h3-st-art"><HoverLoop id="noor" /></span>
            <span className="h3-st-copy"><small>Motion Studio</small><strong>Ideas, on film. Without the crew.</strong><i>Explore <ArrowUpRight size={16} /></i></span>
          </Link>
        </div>

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

/* ---------------- how it works ---------------- */

const STEPS: [string, string][] = [
  ['Blueprint', 'We map the work, pick the first system worth building and agree the scope and quote in writing.'],
  ['Build', 'Your tools connected, your rules encoded, tested on real cases from your business.'],
  ['Review', 'Your people try it and decide what it may do alone and what must come to them.'],
  ['Run', 'Launched, monitored and improved. Every action recorded, every exception routed.'],
];

function Steps() {
  return (
    <section className="h3-steps" aria-labelledby="h3-steps-title">
      <div className="container">
        <div className="h3-head">
          <p className="h3-kicker">How it works</p>
          <h2 id="h3-steps-title">Start with one problem. <em>Keep it working.</em></h2>
        </div>
        <div className="h3-step-cards">
          {STEPS.map(([t, d], i) => (
            <article key={t} className="h3-step" style={{ top: `calc(96px + ${i * 22}px)` }} data-gate={i === 2 ? '' : undefined}>
              <span className="h3-step-n">{String(i + 1).padStart(2, '0')}</span>
              <div><h3>{t}{i === 2 && <small>Your sign-off</small>}</h3><p>{d}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- principles, industries, faq ---------------- */

function Principles() {
  const items: [string, string][] = [
    ['People decide', 'Money, commitments and anything sensitive wait for a named person. The system prepares; your team approves.'],
    ['Everything is recorded', 'What arrived, what the system did and who approved it, kept where you can check it.'],
    ['Built on your tools', 'We connect what you already use: accounts, WhatsApp, CRM, spreadsheets and your own software.'],
  ];
  return (
    <section className="h3-principles">
      <div className="container">
        <div className="h3-head"><p className="h3-kicker">How we build</p><h2>Automation <em>with judgement.</em></h2></div>
        <div className="h3-pr-grid">
          {items.map(([t, d], i) => <article key={t}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></article>)}
        </div>
        <div className="h3-inds">
          <p className="h3-kicker">Built for</p>
          <ul>{industries.map(x => <li key={x.name}>{x.name}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

const FAQ: [string, string][] = [
  ['Where do we start?', 'With one recurring problem. We map it in a Blueprint, agree whether it is worth a system, and quote the first build in writing.'],
  ['Will AI make decisions for our business?', 'Only the routine ones you allow. Anything involving money, commitments or sensitive information waits for a named person.'],
  ['Do we have to change our tools?', 'No. We build around what you already use and agree exactly what the system may read, change and escalate.'],
  ['How much does it cost?', 'It depends on the work. We scope it with you and quote once, in writing, before any paid work starts.'],
  ['Do you also build websites, apps and films?', 'Yes. The Website, App and Motion studios sit alongside the systems, so the same team can bring customers in and handle what follows.'],
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
      <Steps />
      <Principles />
      <Faq />
      <section className="h3-close">
        <div className="h3-close-glow" aria-hidden />
        <div className="container">
          <p className="h3-kicker">Start here</p>
          <h2>Bring us one <em>recurring problem.</em></h2>
          <p className="h3-sub">We will help you decide whether it needs a system, a website, an app or a film. The first conversation is free.</p>
          <Link className="h3-btn" href="/apply">Talk to BYBO <ArrowRight size={19} /></Link>
        </div>
      </section>
    </div>
  );
}
