import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { RichText } from '@/components/insights/RichText';
import { InsightCardView } from '@/components/insights/GuideArticle';
import { Button } from '@/components/studio/Shared';
import { cardFor, type InsightCard } from '@/lib/insights';
import { serviceDetails } from '@/lib/service-details';
import { services } from '@/lib/redesign';
import { SITE, siteUrl } from '@/lib/seo';
import { uniqueIconPicker } from './icons';
import './service-detail.css';

/** First sentence, for headline-style lead-ins. */
const lead = (text: string) => {
  const m = text.match(/^.*?[.?!](\s|$)/);
  return { head: (m ? m[0] : text).trim(), rest: m ? text.slice(m[0].length).trim() : '' };
};

/**
 * The landing-page body of a service page: the promise, the fit, what the client gets,
 * how the work runs, what it costs, how it is judged, and a route to an enquiry at every
 * scroll depth. Sits above the page's own closing call to action.
 */
export function ServiceDetail({ slug }: { slug: string }) {
  const d = serviceDetails[slug];
  if (!d) return null;
  const reading = d.reading.map(cardFor).filter((x): x is InsightCard => Boolean(x));
  const service = services.find(x => x.slug === d.slug);
  const enquiry = service ? `/apply?system=${service.slug}` : '/apply';
  const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const pick = uniqueIconPicker();
  const intro = lead(d.overview.paragraphs[0]);

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

      {/* Sound familiar? — the fit test, as a scannable strip */}
      <section className="sd-fit rp-light">
        <div className="container">
          <div className="sd-fit-head">
            <h2>{d.audience.heading}</h2>
            {d.audience.intro && <p><RichText text={d.audience.intro} /></p>}
          </div>
          <div className="sd-fit-grid">
            {d.audience.items.map((i, n) => {
              const Icon = pick(i, n);
              return (
                <div key={i}>
                  <Icon size={20} strokeWidth={1.6} aria-hidden />
                  <span><RichText text={i} /></span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The promise, with the illustration */}
      <section className="sd-open rp-light">
        <div className="container sd-open-grid">
          <div className="sd-copy">
            <p className="eyebrow">{d.overview.heading}</p>
            <p className="sd-lead"><RichText text={intro.head} /></p>
            {intro.rest && <p><RichText text={intro.rest} /></p>}
            <div className="sd-open-cols">
              {d.overview.paragraphs.slice(1).map(p => <p key={p}><RichText text={p} /></p>)}
            </div>
            <div className="actions sd-actions">
              <Button href={enquiry}>{service ? 'Discuss this system' : 'Talk to BYBO'}</Button>
              <Link className="sd-all" href="/blueprint">Start with a Blueprint <ArrowRight size={16} aria-hidden /></Link>
            </div>
          </div>
          <figure className="sd-art">
            <Image src={`/images/services/${d.slug}.webp`} alt="" width={1400} height={933} sizes="(max-width: 900px) 100vw, 42vw" />
          </figure>
        </div>
      </section>

      {/* What you get */}
      <section className="sd-deliverables rp-light">
        <div className="container">
          <div className="sd-band-head">
            <h2>{d.deliverables.heading}</h2>
            {d.deliverables.intro && <p><RichText text={d.deliverables.intro} /></p>}
          </div>
          <div className="sd-cards">
            {d.deliverables.items.map((i, n) => {
              const Icon = pick(`${i.title} ${i.body}`, n);
              return (
                <article key={i.title}>
                  <span className="sd-badge"><Icon size={20} strokeWidth={1.6} aria-hidden /></span>
                  <div>
                    <h3>{i.title}</h3>
                    <p><RichText text={i.body} /></p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How the work runs */}
      <section className="sd-process">
        <div className="container">
          <div className="sd-band-head is-dark">
            <h2>{d.process.heading}</h2>
            {d.process.intro && <p><RichText text={d.process.intro} /></p>}
          </div>
          <ol className="sd-steps">
            {d.process.items.map((i, n) => {
              const last = n === d.process.items.length - 1;
              const { head, rest } = lead(i.body);
              return (
                <li key={i.title} className={last ? 'is-gate' : undefined}>
                  <span className="sd-step-no">{`0${n + 1}`}</span>
                  <h3>{i.title.replace(/^\d+[.)]\s*/, '')}</h3>
                  <p>{head}</p>
                  {rest && <p className="sd-step-more">{rest}</p>}
                </li>
              );
            })}
          </ol>
          <div className="sd-cta">
            <p>Bring one workflow. We will tell you whether it is worth building.</p>
            <Button href={enquiry}>Talk to BYBO</Button>
          </div>
        </div>
      </section>

      {/* Connects / what you provide, as chips */}
      <section className="sd-two rp-light">
        <div className="container sd-two-grid">
          <div className="sd-panel">
            <h2>{d.connects.heading}</h2>
            <p><RichText text={d.connects.body} /></p>
            <ul className="sd-chips">
              {d.connects.items.map((i, n) => {
                const Icon = pick(i, n);
                return <li key={i}><Icon size={17} strokeWidth={1.7} aria-hidden /><span><RichText text={i} /></span></li>;
              })}
            </ul>
          </div>
          <div className="sd-panel is-quiet">
            <h2>{d.bring.heading}</h2>
            {d.bring.intro && <p><RichText text={d.bring.intro} /></p>}
            <ul className="sd-chips">
              {d.bring.items.map((i, n) => {
                const Icon = pick(i, n);
                return <li key={i}><Icon size={17} strokeWidth={1.7} aria-hidden /><span><RichText text={i} /></span></li>;
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Cost and measures side by side */}
      <section className="sd-money rp-light">
        <div className="container sd-money-grid">
          <div className="sd-cost-card">
            <p className="eyebrow">Investment</p>
            <h2>{d.cost.heading}</h2>
            {d.cost.paragraphs.map(p => <p key={p}><RichText text={p} /></p>)}
            <h3>What moves the cost</h3>
            <ul>{d.cost.drivers.map(i => <li key={i}><RichText text={i} /></li>)}</ul>
          </div>
          <div className="sd-measure-card">
            <p className="eyebrow">Measured against your baseline</p>
            <h2>{d.measure.heading}</h2>
            <p><RichText text={d.measure.body} /></p>
            <ul className="sd-measures">
              {d.measure.items.map((i, n) => {
                const Icon = pick(i, n);
                return <li key={i}><Icon size={18} strokeWidth={1.6} aria-hidden /><span><RichText text={i} /></span></li>;
              })}
            </ul>
            <div className="sd-control">
              <ShieldCheck size={20} strokeWidth={1.6} aria-hidden />
              <div>
                <h3>{d.control.heading}</h3>
                <p><RichText text={d.control.body} /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="sd-faqs rp-light">
        <div className="container sd-faq-grid">
          <div className="sd-faq-head">
            <p className="eyebrow">Questions</p>
            <h2>Before you enquire</h2>
            <p>If yours is not here, ask us. The first conversation is free.</p>
            <Button href={enquiry}>Talk to BYBO</Button>
          </div>
          <div className="sd-faq-list">
            {d.faqs.map(f => (
              <details key={f.q}>
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
