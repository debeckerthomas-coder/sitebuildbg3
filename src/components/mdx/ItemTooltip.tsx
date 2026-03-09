"use client";

// ============================================================================
// ItemTooltip — MDX component wrapping CodexTooltip for items
// Usage in MDX: <ItemTooltip id="baldurans_giantslayer">Giantslayer</ItemTooltip>
// ============================================================================

import type { ReactNode } from "react";
import { CodexTooltip } from "@/components/codex/CodexTooltip";
import { getItem } from "@/data/items/items";

interface ItemTooltipProps {
  readonly id: string;
  readonly children?: ReactNode;
}

export function ItemTooltip({ id, children }: ItemTooltipProps) {
  const item = getItem(id);

  if (!item) {
    return <span className="text-gray-500 border-b border-dotted">{children}</span>;
  }

  const stats = [
    ...(item.weaponDamage
      ? [{ label: "Damage", value: `${item.weaponDamage.count}d${item.weaponDamage.die}${item.weaponEnchantment ? ` +${item.weaponEnchantment}` : ""}` }]
      : []),
    ...(item.armourClass
      ? [{ label: "AC Bonus", value: `+${item.armourClass}` }]
      : []),
    { label: "Location", value: item.location },
    { label: "Act", value: `Act ${item.act}` },
  ];

  return (
    <CodexTooltip
      name={item.name}
      icon={item.icon}
      rarity={item.rarity}
      description={item.description}
      flavourText={item.flavourText}
      stats={stats}
      tags={item.tags}
    >
      {children}
    </CodexTooltip>
  );
}
