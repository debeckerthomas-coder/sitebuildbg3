import type { Metadata } from "next";
import { BuildsGrid } from "./BuildsGrid";

export const metadata: Metadata = {
  title: "Tier List — 10 Builds Tier S | BG3 Honor Companion",
  description: "Les 10 builds Tier S du Mode Honneur de Baldur's Gate 3. Theorycraft vérifié, équipement Best-in-Slot, failsafes.",
};

export default function BuildsPage() {
  return (
    <div className="max-w-7xl space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs font-data uppercase tracking-[0.3em] text-gold/50">
          Mode Honneur — Méta Vérifiée
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-amber-600">
          Les 10 Builds Tier S
        </h1>
        <p className="text-sm font-body text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Chaque build a été vérifié pour le Mode Honneur avec les équipements
          Best-in-Slot, les failsafes si un objet clé est manqué, et les
          rotations de combat optimisées.
        </p>
        <div className="flex justify-center">
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-2" />
        </div>
      </div>
      <BuildsGrid />
    </div>
  );
}
