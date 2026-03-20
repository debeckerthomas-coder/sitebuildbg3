// ============================================================================
// MDX Configuration — Server-side loading with next-mdx-remote v6 RSC
// Supports i18n: reads from src/content/{lang}/walkthroughs/
// ============================================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { WalkthroughMeta } from "@/types";

const DEFAULT_LANG = "fr";

function contentDir(lang: string = DEFAULT_LANG): string {
  return path.join(process.cwd(), "src/content", lang, "walkthroughs");
}

/**
 * Get all walkthrough slugs for static generation.
 */
export function getWalkthroughSlugs(lang: string = DEFAULT_LANG): string[] {
  const dir = contentDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Load a single walkthrough by slug.
 * Returns the raw MDX source string and parsed frontmatter.
 */
export function getWalkthrough(slug: string, lang: string = DEFAULT_LANG): {
  source: string;
  meta: WalkthroughMeta;
} {
  const filePath = path.join(contentDir(lang), `${slug}.mdx`);
  if (!fs.existsSync(filePath) && lang !== DEFAULT_LANG) {
    // Fallback to default language
    return getWalkthrough(slug, DEFAULT_LANG);
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return {
    source: content,
    meta: data as WalkthroughMeta,
  };
}

/**
 * Get all walkthrough metadata, sorted by order.
 */
export function getAllWalkthroughMeta(lang: string = DEFAULT_LANG): WalkthroughMeta[] {
  const slugs = getWalkthroughSlugs(lang);
  const dir = contentDir(lang);
  return slugs
    .map((slug) => {
      const filePath = path.join(dir, `${slug}.mdx`);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return { ...(data as WalkthroughMeta), slug };
    })
    .sort((a, b) => a.order - b.order);
}
