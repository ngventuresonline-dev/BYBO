import type { Metadata } from "next";
export const SITE = {
    name: "BYBO",
    url: "https://bybo.in",
    locale: "en_IN",
    defaultTitle: "BYBO | AI Systems & Websites Built Around Your Business",
    defaultDescription: "BYBO builds business AI systems and distinctive websites for brands, businesses and creators. Clear workflows, human control and considered digital experiences.",
} as const;
export function siteUrl(path = ""): string {
    if (!path || path === "/")
        return SITE.url;
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
export function pageMetadata({ title, description, path, keywords, ogType = "website", ogImage, ogImageAlt, noIndex = false, publishedTime, }: PageMetaOptions): Metadata {
    const url = siteUrl(path);
    const isHome = path === "/";
    // The suffix is dropped when it would push the title past what a search
    // result shows; a truncated brand name helps nobody.
    const suffixed = `${title} | BYBO`;
    const documentTitle = isHome || suffixed.length > 60 ? title : suffixed;
    // Trim a long description at a sentence, so the search result ends on a
    // full stop rather than mid-word.
    const trimmed = description.length <= 160
        ? description
        : (() => {
            const cut = description.slice(0, 160);
            const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
            if (stop > 90)
                return description.slice(0, stop + 1);
            const space = cut.lastIndexOf(" ");
            return `${description.slice(0, space > 0 ? space : 157)}…`;
        })();
    return {
        title: isHome || suffixed.length > 60 ? { absolute: documentTitle } : title,
        description: trimmed,
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
            description: trimmed,
            url,
            siteName: SITE.name,
            locale: SITE.locale,
            type: ogType,
            ...(publishedTime && ogType === "article"
                ? { publishedTime, modifiedTime: publishedTime }
                : {}),
            ...(ogImage
                ? { images: [{ url: ogImage, alt: ogImageAlt ?? title }] }
                : {}),
        },
        twitter: {
            card: ogImage ? "summary_large_image" : "summary",
            title: documentTitle,
            description: trimmed,
            ...(ogImage ? { images: [ogImage] } : {}),
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
