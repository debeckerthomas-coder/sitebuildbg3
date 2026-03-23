"use client";

// ============================================================================
// usePointBuy — Logique du Point Buy 27 (D&D 5E / BG3)
// ============================================================================
//
// Règles :
//   - Toutes les stats commencent à 8, max avant bonus = 15
//   - 27 points à dépenser
//   - 8→13 : 1 point par palier
//   - 13→14 : 2 points (total cumulé pour 14 = 7)
//   - 14→15 : 2 points (total cumulé pour 15 = 9)
//   - Bonus racial : +2 et +1 sur deux stats différentes
// ============================================================================

import { useState, useMemo, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AbilityKey = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export interface AbilityState {
  readonly base: number; // 8–15 (before racial bonus)
  readonly bonus: 0 | 1 | 2; // racial bonus applied
}

export interface PointBuyState {
  readonly abilities: Record<AbilityKey, AbilityState>;
  readonly pointsSpent: number;
  readonly pointsRemaining: number;
}

export interface PointBuyActions {
  readonly increment: (key: AbilityKey) => void;
  readonly decrement: (key: AbilityKey) => void;
  readonly setBonus: (key: AbilityKey, bonus: 0 | 1 | 2) => void;
  readonly reset: () => void;
  readonly getFinalScore: (key: AbilityKey) => number;
  readonly getModifier: (key: AbilityKey) => number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const ABILITY_KEYS: readonly AbilityKey[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export const ABILITY_LABELS: Record<AbilityKey, string> = {
  STR: "Force",
  DEX: "Dextérité",
  CON: "Constitution",
  INT: "Intelligence",
  WIS: "Sagesse",
  CHA: "Charisme",
};

const BASE_MIN = 8;
const BASE_MAX = 15;
const TOTAL_POINTS = 27;

/** Cost to reach a given base score from 8 */
const CUMULATIVE_COST: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7, // 13→14 costs 2
  15: 9, // 14→15 costs 2
};

/** Incremental cost to go from (score-1) → score */
function incrementalCost(targetScore: number): number {
  return (CUMULATIVE_COST[targetScore] ?? 0) - (CUMULATIVE_COST[targetScore - 1] ?? 0);
}

function createDefault(): Record<AbilityKey, AbilityState> {
  return {
    STR: { base: 8, bonus: 0 },
    DEX: { base: 8, bonus: 0 },
    CON: { base: 8, bonus: 0 },
    INT: { base: 8, bonus: 0 },
    WIS: { base: 8, bonus: 0 },
    CHA: { base: 8, bonus: 0 },
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function usePointBuy(): PointBuyState & PointBuyActions {
  const [abilities, setAbilities] = useState<Record<AbilityKey, AbilityState>>(createDefault);

  const pointsSpent = useMemo(
    () => ABILITY_KEYS.reduce((sum, k) => sum + (CUMULATIVE_COST[abilities[k].base] ?? 0), 0),
    [abilities]
  );

  const pointsRemaining = TOTAL_POINTS - pointsSpent;

  const increment = useCallback((key: AbilityKey) => {
    setAbilities((prev) => {
      const current = prev[key].base;
      if (current >= BASE_MAX) return prev;
      const cost = incrementalCost(current + 1);
      const currentSpent = ABILITY_KEYS.reduce((s, k) => s + (CUMULATIVE_COST[prev[k].base] ?? 0), 0);
      if (currentSpent + cost > TOTAL_POINTS) return prev;
      return { ...prev, [key]: { ...prev[key], base: current + 1 } };
    });
  }, []);

  const decrement = useCallback((key: AbilityKey) => {
    setAbilities((prev) => {
      const current = prev[key].base;
      if (current <= BASE_MIN) return prev;
      return { ...prev, [key]: { ...prev[key], base: current - 1 } };
    });
  }, []);

  const setBonus = useCallback((key: AbilityKey, bonus: 0 | 1 | 2) => {
    setAbilities((prev) => {
      const updated = { ...prev };

      // If assigning +2 or +1, remove it from any other stat that has the same bonus
      if (bonus > 0) {
        for (const k of ABILITY_KEYS) {
          if (k !== key && updated[k].bonus === bonus) {
            updated[k] = { ...updated[k], bonus: 0 };
          }
        }
      }

      updated[key] = { ...updated[key], bonus };
      return updated;
    });
  }, []);

  const reset = useCallback(() => {
    setAbilities(createDefault());
  }, []);

  const getFinalScore = useCallback(
    (key: AbilityKey) => abilities[key].base + abilities[key].bonus,
    [abilities]
  );

  const getModifier = useCallback(
    (key: AbilityKey) => Math.floor((abilities[key].base + abilities[key].bonus - 10) / 2),
    [abilities]
  );

  return {
    abilities,
    pointsSpent,
    pointsRemaining,
    increment,
    decrement,
    setBonus,
    reset,
    getFinalScore,
    getModifier,
  };
}
