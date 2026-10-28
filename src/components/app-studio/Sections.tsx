'use client';

import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion, type MotionValue } from 'framer-motion';
import { Plus, Bell, CreditCard, Fingerprint, CloudOff, ChartColumn, Sparkles } from 'lucide-react';
import { img, useIso } from './parts';

/* ---------------- statement, revealed word by word ---------------- */

function Word({ p, range, children }: { p: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(p, range, [.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const secRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const sp = useTransform(scrollYProgress, v => v);
  const { scrollYProgress: secP } = useScroll({ target: secRef, offset: ['start end', 'end start'] });
  const sec = useTransform(secP, v => v);
  const rotate = useTransform(sec, [0, 1], [-30, 40]);
  const y = useTransform(sec, [0, 1], [140, -160]);
  const still = useMotionValue(1);
  const words = 'An app has to earn its place on a home screen, next to someone’s bank, their messages and their photos. So ours open fast, make sense on the first tap, and give people a reason to come back tomorrow.'.split(' ');
  return (
    <section className="as-statement" ref={secRef}>
      <motion.img className="as-sculpture" src={img('icons')} alt="" aria-hidden loading="lazy" style={reduce ? undefined : { rotate, y }} />
      <div className="container">
        <p className="as-kicker">Why it matters</p>
        <p ref={ref} className="as-statement-text">
          {words.map((w, i) => <Word key={i} p={reduce ? still : sp} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
        </p>
      </div>
    </section>
  );
}

/* ---------------- platforms, as a lit bento ---------------- */

function Spot({ className, children }: { className: string; children: ReactNode }) {
  return (
    <article className={`as-spot ${className}`} onPointerMove={e => {
      const b = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--mx', `${e.clientX - b.left}px`);
      e.currentTarget.style.setProperty('--my', `${e.clientY - b.top}px`);
    }}>
      {children}
    </article>
  );
}

export function Bento() {
  return (
    <section className="as-bento-sec">
      <div className="container">
        <p className="as-kicker">Every screen</p>
        <h2>iPhone, Android <em>and the browser.</em></h2>
        <div className="as-bento">
          <Spot className="as-b1">
            <div className="as-spot-art"><Image src={img('p-native')} alt="" fill sizes="(max-width: 1100px) 92vw, 640px" /></div>
            <div className="as-spot-text"><h3>iPhone and Android</h3><p>Apps for both stores that feel at home on each phone. Built to the platform’s own guidelines, so they behave the way people expect.</p></div>
          </Spot>
          <Spot className="as-b2">
            <div className="as-spot-art"><Image src={img('p-web')} alt="" fill sizes="(max-width: 1100px) 92vw, 420px" /></div>
            <div className="as-spot-text"><h3>Web apps</h3><p>Portals, dashboards and tools that run in any browser, and can sit on a phone’s home screen like an app.</p></div>
          </Spot>
          <Spot className="as-b3">
            <div className="as-spot-art"><Image src={img('p-code')} alt="" fill sizes="(max-width: 1100px) 92vw, 420px" /></div>
            <div className="as-spot-text"><h3>The right stack</h3><p>One shared codebase where that saves time and money, fully native where the app needs it. We recommend after scoping, and explain why.</p></div>
          </Spot>
          <Spot className="as-b4">
            <div className="as-admin" aria-hidden>
              <div className="as-admin-top"><b>Today</b><span><i />Live</span></div>
              <div className="as-admin-bars">{[38, 62, 48, 80, 56, 92, 70].map((h, i) => <i key={i} style={{ '--h': `${h}%`, animationDelay: `${i * .08}s` } as CSSProperties} />)}</div>
              <ul>{[['New order', 'New'], ['Booking confirmed', 'Paid'], ['Refund requested', 'Review']].map(([t, s]) => <li key={t}><i />{t}<em data-s={s}>{s}</em></li>)}</ul>
            </div>
            <div className="as-spot-text"><h3>Backend and admin</h3><p>The servers, the database and the admin panel your team uses to run the app day to day.</p></div>
          </Spot>
        </div>
      </div>
    </section>
  );
}

/* ---------------- sideways track ---------------- */

const FEATURES: { t: string; d: string; Icon: typeof Bell; art: string }[] = [
  { t: 'Notifications', d: 'The right nudge at the right moment: an order shipped, a slot opening, a streak to keep.', Icon: Bell, art: 'f-push' },
  { t: 'Payments', d: 'Cards, UPI and wallets through established payment providers, with receipts that make sense.', Icon: CreditCard, art: 'f-pay' },
  { t: 'Sign-in', d: 'Phone number, email or the face and fingerprint unlock people already use every day.', Icon: Fingerprint, art: 'f-signin' },
  { t: 'Works offline', d: 'Keeps working on a patchy connection and catches up when the signal comes back.', Icon: CloudOff, art: 'f-offline' },
  { t: 'Analytics', d: 'See where people tap, where they stop and what brings them back, so the next version is better.', Icon: ChartColumn, art: 'f-data' },
  { t: 'AI inside', d: 'Search that understands, recommendations, assistants and document reading, from the people behind BYBO’s AI systems.', Icon: Sparkles, art: 'f-ai' },
];

export function Track() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  useIso(() => {
    const measure = () => { const t = trackRef.current; if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth)); };
    measure(); window.addEventListener('resize', measure); return () => window.removeEventListener('resize', measure);
  }, []);
  return (
    <section ref={ref} className="as-trackwrap" style={{ height: `calc(100svh + ${dist}px)` }} aria-label="What goes into an app">
      <div className="as-track-sticky">
        <div className="container as-track-head"><p className="as-kicker">Built in</p><h2>The parts people notice <em>when they’re missing.</em></h2></div>
        <motion.div ref={trackRef} className="as-track-row" style={{ x }}>
          {FEATURES.map(({ t, d, Icon, art }, i) => (
            <article key={t} className="as-feature">
              <div className="as-v"><Image src={img(art)} alt="" fill sizes="(max-width: 1100px) 78vw, 400px" /></div>
              <span className="as-feature-n">{String(i + 1).padStart(2, '0')} <Icon size={16} /></span>
              <h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- process, as stacking cards ---------------- */

const STEPS: [string, string][] = [
  ['Discover', 'Who it is for, what it must do on day one and what can wait. The first conversation is free, and you get a written quote before any paid work starts.'],
  ['Design', 'Every screen designed for real thumbs and real content, at the sizes your customers actually use.'],
  ['Prototype', 'A clickable version on your own phone, so you feel the app before anything is built.'],
  ['Build', 'Engineered in short cycles. You test working versions on your phone as it comes together.'],
  ['Review', 'You approve the app on real devices. Nothing goes to the stores until you say so.'],
  ['Launch', 'We prepare the store listings, submit for review and run the agreed handover.'],
];

export function Stack() {
  return (
    <section className="as-stack">
      <div className="container">
        <p className="as-kicker">How it works</p>
        <h2>Six steps. <em>You see every one.</em></h2>
        <div className="as-stack-cards">
          {STEPS.map(([t, d], i) => (
            <article key={t} className="as-stack-card" style={{ top: `calc(96px + ${i * 20}px)` }} data-gate={i === 4 ? '' : undefined}>
              <span className="as-stack-n">{String(i + 1).padStart(2, '0')}</span>
              <div><h3>{t}{i === 4 && <small>Your sign-off</small>}</h3><p>{d}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */

const FAQ: [string, string][] = [
  ['How much does an app cost?', 'It depends on what the app has to do. A booking app for one location and a marketplace with payments and an admin panel are very different builds. We scope it with you, then quote once, in writing, before any paid work starts.'],
  ['iPhone, Android or both?', 'It depends on who your customers are and how they will use it. Many apps launch on both from one shared codebase. We recommend after discovery and explain the trade-offs.'],
  ['We only have an idea.', 'That is where most apps start. Discovery turns it into a clear first version: who it is for, what it must do on day one, and what can wait for later.'],
  ['Will Apple and Google approve it?', 'We design and build to their guidelines and handle the submission. The final decision is theirs, and if they ask for changes we work through them with you.'],
  ['Can it use AI?', 'Yes, where it genuinely helps: search that understands questions, recommendations, assistants or reading documents and photos. It is the same team that builds BYBO’s AI systems.'],
  ['What happens after launch?', 'Phones and operating systems keep changing, so apps need looking after. Updates, fixes and new features can be scoped around your needs. Ownership and handover are agreed in writing before work starts.'],
];

export function Faq() {
  return (
    <section className="as-faq">
      <div className="container as-faq-grid">
        <div><p className="as-kicker">Questions</p><h2>Asked before <em>every app.</em></h2></div>
        <div className="as-faq-list">{FAQ.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} /></summary><p>{a}</p></details>)}</div>
      </div>
    </section>
  );
}
