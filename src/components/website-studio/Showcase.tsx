'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Fraunces, Manrope } from 'next/font/google';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Check, ShoppingBag, Minus, Plus, X, MapPin, Star, Building2, Stethoscope, UtensilsCrossed, Sparkles, Lock, Search, CalendarDays, Clock, Users, ArrowRight, Trees, Waves, Dumbbell, Car, Play, Pause, MousePointer2 } from 'lucide-react';

/* Four concept websites inside a browser frame. A demo cursor drives each one
   on its own (picks, types, books, checks out), then moves to the next. The
   moment a visitor touches the frame, the demo hands over control. Nothing is
   sent anywhere; every confirmation happens on the page. */

const display = Fraunces({ subsets: ['latin'], weight: ['400', '600', '700'], style: ['normal', 'italic'], variable: '--sc-display', display: 'swap' });
const ui = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--sc-ui', display: 'swap' });

const img = (n: string) => `/images/studio/sc/${n}.webp`;
const D = (k: string) => ({ 'data-demo': k });

function Confirm({ show, title, note, onBack, dark }: { show: boolean; title: string; note: string; onBack: () => void; dark?: boolean }) {
  return (
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
  );
}

/* ---------------- 1 · Northwood Residences ---------------- */

const HOMES = [
  { t: '2 BHK', a: '1,180', d: 'Garden or city view', f: 'From 12th floor' },
  { t: '3 BHK', a: '1,620', d: 'Corner homes, two balconies', f: 'Most chosen' },
  { t: '4 BHK', a: '2,350', d: 'Private lift lobby', f: 'Only 24 homes' },
];

