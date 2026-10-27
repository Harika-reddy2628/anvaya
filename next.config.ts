import path from "node:path";
import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a static export for https://<user>.github.io/anvaya/. The live enquiry action needs a
// server, so that build swaps in a stub that reports the enquiry as unsent.
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? process.env.PAGES_BASE_PATH ?? "/anvaya" : "";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  ...(pages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
    webpack: config => {
      config.resolve.alias[path.join(process.cwd(), "app/project/actions.ts")] = path.join(process.cwd(), "app/project/actions.static.ts");
      return config;
    },
  }),
};

export default nextConfig;
