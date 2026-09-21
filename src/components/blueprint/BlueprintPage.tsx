import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/studio/Shared';
import { RichText } from '@/components/insights/RichText';
import { InsightCardView } from '@/components/insights/GuideArticle';
import { cardFor, type InsightCard } from '@/lib/insights';
import { SITE, siteUrl } from '@/lib/seo';
import * as bp from '@/lib/blueprint';
import '@/components/system-landing/system-landing.css';
import './blueprint.css';

const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
const ENQUIRE = '/apply?interest=blueprint';

export function BlueprintPage() {
  const cards = bp.reading.map(cardFor).filter((c): c is InsightCard => Boolean(c));

  const schema = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: bp.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) },
    {
      '@context': 'https://schema.org', '@type': 'Service',
      name: 'AI Opportunity Blueprint', serviceType: 'Diagnostic and roadmap',
      description: plain(bp.overview[0]), url: siteUrl('/blueprint'),
      areaServed: { '@type': 'Country', name: 'India' },
      provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    },
  ];

  return (
    <div className="sl bp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

      {/* 1 — hero */}
      <header className="sl-hero">
        <Image src="/images/blueprint-hero.webp" alt="" fill priority sizes="100vw" className="sl-hero-art" />
        <div className="container">
          <nav className="sl-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>Blueprint</span></nav>
          <p className="eyebrow">The AI Opportunity Blueprint</p>
          <h1>Know what is worth building.</h1>
          <p className="sl-lede">A short, paid diagnostic that turns recurring work into a decision you can defend — including the decision not to build.</p>
          <div className="sl-hero-actions">
            <Button href={ENQUIRE}>Discuss a Blueprint</Button>
            <a className="sl-quiet" href="#deliverables">See what you receive <ArrowRight size={16} aria-hidden /></a>
          </div>
        </div>
      </header>

      {/* 2 — what it is */}
      <section className="sl-overview" aria-labelledby="bp-what">
        <div className="container">
          <div className="sl-overview-copy">
            <p className="eyebrow">What a Blueprint is</p>
            <h2 id="bp-what">A decision, not a proposal.</h2>
            {bp.overview.map((p, i) => <p key={i} className="sl-para">{p}</p>)}
          </div>
          <aside className="sl-panel">
            <p className="eyebrow">In one line</p>
            <p className="sl-panel-line">You pay for the thinking, and you keep the plan.</p>
            <dl>
              <div><dt>It ends in</dt><dd>A ranked recommendation and a 90-day roadmap</dd></div>
              <div><dt>It can conclude</dt><dd>That you should not build anything</dd></div>
              <div><dt>The fee is</dt><dd>Credited against implementation if you build with us</dd></div>
              <div><dt>You keep it</dt><dd>Whether or not we do the work</dd></div>
            </dl>
            <Button href={ENQUIRE}>Discuss a Blueprint</Button>
          </aside>
        </div>
      </section>

      {/* 3 — the two depths */}
      <section className="sl-fit bp-tiers" aria-labelledby="bp-tiers">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">Choose the depth</p><h2 id="bp-tiers">One workflow, or <br />the whole function.</h2></div>
            <p>Scope and fee are agreed in writing before anything begins. The first conversation costs nothing.</p>
          </div>
          <div className="bp-tier-grid">
            {bp.tiers.map(t => (
              <article key={t.name} className="bp-tier">
                <div className="bp-tier-shot"><Image src={`/images/${t.art}.webp`} alt="" width={600} height={400} sizes="(max-width:900px) 100vw, 46vw" /></div>
                <div className="bp-tier-body">
                  <div className="bp-tier-head"><h3>{t.name}</h3><span>{t.length}</span></div>
                  <p className="bp-tier-blurb">{t.blurb}</p>
                  <ul>{t.includes.map(x => <li key={x}><Check size={15} aria-hidden />{x}</li>)}</ul>
                  <p className="bp-tier-fit">{t.fit}</p>
                  <Link className="sl-quiet" href={`${ENQUIRE}&scope=${t.name === 'One workflow' ? 'workflow' : 'function'}`}>Discuss this depth <ArrowRight size={15} aria-hidden /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — a page from one */}
      <section className="sl-worked bp-sample" aria-labelledby="bp-sample">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">A page from one</p><h2 id="bp-sample">What the ranking <br />actually looks like.</h2></div>
            <p>The opportunity ranking is the page most arguments end at. Every candidate scored the same way, so the discussion is about order rather than merit.</p>
          </div>
          <div className="bp-table-wrap">
            <table className="bp-table">
              <caption className="sr-only">An illustrative opportunity ranking from a Blueprint</caption>
              <thead>
                <tr><th scope="col">Candidate</th><th scope="col">Hours / month</th><th scope="col">Readiness</th><th scope="col">Risk if wrong</th><th scope="col">Verdict</th></tr>
              </thead>
              <tbody>
                <tr><td>Supplier invoice entry</td><td>132</td><td><span className="bp-dot is-hi" />Ready</td><td>Low — caught at approval</td><td className="bp-yes">Build first</td></tr>
                <tr><td>Delivery-note matching</td><td>74</td><td><span className="bp-dot is-mid" />Needs access</td><td>Low</td><td className="bp-soon">Build second</td></tr>
                <tr><td>Customer onboarding checks</td><td>58</td><td><span className="bp-dot is-mid" />Policy unclear</td><td>Medium — compliance</td><td className="bp-soon">After a policy decision</td></tr>
                <tr><td>Quote preparation</td><td>41</td><td><span className="bp-dot is-lo" />Changes every time</td><td>High — commercial</td><td className="bp-no">Do not build</td></tr>
                <tr><td>Monthly board pack</td><td>22</td><td><span className="bp-dot is-hi" />Ready</td><td>Low</td><td className="bp-no">A template fixes this</td></tr>
              </tbody>
            </table>
          </div>
          <div className="we-after">
            <div className="we-after-item is-0"><strong>The numbers are yours</strong><p>Hours come from your volumes and your rates, not an industry benchmark.</p></div>
            <div className="we-after-item is-1"><strong>Two of these say no</strong><p>A ranking with no rejections in it is a sales document.</p></div>
            <div className="we-after-item"><strong>The order is the output</strong><p>Sequence matters more than any single score, because the second build costs less than the first.</p></div>
          </div>
          <p className="we-disclaimer">Illustrative example built to show the shape of the output. Not a client record.</p>
        </div>
      </section>

      {/* 5 — deliverables */}
      <section className="sl-give" id="deliverables" aria-labelledby="bp-give">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">What you receive</p><h2 id="bp-give">Six documents, <br />and they are all yours.</h2></div>
            <p>Written so another supplier could quote against them. A diagnostic you cannot take elsewhere is not a diagnostic.</p>
          </div>
          <div className="sl-give-grid">
            {bp.deliverables.map((d, i) => (
              <article key={d.title} className={`sl-give-card ${i < 2 ? 'is-wide' : ''}`}>
                <span className="bp-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — how the days run */}
      <section className="sl-flow" aria-labelledby="bp-days">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">How the days run</p><h2 id="bp-days">Most of the value <br />is in the second step.</h2></div>
            <p>The same six moves whichever depth you choose. Only the number of workflows changes.</p>
          </div>
          <ol className="bp-days">
            {bp.days.map((d, i) => (
              <li key={d.label} className={i === 1 ? 'is-key' : undefined}>
                <span className="bp-days-num">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{d.label}</h3><p>{d.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — who it suits */}
      <section className="sl-fit bp-suits" aria-labelledby="bp-suits">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">Who it is for</p><h2 id="bp-suits">And who should <br />skip it.</h2></div>
            <p>Telling you not to buy this is cheaper for both of us than an engagement that was never going to help.</p>
          </div>
          <div className="bp-suits-grid">
            <div className="bp-suit is-yes">
              <h3><Check size={17} aria-hidden /> Worth doing</h3>
              <ul>{bp.suits.yes.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="bp-suit is-no">
              <h3><X size={17} aria-hidden /> Not worth doing</h3>
              <ul>{bp.suits.no.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — what we need */}
      <section className="sl-bring" aria-labelledby="bp-bring">
        <div className="container">
          <div className="sl-bring-head">
            <p className="eyebrow">What we need from you</p>
            <h2 id="bp-bring">Five things, and none <br />of them a document pack.</h2>
            <p>Bring the work as it is. A cleaned-up version hides exactly the exceptions we are looking for.</p>
          </div>
          <ol className="sl-bring-list">
            {bp.bring.map((x, i) => <li key={x}><span>{String(i + 1).padStart(2, '0')}</span><p>{x}</p></li>)}
          </ol>
        </div>
      </section>

      {/* 9 — the investment */}
      <section className="sl-cost" aria-labelledby="bp-cost">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">The investment</p><h2 id="bp-cost">Pay for the thinking. <br />Keep the plan.</h2></div>
            <p>Quoted in writing after a free scoping conversation, and credited against implementation if you build with us.</p>
          </div>
          <div className="sl-cost-grid">
            <div className="sl-cost-prose">
              {bp.investment.map((p, i) => <p key={i}>{p}</p>)}
              <div className="sl-cost-split">
                <div><p className="eyebrow">If you build with us</p><p>The Blueprint fee comes off the build. Agreed in the scope, not offered afterwards.</p></div>
                <div className="is-running"><p className="eyebrow">If you do not</p><p>You keep every document, and we will answer another supplier&rsquo;s questions about it.</p></div>
              </div>
            </div>
            <aside className="sl-cost-drivers">
              <p className="eyebrow">What moves the number</p>
              <ul>{bp.feeDrivers.map(x => <li key={x}>{x}</li>)}</ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 10 — what happens after */}
      <section className="sl-measure bp-after" aria-labelledby="bp-after">
        <div className="container">
          <div className="sl-top">
            <div><p className="eyebrow">What happens after</p><h2 id="bp-after">Three honest endings.</h2></div>
            <p>All three are a result. Only one of them is a sale, which is the point of charging for the diagnostic.</p>
          </div>
          <div className="bp-after-grid">
            {bp.after.map((a, i) => (
              <div key={a.head} className="bp-after-card"><span>{String(i + 1).padStart(2, '0')}</span><h3>{a.head}</h3><p>{a.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="sl-faq" aria-labelledby="bp-faq">
        <div className="container">
          <div className="sl-faq-head">
            <p className="eyebrow">Before you enquire</p>
            <h2 id="bp-faq">Eight questions we <br />are asked every time.</h2>
            <p>Including the ones with an uncomfortable answer.</p>
            <Button href={ENQUIRE}>Discuss a Blueprint</Button>
          </div>
          <div className="sl-faq-list">
            {bp.faqs.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary><h3>{q}</h3><span aria-hidden>+</span></summary>
                <p><RichText text={a} /></p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — reading */}
      {cards.length > 0 && (
        <section className="sl-reading" aria-labelledby="bp-read">
          <div className="container">
            <div className="sl-top">
              <div><p className="eyebrow">Read first</p><h2 id="bp-read">Some of this you <br />can do yourself.</h2></div>
              <Link className="sl-quiet" href="/insights">All insights <ArrowRight size={16} aria-hidden /></Link>
            </div>
            <div className="ic-grid">{cards.map(c => <InsightCardView key={c.slug} card={c} />)}</div>
          </div>
        </section>
      )}

      {/* 13 — close */}
      <section className="sl-close">
        <div className="container">
          <div>
            <h2>Start with a <br />clear decision.</h2>
            <p>Tell us the process. We will tell you whether a Blueprint is even the right next step.</p>
          </div>
          <Button href={ENQUIRE}>Discuss a Blueprint</Button>
        </div>
      </section>
    </div>
  );
}
