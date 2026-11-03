'use client';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Drives the demo's scroll story: pinned chapters get a --p progress (0 to 1),
 * the shop rail moves sideways, the chapter rail tracks where you are, and
 * reveals, tilt, magnetic buttons and gallery parallax run on top. Scrolling
 * is smoothed with Lenis. With reduced motion everything shows in its final state.
 */
export function DemoMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.demo');
    if (!root) return;
    const reveal = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('is-static');
      reveal.forEach((el) => el.classList.add('is-in'));
      return;
    }
    root.classList.add('is-motion');
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    let raf = requestAnimationFrame(function loop(t) { lenis.raf(t); raf = requestAnimationFrame(loop); });
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveal.forEach((el) => io.observe(el));

    const pins = [...root.querySelectorAll<HTMLElement>('[data-pin]')];
    const hs = root.querySelector<HTMLElement>('[data-hscroll]');
    const track = hs?.querySelector<HTMLElement>('[data-track]');
    const figures = [...root.querySelectorAll<HTMLElement>('[data-speed]')];
    const chapters = [...root.querySelectorAll<HTMLElement>('[data-chapter]')];
    const rail = new Map([...root.querySelectorAll<HTMLElement>('[data-rail]')].map((el) => [el.dataset.rail!, el]));
    const nav = root.querySelector<HTMLElement>('[data-nav]');

    // On phones a wide scene is cropped hard: slide each photo so its product sits in the middle.
    const centre = () => {
      root.querySelectorAll<HTMLImageElement>('.demo-frame img[data-fx]').forEach((img) => {
        const x = Number(img.dataset.fx) / 100;
        const w = window.innerHeight * ((img.naturalWidth / img.naturalHeight) || 1.5), v = window.innerWidth;
        if (window.innerWidth > 860 || w <= v) { img.style.objectPosition = `${x * 100}% 22%`; return; }
        img.style.objectPosition = `${(Math.max(0, Math.min(1, (x * w - v / 2) / (w - v))) * 100).toFixed(1)}% 22%`;
      });
    };
    root.querySelectorAll<HTMLImageElement>('.demo-frame img[data-fx]').forEach((img) => (img.complete ? null : img.addEventListener('load', centre, { once: true })));

    let shift = 0;
    const size = () => {
      if (hs && track) {
        shift = Math.max(0, track.scrollWidth - window.innerWidth + 48);
        hs.style.height = `${window.innerHeight + shift}px`;
        hs.style.setProperty('--shift', `${shift}px`);
      }
    };

    let ticking = false;
    const frame = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of pins) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const p = clamp(-r.top / Math.max(1, el.offsetHeight - vh));
        el.style.setProperty('--p', p.toFixed(4));
        el.style.setProperty('--in', clamp(1 - r.top / vh).toFixed(4));
        const n = Number(el.dataset.frames);
        if (n > 1) {
          // Scene changes: one active frame, caption and dot at a time; the product moves to its spot for that scene.
          const cur = Number(el.dataset.active ?? 0);
          let next = Math.min(n - 1, Math.floor(p * n));
          // Near a hand-over point keep the current scene, so a resting scroll never flips back and forth.
          if (next !== cur && Math.abs(p * n - Math.round(p * n)) < 0.04) next = cur;
          const active = String(next);
          if (el.dataset.active !== active) {
            el.dataset.active = active;
            el.querySelectorAll<HTMLElement>('[data-frame]').forEach((f) => {
              f.classList.toggle('is-active', f.dataset.frame === active);
              // Scenes stack: every scene up to the active one stays opaque, so a fade never shows the page behind.
              if (f.classList.contains('demo-frame')) f.classList.toggle('is-shown', Number(f.dataset.frame) <= next);
            });
            const spot = el.querySelector<HTMLElement>(`.demo-frame[data-frame="${active}"]`)?.dataset.float;
            if (spot) {
              const { x, y, s } = JSON.parse(spot) as { x: number; y: number; s: number };
              el.style.setProperty('--fx', String(x)); el.style.setProperty('--fy', String(y)); el.style.setProperty('--fs', String(s));
            }
          }
        }
      }
      if (hs) {
        const r = hs.getBoundingClientRect();
        hs.style.setProperty('--p', clamp(-r.top / Math.max(1, hs.offsetHeight - vh)).toFixed(4));
      }
      for (const f of figures) {
        const r = f.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        f.style.setProperty('--y', `${((r.top + r.height / 2 - vh / 2) * Number(f.dataset.speed)).toFixed(1)}px`);
      }
      let active = chapters[0]?.dataset.chapter;
      for (const ch of chapters) if (ch.getBoundingClientRect().top < vh * 0.5) active = ch.dataset.chapter;
      rail.forEach((el, id) => el.classList.toggle('is-active', id === active));
      nav?.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    const onResize = () => { size(); centre(); onScroll(); };
    size();
    centre();
    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Images change the rail's width as they load.
    const imgs = track ? [...track.querySelectorAll('img')] : [];
    imgs.forEach((img) => img.addEventListener('load', onResize, { once: true }));

    const off: (() => void)[] = [];
    if (window.matchMedia('(pointer: fine)').matches) {
      root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
          el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
        };
        const leave = () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        off.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      });
      root.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.2).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px)`;
        };
        const leave = () => { el.style.transform = ''; };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        off.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      });
    }
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      io.disconnect();
      off.forEach((f) => f());
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return null;
}
