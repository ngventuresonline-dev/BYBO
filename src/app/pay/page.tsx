import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PayNow } from './PayNow';
import { PRODUCTS } from '@/lib/payments/products';
import './pay.css';

export const metadata: Metadata = pageMetadata({
  title: 'Buy a BYBO package',
  description: 'Buy a BYBO Blueprint, AI system, website, app or film package, or pay an invoice, securely through PhonePe. A receipt is emailed to you straight away.',
  path: '/pay',
});

export default async function Pay({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const initial = typeof sp.product === 'string' ? sp.product : undefined;
  return (
    <main className="pay">
      <section className="pay-card">
        <p className="pay-kick">Pay BYBO</p>
        <h1>Buy a BYBO package</h1>
        <p className="pay-sub">Pick what you&apos;re buying, add your details and pay on PhonePe. Your receipt arrives by email.</p>
        <PayNow products={PRODUCTS} initial={initial} />
      </section>
    </main>
  );
}
