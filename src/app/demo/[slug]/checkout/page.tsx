import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { loadDemo } from '../data';
import { Checkout } from '../store';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Checkout' };

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const demo = await loadDemo((await params).slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  return (
    <>
      <section className="st-hero is-small"><h1>Checkout</h1></section>
      <section className="st-wrap"><Checkout brand={c.brand} /></section>
    </>
  );
}
