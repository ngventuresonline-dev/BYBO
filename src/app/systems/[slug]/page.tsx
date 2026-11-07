import { notFound, redirect } from 'next/navigation';
import { ogFor, ogPageByPath } from '@/lib/og-pages';
import { AppStudio } from '@/components/app-studio/AppStudio';
import { AppSchema } from '@/components/app-studio/AppSchema';
import { StudioLanding } from '@/components/studio-app/StudioLanding';
import { SystemLanding } from '@/components/system-landing/SystemLanding';
import { services } from '@/lib/redesign';
import { pageMetadata } from '@/lib/seo';

/** Old URLs that shipped before the systems were renamed. */
const legacy: Record<string, string> = {
  revenue: 'custom-ai-platforms',
  'customer-experience': 'customer-workforce-ai',
  'brand-intelligence': 'enterprise-knowledge-systems',
  'business-operations': 'document-multimodal-intelligence',
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...services.map(s => ({ slug: s.slug })), ...Object.keys(legacy).map(slug => ({ slug }))];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = services.find(x => x.slug === (legacy[slug] || slug));
  const meta = ogPageByPath[`/systems/${s?.slug}`];
  return s ? pageMetadata({ title: s.name, description: meta?.desc ?? s.short, path: `/systems/${s.slug}`, ogImage: ogFor(`/systems/${s.slug}`), ogImageAlt: s.headline }) : {};
}

export default async function Service({ params }: Props) {
  const { slug } = await params;
  if (legacy[slug]) redirect(`/systems/${legacy[slug]}`);
  if (!services.some(s => s.slug === slug)) notFound();

  // Website and Motion Studio show the self-serve studio app; App Studio keeps its own layout; the seven systems share one.
  if (slug === 'website-design-development') return <StudioLanding kind="website" />;
  if (slug === 'app-design-development') return <><AppSchema /><AppStudio /></>;
  if (slug === 'motion-studio') return <StudioLanding kind="motion" />;
  return <SystemLanding slug={slug} />;
}
