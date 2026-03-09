// ============================================================================
// PLAYTHROUGH — Guide Pas-à-Pas Mode Honneur
// Actes 1, 2, 3 avec sections détaillées en français
// ============================================================================

export interface PlaythroughStep {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly type: "objectif" | "combat" | "butin" | "companion" | "secret" | "marchand" | "avertissement";
  readonly codexRefs?: readonly string[]; // IDs from database.ts
  readonly critique?: boolean; // Si manqué = impact irréversible
}

export interface PlaythroughSection {
  readonly id: string;
  readonly titre: string;
  readonly description: string;
  readonly etapes: readonly PlaythroughStep[];
}

export interface PlaythroughActe {
  readonly acte: 1 | 2 | 3;
  readonly titre: string;
  readonly sousTitre: string;
  readonly description: string;
  readonly sections: readonly PlaythroughSection[];
}

// ---------------------------------------------------------------------------
// ACTE 1 — SURVIE
// ---------------------------------------------------------------------------

const ACTE_1: PlaythroughActe = {
  acte: 1,
  titre: "Acte 1 — Survie",
  sousTitre: "Du Nautiloïde au Bosquet des Druides",
  description:
    "L'Acte 1 est le plus dangereux en Mode Honneur : vos personnages sont fragiles, les ressources limitées, et chaque combat peut tourner au désastre. L'objectif est d'atteindre le Niveau 4 avec un minimum de risques.",

  sections: [
    {
      id: "route_pacifique_niveau_4",
      titre: "Route Pacifique vers le Niveau 4",
      description:
        "Maximisez votre XP sans combats dangereux. Cette route évite les rencontres mortelles jusqu'à ce que vous ayez votre don de niveau 4.",
      etapes: [
        {
          id: "s1_nautiloide",
          label: "Nautiloïde : Piller le Commandant Zhalk",
          description:
            "Utilisez Shadowheart pour lancer Injonction sur le diable combattant Zhalk, puis achevez Zhalk avec votre personnage. Pillez la Lame Toujours Ardente avant le crash.",
          type: "butin",
          codexRefs: ["everburn_blade"],
          critique: true,
        },
        {
          id: "s1_plage",
          label: "Plage : Recruter Shadowheart et Astarion",
          description:
            "Recrutez Shadowheart (pod dans le Nautiloïde ou sur la plage) et Astarion (embuscade sur le chemin). Astarion peut être autorisé à boire votre sang une fois sans danger.",
          type: "companion",
        },
        {
          id: "s1_exploration_cote",
          label: "Longer la côte : XP passif",
          description:
            "Explorez la côte en évitant les combats. Chaque coffre, chaque interaction rapporte de l'XP. Trouvez le parchemin de Rayon Ardent dans la grotte des pêcheurs.",
          type: "objectif",
        },
        {
          id: "s1_bosquet",
          label: "Arriver au Bosquet des Druides",
          description:
            "Parlez à Zevlor et acceptez de l'aider. NE PAS entrer dans le Bosquet par la porte secrète — utilisez l'entrée principale pour les dialogues d'XP.",
          type: "objectif",
          critique: true,
        },
        {
          id: "s1_karlach",
          label: "Recruter Karlach",
          description:
            "Dirigez-vous vers le Chemin Élevé. Trouvez Karlach près de la rivière. NE PAS l'attaquer — elle est essentielle pour la forge de Dammon. Parlez-lui d'abord.",
          type: "companion",
          codexRefs: ["flail_of_ages"],
          critique: true,
        },
        {
          id: "s1_wyll",
          label: "Recruter Wyll au Bosquet",
          description:
            "Wyll entraîne les enfants tieffelins. Parlez-lui pour le recruter. Il apporte des sorts d'Occultiste utiles pour le début de partie.",
          type: "companion",
        },
        {
          id: "s1_sauver_dammon",
          label: "Sauver Dammon pendant l'attaque gobeline",
          description:
            "Si les gobelins attaquent le Bosquet, Dammon peut mourir. Protégez-le en priorité — il est INDISPENSABLE pour le Fléau des Âges à l'Acte 2. Sans Dammon, votre chaîne de failsafe s'effondre.",
          type: "avertissement",
          codexRefs: ["flail_of_ages"],
          critique: true,
        },
        {
          id: "s1_marchands",
          label: "Acheter les consommables essentiels",
          description:
            "Chez Arron (Bosquet) : Parchemins de Hâte, Potions de vitesse, Flèches +1. Chez Dammon : réparer l'équipement de Karlach. Chez Boney : Bénédiction de Boney (huile sacrée).",
          type: "marchand",
          codexRefs: ["haste"],
        },
        {
          id: "s1_ourse_hibou",
          label: "Combat optionnel : l'Ourse-Hibou",
          description:
            "Le combat contre l'Ourse-Hibou au nid nécessite de gérer l'invocation du compagnon. Si vous avez le niveau 4 avec GWM, c'est faisable. Sinon, PASSEZ — vous pouvez y revenir plus tard.",
          type: "combat",
          codexRefs: ["great_weapon_master"],
        },
        {
          id: "s1_goblin_camp",
          label: "Le Camp Gobelin : Approche diplomatique",
          description:
            "Utilisez votre Charisme pour passer les portes sans combat. Parlez à Ragzlin, trouvez le Hobgobelin pour l'Acte 2. Vous pouvez éliminer les 3 chefs gobelins un par un en les isolant.",
          type: "objectif",
        },
        {
          id: "s1_forge_adamantine",
          label: "Forge Adamantine (optionnel mais recommandé)",
          description:
            "Grymforge est accessible via les Terres Obscures. Forgez un Clibanion en Adamantine (CA 18, anti-critique, -1 dégâts). Le boss Grym est vulnérable à la lave — utilisez le mécanisme.",
          type: "combat",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// ACTE 2 — LES OMBRES
// ---------------------------------------------------------------------------

const ACTE_2: PlaythroughActe = {
  acte: 2,
  titre: "Acte 2 — Les Terres Maudites",
  sousTitre: "Les Ombres de l'Auberge de la Dernière Lumière",
  description:
    "L'Acte 2 est centré sur les Terres Maudites par l'Ombre. La lumière est votre ressource la plus précieuse. Protéger l'Auberge de la Dernière Lumière est critique — si Isobel tombe, l'auberge est détruite et de nombreux PNJ meurent.",

  sections: [
    {
      id: "derniere_lumiere",
      titre: "Auberge de la Dernière Lumière",
      description:
        "Hub central de l'Acte 2. Protéger Isobel est la priorité absolue.",
      etapes: [
        {
          id: "s2_isobel",
          label: "Défendre Isobel pendant l'attaque",
          description:
            "Marcus et les Shadows attaquent l'auberge. Si Isobel tombe, la protection lumineuse s'effondre, TOUS les PNJ de l'auberge meurent, y compris Dammon. Protégez Isobel à tout prix : Sanctuaire, Bouclier de la Foi.",
          type: "combat",
          codexRefs: ["sanctuary", "shield_of_faith"],
          critique: true,
        },
        {
          id: "s2_dammon_forge",
          label: "Donner le Fer Infernal à Dammon",
          description:
            "Dammon est à l'auberge SI il a survécu à l'Acte 1. Donnez-lui le Fer Infernal pour les améliorations de Karlach. C'est aussi le chemin vers le Fléau des Âges.",
          type: "objectif",
          codexRefs: ["flail_of_ages"],
          critique: true,
        },
        {
          id: "s2_equipement",
          label: "Équipement de mi-jeu",
          description:
            "Achetez les améliorations à l'auberge. Le Bouclier +2 chez Dammon, les potions de résistance chez Mattis. Préparez la résistance à la Foudre pour Ansur (Acte 3).",
          type: "marchand",
        },
      ],
    },
    {
      id: "temple_de_shar",
      titre: "Le Temple de Shar et la Nightsong",
      description:
        "Le donjon majeur de l'Acte 2. La décision sur la Nightsong est irréversible.",
      etapes: [
        {
          id: "s2_gauntlet",
          label: "Épreuves du Gant de Shar",
          description:
            "Trois épreuves : Foi, Perspicacité, et Fortitude. Shadowheart peut utiliser les autels de Shar pour des bonus. Gardez vos emplacements de sort pour les pièges.",
          type: "objectif",
        },
        {
          id: "s2_nightsong",
          label: "Libérer la Nightsong (Dame Aylin)",
          description:
            "CHOIX CRITIQUE : Libérer Dame Aylin active la quête de la Nightsong et donne une alliée puissante pour le combat final. La tuer rompt le pacte de Shadowheart mais détruit un allié clé.",
          type: "objectif",
          critique: true,
        },
        {
          id: "s2_ketheric",
          label: "Combat Boss : Ketheric Thorm",
          description:
            "Ketheric est invulnérable tant que la Nightsong est emprisonnée. Après sa libération, il perd son immortalité. Phase 2 dans le Sanctuaire de la Lune — préparez la résistance aux dégâts nécrotiques.",
          type: "combat",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// ACTE 3 — ENDGAME
// ---------------------------------------------------------------------------

const ACTE_3: PlaythroughActe = {
  acte: 3,
  titre: "Acte 3 — La Porte de Baldur",
  sousTitre: "Endgame et la Confrontation Finale",
  description:
    "L'Acte 3 est le plus riche en contenu et en équipement légendaire. La priorité : vaincre Ansur (Pourfendeuse + Heaume), puis Raphaël (Armure Infernale), puis le Cerveau Ancien.",

  sections: [
    {
      id: "preparation_endgame",
      titre: "Préparation Endgame",
      description:
        "Récupérez l'équipement légendaire avant le combat final.",
      etapes: [
        {
          id: "s3_ansur",
          label: "Voie du Wyrm — Vaincre Ansur",
          description:
            "Ansur est un dragon mort-vivant avec Nova Cœurtempête (10d8 foudre AoE). Quand il s'envole et charge, TOUT LE GROUPE doit se mettre à couvert derrière les piliers ou utiliser Globe d'Invulnérabilité. Contresort NE FONCTIONNE PAS — c'est une capacité, pas un sort.",
          type: "combat",
          codexRefs: ["baldurans_giantslayer", "helmet_of_balduran", "counterspell"],
          critique: true,
        },
        {
          id: "s3_raphael",
          label: "Maison de l'Espoir — Vaincre Raphaël",
          description:
            "Entrez via le portail de Helsik. Raphaël a des Actions Légendaires et peut lancer Contresort. Stratégie : concentrez-le avec le Châtiment Divin avant qu'il ne se transforme. L'Armure Infernale est la récompense.",
          type: "combat",
          codexRefs: ["helldusk_armour", "divine_smite"],
          critique: true,
        },
        {
          id: "s3_markoheshkir",
          label: "Tour de Ramazith — Markoheshkir",
          description:
            "Montez la tour de Ramazith au sommet de la Sorcellerie. Le bâton légendaire est sur un piédestal protégé. Résolvez le puzzle pour l'obtenir sans combat.",
          type: "butin",
          codexRefs: ["markoheshkir"],
        },
        {
          id: "s3_nyrulna",
          label: "Cirque d'Akabi — Nyrulna",
          description:
            "Le djinn Akabi truque sa roue. Utilisez des sorts de vol ou de perception pour repérer la triche. Volez la roue et gagnez Nyrulna — le meilleur trident de lancer du jeu.",
          type: "secret",
          codexRefs: ["nyrulna"],
        },
      ],
    },
    {
      id: "bataille_finale",
      titre: "La Bataille Finale — Le Cerveau Ancien",
      description:
        "Le combat final contre le Cerveau Ancien (Netherbrain). Deux phases, des mécaniques létales.",
      etapes: [
        {
          id: "s3_preparation_finale",
          label: "Préparation avant le Cerveau Ancien",
          description:
            "Équipez toute l'équipe en légendaire. Buff pré-combat : Hâte, Protection contre la Mort, Liberté de Mouvement. Positionnez l'Aura de Protection du Paladin au centre du groupe.",
          type: "objectif",
          codexRefs: ["haste"],
        },
        {
          id: "s3_netherbrain_p1",
          label: "Phase 1 — Assaut de la Couronne",
          description:
            "Le Cerveau Ancien lance Explosion Psychique (4d10, JdS INT DC 18) et peut Dominer vos alliés (JdS SAG DC 20). Un allié dominé avec GWM peut one-shot votre soigneur. Gardez Liberté de Mouvement active.",
          type: "combat",
          codexRefs: ["great_weapon_master"],
          critique: true,
        },
        {
          id: "s3_netherbrain_p2",
          label: "Phase 2 — Immunité Rétributive (LÉTAL)",
          description:
            "En dessous de 50% PV, CHAQUE attaque de mêlée vous renvoie 2d8 dégâts psychiques. C'est la cause n°1 de mort en Mode Honneur. PASSEZ EN DISTANCE : sorts, Décharge Occulte, lancer d'arme. Si vous devez frapper en mêlée, assurez Protection contre la Mort + PV temporaires.",
          type: "avertissement",
          codexRefs: ["eldritch_blast"],
          critique: true,
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Export — Tous les actes
// ---------------------------------------------------------------------------

export const PLAYTHROUGH: readonly PlaythroughActe[] = [ACTE_1, ACTE_2, ACTE_3];

export function getActe(acte: 1 | 2 | 3): PlaythroughActe {
  return PLAYTHROUGH.find((a) => a.acte === acte)!;
}
