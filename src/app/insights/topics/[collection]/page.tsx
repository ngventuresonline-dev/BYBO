import { notFound } from 'next/navigation';
import { InsightsTopic } from '@/components/insights/InsightsIndex';
import { collectionById, collections, type CollectionId } from '@/lib/insights';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ collection: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map(c => ({ collection: c.id }));
}

export async function generateMetadata({ params }: Props) {
  const { collection } = await params;
  const c = collectionById[collection as CollectionId];
  return c ? pageMetadata({ title: `${c.name} — Insights`, description: c.intro, path: `/insights/topics/${c.id}` }) : {};
}

export default async function Topic({ params }: Props) {
  const { collection } = await params;
  if (!(collection in collectionById)) notFound();
  return <InsightsTopic id={collection as CollectionId} />;
}
