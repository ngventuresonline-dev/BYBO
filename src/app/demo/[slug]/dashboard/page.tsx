import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { forClient } from '@/lib/crm/blueprints';
import { blueprintOf, catalog, loadDemo } from '../data';
import { Dashboard } from '../owner';
import { ServiceDashboard } from '../service-client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Owner dashboard' };

/** The owner's view of the demo: orders for a store, enquiries and a pipeline for everyone else. */
export default async function DashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const demo = await loadDemo((await params).slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const bp = blueprintOf(c);
  if (!bp.commerce) return <ServiceDashboard brand={c.brand} bp={forClient(bp)} services={(c.services ?? []).map((s) => s.title)} areas={c.areas ?? []} />;
  const products = catalog(c).map((i) => ({ title: i.title, handle: i.handle, image: i.image, price: i.price }));
  return <Dashboard brand={c.brand} products={products} />;
}
