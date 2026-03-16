// ============================================================================
// Données de préparation — Buffs essentiels après un Repos Long
// ============================================================================

export interface PreparationBuff {
  readonly id: string;
  readonly label: string;
  readonly source: string;
  readonly description: string;
}

export const LONG_REST_BUFFS: readonly PreparationBuff[] = [
  {
    id: "longstrider",
    label: "Longstrider",
    source: "Bard / Warlock / Wizard",
    description: "Augmente la vitesse de déplacement de 3m jusqu'au prochain Repos Long.",
  },
  {
    id: "aid",
    label: "Aid",
    source: "Cleric / Paladin",
    description: "Augmente les PV max de 3 alliés de 5 par niveau d'emplacement.",
  },
  {
    id: "heroes_feast",
    label: "Heroes' Feast",
    source: "Cleric (lv11+)",
    description: "Immunité peur/poison, +12 PV max pour tout le groupe.",
  },
  {
    id: "warding_bond",
    label: "Warding Bond",
    source: "Cleric",
    description: "+1 CA et jets de sauvegarde à un allié. Le lanceur partage les dégâts.",
  },
  {
    id: "death_ward",
    label: "Death Ward",
    source: "Cleric / Paladin",
    description: "Empêche la cible de tomber à 0 PV une fois. Vital en Mode Honneur.",
  },
  {
    id: "freedom_of_movement",
    label: "Freedom of Movement",
    source: "Cleric / Druid / Ranger",
    description: "Immunité aux conditions qui réduisent le mouvement.",
  },
  {
    id: "mage_armour",
    label: "Mage Armour",
    source: "Wizard / Sorcerer / Warlock",
    description: "CA de base 13 + mod DEX pour les personnages sans armure.",
  },
  {
    id: "shield_of_faith",
    label: "Shield of Faith",
    source: "Cleric / Paladin",
    description: "+2 CA (concentration). Idéal pour le tank du groupe.",
  },
] as const;
