import { ReferenceMethod } from '@/components/studio/ExtendedReferencePages';
import { ogFor } from '@/lib/og-pages';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'How we work', description: 'Diagnose, build, operate, expand. Clear ownership, measures agreed before the work starts, and a named person on every decision that matters.', path: '/how-we-work', ogImage: ogFor('/how-we-work') });
export default function Page(){return <ReferenceMethod/>;}
