import type { Metadata } from "next";
import { DiceSimulatorUI } from "@/components/dice/DiceSimulatorUI";

export const metadata: Metadata = {
  title: "Simulateur de Dés 3D | BG3 Honor Companion",
  description: "Lancez les dés avec Avantage, Désavantage, Dés Karmiques et distributions de probabilités exactes.",
};

export default function DesPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">Simulateur de Dés</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Lancez les dés avec les Dés Karmiques, l&apos;Avantage/Désavantage, et visualisez les distributions
          de probabilités exactes. Moteur 3D avec animations physiques.
        </p>
      </div>
      <DiceSimulatorUI />
    </div>
  );
}
