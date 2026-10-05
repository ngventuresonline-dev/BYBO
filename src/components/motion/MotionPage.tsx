'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Play, X, Check } from 'lucide-react';
import './motion.css';

type Work = {
  id: string;
  title: string;
  kind: string;
  note: string;
  /** Shown on the card so nothing reads as more than it is. */
  tag?: 'Spec' | 'AI-generated';
  /** Landscape (16:9) rather than vertical. */
  wide?: boolean;
};

/* The featured landscape film, then the vertical films in grid order. */
const WORK: Work[] = [
  { id: 'leadmachine', title: 'AI Lead Machine', kind: 'Brand film', note: 'Every business has only ever needed one thing. A story told from the forest to the feed.', wide: true },
  { id: 'campa', title: 'Campa', kind: 'Product ad', note: 'Heritage bottle to new range, in one continuous story.', tag: 'Spec' },
  { id: 'wowbus', title: 'WOWBUS', kind: 'Launch film', note: 'A mascot that stays the same character across every scene.' },
  { id: 'scan2kare', title: 'Scan2Kare', kind: 'Platform promo', note: 'An app, an ecosystem and a reason to care, in sixty-five seconds.' },
  { id: 'lokazen', title: 'Lokazen Connector', kind: 'App promo', note: 'The task, the check and the payout, shown on the phone it happens on.' },
  { id: 'parachute', title: 'Parachute', kind: 'Product to ad', note: 'A phone photo of the product becomes a finished campaign.', tag: 'Spec' },
  { id: 'proxe-health', title: 'PROXe for clinics', kind: 'UGC-style ad', note: 'A to-camera social ad for a healthcare product.', tag: 'AI-generated' },
];
const FEATURED = WORK.filter(w => w.wide);
const VERTICAL = WORK.filter(w => !w.wide);

/* The hero plays a later scene from each of these (the *-hero files), so it
   never repeats the work grid below it. */
const HERO = ['campa', 'wowbus', 'scan2kare'].map(id => WORK.find(w => w.id === id)!);

const FORMATS: [string, string, string][] = [
  ['Brand films', 'A story about why the business exists, told like cinema.', 'leadmachine'],
  ['Product ads', 'The product, the mood and the moment it belongs in.', 'campa'],
  ['Platform & SaaS promos', 'Show the interface, explain the system, land the feeling.', 'scan2kare'],
  ['Launch films', 'A launch that looks like a campaign, not a post.', 'wowbus'],
  ['Characters & mascots', 'One character, consistent from the first frame to the hundredth.', 'wowbus-2'],
  ['Social & UGC-style ads', 'Native to the feed, vertical first, made to be cut down.', 'proxe-health'],
];

const STEPS: [string, string][] = [
  ['Brief', 'What it must say, who it is for, where it will run.'],
  ['Style frames', 'The look, the characters and the key moments, as stills.'],
  ['Generate & cut', 'The system makes the shots. Editors shape the story.'],
  ['Review', 'You see the cut before anything is final.'],
  ['Deliver', 'Every ratio and length you need, ready to post.'],
];

/** A muted loop that only plays while it is on screen. */
function Loop({ id, className, variant = 'loop' }: { id: string; className?: string; variant?: 'loop' | 'hero' }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: .25 });
    io.observe(v); return () => io.disconnect();
  }, []);
  return <video ref={ref} className={className} src={`/motion/${id}-${variant}.mp4`} poster={`/motion/${id}${variant === 'hero' ? '-hero' : ''}.jpg`} muted loop playsInline preload="metadata" aria-hidden />;
}

