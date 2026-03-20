"use client";

// ============================================================================
// Acte3Client — Walkthrough Acte 3 avec EmergencyMatrix pour tous les boss
// ============================================================================

import type { PlaythroughActe } from "@/data/playthrough";
import { ChecklistTracker } from "@/components/tracker/ChecklistTracker";
import { EmergencyMatrix } from "@/components/combat/EmergencyMatrix";

interface Acte3ClientProps {
  readonly acte: PlaythroughActe;
}

export function Acte3Client({ acte }: Acte3ClientProps) {
  return (
    <div className="max-w-4xl space-y-8">
      {/* En-tête */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-display text-gold">🏰</span>
          <div>
            <h1 className="font-display text-3xl text-gold">{acte.titre}</h1>
            <p className="font-display text-sm text-gold-muted">{acte.sousTitre}</p>
          </div>
        </div>
        <p className="font-body text-sm text-gray-400 leading-relaxed max-w-2xl">
          {acte.description}
        </p>
      </div>

      {/* Section 1 : Rivington & Exploration */}
      {acte.sections[0] && (
        <section className="space-y-4">
          <ChecklistTracker
            sectionId={acte.sections[0].id}
            titre={acte.sections[0].titre}
            description={acte.sections[0].description}
            etapes={acte.sections[0].etapes}
          />
        </section>
      )}

      {/* Section 2 : Gortash & Trône de Fer */}
      {acte.sections[1] && (
        <section className="space-y-4">
          <ChecklistTracker
            sectionId={acte.sections[1].id}
            titre={acte.sections[1].titre}
            description={acte.sections[1].description}
            etapes={acte.sections[1].etapes}
          />
        </section>
      )}

      {/* Section 3 : Les Élus + EmergencyMatrix */}
      {acte.sections[2] && (
        <section className="space-y-4">
          <ChecklistTracker
            sectionId={acte.sections[2].id}
            titre={acte.sections[2].titre}
            description={acte.sections[2].description}
            etapes={acte.sections[2].etapes}
          />
          <div className="mt-6 space-y-6">
            <EmergencyMatrix bossId="gortash" />
            <EmergencyMatrix bossId="orin" />
          </div>
        </section>
      )}

      {/* Section 4 : Boss Optionnels + EmergencyMatrix */}
      {acte.sections[3] && (
        <section className="space-y-4">
          <ChecklistTracker
            sectionId={acte.sections[3].id}
            titre={acte.sections[3].titre}
            description={acte.sections[3].description}
            etapes={acte.sections[3].etapes}
          />
          <div className="mt-6 space-y-6">
            <EmergencyMatrix bossId="raphael" />
            <EmergencyMatrix bossId="ansur" />
          </div>
        </section>
      )}

      {/* Section 5 : Combat Final + EmergencyMatrix */}
      {acte.sections[4] && (
        <section className="space-y-4">
          <ChecklistTracker
            sectionId={acte.sections[4].id}
            titre={acte.sections[4].titre}
            description={acte.sections[4].description}
            etapes={acte.sections[4].etapes}
          />

          {/* Immunité Rétributive — mise en évidence rouge sang */}
          <div className="mt-4 border-2 border-blood rounded-card bg-blood-dark/10 p-5 animate-pulse-danger">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💀</span>
              <h3 className="font-display text-base text-blood-light uppercase tracking-wider">
                Immunité Rétributive — Segmentation Obligatoire
              </h3>
            </div>
            <p className="text-sm font-body text-gray-200 leading-relaxed">
              Le Cerveau Vénérable devient <strong className="text-blood-light">immunisé aux types de dégâts subis</strong> au round
              précédent. Si vous mélangez vos types de dégâts, vous ne ferez <strong className="text-blood-light">ZÉRO dégât</strong> au
              tour suivant.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="bg-abyss/60 rounded px-3 py-2 border border-blue-500/30">
                <p className="text-[10px] font-data text-blue-400 uppercase tracking-wider">Tour 1 (Magique)</p>
                <p className="text-xs font-data text-gray-400">Foudre, Froid, Force, Psychique</p>
              </div>
              <div className="bg-abyss/60 rounded px-3 py-2 border border-gold-dark/30">
                <p className="text-[10px] font-data text-gold uppercase tracking-wider">Tour 2 (Martial)</p>
                <p className="text-xs font-data text-gray-400">Radiant, Contondant, Tranchant, Perforant</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <EmergencyMatrix bossId="netherbrain" />
          </div>
        </section>
      )}
    </div>
  );
}
