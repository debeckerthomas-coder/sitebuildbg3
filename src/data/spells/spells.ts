import type { Spell } from "@/types";

export const SPELLS: Record<string, Spell> = {
  divine_smite: {
    id: "divine_smite",
    name: "Châtiment Divin",
    icon: "/icons/spells/divine_smite.webp",
    school: "evocation",
    level: 1,
    castingTime: "bonus_action",
    range: "self",
    description:
      "Dépensez un emplacement de sort pour infliger 2d8 dégâts radiants (+1d8 par niveau d'emplacement au-dessus du 1er). +1d8 supplémentaire contre les Morts-vivants/Fiélons. Tous les dés doublés sur un coup critique.",
    damage: { count: 2, die: 8 },
    damageType: "radiant",
    concentration: false,
    resource: { type: "spell_slot", level: 1 },
    tags: ["paladin", "melee", "radiant", "smite"],
  },

  eldritch_blast: {
    id: "eldritch_blast",
    name: "Décharge Occulte",
    icon: "/icons/spells/eldritch_blast.webp",
    school: "evocation",
    level: 0,
    castingTime: "action",
    range: 120,
    description:
      "Projette un rayon d'énergie crépitante. Aux niveaux supérieurs, projette des rayons supplémentaires (2 au niveau 5, 3 au niveau 10).",
    damage: { count: 1, die: 10 },
    damageType: "force",
    concentration: false,
    resource: { type: "free" },
    tags: ["warlock", "cantrip", "force", "ranged"],
  },

  haste: {
    id: "haste",
    name: "Hâte",
    icon: "/icons/spells/haste.webp",
    school: "transmutation",
    level: 3,
    castingTime: "action",
    range: 30,
    description:
      "La cible gagne +2 CA, Avantage aux JdS DEX, et une Action supplémentaire à chaque tour. Quand le sort prend fin, la cible est Léthargique et ne peut ni bouger ni agir pendant 1 tour.",
    concentration: true,
    resource: { type: "spell_slot", level: 3 },
    tags: ["buff", "concentration", "action-economy"],
  },

  counterspell: {
    id: "counterspell",
    name: "Contresort",
    icon: "/icons/spells/counterspell.webp",
    school: "abjuration",
    level: 3,
    castingTime: "reaction",
    range: 60,
    description:
      "Interrompez une créature en train de lancer un sort. Si le sort est de niveau 3 ou inférieur, il échoue automatiquement. Les sorts de niveau supérieur nécessitent un jet de Caractéristique.",
    concentration: false,
    resource: { type: "spell_slot", level: 3 },
    tags: ["reaction", "counter", "abjuration"],
  },
};

export function getSpell(id: string): Spell | undefined {
  return SPELLS[id];
}
