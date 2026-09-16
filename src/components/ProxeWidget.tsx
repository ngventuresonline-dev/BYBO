"use client";

import Script from "next/script";

export default function ProxeWidget() {
  return (
    <Script
      id="bybo-proxe-agent"
      src="https://proxe.bybo.in/api/widget/embed.js"
      strategy="afterInteractive"
    />
  );
}
