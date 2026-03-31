import type { Metadata } from "next";
import { PointBuyCalculator } from "@/components/outils/PointBuyCalculator";

export const metadata: Metadata = {
  title: "La Forge des Caractéristiques | BG3 Honor Companion",
  description:
    "Calculateur de statistiques Point Buy 27 pour Baldur's Gate 3. Optimisez vos caractéristiques avec les bonus raciaux pour le Mode Honneur.",
};

const PAGE_TEXT = {
  fr: {
    title: "La Forge des Caractéristiques",
    description: "Calculateur Point Buy 27 — Répartissez vos 27 points selon les règles de BG3, puis assignez vos bonus raciaux +2 et +1.",
  },
  en: {
    title: "The Ability Forge",
    description: "27 Point Buy Calculator — Distribute your 27 points according to BG3 rules, then assign your +2 and +1 racial bonuses.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function ForgePage({ params }: PageProps) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">
          {t.title}
        </h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          {t.description}
        </p>
      </div>

      <PointBuyCalculator />
    </div>
  );
}
