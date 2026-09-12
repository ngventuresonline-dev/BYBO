import { InsightsIndex } from '@/components/insights/InsightsIndex';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Insights',
  description: 'Practical reading on AI systems, business operations, governance, Indian business and websites — for the people deciding what to build and how to tell if it works.',
  path: '/insights',
});

export default function Insights() {
  return <InsightsIndex />;
}
