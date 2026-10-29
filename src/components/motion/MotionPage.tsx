'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, Play, X, Check, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import './motion.css';

type Kind = 'Brand films' | 'Product ads' | 'Social series' | 'Explainers & 3D' | 'Launch & promos';
type Work = {
  id: string;
  title: string;
  kind: string;
  group: Kind;
  note: string;
  /** Shown on the card so nothing reads as more than it is. */
  tag?: 'Spec' | 'AI-generated';
  /** Landscape (16:9) rather than vertical. */
  wide?: boolean;
};

const WORK: Work[] = [
  { id: 'noor', title: 'NOOR', kind: 'Brand film', group: 'Brand films', note: 'A saree shop that never closes. The launch film for BYBO’s website studio.', wide: true },
  { id: 'leadmachine', title: 'AI Lead Machine', kind: 'Brand film', group: 'Brand films', note: 'Every business has only ever needed one thing. A story told from the forest to the feed.', wide: true },
  { id: 'proxe-launch', title: 'PROXe', kind: 'Launch film', group: 'Launch & promos', note: 'A product launch told through the product: calls, chats, bookings and the numbers behind them.' },
  { id: 'mirchi', title: 'Keep your Friday', kind: '3D character film', group: 'Explainers & 3D', note: 'A Friday rush at Mirchi Moon, told with toy-like 3D characters, for an assistant that answers every call.' },
  { id: 'leads', title: 'Nobody replies till morning', kind: 'Illustrated explainer', group: 'Explainers & 3D', note: 'The enquiry that arrives at 11 pm, and what happens when something answers it.' },
  { id: 'lokazen-localities', title: 'Where brands are landing', kind: 'Social series · Lokazen', group: 'Social series', note: 'Bengaluru’s top five localities for brand outlets, counted and mapped.' },
  { id: 'lokazen-quiz', title: 'Street quiz', kind: 'Social series · Lokazen', group: 'Social series', note: 'Guess first. Brands that started online, and where they opened next.' },
  { id: 'lokazen-padel', title: 'Padel is exploding', kind: 'Social series · Lokazen', group: 'Social series', note: 'A sport, a city and the courts behind it, in thirty seconds.' },
  { id: 'lokazen-matcha', title: 'Matcha rush', kind: 'Social series · Lokazen', group: 'Social series', note: 'Searches up, cafés counted, and a question for the comments.' },
  { id: 'campa', title: 'Campa', kind: 'Product ad', group: 'Product ads', note: 'Heritage bottle to new range, in one continuous story.', tag: 'Spec' },
  { id: 'parachute', title: 'Parachute', kind: 'Product to ad', group: 'Product ads', note: 'A phone photo of the product becomes a finished campaign.', tag: 'Spec' },
  { id: 'wowbus', title: 'WOWBUS', kind: 'Launch film', group: 'Launch & promos', note: 'A mascot that stays the same character across every scene.' },
  { id: 'scan2kare', title: 'Scan2Kare', kind: 'Platform promo', group: 'Launch & promos', note: 'An app, an ecosystem and a reason to care, in sixty-five seconds.' },
  { id: 'lokazen', title: 'Lokazen Connector', kind: 'App promo', group: 'Launch & promos', note: 'The task, the check and the payout, shown on the phone it happens on.' },
  { id: 'proxe-health', title: 'PROXe for clinics', kind: 'UGC-style ad', group: 'Product ads', note: 'A to-camera social ad for a healthcare product.', tag: 'AI-generated' },
];
const byId = (id: string) => WORK.find(w => w.id === id)!;
const GROUPS: ('All' | Kind)[] = ['All', 'Brand films', 'Social series', 'Explainers & 3D', 'Launch & promos', 'Product ads'];
const SERIES = WORK.filter(w => w.group === 'Social series');

