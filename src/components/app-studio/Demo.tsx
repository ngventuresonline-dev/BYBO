'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, animate, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { Check, Wrench, Truck, BadgeCheck, ScanLine, ScanFace, Camera, ChevronRight, WifiOff, Radio } from 'lucide-react';
import { EASE, img, Phone, StatusBar } from './parts';

/* An enterprise app showreel that plays on its own: four working days, each a short
   scripted sequence on the phone, mirrored live in a back-office console beside it.
   Every scene is a pure function of its step, so a scene can be jumped to, paused off
   screen, or shown finished under reduced motion. */

type Finger = { x: number; y: number; press?: boolean } | null;
type Feed = [string, string][]; // [time, event]

/* ---------------- shared screen bits ---------------- */

function Head({ kicker, title, right }: { kicker: string; title: string; right?: ReactNode }) {
  return <div className="as-e-head"><div><small>{kicker}</small><b>{title}</b></div>{right}</div>;
}

function Done({ show, title, note }: { show: boolean; title: string; note: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="as-e-done" initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '100%' }} transition={{ duration: .55, ease: EASE }}>
          <motion.span className="as-e-tick" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .25, type: 'spring', stiffness: 300, damping: 16 }}><Check /></motion.span>
          <b>{title}</b><small>{note}</small>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Pane({ k, children }: { k: string; children: ReactNode }) {
  return <motion.div key={k} className="as-e-pane" initial={{ x: '35%', opacity: 0 }} animate={{ x: '0%', opacity: 1 }} exit={{ x: '-25%', opacity: 0 }} transition={{ duration: .5, ease: EASE }}>{children}</motion.div>;
}

/** A number that counts from one value to another when `to` changes. */
function Count({ from, to }: { from: number; to: number }) {
  const v = useMotionValue(from);
  const text = useTransform(v, n => Math.round(n).toLocaleString('en-IN'));
  useEffect(() => { const c = animate(v, to, { duration: .9, ease: 'easeOut' }); return () => c.stop(); }, [to, v]);
  return <motion.span>{text}</motion.span>;
}

/* ---------------- 1 · field service ---------------- */

const JOBS = [['2041', 'Chiller service', 'Whitefield', '14:00', 'High'], ['2042', 'Lift inspection', 'Koramangala', '15:30', 'Routine'], ['2043', 'Generator check', 'Hebbal', '17:00', 'Routine']];
const CHECKS = ['Isolate power', 'Check refrigerant pressure', 'Clean condenser coils', 'Test run for 10 minutes'];

function FieldScreen({ s }: { s: number }) {
  return (
    <div className="as-app as-e">
      <StatusBar />
      <AnimatePresence initial={false} mode="popLayout">
        {s < 2 ? (
          <Pane k="list">
            <Head kicker="Tuesday · 3 jobs" title="My jobs" right={<span className="as-e-avatar">AK</span>} />
            <ul className="as-e-jobs">
              {JOBS.map(([id, t, where, time, p], i) => (
                <li key={id} data-hot={i === 0 && s === 1 ? '' : undefined}>
                  <span className="as-e-pri" data-p={p}>{p}</span>
                  <b>{t}</b><small>#{id} · {where} · {time}</small><ChevronRight className="as-e-chev" />
                </li>
              ))}
            </ul>
            <p className="as-e-offline"><WifiOff /> Works without signal</p>
          </Pane>
        ) : (
          <Pane k="job">
            <Head kicker="#2041 · Whitefield" title="Chiller service" />
            <ul className="as-e-check">
              {CHECKS.map((c, i) => <li key={c} data-on={s >= 2 ? '' : undefined} style={{ transitionDelay: `${.25 + i * .3}s` }}><i><Check /></i>{c}</li>)}
            </ul>
            <div className="as-e-photos">
              <span className="as-e-snap" data-on={s >= 3 ? '' : undefined}><Image src={img('e-hvac')} alt="" fill sizes="120px" /></span>
              <span className="as-e-add"><Camera /></span>
            </div>
            <div className="as-e-sign" data-on={s >= 4 ? '' : undefined}>
              <svg viewBox="0 0 200 50"><path d="M8 34 C 24 6, 34 46, 52 26 S 80 8, 92 32 S 120 44, 138 18 S 170 26, 192 22" /></svg>
              <small>Customer signature</small>
            </div>
            <span className="as-cta" data-press={s === 4 ? '' : undefined}>Close job</span>
            <Done show={s >= 5} title="Job closed" note="Report, photos and signature synced · 14:32" />
          </Pane>
        )}
      </AnimatePresence>
    </div>
  );
}

