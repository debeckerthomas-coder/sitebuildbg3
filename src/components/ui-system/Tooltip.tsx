"use client";

// ============================================================================
// Tooltip — Design System tooltip based on CodexTooltip architecture
// Uses floating-ui for positioning + Framer Motion for animation.
// Single consistent approach: no manual absolute positioning, no z-50 hacks.
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

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface TooltipProps {
  /** The trigger element (rendered inline) */
  readonly children: ReactNode;
  /** Tooltip content — either a string or custom ReactNode */
  readonly content: ReactNode;
  /** Floating UI placement */
  readonly placement?: Placement;
  /** Max width of the tooltip panel */
  readonly maxWidth?: "sm" | "md" | "lg";
  /** Visual style of the trigger text */
  readonly triggerStyle?: "underline" | "dotted" | "plain";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_WIDTH_CLASSES = {
  sm: "max-w-[16rem]",
  md: "max-w-[20rem]",
  lg: "max-w-[24rem]",
} as const;

const TRIGGER_CLASSES = {
  underline: "underline decoration-gold/40 underline-offset-4 cursor-help",
  dotted: "border-b border-dotted border-gold/40 cursor-help",
  plain: "cursor-help",
} as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Tooltip({
  children,
  content,
  placement = "top",
  maxWidth = "md",
  triggerStyle = "dotted",
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null);
  const tooltipId = useId();

  const middleware = useMemo(
    () => [
      offset(10),
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

  const arrowSide = context.placement?.split("-")[0];
  const arrowPosition: Record<string, string> = {
    top: "bottom-[-4px]",
    bottom: "top-[-4px]",
    left: "right-[-4px]",
    right: "left-[-4px]",
  };

  // Use top/left instead of transform to avoid conflict with framer-motion
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
        className={`
          inline-flex items-center gap-1
          ${TRIGGER_CLASSES[triggerStyle]}
          text-gold hover:text-gold-light
          transition-colors duration-150
        `}
        tabIndex={0}
        role="button"
        aria-describedby={isOpen ? tooltipId : undefined}
      >
        {children}
      </span>

      {/* Floating tooltip */}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              id={tooltipId}
              role="tooltip"
              style={positionStyles}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`
                z-[9999]
                ${MAX_WIDTH_CLASSES[maxWidth]}
                rounded-xl border border-border
                bg-surface/95 backdrop-blur-md
                px-4 py-3
                text-xs font-body text-gray-300 leading-relaxed
                pointer-events-none
                shadow-lg shadow-black/40
              `}
            >
              {content}

              {/* Arrow */}
              <div
                ref={setArrowEl}
                className={`
                  absolute w-2 h-2 rotate-45
                  bg-surface border border-border
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
