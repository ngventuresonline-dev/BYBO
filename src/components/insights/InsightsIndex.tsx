import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/studio/Shared';
import { cardsIn, collectionById, collections, type CollectionId } from '@/lib/insights';
import { InsightCardView } from './GuideArticle';
import '@/components/studio/reference-pages.css';
import '@/components/studio/final-reference.css';
import './insights.css';

const PER_COLLECTION = 3;

function CollectionNav({ current }: { current?: CollectionId }) {
  return (
    <nav className="ii-chips" aria-label="Insight collections">
      <Link href="/insights" aria-current={current ? undefined : 'page'}>All</Link>
      {collections.map(c => (
        <Link key={c.id} href={`/insights/topics/${c.id}`} aria-current={current === c.id ? 'page' : undefined}>
          {c.name}<span>{cardsIn(c.id).length}</span>
        </Link>
      ))}
    </nav>
  );
}

export function InsightsIndex() {
  return (
    <div className="reference-page fr-insights ii">
      <header className="rp-hero fr-editorial-hero">
        <Image src="/images/insights-hero.webp" alt="" fill priority sizes="100vw" className="rp-hero-image" />
        <div className="container">
          <nav className="rp-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>Insights</span></nav>
          <div className="rp-hero-copy">
            <h1>Better questions.<br />Better systems.</h1>
            <p className="lede">Practical reading for the people deciding what to build, who should approve it and how to tell if it works.</p>
          </div>
        </div>
      </header>

      <section className="rp-light ii-intro">
        <div className="container">
          <p className="eyebrow">Five collections</p>
          <h2>Start with the decision in front of you.</h2>
          <CollectionNav />
        </div>
      </section>

      {collections.map((c, i) => {
        const cards = cardsIn(c.id);
        if (!cards.length) return null;
        return (
          <section key={c.id} id={c.id} className="rp-light ii-collection" aria-labelledby={`${c.id}-title`}>
            <div className="container">
              <div className="ii-heading">
                <div>
                  <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
                  <h2 id={`${c.id}-title`}>{c.name}</h2>
                  <p>{c.short}</p>
                </div>
                <Link className="ii-all" href={`/insights/topics/${c.id}`}>
                  {cards.length > PER_COLLECTION ? `All ${cards.length} articles` : 'View the collection'} <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
              <div className="ic-grid">{cards.slice(0, PER_COLLECTION).map(card => <InsightCardView key={card.slug} card={card} />)}</div>
            </div>
          </section>
        );
      })}

      <section className="rp-light fr-insights-close">
        <div className="container">
          <div>
            <h2>Put the framework to work<br />on your business.</h2>
            <p>A Blueprint starts with your records and your recurring work.</p>
            <div className="actions"><Button href="/blueprint">Explore the Blueprint</Button><Button href="/apply" secondary>Talk to BYBO</Button></div>
          </div>
          <Image src="/images/method-roles.webp" alt="" width={1200} height={760} sizes="(max-width:760px) 100vw, 50vw" />
        </div>
      </section>
    </div>
  );
}

export function InsightsTopic({ id }: { id: CollectionId }) {
  const c = collectionById[id];
  const cards = cardsIn(id);
  return (
    <div className="reference-page ii">
      <header className="ga-hero it-hero">
        <div className="container">
          <nav className="rp-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/insights">Insights</Link><span>›</span><span>{c.name}</span></nav>
          <div className="it-hero-copy">
            <p className="eyebrow">Collection · {cards.length} {cards.length === 1 ? 'article' : 'articles'}</p>
            <h1>{c.name}</h1>
            <p className="lede">{c.intro}</p>
          </div>
        </div>
      </header>
      <section className="rp-light ii-collection it-list" aria-label={`${c.name} articles`}>
        <div className="container">
          <CollectionNav current={id} />
          <div className="ic-grid">{cards.map(card => <InsightCardView key={card.slug} card={card} headingLevel={2} />)}</div>
        </div>
      </section>
      <section className="fr-band">
        <div className="container">
          <h2>{c.cta.title}</h2>
          <Button href={c.cta.href}>{c.cta.label}</Button>
        </div>
      </section>
    </div>
  );
}
