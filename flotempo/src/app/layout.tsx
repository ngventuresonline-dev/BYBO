import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flo Tempo — bike, auto & cab, Bengaluru",
  description:
    "Working prototype: rider app, captain app and operations dashboard on one live backend.",
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
