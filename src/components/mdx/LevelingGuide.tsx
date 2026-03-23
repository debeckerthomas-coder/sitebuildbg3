"use client";

// ============================================================================
// LevelingGuide — Timeline interactive de leveling (1-12)
//
// Architecture SANS Context — Compatible RSC / next-mdx-remote
// Le composant injecte activeLevel directement dans chaque LevelStep
// via React.Children + cloneElement, avec traversée profonde pour
// gérer le wrapping automatique de MDX (fragments, paragraphes).
// ============================================================================

import React, { useState, type ReactNode, type ReactElement } from "react";

// ---------------------------------------------------------------------------
// LevelStep — Visible uniquement quand __activeLevel === level
// La prop __activeLevel est injectée par LevelingGuide (pas de Context)
// ---------------------------------------------------------------------------

interface LevelStepProps {
  readonly level: number | string;
  readonly children: ReactNode;
  /** @internal — Injecté automatiquement par LevelingGuide */
  readonly __activeLevel?: number;
}

export function LevelStep({ level, children, __activeLevel }: LevelStepProps) {
  const targetLevel = parseInt(String(level), 10);
  const currentLevel = __activeLevel ?? 1;
  const isActive = !Number.isNaN(targetLevel) && currentLevel === targetLevel;

  return (
    <div
      className={isActive ? "mt-4 text-gray-200" : "hidden"}
      data-level={targetLevel}
    >
      {children}
    </div>
  );
}

// Tag for identification during deep traversal
LevelStep.displayName = "LevelStep";

// ---------------------------------------------------------------------------
// LevelingGuide — Parent with timeline, injects activeLevel into children
// ---------------------------------------------------------------------------

const LEVELS = Array.from({ length: 12 }, (_, i) => i + 1);

/**
 * Deep-traverse React children tree to find LevelStep components
 * and inject __activeLevel prop. Handles MDX wrapping (fragments, divs, p).
 */
function injectActiveLevel(nodes: ReactNode, activeLevel: number): ReactNode {
  return React.Children.map(nodes, (child) => {
    if (!React.isValidElement(child)) return child;

    const el = child as ReactElement<Record<string, unknown>>;

    // Detect LevelStep: has a `level` prop (duck typing, works across module boundaries)
    if ("level" in el.props) {
      return React.cloneElement(el, { __activeLevel: activeLevel });
    }

    // Recurse into wrapper elements (MDX may wrap in fragments, divs, etc.)
    if (el.props.children) {
      return React.cloneElement(el, {
        children: injectActiveLevel(el.props.children as ReactNode, activeLevel),
      });
    }

    return child;
  });
}

export function LevelingGuide({ children }: { children: ReactNode }) {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="my-8 not-prose">
      {/* Timeline */}
      <div className="relative flex items-center justify-between gap-0 px-2">
        {/* Connection line */}
        <div className="absolute inset-x-6 top-1/2 h-px bg-border/50 -translate-y-1/2 z-0" />

        {LEVELS.map((level) => {
          const isActive = level === activeLevel;
          return (
            <button
              key={level}
              type="button"
              onClick={() => setActiveLevel(level)}
              className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                         text-xs font-data font-bold transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-theme text-abyss scale-110 shadow-lg shadow-theme/40 ring-2 ring-theme/30"
                    : "bg-abyss-100 text-gray-400 hover:bg-abyss-200 hover:text-gray-200"
                }`}
              aria-label={`Niveau ${level}`}
              aria-current={isActive ? "step" : undefined}
            >
              {level}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="mt-6 bg-black/30 p-6 rounded-xl border border-theme/20 min-h-[150px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-data uppercase tracking-widest text-theme/60">
            Niveau {activeLevel} / 12
          </span>
        </div>
        {injectActiveLevel(children, activeLevel)}
      </div>

      {/* Prev/Next buttons */}
      <div className="flex justify-between mt-3">
        <button
          type="button"
          onClick={() => setActiveLevel((l) => Math.max(1, l - 1))}
          disabled={activeLevel === 1}
          className="text-xs font-data uppercase tracking-wider px-4 py-2 rounded-lg
                     border border-theme/20 text-theme/60
                     hover:bg-theme/10 hover:text-theme/80
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors cursor-pointer"
        >
          ← Précédent
        </button>
        <button
          type="button"
          onClick={() => setActiveLevel((l) => Math.min(12, l + 1))}
          disabled={activeLevel === 12}
          className="text-xs font-data uppercase tracking-wider px-4 py-2 rounded-lg
                     border border-theme/20 text-theme/60
                     hover:bg-theme/10 hover:text-theme/80
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors cursor-pointer"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
