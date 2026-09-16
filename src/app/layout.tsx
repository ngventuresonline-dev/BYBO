import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { MarketingPixels } from "@/components/MarketingPixels";
import ProxeWidget from "@/components/ProxeWidget";
import { SITE } from "@/lib/seo";
import "./globals.css";
import "./desktop-heroes.css";
export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: {
        default: SITE.defaultTitle,
        template: "%s | BYBO",
    },
    description: SITE.defaultDescription,
    applicationName: SITE.name,
    icons: {
        // .ico first: Google's favicon fetcher and older tools ask for it before
        // anything else, and an absent one is why a stale icon lingers in search.
        icon: [
            { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
            { url: "/icon.svg", type: "image/svg+xml" },
            { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
        shortcut: ["/favicon.ico"],
    },
    category: "technology",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: SITE.defaultTitle,
        description: SITE.defaultDescription,
        url: SITE.url,
        siteName: SITE.name,
        locale: SITE.locale,
        type: "website",
    },
    twitter: {
        card: "summary",
        title: SITE.defaultTitle,
        description: SITE.defaultDescription,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
        : {}),
};
export default function RootLayout({ children, }: {
    children: React.ReactNode;
}) {
    return (<html lang="en-IN">
      <body className="antialiased">
        <MarketingPixels />
        <SeoJsonLd />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="min-w-0 overflow-x-clip">
          {children}
        </main>
        <Footer />
        <ProxeWidget />
      </body>
    </html>);
}
