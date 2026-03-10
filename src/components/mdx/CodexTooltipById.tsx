"use client";

// ============================================================================
// CodexTooltipById — MDX wrapper for CodexTooltip, resolves entry by ID
// Usage: <CodexTooltipById id="elixir_colline" text="Élixir de Force" />
// ============================================================================

import type { ReactNode } from "react";
import { CodexTooltip } from "@/components/codex/CodexTooltip";
import { getEntry } from "@/data/database";

interface CodexTooltipByIdProps {
  readonly id: string;
  readonly text?: string;
  readonly children?: ReactNode;
}

export function CodexTooltipById({ id, text, children }: CodexTooltipByIdProps) {
  const entry = getEntry(id);

  const label = children ?? text ?? id;

  if (!entry) {
    return <span className="text-gold-muted border-b border-dotted cursor-help">{label}</span>;
  }

  return (
    <CodexTooltip
      name={entry.name}
      icon={entry.iconUrl}
      rarity={entry.rarity}
      description={entry.description}
      stats={entry.stats}
      tags={entry.tags}
    >
      {label}
    </CodexTooltip>
  );
}
