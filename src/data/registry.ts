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

  // Source 1 : ITEMS (typed items avec mécaniques — désormais bilingues)
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
        name: item.name,
        description: item.description,
        rarity: item.rarity,
        icon: item.icon ?? "",
        acquisition: item.acquisition ?? item.location,
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
    title: { fr: "L'Alpha Strike (Gloom Assassin)", en: "The Alpha Strike (Gloom Assassin)" },
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
      { level: 8, description: "Assassin 3 — Assassinat garanti (auto-hit + auto-crit sur ennemis Surpris, tous les dés doublés) + Don Alerte (+5 init)" },
      { level: 11, description: "Fighter 3 Champion — Crit sur 19-20 + Action Surge = burst massif Tour 1" },
    ],
  },

  // =========================================================================
  // Sorcadin — Tank Burst avec Aura de Protection
  // =========================================================================
  sorcadin: {
    id: "sorcadin",
    title: { fr: "Le Sorcadin", en: "The Sorcadin" },
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
    title: { fr: "Paladin Honneur — Châtiment Nucléaire", en: "Honour Paladin — Nuclear Smite" },
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
    title: { fr: "Le Nuke Tempête", en: "The Storm Nuke" },
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
    title: { fr: "Le Lanceur Fou (Throwzerker)", en: "The Throwzerker" },
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
  // =========================================================================
  // Legacy Builds — Squelettes V3 (contenu éditorial à compléter)
  // =========================================================================
  lockadin: {
    id: "lockadin",
    title: { fr: "Lockadin", en: "Lockadin" },
    class: "paladin",
    subclass: "oathbreaker",
    role: "tank",
    coreItems: [
      "helmet_of_balduran",    // Anti-crit + regen 2 PV/tour — le casque tank ultime
      "helldusk_armour",       // CA 21 + résistance feu + réduction dégâts 3
      "helldusk_boots",        // Téléportation infernale + immunité déplacement forcé
      "legacy_masters",        // +2 attaque/dégâts sur toutes les attaques d'arme
      "killer_sweetheart",     // Crit auto après un kill — synergie Smite dévastateur
    ],
    alternativeItems: [
      "armor_persistence",     // CA 20 + résistances physiques — alt si pas Raphaël
      "adamantine_splint",     // Meilleure armure Acte 1 — anti-crit
      "ring_of_free_action",   // Immunité Ralentissement/Paralysie — anti-CC
      "sword_of_chaos",        // Auto-heal 1d6/coup — synergie Oathbreaker survie
    ],
    powerSpikes: [
      { level: 2, description: "Châtiment Divin débloqué — burst potentiel dès le niveau 2" },
      { level: 5, description: "Attaque Supplémentaire — double les opportunités de Smite" },
      { level: 7, description: "Aura du Parjure — +CHA dégâts nécrotiques à toute l'équipe en mêlée" },
      { level: 9, description: "Warlock 2 — Eldritch Blast + Agonizing Blast + emplacements récupérés sur repos court pour Smites infinis" },
    ],
  },

  bardadin: {
    id: "bardadin",
    title: { fr: "Bardadin", en: "Bardadin" },
    class: "paladin",
    subclass: "vengeance",
    role: "striker",
    coreItems: [
      "baldurans_giantslayer", // Épée légendaire — double bonus FOR + Forme de Géant
      "casque_acuite_arcanique", // Acuité Arcanique : -1 JdS/attaque — rend les sorts imparables
      "helldusk_armour",       // CA 21 + réduction dégâts — survie en mêlée
      "helldusk_gloves",       // +1d6 feu/attaque + +1 DD sorts — synergie Smite+sorts
      "ring_mystic_scoundrel", // Sort d'enchantement en Action Bonus après attaque — Hold Person gratuit
    ],
    alternativeItems: [
      "halberd_vigilance",     // Initiative + immunité Surprise — agir en premier
      "killer_sweetheart",     // Crit auto → Smite maximisé
      "everburn_blade",        // Arme de progression Acte 1 — +1d4 feu
    ],
    powerSpikes: [
      { level: 2, description: "Châtiment Divin — burst immédiat sur chaque attaque" },
      { level: 5, description: "Attaque Supplémentaire — 2 attaques = 2 Smites + 2 stacks Acuité Arcanique" },
      { level: 6, description: "Aura de Protection — +CHA aux JdS de toute l'équipe dans 3m" },
      { level: 8, description: "Barde 2 — Jack of All Trades + emplacements de sorts supplémentaires pour Smites" },
    ],
  },

  fire_sorlock: {
    id: "fire_sorlock",
    title: { fr: "Fire Sorlock", en: "Fire Sorlock" },
    class: "warlock",
    subclass: "fiend",
    role: "striker",
    coreItems: [
      "markoheshkir",          // Bâton légendaire — sort gratuit + +1 DD sorts
      "casque_acuite_arcanique", // Chaque Eldritch Blast empile Acuité Arcanique — JdS ennemis écrasés
      "helldusk_gloves",       // +1 DD sorts + +1d6 feu sur attaques — synergie feu totale
      "robe_de_la_trame",      // +1 DD sorts + CA — meilleure robe pour caster pur
      "amulet_greater_health", // CON 23 — concentration incassable + PV massifs
    ],
    alternativeItems: [
      "cloak_displacement",    // Désavantage sur attaques ennemies — survie caster fragile
      "cloak_protection",      // +1 CA/JdS — survie budget
      "ring_protection",       // +1 CA/JdS — cumul défensif
    ],
    powerSpikes: [
      { level: 2, description: "Warlock 2 — Agonizing Blast (+CHA aux dégâts) + Repelling Blast (recul 4.5m)" },
      { level: 5, description: "Sorcerer 3 — Métamagie Incantation Rapide : double Eldritch Blast = 4 rayons/tour" },
      { level: 8, description: "Sorcerer 6 — Affinité Élémentaire Draconique : +CHA dégâts de feu sur CHAQUE rayon" },
    ],
  },

  moine_bagarreur: {
    id: "moine_bagarreur",
    title: { fr: "Moine Bagarreur", en: "Tavern Brawler Monk" },
    class: "monk",
    subclass: "open_hand",
    role: "striker",
    coreItems: [
      "gauntlets_hill_giant",  // FOR 23 — double mod FOR via Tavern Brawler = +12 dégâts/coup
      "helldusk_boots",        // Téléportation infernale — repositionnement gratuit en Action Bonus
      "helmet_of_balduran",    // Anti-crit + regen — survie en mêlée
      "ring_risky",            // Avantage permanent sur toutes les attaques — DPS brut maximal
    ],
    alternativeItems: [
      "boots_of_speed",        // Vitesse doublée — alt mobilité si Helldusk Boots prises
      "cloak_displacement",    // Désavantage sur attaques ennemies — survie moine
      "armor_moonbasking",     // +40 PV temporaires — énorme coussin de survie
    ],
    powerSpikes: [
      { level: 1, description: "Tavern Brawler — double le mod FOR aux jets d'attaque ET dégâts à mains nues" },
      { level: 3, description: "Main Ouverte — Rafale de Coups améliorée : repousser, mettre à terre ou étourdir" },
      { level: 5, description: "Attaque Supplémentaire + Frappe Étourdissante — 3-4 attaques/tour avec CC intégré" },
      { level: 9, description: "Dé d'arts martiaux amélioré + Ki étendu — dégâts et endurance au combat maximaux" },
    ],
  },

  barde_controleur: {
    id: "barde_controleur",
    title: { fr: "Barde Contrôleur", en: "Controller Bard" },
    class: "bard",
    subclass: "lore",
    role: "controller",
    coreItems: [
      "casque_acuite_arcanique", // Empile -JdS par attaque — rend Hold Person/Hypnotic Pattern imparables
      "ring_mystic_scoundrel", // Sort enchantement en Action Bonus après attaque — double sort/tour
      "markoheshkir",          // +1 DD sorts + sort gratuit — meilleur bâton du jeu
      "amulet_greater_health", // CON 23 — concentration incassable pour sorts de contrôle
    ],
    alternativeItems: [
      "cloak_displacement",    // Survie caster — Désavantage sur les attaques reçues
      "ring_protection",       // +1 CA/JdS — défense passive
      "boots_striding",        // Vitesse +3m + immunité terrain difficile en concentration
      "armor_moonbasking",     // +40 PV temporaires — survie massive
    ],
    powerSpikes: [
      { level: 3, description: "Collège du Savoir — Mots Cinglants : réaction pour réduire jet d'attaque/dégâts/compétence ennemi" },
      { level: 5, description: "Font d'Inspiration + sorts niv. 3 : Motif Hypnotique, Peur — CC de zone dévastateur" },
      { level: 6, description: "Secrets Magiques Supplémentaires — voler Hold Person, Contresort de n'importe quelle classe" },
    ],
  },

  clerc_irradiation: {
    id: "clerc_irradiation",
    title: { fr: "Clerc Irradiation", en: "Radiance Cleric" },
    class: "cleric",
    subclass: "light",
    role: "support",
    coreItems: [
      "sang_de_lathandre",     // Masse +3 légendaire — AoE radiant + auto-résurrection si PV tombent à 0
      "shield_devotion",       // +2 CA + sort Aide gratuit — buff PV max pour 3 alliés
      "helldusk_gloves",       // +1 DD sorts + +1d6 feu — synergie parfaite Domaine de la Lumière
      "adamantine_splint",     // CA 18 + anti-crit + réduction dégâts — meilleure armure Acte 1-2
    ],
    alternativeItems: [
      "devotees_mace",         // Masse +3 alt — +CHA aux dégâts, AoE éblouissante
      "ring_protection",       // +1 CA/JdS — défense passive
      "helmet_of_balduran",    // Anti-crit + regen — si disponible dans le groupe
      "armor_moonbasking",     // Armure intermédiaire + 40 PV temp — option survie
    ],
    powerSpikes: [
      { level: 1, description: "Domaine de la Lumière — Lueur Protectrice (réaction : Désavantage sur attaque ennemie) + Feu des Fées/Mains Brûlantes" },
      { level: 3, description: "Sorts de domaine : Sphère de Feu + Rayon Brûlant — DPS AoE feu soutenu" },
      { level: 5, description: "Boule de Feu (sort de domaine) + emplacements niv. 3 — le spike AoE le plus dévastateur du jeu" },
      { level: 8, description: "Incantation Puissante — ajout mod SAG aux dégâts de sorts mineurs + Gardiens Spirituels dévastateurs" },
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
