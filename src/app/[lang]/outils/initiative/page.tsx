import type { Metadata } from "next";
import { InitiativeTracker } from "@/components/outils/InitiativeTracker";

export const metadata: Metadata = {
  title: "Calculateur d'Initiative | BG3 Honor Companion",
  description: "Calculez l'initiative BG3 avec le d4, le Don Alerte, et les probabilités exactes d'initiative partagée.",
};

export default function InitiativePage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-gold">Calculateur d&apos;Initiative</h1>
        <p className="text-sm font-body text-gray-400 mt-1">
          BG3 utilise un d4 pour l&apos;initiative — pas un d20. Analysez les probabilités exactes de jouer
          en premier et de partager l&apos;initiative avec vos compagnons.
        </p>
      </div>
      <InitiativeTracker />
    </div>
  );
}
