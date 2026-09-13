import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from './Shared';
import { services, industries } from '@/lib/redesign';
import { cardFor, type InsightCard } from '@/lib/insights';
import { InsightCardView } from '@/components/insights/GuideArticle';
import './home-sections.css';

/** The eight things BYBO builds, named on the homepage instead of one click away. */
export function HomeServices() {
  return (
    <section className="rp-light hs-services" aria-labelledby="hs-services-title">
      <div className="container">
        <div className="hs-head">
          <div>
            <p className="eyebrow">What we build</p>
            <h2 id="hs-services-title">Seven systems and a website studio.</h2>
          </div>
          <p>Each one takes on a different shape of recurring work. Most businesses start with one.</p>
        </div>
        <div className="hs-grid">
          {services.map(s => (
            <Link key={s.slug} href={`/systems/${s.slug}`} className="hs-card">
              <h3>{s.name}</h3>
              <p>{s.short}</p>
              <span>Explore <ArrowRight size={15} aria-hidden /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A route to an enquiry in the middle of the page, not only at the end. */
export function HomeMidCta() {
  return (
    <section className="hs-cta">
      <div className="container">
        <div>
          <h2>Bring one workflow.<br />We will tell you whether it is worth building.</h2>
          <p>The first conversation is free, and it is a conversation about your work — not a demo.</p>
        </div>
        <div className="actions">
          <Button href="/apply">Talk to BYBO</Button>
          <Link className="hs-link" href="/blueprint">Explore the Blueprint <ArrowRight size={16} aria-hidden /></Link>
        </div>
      </div>
    </section>
  );
}

/** Self-qualification: the industries BYBO already works in the language of. */
export function HomeIndustries() {
  return (
    <section className="rp-light hs-industries" aria-labelledby="hs-industries-title">
      <div className="container">
        <div className="hs-head">
          <div>
            <p className="eyebrow">Who it is for</p>
            <h2 id="hs-industries-title">Businesses where the same work comes back every week.</h2>
          </div>
          <Link className="hs-link" href="/industries">See your industry <ArrowRight size={16} aria-hidden /></Link>
        </div>
        <ul className="hs-chips">
          {industries.map(i => <li key={i.name}>{i.name}</li>)}
        </ul>
      </div>
    </section>
  );
}

const FAQS: [string, string][] = [
  ['What does it cost?',
    'BYBO does not publish prices, because cost follows the workflow: how many steps it carries, how many systems it touches and how much review it needs. The first conversation is free. If a paid Blueprint is the right next step, its scope and fee are agreed in writing before it begins.'],
  ['How long before something is working?',
    'That depends on the workflow and the access it needs, so we scope a useful first release rather than promise a date. The pattern is consistent: map the work, agree a small boundary, build against your real examples, run it alongside the current process, then widen it.'],
  ['What happens to our data?',
    'A system reads only what you agree it may read, and acts only where you have said it may act. Access is granted per source, actions are logged, and personal data is handled under the terms we agree with you. Nothing is used to train a public model.'],
  ['What if the system gets something wrong?',
    'It is designed to. Consequential steps sit behind approval, unclear cases stop and go to a named person with the evidence attached, every action is logged, and there is a way to pause the workflow. We agree those rules before anything runs.'],
  ['Do we need a technical team?',
    'No. You need someone who knows how the work actually happens and can answer questions about the exceptions. We handle the build, and we document and hand over what is needed to run it.'],
  ['We are not sure it is even an AI problem.',
    'Then say that. Sometimes a template, a rule or an integration you already own is the better answer, and we will tell you so. A clear "not yet" is a useful result of the first conversation.'],
];

/** The questions that stop a visitor from enquiring, answered before they leave. */
export function HomeFaq() {
  return (
    <section className="rp-light hs-faq" aria-labelledby="hs-faq-title">
      <div className="container hs-faq-grid">
        <div className="hs-faq-head">
          <p className="eyebrow">Straight answers</p>
          <h2 id="hs-faq-title">Before you get in touch.</h2>
          <p>The questions we are asked most, answered plainly.</p>
          <Button href="/apply">Talk to BYBO</Button>
        </div>
        <div className="hs-faq-list">
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary><h3>{q}</h3><span aria-hidden>+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const READING = ['what-is-a-business-ai-system', 'real-cost-of-repetitive-work', 'enterprise-ai-governance'];

/** Depth signal: three of the guides, so the thinking is visible from the homepage. */
export function HomeInsights() {
  const cards = READING.map(cardFor).filter((c): c is InsightCard => Boolean(c));
  if (!cards.length) return null;
  return (
    <section className="rp-light hs-insights" aria-labelledby="hs-insights-title">
      <div className="container">
        <div className="hs-head">
          <div>
            <p className="eyebrow">How we think</p>
            <h2 id="hs-insights-title">Read before you commit to anything.</h2>
          </div>
          <Link className="hs-link" href="/insights">All insights <ArrowRight size={16} aria-hidden /></Link>
        </div>
        <div className="ic-grid">{cards.map(c => <InsightCardView key={c.slug} card={c} />)}</div>
      </div>
    </section>
  );
}

/** Kept here so the homepage can close on the same artwork it always did. */
export function HomeClosing() {
  return (
    <section className="reference-closing">
      <Image src="/images/reference-closing.webp" alt="A violet glass sphere on a stack of books" fill sizes="100vw" />
      <div className="container">
        <div><h2>Bring us one recurring problem.</h2><p>We will help you decide whether it needs a system.</p></div>
        <Button href="/apply">Talk to BYBO</Button>
      </div>
    </section>
  );
}
