import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["terminal.local"],
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
