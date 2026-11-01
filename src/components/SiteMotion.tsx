'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* One quiet entrance for sections on the older pages. Only sections below the fold are
   touched, so nothing above it can delay paint or shift. Reading pages and the pages
   with their own motion opt out, and so does reduced motion. */
const SKIP = '.ws, .as, .h3, .lg, .ga, .pay, .mp';
const SECTIONS = 'main section, main .rp-section, main .section';

export function SiteMotion() {
  const path = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.querySelector(`main :is(${SKIP})`) || !('IntersectionObserver' in window)) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '100000px 0px -8% 0px' }); // anything already scrolled past counts as seen
    document.querySelectorAll(SECTIONS).forEach(s => {
      if (seen.has(s) || s.parentElement?.closest('section')) return;
      seen.add(s);
      if (s.getBoundingClientRect().top < window.innerHeight) return;
      s.classList.add('na-rise');
      io.observe(s);
    });
    return () => io.disconnect();
  }, [path]);

  return null;
}
