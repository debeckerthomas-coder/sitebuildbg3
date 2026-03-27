// ============================================================================
// Single Source of Truth — Registre Central & Moteur de Requête
// Graphe relationnel : Builds <-> Items
// ============================================================================

import type { UnifiedBuild, UnifiedItem, HydratedBuild } from "@/types/models";
import { ITEMS, getItem } from "@/data/items/items";
import { itemsBilingualV2 } from "@/data/arsenal";

// ---------------------------------------------------------------------------
// 1. Index unifié des Items (fusion ITEMS + arsenal bilingue)
// ---------------------------------------------------------------------------

function buildItemIndex(): Map<string, UnifiedItem> {
  const index = new Map<string, UnifiedItem>();

  // Source 1 : ITEMS (typed items avec mécaniques)
  for (const [key, item] of Object.entries(ITEMS)) {
    index.set(key, {
      id: item.id,
      name: item.name,
      description: item.description,
      rarity: item.rarity,
      icon: item.icon,
      acquisition: item.location,
      act: item.act,
      slot: item.slot,
      tags: item.tags,
    });
  }

  // Source 2 : Arsenal bilingue (items pas encore dans ITEMS)
  for (const item of itemsBilingualV2) {
    if (!index.has(item.id)) {
      index.set(item.id, {
        id: item.id,
        name: item.name.fr,
        description: item.description.fr,
        rarity: item.rarity,
        icon: item.icon ?? "",
        acquisition: item.acquisition?.fr ?? item.location.fr,
        act: item.act,
      });
    }
  }

  return index;
}

/** Index global de tous les items (ITEMS + arsenal), clé = item ID */
const ITEM_INDEX: Map<string, UnifiedItem> = buildItemIndex();

/** Récupère un item unifié par son ID */
export function getUnifiedItem(id: string): UnifiedItem | undefined {
  return ITEM_INDEX.get(id);
}

/** Récupère tous les items unifiés */
export function getAllUnifiedItems(): readonly UnifiedItem[] {
  return Array.from(ITEM_INDEX.values());
}

// ---------------------------------------------------------------------------
// 2. Registre des Builds — Single Source of Truth
// ---------------------------------------------------------------------------

