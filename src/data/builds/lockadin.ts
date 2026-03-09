// ============================================================================
// BUILD : Le Lockadin — Paladin 7 / Occultiste 5
// Tier S — Le build de référence du Mode Honneur
// TOUT en français avec le vocabulaire officiel BG3
// ============================================================================

export interface LockBuildLevel {
  readonly level: number;
  readonly classe: string;
  readonly sousClasse?: string;
  readonly capacites: readonly string[];
  readonly sorts?: readonly string[];
  readonly don?: string;
  readonly notes: string;
}

export interface EquipementParActe {
  readonly acte: 1 | 2 | 3;
  readonly label: string;
  readonly items: readonly {
    readonly emplacement: string;
    readonly itemId: string;
    readonly nom: string;
    readonly raison: string;
  }[];
}

export interface Failsafe {
  readonly id: string;
  readonly emplacement: string;
  readonly prioritaire: string;
  readonly condition: string;
  readonly fallback: string;
  readonly conditionFallback: string;
  readonly fallbackUltime: string;
}

export interface LockBuild {
  readonly id: string;
  readonly nom: string;
  readonly sousTitre: string;
  readonly tier: "S" | "A" | "B" | "C";
  readonly role: string;
  readonly race: string;
  readonly origine: string;
  readonly description: string;
  readonly multiclasse: string;
  readonly scoreCaracteristiques: {
    readonly base: Record<string, number>;
    readonly final: Record<string, number>;
  };
  readonly progression: readonly LockBuildLevel[];
  readonly equipement: readonly EquipementParActe[];
  readonly failsafes: readonly Failsafe[];
  readonly cycleCombat: readonly string[];
  readonly conseilsModeHonneur: readonly string[];
}

