'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { ArrowRight, LogIn, MessageSquareText, FileText, Plus, Layers, Palette, Rocket, Clapperboard, Store, Inbox, Globe, Play } from 'lucide-react';
import './studio-landing.css';

/**
 * The Website Studio and Motion Studio landings: only the self-serve BYBO Studio
 * app. Every image and reel is captured from the studio, with made-up businesses.
 *
 * Built to scroll smoothly: no scroll-linked animation, no sticky scroll scenes.
 * Reveals are one IntersectionObserver plus CSS transitions, offscreen loops pause,
 * and at most one clip plays per section, only while it is on screen.
 */

type Kind = 'website' | 'motion';
const A = '/studio-app';
export const STUDIO_URL = 'https://bybo-studio.vercel.app';
export const SIGNUP = `${STUDIO_URL}/signup`;
export const LOGIN = `${STUDIO_URL}/login`;
/** Motion sign-ups land in Motion Studio, and the studio's emails name the right one. */
const signupFor = (kind: Kind) => (kind === 'motion' ? `${SIGNUP}?next=%2Fmotion` : SIGNUP);

/* ---------------- shared bits ---------------- */

function AuthButtons({ kind, className = '' }: { kind: Kind; className?: string }) {
  return (
    <div className={`stl-auth ${className}`}>
      <a className="stl-btn" href={signupFor(kind)}>{kind === 'website' ? 'Register and build' : 'Register and make reels'} <ArrowRight size={18} /></a>
      <a className="stl-btn is-ghost" href={LOGIN}><LogIn size={17} /> Log in</a>
    </div>
  );
}

/** Adds .is-in once the element is on screen; CSS does the rest. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  return ref;
}

/** True while the element is (nearly) on screen; used to pause loops and timers offscreen. */
function useOnScreen<T extends HTMLElement>(margin = '120px') {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(el); return () => io.disconnect();
  }, [margin]);
  return [ref, on] as const;
}

