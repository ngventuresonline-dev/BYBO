import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Lightbulb, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/studio/Shared';
import { cardFor, collectionById, formatDate, insightCards, isLiveHref, readMinutes, type Guide, type GuideBlock, type InsightCard } from '@/lib/insights';
import { GuideContents } from './GuideContents';
import { GuideVisual } from './GuideVisual';
import { RichText } from './RichText';
import '@/components/studio/reference-pages.css';
import '@/components/studio/final-reference.css';
import './insights.css';

const EXAMPLE_PREFIX = /^illustrative example\s*[:–—-]\s*/i;

function Block({ block: b }: { block: GuideBlock }) {
  switch (b.type) {
    case 'p':
      return <p><RichText text={b.text} /></p>;
    case 'list': {
      const items = b.items.map(i => <li key={i}><RichText text={i} /></li>);
      return b.ordered ? <ol className="ga-list">{items}</ol> : <ul className="ga-list">{items}</ul>;
    }
    case 'example':
      return (
        <aside className="ga-example">
          <p className="ga-label">Illustrative example</p>
          <h3>{b.title.replace(EXAMPLE_PREFIX, '').replace(/^./, ch => ch.toUpperCase())}</h3>
          <p><RichText text={b.text} /></p>
        </aside>
      );
    case 'note':
      return (
        <aside className={`ga-note is-${b.tone}`}>
          {b.tone === 'caution' ? <TriangleAlert size={20} aria-hidden /> : <Lightbulb size={20} aria-hidden />}
          <div>
            <h3>{b.title}</h3>
            <p><RichText text={b.text} /></p>
          </div>
        </aside>
      );
    case 'table':
      return (
        <div className="ga-table" role="region" aria-label={b.caption} tabIndex={0}>
          <table>
            <caption>{b.caption}</caption>
            <thead><tr>{b.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th key={j} scope="row"><RichText text={c} /></th> : <td key={j}><RichText text={c} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      );
  }
}

export function InsightCardView({ card, headingLevel = 3 }: { card: InsightCard; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <article className="ic">
      <Link href={card.href} className="ic-link">
        <div className="ic-visual" aria-hidden="true">
          <Image src={`/images/${card.art}.webp`} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
        </div>
        <div className="ic-body">
          <p className="ic-meta">{collectionById[card.collection].name}<span>{card.readMinutes} min read</span></p>
          <H>{card.title}</H>
          <p>{card.excerpt}</p>
          <span className="ic-more">Read the article <ArrowRight size={16} aria-hidden /></span>
        </div>
      </Link>
    </article>
  );
}

export function GuideArticle({ guide: g }: { guide: Guide }) {
  const c = collectionById[g.collection];
  const contents = [
    { id: 'in-brief', label: 'In brief' },
    ...g.sections.map(s => ({ id: s.id, label: s.heading })),
    { id: 'limits', label: 'Where this has limits' },
    { id: 'questions', label: 'Questions' },
    { id: 'sources', label: 'Sources' },
  ];
  const chosen = g.related.map(cardFor).filter((x): x is InsightCard => Boolean(x));
  // Top up with published reading from the same collection first, so the row is never short.
  const related = [...chosen, ...insightCards
    .filter(c => c.slug !== g.slug && !chosen.includes(c))
    .sort((a, b) => Number(b.collection === g.collection) - Number(a.collection === g.collection))]
    .slice(0, 3);

  return (
    <article className="reference-page ga">
      <header className="ga-hero">
        <div className="container">
          <nav className="rp-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><Link href="/insights">Insights</Link><span>›</span><Link href={`/insights/topics/${c.id}`}>{c.name}</Link>
          </nav>
          <div className="ga-hero-grid">
            <div className="ga-hero-copy">
              <p className="eyebrow">{c.name}</p>
              <h1>{g.title}</h1>
              <p className="lede">{g.dek}</p>
              <p className="ga-meta">
                <span>BYBO Editorial</span>
                <time dateTime={g.publishedAt}>{formatDate(g.publishedAt)}</time>
                <span>{readMinutes(g)} min read</span>
              </p>
            </div>
            <GuideVisual visual={g.visual} />
          </div>
        </div>
      </header>

      <div className="ga-body rp-light">
        <div className="container ga-layout">
          <aside className="ga-aside"><GuideContents items={contents} /></aside>
          <div className="ga-main">
            <details className="ga-contents-mobile">
              <summary>Contents<span aria-hidden>+</span></summary>
              <ol>{contents.map(i => <li key={i.id}><a href={`#${i.id}`}>{i.label}</a></li>)}</ol>
            </details>

            <section id="in-brief" className="ga-brief" aria-labelledby="in-brief-title">
              <h2 id="in-brief-title">In brief</h2>
              <ul>{g.summary.map(s => <li key={s}><Check size={17} aria-hidden /><span><RichText text={s} /></span></li>)}</ul>
            </section>

            {g.sections.map(s => (
              <section id={s.id} key={s.id} className="ga-section">
                <h2>{s.heading}</h2>
                {s.blocks.map((b, i) => <Block key={i} block={b} />)}
              </section>
            ))}

            <section id="limits" className="ga-limits">
              <h2>Where this has limits</h2>
              <ul>{g.limitations.map(l => <li key={l}><RichText text={l} /></li>)}</ul>
            </section>

            <section id="questions" className="ga-faqs">
              <h2>Frequently asked questions</h2>
              {g.faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary><h3>{f.q}</h3><span aria-hidden>+</span></summary>
                  <p><RichText text={f.a} /></p>
                </details>
              ))}
            </section>

            <section className="ga-bybo" aria-labelledby="bybo-title">
              <h2 id="bybo-title">Where BYBO fits</h2>
              <div>
                {g.bybo.filter(b => isLiveHref(b.href)).map(b => (
                  <Link key={b.href} href={b.href} className="ga-bybo-link">
                    <strong>{b.label}</strong>
                    <span>{b.why}</span>
                    <ArrowRight size={18} aria-hidden />
                  </Link>
                ))}
              </div>
            </section>

            <section id="sources" className="ga-sources">
              <h2>Sources</h2>
              <ol>
                {g.sources.map(s => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
                    <span>{s.publisher}</span>
                  </li>
                ))}
              </ol>
              <p className="ga-disclaimer">
                General information for business readers, not legal, financial or regulatory advice. Examples are illustrative, not client work.
                Published {formatDate(g.publishedAt)}.
              </p>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="ga-related rp-light" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title">Related reading</h2>
            <div className="ic-grid">{related.map(r => <InsightCardView key={r.slug} card={r} />)}</div>
          </div>
        </section>
      )}

      <section className="fr-band">
        <div className="container">
          <h2>{c.cta.title}</h2>
          <Button href={c.cta.href}>{c.cta.label}</Button>
        </div>
      </section>
    </article>
  );
}
