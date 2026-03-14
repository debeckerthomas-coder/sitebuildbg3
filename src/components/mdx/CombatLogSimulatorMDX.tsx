"use client";

// ============================================================================
// CombatLogSimulatorMDX — Lightweight MDX damage calculator
// Usage in MDX:
//   <CombatLogSimulator
//     baseDice="1d8"
//     statModifier="5"
//     extraDamage={[{source: "Tireur d'Élite", value: 10}, {source: "Frappe", dice: "1d8"}]}
//   />
// ============================================================================

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExtraDamageSource {
  readonly source: string;
  readonly value?: number;
  readonly dice?: string;
}

interface CombatLogSimulatorMDXProps {
  readonly baseDice: string;
  readonly statModifier?: string | number;
  readonly extraDamage?: readonly ExtraDamageSource[];
}

/** Parse "NdX" → { count, die } */
function parseDice(s: string): { count: number; die: number } | null {
  const m = s.match(/^(\d+)d(\d+)$/);
  if (!m) return null;
  return { count: Number(m[1]), die: Number(m[2]) };
}

/** Expected value of NdX */
function ev(count: number, die: number): number {
  return count * ((die + 1) / 2);
}

/** Roll NdX randomly */
function rollDice(count: number, die: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * die) + 1;
  }
  return total;
}

interface DamageLine {
  readonly source: string;
  readonly formula: string;
  readonly average: number;
  readonly rolled: number;
}

export function CombatLogSimulatorMDX({
  baseDice,
  statModifier = 0,
  extraDamage = [],
}: CombatLogSimulatorMDXProps) {
  const [open, setOpen] = useState(false);
  const [rollKey, setRollKey] = useState(0);

  const mod = typeof statModifier === "string" ? Number(statModifier) : statModifier;

  const lines = useMemo(() => {
    const result: DamageLine[] = [];

    // Base weapon dice
    const base = parseDice(baseDice);
    if (base) {
      result.push({
        source: "Dé d'arme",
        formula: baseDice,
        average: ev(base.count, base.die),
        rolled: rollDice(base.count, base.die),
      });
    }

    // Stat modifier
    if (mod !== 0) {
      result.push({
        source: "Mod. Caractéristique",
        formula: `+${mod}`,
        average: mod,
        rolled: mod,
      });
    }

    // Extra damage sources
    for (const extra of extraDamage) {
      if (extra.value !== undefined) {
        result.push({
          source: extra.source,
          formula: `+${extra.value}`,
          average: extra.value,
          rolled: extra.value,
        });
      } else if (extra.dice) {
        const d = parseDice(extra.dice);
        if (d) {
          result.push({
            source: extra.source,
            formula: extra.dice,
            average: ev(d.count, d.die),
            rolled: rollDice(d.count, d.die),
          });
        }
      }
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseDice, mod, extraDamage, rollKey]);

  const totalAvg = lines.reduce((s, l) => s + l.average, 0);
  const totalRolled = lines.reduce((s, l) => s + l.rolled, 0);

  return (
    <div className="my-4 rounded-card border border-border bg-surface-raised overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-abyss/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">📊</span>
          <span className="text-sm font-display text-gold">Simulateur de Dégâts</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-data text-gray-400">
            Moy. <span className="text-gold font-bold">{totalAvg.toFixed(1)}</span> dégâts
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
                    <span className="text-xs font-data text-gray-300">
                      moy. {line.average.toFixed(1)}
                    </span>
                    <span className="text-xs font-data font-bold text-gold">
                      {line.rolled}
                    </span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <span className="text-xs font-data text-gray-400 uppercase tracking-wider">Total</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-gray-400">
                    moy. {totalAvg.toFixed(1)}
                  </span>
                  <span className="text-sm font-display text-gold font-bold">
                    {totalRolled} dégâts
                  </span>
                </div>
              </div>

              {/* Reroll button */}
              <div className="pt-2">
                <button
                  onClick={() => setRollKey((k) => k + 1)}
                  className="w-full py-2 rounded-card text-xs font-display tracking-wide bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 active:scale-[0.98] transition-all duration-200"
                >
                  Relancer les dés
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
