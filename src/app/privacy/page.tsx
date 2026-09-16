import { LegalPage } from '@/components/legal/LegalPage';
import { privacy } from '@/lib/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy notice',
  description: 'What BYBO collects through this website, why, who else touches it, how long it is kept and the rights you have under India’s Digital Personal Data Protection Act.',
  path: '/privacy',
});

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Your information. A straight answer."
      lede="What this website collects, why, who else touches it, how long we keep it, and what you can ask us to do about it."
      sections={privacy}
      sibling={{ href: '/terms', label: 'Terms of use' }}
    />
  );
}
