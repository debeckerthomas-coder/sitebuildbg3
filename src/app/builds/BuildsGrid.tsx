"use client";

// ============================================================================
// BuildsGrid — Grille de cartes pour les 9 Builds Tier S
// ============================================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllBuildsTierS, type BuildTierS } from "@/data/builds/tier-s";

// ---------------------------------------------------------------------------
// Couleurs de rôle
// ---------------------------------------------------------------------------

const ROLE_COLORS: Record<string, string> = {
  "Tueur de Boss Monocible": "text-blood-light bg-blood/20",
  "DPS Distance & Contrôle de Foule": "text-purple-400 bg-purple-500/20",
  "Dégâts à Distance & Prône": "text-orange-400 bg-orange-500/20",
  "Soutien & Debuff Radiant": "text-yellow-400 bg-yellow-500/20",
  "Dégâts Magiques AoE Maximum": "text-blue-400 bg-blue-500/20",
  "DPS Burst & Support Polyvalent": "text-gold bg-gold/20",
  "Tank Burst avec Aura de Protection": "text-green-400 bg-green-500/20",
  "DPS Magique Soutenu à Distance": "text-red-400 bg-red-500/20",
  "Élimination Surprise Tour 1": "text-gray-300 bg-gray-500/20",
};

// ---------------------------------------------------------------------------
// Build Card
// ---------------------------------------------------------------------------

function BuildCard({ build, index }: { build: BuildTierS; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const roleColor = ROLE_COLORS[build.coreRole] ?? "text-gray-400 bg-gray-500/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="bg-surface-raised border border-border rounded-card overflow-hidden hover:border-gold/30 transition-colors"
    >
      {/* Header */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base text-gold leading-tight">{build.name}</h3>
          <span className="shrink-0 text-[10px] font-data font-bold px-2 py-0.5 rounded bg-gold/20 text-gold uppercase tracking-wider">
            Tier S
          </span>
        </div>

        <p className="text-xs font-mono text-gray-400">{build.classes}</p>

        <span className={`inline-block text-[10px] font-data px-2 py-0.5 rounded ${roleColor}`}>
          {build.coreRole}
        </span>
      </div>

      {/* Mécanique clé */}
      <div className="px-4 pb-3">
        <p className="text-xs font-body text-gray-400 leading-relaxed line-clamp-3">
          {build.keyMechanic}
        </p>
      </div>

      {/* Stats bar */}
      <div className="px-4 pb-3 grid grid-cols-6 gap-1">
        {(["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const).map((stat) => (
          <div key={stat} className="text-center">
            <p className="text-[9px] font-data text-gray-600 uppercase">{stat}</p>
            <p className={`text-xs font-data ${build.stats[stat] >= 16 ? "text-gold" : "text-gray-500"}`}>
              {build.stats[stat]}
            </p>
          </div>
        ))}
      </div>

      {/* Toggle détails */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-2 text-[10px] font-data text-gray-500 hover:text-gold border-t border-border/50 transition-colors uppercase tracking-wider"
      >
        {expanded ? "Masquer les détails" : "Voir les détails"}
      </button>

      {/* Détails expandables */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-3">
              {/* Dons */}
              <div>
                <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider mb-1.5">
                  Progression des Dons
                </p>
                <div className="space-y-1">
                  {build.featProgression.map((feat) => (
                    <div key={feat.level} className="flex gap-2 items-start">
                      <span className="text-[10px] font-data text-gold shrink-0 w-8">Niv.{feat.level}</span>
                      <div>
                        <span className="text-xs font-data text-gray-300">{feat.feat}</span>
                        <p className="text-[10px] font-data text-gray-600">{feat.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best in Slot */}
              <div>
                <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider mb-1.5">
                  Équipement Best-in-Slot
                </p>
                {(["act1", "act2", "act3"] as const).map((act) => (
                  <div key={act} className="mb-1.5">
                    <p className="text-[10px] font-data text-gold-muted uppercase">
                      {act === "act1" ? "Acte 1" : act === "act2" ? "Acte 2" : "Acte 3"}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {build.bestInSlot[act].map((item) => (
                        <span
                          key={item}
                          className="text-[10px] font-data text-gray-400 bg-abyss px-1.5 py-0.5 rounded border border-border/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Failsafes */}
              {build.failsafes.length > 0 && (
                <div>
                  <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider mb-1.5">
                    Failsafes (Plans B)
                  </p>
                  <div className="space-y-1.5">
                    {build.failsafes.map((fs) => (
                      <div key={fs.missingItem} className="bg-abyss/60 rounded px-2.5 py-1.5 border border-border/50">
                        <p className="text-[10px] font-data text-blood-light">
                          Si manqué : <span className="text-gray-400">{fs.missingItem}</span>
                        </p>
                        <p className="text-[10px] font-data text-gold">
                          Remplacer par : <span className="text-gray-400">{fs.fallbackItem}</span>
                        </p>
                        <p className="text-[9px] font-data text-gray-600">{fs.condition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Grid
// ---------------------------------------------------------------------------

export function BuildsGrid() {
  const builds = getAllBuildsTierS();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {builds.map((build, i) => (
        <BuildCard key={build.id} build={build} index={i} />
      ))}
    </div>
  );
}
