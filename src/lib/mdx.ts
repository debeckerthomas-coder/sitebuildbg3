// ============================================================================
// MDX Configuration — Server-side loading with next-mdx-remote v6 RSC
// ============================================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { WalkthroughMeta } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/walkthroughs");

/**
 * Get all walkthrough slugs for static generation.
 */
export function getWalkthroughSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Load a single walkthrough by slug.
 * Returns the raw MDX source string and parsed frontmatter.
 * MDXRemote from next-mdx-remote/rsc handles compilation server-side.
 */
export function getWalkthrough(slug: string): {
  source: string;
  meta: WalkthroughMeta;
} {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
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
export function getAllWalkthroughMeta(): WalkthroughMeta[] {
  const slugs = getWalkthroughSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return { ...(data as WalkthroughMeta), slug };
    })
    .sort((a, b) => a.order - b.order);
}
