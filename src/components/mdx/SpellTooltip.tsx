"use client";

import type { ReactNode } from "react";
import { CodexTooltip } from "@/components/codex/CodexTooltip";
import { getSpell } from "@/data/spells/spells";

interface SpellTooltipProps {
  readonly id: string;
  readonly children?: ReactNode;
}

export function SpellTooltip({ id, children }: SpellTooltipProps) {
  const spell = getSpell(id);

  if (!spell) {
    return <span className="text-gray-500 border-b border-dotted">{children}</span>;
  }

  const stats = [
    { label: "Level", value: spell.level === 0 ? "Cantrip" : `${spell.level}` },
    { label: "School", value: spell.school },
    { label: "Casting", value: spell.castingTime.replace("_", " ") },
    ...(spell.damage
      ? [{ label: "Damage", value: `${spell.damage.count}d${spell.damage.die} ${spell.damageType ?? ""}` }]
      : []),
    ...(spell.concentration ? [{ label: "Concentration", value: "Yes" }] : []),
  ];

  return (
    <CodexTooltip
      name={spell.name}
      icon={spell.icon}
      rarity="rare"
      description={spell.description}
      stats={stats}
      tags={spell.tags}
    >
      {children}
    </CodexTooltip>
  );
}
