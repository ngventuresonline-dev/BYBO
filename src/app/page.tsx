import { ogFor } from '@/lib/og-pages';
import { HomeV3 } from '@/components/home/HomeV3';
import { pageMetadata, SITE } from '@/lib/seo';

export const metadata = pageMetadata({
  title: SITE.defaultTitle,
  description: 'BYBO builds systems that handle recurring work, connect your tools and bring the right decisions back to people. AI systems, websites, apps and films built around your business.',
  path: '/',
  ogImage: ogFor('/'),
});

export default function Home() {
  return <HomeV3 />;
}
