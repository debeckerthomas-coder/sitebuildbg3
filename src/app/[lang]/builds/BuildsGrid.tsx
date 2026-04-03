"use client";

// ============================================================================
// BuildsGrid — Premium Glassmorphism Grid for Tier S Builds
// ============================================================================

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { getAllBuildsTierS, type BuildTierS } from "@/data/builds/tier-s";

// ---------------------------------------------------------------------------
// UI translations for the grid
// ---------------------------------------------------------------------------

const GRID_TEXT = {
  fr: {
    fullGuide: "Guide Complet",
    details: "Détails",
    hide: "Masquer",
    featProgression: "Progression des Dons",
    level: "Niv.",
    bestInSlot: "Équipement Best-in-Slot",
    act1: "Acte 1",
    act2: "Acte 2",
    act3: "Acte 3",
    failsafes: "Failsafes (Plans B)",
    ifMissed: "Si manqué",
    alternative: "Alternative",
  },
  en: {
    fullGuide: "Full Guide",
    details: "Details",
    hide: "Hide",
    featProgression: "Feat Progression",
    level: "Lvl",
    bestInSlot: "Best-in-Slot Gear",
    act1: "Act 1",
    act2: "Act 2",
    act3: "Act 3",
    failsafes: "Failsafes (Plan B)",
    ifMissed: "If missed",
    alternative: "Alternative",
  },
} as const;

// ---------------------------------------------------------------------------
// Role colors & short labels (bilingual)
// ---------------------------------------------------------------------------

const ROLE_CONFIG: Record<string, { color: string; short: string }> = {
  // French roles
  "Tueur de Boss Monocible": { color: "text-blood-light bg-blood/20 border-blood/30", short: "Boss Killer" },
  "DPS Distance & Contrôle de Foule": { color: "text-purple-400 bg-purple-500/15 border-purple-500/30", short: "Contrôle" },
  "Dégâts à Distance & Prône": { color: "text-orange-400 bg-orange-500/15 border-orange-500/30", short: "Lanceur" },
  "Soutien & Debuff Radiant": { color: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30", short: "Soutien" },
  "Dégâts Magiques AoE Maximum": { color: "text-blue-400 bg-blue-500/15 border-blue-500/30", short: "Nuke AoE" },
  "DPS Burst & Support Polyvalent": { color: "text-gold bg-gold/15 border-gold/30", short: "Burst DPS" },
  "Tank Burst avec Aura de Protection": { color: "text-green-400 bg-green-500/15 border-green-500/30", short: "Tank Burst" },
  "Tank Burst SAD (Charisme)": { color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30", short: "Tank SAD" },
  "DPS Magique Soutenu à Distance": { color: "text-red-400 bg-red-500/15 border-red-500/30", short: "DPS Feu" },
  "Élimination Surprise Tour 1": { color: "text-gray-300 bg-gray-500/15 border-gray-500/30", short: "Alpha Strike" },
  // English roles
  "Single-Target Boss Killer": { color: "text-blood-light bg-blood/20 border-blood/30", short: "Boss Killer" },
  "Ranged DPS & Crowd Control": { color: "text-purple-400 bg-purple-500/15 border-purple-500/30", short: "Control" },
  "Ranged Damage & Prone": { color: "text-orange-400 bg-orange-500/15 border-orange-500/30", short: "Thrower" },
  "Support & Radiant Debuff": { color: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30", short: "Support" },
  "Maximum AoE Magic Damage": { color: "text-blue-400 bg-blue-500/15 border-blue-500/30", short: "AoE Nuke" },
  "Burst DPS & Versatile Support": { color: "text-gold bg-gold/15 border-gold/30", short: "Burst DPS" },
  "Burst Tank with Aura of Protection": { color: "text-green-400 bg-green-500/15 border-green-500/30", short: "Burst Tank" },
  "SAD Burst Tank (Charisma)": { color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30", short: "SAD Tank" },
  "Sustained Ranged Magic DPS": { color: "text-red-400 bg-red-500/15 border-red-500/30", short: "Fire DPS" },
  "Turn 1 Surprise Elimination": { color: "text-gray-300 bg-gray-500/15 border-gray-500/30", short: "Alpha Strike" },
};

// ---------------------------------------------------------------------------
// Class icon SVGs (inline, no external deps) — matches both FR and EN class names
// ---------------------------------------------------------------------------

const CLASS_ICONS: Record<string, React.ReactNode> = {
  monk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 7.5v4" />
      <path d="M8 20l4-8.5 4 8.5" />
      <path d="M6 14l6-2.5 6 2.5" />
    </svg>
  ),
  bard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M9 2v14" />
      <path d="M9 16a4 4 0 1 1-4-4h4" />
      <path d="M9 2h6a2 2 0 0 1 0 4H9" />
      <circle cx="17" cy="6" r="1" fill="currentColor" />
      <circle cx="19" cy="10" r="1" fill="currentColor" />
    </svg>
  ),
  barbarian: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2L8 8h8L12 2z" />
      <path d="M10 8v12" />
      <path d="M14 8v12" />
      <path d="M7 20h10" />
      <path d="M6 12h12" />
    </svg>
  ),
  cleric: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 3v18" />
      <path d="M6 9h12" />
      <circle cx="12" cy="9" r="6" />
      <path d="M12 6v6" />
      <path d="M9 9h6" />
    </svg>
  ),
  sorcerer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  paladin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2L4 7v5c0 5.25 3.4 10.15 8 11.4 4.6-1.25 8-6.15 8-11.4V7l-8-5z" />
      <path d="M12 8v5" />
      <path d="M9.5 10.5h5" />
    </svg>
  ),
  ranger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 22V2" />
      <path d="M12 2l7 5-7-1-7 1 7-5z" />
      <path d="M12 8l5 3.5-5-.5-5 .5L12 8z" />
      <path d="M8 22l4-6 4 6" />
    </svg>
  ),
  rogue: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M14.5 3.5L20 12l-5.5 8.5" />
      <path d="M9.5 3.5L4 12l5.5 8.5" />
      <path d="M12 2v20" />
      <path d="M8 12h8" />
    </svg>
  ),
  warlock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-2 3-2 6 0 9s2 6 0 9" />
      <path d="M3 12h18" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  fighter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M14.5 2L20 7.5 7.5 20 2 14.5 14.5 2z" />
      <path d="M17 7l-10 10" />
      <path d="M2 22l4-4" />
      <path d="M15 4l5 5" />
    </svg>
  ),
};

