'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useAnimationFrame, useReducedMotion, useInView } from 'framer-motion';
import { ArrowRight, ArrowDown, Check, Bell } from 'lucide-react';
import { AppBrief } from './AppBrief';
import { EASE, img, Phone, StatusBar, TabBar } from './parts';
import './app-studio.css';

// WebGL loads after first paint; the CSS gradient underneath is the poster.
const AppShader = dynamic(() => import('./AppShader'), { ssr: false });
// Everything below the hero is rendered on the server but ships as separate chunks,
// so the first screen hydrates without waiting for the rest of the page's code.
const Demo = dynamic(() => import('./Demo').then(m => m.Demo));
const BuildSequence = dynamic(() => import('./Build').then(m => m.BuildSequence));
const Statement = dynamic(() => import('./Sections').then(m => m.Statement));
const Bento = dynamic(() => import('./Sections').then(m => m.Bento));
const Track = dynamic(() => import('./Sections').then(m => m.Track));
const Stack = dynamic(() => import('./Sections').then(m => m.Stack));
const Faq = dynamic(() => import('./Sections').then(m => m.Faq));

/* ---------------- shared bits ---------------- */

/** A button that leans toward the pointer. */
function Magnetic({ children, href, className = 'as-btn' }: { children: ReactNode; href: string; className?: string }) {
  const x = useSpring(0, { stiffness: 220, damping: 18 }), y = useSpring(0, { stiffness: 220, damping: 18 });
  return (
    <motion.a href={href} className={className} style={{ x, y }}
      onPointerMove={e => { if (e.pointerType !== 'mouse') return; const b = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - b.left - b.width / 2) * .3); y.set((e.clientY - b.top - b.height / 2) * .4); }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.a>
  );
}

/** Lines that rise out of a mask, word by word. Pure CSS, so the headline shows on first paint, before any script runs. */
function Rise({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        // the space sits outside the mask: a trailing space inside an inline-block is dropped
        <span key={i}><span className="as-mask"><span className="as-mask-in" style={{ animationDelay: `${delay + i * .07}s` }}>{w}</span></span>{' '}</span>
      ))}
    </>
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
  return <motion.div className={`as-cursor${hot ? ' is-hot' : ''}`} style={{ x, y }} aria-hidden />;
}

/* ---------------- hero ---------------- */

const REEL = [
  { img: 'shop', kicker: 'New in', title: 'The everyday trainer', note: 'Your order has shipped. Arriving Thursday.' },
  { img: 'stay', kicker: 'Your stay', title: 'Courtyard room, Friday', note: 'Check-in opens at 2 pm.' },
  { img: 'run', kicker: 'This morning', title: '5.2 km before sunrise', note: 'You beat last week’s pace.' },
  { img: 'food', kicker: 'Tonight', title: 'Dosa and three chutneys', note: 'Your food is on the way.' },
];

function HeroApp() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { margin: '0px 0px -10% 0px' });
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce || !seen) return; // the reel only turns while someone can see it
    const id = setInterval(() => setI(v => (v + 1) % REEL.length), 3400);
    return () => clearInterval(id);
  }, [reduce, seen]);
  const r = REEL[i];
  return (
    <div className="as-app" ref={ref}>
      <StatusBar />
      <div className="as-ha-head"><span>Good evening</span><b>For you</b></div>
      <div className="as-ha-card">
        <AnimatePresence initial={false}>
          <motion.div key={r.img} className="as-ha-photo" initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: EASE }}>
            <Image src={img(r.img)} alt="" fill sizes="320px" priority={i === 0} />
          </motion.div>
        </AnimatePresence>
        <div className="as-ha-cap"><small>{r.kicker}</small><b>{r.title}</b></div>
        <div className="as-ha-dots">{REEL.map((_, k) => <i key={k} data-on={k === i ? '' : undefined} />)}</div>
      </div>
      <p className="as-ha-sub">Picked for you</p>
      <div className="as-ha-row">
        {REEL.filter((_, k) => k !== i).map(x => (
          <span key={x.img}><Image src={img(`${x.img}-t`)} alt="" fill sizes="90px" /></span>
        ))}
      </div>
      <AnimatePresence>
        <motion.div key={`n${i}`} className="as-notif" initial={{ y: '-150%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} exit={{ y: '-150%', opacity: 0 }} transition={{ duration: .6, ease: EASE, delay: reduce ? 0 : .9 }}>
          <i><Bell /></i><div><b>Your app</b><span>{r.note}</span></div>
        </motion.div>
      </AnimatePresence>
      <TabBar />
    </div>
  );
}

