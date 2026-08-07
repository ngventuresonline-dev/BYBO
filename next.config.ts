import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
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
