import { MotionPage } from '@/components/motion/MotionPage';
import { pageMetadata } from '@/lib/seo';

// Not linked from the nav yet and kept out of search until it is approved.
export const metadata = pageMetadata({
  title: 'Motion Studio',
  description: 'Brand films, product promos, platform explainers and launch reels, made by a production system and directed by people.',
  path: '/motion',
  noIndex: true,
});

export default function Page() { return <MotionPage />; }
