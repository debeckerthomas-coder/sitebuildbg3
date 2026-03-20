// ============================================================================
// MDX Utilities — Server Component compatible
// - File-based walkthrough loading from src/content/{lang}/walkthroughs/
// - Rendering helper using next-mdx-remote/rsc
// ============================================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WalkthroughMeta {
  title: string;
  act: number;
  slug: string;
  description: string;
  order: number;
}

interface Walkthrough {
  meta: WalkthroughMeta;
  source: string;
}

// ---------------------------------------------------------------------------
// Walkthrough file loading
// ---------------------------------------------------------------------------

const DEFAULT_LANG = "fr";

function contentDir(lang: string = DEFAULT_LANG): string {
  return path.join(process.cwd(), "src", "content", lang, "walkthroughs");
}

/**
 * Returns the list of walkthrough slugs (used by generateStaticParams).
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
 * Loads a single walkthrough by slug.
 * Throws if the file doesn't exist.
 */
export function getWalkthrough(slug: string, lang: string = DEFAULT_LANG): Walkthrough {
  const filePath = path.join(contentDir(lang), `${slug}.mdx`);
  if (!fs.existsSync(filePath) && lang !== DEFAULT_LANG) {
    return getWalkthrough(slug, DEFAULT_LANG);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: data as WalkthroughMeta,
    source: content,
  };
}

// ---------------------------------------------------------------------------
// MDX Rendering Helper
// ---------------------------------------------------------------------------

interface RenderMDXProps {
  /** Raw MDX source string */
  readonly source: string;
  /** Optional extra components to merge with the default map */
  readonly extraComponents?: MDXRemoteProps["components"];
}

/**
 * Render an MDX string as a React Server Component tree.
 */
export function renderMDX({ source, extraComponents }: RenderMDXProps) {
  return (
    <MDXRemote
      source={source}
      components={{ ...mdxComponents, ...extraComponents }}
    />
  );
}
