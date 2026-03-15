import type { MetadataRoute } from "next";
import { BUILDS_TIER_S } from "@/data/builds/tier-s";
import { getWalkthroughSlugs } from "@/lib/mdx";

const BASE_URL = "https://bg3-honor-companion.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/builds`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/codex`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/dice`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/outils/combat`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/outils/des`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/outils/initiative`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Build pages (10 builds)
  const buildPages: MetadataRoute.Sitemap = BUILDS_TIER_S.map((build) => ({
    url: `${BASE_URL}/builds/${build.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Walkthrough pages
  const walkthroughPages: MetadataRoute.Sitemap = getWalkthroughSlugs().map((slug) => ({
    url: `${BASE_URL}/walkthrough/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...buildPages, ...walkthroughPages];
}
