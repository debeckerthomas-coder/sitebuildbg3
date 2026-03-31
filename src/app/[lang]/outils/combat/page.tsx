import type { Metadata } from "next";
import { CombatLogSimulator } from "@/components/combat/CombatLogSimulator";

export const metadata: Metadata = {
  title: "Simulateur de Combat | BG3 Honor Companion",
  description: "Simulez les dégâts d'une attaque complète avec Châtiment Divin, GWF, critiques et damage riders.",
};

const PAGE_TEXT = {
  fr: {
    title: "Simulateur de Combat",
    description: "Détail mathématique complet d'une attaque. Fidèle aux règles de BG3 / D&D 5e : Combat à Deux Mains (relance des 1 et 2), Châtiment Divin (dés doublés sur critique), Damage Riders, et Bagarreur de Taverne.",
  },
  en: {
    title: "Combat Simulator",
    description: "Complete mathematical breakdown of an attack. Faithful to BG3 / D&D 5e rules: Great Weapon Fighting (reroll 1s and 2s), Divine Smite (doubled dice on crit), Damage Riders, and Tavern Brawler.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function CombatPage({ params }: PageProps) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">{t.title}</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          {t.description}
        </p>
      </div>
      <CombatLogSimulator />
    </div>
  );
}
