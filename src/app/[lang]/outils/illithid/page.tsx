"use client";

// ============================================================================
// La Matrice Illithid — Arbre de compétences des Têtards
// Connecté au store Zustand (party.main) pour les recommandations dynamiques
// ============================================================================

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import { BUILDS_TIER_S } from "@/data/builds/tier-s";
import {
  ILLITHID_POWERS,
  ILLITHID_TIERS,
  MAX_TADPOLES,
  type IllithidPower,
  type IllithidTier,
} from "@/data/illithid";

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

const PAGE_TEXT = {
  fr: {
    title: "La Matrice Illithid",
    subtitle: "Optimisation des Têtards",
    description: "Planifiez votre progression Illithid. Les pouvoirs recommandés sont mis en surbrillance selon votre build principal.",
    activeBuild: "Build actif :",
    selectBuildHint: "Sélectionnez un build dans le Conseil de Guerre pour activer les recommandations.",
    tadpolesConsumed: "Têtards Consommés",
    tadpolesSub: "Pouvoirs Illithids débloqués",
    recommended: "Recommandé",
    resetTree: "Réinitialiser l'arbre",
  },
  en: {
    title: "The Illithid Matrix",
    subtitle: "Tadpole Optimization",
    description: "Plan your Illithid progression. Recommended powers are highlighted based on your main build.",
    activeBuild: "Active build:",
    selectBuildHint: "Select a build in the War Council to activate recommendations.",
    tadpolesConsumed: "Tadpoles Consumed",
    tadpolesSub: "Illithid Powers unlocked",
    recommended: "Recommended",
    resetTree: "Reset tree",
  },
} as const;

function extractLang(pathname: string): "fr" | "en" {
  return pathname.split("/")[1] === "en" ? "en" : "fr";
}

// ---------------------------------------------------------------------------
// localStorage persistence
// ---------------------------------------------------------------------------

const STORAGE_KEY = "bg3_illithid_consumed";

function loadConsumed(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveConsumed(state: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

// ---------------------------------------------------------------------------
// Tier colors
// ---------------------------------------------------------------------------

const TIER_COLORS: Record<IllithidTier, { border: string; bg: string; glow: string }> = {
  outer: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    glow: "shadow-purple-500/20",
  },
  middle: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    glow: "shadow-red-500/20",
  },
  inner: {
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    glow: "shadow-orange-500/20",
  },
};

// ---------------------------------------------------------------------------
// Power Card
// ---------------------------------------------------------------------------

