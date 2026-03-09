import type { Item } from "@/types";

export const ITEMS: Record<string, Item> = {
  // ---- ACT 1 ----
  everburn_blade: {
    id: "everburn_blade",
    name: "Everburn Blade",
    icon: "/icons/items/everburn_blade.webp",
    rarity: "uncommon",
    slot: "main_hand",
    description:
      "This blade is wreathed in magical flame — it deals an additional 1d4 fire damage on each hit.",
    flavourText: "Taken from Commander Zhalk on the Nautiloid.",
    act: 1,
    location: "Nautiloid — loot Commander Zhalk",
    passives: [],
    damageRiders: [
      {
        id: "everburn_fire",
        source: "Everburn Blade",
        damage: { count: 1, die: 4 },
        type: "fire",
      },
    ],
    weaponDamage: { count: 2, die: 6 },
    weaponEnchantment: 0,
    tags: ["greatsword", "two-handed", "fire"],
  },

  // ---- ACT 2 ----
  flail_of_ages: {
    id: "flail_of_ages",
    name: "Flail of Ages",
    icon: "/icons/items/flail_of_ages.webp",
    rarity: "very_rare",
    slot: "main_hand",
    description:
      "A legendary flail forged by Dammon from infernal iron. Deals bonus fire damage and slows enemies.",
    act: 2,
    location: "Dammon at Last Light Inn — requires Infernal Iron",
    requirements: "Dammon must be alive",
    passives: [
      {
        id: "flail_slow",
        name: "Scorching Slow",
        description: "On hit, targets must succeed a CON save or be Slowed.",
      },
    ],
    damageRiders: [
      {
        id: "flail_fire",
        source: "Flail of Ages",
        damage: { count: 1, die: 6 },
        type: "fire",
      },
    ],
    weaponDamage: { count: 1, die: 8 },
    weaponEnchantment: 2,
    tags: ["flail", "one-handed", "fire", "dammon"],
  },

  // ---- ACT 3 ----
  baldurans_giantslayer: {
    id: "baldurans_giantslayer",
    name: "Balduran's Giantslayer",
    icon: "/icons/items/giantslayer.webp",
    rarity: "legendary",
    slot: "main_hand",
    description:
      "This legendary greatsword doubles your Strength modifier on damage rolls and grants Advantage on Attack Rolls against Large, Huge, or Gargantuan creatures.",
    act: 3,
    location: "Wyrmway — defeat Ansur",
    passives: [
      {
        id: "giant_form",
        name: "Giant Form",
        description:
          "Grow to enormous size. Gain 27 Temporary Hit Points and deal an additional 1d6 damage.",
      },
      {
        id: "topple_the_big_folk",
        name: "Topple the Big Folk",
        description:
          "Advantage on Attack Rolls against Large, Huge, or Gargantuan creatures.",
      },
    ],
    damageRiders: [],
    weaponDamage: { count: 2, die: 6 },
    weaponEnchantment: 3,
    tags: ["greatsword", "two-handed", "legendary", "strength"],
  },

  helmet_of_balduran: {
    id: "helmet_of_balduran",
    name: "Helmet of Balduran",
    icon: "/icons/items/helmet_balduran.webp",
    rarity: "legendary",
    slot: "helmet",
    description:
      "Heals 2 HP at the start of every turn. Grants +1 to AC and Saving Throws. Prevents Critical Hits against the wearer.",
    act: 3,
    location: "Wyrmway — defeat Ansur",
    passives: [
      {
        id: "balduran_heal",
        name: "Balduran's Vitality",
        description: "At the start of each turn, the wearer regains 2 HP.",
      },
    ],
    damageRiders: [],
    armourClass: 1,
    tags: ["helmet", "legendary", "healing", "anti-crit"],
  },

  fallback_greatsword: {
    id: "fallback_greatsword",
    name: "Sword of Chaos",
    icon: "/icons/items/sword_chaos.webp",
    rarity: "rare",
    slot: "main_hand",
    description:
      "A chaotic greatsword that heals the wielder for 1d6 HP on each hit.",
    act: 2,
    location: "Loot from Sarevok in Bhaal Temple (Act 3 alternate)",
    passives: [],
    damageRiders: [],
    weaponDamage: { count: 2, die: 6 },
    weaponEnchantment: 2,
    tags: ["greatsword", "two-handed", "healing"],
  },
};

export function getItem(id: string): Item | undefined {
  return ITEMS[id];
}
