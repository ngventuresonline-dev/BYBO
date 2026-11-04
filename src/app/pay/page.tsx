import type { Metadata } from 'next';
import { payerKilled } from '@/lib/crm/kill';
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
  // A quote milestone is shown on its own, from its link; the public list never shows quotes.
  // A quote for a lead whose kill switch is on is not shown at all.
  const found = PRODUCTS.find((p) => p.unlisted && p.id === initial);
  const quote = found && !(await payerKilled(found.payer?.email)) ? found : undefined;
  const products = quote ? [quote] : PRODUCTS.filter((p) => !p.unlisted);
  return (
    <main className="pay">
      <section className="pay-card">
        <p className="pay-kick">Pay BYBO</p>
        <h1>{quote ? 'Pay your BYBO milestone' : 'Buy a BYBO package'}</h1>
        <p className="pay-sub">{quote ? 'Add your details and pay on PhonePe. Your receipt arrives by email.' : 'Pick what you’re buying, add your details and pay on PhonePe. Your receipt arrives by email.'}</p>
        <PayNow products={products} initial={initial} />
      </section>
    </main>
  );
}
