"use client";

/* eslint-disable react-hooks/refs */
// @floating-ui/react uses internal refs for positioning — these are callback
// refs (setReference/setFloating), not ref objects. Safe to use in render.

// ============================================================================
// CodexTooltip 2.0 — Premium BG3 Item/Spell Hover Card
// Features: Dynamic positioning (Floating UI), rarity glow, Framer Motion
// ============================================================================

import { useState, type ReactNode } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  type Placement,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import type { Rarity } from "@/types";

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

  const floating = useFloating({
    open: isOpen,
    placement,
    middleware: [
      offset(12),
      flip({ padding: 16 }),
      shift({ padding: 16 }),
      arrow({ element: arrowEl }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const setReference = floating.refs.setReference;
  const setFloating = floating.refs.setFloating;
  const floatingStyles = floating.floatingStyles;

  const colors = RARITY_COLORS[rarity];

  // Avoid hydration mismatches: only compute arrow placement client-side
  const arrowSide = floating.context.placement?.split("-")[0];
  const arrowPosition: Record<string, string> = {
    top: "bottom-[-4px]",
    bottom: "top-[-4px]",
    left: "right-[-4px]",
    right: "left-[-4px]",
  };

  return (
    <>
      {/* Trigger */}
      <span
        ref={setReference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={`inline-flex items-center gap-1 cursor-help border-b border-dotted ${colors.text} hover:brightness-125 transition-all duration-150`}
        tabIndex={0}
        role="button"
        aria-describedby={isOpen ? "codex-tooltip" : undefined}
      >
        {children}
      </span>

      {/* Floating Tooltip Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={setFloating}
            id="codex-tooltip"
            role="tooltip"
            style={floatingStyles}
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`
              z-50 w-72 sm:w-80
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
              {icon && (
                <div
                  className={`
                    w-12 h-12 rounded border ${colors.border}
                    bg-abyss-100 flex items-center justify-center shrink-0
                    overflow-hidden
                  `}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt={name}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                  />
                </div>
              )}
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
    </>
  );
}
