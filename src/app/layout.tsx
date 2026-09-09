import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { MarketingPixels } from "@/components/MarketingPixels";
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
    icons: { icon: "/icon.svg" },
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
        images: [{ url: "/icon.svg", alt: "BYBO | Enterprise AI systems" }],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE.defaultTitle,
        description: SITE.defaultDescription,
        images: ["/icon.svg"],
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
    return (<html lang="en">
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
      </body>
    </html>);
}
