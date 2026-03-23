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
    label: "Grande Foulée",
    source: "Barde / Occultiste / Magicien",
    description: "Augmente la vitesse de déplacement de 3m jusqu'au prochain Repos Long.",
  },
  {
    id: "aid",
    label: "Aide",
    source: "Clerc / Paladin",
    description: "Augmente les PV max de 3 alliés de 5 par niveau d'emplacement.",
  },
  {
    id: "heroes_feast",
    label: "Festin des Héros",
    source: "Clerc (niv. 11+)",
    description: "Immunité peur/poison, +12 PV max pour tout le groupe.",
  },
  {
    id: "warding_bond",
    label: "Lien de Protection",
    source: "Clerc",
    description: "+1 CA et jets de sauvegarde à un allié. Le lanceur partage les dégâts.",
  },
  {
    id: "death_ward",
    label: "Protection contre la Mort",
    source: "Clerc / Paladin",
    description: "Empêche la cible de tomber à 0 PV une fois. Vital en Mode Honneur.",
  },
  {
    id: "freedom_of_movement",
    label: "Liberté de Mouvement",
    source: "Clerc / Druide / Rôdeur",
    description: "Immunité aux conditions qui réduisent le mouvement.",
  },
  {
    id: "mage_armour",
    label: "Armure du Mage",
    source: "Magicien / Ensorceleur / Occultiste",
    description: "CA de base 13 + mod DEX pour les personnages sans armure.",
  },
  {
    id: "shield_of_faith",
    label: "Bouclier de la Foi",
    source: "Clerc / Paladin",
    description: "+2 CA (concentration). Idéal pour le tank du groupe.",
  },
] as const;
