'use client';

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useAnimationFrame, useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion';
import { ArrowRight, ArrowDown, Plus, Smartphone, Gauge, PenLine, Search, MousePointerClick, Settings2, Check } from 'lucide-react';
import { QuickBrief } from './QuickBrief';
import { Showcase } from './Showcase';
import './website-studio.css';

// WebGL loads after first paint; the CSS gradient underneath is the poster.
const HeroShader = dynamic(() => import('./HeroShader'), { ssr: false });

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------- shared bits ---------------- */

/** A button that leans toward the pointer. */
function Magnetic({ children, href, className = 'ws-btn' }: { children: ReactNode; href: string; className?: string }) {
  const x = useSpring(0, { stiffness: 220, damping: 18 }), y = useSpring(0, { stiffness: 220, damping: 18 });
  return (
    <motion.a href={href} className={className} style={{ x, y }}
      onPointerMove={e => { if (e.pointerType !== 'mouse') return; const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left - b.width / 2) * .3); y.set((e.clientY - b.top - b.height / 2) * .4); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.a>
  );
}

/** Lines that rise out of a mask, word by word. */
function Rise({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        // the space sits outside the mask: a trailing space inside an inline-block is dropped
        <span key={i}><span className="ws-mask"><motion.span className="ws-mask-in" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease: EASE, delay: delay + i * .07 }}>{w}</motion.span></span>{' '}</span>
      ))}
    </span>
  );
}

const subscribeFine = (cb: () => void) => { const m = window.matchMedia('(pointer: fine)'); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); };

