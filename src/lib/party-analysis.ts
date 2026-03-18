// ============================================================================
// Party Analysis Engine — Synergie de Groupe & Répartition des Reliques
// ============================================================================

import { getBuildTierS, type BuildTierS } from "@/data/builds/tier-s";

// ---------------------------------------------------------------------------
// Build Classification Tags
// ---------------------------------------------------------------------------

type BuildTag =
  | "str_based"
  | "dex_based"
  | "cha_caster"
  | "wis_caster"
  | "int_caster"
  | "caster"
  | "martial"
  | "melee_dps"
  | "ranged_dps"
  | "wants_markoheshkir"
  | "wants_mystic_scoundrel"
  | "wants_giantslayer"
  | "wants_helldusk"
  | "wants_risky_ring"
  | "wants_potent_robe"
  | "uses_elixir_str";

const BUILD_TAGS: Record<string, readonly BuildTag[]> = {
  moine_bagarreur: ["str_based", "martial", "melee_dps", "uses_elixir_str"],
  barde_controleur: ["cha_caster", "caster", "ranged_dps", "wants_markoheshkir", "wants_mystic_scoundrel"],
  throwzerker: ["str_based", "martial", "ranged_dps", "uses_elixir_str"],
  clerc_irradiation: ["wis_caster", "caster", "martial"],
  nuke_tempete: ["cha_caster", "caster", "ranged_dps", "wants_markoheshkir", "wants_potent_robe"],
  bardadin: ["str_based", "cha_caster", "martial", "melee_dps", "wants_giantslayer", "wants_helldusk"],
  sorcadin: ["str_based", "cha_caster", "martial", "melee_dps", "wants_giantslayer", "wants_helldusk"],
  fire_sorlock: ["cha_caster", "caster", "ranged_dps", "wants_markoheshkir", "wants_potent_robe"],
  gloom_assassin: ["dex_based", "martial", "ranged_dps", "wants_risky_ring", "wants_mystic_scoundrel"],
  lockadin: ["cha_caster", "martial", "melee_dps", "wants_giantslayer", "wants_helldusk", "wants_risky_ring"],
};

function getTags(buildId: string): readonly BuildTag[] {
  return BUILD_TAGS[buildId] ?? [];
}

function hasTag(buildId: string, tag: BuildTag): boolean {
  return getTags(buildId).includes(tag);
}

// ---------------------------------------------------------------------------
// Relic Recommendations
// ---------------------------------------------------------------------------

export interface RelicRecommendation {
  readonly relic: string;
  readonly icon: string;
  readonly description: string;
  readonly recommendedTo: string | null; // build ID or null
  readonly recommendedName: string;
  readonly reasoning: string;
}

