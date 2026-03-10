// ============================================================================
// Build MDX Loader — Server-side loading for build deep-dive content
// ============================================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BUILDS_CONTENT_DIR = path.join(process.cwd(), "src/content/builds");

export interface BuildMDXMeta {
  title: string;
  buildId: string;
  description: string;
}

/**
 * Load MDX content for a build by its slug (filename without .mdx).
 * Returns null if no MDX file exists for this build.
 */
export function getBuildMDX(slug: string): { source: string; meta: BuildMDXMeta } | null {
  const filePath = path.join(BUILDS_CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);

  return {
    source: content,
    meta: data as BuildMDXMeta,
  };
}

/**
 * Get all available build MDX slugs.
 */
export function getBuildMDXSlugs(): string[] {
  if (!fs.existsSync(BUILDS_CONTENT_DIR)) return [];
  return fs
    .readdirSync(BUILDS_CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
