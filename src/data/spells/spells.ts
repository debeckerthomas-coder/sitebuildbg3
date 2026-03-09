import type { Spell } from "@/types";

export const SPELLS: Record<string, Spell> = {
  divine_smite: {
    id: "divine_smite",
    name: "Divine Smite",
    icon: "/icons/spells/divine_smite.webp",
    school: "evocation",
    level: 1,
    castingTime: "bonus_action",
    range: "self",
    description:
      "Expend a spell slot to deal 2d8 radiant damage (+ 1d8 per slot level above 1st). Extra 1d8 vs Undead/Fiend. All dice doubled on critical hit.",
    damage: { count: 2, die: 8 },
    damageType: "radiant",
    concentration: false,
    resource: { type: "spell_slot", level: 1 },
    tags: ["paladin", "melee", "radiant", "smite"],
  },

  eldritch_blast: {
    id: "eldritch_blast",
    name: "Eldritch Blast",
    icon: "/icons/spells/eldritch_blast.webp",
    school: "evocation",
    level: 0,
    castingTime: "action",
    range: 120,
    description:
      "Fire a beam of crackling energy. At higher levels, fire additional beams (2 at level 5, 3 at level 10).",
    damage: { count: 1, die: 10 },
    damageType: "force",
    concentration: false,
    resource: { type: "free" },
    tags: ["warlock", "cantrip", "force", "ranged"],
  },

  haste: {
    id: "haste",
    name: "Haste",
    icon: "/icons/spells/haste.webp",
    school: "transmutation",
    level: 3,
    castingTime: "action",
    range: 30,
    description:
      "Target gains +2 AC, Advantage on DEX saves, and an additional Action each turn. When the spell ends, the target is Lethargic and cannot move or act for 1 turn.",
    concentration: true,
    resource: { type: "spell_slot", level: 3 },
    tags: ["buff", "concentration", "action-economy"],
  },

  counterspell: {
    id: "counterspell",
    name: "Counterspell",
    icon: "/icons/spells/counterspell.webp",
    school: "abjuration",
    level: 3,
    castingTime: "reaction",
    range: 60,
    description:
      "Interrupt a creature casting a spell. If the spell is 3rd level or lower, it fails automatically. Higher-level spells require an Ability Check.",
    concentration: false,
    resource: { type: "spell_slot", level: 3 },
    tags: ["reaction", "counter", "abjuration"],
  },
};

export function getSpell(id: string): Spell | undefined {
  return SPELLS[id];
}
