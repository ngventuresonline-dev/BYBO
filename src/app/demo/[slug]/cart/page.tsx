import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { loadDemo } from '../data';
import { CartPage } from '../store';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Your bag' };

export default async function Cart({ params }: { params: Promise<{ slug: string }> }) {
  const demo = await loadDemo((await params).slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const free = (c.facts ?? []).find((f) => /free (delivery|shipping)/i.test(f)) ?? null;
  return (
    <>
      <section className="st-hero is-small"><h1>Your bag</h1></section>
      <section className="st-wrap"><CartPage free={free} /></section>
    </>
  );
}
