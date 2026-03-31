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
import { Card } from "@/components/ui-system";
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
  const hasWarnings = skippedReasons.length > 0;

  return (
    <Card
      noPadding
      className="my-3 font-sans [&_p]:!font-sans [&_span]:!font-sans"
    >
      {/* Gold accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="px-4 py-3 flex items-center gap-3">
        {/* Animated gold dot */}
        <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
          <div className="absolute inset-0 rounded-full bg-gold/10 animate-glow-rarity" />
          <div className="w-2 h-2 rounded-full bg-gold" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">
            {slot.replace("_", " ")} — Best Available
          </p>
          <p className="text-sm font-display text-gold-light tracking-wide mt-0.5">
            {item?.name.fr ?? resolvedItemId}
          </p>
        </div>
      </div>

      {/* Skipped reasons */}
      <AnimatePresence>
        {hasWarnings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mx-4 mb-3 px-3 py-2.5 space-y-1.5
                            rounded-md bg-amber-950/20 border border-amber-700/15">
              {skippedReasons.map((reason, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs font-data text-amber-400/70"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500/50">
                    <path
                      d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm0 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
