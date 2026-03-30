"use client";

// ============================================================================
// Checkbox — Design System checkbox built on Radix UI
// Single consistent animation: spring scale + SVG path draw.
// Standardized colors: gold border/fill on check, border-border unchecked.
// ============================================================================

import { type ReactNode } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface CheckboxProps {
  readonly checked: boolean;
  readonly onCheckedChange: (checked: boolean) => void;
  readonly disabled?: boolean;
  readonly children?: ReactNode;
  /** Show strikethrough text when checked */
  readonly strikethrough?: boolean;
}

// ---------------------------------------------------------------------------
// Animation constants
// ---------------------------------------------------------------------------

const SPRING = { type: "spring" as const, stiffness: 500, damping: 25 };
const PATH_DRAW = { duration: 0.3, delay: 0.1 };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Checkbox({
  checked,
  onCheckedChange,
  disabled = false,
  children,
  strikethrough = true,
}: CheckboxProps) {
  return (
    <label
      className={`
        group flex items-start gap-3 cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <RadixCheckbox.Root
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(val === true)}
        disabled={disabled}
        className={`
          mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center
          rounded bg-[#171b29] border border-[#2a3048] transition-colors duration-200
          data-[state=checked]:bg-[#9b7e1e] data-[state=checked]:border-[#9b7e1e]
          hover:border-[#3a4068]
        `}
      >
        <AnimatePresence>
          {checked && (
            <RadixCheckbox.Indicator asChild forceMount>
              <motion.svg
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={SPRING}
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
                  className="text-[#111520]"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={PATH_DRAW}
                />
              </motion.svg>
            </RadixCheckbox.Indicator>
          )}
        </AnimatePresence>
      </RadixCheckbox.Root>

      {children && (
        <span
          className={`
            text-sm font-body leading-relaxed transition-colors duration-200
            ${checked && strikethrough ? "text-gray-500 line-through" : "text-gray-200"}
          `}
        >
          {children}
        </span>
      )}
    </label>
  );
}