export function analyzeRelics(partyIds: string[]): RelicRecommendation[] {
  const builds = partyIds.map((id) => getBuildTierS(id)).filter(Boolean) as BuildTierS[];
  if (builds.length < 2) return [];

  const recommendations: RelicRecommendation[] = [];

  // 1. Chevelure de Tante Ethel (+1 stat)
  const primaryCaster = builds.find(
    (b) => hasTag(b.id, "cha_caster") || hasTag(b.id, "wis_caster")
  );
  const ethel: RelicRecommendation = {
    relic: "Chevelure de Tante Ethel",
    icon: "🧙‍♀️",
    description: "+1 à une caractéristique (permanent). Objectif : atteindre 18 dans la stat principale au niveau 4.",
    recommendedTo: primaryCaster?.id ?? null,
    recommendedName: primaryCaster?.name ?? "Aucun lanceur de sorts",
    reasoning: primaryCaster
      ? `${primaryCaster.name} bénéficie le plus du +1 pour atteindre un palier de stat impair→pair (ex: 17→18 CHA/SAG). Cela augmente directement le DD de sorts.`
      : "Aucun lanceur de sorts dans le groupe — donnez le bonus au personnage avec la stat impaire la plus haute.",
  };
  recommendations.push(ethel);

  // 2. Potion d'Araj (+2 Force permanente)
  const strBuild = builds.find((b) => hasTag(b.id, "str_based") && !hasTag(b.id, "uses_elixir_str"))
    ?? builds.find((b) => hasTag(b.id, "str_based"));
  const araj: RelicRecommendation = {
    relic: "Potion d'Araj l'Oblodra",
    icon: "🧪",
    description: "+2 Force permanent (dépasse le cap de 20). Exige qu'Astarion morde Araj.",
    recommendedTo: strBuild?.id ?? null,
    recommendedName: strBuild?.name ?? "Aucun build basé Force",
    reasoning: strBuild
      ? hasTag(strBuild.id, "uses_elixir_str")
        ? `${strBuild.name} utilise un Élixir de Force, donc le +2 permanent est moins impactant. Mais il reste le meilleur receveur car les autres n'utilisent pas la Force.`
        : `${strBuild.name} est basé sur la Force et n'utilise PAS d'Élixir de Force — le +2 permanent est absolument critique.`
      : "Aucun build basé sur la Force dans le groupe — gardez la potion pour un éventuel respec.",
  };
  recommendations.push(araj);

  // 3. Miroir de la Perte (+2 stat, coût -2 autre stat)
  const dexBuild = builds.find((b) => hasTag(b.id, "dex_based"));
  const chaBuild = builds.find((b) => hasTag(b.id, "cha_caster") && hasTag(b.id, "melee_dps"));
  const mirrorTarget = dexBuild ?? chaBuild ?? primaryCaster;
  const mirror: RelicRecommendation = {
    relic: "Miroir de la Perte",
    icon: "🪞",
    description: "+2 à une caractéristique / -2 à une autre (permanent). Sacrifice d'une stat faible pour maximiser la stat principale.",
    recommendedTo: mirrorTarget?.id ?? null,
    recommendedName: mirrorTarget?.name ?? "Aucune recommandation",
    reasoning: mirrorTarget
      ? dexBuild && mirrorTarget.id === dexBuild.id
        ? `${mirrorTarget.name} est basé sur la DEX — le Miroir pousse la DEX à 22, augmentant toucher, dégâts, CA et initiative. Sacrifiez la Force ou l'Intelligence.`
        : `${mirrorTarget.name} bénéficie du +2 en CHA/STR pour maximiser ses dégâts. Sacrifiez l'INT ou la SAG (stat inutile pour ce build).`
      : "Aucun candidat idéal — donnez-le au DPS principal pour maximiser sa stat d'attaque.",
  };
  recommendations.push(mirror);

  return recommendations;
}

// ---------------------------------------------------------------------------
// Loot Conflict Detection
// ---------------------------------------------------------------------------

export interface LootConflict {
  readonly severity: "warning" | "critical";
  readonly icon: string;
  readonly title: string;
  readonly builds: readonly string[]; // build names involved
  readonly description: string;
  readonly resolution: string;
}

