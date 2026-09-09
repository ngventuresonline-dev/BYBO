import { ReferenceBlueprint } from '@/components/studio/ReferencePages';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'AI Opportunity Blueprint', description: 'A paid diagnostic to map your workflow, assess readiness and decide what is worth building. A clear recommendation and a 90-day roadmap.', path: '/blueprint' });
export default function Page() { return <ReferenceBlueprint />; }
