"use client";

import Script from "next/script";
import { Suspense, useEffect, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  analyticsConfig,
  hasMarketingPixels,
  trackPageView,
} from "@/lib/analytics";

const CONSENT_KEY = "bybo_measurement_consent";
const CONSENT_EVENT = "bybo:measurement-consent";
type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function saveConsent(value: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // The choice still applies for this visit when storage is unavailable.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function MeasurementSettings() {
  if (!hasMarketingPixels()) return null;

  function resetConsent() {
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } catch {
      // Reloading still gives the visitor another choice for this visit.
    }
    window.location.reload();
  }

  return <button type="button" className="footer-link-button" onClick={resetConsent}>Measurement settings</button>;
}

function MarketingPixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

function PixelScripts() {
  const { metaPixelId, gaMeasurementId, gtmId } = analyticsConfig;
  return (
    <>
      {gtmId ? (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}
      {gaMeasurementId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="ga4-loader" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', { send_page_view: false });`}
          </Script>
        </>
      ) : null}
      {metaPixelId ? (
        <Script id="meta-pixel-loader" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');`}
        </Script>
      ) : null}
      <Suspense fallback={null}><MarketingPixelEvents /></Suspense>
    </>
  );
}

export function MarketingPixels() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  if (!hasMarketingPixels()) return null;
  if (consent === "granted") return <PixelScripts />;
  if (consent === "denied") return null;

  return (
    <aside className="measurement-consent" aria-label="Website measurement choice">
      <div>
        <strong>Your choice about website measurement</strong>
        <p>BYBO would like to use analytics to understand which pages are useful. These tools stay off unless you allow them.</p>
        <a href="/privacy">Read privacy information</a>
      </div>
      <div>
        <button type="button" className="button button-secondary" onClick={() => saveConsent("denied")}>Only necessary</button>
        <button type="button" className="button" onClick={() => saveConsent("granted")}>Allow measurement</button>
      </div>
    </aside>
  );
}
