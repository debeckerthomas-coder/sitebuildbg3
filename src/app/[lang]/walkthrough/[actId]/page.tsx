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

  const title = `Guide ${walkthrough.meta.title} — Baldur's Gate 3 (Mode Honneur) | BG3 Honor Companion`;
  const description = walkthrough.meta.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: walkthrough.meta.title,
    description: walkthrough.meta.description,
    author: { "@type": "Organization", name: "BG3 Honor Companion" },
    about: { "@type": "VideoGame", name: "Baldur's Gate 3" },
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
