import type { Metadata } from "next";
import { PreparationChecklist } from "@/components/outils/PreparationChecklist";

export const metadata: Metadata = {
  title:
    "Le Rituel de Préparation : Checklist de Buffs de Repos Long | BG3 Honor Companion",
  description:
    "Ne partez jamais au combat sans vos buffs. Checklist interactive et persistante pour préparer votre groupe après chaque Repos Long en Mode Honneur.",
};

const PAGE_TEXT = {
  fr: {
    title: "Le Rituel de Préparation",
    description: "Checklist de Buffs de Repos Long — cochez chaque buff au fur et à mesure. Votre progression est sauvegardée automatiquement entre les sessions.",
  },
  en: {
    title: "The Preparation Ritual",
    description: "Long Rest Buff Checklist — check off each buff as you go. Your progress is automatically saved between sessions.",
  },
} as const;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function PreparationPage({ params }: PageProps) {
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

      <PreparationChecklist />
    </div>
  );
}
