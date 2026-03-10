import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWalkthrough } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";

export const metadata: Metadata = {
  title: "Acte 1 : La Route Pacifique — Niveaux 1 à 4 | BG3 Honor Companion",
  description: "Atteignez le Niveau 4 sans lancer les dés. La fondation de toute run Mode Honneur réussie.",
};

export default function Acte1Page() {
  let walkthrough;
  try {
    walkthrough = getWalkthrough("acte-1");
  } catch {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article
        data-mdx-content
        className="prose prose-invert prose-gold max-w-none
          prose-headings:font-display prose-headings:text-gold
          prose-p:font-body prose-p:text-gray-300 prose-p:leading-relaxed
          prose-strong:text-gold-light
          prose-blockquote:border-l-gold/40 prose-blockquote:bg-surface-raised
          prose-blockquote:rounded-card prose-blockquote:py-3 prose-blockquote:px-4
          prose-blockquote:not-italic prose-blockquote:text-gray-400
          prose-li:text-gray-300 prose-li:font-body
          prose-hr:border-border
        "
      >
        <h1 className="font-display text-3xl sm:text-4xl text-gold mb-2">
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
    </div>
  );
}
