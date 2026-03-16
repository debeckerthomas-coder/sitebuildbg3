import type { Metadata } from "next";
import { NovaCalculator } from "@/components/outils/NovaCalculator";

export const metadata: Metadata = {
  title: "L'Orbe de Puissance : Calculateur de Burst (Nova) | BG3 Honor Companion",
  description:
    "Calculez les dégâts de Châtiment Divin en un clic. Lockadin, Bardadin, Sorcadin — optimisez votre burst Nova en Mode Honneur.",
};

export default function NovaPage() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">
          L&apos;Orbe de Puissance
        </h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Calculateur de dégâts pour les builds Châtiment Divin (Lockadin /
          Bardadin / Sorcadin). Ajustez vos paramètres, le résultat se met à
          jour en direct.
        </p>
      </div>

      <NovaCalculator />
    </div>
  );
}
