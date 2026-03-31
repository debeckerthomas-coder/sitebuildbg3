import type { Item } from "@/types";

export const ITEMS: Record<string, Item> = {
  // ---- ACTE 1 ----
  everburn_blade: {
    id: "everburn_blade",
    name: { fr: "Épée de Flammes Éternelles", en: "Everburn Blade" },
    icon: "/icons/items/everburn_blade.webp",
    rarity: "uncommon",
    slot: "main_hand",
    description: {
      fr: "Cette lame est enveloppée de flammes magiques — elle inflige 1d4 dégâts de feu supplémentaires à chaque coup.",
      en: "This blade is wreathed in magical flames — it deals an additional 1d4 fire damage on each hit.",
    },
    flavourText: {
      fr: "Récupérée sur le Commandant Zhalk dans le Nautiloïde.",
      en: "Recovered from Commander Zhalk on the Nautiloid.",
    },
    act: 1,
    location: {
      fr: "Nautiloïde — butin du Commandant Zhalk",
      en: "Nautiloid — loot from Commander Zhalk",
    },
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

  // ---- ACTE 2 ----
  flail_of_ages: {
    id: "flail_of_ages",
    name: { fr: "Fléau des Âges", en: "Flail of Ages" },
    icon: "/icons/items/flail_of_ages.webp",
    rarity: "very_rare",
    slot: "main_hand",
    description: {
      fr: "Un fléau légendaire forgé par Dammon à partir de fer infernal. Inflige des dégâts de feu bonus et ralentit les ennemis.",
      en: "A legendary flail forged by Dammon from Infernal Iron. Deals bonus fire damage and slows enemies.",
    },
    act: 2,
    location: {
      fr: "Dammon à l'Auberge de la Dernière Lumière — nécessite du Fer Infernal",
      en: "Dammon at the Last Light Inn — requires Infernal Iron",
    },
    requirements: "Dammon doit être en vie",
    passives: [
      {
        id: "flail_slow",
        name: "Ralentissement Brûlant",
        description: "Sur un coup, les cibles doivent réussir un JdS CON ou être Ralenties.",
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

  // ---- ACTE 3 ----
  baldurans_giantslayer: {
    id: "baldurans_giantslayer",
    name: { fr: "Pourfendeuse de Géant de Baldur", en: "Balduran's Giantslayer" },
    icon: "/icons/items/giantslayer.webp",
    rarity: "legendary",
    slot: "main_hand",
    description: {
      fr: "Cette épée à deux mains légendaire double le modificateur de Force sur les jets de dégâts et confère l'Avantage aux jets d'attaque contre les créatures Grande, Énorme ou Gargantuesque.",
      en: "This legendary greatsword doubles the Strength modifier on damage rolls and grants Advantage on attack rolls against Large, Huge, or Gargantuan creatures.",
    },
    act: 3,
    location: {
      fr: "Voie du Wyrm — vaincre Ansur",
      en: "Wyrm's Crossing — defeat Ansur",
    },
    passives: [
      {
        id: "giant_form",
        name: "Forme de Géant",
        description:
          "Grandissez à une taille énorme. Gagnez 27 Points de Vie temporaires et infligez 1d6 dégâts supplémentaires.",
      },
      {
        id: "topple_the_big_folk",
        name: "Terrasser les Grands",
        description:
          "Avantage aux jets d'attaque contre les créatures Grande, Énorme ou Gargantuesque.",
      },
    ],
    damageRiders: [],
    weaponDamage: { count: 2, die: 6 },
    weaponEnchantment: 3,
    tags: ["greatsword", "two-handed", "legendary", "strength"],
  },

  helmet_of_balduran: {
    id: "helmet_of_balduran",
    name: { fr: "Heaume de Balduran", en: "Helmet of Balduran" },
    icon: "/icons/items/helmet_balduran.webp",
    rarity: "legendary",
    slot: "helmet",
    description: {
      fr: "Soigne 2 PV au début de chaque tour. Confère +1 à la CA et aux Jets de Sauvegarde. Empêche les Coups Critiques contre le porteur.",
      en: "Heals 2 HP at the start of each turn. Grants +1 to AC and Saving Throws. Prevents Critical Hits against the wearer.",
    },
    act: 3,
    location: {
      fr: "Voie du Wyrm — vaincre Ansur",
      en: "Wyrm's Crossing — defeat Ansur",
    },
    passives: [
      {
        id: "balduran_heal",
        name: "Vitalité de Balduran",
        description: "Au début de chaque tour, le porteur récupère 2 PV.",
      },
    ],
    damageRiders: [],
    armourClass: 1,
    tags: ["helmet", "legendary", "healing", "anti-crit"],
  },

  fallback_greatsword: {
    id: "fallback_greatsword",
    name: { fr: "Épée du Chaos", en: "Sword of Chaos" },
    icon: "/icons/items/sword_chaos.webp",
    rarity: "rare",
    slot: "main_hand",
    description: {
      fr: "Une épée à deux mains chaotique qui soigne le porteur de 1d6 PV à chaque coup.",
      en: "A chaotic greatsword that heals the wielder for 1d6 HP on each hit.",
    },
    act: 2,
    location: {
      fr: "Butin de Sarevok au Temple de Bhaal (alternative Acte 3)",
      en: "Loot from Sarevok at the Temple of Bhaal (Act 3 alternative)",
    },
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
