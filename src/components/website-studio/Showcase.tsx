'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType, type RefObject } from 'react';
import dynamic from 'next/dynamic';
import { Fraunces, Manrope } from 'next/font/google';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Check, Building2, Stethoscope, UtensilsCrossed, Sparkles, Lock, Play, Pause, MousePointer2 } from 'lucide-react';
import { StageContext, Estate, Clinic, Restaurant, Store } from './ShowcaseSites';
import type { StageSignal } from './ShowcaseStage';

/* Four concept websites inside a browser frame, each one a real-time scene. A demo
   cursor drives each site on its own: it glides through the film, then picks, types,
   books or checks out, and a cut carries it to the next. The moment a visitor clicks
   inside the frame, the demo hands over control. */

const display = Fraunces({ subsets: ['latin'], weight: ['400', '600', '700'], style: ['normal', 'italic'], variable: '--sc-display', display: 'swap' });
const ui = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--sc-ui', display: 'swap' });

const Stage = dynamic(() => import('./ShowcaseStage'), { ssr: false });

/* ---------------- the demo director ---------------- */

type Step = { k: string; type?: string; wait?: number; glide?: number };
const SCRIPTS: Step[][] = [
  [{ k: 'book', glide: 7200 }, { k: 'home-4' }, { k: 'day-Sat' }, { k: 'name', type: 'Ananya Sharma' }, { k: 'phone', type: '90000 00000' }, { k: 'submit', wait: 2600 }, { k: 'done' }],
  [{ k: 'book', glide: 4600 }, { k: 'spec-Paediatrics' }, { k: 'doc-NK' }, { k: 'slot-5:00' }, { k: 'patient', type: 'Riya Kapoor' }, { k: 'submit', wait: 2600 }, { k: 'done' }],
  [{ k: 'book', glide: 4600 }, { k: 'tab-Desserts' }, { k: 'guests+' }, { k: 'guests+' }, { k: 'guests+' }, { k: 'time-8:30' }, { k: 'submit', wait: 2600 }, { k: 'done' }],
  [{ k: 'book', glide: 4600 }, { k: 'add-serum' }, { k: 'add-oil' }, { k: 'add-serum' }, { k: 'bag', wait: 1600 }, { k: 'checkout', wait: 2600 }, { k: 'done' }],
];
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const ease = (t: number) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const SITES: { k: string; label: string; name: string; url: string; Icon: typeof Building2; shows: string; S: ComponentType }[] = [
  { k: 'estate', label: 'Developer', name: 'Northwood', url: 'northwood.concept', Icon: Building2, shows: 'rise above the trees, choose a home, book a site visit', S: Estate },
  { k: 'clinic', label: 'Clinic', name: 'Sage Clinic', url: 'sage.concept', Icon: Stethoscope, shows: 'filter doctors, pick a slot, confirm the appointment', S: Clinic },
  { k: 'resto', label: 'Restaurant', name: 'Tamarind House', url: 'tamarind.concept', Icon: UtensilsCrossed, shows: 'browse the menu, light a candle for each guest, reserve', S: Restaurant },
  { k: 'store', label: 'Store', name: 'Lumen', url: 'lumen.concept', Icon: Sparkles, shows: 'fill the bottle from the shelf, open the bag, check out', S: Store },
];

/* Scroll progress as CSS variables, written once per frame while scrolling: --p for
   the page, --s for each scene, --v for speed. Scenes read these in CSS. */