const fieldFeed = (s: number): Feed => [
  ['13:58', 'A. Kumar started route to #2041'],
  ...(s >= 2 ? [['14:05', 'Arrived on site at Whitefield'] as [string, string]] : []),
  ...(s >= 3 ? [['14:24', 'Photo added to #2041'] as [string, string]] : []),
  ...(s >= 5 ? [['14:32', '#2041 closed with customer signature'] as [string, string]] : []),
];

function FieldBoard({ s }: { s: number }) {
  const status = s >= 5 ? 'Completed' : s >= 2 ? 'On site' : 'En route';
  return (
    <>
      <div className="as-b-kpis">
        <span><small>Jobs today</small><b>18</b></span>
        <span><small>Completed</small><b><Count from={12} to={s >= 5 ? 13 : 12} /></b></span>
        <span><small>First-time fix</small><b>94%</b></span>
      </div>
      <table className="as-b-table">
        <thead><tr><th>Job</th><th>Technician</th><th>Status</th></tr></thead>
        <tbody>
          <tr data-flash={s >= 5 ? '' : undefined}><td>#2041 Chiller service</td><td>A. Kumar</td><td><em data-s={status}>{status}</em></td></tr>
          <tr><td>#2042 Lift inspection</td><td>S. Iyer</td><td><em data-s="En route">En route</em></td></tr>
          <tr><td>#2039 Pump repair</td><td>M. Das</td><td><em data-s="Completed">Completed</em></td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ---------------- 2 · fleet and delivery ---------------- */

// the route on the phone's map, in its 100 × 120 viewBox
const ROUTE: [number, number][] = [[16, 104], [16, 82], [38, 82], [38, 56], [64, 56], [64, 34], [84, 34], [84, 16]];
const ROUTE_D = 'M' + ROUTE.map(p => p.join(' ')).join(' L');
function along(t: number): [number, number] {
  const seg = ROUTE.slice(1).map((p, i) => Math.hypot(p[0] - ROUTE[i][0], p[1] - ROUTE[i][1]));
  let d = t * seg.reduce((a, b) => a + b, 0);
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i]) { const f = d / seg[i]; return [ROUTE[i][0] + (ROUTE[i + 1][0] - ROUTE[i][0]) * f, ROUTE[i][1] + (ROUTE[i + 1][1] - ROUTE[i][1]) * f]; }
    d -= seg[i];
  }
  return ROUTE[ROUTE.length - 1];
}

function MapArt({ t }: { t: MotionValue<number> }) {
  const cx = useTransform(t, v => along(v)[0]), cy = useTransform(t, v => along(v)[1]);
  const len = useTransform(t, v => v);
  return (
    <svg className="as-e-map" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice">
      <rect width="100" height="120" fill="#0d1322" />
      <path d="M-5 70 C 20 64, 30 92, 60 88 S 95 96, 110 84 L110 130 L-5 130 Z" fill="#12223a" />
      <g stroke="#ffffff14" strokeWidth="1.2">{[16, 38, 64, 84].map(x => <line key={x} x1={x} y1="0" x2={x} y2="120" />)}{[16, 34, 56, 82, 104].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} />)}</g>
      <path d={ROUTE_D} fill="none" stroke="#7cf2d433" strokeWidth="3" strokeLinejoin="round" />
      <motion.path d={ROUTE_D} fill="none" stroke="#7cf2d4" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" style={{ pathLength: len }} />
      <circle cx="84" cy="16" r="4" fill="#ff7ad9" /><circle cx="84" cy="16" r="8" fill="#ff7ad933" />
      <motion.circle cx={cx} cy={cy} r="4.4" fill="#fff" stroke="#5b6cff" strokeWidth="2.4" />
    </svg>
  );
}

