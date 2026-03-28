"use client";

// ============================================================================
// RuleTooltip — Inline glossary tooltip for D&D 5e / BG3 mechanics
// Now uses CodexTooltip (floating-ui) instead of custom absolute positioning.
// Usage in MDX: <Rule term="avantage">Avantage</Rule>
// ============================================================================

import type { ReactNode } from "react";
import { CodexTooltip } from "@/components/codex/CodexTooltip";
import { rulesDictionary } from "@/data/rules";

export function RuleTooltip({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  const entry = rulesDictionary[term];

  if (!entry) {
    return <span>{children}</span>;
  }

  return (
    <CodexTooltip
      name={entry.title}
      rarity="common"
      description={entry.desc}
    >
      {children}
    </CodexTooltip>
  );
}
