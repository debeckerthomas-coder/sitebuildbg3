"use client";

// ============================================================================
// ChecklistTracker — Liste de tâches persistante via zustand
// Sauvegarde automatique de la progression du joueur
// ============================================================================

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import type { PlaythroughStep } from "@/data/playthrough";
import { getEntry } from "@/data/database";
import { Checkbox } from "@/components/ui-system";

// ---------------------------------------------------------------------------
// Icônes par type d'étape
// ---------------------------------------------------------------------------

const TYPE_ICONS: Record<PlaythroughStep["type"], string> = {
  objectif: "📋",
  combat: "⚔️",
  butin: "💎",
  companion: "🛡️",
  secret: "🔮",
  marchand: "🪙",
  avertissement: "🚨",
};

const TYPE_LABELS: Record<PlaythroughStep["type"], string> = {
  objectif: "Objectif",
  combat: "Combat",
  butin: "Butin",
  companion: "Compagnon",
  secret: "Secret",
  marchand: "Marchand",
  avertissement: "Avertissement",
};

// ---------------------------------------------------------------------------
// Anneau de progression circulaire
// ---------------------------------------------------------------------------

function ProgressRing({ progress, size = 56 }: { progress: number; size?: number }) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-abyss-200" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor"
          strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference}
          className="text-gold"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-data font-bold text-gold">{Math.round(progress * 100)}%</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ligne de checklist
// ---------------------------------------------------------------------------

interface StepRowProps {
  readonly step: PlaythroughStep;
  readonly checked: boolean;
  readonly onToggle: (checked: boolean) => void;
  readonly index: number;
}

function StepRow({ step, checked, onToggle, index }: StepRowProps) {
  const codexItems = useMemo(
    () => (step.codexRefs ?? []).map(getEntry).filter(Boolean),
    [step.codexRefs]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`
        group flex items-start gap-3 px-3 py-3 rounded-card transition-colors duration-200
        ${step.critique ? "border-l-2 border-blood/60" : ""}
        ${checked ? "bg-abyss-100/30" : "bg-surface-raised hover:bg-abyss-100/50"}
      `}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onToggle(val)}
        strikethrough={false}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm" aria-hidden>{TYPE_ICONS[step.type]}</span>
          <span className="relative">
            <span className={`text-sm font-body transition-colors duration-300 ${checked ? "text-gray-500" : "text-gray-200"}`}>
              {step.label}
            </span>
            <AnimatePresence>
              {checked && (
                <motion.span
                  initial={{ width: "0%" }} animate={{ width: "100%" }} exit={{ width: "0%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-0 top-1/2 h-[1px] bg-gold-muted"
                />
              )}
            </AnimatePresence>
          </span>
          {step.critique && (
            <span className="text-[9px] font-data font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blood/20 text-blood-light">
              Critique
            </span>
          )}
          <span className="text-[9px] font-data uppercase tracking-wider text-gray-500 px-1 py-0.5 rounded bg-abyss-200">
            {TYPE_LABELS[step.type]}
          </span>
        </div>

        <p className={`text-xs font-data mt-1 leading-relaxed transition-colors duration-300 ${checked ? "text-gray-600" : "text-gray-400"}`}>
          {step.description}
        </p>

        {/* Références au Codex */}
        {codexItems.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {codexItems.map((entry) => entry && (
              <span
                key={entry.id}
                className={`
                  text-[10px] font-data px-2 py-0.5 rounded border
                  ${entry.rarity === "legendary" ? "border-rarity-legendary/40 text-rarity-legendary" :
                    entry.rarity === "very_rare" ? "border-rarity-very_rare/40 text-rarity-very_rare" :
                    entry.rarity === "rare" ? "border-rarity-rare/40 text-rarity-rare" :
                    entry.rarity === "uncommon" ? "border-rarity-uncommon/40 text-rarity-uncommon" :
                    "border-rarity-common/40 text-rarity-common"}
                `}
              >
                {entry.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ChecklistTracker
// ---------------------------------------------------------------------------

interface ChecklistTrackerProps {
  readonly sectionId: string;
  readonly titre: string;
  readonly description: string;
  readonly etapes: readonly PlaythroughStep[];
}

export function ChecklistTracker({ sectionId, titre, description, etapes }: ChecklistTrackerProps) {
  const activeRunId = useAppStore((s) => s.activeRunId);
  const runs = useAppStore((s) => s.runs);
  const updateRunChecklist = useAppStore((s) => s.updateRunChecklist);
  const setWorldStateFlag = useAppStore((s) => s.setWorldStateFlag);

  const activeRun = useMemo(() => runs.find((r) => r.id === activeRunId), [runs, activeRunId]);

  const completedCount = useMemo(
    () => etapes.filter((step) => activeRun?.checklist[step.id] === true).length,
    [etapes, activeRun]
  );

  const progress = etapes.length > 0 ? completedCount / etapes.length : 0;

  function handleToggle(step: PlaythroughStep, checked: boolean) {
    if (!activeRunId) return;
    updateRunChecklist(activeRunId, step.id, checked);
    if (step.critique && step.codexRefs?.[0]) {
      setWorldStateFlag(activeRunId, `${step.id}_done`, checked);
    }
  }

  if (!activeRun) {
    return (
      <div className="bg-surface-raised border border-border rounded-card p-6 text-center">
        <p className="text-sm font-data text-gray-500">
          Aucune partie active. Créez une nouvelle partie pour commencer à suivre votre progression.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-gold">{titre}</h3>
          <p className="font-data text-xs text-gray-400 mt-0.5">{description}</p>
          <p className="font-data text-xs text-gray-500 mt-1">
            {completedCount} / {etapes.length} étapes complétées
          </p>
        </div>
        <ProgressRing progress={progress} />
      </div>

      <div className="space-y-1.5">
        {etapes.map((step, i) => (
          <StepRow
            key={step.id}
            step={step}
            checked={activeRun.checklist[step.id] === true}
            onToggle={(checked) => handleToggle(step, checked)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