function PowerCard({
  power,
  consumed,
  recommended,
  onToggle,
  disabled,
  index,
  recommendedLabel,
}: {
  power: IllithidPower;
  consumed: boolean;
  recommended: boolean;
  onToggle: () => void;
  disabled: boolean;
  index: number;
  recommendedLabel: string;
}) {
  const colors = TIER_COLORS[power.tier];

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      disabled={disabled && !consumed}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className={`group relative w-full text-left p-4 rounded-xl border-2 transition-all duration-300
        ${consumed
          ? `${colors.border} ${colors.bg} shadow-lg ${colors.glow}`
          : recommended
            ? "border-theme/50 bg-theme/5 shadow-md shadow-theme/10"
            : "border-border/50 bg-abyss-100/40 hover:border-border"
        }
        ${disabled && !consumed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${!disabled && !consumed ? "hover:bg-abyss-100/60" : ""}
      `}
    >
      {/* Recommended badge */}
      {recommended && !consumed && (
        <motion.div
          className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-theme text-abyss text-[9px] font-data font-bold uppercase tracking-wider"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {recommendedLabel}
        </motion.div>
      )}

      {/* Consumed indicator */}
      {consumed && (
        <div className="absolute top-3 right-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-6 h-6 rounded-full bg-theme/20 border border-theme/50 flex items-center justify-center"
          >
            <span className="text-theme text-xs">✓</span>
          </motion.div>
        </div>
      )}

      <div className="pr-8">
        <h4
          className={`font-heading text-sm uppercase tracking-wide transition-colors ${
            consumed ? "text-theme" : recommended ? "text-theme/90" : "text-gray-200"
          }`}
        >
          {power.name}
        </h4>
        <p className="text-[10px] font-data text-gray-500 mt-0.5 italic">
          {power.description}
        </p>
        <p
          className={`text-xs font-body mt-2 leading-relaxed ${
            consumed ? "text-gray-300" : "text-gray-400"
          }`}
        >
          {power.effect}
        </p>
        {recommended && power.recommendedReason && (
          <p className="text-[11px] font-data text-theme/70 mt-2 border-l-2 border-theme/30 pl-2 leading-relaxed">
            {power.recommendedReason}
          </p>
        )}
      </div>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Tadpole Counter
// ---------------------------------------------------------------------------

function TadpoleCounter({ consumed, max, t }: { consumed: number; max: number; t: (typeof PAGE_TEXT)[keyof typeof PAGE_TEXT] }) {
  const progress = max > 0 ? consumed / max : 0;
  const barColor =
    progress >= 0.8 ? "bg-orange-500" : progress >= 0.5 ? "bg-red-500" : "bg-purple-500";

  return (
    <div className="bg-[#111520]/60 backdrop-blur-md border border-theme/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            🧠
          </span>
          <div>
            <h2 className="font-heading text-sm text-theme uppercase tracking-wide">
              {t.tadpolesConsumed}
            </h2>
            <p className="text-xs font-data text-gray-500 mt-0.5">
              {t.tadpolesSub}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-heading text-2xl text-theme tabular-nums">
            {consumed}
          </span>
          <span className="text-sm text-gray-500 font-data"> / {max}</span>
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-2 rounded-full bg-abyss-200 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function IllithidPage() {
  const pathname = usePathname();
  const lang = extractLang(pathname);
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  const mainBuild = useAppStore((s) => s.party.main);
  const mainBuildData = BUILDS_TIER_S.find((b) => b.id === mainBuild);

  const [consumed, setConsumed] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration: must read localStorage after mount
    setConsumed(loadConsumed());
    setMounted(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setConsumed((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      // Clean up false values
      if (!next[id]) delete next[id];
      saveConsumed(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setConsumed({});
    saveConsumed({});
  }, []);

  const consumedCount = useMemo(
    () => Object.values(consumed).filter(Boolean).length,
    [consumed],
  );

  // Recommended power IDs for current main build
  const recommendedIds = useMemo(() => {
    if (!mainBuild) return new Set<string>();
    return new Set(
      ILLITHID_POWERS.filter((p) => p.recommendedFor.includes(mainBuild)).map((p) => p.id),
    );
  }, [mainBuild]);

  const atCapacity = consumedCount >= MAX_TADPOLES;

  if (!mounted) {
    return (
      <div className="max-w-3xl space-y-6">
        <div className="h-8 w-64 bg-abyss-200 rounded animate-pulse mx-auto" />
        <div className="h-20 bg-abyss-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-10">
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
          {mainBuildData && (
            <span className="block mt-1 text-theme/80 font-data text-xs">
              {t.activeBuild} {mainBuildData.name}
            </span>
          )}
          {!mainBuildData && (
            <span className="block mt-1 text-gray-500 font-data text-xs italic">
              {t.selectBuildHint}
            </span>
          )}
        </p>
        <div className="mx-auto mt-4 w-32 h-px bg-gradient-to-r from-transparent via-theme/50 to-transparent" />
      </div>

      {/* Tadpole Counter */}
      <TadpoleCounter consumed={consumedCount} max={MAX_TADPOLES} t={t} />

      {/* Tier Sections */}
      {ILLITHID_TIERS.map((tier) => {
        const powers = ILLITHID_POWERS.filter((p) => p.tier === tier.id);
        return (
          <section key={tier.id}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl" aria-hidden>
                {tier.icon}
              </span>
              <div>
                <h2 className="font-heading text-lg text-gradient-gold uppercase tracking-wide">
                  {tier.label}
                </h2>
                <p className="text-xs font-data text-gray-500 mt-0.5">
                  {tier.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {powers.map((power, i) => (
                <PowerCard
                  key={power.id}
                  power={power}
                  consumed={!!consumed[power.id]}
                  recommended={recommendedIds.has(power.id)}
                  onToggle={() => toggle(power.id)}
                  disabled={atCapacity}
                  index={i}
                  recommendedLabel={t.recommended}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Reset */}
      <div className="flex justify-end pt-2 border-t border-theme/10">
        <button
          type="button"
          onClick={resetAll}
          disabled={consumedCount === 0}
          className="text-xs font-data uppercase tracking-wider px-5 py-2.5 rounded-lg
                     border border-theme/20 text-theme/60
                     hover:bg-theme/10 hover:text-theme/80
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors cursor-pointer"
        >
          {t.resetTree}
        </button>
      </div>
    </div>
  );
}