// three columns of posters for the hero wall, each a different mix and speed
const WALL = [
  ['lokazen-padel', 'mirchi', 'campa', 'leads', 'lokazen-quiz'],
  ['proxe-launch', 'lokazen-matcha', 'wowbus', 'scan2kare', 'parachute'],
  ['leads', 'lokazen-localities', 'proxe-health', 'mirchi', 'lokazen'],
];

const STYLES: { t: string; d: string; id: string }[] = [
  { t: 'Cinematic', d: 'Light, lenses and a story, without a shoot.', id: 'noor' },
  { t: '3D characters', d: 'A cast that stays the same in every scene.', id: 'mirchi' },
  { t: 'Illustrated', d: 'Explainers drawn to make one idea land.', id: 'leads' },
  { t: 'Product & interface', d: 'The screen, the system and the feeling.', id: 'proxe-launch' },
  { t: 'Street & social', d: 'Native to the feed, built from real data.', id: 'lokazen-quiz' },
];

const STEPS: [string, string][] = [
  ['Brief', 'What it must say, who it is for, where it will run.'],
  ['Style frames', 'The look, the characters and the key moments, as stills.'],
  ['Generate & cut', 'The system makes the shots. Editors shape the story.'],
  ['Review', 'You see the cut before anything is final.'],
  ['Deliver', 'Every ratio and length you need, ready to post.'],
];

/** A muted loop that loads only when it nears the screen and plays only while on it. */
function Loop({ id, className, eager = false }: { id: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting && !v.src) { v.src = `/motion/${id}-loop.mp4`; near.disconnect(); } }, { rootMargin: '400px 0px' });
    const seen = new IntersectionObserver(([e]) => { if (still) return; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: .2 });
    near.observe(v); seen.observe(v);
    return () => { near.disconnect(); seen.disconnect(); };
  }, [id]);
  return <video ref={ref} className={className} poster={`/motion/${id}.jpg`} muted loop playsInline preload={eager ? 'auto' : 'none'} aria-hidden />;
}

function Card({ w, onOpen, i }: { w: Work; onOpen: (w: Work) => void; i: number }) {
  return (
    <motion.button layout type="button" className={`mo-card${w.wide ? ' is-wide' : ''}`} onClick={() => onOpen(w)} aria-label={`Play ${w.title}, ${w.kind}, with sound`}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .5, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 6) * .04 }}>
      <span className="mo-card-media">
        <Loop id={w.id} />
        <span className="mo-card-shade" />
        <span className="mo-play"><Play size={20} fill="currentColor" /></span>
        {w.tag && <span className="mo-tag">{w.tag}</span>}
        <span className="mo-card-over"><small>{w.kind}</small><strong>{w.title}</strong></span>
      </span>
      <span className="mo-card-note">{w.note}</span>
    </motion.button>
  );
}