function Section({ kicker, title, lede, children, className = '' }: { kicker: string; title: ReactNode; lede?: string; children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className={`stl-sec ${className}`}>
      <div className="container stl-sec-in">
        <header className="stl-head">
          <p className="stl-kicker">{kicker}</p>
          <h2>{title}</h2>
          {lede && <p className="stl-lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

/** A reel that only plays while `play` is true; otherwise its poster shows. */
function Clip({ id, play, label }: { id: string; play: boolean; label?: string }) {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = v.current; if (!el) return;
    if (play) { if (!el.getAttribute('src')) el.src = `${A}/motion/${id}.mp4`; el.play().catch(() => {}); }
    else if (!el.paused) el.pause();
  }, [play, id]);
  return <video ref={v} className="stl-clip" muted loop playsInline preload="none" poster={`${A}/motion/${id}.webp`} aria-label={label} />;
}

/** Types the given lines one after another while on screen. */
function useTyper(lines: string[], on: boolean) {
  const [state, set] = useState({ i: 0, n: 0 });
  useEffect(() => {
    if (!on) return;
    const line = lines[state.i];
    const t = window.setTimeout(() => set(s => s.n < line.length ? { ...s, n: s.n + 1 } : { i: (s.i + 1) % lines.length, n: 0 }), state.n < line.length ? 38 : 2800);
    return () => window.clearTimeout(t);
  }, [on, state, lines]);
  return { i: state.i, text: lines[state.i].slice(0, state.n), done: state.n >= lines[state.i].length };
}

/* ---------------- hero ---------------- */

const HERO = {
  website: {
    kicker: 'BYBO Website Studio',
    lines: ['Describe the business.', 'Get the website.'],
    lede: 'Type a sentence or paste a link. The studio builds every page with real sections and photos. Edit it by chatting, publish it in one click, and every enquiry lands in your inbox.',
    cols: [['darkluxe', 'roastery', 'gym-raw', 'botanica'], ['cover-star', 'event-build', 'cinema', 'y2k-drop'], ['wear-watch', 'chef-pantry', 'saanjh-parfum', 'maker-craft']],
  },
  motion: {
    kicker: 'BYBO Motion Studio',
    lines: ['Describe the reel.', 'Post it today.'],
    lede: 'Pick a story ad or an effect, or describe the reel in a line. The studio writes it, voices it and animates every scene, then cuts it for WhatsApp and Instagram.',
    cols: [['ad-fluff-lift', 'fx-watch-spotlight', 'ad-lost-and-found', 'fx-y2k-flash'], ['fx-liquid-gold', 'ad-frizzilla', 'fx-japanese-poster', 'ad-inside-confession'], ['ad-last-laugh', 'fx-glossy-poster', 'ad-stakeout-romance', 'ad-failed-remedies']],
  },
};

function Hero({ kind, heroRef }: { kind: Kind; heroRef: RefObject<HTMLElement | null> }) {
  const h = HERO[kind];
  const [wall, on] = useOnScreen<HTMLDivElement>('0px');
  const web = kind === 'website';
  return (
    <section ref={heroRef} className={`stl-hero is-${kind}`}>
      <div ref={wall} className={`stl-wall${on ? '' : ' is-paused'}`} aria-hidden>
        {h.cols.map((col, c) => (
          <div key={c} className="stl-wall-col">
            <div className={`stl-wall-track${c === 1 ? ' is-rev' : ''}`} style={{ '--d': `${[52, 64, 46][c]}s` } as CSSProperties}>
              {[...col, ...col].map((m, n) => (
                <div key={n} className="stl-wall-tile">
                  <img src={web ? `${A}/looks/${m}.webp` : `${A}/motion/${m}.webp`} alt="" width={web ? 1200 : 360} height={web ? 750 : 640} decoding="async" loading={n < 2 ? 'eager' : 'lazy'} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="stl-hero-fade" aria-hidden />
      <div className="container stl-hero-copy">
        <p className="stl-kicker"><span className="stl-dot" /> {h.kicker}</p>
        <h1>{h.lines.map((l, i) => <span key={l} className="stl-line"><span style={{ animationDelay: `${.1 + i * .12}s` }} className={i ? 'is-em' : ''}>{l}</span></span>)}</h1>
        <p className="stl-hero-lede">{h.lede}</p>
        <AuthButtons kind={kind} className="stl-hero-auth" />
      </div>
    </section>
  );
}

/* ================= WEBSITE ================= */

const BRIEFS: [string, string, string][] = [
  ['A specialty coffee roaster in Indiranagar', 'roastery', 'kaapi.bybo.in'],
  ['A strength coach in Pune with online plans', 'gym-raw', 'arjunlifts.bybo.in'],
  ['A beauty creator selling her own tints', 'cover-star', 'taratint.bybo.in'],
  ['A home chef taking weekend orders', 'chef-pantry', 'rheaskitchen.bybo.in'],
  ['A watch store with one hero product', 'wear-watch', 'kaalwatch.bybo.in'],
];

function WebPrompt() {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const { i, text, done } = useTyper(BRIEFS.map(b => b[0]), on);
  return (
    <Section kicker="Start with one line" title={<>Say what you do. <em>Watch it appear.</em></>} lede="The studio opens on a single box. Describe the business or paste its current website, and the studio picks the right blueprint for that kind of business.">
      <div ref={ref} className="stl-prompt">
        <div className="stl-prompt-box">
          <span className="stl-prompt-q">What are we <em>building</em>?</span>
          <div className="stl-prompt-input"><span>{text}</span><i className={done ? 'is-blink' : ''} /></div>
        </div>
        <div className="stl-browser">
          <div className="stl-browser-bar"><b /><b /><b /><span>{BRIEFS[i][2]}</span></div>
          <div className="stl-browser-screen">
            {BRIEFS.map(([brief, img], n) => <img key={img} src={`${A}/looks/${img}.webp`} alt={n === i ? `A sample site the studio built for: ${brief}` : ''} width={1200} height={750} loading="lazy" decoding="async" className={n === i && done ? 'is-on' : ''} />)}
            <div className={`stl-building${done ? '' : ' is-on'}`}><span /><p>Building pages, copy and photos</p></div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const TOOLS = [
  { icon: <MessageSquareText />, name: 'Chat', body: 'Ask for anything in plain words: a darker hero, a rooms page, testimonials, new photos. The site changes in front of you.' },
  { icon: <FileText />, name: 'Content', body: 'Click any heading or paragraph on the page and type over it. Prices, timings and menus stay easy to keep current.' },
  { icon: <Plus />, name: 'Add', body: 'Drop in a new section: a gallery, a price list, questions, a booking strip, a map.' },
  { icon: <Layers />, name: 'Layers', body: 'Every section of every page in one list. Reorder, hide or duplicate them.' },
  { icon: <Palette />, name: 'Design', body: 'Colours, fonts and spacing for the whole site at once, or a brand kit you saved earlier.' },
  { icon: <Clapperboard />, name: 'Motion', body: 'Scroll effects and moving sections, picked from a menu instead of written by hand.' },
  { icon: <Store />, name: 'Business', body: 'Name, address, hours, phone and WhatsApp in one place, used everywhere on the site.' },
  { icon: <Inbox />, name: 'Leads', body: 'Every enquiry the site brings, with who sent it and what they asked.' },
  { icon: <Rocket />, name: 'Launch', body: 'Publish in one click, check it on desktop and phone, and connect your own domain.' },
];

// Where each tool sits on the editor screenshot's left rail, and the part of the screen it works on
// (percent of the image). The rail runs Chat, Content, Add, Layers, Design, Launch, Motion, Business, Leads.
const RAIL = ['Chat', 'Content', 'Add', 'Layers', 'Design', 'Launch', 'Motion', 'Business', 'Leads'];
const AREA: Record<string, [number, number, number, number]> = {
  panel: [4.3, 6.4, 29.6, 93.6], canvas: [35.3, 8.2, 63.6, 91.8], top: [68.5, .6, 30.8, 5.6],
};
const TARGET: Record<string, keyof typeof AREA> = { Chat: 'panel', Content: 'canvas', Add: 'panel', Layers: 'panel', Design: 'canvas', Motion: 'canvas', Business: 'panel', Leads: 'panel', Launch: 'top' };
const STEP_MS = 4500;

function WebEditor() {
  const [t, setT] = useState(0);
  const [held, setHeld] = useState(false);
  const [box, on] = useOnScreen<HTMLDivElement>('0px');
  const rail = useRef<HTMLDivElement>(null);
  const resume = useRef(0);
  // Steps through the tools while on screen, like a trainer; a tap or hover holds it on one for a while.
  useEffect(() => {
    if (!on || held || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setT(n => (n + 1) % TOOLS.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [t, on, held]);
  // On phones the chip row keeps the current tool in view (the row scrolls, never the page).
  useEffect(() => {
    const r = rail.current, b = r?.children[t] as HTMLElement | undefined;
    if (r && b && r.scrollWidth > r.clientWidth) r.scrollTo({ left: b.offsetLeft - 16, behavior: 'smooth' });
  }, [t]);
  const pick = (n: number) => { setT(n); setHeld(true); window.clearTimeout(resume.current); resume.current = window.setTimeout(() => setHeld(false), 12000); };
  const tool = TOOLS[t];
  const k = RAIL.indexOf(tool.name);
  const [x, y, w, h] = AREA[TARGET[tool.name]];
  return (
    <Section kicker="The editor" title={<>Nine tools. <em>No code.</em></>} lede="Your site opens in an editor: a chat on one side, the live page on the other, and these tools down its left edge. Watch what each one does.">
      <div className="stl-editor" ref={box} onMouseEnter={() => setHeld(true)} onMouseLeave={() => { window.clearTimeout(resume.current); setHeld(false); }}>
        <div className="stl-tools" role="tablist" aria-label="Editor tools" ref={rail}>
          {TOOLS.map((x, n) => (
            <button key={x.name} role="tab" aria-selected={n === t} className={n === t ? 'is-on' : ''} onClick={() => pick(n)}>
              {x.icon}<span>{x.name}</span>
              {n === t && <i key={`${t}-${held}`} className={`stl-tool-bar${held || !on ? ' is-held' : ''}`} style={{ animationDuration: `${STEP_MS}ms` }} />}
            </button>
          ))}
        </div>
        <div className="stl-trainer" role="tabpanel" aria-live="polite">
          <div className="stl-shot">
            <img src={`${A}/editor.webp`} alt="The BYBO Studio editor with a chat beside a sample boutique hotel site" width={1600} height={1000} loading="lazy" decoding="async" />
            <span className="stl-area" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} aria-hidden />
            {k >= 0 && <span className="stl-spot" style={{ top: `${10.6 + k * 6.5}%` }} aria-hidden />}
          </div>
          <p key={t} className="stl-tool-text"><b>{tool.icon}{tool.name}</b>{tool.body}</p>
        </div>
      </div>
    </Section>
  );
}

const MOODS = ['All', 'Luxe', 'Bold', 'Warm', 'Editorial', 'Playful', 'Minimal', 'Dark', 'Indian'] as const;
type Mood = (typeof MOODS)[number];
const LOOKS: [string, string, string, Mood[]][] = [
  ['darkluxe', 'Dark luxe', 'Boutique hotel', ['Luxe', 'Dark']],
  ['cover-star', 'Cover star', 'Beauty creator', ['Bold', 'Playful']],
  ['roastery', 'Roastery', 'Coffee roaster', ['Warm', 'Editorial', 'Indian']],
  ['wear-watch', 'Watch, turned', 'Watch store', ['Luxe', 'Minimal', 'Dark']],
  ['chef-pantry', 'Chef’s pantry', 'Home chef', ['Warm', 'Indian']],
  ['event-build', 'Venue build', 'Weddings', ['Luxe', 'Indian']],
  ['gym-raw', 'Gym raw', 'Fitness coach', ['Bold', 'Dark']],
  ['saanjh-parfum', 'Scent, assembled', 'Perfume', ['Luxe', 'Minimal']],
  ['maker-craft', 'Maker craft', 'Potter', ['Warm', 'Minimal']],
  ['cinema', 'Cinematic scroll', 'Travel', ['Editorial', 'Bold']],
  ['wear-kicks', 'Sneaker turn', 'Footwear', ['Bold', 'Playful']],
  ['botanica', 'Botanica', 'Skincare', ['Minimal', 'Editorial']],
  ['y2k-drop', 'Y2K drop', 'Creator merch', ['Playful', 'Bold']],
  ['wear-gold', 'Gold, close up', 'Jewellery', ['Luxe', 'Indian']],
  ['boutique', 'Boutique', 'Handloom', ['Indian', 'Editorial', 'Warm']],
];

function LookCard({ l, hidden }: { l: (typeof LOOKS)[number]; hidden?: boolean }) {
  const [img, name, kind] = l;
  return (
    <figure className="stl-look" aria-hidden={hidden || undefined}>
      <div className="stl-look-frame"><img src={`${A}/looks/${img}.webp`} alt={hidden ? '' : `${kind} site in the ${name} look`} width={1200} height={750} loading="lazy" decoding="async" /></div>
      <figcaption><b>{name}</b><span>{kind}</span></figcaption>
    </figure>
  );
}

function WebLooks() {
  const [m, setM] = useState<Mood>('All');
  const [box, on] = useOnScreen<HTMLDivElement>();
  const shown = LOOKS.filter(l => m === 'All' || l[3].includes(m));
  // Two rows when there are enough looks, each long enough to loop without a gap.
  const rows = shown.length >= 8 ? [shown.filter((_, i) => i % 2 === 0), shown.filter((_, i) => i % 2 === 1)] : [shown];
  const fill = (r: typeof LOOKS) => { const out = [...r]; while (out.length < 6) out.push(...r); return out; };
  return (
    <Section kicker="Explore looks" title={<>Pick a mood. <em>We build in it.</em></>} lede="Browse looks by business and by feel, then start from the one that fits. Every site here was built in the studio for a made-up business.">
      <div className="stl-chips" role="group" aria-label="Filter looks by mood">
        {MOODS.map(x => <button key={x} className={x === m ? 'is-on' : ''} aria-pressed={x === m} onClick={() => setM(x)}>{x}</button>)}
      </div>
      <div ref={box} className={`stl-drift${on ? '' : ' is-paused'}`} key={m}>
        {rows.map((r, n) => {
          const loop = fill(r);
          return (
            <div key={n} className="stl-drift-row">
              <div className={`stl-drift-track${n ? ' is-rev' : ''}`} style={{ animationDuration: `${loop.length * 7}s` }}>
                {[...loop, ...loop].map((l, i) => <LookCard key={i} l={l} hidden={i >= r.length} />)}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const PHONES: [string, string][] = [['cover-star', 'Beauty creator'], ['gym-raw', 'Fitness coach'], ['darkluxe', 'Boutique hotel'], ['y2k-drop', 'Creator merch'], ['chef-pantry', 'Home chef']];

function WebPhones() {
  return (
    <Section kicker="Phone first" title={<>Built for <em>the thumb.</em></>} lede="Most visitors arrive on a phone. Every site gets a bar within thumb reach with call, WhatsApp and its main booking or buying button.">
      <div className="stl-fan" aria-label="Sample sites on a phone">
        {PHONES.map(([img, kind], n) => (
          <figure key={img} className="stl-fan-phone" style={{ '--i': n - 2 } as CSSProperties} tabIndex={0}>
            <img src={`${A}/looks/phone-${img}.webp`} alt={`A sample ${kind.toLowerCase()} site on a phone`} width={520} height={1126} loading="lazy" decoding="async" />
            <figcaption>{kind}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

const ENQUIRIES: [string, string, string][] = [
  ['Meera S.', 'Two rooms for the 14th to 16th. Is breakfast included?', 'WhatsApp'],
  ['Rohan K.', 'Do you host small weddings in the courtyard?', 'Form'],
  ['Anjali P.', 'Asked about airport pickup. Call back after 6.', 'Call'],
];

function WebAfter() {
  return (
    <Section kicker="After you publish" title={<>The site keeps <em>working for you.</em></>}>
      <div className="stl-cards">
        <article className="stl-card is-wide">
          <div className="stl-card-top"><Inbox /><h3>Leads inbox</h3></div>
          <p>Every enquiry from the site, in one list, with how it came in.</p>
          <ul className="stl-inbox">
            {ENQUIRIES.map(([who, msg, via]) => <li key={who}><b>{who}</b><span>{msg}</span><em>{via}</em></li>)}
          </ul>
        </article>
        <article className="stl-card">
          <div className="stl-card-top"><Globe /><h3>Your address</h3></div>
          <p>Go live on a bybo.in address, or connect a domain you own.</p>
          <div className="stl-domain"><span className="is-live" />thebanyanretreat.bybo.in</div>
          <div className="stl-domain"><span />www.thebanyanretreat.in</div>
        </article>
        <article className="stl-card">
          <div className="stl-card-top"><Palette /><h3>Brand kits</h3></div>
          <p>Save your colours, fonts and logo once. Every new site and reel starts in them.</p>
          <div className="stl-swatches">{['#1f2a24', '#c9a24a', '#f4efe6', '#8a4b2e', '#2f4f6b'].map(c => <i key={c} style={{ background: c }} />)}</div>
        </article>
      </div>
    </Section>
  );
}

/* ================= MOTION ================= */

const REEL_BRIEFS: [string, string][] = [
  ['Our chilli flakes, drifting through the frame in slow motion', 'fx-chilli-drift'],
  ['Our sneaker, turning through every colour we make', 'fx-colourways'],
  ['One golden drop of our face serum', 'fx-golden-drop'],
  ['Our brand name, echoing down the screen', 'fx-echo-type'],
];

function MotionPrompt() {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const { i, text, done } = useTyper(REEL_BRIEFS.map(b => b[0]), on);
  return (
    <Section kicker="Start with one line" title={<>Say the idea. <em>Get the reel.</em></>} lede="Describe the reel, paste your website for the studio to read, or start from a style. Script, voice, scenes and music come back together.">
      <div ref={ref} className="stl-prompt is-motion">
        <div className="stl-prompt-box">
          <span className="stl-prompt-q">New <em>reel</em></span>
          <div className="stl-prompt-input"><span>{text}</span><i className={done ? 'is-blink' : ''} /></div>
          <ol className="stl-pipe">{['Script', 'Voice', 'Scenes', 'Music', 'Cut'].map((s, n) => <li key={s} className={done || text.length > (n + 1) * 8 ? 'is-on' : ''}>{s}</li>)}</ol>
        </div>
        <div className="stl-phone is-out">
          <div className="stl-phone-frame">
            {REEL_BRIEFS.map(([brief, id], n) => <div key={id} className={`stl-out${n === i ? ' is-on' : ''}`}><Clip id={id} play={on && n === i && done} label={`A sample reel for: ${brief}`} /></div>)}
          </div>
        </div>
      </div>
    </Section>
  );
}

const ADS: [string, string, string][] = [
  ['ad-public-failure', 'Public failure', 'Micro drama'],
  ['ad-bear-proof', 'Bear proof', 'Cartoon'],
  ['ad-last-goodbye', 'Last goodbye', 'Cinematic'],
  ['ad-hired-help', 'Hired help', 'Claymation'],
  ['ad-smile-june', 'Smile June', 'Talking object'],
  ['ad-monster-within', 'Monster within', 'Inside the body'],
  ['ad-lasagna-heist', 'Lasagna heist', 'Doll world'],
  ['ad-ice-paws', 'Ice paws', 'Crochet'],
];

function MotionAds() {
  const [p, setP] = useState(0);
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [held, setHeld] = useState(false);
  const resume = useRef(0);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!on || held || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setP(n => (n + 1) % ADS.length), 5200);
    return () => window.clearTimeout(id);
  }, [p, on, held]);
  // On phones the list scrolls sideways to keep the playing style in view (never the page).
  useEffect(() => {
    const r = list.current, b = r?.children[p] as HTMLElement | undefined;
    if (r && b && r.scrollWidth > r.clientWidth) r.scrollTo({ left: b.offsetLeft - 16, behavior: 'smooth' });
  }, [p]);
  const pick = (n: number) => { setP(n); setHeld(true); window.clearTimeout(resume.current); resume.current = window.setTimeout(() => setHeld(false), 15000); };
  return (
    <Section kicker="Story ads" title={<>A story, a problem, <em>and your product saves the day.</em></>} lede="Short films that sell, in eight styles. Pick one and the studio rewrites the story around what you sell.">
      <div ref={ref} className="stl-ads">
        <div className="stl-ads-play">
          <div className="stl-phone"><div className="stl-phone-frame">
            {ADS.map(([id, name], n) => <div key={id} className={`stl-out${n === p ? ' is-on' : ''}`}><Clip id={id} play={on && n === p} label={name} /></div>)}
          </div></div>
          <p className="stl-ads-now"><b>{ADS[p][1]}</b> · {ADS[p][2]}</p>
        </div>
        <div className="stl-ads-list" role="tablist" aria-label="Story ad styles" ref={list}>
          {ADS.map(([id, name, style], n) => (
            <button key={id} role="tab" aria-selected={n === p} className={n === p ? 'is-on' : ''} onClick={() => pick(n)}>
              <img src={`${A}/motion/${id}.webp`} alt="" width={360} height={640} loading="lazy" decoding="async" />
              <span><b>{style}</b><small>{name}</small></span>
              <Play size={15} />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}

const FX: [string, string, string][] = [
  ['fx-spice-burst', 'Spice Burst', 'Hyper motion'],
  ['fx-clay-letters', 'Clay Letters', 'Mixed media'],
  ['fx-crimson-feast', 'Crimson Feast', 'Hyper motion'],
  ['fx-comic-bottle-pop', 'Comic Bottle Pop', 'Mixed media'],
  ['fx-droplet-lens', 'Droplet Lens', 'Hyper motion'],
  ['fx-screen-print', 'Screen Print', 'Mixed media'],
  ['fx-rice-bag-still', 'Rice Bag Still', 'Hyper motion'],
  ['fx-halftone-zine', 'Halftone Zine', 'Mixed media'],
  ['fx-pump-cap-shine', 'Pump Cap Shine', 'Mixed media'],
  ['fx-cartoon-crunch', 'Cartoon Crunch', '2D motion'],
];

function MotionFx() {
  const row = useRef<HTMLDivElement>(null);
  const [box, on] = useOnScreen<HTMLDivElement>();
  const [live, setLive] = useState<string[]>([]);
  // The two cards nearest the middle of the screen play; the rest show their poster.
  useEffect(() => {
    const r = row.current; if (!r || !on) { setLive([]); return; }
    const cards = [...r.querySelectorAll<HTMLElement>('[data-k]')];
    const pick = () => {
      const mid = window.innerWidth / 2;
      const near = cards.map(c => { const b = c.getBoundingClientRect(); return { k: c.dataset.k!, d: Math.abs(b.left + b.width / 2 - mid), w: b.width }; })
        .filter(x => x.d < x.w * 1.2).sort((a, b) => a.d - b.d).slice(0, 2).map(x => x.k);
      setLive(prev => (prev.join() === near.join() ? prev : near));
    };
    pick();
    const t = window.setInterval(pick, 700);
    return () => window.clearInterval(t);
  }, [on]);
  return (
    <Section kicker="Effects" title={<>Your product, <em>in motion.</em></>} lede="Upload one product photo and pick an effect. These are effects from the studio, playing as they pass.">
      <div ref={box} className={`stl-drift is-fx${on ? '' : ' is-paused'}`}>
        <div className="stl-drift-row" ref={row}>
          <div className="stl-drift-track" style={{ animationDuration: `${FX.length * 9}s` }}>
            {[...FX, ...FX].map(([id, name, kind], n) => {
              const k = `${n}`;
              return (
                <figure key={k} data-k={k} className={`stl-fx${live.includes(k) ? ' is-on' : ''}`} aria-hidden={n >= FX.length || undefined}>
                  <Clip id={id} play={on && live.includes(k)} label={n < FX.length ? name : undefined} />
                  <figcaption className="stl-fx-cap"><b>{name}</b><small>{kind}</small></figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

// The sample month: which days get a reel, and what each one is.
const PLAN: Record<number, [string, string, string]> = {
  1: ['fx-hypno-swirl', 'Hypno Swirl', 'Effect'], 4: ['fx-denim-flat-lay', 'Denim Flat Lay', 'Effect'], 8: ['fx-countdown', 'Countdown', 'Offer'],
  11: ['fx-paper-waves', 'Paper Waves', 'Effect'], 15: ['fx-pink-collage', 'Pink Collage', 'Effect'], 18: ['fx-halftone-can', 'Halftone Can', 'Effect'],
  22: ['fx-cardboard-city', 'Cardboard City', 'Effect'], 25: ['fx-tomato-twirl', 'Tomato Twirl', 'Effect'],
};
const DAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function MotionPlan() {
  const days = Object.keys(PLAN).map(Number);
  return (
    <Section kicker="Month plans" title={<>A month of posts, <em>planned at once.</em></>} lede="Tell the studio what you sell and how often you post. It plans the month and drafts every reel for you to approve.">
      <div className="stl-plan">
        <div className="stl-plan-card" aria-label="A sample month plan: eight reels across four weeks">
          <div className="stl-plan-head"><b>November</b><span>8 reels · Tue and Fri</span></div>
          <div className="stl-cal">
            {DAY.map(d => <span key={d} className="stl-cal-d">{d[0]}</span>)}
            {Array.from({ length: 28 }, (_, n) => (
              <div key={n} className={`stl-cal-day${PLAN[n] ? ' has-reel' : ''}`} style={{ '--n': days.indexOf(n) } as CSSProperties}>
                {PLAN[n] ? <img src={`${A}/motion/${PLAN[n][0]}.webp`} alt="" width={360} height={640} loading="lazy" decoding="async" /> : null}
                <small>{n + 1}</small>
              </div>
            ))}
          </div>
        </div>
        <ol className="stl-plan-list" aria-label="Drafts for the first two weeks">
          {days.slice(0, 4).map((n, i) => (
            <li key={n} style={{ '--n': i } as CSSProperties}>
              <img src={`${A}/motion/${PLAN[n][0]}.webp`} alt="" width={360} height={640} loading="lazy" decoding="async" />
              <span><b>{PLAN[n][1]}</b><small>{DAY[n % 7]} {n + 1} Nov · {PLAN[n][2]}</small></span>
              <em className={i < 2 ? 'is-ok' : ''}>{i < 2 ? 'Approved' : 'Draft'}</em>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function MotionShare() {
  return (
    <Section kicker="Brand kit and sharing" title={<>Your look on every reel. <em>The right file for every app.</em></>}>
      <div className="stl-cards">
        <article className="stl-card">
          <div className="stl-card-top"><Palette /><h3>Brand kit</h3></div>
          <p>Your colours, fonts and logo go on every reel without asking.</p>
          <div className="stl-swatches">{['#ff5a36', '#ffd23f', '#111116', '#f7f3ea', '#2b59c3'].map(c => <i key={c} style={{ background: c }} />)}</div>
        </article>
        <article className="stl-card">
          <div className="stl-card-top"><MessageSquareText /><h3>WhatsApp cut</h3></div>
          <p>A file sized for WhatsApp status and chats, shared as the video itself, not a link.</p>
          <div className="stl-file"><span>reel-whatsapp.mp4</span><em>Ready</em></div>
        </article>
        <article className="stl-card">
          <div className="stl-card-top"><Clapperboard /><h3>Instagram master</h3></div>
          <p>The full quality 9:16 version for Reels, Shorts and everything else.</p>
          <div className="stl-file"><span>reel-1080x1920.mp4</span><em>Ready</em></div>
        </article>
      </div>
    </Section>
  );
}

/* ---------------- close and phone bar ---------------- */

function Close({ kind }: { kind: Kind }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="stl-close">
      <div className="container stl-sec-in">
        <h2>{kind === 'website' ? <>Your website is <em>one sentence away.</em></> : <>Your next reel is <em>one line away.</em></>}</h2>
        <AuthButtons kind={kind} className="stl-close-auth" />
        <p className="stl-close-note">Already registered? <a href={LOGIN}>Log in to {kind === 'website' ? 'Website' : 'Motion'} Studio</a></p>
      </div>
    </section>
  );
}

function AuthBar({ kind, heroRef }: { kind: Kind; heroRef: RefObject<HTMLElement | null> }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(!e.isIntersecting));
    io.observe(el); return () => io.disconnect();
  }, [heroRef]);
  return (
    <div className={`stl-bar${on ? ' is-on' : ''}`} aria-hidden={!on}>
      <a className="stl-bar-login" href={LOGIN} tabIndex={on ? 0 : -1}>Log in</a>
      <a className="stl-btn" href={signupFor(kind)} tabIndex={on ? 0 : -1}>Register <ArrowRight size={16} /></a>
    </div>
  );
}

export function StudioLanding({ kind }: { kind: Kind }) {
  const heroRef = useRef<HTMLElement>(null);
  return (
    <div className="stl">
      <Hero kind={kind} heroRef={heroRef} />
      {kind === 'website'
        ? <><WebPrompt /><WebEditor /><WebLooks /><WebPhones /><WebAfter /></>
        : <><MotionPrompt /><MotionAds /><MotionFx /><MotionPlan /><MotionShare /></>}
      <Close kind={kind} />
      <AuthBar kind={kind} heroRef={heroRef} />
    </div>
  );
}
