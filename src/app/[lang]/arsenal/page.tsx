import type { Metadata } from "next";
import type { Locale } from "@/dictionaries";
import { ArsenalGrid } from "./ArsenalGrid";

export const metadata: Metadata = {
  title: "Armurerie & Loot — Baldur's Gate 3 (Mode Honneur) | BG3 Honor Companion",
  description:
    "Découvrez la base de données ultime des objets, armes et armures pour le Mode Honneur de BG3. Statistiques, synergies et localisations exactes.",
  openGraph: {
    title: "Armurerie & Loot — Baldur's Gate 3 (Mode Honneur) | BG3 Honor Companion",
    description:
      "Découvrez la base de données ultime des objets, armes et armures pour le Mode Honneur de BG3. Statistiques, synergies et localisations exactes.",
    type: "website",
  },
};

const PAGE_TEXT = {
  fr: {
    tagline: "Hub d'Exposition — Mode Honneur",
    title: "L'Arsenal des Héros",
    titleSub: "de la Porte de Baldur",
    description: "L'encyclopédie visuelle de tout l'équipement qui compte. Des Vestiges Légendaires aux trouvailles de l'Acte 1, explorez chaque objet qui définit les 9 builds Tier S du Mode Honneur.",
  },
  en: {
    tagline: "Showcase Hub — Honour Mode",
    title: "The Heroes' Arsenal",
    titleSub: "of Baldur's Gate",
    description: "The visual encyclopedia of every piece of gear that matters. From Legendary Vestiges to Act 1 finds, explore every item that defines the 9 Tier S Honour Mode builds.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ArsenalPage({ params }: PageProps) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Armurerie & Loot — Baldur's Gate 3 (Mode Honneur)",
    description:
      "Découvrez la base de données ultime des objets, armes et armures pour le Mode Honneur de BG3. Statistiques, synergies et localisations exactes.",
    author: { "@type": "Organization", name: "BG3 Honor Companion" },
    about: { "@type": "VideoGame", name: "Baldur's Gate 3" },
  };

  return (
    <div className="max-w-7xl space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== EN-TÊTE D'EXPOSITION PREMIUM ===== */}
      <div className="text-center space-y-4 pt-4">
        <p className="text-[10px] font-data uppercase tracking-[0.4em] text-gold/40">
          {t.tagline}
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-amber-600 leading-tight">
          {t.title}
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-amber-400/80 via-yellow-300/60 to-gold/40 bg-clip-text text-transparent">
            {t.titleSub}
          </span>
        </h1>
        <p className="text-sm font-body text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t.description}
        </p>
        <div className="flex items-center justify-center gap-4 pt-1">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold/30" />
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
          </div>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>

      {/* ===== GRILLE INTERACTIVE ===== */}
      <ArsenalGrid lang={lang} />
    </div>
  );
}
