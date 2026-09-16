import Link from 'next/link';
import { CONTACT } from '@/lib/site';
import { LAST_UPDATED, type Section } from '@/lib/legal';
import './legal.css';

/** Shared layout for the privacy notice and the terms, with a contents list
 *  so a long page can be navigated rather than scrolled through. */
export function LegalPage({ eyebrow, title, lede, sections, sibling }: {
  eyebrow: string; title: string; lede: string; sections: Section[];
  sibling: { href: string; label: string };
}) {
  return (
    <div className="lg">
      <header className="lg-hero">
        <div className="container">
          <nav className="lg-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><span>{eyebrow}</span></nav>
          <p className="eyebrow">{eyebrow} · Updated {LAST_UPDATED}</p>
          <h1>{title}</h1>
          <p className="lg-lede">{lede}</p>
        </div>
      </header>

      <div className="container lg-body">
        <nav className="lg-toc" aria-label="On this page">
          <p className="eyebrow">On this page</p>
          <ol>{sections.map((s, i) => (
            <li key={s.id}><a href={`#${s.id}`}><span>{String(i + 1).padStart(2, '0')}</span>{s.heading}</a></li>
          ))}</ol>
          <div className="lg-toc-foot">
            <Link href={sibling.href}>{sibling.label}</Link>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
        </nav>

        <article className="lg-article">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <p className="lg-num">{String(i + 1).padStart(2, '0')}</p>
              <h2 id={`${s.id}-h`}>{s.heading}</h2>
              {s.paras?.map((p, j) => <p key={j}>{p}</p>)}
              {s.list && <ul>{s.list.map(x => <li key={x}>{x}</li>)}</ul>}
              {s.note && <p className="lg-note">{s.note}</p>}
            </section>
          ))}

          <section className="lg-review">
            <p><strong>A note on what this is.</strong> This was written carefully by the people who build BYBO, not by lawyers, and it describes how this website actually behaves. It is not legal advice and it has not been reviewed by counsel. If you are relying on it for a decision, take proper advice.</p>
            <p>Something here wrong or unclear? Write to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and it will be corrected.</p>
          </section>
        </article>
      </div>
    </div>
  );
}
