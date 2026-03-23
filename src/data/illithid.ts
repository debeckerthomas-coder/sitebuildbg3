// ============================================================================
// Matrice Illithid — Arbre de compétences des Têtards
// ============================================================================

export type IllithidTier = "outer" | "middle" | "inner";

export interface IllithidPower {
  readonly id: string;
  readonly name: string;
  readonly tier: IllithidTier;
  readonly description: string;
  readonly effect: string;
  /** Build IDs that should highlight this power as recommended */
  readonly recommendedFor: readonly string[];
  readonly recommendedReason?: string;
}

// ---------------------------------------------------------------------------
// Tier 1 — Cercle Extérieur (5 pouvoirs, coût 1 têtard chacun)
// ---------------------------------------------------------------------------

const TIER_OUTER: readonly IllithidPower[] = [
  {
    id: "favorable_beginnings",
    name: "Débuts Favorables",
    tier: "outer",
    description: "Débuts Favorables",
    effect:
      "Ajoutez votre bonus de maîtrise au premier jet d'attaque ou de compétence de chaque combat.",
    recommendedFor: ["barde_controleur"],
    recommendedReason:
      "Le Barde Contrôleur a besoin que son premier sort de contrôle (Hypnotic Pattern, Hold Person) réussisse à tout prix. Le bonus de maîtrise au premier jet garantit l'ouverture.",
  },
  {
    id: "transfusion",
    name: "Transfusion",
    tier: "outer",
    description: "Transfusion Illithid",
    effect:
      "Sacrifiez la moitié de vos PV restants pour soigner un allié du même montant. Ne provoque pas d'Attaque d'Opportunité.",
    recommendedFor: [],
  },
  {
    id: "somber_sickness",
    name: "Maladie Sombre",
    tier: "outer",
    description: "Maladie Sombre",
    effect:
      "En réussissant un jet de sauvegarde de Constitution, gagnez l'Avantage au prochain jet d'attaque.",
    recommendedFor: [],
  },
  {
    id: "force_tunnel",
    name: "Tunnel de Force",
    tier: "outer",
    description: "Tunnel de Force",
    effect:
      "Chargez en ligne droite, repoussant tous les ennemis sur votre passage (4m). Action Bonus.",
    recommendedFor: [],
  },
  {
    id: "psionic_overload",
    name: "Surcharge Psionique",
    tier: "outer",
    description: "Surcharge Psionique",
    effect:
      "Vos attaques au corps à corps infligent 1d4 dégâts psychiques supplémentaires, mais vous subissez 1d4 dégâts psychiques par tour.",
    recommendedFor: [],
  },
];

// ---------------------------------------------------------------------------
// Tier 2 — Cercle du Milieu (5 pouvoirs)
// ---------------------------------------------------------------------------

const TIER_MIDDLE: readonly IllithidPower[] = [
  {
    id: "cull_the_weak",
    name: "Abattage",
    tier: "middle",
    description: "Cull the Weak",
    effect:
      "Quand vous tuez un ennemi avec une attaque ou un sort, les créatures dans un rayon de 3m subissent 1-4 dégâts psychiques.",
    recommendedFor: ["throwzerker", "moine_bagarreur"],
    recommendedReason:
      "Les builds multi-attaques (5-6 frappes/tour) tuent fréquemment des ennemis — Abattage transforme chaque kill en AoE psychique gratuite.",
  },
  {
    id: "charm",
    name: "Charme Illithid",
    tier: "middle",
    description: "Illithid Charm",
    effect:
      "Charmez un humanoïde jusqu'à Repos Long. Utilisable en conversation pour éviter un combat.",
    recommendedFor: [],
  },
  {
    id: "repulsive_discharge",
    name: "Décharge Répulsive",
    tier: "middle",
    description: "Repulsive Discharge",
    effect:
      "Quand un ennemi vous frappe au corps à corps, il doit réussir un JdS de Force ou être repoussé de 6m. Réaction.",
    recommendedFor: ["lockadin", "gloom_assassin"],
    recommendedReason:
      "Les builds mêlée/front-line (Lockadin) et les builds d'embuscade (Assassin) bénéficient d'une réaction défensive gratuite qui contrôle le positionnement ennemi.",
  },
  {
    id: "displace",
    name: "Déplacement",
    tier: "middle",
    description: "Displace",
    effect:
      "Téléportez-vous à un emplacement visible dans un rayon de 9m. Action Bonus. Ne provoque pas d'Attaque d'Opportunité.",
    recommendedFor: [],
  },
  {
    id: "psionic_backlash",
    name: "Contrecoup Psionique",
    tier: "middle",
    description: "Psionic Backlash",
    effect:
      "Réaction : quand un ennemi lance un sort, infligez 1d4 dégâts psychiques par niveau du sort. Peut interrompre la Concentration.",
    recommendedFor: [],
  },
];

