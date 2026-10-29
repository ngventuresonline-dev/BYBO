import type { Metadata } from 'next';
import { inr, readLink } from '@/lib/payments/link';
import { CONTACT } from '@/lib/site';
import { PayButton } from './PayButton';
import '../pay.css';

export const metadata: Metadata = { title: 'Pay BYBO', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PayPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const link = readLink(decodeURIComponent(token));

  if (!link) {
    return (
      <main className="pay">
        <section className="pay-card">
          <div className="pay-status is-bad" aria-hidden="true">!</div>
          <p className="pay-kick">Payment link</p>
          <h1>This link isn&apos;t valid any more.</h1>
          <p className="pay-sub">It may have expired or been changed. Ask us for a fresh one at {CONTACT.email} or WhatsApp {CONTACT.phone}.</p>
        </section>
      </main>
    );
  }

  const until = new Date(link.exp * 1000).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' });
  return (
    <main className="pay">
      <section className="pay-card">
        <p className="pay-kick">Pay BYBO</p>
        <h1>{link.purpose}</h1>
        <p className="pay-sub">For {link.company || link.name}</p>
        <p className="pay-amount">{inr(link.amount)}</p>
        <dl className="pay-rows">
          <div><dt>Reference</dt><dd>{link.id}</dd></div>
          <div><dt>Billed to</dt><dd>{link.name}{link.company ? `, ${link.company}` : ''}</dd></div>
          <div><dt>Receipt to</dt><dd>{link.email}</dd></div>
          <div><dt>Link valid until</dt><dd>{until}</dd></div>
        </dl>
        <PayButton token={decodeURIComponent(token)} label={`Pay ${inr(link.amount)} securely`} />
        <p className="pay-note">Secure checkout by PhonePe: UPI, cards and netbanking. BYBO never sees your card or bank details.</p>
      </section>
    </main>
  );
}
