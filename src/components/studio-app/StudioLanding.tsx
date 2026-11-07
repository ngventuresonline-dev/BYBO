'use client';

import { type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AuthBar, AuthButtons, LOGIN, StudioApp } from './StudioApp';
import './studio-landing.css';

/**
 * The Website Studio and Motion Studio landings: only the self-serve BYBO Studio
 * app, what it does and how to get in. Every image and reel is captured from the
 * studio itself, with made-up sample businesses.
 */

type Kind = 'website' | 'motion';
const A = '/studio-app';
const EASE = [0.16, 1, 0.3, 1] as const;

const COPY = {
  website: {
    kicker: 'BYBO Website Studio',
    lines: ['Describe the business.', 'Get the website.'],
    lede: 'Type a sentence or paste a link. The studio builds every page with real sections and photos. Edit it by chatting, publish it in one click, and every enquiry lands in your inbox.',
    close: ['Your website is', 'one sentence away.'],
  },
  motion: {
    kicker: 'BYBO Motion Studio',
    lines: ['Describe the reel.', 'Post it today.'],
    lede: 'Pick a story ad or an effect, or describe the reel in a line. The studio writes it, voices it and animates every scene, then cuts it for WhatsApp and Instagram.',
    close: ['Your next reel is', 'one line away.'],
  },
};

// three drifting columns for the hero, each a different mix
const WEB_COLS = [
  ['darkluxe', 'roastery', 'gym-raw', 'botanica', 'wear-gold'],
  ['cover-star', 'event-build', 'cinema', 'y2k-drop', 'boutique'],
  ['wear-watch', 'chef-pantry', 'saanjh-parfum', 'maker-craft', 'wear-kicks'],
];
const MOTION_COLS = [
  ['ad-bear-proof', 'fx-spice-burst', 'ad-ice-paws', 'fx-screen-print', 'ad-monster-within', 'fx-halftone-zine'],
  ['fx-clay-letters', 'ad-public-failure', 'fx-comic-bottle-pop', 'ad-smile-june', 'fx-droplet-lens', 'ad-last-goodbye'],
  ['ad-hired-help', 'fx-crimson-feast', 'ad-lasagna-heist', 'fx-rice-bag-still', 'fx-pump-cap-shine', 'fx-cartoon-crunch'],
];
// one clip per column plays in the hero; the rest are stills
const LIVE = new Set(['fx-spice-burst', 'ad-public-failure', 'fx-crimson-feast']);

function HeroWall({ kind }: { kind: Kind }) {
  const reduce = useReducedMotion();
  const cols = kind === 'website' ? WEB_COLS : MOTION_COLS;
  return (
    <div className={`stl-wall is-${kind}${reduce ? ' is-still' : ''}`} aria-hidden>
      <div className="stl-wall-tilt">
        {cols.map((col, c) => (
          <div key={c} className="stl-col" style={{ '--d': `${[46, 58, 40][c]}s`, '--o': `${c * -9}%` } as CSSProperties}>
            <div className={`stl-col-track${c === 1 ? ' is-rev' : ''}`}>
              {[...col, ...col].map((m, n) => kind === 'website'
                ? <div key={n} className="stl-tile"><img src={`${A}/looks/${m}.webp`} alt="" decoding="async" fetchPriority={n < 2 ? 'high' : 'low'} /></div>
                : <div key={n} className="stl-tile is-reel">
                    {LIVE.has(m) && n < col.length && !reduce
                      ? <video src={`${A}/motion/${m}.mp4`} poster={`${A}/motion/${m}.webp`} muted loop playsInline autoPlay preload="metadata" />
                      : <img src={`${A}/motion/${m}.webp`} alt="" decoding="async" fetchPriority={n < 2 ? 'high' : 'low'} />}
                  </div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ kind }: { kind: Kind }) {
  const c = COPY[kind];
  return (
    <section className={`stl-hero is-${kind}`}>
      <HeroWall kind={kind} />
      <div className="stl-hero-fade" aria-hidden />
      <div className="container stl-hero-copy">
        <motion.p className="sa-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: EASE }}>
          <span className="sa-dot" /> {c.kicker}
        </motion.p>
        <h1>
          {c.lines.map((l, i) => (
            <span key={l} className="stl-line"><motion.span className={i ? 'is-em' : ''} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, ease: EASE, delay: .1 + i * .12 }}>{l}</motion.span></span>
          ))}
        </h1>
        <motion.p className="stl-lede" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: EASE, delay: .45 }}>{c.lede}</motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: EASE, delay: .6 }}>
          <AuthButtons kind={kind} />
        </motion.div>
      </div>
      <a className="stl-scroll" href="#studio" aria-label="See inside the studio"><span /></a>
    </section>
  );
}

function Close({ kind }: { kind: Kind }) {
  const c = COPY[kind];
  return (
    <section className="stl-close">
      <div className="stl-close-glow" aria-hidden />
      <div className="container"><div className="stl-close-in">
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1, ease: EASE }}>
          {c.close[0]} <em>{c.close[1]}</em>
        </motion.h2>
        <AuthButtons kind={kind} className="stl-close-auth" />
        <p className="stl-close-note">Already registered? <a href={LOGIN}>Log in to {kind === 'website' ? 'Website' : 'Motion'} Studio</a></p>
      </div></div>
    </section>
  );
}

export function StudioLanding({ kind }: { kind: Kind }) {
  return (
    <div className="stl">
      <Hero kind={kind} />
      <StudioApp kind={kind} />
      <Close kind={kind} />
      <AuthBar kind={kind} />
    </div>
  );
}
