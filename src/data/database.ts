// ============================================================================
// DATABASE UNIFIÉE — Codex BG3 en français
// Objets, sorts, et boss accessibles via getEntry(id)
// ============================================================================

import type { Rarity } from "@/types";

// ---------------------------------------------------------------------------
// Types du Codex
// ---------------------------------------------------------------------------

export interface CodexEntry {
  readonly id: string;
  readonly name: string;
  readonly type: "objet" | "sort" | "boss" | "capacité";
  readonly rarity: Rarity;
  readonly description: string;
  readonly stats: readonly { readonly label: string; readonly value: string }[];
  readonly iconUrl: string;
  readonly tags: readonly string[];
}

// ---------------------------------------------------------------------------
// Dictionnaire principal — 15+ entrées réelles BG3
// ---------------------------------------------------------------------------

export const CODEX: Record<string, CodexEntry> = {
  // ===== OBJETS =====
  markoheshkir: {
    id: "markoheshkir",
    name: "Markoheshkir",
    type: "objet",
    rarity: "legendary",
    description:
      "Un bâton légendaire qui permet de choisir un type de dégâts élémentaires. Accorde le sort Projection de Globe d'Invulnérabilité une fois par long repos.",
    stats: [
      { label: "Dégâts", value: "1d8+3 contondants" },
      { label: "Enchantement", value: "+3" },
      { label: "Emplacement", value: "Deux mains" },
      { label: "Capacité", value: "Élément de Karsus (1×/long repos)" },
      { label: "Localisation", value: "Tour de Ramazith — Acte 3" },
    ],
    iconUrl: "/assets/icons/markoheshkir.webp",
    tags: ["bâton", "légendaire", "acte-3", "magicien"],
  },

  nyrulna: {
    id: "nyrulna",
    name: "Nyrulna",
    type: "objet",
    rarity: "legendary",
    description:
      "Trident légendaire qui revient automatiquement après un lancer. Inflige des dégâts de tonnerre supplémentaires et crée une explosion de 6m de rayon à l'impact.",
    stats: [
      { label: "Dégâts", value: "1d8+3 perforants" },
      { label: "Bonus", value: "+1d6 tonnerre" },
      { label: "Enchantement", value: "+3" },
      { label: "Spécial", value: "Retour automatique, Explosion AoE" },
      { label: "Localisation", value: "Cirque Ambulant d'Akabi — Acte 3" },
    ],
    iconUrl: "/assets/icons/nyrulna.webp",
    tags: ["trident", "légendaire", "acte-3", "lancer"],
  },

  baldurans_giantslayer: {
    id: "baldurans_giantslayer",
    name: "Pourfendeuse de Géant de Baldur",
    type: "objet",
    rarity: "legendary",
    description:
      "Cette épée à deux mains légendaire double le modificateur de Force sur les jets de dégâts. Confère l'Avantage aux jets d'attaque contre les créatures Grande, Énorme ou Gargantuesque.",
    stats: [
      { label: "Dégâts", value: "2d6+3 tranchants" },
      { label: "Enchantement", value: "+3" },
      { label: "Passif", value: "Double le mod. de Force" },
      { label: "Capacité", value: "Forme de Géant (27 PV temp.)" },
      { label: "Localisation", value: "Voie du Wyrm — vaincre Ansur" },
    ],
    iconUrl: "/assets/icons/giantslayer.webp",
    tags: ["épée-à-deux-mains", "légendaire", "acte-3", "force"],
  },

  helmet_of_balduran: {
    id: "helmet_of_balduran",
    name: "Heaume de Baldur",
    type: "objet",
    rarity: "legendary",
    description:
      "Régénère 2 PV au début de chaque tour. Confère +1 à la CA et aux jets de sauvegarde. Empêche les coups critiques contre le porteur.",
    stats: [
      { label: "CA", value: "+1" },
      { label: "Sauvegardes", value: "+1" },
      { label: "Régénération", value: "2 PV/tour" },
      { label: "Passif", value: "Anti-critique" },
      { label: "Localisation", value: "Voie du Wyrm — vaincre Ansur" },
    ],
    iconUrl: "/assets/icons/helmet_balduran.webp",
    tags: ["casque", "légendaire", "acte-3", "défensif"],
  },

  everburn_blade: {
    id: "everburn_blade",
    name: "Lame Toujours Ardente",
    type: "objet",
    rarity: "uncommon",
    description:
      "Cette lame est enveloppée de flammes magiques. Elle inflige 1d4 dégâts de feu supplémentaires à chaque coup.",
    stats: [
      { label: "Dégâts", value: "2d6 tranchants + 1d4 feu" },
      { label: "Emplacement", value: "Deux mains" },
      { label: "Localisation", value: "Nautiloïde — piller le Cdt. Zhalk" },
    ],
    iconUrl: "/assets/icons/everburn_blade.webp",
    tags: ["épée-à-deux-mains", "inhabituel", "acte-1", "feu"],
  },

  flail_of_ages: {
    id: "flail_of_ages",
    name: "Fléau des Âges",
    type: "objet",
    rarity: "very_rare",
    description:
      "Fléau légendaire forgé par Dammon à partir de fer infernal. Inflige des dégâts de feu supplémentaires et ralentit les ennemis.",
    stats: [
      { label: "Dégâts", value: "1d8+2 contondants + 1d6 feu" },
      { label: "Enchantement", value: "+2" },
      { label: "Passif", value: "Lenteur Brûlante (JdS CON)" },
      { label: "Localisation", value: "Dammon — Auberge de la Dernière Lumière" },
    ],
    iconUrl: "/assets/icons/flail_of_ages.webp",
    tags: ["fléau", "très-rare", "acte-2", "feu", "dammon"],
  },

  helldusk_armour: {
    id: "helldusk_armour",
    name: "Armure Infernale",
    type: "objet",
    rarity: "legendary",
    description:
      "Armure lourde légendaire. Réduit tous les dégâts de 2, inflige des dégâts de feu aux attaquants en mêlée. Le porteur ne peut pas être Brûlé. Réussite automatique aux JdS contre les sorts de niveau 3 ou moins.",
    stats: [
      { label: "CA", value: "21" },
      { label: "Réduction", value: "-2 à tous les dégâts" },
      { label: "Résistance", value: "Feu" },
      { label: "Passif", value: "Contre-attaque de feu en mêlée" },
      { label: "Localisation", value: "Maison de l'Espoir — vaincre Raphaël" },
    ],
    iconUrl: "/assets/icons/helldusk_armour.webp",
    tags: ["armure-lourde", "légendaire", "acte-3", "feu"],
  },

  // ===== SORTS =====
  divine_smite: {
    id: "divine_smite",
    name: "Châtiment Divin",
    type: "sort",
    rarity: "rare",
    description:
      "Dépensez un emplacement de sort pour infliger 2d8 dégâts radiants (+1d8 par niveau au-dessus du 1er). +1d8 supplémentaire contre les Morts-vivants/Fiélons. Tous les dés sont doublés sur un coup critique.",
    stats: [
      { label: "Dégâts", value: "2d8 radiants (base)" },
      { label: "Scaling", value: "+1d8/niveau" },
      { label: "Bonus", value: "+1d8 vs Mort-vivant/Fiélon" },
      { label: "Critique", value: "Tous les dés doublés" },
      { label: "Ressource", value: "Emplacement de sort" },
    ],
    iconUrl: "/assets/icons/divine_smite.webp",
    tags: ["paladin", "mêlée", "radiant", "châtiment"],
  },

  haste: {
    id: "haste",
    name: "Hâte",
    type: "sort",
    rarity: "rare",
    description:
      "La cible gagne +2 CA, l'Avantage aux JdS de Dextérité, et une Action supplémentaire par tour. Quand le sort prend fin, la cible est Léthargique pendant 1 tour.",
    stats: [
      { label: "Niveau", value: "3" },
      { label: "Concentration", value: "Oui" },
      { label: "Portée", value: "9m" },
      { label: "Bonus CA", value: "+2" },
      { label: "Action", value: "Action supplémentaire" },
    ],
    iconUrl: "/assets/icons/haste.webp",
    tags: ["transmutation", "buff", "concentration", "action-economy"],
  },

  eldritch_blast: {
    id: "eldritch_blast",
    name: "Décharge Occulte",
    type: "sort",
    rarity: "common",
    description:
      "Projette un rayon d'énergie crépitante. Aux niveaux supérieurs, projette des rayons supplémentaires (2 au niv. 5, 3 au niv. 10).",
    stats: [
      { label: "Dégâts", value: "1d10 force" },
      { label: "Portée", value: "36m" },
      { label: "Type", value: "Tour de magie" },
      { label: "Scaling", value: "Rayons multiples" },
    ],
    iconUrl: "/assets/icons/eldritch_blast.webp",
    tags: ["occultiste", "tour-de-magie", "force", "distance"],
  },

  counterspell: {
    id: "counterspell",
    name: "Contresort",
    type: "sort",
    rarity: "rare",
    description:
      "Interrompt une créature en train de lancer un sort. Si le sort est de niveau 3 ou inférieur, il échoue automatiquement. Les sorts de niveau supérieur nécessitent un jet de caractéristique.",
    stats: [
      { label: "Niveau", value: "3" },
      { label: "Temps", value: "Réaction" },
      { label: "Portée", value: "18m" },
      { label: "Auto-réussite", value: "Sort ≤ niv. 3" },
    ],
    iconUrl: "/assets/icons/counterspell.webp",
    tags: ["abjuration", "réaction", "contre"],
  },

  vow_of_enmity: {
    id: "vow_of_enmity",
    name: "Vœu d'Inimitié",
    type: "capacité",
    rarity: "rare",
    description:
      "Action Bonus. Gagnez l'Avantage à tous les jets d'attaque contre une cible pendant 1 minute. La capacité signature du Serment de Vengeance.",
    stats: [
      { label: "Action", value: "Action Bonus" },
      { label: "Durée", value: "1 minute" },
      { label: "Effet", value: "Avantage aux attaques" },
      { label: "Sous-classe", value: "Serment de Vengeance" },
    ],
    iconUrl: "/assets/icons/vow_of_enmity.webp",
    tags: ["paladin", "vengeance", "avantage", "cible-unique"],
  },

  great_weapon_master: {
    id: "great_weapon_master",
    name: "Maître des Armes à Deux Mains",
    type: "capacité",
    rarity: "uncommon",
    description:
      "Quand vous infligez un coup critique ou tuez une créature, vous pouvez effectuer une attaque supplémentaire en Action Bonus. Vous pouvez aussi choisir de subir -5 au jet d'attaque pour infliger +10 dégâts.",
    stats: [
      { label: "Bonus dégâts", value: "+10 (optionnel)" },
      { label: "Malus attaque", value: "-5 (optionnel)" },
      { label: "Spécial", value: "Attaque bonus sur crit/kill" },
    ],
    iconUrl: "/assets/icons/gwm.webp",
    tags: ["don", "mêlée", "dégâts", "arme-lourde"],
  },

  sanctuary: {
    id: "sanctuary",
    name: "Sanctuaire",
    type: "sort",
    rarity: "common",
    description:
      "Protège une créature. Les ennemis qui ciblent la créature protégée doivent réussir un JdS de Sagesse ou choisir une autre cible. Le sort se termine si la créature protégée attaque ou lance un sort offensif.",
    stats: [
      { label: "Niveau", value: "1" },
      { label: "Action", value: "Action Bonus" },
      { label: "Durée", value: "10 tours" },
      { label: "JdS", value: "Sagesse" },
    ],
    iconUrl: "/assets/icons/sanctuary.webp",
    tags: ["abjuration", "protection", "clerc"],
  },

  shield_of_faith: {
    id: "shield_of_faith",
    name: "Bouclier de la Foi",
    type: "sort",
    rarity: "common",
    description:
      "Un champ scintillant entoure une créature, lui conférant +2 à la CA pendant toute la durée. Nécessite la concentration.",
    stats: [
      { label: "Niveau", value: "1" },
      { label: "Bonus CA", value: "+2" },
      { label: "Concentration", value: "Oui" },
      { label: "Durée", value: "10 tours" },
    ],
    iconUrl: "/assets/icons/shield_of_faith.webp",
    tags: ["abjuration", "buff", "CA", "paladin", "clerc"],
  },
};

// ---------------------------------------------------------------------------
// API d'accès
// ---------------------------------------------------------------------------

export function getEntry(id: string): CodexEntry | undefined {
  return CODEX[id];
}

export function getEntriesByType(type: CodexEntry["type"]): CodexEntry[] {
  return Object.values(CODEX).filter((e) => e.type === type);
}

export function getEntriesByRarity(rarity: Rarity): CodexEntry[] {
  return Object.values(CODEX).filter((e) => e.rarity === rarity);
}

export function getAllEntries(): CodexEntry[] {
  return Object.values(CODEX);
}
