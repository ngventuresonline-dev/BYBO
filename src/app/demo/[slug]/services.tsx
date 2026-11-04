/* eslint-disable @next/next/no-img-element -- concept visuals made for the demo */
import Link from 'next/link';
import type { DemoContent } from '@/lib/crm/autopilot';
import type { Blueprint } from '@/lib/crm/blueprints';
import { pad } from './data';
import { WorkGrid } from './service-client';

type Props = { c: DemoContent; bp: Blueprint; base: string };

/** What they offer as stacked chapters: each card pins and the next slides over it. */
export function ServicesBlock({ c, bp, base, full }: Props & { full?: boolean }) {
  const list = c.services ?? [];
  if (!list.length) return null;
  return (
    <section className={`sv-services is-${c.layout?.services ?? 'stack'}${full ? ' is-full' : ''}`} id="services" data-chapter="services">
      {full ? null : (
        <div className="sv-head" data-reveal>
          <p className="demo-kicker">What we do</p>
          <h2>{bp.servicesLabel}</h2>
          <Link className="sv-more" href={`${base}/services`}>All {bp.servicesLabel.toLowerCase()} →</Link>
        </div>
      )}
      <div className="sv-stack">
        {list.map((s, i) => (
          <article key={s.title} className="sv-card" style={{ '--i': i } as React.CSSProperties}>
            <div className="sv-card-img">{s.image ? <img src={s.image} alt={s.title} loading={i < 2 ? 'eager' : 'lazy'} data-speed={c.layout?.services === 'rows' ? 0.06 : undefined} /> : <span className="sv-card-blank" />}</div>
            <div className="sv-card-copy">
              <span className="sv-no">{pad(i + 1)} <i>/ {pad(list.length)}</i></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.points.length ? <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul> : null}
              {s.price || s.duration ? <p className="sv-meta">{[s.duration, s.price].filter(Boolean).join(' · ')}</p> : null}
              <Link className="demo-btn is-small" href={`${base}/contact?s=${encodeURIComponent(s.title)}`}>{bp.cta.primary}</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** A menu: treatments or dishes grouped by category, with time and price where known. */
export function MenuBlock({ c, bp, base, full }: Props & { full?: boolean }) {
  const list = c.services ?? [];
  if (!list.length) return null;
  const groups = [...new Set(list.map((s) => s.category || bp.servicesLabel))];
  const art = list.filter((s) => s.image).slice(0, 3);
  return (
    <section className={`sv-menu${full ? ' is-full' : ''}`} id="services" data-chapter="services">
      <div className="sv-menu-art" aria-hidden="true">{art.map((s, i) => <img key={s.title} src={s.image!} alt="" style={{ '--i': i } as React.CSSProperties} data-speed={[0.06, -0.05, 0.1][i]} />)}</div>
      <div className="sv-menu-list">
        {full ? null : <div className="sv-head" data-reveal><p className="demo-kicker">The menu</p><h2>{bp.servicesLabel}</h2></div>}
        {groups.map((g) => (
          <div key={g} className="sv-menu-group" data-reveal>
            <h3>{g}</h3>
            {list.filter((s) => (s.category || bp.servicesLabel) === g).map((s) => (
              <Link key={s.title} href={`${base}/contact?s=${encodeURIComponent(s.title)}`} className="sv-menu-row">
                <span><b>{s.title}</b><small>{s.text}</small></span>
                <i aria-hidden="true" />
                <em>{[s.duration, s.price].filter(Boolean).join(' · ') || 'Ask us'}</em>
              </Link>
            ))}
          </div>
        ))}
        {full ? null : <Link className="demo-btn" href={`${base}/contact`}>{bp.cta.primary}</Link>}
      </div>
    </section>
  );
}

/** Proof of work on the home page: a staggered grid that leads to the full page. */
export function WorkBlock({ c, bp, base }: Props) {
  const list = (c.work ?? []).filter((w) => w.image);
  if (!list.length) return null;
  return (
    <section className="sv-work" id="work" data-chapter="work">
      <div className="sv-head" data-reveal>
        <p className="demo-kicker">Selected</p>
        <h2>{bp.workLabel}</h2>
        <Link className="sv-more" href={`${base}/work`}>View all →</Link>
      </div>
      <WorkGrid items={list.slice(0, 6)} filters={false} rail={c.layout?.work === 'rail'} />
      {c.work_note ? <p className="sv-note">{c.work_note}</p> : null}
    </section>
  );
}
