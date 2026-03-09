// ============================================================================
// Initiative Sync Calculator — BG3 d4 Initiative System
//
// BG3 uses a d4 (not d20) for initiative rolls, which creates frequent ties.
// This engine calculates exact probabilities and shared initiative groups.
// ============================================================================

import type { InitiativeActor, InitiativeResult } from "@/types";

// ---------------------------------------------------------------------------
// BG3 Initiative: d4 + DEX modifier + bonuses
// ---------------------------------------------------------------------------

function dexModifier(dexterity: number): number {
  return Math.floor((dexterity - 10) / 2);
}

function rollD4(): number {
  return Math.floor(Math.random() * 4) + 1;
}

/**
 * Roll initiative for a single actor using BG3 rules (d4 system).
 */
function rollInitiative(actor: InitiativeActor): number {
  const base = rollD4();
  const dexMod = dexModifier(actor.dexterity);
  const total = base + dexMod + actor.bonuses;

  // Alert feat in BG3: +5 to initiative, can't be surprised
  const alertBonus = actor.hasAlertFeat ? 5 : 0;

  return total + alertBonus;
}

// ---------------------------------------------------------------------------
// Simulate Initiative Order
// ---------------------------------------------------------------------------

export function rollPartyInitiative(
  actors: readonly InitiativeActor[]
): InitiativeResult {
  // Roll for each actor
  const rolls = actors.map((actor) => {
    const roll = rollD4();
    const dexMod = dexModifier(actor.dexterity);
    const alertBonus = actor.hasAlertFeat ? 5 : 0;
    const total = roll + dexMod + actor.bonuses + alertBonus;
    return { name: actor.name, roll, total };
  });

  // Sort descending by total (higher goes first)
  const sorted = [...rolls].sort((a, b) => b.total - a.total);

  // Identify shared initiative groups (ties)
  const groups: string[][] = [];
  let currentGroup: string[] = [sorted[0]!.name];
  let currentTotal = sorted[0]!.total;

  for (let i = 1; i < sorted.length; i++) {
    const entry = sorted[i]!;
    if (entry.total === currentTotal) {
      currentGroup.push(entry.name);
    } else {
      if (currentGroup.length > 1) {
        groups.push([...currentGroup]);
      }
      currentGroup = [entry.name];
      currentTotal = entry.total;
    }
  }
  if (currentGroup.length > 1) {
    groups.push(currentGroup);
  }

  // Calculate probability of this exact order
  const probability = calculateExactOrderProbability(actors, sorted);

  return {
    order: sorted,
    probabilityOfExactOrder: probability,
    sharedInitiativeGroups: groups,
  };
}

// ---------------------------------------------------------------------------
// Exact Probability Calculation
// ---------------------------------------------------------------------------

/**
 * Calculate the exact probability that a set of actors ends up in
 * a specific initiative order, considering the d4 system.
 *
 * Each actor's initiative = d4 + dexMod + bonuses + alert.
 * Possible d4 values: 1, 2, 3, 4 (each with p=0.25)
 *
 * We enumerate all possible d4 outcomes (4^n) and count how many
 * produce the exact observed ordering.
 */
function calculateExactOrderProbability(
  actors: readonly InitiativeActor[],
  desiredOrder: readonly { name: string; total: number }[]
): number {
  const n = actors.length;
  const totalOutcomes = Math.pow(4, n);

  // Pre-compute static bonuses for each actor
  const staticBonuses = actors.map((a) => {
    const dexMod = dexModifier(a.dexterity);
    const alert = a.hasAlertFeat ? 5 : 0;
    return dexMod + a.bonuses + alert;
  });

  // Map actor names to their index in the original array
  const nameToIndex = new Map<string, number>();
  actors.forEach((a, i) => nameToIndex.set(a.name, i));

  const desiredNameOrder = desiredOrder.map((d) => d.name);

  let favorableOutcomes = 0;

  // Enumerate all d4 combinations
  for (let mask = 0; mask < totalOutcomes; mask++) {
    // Extract each actor's d4 roll from the mask
    const totals: { name: string; total: number }[] = [];
    let temp = mask;

    for (let i = 0; i < n; i++) {
      const d4Roll = (temp % 4) + 1; // 1-4
      temp = Math.floor(temp / 4);
      const idx = nameToIndex.get(desiredNameOrder[i]!)!;
      totals.push({
        name: actors[idx]!.name,
        total: d4Roll + staticBonuses[idx]!,
      });
    }

    // Sort by total descending, stable (preserving input order for ties)
    const sorted = [...totals].sort((a, b) => b.total - a.total);

    // Check if this ordering matches the desired order
    const matches = sorted.every((s, i) => s.name === desiredNameOrder[i]);
    if (matches) {
      favorableOutcomes++;
    }
  }

  return favorableOutcomes / totalOutcomes;
}

// ---------------------------------------------------------------------------
// Probability Analysis (no RNG — pure math)
// ---------------------------------------------------------------------------

/**
 * For a party of actors, calculate the probability distribution of
 * who goes first (without rolling — pure enumeration).
 */
export function analyzeFirstTurnProbabilities(
  actors: readonly InitiativeActor[]
): Record<string, number> {
  const n = actors.length;
  const totalOutcomes = Math.pow(4, n);

  const staticBonuses = actors.map((a) => {
    const dexMod = dexModifier(a.dexterity);
    const alert = a.hasAlertFeat ? 5 : 0;
    return dexMod + a.bonuses + alert;
  });

  const firstCounts: Record<string, number> = {};
  actors.forEach((a) => (firstCounts[a.name] = 0));

  for (let mask = 0; mask < totalOutcomes; mask++) {
    let temp = mask;
    let maxTotal = -Infinity;
    let firstName = "";

    for (let i = 0; i < n; i++) {
      const d4Roll = (temp % 4) + 1;
      temp = Math.floor(temp / 4);
      const total = d4Roll + staticBonuses[i]!;
      if (total > maxTotal) {
        maxTotal = total;
        firstName = actors[i]!.name;
      }
    }

    firstCounts[firstName]!++;
  }

  // Convert to probabilities
  const result: Record<string, number> = {};
  for (const [name, count] of Object.entries(firstCounts)) {
    result[name] = count / totalOutcomes;
  }
  return result;
}
