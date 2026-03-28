"use client";

// ============================================================================
// Button — Design System button component
// Three variants (primary, secondary, ghost) × three sizes (sm, md, lg).
// Consistent border-radius, padding, font, and hover behavior.
// ============================================================================

import { type ButtonHTMLAttributes, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: [
    "bg-gold text-abyss font-semibold",
    "hover:bg-gold-light",
    "active:scale-[0.98]",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gold",
  ].join(" "),
  secondary: [
    "bg-transparent text-gold border border-gold/30",
    "hover:bg-gold/10 hover:border-gold/50",
    "active:scale-[0.98]",
    "disabled:opacity-40 disabled:cursor-not-allowed",
  ].join(" "),
  ghost: [
    "bg-transparent text-gray-400",
    "hover:text-gray-200 hover:bg-surface-raised",
    "active:scale-[0.98]",
    "disabled:opacity-40 disabled:cursor-not-allowed",
  ].join(" "),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-sm px-5 py-2.5",
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  /** Render full-width */
  readonly fullWidth?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl font-data tracking-wider uppercase
        transition-all duration-200
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
