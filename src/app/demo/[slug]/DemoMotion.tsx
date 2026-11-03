'use client';

import { useEffect } from 'react';

/** Scroll reveals, card tilt, magnetic buttons and hero parallax for demo pages. Off when reduced motion is set. */
export function DemoMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.demo');
    if (!root) return;
    const reveal = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal.forEach((el) => el.classList.add('is-in'));
      return;
    }
    root.classList.add('is-motion');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveal.forEach((el) => io.observe(el));

    const fine = window.matchMedia('(pointer: fine)').matches;
    const off: (() => void)[] = [];
    if (fine) {
      root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
          el.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`);
          el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
          el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
        };
        const leave = () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        off.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      });
      root.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1)}px)`;
        };
        const leave = () => { el.style.transform = ''; };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        off.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      });
      const art = root.querySelector<HTMLElement>('[data-parallax]');
      if (art) {
        const move = (e: PointerEvent) => {
          const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
          art.style.setProperty('--px', `${(x * 26).toFixed(1)}px`);
          art.style.setProperty('--py', `${(y * 20).toFixed(1)}px`);
        };
        window.addEventListener('pointermove', move);
        off.push(() => window.removeEventListener('pointermove', move));
      }
    }
    const onScroll = () => root.style.setProperty('--scroll', String(Math.min(1, window.scrollY / 700)));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); off.forEach((f) => f()); window.removeEventListener('scroll', onScroll); };
  }, []);
  return null;
}