export function MotionPage() {
  const [open, setOpen] = useState<Work | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current; if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <div className="mo-page">
      {/* ---------- hero ---------- */}
      <section className="mo-hero">
        <Loop id="campa" variant="hero" className="mo-hero-bg" />
        <div className="mo-hero-scrim" aria-hidden />
        <div className="container mo-hero-grid">
          <div className="mo-hero-copy">
            <p className="mo-over">BYBO / MOTION STUDIO</p>
            <h1>Ideas, on film. <em>Without the film crew.</em></h1>
            <p className="mo-lede">Brand films, product promos and launch reels, made by a production system and directed by people.</p>
            <div className="mo-actions">
              <a className="button" href="#work">Watch the work <ArrowDown size={18} /></a>
              <a className="mo-quiet" href="#start">Start a film <ArrowUpRight size={18} /></a>
            </div>
          </div>
          <div className="mo-phones" aria-hidden>
            {HERO.map((w, i) => (
              <div key={w.id} className={`mo-phone mo-phone-${i}`}><Loop id={w.id} variant="hero" /><span>{w.title}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- work ---------- */}
      <section className="mo-work" id="work" aria-labelledby="mo-work-title">
        <div className="container">
          <div className="mo-head">
            <p className="eyebrow">THE WORK</p>
            <h2 id="mo-work-title">Watch first. <em>Read later.</em></h2>
          </div>
          {FEATURED.map(w => (
            <button key={w.id} type="button" className="mo-feature" onClick={() => setOpen(w)} aria-label={`Play ${w.title}, ${w.kind}, with sound`}>
              <span className="mo-card-media mo-feature-media"><Loop id={w.id} /><span className="mo-play"><Play size={24} fill="currentColor" /></span></span>
              <span className="mo-feature-copy">
                <span className="mo-card-kind">{w.kind}</span>
                <strong>{w.title}</strong>
                <span className="mo-card-note">{w.note}</span>
                <span className="mo-feature-cta"><Play size={14} fill="currentColor" /> Watch with sound</span>
              </span>
            </button>
          ))}
          <div className="mo-grid">
            {VERTICAL.map(w => (
              <button key={w.id} type="button" className="mo-card" onClick={() => setOpen(w)} aria-label={`Play ${w.title}, ${w.kind}, with sound`}>
                <span className="mo-card-media"><Loop id={w.id} /><span className="mo-play"><Play size={20} fill="currentColor" /></span>{w.tag && <span className="mo-tag">{w.tag}</span>}</span>
                <span className="mo-card-kind">{w.kind}</span>
                <strong>{w.title}</strong>
                <span className="mo-card-note">{w.note}</span>
              </button>
            ))}
          </div>
          <p className="mo-fine">Spec work was made to show the system on real products and was not commissioned by the brand.</p>
        </div>
      </section>

      {/* ---------- photo to ad ---------- */}
      <section className="mo-proof" aria-labelledby="mo-proof-title">
        <div className="container">
          <div className="mo-head">
            <p className="eyebrow">THE SYSTEM, SHOWN</p>
            <h2 id="mo-proof-title">From a phone photo <em>to an ad.</em></h2>
          </div>
          <ol className="mo-steps3">
            {[['A product photo', 'Taken on a phone, in a garden. Nothing staged.'], ['A studio packshot', 'The same bottle, lit and staged like a studio shoot.'], ['A finished ad', 'The same product, in a campaign it could run.']].map(([t, d], i) => (
              <li key={t}>
                <figure><Image src={`/motion/${['proof-1', 'proof-packshot', 'proof-3'][i]}.jpg`} alt="" width={720} height={1280} sizes="(max-width: 760px) 92vw, 30vw" /></figure>
                <span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- formats ---------- */}
      <section className="mo-formats" aria-labelledby="mo-formats-title">
        <div className="container">
          <div className="mo-head">
            <p className="eyebrow">WHAT WE MAKE</p>
            <h2 id="mo-formats-title">Six kinds of film. <em>One way of making them.</em></h2>
          </div>
          <ul>
            {FORMATS.map(([t, d, poster], i) => (
              <li key={t}>
                <span className="mo-fnum">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3><p>{d}</p>
                <Image src={`/motion/${poster}.jpg`} alt="" width={720} height={1280} sizes="92px" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section className="mo-strip" aria-labelledby="mo-strip-title">
        <div className="container">
          <div className="mo-head mo-head-row">
            <p className="eyebrow">FROM BRIEF TO FEED</p>
            <h2 id="mo-strip-title">A system makes it. <em>People direct it.</em></h2>
          </div>
          <ol>
            {STEPS.map(([t, d], i) => (
              <li key={t} data-gate={i === 3 ? '' : undefined}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- honest part ---------- */}
      <section className="mo-honest" aria-labelledby="mo-honest-title">
        <div className="container">
          <div className="mo-head">
            <p className="eyebrow">THE HONEST PART</p>
            <h2 id="mo-honest-title">What it costs. <em>And what we will not do.</em></h2>
          </div>
          <div className="mo-honest-grid">
            <div>
              <h3>No price on this page</h3>
              <p>A fifteen-second reel and a sixty-second platform film are different jobs. We scope the film with you, then agree the deliverables, fee and schedule in writing before any paid work starts.</p>
            </div>
            <div>
              <h3>Lines we hold</h3>
              <ul>
                {['We say where AI is used. We will not pass generated people off as real ones.', 'We do not recreate a real person’s face or voice without their consent.', 'Brand marks and products are used only for the brand that owns them, or labelled as spec.'].map(t => <li key={t}><Check size={16} aria-hidden />{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- finale ---------- */}
      <section className="mo-finale" id="start">
        <Loop id="wowbus" variant="hero" className="mo-hero-bg" />
        <div className="mo-hero-scrim" aria-hidden />
        <div className="container">
          <p className="mo-over">YOUR NEXT FILM, BY BYBO.</p>
          <h2>Bring the idea. <em>We will bring it to life.</em></h2>
          <Link className="button" href={`/apply?system=motion-studio&message=${encodeURIComponent('I would like to talk about a film.\nWhat it is for: \nWhere it will run: ')}`}>Start a film <ArrowUpRight size={20} /></Link>
        </div>
      </section>

      {/* ---------- player ---------- */}
      <dialog ref={dialog} className={`mo-player${open?.wide ? ' mo-player-wide' : ''}`} onClose={() => setOpen(null)} onClick={e => { if (e.target === e.currentTarget) setOpen(null); }} aria-label={open ? `${open.title}, ${open.kind}` : 'Film player'}>
        {open && (
          <div className="mo-player-inner">
            <video key={open.id} src={`/motion/${open.id}.mp4`} poster={`/motion/${open.id}.jpg`} controls autoPlay playsInline />
            <div className="mo-player-meta"><span>{open.kind}{open.tag ? ` · ${open.tag}` : ''}</span><strong>{open.title}</strong></div>
            <button type="button" className="mo-player-close" onClick={() => setOpen(null)} aria-label="Close player"><X size={22} /></button>
          </div>
        )}
      </dialog>
    </div>
  );
}
