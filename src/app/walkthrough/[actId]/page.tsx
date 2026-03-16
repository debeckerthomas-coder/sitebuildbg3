// ============================================================================
// Walkthrough Page — Full SSR with next-mdx-remote/rsc (v6)
// MDXRemote runs as a Server Component, client components hydrate on client
// ============================================================================

import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWalkthrough, getWalkthroughSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { FloatingTOC } from "@/components/ui/FloatingTOC";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ actId: string }>;
}

export function generateStaticParams() {
  return getWalkthroughSlugs().map((slug) => ({ actId: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { actId } = await params;

  let walkthrough;
  try {
    walkthrough = getWalkthrough(actId);
  } catch {
    return { title: "Guide introuvable | BG3 Honor Companion" };
  }

  return {
    title: `${walkthrough.meta.title} | BG3 Honor Companion`,
    description: walkthrough.meta.description,
    openGraph: {
      title: `${walkthrough.meta.title} | BG3 Honor Companion`,
      description: walkthrough.meta.description,
      type: "article",
    },
  };
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
    <div className="relative max-w-5xl mx-auto px-4 py-8">
      {/* Floating Table of Contents — fixed right on xl screens */}
      <FloatingTOC />

      {/* Main Content with timeline border */}
      <article
        data-mdx-content
        className="prose prose-invert prose-gold max-w-none"
      >
        <h1 className="font-display text-3xl text-gold mb-2">
          {walkthrough.meta.title}
        </h1>
        <p className="text-sm font-data text-gray-400 mb-8">
          {walkthrough.meta.description}
        </p>

        {/* Timeline wrapper — vertical gold line on the left */}
        <div className="relative pl-6 md:pl-8 border-l border-gold/20 ml-2 md:ml-4 space-y-8">
          <MDXRemote
            source={walkthrough.source}
            components={mdxComponents}
          />
        </div>
      </article>
    </div>
  );
}
