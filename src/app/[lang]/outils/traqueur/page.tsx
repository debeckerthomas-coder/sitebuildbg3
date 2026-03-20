"use client";

// ============================================================================
// Le Traqueur d'Inventaire — Checklist Anti-Oubli Acte par Acte
// Persistance localStorage, animations Framer Motion, design glassmorphism
// ============================================================================

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Checkbox from "@radix-ui/react-checkbox";
import { TRACKER_ACTS, type TrackerItem, type TrackerAct } from "@/data/tracker";

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function loadChecklist(key: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(`bg3_checklist_${key}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveChecklist(key: string, state: Record<string, boolean>) {
  try {
    localStorage.setItem(`bg3_checklist_${key}`, JSON.stringify(state));
  } catch {
    /* quota exceeded — ignore */
  }
}

// ---------------------------------------------------------------------------
// Checkmark icon (animated SVG)
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <motion.svg
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <motion.path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.svg>
  );
}

// ---------------------------------------------------------------------------
// Item Row
// ---------------------------------------------------------------------------

function ItemRow({
  item,
  checked,
  onToggle,
  index,
}: {
  item: TrackerItem;
  checked: boolean;
  onToggle: (v: boolean) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className={`group flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
        checked ? "bg-theme/5" : "hover:bg-theme/10"
      }`}
    >
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(v) => onToggle(v === true)}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${
          checked
            ? "border-theme bg-theme/20 text-theme"
            : "border-theme/30 hover:border-theme/60"
        }`}
      >
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm font-body transition-colors duration-300 ${
              checked ? "text-gray-500 line-through" : "text-gray-100"
            }`}
          >
            {item.label}
          </span>
          <span className="text-[9px] font-data uppercase tracking-wider text-theme/70 px-1.5 py-0.5 rounded bg-theme/10">
            {item.location}
          </span>
          {item.missable && (
            <span className="text-[9px] font-data uppercase tracking-wider text-blood-light/80 px-1.5 py-0.5 rounded bg-blood/10">
              Manquable
            </span>
          )}
        </div>
        <p
          className={`text-xs font-data mt-0.5 leading-relaxed transition-colors duration-300 ${
            checked ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Progress Ring
// ---------------------------------------------------------------------------

function ProgressRing({ done, total }: { done: number; total: number }) {
  const progress = total > 0 ? done / total : 0;
  const size = 52;
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const allDone = done === total && total > 0;

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
          className="text-theme/10"
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
            className={allDone ? "text-emerald-400" : "text-theme"}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </AnimatePresence>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-[11px] font-data font-bold ${
            allDone ? "text-emerald-400" : "text-theme"
          }`}
        >
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Act Section
// ---------------------------------------------------------------------------

function ActSection({ act }: { act: TrackerAct }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration: must read localStorage after mount
    setChecked(loadChecklist(act.checklistId));
    setMounted(true);
  }, [act.checklistId]);

  const toggle = useCallback(
    (id: string, value: boolean) => {
      setChecked((prev) => {
        const next = { ...prev, [id]: value };
        saveChecklist(act.checklistId, next);
        return next;
      });
    },
    [act.checklistId],
  );

  const resetAll = useCallback(() => {
    setChecked({});
    saveChecklist(act.checklistId, {});
  }, [act.checklistId]);

  const doneCount = useMemo(
    () => act.items.filter((item) => checked[item.id]).length,
    [checked, act.items],
  );

  if (!mounted) {
    return (
      <div className="bg-[#111520]/60 backdrop-blur-md border border-theme/20 rounded-xl p-8">
        <div className="h-5 w-48 bg-abyss-200 rounded animate-pulse" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-abyss-200 rounded animate-pulse" style={{ width: `${70 + i * 5}%` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#111520]/60 backdrop-blur-md border border-theme/20 rounded-xl overflow-hidden">
      {/* Point de Non-Retour Alert */}
      <div className="bg-blood/10 border-b border-blood/30 px-6 py-4">
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5" aria-hidden>
            🚨
          </span>
          <div>
            <h3 className="font-heading text-sm text-blood-light uppercase tracking-wide">
              {act.alertTitle}
            </h3>
            <p className="text-xs font-body text-blood-light/70 mt-1 leading-relaxed">
              {act.alertDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            {act.icon}
          </span>
          <div>
            <h2 className="font-heading text-lg text-gradient-gold uppercase tracking-wide">
              {act.title}
            </h2>
            <p className="text-xs font-data text-gray-400 mt-0.5">
              {doneCount}/{act.items.length} objet
              {doneCount !== 1 ? "s" : ""} récupéré{doneCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <ProgressRing done={doneCount} total={act.items.length} />
      </div>

      {/* Item list */}
      <div className="px-6 pb-2 space-y-0.5">
        {act.items.map((item, i) => (
          <ItemRow
            key={item.id}
            item={item}
            checked={!!checked[item.id]}
            onToggle={(v) => toggle(item.id, v)}
            index={i}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-theme/10 flex justify-between items-center">
        {doneCount === act.items.length ? (
          <span className="text-xs font-data text-emerald-400 flex items-center gap-1.5">
            <span aria-hidden>✅</span> Tous les objets récupérés — Vous pouvez avancer !
          </span>
        ) : (
          <span className="text-xs font-data text-gray-500 italic">
            {act.items.length - doneCount} objet{act.items.length - doneCount !== 1 ? "s" : ""} restant{act.items.length - doneCount !== 1 ? "s" : ""}
          </span>
        )}
        <button
          type="button"
          onClick={resetAll}
          disabled={doneCount === 0}
          className="text-xs font-data uppercase tracking-wider px-4 py-2 rounded-lg
                     border border-theme/20 text-theme/60
                     hover:bg-theme/10 hover:text-theme/80
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors"
        >
          Réinitialiser
        </button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Global progress
// ---------------------------------------------------------------------------

function useGlobalProgress() {
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState({ done: 0, total: 0 });

  useEffect(() => {
    let done = 0;
    let total = 0;
    for (const act of TRACKER_ACTS) {
      total += act.items.length;
      const state = loadChecklist(act.checklistId);
      done += act.items.filter((item) => state[item.id]).length;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration: must read localStorage after mount to avoid server/client mismatch
    setCounts({ done, total });
    setMounted(true);
  }, []);

  return { ...counts, mounted };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TraqueurPage() {
  const { done, total, mounted } = useGlobalProgress();

  return (
    <div className="max-w-3xl space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-4xl text-gradient-gold uppercase tracking-wide">
          La Grande Traque
        </h1>
        <p className="font-heading text-lg text-theme/80 mt-1 tracking-wider uppercase">
          Inventaire Acte par Acte
        </p>
        <p className="text-sm font-body text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed">
          Cochez chaque objet au fur et à mesure de votre progression. Les cases
          cochées sont <strong className="text-theme/90">sauvegardées automatiquement</strong>{" "}
          dans votre navigateur — elles persisteront même après fermeture.
        </p>
        {mounted && total > 0 && (
          <p className="text-xs font-data text-gray-500 mt-2">
            Progression globale : {done}/{total} objets ({Math.round((done / total) * 100)}%)
          </p>
        )}
        <div className="mx-auto mt-4 w-32 h-px bg-gradient-to-r from-transparent via-theme/50 to-transparent" />
      </div>

      {/* Act Sections */}
      {TRACKER_ACTS.map((act) => (
        <ActSection key={act.id} act={act} />
      ))}
    </div>
  );
}
