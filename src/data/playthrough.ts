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
    "L'Acte 1 est le plus dangereux en Mode Honneur : vos personnages sont fragiles, les ressources limitées, et chaque combat peut tourner au désastre. L'objectif est d'atteindre le Niveau 4 avec un minimum de risques en suivant la Route Pacifique.",

  sections: [
    // ===== SECTION 1 : LE CRASH & L'ÉCONOMIE =====
    {
      id: "crash_et_economie",
      titre: "Le Crash & L'Économie",
      description:
        "Les premières minutes déterminent votre économie de tout l'Acte 1. L'Épée de Flammes Éternelles est la meilleure arme disponible jusqu'à la Forge Adamantine — ne la manquez pas.",
      etapes: [
        {
          id: "s1_injonction_lacher",
          label: "Nautiloïde : Lancer Injonction (Lâcher) sur le Commandant Zhalk",
          description:
            "Dès que le combat commence sur le Nautiloïde, utilisez Shadowheart pour lancer Injonction : Lâcher sur le Commandant Zhalk. Il lâche son Épée de Flammes Éternelles. Ramassez-la IMMÉDIATEMENT avec votre personnage principal. C'est la meilleure arme de tout l'Acte 1 (2d6 tranchants + 1d4 feu).",
          type: "butin",
          codexRefs: ["injonction", "epee_flammes_eternelles"],
          critique: true,
        },
        {
          id: "s1_crash_survie",
          label: "Survivre au Crash — Ne PAS combattre le Démon",
          description:
            "Après avoir récupéré l'épée, courez directement vers le Transponder. Le diable Cambion combat Zhalk — laissez-les se battre entre eux. Interagir avec le Transponder termine la séquence du Nautiloïde. Chaque tour passé en combat est un risque inutile.",
          type: "avertissement",
          critique: true,
        },
        {
          id: "s1_plage_recrutement",
          label: "Plage : Recruter Shadowheart et Astarion",
          description:
            "Sur la plage du crash, recrutez Shadowheart (si pas déjà fait dans le pod du Nautiloïde) et trouvez Astarion sur le chemin nord. Astarion est le meilleur DPS à distance grâce à sa Dextérité de 17. Autorisez-le à boire votre sang UNE FOIS pour son bonus d'approbation.",
          type: "companion",
        },
        {
          id: "s1_premier_repos",
          label: "Premier Long Repos — Préparer l'économie",
          description:
            "Faites un Long Repos dès que possible. Vous recevez l'événement de camp avec le Rêve du Tadpole. Vendez tout le loot du Nautiloïde pour accumuler de l'or. Ne dépensez RIEN encore — gardez votre or pour le Vendor Refresh de Tatie Ethel.",
          type: "objectif",
        },
      ],
    },

    // ===== SECTION 2 : L'ABUS DU VENDOR REFRESH =====
    {
      id: "vendor_refresh",
      titre: "L'Abus du Vendor Refresh",
      description:
        "Le Vendor Refresh est la mécanique la plus puissante de l'Acte 1. Chaque Long Repos régénère le stock des marchands. Tatie Ethel vend des Élixirs de Force de Géant des Collines — avec assez d'or et de repos, vous pouvez en accumuler un stock qui rend n'importe quel personnage viable en mêlée.",
      etapes: [
        {
          id: "s1_ethel_marche",
          label: "Trouver Tatie Ethel au Bosquet des Druides",
          description:
            "Tatie Ethel apparaît au Bosquet des Druides déguisée en vieille herboriste. Son inventaire contient l'Élixir de Force de Géant des Collines (Force → 21 jusqu'au Long Repos). C'est l'objet le plus broken de l'Acte 1 : il transforme n'importe quel personnage en machine de guerre.",
          type: "marchand",
          codexRefs: ["elixir_geant_collines"],
          critique: true,
        },
        {
          id: "s1_vendor_refresh_boucle",
          label: "Boucle Vendor Refresh : Repos → Acheter → Repos",
          description:
            "Après chaque Long Repos, le stock de Tatie Ethel se régénère. Achetez TOUS ses Élixirs de Force de Géant des Collines à chaque visite. Avec 3-4 cycles de Long Repos, vous accumulez un stock suffisant pour tout l'Acte 1. Chaque Élixir dure un Long Repos complet.",
          type: "secret",
          codexRefs: ["elixir_geant_collines"],
        },
        {
          id: "s1_marchands_bosquet",
          label: "Autres marchands essentiels du Bosquet",
          description:
            "Arron (Bosquet) : Parchemins de Hâte, Potions de Soin Supérieures, Flèches +1. Dammon : réparations de Karlach et consommables de forgeron. Le Vendor Refresh s'applique à TOUS les marchands — profitez-en pour stocker les ressources critiques.",
          type: "marchand",
          codexRefs: ["haste"],
        },
      ],
    },

    // ===== SECTION 3 : LA TOURNÉE D'EXPLORATION =====
    {
      id: "tournee_exploration",
      titre: "La Tournée d'Exploration",
      description:
        "Avec l'Épée de Flammes Éternelles et les Élixirs de Force, vous êtes maintenant équipé pour explorer en sécurité. L'objectif : maximiser l'XP via les dialogues et l'exploration pour atteindre le Niveau 4 AVANT d'engager un combat sérieux.",
      etapes: [
        {
          id: "s1_village_devaste",
          label: "Village Dévasté : Exploration complète",
          description:
            "Le Village Dévasté est la première zone ouverte. Parlez à Zevlor pour lancer la quête principale. Recrutez Wyll qui entraîne les enfants tieffelins. Trouvez Karlach au nord-est près de la rivière — elle est ESSENTIELLE pour Dammon à l'Acte 2. NE COMBATTEZ PAS les gnolls au Chemin Élevé avant le Niveau 4.",
          type: "objectif",
          codexRefs: ["flail_of_ages"],
          critique: true,
        },
        {
          id: "s1_gale_recrutement",
          label: "Recruter Gale au Portail Ancien",
          description:
            "Gale est piégé dans un portail dimensionnel au nord du Village Dévasté. Réussissez les jets de dialogue pour le libérer. Il apporte Contresort et des sorts de contrôle essentiels pour le Mode Honneur. Nourrissez-le avec des objets magiques inutiles pour maintenir son approbation.",
          type: "companion",
          codexRefs: ["counterspell"],
        },
        {
          id: "s1_repos_waukeen",
          label: "Repos de Waukeen : Reconnaissance et butin",
          description:
            "Le Repos de Waukeen est un avant-poste marchand sur la route nord. Anders et ses « paladins » sont en réalité des serviteurs de Zariel — vous pouvez les combattre pour de l'XP et du bon loot, ou les éviter diplomatiquement. Vérifiez CHAQUE coffre et caisse pour l'XP de découverte.",
          type: "objectif",
        },
        {
          id: "s1_camp_gobelin",
          label: "Camp Gobelin : Approche 100% diplomatique",
          description:
            "Le Camp Gobelin est accessible PAR DIALOGUE. Utilisez le Charisme ou les pouvoirs du Tadpole pour entrer sans combat. Parlez à Ragzlin, infiltrez le temple. Vous pouvez éliminer les 3 chefs gobelins UN PAR UN en les isolant dans des zones privées. Chaque chef tué = XP massif sans combat ouvert.",
          type: "objectif",
        },
        {
          id: "s1_ombreterre",
          label: "Ombreterre : Forge Adamantine (optionnel mais recommandé)",
          description:
            "L'Ombreterre est accessible via le trou dans le temple du Camp Gobelin. La Forge Adamantine permet de forger un Clibanion en Adamantine (CA 18, anti-critique, -1 dégâts). Le boss Grym est vulnérable à la lave — utilisez le mécanisme central. Avec l'Élixir de Force + Épée de Flammes Éternelles, ce combat est gérable au Niveau 4.",
          type: "combat",
          codexRefs: ["epee_flammes_eternelles", "elixir_geant_collines"],
        },
        {
          id: "s1_sauver_dammon",
          label: "AVERTISSEMENT : Sauver Dammon à tout prix",
          description:
            "Si les gobelins attaquent le Bosquet (quête des Tieffelins), Dammon peut MOURIR. Protégez-le en priorité absolue — il est INDISPENSABLE pour forger le Fléau des Âges à l'Acte 2. Sans Dammon, votre chaîne de failsafe d'armes s'effondre. Si vous avez éliminé les 3 chefs gobelins, l'attaque n'a pas lieu.",
          type: "avertissement",
          codexRefs: ["flail_of_ages"],
          critique: true,
        },
        {
          id: "s1_niveau_4_check",
          label: "Checkpoint : Vérifier Niveau 4 + Don",
          description:
            "Avant de quitter l'Acte 1, assurez-vous que TOUS vos personnages sont Niveau 4. Prenez Maître des Armes à Deux Mains (GWM) sur votre Paladin, ou le Don Alerte sur votre caster. C'est le seuil de puissance minimum pour survivre à l'Acte 2.",
          type: "objectif",
          codexRefs: ["great_weapon_master"],
          critique: true,
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
  titre: "Acte 2 — Les Terres Maudites par l'Ombre",
  sousTitre: "L'Avatar de la Mort & Le Piège de Balthazar",
  description:
    "L'Acte 2 punit l'impréparation. Le positionnement et la gestion de la lumière sont primordiaux. Ne rushez jamais les combats principaux. L'Apôtre de Myrkul est le combat le plus mortel du jeu — préparez-vous ou mourrez.",

  sections: [
    // ===== SECTION 1 : SURVIE ET INFILTRATION =====
    {
      id: "survie_infiltration",
      titre: "Survie et Infiltration (Tours de Hautelune)",
      description:
        "Votre première priorité est de sécuriser la protection contre la malédiction d'ombre. Sans la Lanterne Lunaire ou la Bénédiction de la Pixie, vos personnages meurent automatiquement dans les Terres Maudites.",
      etapes: [
        {
          id: "s2_benediction_pixie",
          label: "Obtenir la Bénédiction de la Pixie (PRIORITÉ ABSOLUE)",
          description:
            "Tendez une embuscade au convoi de Kar'niss (le Drider) avec les Ménestrels. Tuez Kar'niss en priorité et pillez la Lanterne Lunaire. Libérez la Pixie piégée à l'intérieur — elle octroie une immunité PERMANENTE à la malédiction d'ombre pour tout le groupe. C'est la meilleure option possible.",
          type: "butin",
          codexRefs: ["lanterne_lunaire"],
          critique: true,
        },
        {
          id: "s2_failsafe_lanterne",
          label: "FAILSAFE : Si Kar'niss s'échappe",
          description:
            "Si vous ratez le convoi de Kar'niss, foncez à l'Auberge de l'Ultime Lueur. Buffez-vous avec le sort Lumière du Jour pour une protection temporaire. Infiltrez ensuite les Tours de Hautelune pacifiquement pour voler la Lanterne dans la chambre de Balthazar.",
          type: "avertissement",
          codexRefs: ["lumiere_du_jour", "lanterne_lunaire"],
        },
        {
          id: "s2_isobel_defense",
          label: "Défendre Isobel à l'Auberge de l'Ultime Lueur",
          description:
            "Marcus et les Ombres attaquent l'auberge. Si Isobel tombe, la protection lumineuse s'effondre — TOUS les PNJ meurent, y compris Dammon. Protégez Isobel à tout prix : Sanctuaire en Action Bonus, puis Bouclier de la Foi pour +2 CA.",
          type: "combat",
          codexRefs: ["sanctuary", "shield_of_faith"],
          critique: true,
        },
        {
          id: "s2_marchands_hautelune",
          label: "Marchands de Hautelune — Achats AVANT l'assaut",
          description:
            "AVANT de déclencher l'assaut sur les Tours, infiltrez pacifiquement. Achetez la Hallebarde de Vigilance chez Roah Moonglow (Avantage à l'initiative + anti-Surprise). Chez Araj Oblodra : les Gants du Maître d'Armes (maîtrise de toutes les armes). Ces objets disparaissent après l'assaut.",
          type: "marchand",
          codexRefs: ["hallebarde_vigilance", "gants_maitre_armes"],
          critique: true,
        },
        {
          id: "s2_dammon_fer",
          label: "Donner le Fer Infernal à Dammon",
          description:
            "Dammon est à l'auberge SI il a survécu à l'Acte 1. Donnez-lui le Fer Infernal pour les améliorations de Karlach et pour forger le Fléau des Âges. Sans Dammon, cette chaîne d'équipement est PERDUE.",
          type: "objectif",
          codexRefs: ["flail_of_ages"],
          critique: true,
        },
        {
          id: "s2_sang_lathandre",
          label: "Récupérer le Sang de Lathandre (Monastère de Rosymorn)",
          description:
            "Le Sang de Lathandre est une masse légendaire au Monastère de Rosymorn. Son aura aveugle les Morts-vivants à 6m — c'est l'arme ESSENTIELLE contre l'Apôtre de Myrkul. Le porteur doit rester au corps-à-corps pour aveugler le boss passivement. Résolvez le puzzle des vitraux pour l'obtenir.",
          type: "butin",
          codexRefs: ["sang_de_lathandre"],
          critique: true,
        },
      ],
    },

    // ===== SECTION 2 : LE PIÈGE DE BALTHAZAR =====
    {
      id: "piege_balthazar",
      titre: "Le Piège de Balthazar (Gantelet de Shar)",
      description:
        "Le Gantelet de Shar contient 3 épreuves et le combat contre Balthazar. Le LIEU du combat est plus important que votre stratégie — un mauvais emplacement = Game Over instantané.",
      etapes: [
        {
          id: "s2_epreuves_shar",
          label: "Épreuves du Gantelet de Shar",
          description:
            "Trois épreuves : Foi (marcher dans le noir), Perspicacité (puzzle de portes), et Fortitude (combat contre les ombres). Shadowheart peut utiliser les autels de Shar pour des bonus. Gardez vos emplacements de sort pour le combat de Balthazar.",
          type: "objectif",
        },
        {
          id: "s2_balthazar_lieu",
          label: "AVERTISSEMENT : Ne JAMAIS combattre Balthazar dans la Prison",
          description:
            "Ne combattez JAMAIS Balthazar dans la prison de Chantsenuit (Gisombre). Ses sbires morts-vivants vous POUSSERONT dans le vide — Game Over instantané en Mode Honneur, aucun jet de sauvegarde possible. C'est le piège le plus dangereux de l'Acte 2.",
          type: "avertissement",
          critique: true,
        },
        {
          id: "s2_balthazar_strategie",
          label: "Stratégie Honneur : Balthazar dans son Laboratoire",
          description:
            "Attaquez Balthazar dans son laboratoire au sein du Gantelet de Shar. FERMEZ LA PORTE derrière vous pour empêcher les renforts. Lancez Silence sur Balthazar au Tour 1 — il ne peut plus lancer de sorts. Éliminez son Golem de Chair avec des dégâts de feu (vulnérabilité). Sans sorts et sans Golem, Balthazar est inoffensif.",
          type: "combat",
          codexRefs: ["silence"],
          critique: true,
        },
        {
          id: "s2_nightsong",
          label: "Libérer la Nightsong (Dame Aylin)",
          description:
            "CHOIX CRITIQUE : Libérer Dame Aylin donne une alliée puissante pour le combat final et active la rédemption de Shadowheart. La tuer rompt le pacte de Shadowheart mais DÉTRUIT un allié clé pour la Phase 1 de l'Apôtre. LIBÉREZ-LA.",
          type: "objectif",
          critique: true,
        },
      ],
    },

    // ===== SECTION 3 : BOSS MAJEUR — L'APÔTRE DE MYRKUL =====
    {
      id: "apotre_myrkul",
      titre: "BOSS MAJEUR : L'Apôtre de Myrkul (Combat Tueur de Run)",
      description:
        "Le combat le plus dangereux du jeu. L'Aura de Frisson Osseux empêche toute guérison — un personnage tombé est mort DÉFINITIVEMENT. Préparez-vous méticuleusement ou acceptez de perdre votre run.",
      etapes: [
        {
          id: "s2_myrkul_preparation",
          label: "Préparation OBLIGATOIRE avant le combat",
          description:
            "Élixirs de Résistance à la Nécromancie pour TOUS les personnages. Sorts à préparer : Ténèbres (ou Brouillard), Pas Brumeux, Invisibilité, Cécité. Le Sang de Lathandre DOIT être équipé. Protection contre la Mort sur vos personnages fragiles. PV temporaires via Héroïsme ou Armure de Mage.",
          type: "objectif",
          codexRefs: ["tenebres", "pas_brumeux", "invisibilite", "cecite", "sang_de_lathandre"],
          critique: true,
        },
        {
          id: "s2_myrkul_phase1",
          label: "Phase 1 (Ketheric) : Tuer le Flagelleur Mental au Tour 1",
          description:
            "Lancez Invisibilité sur votre personnage le plus mobile (Moine ou Voleur) AVANT de déclencher le dialogue. Positionnez-le derrière Dame Aylin. Quand le combat commence : tuez le Flagelleur Mental au Tour 1 en PRIORITÉ ABSOLUE (il peut stun toute l'équipe). Libérez Aylin à la fin du Tour 1 pour qu'elle combatte avec vous.",
          type: "combat",
          codexRefs: ["invisibilite"],
          critique: true,
        },
        {
          id: "s2_myrkul_phase2_regard",
          label: "Phase 2 : Regard des Morts — Espacement obligatoire",
          description:
            "L'Apôtre de Myrkul riposte automatiquement avec Regard des Morts quand il est attaqué : 3d8 nécrotique + Effrayé 2 tours, SANS jet de sauvegarde. Gardez vos personnages ESPACÉS d'au moins 4m pour éviter que l'état Effrayé ne provoque une fuite en chaîne. Les attaques à distance sont préférables.",
          type: "avertissement",
          codexRefs: ["sang_de_lathandre"],
          critique: true,
        },
        {
          id: "s2_myrkul_aura",
          label: "MÉCANIQUE MORTELLE : Aura de Frisson Osseux",
          description:
            "Tout personnage sur la plateforme de Myrkul NE PEUT PAS être soigné et ne peut pas être réanimé s'il tombe à 0 PV. C'est la cause n°1 de Game Over en Mode Honneur sur ce combat. BUFFEZ AVANT D'ENGAGER : Protection contre la Mort, PV temporaires, Élixirs de Résistance Nécrotique.",
          type: "avertissement",
          critique: true,
        },
        {
          id: "s2_myrkul_contre",
          label: "CONTRE ABSOLU : Ténèbres + Sang de Lathandre",
          description:
            "Lancez Ténèbres ou Cécité directement sur l'Apôtre. S'il est aveuglé, il ne peut PAS utiliser ses attaques de zone dévastatrices ni cibler vos mages. Le porteur du Sang de Lathandre doit rester au corps-à-corps pour l'aveugler passivement. Tuez les Néchromites AVANT qu'ils n'atteignent le boss — sans eux, l'Apôtre ne peut pas lancer Doigt de Mort.",
          type: "combat",
          codexRefs: ["tenebres", "cecite", "sang_de_lathandre", "doigt_de_mort"],
          critique: true,
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
