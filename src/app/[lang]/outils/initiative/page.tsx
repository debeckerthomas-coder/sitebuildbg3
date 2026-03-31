import type { Metadata } from "next";
import { InitiativeTracker } from "@/components/outils/InitiativeTracker";

export const metadata: Metadata = {
  title: "Calculateur d'Initiative | BG3 Honor Companion",
  description: "Calculez l'initiative BG3 avec le d4, le Don Alerte, et les probabilités exactes d'initiative partagée.",
};

const PAGE_TEXT = {
  fr: {
    title: "Calculateur d'Initiative",
    description: "BG3 utilise un d4 pour l'initiative — pas un d20. Analysez les probabilités exactes de jouer en premier et de partager l'initiative avec vos compagnons.",
  },
  en: {
    title: "Initiative Calculator",
    description: "BG3 uses a d4 for initiative — not a d20. Analyze the exact probabilities of going first and sharing initiative with your companions.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function InitiativePage({ params }: PageProps) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">{t.title}</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          {t.description}
        </p>
      </div>
      <InitiativeTracker />
    </div>
  );
}
