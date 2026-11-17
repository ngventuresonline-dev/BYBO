import type { NextConfig } from "next";
import path from "node:path";

// `FLOTEMPO_EXPORT=1 npm run build` makes a static site for bybo-demos.vercel.app/flotempo/
const exporting = process.env.FLOTEMPO_EXPORT === "1";
const basePath = exporting ? "/flotempo" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // this app sits inside the BYBO repo; keep Next from treating the parent as the root
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(exporting && { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } }),
};
export default nextConfig;
