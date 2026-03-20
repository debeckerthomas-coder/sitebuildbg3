import type { Metadata } from "next";
import { PreparationChecklist } from "@/components/outils/PreparationChecklist";

export const metadata: Metadata = {
  title:
    "Le Rituel de Préparation : Checklist de Buffs de Repos Long | BG3 Honor Companion",
  description:
    "Ne partez jamais au combat sans vos buffs. Checklist interactive et persistante pour préparer votre groupe après chaque Repos Long en Mode Honneur.",
};

export default function PreparationPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">
          Le Rituel de Préparation
        </h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          Checklist de Buffs de Repos Long — cochez chaque buff au fur et à
          mesure. Votre progression est sauvegardée automatiquement entre les
          sessions.
        </p>
      </div>

      <PreparationChecklist />
    </div>
  );
}