function Estate() {
  const [home, setHome] = useState('3 BHK');
  const [day, setDay] = useState('Sat');
  const [done, setDone] = useState(false);
  return (
    <div className="sc-site sc-estate">
      <header className="sc-e-hero">
        <Image src={img('estate')} alt="" fill sizes="(max-width: 1100px) 92vw, 1100px" priority />
        <nav className="sc-nav sc-nav-over"><b>Northwood</b><span>Residences</span><span>Amenities</span><span>Location</span><button type="button">Enquire</button></nav>
        <div className="sc-e-copy">
          <small><MapPin size={13} /> Hebbal · North Bengaluru</small>
          <h3>Live above<br /><em>the trees.</em></h3>
          <p>2, 3 and 4 bedroom homes around a two-acre podium garden, eleven minutes from the airport road.</p>
        </div>
        <form className="sc-e-book" onSubmit={e => { e.preventDefault(); setDone(true); }}>
          <b>Book a private site visit</b>
          <div className="sc-seg">{HOMES.map(h => <button type="button" key={h.t} className={h.t === home ? 'on' : ''} onClick={() => setHome(h.t)} {...D('home-' + h.t[0])}>{h.t}</button>)}</div>
          <div className="sc-days">{[['Thu', '30'], ['Fri', '31'], ['Sat', '1'], ['Sun', '2']].map(([d, n]) => <button type="button" key={d} className={d === day ? 'on' : ''} onClick={() => setDay(d)} {...D('day-' + d)}><small>{d}</small>{n}</button>)}</div>
          <input placeholder="Your name" required aria-label="Your name" {...D('name')} />
          <input placeholder="Mobile number" inputMode="tel" required aria-label="Mobile number" {...D('phone')} />
          <button type="submit" className="sc-gold" {...D('submit')}>Book my visit <ArrowRight size={16} /></button>
        </form>
      </header>
      <div className="sc-e-stats">{[['2 acres', 'podium garden'], ['312', 'homes in 3 towers'], ['72%', 'open space'], ['2028', 'first possession']].map(([a, b]) => <div key={a}><b>{a}</b><small>{b}</small></div>)}</div>
      <section className="sc-sec">
        <p className="sc-eyebrow">Residences</p>
        <h4>Choose the home that fits the next ten years.</h4>
        <div className="sc-e-homes">
          {HOMES.map(h => (
            <button type="button" key={h.t} className={h.t === home ? 'on' : ''} onClick={() => setHome(h.t)}>
              <span className="sc-e-plan" aria-hidden><i /><i /><i /><i /></span>
              <em>{h.f}</em><b>{h.t}</b><span>{h.a} sq ft</span><small>{h.d}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="sc-sec sc-e-amen">
        <p className="sc-eyebrow">Living</p>
        <h4>Everything below, the city far away.</h4>
        <div>{[[Trees, 'Two-acre garden'], [Waves, 'Infinity pool'], [Dumbbell, 'Clubhouse and gym'], [Car, 'EV bay for every home']].map(([I, t]) => { const Ic = I as typeof Trees; return <span key={t as string}><Ic size={20} />{t as string}</span>; })}</div>
      </section>
      <Confirm show={done} title={`Visit booked for ${day}`} note={`Our team will walk you through the ${home} homes and call to confirm a time.`} onBack={() => setDone(false)} dark />
    </div>
  );
}

/* ---------------- 2 · Sage Clinic ---------------- */

const DOCTORS = [
  { n: 'Dr. Aditi Rao', s: 'General medicine', i: 'AR', y: '14 yrs', g: ['#2f7a6d', '#78c2a4'] },
  { n: 'Dr. Neel Kapoor', s: 'Paediatrics', i: 'NK', y: '11 yrs', g: ['#3d6fb6', '#8fb8ef'] },
  { n: 'Dr. Sana Menon', s: 'Dermatology', i: 'SM', y: '9 yrs', g: ['#b0596f', '#efa5b6'] },
  { n: 'Dr. Ravi Iyer', s: 'General medicine', i: 'RI', y: '18 yrs', g: ['#7a5b2f', '#d8b47a'] },
];
const SLOTS = ['9:30', '10:00', '11:30', '12:00', '4:30', '5:00', '6:30'];

function Clinic() {
  const [spec, setSpec] = useState('All');
  const [doc, setDoc] = useState(DOCTORS[0]);
  const [slot, setSlot] = useState('11:30');
  const [done, setDone] = useState(false);
  const shown = DOCTORS.filter(d => spec === 'All' || d.s === spec);
  const pick = (s: string) => { setSpec(s); const f = DOCTORS.find(d => s === 'All' || d.s === s); if (f && s !== 'All') setDoc(f); };
  return (
    <div className="sc-site sc-clinic">
      <nav className="sc-nav"><b><Stethoscope size={17} /> Sage Clinic</b><span>Doctors</span><span>Lab tests</span><button type="button">Book</button></nav>
      <header className="sc-c-hero">
        <div className="sc-c-copy">
          <small><i /> Open today until 8 pm</small>
          <h3>Care for the whole family, <em>on time.</em></h3>
          <p>Book a doctor in under a minute. Reports, reminders and follow-ups on WhatsApp.</p>
          <div className="sc-c-search"><Search size={17} /><span>Search a doctor or speciality</span></div>
          <div className="sc-pills">{['All', 'General medicine', 'Paediatrics', 'Dermatology'].map(s => <button type="button" key={s} className={s === spec ? 'on' : ''} onClick={() => pick(s)} {...D('spec-' + s.split(' ')[0])}>{s}</button>)}</div>
        </div>
        <div className="sc-c-photo">
          <Image src={img('clinic')} alt="" fill sizes="(max-width: 1100px) 60vw, 480px" />
          <span className="sc-float a"><Clock size={14} /> Next free today, {slot}</span>
          <span className="sc-float b"><Star size={14} fill="currentColor" /> 4.9 from 2,300 visits</span>
        </div>
      </header>
      <section className="sc-sec sc-c-book">
        <div className="sc-c-docs">
          {shown.map(d => (
            <button type="button" key={d.n} className={d.n === doc.n ? 'on' : ''} onClick={() => setDoc(d)} {...D('doc-' + d.i)}>
              <span style={{ background: `linear-gradient(135deg,${d.g[0]},${d.g[1]})` }}>{d.i}</span>
              <b>{d.n}</b><small>{d.s} · {d.y}</small>
            </button>
          ))}
        </div>
        <form className="sc-c-slot" onSubmit={e => { e.preventDefault(); setDone(true); }}>
          <b>Today with {doc.n}</b>
          <div className="sc-pills">{SLOTS.map(s => <button type="button" key={s} className={s === slot ? 'on' : ''} onClick={() => setSlot(s)} {...D('slot-' + s)}>{s}</button>)}</div>
          <input placeholder="Patient name" required aria-label="Patient name" {...D('patient')} />
          <button type="submit" className="sc-mint" {...D('submit')}>Confirm {slot} appointment</button>
        </form>
      </section>
      <Confirm show={done} title="Appointment confirmed" note={`${doc.n}, today at ${slot}. A reminder will reach you on WhatsApp an hour before.`} onBack={() => setDone(false)} />
    </div>
  );
}

/* ---------------- 3 · Tamarind House ---------------- */

const MENU: Record<string, [string, string, string][]> = {
  Starters: [['Charred corn chaat', 'Lime, chilli, pomegranate', '₹420'], ['Tandoori broccoli', 'Cheddar, smoked chilli', '₹460'], ['Crab sukka', 'Coconut, curry leaf', '₹690']],
  Mains: [['Butter chicken', 'Slow cooked, our grandmother’s recipe', '₹640'], ['Kerala fish curry', 'Kokum, coconut, red rice', '₹720'], ['Paneer lababdar', 'Tomato, fenugreek, cream', '₹560']],
  Desserts: [['Gulab jamun cheesecake', 'Cardamom, pistachio', '₹380'], ['Filter coffee tiramisu', 'Mascarpone, chicory', '₹360']],
};

function Restaurant() {
  const [tab, setTab] = useState('Mains');
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState('8:00 pm');
  const [done, setDone] = useState(false);
  return (
    <div className="sc-site sc-resto">
      <header className="sc-r-hero">
        <Image src={img('resto')} alt="" fill sizes="(max-width: 1100px) 92vw, 1100px" />
        <nav className="sc-nav sc-nav-over"><b>Tamarind <i>House</i></b><span>Menu</span><span>Private dining</span><button type="button">Reserve</button></nav>
        <div className="sc-r-copy"><small>Indiranagar · Dinner from 7 pm</small><h3>Home cooking,<br /><em>dressed for dinner.</em></h3></div>
        <form className="sc-r-bar" onSubmit={e => { e.preventDefault(); setDone(true); }}>
          <span><Users size={15} /><button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))} aria-label="Fewer guests"><Minus size={13} /></button><b>{guests}</b><button type="button" onClick={() => setGuests(g => Math.min(12, g + 1))} aria-label="More guests" {...D('guests+')}><Plus size={13} /></button></span>
          <span><CalendarDays size={15} /> Tonight</span>
          <span className="sc-r-times"><Clock size={15} />{['7:30 pm', '8:00 pm', '8:30 pm', '9:15 pm'].map(t => <button type="button" key={t} className={t === time ? 'on' : ''} onClick={() => setTime(t)} {...D('time-' + t.split(' ')[0])}>{t.replace(' pm', '')}</button>)}</span>
          <button type="submit" className="sc-copper" {...D('submit')}>Reserve</button>
        </form>
      </header>
      <section className="sc-sec sc-r-menu" {...D('menu')}>
        <div className="sc-r-dish"><Image src={img('dish')} alt="" fill sizes="320px" /><span>Chef’s pick · Butter chicken</span></div>
        <div>
          <p className="sc-eyebrow">The menu</p>
          <div className="sc-tabs">{Object.keys(MENU).map(t => <button type="button" key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)} {...D('tab-' + t)}>{t}</button>)}</div>
          <AnimatePresence mode="wait">
            <motion.ul key={tab} className="sc-r-items" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {MENU[tab].map(([n, d, p]) => <li key={n}><div><b>{n}</b><small>{d}</small></div><span>{p}</span></li>)}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>
      <Confirm show={done} title="Your table is set" note={`${guests} guests at ${time} tonight. We hold tables for 15 minutes.`} onBack={() => setDone(false)} dark />
    </div>
  );
}

