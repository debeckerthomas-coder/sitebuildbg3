// ============================================================================
// MDX Configuration — Loads .mdx files with next-mdx-remote v4
// ============================================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
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
 * Load and serialize a single walkthrough by slug.
 */
export async function getWalkthrough(slug: string): Promise<{
  mdxSource: MDXRemoteSerializeResult;
  meta: WalkthroughMeta;
}> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  const mdxSource = await serialize(content, {
    parseFrontmatter: false,
  });

  return {
    mdxSource,
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