function DeliveryScreen({ s }: { s: number }) {
  const t = useMotionValue(0);
  useEffect(() => {
    if (s === 0) { t.set(0); const c = animate(t, 1, { duration: 2.6, ease: 'easeInOut' }); return () => c.stop(); }
    t.set(1);
  }, [s, t]);
  const eta = useTransform(t, v => v > .97 ? 'Arriving' : `${Math.max(1, Math.ceil((1 - v) * 12))} min`);
  return (
    <div className="as-app as-e">
      <StatusBar />
      <AnimatePresence initial={false} mode="popLayout">
        {s === 0 ? (
          <Pane k="map">
            <Head kicker="Stop 6 of 14" title="Indiranagar" right={<span className="as-e-live"><Radio /> Live</span>} />
            <div className="as-e-mapwrap"><MapArt t={t} /></div>
            <div className="as-e-eta"><span><small>ETA</small><motion.b>{eta}</motion.b></span><span><small>Order</small><b>#88213</b></span></div>
          </Pane>
        ) : (
          <Pane k="scan">
            <Head kicker="#88213 · 2 parcels" title="Proof of delivery" />
            <div className="as-e-cam" data-hit={s >= 2 ? '' : undefined}>
              <Image src={img('e-parcel')} alt="" fill sizes="300px" />
              <span className="as-e-frame"><i /><i /><i /><i /></span>
              <span className="as-e-laser" />
              <span className="as-e-found"><Check /> Parcel matched</span>
            </div>
            <span className="as-cta" data-press={s === 2 ? '' : undefined}>Confirm delivery</span>
            <Done show={s >= 3} title="Delivered" note="Photo, location and time attached · 14:32" />
          </Pane>
        )}
      </AnimatePresence>
    </div>
  );
}

const deliveryFeed = (s: number): Feed => [
  ['14:12', 'Van KA-03 left stop 5'],
  ...(s >= 1 ? [['14:31', 'Arrived at Indiranagar'] as [string, string]] : []),
  ...(s >= 2 ? [['14:32', 'Parcel #88213 scanned'] as [string, string]] : []),
  ...(s >= 3 ? [['14:32', 'Delivered · proof uploaded'] as [string, string]] : []),
];

function DeliveryBoard({ s }: { s: number }) {
  const status = s >= 3 ? 'Delivered' : 'Out for delivery';
  return (
    <>
      <div className="as-b-fleet">
        <svg viewBox="0 0 300 110" preserveAspectRatio="none">
          <path d="M0 80 C 60 70, 90 100, 150 92 S 260 100, 300 84 L300 110 L0 110 Z" fill="#12223a" />
          <g stroke="#ffffff10">{[50, 110, 170, 230].map(x => <line key={x} x1={x} y1="0" x2={x} y2="110" />)}{[30, 60, 90].map(y => <line key={y} x1="0" y1={y} x2="300" y2={y} />)}</g>
          {['M10 90 L50 90 L50 60 L110 60 L110 30 L170 30', 'M290 20 L230 20 L230 60 L170 60 L170 90 L110 90', 'M20 30 L110 30 L110 90 L230 90'].map((d, i) => (
            <g key={i}><path d={d} fill="none" stroke={['#7cf2d4', '#8f9bff', '#ff7ad9'][i]} strokeOpacity=".35" strokeWidth="2" />
              <circle r="4" fill={['#7cf2d4', '#8f9bff', '#ff7ad9'][i]}><animateMotion dur={`${7 + i * 2}s`} repeatCount="indefinite" path={d} /></circle></g>
          ))}
        </svg>
        <span className="as-b-fleet-tag"><i /> 14 vans live</span>
      </div>
      <table className="as-b-table">
        <thead><tr><th>Order</th><th>Area</th><th>Status</th></tr></thead>
        <tbody>
          <tr data-flash={s >= 3 ? '' : undefined}><td>#88213</td><td>Indiranagar</td><td><em data-s={status}>{status}</em></td></tr>
          <tr><td>#88214</td><td>Domlur</td><td><em data-s="Out for delivery">Out for delivery</em></td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ---------------- 3 · approvals ---------------- */

function ApprovalScreen({ s }: { s: number }) {
  return (
    <div className="as-app as-e">
      <StatusBar />
      <AnimatePresence initial={false} mode="popLayout">
        {s < 2 ? (
          <motion.div key="lock" className="as-e-pane as-e-lock" exit={{ opacity: 0, scale: 1.06 }} transition={{ duration: .45 }}>
            <div className="as-e-clock"><b>14:31</b><span>Tuesday 14 October</span></div>
            <motion.div className="as-e-notif" data-hot={s === 1 ? '' : undefined} initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .5, duration: .6, ease: EASE }}>
              <i><BadgeCheck /></i><div><b>Approval needed</b><span>Purchase order 4821 · ₹4,80,000 · Procurement</span></div>
            </motion.div>
          </motion.div>
        ) : (
          <Pane k="po">
            <Head kicker="Purchase order 4821" title="₹4,80,000" right={<span className="as-e-pri" data-p="High">Due today</span>} />
            <div className="as-e-vendor"><b>Industrial cooling spares</b><small>Approved vendor · 3 quotes attached</small></div>
            <div className="as-e-budget"><span><small>Q3 maintenance budget</small><b>68% used</b></span><i><b style={{ width: s >= 2 ? '68%' : '0%' }} /></i></div>
            <ul className="as-e-check sm">
              {['Within budget', 'Vendor on the approved list', 'Matches the quote'].map((c, i) => <li key={c} data-on={s >= 2 ? '' : undefined} style={{ transitionDelay: `${.4 + i * .25}s` }}><i><Check /></i>{c}</li>)}
            </ul>
            <div className="as-e-slide" data-on={s >= 3 ? '' : undefined}><span className="as-e-thumb"><ChevronRight /></span><small>Slide to approve</small></div>
            <AnimatePresence>{s === 4 && <motion.span className="as-e-faceid" initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><ScanFace /><small>Confirming it’s you</small></motion.span>}</AnimatePresence>
            <Done show={s >= 5} title="Approved" note="Sent to finance with a full audit trail · 14:32" />
          </Pane>
        )}
      </AnimatePresence>
    </div>
  );
}