/** A small ring that follows the pointer and swells over anything clickable. Fine pointers only. */
function Cursor() {
  const on = useSyncExternalStore(subscribeFine, () => window.matchMedia('(pointer: fine)').matches, () => false);
  const [hot, setHot] = useState(false);
  const x = useSpring(-100, { stiffness: 500, damping: 40 }), y = useSpring(-100, { stiffness: 500, damping: 40 });
  useEffect(() => {
    if (!on) return;
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setHot(!!(e.target as Element).closest?.('a,button,summary,select,input,label')); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [on, x, y]);
  if (!on) return null;
  return <motion.div className={`ws-cursor${hot ? ' is-hot' : ''}`} style={{ x, y }} aria-hidden />;
}

/* ---------------- hero ---------------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const hp = useTransform(scrollYProgress, v => v); // computed here, not on a native scroll timeline (see BuildSequence)
  const scale = useTransform(hp, [0, 1], [1, .88]);
  const opacity = useTransform(hp, [0, .75], [1, 0]);
  const filter = useTransform(hp, [0, 1], ['blur(0px)', 'blur(14px)']);
  const y = useTransform(hp, [0, 1], [0, 140]);
  return (
    <section ref={ref} className="ws-hero">
      <div className="ws-hero-poster" aria-hidden />
      <HeroShader />
      <motion.div className="container ws-hero-inner" style={reduce ? undefined : { scale, opacity, filter, y }}>
        <motion.p className="ws-pill" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: EASE }}>
          <span className="ws-live" /> BYBO WEBSITE STUDIO · BENGALURU
        </motion.p>
        <h1>
          <Rise text="Websites people" delay={.15} />
          <br />
          <em><Rise text="can’t scroll past." delay={.4} /></em>
        </h1>
        <motion.p className="ws-lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: .85 }}>
          Strategy, copy, design and build from one studio. Mobile first, and made to turn visitors into enquiries, bookings and sales.
        </motion.p>
        <motion.div className="ws-hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1 }}>
          <Magnetic href="#start">Start your website <ArrowRight size={19} /></Magnetic>
          <a className="ws-link" href="#build">Watch one get built <ArrowDown size={17} /></a>
        </motion.div>
      </motion.div>
      <motion.div className="ws-scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} aria-hidden><span /></motion.div>
    </section>
  );
}

/* ---------------- the build sequence ---------------- */

const STAGES: [string, string][] = [
  ['Strategy', 'Who visits, what they need, and the one thing each page must get them to do.'],
  ['Structure', 'Every page planned before anything is drawn.'],
  ['Words', 'Real copy, written with you, in the real order.'],
  ['Design', 'A look that could only be yours.'],
  ['Every screen', 'Designed for the phone first, then scaled up.'],
  ['Live', 'Tested, launched and handed over. Yours to edit.'],
];

/** Fade in over [a,b]. Clamped, so it holds at 1 afterwards. */
function useFadeIn(p: MotionValue<number>, a: number, b: number) {
  return useTransform(p, [a, b], [0, 1], { clamp: true });
}
/** Fade in over [a,b], hold, then fade out over [c,d]. */
function useFadeInOut(p: MotionValue<number>, a: number, b: number, c: number, d: number) {
  return useTransform(p, [a, b, c, d], [0, 1, 1, 0], { clamp: true });
}

function BuildSequence() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // A function mapping on purpose: Framer otherwise hands range-based opacity to a native
  // scroll timeline, which maps sub-ranges like [.3, .36] wrongly and fades every layer
  // back out by the end of the section. Through a function, every value is computed here.
  const progress = useTransform(scrollYProgress, v => v);
  const still = useMotionValue(1);
  const p = reduce ? still : progress;
  const [stage, setStage] = useState(reduce ? 5 : 0);
  useMotionValueEvent(scrollYProgress, 'change', v => { if (!reduce) setStage(Math.min(5, Math.floor(v * 6.0001))); });

  const frameScale = useTransform(p, [0, .1], [.86, 1]);
  const grid = useFadeInOut(p, .02, .1, .3, .42);
  const wire = useFadeInOut(p, .14, .22, .48, .56);
  const navIn = useFadeIn(p, .3, .36);
  const h1Clip = useTransform(p, [.32, .44], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const subIn = useFadeIn(p, .4, .46);
  const colour = useFadeIn(p, .48, .58);
  const photoScale = useTransform(p, [.48, .7], [1.18, 1]);
  const cardsY = useTransform(p, [.56, .66], [40, 0]);
  const cardsIn = useFadeIn(p, .56, .66);
  const phoneX = useTransform(p, [.68, .8], ['130%', '0%']);
  const phoneIn = useFadeIn(p, .68, .76);
  const cursorX = useTransform(p, [.82, .9], ['85%', '23%']);
  const cursorY = useTransform(p, [.82, .9], ['90%', '63%']);
  const cursorIn = useFadeInOut(p, .8, .84, .95, .99);
  const click = useTransform(p, [.9, .92, .94], [1, .82, 1]);
  const liveScale = useTransform(p, [.9, .95], [0, 1]);
  const bar = useTransform(p, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} className="ws-build" id="build" aria-label="How a BYBO website comes together">
      <div className="ws-build-sticky">
        <div className="container ws-build-grid">
          <div className="ws-build-copy">
            <p className="ws-kicker">Watch one get built</p>
            <ol className="ws-stages">
              {STAGES.map(([t, d], i) => (
                <li key={t} data-on={i === stage ? '' : undefined} data-done={i < stage ? '' : undefined}>
                  <span className="ws-stage-n">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </li>
              ))}
            </ol>
            <div className="ws-build-bar"><motion.span style={{ width: bar }} /></div>
          </div>

          <motion.div className="ws-browser" style={{ scale: frameScale }} aria-hidden>
            <div className="ws-browser-bar"><i /><i /><i /><span>yourbusiness.in</span><motion.b className="ws-live-badge" style={{ scale: liveScale }}><span className="ws-live" /> Live</motion.b></div>
            <div className="ws-site">
              <motion.div className="ws-site-photo" style={{ opacity: colour, scale: photoScale }}><Image src="/images/studio/site.webp" alt="" fill sizes="(max-width: 1100px) 92vw, 60vw" /></motion.div>
              <motion.div className="ws-site-scrim" style={{ opacity: colour }} />
              <motion.div className="ws-site-grid" style={{ opacity: grid }} />
              {/* wireframe */}
              <motion.div className="ws-wire" style={{ opacity: wire }}>
                <span className="ws-w-nav" /><span className="ws-w-h1" /><span className="ws-w-h1 s" /><span className="ws-w-p" /><span className="ws-w-btn" /><span className="ws-w-art" />
                <span className="ws-w-card" /><span className="ws-w-card" /><span className="ws-w-card" />
              </motion.div>
              {/* real page */}
              <motion.div className="ws-site-nav" style={{ opacity: navIn }}><b>your<i>brand</i></b><span>Work</span><span>About</span><span className="ws-site-pill">Book a call</span></motion.div>
              <div className="ws-site-hero">
                <motion.h4 style={{ clipPath: h1Clip }}>Unmistakably <em>you.</em> Online.</motion.h4>
                <motion.p style={{ opacity: subIn }}>A website that explains what you do in five seconds and asks for the next step.</motion.p>
                <motion.span className="ws-site-cta" style={{ opacity: subIn, scale: click }}>Get started →</motion.span>
              </div>
              <motion.div className="ws-site-cards" style={{ opacity: cardsIn, y: cardsY }}>
                {['Services', 'Work', 'Reviews'].map(c => <span key={c}><i />{c}</span>)}
              </motion.div>
              <motion.div className="ws-site-cursor" style={{ left: cursorX, top: cursorY, opacity: cursorIn }}><MousePointerClick size={22} /></motion.div>
            </div>
            <motion.div className="ws-phone" style={{ x: phoneX, opacity: phoneIn }}>
              <div className="ws-phone-in">
                <Image className="ws-phone-photo" src="/images/studio/site-m.webp" alt="" fill sizes="(max-width: 1100px) 30vw, 18vw" />
                <b>your<i>brand</i></b>
                <h5>Unmistakably <em>you.</em></h5>
                <span className="ws-site-cta">Get started →</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- statement, revealed word by word ---------------- */

function Word({ p, range, children }: { p: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(p, range, [.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const secRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const sp = useTransform(scrollYProgress, v => v); // computed here, not on a native scroll timeline (see BuildSequence)
  const { scrollYProgress: secP } = useScroll({ target: secRef, offset: ['start end', 'end start'] });
  const sec = useTransform(secP, v => v);
  const sculptRotate = useTransform(sec, [0, 1], [-35, 55]);
  const sculptY = useTransform(sec, [0, 1], [120, -160]);
  const still = useMotionValue(1);
  const words = 'Most websites are brochures. Yours should be the best salesperson you have: awake at three in the morning, on every phone, saying exactly the right thing, and asking for the next step.'.split(' ');
  return (
    <section className="ws-statement" ref={secRef}>
      <motion.img className="ws-sculpture" src="/images/studio/sculpture.webp" alt="" aria-hidden loading="lazy" style={reduce ? undefined : { rotate: sculptRotate, y: sculptY }} />
      <div className="container">
        <p className="ws-kicker">Why it matters</p>
        <p ref={ref} className="ws-statement-text">
          {words.map((w, i) => <Word key={i} p={reduce ? still : sp} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
        </p>
      </div>
    </section>
  );
}

/* ---------------- sideways track ---------------- */

const FEATURES: { t: string; d: string; Icon: typeof Smartphone; v: string }[] = [
  { t: 'Mobile first', d: 'Designed for the phone, where most people meet you, then scaled up.', Icon: Smartphone, v: 'phone' },
  { t: 'Fast', d: 'Built to load quickly on an ordinary phone and an ordinary connection.', Icon: Gauge, v: 'gauge' },
  { t: 'Words that sell', d: 'Copy written with you, from how your customers actually talk.', Icon: PenLine, v: 'type' },
  { t: 'Built to be found', d: 'Clean structure, titles and redirects: the foundations of search.', Icon: Search, v: 'search' },
  { t: 'One clear next step', d: 'Every page asks for something: an enquiry, a booking, a sale.', Icon: MousePointerClick, v: 'click' },
  { t: 'Yours to edit', d: 'Content tools for your team, and a handover so nobody waits on a developer.', Icon: Settings2, v: 'edit' },
];

const FEATURE_ART: Record<string, string> = { phone: 'f-mobile', gauge: 'f-fast', type: 'f-words', search: 'f-search', click: 'f-click', edit: 'f-edit' };

function FeatureVisual({ v }: { v: string }) {
  return <div className="ws-v"><Image src={`/images/studio/${FEATURE_ART[v]}.webp`} alt="" fill sizes="(max-width: 1100px) 78vw, 400px" /></div>;
}

function Track() {
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
    <section ref={ref} className="ws-track" style={{ height: `calc(100svh + ${dist}px)` }} aria-label="What makes a website work">
      <div className="ws-track-sticky">
        <div className="container ws-track-head"><p className="ws-kicker">What makes it work</p><h2>Six things every site we build <em>gets right.</em></h2></div>
        <motion.div ref={trackRef} className="ws-track-row" style={{ x }}>
          {FEATURES.map(({ t, d, Icon, v }, i) => (
            <article key={t} className="ws-feature">
              <FeatureVisual v={v} />
              <span className="ws-feature-n">{String(i + 1).padStart(2, '0')} <Icon size={16} /></span>
              <h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- velocity marquee ---------------- */

function wrap(min: number, max: number, v: number) { const r = max - min; return ((((v - min) % r) + r) % r) + min; }

function VelocityMarquee({ text }: { text: string }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const reduce = useReducedMotion();
  const x = useTransform(base, v => `${wrap(-50, 0, v)}%`);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * -2 * (delta / 1000);
    if (factor.get() < 0) dir.current = -1; else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    base.set(base.get() + move);
  });
  return (
    <div className="ws-marquee" aria-hidden>
      <motion.div className="ws-marquee-row" style={{ x }}>{Array.from({ length: 4 }, (_, i) => <span key={i}>{text}</span>)}</motion.div>
    </div>
  );
}

/* ---------------- process, as stacking cards ---------------- */

const STEPS: [string, string][] = [
  ['Discover', 'Your audience, your goals and the job every page has to do. The first conversation is free.'],
  ['Shape', 'The sitemap and real copy, agreed in writing with a quote before any paid work starts.'],
  ['Design', 'Complete pages at phone and desktop width, with your own content in them.'],
  ['Review', 'You approve the design, copy and key journeys. Nothing goes live until you say so.'],
  ['Launch', 'Built, tested across devices, published and handed over with editing tools for your team.'],
];

function Stack() {
  return (
    <section className="ws-stack">
      <div className="container">
        <p className="ws-kicker">How it works</p>
        <h2>Five steps. <em>No surprises.</em></h2>
        <div className="ws-stack-cards">
          {STEPS.map(([t, d], i) => (
            <article key={t} className="ws-stack-card" style={{ top: `calc(96px + ${i * 22}px)` }} data-gate={i === 3 ? '' : undefined}>
              <span className="ws-stack-n">{String(i + 1).padStart(2, '0')}</span>
              <div><h3>{t}{i === 3 && <small>Your sign-off</small>}</h3><p>{d}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- faq and close ---------------- */

const FAQ: [string, string][] = [
  ['How much does a website cost?', 'It depends on what the site has to do. A five-page site for a practice and a store with payments are different builds. We scope it with you, then quote once, in writing, before any paid work starts.'],
  ['We have never written website copy.', 'We draft it. We interview you, write from how you actually describe the business, and you approve every word.'],
  ['What if we do not like the design?', 'That is what the review stage is for. You see complete pages with your own content before anything is built, which is the cheapest place to change your mind.'],
  ['Can our team update it after launch?', 'Yes. We set up content tools and run a handover. Ongoing support is optional.'],
  ['Will it show up on Google?', 'We build the foundations properly: structure, titles, speed, mobile behaviour and redirects. Rankings depend on more than the build, and we will tell you so honestly.'],
];

export function WebsiteStudio() {
  const startRef = useRef<HTMLElement>(null);
  const [bar, setBar] = useState(false);
  useEffect(() => {
    let f = 0;
    const check = () => { f = 0; const s = startRef.current?.getBoundingClientRect(); setBar(window.scrollY > window.innerHeight * .9 && !!s && s.top > window.innerHeight * .85); };
    const on = () => { if (!f) f = requestAnimationFrame(check); };
    check(); window.addEventListener('scroll', on, { passive: true }); return () => { window.removeEventListener('scroll', on); if (f) cancelAnimationFrame(f); };
  }, []);

  return (
    <div className="ws">
      <Cursor />
      <Hero />
      <VelocityMarquee text="Strategy ✦ Copy ✦ Design ✦ Build ✦ Launch ✦ " />
      <BuildSequence />
      <Showcase />
      <Statement />
      <Track />
      <Stack />

      <section className="ws-faq">
        <div className="container ws-faq-grid">
          <div><p className="ws-kicker">Questions</p><h2>Asked before <em>every website.</em></h2></div>
          <div className="ws-faq-list">{FAQ.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} /></summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <section className="ws-close" id="start" ref={startRef}>
        <div className="ws-close-glow" aria-hidden />
        <div className="container ws-close-grid">
          <div>
            <p className="ws-kicker">Start here</p>
            <h2 className="ws-close-title">Let’s build <em>yours.</em></h2>
            <ul className="ws-promise">{['The first conversation is free', 'A written quote before any work', 'You approve it before launch'].map(t => <li key={t}><Check size={17} />{t}</li>)}</ul>
          </div>
          <QuickBrief id="ws-brief" />
        </div>
      </section>

      <div className={`ws-bar${bar ? ' is-on' : ''}`} aria-hidden={!bar}>
        <a className="ws-btn" href="#start" tabIndex={bar ? 0 : -1}>Start your website <ArrowRight size={17} /></a>
      </div>
    </div>
  );
}
