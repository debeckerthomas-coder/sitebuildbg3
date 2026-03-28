"use client";

// ============================================================================
// RunTracker — Gratifying Checklist with Animated Progress
// Features: Strikethrough animation, circular progress, Framer Motion
// ============================================================================

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChecklistItem, Act } from "@/types";
import { useAppStore } from "@/store";
import { getChecklistByAct } from "@/data/checklists";
import { Checkbox } from "@/components/ui-system";

// ---------------------------------------------------------------------------
// Circular Progress Ring
// ---------------------------------------------------------------------------

interface ProgressRingProps {
  readonly progress: number; // 0 to 1
  readonly size?: number;
}

function ProgressRing({ progress, size = 56 }: ProgressRingProps) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-abyss-200"
        />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="text-gold"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-data font-bold text-gold">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single Checklist Item
// ---------------------------------------------------------------------------

interface ChecklistRowProps {
  readonly item: ChecklistItem;
  readonly checked: boolean;
  readonly onToggle: (checked: boolean) => void;
  readonly index: number;
}

const CATEGORY_ICONS: Record<ChecklistItem["category"], string> = {
  quest: "📜",
  item: "⚔️",
  companion: "🛡️",
  boss: "💀",
  secret: "🔮",
};

function ChecklistRow({ item, checked, onToggle, index }: ChecklistRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`
        group flex items-start gap-3 px-3 py-2.5 rounded-card
        transition-colors duration-200
        ${checked ? "bg-abyss-100/30" : "bg-surface-raised hover:bg-abyss-100/50"}
      `}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onToggle(val)}
        strikethrough={false}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm" aria-hidden>
            {CATEGORY_ICONS[item.category]}
          </span>
          <span className="relative">
            <span
              className={`
                text-sm font-body transition-colors duration-300
                ${checked ? "text-gray-500" : "text-gray-200"}
              `}
            >
              {item.label}
            </span>
            {/* Animated strikethrough */}
            <AnimatePresence>
              {checked && (
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  exit={{ width: "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-0 top-1/2 h-[1px] bg-gold-muted"
                />
              )}
            </AnimatePresence>
          </span>
        </div>
        {item.description && (
          <p
            className={`
              text-xs font-data mt-0.5 leading-relaxed transition-colors duration-300
              ${checked ? "text-gray-600" : "text-gray-400"}
            `}
          >
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// RunTracker Component
// ---------------------------------------------------------------------------

interface RunTrackerProps {
  readonly act: Act;
}

export function RunTracker({ act }: RunTrackerProps) {
  const activeRunId = useAppStore((s) => s.activeRunId);
  const runs = useAppStore((s) => s.runs);
  const updateRunChecklist = useAppStore((s) => s.updateRunChecklist);
  const setWorldStateFlag = useAppStore((s) => s.setWorldStateFlag);

  const activeRun = useMemo(
    () => runs.find((r) => r.id === activeRunId),
    [runs, activeRunId]
  );

  const items = useMemo(() => getChecklistByAct(act), [act]);

  // Filter items based on world-state requirements
  const visibleItems = useMemo(
    () =>
      items.filter((item) => {
        if (!item.requiredFlag || !activeRun) return true;
        return activeRun.worldState[item.requiredFlag] === true;
      }),
    [items, activeRun]
  );

  const completedCount = useMemo(
    () =>
      visibleItems.filter((item) => activeRun?.checklist[item.id] === true)
        .length,
    [visibleItems, activeRun]
  );

  const progress =
    visibleItems.length > 0 ? completedCount / visibleItems.length : 0;

  function handleToggle(item: ChecklistItem, checked: boolean) {
    if (!activeRunId) return;
    updateRunChecklist(activeRunId, item.id, checked);

    // If this checklist item sets a world-state flag, toggle it too
    if (item.setsFlag) {
      setWorldStateFlag(activeRunId, item.setsFlag, checked);
    }
  }

  if (!activeRun) {
    return (
      <div className="text-center py-8 text-gray-500 font-data text-sm">
        No active run. Create a new run to start tracking.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg text-gold">Act {act} Progress</h2>
          <p className="font-data text-xs text-gray-400">
            {completedCount} / {visibleItems.length} objectives complete
          </p>
        </div>
        <ProgressRing progress={progress} />
      </div>

      {/* Checklist */}
      <div className="space-y-1.5">
        {visibleItems.map((item, i) => (
          <ChecklistRow
            key={item.id}
            item={item}
            checked={activeRun.checklist[item.id] === true}
            onToggle={(checked) => handleToggle(item, checked)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
