'use client';

import { useEffect, useState } from 'react';

type Connection = { effectiveType?: string; saveData?: boolean };

/**
 * The homepage artwork as film, layered over the still that is already there.
 *
 * It is deliberately conservative: nothing is requested until the page has finished
 * loading, and then only on a wide screen with a fast connection. Phones, slow networks,
 * data-saver and reduce-motion never download it, so the page's loading speed — which the
 * still image sets — is untouched.
 */
export function HeroFilm({ src }: { src: string }) {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const net = (navigator as Navigator & { connection?: Connection }).connection;
    const slow = net ? net.saveData === true || ['slow-2g', '2g', '3g'].includes(net.effectiveType || '') : false;
    if (!wide || still || slow) return;

    // Wait for the first scroll or tap. The browser stops measuring loading speed at that
    // moment, so the film can never be counted as the page's largest paint.
    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'wheel'] as const;
    const start = () => {
      for (const e of events) window.removeEventListener(e, start);
      window.setTimeout(() => setShow(true), 300);
    };
    for (const e of events) window.addEventListener(e, start, { once: true, passive: true });
    return () => { for (const e of events) window.removeEventListener(e, start); };
  }, []);

  if (!show) return null;
  return (
    <video
      className={ready ? 'hero-film is-ready' : 'hero-film'}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlayThrough={() => setReady(true)}
    />
  );
}
