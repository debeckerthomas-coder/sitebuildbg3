import type { Metadata } from "next";
import { DiceSimulatorUI } from "@/components/dice/DiceSimulatorUI";
import { HonorDiceSimulator } from "@/components/outils/HonorDiceSimulator";

export const metadata: Metadata = {
  title: "Simulateur de Dés & Ajustement de Lancer | BG3 Honor Companion",
  description: "Lancez les dés avec Avantage, Désavantage, Dés Karmiques et calculez vos probabilités exactes de réussite en Mode Honneur.",
};

const PAGE_TEXT = {
  fr: {
    title1: "Ajustement de Lancer",
    desc1: "Calculez vos chances exactes de réussite sur un jet de d20 en Mode Honneur. Normal, Avantage ou Désavantage — avec les règles de 1/20 naturel.",
    title2: "Simulateur de Dés 3D",
    desc2: "Lancez les dés avec les Dés Karmiques, l'Avantage/Désavantage, et visualisez les distributions de probabilités exactes. Moteur 3D avec animations physiques.",
  },
  en: {
    title1: "Roll Adjustment",
    desc1: "Calculate your exact success chances on a d20 roll in Honour Mode. Normal, Advantage or Disadvantage — with natural 1/20 rules.",
    title2: "3D Dice Simulator",
    desc2: "Roll dice with Karmic Dice, Advantage/Disadvantage, and visualize exact probability distributions. 3D engine with physics animations.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function DesPage({ params }: PageProps) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  return (
    <div className="max-w-5xl space-y-10">
      <section>
        <div className="mb-6">
          <h1 className="font-display text-3xl text-gold">{t.title1}</h1>
          <p className="text-sm font-body text-gray-400 mt-1">
            {t.desc1}
          </p>
        </div>
        <HonorDiceSimulator />
      </section>

      <div className="border-t border-border" />

      <section>
        <div className="mb-6">
          <h2 className="font-display text-2xl text-gold">{t.title2}</h2>
          <p className="text-sm font-body text-gray-400 mt-1">
            {t.desc2}
          </p>
        </div>
        <DiceSimulatorUI />
      </section>
    </div>
  );
}
