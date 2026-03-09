// ============================================================================
// Dice Simulator Engine — Probabilistic + Karmic Dice Support
//
// Handles: Advantage/Disadvantage, BG3 Karmic Dice (biased rerolls to
// prevent streaks), exact probability histograms, success chance.
// ============================================================================

import type { DiceSimulatorInput, DiceSimulatorResult, DieSize } from "@/types";

// ---------------------------------------------------------------------------
// Core Rolling
// ---------------------------------------------------------------------------

function rollDie(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

/**
 * BG3's "Karmic Dice" system: if a roll result is in the bottom 25%
 * of the die range, there's a 75% chance it gets rerolled once.
 * This reduces the "feels bad" factor of consecutive low rolls.
 * Note: only applies to d20 attack/save/check rolls in BG3, but
 * we implement it generically for the simulator.
 */
function rollWithKarmic(die: DieSize): number {
  const result = rollDie(die);
  const karmicThreshold = Math.ceil(die * 0.25); // bottom 25%

  if (result <= karmicThreshold) {
    // 75% chance to reroll
    if (Math.random() < 0.75) {
      return rollDie(die); // keep this reroll regardless
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Advantage / Disadvantage
// ---------------------------------------------------------------------------

function rollWithAdvantage(die: DieSize, karmic: boolean): number[] {
  const roll1 = karmic ? rollWithKarmic(die) : rollDie(die);
  const roll2 = karmic ? rollWithKarmic(die) : rollDie(die);
  return [Math.max(roll1, roll2)];
}

function rollWithDisadvantage(die: DieSize, karmic: boolean): number[] {
  const roll1 = karmic ? rollWithKarmic(die) : rollDie(die);
  const roll2 = karmic ? rollWithKarmic(die) : rollDie(die);
  return [Math.min(roll1, roll2)];
}

function rollNormal(die: DieSize, count: number, karmic: boolean): number[] {
  return Array.from({ length: count }, () =>
    karmic ? rollWithKarmic(die) : rollDie(die)
  );
}

// ---------------------------------------------------------------------------
// Probability Calculations (exact, no simulation)
// ---------------------------------------------------------------------------

/**
 * Calculate the exact probability distribution for NdX + modifier.
 * Returns P(total = value) for each possible value.
 */
function calculateHistogram(
  die: DieSize,
  count: number,
  modifier: number,
  advantage: boolean,
  disadvantage: boolean
): { value: number; probability: number }[] {
  if (count === 1 && (advantage || disadvantage)) {
    return calculateSingleDieAdvHistogram(die, modifier, advantage);
  }

  // NdX probability via convolution
  // Start with uniform distribution for 1 die
  let dist = new Map<number, number>();
  for (let v = 1; v <= die; v++) {
    dist.set(v, 1 / die);
  }

  // Convolve for additional dice
  for (let d = 1; d < count; d++) {
    const newDist = new Map<number, number>();
    for (const [existing, p1] of dist) {
      for (let v = 1; v <= die; v++) {
        const sum = existing + v;
        newDist.set(sum, (newDist.get(sum) ?? 0) + p1 * (1 / die));
      }
    }
    dist = newDist;
  }

  // Apply modifier and convert to array
  const histogram: { value: number; probability: number }[] = [];
  for (const [value, probability] of dist) {
    histogram.push({ value: value + modifier, probability });
  }

  return histogram.sort((a, b) => a.value - b.value);
}

function calculateSingleDieAdvHistogram(
  die: DieSize,
  modifier: number,
  isAdvantage: boolean
): { value: number; probability: number }[] {
  const histogram: { value: number; probability: number }[] = [];

  for (let v = 1; v <= die; v++) {
    let p: number;
    if (isAdvantage) {
      // P(max of 2 = v) = (2v-1) / die^2
      p = (2 * v - 1) / (die * die);
    } else {
      // P(min of 2 = v) = (2*(die-v) + 1) / die^2
      p = (2 * (die - v) + 1) / (die * die);
    }
    histogram.push({ value: v + modifier, probability: p });
  }

  return histogram;
}

/**
 * Calculate probability of meeting or exceeding a DC.
 */
function calculateSuccessProbability(
  histogram: { value: number; probability: number }[],
  dc: number
): number {
  return histogram
    .filter((h) => h.value >= dc)
    .reduce((sum, h) => sum + h.probability, 0);
}

// ---------------------------------------------------------------------------
// Main Entry Point
// ---------------------------------------------------------------------------

export function simulateDiceRoll(input: DiceSimulatorInput): DiceSimulatorResult {
  const { die, count, advantage, disadvantage, karmicDice, modifier, dc } = input;

  // Roll the dice
  let rolls: number[];

  if (advantage && !disadvantage) {
    rolls = rollWithAdvantage(die, karmicDice);
  } else if (disadvantage && !advantage) {
    rolls = rollWithDisadvantage(die, karmicDice);
  } else {
    rolls = rollNormal(die, count, karmicDice);
  }

  const diceTotal = rolls.reduce((sum, v) => sum + v, 0);
  const finalValue = diceTotal + modifier;

  // Calculate exact probability distribution
  const effectiveAdv = advantage && !disadvantage;
  const effectiveDisadv = disadvantage && !advantage;
  const histogram = calculateHistogram(die, count, modifier, effectiveAdv, effectiveDisadv);

  // Success probability
  const successProbability = dc !== undefined
    ? calculateSuccessProbability(histogram, dc)
    : 1;

  const succeeded = dc !== undefined ? finalValue >= dc : undefined;

  return {
    rolls,
    finalValue,
    succeeded,
    successProbability,
    histogram,
  };
}

// ---------------------------------------------------------------------------
// Utility: Expected Value
// ---------------------------------------------------------------------------

export function expectedValue(die: DieSize, count: number, modifier: number): number {
  const avgDie = (die + 1) / 2;
  return count * avgDie + modifier;
}

/**
 * Expected value with advantage (single d20 or dX).
 * E[max(X1, X2)] for uniform [1, n] = n(n+1)(2n+1) / (6n^2) ... simplified:
 * = (2n + 1) / 3 - 1/(6n) ... but let's use the exact formula.
 */
export function expectedValueAdvantage(die: DieSize, modifier: number): number {
  // E[max(d,d)] = sum_{v=1}^{n} v * (2v-1) / n^2
  let sum = 0;
  for (let v = 1; v <= die; v++) {
    sum += v * (2 * v - 1);
  }
  return sum / (die * die) + modifier;
}

export function expectedValueDisadvantage(die: DieSize, modifier: number): number {
  // E[min(d,d)] = sum_{v=1}^{n} v * (2(n-v)+1) / n^2
  let sum = 0;
  for (let v = 1; v <= die; v++) {
    sum += v * (2 * (die - v) + 1);
  }
  return sum / (die * die) + modifier;
}
