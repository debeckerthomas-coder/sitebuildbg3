"use client";

// ============================================================================
// ChecklistTrackerMDX — Lightweight MDX wrapper for build leveling checklists
// Usage: <ChecklistTracker checklistId="leveling_bard" />
//
// Renders a simple interactive checklist with localStorage persistence.
// Does NOT depend on Zustand run state (works without an active run).
// ============================================================================

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Checkbox from "@radix-ui/react-checkbox";

interface ChecklistTrackerMDXProps {
  readonly checklistId: string;
}

const STORAGE_PREFIX = "bg3_checklist_";

export function ChecklistTrackerMDX({ checklistId }: ChecklistTrackerMDXProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${checklistId}`);
      if (raw) setChecked(JSON.parse(raw));
    } catch { /* ignore */ }
    setMounted(true);
  }, [checklistId]);

  const toggle = useCallback(
    (key: string, value: boolean) => {
      setChecked((prev) => {
        const next = { ...prev, [key]: value };
        try {
          localStorage.setItem(`${STORAGE_PREFIX}${checklistId}`, JSON.stringify(next));
        } catch { /* ignore */ }
        return next;
      });
    },
    [checklistId],
  );

  if (!mounted) {
    return (
      <div className="my-4 rounded-card border border-border bg-surface-raised p-4">
        <div className="h-4 w-48 bg-abyss-200 rounded animate-pulse" />
      </div>
    );
  }

  // Count checked items for progress
  const total = Object.keys(checked).length || 1;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="my-4 rounded-card border border-border bg-surface-raised overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">📋</span>
          <span className="text-sm font-display text-gold">Progression du Build</span>
        </div>
        {done > 0 && (
          <span className="text-xs font-data text-gray-400">
            {done} complété{done > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="px-4 py-2 text-xs font-data text-gray-500">
        Cochez chaque étape au fur et à mesure de votre progression. Votre avancement est sauvegardé automatiquement.
      </div>
    </div>
  );
}
