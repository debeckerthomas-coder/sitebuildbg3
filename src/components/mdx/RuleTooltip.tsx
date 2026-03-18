"use client";

// ============================================================================
// RuleTooltip — Inline glossary tooltip for D&D 5e / BG3 mechanics
// Usage in MDX: <Rule term="avantage">Avantage</Rule>
// ============================================================================

import { useState, type ReactNode } from "react";
import { rulesDictionary } from "@/data/rules";

export function RuleTooltip({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const entry = rulesDictionary[term];

  if (!entry) {
    return <span>{children}</span>;
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span
        className="underline decoration-amber-400 decoration-dashed
                   underline-offset-4 cursor-help"
        tabIndex={0}
        role="term"
      >
        {children}
      </span>

      {visible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
                     w-64 px-4 py-3 rounded-lg
                     bg-black/80 backdrop-blur-md
                     border border-amber-400/20
                     shadow-lg shadow-black/40
                     pointer-events-none"
        >
          <span className="block text-sm font-heading font-bold text-amber-400 mb-1">
            {entry.title}
          </span>
          <span className="block text-xs text-gray-300 leading-relaxed font-body">
            {entry.desc}
          </span>
        </span>
      )}
    </span>
  );
}
