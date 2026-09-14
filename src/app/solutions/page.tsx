import { ReferenceSolutions } from '@/components/studio/ReferencePages';
import { ogFor } from '@/lib/og-pages';
import { ServiceDetail } from '@/components/service-detail/ServiceDetail';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'Solutions', description: 'Start with the work you want off your plate: enquiries, documents, back-office requests, internal answers, reporting or your brand website.', path: '/solutions', ogImage: ogFor('/solutions') });
export default function Page() { return <ReferenceSolutions><ServiceDetail slug="solutions"/></ReferenceSolutions>; }
