"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export const analyticsConfig = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || "",
};

export function hasMarketingPixels() {
  return Boolean(
    analyticsConfig.metaPixelId ||
      analyticsConfig.gaMeasurementId ||
      analyticsConfig.gtmId,
  );
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;

  const { metaPixelId, gaMeasurementId } = analyticsConfig;

  if (metaPixelId && window.fbq) {
    window.fbq("track", "PageView");
  }

  if (gaMeasurementId && window.gtag) {
    window.gtag("config", gaMeasurementId, {
      page_path: path,
    });
  }

  if (analyticsConfig.gtmId && window.dataLayer) {
    window.dataLayer.push({
      event: "pageview",
      page_path: path,
    });
  }
}

export function trackLead(details?: Record<string, string>) {
  if (typeof window === "undefined") return;

  const { metaPixelId, gaMeasurementId, gtmId } = analyticsConfig;

  if (metaPixelId && window.fbq) {
    window.fbq("track", "Lead", details);
  }

  if (gaMeasurementId && window.gtag) {
    window.gtag("event", "generate_lead", details);
  }

  if (gtmId && window.dataLayer) {
    window.dataLayer.push({
      event: "generate_lead",
      ...details,
    });
  }
}

export function trackEvent(
  eventName: string,
  details?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;

  const { metaPixelId, gaMeasurementId, gtmId } = analyticsConfig;

  if (metaPixelId && window.fbq) {
    window.fbq("trackCustom", eventName, details);
  }

  if (gaMeasurementId && window.gtag) {
    window.gtag("event", eventName, details);
  }

  if (gtmId && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...details,
    });
  }
}