export function MotionPage() {
  const [filter, setFilter] = useState<'All' | Kind>('All');
  const [open, setOpen] = useState<Work | null>(null);
  const [style, setStyle] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  // NOOR plays as the featured film above, so the grid starts with the rest
  const shown = useMemo(() => WORK.filter(w => w.id !== 'noor' && (filter === 'All' || w.group === filter)), [filter]);
  const reel = open && shown.includes(open) ? shown : WORK; // next and previous follow what is on screen
  const step = (d: number) => { if (!open) return; const i = reel.indexOf(open); setOpen(reel[(i + d + reel.length) % reel.length]); };

  useEffect(() => {
    const d = dialog.current; if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  });

  return (
    <div className="mo-page">
      {/* ---------- hero: a wall of films ---------- */}
      <section className="mo-hero">
        <div className="mo-wall" aria-hidden>
          {WALL.map((col, c) => (
            <div key={c} className="mo-wall-col" style={{ '--d': `${46 + c * 9}s`, '--dir': c === 1 ? 'reverse' : 'normal' } as CSSProperties}>
              {[...col, ...col].map((id, i) => <img key={i} src={`/motion/${id}-w.jpg`} alt="" width={240} height={427} decoding="async" fetchPriority={i < 2 ? 'high' : 'low'} />)}
            </div>
          ))}
        </div>
        <div className="mo-hero-scrim" aria-hidden />
        <div className="container mo-hero-copy">
          <p className="mo-over"><span className="mo-rec" /> BYBO MOTION STUDIO · BENGALURU</p>
          <h1><span className="mo-rise">Ideas,</span> <span className="mo-rise" style={{ animationDelay: '.08s' }}>on film.</span><em className="mo-rise" style={{ animationDelay: '.18s' }}>Without the film crew.</em></h1>
          <p className="mo-lede mo-rise" style={{ animationDelay: '.3s' }}>Brand films, product ads, social series and launch reels, made by a production system and directed by people.</p>
          <div className="mo-actions mo-rise" style={{ animationDelay: '.4s' }}>
            <button type="button" className="mo-btn" onClick={() => setOpen(byId('noor'))}><Play size={18} fill="currentColor" /> Play the latest film</button>
            <a className="mo-quiet" href="#work">See all {WORK.length} films</a>
          </div>
          <ul className="mo-genres mo-rise" style={{ animationDelay: '.5s' }}>{GROUPS.slice(1).map(g => <li key={g}>{g}</li>)}</ul>
        </div>
      </section>

      {/* ---------- featured film ---------- */}
      <section className="mo-feature-sec" aria-labelledby="mo-feature-title">
        <div className="container">
          <button type="button" className="mo-feature" onClick={() => setOpen(byId('noor'))} aria-label="Play NOOR, brand film, with sound">
            <span className="mo-feature-media">
              <Loop id="noor" />
              <span className="mo-feature-shade" />
              <span className="mo-feature-copy">
                <small>Latest · Brand film</small>
                <strong id="mo-feature-title">NOOR. <em>Your shop never closes.</em></strong>
                <span className="mo-feature-cta"><span className="mo-play lg"><Play size={22} fill="currentColor" /></span> Watch with sound <Volume2 size={16} /></span>
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* ---------- the work ---------- */}
      <section className="mo-work" id="work" aria-labelledby="mo-work-title">
        <div className="container">
          <div className="mo-head mo-head-row">
            <div><p className="mo-eyebrow">The work</p><h2 id="mo-work-title">Watch first. <em>Read later.</em></h2></div>
            <div className="mo-filters" role="tablist" aria-label="Filter films">
              {GROUPS.map(g => (
                <button key={g} role="tab" aria-selected={filter === g} data-on={filter === g ? '' : undefined} onClick={() => setFilter(g)}>
                  {filter === g && <motion.span layoutId="mo-filter-pill" className="mo-filter-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  {g}
                </button>
              ))}
            </div>
          </div>
          <LayoutGroup>
            <motion.div layout className="mo-grid">
              <AnimatePresence mode="popLayout">
                {shown.map((w, i) => <Card key={w.id} w={w} i={i} onOpen={setOpen} />)}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
          <p className="mo-fine">Spec work was made to show the system on real products and was not commissioned by the brand.</p>
        </div>
      </section>

      {/* ---------- a series ---------- */}
      <section className="mo-series" aria-labelledby="mo-series-title">
        <div className="container">
          <div className="mo-head">
            <p className="mo-eyebrow">A series, not a one-off</p>
            <h2 id="mo-series-title">One look. <em>A new story every time.</em></h2>
            <p className="mo-sub">Four reels for Lokazen. Fresh numbers, a real city and a question at the end, in the same voice, type and pacing every time, so the feed recognises the brand before the logo appears.</p>
          </div>
          <div className="mo-series-row">
            {SERIES.map((w, i) => (
              <button key={w.id} type="button" className="mo-series-item" style={{ '--i': i } as CSSProperties} onClick={() => setOpen(w)} aria-label={`Play ${w.title} with sound`}>
                <span className="mo-series-media"><Loop id={w.id} /><span className="mo-play"><Play size={18} fill="currentColor" /></span></span>
                <span className="mo-series-n">{String(i + 1).padStart(2, '0')}</span>
                <strong>{w.title}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- styles ---------- */}
      <section className="mo-styles" aria-labelledby="mo-styles-title">
        <div className="container">
          <div className="mo-head">
            <p className="mo-eyebrow">Range</p>
            <h2 id="mo-styles-title">Any look. <em>The same system.</em></h2>
          </div>
          <div className="mo-styles-row">
            {STYLES.map((s, i) => (
              <button key={s.t} type="button" className="mo-style" data-on={i === style ? '' : undefined}
                onMouseEnter={() => setStyle(i)} onFocus={() => setStyle(i)} onClick={() => { if (i === style) setOpen(byId(s.id)); else setStyle(i); }}
                aria-label={`${s.t}: ${s.d}`}>
                <Loop id={s.id} />
                <span className="mo-style-shade" />
                <span className="mo-style-copy"><span className="mo-style-n">{String(i + 1).padStart(2, '0')}</span><strong>{s.t}</strong><small>{s.d}</small></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- photo to ad ---------- */}
      <section className="mo-proof" aria-labelledby="mo-proof-title">
        <div className="container">
          <div className="mo-head">
            <p className="mo-eyebrow">The system, shown</p>
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

      {/* ---------- process ---------- */}
      <section className="mo-strip" aria-labelledby="mo-strip-title">
        <div className="container">
          <div className="mo-head">
            <p className="mo-eyebrow">From brief to feed</p>
            <h2 id="mo-strip-title">A system makes it. <em>People direct it.</em></h2>
          </div>
          <ol>
            {STEPS.map(([t, d], i) => (
              <li key={t} data-gate={i === 3 ? '' : undefined}><span>{String(i + 1).padStart(2, '0')}</span><h3>{t}{i === 3 && <small>Your sign-off</small>}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- honest part ---------- */}
      <section className="mo-honest" aria-labelledby="mo-honest-title">
        <div className="container mo-honest-grid">
          <div>
            <p className="mo-eyebrow">The honest part</p>
            <h2 id="mo-honest-title">What it costs. <em>And what we will not do.</em></h2>
          </div>
          <div className="mo-honest-cards">
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
        <Loop id="noor" className="mo-finale-bg" />
        <div className="mo-finale-scrim" aria-hidden />
        <div className="container">
          <p className="mo-over">YOUR NEXT FILM, BY BYBO</p>
          <h2>Bring the idea. <em>We will bring it to life.</em></h2>
          <Link className="mo-btn" href={`/apply?system=motion-studio&message=${encodeURIComponent('I would like to talk about a film.\nWhat it is for: \nWhere it will run: ')}`}>Start a film <ArrowUpRight size={20} /></Link>
        </div>
      </section>

      {/* ---------- player ---------- */}
      <dialog ref={dialog} className={`mo-player${open?.wide ? ' mo-player-wide' : ''}`} onClose={() => setOpen(null)} onClick={e => { if (e.target === e.currentTarget) setOpen(null); }} aria-label={open ? `${open.title}, ${open.kind}` : 'Film player'}>
        {open && (
          <div className="mo-player-inner">
            <video key={open.id} src={`/motion/${open.id}.mp4`} poster={`/motion/${open.id}.jpg`} controls autoPlay playsInline onEnded={() => step(1)} />
            <div className="mo-player-meta">
              <span>{open.kind}{open.tag ? ` · ${open.tag}` : ''}</span><strong>{open.title}</strong>
              <em>{reel.indexOf(open) + 1} / {reel.length}</em>
            </div>
            <button type="button" className="mo-player-nav prev" onClick={() => step(-1)} aria-label="Previous film"><ChevronLeft size={24} /></button>
            <button type="button" className="mo-player-nav next" onClick={() => step(1)} aria-label="Next film"><ChevronRight size={24} /></button>
            <button type="button" className="mo-player-close" onClick={() => setOpen(null)} aria-label="Close player"><X size={22} /></button>
          </div>
        )}
      </dialog>
    </div>
  );
}
