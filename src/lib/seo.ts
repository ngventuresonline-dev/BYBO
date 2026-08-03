import type { Metadata } from "next";

export const SITE = {
  name: "BYBO",
  url: "https://bybo.in",
  locale: "en_IN",
  defaultTitle: "BYBO | Enterprise AI Systems Built Around Your Business",
  defaultDescription:
    "BYBO designs, builds, and operates custom AI platforms, agentic operations, and enterprise knowledge systems for Indian businesses—with human approval, governance, and measurable outcomes.",
} as const;

export function siteUrl(path = ""): string {
  if (!path || path === "/") return SITE.url;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
  publishedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  ogType = "website",
  ogImage = "/icon.svg",
  ogImageAlt = "BYBO — Enterprise AI systems",
  noIndex = false,
  publishedTime,
}: PageMetaOptions): Metadata {
  const url = siteUrl(path);
  const isHome = path === "/";
  const documentTitle = isHome ? title : `${title} — BYBO`;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: documentTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: ogType,
      images: [{ url: ogImage, alt: ogImageAlt }],
      ...(publishedTime && ogType === "article"
        ? { publishedTime, modifiedTime: publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description,
      images: [ogImage],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: siteUrl("/icon.svg"),
  description: SITE.defaultDescription,
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Enterprise AI systems",
    "Custom AI platforms",
    "Agentic operations",
    "Enterprise knowledge systems",
    "AI governance",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.defaultDescription,
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
  },
};
