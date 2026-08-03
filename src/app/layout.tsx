import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const archivoDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const archivoBody = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BYBO — AI systems built around your business",
    template: "%s — BYBO",
  },
  description:
    "BYBO identifies high-value business bottlenecks, deploys practical AI systems around them, and operates those systems with measurable accountability.",
  openGraph: {
    title: "BYBO — AI systems built around your business",
    description:
      "Custom AI platforms, agentic operations, enterprise knowledge systems, decision intelligence, and governed AI infrastructure.",
    url: "https://bybo.in",
    siteName: "BYBO",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivoDisplay.variable} ${archivoBody.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <ScrollToTop />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="min-w-0 overflow-x-clip">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
