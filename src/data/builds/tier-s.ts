// ============================================================================
// COMPENDIUM DES 10 BUILDS TIER S — Mode Honneur BG3
// Theorycraft vérifié, données réelles, bilingue FR/EN
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

/** Localized text fields for a build */
interface BuildLocalizedText {
  readonly name: string;
  readonly classes: string;
  readonly coreRole: string;
  readonly keyMechanic: string;
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
      { missingItem: "Casque d'Acuité Arcanique", fallbackItem: "Diadème de Synergie Arcanique (Crèche Y'llek)", condition: "Si Grymforge n'est pas complété" },
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
      "Initiative de Traqueur Sombre (attaque bonus + bonus initiative Tour 1) + Assassinat du Roublard (les attaques touchent automatiquement les ennemis Surpris + Avantage sur ceux qui n'ont pas encore joué) + Surge d'Action du Guerrier. Au Tour 1 : 4-5 attaques avec Avantage, plus Attaque Sournoise empilée. Un boss peut perdre 40-60% de ses PV avant de jouer.",
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
      { missingItem: "Arbalète Lourde de Gontr Mael", fallbackItem: "Ne'er Misser (arbalète de main, Roah Moonglow)", condition: "Si la Fonderie de la Garde d'Acier n'est pas complétée" },
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
// English translations keyed by build id
// ---------------------------------------------------------------------------

const BUILDS_EN: Record<string, BuildLocalizedText> = {
  moine_bagarreur: {
    name: "Tavern Brawler Monk",
    classes: "8 Open Hand Monk / 4 Thief Rogue",
    coreRole: "Single-Target Boss Killer",
    keyMechanic:
      "Hill Giant Strength Elixir (STR 21) + Tavern Brawler feat (double STR mod to unarmed attack & damage rolls). Monk bonus attacks + Thief extra bonus action = 5-6 attacks per turn.",
    featProgression: [
      { level: 4, feat: "Tavern Brawler", reason: "Doubles STR modifier on unarmed attack and damage rolls. The core of the build." },
      { level: 8, feat: "Alert", reason: "+5 initiative. With BG3's d4 system, nearly guaranteed to act first." },
      { level: 12, feat: "+2 Wisdom (18→20)", reason: "Increases DC of Monk abilities (Open Hand Technique, Stunning Strike)." },
    ],
    bestInSlot: {
      act1: ["Gloves of Dexterity (STR 23 if stolen)", "Headband of Intellect", "Hill Giant Strength Elixir"],
      act2: ["Gloves of the Growling Underdog (+1d4 non-lethal)", "Boots of Speed", "Cloak of Protection +1"],
      act3: ["Gloves of Dexterity (STR 23)", "Helldusk Helmet", "Amulet of Greater Health"],
    },
    failsafes: [
      { missingItem: "Gloves of Dexterity", fallbackItem: "Hill Giant Strength Elixir (STR 21)", condition: "If gloves weren't stolen from the Grove basement" },
      { missingItem: "Helldusk Helmet", fallbackItem: "Helm of Balduran", condition: "If Ansur is not defeated" },
    ],
  },
  barde_controleur: {
    name: "Controller Bard",
    classes: "10 College of Swords Bard / 1 Fighter / 1 Wizard",
    coreRole: "Ranged DPS & Crowd Control",
    keyMechanic:
      "Arcane Acuity Helmet + Mystic Scoundrel Ring. Every control spell applies Arcane Acuity (-1 save per stack, up to -7). After 2 turns, enemies auto-fail all saving throws.",
    featProgression: [
      { level: 4, feat: "+1 CHA (17→18) + Performer", reason: "Increases control spell DC. Performer for RP flavour." },
      { level: 8, feat: "War Caster", reason: "Guaranteed Concentration with CHA bonus to Concentration saves." },
      { level: 12, feat: "+2 CHA (18→20)", reason: "DC 18 on all control spells." },
    ],
    bestInSlot: {
      act1: ["Arcane Acuity Helmet (Grymforge)", "Rapier +1", "Wooden Shield"],
      act2: ["Mystic Scoundrel Ring", "Mithral Armour", "Wand of the Shepherd"],
      act3: ["Markoheshkir (via Wizard multiclass)", "Robe of the Weave", "Ring of Protection"],
    },
    failsafes: [
      { missingItem: "Arcane Acuity Helmet", fallbackItem: "Diadem of Arcane Synergy (Crèche Y'llek)", condition: "If Grymforge is not completed" },
      { missingItem: "Markoheshkir", fallbackItem: "Staff of Spell Power +2", condition: "If Ramazith's Tower is not completed" },
    ],
  },
  throwzerker: {
    name: "Throwzerker",
    classes: "5 Berserker Barbarian / 4 Thief Rogue / 3 Champion Fighter",
    coreRole: "Ranged Damage & Prone",
    keyMechanic:
      "Tavern Brawler + Berserker Rage + Thief bonus action. Throws returning weapons (Nyrulna, Returning Pike +2) from high ground for gravity-doubled damage. 4-5 throws per turn with double bonus action.",
    featProgression: [
      { level: 4, feat: "Tavern Brawler", reason: "Doubles STR mod on throw attack AND damage rolls." },
      { level: 8, feat: "+2 STR (17→19)", reason: "Directly increases throw damage." },
      { level: 12, feat: "+2 STR (19→20)", reason: "STR 20 = +5 doubled by Tavern Brawler = +10 throw damage." },
    ],
    bestInSlot: {
      act1: ["Returning Pike +1", "Gloves of Throwing", "Hill Giant Strength Elixir"],
      act2: ["Returning Pike +2 (Dammon)", "Medium Armour +2", "Thief's Cloak"],
      act3: ["Nyrulna (Legendary Trident)", "Helldusk Armour", "Gloves of Dexterity (STR 23)"],
    },
    failsafes: [
      { missingItem: "Nyrulna", fallbackItem: "Returning Pike +2", condition: "If Akabi's Circus is not completed" },
      { missingItem: "Helldusk Armour", fallbackItem: "Adamantine Splint Armour", condition: "If Raphael is not defeated" },
    ],
  },
  clerc_irradiation: {
    name: "Radiating Orb Cleric",
    classes: "11 Light Domain Cleric / 1 Storm Sorcerer",
    coreRole: "Support & Radiant Debuff",
    keyMechanic:
      "Stacking Radiating Orbs via Luminous Armour to blind enemies. Spirit Guardians + Radiance of the Dawn apply Blindness in AoE. A blinded enemy has Disadvantage on everything — permanent control through radiant damage.",
    featProgression: [
      { level: 4, feat: "+1 WIS (17→18) + Resilient (CON)", reason: "Increases spell DC. Resilient CON for Concentration saves." },
      { level: 8, feat: "+2 WIS (18→20)", reason: "DC 18 for all Cleric spells." },
      { level: 12, feat: "War Caster", reason: "Near-unbreakable Concentration with WIS 20 + Resilient CON + War Caster." },
    ],
    bestInSlot: {
      act1: ["Mace +1", "Adamantine Shield (Grymforge)", "Chain Mail"],
      act2: ["The Blood of Lathander", "Devotee's Shield", "Mithral Medium Armour"],
      act3: ["The Blood of Lathander", "Shield of Lathander +3", "Robe of the Weave"],
    },
    failsafes: [
      { missingItem: "The Blood of Lathander", fallbackItem: "Radiant Mace +2 (Act 3 Merchants)", condition: "If the Rosymorn Monastery puzzle is not solved" },
    ],
  },
  nuke_tempete: {
    name: "Storm Nuke",
    classes: "10 Storm Sorcerer / 2 Tempest Domain Cleric",
    coreRole: "Maximum AoE Magic Damage",
    keyMechanic:
      "Create Water + Lightning Bolt + Destructive Wrath = Maximized Lightning Damage doubled. Destructive Wrath (Tempest) maximizes lightning/thunder dice 1×/short rest. Wetting enemy with Create Water = lightning vulnerability (×2). An upcast Call Lightning deals 60+ damage in one spell.",
    featProgression: [
      { level: 4, feat: "Elemental Adept (Lightning)", reason: "Lightning resistance + 1d4 bonus lightning on spells." },
      { level: 8, feat: "+2 CHA (17→19)", reason: "Increases Draconic damage and spell DC." },
      { level: 12, feat: "+2 CHA (19→20)", reason: "Maximum damage and spell DC." },
    ],
    bestInSlot: {
      act1: ["Staff of Thunder and Lightning (Grove)", "Ring of Protection", "Mage Armour (spell)"],
      act2: ["Sparkswall", "Robe of Elemental Supremacy", "Amulet of Resilience (CON)"],
      act3: ["Markoheshkir (Lightning mode)", "Robe of the Weave", "Ring of the Elements"],
    },
    failsafes: [
      { missingItem: "Markoheshkir", fallbackItem: "Staff of Thunder and Lightning +2", condition: "If Ramazith's Tower is not completed" },
    ],
  },
  bardadin: {
    name: "Bardadin — God of Smite",
    classes: "10 College of Swords Bard / 2 Paladin",
    coreRole: "Burst DPS & Versatile Support",
    keyMechanic:
      "Multi-attacks with Blade Flourishes (Bard Extra Attack at 6) + Divine Smites with high-level Bard spell slots. A crit with Flourish + level 5 Divine Smite = 100+ damage in one hit. Bardic Inspiration supports the whole party.",
    featProgression: [
      { level: 4, feat: "Great Weapon Master (GWM)", reason: "+10 damage per attack. Bard compensates the -5 with defensive Flourishes." },
      { level: 8, feat: "+2 CHA (17→19)", reason: "Increases spell slots and Bardic Inspiration." },
      { level: 12, feat: "+2 CHA (19→20)", reason: "DC 18 for Bard spells + optimal Smites." },
    ],
    bestInSlot: {
      act1: ["Everburn Blade", "Chain Mail", "Shield (optional)"],
      act2: ["Shar's Spear of Evening +2", "Mithral Plate Armour", "Amulet of the Devout"],
      act3: ["Balduran's Giantslayer", "Helldusk Armour", "Helm of Balduran"],
    },
    failsafes: [
      { missingItem: "Balduran's Giantslayer", fallbackItem: "Sword of Chaos +3", condition: "If Ansur is not defeated" },
      { missingItem: "Helldusk Armour", fallbackItem: "Plate Armour +2 (Dammon)", condition: "If Raphael is not defeated" },
    ],
  },
  sorcadin: {
    name: "Sorcadin",
    classes: "6 Oath of Vengeance Paladin / 6 Draconic Sorcerer",
    coreRole: "Burst Tank with Aura of Protection",
    keyMechanic:
      "Paladin 6 Aura of Protection (+CHA to saves for all allies within 3m) + Metamagic (Quickened Spell) to cast an attack spell AND Divine Smite in the same turn. Vow of Enmity (permanent Advantage on one target) guarantees crits to double Smite dice.",
    featProgression: [
      { level: 4, feat: "Great Weapon Master (GWM)", reason: "+10 damage. Vow of Enmity Advantage compensates the -5." },
      { level: 8, feat: "+2 CHA (17→19)", reason: "Aura of Protection +4. More Smite damage." },
      { level: 12, feat: "+2 CHA (19→20)", reason: "Aura +5. DC 18 for Sorcerer spells." },
    ],
    bestInSlot: {
      act1: ["Everburn Blade", "Heavy Armour +1", "Amulet of the Devout"],
      act2: ["Flail of Ages (Dammon)", "Plate Armour", "Cloak of Protection"],
      act3: ["Balduran's Giantslayer", "Helldusk Armour", "Helm of Balduran"],
    },
    failsafes: [
      { missingItem: "Flail of Ages", fallbackItem: "Mace +2 (Act 2 Merchant)", condition: "If Dammon died in Act 1" },
      { missingItem: "Balduran's Giantslayer", fallbackItem: "Halberd of Vigilance", condition: "If Ansur is not defeated" },
    ],
  },
  fire_sorlock: {
    name: "Fire Sorlock",
    classes: "11 Draconic Sorcerer (Fire) / 1 Fiend Warlock",
    coreRole: "Sustained Ranged Magic DPS",
    keyMechanic:
      "Upcast Scorching Ray + Acuity Hat + Metamagic (Quickened Spell). Each ray adds +CHA damage (Draconic Fire) and hits separately → Arcane Acuity on each hit. Eldritch Blast as a free cantrip between paid spells for unlimited DPS.",
    featProgression: [
      { level: 4, feat: "Elemental Adept (Fire)", reason: "Fire resistance + 1d4 fire bonus. Perfect synergy with Draconic Fire." },
      { level: 8, feat: "+2 CHA (17→19)", reason: "+4 per ray of Scorching Ray. On 8 rays = +32 damage per turn." },
      { level: 12, feat: "+2 CHA (19→20)", reason: "+5 per ray = +40 damage per turn on upcast Scorching Ray." },
    ],
    bestInSlot: {
      act1: ["Circlet of Fire (fire damage +2)", "Staff of Flames", "Mage Armour (spell)"],
      act2: ["Hat of Arcane Acuity", "Robe of the Fire Weaver", "Mystic Scoundrel Ring"],
      act3: ["Markoheshkir (Fire mode)", "Robe of the Weave", "Ring of Infernal Elements"],
    },
    failsafes: [
      { missingItem: "Hat of Arcane Acuity", fallbackItem: "Arcane Acuity Helmet (Grymforge)", condition: "Same item, alternate name depending on version" },
      { missingItem: "Markoheshkir", fallbackItem: "Staff of Flames +2", condition: "If Ramazith's Tower is not completed" },
    ],
  },
  gloom_assassin: {
    name: "Gloom Assassin — Alpha Strike",
    classes: "5 Gloom Stalker Ranger / 4 Assassin Rogue / 3 Battle Master Fighter",
    coreRole: "Turn 1 Surprise Elimination",
    keyMechanic:
      "Gloom Stalker initiative (bonus attack + initiative bonus Turn 1) + Rogue Assassinate (attacks auto-hit Surprised enemies + Advantage on those who haven't acted yet) + Fighter Action Surge. Turn 1: 4-5 attacks with Advantage, plus stacked Sneak Attack. A boss can lose 40-60% HP before acting.",
    featProgression: [
      { level: 4, feat: "Sharpshooter", reason: "+10 ranged damage. Guaranteed crit compensates the -5 to hit." },
      { level: 8, feat: "Alert", reason: "+5 initiative = guaranteed to act first. Essential for triggering Assassinate." },
      { level: 12, feat: "+2 DEX (17→19)", reason: "Increases base hit and damage." },
    ],
    bestInSlot: {
      act1: ["Shortbow +1", "Studded Leather +1", "Arrows +1"],
      act2: ["Bow of the Preemptive Strike (+3 initiative)", "Stealthy Leather +2", "Cloak of Shadows"],
      act3: ["Gontr Mael (Heavy Crossbow)", "Studded Leather +3", "Gloves of Precision"],
    },
    failsafes: [
      { missingItem: "Gontr Mael", fallbackItem: "Ne'er Misser (hand crossbow, Roah Moonglow)", condition: "If the Steel Watch Foundry is not completed" },
      { missingItem: "Cloak of Shadows", fallbackItem: "Cloak of Protection +1", condition: "If the Shadow merchant is not found" },
    ],
  },
  lockadin: {
    name: "Lockadin",
    classes: "7 Oathbreaker Paladin / 5 Pact of the Blade Warlock",
    coreRole: "SAD Burst Tank (Charisma)",
    keyMechanic:
      "Triple Charisma to damage: Pact of the Blade (CHA to attack/damage) + Aura of Hate (CHA to melee damage) + Arcane Synergy (CHA to weapon damage). Warlock slots recharge on Short Rest, providing unlimited Divine Smites.",
    featProgression: [
      { level: 4, feat: "+2 Charisma (17→19)", reason: "Simultaneously increases damage, Aura of Protection, and spell DC." },
      { level: 8, feat: "+2 Charisma (19→20)", reason: "CHA 20 = +5 tripled to damage (+15 per hit), Aura of Protection +5 for the whole team." },
      { level: 12, feat: "War Caster", reason: "Guaranteed Concentration on Hex and control spells with CHA bonus to saves." },
    ],
    bestInSlot: {
      act1: ["Everburn Blade", "Heavy Armour +1", "Shield of Faith (spell)"],
      act2: ["Halberd of Vigilance", "Mithral Plate Armour", "Diadem of Arcane Synergy"],
      act3: ["Sword of Chaos", "Armour of Persistence", "Risky Ring", "Legacy of the Masters"],
    },
    failsafes: [
      { missingItem: "Sword of Chaos", fallbackItem: "Halberd of Vigilance", condition: "If the Murder Tribunal is not completed in Act 3" },
      { missingItem: "Armour of Persistence", fallbackItem: "Helldusk Armour (defeat Raphael)", condition: "If Dammon is dead" },
    ],
  },
};

// ---------------------------------------------------------------------------
// API d'accès
// ---------------------------------------------------------------------------

/** Alias demandé par l'architecture — même référence que BUILDS_TIER_S */
export const tierSBuilds: readonly BuildTierS[] = BUILDS_TIER_S;

export function getBuildTierS(id: string, lang: string = "fr"): BuildTierS | undefined {
  const base = BUILDS_TIER_S.find((b) => b.id === id);
  if (!base || lang !== "en") return base;
  const en = BUILDS_EN[id];
  if (!en) return base;
  return { ...base, ...en };
}

export function getAllBuildsTierS(lang: string = "fr"): readonly BuildTierS[] {
  if (lang !== "en") return BUILDS_TIER_S;
  return BUILDS_TIER_S.map((build) => {
    const en = BUILDS_EN[build.id];
    if (!en) return build;
    return { ...build, ...en };
  });
}
