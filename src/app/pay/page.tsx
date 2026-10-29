import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PayNow } from './PayNow';
import { PRODUCTS } from '@/lib/payments/products';
import './pay.css';

export const metadata: Metadata = pageMetadata({
  title: 'Buy a Blueprint or pay BYBO',
  description: 'Buy a BYBO Blueprint or pay an invoice securely through PhonePe with UPI, cards or netbanking. A receipt is emailed to you straight away.',
  path: '/pay',
});

export default function Pay() {
  return (
    <main className="pay">
      <section className="pay-card">
        <p className="pay-kick">Pay BYBO</p>
        <h1>Start with a Blueprint</h1>
        <p className="pay-sub">Pick what you&apos;re buying, add your details and pay on PhonePe. Your receipt arrives by email.</p>
        <PayNow products={PRODUCTS} />
      </section>
    </main>
  );
}
