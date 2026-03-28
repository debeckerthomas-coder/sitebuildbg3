"use client";

// ============================================================================
// Card — Design System base card component
// Standardized container with consistent border, radius, padding, and animation.
// ============================================================================

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { Rarity } from "@/types";

// ---------------------------------------------------------------------------
// Rarity → visual mapping (border + accent bar + glow)
// ---------------------------------------------------------------------------

const RARITY_STYLES: Record<
  Rarity,
  { border: string; glow: string; bar: string }
> = {
  common: {
    border: "border-rarity-common/40",
    glow: "",
    bar: "via-rarity-common/20",
  },
  uncommon: {
    border: "border-rarity-uncommon/50",
    glow: "hover:shadow-[0_0_16px_rgba(63,191,63,0.15)]",
    bar: "via-rarity-uncommon/40",
  },
  rare: {
    border: "border-rarity-rare/50",
    glow: "hover:shadow-[0_0_16px_rgba(77,148,255,0.2)]",
    bar: "via-rarity-rare/40",
  },
  very_rare: {
    border: "border-rarity-very_rare/50",
    glow: "hover:shadow-[0_0_20px_rgba(179,102,255,0.25)]",
    bar: "via-rarity-very_rare/50",
  },
  legendary: {
    border: "border-rarity-legendary/60",
    glow: "hover:shadow-[0_0_24px_rgba(255,140,0,0.3)]",
    bar: "via-rarity-legendary/60",
  },
};

const DEFAULT_STYLE = {
  border: "border-border",
  glow: "",
  bar: "",
};

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

type CardVariant = "default" | "raised" | "ghost";

const VARIANT_BG: Record<CardVariant, string> = {
  default: "bg-surface",
  raised: "bg-surface-raised",
  ghost: "bg-transparent",
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  readonly children: ReactNode;
  readonly variant?: CardVariant;
  readonly rarity?: Rarity;
  /** Show a colored accent bar at the top */
  readonly accentBar?: boolean;
  /** Disable entry animation */
  readonly noAnimation?: boolean;
  /** Skip the default p-4 content wrapper (for custom internal layouts) */
  readonly noPadding?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Card({
  children,
  variant = "default",
  rarity,
  accentBar = false,
  noAnimation = false,
  noPadding = false,
  className = "",
  ...rest
}: CardProps) {
  const styles = rarity ? RARITY_STYLES[rarity] : DEFAULT_STYLE;

  return (
    <motion.div
      initial={noAnimation ? false : { opacity: 0, y: 8 }}
      animate={noAnimation ? undefined : { opacity: 1, y: 0 }}
      transition={noAnimation ? undefined : { duration: 0.25, ease: "easeOut" }}
      className={`
        relative overflow-hidden rounded-xl border
        ${styles.border} ${styles.glow}
        ${VARIANT_BG[variant]}
        backdrop-blur-sm
        transition-shadow duration-200
        ${className}
      `}
      {...rest}
    >
      {accentBar && (
        <div
          className={`h-[2px] bg-gradient-to-r from-transparent ${styles.bar} to-transparent`}
        />
      )}
      {noPadding ? children : <div className="p-4">{children}</div>}
    </motion.div>
  );
}
