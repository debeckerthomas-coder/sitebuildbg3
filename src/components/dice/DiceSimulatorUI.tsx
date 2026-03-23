"use client";

// ============================================================================
// DiceSimulatorUI — Full dice simulator with 3D scene + probability panel
// ============================================================================

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { simulateDiceRoll, expectedValue } from "@/engine/DiceSimulator";
import type { DieSize, DiceSimulatorResult } from "@/types";

// Dynamic import of Three.js scene — ssr: false to avoid hydration issues
const DiceScene = dynamic(
  () => import("./DiceScene").then((mod) => mod.DiceScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] rounded-card bg-abyss border border-border flex items-center justify-center">
        <div className="text-gold/50 font-data text-sm animate-pulse">
          Chargement du moteur 3D...
        </div>
      </div>
    ),
  }
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

const DIE_OPTIONS: DieSize[] = [4, 6, 8, 10, 12, 20];

// ---------------------------------------------------------------------------
// Probability Bar Chart
// ---------------------------------------------------------------------------

function ProbabilityChart({ histogram }: { histogram: DiceSimulatorResult["histogram"] }) {
  const maxProb = Math.max(...histogram.map((h) => h.probability));

  return (
    <div className="space-y-1">
      <p className="text-xs font-data text-gray-400 uppercase tracking-wider">
        Distribution de Probabilité
      </p>
      <div className="flex items-end gap-px h-24">
        {histogram.map((entry) => (
          <div key={entry.value} className="flex-1 flex flex-col items-center gap-0.5">
            <motion.div
              className="w-full bg-gold/70 rounded-t-sm"
              initial={{ height: 0 }}
              animate={{ height: `${(entry.probability / maxProb) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {histogram.length <= 20 && (
              <span className="text-[9px] font-data text-gray-500">
                {entry.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function DiceSimulatorUI() {
  const [die, setDie] = useState<DieSize>(20);
  const [count, setCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [advantage, setAdvantage] = useState(false);
  const [disadvantage, setDisadvantage] = useState(false);
  const [karmicDice, setKarmicDice] = useState(false);
  const [dc, setDc] = useState<number | undefined>(undefined);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<DiceSimulatorResult | null>(null);

  const handleRoll = useCallback(() => {
    setRolling(true);
    const simResult = simulateDiceRoll({
      die,
      count,
      modifier,
      advantage,
      disadvantage,
      karmicDice,
      dc,
    });
    setResult(simResult);
  }, [die, count, modifier, advantage, disadvantage, karmicDice, dc]);

  const handleRollComplete = useCallback(() => {
    setRolling(false);
  }, []);

  const ev = expectedValue(die, count, modifier);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 3D Dice Scene */}
      <DiceScene
        result={result?.rolls[0] ?? 1}
        rolling={rolling}
        onRoll={handleRoll}
        onRollComplete={handleRollComplete}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-surface-raised border border-border rounded-card p-5 space-y-4">
          <h3 className="font-display text-sm text-gold">Configuration</h3>

          {/* Die Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-data text-gray-400 uppercase tracking-wider">
              Type de Dé
            </label>
            <div className="flex gap-2">
              {DIE_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDie(d)}
                  className={`
                    px-3 py-1.5 rounded text-sm font-data transition-all
                    ${die === d
                      ? "bg-gold text-abyss font-bold"
                      : "bg-surface border border-border text-gray-400 hover:border-gold/40"
                    }
                  `}
                >
                  d{d}
                </button>
              ))}
            </div>
          </div>

          {/* Count & Modifier */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-data text-gray-400 uppercase tracking-wider">
                Nombre
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
                className="w-full bg-abyss border border-border rounded px-3 py-1.5 text-sm font-data text-gray-200 focus:border-gold/50 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-data text-gray-400 uppercase tracking-wider">
                Modificateur
              </label>
              <input
                type="number"
                min={-20}
                max={30}
                value={modifier}
                onChange={(e) => setModifier(Number(e.target.value))}
                className="w-full bg-abyss border border-border rounded px-3 py-1.5 text-sm font-data text-gray-200 focus:border-gold/50 focus:outline-none"
              />
            </div>
          </div>

          {/* DC */}
          <div className="space-y-1.5">
            <label className="text-xs font-data text-gray-400 uppercase tracking-wider">
              DD Cible (optionnel)
            </label>
            <input
              type="number"
              min={1}
              max={40}
              value={dc ?? ""}
              onChange={(e) => setDc(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="—"
              className="w-full bg-abyss border border-border rounded px-3 py-1.5 text-sm font-data text-gray-200 focus:border-gold/50 focus:outline-none placeholder:text-gray-600"
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Avantage", active: advantage, toggle: () => { setAdvantage(!advantage); if (!advantage) setDisadvantage(false); } },
              { label: "Désavantage", active: disadvantage, toggle: () => { setDisadvantage(!disadvantage); if (!disadvantage) setAdvantage(false); } },
              { label: "Dés Karmiques", active: karmicDice, toggle: () => setKarmicDice(!karmicDice) },
            ].map(({ label, active, toggle }) => (
              <button
                key={label}
                onClick={toggle}
                className={`
                  px-3 py-1 rounded text-xs font-data transition-all border
                  ${active
                    ? "bg-gold/20 border-gold text-gold"
                    : "bg-transparent border-border text-gray-500 hover:border-gray-500"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Roll Button */}
          <button
            onClick={handleRoll}
            disabled={rolling}
            className={`
              w-full py-3 rounded-card font-display text-sm tracking-wide
              transition-all duration-200
              ${rolling
                ? "bg-gold/20 text-gold/50 cursor-wait"
                : "bg-gold text-abyss hover:bg-gold-light active:scale-[0.98]"
              }
            `}
          >
            {rolling ? "Lancer en cours..." : `Lancer ${count}d${die}${modifier >= 0 ? "+" : ""}${modifier !== 0 ? modifier : ""}`}
          </button>

          <p className="text-xs font-data text-gray-500 text-center">
            Valeur attendue : {ev.toFixed(1)}
          </p>
        </div>

        {/* Results */}
        <div className="bg-surface-raised border border-border rounded-card p-5 space-y-4">
          <h3 className="font-display text-sm text-gold">Résultats</h3>

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.finalValue}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-4"
              >
                {/* Big Result */}
                <div className="text-center py-4">
                  <p className="font-display text-5xl text-gold">
                    {result.finalValue}
                  </p>
                  <p className="text-xs font-data text-gray-400 mt-1">
                    Lancers : [{result.rolls.join(", ")}]
                    {modifier !== 0 && ` ${modifier >= 0 ? "+" : ""}${modifier}`}
                  </p>
                </div>

                {/* DC Check */}
                {dc !== undefined && result.succeeded !== undefined && (
                  <div
                    className={`
                      text-center py-2 rounded font-data text-sm font-bold
                      ${result.succeeded
                        ? "bg-emerald-950/30 text-emerald-400 border border-emerald-500/30"
                        : "bg-blood-dark/20 text-blood-light border border-blood/30"
                      }
                    `}
                  >
                    {result.succeeded ? "RÉUSSITE" : "ÉCHEC"} vs DD {dc}
                  </div>
                )}

                {/* Success Probability */}
                {dc !== undefined && (
                  <div className="text-center">
                    <p className="text-xs font-data text-gray-500">
                      Probabilité de réussite : {(result.successProbability * 100).toFixed(1)}%
                    </p>
                  </div>
                )}

                {/* Histogram */}
                <ProbabilityChart histogram={result.histogram} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-600 font-data text-sm"
              >
                Lancez les dés pour voir les résultats
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
