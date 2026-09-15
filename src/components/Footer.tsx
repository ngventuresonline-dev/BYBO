import Link from 'next/link';
import { CONTACT } from '@/lib/site';
import { Wordmark } from './Wordmark';
import { MeasurementSettings } from './MarketingPixels';

export function Footer() {
  return <footer className="reference-footer">
    <div className="container">
      <div className="reference-footer-brand"><Link className="wordmark" href="/" aria-label="BYBO home"><Wordmark /></Link><span>Built around your business.</span></div>
      <nav aria-label="Footer navigation"><Link href="/about">About</Link><Link href="/blueprint">Blueprint</Link><Link href="/systems/website-design-development">Websites</Link><Link href="/insights">Insights</Link><Link href="/privacy">Privacy</Link><MeasurementSettings /></nav>
      <a href={CONTACT.emailHref}>{CONTACT.email}</a>
      <Link href="/">bybo.in</Link>
    </div>
  </footer>;
}
