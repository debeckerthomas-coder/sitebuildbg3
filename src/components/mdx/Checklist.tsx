"use client";

// ============================================================================
// Checklist — MDX component rendering RunTracker for a category + act
// Usage in MDX: <Checklist category="item" act={2} />
// ============================================================================

import { RunTracker } from "@/components/tracker/RunTracker";
import type { Act } from "@/types";

interface ChecklistProps {
  readonly category: string;
  readonly act: Act;
}

export function Checklist({ act }: ChecklistProps) {
  return (
    <div className="my-6 rounded-card border border-border bg-surface-raised p-4">
      <RunTracker act={act} />
    </div>
  );
}