export function detectLootConflicts(partyIds: string[]): LootConflict[] {
  const builds = partyIds.map((id) => getBuildTierS(id)).filter(Boolean) as BuildTierS[];
  if (builds.length < 2) return [];

  const conflicts: LootConflict[] = [];

  // Markoheshkir conflict
  const markoheshkirWanters = builds.filter((b) => hasTag(b.id, "wants_markoheshkir"));
  if (markoheshkirWanters.length >= 2) {
    conflicts.push({
      severity: "critical",
      icon: "🔮",
      title: "Conflit : Markoheshkir (Bâton Légendaire)",
      builds: markoheshkirWanters.map((b) => b.name),
      description: `${markoheshkirWanters.map((b) => b.name).join(" ET ")} veulent tous le Markoheshkir. Il n'en existe qu'un seul.`,
      resolution:
        "Donnez le Markoheshkir au lanceur avec le plus haut CHA. L'autre utilisera le Bâton du Mage de Bataille +2 (marchand Sous-Cité) ou le Bâton de Tonnerres et Éclairs +2.",
    });
  }

  // Giantslayer conflict
  const giantslayerWanters = builds.filter((b) => hasTag(b.id, "wants_giantslayer"));
  if (giantslayerWanters.length >= 2) {
    conflicts.push({
      severity: "critical",
      icon: "🗡️",
      title: "Conflit : Pourfendeuse de Géant de Baldur",
      builds: giantslayerWanters.map((b) => b.name),
      description: `${giantslayerWanters.map((b) => b.name).join(" ET ")} veulent la Pourfendeuse. Elle est unique.`,
      resolution:
        "Donnez la Pourfendeuse au personnage avec la Force la plus haute (surtout avec Élixir de Géant des Nuages). L'autre utilisera la Hallebarde de Vigilance ou l'Épée du Chaos.",
    });
  }

  // Helldusk Armor conflict
  const hellduskWanters = builds.filter((b) => hasTag(b.id, "wants_helldusk"));
  if (hellduskWanters.length >= 2) {
    conflicts.push({
      severity: "critical",
      icon: "🛡️",
      title: "Conflit : Armure Infernale (Helldusk)",
      builds: hellduskWanters.map((b) => b.name),
      description: `${hellduskWanters.map((b) => b.name).join(" ET ")} veulent l'Armure Infernale. Une seule existe.`,
      resolution:
        "Donnez l'Armure Infernale au tank principal (Paladin > Barbare). L'autre utilisera l'Armure de la Persévérance ou le Clibanion en Adamantine.",
    });
  }

  // Mystic Scoundrel Ring conflict
  const mysticWanters = builds.filter((b) => hasTag(b.id, "wants_mystic_scoundrel"));
  if (mysticWanters.length >= 2) {
    conflicts.push({
      severity: "warning",
      icon: "💍",
      title: "Conflit : Anneau du Gredin Mystique",
      builds: mysticWanters.map((b) => b.name),
      description: `${mysticWanters.map((b) => b.name).join(" ET ")} se disputent l'Anneau du Gredin Mystique.`,
      resolution:
        "Donnez l'Anneau au Barde Contrôleur (synergie avec Casque d'Acuité). L'Assassin bénéficiera davantage de l'Anneau de Protection ou de l'Anneau Risqué.",
    });
  }

  // Risky Ring conflict
  const riskyWanters = builds.filter((b) => hasTag(b.id, "wants_risky_ring"));
  if (riskyWanters.length >= 2) {
    conflicts.push({
      severity: "warning",
      icon: "🎰",
      title: "Conflit : Anneau Risqué",
      builds: riskyWanters.map((b) => b.name),
      description: `${riskyWanters.map((b) => b.name).join(" ET ")} veulent l'Anneau Risqué (Avantage à toutes les attaques).`,
      resolution:
        "Donnez l'Anneau Risqué au Lockadin (synergie critique avec Châtiment Divin). L'Assassin a déjà l'Avantage via Assassinat + Traqueur Sombre.",
    });
  }

  // Potent Robe conflict
  const potentRobeWanters = builds.filter((b) => hasTag(b.id, "wants_potent_robe"));
  if (potentRobeWanters.length >= 2) {
    conflicts.push({
      severity: "warning",
      icon: "👘",
      title: "Conflit : Robe Puissante (Potent Robe)",
      builds: potentRobeWanters.map((b) => b.name),
      description: `${potentRobeWanters.map((b) => b.name).join(" ET ")} veulent la Robe Puissante (+CHA aux sorts mineurs).`,
      resolution:
        "Donnez la Robe au Fire Sorlock (Décharge Occulte bénéficie du +CHA×3 rayons). Le Nuke Tempête utilisera la Robe du Tisseur de Sorts.",
    });
  }

  // Generic: two casters competing for spell slots / rest resources
  const casters = builds.filter((b) => hasTag(b.id, "caster"));
  if (casters.length >= 3) {
    conflicts.push({
      severity: "warning",
      icon: "⚠️",
      title: "Déséquilibre : Trop de lanceurs de sorts",
      builds: casters.map((b) => b.name),
      description: `Votre groupe contient ${casters.length} lanceurs de sorts. Les emplacements de sorts sont une ressource partagée (repos) et plusieurs objets uniques de caster sont en conflit.`,
      resolution:
        "Remplacez l'un des casters par un martial (Throwzerker, Moine, ou Assassin) pour diversifier les types de dégâts et réduire la compétition sur le loot.",
    });
  }

  return conflicts;
}
