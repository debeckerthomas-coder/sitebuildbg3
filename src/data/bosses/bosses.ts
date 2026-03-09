import type { Boss } from "@/types";

export const BOSSES: Record<string, Boss> = {
  netherbrain: {
    id: "netherbrain",
    name: "The Netherbrain",
    icon: "/icons/bosses/netherbrain.webp",
    act: 3,
    location: "Morphic Pool — Final Battle",
    hitPoints: 450,
    armourClass: 18,
    initiativeBonus: 2,
    abilities: {
      strength: 26,
      dexterity: 14,
      constitution: 24,
      intelligence: 28,
      wisdom: 20,
      charisma: 18,
    },
    phases: [
      {
        name: "Phase 1 — Crown Assault",
        description:
          "The Netherbrain launches psychic assaults. Destroy the Netherese constructs to progress.",
        actions: [
          {
            name: "Psychic Blast",
            description:
              "All creatures within 30ft must succeed a DC 18 INT save or take 4d10 psychic damage and be Stunned for 1 turn.",
            damage: "4d10 psychic",
            isLegendary: false,
          },
          {
            name: "Tentacle Slam",
            description:
              "Melee attack. +14 to hit, 3d8+8 bludgeoning damage. On hit, target is knocked Prone.",
            damage: "3d8+8 bludgeoning",
            isLegendary: false,
          },
          {
            name: "Dominate (Legendary)",
            description:
              "Target must succeed a DC 20 WIS save or be Dominated until end of their next turn. Dominated allies attack your party.",
            isLegendary: true,
          },
        ],
        immunities: ["poison", "psychic"],
        resistances: ["bludgeoning", "piercing", "slashing"],
      },
      {
        name: "Phase 2 — Desperate Thrashing",
        hpThreshold: 50,
        description:
          "The Netherbrain becomes desperate. Gains Multiattack (3) and Retributive Psychic damage.",
        actions: [
          {
            name: "Retributive Immunity",
            description:
              "When hit by a melee attack, the attacker takes 2d8 psychic damage. NO SAVE.",
            damage: "2d8 psychic",
            isLegendary: false,
          },
          {
            name: "Mind Flayer Reinforcements",
            description:
              "Summons 2 Mind Flayer Fanatics with 40 HP each at the start of each round.",
            isLegendary: true,
          },
        ],
        immunities: ["poison", "psychic"],
      },
    ],
    mechanics: [
      {
        id: "retributive_immunity",
        name: "Retributive Immunity",
        severity: "lethal",
        description:
          "In Phase 2, every melee hit you land triggers 2d8 psychic damage BACK to the attacker. This is NOT a reaction — it triggers on EVERY hit.",
        counterplay:
          "Use ranged attacks, spells, or Throw builds. If you must melee, ensure Temp HP / Death Ward are active. Blade Ward halves the retributive damage.",
      },
      {
        id: "dominate_save",
        name: "Dominate — WIS Save DC 20",
        severity: "lethal",
        description:
          "A dominated ally with Great Weapon Master can one-shot your squishiest character.",
        counterplay:
          "Cast Freedom of Movement pre-fight. Keep WIS save boosters: Aura of Protection (Paladin 6), Ring of Protection, Cloak of Protection.",
      },
    ],
    loot: [],
    tags: ["final-boss", "elder-brain", "illithid"],
  },

  ansur: {
    id: "ansur",
    name: "Ansur, the Undead Dragon",
    icon: "/icons/bosses/ansur.webp",
    act: 3,
    location: "Wyrmway — beneath Wyrm's Rock",
    hitPoints: 400,
    armourClass: 17,
    initiativeBonus: 1,
    abilities: {
      strength: 24,
      dexterity: 12,
      constitution: 22,
      intelligence: 16,
      wisdom: 14,
      charisma: 18,
    },
    phases: [
      {
        name: "Full Fight",
        description:
          "Ansur is an undead bronze dragon. His most dangerous ability is Stormheart Nova — a massive lightning AoE.",
        actions: [
          {
            name: "Stormheart Nova",
            description:
              "Ansur charges for 1 turn, then unleashes a massive AoE dealing 10d8 lightning damage (DEX save DC 18 for half). Destroys all nearby cover.",
            damage: "10d8 lightning",
            recharge: "Charges for 1 turn",
            isLegendary: false,
          },
          {
            name: "Multiattack",
            description:
              "3 attacks: Bite (2d10+7), Claw (2d6+7), Claw (2d6+7).",
            damage: "2d10+7 / 2d6+7 / 2d6+7",
            isLegendary: false,
          },
          {
            name: "Hoarding Breath",
            description:
              "Cone AoE. 8d8 lightning damage (DEX save DC 18). On fail, also Stunned for 1 turn.",
            damage: "8d8 lightning",
            recharge: "5-6",
            isLegendary: false,
          },
        ],
        immunities: ["lightning", "poison", "necrotic"],
        vulnerabilities: ["radiant"],
      },
    ],
    mechanics: [
      {
        id: "stormheart_nova",
        name: "Stormheart Nova — Total Party Kill Threat",
        severity: "lethal",
        description:
          "When Ansur flies up and begins channeling, he will unleash Stormheart Nova next turn. 10d8 lightning (avg 45 damage) in a massive AoE. Can kill entire party.",
        counterplay:
          "Use the Water Myrmidon's ice ability or Globe of Invulnerability. Alternatively: Counterspell does NOT work — it's an ability, not a spell. Best bet: everyone Dash behind the farthest pillar or use Lightning Resistance gear/spells.",
      },
    ],
    loot: ["baldurans_giantslayer", "helmet_of_balduran"],
    tags: ["dragon", "undead", "wyrmway"],
  },
};

export function getBoss(id: string): Boss | undefined {
  return BOSSES[id];
}
