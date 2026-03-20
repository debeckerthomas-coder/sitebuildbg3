// ============================================================================
// Build MDX Loader — Server-side loading for build deep-dive content
// Supports i18n: reads from src/content/{lang}/builds/
// ============================================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DEFAULT_LANG = "fr";

export interface BuildMDXMeta {
  title: string;
  buildId: string;
  description: string;
}

function contentDir(lang: string = DEFAULT_LANG): string {
  return path.join(process.cwd(), "src/content", lang, "builds");
}

/**
 * Load MDX content for a build by its slug (filename without .mdx).
 * Returns null if no MDX file exists for this build.
 */
export function getBuildMDX(slug: string, lang: string = DEFAULT_LANG): { source: string; meta: BuildMDXMeta } | null {
  const filePath = path.join(contentDir(lang), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    // Fallback to default language if requested lang file doesn't exist
    if (lang !== DEFAULT_LANG) {
      return getBuildMDX(slug, DEFAULT_LANG);
    }
    return null;
  }

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
export function getBuildMDXSlugs(lang: string = DEFAULT_LANG): string[] {
  const dir = contentDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
