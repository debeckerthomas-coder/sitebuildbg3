import type { Metadata } from "next";
import { BuildsGrid } from "./BuildsGrid";

export const metadata: Metadata = {
  title: "Tier List — 9 Builds Tier S | BG3 Honor Companion",
  description: "Les 9 builds Tier S du Mode Honneur de Baldur's Gate 3. Theorycraft vérifié, équipement Best-in-Slot, failsafes.",
};

export default function BuildsPage() {
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">Tier List — Builds Mode Honneur</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Les 9 builds Tier S reconnus par la méta BG3. Chaque build a été vérifié pour le Mode Honneur
          avec les équipements Best-in-Slot et les failsafes si un objet clé est manqué.
        </p>
      </div>
      <BuildsGrid />
    </div>
  );
}
