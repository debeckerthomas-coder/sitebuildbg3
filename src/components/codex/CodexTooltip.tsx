"use client";

/* eslint-disable react-hooks/refs */
// @floating-ui/react uses internal refs for positioning — these are callback
// refs (setReference/setFloating), not ref objects. Safe to use in render.

// ============================================================================
// CodexTooltip 3.0 — Premium BG3 Item/Spell Hover Card
// Fix: Separate floating-ui positioning (top/left) from framer-motion
// animation (transform) to prevent transform conflicts at (0,0).
// ============================================================================

import { useState, useId, useMemo, type ReactNode } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  FloatingPortal,
  type Placement,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import type { Rarity } from "@/types";
import { IconWithFallback } from "./IconWithFallback";

// ---------------------------------------------------------------------------
// Rarity → Color Mappings
// ---------------------------------------------------------------------------

const RARITY_COLORS: Record<Rarity, { border: string; glow: string; text: string; bg: string }> = {
  common: {
    border: "border-rarity-common/40",
    glow: "shadow-[0_0_12px_rgba(157,157,157,0.2)]",
    text: "text-rarity-common",
    bg: "bg-rarity-common/5",
  },
  uncommon: {
    border: "border-rarity-uncommon/50",
    glow: "shadow-[0_0_16px_rgba(63,191,63,0.25)]",
    text: "text-rarity-uncommon",
    bg: "bg-rarity-uncommon/5",
  },
  rare: {
    border: "border-rarity-rare/50",
    glow: "shadow-[0_0_16px_rgba(77,148,255,0.3)]",
    text: "text-rarity-rare",
    bg: "bg-rarity-rare/5",
  },
  very_rare: {
    border: "border-rarity-very_rare/50",
    glow: "shadow-[0_0_20px_rgba(179,102,255,0.35)]",
    text: "text-rarity-very_rare",
    bg: "bg-rarity-very_rare/5",
  },
  legendary: {
    border: "border-rarity-legendary/60",
    glow: "shadow-[0_0_24px_rgba(255,140,0,0.4)]",
    text: "text-rarity-legendary",
    bg: "bg-rarity-legendary/5",
  },
};

const RARITY_LABELS: Record<Rarity, string> = {
  common: "Commun",
  uncommon: "Inhabituel",
  rare: "Rare",
  very_rare: "Très Rare",
  legendary: "Légendaire",
};

// ---------------------------------------------------------------------------
// Stat Row
// ---------------------------------------------------------------------------

interface StatRowProps {
  readonly label: string;
  readonly value: string;
}

