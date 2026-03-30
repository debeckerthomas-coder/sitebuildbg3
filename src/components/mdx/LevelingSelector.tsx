"use client";

// ============================================================================
// LevelingSelector — Interactive level picker showing power spikes
// from the buildRegistry. Usage in MDX:
//   <LevelingSelector buildId="throwzerker" />
// ============================================================================

import React, { useState, useMemo, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRegistryBuild } from "@/data/registry";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LEVELS = Array.from({ length: 12 }, (_, i) => i + 1);

// ---------------------------------------------------------------------------
// Helpers — filter MDX children by level
// ---------------------------------------------------------------------------

/**
 * Extracts children that match the given level.
 * Looks for elements with a `data-level` prop (number or string).
 * If no children have `data-level`, returns all children (backward compat).
 */
function filterChildrenByLevel(children: ReactNode | undefined, level: number): ReactNode {
  if (!children) return null;

  const childArray = React.Children.toArray(children);

  // Check if any child has data-level — if none do, skip filtering entirely
  const hasLevelTags = childArray.some(
    (child) => React.isValidElement(child) && (child.props as Record<string, unknown>)["data-level"] != null,
  );

  if (!hasLevelTags) return null; // No level-tagged children — registry-only mode

  return childArray.filter((child) => {
    if (!React.isValidElement(child)) return false;
    const props = child.props as Record<string, unknown>;
    const childLevel = Number(props["data-level"]);
    return childLevel === level;
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface LevelingSelectorProps {
  /** Build ID from the registry */
  readonly buildId: string;
  /** Optional MDX children — use data-level={n} on wrapper divs to filter by level */
  readonly children?: ReactNode;
}

export function LevelingSelector({ buildId, children }: LevelingSelectorProps) {
  const [currentLevel, setCurrentLevel] = useState(1);

  const build = useMemo(() => getRegistryBuild(buildId), [buildId]);

  // Find the active spike: exact match or last spike at or below currentLevel
  const activeSpike = useMemo(() => {
    if (!build) return null;
    const spikes = build.powerSpikes;
    // Exact match first
    const exact = spikes.find((s) => s.level === currentLevel);
    if (exact) return exact;
    // Last unlocked spike
    const unlocked = spikes.filter((s) => s.level <= currentLevel);
    return unlocked.length > 0 ? unlocked[unlocked.length - 1] : null;
  }, [build, currentLevel]);

  // Which levels have spikes (for visual markers)
  const spikeLevels = useMemo(() => {
    if (!build) return new Set<number>();
    return new Set(build.powerSpikes.map((s) => s.level));
  }, [build]);

  if (!build) {
    return (
      <div className="my-6 p-4 rounded-lg bg-[#1c2133] border border-[#2a3048] text-sm text-gray-500">
        Build &quot;{buildId}&quot; not found in registry.
      </div>
    );
  }

  return (
    <div className="my-8 not-prose">
      {/* Level bar */}
      <div className="relative flex items-center justify-between gap-0 px-2">
        {/* Connection line */}
        <div className="absolute inset-x-6 top-1/2 h-px bg-[#2a3048] -translate-y-1/2 z-0" />

        {LEVELS.map((level) => {
          const isActive = level === currentLevel;
          const hasSpike = spikeLevels.has(level);

          return (
            <button
              key={level}
              type="button"
              onClick={() => setCurrentLevel(level)}
              className={`
                relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                text-xs font-data font-bold transition-all duration-300 cursor-pointer
                ${isActive
                  ? "bg-[#9b7e1e] text-[#111520] scale-110 shadow-lg shadow-[#9b7e1e]/40 ring-2 ring-[#d4af37]/30"
                  : hasSpike
                    ? "bg-[#1c2133] text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37]/10"
                    : "bg-[#1c2133] text-gray-400 hover:bg-[#252b3d] hover:text-gray-200"
                }
              `}
              aria-label={`Niveau ${level}`}
              aria-current={isActive ? "step" : undefined}
            >
              {level}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="mt-6 bg-[#111520]/80 backdrop-blur-sm p-6 rounded-xl border border-[#d4af37]/20 min-h-[120px]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-data uppercase tracking-widest text-[#d4af37]/60">
            Niveau {currentLevel} / 12
          </span>
          {activeSpike && activeSpike.level === currentLevel && (
            <span className="text-[9px] font-data uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#9b7e1e]/20 border border-[#d4af37]/30 text-[#d4af37]">
              Power Spike
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeSpike ? (
              <p className="text-sm font-body text-gray-200 leading-relaxed">
                {activeSpike.description}
              </p>
            ) : (
              <p className="text-sm font-body text-gray-500 italic">
                Pas de palier de puissance à ce niveau. Continuez à progresser.
              </p>
            )}

            {/* Filtered MDX children for this level */}
            {(() => {
              const levelContent = filterChildrenByLevel(children, currentLevel);
              if (!levelContent) return null;
              const arr = React.Children.toArray(levelContent);
              if (arr.length === 0) return null;
              return <div className="mt-4 text-sm font-body text-gray-300 leading-relaxed">{levelContent}</div>;
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev/Next buttons */}
      <div className="flex justify-between mt-3">
        <button
          type="button"
          onClick={() => setCurrentLevel((l) => Math.max(1, l - 1))}
          disabled={currentLevel === 1}
          className="text-xs font-data uppercase tracking-wider px-4 py-2 rounded-lg
                     border border-[#d4af37]/20 text-[#d4af37]/60
                     hover:bg-[#d4af37]/10 hover:text-[#d4af37]/80
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors cursor-pointer"
        >
          &larr; {" "}
        </button>
        <button
          type="button"
          onClick={() => setCurrentLevel((l) => Math.min(12, l + 1))}
          disabled={currentLevel === 12}
          className="text-xs font-data uppercase tracking-wider px-4 py-2 rounded-lg
                     border border-[#d4af37]/20 text-[#d4af37]/60
                     hover:bg-[#d4af37]/10 hover:text-[#d4af37]/80
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-colors cursor-pointer"
        >
          {" "} &rarr;
        </button>
      </div>
    </div>
  );
}