const approvalFeed = (s: number): Feed => [
  ['13:58', 'PO 4821 raised by Procurement'],
  ['14:02', 'Budget and vendor checks passed'],
  ...(s >= 2 ? [['14:31', 'Opened by R. Menon on mobile'] as [string, string]] : []),
  ...(s >= 5 ? [['14:32', 'Approved · Face ID verified'] as [string, string]] : []),
];

function ApprovalBoard({ s }: { s: number }) {
  const status = s >= 5 ? 'Approved' : 'Pending';
  return (
    <>
      <div className="as-b-kpis">
        <span><small>Awaiting approval</small><b><Count from={7} to={s >= 5 ? 6 : 7} /></b></span>
        <span><small>Median approval time</small><b>{s >= 5 ? '34 min' : '2.1 h'}</b></span>
        <span><small>Within policy</small><b>100%</b></span>
      </div>
      <table className="as-b-table">
        <thead><tr><th>Request</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>
          <tr data-flash={s >= 5 ? '' : undefined}><td>PO 4821 · ₹4,80,000</td><td>R. Menon</td><td><em data-s={status}>{status}</em></td></tr>
          <tr><td>Travel · Mumbai offsite</td><td>P. Shah</td><td><em data-s="Pending">Pending</em></td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ---------------- 4 · warehouse ---------------- */

function WarehouseScreen({ s }: { s: number }) {
  return (
    <div className="as-app as-e as-e-dark">
      <div className="as-e-cam full" data-hit={s >= 1 ? '' : undefined}>
        <Image src={img('e-warehouse')} alt="" fill sizes="300px" />
        <span className="as-e-frame"><i /><i /><i /><i /></span>
        <span className="as-e-laser" />
      </div>
      <StatusBar />
      <div className="as-e-scanhead"><ScanLine /> Cycle count · Aisle A</div>
      <AnimatePresence>
        {s >= 1 && (
          <motion.div className="as-e-item" initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: .55, ease: EASE }}>
            <small>SKU 44-1093 · Bin A-07</small>
            <b>Steel brackets, M8</b>
            <div className="as-e-qty"><span><small>On record</small><b>120</b></span><span data-on={s >= 2 ? '' : undefined}><small>Counted</small><b><Count from={120} to={s >= 2 ? 144 : 120} /></b></span></div>
            <span className="as-cta" data-press={s === 3 ? '' : undefined}>Update stock</span>
          </motion.div>
        )}
      </AnimatePresence>
      <Done show={s >= 4} title="Stock updated" note="Saved on the device and synced · 14:32" />
    </div>
  );
}

const warehouseFeed = (s: number): Feed => [
  ['14:20', 'Cycle count started in Aisle A'],
  ...(s >= 1 ? [['14:31', 'SKU 44-1093 scanned at A-07'] as [string, string]] : []),
  ...(s >= 4 ? [['14:32', 'Stock adjusted 120 → 144'] as [string, string]] : []),
];

