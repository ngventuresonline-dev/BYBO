import { LegalPage } from '@/components/legal/LegalPage';
import { terms } from '@/lib/legal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of use',
  description: 'The terms governing use of bybo.in, what the demonstrations on it are and are not, and what does and does not create a contract with BYBO.',
  path: '/terms',
});

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of use."
      lede="What you may do with this site, what the demonstrations on it are, and what does and does not create an agreement between us."
      sections={terms}
      sibling={{ href: '/privacy', label: 'Privacy notice' }}
    />
  );
}
