'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, Minus, Plus, X, MapPin, Star, Building2, Stethoscope, UtensilsCrossed, Sparkles, Lock } from 'lucide-react';

/* Four concept websites that work inside a browser frame: book a site visit,
   pick an appointment slot, reserve a table, fill a cart. Nothing is sent
   anywhere; every confirmation happens on the page. */

const img = (n: string) => `/images/studio/sc/${n}.webp`;

function Done({ title, note, onBack }: { title: string; note: string; onBack: () => void }) {
  return (
    <motion.div className="sc-done" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}>
      <span><Check size={26} /></span><b>{title}</b><p>{note}</p>
      <button type="button" onClick={onBack}>Back to the site</button>
    </motion.div>
  );
}

/* ---------------- 1 · a residential developer ---------------- */

function Estate({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [day, setDay] = useState('Sat');
  const [type, setType] = useState('3 BHK');
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return (
    <div className="sc-site sc-estate">
      <nav className="sc-nav"><b>Northwood<i>Residences</i></b><span onClick={() => scrollTo('sc-est-homes')}>Homes</span><span onClick={() => scrollTo('sc-est-life')}>Living</span><button type="button" onClick={() => scrollTo('sc-est-visit')}>Book a visit</button></nav>
      <header className="sc-hero">
        <Image src={img('estate')} alt="" fill sizes="(max-width: 1100px) 92vw, 900px" />
        <div><small><MapPin size={13} /> Hebbal, North Bengaluru</small><h3>Live above <em>the trees.</em></h3><p>2, 3 and 4 bedroom homes around a two-acre podium garden. Possession in phases.</p><button type="button" onClick={() => scrollTo('sc-est-visit')}>Book a site visit</button></div>
      </header>
      <section id="sc-est-homes" className="sc-sec">
        <h4>Choose your home</h4>
        <div className="sc-cards">
          {[['2 BHK', '1,180 sq ft', 'Garden or city view'], ['3 BHK', '1,620 sq ft', 'Corner homes, two balconies'], ['4 BHK', '2,350 sq ft', 'Private lift lobby']].map(([t, a, d]) => (
            <button type="button" key={t} className={type === t ? 'on' : ''} onClick={() => setType(t)}><b>{t}</b><span>{a}</span><small>{d}</small></button>
          ))}
        </div>
      </section>
      <section id="sc-est-life" className="sc-sec sc-split">
        <div><h4>Two acres of green, above the street</h4><ul>{['Infinity pool and deck', 'Co-working lounge', 'Children’s play garden', 'EV charging in every bay'].map(x => <li key={x}><Check size={14} />{x}</li>)}</ul></div>
      </section>
      <section id="sc-est-visit" className="sc-sec sc-form-sec">
        <AnimatePresence mode="wait">
          {sent ? <Done key="d" title={`Visit booked for ${day}`} note={`We will show you the ${type} homes and call to confirm the time.`} onBack={() => setSent(false)} /> : (
            <motion.form key="f" onSubmit={submit} className="sc-form">
              <h4>Book a site visit</h4>
              <div className="sc-chips">{['Thu', 'Fri', 'Sat', 'Sun'].map(d => <button type="button" key={d} className={d === day ? 'on' : ''} onClick={() => setDay(d)}>{d}</button>)}</div>
              <input placeholder="Your name" required aria-label="Your name" />
              <input placeholder="Phone number" inputMode="tel" required aria-label="Phone number" />
              <button type="submit" className="sc-cta">Confirm visit · {type}</button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

/* ---------------- 2 · a family clinic ---------------- */

const DOCTORS = [
  { n: 'Dr. A. Rao', s: 'General medicine', i: 'AR' }, { n: 'Dr. N. Kapoor', s: 'Paediatrics', i: 'NK' },
  { n: 'Dr. S. Menon', s: 'Dermatology', i: 'SM' }, { n: 'Dr. R. Iyer', s: 'General medicine', i: 'RI' },
];
const SLOTS = ['9:30', '10:00', '11:30', '12:00', '4:30', '5:00', '6:30'];

function Clinic({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [spec, setSpec] = useState('All');
  const [doc, setDoc] = useState(DOCTORS[0].n);
  const [slot, setSlot] = useState('11:30');
  const [sent, setSent] = useState(false);
  const shown = DOCTORS.filter(d => spec === 'All' || d.s === spec);
  return (
    <div className="sc-site sc-clinic">
      <nav className="sc-nav"><b><Stethoscope size={16} /> Sage<i>Clinic</i></b><span onClick={() => scrollTo('sc-cl-doctors')}>Doctors</span><button type="button" onClick={() => scrollTo('sc-cl-book')}>Book now</button></nav>
      <header className="sc-hero sc-hero-light">
        <Image src={img('clinic')} alt="" fill sizes="(max-width: 1100px) 92vw, 900px" />
        <div><small>Open today until 8 pm</small><h3>Care for the whole family, <em>on time.</em></h3><p>Book a doctor in under a minute. Reports and reminders on WhatsApp.</p><button type="button" onClick={() => scrollTo('sc-cl-book')}>Book an appointment</button></div>
      </header>
      <section id="sc-cl-doctors" className="sc-sec">
        <h4>Our doctors</h4>
        <div className="sc-chips">{['All', 'General medicine', 'Paediatrics', 'Dermatology'].map(s => <button type="button" key={s} className={s === spec ? 'on' : ''} onClick={() => { setSpec(s); const first = DOCTORS.find(d => s === 'All' || d.s === s); if (first && s !== 'All') setDoc(first.n); }}>{s}</button>)}</div>
        <div className="sc-docs">
          {shown.map(d => <button type="button" key={d.n} className={d.n === doc ? 'on' : ''} onClick={() => setDoc(d.n)}><span>{d.i}</span><b>{d.n}</b><small>{d.s}</small><em><Star size={12} fill="currentColor" /> Next free today</em></button>)}
        </div>
      </section>
      <section id="sc-cl-book" className="sc-sec sc-form-sec">
        <AnimatePresence mode="wait">
          {sent ? <Done key="d" title="Appointment confirmed" note={`${doc}, today at ${slot}. A reminder will reach you an hour before.`} onBack={() => setSent(false)} /> : (
            <motion.form key="f" className="sc-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <h4>Today with {doc}</h4>
              <div className="sc-chips sc-slots">{SLOTS.map(s => <button type="button" key={s} className={s === slot ? 'on' : ''} onClick={() => setSlot(s)}>{s}</button>)}</div>
              <input placeholder="Patient name" required aria-label="Patient name" />
              <button type="submit" className="sc-cta">Confirm {slot} appointment</button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

/* ---------------- 3 · a restaurant ---------------- */

const MENU: Record<string, [string, string][]> = {
  Starters: [['Charred corn chaat', 'Lime, chilli, pomegranate'], ['Tandoori broccoli', 'Cheddar, smoked chilli'], ['Crab sukka', 'Coconut, curry leaf']],
  Mains: [['Butter chicken', 'Our grandmother’s recipe, slow cooked'], ['Kerala fish curry', 'Kokum, coconut, red rice'], ['Paneer lababdar', 'Tomato, fenugreek, cream']],
  Desserts: [['Gulab jamun cheesecake', 'Cardamom, pistachio'], ['Filter coffee tiramisu', 'Mascarpone, chicory']],
};

function Restaurant({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [tab, setTab] = useState('Mains');
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState('8:00 pm');
  const [sent, setSent] = useState(false);
  return (
    <div className="sc-site sc-resto">
      <nav className="sc-nav"><b>Tamarind<i>House</i></b><span onClick={() => scrollTo('sc-rs-menu')}>Menu</span><button type="button" onClick={() => scrollTo('sc-rs-book')}>Reserve</button></nav>
      <header className="sc-hero">
        <Image src={img('resto')} alt="" fill sizes="(max-width: 1100px) 92vw, 900px" />
        <div><small>Indiranagar · Dinner from 7 pm</small><h3>Home cooking, <em>dressed for dinner.</em></h3><button type="button" onClick={() => scrollTo('sc-rs-book')}>Reserve a table</button></div>
      </header>
      <section id="sc-rs-menu" className="sc-sec sc-menu">
        <div className="sc-menu-photo"><Image src={img('dish')} alt="" fill sizes="300px" /></div>
        <div>
          <div className="sc-chips">{Object.keys(MENU).map(t => <button type="button" key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
          <ul className="sc-dishes">{MENU[tab].map(([n, d]) => <li key={n}><b>{n}</b><small>{d}</small></li>)}</ul>
        </div>
      </section>
      <section id="sc-rs-book" className="sc-sec sc-form-sec">
        <AnimatePresence mode="wait">
          {sent ? <Done key="d" title="Table reserved" note={`${guests} guests at ${time} tonight. We will hold the table for 15 minutes.`} onBack={() => setSent(false)} /> : (
            <motion.form key="f" className="sc-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <h4>Reserve for tonight</h4>
              <div className="sc-step"><span>Guests</span><button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))} aria-label="Fewer guests"><Minus size={14} /></button><b>{guests}</b><button type="button" onClick={() => setGuests(g => Math.min(12, g + 1))} aria-label="More guests"><Plus size={14} /></button></div>
              <div className="sc-chips">{['7:30 pm', '8:00 pm', '8:30 pm', '9:15 pm'].map(t => <button type="button" key={t} className={t === time ? 'on' : ''} onClick={() => setTime(t)}>{t}</button>)}</div>
              <button type="submit" className="sc-cta">Reserve · {guests} at {time}</button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

/* ---------------- 4 · a skincare store ---------------- */

const PRODUCTS = [
  { id: 'serum', n: 'Clear Day Serum', d: 'Niacinamide 10%', p: 1290, img: 'p-serum' },
  { id: 'cream', n: 'Barrier Cream', d: 'Ceramides + oat', p: 990, img: 'p-cream' },
  { id: 'oil', n: 'Night Face Oil', d: 'Squalane + rosehip', p: 1490, img: 'p-oil' },
];
const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

function Store() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [placed, setPlaced] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = PRODUCTS.reduce((a, p) => a + (cart[p.id] || 0) * p.p, 0);
  const add = (id: string, d = 1) => setCart(c => { const n = Math.max(0, (c[id] || 0) + d); const next = { ...c, [id]: n }; if (!n) delete next[id]; return next; });
  return (
    <div className="sc-site sc-store">
      <nav className="sc-nav"><b>Lumen<i>Skin</i></b><span>Shop</span><span>Routines</span><button type="button" className="sc-bag" onClick={e => { e.currentTarget.closest('.ws-sc-view')?.scrollTo({ top: 0 }); setOpen(true); }} aria-label="Open bag"><ShoppingBag size={17} /><AnimatePresence>{count > 0 && <motion.i key={count} initial={{ scale: 1.6 }} animate={{ scale: 1 }}>{count}</motion.i>}</AnimatePresence></button></nav>
      <header className="sc-hero sc-hero-light sc-hero-short">
        <Image src={img('store')} alt="" fill sizes="(max-width: 1100px) 92vw, 900px" />
        <div><small>Free delivery over ₹999</small><h3>Skin care that <em>does one thing well.</em></h3></div>
      </header>
      <section className="sc-sec">
        <h4>Bestsellers</h4>
        <div className="sc-products">
          {PRODUCTS.map(p => (
            <div key={p.id} className="sc-product">
              <span className="sc-product-img"><Image src={img(p.img)} alt="" fill sizes="200px" /></span>
              <b>{p.n}</b><small>{p.d}</small>
              <div className="sc-product-buy"><span>{inr(p.p)}</span><button type="button" onClick={() => add(p.id)}>{cart[p.id] ? `In bag · ${cart[p.id]}` : 'Add to bag'}</button></div>
            </div>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="sc-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="sc-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}>
              <div className="sc-drawer-h"><b>Your bag</b><button type="button" onClick={() => setOpen(false)} aria-label="Close bag"><X size={18} /></button></div>
              {placed ? <Done title="Order placed" note="This is a concept store, so nothing was charged." onBack={() => { setPlaced(false); setCart({}); setOpen(false); }} /> : count === 0 ? <p className="sc-empty">Your bag is empty. Add something you love.</p> : (
                <>
                  <ul className="sc-lines">{PRODUCTS.filter(p => cart[p.id]).map(p => (
                    <li key={p.id}><span className="sc-line-img"><Image src={img(p.img)} alt="" fill sizes="60px" /></span><div><b>{p.n}</b><small>{inr(p.p)}</small></div><div className="sc-qty"><button type="button" onClick={() => add(p.id, -1)} aria-label="One less"><Minus size={12} /></button><b>{cart[p.id]}</b><button type="button" onClick={() => add(p.id)} aria-label="One more"><Plus size={12} /></button></div></li>
                  ))}</ul>
                  <div className="sc-total"><span>Total</span><b>{inr(total)}</b></div>
                  <button type="button" className="sc-cta" onClick={() => setPlaced(true)}><Lock size={14} /> Checkout</button>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- the showcase ---------------- */

const SITES: { k: string; label: string; url: string; Icon: typeof Building2; for: string; shows: string; S: (p: { scrollTo: (id: string) => void }) => ReactNode }[] = [
  { k: 'estate', label: 'Developer', url: 'northwoodresidences.in', Icon: Building2, for: 'Real estate', shows: 'Pick a home, choose a day, book a site visit.', S: Estate },
  { k: 'clinic', label: 'Clinic', url: 'sageclinic.in', Icon: Stethoscope, for: 'Healthcare', shows: 'Filter doctors, pick a slot, confirm the appointment.', S: Clinic },
  { k: 'resto', label: 'Restaurant', url: 'tamarindhouse.in', Icon: UtensilsCrossed, for: 'Hospitality', shows: 'Browse the menu, choose guests and time, reserve.', S: Restaurant },
  { k: 'store', label: 'Store', url: 'lumenskin.in', Icon: Sparkles, for: 'D2C commerce', shows: 'Add products, open the bag, check out.', S: Store },
];

export function Showcase() {
  const [k, setK] = useState(0);
  const view = useRef<HTMLDivElement>(null);
  const s = SITES[k];
  const scrollTo = (id: string) => { const v = view.current, el = v?.querySelector('#' + id) as HTMLElement | null; if (v && el) v.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' }); };
  return (
    <section className="ws-sc" id="live-work" aria-labelledby="ws-sc-title">
      <div className="container">
        <div className="ws-sc-head">
          <div><p className="ws-kicker">Live work</p><h2 id="ws-sc-title">Four websites. <em>All of them work.</em></h2></div>
          <p className="ws-sc-sub">Click around. Every button books, filters or adds to a cart, the way your customers would use it. Concept sites, built to show what a BYBO site does.</p>
        </div>
        <div className="ws-sc-tabs" role="tablist" aria-label="Choose a website">
          {SITES.map((x, i) => (
            <button key={x.k} role="tab" aria-selected={i === k} data-on={i === k ? '' : undefined} onClick={() => { setK(i); view.current?.scrollTo({ top: 0 }); }}>
              {i === k && <motion.span layoutId="ws-sc-pill" className="ws-sc-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <x.Icon size={16} /><span>{x.label}</span>
            </button>
          ))}
        </div>
        <div className="ws-sc-frame">
          <div className="ws-sc-bar"><i /><i /><i /><span><Lock size={11} /> {s.url}</span><em>{s.for}</em></div>
          <div className="ws-sc-view" ref={view}>
            <AnimatePresence mode="wait">
              <motion.div key={s.k} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
                <s.S scrollTo={scrollTo} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="ws-sc-hint"><Check size={14} /> Try it: {s.shows}</p>
      </div>
    </section>
  );
}
