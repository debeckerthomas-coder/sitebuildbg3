"use client";

// ============================================================================
// WalkthroughClient — Composant client partagé pour les pages walkthrough
// ============================================================================

import type { PlaythroughActe } from "@/data/playthrough";
import { ChecklistTracker } from "@/components/tracker/ChecklistTracker";

interface WalkthroughClientProps {
  readonly acte: PlaythroughActe;
}

export function WalkthroughClient({ acte }: WalkthroughClientProps) {
  return (
    <div className="max-w-4xl space-y-8">
      {/* En-tête */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-display text-gold">
            {acte.acte === 1 ? "🏕️" : acte.acte === 2 ? "🌑" : "🏰"}
          </span>
          <div>
            <h1 className="font-display text-3xl text-gold">{acte.titre}</h1>
            <p className="font-display text-sm text-gold-muted">{acte.sousTitre}</p>
          </div>
        </div>
        <p className="font-body text-sm text-gray-400 leading-relaxed max-w-2xl">
          {acte.description}
        </p>
      </div>

      {/* Sections avec ChecklistTracker */}
      {acte.sections.map((section) => (
        <section key={section.id} className="space-y-4">
          <ChecklistTracker
            sectionId={section.id}
            titre={section.titre}
            description={section.description}
            etapes={section.etapes}
          />
        </section>
      ))}
    </div>
  );
}
