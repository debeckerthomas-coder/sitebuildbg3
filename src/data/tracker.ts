// ============================================================================
// Données du Traqueur d'Inventaire — Objets Vitaux par Acte
// ============================================================================

export interface TrackerItem {
  readonly id: string;
  readonly label: string;
  readonly location: string;
  readonly description: string;
  readonly missable: boolean;
}

export interface TrackerAct {
  readonly id: string;
  readonly checklistId: string;
  readonly title: string;
  readonly icon: string;
  readonly alertTitle: string;
  readonly alertDescription: string;
  readonly items: readonly TrackerItem[];
}

// ---------------------------------------------------------------------------
// Acte 1
// ---------------------------------------------------------------------------

const ACT1_ITEMS: readonly TrackerItem[] = [
  {
    id: "act1_anneau_lancer",
    label: "Anneau de Lancer",
    location: "Bosquet des Druides",
    description:
      "Ajoute le mod. de Force aux dégâts de lancer. Indispensable pour le Throwzerker dès le niveau 1.",
    missable: true,
  },
  {
    id: "act1_lance_retour",
    label: "Lance de Retour",
    location: "Camp Gobelin (marchand Grat)",
    description:
      "Arme de lancer qui revient en main. Permet les builds de lancer avant Nyrulna.",
    missable: true,
  },
  {
    id: "act1_arc_titan",
    label: "Arc à Cordes de Titan",
    location: "Repaire des Zhentarim (coffre verrouillé)",
    description:
      "Ajoute le mod. de Force aux dégâts d'arc. Essentiel pour les Rangers/Assassins hybrides STR.",
    missable: true,
  },
  {
    id: "act1_armure_lumineuse",
    label: "Armure Lumineuse",
    location: "Avant-Poste Sélunité (coffre)",
    description:
      "Permet au Clerc Lumière de commencer le stack d'Orbes d'Irradiation dès l'Acte 1.",
    missable: false,
  },
  {
    id: "act1_anneau_caustique",
    label: "Anneau Caustique",
    location: "Colonie Myconide (Outremonde)",
    description:
      "Dégâts d'acide supplémentaires. Utile pour tout build martial en Acte 1.",
    missable: true,
  },
  {
    id: "act1_casque_acuite",
    label: "Casque d'Acuité Arcanique",
    location: "Grymforge (coffre piégé)",
    description:
      "Chaque sort inflige Acuité Arcanique (-1 JdS, cumulable). Le cœur de tout build caster de contrôle.",
    missable: true,
  },
  {
    id: "act1_bouclier_adamantine",
    label: "Bouclier en Adamantine",
    location: "Forge d'Adamantine (Grymforge)",
    description:
      "Réduit les critiques subis à 0. Meilleur bouclier de l'Acte 1 pour le tank.",
    missable: true,
  },
  {
    id: "act1_gants_habilite",
    label: "Gants d'Habilité (FOR 18)",
    location: "Sous-sol du Bosquet (vol à l'étalage)",
    description:
      "Fixe la Force à 18. Permet au Moine d'ignorer la stat FOR et de monter SAG/DEX. Se vole discrètement.",
    missable: true,
  },
];

// ---------------------------------------------------------------------------
// Acte 2
// ---------------------------------------------------------------------------

const ACT2_ITEMS: readonly TrackerItem[] = [
  {
    id: "act2_anneau_risque",
    label: "Anneau Risqué",
    location: "Araj l'Oblodra (Hautelune)",
    description:
      "Avantage à TOUTES les attaques, mais Désavantage aux JdS. Dévastateur sur le Lockadin et l'Assassin.",
    missable: true,
  },
  {
    id: "act2_robe_puissante",
    label: "Robe Puissante (Potent Robe)",
    location: "Alfira (Auberge de la Dernière Lumière, récompense quête)",
    description:
      "CA = 10 + mod. DEX + mod. CHA. Ajoute le CHA aux dégâts des sorts mineurs. BiS du Sorlock.",
    missable: true,
  },
  {
    id: "act2_casque_acuite_alt",
    label: "Chapeau d'Acuité Arcanique",
    location: "Guilde des Maçons (Hautelune, au sol)",
    description:
      "Même effet que le Casque Acte 1 mais slot Chapeau. Permet de cumuler avec d'autres casques si besoin.",
    missable: false,
  },
  {
    id: "act2_ecailles_yuanti",
    label: "Armure en Écailles de Yuan-Ti",
    location: "Talli (marchande, Auberge de la Dernière Lumière)",
    description:
      "Armure moyenne CA 15 + Initiative +1. Excellente pour tout build DEX en transition vers l'Acte 3.",
    missable: true,
  },
  {
    id: "act2_sang_lathandre",
    label: "Le Sang de Lathandre",
    location: "Monastère de Rosymorn (puzzle vitraux)",
    description:
      "Masse +3 Radiant, soigne quand les PV du porteur tombent à 0. Meilleure arme du Clerc Lumière.",
    missable: true,
  },
  {
    id: "act2_fleaux_ages",
    label: "Fléau des Âges",
    location: "Dammon (forgeron, Auberge de la Dernière Lumière)",
    description:
      "Inflige une vulnérabilité à tous les types de dégâts. Essentiel pour les combos Paladin/Sorcadin.",
    missable: true,
  },
  {
    id: "act2_cape_ombre",
    label: "Cape de Protection +2",
    location: "Marchands Ombre (Hautelune)",
    description:
      "+2 aux JdS et CA. Un must-have universel pour tout le groupe.",
    missable: false,
  },
];

