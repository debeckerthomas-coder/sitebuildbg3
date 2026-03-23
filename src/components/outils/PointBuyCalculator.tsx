"use client";

// ============================================================================
// PointBuyCalculator — La Forge des Caractéristiques (Point Buy 27)
// Design Dark Fantasy cohérent avec le reste de l'application
// ============================================================================

import { motion } from "framer-motion";
import {
  usePointBuy,
  ABILITY_KEYS,
  ABILITY_LABELS,
  type AbilityKey,
} from "@/hooks/usePointBuy";

// ---------------------------------------------------------------------------
// Modifier display helper
// ---------------------------------------------------------------------------

function formatModifier(mod: number): string {
  if (mod >= 0) return `+${mod}`;
  return `${mod}`;
}

// ---------------------------------------------------------------------------
// Stat Row — One ability score with controls
// ---------------------------------------------------------------------------

function StatRow({
  abilityKey,
  base,
  bonus,
  finalScore,
  modifier,
  canIncrement,
  onIncrement,
  onDecrement,
  onSetBonus,
}: {
  abilityKey: AbilityKey;
  base: number;
  bonus: 0 | 1 | 2;
  finalScore: number;
  modifier: number;
  canIncrement: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onSetBonus: (bonus: 0 | 1 | 2) => void;
}) {
  const modColor =
    modifier > 0 ? "text-green-400" : modifier < 0 ? "text-red-400" : "text-gray-400";

  return (
    <div className="flex items-center gap-2 sm:gap-4 py-3 px-3 sm:px-4 rounded-lg bg-abyss-100/40 border border-border hover:border-gold/20 transition-colors">
      {/* Ability name */}
      <div className="w-20 sm:w-28 shrink-0">
        <p className="font-display text-xs sm:text-sm text-gold tracking-wide">{abilityKey}</p>
        <p className="text-[9px] sm:text-[10px] font-data text-gray-500">{ABILITY_LABELS[abilityKey]}</p>
      </div>

      {/* -/+ controls for base score */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={onDecrement}
          disabled={base <= 8}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-md border border-border bg-surface-raised text-gray-300
                     hover:border-gold/40 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors font-data text-sm sm:text-base flex items-center justify-center"
          aria-label={`Diminuer ${ABILITY_LABELS[abilityKey]}`}
        >
          -
        </button>

        <span className="w-7 sm:w-8 text-center font-data text-sm sm:text-base text-gray-200">
          {base}
        </span>

        <button
          onClick={onIncrement}
          disabled={!canIncrement || base >= 15}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-md border border-border bg-surface-raised text-gray-300
                     hover:border-gold/40 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors font-data text-sm sm:text-base flex items-center justify-center"
          aria-label={`Augmenter ${ABILITY_LABELS[abilityKey]}`}
        >
          +
        </button>
      </div>

      {/* Racial bonus selector */}
      <div className="flex items-center gap-1">
        {([0, 1, 2] as const).map((b) => (
          <button
            key={b}
            onClick={() => onSetBonus(b === bonus ? 0 : b)}
            className={`
              px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-data border transition-all duration-150
              ${bonus === b && b > 0
                ? b === 2
                  ? "bg-gold/20 text-gold border-gold/50"
                  : "bg-theme/20 text-theme border-theme/50"
                : "bg-transparent text-gray-500 border-border hover:border-gray-400"}
              ${b === 0 ? "hidden" : ""}
            `}
            aria-label={`Bonus +${b} sur ${ABILITY_LABELS[abilityKey]}`}
          >
            +{b}
          </button>
        ))}
      </div>

      {/* Final score */}
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <motion.span
          key={finalScore}
          initial={{ scale: 1.3, color: "#d4af37" }}
          animate={{ scale: 1, color: "#e5e7eb" }}
          transition={{ duration: 0.25 }}
          className="font-display text-lg sm:text-xl w-7 sm:w-8 text-center"
        >
          {finalScore}
        </motion.span>

        <span className={`font-data text-sm sm:text-base w-8 text-center ${modColor}`}>
          {formatModifier(modifier)}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Point Buy Calculator — Main Component
// ---------------------------------------------------------------------------

export function PointBuyCalculator() {
  const {
    abilities,
    pointsSpent,
    pointsRemaining,
    increment,
    decrement,
    setBonus,
    reset,
    getFinalScore,
    getModifier,
  } = usePointBuy();

  const barPercent = Math.min((pointsSpent / 27) * 100, 100);
  const isOverBudget = pointsRemaining < 0;
  const isExact = pointsRemaining === 0;

  return (
    <div className="rounded-xl overflow-hidden bg-[#111520]/80 border border-border backdrop-blur-md">
      {/* Header — Point budget */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] font-data uppercase tracking-widest text-gray-500">
              Points restants
            </p>
            <p className={`font-display text-2xl sm:text-3xl ${isOverBudget ? "text-red-400" : isExact ? "text-green-400" : "text-gold"}`}>
              {pointsRemaining}
              <span className="text-sm sm:text-base text-gray-500 ml-1">/ 27</span>
            </p>
          </div>

          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-lg border border-border bg-surface-raised text-xs font-data text-gray-400
                       hover:text-red-400 hover:border-red-400/30 transition-colors"
          >
            Réinitialiser
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-abyss-100 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isOverBudget ? "bg-red-500" : isExact ? "bg-green-500" : "bg-gradient-to-r from-gold-dark to-gold"}`}
            initial={false}
            animate={{ width: `${barPercent}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Cost legend */}
        <div className="flex items-center gap-4 mt-3 text-[10px] font-data text-gray-500">
          <span>8→13 : 1 pt/palier</span>
          <span>13→14 : 2 pts</span>
          <span>14→15 : 2 pts</span>
        </div>
      </div>

      {/* Ability rows */}
      <div className="p-3 sm:p-4 space-y-2">
        {/* Column headers */}
        <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 pb-1 text-[9px] sm:text-[10px] font-data uppercase tracking-widest text-gray-500">
          <span className="w-20 sm:w-28 shrink-0">Stat</span>
          <span className="w-24 sm:w-28 text-center">Base</span>
          <span>Bonus</span>
          <span className="ml-auto flex gap-5 sm:gap-6">
            <span>Total</span>
            <span>Mod.</span>
          </span>
        </div>

        {ABILITY_KEYS.map((key) => {
          const { base, bonus } = abilities[key];
          return (
            <StatRow
              key={key}
              abilityKey={key}
              base={base}
              bonus={bonus}
              finalScore={getFinalScore(key)}
              modifier={getModifier(key)}
              canIncrement={pointsRemaining > 0 || (base < 13)}
              onIncrement={() => increment(key)}
              onDecrement={() => decrement(key)}
              onSetBonus={(b) => setBonus(key, b)}
            />
          );
        })}
      </div>

      {/* Summary footer */}
      <div className="p-4 sm:p-6 border-t border-border bg-abyss-100/30">
        <p className="text-[10px] font-data uppercase tracking-widest text-gray-500 mb-3">
          Résumé final
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {ABILITY_KEYS.map((key) => {
            const mod = getModifier(key);
            const modColor =
              mod > 0 ? "text-green-400" : mod < 0 ? "text-red-400" : "text-gray-400";
            return (
              <div
                key={key}
                className="flex flex-col items-center p-2 rounded-lg border border-border bg-surface-raised"
              >
                <span className="text-[10px] font-data text-gray-500">{key}</span>
                <span className="font-display text-lg text-gray-200">{getFinalScore(key)}</span>
                <span className={`text-xs font-data ${modColor}`}>
                  {formatModifier(mod)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