function getClassIcon(classes: string): React.ReactNode {
  const lower = classes.toLowerCase();
  // French names
  if (lower.includes("moine") || lower.includes("monk")) return CLASS_ICONS.monk;
  if ((lower.includes("barde") || lower.includes("bard")) && lower.includes("paladin")) return CLASS_ICONS.paladin;
  if (lower.includes("barde") || lower.includes("bard")) return CLASS_ICONS.bard;
  if (lower.includes("barbare") || lower.includes("barbarian")) return CLASS_ICONS.barbarian;
  if (lower.includes("clerc") || lower.includes("cleric")) return CLASS_ICONS.cleric;
  if (lower.includes("ensorceleur") || lower.includes("sorcerer")) return CLASS_ICONS.sorcerer;
  if (lower.includes("paladin")) return CLASS_ICONS.paladin;
  if (lower.includes("rôdeur") || lower.includes("ranger")) return CLASS_ICONS.ranger;
  if (lower.includes("roublard") || lower.includes("rogue")) return CLASS_ICONS.rogue;
  if (lower.includes("occultiste") || lower.includes("warlock")) return CLASS_ICONS.warlock;
  if (lower.includes("guerrier") || lower.includes("fighter")) return CLASS_ICONS.fighter;
  return CLASS_ICONS.fighter;
}

// ---------------------------------------------------------------------------
// Premium Build Card
// ---------------------------------------------------------------------------

