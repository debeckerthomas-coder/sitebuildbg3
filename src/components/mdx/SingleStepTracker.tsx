"use client";

// ============================================================================
// SingleStepTracker — Simple checkbox persisted via zustand
// Usage: <SingleStepTracker stepId="moine_feat" label="Prendre Bagarreur" />
// ============================================================================

import { useAppStore } from "@/store";
import { Checkbox } from "@/components/ui-system";

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

  return (
    <div className="my-3 rounded-xl border border-border bg-surface-raised px-4 py-3 hover:border-gold/30 transition-colors">
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => {
          if (activeRunId) updateRunChecklist(activeRunId, stepId, val);
        }}
        disabled={!activeRunId}
      >
        {label}
      </Checkbox>
    </div>
  );
}
