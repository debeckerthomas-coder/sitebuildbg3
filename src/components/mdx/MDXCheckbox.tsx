"use client";

// ============================================================================
// MDXCheckbox — Replaces native markdown checkbox inputs (- [ ] / - [x])
// with our styled interactive Radix UI Checkbox design system component.
// ============================================================================

import { useState } from "react";

interface MDXCheckboxProps {
  readonly type?: string;
  readonly checked?: boolean;
  readonly disabled?: boolean;
}

/**
 * MDX component override for `<input>`.
 * Only intercepts `type="checkbox"` — passes through other input types as-is.
 */
export function MDXCheckbox({ type, checked: initialChecked, disabled, ...rest }: MDXCheckboxProps) {
  const [checked, setChecked] = useState(!!initialChecked);

  // Only intercept checkboxes — render other inputs normally
  if (type !== "checkbox") {
    return <input type={type} checked={initialChecked} disabled={disabled} {...rest} />;
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => setChecked((v) => !v)}
      className={`
        inline-flex h-5 w-5 shrink-0 items-center justify-center align-middle
        rounded bg-[#171b29] border transition-colors duration-200 cursor-pointer mr-2
        ${checked
          ? "bg-[#9b7e1e] border-[#9b7e1e]"
          : "border-[#2a3048] hover:border-[#3a4068]"
        }
      `}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6L5 9L10 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#111520]"
          />
        </svg>
      )}
    </button>
  );
}
