"use client";

// ============================================================================
// SingleStepTracker — Simple checkbox persisted via useProgressStore (localStorage)
// Usage: <SingleStepTracker stepId="moine_feat" label="Prendre Bagarreur" />
// ============================================================================

import { useState, useEffect } from "react";
import { useProgressStore } from "@/store/useProgressStore";
import { Checkbox } from "@/components/ui-system";

interface SingleStepTrackerProps {
  readonly stepId: string;
  readonly label: string;
}

export function SingleStepTracker({ stepId, label }: SingleStepTrackerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const checked = useProgressStore((s) => s.checkedItems[stepId] ?? false);
  const toggle = useProgressStore((s) => s.toggleItem);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isChecked = isMounted && checked;

  return (
    <div className="my-3 rounded-xl border border-border bg-surface-raised px-4 py-3 hover:border-gold/30 transition-colors">
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => toggle(stepId)}
      >
        {label}
      </Checkbox>
    </div>
  );
}
