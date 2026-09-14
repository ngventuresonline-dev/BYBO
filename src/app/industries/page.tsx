import { ReferenceIndustries } from '@/components/studio/ExtendedReferencePages';
import { ogFor } from '@/lib/og-pages';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'Industries', description: 'Manufacturing, logistics, professional services, healthcare, retail and more — the recurring work each one carries, and what can be built around it.', path: '/industries', ogImage: ogFor('/industries') });
export default function Page(){return <ReferenceIndustries/>;}
