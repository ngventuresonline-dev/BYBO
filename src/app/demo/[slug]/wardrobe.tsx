'use client';

/* eslint-disable @next/next/no-img-element -- the brand's own product renders */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from './store';

type Jacket = { handle: string; code: string; title: string; price: number; front: string | null; back: string | null; hanger: string | null; category: string; specs: string[]; role: string };

/** Ask the personaliser to take this colourway and bring it into view. */
export const pickJacket = (handle: string) => window.dispatchEvent(new CustomEvent('demo:pick', { detail: handle }));

const NAMES = ['DHILLON', 'PATEL', 'SIDHU', 'SHAH', 'SANDHU', 'GREWAL', 'MEHTA', 'BRAR', 'GILL', 'DESAI', 'MANGAT', 'BHULLAR', 'KAPOOR', 'RANDHAWA'];

/**
 * The showroom: every jacket stands in a slowly turning ring under a spotlight.
 * The one that swings to the front turns itself around and its card follows.
 * Drag to spin, hover to pause, tap to stop on one. Family names drift behind.
 */
export function Wardrobe({ jackets, kicker, title }: { jackets: Jacket[]; kicker: string; title: string }) {
  const { money } = useCart();
  const [filter, setFilter] = useState('All');
  const list = useMemo(() => jackets.filter((j) => filter === 'All' || j.category === filter), [jackets, filter]);
  const cats = useMemo(() => ['All', ...new Set(jackets.map((j) => j.category))], [jackets]);
  const ring = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const target = useRef<number | null>(null);
  const paused = useRef(false);
  const drag = useRef<{ x: number; a: number; moved: boolean } | null>(null);
  const [at, setAt] = useState(0);
  const step = 360 / Math.max(1, list.length);

  // One animation loop drives the ring: auto-spin, glide to a chosen jacket, or follow a drag.
  useEffect(() => {
    let raf = 0, last = performance.now();
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tick = (now: number) => {
      const dt = Math.min(64, now - last); last = now;
      if (target.current != null) {
        const diff = target.current - angle.current;
        angle.current += diff * Math.min(1, dt / 160);
        if (Math.abs(diff) < 0.05) { angle.current = target.current; target.current = null; }
      } else if (!paused.current && !drag.current && !still) {
        angle.current -= dt * 0.012;
      }
      const el = ring.current;
      if (el) {
        el.style.setProperty('--a', `${angle.current}deg`);
        const i = ((Math.round(-angle.current / step) % list.length) + list.length) % list.length;
        setAt((p) => (p === i ? p : i));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [list.length, step]);

  const goTo = (i: number) => {
    // The shortest way round to put jacket i at the front.
    const want = -i * step;
    const turns = Math.round((angle.current - want) / 360);
    target.current = want + turns * 360;
    paused.current = true;
  };

  const j = list[at];
  if (!j) return null;
  return (
    <section className="cr" id="wardrobe" data-chapter="wardrobe"
      onPointerEnter={() => { paused.current = true; }} onPointerLeave={() => { paused.current = false; drag.current = null; }}>
      <div className="cr-names" aria-hidden="true">
        {[0, 1].map((row) => <div key={row} className={`cr-names-row r${row}`}><span>{[...NAMES, ...NAMES].slice(row * 5, row * 5 + 14).join(' · ')} · </span><span>{[...NAMES, ...NAMES].slice(row * 5, row * 5 + 14).join(' · ')} · </span></div>)}
      </div>
      <div className="cr-beam" aria-hidden="true" />

      <div className="cr-head">
        <p className="demo-kicker">{kicker}</p>
        <h2>{title}</h2>
        <div className="cr-chips" role="tablist">{cats.map((k) => <button key={k} type="button" role="tab" aria-selected={k === filter} className={k === filter ? 'is-on' : ''} onClick={() => { setFilter(k); angle.current = 0; target.current = null; }}>{k}</button>)}</div>
      </div>

      <div className="cr-stage"
        onPointerDown={(e) => { drag.current = { x: e.clientX, a: angle.current, moved: false }; target.current = null; }}
        onPointerMove={(e) => { const d = drag.current; if (!d) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true; angle.current = d.a + dx * 0.25; }}
        onPointerUp={() => { const d = drag.current; drag.current = null; if (d?.moved) goTo(at); }}>
        <div className="cr-ring" ref={ring} style={{ '--n': list.length, '--step': `${step}deg` } as React.CSSProperties}>
          {list.map((x, i) => (
            <button key={x.handle} type="button" className={`cr-item${i === at ? ' is-on' : ''}`} style={{ '--i': i } as React.CSSProperties}
              onClick={(e) => { if (drag.current?.moved) { e.preventDefault(); return; } goTo(i); }} aria-label={x.title}>
              <span className="cr-turn">
                <img className="cr-back" src={x.hanger ?? x.back ?? x.front ?? ''} alt="" draggable={false} loading={i < 6 ? 'eager' : 'lazy'} />
                <img className="cr-front" src={x.front ?? ''} alt="" draggable={false} loading="lazy" />
              </span>
            </button>
          ))}
        </div>
        <div className="cr-floor" aria-hidden="true" />
        <p className="cr-hint" aria-hidden="true">Drag to spin · tap a jacket</p>
      </div>

      <aside className="cr-card" key={j.handle} aria-live="polite">
        <p className="cr-card-code"><span>{j.code}</span>{j.category}</p>
        <h3>{j.title}</h3>
        <p className="cr-card-role">{j.role}</p>
        <dl>{j.specs.slice(0, 3).map((s) => { const [k, ...v] = s.split(': '); return <div key={s}><dt>{k}</dt><dd>{v.join(': ')}</dd></div>; })}</dl>
        <div className="cr-card-buy">
          <b>{money(j.price)}</b>
          <button type="button" className="demo-btn" onClick={() => pickJacket(j.handle)}>Put my name on it</button>
        </div>
      </aside>
    </section>
  );
}
