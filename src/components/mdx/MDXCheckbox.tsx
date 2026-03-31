"use client";

// ============================================================================
// MDXCheckbox — Replaces native markdown checkbox inputs (- [ ] / - [x])
// with the shared <Checkbox> from ui-system for visual consistency.
// ============================================================================

import { useState } from "react";
import { Checkbox } from "@/components/ui-system";

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
 */
export function MDXCheckbox({ type, checked: checkedProp, defaultChecked, disabled, ...rest }: MDXCheckboxProps) {
  const resolveChecked = (val: unknown): boolean => {
    if (typeof val === "boolean") return val;
    if (typeof val === "string") return val === "true" || val === "";
    return false;
  };

  const initialChecked = resolveChecked(checkedProp) || resolveChecked(defaultChecked);
  const [isChecked, setIsChecked] = useState(initialChecked);

  // Only intercept checkboxes — render other inputs normally
  if (type !== "checkbox") {
    return <input type={type} defaultChecked={resolveChecked(checkedProp)} {...rest} />;
  }

  return (
    <span className="inline-flex align-middle mr-2">
      <Checkbox
        checked={isChecked}
        onCheckedChange={(val) => setIsChecked(val)}
      />
    </span>
  );
}
