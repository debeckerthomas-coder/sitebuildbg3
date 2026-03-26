import type { Metadata } from "next";
import DamageCalculator from "@/components/tools/DamageCalculator";

export const metadata: Metadata = {
  title: "Theorycraft Engine : Calculateur de Dégâts | BG3 Honor Companion",
  description:
    "Calculez vos dégâts min, max et moyens en Mode Honneur. Paramétrez vos dés, modificateurs et bonus pour optimiser chaque attaque.",
};

export default function CalculateurPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">
          Theorycraft Engine : Calculateur de Dégâts
        </h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Paramétrez vos dés, modificateurs de caractéristique et bonus
          d&apos;enchantement pour visualiser vos dégâts en temps réel.
        </p>
      </div>
      <DamageCalculator />
    </div>
  );
}