function BuildCard({ build, index, lang }: { build: BuildTierS; index: number; lang: string }) {
  const [expanded, setExpanded] = useState(false);
  const role = ROLE_CONFIG[build.coreRole] ?? { color: "text-gray-400 bg-gray-500/15 border-gray-500/30", short: build.coreRole };
  const t = lang === "en" ? GRID_TEXT.en : GRID_TEXT.fr;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col rounded-xl overflow-hidden
                 bg-[#111520]/60 backdrop-blur-md
                 border border-gold/15
                 transition-all duration-300
                 hover:-translate-y-2 hover:border-gold/50
                 hover:shadow-[0_8px_40px_rgba(212,175,55,0.15),inset_0_1px_0_rgba(212,175,55,0.1)]"
    >
      {/* Top glow bar */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header zone */}
      <div className="p-5 pb-3 flex items-start gap-4">
        {/* Class icon */}
        <div className="shrink-0 w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 p-2.5 text-gold/70 group-hover:text-gold group-hover:bg-gold/15 group-hover:border-gold/40 transition-all duration-300">
          {getClassIcon(build.classes)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-base text-gold leading-tight truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-200 group-hover:via-gold group-hover:to-amber-600 transition-all duration-300">
              {build.name}
            </h2>
            {/* Tier S Badge */}
            <span className="shrink-0 text-[9px] font-data font-bold px-2 py-0.5 rounded-md bg-gradient-to-r from-blood/30 to-gold/20 border border-blood/40 text-gold uppercase tracking-widest">
              Tier S
            </span>
          </div>
          <p className="text-[11px] font-mono text-gray-500 leading-snug truncate">{build.classes}</p>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-5 pb-3">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-data font-medium px-2.5 py-1 rounded-md border ${role.color}`}>
          {build.coreRole}
        </span>
      </div>

      {/* Key mechanic */}
      <div className="px-5 pb-4 flex-1">
        <p className="text-xs font-body text-gray-400 leading-relaxed line-clamp-3">
          {build.keyMechanic}
        </p>
      </div>

      {/* Stats bar */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-6 gap-1 p-2 rounded-lg bg-abyss/40 border border-border/30">
          {(["STR", "DEX", "CON", "INT", "WIS", "CHA"] as const).map((stat) => {
            const val = build.stats[stat];
            const isHigh = val >= 16;
            return (
              <div key={stat} className="text-center">
                <p className="text-[8px] font-data text-gray-600 uppercase tracking-wider">{stat}</p>
                <p className={`text-xs font-data font-semibold ${isHigh ? "text-gold" : val <= 10 ? "text-gray-600" : "text-gray-400"}`}>
                  {val}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-5 pb-4 flex gap-2">
        <Link
          href={`/${lang}/builds/${build.id}`}
          className="flex-1 text-center py-2.5 text-xs font-display tracking-wide rounded-lg
                     bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30
                     text-gold hover:from-gold/30 hover:to-gold/20 hover:border-gold/50
                     transition-all duration-200 uppercase"
        >
          {t.fullGuide}
        </Link>
        <button
          onClick={() => setExpanded(!expanded)}
          className="px-4 py-2.5 text-xs font-data text-gray-500 hover:text-gold rounded-lg
                     border border-border/50 hover:border-gold/30
                     transition-all duration-200 uppercase tracking-wider"
        >
          {expanded ? t.hide : t.details}
        </button>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-gold/10 pt-4">
              {/* Feats */}
              <div>
                <p className="text-[10px] font-data text-gold/60 uppercase tracking-widest mb-2">
                  {t.featProgression}
                </p>
                <div className="space-y-1.5">
                  {build.featProgression.map((feat) => (
                    <div key={feat.level} className="flex gap-2 items-start">
                      <span className="text-[10px] font-data text-gold bg-gold/10 rounded px-1.5 py-0.5 shrink-0">
                        {t.level}{feat.level}
                      </span>
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
                <p className="text-[10px] font-data text-gold/60 uppercase tracking-widest mb-2">
                  {t.bestInSlot}
                </p>
                {(["act1", "act2", "act3"] as const).map((act) => (
                  <div key={act} className="mb-2">
                    <p className="text-[10px] font-data text-gold-muted uppercase mb-0.5">
                      {t[act]}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {build.bestInSlot[act].map((item) => (
                        <span
                          key={item}
                          className="text-[10px] font-data text-gray-400 bg-abyss/80 px-1.5 py-0.5 rounded border border-border/40"
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
                  <p className="text-[10px] font-data text-gold/60 uppercase tracking-widest mb-2">
                    {t.failsafes}
                  </p>
                  <div className="space-y-1.5">
                    {build.failsafes.map((fs) => (
                      <div key={fs.missingItem} className="bg-blood/5 rounded-lg px-3 py-2 border border-blood/20">
                        <p className="text-[10px] font-data text-blood-light">
                          {t.ifMissed} : <span className="text-gray-400">{fs.missingItem}</span>
                        </p>
                        <p className="text-[10px] font-data text-gold">
                          {t.alternative} : <span className="text-gray-400">{fs.fallbackItem}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom glow bar */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Grid
// ---------------------------------------------------------------------------

export function BuildsGrid() {
  const params = useParams();
  const lang = (params?.lang as string) ?? "fr";
  const builds = getAllBuildsTierS(lang);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {builds.map((build, i) => (
        <BuildCard key={build.id} build={build} index={i} lang={lang} />
      ))}
    </div>
  );
}
