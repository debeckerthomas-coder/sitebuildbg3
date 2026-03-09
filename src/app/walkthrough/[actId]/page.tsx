// ============================================================================
// Walkthrough Page — Server-rendered MDX with custom components
// ============================================================================

import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWalkthrough, getWalkthroughSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { TableOfContentsWrapper } from "./TableOfContentsWrapper";

interface PageProps {
  params: Promise<{ actId: string }>;
}

export function generateStaticParams() {
  return getWalkthroughSlugs().map((slug) => ({ actId: slug }));
}

export default async function WalkthroughPage({ params }: PageProps) {
  const { actId } = await params;

  let walkthrough;
  try {
    walkthrough = getWalkthrough(actId);
  } catch {
    notFound();
  }

  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-4 py-8">
      {/* Main Content */}
      <article
        data-mdx-content
        className="flex-1 min-w-0 prose prose-invert prose-gold max-w-none"
      >
        <h1 className="font-display text-3xl text-gold mb-2">
          {walkthrough.meta.title}
        </h1>
        <p className="text-sm font-data text-gray-400 mb-8">
          {walkthrough.meta.description}
        </p>

        <MDXRemote
          source={walkthrough.source}
          components={mdxComponents}
        />
      </article>

      {/* Sidebar ToC */}
      <aside className="hidden lg:block w-56 shrink-0">
        <TableOfContentsWrapper />
      </aside>
    </div>
  );
}
