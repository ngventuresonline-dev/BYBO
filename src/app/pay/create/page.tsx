import type { Metadata } from 'next';
import { CreateLink } from './CreateLink';
import '../pay.css';

export const metadata: Metadata = { title: 'Create a payment link', robots: { index: false, follow: false } };

export default function CreatePage() {
  return (
    <main className="pay">
      <section className="pay-card">
        <p className="pay-kick">BYBO team</p>
        <h1>Create a payment link</h1>
        <p className="pay-sub">The client sees a BYBO payment page and pays with PhonePe. Receipts go to them and to the team automatically.</p>
        <CreateLink />
      </section>
    </main>
  );
}
