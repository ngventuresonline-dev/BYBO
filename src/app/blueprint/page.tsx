import { ReferenceBlueprint } from '@/components/studio/ReferencePages';
import { ogFor } from '@/lib/og-pages';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'The Blueprint', description: 'A paid diagnostic that maps your workflow, assesses readiness and decides what is worth building — ending in a recommendation and a 90-day roadmap.', path: '/blueprint', ogImage: ogFor('/blueprint') });
export default function Page() { return <ReferenceBlueprint />; }
