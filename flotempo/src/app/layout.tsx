import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_BASE_PATH ? "https://bybo-demos.vercel.app" : "http://localhost:4100";
const DESC = "Live demo: book a bike, auto or cab, watch a captain pick you up and track the ride. Rider app, captain app and ops dashboard on one live backend.";

export const metadata: Metadata = {
  // absolute og:image URLs — WhatsApp ignores relative ones
  metadataBase: new URL(SITE + (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + "/"),
  title: "Flo Tempo — bike, auto & cab, Bengaluru",
  description: DESC,
  openGraph: {
    type: "website",
    siteName: "Flo Tempo",
    title: "Flo Tempo — bike, auto & cab rides in Bengaluru",
    description: DESC,
    locale: "en_IN",
    // a real .png path: bybo-demos adds trailing slashes to extensionless URLs, which breaks crawlers
    images: [{ url: "og.png", width: 1200, height: 630, type: "image/png", alt: "Flo Tempo — bike, auto & cab rides in Bengaluru" }],
  },
  twitter: { card: "summary_large_image", title: "Flo Tempo — bike, auto & cab rides in Bengaluru", description: DESC, images: ["og.png"] },
};

// full-bleed on notched phones; sheets and top bars pad themselves with safe-area insets
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F3F5F8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
