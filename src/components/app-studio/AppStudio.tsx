'use client';

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useAnimationFrame, useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion';
import { ArrowRight, ArrowDown, Plus, Minus, Check, Bell, CreditCard, Fingerprint, CloudOff, ChartColumn, Sparkles, House, Search, User, Play, Square, ShoppingBag, CalendarDays, Activity, UtensilsCrossed, Pointer, Heart, MapPin } from 'lucide-react';
import { AppBrief } from './AppBrief';
import './app-studio.css';

// WebGL loads after first paint; the CSS gradient underneath is the poster.
const AppShader = dynamic(() => import('./AppShader'), { ssr: false });

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const EASE = [0.16, 1, 0.3, 1] as const;
const img = (n: string) => `/images/app-studio/${n}.webp`;

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

/** Lines that rise out of a mask, word by word. */
function Rise({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        // the space sits outside the mask: a trailing space inside an inline-block is dropped
        <span key={i}><span className="as-mask"><motion.span className="as-mask-in" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease: EASE, delay: delay + i * .07 }}>{w}</motion.span></span>{' '}</span>
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

/** Fade in over [a,b]. Clamped, so it holds at 1 afterwards. */
function useFadeIn(p: MotionValue<number>, a: number, b: number) {
  return useTransform(p, [a, b], [0, 1], { clamp: true });
}
/** Fade in over [a,b], hold, then fade out over [c,d]. */
function useFadeInOut(p: MotionValue<number>, a: number, b: number, c: number, d: number) {
  return useTransform(p, [a, b, c, d], [0, 1, 1, 0], { clamp: true });
}

/* ---------------- the phone ---------------- */

/** A phone drawn in CSS. Everything on its screen is sized in container units, so it scales with the phone. */
function Phone({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`as-phone ${className}`} style={style}>
      <div className="as-screen">
        {children}
        <span className="as-island" />
      </div>
      <span className="as-sheen" />
    </div>
  );
}

function StatusBar() {
  return <div className="as-status"><b>9:41</b><span><i /><i /><i /><i /></span><em /></div>;
}

