import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, BookOpen, Boxes, ClipboardCheck, Clock, Coins, Database, FileSearch, FileText,
  Gauge, KeyRound, LayoutGrid, LineChart, ListChecks, type LucideIcon, MessageCircle, Plug,
  Route, ScrollText, Settings, ShieldCheck, Sparkles, Target, UserRound, Users, Workflow,
} from 'lucide-react';
import { RichText } from '@/components/insights/RichText';
import { InsightCardView } from '@/components/insights/GuideArticle';
import { cardFor, type InsightCard } from '@/lib/insights';
import { serviceDetails } from '@/lib/service-details';
import { services } from '@/lib/redesign';
import { SITE, siteUrl } from '@/lib/seo';
import './service-detail.css';

/** Icons cycle through each list, so every item is marked without icons living in the copy. */
const DELIVERABLE_ICONS: LucideIcon[] = [Workflow, ClipboardCheck, ShieldCheck, LineChart, BookOpen, Users];
const STEP_ICONS: LucideIcon[] = [FileSearch, Route, Boxes, Users, Gauge];
const CONNECT_ICONS: LucideIcon[] = [Database, MessageCircle, LayoutGrid, FileText, Settings, Plug];
const BRING_ICONS: LucideIcon[] = [ScrollText, KeyRound, UserRound, ListChecks, Target];
const MEASURE_ICONS: LucideIcon[] = [Clock, Gauge, ListChecks, LineChart, Target, Coins];

/**
 * The long-form part of a service page: what the service is, who it suits, what BYBO
 * delivers, how the work runs, what it costs and how it is judged. Written for a visitor
 * arriving cold, so it sits above the page's closing call to action.
 */