// ---------------------------------------------------------------------------
// Acte 3
// ---------------------------------------------------------------------------

const ACT3_ITEMS: readonly TrackerItem[] = [
  {
    id: "act3_nyrulna",
    label: "Trident Nyrulna",
    location: "Cirque d'Akabi (épreuve du Djinn)",
    description:
      "Trident légendaire de retour +3, 3d4 Tonnerre. L'arme ultime du Throwzerker et des builds de lancer.",
    missable: true,
  },
  {
    id: "act3_anneau_gredin",
    label: "Anneau du Gredin Mystique",
    location: "Jungle d'Akabi (récompense Cirque)",
    description:
      "Après une Attaque Sournoise, lance un sort de charme/contrôle en action bonus. Core du Barde et de l'Assassin.",
    missable: true,
  },
  {
    id: "act3_gants_capture_ame",
    label: "Gants de Capture d'Âme",
    location: "Maison de l'Espoir (Raphaël)",
    description:
      "Absorbe l'âme des ennemis tués pour +1d10 Force. Synergie avec les builds STR-based.",
    missable: true,
  },
  {
    id: "act3_armure_bhaal",
    label: "Armure de Bhaal",
    location: "Tribunal du Meurtre (Sous-Cité)",
    description:
      "Armure lourde CA 19. Les ennemis proches sont vulnérables au Perçant. Puissante sur les Paladins.",
    missable: true,
  },
  {
    id: "act3_markoheshkir",
    label: "Markoheshkir",
    location: "Tour de Ramazith (Sorcellerie)",
    description:
      "Bâton légendaire, 6 modes élémentaires. THE arme de tout caster (Barde, Sorlock, Nuke Tempête).",
    missable: true,
  },
  {
    id: "act3_armure_infernale",
    label: "Armure Infernale (Helldusk)",
    location: "Maison de l'Espoir (forge après Raphaël)",
    description:
      "CA 21, résistance Feu, vol. La meilleure armure du jeu pour le tank Paladin/Lockadin.",
    missable: true,
  },
  {
    id: "act3_gants_habilite_23",
    label: "Gants d'Habilité (FOR 23)",
    location: "Maison de l'Espoir (coffre Raphaël)",
    description:
      "Fixe la Force à 23. Le Moine Bagarreur atteint des sommets de dégâts — priorité absolue.",
    missable: true,
  },
  {
    id: "act3_heaume_balduran",
    label: "Heaume de Balduran",
    location: "Vaincre Ansur (Wyrmway, sous Baldur's Gate)",
    description:
      "Régénération PV, immunité critique, +1 CA. Le meilleur casque du jeu pour tout build.",
    missable: true,
  },
];

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const TRACKER_ACTS: readonly TrackerAct[] = [
  {
    id: "act1",
    checklistId: "tracker_act1",
    title: "Acte 1 — La Surface",
    icon: "🏕️",
    alertTitle: "Point de Non-Retour — Acte 1",
    alertDescription:
      "Ne passez PAS le Col du Mont / l'Ascenseur de Malforge avant d'avoir vérifié cette liste. Tout objet manqué ici sera perdu définitivement.",
    items: ACT1_ITEMS,
  },
  {
    id: "act2",
    checklistId: "tracker_act2",
    title: "Acte 2 — Les Terres Maudites",
    icon: "🌑",
    alertTitle: "Point de Non-Retour — Acte 2",
    alertDescription:
      "N'entrez PAS dans le royaume des ombres pour trouver Chantenuit/Nightsong avant d'avoir vérifié cette liste. L'Auberge de la Dernière Lumière peut devenir inaccessible.",
    items: ACT2_ITEMS,
  },
  {
    id: "act3",
    checklistId: "tracker_act3",
    title: "Acte 3 — Baldur's Gate",
    icon: "🏰",
    alertTitle: "Point de Non-Retour — Acte 3",
    alertDescription:
      "Ne montez PAS sur le bateau vers le Bassin Morphique avant d'avoir vérifié cette liste. C'est le combat final — aucun retour possible.",
    items: ACT3_ITEMS,
  },
];
