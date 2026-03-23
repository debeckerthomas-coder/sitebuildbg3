import type { Metadata } from "next";
import { PointBuyCalculator } from "@/components/outils/PointBuyCalculator";

export const metadata: Metadata = {
  title: "La Forge des Caractéristiques | BG3 Honor Companion",
  description:
    "Calculateur de statistiques Point Buy 27 pour Baldur's Gate 3. Optimisez vos caractéristiques avec les bonus raciaux pour le Mode Honneur.",
};

export default function ForgePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">
          La Forge des Caractéristiques
        </h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Calculateur Point Buy 27 — Répartissez vos 27 points selon les règles de BG3,
          puis assignez vos bonus raciaux +2 et +1.
        </p>
      </div>

      <PointBuyCalculator />
    </div>
  );
}
