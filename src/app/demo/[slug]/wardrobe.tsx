'use client';

/* eslint-disable @next/next/no-img-element -- the brand's own product renders */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from './store';

type Jacket = { handle: string; code: string; title: string; price: number; front: string | null; back: string | null; hanger: string | null; category: string; specs: string[]; role: string };

/** Ask the personaliser to take this colourway and bring it into view. */
export const pickJacket = (handle: string) => window.dispatchEvent(new CustomEvent('demo:pick', { detail: handle }));

/**
 * The wardrobe: every jacket on one rail. The one in the middle steps forward;
 * tap it to turn it around, read its card, and put your own name on it.
 */
export function Wardrobe({ jackets, kicker, title }: { jackets: Jacket[]; kicker: string; title: string }) {
  const { money } = useCart();
  const [filter, setFilter] = useState('All');
  const list = useMemo(() => jackets.filter((j) => filter === 'All' || j.category === filter), [jackets, filter]);
  const [at, setAt] = useState(0);
  const [turned, setTurned] = useState(true);
  const rail = useRef<HTMLDivElement>(null);
  const cats = useMemo(() => ['All', ...new Set(jackets.map((j) => j.category))], [jackets]);
  const j = list[Math.min(at, list.length - 1)];

  // The jacket nearest the centre of the rail is the one on show.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0, dist = Infinity;
        [...el.children].forEach((c, i) => {
          const b = c as HTMLElement;
          const d = Math.abs(b.offsetLeft + b.offsetWidth / 2 - mid);
          b.style.setProperty('--d', String(Math.min(1, d / el.clientWidth)));
          if (d < dist) { dist = d; best = i; }
        });
        setAt(best);
      });
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [list]);

  const go = (i: number) => {
    const el = rail.current;
    const b = el?.children[i] as HTMLElement | undefined;
    if (el && b) el.scrollTo({ left: b.offsetLeft + b.offsetWidth / 2 - el.clientWidth / 2, behavior: 'smooth' });
  };

  if (!j) return null;
  return (
    <section className="wd" id="wardrobe" data-chapter="wardrobe">
      <div className="wd-light" aria-hidden="true" />
      <div className="wd-head">
        <p className="demo-kicker">{kicker}</p>
        <h2>{title}</h2>
        <div className="wd-chips" role="tablist">{cats.map((k) => <button key={k} type="button" role="tab" aria-selected={k === filter} className={k === filter ? 'is-on' : ''} onClick={() => { setFilter(k); setAt(0); rail.current?.scrollTo({ left: 0 }); }}>{k}</button>)}</div>
      </div>

      <div className="wd-stage">
        <div className="wd-rod" aria-hidden="true" />
        <div className="wd-rail" ref={rail} aria-label="Jackets">
          {list.map((x, i) => (
            <button key={x.handle} type="button" className={`wd-item${i === at ? ' is-on' : ''}`} onClick={() => (i === at ? setTurned(!turned) : go(i))} aria-label={`${x.title}${i === at ? ', tap to turn around' : ''}`}>
              <span className="wd-hook" aria-hidden="true" />
              <span className={`wd-flip${i === at && !turned ? ' is-front' : ''}`}>
                <img className="wd-back" src={x.hanger ?? x.back ?? x.front ?? ''} alt="" loading={i < 4 ? 'eager' : 'lazy'} draggable={false} />
                <img className="wd-front" src={x.front ?? ''} alt="" loading="lazy" draggable={false} />
              </span>
              <span className="wd-code">{x.code}</span>
            </button>
          ))}
        </div>
        <div className="wd-arrows">
          <button type="button" onClick={() => go(Math.max(0, at - 1))} aria-label="Previous jacket" disabled={at === 0}>‹</button>
          <span>{String(at + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => go(Math.min(list.length - 1, at + 1))} aria-label="Next jacket" disabled={at === list.length - 1}>›</button>
        </div>
      </div>

      <aside className="wd-card" key={j.handle} aria-live="polite">
        <p className="wd-card-code">{j.code} · {j.category}</p>
        <h3>{j.title}</h3>
        <p className="wd-card-role">{j.role}</p>
        <dl>{j.specs.map((s) => { const [k, ...v] = s.split(': '); return <div key={s}><dt>{k}</dt><dd>{v.join(': ')}</dd></div>; })}</dl>
        <div className="wd-card-buy">
          <b>{money(j.price)}</b>
          <button type="button" className="demo-btn" onClick={() => pickJacket(j.handle)}>Put my name on it</button>
        </div>
        <button type="button" className="wd-turn" onClick={() => setTurned(!turned)}>{turned ? 'See the front ↻' : 'See the back ↻'}</button>
      </aside>
    </section>
  );
}
