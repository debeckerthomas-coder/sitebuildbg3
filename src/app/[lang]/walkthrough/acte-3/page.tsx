import type { Metadata } from "next";
import type { Locale } from "@/dictionaries";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWalkthrough } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";

const META = {
  fr: {
    title: "Acte 3 : La Porte de Baldur & Les Élus | BG3 Honor Companion",
    description: "L'Endgame Mode Honneur. Trois Élus, un Archidiable, et le Cerveau Vénérable. Aucune marge d'erreur.",
  },
  en: {
    title: "Act 3: Baldur's Gate & The Chosen | BG3 Honor Companion",
    description: "The Honour Mode Endgame. Three Chosen, an Archdevil, and the Elder Brain. No margin for error.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = lang === "en" ? META.en : META.fr;
  return { title: t.title, description: t.description };
}

export default async function Acte3Page({ params }: PageProps) {
  const { lang } = await params;
  let walkthrough;
  try {
    walkthrough = getWalkthrough("acte-3", lang);
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
