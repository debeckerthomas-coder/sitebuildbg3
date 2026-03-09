"use client";

import { useMemo } from "react";
import { useAppStore } from "@/store";
import { resolveFailsafeChain } from "@/lib/failsafe-engine";
import { getItem } from "@/data/items/items";
import type { FailsafeChain, Item, RunWorldState } from "@/types";

interface ResolvedEquipment {
  item: Item | undefined;
  itemId: string;
  skippedReasons: string[];
}

/**
 * Hook to resolve a failsafe chain against the current run's world state.
 */
export function useFailsafeResolver(chain: FailsafeChain): ResolvedEquipment {
  const activeRunId = useAppStore((s) => s.activeRunId);
  const runs = useAppStore((s) => s.runs);

  const worldState: RunWorldState = useMemo(() => {
    const run = runs.find((r) => r.id === activeRunId);
    return run?.worldState ?? {};
  }, [runs, activeRunId]);

  return useMemo(() => {
    const { resolvedItemId, skippedReasons } = resolveFailsafeChain(
      chain,
      worldState
    );
    return {
      item: getItem(resolvedItemId),
      itemId: resolvedItemId,
      skippedReasons,
    };
  }, [chain, worldState]);
}
