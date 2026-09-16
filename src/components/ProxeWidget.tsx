'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * The PROXe chat widget.
 *
 * The embed script places its own iframe at bottom-right with the maximum
 * z-index and guards against being inserted twice, so there is nothing to
 * position here. Two things are worth controlling from this side:
 *
 * `lazyOnload` keeps it out of the critical path — it is a support widget, not
 * page content, and the hero image should not queue behind it.
 *
 * It is hidden on /apply, where a visitor is already in the middle of writing
 * to us. A chat bubble over a form someone is filling in competes with the
 * thing we actually want them to finish.
 */
export function ProxeWidget() {
  const pathname = usePathname();
  if (pathname?.startsWith('/apply')) return null;

  return (
    <Script
      id="proxe-widget"
      src="https://proxe.bybo.in/api/widget/embed.js"
      strategy="lazyOnload"
    />
  );
}
