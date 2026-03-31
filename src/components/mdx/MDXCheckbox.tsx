"use client";

// ============================================================================
// MDXCheckbox — Replaces native markdown checkbox inputs (- [ ] / - [x])
// with our styled interactive button-based checkbox.
// Handles all common MDX parser outputs: checked, defaultChecked, disabled.
// ============================================================================

import { useState } from "react";

interface MDXCheckboxProps {
  readonly type?: string;
  readonly checked?: boolean | string;
  readonly defaultChecked?: boolean | string;
  readonly disabled?: boolean;
  readonly [key: string]: unknown;
}

/**
 * MDX component override for `<input>`.
 * Only intercepts `type="checkbox"` — passes through other input types as-is.
 * Removes `disabled` attribute and makes the checkbox fully interactive.
 */
export function MDXCheckbox({ type, checked: checkedProp, defaultChecked, disabled, ...rest }: MDXCheckboxProps) {
  // Determine initial state from either checked or defaultChecked
  // Handle both boolean and string values (some parsers pass "true"/"false" strings)
  const resolveChecked = (val: unknown): boolean => {
    if (typeof val === "boolean") return val;
    if (typeof val === "string") return val === "true" || val === "";
    return false;
  };

  const initialChecked = resolveChecked(checkedProp) || resolveChecked(defaultChecked);
  const [isChecked, setIsChecked] = useState(initialChecked);

  // Only intercept checkboxes — render other inputs normally (without disabled)
  if (type !== "checkbox") {
    return <input type={type} defaultChecked={resolveChecked(checkedProp)} {...rest} />;
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      onClick={() => setIsChecked((v) => !v)}
      className={`
        inline-flex h-5 w-5 shrink-0 items-center justify-center align-middle
        rounded bg-[#171b29] border-2 transition-all duration-200 cursor-pointer mr-2
        focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30
        ${isChecked
          ? "bg-[#9b7e1e] border-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.3)]"
          : "border-[#2a3048] hover:border-[#d4af37]/50 hover:bg-[#1c2133]"
        }
      `}
    >
      {isChecked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6L5 9L10 3"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#111520]"
          />
        </svg>
      )}
    </button>
  );
}