function WarehouseBoard({ s }: { s: number }) {
  return (
    <>
      <div className="as-b-kpis">
        <span><small>Bins counted today</small><b><Count from={311} to={s >= 4 ? 312 : 311} /></b></span>
        <span><small>Stock accuracy</small><b>99.2%</b></span>
        <span><small>Offline devices</small><b>2</b></span>
      </div>
      <table className="as-b-table">
        <thead><tr><th>SKU</th><th>Bin</th><th>On hand</th></tr></thead>
        <tbody>
          <tr data-flash={s >= 4 ? '' : undefined}><td>44-1093 Steel brackets</td><td>A-07</td><td><b>{s >= 4 ? 144 : 120}</b></td></tr>
          <tr><td>44-1101 Hex bolts</td><td>A-08</td><td><b>860</b></td></tr>
        </tbody>
      </table>
    </>
  );
}

/* ---------------- the showreel ---------------- */

const SCENES: { k: string; label: string; Icon: typeof Wrench; title: string; d: string; who: string; chips: string[]; steps: number[]; finger: Finger[]; Screen: (p: { s: number }) => ReactNode; Board: (p: { s: number }) => ReactNode; feed: (s: number) => Feed }[] = [
  {
    k: 'field', label: 'Field service', Icon: Wrench, who: 'Field operations',
    title: 'Technicians close the job on site.', d: 'Checklists, photos and a customer signature, then the job is closed before they leave the building.',
    chips: ['Works offline', 'Photo and signature capture', 'Syncs with your ERP'],
    steps: [1500, 550, 1900, 1100, 1500, 2300],
    finger: [{ x: 52, y: 31 }, { x: 52, y: 31, press: true }, null, { x: 26, y: 64, press: true }, { x: 50, y: 89, press: true }, null],
    Screen: FieldScreen, Board: FieldBoard, feed: fieldFeed,
  },
  {
    k: 'fleet', label: 'Deliveries', Icon: Truck, who: 'Fleet control',
    title: 'Every van, every drop, live.', d: 'Turn-by-turn stops for the driver, a scan at the door, and proof of delivery in the back office in seconds.',
    chips: ['Live GPS tracking', 'Barcode scanning', 'Proof of delivery'],
    steps: [2900, 1400, 700, 2300],
    finger: [null, null, { x: 50, y: 89, press: true }, null],
    Screen: DeliveryScreen, Board: DeliveryBoard, feed: deliveryFeed,
  },
  {
    k: 'approve', label: 'Approvals', Icon: BadgeCheck, who: 'Approvals',
    title: 'Decisions that don’t wait for a laptop.', d: 'Policy checks run first. The manager sees the facts, slides to approve and confirms with their face.',
    chips: ['Single sign-on', 'Policy checks', 'Full audit trail'],
    steps: [1500, 550, 1900, 1300, 800, 2200],
    finger: [null, { x: 50, y: 37, press: true }, null, { x: 84, y: 87, press: true }, null, null],
    Screen: ApprovalScreen, Board: ApprovalBoard, feed: approvalFeed,
  },
  {
    k: 'stock', label: 'Warehouse', Icon: ScanLine, who: 'Inventory',
    title: 'Scan it, count it, move on.', d: 'The phone’s camera becomes a scanner. Counts land in stock records, even where the signal drops.',
    chips: ['Camera barcode scanning', 'Offline-first', 'Role-based access'],
    steps: [1400, 1000, 1500, 900, 2300],
    finger: [null, null, null, { x: 50, y: 90, press: true }, null],
    Screen: WarehouseScreen, Board: WarehouseBoard, feed: warehouseFeed,
  },
];

