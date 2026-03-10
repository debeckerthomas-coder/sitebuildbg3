"use client";

// ============================================================================
// SingleStepTracker — Simple checkbox persisted via zustand
// Usage: <SingleStepTracker stepId="moine_feat" label="Prendre Bagarreur" />
// ============================================================================

import * as Checkbox from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";

interface SingleStepTrackerProps {
  readonly stepId: string;
  readonly label: string;
}

export function SingleStepTracker({ stepId, label }: SingleStepTrackerProps) {
  const activeRunId = useAppStore((s) => s.activeRunId);
  const runs = useAppStore((s) => s.runs);
  const updateRunChecklist = useAppStore((s) => s.updateRunChecklist);

  const activeRun = runs.find((r) => r.id === activeRunId);
  const checked = activeRun?.checklist?.[stepId] ?? false;

  const toggle = () => {
    if (activeRunId) {
      updateRunChecklist(activeRunId, stepId, !checked);
    }
  };

  return (
    <div className="my-3 flex items-center gap-3 rounded-card border border-border bg-surface-raised px-4 py-3 hover:border-gold/30 transition-colors">
      <Checkbox.Root
        checked={checked}
        onCheckedChange={toggle}
        disabled={!activeRunId}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-gold/40 bg-abyss transition-colors data-[state=checked]:bg-gold/20 data-[state=checked]:border-gold"
      >
        <AnimatePresence>
          {checked && (
            <Checkbox.Indicator asChild>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-gold text-sm"
              >
                ✓
              </motion.span>
            </Checkbox.Indicator>
          )}
        </AnimatePresence>
      </Checkbox.Root>
      <span
        className={`text-sm font-body transition-all duration-300 ${
          checked ? "text-gray-600 line-through" : "text-gray-200"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
