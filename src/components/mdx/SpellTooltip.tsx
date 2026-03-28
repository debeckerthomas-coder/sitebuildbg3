"use client";

// ============================================================================
// SpellTooltip — MDX component wrapping CodexTooltip for spells
// Derives rarity from spell level (cantrip=common, 1-2=uncommon, 3-5=rare,
// 6-8=very_rare, 9=legendary) instead of hardcoding "rare".
// Usage: <SpellTooltip id="divine_smite">Divine Smite</SpellTooltip>
// ============================================================================

import type { ReactNode } from "react";
import { CodexTooltip } from "@/components/codex/CodexTooltip";
import { getSpell } from "@/data/spells/spells";
import type { Rarity } from "@/types";

// ---------------------------------------------------------------------------
// Spell level → Rarity mapping (mirrors D&D spell slot scarcity)
// ---------------------------------------------------------------------------

function spellLevelToRarity(level: number): Rarity {
  if (level === 0) return "common";
  if (level <= 2) return "uncommon";
  if (level <= 5) return "rare";
  if (level <= 8) return "very_rare";
  return "legendary";
}

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
      rarity={spellLevelToRarity(spell.level)}
      description={spell.description}
      stats={stats}
      tags={spell.tags}
    >
      {children}
    </CodexTooltip>
  );
}
