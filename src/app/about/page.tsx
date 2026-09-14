import { ReferenceAbout } from '@/components/studio/ExtendedReferencePages';
import { ogFor } from '@/lib/og-pages';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'About BYBO', description: 'BYBO is the enterprise AI practice of N&G Ventures, Bengaluru. We build AI systems and websites around people and the work they actually do.', path: '/about', ogImage: ogFor('/about') });
export default function Page(){return <ReferenceAbout/>;}
