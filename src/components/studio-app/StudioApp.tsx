'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, LogIn, MessageSquareText, Inbox, Rocket, Globe, Palette, CalendarDays, Clapperboard, Mic, Share2, Wand2, LayoutTemplate } from 'lucide-react';
import './studio-app.css';

/**
 * "Inside the studio": what the self-serve BYBO Studio app really looks like,
 * the body of the Website Studio and Motion Studio landings. Every screen and
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
  { img: 'editor', label: '02 · Edit by chatting', title: '“A boutique hotel with 12 rooms in Udaipur.”', body: 'The site arrives with real pages and photos. Change anything by asking, or click and type on the page.' },
  { img: 'looks/darkluxe', label: '03 · Publish', title: 'Live, with its own address.', body: 'One click publishes the site. Every enquiry it brings lands in your leads inbox.' },
];
const MOTION_STEPS: Step[] = [
  { img: 'motion', label: '01 · Pick or describe', title: 'Reels that stop the scroll.', body: 'Describe the reel, paste your website, or pick from story ads and effects. The studio writes, voices and animates it.' },
  { img: 'motion/ad-bear-proof', label: '02 · Story ads', title: 'A story, a problem, your product.', body: 'Short films that sell, in micro drama, cartoon, claymation, crochet and more.' },
  { img: 'motion/fx-clay-letters', label: '03 · Share', title: 'Straight to WhatsApp and Instagram.', body: 'Plan a month of reels at once. Finished reels share as the file itself, cut for each app.' },
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
          <h2>{kind === 'website' ? <>Three steps to <em>a live site.</em></> : <>Three steps to <em>a posted reel.</em></>}</h2>
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
                <img key={s.img} src={`${A}/${s.img}.webp`} alt={n === i ? `BYBO Studio: ${s.title}` : ''} className={`${n === i ? 'is-on' : ''}${s.img.startsWith('motion/') ? ' is-reel' : ''}`} loading={n ? 'lazy' : 'eager'} decoding="async" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- website: looks, as two drifting rows of real sample sites ---------------- */

const LOOKS: [string, string, string][] = [
  ['darkluxe', 'Dark luxe', 'Boutique hotel'],
  ['cover-star', 'Cover star', 'Beauty creator'],
  ['roastery', 'Roastery', 'Coffee roaster'],
  ['wear-watch', 'Watch, turned', 'Watch store'],
  ['chef-pantry', 'Chef’s pantry', 'Home chef'],
  ['event-build', 'Venue build', 'Weddings'],
  ['gym-raw', 'Gym raw', 'Fitness coach'],
  ['saanjh-parfum', 'Scent, assembled', 'Perfume'],
  ['maker-craft', 'Maker craft', 'Potter'],
  ['cinema', 'Cinematic scroll', 'Travel'],
  ['wear-kicks', 'Sneaker turn', 'Footwear'],
  ['botanica', 'Botanica', 'Skincare'],
  ['y2k-drop', 'Y2K drop', 'Creator merch'],
  ['wear-gold', 'Gold, close up', 'Jewellery'],
  ['boutique', 'Boutique', 'Handloom'],
];
const PHONES = ['cover-star', 'gym-raw', 'darkluxe', 'y2k-drop', 'chef-pantry'];

