import type { Metadata } from "next";
import { DiceSimulatorUI } from "@/components/dice/DiceSimulatorUI";
import { HonorDiceSimulator } from "@/components/outils/HonorDiceSimulator";

export const metadata: Metadata = {
  title: "Simulateur de Dés & Ajustement de Lancer | BG3 Honor Companion",
  description: "Lancez les dés avec Avantage, Désavantage, Dés Karmiques et calculez vos probabilités exactes de réussite en Mode Honneur.",
};

export default function DesPage() {
  return (
    <div className="max-w-5xl space-y-10">
      {/* Section 1 : Ajustement de Lancer (Honor Dice) */}
      <section>
        <div className="mb-6">
          <h1 className="font-display text-3xl text-gold">Ajustement de Lancer</h1>
          <p className="text-sm font-body text-gray-400 mt-1">
            Calculez vos chances exactes de réussite sur un jet de d20 en Mode Honneur.
            Normal, Avantage ou Désavantage — avec les règles de 1/20 naturel.
          </p>
        </div>
        <HonorDiceSimulator />
      </section>

      {/* Séparateur */}
      <div className="border-t border-border" />

      {/* Section 2 : Simulateur de Dés 3D */}
      <section>
        <div className="mb-6">
          <h2 className="font-display text-2xl text-gold">Simulateur de Dés 3D</h2>
          <p className="text-sm font-body text-gray-400 mt-1">
            Lancez les dés avec les Dés Karmiques, l&apos;Avantage/Désavantage, et visualisez les distributions
            de probabilités exactes. Moteur 3D avec animations physiques.
          </p>
        </div>
        <DiceSimulatorUI />
      </section>
    </div>
  );
}
