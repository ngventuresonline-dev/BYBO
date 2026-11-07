'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, LogIn, MessageSquareText, Inbox, Rocket, Globe, Palette, CalendarDays, Clapperboard, Mic, Share2, Wand2, LayoutTemplate } from 'lucide-react';
import './studio-app.css';

/**
 * "Inside the studio": what the self-serve BYBO Studio app really looks like,
 * shown on the Website Studio and Motion Studio landings. Every screen and
 * reel here is captured from the studio itself, with made-up sample businesses.
 */

export const STUDIO_URL = 'https://bybo-studio.vercel.app';
export const SIGNUP = `${STUDIO_URL}/signup`;
export const LOGIN = `${STUDIO_URL}/login`;

type Kind = 'website' | 'motion';
const A = '/studio-app';

/** Register and Log in, side by side. */
export function AuthButtons({ kind, className = '' }: { kind: Kind; className?: string }) {
  return (
    <div className={`sa-auth ${className}`}>
      <a className="sa-btn" href={SIGNUP}>{kind === 'website' ? 'Register and build' : 'Register and make reels'} <ArrowRight size={18} /></a>
      <a className="sa-btn sa-ghost" href={LOGIN}><LogIn size={17} /> Log in</a>
    </div>
  );
}

/* ---------------- the 3D stage: the app tilts flat as you scroll, then walks through its screens ---------------- */

type Step = { img: string; label: string; title: string; body: string };

const WEB_STEPS: Step[] = [
  { img: 'home', label: '01 · Describe', title: 'A sentence, a link or an idea.', body: 'Type what the business does, or paste its current website. The studio picks the right blueprint and builds every page.' },
  { img: 'editor', label: '02 · Edit by chatting', title: '“Add paneer tikka ₹320 to starters.”', body: 'Change anything by asking, or click and type on the page. Content, layers, design and launch settings sit beside the live preview.' },
  { img: 's-salon', label: '03 · Publish', title: 'Live, with its own address.', body: 'One click publishes the site. Every enquiry it brings lands in your leads inbox.' },
];
const MOTION_STEPS: Step[] = [
  { img: 'motion', label: '01 · Describe', title: 'Reels that stop the scroll.', body: 'Describe the reel, or paste your website. The studio writes, voices and animates it. Or start from an effect.' },
  { img: 'reels/interiors', label: '02 · In your look', title: 'Your colours, your logo, every time.', body: 'Save a brand kit once and every reel comes out in your look.' },
  { img: 'reels/cafe-drink', label: '03 · Share', title: 'Straight to WhatsApp and Instagram.', body: 'Plan a month of reels at once. Finished reels share as the file itself, cut for each app.' },
];

