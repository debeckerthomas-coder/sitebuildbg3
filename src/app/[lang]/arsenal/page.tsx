import type { Metadata } from "next";
import type { Locale } from "@/dictionaries";
import { ArsenalGrid } from "./ArsenalGrid";

export const metadata: Metadata = {
  title: "L'Arsenal des Héros | BG3 Honor Companion",
  description:
    "L'encyclopédie visuelle des équipements Best-in-Slot de Baldur's Gate 3. Vestiges Légendaires, Trésors Très Rares, et les meilleurs objets par acte pour le Mode Honneur.",
};

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ArsenalPage({ params }: PageProps) {
  const { lang } = await params;
  return (
    <div className="max-w-7xl space-y-10">
      {/* ===== EN-TÊTE D'EXPOSITION PREMIUM ===== */}
      <div className="text-center space-y-4 pt-4">
        <p className="text-[10px] font-data uppercase tracking-[0.4em] text-gold/40">
          Hub d&apos;Exposition — Mode Honneur
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-amber-600 leading-tight">
          L&apos;Arsenal des H&eacute;ros
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-amber-400/80 via-yellow-300/60 to-gold/40 bg-clip-text text-transparent">
            de la Porte de Baldur
          </span>
        </h1>
        <p className="text-sm font-body text-gray-400 max-w-2xl mx-auto leading-relaxed">
          L&apos;encyclop&eacute;die visuelle de tout l&apos;&eacute;quipement qui compte.
          Des Vestiges L&eacute;gendaires aux trouvailles de l&apos;Acte 1,
          explorez chaque objet qui d&eacute;finit les 9 builds Tier S
          du Mode Honneur.
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
