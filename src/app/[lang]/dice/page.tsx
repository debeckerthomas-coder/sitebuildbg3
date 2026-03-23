import type { Metadata } from "next";
import { DiceSimulatorUI } from "@/components/dice/DiceSimulatorUI";

export const metadata: Metadata = {
  title: "Simulateur de Dés — BG3 Compagnon Mode Honneur",
  description:
    "Lanceur de dés 3D avec avantage, désavantage, Dés Karmiques et distributions de probabilité exactes.",
};

export default function DicePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">Simulateur de Dés</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Lancez avec les Dés Karmiques, avantage/désavantage, et visualisez les distributions
          de probabilité exactes. Propulsé par un moteur 3D physique.
        </p>
      </div>

      <DiceSimulatorUI />
    </div>
  );
}
