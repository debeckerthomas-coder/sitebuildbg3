import type { Metadata } from "next";
import { NovaCalculator } from "@/components/outils/NovaCalculator";

export const metadata: Metadata = {
  title: "L'Orbe de Puissance : Calculateur de Burst (Nova) | BG3 Honor Companion",
  description:
    "Calculez les dégâts de Châtiment Divin en un clic. Lockadin, Bardadin, Sorcadin — optimisez votre burst Nova en Mode Honneur.",
};

const PAGE_TEXT = {
  fr: {
    title: "L'Orbe de Puissance",
    description: "Calculateur de dégâts pour les builds Châtiment Divin (Lockadin / Bardadin / Sorcadin). Ajustez vos paramètres, le résultat se met à jour en direct.",
  },
  en: {
    title: "The Power Orb",
    description: "Damage calculator for Divine Smite builds (Lockadin / Bardadin / Sorcadin). Adjust your parameters and see results update in real time.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function NovaPage({ params }: PageProps) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">
          {t.title}
        </h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          {t.description}
        </p>
      </div>

      <NovaCalculator />
    </div>
  );
}
