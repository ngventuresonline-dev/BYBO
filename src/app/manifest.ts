import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';

/** Installed-app icons and colours. Android and Chrome read this; the .ico and
 *  apple-icon beside it cover the crawlers and iOS that do not. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BYBO — AI systems and websites built around your business',
    short_name: SITE.name,
    description: SITE.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#111116',
    theme_color: '#111116',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
