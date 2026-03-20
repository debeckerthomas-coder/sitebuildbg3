import type { Metadata } from "next";
import { CombatLogSimulator } from "@/components/combat/CombatLogSimulator";

export const metadata: Metadata = {
  title: "Simulateur de Combat | BG3 Honor Companion",
  description: "Simulez les dégâts d'une attaque complète avec Châtiment Divin, GWF, critiques et damage riders.",
};

export default function CombatPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">Simulateur de Combat</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Détail mathématique complet d&apos;une attaque. Fidèle aux règles de BG3 / D&D 5e :
          Combat à Deux Mains (relance des 1 et 2), Châtiment Divin (dés doublés sur critique),
          Damage Riders, et Bagarreur de Taverne.
        </p>
      </div>
      <CombatLogSimulator />
    </div>
  );
}
