"use client";

// ============================================================================
// Acte2Client — Walkthrough Acte 2 avec EmergencyMatrix pour Balthazar & Myrkul
// ============================================================================

import type { PlaythroughActe } from "@/data/playthrough";
import { ChecklistTracker } from "@/components/tracker/ChecklistTracker";
import { EmergencyMatrix } from "@/components/combat/EmergencyMatrix";

interface Acte2ClientProps {
  readonly acte: PlaythroughActe;
}

export function Acte2Client({ acte }: Acte2ClientProps) {
  return (
    <div className="max-w-4xl space-y-8">
      {/* En-tête */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-display text-gold">🌑</span>
          <div>
            <h1 className="font-display text-3xl text-gold">{acte.titre}</h1>
            <p className="font-display text-sm text-gold-muted">{acte.sousTitre}</p>
          </div>
        </div>
        <p className="font-body text-sm text-gray-400 leading-relaxed max-w-2xl">
          {acte.description}
        </p>
      </div>

      {/* Section 1 : Survie et Infiltration */}
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

      {/* Section 2 : Piège de Balthazar + EmergencyMatrix */}
      {acte.sections[1] && (
        <section className="space-y-4">
          <ChecklistTracker
            sectionId={acte.sections[1].id}
            titre={acte.sections[1].titre}
            description={acte.sections[1].description}
            etapes={acte.sections[1].etapes}
          />

          {/* EmergencyMatrix Balthazar */}
          <div className="mt-6">
            <EmergencyMatrix bossId="balthazar" />
          </div>
        </section>
      )}

      {/* Section 3 : Apôtre de Myrkul + EmergencyMatrix */}
      {acte.sections[2] && (
        <section className="space-y-4">
          <ChecklistTracker
            sectionId={acte.sections[2].id}
            titre={acte.sections[2].titre}
            description={acte.sections[2].description}
            etapes={acte.sections[2].etapes}
          />

          {/* Aura de Frisson Osseux — mise en évidence rouge sang */}
          <div className="mt-4 border-2 border-blood rounded-card bg-blood-dark/10 p-5 animate-pulse-danger">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💀</span>
              <h3 className="font-display text-base text-blood-light uppercase tracking-wider">
                Aura de Frisson Osseux — Zone de Mort
              </h3>
            </div>
            <p className="text-sm font-body text-gray-200 leading-relaxed">
              Sur la plateforme de l&apos;Apôtre, <strong className="text-blood-light">aucune guérison ne fonctionne</strong>.
              Sorts de soin, potions, capacités — TOUT est bloqué. Un personnage qui tombe à 0 PV
              <strong className="text-blood-light"> ne peut pas être réanimé</strong>.
              Buffez AVANT d&apos;engager : Protection contre la Mort, PV temporaires, Résistance Nécrotique.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="bg-abyss/60 rounded px-3 py-2 border border-blood/30">
                <p className="text-[10px] font-data text-blood-light uppercase tracking-wider">Interdit</p>
                <p className="text-xs font-data text-gray-400">Soin, Réanimation, Mot de Guérison</p>
              </div>
              <div className="bg-abyss/60 rounded px-3 py-2 border border-gold-dark/30">
                <p className="text-[10px] font-data text-gold uppercase tracking-wider">Autorisé</p>
                <p className="text-xs font-data text-gray-400">PV temp., Protection Mort, Élixirs pré-combat</p>
              </div>
            </div>
          </div>

          {/* EmergencyMatrix Myrkul */}
          <div className="mt-6">
            <EmergencyMatrix bossId="apotre_myrkul" />
          </div>
        </section>
      )}
    </div>
  );
}
