import { ReferenceSolutions } from '@/components/studio/ReferencePages';
import { ServiceDetail } from '@/components/service-detail/ServiceDetail';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'Solutions for Your Business', description: 'Explore practical AI workflows and website design. Start with enquiries, documents, operations, knowledge, reporting or your brand website.', path: '/solutions' });
export default function Page() { return <ReferenceSolutions><ServiceDetail slug="solutions"/></ReferenceSolutions>; }