export function Demo() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const live = useInView(ref, { amount: .3 });
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(0);
  const sc = SCENES[scene];
  const s = reduce ? sc.steps.length - 1 : step; // reduced motion: every scene shown finished

  // the reel: advance a step, then the next scene, only while the section is on screen
  useEffect(() => {
    if (!live || reduce) return;
    const t = window.setTimeout(() => {
      if (step + 1 < sc.steps.length) setStep(step + 1);
      else { setScene((scene + 1) % SCENES.length); setStep(0); }
    }, sc.steps[step]);
    return () => clearTimeout(t);
  }, [live, reduce, scene, step, sc]);

  const go = (i: number) => { setScene(i); setStep(0); };
  const total = sc.steps.reduce((a, b) => a + b, 0);
  const f = sc.finger[s];
  const feed = sc.feed(s);

  return (
    <section className="as-demo" id="demo" aria-labelledby="as-demo-title" ref={ref} data-scene={sc.k}>
      <div className="as-demo-glow" aria-hidden />
      <div className="container as-demo-grid">
        <div className="as-demo-side">
        <div className="as-demo-head">
          <p className="as-kicker">Enterprise apps</p>
          <h2 id="as-demo-title">Apps that run <em>the business.</em></h2>
          <p className="as-demo-lede">Field teams, drivers, managers and warehouses. Every tap on the phone lands in your back office, live.</p>
        </div>

        <div className="as-reel-nav" role="tablist" aria-label="Choose a use case">
          {SCENES.map((x, i) => (
            <button key={x.k} role="tab" aria-selected={i === scene} data-on={i === scene ? '' : undefined} data-done={i < scene ? '' : undefined} onClick={() => go(i)}>
              <x.Icon size={16} /><span>{x.label}</span>
              <i className="as-reel-bar"><b key={`${scene}-${i}`} style={{ animationDuration: `${total}ms`, animationPlayState: live && !reduce ? 'running' : 'paused' } as CSSProperties} /></i>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={sc.k} className="as-reel-text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .4, ease: EASE }}>
            <h3>{sc.title}</h3>
            <p>{sc.d}</p>
            <ul className="as-reel-chips">{sc.chips.map(c => <li key={c}><Check size={13} />{c}</li>)}</ul>
          </motion.div>
        </AnimatePresence>

        {/* wide screens: the use cases as a list that opens the playing one */}
        <div className="as-reel-list" role="tablist" aria-label="Choose a use case">
          {SCENES.map((x, i) => (
            <div key={x.k} className="as-reel-item" data-on={i === scene ? '' : undefined} data-done={i < scene ? '' : undefined}>
              <i className="as-reel-vbar"><b key={`${scene}-${i}`} style={{ animationDuration: `${total}ms`, animationPlayState: live && !reduce ? 'running' : 'paused' } as CSSProperties} /></i>
              <button role="tab" aria-selected={i === scene} onClick={() => go(i)}><x.Icon size={18} />{x.label}</button>
              <AnimatePresence initial={false}>
                {i === scene && (
                  <motion.div className="as-reel-more" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .5, ease: EASE }}>
                    <h3>{x.title}</h3>
                    <p>{x.d}</p>
                    <ul className="as-reel-chips">{x.chips.map(c => <li key={c}><Check size={13} />{c}</li>)}</ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        </div>

        <div className="as-reel">
          <div className="as-reel-phone">
            <Phone className="as-phone-demo">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={sc.k} className="as-demo-screen" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .5, ease: EASE }}>
                  <sc.Screen s={s} />
                </motion.div>
              </AnimatePresence>
              <motion.span className="as-ghost-finger" aria-hidden initial={false}
                animate={f ? { left: `${f.x}%`, top: `${f.y}%`, opacity: 1, scale: f.press ? [1, .72, 1] : 1 } : { opacity: 0, scale: 1.3 }}
                transition={{ left: { duration: .7, ease: EASE }, top: { duration: .7, ease: EASE }, scale: { duration: .5, delay: f?.press ? .45 : 0 }, opacity: { duration: .3 } }} />
            </Phone>
          </div>

          <div className="as-sync" aria-hidden><i /><i /><i /></div>

          <div className="as-console">
            <div className="as-console-top">
              <span className="as-console-dots"><i /><i /><i /></span>
              <b>{sc.who}</b>
              <span className="as-console-live"><i /> Live</span>
            </div>
            <div className="as-console-body">
              <div className="as-console-main"><sc.Board s={s} /></div>
              <ol className="as-console-feed" aria-label="Activity">
                <AnimatePresence initial={false}>
                  {feed.slice(-4).reverse().map(([t, e]) => (
                    <motion.li key={sc.k + e} layout initial={{ opacity: 0, y: -10, backgroundColor: '#7cf2d433' }} animate={{ opacity: 1, y: 0, backgroundColor: '#7cf2d400' }} exit={{ opacity: 0 }} transition={{ duration: .5, ease: EASE }}>
                      <time>{t}</time>{e}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

