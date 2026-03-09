// ============================================================================
// Failsafe Engine — Conditional Arborescence Resolver
// Resolves the best available item given the current world state
// ============================================================================

import type {
  FailsafeChain,
  FailsafeCondition,
  FailsafeEntry,
  RunWorldState,
} from "@/types";

/**
 * Evaluate a single FailsafeCondition against the current world state.
 */
export function evaluateCondition(
  condition: FailsafeCondition,
  worldState: RunWorldState
): boolean {
  switch (condition.type) {
    case "flag":
      return (worldState[condition.flagId] ?? false) === condition.value;
    case "and":
      return condition.conditions.every((c) =>
        evaluateCondition(c, worldState)
      );
    case "or":
      return condition.conditions.some((c) =>
        evaluateCondition(c, worldState)
      );
    case "not":
      return !evaluateCondition(condition.condition, worldState);
  }
}

/**
 * Check if a failsafe entry is currently valid given the world state.
 * An entry with no condition is always valid.
 */
function isEntryValid(
  entry: FailsafeEntry,
  worldState: RunWorldState
): boolean {
  if (!entry.condition) return true;
  return evaluateCondition(entry.condition, worldState);
}

/**
 * Resolve a FailsafeChain: returns the best valid item ID and any
 * relevant reason strings for items that were skipped.
 */
export function resolveFailsafeChain(
  chain: FailsafeChain,
  worldState: RunWorldState
): {
  resolvedItemId: string;
  skippedReasons: string[];
} {
  const skippedReasons: string[] = [];

  // Check primary
  if (isEntryValid(chain.primary, worldState)) {
    return { resolvedItemId: chain.primary.itemId, skippedReasons: [] };
  }

  if (chain.primary.reason) {
    skippedReasons.push(chain.primary.reason);
  }

  // Walk fallbacks
  for (const fallback of chain.fallbacks) {
    if (isEntryValid(fallback, worldState)) {
      return { resolvedItemId: fallback.itemId, skippedReasons };
    }
    if (fallback.reason) {
      skippedReasons.push(fallback.reason);
    }
  }

  // Last fallback is always returned even if "invalid" — ultimate safety net
  const lastFallback = chain.fallbacks[chain.fallbacks.length - 1];
  if (lastFallback) {
    return { resolvedItemId: lastFallback.itemId, skippedReasons };
  }

  // If no fallbacks exist at all, return primary regardless
  return { resolvedItemId: chain.primary.itemId, skippedReasons };
}