const CHIPS: { t: string; x: string; y: string; z: number; d: number }[] = [
  { t: 'iPhone', x: '-46%', y: '14%', z: 90, d: 0 },
  { t: 'Android', x: '74%', y: '24%', z: 130, d: 1.2 },
  { t: 'Web', x: '-34%', y: '58%', z: 60, d: .6 },
  { t: 'Payments', x: '70%', y: '66%', z: 110, d: 1.8 },
  { t: 'Push', x: '-28%', y: '86%', z: 150, d: 2.4 },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const hp = useTransform(scrollYProgress, v => v); // computed here, not on a native scroll timeline (see BuildSequence)
  const copyY = useTransform(hp, [0, 1], [0, 140]);
  const copyO = useTransform(hp, [0, .7], [1, 0]);
  const copyBlur = useTransform(hp, [0, 1], ['blur(0px)', 'blur(12px)']);
  const stageY = useTransform(hp, [0, 1], [0, -90]);
  const stageR = useTransform(hp, [0, 1], [0, -10]);
  const rx = useSpring(0, { stiffness: 110, damping: 16 }), ry = useSpring(0, { stiffness: 110, damping: 16 });
  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      ry.set((e.clientX / window.innerWidth - .5) * 30);
      rx.set(-(e.clientY / window.innerHeight - .5) * 22);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduce, rx, ry]);

  return (
    <section ref={ref} className="as-hero">
      <div className="as-hero-poster" aria-hidden />
      <AppShader />
      <div className="container as-hero-grid">
        <motion.div className="as-hero-copy" style={reduce ? undefined : { y: copyY, opacity: copyO, filter: copyBlur }}>
          <p className="as-pill as-enter">
            <span className="as-live" /> BYBO APP STUDIO · BENGALURU
          </p>
          <h1>
            <Rise text="Apps people" delay={.05} />
            <br />
            <em><Rise text="open every day." delay={.2} /></em>
          </h1>
          <p className="as-lede as-enter" style={{ animationDelay: '.3s' }}>
            iPhone, Android and web apps, designed and built by one studio. Product thinking, interface design and engineering, from the first sketch to the store.
          </p>
          <div className="as-hero-actions as-enter" style={{ animationDelay: '.45s' }}>
            <Magnetic href="#start">Start your app <ArrowRight size={19} /></Magnetic>
            <a className="as-link" href="#demo">Try a working demo <ArrowDown size={17} /></a>
          </div>
        </motion.div>

        <motion.div className="as-hero-stage" style={reduce ? undefined : { y: stageY, rotate: stageR }} aria-hidden>
          <div className="as-hero-enter">
            <motion.div className="as-tilt" style={reduce ? undefined : { rotateX: rx, rotateY: ry }}>
              <div className="as-hero-halo" />
              <Phone className="as-phone-hero"><HeroApp /></Phone>
              {CHIPS.map(c => (
                <span key={c.t} className="as-chip" style={{ left: c.x, top: c.y, '--z': `${c.z}px`, animationDelay: `${c.d}s` } as CSSProperties}>
                  <i />{c.t}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="as-scroll-cue" aria-hidden><span /></div>
    </section>
  );
}

/* ---------------- velocity marquee ---------------- */

function wrap(min: number, max: number, v: number) { const r = max - min; return ((((v - min) % r) + r) % r) + min; }

function VelocityMarquee({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref);
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const reduce = useReducedMotion();
  const x = useTransform(base, v => `${wrap(-50, 0, v)}%`);
  useAnimationFrame((_, delta) => {
    if (reduce || !seen) return;
    let move = dir.current * -2 * (delta / 1000);
    if (factor.get() < 0) dir.current = -1; else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    base.set(base.get() + move);
  });
  return (
    <div className="as-marquee" ref={ref} aria-hidden>
      <motion.div className="as-marquee-row" style={{ x }}>{Array.from({ length: 4 }, (_, i) => <span key={i}>{text}</span>)}</motion.div>
    </div>
  );
}

export function AppStudio() {
  const startRef = useRef<HTMLElement>(null);
  const [bar, setBar] = useState(false);
  useEffect(() => {
    let f = 0;
    const check = () => { f = 0; const s = startRef.current?.getBoundingClientRect(); setBar(window.scrollY > window.innerHeight * .9 && !!s && s.top > window.innerHeight * .85); };
    const on = () => { if (!f) f = requestAnimationFrame(check); };
    check(); window.addEventListener('scroll', on, { passive: true }); return () => { window.removeEventListener('scroll', on); if (f) cancelAnimationFrame(f); };
  }, []);

  return (
    <div className="as">
      <Cursor />
      <Hero />
      <VelocityMarquee text="iPhone ✦ Android ✦ Web ✦ Design ✦ Build ✦ Launch ✦ " />
      <Demo />
      <BuildSequence />
      <Statement />
      <Bento />
      <Track />
      <Stack />

      <Faq />

      <section className="as-close" id="start" ref={startRef}>
        <div className="as-close-glow" aria-hidden />
        <div className="container as-close-grid">
          <div>
            <p className="as-kicker">Start here</p>
            <h2 className="as-close-title">Your app, <em>in their pocket.</em></h2>
            <ul className="as-promise">{['The first conversation is free', 'A written quote before any work', 'You approve it before launch'].map(t => <li key={t}><Check size={17} />{t}</li>)}</ul>
          </div>
          <AppBrief id="as-brief" />
        </div>
      </section>

      <div className={`as-bar${bar ? ' is-on' : ''}`} aria-hidden={!bar}>
        <a className="as-btn" href="#start" tabIndex={bar ? 0 : -1}>Start your app <ArrowRight size={17} /></a>
      </div>
    </div>
  );
}