export const LOCKADIN: LockBuild = {
  id: "lockadin",
  nom: "Le Lockadin",
  sousTitre: "Paladin 7 / Occultiste 5 — Châtiment + Emplacements Rechargés",
  tier: "S",
  role: "Frappeur Nova",
  race: "Demi-Orque",
  origine: "Soldat",
  description:
    "Le Lockadin combine la puissance brute du Châtiment Divin du Paladin avec les emplacements de sort à repos court de l'Occultiste. Résultat : des Châtiments à volonté. Le Serment de Vengeance apporte le Vœu d'Inimitié (Avantage garanti), et le Pacte de la Lame confère une arme liée. En Mode Honneur, c'est la machine à one-shot la plus fiable du jeu.",
  multiclasse: "Paladin (Vengeance) 7 → Occultiste (Archifée) 5",

  scoreCaracteristiques: {
    base: {
      Force: 17,
      Dextérité: 8,
      Constitution: 14,
      Intelligence: 8,
      Sagesse: 10,
      Charisme: 14,
    },
    final: {
      Force: 20,
      Dextérité: 8,
      Constitution: 16,
      Intelligence: 8,
      Sagesse: 10,
      Charisme: 14,
    },
  },

  progression: [
    {
      level: 1,
      classe: "Paladin",
      capacites: ["Imposition des Mains", "Sens Divin", "Armure lourde", "JdS Sagesse/Charisme"],
      notes: "Départ Paladin pour l'armure lourde et les JdS Sagesse/Charisme. Ne pas oublier de prendre un bouclier temporaire.",
    },
    {
      level: 2,
      classe: "Paladin",
      capacites: ["Châtiment Divin", "Style de combat : Combat à deux armes de grande taille"],
      sorts: ["Bouclier de la Foi", "Injonction"],
      notes: "Le Châtiment Divin est en ligne. Conservez vos emplacements pour les coups critiques autant que possible.",
    },
    {
      level: 3,
      classe: "Paladin",
      sousClasse: "Serment de Vengeance",
      capacites: ["Vœu d'Inimitié", "Représailles du Chasseur"],
      sorts: ["Marque du Chasseur", "Fléau"],
      notes: "Vœu d'Inimitié = Avantage garanti sur une cible. Utilisez-le sur chaque boss sans exception.",
    },
    {
      level: 4,
      classe: "Paladin",
      don: "Maître des Armes à Deux Mains",
      capacites: ["Don : Maître des Armes à Deux Mains"],
      notes: "GWM : -5 attaque / +10 dégâts. Avec le Vœu d'Inimitié, le malus de -5 est compensé par l'Avantage.",
    },
    {
      level: 5,
      classe: "Paladin",
      capacites: ["Attaque Supplémentaire"],
      sorts: ["Pas Brumeux"],
      notes: "Attaque Supplémentaire double votre output. Chaque attaque peut porter un Châtiment.",
    },
    {
      level: 6,
      classe: "Paladin",
      capacites: ["Aura de Protection"],
      notes: "Aura de Protection : +Mod. CHA aux JdS pour vous et tous les alliés dans un rayon de 3m. Capacité la plus puissante du jeu.",
    },
    {
      level: 7,
      classe: "Paladin",
      capacites: ["Vengeur Implacable"],
      notes: "Vengeur Implacable : quand vous touchez une créature sous Vœu d'Inimitié, vous pouvez vous déplacer vers elle (15m) sans provoquer d'attaque d'opportunité.",
    },
    {
      level: 8,
      classe: "Occultiste",
      capacites: ["Magie de Pacte", "Décharge Occulte"],
      sorts: ["Décharge Occulte", "Représailles Infernales"],
      notes: "Multiclasse Occultiste. Les emplacements de sort de l'Occultiste se régénèrent à chaque repos court — ils alimentent le Châtiment Divin !",
    },
    {
      level: 9,
      classe: "Occultiste",
      capacites: ["Invocations Occultes : Souffle Agonisant"],
      sorts: ["Ténèbres"],
      notes: "Souffle Agonisant ajoute le mod. CHA aux dégâts de Décharge Occulte. Option de repli à distance fiable.",
    },
    {
      level: 10,
      classe: "Occultiste",
      sousClasse: "Archifée",
      capacites: ["Pacte de la Lame", "Présence Féérique"],
      notes: "Pacte de la Lame : liez votre arme principale. L'Archifée donne Présence Féérique (Charme/Effroi AoE) — excellent contrôle de foule.",
    },
    {
      level: 11,
      classe: "Occultiste",
      don: "Augmentation de Force (+2)",
      capacites: ["ASI : Force 19→20 (via Demi-Orque +2)"],
      notes: "Force maximale à 20. Mod. de Force = +5. Avec la Pourfendeuse de Géant, c'est +10 par attaque.",
    },
    {
      level: 12,
      classe: "Occultiste",
      capacites: ["Emplacements de sort Occultiste niv. 3", "Invocation : Frappe Assoiffée"],
      sorts: ["Contresort"],
      notes: "Emplacements de niveau 3 = Châtiment à 4d8 (base). Frappe Assoiffée donne une attaque supplémentaire. Contresort en réaction.",
    },
  ],

  equipement: [
    {
      acte: 1,
      label: "Équipement Acte 1 — Survie",
      items: [
        { emplacement: "Arme principale", itemId: "everburn_blade", nom: "Lame Toujours Ardente", raison: "Meilleure arme à deux mains gratuite de l'Acte 1. Piller le Cdt. Zhalk." },
        { emplacement: "Armure", itemId: "chain_mail", nom: "Cotte de Mailles", raison: "CA 16. Disponible chez les marchands dès le début." },
        { emplacement: "Casque", itemId: "grymskull_helm", nom: "Heaume de Grymforge", raison: "CA +1, résistance au feu. Forge Adamantine si vous y accédez." },
      ],
    },
    {
      acte: 2,
      label: "Équipement Acte 2 — Les Terres Maudites",
      items: [
        { emplacement: "Arme principale", itemId: "flail_of_ages", nom: "Fléau des Âges", raison: "Dégâts feu + Lenteur. Forgé par Dammon si il est vivant." },
        { emplacement: "Armure", itemId: "adamantine_splint", nom: "Clibanion en Adamantine", raison: "CA 18, réduit les critiques à des coups normaux, -1 aux dégâts reçus." },
        { emplacement: "Gants", itemId: "gauntlets_hill_giant", nom: "Gantelets de Force du Géant des Collines", raison: "Force fixée à 23. Libère les ASI pour le Charisme." },
      ],
    },
    {
      acte: 3,
      label: "Équipement Acte 3 — Endgame",
      items: [
        { emplacement: "Arme principale", itemId: "baldurans_giantslayer", nom: "Pourfendeuse de Géant de Baldur", raison: "Double le mod. de Force. Best in Slot absolu." },
        { emplacement: "Casque", itemId: "helmet_of_balduran", nom: "Heaume de Baldur", raison: "+1 CA, régén 2 PV/tour, anti-critique. Immunité au game over." },
        { emplacement: "Armure", itemId: "helldusk_armour", nom: "Armure Infernale", raison: "CA 21, réduction de dégâts, contre-attaque feu. Le meilleur du jeu." },
        { emplacement: "Cape", itemId: "cloak_displacement", nom: "Cape de Déplacement", raison: "Impose le Désavantage aux jets d'attaque contre vous. Synergise avec l'Aura." },
      ],
    },
  ],

  failsafes: [
    {
      id: "fs_arme_principale",
      emplacement: "Arme Principale",
      prioritaire: "Pourfendeuse de Géant de Baldur",
      condition: "Ansur vaincu dans la Voie du Wyrm",
      fallback: "Fléau des Âges",
      conditionFallback: "Dammon vivant + Fer Infernal donné",
      fallbackUltime: "Lame Toujours Ardente (conservée depuis l'Acte 1)",
    },
    {
      id: "fs_casque",
      emplacement: "Casque",
      prioritaire: "Heaume de Baldur",
      condition: "Ansur vaincu dans la Voie du Wyrm",
      fallback: "Heaume de Grymforge",
      conditionFallback: "Forge Adamantine complétée (Acte 1)",
      fallbackUltime: "N'importe quel casque +1 CA",
    },
    {
      id: "fs_armure",
      emplacement: "Armure",
      prioritaire: "Armure Infernale",
      condition: "Raphaël vaincu — Maison de l'Espoir",
      fallback: "Clibanion en Adamantine",
      conditionFallback: "Forge Adamantine complétée (Acte 1)",
      fallbackUltime: "Harnois (CA 18, Désavantage en Discrétion)",
    },
  ],

  cycleCombat: [
    "1. Vœu d'Inimitié (Action Bonus) — Avantage garanti sur la cible",
    "2. Attaque 1 + Châtiment Divin (emplacement niv. 3 = 4d8 radiants)",
    "3. Attaque Supplémentaire + Châtiment Divin (emplacement niv. 2 = 3d8 radiants)",
    "4. Frappe Assoiffée (attaque bonus Pacte de la Lame, si disponible)",
    "5. Si critique → GWM : attaque bonus gratuite + Châtiment",
    "6. Repos Court → Récupération des 2 emplacements Occultiste → Recommencer",
  ],

  conseilsModeHonneur: [
    "Toujours garder un Châtiment en réserve pour achever un boss en phase dangereuse.",
    "L'Aura de Protection est votre assurance-vie : restez à 3m de vos alliés fragiles.",
    "Ne jamais utiliser GWM (-5/+10) sans Avantage. Vœu d'Inimitié ou Hâte d'abord.",
    "Contre Ansur, passez en armure avec résistance Foudre AVANT le combat.",
    "Les emplacements Occultiste rechargent au repos court — abusez-en entre chaque combat.",
    "Raphaël a Contresort. Lancez le vôtre en premier ou positionnez-vous hors de portée (18m).",
  ],
};
