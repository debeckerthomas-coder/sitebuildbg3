"use client";

import { useMemo } from "react";
import { useAppStore } from "@/store";
import { BUILDS_TIER_S } from "@/data/builds/tier-s";
import {
  analyzeRelics,
  detectLootConflicts,
  type RelicRecommendation,
  type LootConflict,
} from "@/lib/party-analysis";
import type { CompanionSlot } from "@/types";

// ---------------------------------------------------------------------------
// Build options for selectors
// ---------------------------------------------------------------------------

const BUILD_OPTIONS = BUILDS_TIER_S.map((b) => ({ id: b.id, name: b.name }));

// ---------------------------------------------------------------------------
// Slot selector component
// ---------------------------------------------------------------------------

function SlotSelector({
  label,
  icon,
  value,
  onChange,
  disabledIds,
}: {
  label: string;
  icon: string;
  value: string | null;
  onChange: (id: string) => void;
  disabledIds: readonly string[];
}) {
  return (
    <div className="bg-[#111520]/60 backdrop-blur-md border border-theme/20 rounded-xl p-4 transition-all duration-300 hover:border-theme/40">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <span className="font-heading text-xs text-theme uppercase tracking-wider">
          {label}
        </span>
      </div>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg text-sm font-data bg-abyss-100 text-gray-200 border border-border hover:border-theme/40 focus:border-theme/60 focus:outline-none transition-colors appearance-none cursor-pointer"
      >
        <option value="">— Emplacement vide —</option>
        {BUILD_OPTIONS.map((b) => (
          <option key={b.id} value={b.id} disabled={disabledIds.includes(b.id)}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Relic Card
// ---------------------------------------------------------------------------

function RelicCard({ relic }: { relic: RelicRecommendation }) {
  return (
    <div className="bg-abyss-100/60 border border-border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5" aria-hidden>
          {relic.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="font-heading text-sm text-theme uppercase tracking-wide">
            {relic.relic}
          </h4>
          <p className="text-xs font-body text-gray-400 mt-1">{relic.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] font-data uppercase tracking-wider text-gray-500">
              Recommandé à :
            </span>
            <span className="text-sm font-data font-semibold text-theme-light">
              {relic.recommendedName}
            </span>
          </div>
          <p className="text-xs font-body text-gray-300 mt-2 leading-relaxed border-l-2 border-theme/20 pl-3">
            {relic.reasoning}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Conflict Alert
// ---------------------------------------------------------------------------

function ConflictAlert({ conflict }: { conflict: LootConflict }) {
  const isCritical = conflict.severity === "critical";
  return (
    <div
      className={`border rounded-lg p-4 ${
        isCritical
          ? "bg-blood/10 border-blood/40"
          : "bg-yellow-900/10 border-yellow-600/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5" aria-hidden>
          {conflict.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`font-heading text-sm uppercase tracking-wide ${
                isCritical ? "text-blood-light" : "text-yellow-400"
              }`}
            >
              {conflict.title}
            </h4>
            {isCritical && (
              <span className="text-[9px] font-data uppercase px-1.5 py-0.5 rounded bg-blood/30 text-blood-light tracking-wider">
                Critique
              </span>
            )}
          </div>
          <p className="text-xs font-body text-gray-300 mt-1.5">{conflict.description}</p>
          <div className="mt-2 text-[10px] font-data text-gray-500">
            Builds concernés : {conflict.builds.join(", ")}
          </div>
          <div className="mt-3 bg-abyss/40 rounded p-3 border border-border/50">
            <span className="text-[10px] font-data uppercase tracking-wider text-theme-muted">
              Résolution :
            </span>
            <p className="text-xs font-body text-gray-300 mt-1 leading-relaxed">
              {conflict.resolution}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function GroupePage() {
  const party = useAppStore((s) => s.party);
  const setMainBuild = useAppStore((s) => s.setMainBuild);
  const setCompanion = useAppStore((s) => s.setCompanion);

  // Collect all selected IDs (for disabling duplicates)
  const selectedIds = useMemo(
    () => [party.main, party.comp1, party.comp2, party.comp3].filter(Boolean) as string[],
    [party]
  );

  // Get disabled IDs per slot (can't pick the same build twice)
  const disabledFor = (currentValue: string | null) =>
    selectedIds.filter((id) => id !== currentValue);

  // Analysis
  const relics = useMemo(() => analyzeRelics(selectedIds), [selectedIds]);
  const conflicts = useMemo(() => detectLootConflicts(selectedIds), [selectedIds]);

  const hasAnalysis = selectedIds.length >= 2;

  return (
    <div className="max-w-5xl space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-4xl text-gradient-gold uppercase tracking-wide">
          Le Conseil de Guerre
        </h1>
        <p className="font-heading text-lg text-theme/80 mt-1 tracking-wider uppercase">
          Synergie &amp; Répartition
        </p>
        <p className="text-sm font-body text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed">
          Composez votre groupe de 4 et découvrez instantanément comment répartir
          les reliques uniques du jeu et quels conflits de butin anticiper.
        </p>
        <div className="mx-auto mt-4 w-32 h-px bg-gradient-to-r from-transparent via-theme/50 to-transparent" />
      </div>

      {/* Party Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SlotSelector
          label="Main Character"
          icon="👑"
          value={party.main}
          onChange={(id) => setMainBuild(id)}
          disabledIds={disabledFor(party.main)}
        />
        <SlotSelector
          label="Compagnon 1"
          icon="🗡️"
          value={party.comp1}
          onChange={(id) => setCompanion("comp1" as CompanionSlot, id || null)}
          disabledIds={disabledFor(party.comp1)}
        />
        <SlotSelector
          label="Compagnon 2"
          icon="🛡️"
          value={party.comp2}
          onChange={(id) => setCompanion("comp2" as CompanionSlot, id || null)}
          disabledIds={disabledFor(party.comp2)}
        />
        <SlotSelector
          label="Compagnon 3"
          icon="🔮"
          value={party.comp3}
          onChange={(id) => setCompanion("comp3" as CompanionSlot, id || null)}
          disabledIds={disabledFor(party.comp3)}
        />
      </div>

      {/* Status bar */}
      <div className="text-center">
        {!hasAnalysis ? (
          <p className="text-sm font-data text-gray-500 italic">
            Sélectionnez au moins 2 personnages pour activer l&apos;analyse de groupe.
          </p>
        ) : (
          <p className="text-sm font-data text-theme/70">
            {selectedIds.length}/4 membres sélectionnés — Analyse active
          </p>
        )}
      </div>

      {/* Analysis Panels */}
      {hasAnalysis && (
        <div className="space-y-10">
          {/* Panel A: Relics */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl" aria-hidden>
                💎
              </span>
              <div>
                <h2 className="font-heading text-xl text-gradient-gold uppercase tracking-wide">
                  La Matrice des Reliques
                </h2>
                <p className="text-xs font-data text-gray-500 mt-0.5">
                  Stats permanentes — Qui reçoit quoi ?
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {relics.map((r) => (
                <RelicCard key={r.relic} relic={r} />
              ))}
            </div>
          </section>

          {/* Panel B: Loot Conflicts */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl" aria-hidden>
                ⚠️
              </span>
              <div>
                <h2 className="font-heading text-xl text-gradient-gold uppercase tracking-wide">
                  Alerte de Conflits de Butin
                </h2>
                <p className="text-xs font-data text-gray-500 mt-0.5">
                  Objets uniques convoités par plusieurs membres
                </p>
              </div>
            </div>
            {conflicts.length === 0 ? (
              <div className="bg-emerald-900/10 border border-emerald-600/20 rounded-lg p-6 text-center">
                <span className="text-3xl block mb-2" aria-hidden>
                  ✅
                </span>
                <p className="text-sm font-data text-emerald-400">
                  Aucun conflit de butin détecté. Cette composition est optimale !
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {conflicts.map((c) => (
                  <ConflictAlert key={c.title} conflict={c} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