/* ---------------- 4 · Lumen Skin ---------------- */

const PRODUCTS = [
  { id: 'serum', n: 'Clear Day Serum', d: 'Niacinamide 10% · 30 ml', p: 1290, img: 'p-serum', tag: 'Bestseller' },
  { id: 'cream', n: 'Barrier Cream', d: 'Ceramides + oat · 50 g', p: 990, img: 'p-cream', tag: 'New' },
  { id: 'oil', n: 'Night Face Oil', d: 'Squalane + rosehip · 20 ml', p: 1490, img: 'p-oil', tag: '' },
];
const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

function Store() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = PRODUCTS.reduce((a, p) => a + (cart[p.id] || 0) * p.p, 0);
  const add = (id: string, d = 1) => setCart(c => { const n = Math.max(0, (c[id] || 0) + d); const next = { ...c, [id]: n }; if (!n) delete next[id]; return next; });
  return (
    <div className="sc-site sc-store">
      <div className="sc-s-strip">Free delivery over ₹999 · Dermatologist tested</div>
      <nav className="sc-nav"><b>lumen</b><span>Shop</span><span>Routines</span><span>Journal</span><button type="button" className="sc-bag" onClick={e => { e.currentTarget.closest('.ws-sc-view')?.scrollTo({ top: 0 }); setOpen(true); }} aria-label="Open bag" {...D('bag')}><ShoppingBag size={17} /><AnimatePresence>{count > 0 && <motion.i key={count} initial={{ scale: 1.8 }} animate={{ scale: 1 }}>{count}</motion.i>}</AnimatePresence></button></nav>
      <header className="sc-s-hero">
        <div><p className="sc-eyebrow">The everyday edit</p><h3>Skin care that does <em>one thing</em> well.</h3><p>Three formulas. No fragrance, no fillers, nothing you need to look up.</p></div>
        <div className="sc-s-hero-img"><Image src={img('p-serum')} alt="" fill sizes="(max-width: 1100px) 50vw, 420px" /></div>
      </header>
      <section className="sc-sec">
        <div className="sc-s-grid">
          {PRODUCTS.map(p => (
            <article key={p.id} className="sc-s-card">
              <span className="sc-s-img"><Image src={img(p.img)} alt="" fill sizes="260px" />{p.tag && <em>{p.tag}</em>}</span>
              <b>{p.n}</b><small>{p.d}</small>
              <div><span>{inr(p.p)}</span><button type="button" className={cart[p.id] ? 'in' : ''} onClick={() => add(p.id)} {...D('add-' + p.id)}>{cart[p.id] ? <><Check size={14} /> Added · {cart[p.id]}</> : 'Add to bag'}</button></div>
            </article>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="sc-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="sc-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}>
              <div className="sc-drawer-h"><b>Your bag</b><button type="button" onClick={() => setOpen(false)} aria-label="Close bag"><X size={18} /></button></div>
              {count === 0 ? <p className="sc-empty">Your bag is empty.</p> : (
                <>
                  <ul className="sc-lines">{PRODUCTS.filter(p => cart[p.id]).map(p => (
                    <li key={p.id}><span className="sc-line-img"><Image src={img(p.img)} alt="" fill sizes="60px" /></span><div><b>{p.n}</b><small>{inr(p.p)}</small></div><div className="sc-qty"><button type="button" onClick={() => add(p.id, -1)} aria-label="One less"><Minus size={12} /></button><b>{cart[p.id]}</b><button type="button" onClick={() => add(p.id)} aria-label="One more"><Plus size={12} /></button></div></li>
                  ))}</ul>
                  <div className="sc-ship"><Check size={14} /> {total >= 999 ? 'Free delivery unlocked' : `Add ${inr(999 - total)} for free delivery`}</div>
                  <div className="sc-total"><span>Total</span><b>{inr(total)}</b></div>
                  <button type="button" className="sc-plum" onClick={() => { setOpen(false); setDone(true); }} {...D('checkout')}><Lock size={14} /> Checkout · {inr(total)}</button>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <Confirm show={done} title="Order placed" note="Arriving Thursday. This is a concept store, so nothing was charged." onBack={() => { setDone(false); setCart({}); }} />
    </div>
  );
}

/* ---------------- the demo director ---------------- */

type Step = { k: string; type?: string; wait?: number };
const SCRIPTS: Step[][] = [
  [{ k: 'home-4' }, { k: 'day-Sat' }, { k: 'name', type: 'Ananya Sharma' }, { k: 'phone', type: '98450 12345' }, { k: 'submit', wait: 2600 }, { k: 'done' }],
  [{ k: 'spec-Paediatrics' }, { k: 'doc-NK' }, { k: 'slot-5:00' }, { k: 'patient', type: 'Riya Kapoor' }, { k: 'submit', wait: 2600 }, { k: 'done' }],
  [{ k: 'tab-Desserts' }, { k: 'guests+' }, { k: 'guests+' }, { k: 'time-8:30' }, { k: 'submit', wait: 2600 }, { k: 'done' }],
  [{ k: 'add-serum' }, { k: 'add-oil' }, { k: 'bag', wait: 1600 }, { k: 'checkout', wait: 2600 }, { k: 'done' }],
];
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const SITES: { k: string; label: string; url: string; Icon: typeof Building2; for: string; shows: string; S: () => ReactNode }[] = [
  { k: 'estate', label: 'Developer', url: 'northwoodresidences.in', Icon: Building2, for: 'Real estate', shows: 'choose a home, pick a day, book a site visit', S: Estate },
  { k: 'clinic', label: 'Clinic', url: 'sageclinic.in', Icon: Stethoscope, for: 'Healthcare', shows: 'filter doctors, pick a slot, confirm the appointment', S: Clinic },
  { k: 'resto', label: 'Restaurant', url: 'tamarindhouse.in', Icon: UtensilsCrossed, for: 'Hospitality', shows: 'browse the menu, set guests and time, reserve', S: Restaurant },
  { k: 'store', label: 'Store', url: 'lumenskin.in', Icon: Sparkles, for: 'D2C commerce', shows: 'add products, open the bag, check out', S: Store },
];

export function Showcase() {
  const [k, setK] = useState(0);
  const [run, setRun] = useState(0); // remounts the site so every demo starts clean
  const [auto, setAuto] = useState(true);
  const [cursor, setCursor] = useState<{ x: number; y: number; on: boolean; down: boolean }>({ x: 60, y: 60, on: false, down: false });
  const frame = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const live = useInView(frame, { amount: .35 });
  const reduce = useReducedMotion();
  const s = SITES[k];

  const go = useCallback((i: number) => { setK(i); setRun(r => r + 1); view.current?.scrollTo({ top: 0 }); }, []);

  // Hand control to the visitor only when they click inside the frame; hovering and scrolling past keep it playing.
  const takeOver = (e: { isTrusted: boolean; target: EventTarget }) => { if ((e.target as Element).closest?.('.ws-sc-auto')) return; if (e.isTrusted && auto) { setAuto(false); setCursor(c => ({ ...c, on: false })); } };

  useEffect(() => {
    if (!auto || !live || reduce) return;
    let alive = true;
    const find = (key: string) => view.current?.querySelector(`[data-demo="${CSS.escape(key)}"]`) as HTMLElement | null;
    const point = async (el: HTMLElement) => {
      const v = view.current!, f = frame.current!;
      const vr = v.getBoundingClientRect(), er = el.getBoundingClientRect();
      if (er.top < vr.top + 60 || er.bottom > vr.bottom - 20) { v.scrollTo({ top: v.scrollTop + er.top - vr.top - v.clientHeight / 2 + er.height / 2, behavior: 'smooth' }); await sleep(650); }
      const fr = f.getBoundingClientRect(), r2 = el.getBoundingClientRect();
      setCursor({ x: r2.left - fr.left + Math.min(r2.width * .6, 60), y: r2.top - fr.top + r2.height * .6, on: true, down: false });
      await sleep(720);
    };
    (async () => {
      await sleep(900);
      for (const step of SCRIPTS[k]) {
        if (!alive) return;
        const el = find(step.k); if (!el) continue;
        await point(el); if (!alive) return;
        setCursor(c => ({ ...c, down: true })); await sleep(160);
        if (step.type && el instanceof HTMLInputElement) {
          el.focus({ preventScroll: true });
          for (let i = 1; i <= step.type.length; i++) { if (!alive) return; el.value = step.type.slice(0, i); await sleep(45); }
          el.blur();
        } else el.click();
        setCursor(c => ({ ...c, down: false }));
        await sleep(step.wait ?? 650);
      }
      if (!alive) return;
      setCursor(c => ({ ...c, on: false })); await sleep(700);
      if (alive) go((k + 1) % SITES.length);
    })();
    return () => { alive = false; };
  }, [auto, live, reduce, k, run, go]);

  return (
    <section className={`ws-sc ${display.variable} ${ui.variable}`} id="live-work" aria-labelledby="ws-sc-title">
      <div className="container">
        <div className="ws-sc-head">
          <div><p className="ws-kicker">Live work</p><h2 id="ws-sc-title">Four websites. <em>All of them work.</em></h2></div>
          <p className="ws-sc-sub">Watch each one take a booking or an order on its own, then take the controls and try it yourself. Concept sites, built the way we build for clients.</p>
        </div>
        <div className="ws-sc-tabs" role="tablist" aria-label="Choose a website">
          {SITES.map((x, i) => (
            <button key={x.k} role="tab" aria-selected={i === k} data-on={i === k ? '' : undefined} onClick={() => go(i)}>
              {i === k && <motion.span layoutId="ws-sc-pill" className="ws-sc-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <x.Icon size={16} /><span>{x.label}</span>
            </button>
          ))}
        </div>
        <div className="ws-sc-frame" ref={frame} onClick={takeOver}>
          <div className="ws-sc-bar"><i /><i /><i /><span><Lock size={11} /> {s.url}</span>
            <button type="button" className="ws-sc-auto" onClick={() => setAuto(a => !a)} aria-pressed={auto}>{auto ? <><Pause size={13} /> Demo playing</> : <><Play size={13} /> Resume demo</>}</button>
          </div>
          <div className="ws-sc-view" ref={view}>
            <AnimatePresence mode="wait">
              <motion.div key={`${s.k}-${run}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
                <s.S />
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.span className={`ws-sc-cursor${cursor.down ? ' down' : ''}`} aria-hidden animate={{ x: cursor.x, y: cursor.y, opacity: cursor.on ? 1 : 0 }} transition={{ x: { duration: .7, ease: [0.65, 0, 0.35, 1] }, y: { duration: .7, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: .25 } }}>
            <MousePointer2 size={22} fill="#fff" />
          </motion.span>
        </div>
        <p className="ws-sc-hint">{auto ? <><Play size={13} /> Playing: {s.shows}. Click inside to take over.</> : <><Check size={14} /> You’re driving. Try it: {s.shows}.</>}</p>
      </div>
    </section>
  );
}
