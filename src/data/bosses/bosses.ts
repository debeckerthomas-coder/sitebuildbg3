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
        id: "immunite_retributive_honneur",
        name: "Immunité Rétributive — Mécanique Mode Honneur",
        severity: "lethal",
        description:
          "EXCLUSIF MODE HONNEUR : à la fin de chaque round, le Cerveau devient totalement immunisé à TOUS les types de dégâts qu'il a subis durant ce round, pour le round suivant. Mélanger tous les types au Tour 1 = 0 dégât au Tour 2.",
        counterplay:
          "Segmentez vos dégâts ! Tour 1 = Magique (Foudre, Froid, Force). Tour 2 = Martial (Radiant, Contondant, Tranchant). Alternez. Un seul personnage avec le mauvais type ruine le tour suivant.",
      },
      {
        id: "retributive_melee",
        name: "Dégâts Rétributifs Mêlée (Phase 2)",
        severity: "lethal",
        description:
          "En dessous de 50% PV, chaque attaque de mêlée renvoie 2d8 psychiques à l'attaquant. Ce n'est PAS une réaction — ça se déclenche sur CHAQUE hit.",
        counterplay:
          "Passez en attaques à distance : sorts, Décharge Occulte, lancers d'arme. Si vous devez frapper en mêlée, Protection contre la Mort + PV temporaires obligatoires.",
      },
      {
        id: "dominate_save",
        name: "Domination — JdS SAG DC 20",
        severity: "lethal",
        description:
          "Un allié dominé avec Maître des Armes à Deux Mains peut one-shot votre personnage le plus fragile en un coup.",
        counterplay:
          "Lancez Liberté de Mouvement avant le combat. Aura de Protection du Paladin 6 (+CHA aux JdS), Anneau de Protection, Cape de Protection pour maximiser les JdS de Sagesse.",
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

  balthazar: {
    id: "balthazar",
    name: "Balthazar, Nécromancien de Myrkul",
    icon: "/icons/bosses/balthazar.webp",
    act: 2,
    location: "Gantelet de Shar — Laboratoire",
    hitPoints: 180,
    armourClass: 16,
    initiativeBonus: 1,
    abilities: {
      strength: 10,
      dexterity: 12,
      constitution: 16,
      intelligence: 20,
      wisdom: 14,
      charisma: 12,
    },
    phases: [
      {
        name: "Phase Unique — Nécromancien",
        description:
          "Balthazar invoque des morts-vivants et lance des sorts nécrotiques puissants. Son Golem de Chair le protège tant qu'il est en vie.",
        actions: [
          {
            name: "Rayon Nécrotique",
            description:
              "Attaque à distance. +10 au toucher, 3d8 dégâts nécrotiques. Réduit les PV max de la cible du montant de dégâts infligés.",
            damage: "3d8 necrotic",
            isLegendary: false,
          },
          {
            name: "Invocation de Morts-vivants",
            description:
              "Invoque 2-3 squelettes ou zombies à chaque tour. Ils peuvent pousser les personnages dans le vide si le combat a lieu dans la prison de Chantsenuit.",
            isLegendary: false,
          },
          {
            name: "Flétrissure",
            description:
              "Sort de niveau 4. 8d8 dégâts nécrotiques (JdS CON pour moitié). Peut one-shot un personnage avec peu de PV.",
            damage: "8d8 necrotic",
            isLegendary: false,
          },
        ],
        immunities: ["poison", "necrotic"],
        resistances: [],
      },
    ],
    mechanics: [
      {
        id: "void_push",
        name: "Piège de la Prison de Chantsenuit",
        severity: "lethal",
        description:
          "Si vous combattez Balthazar dans la prison de Chantsenuit (Gisombre), ses sbires morts-vivants vous pousseront dans le vide. C'est un Game Over INSTANTANÉ en Mode Honneur — aucun jet de sauvegarde.",
        counterplay:
          "NE COMBATTEZ JAMAIS Balthazar dans la prison. Attaquez-le dans son laboratoire au sein du Gantelet de Shar. Fermez la porte derrière vous pour empêcher les renforts.",
      },
      {
        id: "spellcasting",
        name: "Lanceur de sorts — Flétrissure & Invocations",
        severity: "warning",
        description:
          "Balthazar lance Flétrissure (8d8 nécrotique) et invoque des morts-vivants en continu. Son Golem de Chair absorbe les dégâts et le protège.",
        counterplay:
          "Lancez Silence sur Balthazar au Tour 1 pour bloquer TOUS ses sorts. Éliminez le Golem de Chair en priorité avec des dégâts de feu (vulnérabilité). Sans sorts, Balthazar est inoffensif.",
      },
    ],
    loot: [],
    tags: ["nécromancien", "myrkul", "gantelet-de-shar"],
  },

  apotre_myrkul: {
    id: "apotre_myrkul",
    name: "L'Apôtre de Myrkul",
    icon: "/icons/bosses/myrkul.webp",
    act: 2,
    location: "Tour de Hautelune — Sommet",
    hitPoints: 280,
    armourClass: 18,
    initiativeBonus: 2,
    abilities: {
      strength: 22,
      dexterity: 14,
      constitution: 22,
      intelligence: 18,
      wisdom: 16,
      charisma: 20,
    },
    phases: [
      {
        name: "Phase 1 — Ketheric Thorm",
        description:
          "Ketheric Thorm sous forme humanoïde. Relativement standard mais accompagné d'un Flagelleur Mental qui peut étourdir toute l'équipe.",
        actions: [
          {
            name: "Attaques Multiples",
            description:
              "3 attaques de mêlée. +10 au toucher, 2d6+6 tranchants chacune.",
            damage: "2d6+6 slashing ×3",
            isLegendary: false,
          },
          {
            name: "Rafale Nécrotique",
            description:
              "AoE cône. 6d6 dégâts nécrotiques (JdS CON DC 16 pour moitié).",
            damage: "6d6 necrotic",
            isLegendary: false,
          },
        ],
        immunities: ["poison"],
        resistances: ["necrotic"],
      },
      {
        name: "Phase 2 — L'Apôtre de Myrkul (Transformation)",
        hpThreshold: 0,
        description:
          "Ketheric se transforme en Apôtre de Myrkul — un squelette géant avec des Actions Légendaires. L'Aura de Frisson Osseux empêche toute guérison sur la plateforme.",
        actions: [
          {
            name: "Regard des Morts (Action Légendaire)",
            description:
              "Riposte automatique quand il est attaqué. Rayon nécrotique qui inflige 3d8 nécrotique et applique l'état Effrayé pendant 2 tours. Pas de JdS.",
            damage: "3d8 necrotic",
            isLegendary: true,
          },
          {
            name: "Doigt de Mort",
            description:
              "Sort de niveau 7. 7d8+30 dégâts nécrotiques (JdS CON DC 18 pour moitié). Si la cible meurt, elle se relève en zombie hostile. Nécessite des Néchromites sacrifiés.",
            damage: "7d8+30 necrotic",
            isLegendary: false,
          },
          {
            name: "Vague Nécrotique (AoE)",
            description:
              "AoE massive. 4d10 nécrotique à tous les personnages sur la plateforme (JdS CON DC 17). Les personnages effrayés ont le Désavantage au JdS.",
            damage: "4d10 necrotic",
            isLegendary: false,
          },
        ],
        immunities: ["poison", "necrotic"],
        vulnerabilities: ["radiant"],
      },
    ],
    mechanics: [
      {
        id: "aura_frisson_osseux",
        name: "Aura de Frisson Osseux — Anti-Guérison",
        severity: "lethal",
        description:
          "Tout personnage sur la plateforme de Myrkul NE PEUT PAS être soigné et ne peut pas être réanimé s'il tombe à 0 PV. C'est la mécanique la plus mortelle du combat — un personnage tombé est MORT définitivement.",
        counterplay:
          "Buffez en amont : Élixirs de Résistance à la Nécromancie, PV temporaires (Armure de Mage, Héroïsme). Protection contre la Mort AVANT d'engager. Le porteur du Sang de Lathandre aveugle l'Apôtre passivement, réduisant massivement les dégâts AoE.",
      },
      {
        id: "regard_des_morts",
        name: "Regard des Morts — Riposte Automatique",
        severity: "warning",
        description:
          "Chaque attaque de mêlée déclenche une riposte : 3d8 nécrotique + Effrayé 2 tours. Pas de JdS. Vos attaquants mêlée se font punir à chaque coup.",
        counterplay:
          "Gardez vos personnages ESPACÉS pour éviter que l'Effrayé ne se propage. Lancez Ténèbres ou Cécité sur l'Apôtre — s'il est aveuglé, il ne peut PAS utiliser Regard des Morts ni ses AoE ciblées.",
      },
      {
        id: "doigt_de_mort_combo",
        name: "Doigt de Mort — One-Shot Potentiel",
        severity: "lethal",
        description:
          "L'Apôtre utilise les Néchromites (petits squelettes) comme carburant pour Doigt de Mort. 7d8+30 nécrotique = moyenne 61 dégâts. Suffit pour one-shot la plupart des personnages. La victime ressuscite en zombie ennemi.",
        counterplay:
          "Tuez les Néchromites EN PRIORITÉ avant qu'ils n'atteignent l'Apôtre. Sans Néchromites, il ne peut pas lancer Doigt de Mort. Contresort fonctionne ici — gardez une Réaction disponible.",
      },
      {
        id: "flagelleur_mental_p1",
        name: "Flagelleur Mental — Stun AoE (Phase 1)",
        severity: "warning",
        description:
          "Le Flagelleur Mental de la Phase 1 peut étourdir toute l'équipe avec son Souffle Psychique. Un tour perdu en Mode Honneur peut être fatal.",
        counterplay:
          "Tuez le Flagelleur Mental au TOUR 1 en priorité absolue. Lancez Invisibilité sur votre personnage le plus mobile avant le dialogue — positionnez-le derrière Dame Aylin pour la libérer immédiatement.",
      },
    ],
    loot: [],
    tags: ["boss-majeur", "myrkul", "mort-vivant", "acte-2"],
  },

  gortash: {
    id: "gortash",
    name: "Gortash, Élu de Baine",
    icon: "/icons/bosses/gortash.webp",
    act: 3,
    location: "Forteresse de Wyrm's Rock — Salle du Trône",
    hitPoints: 250,
    armourClass: 19,
    initiativeBonus: 3,
    abilities: {
      strength: 16,
      dexterity: 16,
      constitution: 18,
      intelligence: 18,
      wisdom: 14,
      charisma: 16,
    },
    phases: [
      {
        name: "Phase Unique — Élu de Baine",
        description:
          "Gortash est un combattant polyvalent avec des capacités divines de Baine. Sa mécanique Mode Honneur, Marquage Tyrannique, peut tuer instantanément.",
        actions: [
          {
            name: "Marquage Tyrannique (Mode Honneur)",
            description:
              "Marque une cible. Après 2 tours, la malédiction se déclenche et inflige ~110 dégâts de force. Mort instantanée si non purgée.",
            damage: "~110 force",
            isLegendary: true,
          },
          {
            name: "Attaques Multiples",
            description:
              "3 attaques avec son marteau de guerre +3. +11 au toucher, 1d8+6 contondants chacune.",
            damage: "1d8+6 bludgeoning ×3",
            isLegendary: false,
          },
        ],
        immunities: ["poison"],
        resistances: ["necrotic"],
      },
    ],
    mechanics: [
      {
        id: "marquage_tyrannique",
        name: "Marquage Tyrannique — Mort Différée",
        severity: "lethal",
        description:
          "Mécanique Mode Honneur exclusive. Gortash marque un personnage — après 2 tours, la malédiction explose pour ~110 dégâts de force. Mort instantanée sur la plupart des personnages.",
        counterplay:
          "Préparez Délivrance des Malédictions (Remove Curse) sur votre Clerc. Purgez le debuff IMMÉDIATEMENT après le marquage. Gardez votre Clerc hors de portée de Gortash pour qu'il ne soit pas stun/silence.",
      },
      {
        id: "gortash_humanoide",
        name: "Humanoïde — Vulnérable au Contrôle",
        severity: "info",
        description:
          "Gortash est un humanoïde, pas un monstre. Les sorts réservés aux humanoïdes fonctionnent sur lui.",
        counterplay:
          "Immobilisation de Personne garantit des critiques automatiques en mêlée. Combinez avec Châtiment Divin pour un burst dévastateur. La paralysie dure 1 tour minimum.",
      },
    ],
    loot: [],
    tags: ["élu", "baine", "humanoïde", "acte-3"],
  },

  orin: {
    id: "orin",
    name: "Orin, Élue de Bhaal",
    icon: "/icons/bosses/orin.webp",
    act: 3,
    location: "Temple de Bhaal — Égouts",
    hitPoints: 200,
    armourClass: 17,
    initiativeBonus: 4,
    abilities: {
      strength: 20,
      dexterity: 18,
      constitution: 16,
      intelligence: 12,
      wisdom: 10,
      charisma: 16,
    },
    phases: [
      {
        name: "Phase 1 — Orin Humaine",
        description:
          "Orin combat sous forme humaine avec des attaques de dague empoisonnées et des invocations de cultistes.",
        actions: [
          {
            name: "Attaques Multiples (Dague de Bhaal)",
            description:
              "4 attaques de mêlée. +12 au toucher, 1d4+5 perforants + 2d6 poison chacune.",
            damage: "1d4+5 piercing + 2d6 poison ×4",
            isLegendary: false,
          },
        ],
        immunities: ["poison"],
      },
      {
        name: "Phase 2 — Forme d'Écorcheur (Slayer)",
        hpThreshold: 50,
        description:
          "Orin se transforme en Écorcheur. Active la mécanique Mode Honneur 'Implacable' avec 12 charges qui réduisent chaque attaque à 1 dégât.",
        actions: [
          {
            name: "Griffes de l'Écorcheur",
            description:
              "3 attaques de mêlée. +14 au toucher, 2d8+6 tranchants chacune. Ignore les résistances.",
            damage: "2d8+6 slashing ×3",
            isLegendary: false,
          },
          {
            name: "Implacable (Mode Honneur)",
            description:
              "12 charges. Chaque attaque subie réduit les dégâts à 1 et consomme 1 charge. Tant qu'il reste des charges, Orin est quasi-invulnérable.",
            isLegendary: true,
          },
        ],
        immunities: ["poison", "psychic"],
      },
    ],
    mechanics: [
      {
        id: "implacable",
        name: "Implacable — 12 Charges d'Invulnérabilité",
        severity: "lethal",
        description:
          "En Phase 2 (Écorcheur), Orin active Implacable : 12 charges qui réduisent chaque attaque reçue à 1 dégât. Si vous frappez normalement, il faut 12 tours pour les épuiser — bien trop long.",
        counterplay:
          "Lancez Projectile Magique upcasté (niveau 5 = 7 missiles, niveau 6 = 8 missiles). Chaque missile compte comme une attaque séparée et consomme 1 charge. Deux castings de Projectile Magique niv. 5 = 14 charges brûlées. ENSUITE votre DPS principal frappe normalement.",
      },
    ],
    loot: [],
    tags: ["élue", "bhaal", "écorcheur", "acte-3"],
  },

  raphael: {
    id: "raphael",
    name: "Raphaël, Archidiable",
    icon: "/icons/bosses/raphael.webp",
    act: 3,
    location: "Maison de l'Espoir (House of Hope)",
    hitPoints: 666,
    armourClass: 20,
    initiativeBonus: 3,
    abilities: {
      strength: 24,
      dexterity: 16,
      constitution: 24,
      intelligence: 22,
      wisdom: 18,
      charisma: 26,
    },
    phases: [
      {
        name: "Phase 1 — Forme Humanoïde",
        description:
          "Raphaël sous forme cambion. Accompagné de sbires démoniaques et de 4 Piliers d'Âmes qui le renforcent.",
        actions: [
          {
            name: "Flammes Infernales (AoE)",
            description:
              "AoE massive. 8d6 dégâts de feu (JdS DEX DC 19 pour moitié). Zone persistante de 3 tours.",
            damage: "8d6 fire",
            isLegendary: false,
          },
          {
            name: "Contresort (Réaction)",
            description:
              "Raphaël peut Contresort vos sorts. Il a +8 au jet de Contresort, rendant vos sorts de niveau 4+ vulnérables.",
            isLegendary: false,
          },
        ],
        resistances: ["fire"],
      },
      {
        name: "Phase 2 — Forme Archidiable",
        hpThreshold: 50,
        description:
          "Raphaël se transforme en Archidiable. Gagne 2 Actions Légendaires par tour et des immunités supplémentaires.",
        actions: [
          {
            name: "Souffle Infernal (Action Légendaire)",
            description:
              "Cône. 10d8 dégâts de feu (JdS DEX DC 20). Peut toucher toute l'équipe si regroupée.",
            damage: "10d8 fire",
            isLegendary: true,
          },
          {
            name: "Multiattaque (3 attaques)",
            description:
              "3 attaques griffes/morsure. +14 au toucher, 2d10+7 chacune.",
            damage: "2d10+7 ×3",
            isLegendary: false,
          },
        ],
        immunities: ["fire", "poison"],
        resistances: ["bludgeoning", "piercing", "slashing"],
      },
    ],
    mechanics: [
      {
        id: "piliers_ames",
        name: "Piliers d'Âmes — Buff Permanent",
        severity: "warning",
        description:
          "4 Piliers d'Âmes renforcent Raphaël (+2 CA, régénération 20 PV/tour, résistance à tous les dégâts). Tant qu'un pilier est debout, Raphaël est quasi-imbattable.",
        counterplay:
          "Détruisez les 4 Piliers d'Âmes au Tour 1 en priorité absolue. Chaque pilier a ~40 PV. Utilisez des AoE (Boule de Feu, Éclair) pour en détruire plusieurs à la fois.",
      },
      {
        id: "renvoi_radiant",
        name: "Renvoi de Dégâts Radiants — Piège",
        severity: "lethal",
        description:
          "NE TAPEZ JAMAIS les sbires de Raphaël avec des dégâts Radiants. Les démons renvoient les dégâts de feu doublés en retour. Un Châtiment Divin sur un sbire = 4d8 feu renvoyés sur l'attaquant.",
        counterplay:
          "Réservez les dégâts radiants pour Raphaël UNIQUEMENT. Contre les sbires, utilisez des dégâts physiques ou de froid. Informez toute l'équipe AVANT le combat.",
      },
      {
        id: "globe_obligatoire",
        name: "Globe d'Invulnérabilité — Obligatoire",
        severity: "warning",
        description:
          "Les AoE de feu de Raphaël (8d6 à 10d8) peuvent wipe l'équipe. Sans protection magique, les personnages en robe meurent en 1-2 AoE.",
        counterplay:
          "Globe d'Invulnérabilité annule toutes ses AoE de niveau 5 ou moins. Gardez-le pour les phases critiques. Résistance au feu (sort ou équipement) comme backup.",
      },
    ],
    loot: ["helldusk_armour"],
    tags: ["archidiable", "cambion", "maison-espoir", "acte-3"],
  },
};

export function getBoss(id: string): Boss | undefined {
  return BOSSES[id];
}