// ---------------------------------------------------------------------------
// Tier 3 — Cercle Intérieur (5 pouvoirs)
// ---------------------------------------------------------------------------

const TIER_INNER: readonly IllithidPower[] = [
  {
    id: "luck_far_realms",
    name: "Chance des Royaumes Lointains",
    tier: "inner",
    description: "Luck of the Far Realms",
    effect:
      "1×/Repos Long : Transformez un jet d'attaque réussi en COUP CRITIQUE GARANTI. Fonctionne avec Châtiment Divin.",
    recommendedFor: ["lockadin", "gloom_assassin"],
    recommendedReason:
      "Le Lockadin et l'Assassin dépendent des critiques pour doubler les dés de Châtiment/Attaque Sournoise. Un crit garanti = burst dévastateur à la demande.",
  },
  {
    id: "black_hole",
    name: "Trou Noir",
    tier: "inner",
    description: "Black Hole",
    effect:
      "Créez un vortex (rayon 6m) qui attire et ralentit toutes les créatures. Dure 1 tour. Parfait avant un AoE.",
    recommendedFor: ["barde_controleur"],
    recommendedReason:
      "Le Barde Contrôleur regroupe les ennemis en un point pour un Hypnotic Pattern ou un Fireball allié parfait. Synergie avec l'Acuité Arcanique.",
  },
  {
    id: "mind_blast",
    name: "Souffle Mental",
    tier: "inner",
    description: "Mind Blast",
    effect:
      "Cône de 9m : 6d8+30 dégâts psychiques (JdS INT pour demi). Les cibles en échec sont Étourdies 1 tour.",
    recommendedFor: [],
  },
  {
    id: "mind_sanctuary",
    name: "Sanctuaire Mental",
    tier: "inner",
    description: "Mind Sanctuary",
    effect:
      "1×/Repos Long : Jusqu'à la fin du tour, vos Actions et Actions Bonus sont interchangeables. Permet de lancer 2 sorts en un tour.",
    recommendedFor: [],
  },
  {
    id: "absorb_intellect",
    name: "Absorption d'Intellect",
    tier: "inner",
    description: "Absorb Intellect",
    effect:
      "Réduisez l'INT d'une cible de 1d4 et regagnez autant de PV × 5. Si l'INT tombe à 0, la cible meurt instantanément.",
    recommendedFor: [],
  },
];

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const ILLITHID_POWERS: readonly IllithidPower[] = [
  ...TIER_OUTER,
  ...TIER_MIDDLE,
  ...TIER_INNER,
];

export const ILLITHID_TIERS: readonly {
  id: IllithidTier;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    id: "outer",
    label: "Cercle Extérieur",
    icon: "🟣",
    description: "Pouvoirs basiques — 1 têtard chacun",
  },
  {
    id: "middle",
    label: "Cercle du Milieu",
    icon: "🔴",
    description: "Pouvoirs avancés — requiert 2+ pouvoirs du Cercle Extérieur",
  },
  {
    id: "inner",
    label: "Cercle Intérieur",
    icon: "🟠",
    description: "Pouvoirs ultimes — requiert 2+ pouvoirs du Cercle du Milieu",
  },
];

export const MAX_TADPOLES = 15;