export const buildRegistry: Record<string, UnifiedBuild> = {
  // =========================================================================
  // Gloom Assassin — Alpha Strike Tour 1
  // =========================================================================
  gloom_assassin: {
    id: "gloom_assassin",
    title: "L'Alpha Strike (Gloom Assassin)",
    class: "ranger",
    subclass: "gloom_stalker",
    role: "striker",
    coreItems: [
      "titanstring_bow",       // Arc principal — dégâts basés FOR
      "gontr_mael",            // Arbalète lourde légendaire Act 3
      "helldusk_gloves",       // Gants du Crépuscule — bonus dégâts
      "helldusk_boots",        // Bottes du Crépuscule — mobilité
      "killer_sweetheart",     // Anneau — crit garanti au premier kill
    ],
    alternativeItems: [
      "cloak_displacement",    // Cape de Déplacement — survie
      "ring_protection",       // Anneau de Protection — fallback
      "cloak_protection",      // Cape de Protection — fallback
    ],
    powerSpikes: [
      { level: 3, description: "Traqueur Sombre activé — Dread Ambusher donne une attaque bonus Tour 1 + bonus initiative" },
      { level: 5, description: "Attaque Supplémentaire + Rogue 1 — Sneak Attack commence à empiler" },
      { level: 8, description: "Assassin 3 — Assassinat garanti (crit auto sur ennemis Surpris) + Don Alerte (+5 init)" },
      { level: 11, description: "Fighter 3 Champion — Crit sur 19-20 + Action Surge = burst massif Tour 1" },
    ],
  },

  // =========================================================================
  // Sorcadin — Tank Burst avec Aura de Protection
  // =========================================================================
  sorcadin: {
    id: "sorcadin",
    title: "Le Sorcadin",
    class: "paladin",
    subclass: "vengeance",
    role: "tank",
    coreItems: [
      "baldurans_giantslayer", // Épée légendaire — double bonus FOR
      "helmet_of_balduran",    // Heaume légendaire — anti-crit + heal
      "helldusk_armour",       // Armure du Crépuscule Infernal
      "helldusk_gloves",       // Gants du Crépuscule — dégâts de feu
    ],
    alternativeItems: [
      "flail_of_ages",         // Fléau des Âges — fallback si Ansur pas vaincu
      "everburn_blade",        // Épée Flammes Éternelles — Act 1
      "fallback_greatsword",   // Épée du Chaos — fallback ultime
      "halberd_vigilance",     // Hallebarde de Vigilance — fallback
    ],
    powerSpikes: [
      { level: 2, description: "Châtiment Divin débloqué — burst potentiel dès le niveau 2" },
      { level: 5, description: "Attaque Supplémentaire — double les opportunités de Smite" },
      { level: 6, description: "Aura de Protection — +CHA aux JdS de toute l'équipe dans un rayon de 3m" },
      { level: 8, description: "Ensorceleur 2 — Métamagie (Incantation Rapide) = sort + Smite dans le même tour" },
    ],
  },

  // =========================================================================
  // Honour Paladin — Châtiment Nucléaire
  // =========================================================================
  honour_paladin: {
    id: "honour_paladin",
    title: "Paladin Honneur — Châtiment Nucléaire",
    class: "paladin",
    subclass: "vengeance",
    role: "striker",
    coreItems: [
      "baldurans_giantslayer", // Épée légendaire — double bonus FOR
      "helmet_of_balduran",    // Heaume — anti-crit + regen
      "helldusk_armour",       // Meilleure armure lourde du jeu
    ],
    alternativeItems: [
      "flail_of_ages",         // Alternative Act 2 si Ansur pas vaincu
      "fallback_greatsword",   // Épée du Chaos — fallback ultime
      "everburn_blade",        // Arme de départ Act 1
    ],
    powerSpikes: [
      { level: 2, description: "Châtiment Divin — début du burst damage" },
      { level: 4, description: "Great Weapon Master — +10 dégâts par attaque, attaque bonus sur crit/kill" },
      { level: 6, description: "Aura de Protection — buff défensif pour toute l'équipe" },
      { level: 8, description: "Multiclasse Barde — emplacements de sorts supplémentaires pour plus de Smites" },
    ],
  },

  // =========================================================================
  // Nuke Tempête — AoE Maximisée
  // =========================================================================
  nuke_tempete: {
    id: "nuke_tempete",
    title: "Le Nuke Tempête",
    class: "sorcerer",
    subclass: "storm",
    role: "striker",
    coreItems: [
      "markoheshkir",          // Bâton légendaire — sort gratuit + DD bonus
      "etincelle_electrique",  // Arme foudre Act 2
      "casque_acuite_arcanique", // Cumul debuff sur JdS ennemis
      "ring_mystic_scoundrel", // Synergie Acuité Arcanique
    ],
    alternativeItems: [
      "robe_de_la_trame",      // Robe du Tisseur de Sorts — DD bonus
      "ring_protection",       // Anneau de Protection — survie
    ],
    powerSpikes: [
      { level: 2, description: "Clerc Tempête 2 — Conduit Divin : maximise les dés foudre/tonnerre 1×/court repos" },
      { level: 6, description: "Ensorceleur 4 — Métamagie (Quickened Spell) + premier gros sort AoE" },
      { level: 8, description: "Ensorceleur 6 — Sort gratuit via Lignée Draconique quand dégâts du type choisi" },
      { level: 12, description: "Ensorceleur 10 — Sorts de niveau 5 + Markoheshkir = Appel de la Foudre maximisé dévastateur" },
    ],
  },

  // =========================================================================
  // Throwzerker — Lanceur Fou
  // =========================================================================
  throwzerker: {
    id: "throwzerker",
    title: "Le Lanceur Fou (Throwzerker)",
    class: "barbarian",
    subclass: "berserker",
    role: "striker",
    coreItems: [
      "nyrulna",               // Trident légendaire de retour
      "helldusk_armour",       // Armure Infernale — tanking
      "gauntlets_hill_giant",  // Gants d'Habilité — FOR 23
      "helldusk_gloves",       // Gants du Crépuscule — bonus dégâts
    ],
    alternativeItems: [
      "halberd_vigilance",     // Hallebarde — alternative melee
      "adamantine_splint",     // Clibanion Adamantine — fallback armure
      "everburn_blade",        // Arme de départ
    ],
    powerSpikes: [
      { level: 3, description: "Berserker — Frénésie = attaque bonus supplémentaire chaque tour en Rage" },
      { level: 4, description: "Bagarreur des Tavernes — double le mod FOR aux jets d'attaque ET dégâts de lancer" },
      { level: 5, description: "Attaque Supplémentaire + multiclasse Rogue — Sneak Attack + double Action Bonus (Voleur 3)" },
      { level: 9, description: "Champion Fighter 3 — Crit sur 19-20 + Action Surge = 5+ lancers en un tour" },
    ],
  },
};

// ---------------------------------------------------------------------------
// 3. API de requête — Accès au registre
// ---------------------------------------------------------------------------

/** Récupère un build par son ID */
export function getRegistryBuild(id: string): UnifiedBuild | undefined {
  return buildRegistry[id];
}

/** Liste tous les builds du registre */
export function getAllRegistryBuilds(): readonly UnifiedBuild[] {
  return Object.values(buildRegistry);
}

// ---------------------------------------------------------------------------
// 4. Moteur de requête — getBuildWithItems (hydratation)
// ---------------------------------------------------------------------------

/**
 * Retourne un Build avec ses objets peuplés (core + alternatives).
 * Utilise l'index unifié (ITEMS + arsenal) pour résoudre les IDs.
 */
export function getBuildWithItems(buildId: string): HydratedBuild | undefined {
  const build = buildRegistry[buildId];
  if (!build) return undefined;

  const coreItemsFull: UnifiedItem[] = [];
  for (const itemId of build.coreItems) {
    const item = ITEM_INDEX.get(itemId);
    if (item) coreItemsFull.push(item);
  }

  const alternativeItemsFull: UnifiedItem[] = [];
  for (const itemId of build.alternativeItems) {
    const item = ITEM_INDEX.get(itemId);
    if (item) alternativeItemsFull.push(item);
  }

  return {
    ...build,
    coreItemsFull,
    alternativeItemsFull,
  };
}

/**
 * Trouve tous les builds qui utilisent un item donné (core ou alternative).
 * Utile pour un futur Party Analyzer.
 */
export function getBuildsUsingItem(itemId: string): readonly UnifiedBuild[] {
  return Object.values(buildRegistry).filter(
    (build) =>
      build.coreItems.includes(itemId) ||
      build.alternativeItems.includes(itemId),
  );
}
