import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, CircleAlert } from 'lucide-react';
import { Button } from '@/components/studio/Shared';
import { RichText } from '@/components/insights/RichText';
import { InsightCardView } from '@/components/insights/GuideArticle';
import { cardFor, type InsightCard } from '@/lib/insights';
import { serviceDetails } from '@/lib/service-details';
import { worked } from '@/lib/service-details/worked';
import { services } from '@/lib/redesign';
import { SITE, siteUrl } from '@/lib/seo';
import { WorkedExample } from './WorkedExample';
import { uniqueIconPicker } from '@/components/service-detail/icons';
import './system-landing.css';

const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/** Splits a two-line heading written with a newline. */
function TwoLine({ text }: { text: string }) {
  const [a, b] = text.split('\n');
  return b ? <>{a}<br />{b}</> : <>{a}</>;
}

export function SystemLanding({ slug }: { slug: string }) {
  const d = serviceDetails[slug];
  const s = services.find(x => x.slug === slug);
  const w = worked[slug];
  if (!d || !s) return null;

  const enquiry = `/apply?system=${slug}`;
  const cards = d.reading.map(cardFor).filter((c): c is InsightCard => Boolean(c));
  const pickAudience = uniqueIconPicker();
  const pickDeliverable = uniqueIconPicker();

  const schema = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: d.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })) },
    {
      '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.short,
      description: plain(d.overview.paragraphs[0]), url: siteUrl(`/systems/${slug}`),
      areaServed: { '@type': 'Country', name: 'India' },
      provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    },
  ];

  return (
    <div className="sl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

      {/* 1 — hero */}
      <header className="sl-hero">
        <Image src={`/images/services/${slug}.webp`} alt="" fill priority sizes="100vw" className="sl-hero-art" />
        <div className="container">
          <nav className="sl-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/systems">Systems</Link><span>›</span><span>{s.name}</span></nav>
          <p className="eyebrow">{s.name}</p>
          <h1>{s.headline}</h1>
          <p className="sl-lede">{s.description}</p>
          <div className="sl-hero-actions">
            <Button href={enquiry}>Discuss this system</Button>
            {w && <a className="sl-quiet" href="#worked">See it work <ArrowRight size={16} aria-hidden /></a>}
          </div>
        </div>
      </header>

      {/* 2 — signs this fits */}
      <section className="sl-fit" aria-labelledby="sl-fit-title">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">{d.audience.heading}</p><h2 id="sl-fit-title">You will recognise<br />at least two of these.</h2></div>
            <p>{d.audience.intro ?? 'If none of them sound like your week, this is probably not the system you need — and we will say so.'}</p>
          </div>
          <div className="sl-fit-grid">
            {d.audience.items.map(item => {
              const Icon = pickAudience(item);
              return <div key={item} className="sl-fit-card"><Icon size={30} strokeWidth={1.6} aria-hidden /><p>{item}</p></div>;
            })}
          </div>
        </div>
      </section>

      {/* 3 — what this system does */}
      <section className="sl-overview" aria-labelledby="sl-overview-title">
        <div className="container">
          <div className="sl-overview-copy">
            <p className="eyebrow">{d.overview.heading}</p>
            <h2 id="sl-overview-title">{s.short}</h2>
            {d.overview.paragraphs.map((p, i) => <p key={i} className="sl-para"><RichText text={p} /></p>)}
          </div>
          <aside className="sl-panel">
            <p className="eyebrow">In one line</p>
            <p className="sl-panel-line">{s.headline}</p>
            <dl>
              {s.outcomes.map(([t, b]) => <div key={t}><dt>{t}</dt><dd>{b}</dd></div>)}
            </dl>
            <Button href={enquiry}>Discuss this system</Button>
          </aside>
        </div>
      </section>

      {/* 4 — the worked example */}
      {w && <div id="worked"><WorkedExample w={w} /></div>}

      {/* 5 — where it is used */}
      <section className="sl-uses" aria-labelledby="sl-uses-title">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">Where it is used</p><h2 id="sl-uses-title">Four shapes of<br />the same problem.</h2></div>
            <p>Most businesses start with one and add the second once the queue, the logging and the connections already exist.</p>
          </div>
          <div className="sl-uses-grid">
            {s.uses.map(([t, b], i) => (
              <article key={t} className="sl-use">
                <div className={`sl-use-art sl-use-art-${i}`} aria-hidden><span /><span /><span /></div>
                <div className="sl-use-copy"><h3>{t}</h3><p>{b}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — how the work runs */}
      <section className="sl-flow" aria-labelledby="sl-flow-title">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">{d.process.heading}</p><h2 id="sl-flow-title">Five steps.<br />One of them is yours.</h2></div>
            <p>{d.process.intro ?? 'Every stage is recorded, so nothing is silently dropped or done twice.'}</p>
          </div>
          <ol className="sl-track" style={{ ['--gate' as string]: String(s.gate) }}>
            {d.process.items.map((item, i) => (
              <li key={item.title} className={i === s.gate ? "is-gate" : undefined}>
                <span className="sl-track-dot">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title.replace(/^\d+[.)]\s*/, '')}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — where a person decides */}
      <section className="sl-control" aria-labelledby="sl-control-title">
        <div className="container">
          <div className="sl-control-head">
            <p className="eyebrow"><CircleAlert size={14} aria-hidden /> {d.control.heading}</p>
            <h2 id="sl-control-title">{s.gateNote}</h2>
            <p>The line is yours to draw, and we write it down before anything runs.</p>
          </div>
          <div className="sl-control-body"><p><RichText text={d.control.body} /></p></div>
        </div>
      </section>

      {/* 8 — what you receive */}
      <section className="sl-give" aria-labelledby="sl-give-title">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">{d.deliverables.heading}</p><h2 id="sl-give-title">{d.deliverables.items.length} things, and<br />they are all yours.</h2></div>
            <p>{d.deliverables.intro ?? 'Not a demo and a slide deck. A running system, the evidence it works, and the documentation to run it without us.'}</p>
          </div>
          <div className="sl-give-grid">
            {d.deliverables.items.map((item, i) => {
              const Icon = pickDeliverable(item.title);
              return (
                <article key={item.title} className={`sl-give-card ${i < 2 ? 'is-wide' : ''}`}>
                  <Icon size={26} strokeWidth={1.6} aria-hidden />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9 — what we need from you */}
      <section className="sl-bring" aria-labelledby="sl-bring-title">
        <div className="container">
          <div className="sl-bring-head">
            <p className="eyebrow">{d.bring.heading}</p>
            <h2 id="sl-bring-title">{d.bring.items.length} things, and none<br />of them technical.</h2>
            <p>{d.bring.intro ?? 'You do not need a developer. You need someone who knows how the work really happens, including the exceptions nobody wrote down.'}</p>
          </div>
          <ol className="sl-bring-list">
            {d.bring.items.map((item, i) => (
              <li key={item}><span>{String(i + 1).padStart(2, '0')}</span><p>{item}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10 — what it connects to */}
      <section className="sl-connects" aria-labelledby="sl-connects-title">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">{d.connects.heading}</p><h2 id="sl-connects-title">Built around what<br />you already run.</h2></div>
            <p>{d.connects.body}</p>
          </div>
          <ul className="sl-connects-list">
            {d.connects.items.map(item => <li key={item}><Check size={17} aria-hidden />{item}</li>)}
          </ul>
        </div>
      </section>

      {/* 11 — how it is judged */}
      <section className="sl-measure" aria-labelledby="sl-measure-title">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">{d.measure.heading}</p><h2 id="sl-measure-title">{d.measure.items.length} numbers, taken<br />before we build.</h2></div>
            <p>{d.measure.body}</p>
          </div>
          <div className="sl-measure-grid">
            {d.measure.items.map((item, i) => {
              const [head, ...rest] = item.split(/,\s*/);
              return <div key={item} className="sl-measure-card"><span>{String(i + 1).padStart(2, '0')}</span><h3>{head}</h3>{rest.length > 0 && <p>{rest.join(', ')}</p>}</div>;
            })}
          </div>
        </div>
      </section>

      {/* 12 — what drives the cost */}
      <section className="sl-cost" aria-labelledby="sl-cost-title">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">{d.cost.heading}</p><h2 id="sl-cost-title">No price here,<br />and here is why.</h2></div>
            <p>The honest answer depends on your work and your systems. Scope and fee are agreed in writing before paid work begins, and the first conversation costs nothing.</p>
          </div>
          <div className="sl-cost-grid">
            <div className="sl-cost-prose">
              {d.cost.paragraphs.map((p, i) => <p key={i}><RichText text={p} /></p>)}
              <div className="sl-cost-split">
                <div><p className="eyebrow">Once</p><p>Design and build of the system</p></div>
                <div className="is-running"><p className="eyebrow">Every month</p><p>Running it, the review time it still needs, and monitoring</p></div>
              </div>
            </div>
            <aside className="sl-cost-drivers">
              <p className="eyebrow">What moves the number</p>
              <ul>{d.cost.drivers.map(x => <li key={x}>{x}</li>)}</ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 13 — FAQ */}
      <section className="sl-faq" aria-labelledby="sl-faq-title">
        <div className="container">
          <div className="sl-faq-head">
            <p className="eyebrow">Before you enquire</p>
            <h2 id="sl-faq-title">{d.faqs.length} questions we<br />are asked every time.</h2>
            <p>Answered plainly, including the ones with an uncomfortable answer.</p>
            <Button href={enquiry}>Discuss this system</Button>
          </div>
          <div className="sl-faq-list">
            {d.faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary><h3>{f.q}</h3><span aria-hidden>+</span></summary>
                <p><RichText text={f.a} /></p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 14 — read more */}
      {cards.length > 0 && (
        <section className="sl-reading" aria-labelledby="sl-reading-title">
          <div className="container">
            <div className="sl-top">
              <div><p className="eyebrow">Read more on this</p><h2 id="sl-reading-title">Before you commit<br />to anything.</h2></div>
              <Link className="sl-quiet" href="/insights">All insights <ArrowRight size={16} aria-hidden /></Link>
            </div>
            <div className="ic-grid">{cards.map(c => <InsightCardView key={c.slug} card={c} />)}</div>
          </div>
        </section>
      )}

      {/* 15 — close */}
      <section className="sl-close">
        <div className="container">
          <div>
            <h2><TwoLine text={closingFor(slug)} /></h2>
            <p>We will tell you whether it is worth building — including when it is not.</p>
          </div>
          <Button href={enquiry}>Discuss this system</Button>
        </div>
      </section>
    </div>
  );
}

/** One closing line per system, in the language of that system's work. */
function closingFor(slug: string) {
  const lines: Record<string, string> = {
    'document-multimodal-intelligence': 'Bring us the document\nyour team keeps retyping.',
    'agentic-operations': 'Bring us the request that\nkeeps bouncing between teams.',
    'enterprise-knowledge-systems': 'Bring us the question\neveryone asks one person.',
    'custom-ai-platforms': 'Bring us the way you work\nthat no product supports.',
    'customer-workforce-ai': 'Bring us the conversation\nyour team has every day.',
    'decision-intelligence': 'Bring us the number\nnobody can agree on.',
    'ai-infrastructure-governance': 'Bring us the system\nnobody wants to be responsible for.',
  };
  return lines[slug] ?? 'Bring us one recurring\nproblem worth solving.';
}
