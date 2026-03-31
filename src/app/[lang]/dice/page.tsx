import type { Metadata } from "next";
import { DiceSimulatorUI } from "@/components/dice/DiceSimulatorUI";

export const metadata: Metadata = {
  title: "Simulateur de Dés — BG3 Compagnon Mode Honneur",
  description:
    "Lanceur de dés 3D avec avantage, désavantage, Dés Karmiques et distributions de probabilité exactes.",
};

const PAGE_TEXT = {
  fr: {
    title: "Simulateur de Dés",
    description: "Lancez avec les Dés Karmiques, avantage/désavantage, et visualisez les distributions de probabilité exactes. Propulsé par un moteur 3D physique.",
  },
  en: {
    title: "Dice Simulator",
    description: "Roll with Karmic Dice, advantage/disadvantage, and visualize exact probability distributions. Powered by a 3D physics engine.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function DicePage({ params }: PageProps) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">{t.title}</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          {t.description}
        </p>
      </div>

      <DiceSimulatorUI />
    </div>
  );
}