function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="flex justify-between items-center py-0.5">
      <span className="text-gray-400 font-data text-xs">{label}</span>
      <span className="text-gray-200 font-data text-xs font-medium">{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CodexTooltip Component
// ---------------------------------------------------------------------------

export interface CodexTooltipProps {
  /** The trigger element (inline link, icon, etc.) */
  readonly children: ReactNode;

  /** Tooltip content */
  readonly name: string;
  readonly icon?: string;
  readonly rarity?: Rarity;
  readonly description: string;
  readonly flavourText?: string;
  readonly stats?: readonly { readonly label: string; readonly value: string }[];
  readonly tags?: readonly string[];

  /** Floating UI placement preference */
  readonly placement?: Placement;
}

export function CodexTooltip({
  children,
  name,
  icon,
  rarity = "common",
  description,
  flavourText,
  stats,
  tags,
  placement = "top",
}: CodexTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null);
  const tooltipId = useId();

  // Build middleware array, only include arrow when its element is available
  const middleware = useMemo(
    () => [
      offset(12),
      flip({ padding: 16, fallbackAxisSideDirection: "start" }),
      shift({ padding: 16, crossAxis: true }),
      ...(arrowEl ? [arrow({ element: arrowEl })] : []),
    ],
    [arrowEl],
  );

  const { refs, x, y, strategy, context } = useFloating({
    open: isOpen,
    placement,
    strategy: "fixed",
    middleware,
    whileElementsMounted: autoUpdate,
  });

  const colors = RARITY_COLORS[rarity];

  const arrowSide = context.placement?.split("-")[0];
  const arrowPosition: Record<string, string> = {
    top: "bottom-[-4px]",
    bottom: "top-[-4px]",
    left: "right-[-4px]",
    right: "left-[-4px]",
  };

  // ---------------------------------------------------------------------------
  // CRITICAL FIX: Use top/left for positioning instead of floatingStyles.
  // floatingStyles uses CSS `transform: translate(...)` which conflicts with
  // framer-motion's own transform (scale, y). This conflict caused the tooltip
  // to render at (0,0). By using top/left directly, we free the `transform`
  // property for framer-motion animations.
  // ---------------------------------------------------------------------------
  const positionStyles: React.CSSProperties = {
    position: strategy,
    top: y ?? 0,
    left: x ?? 0,
  };

  return (
    <>
      {/* Trigger */}
      <span
        ref={refs.setReference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={`inline-flex items-center gap-1 cursor-help border-b border-dotted ${colors.text} hover:brightness-125 transition-all duration-150`}
        tabIndex={0}
        role="button"
        aria-describedby={isOpen ? tooltipId : undefined}
      >
        {children}
      </span>

      {/* Floating Tooltip — rendered in a portal to escape overflow/stacking contexts */}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              id={tooltipId}
              role="tooltip"
              style={positionStyles}
              initial={{ opacity: 0, scale: 0.95, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`
                z-[9999] w-72 sm:w-80
                rounded-card border-2 ${colors.border}
                ${colors.glow}
                bg-surface/95 backdrop-blur-md
                overflow-hidden
                pointer-events-none
              `}
            >
              {/* Rarity glow strip at top */}
              <div
                className={`h-0.5 w-full ${colors.bg} animate-glow-rarity`}
                style={{
                  background: `linear-gradient(90deg, transparent, ${
                    rarity === "legendary"
                      ? "rgba(255,140,0,0.6)"
                      : rarity === "very_rare"
                        ? "rgba(179,102,255,0.5)"
                        : rarity === "rare"
                          ? "rgba(77,148,255,0.4)"
                          : rarity === "uncommon"
                            ? "rgba(63,191,63,0.3)"
                            : "rgba(157,157,157,0.2)"
                  }, transparent)`,
                }}
              />

              {/* Header */}
              <div className="px-4 pt-3 pb-2 flex items-start gap-3">
                <IconWithFallback
                  src={icon ?? ""}
                  alt={name}
                  rarity={rarity}
                  size={48}
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-display text-sm font-semibold ${colors.text} leading-tight`}>
                    {name}
                  </h3>
                  <span className={`text-xs font-data ${colors.text} opacity-70`}>
                    {RARITY_LABELS[rarity]}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Description */}
              <div className="px-4 py-2">
                <p className="text-xs font-body text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Stats */}
              {stats && stats.length > 0 && (
                <div className="px-4 pb-2">
                  <div className="bg-abyss-100/50 rounded px-2 py-1.5 space-y-0.5">
                    {stats.map((stat) => (
                      <StatRow key={stat.label} label={stat.label} value={stat.value} />
                    ))}
                  </div>
                </div>
              )}

              {/* Flavour text */}
              {flavourText && (
                <div className="px-4 pb-2">
                  <p className="text-xs font-body italic text-gold-muted leading-relaxed">
                    &ldquo;{flavourText}&rdquo;
                  </p>
                </div>
              )}

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="px-4 pb-3 flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-data px-1.5 py-0.5 rounded bg-abyss-200 text-gray-400 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Arrow */}
              <div
                ref={setArrowEl}
                className={`
                  absolute w-2 h-2 rotate-45 bg-surface border ${colors.border}
                  ${arrowSide ? arrowPosition[arrowSide] ?? "" : ""}
                `}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