function useSceneVars(view: RefObject<HTMLDivElement | null>, reduce: boolean | null, key: string) {
  useEffect(() => {
    const el = view.current; if (!el || reduce) return;
    let raf = 0, last = el.scrollTop, v = 0;
    const paint = () => {
      raf = 0;
      const top = el.scrollTop, h = el.clientHeight, max = el.scrollHeight - h, vt = el.getBoundingClientRect().top;
      el.style.setProperty('--p', (max > 0 ? top / max : 0).toFixed(4));
      el.querySelectorAll<HTMLElement>('[data-scene]').forEach(s => {
        const r = s.getBoundingClientRect(), span = r.height - h;
        const q = span > 1 ? (vt - r.top) / span : (vt - r.top) / h;
        s.style.setProperty('--s', Math.min(1, Math.max(0, q)).toFixed(4));
      });
      v = v * .82 + Math.max(-40, Math.min(40, top - last)) * .18; last = top;
      el.style.setProperty('--v', v.toFixed(2));
      if (Math.abs(v) > .05) raf = requestAnimationFrame(paint); else el.style.setProperty('--v', '0');
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [view, reduce, key]);
}

export function Showcase() {
  const [k, setK] = useState(0);
  const [run, setRun] = useState(0); // remounts the site so every demo starts clean
  const [cut, setCut] = useState<number | null>(null); // the site a cut is carrying us to
  const [auto, setAuto] = useState(true);
  const [cursor, setCursor] = useState<{ x: number; y: number; on: boolean; down: boolean }>({ x: 60, y: 60, on: false, down: false });
  const [over, setOver] = useState<HTMLElement | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const signal = useRef<StageSignal>({ pick: 0, pulse: 0, demo: null });
  const live = useInView(frame, { amount: .35 });
  const near = useInView(frame, { once: true, margin: '700px 0px' });
  const reduce = useReducedMotion();
  const s = SITES[k];
  const stage = useMemo(() => ({ over, setPick: (n: number) => { signal.current.pick = n; }, pulse: () => { signal.current.pulse = 1; } }), [over]);

  useSceneVars(view, reduce, `${k}-${run}`);

  const swap = useCallback((i: number) => { setK(i); setRun(r => r + 1); view.current?.scrollTo({ top: 0 }); }, []);
  const go = useCallback((i: number) => { if (reduce) swap(i); else setCut(i); }, [reduce, swap]);

  // The cut covers the frame, swaps the site out of sight, then lifts.
  useEffect(() => {
    if (cut === null) return;
    const a = setTimeout(() => swap(cut), 720), b = setTimeout(() => setCut(null), 1000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [cut, swap]);

  // Hand control to the visitor only when they click inside the frame; hovering and scrolling past keep it playing.
  const takeOver = (e: { isTrusted: boolean; target: EventTarget }) => { if ((e.target as Element).closest?.('.ws-sc-auto')) return; if (e.isTrusted && auto) { setAuto(false); setCursor(c => ({ ...c, on: false })); } };

  useEffect(() => {
    if (!auto || !live || reduce || cut !== null) return;
    let alive = true;
    const find = (key: string) => frame.current?.querySelector(`[data-demo="${CSS.escape(key)}"]`) as HTMLElement | null;
    const glide = (el: HTMLElement, ms: number) => new Promise<void>(done => {
      const v = view.current!, from = v.scrollTop, to = from + el.getBoundingClientRect().top - v.getBoundingClientRect().top, t0 = performance.now();
      const b = screen.current!.getBoundingClientRect();
      const tick = (now: number) => {
        if (!alive) return done();
        const t = Math.min(1, (now - t0) / ms);
        v.scrollTop = from + (to - from) * ease(t);
        signal.current.demo = { x: b.width * (.5 + .32 * Math.sin(t * 7)), y: b.height * (.5 + .24 * Math.cos(t * 5)) };
        if (t < 1) requestAnimationFrame(tick); else done();
      };
      requestAnimationFrame(tick);
    });
    const point = async (el: HTMLElement) => {
      const v = view.current!, f = frame.current!;
      const vr = v.getBoundingClientRect(), er = el.getBoundingClientRect();
      if (v.contains(el) && (er.top < vr.top + 60 || er.bottom > vr.bottom - 20)) { v.scrollTo({ top: v.scrollTop + er.top - vr.top - v.clientHeight / 2 + er.height / 2, behavior: 'smooth' }); await sleep(650); }
      const fr = f.getBoundingClientRect(), r2 = el.getBoundingClientRect(), sr = screen.current!.getBoundingClientRect();
      const px = r2.left + Math.min(r2.width * .6, 60), py = r2.top + r2.height * .6;
      setCursor({ x: px - fr.left, y: py - fr.top, on: true, down: false });
      signal.current.demo = { x: px - sr.left, y: py - sr.top };
      await sleep(720);
    };
    (async () => {
      await sleep(2400); // let the headline land
      for (const step of SCRIPTS[k]) {
        if (!alive) return;
        const el = find(step.k); if (!el) continue;
        if (step.glide) { await glide(el, step.glide); await sleep(350); continue; }
        await point(el); if (!alive) return;
        setCursor(c => ({ ...c, down: true })); await sleep(160);
        if (step.type && el instanceof HTMLInputElement) {
          el.focus({ preventScroll: true });
          for (let i = 1; i <= step.type.length; i++) { if (!alive) return; el.value = step.type.slice(0, i); await sleep(45); }
          el.blur();
        } else el.click();
        setCursor(c => ({ ...c, down: false }));
        await sleep(step.wait ?? 650);
      }
      if (!alive) return;
      setCursor(c => ({ ...c, on: false })); await sleep(700);
      if (alive) go((k + 1) % SITES.length);
    })();
    return () => { alive = false; };
  }, [auto, live, reduce, k, run, go, cut]);

  return (
    <section className={`ws-sc ${display.variable} ${ui.variable}`} id="live-work" aria-labelledby="ws-sc-title">
      <div className="container">
        <div className="ws-sc-head">
          <div><p className="ws-kicker">Live work</p><h2 id="ws-sc-title">Four websites. <em>All of them work.</em></h2></div>
          <p className="ws-sc-sub">Watch each one play out on its own, then take a booking or an order. Take the controls and try it yourself. Concept sites, built the way we build for clients.</p>
        </div>
        <div className="ws-sc-tabs" role="tablist" aria-label="Choose a website">
          {SITES.map((x, i) => (
            <button key={x.k} role="tab" aria-selected={i === k} data-on={i === k ? '' : undefined} onClick={() => go(i)}>
              {i === k && <motion.span layoutId="ws-sc-pill" className="ws-sc-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <x.Icon size={16} /><span>{x.label}</span>
            </button>
          ))}
        </div>
        <div className="ws-sc-frame" ref={frame} onClick={takeOver}>
          <div className="ws-sc-bar"><i /><i /><i /><span><Lock size={11} /> {s.url}</span>
            <button type="button" className="ws-sc-auto" onClick={() => setAuto(a => !a)} aria-pressed={auto}>{auto ? <><Pause size={13} /> Demo playing</> : <><Play size={13} /> Resume demo</>}</button>
          </div>
          <div className="ws-sc-screen" ref={screen} data-site={s.k}>
            {near && <Stage site={k} signal={signal} frame={screen} view={view} />}
            <div className="ws-sc-view" ref={view}>
              <StageContext.Provider value={stage}>
                <s.S key={`${s.k}-${run}`} />
              </StageContext.Provider>
            </div>
            <div className="ws-sc-over" ref={setOver} />
            <AnimatePresence>
              {cut !== null && (
                <motion.div key="cut" className="ws-sc-cut" data-site={SITES[cut].k} initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .62, ease: [0.76, 0, 0.24, 1] }}>
                  <motion.span initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: .5, delay: .12, ease: [0.2, 0.7, 0.2, 1] }}>
                    <small>0{cut + 1}</small>{SITES[cut].name}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.span className={`ws-sc-cursor${cursor.down ? ' down' : ''}`} aria-hidden animate={{ x: cursor.x, y: cursor.y, opacity: cursor.on ? 1 : 0 }} transition={{ x: { duration: .7, ease: [0.65, 0, 0.35, 1] }, y: { duration: .7, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: .25 } }}>
            <MousePointer2 size={22} fill="#fff" />
          </motion.span>
        </div>
        <p className="ws-sc-hint">{auto ? <><Play size={13} /> Playing: {s.shows}. Click inside to take over.</> : <><Check size={14} /> You’re driving. Try it: {s.shows}.</>}</p>
      </div>
    </section>
  );
}
