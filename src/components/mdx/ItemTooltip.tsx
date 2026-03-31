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
  readonly lang?: string;
}

export function ItemTooltip({ id, children, lang = "fr" }: ItemTooltipProps) {
  const item = getItem(id);
  const l = lang === "en" ? "en" : "fr";

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
    { label: l === "fr" ? "Localisation" : "Location", value: item.location[l] },
    { label: l === "fr" ? "Acte" : "Act", value: `${l === "fr" ? "Acte" : "Act"} ${item.act}` },
  ];

  return (
    <CodexTooltip
      name={item.name[l]}
      icon={item.icon}
      rarity={item.rarity}
      description={item.description[l]}
      flavourText={item.flavourText?.[l]}
      stats={stats}
      tags={item.tags}
    >
      {children}
    </CodexTooltip>
  );
}
