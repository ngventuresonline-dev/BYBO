import type { NextConfig } from "next";
import { SITE } from "./src/lib/seo";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["terminal.local"],
  images: {
    // AVIF first: noticeably lighter than WebP at the same quality, which is
    // what phones on mobile data feel. The studio hero masters are 4K; the
    // default deviceSizes (640 … 3840) give each screen a width it needs.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Vercel CDN injects Access-Control-Allow-Origin: * on cached
          // prerendered HTML when this header is absent (live /, /insights,
          // /privacy, www). There is no cross-origin reader for this
          // marketing site. Deployment headers cannot delete that default —
          // they can only replace it — so this same-origin value is the
          // override that survives cache after redeploy. Never set `*`.
          { key: "Access-Control-Allow-Origin", value: SITE.url },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/pricing",
        destination: "/blueprint",
        permanent: true,
      },
      {
        source: "/solutions/ai-marketing",
        destination: "/systems/enterprise-knowledge-systems",
        permanent: true,
      },
      {
        source: "/systems/revenue",
        destination: "/systems/custom-ai-platforms",
        permanent: true,
      },
      {
        source: "/systems/customer-experience",
        destination: "/systems/customer-workforce-ai",
        permanent: true,
      },
      {
        source: "/systems/brand-intelligence",
        destination: "/systems/enterprise-knowledge-systems",
        permanent: true,
      },
      {
        // "Business Operations" is the redesign's name for the document
        // system, so this legacy path now points there rather than at agentic.
        source: "/systems/business-operations",
        destination: "/systems/document-multimodal-intelligence",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
