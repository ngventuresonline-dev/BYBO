import { ReferenceAbout } from '@/components/studio/ExtendedReferencePages';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'About BYBO', description: 'BYBO is the enterprise AI practice of N&G Ventures in Bengaluru. We build business AI systems and distinctive websites around people and real work.', path: '/about' });
export default function Page(){return <ReferenceAbout/>;}
