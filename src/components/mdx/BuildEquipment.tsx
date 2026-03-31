"use client";

// ============================================================================
// BuildEquipment — Galerie d'objets clés d'un build (pour MDX)
// ============================================================================

import { getBuildWithItems } from "@/data/registry";
import { ItemDetailCard } from "@/components/arsenal/ItemDetailCard";
import type { ItemSlot } from "@/types";

const SLOT_LABELS: Record<ItemSlot, { fr: string; en: string }> = {
  helmet: { fr: "Casque", en: "Helmet" },
  cloak: { fr: "Cape", en: "Cloak" },
  armour: { fr: "Armure", en: "Armour" },
  gloves: { fr: "Gants", en: "Gloves" },
  boots: { fr: "Bottes", en: "Boots" },
  amulet: { fr: "Amulette", en: "Amulet" },
  ring_1: { fr: "Anneau", en: "Ring" },
  ring_2: { fr: "Anneau", en: "Ring" },
  main_hand: { fr: "Arme", en: "Weapon" },
  off_hand: { fr: "Main gauche", en: "Off Hand" },
  ranged: { fr: "Arme à distance", en: "Ranged" },
};

function getSlotLabel(slot: ItemSlot | undefined, lang: string): string {
  if (!slot) return lang === "fr" ? "Équipement" : "Equipment";
  const labels = SLOT_LABELS[slot];
  return lang === "fr" ? labels.fr : labels.en;
}

interface BuildEquipmentProps {
  readonly buildId: string;
  readonly lang?: string;
}

export function BuildEquipment({ buildId, lang = "fr" }: BuildEquipmentProps) {
  const build = getBuildWithItems(buildId);
  if (!build) return null;

  const l = lang === "en" ? "en" : "fr";

  return (
    <div className="my-6">
      <h3 className="text-lg font-bold text-gray-100 mb-4">
        {l === "fr" ? "⚔️ Équipement Clé" : "⚔️ Core Gear"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-8">
        {build.coreItemsFull.map((item) => (
          <ItemDetailCard
            key={item.id}
            name={item.name[l]}
            rarity={item.rarity}
            type={getSlotLabel(item.slot, l)}
            description={item.description[l]}
            icon={item.icon}
            acquisition={item.acquisition[l]}
            itemId={item.id}
            lang={l}
          />
        ))}
      </div>

      {build.alternativeItemsFull.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-gray-100 mb-4">
            {l === "fr" ? "🔄 Alternatives" : "🔄 Alternatives"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-8">
            {build.alternativeItemsFull.map((item) => (
              <ItemDetailCard
                key={item.id}
                name={item.name[l]}
                rarity={item.rarity}
                type={getSlotLabel(item.slot, l)}
                description={item.description[l]}
                icon={item.icon}
                acquisition={item.acquisition[l]}
                itemId={item.id}
                lang={l}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
