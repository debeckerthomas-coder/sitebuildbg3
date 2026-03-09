// ============================================================================
// MDX Utilities — Server Component compatible
// - File-based walkthrough loading from src/content/walkthroughs/
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

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "walkthroughs");

/**
 * Returns the list of walkthrough slugs (used by generateStaticParams).
 */
export function getWalkthroughSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Loads a single walkthrough by slug.
 * Throws if the file doesn't exist.
 */
export function getWalkthrough(slug: string): Walkthrough {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
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
 *
 * ```tsx
 * import { renderMDX } from "@/lib/mdx";
 * export default function Page() {
 *   return renderMDX({ source: mdxString });
 * }
 * ```
 */
export function renderMDX({ source, extraComponents }: RenderMDXProps) {
  return (
    <MDXRemote
      source={source}
      components={{ ...mdxComponents, ...extraComponents }}
    />
  );
}
