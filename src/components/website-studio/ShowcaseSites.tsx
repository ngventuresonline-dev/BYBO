'use client';

import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, Minus, Plus, X, MapPin, Stethoscope, Clock, Users, ArrowRight, ArrowDown, Lock } from 'lucide-react';

/* The four concept sites. Each sits on the shared canvas (ShowcaseStage) and is one
   continuous film: a kinetic hero, pinned scenes scrubbed by scroll, then the working
   booking or checkout. Scroll progress arrives as the CSS variables --s (scene) and
   --p (page), so scrubbing never re-renders React. What the visitor picks is sent to
   the scene through the stage signal. All names and details are made up. Nothing is
   sent anywhere; every confirmation happens on the page. */

export const StageContext = createContext<{ setPick: (n: number) => void; pulse: () => void; over: HTMLElement | null } | null>(null);

const img = (n: string) => `/images/studio/sc/${n}.webp`;
const D = (k: string) => ({ 'data-demo': k });
const css = (o: Record<string, string | number>) => o as CSSProperties;

function useStage(pick: number) {
  const { setPick, pulse, over } = useContext(StageContext)!;
  useEffect(() => { setPick(pick); }, [setPick, pick]);
  return { over, pulse };
}

/* Headline: letters rise out of a mask, one after the other. An item in an array is italic. */
function Title({ lines }: { lines: (string | [string])[] }) {
  let n = 0;
  const label = lines.map(l => (typeof l === 'string' ? l : l[0])).join(' ');
  return (
    <h3 className="sc-title" aria-label={label}>
      {lines.map(l => {
        const text = typeof l === 'string' ? l : l[0];
        return (
          <span key={text} className={typeof l === 'string' ? 'sc-line' : 'sc-line it'} aria-hidden>
            {text.split(' ').map((w, wi) => (
              <span key={wi} className="sc-w">{w.split('').map((c, i) => <i key={i} style={css({ '--n': n++ })}>{c}</i>)}</span>
            ))}
          </span>
        );
      })}
    </h3>
  );
}

/* A sentence that lights up word by word as its scene is scrubbed. */
function Words({ text }: { text: string }) {
  const words = text.split(' ');
  return <p className="sc-words" aria-label={text}>{words.map((w, i) => <span key={i} aria-hidden style={css({ '--i': (i / words.length).toFixed(3) })}>{w} </span>)}</p>;
}

function Pin({ length, className = '', children }: { length: number; className?: string; children: ReactNode }) {
  return <section data-scene className={`sc-pin ${className}`} style={{ height: `calc(var(--vh) * ${length})` }}><div className="sc-stick">{children}</div></section>;
}

/* Type that slides with scroll and leans with its speed. */
function Marquee({ text }: { text: string }) {
  return <div className="sc-marq" aria-hidden><span>{Array.from({ length: 5 }, () => text).join(' · ')}</span></div>;
}

function Cue() {
  return <span className="sc-cue" aria-hidden><ArrowDown size={14} /> Scroll</span>;
}

/* What shows if the scene can't run. Fades out once the canvas has drawn. */
function Fallback({ src }: { src: string }) {
  return <span className="sc-fallback" aria-hidden><Image src={src} alt="" fill sizes="(max-width: 1100px) 92vw, 1100px" /></span>;
}

function Over({ children, over }: { children: ReactNode; over: HTMLElement | null }) {
  return over ? createPortal(children, over) : null;
}

