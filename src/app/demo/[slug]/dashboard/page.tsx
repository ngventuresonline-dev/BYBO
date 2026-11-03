import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { DemoContent } from '@/lib/crm/autopilot';
import { catalog, loadDemo } from '../data';
import { Dashboard } from '../owner';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Owner dashboard' };

/** The owner's view of the demo store: orders, customers, campaigns, automations. */
export default async function DashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const demo = await loadDemo((await params).slug);
  if (!demo) notFound();
  const c = demo.content as DemoContent;
  const products = catalog(c).map((i) => ({ title: i.title, handle: i.handle, image: i.image, price: i.price }));
  return <Dashboard brand={c.brand} products={products} />;
}
