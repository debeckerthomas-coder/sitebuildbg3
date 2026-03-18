"use client";

// ============================================================================
// LevelingGuide — Timeline interactive de leveling (1-12)
// Architecture Context : le niveau actif est propagé via React Context,
// éliminant les problèmes de parsing MDX avec React.Children.map.
// ============================================================================

import React, { useState, createContext, useContext, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Context — transmet le niveau actif aux LevelStep enfants
// ---------------------------------------------------------------------------

const LevelContext = createContext<number>(1);

// ---------------------------------------------------------------------------
// LevelStep — S'affiche uniquement quand son `level` correspond au contexte
// ---------------------------------------------------------------------------

export function LevelStep({
  level,
  children,
}: {
  level: number;
  children: ReactNode;
}) {
  const activeLevel = useContext(LevelContext);

  if (activeLevel !== level) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="prose prose-invert prose-sm max-w-none
                 prose-strong:text-theme prose-em:text-gray-300
                 prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-body"
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// LevelingGuide — Parent component with timeline + Context Provider
// ---------------------------------------------------------------------------

const LEVELS = Array.from({ length: 12 }, (_, i) => i + 1);

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
        <AnimatePresence mode="wait">
          <LevelContext.Provider value={activeLevel}>
            {children}
          </LevelContext.Provider>
        </AnimatePresence>
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
