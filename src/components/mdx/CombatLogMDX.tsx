"use client";

// ============================================================================
// CombatLogMDX — Simplified combat log for MDX usage
// Usage: <CombatLogMDX base="1d6" statModifier={5} tavernBrawler={5}
//          label="Rafale de Coups" />
// ============================================================================

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CombatLogMDXProps {
  /** Weapon/attack die, e.g. "1d6", "2d8" */
  readonly base: string;
  /** Ability modifier (e.g. STR mod) */
  readonly statModifier?: number;
  /** Tavern Brawler doubled modifier */
  readonly tavernBrawler?: number;
  /** Divine Smite dice, e.g. "4d8" */
  readonly smite?: string;
  /** Extra damage sources, e.g. "1d6 feu" */
  readonly extra?: string;
  /** Label for the attack */
  readonly label?: string;
}

/** Parse "NdX" into { count, die } */
function parseDice(s: string): { count: number; die: number } | null {
  const m = s.match(/^(\d+)d(\d+)$/);
  if (!m) return null;
  return { count: Number(m[1]), die: Number(m[2]) };
}

/** Expected value of NdX */
function ev(count: number, die: number): number {
  return count * ((die + 1) / 2);
}

interface Line {
  readonly source: string;
  readonly formula: string;
  readonly average: number;
  readonly type: string;
}

export function CombatLogMDX({
  base,
  statModifier = 0,
  tavernBrawler = 0,
  smite,
  extra,
  label = "Attaque",
}: CombatLogMDXProps) {
  const [open, setOpen] = useState(false);

  const lines = useMemo(() => {
    const result: Line[] = [];

    // Base weapon damage
    const baseDice = parseDice(base);
    if (baseDice) {
      result.push({
        source: "Dé d'arme",
        formula: base,
        average: ev(baseDice.count, baseDice.die),
        type: "physique",
      });
    }

    // Stat modifier
    if (statModifier !== 0) {
      result.push({
        source: "Mod. Caractéristique",
        formula: `+${statModifier}`,
        average: statModifier,
        type: "physique",
      });
    }

    // Tavern Brawler
    if (tavernBrawler !== 0) {
      result.push({
        source: "Bagarreur des Tavernes",
        formula: `+${tavernBrawler} (FOR doublé)`,
        average: tavernBrawler,
        type: "physique",
      });
    }

    // Smite
    if (smite) {
      const smiteDice = parseDice(smite);
      if (smiteDice) {
        result.push({
          source: "Châtiment Divin",
          formula: smite,
          average: ev(smiteDice.count, smiteDice.die),
          type: "radiant",
        });
      }
    }

    // Extra
    if (extra) {
      const parts = extra.split(" ");
      const firstPart = parts[0] ?? "";
      const extraDice = parseDice(firstPart);
      const extraType = parts[1] ?? "divers";
      if (extraDice) {
        result.push({
          source: `Bonus (${extraType})`,
          formula: firstPart,
          average: ev(extraDice.count, extraDice.die),
          type: extraType,
        });
      }
    }

    return result;
  }, [base, statModifier, tavernBrawler, smite, extra]);

  const total = lines.reduce((s, l) => s + l.average, 0);

  const TYPE_COLORS: Record<string, string> = {
    physique: "text-gray-300",
    radiant: "text-dmg-radiant",
    feu: "text-dmg-fire",
    froid: "text-dmg-cold",
    foudre: "text-dmg-lightning",
    nécrotique: "text-dmg-necrotic",
    divers: "text-gray-400",
  };

  return (
    <div className="my-4 rounded-card border border-border bg-surface-raised overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-abyss/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">📊</span>
          <span className="text-sm font-display text-gold">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-data text-gray-400">
            Moy. <span className="text-gold font-bold">{total.toFixed(1)}</span> dégâts
          </span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500 text-xs"
          >
            ▼
          </motion.span>
        </div>
      </button>

      {/* Breakdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-4 py-3 space-y-1.5">
              {lines.map((line, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-data text-gray-600 w-4 text-right">{i + 1}.</span>
                    <span className="text-xs font-data text-gray-400">{line.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-500">{line.formula}</span>
                    <span className={`text-xs font-data font-bold ${TYPE_COLORS[line.type] ?? "text-gray-300"}`}>
                      {line.average.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <span className="text-xs font-data text-gray-400 uppercase tracking-wider">Total Moyen</span>
                <span className="text-sm font-display text-gold font-bold">{total.toFixed(1)} dégâts</span>
              </div>

              {/* Critical hint */}
              <p className="text-[10px] font-data text-gray-600 pt-1">
                En critique : les dés sont doublés → ~{(total + lines.filter(l => l.type !== "physique" || parseDice(l.formula)).reduce((s, l) => {
                  const d = parseDice(l.formula);
                  return d ? s + ev(d.count, d.die) : s;
                }, 0)).toFixed(1)} dégâts moyens
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
