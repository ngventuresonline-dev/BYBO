import { ReferenceIndustries } from '@/components/studio/ExtendedReferencePages';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'Industries', description: 'Explore AI opportunities for operations, high-consideration businesses and consumer brands. Practical workflows scoped to your industry.', path: '/industries' });
export default function Page(){return <ReferenceIndustries/>;}
