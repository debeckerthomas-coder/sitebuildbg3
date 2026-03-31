"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
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
// i18n
// ---------------------------------------------------------------------------

const PAGE_TEXT = {
  fr: {
    title: "Le Conseil de Guerre",
    subtitle: "Synergie & Répartition",
    description: "Composez votre groupe de 4 et découvrez instantanément comment répartir les reliques uniques du jeu et quels conflits de butin anticiper.",
    mainChar: "Personnage Principal",
    companion: "Compagnon",
    emptySlot: "— Emplacement vide —",
    selectHint: "Sélectionnez au moins 2 personnages pour activer l'analyse de groupe.",
    membersSelected: "membres sélectionnés — Analyse active",
    relicsTitle: "La Matrice des Reliques",
    relicsSub: "Stats permanentes — Qui reçoit quoi ?",
    recommendedTo: "Recommandé à :",
    conflictsTitle: "Alerte de Conflits de Butin",
    conflictsSub: "Objets uniques convoités par plusieurs membres",
    noConflicts: "Aucun conflit de butin détecté. Cette composition est optimale !",
    critical: "Critique",
    buildsInvolved: "Builds concernés :",
    resolution: "Résolution :",
  },
  en: {
    title: "The War Council",
    subtitle: "Synergy & Distribution",
    description: "Build your party of 4 and instantly discover how to distribute the game's unique relics and which loot conflicts to anticipate.",
    mainChar: "Main Character",
    companion: "Companion",
    emptySlot: "— Empty slot —",
    selectHint: "Select at least 2 characters to activate party analysis.",
    membersSelected: "members selected — Analysis active",
    relicsTitle: "The Relic Matrix",
    relicsSub: "Permanent stats — Who gets what?",
    recommendedTo: "Recommended to:",
    conflictsTitle: "Loot Conflict Alert",
    conflictsSub: "Unique items coveted by multiple members",
    noConflicts: "No loot conflicts detected. This composition is optimal!",
    critical: "Critical",
    buildsInvolved: "Builds involved:",
    resolution: "Resolution:",
  },
} as const;

function extractLang(pathname: string): "fr" | "en" {
  return pathname.split("/")[1] === "en" ? "en" : "fr";
}

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
  emptyLabel,
}: {
  label: string;
  icon: string;
  value: string | null;
  onChange: (id: string) => void;
  disabledIds: readonly string[];
  emptyLabel: string;
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
        <option value="">{emptyLabel}</option>
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

function RelicCard({ relic, recommendedLabel }: { relic: RelicRecommendation; recommendedLabel: string }) {
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
              {recommendedLabel}
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

function ConflictAlert({ conflict, t }: { conflict: LootConflict; t: (typeof PAGE_TEXT)[keyof typeof PAGE_TEXT] }) {
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
                {t.critical}
              </span>
            )}
          </div>
          <p className="text-xs font-body text-gray-300 mt-1.5">{conflict.description}</p>
          <div className="mt-2 text-[10px] font-data text-gray-500">
            {t.buildsInvolved} {conflict.builds.join(", ")}
          </div>
          <div className="mt-3 bg-abyss/40 rounded p-3 border border-border/50">
            <span className="text-[10px] font-data uppercase tracking-wider text-theme-muted">
              {t.resolution}
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
  const pathname = usePathname();
  const lang = extractLang(pathname);
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

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
          {t.title}
        </h1>
        <p className="font-heading text-lg text-theme/80 mt-1 tracking-wider uppercase">
          {t.subtitle}
        </p>
        <p className="text-sm font-body text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed">
          {t.description}
        </p>
        <div className="mx-auto mt-4 w-32 h-px bg-gradient-to-r from-transparent via-theme/50 to-transparent" />
      </div>

      {/* Party Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SlotSelector
          label={t.mainChar}
          icon="👑"
          value={party.main}
          onChange={(id) => setMainBuild(id)}
          disabledIds={disabledFor(party.main)}
          emptyLabel={t.emptySlot}
        />
        <SlotSelector
          label={`${t.companion} 1`}
          icon="🗡️"
          value={party.comp1}
          onChange={(id) => setCompanion("comp1" as CompanionSlot, id || null)}
          disabledIds={disabledFor(party.comp1)}
          emptyLabel={t.emptySlot}
        />
        <SlotSelector
          label={`${t.companion} 2`}
          icon="🛡️"
          value={party.comp2}
          onChange={(id) => setCompanion("comp2" as CompanionSlot, id || null)}
          disabledIds={disabledFor(party.comp2)}
          emptyLabel={t.emptySlot}
        />
        <SlotSelector
          label={`${t.companion} 3`}
          icon="🔮"
          value={party.comp3}
          onChange={(id) => setCompanion("comp3" as CompanionSlot, id || null)}
          disabledIds={disabledFor(party.comp3)}
          emptyLabel={t.emptySlot}
        />
      </div>

      {/* Status bar */}
      <div className="text-center">
        {!hasAnalysis ? (
          <p className="text-sm font-data text-gray-500 italic">
            {t.selectHint}
          </p>
        ) : (
          <p className="text-sm font-data text-theme/70">
            {selectedIds.length}/4 {t.membersSelected}
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
                  {t.relicsTitle}
                </h2>
                <p className="text-xs font-data text-gray-500 mt-0.5">
                  {t.relicsSub}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {relics.map((r) => (
                <RelicCard key={r.relic} relic={r} recommendedLabel={t.recommendedTo} />
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
                  {t.conflictsTitle}
                </h2>
                <p className="text-xs font-data text-gray-500 mt-0.5">
                  {t.conflictsSub}
                </p>
              </div>
            </div>
            {conflicts.length === 0 ? (
              <div className="bg-emerald-900/10 border border-emerald-600/20 rounded-lg p-6 text-center">
                <span className="text-3xl block mb-2" aria-hidden>
                  ✅
                </span>
                <p className="text-sm font-data text-emerald-400">
                  {t.noConflicts}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {conflicts.map((c) => (
                  <ConflictAlert key={c.title} conflict={c} t={t} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
