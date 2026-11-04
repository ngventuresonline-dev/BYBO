'use client';

/* eslint-disable @next/next/no-img-element -- concept visuals made for the demo */
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { DemoContent } from '@/lib/crm/autopilot';
import type { ClientBlueprint as Blueprint } from '@/lib/crm/blueprints';
import { addRecord, readRecords, useCart, type DemoEnquiry } from './store';

type Work = NonNullable<DemoContent['work']>[number];

/** Projects, properties or gallery pieces in a staggered grid, with type filters on the full page. */
export function WorkGrid({ items, filters = true, rail = false }: { items: Work[]; filters?: boolean; rail?: boolean }) {
  const types = useMemo(() => ['All', ...new Set(items.map((w) => w.type).filter(Boolean))], [items]);
  const [on, setOn] = useState('All');
  const shown = on === 'All' ? items : items.filter((w) => w.type === on);
  return (
    <>
      {filters && types.length > 2 ? <div className="sv-chips">{types.map((t) => <button key={t} type="button" className={t === on ? 'is-on' : ''} onClick={() => setOn(t)}>{t}</button>)}</div> : null}
      <div className={rail ? 'sv-grid is-rail' : 'sv-grid'}>
        {shown.map((w, i) => (
          <figure key={w.title} className={`sv-tile t${i % 5}`} data-reveal style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
            {w.image ? <img src={w.image} alt={w.title} loading={i < 2 ? "eager" : "lazy"} /> : null}
            <figcaption>
              <small>{[w.type, w.place].filter(Boolean).join(' · ')}</small>
              <b>{w.title}</b>
              {w.meta?.length ? <em>{w.meta.join(' · ')}</em> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

/** The enquiry form the blueprint asks for: a project brief, a booking or a site visit. */
export function EnquiryForm({ bp, services, areas, pick }: { bp: Blueprint; services: string[]; areas: string[]; pick?: string }) {
  const [sent, setSent] = useState(false);
  const { base } = useCart();
  if (sent) return <div className="co-done"><span className="co-tick">✓</span><h2>Thank you.</h2><p>We will call you back shortly, and you will get a WhatsApp confirmation right away.</p><p className="st-note">Demo form by BYBO: nothing was sent. It now shows in the owner dashboard.</p></div>;
  return (
    <form className="ct-form sv-form" onSubmit={(e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      const fields: Record<string, string> = {};
      for (const fl of bp.form.fields) if (!['name', 'phone', 'message'].includes(fl.name)) { const v = String(f.get(fl.name) ?? ''); if (v) fields[fl.label] = v; }
      addRecord<DemoEnquiry>(base, 'enquiries', { at: new Date().toISOString(), name: String(f.get('name') ?? ''), contact: String(f.get('phone') ?? ''), message: String(f.get('message') ?? ''), fields });
      setSent(true);
    }}>
      {bp.form.fields.map((fl) => {
        const opts = fl.from === 'services' ? services : fl.from === 'areas' ? [...areas, 'Somewhere else'] : fl.options;
        const wide = fl.type === 'textarea';
        return (
          <label key={fl.name} className={wide ? 'is-wide' : ''}>
            {fl.label}
            {fl.type === 'textarea' ? <textarea name={fl.name} rows={4} />
              : fl.type === 'select' && opts?.length ? <select name={fl.name} defaultValue={fl.from === 'services' && pick && opts.includes(pick) ? pick : ''} required={fl.from === 'services'}><option value="" disabled>Choose…</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>
              : <input name={fl.name} type={fl.type === 'select' ? 'text' : fl.type} required={fl.name === 'name' || fl.name === 'phone'} autoComplete={fl.name === 'name' ? 'name' : fl.name === 'phone' ? 'tel' : undefined} />}
          </label>
        );
      })}
      <button className="demo-btn" type="submit">{bp.form.submit}</button>
    </form>
  );
}

/** A small seeded random so sample figures stay the same on every visit. */
function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
const NAMES = ['Ritika M.', 'Arjun S.', 'Neha K.', 'Imran A.', 'Kavya R.', 'Vikram J.', 'Pooja D.', 'Sanjay N.', 'Meera T.', 'Rohan P.', 'Ananya G.', 'Karan B.'];
const TABS = ['Overview', 'Enquiries', 'Pipeline', 'Campaigns', 'Automations'] as const;

/**
 * The owner's side of a service business on BYBO: enquiries, a pipeline in
 * their own stages, where leads come from, campaigns and automations.
 * Enquiries made on this demo appear live; everything else is marked sample.
 */
export function ServiceDashboard({ brand, bp, services, areas }: { brand: string; bp: Blueprint; services: string[]; areas: string[] }) {
  const { base } = useCart();
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview');
  const [live, setLive] = useState<DemoEnquiry[]>([]);
  const [auto, setAuto] = useState<Record<string, boolean>>(() => Object.fromEntries(bp.dashboard.automations.map(([t], i) => [t, i < 3])));
  useEffect(() => { const t = setTimeout(() => setLive(readRecords<DemoEnquiry>(base, 'enquiries')), 0); return () => clearTimeout(t); }, [base]);

  const s = useMemo(() => {
    const r = seeded(brand + bp.kind);
    const places = areas.length ? areas : ['Nearby'];
    const offers = services.length ? services : [bp.servicesLabel];
    const days = Array.from({ length: 14 }, (_, i) => Math.round((6 + r() * 9) * (0.85 + i / 28)));
    const rows = Array.from({ length: 9 }, (_, i) => ({ id: `${brand.replace(/\W/g, '').slice(0, 3).toUpperCase()}-${2041 - i * 7}`, name: NAMES[i % NAMES.length]!, place: places[Math.floor(r() * places.length)]!, want: offers[Math.floor(r() * offers.length)]!, from: bp.dashboard.sources[Math.floor(r() * bp.dashboard.sources.length)]!, stage: bp.dashboard.stages[Math.min(bp.dashboard.stages.length - 1, Math.floor(r() * bp.dashboard.stages.length))]!, ago: `${1 + Math.floor(r() * 47)}h ago` }));
    const kpi = [days.slice(-7).reduce((a, b) => a + b, 0), Math.round(days.at(-1)! * 1.4), Math.round(days.at(-1)! * 0.8), Math.max(1, Math.round(days.at(-1)! * 0.35))];
    const src = bp.dashboard.sources.map((n) => ({ n, v: Math.round(8 + r() * 40) })).sort((a, b) => b.v - a.v);
    const stageN = bp.dashboard.stages.map((_, i) => Math.round((30 - i * 6) * (0.8 + r() * 0.4)));
    return { days, rows, kpi, src, stageN };
  }, [brand, bp, services, areas]);

  const max = Math.max(...s.days);
  const pts = s.days.map((d, i) => `${(i / 13) * 100},${100 - (d / max) * 86}`).join(' ');
  const srcMax = Math.max(...s.src.map((x) => x.v));
  const liveRows = live.map((e, i) => ({ id: `NEW-${live.length - i}`, name: e.name || 'Visitor', place: e.fields?.Location ?? e.fields?.Area ?? e.fields?.['Preferred locality'] ?? '—', want: Object.values(e.fields ?? {})[0] ?? (e.message || 'Enquiry'), from: 'Website', stage: bp.dashboard.stages[0]!, ago: 'Just now', live: true }));
  const rows = [...liveRows, ...s.rows.map((x) => ({ ...x, live: false }))];

  const table = (n: number) => (
    <article className="db-card">
      <header><h3>{n > 8 ? 'All enquiries' : 'Latest enquiries'}</h3><span className="db-tag">{live.length ? `${live.length} live from this demo` : 'Sample'}</span></header>
      <table className="db-table">
        <thead><tr><th>Enquiry</th><th>Name</th><th>Wants</th><th>Came from</th><th>Stage</th></tr></thead>
        <tbody>{rows.slice(0, n).map((x) => <tr key={x.id} className={x.live ? 'is-live' : ''}><td><b>{x.id}</b><small>{x.ago}</small></td><td>{x.name}<small>{x.place}</small></td><td>{x.want}</td><td>{x.from}</td><td><span className={`db-pill ${x.live ? 'is-new' : 'is-on'}`}>{x.stage}</span></td></tr>)}</tbody>
      </table>
    </article>
  );

  return (
    <div className="db">
      <aside className="db-side">
        <Link href={base} className="db-brand">{brand}<small>Owner dashboard</small></Link>
        <nav>{TABS.map((t) => <button key={t} type="button" className={t === tab ? 'is-on' : ''} onClick={() => setTab(t)}>{t}{t === 'Enquiries' && live.length ? <i>{live.length}</i> : null}</button>)}</nav>
        <p className="db-note">Powered by BYBO. Enquiries you make on this demo appear here live; other figures are sample data.</p>
      </aside>
      <section className="db-main">
        <header className="db-top">
          <div><p className="demo-kicker">Owner view</p><h1>{tab === 'Overview' ? `${brand} this week` : tab}</h1></div>
          <Link className="demo-btn is-small" href={base}>View site →</Link>
        </header>

        {tab === 'Overview' ? (
          <>
            <div className="db-kpis">{bp.dashboard.kpis.map(([label], i) => <article key={label}><span>{label}</span><b>{s.kpi[i]! + (i === 0 ? live.length : 0)}</b><em className={i === 0 && live.length ? 'up' : ''}>{i === 0 && live.length ? `${live.length} from this demo` : 'Sample'}</em></article>)}</div>
            <div className="db-grid">
              <article className="db-card db-chart">
                <header><h3>Enquiries, last 14 days</h3><span className="db-tag">Sample</span></header>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs><linearGradient id="svg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity=".35" /><stop offset="1" stopColor="var(--accent)" stopOpacity="0" /></linearGradient></defs>
                  <polygon points={`0,100 ${pts} 100,100`} fill="url(#svg)" />
                  <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                </svg>
              </article>
              <article className="db-card">
                <header><h3>Where enquiries come from</h3><span className="db-tag">Sample</span></header>
                <ul className="sv-bars">{s.src.map((x) => <li key={x.n}><span>{x.n}</span><i style={{ width: `${(x.v / srcMax) * 100}%` }} /><b>{x.v}</b></li>)}</ul>
              </article>
            </div>
            {table(6)}
          </>
        ) : null}

        {tab === 'Enquiries' ? table(30) : null}

        {tab === 'Pipeline' ? (
          <div className="sv-pipe">
            {bp.dashboard.stages.map((st, i) => (
              <div key={st} className="sv-pipe-col">
                <header><b>{st}</b><span>{s.stageN[i]! + (i === 0 ? live.length : 0)}</span></header>
                {rows.filter((x) => x.stage === st || (x.live && i === 0)).slice(0, 4).map((x) => <article key={x.id} className={x.live ? 'is-live' : ''}><b>{x.name}</b><small>{x.want}</small><em>{x.place} · {x.from}</em></article>)}
              </div>
            ))}
          </div>
        ) : null}

        {tab === 'Campaigns' ? (
          <article className="db-card">
            <header><h3>Campaigns</h3><span className="db-tag">Sample</span></header>
            <table className="db-table">
              <thead><tr><th>Campaign</th><th>Channel</th><th>Enquiries</th><th>Status</th></tr></thead>
              <tbody>{services.slice(0, 3).map((sv, i) => <tr key={sv}><td><b>{sv}</b></td><td>{bp.dashboard.sources[i % bp.dashboard.sources.length]}</td><td>{Math.round(s.src[i % s.src.length]!.v * 1.6)}</td><td><span className="db-pill is-on">Live</span></td></tr>)}
                <tr><td><b>Re-engage past enquiries</b></td><td>WhatsApp</td><td>{Math.round(s.kpi[1]! * 0.6)}</td><td><span className="db-pill is-on">Always on</span></td></tr></tbody>
            </table>
            <p className="db-empty">BYBO plans, runs and reports these every week, so you see which campaign brings which enquiry.</p>
          </article>
        ) : null}

        {tab === 'Automations' ? (
          <div className="db-autos">
            {bp.dashboard.automations.map(([t, d]) => (
              <article key={t} className="db-card db-auto">
                <div><h3>{t}</h3><p>{d}</p></div>
                <button type="button" role="switch" aria-checked={auto[t]} className={`db-switch ${auto[t] ? 'is-on' : ''}`} onClick={() => setAuto({ ...auto, [t]: !auto[t] })}><span /></button>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
