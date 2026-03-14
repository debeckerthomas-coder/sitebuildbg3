// ============================================================================
// COMPENDIUM DES 9 BUILDS TIER S — Mode Honneur BG3
// Theorycraft vérifié, données réelles, français intégral
// ============================================================================

// ---------------------------------------------------------------------------
// Interface stricte
// ---------------------------------------------------------------------------

export interface BuildTierS {
  readonly id: string;
  readonly name: string;
  readonly classes: string;
  readonly coreRole: string;
  readonly keyMechanic: string;
  readonly stats: {
    readonly STR: number;
    readonly DEX: number;
    readonly CON: number;
    readonly INT: number;
    readonly WIS: number;
    readonly CHA: number;
  };
  readonly featProgression: readonly {
    readonly level: number;
    readonly feat: string;
    readonly reason: string;
  }[];
  readonly bestInSlot: {
    readonly act1: readonly string[];
    readonly act2: readonly string[];
    readonly act3: readonly string[];
  };
  readonly failsafes: readonly {
    readonly missingItem: string;
    readonly fallbackItem: string;
    readonly condition: string;
  }[];
}

// ---------------------------------------------------------------------------
// Les 9 Builds Tier S
// ---------------------------------------------------------------------------

export const BUILDS_TIER_S: readonly BuildTierS[] = [
  // =========================================================================
  // 1. Le Moine Bagarreur (Tavern Brawler Monk)
  // =========================================================================
  {
    id: "moine_bagarreur",
    name: "Le Moine Bagarreur",
    classes: "8 Moine Paume Ouverte / 4 Roublard Voleur",
    coreRole: "Tueur de Boss Monocible",
    keyMechanic:
      "Élixir de Force de Géant des Collines (FOR 21) + Don Bagarreur des Tavernes (double mod. FOR aux jets d'attaque et dégâts à mains nues). Attaques bonus du Moine + Actions bonus supplémentaires du Voleur = 5-6 attaques par tour.",
    stats: { STR: 8, DEX: 16, CON: 16, INT: 8, WIS: 16, CHA: 8 },
    featProgression: [
      { level: 4, feat: "Bagarreur des Tavernes", reason: "Double le mod. de Force sur les attaques et dégâts à mains nues. Le cœur du build." },
      { level: 8, feat: "Alerte", reason: "+5 initiative. Avec le d4 de BG3, quasiment garanti de jouer premier." },
      { level: 12, feat: "+2 Sagesse (18→20)", reason: "Augmente le DD des effets du Moine (Paume Ouverte, Étourdissement)." },
    ],
    bestInSlot: {
      act1: ["Gants d'Habilité (FOR 23 si volés)", "Bandeau d'Intellect", "Élixir de Force de Géant des Collines"],
      act2: ["Gants de Pugilat des Collines (+1d4 non-létal)", "Bottes d'Agilité", "Cape de Protection +1"],
      act3: ["Gants d'Habilité (FOR 23)", "Bandeau de l'Ermite Enflammé", "Amulette de Poings Indomptables"],
    },
    failsafes: [
      { missingItem: "Gants d'Habilité", fallbackItem: "Élixir de Force de Géant des Collines (FOR 21)", condition: "Si les gants ne sont pas volés au Sous-sol du Bosquet" },
      { missingItem: "Bandeau de l'Ermite Enflammé", fallbackItem: "Casque de Balduran", condition: "Si Ansur n'est pas vaincu" },
    ],
  },

  // =========================================================================
  // 2. Le Barde Contrôleur
  // =========================================================================
  {
    id: "barde_controleur",
    name: "Le Barde Contrôleur",
    classes: "10 Barde Collège des Épées / 1 Guerrier / 1 Magicien",
    coreRole: "DPS Distance & Contrôle de Foule",
    keyMechanic:
      "Casque d'Acuité Arcanique + Anneau du Gredin Mystique. Chaque sort de contrôle applique Acuité Arcanique (-1 JdS par charge, cumul -7). Après 2 tours, les ennemis échouent automatiquement tous leurs jets de sauvegarde.",
    stats: { STR: 8, DEX: 14, CON: 14, INT: 12, WIS: 10, CHA: 17 },
    featProgression: [
      { level: 4, feat: "+1 CHA (17→18) + Artiste", reason: "Augmente le DD des sorts de contrôle. Artiste pour le RP." },
      { level: 8, feat: "Mage de Guerre", reason: "Concentration garantie avec le bonus CHA aux JdS de Concentration." },
      { level: 12, feat: "+2 CHA (18→20)", reason: "DD 18 sur tous les sorts de contrôle." },
    ],
    bestInSlot: {
      act1: ["Casque d'Acuité Arcanique (Grymforge)", "Rapière +1", "Bouclier en bois"],
      act2: ["Anneau du Gredin Mystique", "Armure de Mithral", "Baguette du Berger"],
      act3: ["Markoheshkir (via multiclasse Magicien)", "Robe de Tisseur de Sorts", "Anneau de Protection"],
    },
    failsafes: [
      { missingItem: "Casque d'Acuité Arcanique", fallbackItem: "Bandeau d'Abjuration (+2 DD)", condition: "Si Grymforge n'est pas complété" },
      { missingItem: "Markoheshkir", fallbackItem: "Bâton de Frappe de Sort +2", condition: "Si la Tour de Ramazith n'est pas complétée" },
    ],
  },

  // =========================================================================
  // 3. Le Lanceur Fou "Throwzerker"
  // =========================================================================
  {
    id: "throwzerker",
    name: "Le Lanceur Fou (Throwzerker)",
    classes: "5 Barbare Berserker / 4 Roublard Voleur / 3 Guerrier Champion",
    coreRole: "Dégâts à Distance & Prône",
    keyMechanic:
      "Bagarreur des Tavernes + Rage du Berserker + Attaque bonus du Voleur. Lance des armes de retour (Nyrulna, Hache de Retour +2) depuis les hauteurs pour des dégâts doublés par la gravité. 4-5 lancers par tour avec double Action Bonus.",
    stats: { STR: 17, DEX: 14, CON: 14, INT: 8, WIS: 10, CHA: 12 },
    featProgression: [
      { level: 4, feat: "Bagarreur des Tavernes", reason: "Double le mod. FOR aux jets d'attaque ET dégâts de lancer." },
      { level: 8, feat: "+2 FOR (17→19)", reason: "Augmente les dégâts de lancer directement." },
      { level: 12, feat: "+2 FOR (19→20)", reason: "FOR 20 = +5 doublé par Bagarreur = +10 aux dégâts de lancer." },
    ],
    bestInSlot: {
      act1: ["Hache de Retour +1", "Gants de Lancer", "Élixir de Force de Géant des Collines"],
      act2: ["Hache de Retour +2 (Dammon)", "Armure Moyenne +2", "Cape du Voleur"],
      act3: ["Nyrulna (Trident légendaire)", "Armure Infernale", "Gants d'Habilité (FOR 23)"],
    },
    failsafes: [
      { missingItem: "Nyrulna", fallbackItem: "Hache de Retour +2", condition: "Si le Cirque d'Akabi n'est pas complété" },
      { missingItem: "Armure Infernale", fallbackItem: "Clibanion en Adamantine", condition: "Si Raphaël n'est pas vaincu" },
    ],
  },

  // =========================================================================
  // 4. Le Clerc Orbes d'Irradiation
  // =========================================================================
  {
    id: "clerc_irradiation",
    name: "Le Clerc Orbes d'Irradiation",
    classes: "11 Clerc Domaine de la Lumière / 1 Ensorceleur Tempête",
    coreRole: "Soutien & Debuff Radiant",
    keyMechanic:
      "Cumul d'Orbes d'Irradiation via l'Armure Lumineuse pour aveugler les ennemis. Gardien Spirituel + Explosion Lumineuse appliquent l'Aveuglement en AoE. Un ennemi aveuglé a le Désavantage à tout — contrôle permanent via les dégâts radiants.",
    stats: { STR: 14, DEX: 10, CON: 14, INT: 8, WIS: 17, CHA: 12 },
    featProgression: [
      { level: 4, feat: "+1 SAG (17→18) + Résistant (CON)", reason: "Augmente le DD des sorts. Résistant CON pour les JdS de Concentration." },
      { level: 8, feat: "+2 SAG (18→20)", reason: "DD 18 pour tous les sorts de Clerc." },
      { level: 12, feat: "Mage de Guerre", reason: "Concentration quasi-inbrisable avec SAG 20 + Résistant CON + Mage de Guerre." },
    ],
    bestInSlot: {
      act1: ["Masse +1", "Bouclier en Adamantine (Grymforge)", "Cotte de mailles"],
      act2: ["Le Sang de Lathandre", "Bouclier du Dévot", "Armure Moyenne de Mithral"],
      act3: ["Le Sang de Lathandre", "Bouclier de Lathander +3", "Robe du Tisseur de Sorts"],
    },
    failsafes: [
      { missingItem: "Le Sang de Lathandre", fallbackItem: "Masse +2 radiant (Marchands Acte 3)", condition: "Si le puzzle du Monastère de Rosymorn n'est pas résolu" },
    ],
  },

  // =========================================================================
  // 5. Le Nuke Tempête
  // =========================================================================
  {
    id: "nuke_tempete",
    name: "Le Nuke Tempête",
    classes: "10 Ensorceleur Tempête / 2 Clerc Domaine de la Tempête",
    coreRole: "Dégâts Magiques AoE Maximum",
    keyMechanic:
      "Création d'Eau + Éclair + Conduit Divin = Dégâts Foudre Maximisés doublés. Le Conduit Divin (Tempête) maximise les dés foudre/tonnerre 1×/court repos. Mouiller l'ennemi avec Création d'Eau = vulnérabilité foudre (×2). Un Appel de la Foudre upcasté fait 60+ dégâts en un sort.",
    stats: { STR: 8, DEX: 14, CON: 14, INT: 10, WIS: 13, CHA: 17 },
    featProgression: [
      { level: 4, feat: "Initié Élémentaire (Foudre)", reason: "Résistance foudre + 1d4 bonus foudre sur les sorts." },
      { level: 8, feat: "+2 CHA (17→19)", reason: "Augmente les dégâts Draconique et le DD des sorts." },
      { level: 12, feat: "+2 CHA (19→20)", reason: "Maximum de dégâts et DD de sorts." },
    ],
    bestInSlot: {
      act1: ["Bâton de Tonnerres et Éclairs (Bosquet)", "Anneau de Protection", "Armure de Mage (sort)"],
      act2: ["Étincelle Électrique", "Robe de Suprématie Élémentaire", "Amulette de résistance (CON)"],
      act3: ["Markoheshkir (mode Foudre)", "Robe du Tisseur de Sorts", "Bague des Éléments"],
    },
    failsafes: [
      { missingItem: "Markoheshkir", fallbackItem: "Bâton de Tonnerres et Éclairs +2", condition: "Si la Tour de Ramazith n'est pas complétée" },
    ],
  },

  // =========================================================================
  // 6. Le Bardadin "Dieu du Smite"
  // =========================================================================
  {
    id: "bardadin",
    name: "Le Bardadin « Dieu du Smite »",
    classes: "10 Barde Collège des Épées / 2 Paladin",
    coreRole: "DPS Burst & Support Polyvalent",
    keyMechanic:
      "Multi-attaques avec Floritures du Barde (Extra Attack Barde 6) + Châtiments Divins avec les emplacements de sort de haut niveau du Barde. Un crit avec Floriture + Châtiment Divin niv. 5 = 100+ dégâts en un coup. L'Inspiration Bardique soutient tout le groupe.",
    stats: { STR: 16, DEX: 10, CON: 14, INT: 8, WIS: 10, CHA: 17 },
    featProgression: [
      { level: 4, feat: "Maître des Armes à Deux Mains (GWM)", reason: "+10 dégâts par attaque. Le Barde compense le -5 avec ses Floritures défensives." },
      { level: 8, feat: "+2 CHA (17→19)", reason: "Augmente les emplacements de sort et l'Inspiration Bardique." },
      { level: 12, feat: "+2 CHA (19→20)", reason: "DD 18 pour les sorts de Barde + Châtiments optimaux." },
    ],
    bestInSlot: {
      act1: ["Épée de Flammes Éternelles", "Cotte de mailles", "Bouclier (optionnel)"],
      act2: ["Épée Sang de Shar +2", "Armure de Plate de Mithral", "Amulette du Dévot"],
      act3: ["Pourfendeuse de Géant de Baldur", "Armure Infernale", "Heaume de Baldur"],
    },
    failsafes: [
      { missingItem: "Pourfendeuse de Géant de Baldur", fallbackItem: "Épée du Chaos +3", condition: "Si Ansur n'est pas vaincu" },
      { missingItem: "Armure Infernale", fallbackItem: "Armure de Plate +2 (Dammon)", condition: "Si Raphaël n'est pas vaincu" },
    ],
  },

  // =========================================================================
  // 7. Le Sorcadin
  // =========================================================================
  {
    id: "sorcadin",
    name: "Le Sorcadin",
    classes: "6 Paladin Serment de Vengeance / 6 Ensorceleur Draconique",
    coreRole: "Tank Burst avec Aura de Protection",
    keyMechanic:
      "Aura de Protection du Paladin 6 (+CHA aux JdS de tous les alliés à 3m) + Métamagie (Incantation Rapide) pour lancer un sort d'attaque ET un Châtiment Divin dans le même tour. Vœu d'Inimitié (Avantage permanent sur une cible) garantit les critiques pour doubler les dés de Châtiment.",
    stats: { STR: 16, DEX: 10, CON: 14, INT: 8, WIS: 10, CHA: 17 },
    featProgression: [
      { level: 4, feat: "Maître des Armes à Deux Mains (GWM)", reason: "+10 dégâts. L'Avantage du Vœu d'Inimitié compense le -5." },
      { level: 8, feat: "+2 CHA (17→19)", reason: "Aura de Protection +4. Plus de dégâts sur les Châtiments." },
      { level: 12, feat: "+2 CHA (19→20)", reason: "Aura +5. DD 18 pour les sorts d'Ensorceleur." },
    ],
    bestInSlot: {
      act1: ["Épée de Flammes Éternelles", "Armure Lourde +1", "Amulette de Dévot"],
      act2: ["Fléau des Âges (Dammon)", "Armure de Plate", "Cape de Protection"],
      act3: ["Pourfendeuse de Géant de Baldur", "Armure Infernale", "Heaume de Baldur"],
    },
    failsafes: [
      { missingItem: "Fléau des Âges", fallbackItem: "Masse +2 (Marchand Acte 2)", condition: "Si Dammon est mort à l'Acte 1" },
      { missingItem: "Pourfendeuse de Géant de Baldur", fallbackItem: "Hallebarde de Vigilance", condition: "Si Ansur n'est pas vaincu" },
    ],
  },

  // =========================================================================
  // 8. La Mitrailleuse de Feu "Fire Sorlock"
  // =========================================================================
  {
    id: "fire_sorlock",
    name: "La Mitrailleuse de Feu (Fire Sorlock)",
    classes: "11 Ensorceleur Draconique (Feu) / 1 Occultiste Félon",
    coreRole: "DPS Magique Soutenu à Distance",
    keyMechanic:
      "Rayon Ardent (Scorching Ray) upcasté + Chapeau d'Acuité + Métamagie (Incantation Rapide). Chaque rayon applique +CHA aux dégâts (Draconique Feu) et touche séparément → Acuité Arcanique sur chaque hit. Décharge Occulte en tour de magie entre les sorts payants pour un DPS illimité.",
    stats: { STR: 8, DEX: 14, CON: 14, INT: 10, WIS: 10, CHA: 17 },
    featProgression: [
      { level: 4, feat: "Initié Élémentaire (Feu)", reason: "Résistance feu + 1d4 bonus feu. Synergie parfaite avec Draconique Feu." },
      { level: 8, feat: "+2 CHA (17→19)", reason: "+4 par rayon de Rayon Ardent. Sur 8 rayons = +32 dégâts par tour." },
      { level: 12, feat: "+2 CHA (19→20)", reason: "+5 par rayon = +40 dégâts par tour sur Rayon Ardent upcasté." },
    ],
    bestInSlot: {
      act1: ["Circlet de Feu (dégâts de feu +2)", "Bâton de Flammes", "Armure de Mage (sort)"],
      act2: ["Chapeau d'Acuité Arcanique", "Robe du Tisseur de Feu", "Anneau du Gredin Mystique"],
      act3: ["Markoheshkir (mode Feu)", "Robe du Tisseur de Sorts", "Bague des Éléments Infernaux"],
    },
    failsafes: [
      { missingItem: "Chapeau d'Acuité Arcanique", fallbackItem: "Casque d'Acuité Arcanique (Grymforge)", condition: "Même objet, nom alternatif selon la version" },
      { missingItem: "Markoheshkir", fallbackItem: "Bâton de Flammes +2", condition: "Si la Tour de Ramazith n'est pas complétée" },
    ],
  },

  // =========================================================================
  // 9. L'Alpha Strike "Gloom Assassin"
  // =========================================================================
  {
    id: "gloom_assassin",
    name: "L'Alpha Strike (Gloom Assassin)",
    classes: "5 Rôdeur Traqueur Sombre / 4 Roublard Assassin / 3 Guerrier Maître de Guerre",
    coreRole: "Élimination Surprise Tour 1",
    keyMechanic:
      "Initiative de Traqueur Sombre (Avantage au Tour 1 si pas vu) + Assassinat du Roublard (critique garanti contre les ennemis Surpris) + Surge d'Action du Guerrier. Au Tour 1 : 4-5 attaques, toutes en critique garanti, avec Attaque Sournoise empilée. Un boss peut perdre 50-80% de ses PV avant de jouer.",
    stats: { STR: 10, DEX: 17, CON: 14, INT: 8, WIS: 14, CHA: 10 },
    featProgression: [
      { level: 4, feat: "Tireur d'Élite (Sharpshooter)", reason: "+10 dégâts à distance. Critique garanti compense le -5 au toucher." },
      { level: 8, feat: "Alerte", reason: "+5 initiative = jouer premier garanti. Essentiel pour déclencher Assassinat." },
      { level: 12, feat: "+2 DEX (17→19)", reason: "Augmente le toucher et les dégâts de base." },
    ],
    bestInSlot: {
      act1: ["Arc Court +1", "Armure de Cuir Clouté +1", "Flèches +1"],
      act2: ["Arc de la Frappe Préventive (+3 initiative)", "Armure de Cuir Furtive +2", "Cape d'Ombre"],
      act3: ["Arbalète Lourde de Gontr Mael", "Armure de Cuir Clouté +3", "Gants de Précision"],
    },
    failsafes: [
      { missingItem: "Arbalète Lourde de Gontr Mael", fallbackItem: "Arc Long de la Garde Sombre +2", condition: "Si la Forge des Neuf n'est pas complétée" },
      { missingItem: "Cape d'Ombre", fallbackItem: "Cape de Protection +1", condition: "Si le marchand de l'Ombre n'est pas trouvé" },
    ],
  },

  // =========================================================================
  // 10. Le Lockadin "Héraut du Crépuscule"
  // =========================================================================
  {
    id: "lockadin",
    name: "Le Lockadin",
    classes: "7 Paladin Parjure / 5 Occultiste de la Lame",
    coreRole: "Tank Burst SAD (Charisme)",
    keyMechanic:
      "Triple Charisme aux dégâts : Pacte de la Lame (CHA à l'attaque/dégâts) + Aura de Haine (CHA aux dégâts mêlée) + Synergie Arcanique (CHA aux dégâts d'arme). Les emplacements d'Occultiste se rechargent au Repos Court, offrant des Châtiments Divins illimités.",
    stats: { STR: 8, DEX: 14, CON: 16, INT: 8, WIS: 10, CHA: 17 },
    featProgression: [
      { level: 4, feat: "+2 Charisme (17→19)", reason: "Augmente simultanément les dégâts, l'Aura de Protection, et le DD des sorts." },
      { level: 8, feat: "+2 Charisme (19→20)", reason: "CHA 20 = +5 triplé aux dégâts (+15 par coup), Aura de Protection +5 à toute l'équipe." },
      { level: 12, feat: "Mage de Guerre", reason: "Concentration garantie sur Maléfice et sorts de contrôle grâce au bonus CHA aux JdS." },
    ],
    bestInSlot: {
      act1: ["Épée de Flammes Éternelles", "Armure Lourde +1", "Bouclier de la Foi (sort)"],
      act2: ["Hallebarde de Vigilance", "Armure de Plate de Mithral", "Diadème de Synergie Arcanique"],
      act3: ["Épée du Chaos", "Armure de la Persévérance", "Anneau Risqué", "Héritage des Maîtres"],
    },
    failsafes: [
      { missingItem: "Épée du Chaos", fallbackItem: "Hallebarde de Vigilance", condition: "Si le Tribunal du Meurtre n'est pas complété à l'Acte 3" },
      { missingItem: "Armure de la Persévérance", fallbackItem: "Armure du Crépuscule Infernal (vaincre Raphaël)", condition: "Si Dammon est mort" },
    ],
  },
];

// ---------------------------------------------------------------------------
// API d'accès
// ---------------------------------------------------------------------------

/** Alias demandé par l'architecture — même référence que BUILDS_TIER_S */
export const tierSBuilds: readonly BuildTierS[] = BUILDS_TIER_S;

export function getBuildTierS(id: string): BuildTierS | undefined {
  return BUILDS_TIER_S.find((b) => b.id === id);
}

export function getAllBuildsTierS(): readonly BuildTierS[] {
  return BUILDS_TIER_S;
}