function Stage({ kind }: { kind: Kind }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const steps = kind === 'website' ? WEB_STEPS : MOTION_STEPS;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: .4 });
  const rotateX = useTransform(p, [0, .2], [26, 0]);
  const scale = useTransform(p, [0, .2], [.82, 1]);
  const glow = useTransform(p, [0, .2], [.2, 1]);
  const [i, setI] = useState(0);
  useEffect(() => scrollYProgress.on('change', v => setI(Math.min(steps.length - 1, Math.max(0, Math.floor((v - .12) / (.8 / steps.length)))))), [scrollYProgress, steps.length]);

  return (
    <section ref={ref} className="sa-stage" style={{ '--n': steps.length } as CSSProperties} aria-label="Inside the studio">
      <div className="sa-stage-sticky">
        <div className="sa-stage-head container">
          <p className="sa-kicker"><span className="sa-dot" /> Inside BYBO Studio</p>
          <h2>{kind === 'website' ? <>Or build it <em>yourself.</em></> : <>Or make reels <em>yourself.</em></>}</h2>
        </div>
        <div className="sa-stage-grid container">
          <ol className="sa-steps">
            {steps.map((s, n) => (
              <li key={s.label} className={n === i ? 'is-on' : ''}>
                <small>{s.label}</small><strong>{s.title}</strong><p>{s.body}</p>
              </li>
            ))}
          </ol>
          <motion.div className={`sa-device${kind === 'motion' && i > 0 ? ' is-reel' : ''}`} style={reduce ? undefined : { rotateX, scale }}>
            <motion.div className="sa-device-glow" style={reduce ? undefined : { opacity: glow }} aria-hidden />
            <div className="sa-device-bar" aria-hidden><i /><i /><i /><span>bybo-studio.vercel.app</span></div>
            <div className="sa-device-screen">
              {steps.map((s, n) => (
                <img key={s.img} src={`${A}/${s.img}.webp`} alt={n === i ? `BYBO Studio: ${s.title}` : ''} className={`${n === i ? 'is-on' : ''}${s.img.startsWith('reels/') ? ' is-reel' : ''}`} loading={n ? 'lazy' : 'eager'} decoding="async" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- website: the blueprints, as a drifting 3D ring of real sample sites ---------------- */

const SITES: [string, string, string][] = [
  ['s-clinic', 'Smile Studio', 'Clinic'],
  ['s-coaching', 'Pinnacle Academy', 'Coaching institute'],
  ['s-estate', 'Aaranya Estates', 'Real estate'],
  ['s-salon', 'Fade Factory', 'Salon & spa'],
  ['s-shop', 'Kora Handloom', 'Store'],
  ['s-wedding', 'Saat Phere Weddings', 'Weddings'],
];

function Ring() {
  const reduce = useReducedMotion();
  return (
    <section className="sa-ring-sec">
      <div className="container sa-head">
        <p className="sa-kicker">Blueprints, not templates</p>
        <h2>A site shaped for <em>your kind of business.</em></h2>
        <p className="sa-lede">Blueprints for interior design, real estate, commercial spaces, clinics, salons, coaching, restaurants and stores, plus one for everything else. Each plans the pages, sections and buttons that business needs.</p>
      </div>
      <div className={`sa-ring${reduce ? ' is-still' : ''}`}>
        <div className="sa-ring-track">
          {[...SITES, ...SITES].map(([img, name, kind], n) => (
            <figure key={n} className="sa-ring-card" aria-hidden={n >= SITES.length}>
              <div className="sa-ring-frame"><img src={`${A}/${img}.webp`} alt={n < SITES.length ? `${name}, a sample ${kind.toLowerCase()} site built in BYBO Studio` : ''} loading="lazy" decoding="async" /></div>
              <figcaption><b>{name}</b><span>{kind}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="container sa-phones">
        <div className="sa-phone" style={{ '--t': '-7deg' } as CSSProperties}><img src={`${A}/m-salon.webp`} alt="Fade Factory, a sample salon site, on a phone" loading="lazy" decoding="async" /></div>
        <div className="sa-phone" style={{ '--t': '7deg' } as CSSProperties}><img src={`${A}/m-restaurant.webp`} alt="Chai & Charcoal, a sample restaurant site, on a phone" loading="lazy" decoding="async" /></div>
        <p className="sa-phones-note"><b>Phone first.</b> Every site gets a thumb-reach bar with call, WhatsApp and its main booking button.</p>
      </div>
    </section>
  );
}

/* ---------------- motion: a tilted wall of real sample reels; at most two play at once ---------------- */

const REELS = ['interiors', 'cafe-drink', 'talking-head', 'before-after', 'pov', 'bedroom-story', 'property-tour', 'to-camera', 'offer-drop', 'aira', 'venue-launch', 'property', 'leadmachine'];
const GROUPS = ['Creators', 'Apps & SaaS', 'Shops & D2C', 'Food & cafés', 'Local services', 'Brand & news', 'Stories'];

function ReelWall() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const root = wrap.current; if (!root || reduce) return;
    const vids = [...root.querySelectorAll('video')];
    const seen = new Map<HTMLVideoElement, number>();
    const pick = () => {
      const mid = window.innerWidth / 2;
      const centre = (v: HTMLVideoElement) => { const b = v.getBoundingClientRect(); return Math.abs(b.left + b.width / 2 - mid); };
      const play = new Set([...seen.entries()].filter(([, r]) => r > .55).map(([v]) => v).sort((a, b) => centre(a) - centre(b)).slice(0, 2));
      vids.forEach(v => {
        if (play.has(v)) { if (!v.src) v.src = v.dataset.src!; v.play().catch(() => {}); }
        else if (!v.paused) v.pause();
      });
    };
    const io = new IntersectionObserver(es => { es.forEach(e => seen.set(e.target as HTMLVideoElement, e.intersectionRatio)); pick(); }, { threshold: [0, .55, 1] });
    vids.forEach(v => io.observe(v));
    const t = window.setInterval(pick, 2200);
    return () => { io.disconnect(); window.clearInterval(t); };
  }, [reduce]);

  return (
    <section className="sa-wall-sec">
      <div className="container sa-head">
        <p className="sa-kicker">Made in the studio</p>
        <h2>Pick an effect. <em>Make it yours.</em></h2>
        <p className="sa-lede">Shorts cut from you talking to camera, Stories drawn in motion with no camera and no photos, and ready effects for every kind of business. Each reel here came out of the studio.</p>
        <ul className="sa-chips">{GROUPS.map(g => <li key={g}>{g}</li>)}</ul>
      </div>
      <div className="sa-wall" ref={wrap}>
        <div className={`sa-wall-track${reduce ? ' is-still' : ''}`}>
          {[...REELS, ...REELS].map((r, n) => (
            <div key={n} className="sa-reel" style={{ '--r': `${(n % 3 - 1) * 4}deg`, '--y': `${(n % 2) * 40}px` } as CSSProperties} aria-hidden={n >= REELS.length}>
              <video muted loop playsInline preload="none" poster={`${A}/reels/${r}.webp`} data-src={`${A}/reels/${r}.mp4`} aria-label={n < REELS.length ? 'A sample reel made in BYBO Studio' : undefined} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- what is inside ---------------- */

type Feat = { icon: ReactNode; title: string; body: string; wide?: boolean };

const WEB_FEATS: Feat[] = [
  { icon: <MessageSquareText />, title: 'Edit by chatting', body: 'Ask for a change in plain words, see it on the page, undo it in one tap. Or click any text and type.', wide: true },
  { icon: <LayoutTemplate />, title: 'Looks to pick from', body: 'Browse looks by business and style, then build your site in the one you like.' },
  { icon: <Inbox />, title: 'Every enquiry, one inbox', body: 'Forms, bookings and callbacks from all your sites land in Leads. Reply, move them along, export to Excel.' },
  { icon: <Rocket />, title: 'Launch on your own accounts', body: 'Connect your own email, WhatsApp, Razorpay and socials, so customers deal with you directly.', wide: true },
  { icon: <Globe />, title: 'Your own domain', body: 'Publish in a click, then point your own web address at it.' },
  { icon: <Palette />, title: 'Brand kits', body: 'Colours, fonts and logo saved once and used everywhere.', wide: true },
];
const MOTION_FEATS: Feat[] = [
  { icon: <Wand2 />, title: 'Written, voiced, animated', body: 'Describe the reel and the studio writes the script, adds the voice and animates every scene.', wide: true },
  { icon: <Mic />, title: 'Shorts', body: 'Talk to camera on your phone. The studio cuts it with captions, graphics and music.' },
  { icon: <Clapperboard />, title: 'Stories', body: 'What-if tales, explainers and lists, drawn in motion. No camera, no photos.' },
  { icon: <CalendarDays />, title: 'Month plans', body: 'Plan a month of reels at once and see what goes out when.', wide: true },
  { icon: <Palette />, title: 'Brand kits', body: 'Your colours and logo on every reel.' },
  { icon: <Share2 />, title: 'Share the file itself', body: 'A WhatsApp cut for WhatsApp, the Instagram master for the rest.', wide: true },
];

function Tile({ f, n }: { f: Feat; n: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: RPointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const el = ref.current, b = el.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`);
    el.style.setProperty('--ry', `${(x - .5) * 10}deg`); el.style.setProperty('--rx', `${-(y - .5) * 10}deg`);
  };
  const leave = () => { ref.current?.style.setProperty('--rx', '0deg'); ref.current?.style.setProperty('--ry', '0deg'); };
  return (
    <motion.div ref={ref} className={`sa-tile${f.wide ? ' is-wide' : ''}`} onPointerMove={move} onPointerLeave={leave}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1], delay: (n % 3) * .08 }}>
      <span className="sa-tile-icon">{f.icon}</span>
      <h3>{f.title}</h3><p>{f.body}</p>
    </motion.div>
  );
}

function Features({ kind }: { kind: Kind }) {
  const feats = kind === 'website' ? WEB_FEATS : MOTION_FEATS;
  return (
    <section className="sa-feats-sec">
      <div className="container">
        <div className="sa-head">
          <p className="sa-kicker">What is inside</p>
          <h2>{kind === 'website' ? <>Everything a site needs, <em>after launch too.</em></> : <>One studio for <em>every post.</em></>}</h2>
        </div>
        <div className="sa-bento">{feats.map((f, n) => <Tile key={f.title} f={f} n={n} />)}</div>
        <div className="sa-feats-cta"><AuthButtons kind={kind} /></div>
      </div>
    </section>
  );
}

/** The Register / Log in bar on phones, once the hero has scrolled away. */
export function AuthBar({ kind }: { kind: Kind }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const check = () => setOn(window.scrollY > window.innerHeight * .8);
    check(); window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  return (
    <div className={`sa-bar${on ? ' is-on' : ''}`} aria-hidden={!on}>
      <span className="sa-bar-k">{kind === 'website' ? 'Website Studio' : 'Motion Studio'}</span>
      <a className="sa-btn sa-ghost" href={LOGIN} tabIndex={on ? 0 : -1}>Log in</a>
      <a className="sa-btn" href={SIGNUP} tabIndex={on ? 0 : -1}>Register <ArrowRight size={16} /></a>
    </div>
  );
}

export function StudioApp({ kind }: { kind: Kind }) {
  return (
    <div className="sa" id="studio">
      <Stage kind={kind} />
      {kind === 'website' ? <Ring /> : <ReelWall />}
      <Features kind={kind} />
    </div>
  );
}