function LookRow({ items, reverse, still }: { items: typeof LOOKS; reverse?: boolean; still: boolean }) {
  return (
    <div className={`sa-ring${still ? ' is-still' : ''}`}>
      <div className={`sa-ring-track${reverse ? ' is-rev' : ''}`}>
        {[...items, ...items].map(([img, name, kind], n) => (
          <figure key={n} className="sa-ring-card" aria-hidden={n >= items.length}>
            <div className="sa-ring-frame"><img src={`${A}/looks/${img}.webp`} alt={n < items.length ? `${kind} site in the ${name} look, built in BYBO Studio` : ''} decoding="async" fetchPriority="low" /></div>
            <figcaption><b>{name}</b><span>{kind}</span></figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Ring() {
  const reduce = !!useReducedMotion();
  return (
    <section className="sa-ring-sec">
      <div className="container sa-head">
        <p className="sa-kicker">Looks and blueprints</p>
        <h2>A site shaped for <em>your kind of business.</em></h2>
        <p className="sa-lede">Pick a look by business and style. Blueprints for hotels, cafés, clinics, salons, coaching, real estate, interiors and stores plan the pages, sections and buttons that business needs. Every site below was built in the studio.</p>
      </div>
      <LookRow items={LOOKS.slice(0, 8)} still={reduce} />
      <LookRow items={LOOKS.slice(8)} reverse still={reduce} />
      <div className="container sa-phones">
        <div className="sa-fan">
          {PHONES.map((m, n) => (
            <div key={m} className="sa-phone" style={{ '--i': n - 2 } as CSSProperties}><img src={`${A}/looks/phone-${m}.webp`} alt={`A sample ${LOOKS.find(l => l[0] === m)?.[2].toLowerCase()} site on a phone`} loading="lazy" decoding="async" /></div>
          ))}
        </div>
        <p className="sa-phones-note"><b>Phone first.</b> Every site gets a thumb-reach bar with call, WhatsApp and its main booking button.</p>
      </div>
    </section>
  );
}

/* ---------------- motion: a tilted wall of the studio's story ads and effects; at most two play at once ---------------- */

const REELS: [string, string, string][] = [
  ['ad-bear-proof', 'Bear proof', 'Story ad · Cartoon'],
  ['fx-clay-letters', 'Clay Letters', 'Effect · Mixed media'],
  ['ad-public-failure', 'Public failure', 'Story ad · Micro drama'],
  ['fx-crimson-feast', 'Crimson Feast', 'Effect · Hyper motion'],
  ['ad-hired-help', 'Hired help', 'Story ad · Claymation'],
  ['fx-comic-bottle-pop', 'Comic Bottle Pop', 'Effect · Mixed media'],
  ['ad-ice-paws', 'Ice paws', 'Story ad · Crochet'],
  ['fx-spice-burst', 'Spice Burst', 'Effect · Hyper motion'],
  ['ad-smile-june', 'Smile June', 'Story ad · Talking object'],
  ['fx-screen-print', 'Screen Print', 'Effect · Mixed media'],
  ['ad-lasagna-heist', 'Lasagna heist', 'Story ad · Doll world'],
  ['fx-rice-bag-still', 'Rice Bag Still', 'Effect · Hyper motion'],
  ['ad-monster-within', 'Monster within', 'Story ad · Inside the body'],
  ['fx-pump-cap-shine', 'Pump Cap Shine', 'Effect · Mixed media'],
  ['ad-last-goodbye', 'Last goodbye', 'Story ad · Cinematic'],
  ['fx-droplet-lens', 'Droplet Lens', 'Effect · Hyper motion'],
  ['fx-halftone-zine', 'Halftone Zine', 'Effect · Mixed media'],
  ['fx-cartoon-crunch', 'Cartoon Crunch', 'Effect · 2D motion'],
];
const GROUPS = ['Shorts', 'Stories', 'Micro drama', 'Cartoon', 'Claymation', 'Crochet', 'Doll world', 'Talking object', 'Mixed media', 'Hyper motion', 'Product shot', 'Poster', '2D motion', 'Apps & SaaS motion'];

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
        <p className="sa-kicker">Inside Explore</p>
        <h2>Pick a style. <em>Make it yours.</em></h2>
        <p className="sa-lede">Story ads that sell in a short film, effects that put your product in motion, Shorts cut from you talking to camera and Stories with no camera at all. These are previews from the studio’s own Explore page.</p>
        <ul className="sa-chips">{GROUPS.map(g => <li key={g}>{g}</li>)}</ul>
      </div>
      <div className="sa-wall" ref={wrap}>
        <div className={`sa-wall-track${reduce ? ' is-still' : ''}`}>
          {[...REELS, ...REELS].map(([r, name, kind], n) => (
            <figure key={n} className="sa-reel" style={{ '--r': `${(n % 3 - 1) * 4}deg`, '--y': `${(n % 2) * 40}px` } as CSSProperties} aria-hidden={n >= REELS.length}>
              <video muted loop playsInline preload="none" poster={`${A}/motion/${r}.webp`} data-src={`${A}/motion/${r}.mp4`} aria-label={n < REELS.length ? `${name}, ${kind}` : undefined} />
              <figcaption><b>{name}</b><span>{kind}</span></figcaption>
            </figure>
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
  { icon: <Clapperboard />, title: 'Story ads', body: 'Short films that sell: a story, a problem, and your product saving the day. Pick a style and add your product.', wide: true },
  { icon: <Wand2 />, title: 'Effects for your product', body: 'Your product photo in a moving poster, a product shot or a hyper-motion burst.' },
  { icon: <Mic />, title: 'Shorts and Stories', body: 'Talk to camera and the studio cuts it with captions and music, or tell a story with no camera at all.' },
  { icon: <MessageSquareText />, title: 'Written, voiced, animated', body: 'Describe the reel and the studio writes the script, adds the voice and animates every scene.', wide: true },
  { icon: <CalendarDays />, title: 'Brand kits and month plans', body: 'Your colours and logo on every reel, and a month of posts planned at once.' },
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
