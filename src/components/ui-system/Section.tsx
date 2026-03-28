"use client";

// ============================================================================
// Section — Design System section/panel wrapper
// Consistent header + content layout with optional icon, counter, and divider.
// ============================================================================

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SectionProps extends Omit<HTMLMotionProps<"div">, "children" | "title"> {
  readonly children: ReactNode;
  readonly title?: string;
  readonly description?: string;
  readonly icon?: ReactNode;
  /** e.g. "3/12" progress counter shown next to title */
  readonly counter?: string;
  /** Right-side header slot (for progress rings, buttons, etc.) */
  readonly headerRight?: ReactNode;
  /** Disable entry animation */
  readonly noAnimation?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Section({
  children,
  title,
  description,
  icon,
  counter,
  headerRight,
  noAnimation = false,
  className = "",
  ...rest
}: SectionProps) {
  const hasHeader = title || icon || headerRight;

  return (
    <motion.div
      initial={noAnimation ? false : { opacity: 0, y: 8 }}
      animate={noAnimation ? undefined : { opacity: 1, y: 0 }}
      transition={noAnimation ? undefined : { duration: 0.25, ease: "easeOut" }}
      className={`
        rounded-xl border border-border
        bg-surface-raised
        overflow-hidden
        ${className}
      `}
      {...rest}
    >
      {hasHeader && (
        <>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              {icon && (
                <span className="text-lg shrink-0" aria-hidden>
                  {icon}
                </span>
              )}
              <div className="min-w-0">
                {title && (
                  <h3 className="font-display text-base text-gold leading-tight">
                    {title}
                  </h3>
                )}
                {(description || counter) && (
                  <p className="text-xs font-data text-gray-400 mt-0.5">
                    {counter && (
                      <span className="text-gray-500">{counter}</span>
                    )}
                    {counter && description && (
                      <span className="mx-1.5 text-border">|</span>
                    )}
                    {description}
                  </p>
                )}
              </div>
            </div>
            {headerRight && <div className="shrink-0 ml-3">{headerRight}</div>}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
