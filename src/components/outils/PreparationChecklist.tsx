"use client";

// ============================================================================
// PreparationChecklist — Rituel de Préparation (Buff Checklist)
// Checklist persistante (localStorage) avec reset, style parchemin prestige
// ============================================================================

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LONG_REST_BUFFS, type PreparationBuff } from "@/data/preparation";
import { Checkbox, Badge, Button } from "@/components/ui-system";

const STORAGE_KEY = "bg3_checklist_long_rest_buffs";

// ---------------------------------------------------------------------------
// Buff row
// ---------------------------------------------------------------------------

function BuffRow({
  buff,
  checked,
  onToggle,
  index,
}: {
  buff: PreparationBuff;
  checked: boolean;
  onToggle: (v: boolean) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className={`group flex items-start gap-3 px-3 py-2.5 rounded-card transition-colors duration-200 ${
        checked ? "bg-amber-900/5" : "hover:bg-amber-900/10"
      }`}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onToggle(v)}
        strikethrough={false}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm font-body transition-colors duration-300 ${
              checked ? "text-gray-500 line-through" : "text-amber-100"
            }`}
          >
            {buff.label}
          </span>
          <Badge variant="warning">{buff.source}</Badge>
        </div>
        <p
          className={`text-xs font-data mt-0.5 leading-relaxed transition-colors duration-300 ${
            checked ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {buff.description}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PreparationChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration: must read localStorage after mount to avoid server/client mismatch
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  // Persist helper
  const persist = useCallback((next: Record<string, boolean>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    (id: string, value: boolean) => {
      setChecked((prev) => {
        const next = { ...prev, [id]: value };
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const resetAll = useCallback(() => {
    const empty: Record<string, boolean> = {};
    setChecked(empty);
    persist(empty);
  }, [persist]);

  const doneCount = useMemo(
    () => LONG_REST_BUFFS.filter((b) => checked[b.id]).length,
    [checked],
  );

  if (!mounted) {
    return (
      <div className="border-l-4 border-l-amber-700/50 bg-amber-900/10 p-8 my-8 rounded-xl">
        <div className="h-4 w-48 bg-abyss-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="border-l-4 border-l-amber-700/50 bg-amber-900/10 p-8 my-8 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            📜
          </span>
          <div>
            <h2 className="font-heading text-lg text-gold uppercase tracking-wide">
              Rituel de Repos Long
            </h2>
            <p className="text-xs font-data text-gray-400 mt-0.5">
              {doneCount}/{LONG_REST_BUFFS.length} buff
              {doneCount !== 1 ? "s" : ""} appliqué{doneCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Progress ring */}
        <ProgressMini
          done={doneCount}
          total={LONG_REST_BUFFS.length}
        />
      </div>

      {/* Buff list */}
      <div className="space-y-1">
        {LONG_REST_BUFFS.map((buff, i) => (
          <BuffRow
            key={buff.id}
            buff={buff}
            checked={!!checked[buff.id]}
            onToggle={(v) => toggle(buff.id, v)}
            index={i}
          />
        ))}
      </div>

      {/* Reset button */}
      <div className="mt-6 pt-4 border-t border-amber-700/20 flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={resetAll}
          disabled={doneCount === 0}
        >
          Reset du Repos
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tiny progress indicator
// ---------------------------------------------------------------------------

function ProgressMini({ done, total }: { done: number; total: number }) {
  const progress = total > 0 ? done / total : 0;
  const size = 44;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-amber-900/30"
        />
        <AnimatePresence>
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
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </AnimatePresence>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-data font-bold text-gold">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}