function Confirm({ show, title, note, onBack, dark, over }: { show: boolean; title: string; note: string; onBack: () => void; dark?: boolean; over: HTMLElement | null }) {
  return (
    <Over over={over}>
      <AnimatePresence>
        {show && (
          <motion.div className={`sc-confirm${dark ? ' dark' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="sc-confirm-card" initial={{ y: 30, scale: .95 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .15, type: 'spring', stiffness: 320, damping: 14 }}><Check size={28} /></motion.span>
              <b>{title}</b><p>{note}</p>
              <button type="button" onClick={onBack} {...D('done')}>Done</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Over>
  );
}

/* ---------------- 1 · Northwood Residences ---------------- */

const HOMES = [
  { t: '2 BHK', d: 'Garden or city view', plan: [[0, 0, 56, 60], [60, 0, 40, 60], [0, 64, 100, 36]] },
  { t: '3 BHK', d: 'Corner homes, two balconies', plan: [[0, 0, 38, 56], [42, 0, 58, 56], [0, 60, 58, 40], [62, 60, 38, 40]] },
  { t: '4 BHK', d: 'A lift lobby of your own', plan: [[0, 0, 30, 46], [34, 0, 30, 46], [68, 0, 32, 46], [0, 50, 44, 50], [48, 50, 52, 50]] },
];

export function Estate() {
  const [home, setHome] = useState('3 BHK');
  const [day, setDay] = useState('Sat');
  const [done, setDone] = useState(false);
  const { over, pulse } = useStage(HOMES.findIndex(h => h.t === home));
  return (
    <div className="sc-site sc-estate">
      <nav className="sc-nav"><b>Northwood</b><span>Residences</span><span>Living</span><span>Visit</span><button type="button">Enquire</button></nav>
      <header className="sc-hero" data-scene>
        <Fallback src={img('estate')} />
        <small className="sc-tag"><MapPin size={13} /> Hebbal · North Bengaluru</small>
        <Title lines={['Live above', ['the trees.']]} />
        <p className="sc-lede">2, 3 and 4 bedroom homes around a podium garden.</p>
        <Cue />
      </header>
      <Pin length={2.1} className="sc-mid"><Words text="Morning arrives at canopy height. The road stays down there. The garden stays yours." /></Pin>
      <Marquee text="Above the trees" />
      <Pin length={2.6} className="sc-railpin">
        <p className="sc-eyebrow">Residences</p>
        <div className="sc-rail">
          {HOMES.map(h => (
            <button type="button" key={h.t} className={h.t === home ? 'sc-card on' : 'sc-card'} onClick={() => setHome(h.t)}>
              <svg viewBox="0 0 100 100" aria-hidden>{h.plan.map(([x, y, w, ht], i) => <rect key={i} x={x} y={y} width={w} height={ht} pathLength={1} />)}</svg>
              <b>{h.t}</b><small>{h.d}</small>
            </button>
          ))}
        </div>
      </Pin>
      <section className="sc-book" {...D('book')}>
        <form className="sc-panel" onSubmit={e => { e.preventDefault(); pulse(); setDone(true); }}>
          <h4>Walk the {home} <em>in person.</em></h4>
          <div className="sc-seg">{HOMES.map(h => <button type="button" key={h.t} className={h.t === home ? 'on' : ''} onClick={() => setHome(h.t)} {...D('home-' + h.t[0])}>{h.t}</button>)}</div>
          <div className="sc-seg">{['Thu', 'Fri', 'Sat', 'Sun'].map(d => <button type="button" key={d} className={d === day ? 'on' : ''} onClick={() => setDay(d)} {...D('day-' + d)}>{d}</button>)}</div>
          <input placeholder="Your name" required aria-label="Your name" {...D('name')} />
          <input placeholder="Mobile number" inputMode="tel" required aria-label="Mobile number" {...D('phone')} />
          <button type="submit" className="sc-go" {...D('submit')}>Book my visit <ArrowRight size={16} /></button>
        </form>
      </section>
      <Confirm over={over} show={done} title={`Visit booked for ${day}`} note={`Our team will walk you through the ${home} homes and call to confirm a time.`} onBack={() => setDone(false)} dark />
    </div>
  );
}

/* ---------------- 2 · Sage Clinic ---------------- */

const DOCTORS = [
  { n: 'Dr. Aditi Rao', s: 'General medicine', i: 'AR' },
  { n: 'Dr. Neel Kapoor', s: 'Paediatrics', i: 'NK' },
  { n: 'Dr. Sana Menon', s: 'Dermatology', i: 'SM' },
];
const SPECS = ['All', 'General medicine', 'Paediatrics', 'Dermatology'];
const SLOTS = ['9:30', '10:00', '11:30', '4:30', '5:00', '6:30'];

export function Clinic() {
  const [spec, setSpec] = useState('All');
  const [doc, setDoc] = useState(DOCTORS[0]);
  const [slot, setSlot] = useState('11:30');
  const [done, setDone] = useState(false);
  const { over, pulse } = useStage(SPECS.indexOf(spec));
  const shown = DOCTORS.filter(d => spec === 'All' || d.s === spec);
  const pick = (s: string) => { setSpec(s); const f = DOCTORS.find(d => d.s === s); if (f) setDoc(f); };
  return (
    <div className="sc-site sc-clinic">
      <nav className="sc-nav"><b><Stethoscope size={17} /> Sage Clinic</b><span>Doctors</span><span>Lab tests</span><button type="button">Book</button></nav>
      <header className="sc-hero" data-scene>
        <Fallback src={img('clinic')} />
        <small className="sc-tag">Family medicine</small>
        <Title lines={['Care for the', 'whole family,', ['on time.']]} />
        <p className="sc-lede">Book a doctor, then get reports and reminders on WhatsApp.</p>
        <Cue />
      </header>
      <Pin length={3} className="sc-steps">
        <p className="sc-eyebrow">One visit</p>
        <ol>
          {[['Find', 'the doctor who fits.'], ['Book', 'the time that suits you.'], ['Arrive', 'and be seen.']].map(([a, b], i) => (
            <li key={a} style={css({ '--k': i })}><b>{a}</b><span>{b}</span></li>
          ))}
        </ol>
      </Pin>
      <section className="sc-book" {...D('book')}>
        <div className="sc-panel">
          <div className="sc-seg wrap">{SPECS.map(s => <button type="button" key={s} className={s === spec ? 'on' : ''} onClick={() => pick(s)} {...D('spec-' + s.split(' ')[0])}>{s}</button>)}</div>
          <div className="sc-docs">
            {shown.map(d => (
              <button type="button" key={d.n} className={d.n === doc.n ? 'on' : ''} onClick={() => setDoc(d)} {...D('doc-' + d.i)}>
                <span>{d.i}</span><b>{d.n}</b><small>{d.s}</small>
              </button>
            ))}
          </div>
          <form onSubmit={e => { e.preventDefault(); pulse(); setDone(true); }}>
            <div className="sc-seg wrap">{SLOTS.map(s => <button type="button" key={s} className={s === slot ? 'on' : ''} onClick={() => setSlot(s)} {...D('slot-' + s)}>{s}</button>)}</div>
            <input placeholder="Patient name" required aria-label="Patient name" {...D('patient')} />
            <button type="submit" className="sc-go" {...D('submit')}>Confirm {slot} with {doc.n} <ArrowRight size={16} /></button>
          </form>
        </div>
      </section>
      <Confirm over={over} show={done} title="Appointment confirmed" note={`${doc.n} at ${slot}. A reminder will reach you on WhatsApp.`} onBack={() => setDone(false)} />
    </div>
  );
}

/* ---------------- 3 · Tamarind House ---------------- */

const MENU: Record<string, [string, string][]> = {
  Starters: [['Charred corn chaat', 'Lime, chilli, pomegranate'], ['Tandoori broccoli', 'Cheddar, smoked chilli'], ['Crab sukka', 'Coconut, curry leaf']],
  Mains: [['Butter chicken', 'Slow cooked, finished with cream'], ['Kerala fish curry', 'Kokum, coconut, red rice'], ['Paneer lababdar', 'Tomato, fenugreek, cream']],
  Desserts: [['Gulab jamun cheesecake', 'Cardamom, pistachio'], ['Filter coffee tiramisu', 'Mascarpone, chicory']],
};

export function Restaurant() {
  const [tab, setTab] = useState('Mains');
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState('8:00 pm');
  const [done, setDone] = useState(false);
  const { over, pulse } = useStage(guests);
  return (
    <div className="sc-site sc-resto">
      <nav className="sc-nav"><b>Tamarind <i>House</i></b><span>Menu</span><span>Private dining</span><button type="button">Reserve</button></nav>
      <header className="sc-hero" data-scene>
        <Fallback src={img('resto')} />
        <small className="sc-tag">Indiranagar · Dinner</small>
        <Title lines={['Home cooking,', ['dressed for dinner.']]} />
        <Cue />
      </header>
      <Pin length={2.1} className="sc-mid"><Words text="A candle for every guest. Sit down, and the room gets a little warmer." /></Pin>
      <Marquee text="Smoke, spice, slow fire" />
      <section className="sc-book" {...D('book')}>
        <div className="sc-panel">
          <p className="sc-eyebrow">The menu</p>
          <div className="sc-seg">{Object.keys(MENU).map(t => <button type="button" key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)} {...D('tab-' + t)}>{t}</button>)}</div>
          <AnimatePresence mode="wait">
            <motion.ul key={tab} className="sc-items" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {MENU[tab].map(([n, d]) => <li key={n}><b>{n}</b><small>{d}</small></li>)}
            </motion.ul>
          </AnimatePresence>
          <form onSubmit={e => { e.preventDefault(); pulse(); setDone(true); }}>
            <div className="sc-guests"><Users size={15} /><button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))} aria-label="Fewer guests"><Minus size={13} /></button><b>{guests}</b><button type="button" onClick={() => setGuests(g => Math.min(12, g + 1))} aria-label="More guests" {...D('guests+')}><Plus size={13} /></button><span>Lights a candle</span></div>
            <div className="sc-seg"><Clock size={15} />{['7:30 pm', '8:00 pm', '8:30 pm', '9:15 pm'].map(t => <button type="button" key={t} className={t === time ? 'on' : ''} onClick={() => setTime(t)} {...D('time-' + t.split(' ')[0])}>{t.replace(' pm', '')}</button>)}</div>
            <button type="submit" className="sc-go" {...D('submit')}>Reserve tonight <ArrowRight size={16} /></button>
          </form>
        </div>
      </section>
      <Confirm over={over} show={done} title="Your table is set" note={`${guests} ${guests === 1 ? 'guest' : 'guests'} at ${time} tonight.`} onBack={() => setDone(false)} dark />
    </div>
  );
}

/* ---------------- 4 · Lumen Skin ---------------- */

const PRODUCTS = [
  { id: 'serum', n: 'Clear Day Serum', d: 'Niacinamide · 30 ml' },
  { id: 'cream', n: 'Barrier Cream', d: 'Ceramides and oat · 50 g' },
  { id: 'oil', n: 'Night Face Oil', d: 'Squalane and rosehip · 20 ml' },
];

export function Store() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const { over, pulse } = useStage(count);
  const add = (id: string, d = 1) => { if (d > 0) pulse(); setCart(c => { const n = Math.max(0, (c[id] || 0) + d); const next = { ...c, [id]: n }; if (!n) delete next[id]; return next; }); };
  return (
    <div className="sc-site sc-store">
      <nav className="sc-nav"><b>lumen</b><span>Shop</span><span>Routines</span><button type="button" className="sc-bag" onClick={() => setOpen(true)} aria-label="Open bag" {...D('bag')}><ShoppingBag size={17} /><AnimatePresence>{count > 0 && <motion.i key={count} initial={{ scale: 1.8 }} animate={{ scale: 1 }}>{count}</motion.i>}</AnimatePresence></button></nav>
      <header className="sc-hero" data-scene>
        <Fallback src={img('p-serum')} />
        <small className="sc-tag">The everyday edit</small>
        <Title lines={['Skin care', 'that does', ['one thing well.']]} />
        <Cue />
      </header>
      <Pin length={2.1} className="sc-mid"><Words text="No fragrance. No fillers. Nothing you need to look up." /></Pin>
      <Marquee text="Three formulas" />
      <section className="sc-book" {...D('book')}>
        <div className="sc-shelf">
          {PRODUCTS.map(p => (
            <article key={p.id} className="sc-card">
              <b>{p.n}</b><small>{p.d}</small>
              <button type="button" className={cart[p.id] ? 'in' : ''} onClick={() => add(p.id)} {...D('add-' + p.id)}>{cart[p.id] ? <><Check size={14} /> In the bag · {cart[p.id]}</> : 'Add to bag'}</button>
            </article>
          ))}
        </div>
      </section>
      <Over over={over}>
        <AnimatePresence>
          {open && (
            <>
              <motion.div className="sc-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
              <motion.aside className="sc-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}>
                <div className="sc-drawer-h"><b>Your bag</b><button type="button" onClick={() => setOpen(false)} aria-label="Close bag"><X size={18} /></button></div>
                {count === 0 ? <p className="sc-empty">Your bag is empty.</p> : (
                  <>
                    <ul className="sc-lines">{PRODUCTS.filter(p => cart[p.id]).map(p => (
                      <li key={p.id}><div><b>{p.n}</b><small>{p.d}</small></div><div className="sc-qty"><button type="button" onClick={() => add(p.id, -1)} aria-label="One less"><Minus size={12} /></button><b>{cart[p.id]}</b><button type="button" onClick={() => add(p.id)} aria-label="One more"><Plus size={12} /></button></div></li>
                    ))}</ul>
                    <button type="button" className="sc-go" onClick={() => { setOpen(false); pulse(); setDone(true); }} {...D('checkout')}><Lock size={14} /> Checkout</button>
                  </>
                )}
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </Over>
      <Confirm over={over} show={done} title="Order placed" note="This is a concept store, so nothing was charged." onBack={() => { setDone(false); setCart({}); }} />
    </div>
  );
}
