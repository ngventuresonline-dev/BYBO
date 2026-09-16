import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { CONTACT } from '@/lib/site';
import { Wordmark } from './Wordmark';
import { MeasurementSettings } from './MarketingPixels';
import { services } from '@/lib/redesign';
import { collections } from '@/lib/insights';
import './footer.css';

const COMPANY: [string, string][] = [
  ['/about', 'About BYBO'],
  ['/how-we-work', 'How we work'],
  ['/blueprint', 'The Blueprint'],
  ['/solutions', 'Solutions'],
  ['/industries', 'Industries'],
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="container">

        {/* the ask, before the directory */}
        <div className="ft-top">
          <div>
            <p className="ft-eyebrow">Start here</p>
            <p className="ft-pitch">Bring one recurring problem.<br />We will tell you whether it needs a system.</p>
          </div>
          <Link href="/apply" className="ft-cta">Talk to BYBO <ArrowUpRight size={17} aria-hidden /></Link>
        </div>

        <div className="ft-grid">
          <div className="ft-brand">
            <Link className="wordmark" href="/" aria-label="BYBO home"><Wordmark /></Link>
            <p>AI systems and websites built around the work your business already does.</p>
            {/* Phone and WhatsApp are held back for now; CONTACT still carries
                both, so restoring them is two list items. */}
            <ul className="ft-contact">
              <li><a href={CONTACT.emailHref}><Mail size={15} aria-hidden />{CONTACT.email}</a></li>
            </ul>
          </div>

          <nav className="ft-col" aria-labelledby="ft-systems">
            <h2 id="ft-systems">Systems</h2>
            <ul>
              {services.map(s => <li key={s.slug}><Link href={`/systems/${s.slug}`}>{s.name}</Link></li>)}
              <li><Link href="/systems" className="ft-all">All systems</Link></li>
            </ul>
          </nav>

          <nav className="ft-col" aria-labelledby="ft-company">
            <h2 id="ft-company">Company</h2>
            <ul>{COMPANY.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
          </nav>

          <nav className="ft-col" aria-labelledby="ft-insights">
            <h2 id="ft-insights">Insights</h2>
            <ul>
              {collections.map(c => <li key={c.id}><Link href={`/insights/topics/${c.id}`}>{c.name}</Link></li>)}
              <li><Link href="/insights" className="ft-all">All insights</Link></li>
            </ul>
          </nav>
        </div>

        <div className="ft-legal">
          {/* One interpolated string: JSX strips the whitespace either side of an
              element boundary, which ran the words together. */}
          <p className="ft-entity">
            <strong>BYBO</strong>
            {` is the enterprise AI and website practice of N&G Ventures, Bengaluru, India. © ${year} N&G Ventures. All rights reserved.`}
          </p>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <MeasurementSettings />
            <Link href="/">bybo.in</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
