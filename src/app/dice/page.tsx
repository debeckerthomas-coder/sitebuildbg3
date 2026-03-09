import type { Metadata } from "next";
import { DiceSimulatorUI } from "@/components/dice/DiceSimulatorUI";

export const metadata: Metadata = {
  title: "Dice Simulator — BG3 Honor Companion",
  description:
    "3D dice roller with advantage, disadvantage, Karmic Dice, and exact probability distributions.",
};

export default function DicePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">Dice Simulator</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Roll with Karmic Dice, advantage/disadvantage, and see exact probability
          distributions. Powered by a physics-inspired 3D engine.
        </p>
      </div>

      <DiceSimulatorUI />
    </div>
  );
}
