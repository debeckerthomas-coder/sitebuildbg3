import type { Item } from "@/types";

export const ITEMS: Record<string, Item> = {
  // ---- ACTE 1 ----
  everburn_blade: {
    id: "everburn_blade",
    name: "Épée de Flammes Éternelles",
    icon: "/icons/items/everburn_blade.webp",
    rarity: "uncommon",
    slot: "main_hand",
    description:
      "Cette lame est enveloppée de flammes magiques — elle inflige 1d4 dégâts de feu supplémentaires à chaque coup.",
    flavourText: "Récupérée sur le Commandant Zhalk dans le Nautiloïde.",
    act: 1,
    location: "Nautiloïde — butin du Commandant Zhalk",
    passives: [],
    damageRiders: [
      {
        id: "everburn_fire",
        source: "Épée de Flammes Éternelles",
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
    name: "Fléau des Âges",
    icon: "/icons/items/flail_of_ages.webp",
    rarity: "very_rare",
    slot: "main_hand",
    description:
      "Un fléau légendaire forgé par Dammon à partir de fer infernal. Inflige des dégâts de feu bonus et ralentit les ennemis.",
    act: 2,
    location: "Dammon à l'Auberge de la Dernière Lumière — nécessite du Fer Infernal",
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
        source: "Fléau des Âges",
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
    name: "Pourfendeuse de Géant de Baldur",
    icon: "/icons/items/giantslayer.webp",
    rarity: "legendary",
    slot: "main_hand",
    description:
      "Cette épée à deux mains légendaire double le modificateur de Force sur les jets de dégâts et confère l'Avantage aux jets d'attaque contre les créatures Grande, Énorme ou Gargantuesque.",
    act: 3,
    location: "Voie du Wyrm — vaincre Ansur",
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
    name: "Heaume de Balduran",
    icon: "/icons/items/helmet_balduran.webp",
    rarity: "legendary",
    slot: "helmet",
    description:
      "Soigne 2 PV au début de chaque tour. Confère +1 à la CA et aux Jets de Sauvegarde. Empêche les Coups Critiques contre le porteur.",
    act: 3,
    location: "Voie du Wyrm — vaincre Ansur",
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
    name: "Épée du Chaos",
    icon: "/icons/items/sword_chaos.webp",
    rarity: "rare",
    slot: "main_hand",
    description:
      "Une épée à deux mains chaotique qui soigne le porteur de 1d6 PV à chaque coup.",
    act: 2,
    location: "Butin de Sarevok au Temple de Bhaal (alternative Acte 3)",
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