export function ServiceDetail({ slug }: { slug: string }) {
  const d = serviceDetails[slug];
  if (!d) return null;
  const reading = d.reading.map(cardFor).filter((x): x is InsightCard => Boolean(x));
  const service = services.find(x => x.slug === d.slug);
  const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: d.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
    },
    ...(service ? [{
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      serviceType: service.short,
      description: plain(d.overview.paragraphs[0]),
      url: siteUrl(`/systems/${service.slug}`),
      areaServed: { '@type': 'Country', name: 'India' },
      provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    }] : []),
  ];

  return (
    <div className="sd">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

      <section className="sd-open rp-light">
        <div className="container sd-open-grid">
          <div className="sd-copy">
            <p className="eyebrow">In detail</p>
            <h2>{d.overview.heading}</h2>
            {d.overview.paragraphs.map(p => <p key={p}><RichText text={p} /></p>)}
          </div>
          <div className="sd-open-side">
            <figure className="sd-art">
              <Image src={`/images/services/${d.slug}.webp`} alt="" width={1400} height={933} sizes="(max-width: 900px) 100vw, 40vw" />
            </figure>
            <aside className="sd-audience">
              <h3><Sparkles size={15} aria-hidden />{d.audience.heading}</h3>
              {d.audience.intro && <p><RichText text={d.audience.intro} /></p>}
              <ul>{d.audience.items.map(i => <li key={i}><RichText text={i} /></li>)}</ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="sd-deliverables rp-light">
        <div className="container">
          <h2>{d.deliverables.heading}</h2>
          {d.deliverables.intro && <p className="sd-lede"><RichText text={d.deliverables.intro} /></p>}
          <div className="sd-cards">
            {d.deliverables.items.map((i, n) => {
              const Icon = DELIVERABLE_ICONS[n % DELIVERABLE_ICONS.length];
              return (
                <article key={i.title}>
                  <span className="sd-badge"><Icon size={21} strokeWidth={1.6} aria-hidden /></span>
                  <h3>{i.title}</h3>
                  <p><RichText text={i.body} /></p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sd-process">
        <div className="container">
          <h2>{d.process.heading}</h2>
          {d.process.intro && <p className="sd-lede"><RichText text={d.process.intro} /></p>}
          <ol className="sd-steps">
            {d.process.items.map((i, n) => {
              const Icon = STEP_ICONS[n % STEP_ICONS.length];
              const last = n === d.process.items.length - 1;
              return (
                <li key={i.title} className={last ? 'is-gate' : undefined}>
                  <span className="sd-step-top">
                    <span className="sd-step-icon"><Icon size={19} strokeWidth={1.6} aria-hidden /></span>
                    <span className="sd-step-no">{`0${n + 1}`}</span>
                  </span>
                  <h3>{i.title}</h3>
                  <p><RichText text={i.body} /></p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="sd-two rp-light">
        <div className="container sd-two-grid">
          <div className="sd-panel">
            <h2><span className="sd-badge"><Plug size={20} strokeWidth={1.6} aria-hidden /></span>{d.connects.heading}</h2>
            <p><RichText text={d.connects.body} /></p>
            <ul className="sd-ticks">
              {d.connects.items.map((i, n) => {
                const Icon = CONNECT_ICONS[n % CONNECT_ICONS.length];
                return <li key={i}><Icon size={18} strokeWidth={1.7} aria-hidden /><span><RichText text={i} /></span></li>;
              })}
            </ul>
          </div>
          <div className="sd-panel">
            <h2><span className="sd-badge"><ClipboardCheck size={20} strokeWidth={1.6} aria-hidden /></span>{d.bring.heading}</h2>
            {d.bring.intro && <p><RichText text={d.bring.intro} /></p>}
            <ul className="sd-ticks">
              {d.bring.items.map((i, n) => {
                const Icon = BRING_ICONS[n % BRING_ICONS.length];
                return <li key={i}><Icon size={18} strokeWidth={1.7} aria-hidden /><span><RichText text={i} /></span></li>;
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="sd-cost rp-light">
        <div className="container sd-cost-grid">
          <div className="sd-copy">
            <p className="eyebrow"><Coins size={14} aria-hidden />Investment</p>
            <h2>{d.cost.heading}</h2>
            {d.cost.paragraphs.map(p => <p key={p}><RichText text={p} /></p>)}
          </div>
          <aside>
            <h3>What moves the cost</h3>
            <ul>{d.cost.drivers.map(i => <li key={i}><RichText text={i} /></li>)}</ul>
          </aside>
        </div>
      </section>

      <section className="sd-measure">
        <div className="container">
          <h2>{d.measure.heading}</h2>
          <p className="sd-lede"><RichText text={d.measure.body} /></p>
          <div className="sd-measures">
            {d.measure.items.map((i, n) => {
              const Icon = MEASURE_ICONS[n % MEASURE_ICONS.length];
              return <div key={i}><Icon size={20} strokeWidth={1.6} aria-hidden /><span><RichText text={i} /></span></div>;
            })}
          </div>
          <div className="sd-control">
            <ShieldCheck size={22} strokeWidth={1.6} aria-hidden />
            <div>
              <h3>{d.control.heading}</h3>
              <p><RichText text={d.control.body} /></p>
            </div>
          </div>
        </div>
      </section>

      <section className="sd-faqs rp-light">
        <div className="container sd-faq-grid">
          <div className="sd-faq-head">
            <p className="eyebrow">Questions</p>
            <h2>Before you enquire</h2>
            <p>If yours is not here, ask us. The first conversation is free.</p>
            <Link className="sd-all" href="/apply">Talk to BYBO <ArrowRight size={16} aria-hidden /></Link>
          </div>
          <div className="sd-faq-list">
            {d.faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary><h3>{f.q}</h3><span aria-hidden>+</span></summary>
                <p><RichText text={f.a} /></p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {reading.length > 0 && (
        <section className="sd-reading rp-light">
          <div className="container">
            <div className="sd-reading-head">
              <h2>Read more on this</h2>
              <Link className="sd-all" href="/insights">All insights <ArrowRight size={16} aria-hidden /></Link>
            </div>
            <div className="ic-grid">{reading.map(c => <InsightCardView key={c.slug} card={c} />)}</div>
          </div>
        </section>
      )}
    </div>
  );
}
