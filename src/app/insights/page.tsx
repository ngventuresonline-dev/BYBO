import { ReferenceInsights } from '@/components/studio/FinalReferencePages';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'Insights', description: 'Practical reading for the people deciding what to build, who should approve it and how to tell if it works.', path: '/insights' });
export default function Insights(){return <ReferenceInsights/>}
