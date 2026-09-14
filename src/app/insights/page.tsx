import { InsightsIndex } from '@/components/insights/InsightsIndex';
import { ogFor } from '@/lib/og-pages';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Insights',
  description: 'Practical reading on AI systems, operations, governance, Indian business and websites — for the people deciding what to build and what it is worth.',
  path: '/insights',
  ogImage: ogFor('/insights'),
});

export default function Insights() {
  return <InsightsIndex />;
}