function TabBar({ on = 0 }: { on?: number }) {
  return (
    <div className="as-tabs">
      {[House, Search, Heart, User].map((I, i) => <span key={i} data-on={i === on ? '' : undefined}><I /></span>)}
    </div>
  );
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
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI(v => (v + 1) % REEL.length), 3400);
    return () => clearInterval(id);
  }, [reduce]);
  const r = REEL[i];
  return (
    <div className="as-app">
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
          <span key={x.img}><Image src={img(x.img)} alt="" fill sizes="90px" /></span>
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
          <motion.p className="as-pill" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: EASE }}>
            <span className="as-live" /> BYBO APP STUDIO · BENGALURU
          </motion.p>
          <h1>
            <Rise text="Apps people" delay={.15} />
            <br />
            <em><Rise text="open every day." delay={.4} /></em>
          </h1>
          <motion.p className="as-lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: .85 }}>
            iPhone, Android and web apps, designed and built by one studio. Product thinking, interface design and engineering, from the first sketch to the store.
          </motion.p>
          <motion.div className="as-hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 1 }}>
            <Magnetic href="#start">Start your app <ArrowRight size={19} /></Magnetic>
            <a className="as-link" href="#demo">Try a working demo <ArrowDown size={17} /></a>
          </motion.div>
        </motion.div>

        <motion.div className="as-hero-stage" style={reduce ? undefined : { y: stageY, rotate: stageR }} aria-hidden>
          <motion.div className="as-hero-enter" initial={{ opacity: 0, y: 80, rotateX: 30 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1.6, ease: EASE, delay: .35 }}>
            <motion.div className="as-tilt" style={reduce ? undefined : { rotateX: rx, rotateY: ry }}>
              <div className="as-hero-halo" />
              <Phone className="as-phone-hero"><HeroApp /></Phone>
              {CHIPS.map(c => (
                <span key={c.t} className="as-chip" style={{ left: c.x, top: c.y, '--z': `${c.z}px`, animationDelay: `${c.d}s` } as CSSProperties}>
                  <i />{c.t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div className="as-scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} aria-hidden><span /></motion.div>
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
    <div className="as-marquee" aria-hidden>
      <motion.div className="as-marquee-row" style={{ x }}>{Array.from({ length: 4 }, (_, i) => <span key={i}>{text}</span>)}</motion.div>
    </div>
  );
}

/* ---------------- the working demo ---------------- */

function Toast({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {show && <motion.div className="as-toast" initial={{ y: 30, opacity: 0, scale: .9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: .45, ease: EASE }}><Check />{children}</motion.div>}
    </AnimatePresence>
  );
}

function useFlash(ms = 1700): [boolean, () => void] {
  const [on, setOn] = useState(false);
  useEffect(() => { if (!on) return; const t = setTimeout(() => setOn(false), ms); return () => clearTimeout(t); }, [on, ms]);
  return [on, () => setOn(true)];
}

function ShopScreen() {
  const [size, setSize] = useState(8);
  const [bag, setBag] = useState(0);
  const [toast, flash] = useFlash();
  const [liked, setLiked] = useState(false);
  return (
    <div className="as-app as-shop">
      <StatusBar />
      <div className="as-topbar"><b>Shop</b><motion.span key={bag} className="as-bag" initial={{ scale: bag ? 1.5 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}><ShoppingBag />{bag > 0 && <i>{bag}</i>}</motion.span></div>
      <div className="as-shop-hero">
        <Image src={img('shop')} alt="" fill sizes="320px" />
        <button className="as-like" data-on={liked ? '' : undefined} onClick={() => setLiked(v => !v)} aria-label="Save"><Heart /></button>
      </div>
      <div className="as-body">
        <small>Lightweight · Breathable</small>
        <h6>The everyday trainer</h6>
        <p className="as-lbl">Size (UK)</p>
        <div className="as-sizes">{[6, 7, 8, 9, 10].map(s => <button key={s} data-on={s === size ? '' : undefined} onClick={() => setSize(s)}>{s}</button>)}</div>
        <button className="as-cta" onClick={() => { setBag(b => b + 1); flash(); }}>Add to bag</button>
      </div>
      <Toast show={toast}>Added to bag · UK {size}</Toast>
    </div>
  );
}

const DAYS = [['Mon', 10], ['Tue', 11], ['Wed', 12], ['Thu', 13], ['Fri', 14], ['Sat', 15], ['Sun', 16]] as const;

function StayScreen() {
  const [day, setDay] = useState(4);
  const [nights, setNights] = useState(2);
  const [done, setDone] = useState(false);
  const out = [DAYS[(day + nights) % 7][0], DAYS[0][1] + day + nights] as const; // the week runs on past Sunday
  return (
    <div className="as-app as-stay">
      <StatusBar />
      <div className="as-stay-hero"><Image src={img('stay')} alt="" fill sizes="320px" /><span className="as-stay-tag"><MapPin /> Courtyard room</span></div>
      <div className="as-body">
        <p className="as-lbl">Check in</p>
        <div className="as-days">{DAYS.map(([d, n], i) => <button key={d} data-on={i === day ? '' : undefined} data-in={i > day && i < day + nights ? '' : undefined} onClick={() => { setDay(i); setDone(false); }}><small>{d}</small>{n}</button>)}</div>
        <div className="as-stepper">
          <span><b>{nights} {nights === 1 ? 'night' : 'nights'}</b><small>Out {out[0]} {out[1]}</small></span>
          <button onClick={() => setNights(n => Math.max(1, n - 1))} aria-label="Fewer nights"><Minus /></button>
          <button onClick={() => setNights(n => Math.min(4, n + 1))} aria-label="More nights"><Plus /></button>
        </div>
        <button className="as-cta" onClick={() => setDone(true)}>Reserve</button>
      </div>
      <AnimatePresence>
        {done && (
          <motion.div className="as-sheet" initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '100%' }} transition={{ duration: .55, ease: EASE }}>
            <span className="as-sheet-tick"><Check /></span>
            <b>You’re booked</b>
            <span>{DAYS[day][0]} {DAYS[day][1]} to {out[0]} {out[1]} · {nights} {nights === 1 ? 'night' : 'nights'}</span>
            <button onClick={() => setDone(false)}>Done</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PACE = 330; // seconds per km: a steady 5:30

function RunScreen() {
  const [on, setOn] = useState(false);
  const [secs, setSecs] = useState(0);
  const km = Math.min(3, secs / PACE);
  const running = on && km < 3; // stops itself at the goal
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs(s => s + 3), 100); // thirty times real speed, so the ring moves while you watch
    return () => clearInterval(id);
  }, [running]);
  const goal = km / 3;
  const mm = String(Math.floor(secs / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0');
  const C = 2 * Math.PI * 42;
  return (
    <div className="as-app as-run">
      <Image className="as-run-bg" src={img('run')} alt="" fill sizes="320px" />
      <StatusBar />
      <div className="as-run-top"><small>Morning run</small><b>{running ? 'Recording' : secs ? 'Paused' : 'Ready'}</b>{running && <span className="as-live" />}</div>
      <div className="as-ring">
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" className="as-ring-bg" /><circle cx="50" cy="50" r="42" className="as-ring-fg" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - goal) }} /></svg>
        <div><b>{km.toFixed(2)}</b><small>{km >= 3 ? 'Goal reached' : 'of 3 km'}</small></div>
      </div>
      <div className="as-run-stats"><span><b>{mm}:{ss}</b><small>Time</small></span><span><b>{secs ? `${Math.floor(PACE / 60)}:${String(PACE % 60).padStart(2, '0')}` : '–'}</b><small>Pace per km</small></span></div>
      <div className="as-run-actions">
        <button className="as-cta" data-stop={running ? '' : undefined} onClick={() => { if (km >= 3) setSecs(0); setOn(!running); }}>{running ? <><Square /> Pause</> : <><Play /> {km >= 3 ? 'Run again' : secs ? 'Resume' : 'Start run'}</>}</button>
        {!running && secs > 0 && <button className="as-ghost" onClick={() => { setSecs(0); setOn(false); }}>Reset</button>}
      </div>
    </div>
  );
}

const MENU = [['Masala dosa', 'Crisp, with potato and three chutneys'], ['Idli and vada', 'Soft idli, crisp vada, sambar'], ['Filter coffee', 'Strong, frothy, in a davara']] as const;
const TRACK = ['Order placed', 'In the kitchen', 'On the way', 'At your door'];

function FoodScreen() {
  const [qty, setQty] = useState([1, 0, 1]);
  const [step, setStep] = useState(-1);
  useEffect(() => {
    if (step < 0 || step >= TRACK.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 1300);
    return () => clearTimeout(t);
  }, [step]);
  const total = qty.reduce((a, b) => a + b, 0);
  const bump = (i: number, d: number) => setQty(q => q.map((v, k) => k === i ? Math.max(0, Math.min(9, v + d)) : v));
  return (
    <div className="as-app as-food">
      <StatusBar />
      <div className="as-food-hero"><Image src={img('food')} alt="" fill sizes="320px" /></div>
      <div className="as-body">
        {step < 0 ? (
          <>
            <h6>Tonight’s menu</h6>
            <ul className="as-menu">
              {MENU.map(([t, d], i) => (
                <li key={t}>
                  <div><b>{t}</b><small>{d}</small></div>
                  <span className="as-qty">
                    <button onClick={() => bump(i, -1)} aria-label={`One less ${t}`}><Minus /></button>
                    <motion.b key={qty[i]} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{qty[i]}</motion.b>
                    <button onClick={() => bump(i, 1)} aria-label={`One more ${t}`}><Plus /></button>
                  </span>
                </li>
              ))}
            </ul>
            <button className="as-cta" disabled={!total} onClick={() => setStep(0)}>Place order · {total} {total === 1 ? 'item' : 'items'}</button>
          </>
        ) : (
          <>
            <h6>{step === TRACK.length - 1 ? 'Enjoy your meal' : 'Tracking your order'}</h6>
            <ol className="as-track-steps">
              {TRACK.map((t, i) => <li key={t} data-done={i <= step ? '' : undefined} data-now={i === step ? '' : undefined}><i>{i <= step && <Check />}</i>{t}</li>)}
            </ol>
            {step === TRACK.length - 1 && <button className="as-ghost" onClick={() => setStep(-1)}>Order again</button>}
          </>
        )}
      </div>
    </div>
  );
}

const APPS = [
  { k: 'shop', label: 'Shop', Icon: ShoppingBag, title: 'A store in their pocket.', d: 'Sizes remembered, saved favourites and checkout in a couple of taps. Pick a size and add it to the bag.', S: ShopScreen },
  { k: 'stay', label: 'Book', Icon: CalendarDays, title: 'Bookings without the back-and-forth.', d: 'Pick a date, choose the nights and reserve. Change the dates and watch the stay update.', S: StayScreen },
  { k: 'run', label: 'Track', Icon: Activity, title: 'Progress people can feel.', d: 'Live tracking, goals and a ring that fills as you go. Press start and watch it move.', S: RunScreen },
  { k: 'food', label: 'Order', Icon: UtensilsCrossed, title: 'From menu to doorstep.', d: 'Add a dish, place the order and follow it from the kitchen to the door, step by step.', S: FoodScreen },
];

function Demo() {
  const [k, setK] = useState(0);
  const [touched, setTouched] = useState(false);
  const a = APPS[k];
  return (
    <section className="as-demo" id="demo" aria-labelledby="as-demo-title">
      <div className="as-demo-glow" aria-hidden />
      <div className="container as-demo-grid">
        <div className="as-demo-copy">
          <p className="as-kicker">Try it</p>
          <h2 id="as-demo-title">Don’t read about it. <em>Tap it.</em></h2>
          <div className="as-demo-tabs" role="tablist" aria-label="Choose an app">
            {APPS.map(({ k: key, label, Icon }, i) => (
              <button key={key} role="tab" aria-selected={i === k} data-on={i === k ? '' : undefined} onClick={() => setK(i)}>
                {i === k && <motion.span layoutId="as-tab-pill" className="as-tab-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <Icon size={17} /><span>{label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={a.k} className="as-demo-text" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .4, ease: EASE }}>
              <h3>{a.title}</h3>
              <p>{a.d}</p>
            </motion.div>
          </AnimatePresence>
          <p className="as-demo-note">Every app we make is tapped through like this, on your own phone, before it is built.</p>
        </div>
        <div className="as-demo-stage" onPointerDown={() => setTouched(true)}>
          <Phone className="as-phone-demo">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={a.k} className="as-demo-screen" initial={{ x: '100%', opacity: .4 }} animate={{ x: '0%', opacity: 1 }} exit={{ x: '-35%', opacity: 0 }} transition={{ duration: .6, ease: EASE }}>
                <a.S />
              </motion.div>
            </AnimatePresence>
          </Phone>
          <AnimatePresence>{!touched && <motion.span className="as-try" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: .6 }}><Pointer size={16} /> This phone works. Try it.</motion.span>}</AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- sketch to store ---------------- */

const STAGES: [string, string][] = [
  ['Idea', 'A sketch is enough to start. We begin with who it is for and the one job it must do.'],
  ['Flow', 'Every screen and every tap mapped out before anything is designed.'],
  ['Design', 'Real content, real photography and a look that is unmistakably yours.'],
  ['Prototype', 'You tap through it on your own phone before it is built.'],
  ['Build', 'Interface, logic, services and data, engineered as one system.'],
  ['Launch', 'Tested on real devices, submitted to the stores and handed over.'],
];

const SKETCH = [
  'M14 26 C 38 24, 62 28, 86 25',
  'M14 38 L86 37 L87 98 L13 99 Z',
  'M14 38 L86 98 M86 37 L14 99',
  'M14 112 C 40 110, 56 113, 74 111',
  'M14 123 C 30 122, 42 124, 56 123',
  'M14 140 L46 139 L47 162 L14 163 Z',
  'M54 140 L86 139 L87 162 L54 163 Z',
  'M16 184 C 14 176, 86 175, 85 183 C 87 191, 15 192, 16 184 Z',
];

function SketchPath({ d, p, i }: { d: string; p: MotionValue<number>; i: number }) {
  const len = useTransform(p, [.02 + i * .012, .06 + i * .012], [0, 1], { clamp: true });
  return <motion.path d={d} style={{ pathLength: len }} />;
}

function Layer({ z, o, lo, label, className, children }: { z: MotionValue<number>; o?: MotionValue<number>; lo: MotionValue<number>; label: string; className: string; children?: ReactNode }) {
  return (
    <motion.div className={`as-layer ${className}`} style={{ z, opacity: o }}>
      {children}
      <motion.span className="as-layer-label" style={{ opacity: lo }}>{label}</motion.span>
    </motion.div>
  );
}

function BuildSequence() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // A function mapping on purpose: Framer otherwise hands range-based opacity to a native
  // scroll timeline, which maps sub-ranges wrongly and fades layers back out at the end.
  const progress = useTransform(scrollYProgress, v => v);
  const still = useMotionValue(1);
  const p = reduce ? still : progress;
  const [stage, setStage] = useState(reduce ? 5 : 0);
  useMotionValueEvent(scrollYProgress, 'change', v => { if (!reduce) setStage(Math.min(5, Math.floor(v * 6.0001))); });

  // the whole device
  const rotX = useTransform(p, [0, .08, .66, .76, .84, .94], [18, 0, 0, 56, 56, 0]);
  const rotZ = useTransform(p, [.66, .76, .84, .94], [0, -36, -36, 0]);
  const rotY = useTransform(p, [0, .08, .84, .94, 1], [-24, 0, 0, -10, -14]);
  const scale = useTransform(p, [0, .08, .66, .76, .84, .94], [.86, 1, 1, .82, .82, 1]);
  // screens on the phone
  const paper = useFadeInOut(p, 0, .02, .2, .26);
  const wire = useFadeInOut(p, .2, .26, .34, .4);
  const design = useFadeIn(p, .34, .42);
  const photo = useTransform(p, [.36, .5], [1.25, 1]);
  // the flow: neighbouring screens slide out
  const sideX = useTransform(p, [.17, .26, .3, .36], ['0%', '78%', '78%', '0%']);
  const sideXn = useTransform(sideX, v => `-${v}`);
  const sideO = useFadeInOut(p, .17, .21, .31, .36);
  const links = useTransform(p, [.24, .3], [0, 1], { clamp: true });
  // the prototype: a tap, then a sheet
  const finger = useFadeInOut(p, .5, .53, .6, .63);
  const fingerY = useTransform(p, [.5, .56], ['45%', '91%']);
  const press = useTransform(p, [.56, .575, .59], [1, .7, 1]);
  const sheet = useTransform(p, [.58, .64], ['105%', '0%']);
  // the build: the layers come apart
  // layers sit further apart on wide screens, where the device is bigger
  const [spread, setSpread] = useState(1);
  useEffect(() => { const m = window.matchMedia('(min-width: 1100px)'); const set = () => setSpread(m.matches ? 1.6 : 1); set(); m.addEventListener('change', set); return () => m.removeEventListener('change', set); }, []);
  const zUi = useTransform(p, [.7, .8, .84, .92], [0, 150 * spread, 150 * spread, 0]);
  const zLogic = useTransform(p, [.7, .8, .84, .92], [0, 100 * spread, 100 * spread, 0]);
  const zApi = useTransform(p, [.7, .8, .84, .92], [0, 50 * spread, 50 * spread, 0]);
  const zData = useMotionValue(0);
  const inner = useFadeInOut(p, .68, .73, .86, .9);
  const labels = useFadeInOut(p, .76, .8, .84, .87);
  // the launch
  const badge = useTransform(p, [.92, .97], [0, 1], { clamp: true });
  const bar = useTransform(p, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} className="as-build" id="build" aria-label="How a BYBO app comes together">
      <div className="as-build-sticky">
        <div className="container as-build-grid">
          <div className="as-build-copy">
            <p className="as-kicker">From sketch to store</p>
            <ol className="as-stages">
              {STAGES.map(([t, d], i) => (
                <li key={t} data-on={i === stage ? '' : undefined} data-done={i < stage ? '' : undefined}>
                  <span className="as-stage-n">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3>{t}</h3><p>{d}</p></div>
                </li>
              ))}
            </ol>
            <div className="as-build-bar"><motion.span style={{ width: bar }} /></div>
          </div>

          <div className="as-scene" aria-hidden>
            <motion.div className="as-rig" style={{ rotateX: rotX, rotateY: rotY, rotateZ: rotZ, scale }}>
              {/* neighbouring screens in the flow */}
              <motion.div className="as-side" style={{ x: sideXn, opacity: sideO, z: -90 }}>
                <Phone><div className="as-app as-mini"><StatusBar /><span className="as-mini-photo"><Image src={img('shop')} alt="" fill sizes="160px" /></span><i /><i /><i className="s" /></div></Phone>
              </motion.div>
              <motion.div className="as-side r" style={{ x: sideX, opacity: sideO, z: -90 }}>
                <Phone><div className="as-app as-mini"><StatusBar /><span className="as-mini-tick"><Check /></span><i /><i className="s" /><span className="as-mini-btn" /></div></Phone>
              </motion.div>
              <motion.svg className="as-links" viewBox="0 0 300 100" style={{ opacity: sideO }}>
                <motion.path d="M70 50 C 100 20, 120 20, 140 40" style={{ pathLength: links }} />
                <motion.path d="M160 60 C 180 80, 200 80, 230 50" style={{ pathLength: links }} />
              </motion.svg>

              {/* the device, in layers */}
              <Layer z={zData} label="Data" lo={labels} className="as-l-data" o={inner} />
              <Layer z={zApi} label="Services & API" lo={labels} className="as-l-api" o={inner}><span className="as-nodes"><i /><i /><i /><i /></span></Layer>
              <Layer z={zLogic} label="Logic" lo={labels} className="as-l-logic" o={inner}><span className="as-flowchart"><i /><i /><i /></span></Layer>
              <Layer z={zUi} label="Interface" lo={labels} className="as-l-ui">
                <Phone>
                  <motion.div className="as-paper" style={{ opacity: paper }}>
                    <svg viewBox="0 0 100 210">{SKETCH.map((d, i) => <SketchPath key={i} d={d} p={p} i={i} />)}</svg>
                  </motion.div>
                  <motion.div className="as-wire" style={{ opacity: wire }}>
                    <span className="w-photo" /><span className="w-t" /><span className="w-t s" /><span className="w-chip" /><span className="w-chip b" /><span className="w-btn" />
                  </motion.div>
                  <motion.div className="as-app as-design" style={{ opacity: design }}>
                    <motion.div className="as-design-photo" style={{ scale: photo }}><Image src={img('stay')} alt="" fill sizes="320px" /></motion.div>
                    <StatusBar />
                    <div className="as-design-body">
                      <small>Your stay</small>
                      <h6>Courtyard room</h6>
                      <div className="as-days mini">{DAYS.slice(2, 7).map(([d, n], i) => <span key={d} data-on={i === 2 ? '' : undefined}><small>{d}</small>{n}</span>)}</div>
                      <motion.span className="as-cta" style={{ scale: press }}>Reserve</motion.span>
                    </div>
                    <motion.div className="as-sheet" style={{ y: sheet }}>
                      <span className="as-sheet-tick"><Check /></span><b>You’re booked</b><span>Fri 14 to Sun 16 · 2 nights</span>
                    </motion.div>
                    <motion.span className="as-finger" style={{ top: fingerY, opacity: finger }} />
                  </motion.div>
                </Phone>
              </Layer>
            </motion.div>
            <motion.div className="as-launch" style={{ scale: badge, opacity: badge }}>
              <span className="as-live" /> Ready for the App Store and Google Play
            </motion.div>
          </div>
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

function Bento() {
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

function Stack() {
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

/* ---------------- faq and close ---------------- */

const FAQ: [string, string][] = [
  ['How much does an app cost?', 'It depends on what the app has to do. A booking app for one location and a marketplace with payments and an admin panel are very different builds. We scope it with you, then quote once, in writing, before any paid work starts.'],
  ['iPhone, Android or both?', 'It depends on who your customers are and how they will use it. Many apps launch on both from one shared codebase. We recommend after discovery and explain the trade-offs.'],
  ['We only have an idea.', 'That is where most apps start. Discovery turns it into a clear first version: who it is for, what it must do on day one, and what can wait for later.'],
  ['Will Apple and Google approve it?', 'We design and build to their guidelines and handle the submission. The final decision is theirs, and if they ask for changes we work through them with you.'],
  ['Can it use AI?', 'Yes, where it genuinely helps: search that understands questions, recommendations, assistants or reading documents and photos. It is the same team that builds BYBO’s AI systems.'],
  ['What happens after launch?', 'Phones and operating systems keep changing, so apps need looking after. Updates, fixes and new features can be scoped around your needs. Ownership and handover are agreed in writing before work starts.'],
];

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

      <section className="as-faq">
        <div className="container as-faq-grid">
          <div><p className="as-kicker">Questions</p><h2>Asked before <em>every app.</em></h2></div>
          <div className="as-faq-list">{FAQ.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} /></summary><p>{a}</p></details>)}</div>
        </div>
      </section>

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
