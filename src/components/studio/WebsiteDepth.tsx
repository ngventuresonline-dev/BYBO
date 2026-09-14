import Link from 'next/link';
import { ArrowUpRight, Check, CircleAlert } from 'lucide-react';
import { RichText } from '@/components/insights/RichText';
import { InsightCardView } from '@/components/insights/GuideArticle';
import { cardFor, type InsightCard } from '@/lib/insights';
import { serviceDetails } from '@/lib/service-details';
import './website-depth.css';

/**
 * The substance the studio page needs beside its cinematic sections: what you
 * receive, what we need from you, where you decide, what it connects to, how it
 * is judged and what to read. Written in the studio's own dark language rather
 * than the cream service-detail one, so the page stays a single piece.
 */
export function WebsiteDepth() {
  const d = serviceDetails['website-design-development'];
  if (!d) return null;
  const cards = d.reading.map(cardFor).filter((c): c is InsightCard => Boolean(c));

  return (
    <>
      {/* what you receive */}
      <section className="wd-give" aria-labelledby="wd-give-title">
        <div className="container">
          <div className="wc-section-top">
            <div><p className="eyebrow">WHAT YOU RECEIVE</p><h2 id="wd-give-title">Not a mock-up.<br /><em>A website that is live.</em></h2></div>
            <p>{d.deliverables.intro ?? 'Every one of these is handed over, including the parts that let your team carry on without us.'}</p>
          </div>
          <div className="wd-give-grid">
            {d.deliverables.items.map((item, i) => (
              <article key={item.title} className="wd-give-card">
                <span className="wd-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* where you decide */}
      <section className="wd-control" aria-labelledby="wd-control-title">
        <div className="container">
          <div>
            <p className="eyebrow"><CircleAlert size={14} aria-hidden /> {d.control.heading}</p>
            <h2 id="wd-control-title">Nothing goes live<br /><em>until you have seen it.</em></h2>
          </div>
          <p className="wd-control-body"><RichText text={d.control.body} /></p>
        </div>
      </section>

      {/* what we need + what it connects to */}
      <section className="wd-two" aria-labelledby="wd-two-title">
        <div className="container">
          <div className="wd-col">
            <p className="eyebrow">{d.bring.heading}</p>
            <h2 id="wd-two-title">What we need from you.</h2>
            <p className="wd-col-lede">{d.bring.intro ?? 'None of it technical. The work goes faster when these arrive early.'}</p>
            <ol className="wd-bring">
              {d.bring.items.map((x, i) => <li key={x}><span>{String(i + 1).padStart(2, '0')}</span><p>{x}</p></li>)}
            </ol>
          </div>
          <div className="wd-col">
            <p className="eyebrow">{d.connects.heading}</p>
            <h2>What it connects to.</h2>
            <p className="wd-col-lede">{d.connects.body}</p>
            <ul className="wd-connects">
              {d.connects.items.map(x => <li key={x}><Check size={16} aria-hidden />{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* how it is judged */}
      <section className="wd-measure" aria-labelledby="wd-measure-title">
        <div className="container">
          <div className="wc-section-top">
            <div><p className="eyebrow">{d.measure.heading}</p><h2 id="wd-measure-title">A website is judged<br /><em>on what people do on it.</em></h2></div>
            <p>{d.measure.body}</p>
          </div>
          <div className="wd-measure-grid">
            {d.measure.items.map((x, i) => {
              const [head, ...rest] = x.split(/,\s*/);
              return <div key={x} className="wd-measure-card"><span>{String(i + 1).padStart(2, '0')}</span><h3>{head}</h3>{rest.length > 0 && <p>{rest.join(', ')}</p>}</div>;
            })}
          </div>
        </div>
      </section>

      {/* read more */}
      {cards.length > 0 && (
        <section className="wd-reading" aria-labelledby="wd-reading-title">
          <div className="container">
            <div className="wc-section-top">
              <div><p className="eyebrow">READ MORE ON THIS</p><h2 id="wd-reading-title">Before you commit<br /><em>to anything.</em></h2></div>
              <Link className="wd-all" href="/insights">All insights <ArrowUpRight size={17} aria-hidden /></Link>
            </div>
            <div className="ic-grid">{cards.map(c => <InsightCardView key={c.slug} card={c} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
