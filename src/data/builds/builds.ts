import type { Build } from "@/types";

export const BUILDS: Record<string, Build> = {
  honour_paladin: {
    id: "honour_paladin",
    name: "Honour Paladin — Nuclear Smiter",
    subtitle: "Vengeance 7 / Swords Bard 5 — The One-Turn Kill Machine",
    description:
      "The gold standard of Honor Mode. Stack every damage rider in the game onto a single critical Divine Smite. Tavern Brawler Throw variant available for ranged safety.",
    thumbnail: "/thumbnails/honour_paladin.webp",
    tier: "S",
    role: "striker",
    race: "Half-Orc",
    background: "Soldier",
    abilityScores: {
      base: {
        strength: 17,
        dexterity: 10,
        constitution: 14,
        intelligence: 8,
        wisdom: 10,
        charisma: 14,
      },
      racial: { strength: 2, constitution: 1 },
      final: {
        strength: 20,
        dexterity: 10,
        constitution: 16,
        intelligence: 8,
        wisdom: 10,
        charisma: 14,
      },
    },
    levelProgression: [
      { level: 1, class: "paladin", notes: "Start Paladin for heavy armour + WIS/CHA saves" },
      { level: 2, class: "paladin", notes: "Divine Smite online" },
      { level: 3, class: "paladin", subclass: "vengeance", notes: "Vow of Enmity = guaranteed Advantage" },
      { level: 4, class: "paladin", feat: "Great Weapon Master", notes: "GWM for bonus action attack on crit/kill" },
      { level: 5, class: "paladin", notes: "Extra Attack" },
      { level: 6, class: "paladin", notes: "Aura of Protection — +CHA to all saves in 10ft" },
      { level: 7, class: "paladin", notes: "Relentless Avenger — chase down fleeing enemies" },
      { level: 8, class: "bard", notes: "Multiclass into Bard for spell slots" },
      { level: 9, class: "bard", notes: "Jack of All Trades" },
      { level: 10, class: "bard", subclass: "swords", notes: "Swords Bard — Fighting Style + Blade Flourish" },
      { level: 11, class: "bard", abilityScoreImprovement: { strength: 1, constitution: 1 }, notes: "STR to 20 via ASI" },
      { level: 12, class: "bard", notes: "Level 3 spell slots for max Smites" },
    ],
    equipment: [
      {
        slot: "main_hand",
        failsafeChain: {
          slot: "main_hand",
          primary: {
            itemId: "baldurans_giantslayer",
            condition: {
              type: "flag",
              flagId: "ansur_defeated",
              value: true,
            },
          },
          fallbacks: [
            {
              itemId: "flail_of_ages",
              condition: {
                type: "flag",
                flagId: "dammon_alive",
                value: true,
              },
              reason:
                "Balduran's Giantslayer unavailable — Ansur not yet defeated",
            },
            {
              itemId: "fallback_greatsword",
              reason:
                "Dammon is dead — Flail of Ages unavailable. Using Sword of Chaos.",
            },
          ],
        },
      },
      {
        slot: "helmet",
        failsafeChain: {
          slot: "helmet",
          primary: {
            itemId: "helmet_of_balduran",
            condition: {
              type: "flag",
              flagId: "ansur_defeated",
              value: true,
            },
          },
          fallbacks: [
            {
              itemId: "everburn_blade", // placeholder — would be a helmet
              reason: "Ansur not yet defeated. Use any +AC helmet.",
            },
          ],
        },
      },
    ],
    comboCycle: [
      "Vow of Enmity (Bonus Action)",
      "Attack 1 — Smite on crit (Action)",
      "Attack 2 — Smite (Extra Attack)",
      "Blade Flourish (if Bard levels)",
    ],
    fightingStyle: "great_weapon_fighting",
    tags: ["paladin", "bard", "multiclass", "melee", "burst", "honor-mode"],
  },
};

export function getBuild(id: string): Build | undefined {
  return BUILDS[id];
}
