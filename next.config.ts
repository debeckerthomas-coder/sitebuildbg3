import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  output: "export",
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
