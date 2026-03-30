"use client";

// ============================================================================
// Party Planner — Interface visuelle du Party Analyzer (Registry-powered)
// ============================================================================

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { usePartyStore } from "@/store/usePartyStore";
import { analyzePartyConflicts, analyzePartyRoles } from "@/lib/partyAnalyzer";
import { buildRegistry } from "@/data/registry";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SLOT_LABELS = {
  fr: ["👑 Personnage Principal", "🗡️ Compagnon 1", "🛡️ Compagnon 2", "🔮 Compagnon 3"],
  en: ["👑 Main Character", "🗡️ Companion 1", "🛡️ Companion 2", "🔮 Companion 3"],
} as const;

const BUILD_OPTIONS = Object.values(buildRegistry);

function getBuildTitle(buildId: string, lang: "fr" | "en"): string {
  const build = buildRegistry[buildId];
  return build ? build.title[lang] : buildId;
}

const ROLE_LABELS: Record<string, { fr: string; en: string; icon: string }> = {
  tank: { fr: "Tank", en: "Tank", icon: "🛡️" },
  striker: { fr: "DPS", en: "Striker", icon: "⚔️" },
  support: { fr: "Support", en: "Support", icon: "💚" },
  controller: { fr: "Contrôleur", en: "Controller", icon: "🎯" },
  face: { fr: "Face", en: "Face", icon: "🗣️" },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PlannerPage() {
  const { lang: rawLang } = useParams<{ lang: string }>();
  const lang = rawLang === "en" ? "en" : "fr";

  const party = usePartyStore((s) => s.party);
  const setSlot = usePartyStore((s) => s.setSlot);
  const clearParty = usePartyStore((s) => s.clearParty);

  const selectedIds = useMemo(
    () => party.filter(Boolean) as string[],
    [party],
  );

  const conflicts = useMemo(
    () => analyzePartyConflicts(party),
    [party],
  );

  const roleDiagnostic = useMemo(
    () => analyzePartyRoles(party),
    [party],
  );

  const hasAnalysis = selectedIds.length >= 2;
  const labels = SLOT_LABELS[lang];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-3xl md:text-4xl text-gradient-gold uppercase tracking-wide">
          {lang === "fr" ? "🔮 Planificateur de Groupe" : "🔮 Party Planner"}
        </h1>
        <p className="text-sm font-body text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed">
          {lang === "fr"
            ? "Composez votre groupe de 4 personnages et détectez instantanément les conflits d'équipement grâce au Single Source of Truth."
            : "Build your party of 4 and instantly detect equipment conflicts powered by the Single Source of Truth."}
        </p>
        <div className="mx-auto mt-4 w-32 h-px bg-gradient-to-r from-transparent via-theme/50 to-transparent" />
      </div>

      {/* Party Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {party.map((slotValue, index) => {
          const disabledIds = selectedIds.filter((id) => id !== slotValue);

          return (
            <div
              key={index}
              className="bg-[#111520]/60 backdrop-blur-md border border-gray-700/40 rounded-xl p-4 transition-all duration-300 hover:border-[#fbbf24]/40"
            >
              <div className="font-heading text-xs text-[#fbbf24] uppercase tracking-wider mb-3">
                {labels[index]}
              </div>
              <select
                value={slotValue ?? ""}
                onChange={(e) =>
                  setSlot(index, e.target.value || null)
                }
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-[#0b0f19] text-gray-200 border border-gray-700 hover:border-[#fbbf24]/40 focus:border-[#fbbf24]/60 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="">
                  {lang === "fr" ? "— Emplacement vide —" : "— Empty slot —"}
                </option>
                {BUILD_OPTIONS.map((build) => (
                  <option
                    key={build.id}
                    value={build.id}
                    disabled={disabledIds.includes(build.id)}
                  >
                    {build.title[lang]}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Clear button */}
      {selectedIds.length > 0 && (
        <div className="text-center">
          <button
            onClick={clearParty}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
          >
            {lang === "fr" ? "Réinitialiser le groupe" : "Clear party"}
          </button>
        </div>
      )}

      {/* Status */}
      {!hasAnalysis && (
        <div className="text-center">
          <p className="text-sm text-gray-500 italic">
            {lang === "fr"
              ? "Sélectionnez au moins 2 personnages pour activer l'analyse."
              : "Select at least 2 characters to activate the analysis."}
          </p>
        </div>
      )}

      {/* Role Composition Diagnostic */}
      {hasAnalysis && (
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden>🎭</span>
            <div>
              <h2 className="font-heading text-xl text-gradient-gold uppercase tracking-wide">
                {lang === "fr" ? "Diagnostic de Composition" : "Team Composition Diagnostic"}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {lang === "fr" ? "Analyse des rôles couverts par votre groupe" : "Role coverage analysis for your party"}
              </p>
            </div>
          </div>

          {/* Present roles */}
          <div className="flex flex-wrap gap-2">
            {roleDiagnostic.presentRoles.map((role) => {
              const info = ROLE_LABELS[role] ?? { fr: role, en: role, icon: "❓" };
              return (
                <span
                  key={role}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-data font-bold bg-[#1c2133] border border-[#d4af37]/30 text-[#d4af37]"
                >
                  <span aria-hidden>{info.icon}</span>
                  {info[lang]}
                </span>
              );
            })}
          </div>

          {/* Missing roles warnings */}
          {roleDiagnostic.missingRoles.length > 0 ? (
            <div className="space-y-2">
              {roleDiagnostic.missingRoles.map((role) => {
                const info = ROLE_LABELS[role] ?? { fr: role, en: role, icon: "❓" };
                return (
                  <div
                    key={role}
                    className="flex items-center gap-3 bg-[#8b0000]/10 border border-[#8b0000]/30 rounded-lg px-4 py-3"
                  >
                    <span className="text-sm" aria-hidden>⚠️</span>
                    <p className="text-sm font-data text-[#c43c3c]">
                      {lang === "fr"
                        ? `Risque : Votre groupe n'a aucun ${info.fr}`
                        : `Risk: Your party has no ${info.en}`}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-emerald-900/10 border border-emerald-600/20 rounded-lg p-4">
              <p className="text-sm text-emerald-400 flex items-center gap-2">
                <span aria-hidden>✅</span>
                {lang === "fr" ? "Composition équilibrée — tous les rôles clés sont couverts." : "Balanced composition — all key roles are covered."}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Conflict Dashboard */}
      {hasAnalysis && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl" aria-hidden>
              ⚠️
            </span>
            <div>
              <h2 className="font-heading text-xl text-gradient-gold uppercase tracking-wide">
                {lang === "fr"
                  ? "Analyse des Conflits d'Équipement"
                  : "Equipment Conflict Analysis"}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {lang === "fr"
                  ? "Objets clés réclamés par plusieurs builds"
                  : "Core items claimed by multiple builds"}
              </p>
            </div>
          </div>

          {conflicts.length === 0 ? (
            <div className="bg-emerald-900/10 border border-emerald-600/20 rounded-lg p-6 text-center">
              <span className="text-3xl block mb-2" aria-hidden>
                ✅
              </span>
              <p className="text-sm text-emerald-400">
                {lang === "fr"
                  ? "Équipe viable. Aucun conflit d'équipement majeur détecté."
                  : "Viable party. No major equipment conflicts detected."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-red-900/10 border border-red-600/30 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-red-400">
                  {lang === "fr"
                    ? `⚠️ ${conflicts.length} conflit${conflicts.length > 1 ? "s" : ""} d'équipement détecté${conflicts.length > 1 ? "s" : ""}`
                    : `⚠️ ${conflicts.length} equipment conflict${conflicts.length > 1 ? "s" : ""} detected`}
                </p>
              </div>

              {conflicts.map((conflict) => (
                <div
                  key={conflict.itemId}
                  className="bg-red-900/5 border border-red-600/20 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    {conflict.itemIcon ? (
                      <img
                        src={conflict.itemIcon}
                        alt={conflict.itemName[lang]}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-md border border-gray-700 object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-md border border-gray-700 bg-gray-800 flex items-center justify-center shrink-0">
                        <span className="text-lg">⚔️</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-red-300">
                        {conflict.itemName[lang]}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {lang === "fr" ? "Réclamé par : " : "Claimed by: "}
                        <span className="text-gray-200">
                          {conflict.conflictingBuilds
                            .map((id) => getBuildTitle(id, lang))
                            .join(lang === "fr" ? " et " : " and ")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
