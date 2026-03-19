"use client";

// ============================================================================
// Failsafe — MDX component showing the active item from a failsafe chain
// Usage in MDX: <Failsafe slot="main_hand" buildId="honour_paladin" />
// ============================================================================

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import { getBuild } from "@/data/builds/builds";
import { getItem } from "@/data/items/items";
import { resolveFailsafeChain } from "@/lib/failsafe-engine";
import type { ItemSlot, RunWorldState } from "@/types";

interface FailsafeProps {
  readonly slot: ItemSlot;
  readonly buildId: string;
}

export function Failsafe({ slot, buildId }: FailsafeProps) {
  const activeRunId = useAppStore((s) => s.activeRunId);
  const runs = useAppStore((s) => s.runs);

  const activeRun = useMemo(
    () => runs.find((r) => r.id === activeRunId),
    [runs, activeRunId]
  );

  const worldState: RunWorldState = activeRun?.worldState ?? {};

  const build = getBuild(buildId);
  if (!build) {
    return <span className="text-blood-light text-xs">Build &quot;{buildId}&quot; not found.</span>;
  }

  const equipSlot = build.equipment.find((e) => e.slot === slot);
  if (!equipSlot) {
    return <span className="text-gray-500 text-xs">No equipment data for slot &quot;{slot}&quot;.</span>;
  }

  const { resolvedItemId, skippedReasons } = resolveFailsafeChain(
    equipSlot.failsafeChain,
    worldState
  );

  const item = getItem(resolvedItemId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-3 rounded-card border border-border bg-surface-raised overflow-hidden font-sans [&_p]:!font-sans [&_span]:!font-sans"
    >
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-gold animate-glow-rarity" />
        <div className="flex-1">
          <p className="text-xs font-data text-gray-400 uppercase tracking-wider">
            {slot.replace("_", " ")} — Best Available
          </p>
          <p className="text-sm font-display text-gold-light">
            {item?.name ?? resolvedItemId}
          </p>
        </div>
      </div>

      {/* Skipped reasons */}
      <AnimatePresence>
        {skippedReasons.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="px-4 pb-3 space-y-1"
          >
            {skippedReasons.map((reason, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs font-data text-yellow-600"
              >
                <span className="shrink-0">⚠</span>
                <span>{reason}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
