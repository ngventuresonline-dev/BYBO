'use client';

import { useEffect, useRef } from 'react';

/* Brings a photo hero to life without touching how it loads. The photo and headline
   paint first, as plain HTML. Once the browser is idle this adds scroll and pointer
   depth, then fetches a small light pass (HeroLight) on top. Reduced motion leaves
   the hero as it is, and so does a device without WebGL for the light. */
export function HeroLive() {
  const mark = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = mark.current?.parentElement; if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, dead = false, stop: (() => void) | undefined, onScreen = true;
    const live = { x: .68, y: .5, scroll: 0 };
    const paint = () => {
      raf = 0;
      const b = hero.getBoundingClientRect();
      live.scroll = Math.min(1, Math.max(0, -b.top / Math.max(1, b.height)));
      hero.style.setProperty('--hs', live.scroll.toFixed(4));
      hero.style.setProperty('--hx', (live.x - .5).toFixed(3));
      hero.style.setProperty('--hy', (live.y - .5).toFixed(3));
    };
    const ask = () => { if (!raf && onScreen) raf = requestAnimationFrame(paint); };
    const move = (e: PointerEvent) => { const b = hero.getBoundingClientRect(); live.x = (e.clientX - b.left) / b.width; live.y = (e.clientY - b.top) / b.height; ask(); };
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; });
    const begin = () => {
      if (dead) return;
      paint(); hero.dataset.live = '';
      io.observe(hero);
      window.addEventListener('scroll', ask, { passive: true });
      window.addEventListener('pointermove', move, { passive: true });
      import('./HeroLight').then(m => { if (!dead) stop = m.startHeroLight(hero, live); }).catch(() => {});
    };
    const idle = window.requestIdleCallback ? window.requestIdleCallback(begin, { timeout: 2500 }) : window.setTimeout(begin, 1200);
    return () => {
      dead = true; cancelAnimationFrame(raf); io.disconnect(); stop?.();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle); else clearTimeout(idle);
      window.removeEventListener('scroll', ask); window.removeEventListener('pointermove', move);
    };
  }, []);

  return <span ref={mark} hidden />;
}
