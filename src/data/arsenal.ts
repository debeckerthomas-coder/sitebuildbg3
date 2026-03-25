// ============================================================================
// L'Armurerie — Collections d'équipements BG3 organisées par rareté et par acte
// ============================================================================

export interface ArsenalItem {
  readonly id: string;
  readonly name: string;
  readonly wikiName: string;
  readonly type: "Arme" | "Armure" | "Tête" | "Gants" | "Bottes" | "Anneau" | "Amulette" | "Cape" | "Bouclier";
  readonly rarity: "Legendary" | "Very Rare" | "Rare" | "Uncommon";
  readonly act: 1 | 2 | 3;
  readonly location: string;
  readonly effect: string;
  readonly usedBy: readonly string[];
}

// Type category helper for filters
export type TypeCategory = "Arme" | "Armure" | "Accessoire";

export function getTypeCategory(type: ArsenalItem["type"]): TypeCategory {
  if (type === "Arme" || type === "Bouclier") return "Arme";
  if (type === "Armure") return "Armure";
  return "Accessoire";
}

// ============================================================================
// COLLECTION : LÉGENDAIRES
// ============================================================================

export const itemsLegendary: readonly ArsenalItem[] = [
  {
    id: "markoheshkir",
    name: "Markoheshkir",
    wikiName: "Markoheshkir",
    type: "Arme",
    rarity: "Legendary",
    act: 3,
    location: "Tour de Ramazith — Chambre Forte",
    effect: "Bâton légendaire. Faveur de Kereska : Éclair en Chaîne ou Boule de Feu gratuit 1×/repos court. +1 au DD des sorts.",
    usedBy: ["Nuke Tempête", "Fire Sorlock", "Barde Contrôleur"],
  },
  {
    id: "baldurans_giantslayer",
    name: "Pourfendeuse de Géant de Baldur",
    wikiName: "Balduran's Giantslayer",
    type: "Arme",
    rarity: "Legendary",
    act: 3,
    location: "Caverne de Wyrm — Vaincre Ansur",
    effect: "Épée à deux mains. Double les dégâts bonus de Force. Avantage contre les créatures Grandes+. +3 enchantement.",
    usedBy: ["Sorcadin", "Bardadin"],
  },
  {
    id: "nyrulna",
    name: "Nyrulna",
    wikiName: "Nyrulna",
    type: "Arme",
    rarity: "Legendary",
    act: 3,
    location: "Cirque du Dernier Jour — Génie Akabi",
    effect: "Trident légendaire de retour. +3, +1d6 tonnerre, immunité recul. Explosion de 3d4 tonnerre à l'impact.",
    usedBy: ["Throwzerker"],
  },
  {
    id: "helldusk_armour",
    name: "Armure du Crépuscule Infernal",
    wikiName: "Helldusk Armour",
    type: "Armure",
    rarity: "Legendary",
    act: 3,
    location: "Maison de l'Espoir — Vaincre Raphaël",
    effect: "CA 21. Résistance au feu. Réduit tous les dégâts de 3. Sort Vol gratuit. Brûle les attaquants en mêlée (1d4 feu).",
    usedBy: ["Sorcadin", "Lockadin", "Throwzerker"],
  },
  {
    id: "helmet_of_balduran",
    name: "Heaume de Baldur",
    wikiName: "Helmet of Balduran",
    type: "Tête",
    rarity: "Legendary",
    act: 3,
    location: "Caverne de Wyrm — Vaincre Ansur",
    effect: "Guérit 2 PV/tour. Immunité critique et étourdissement. +1 CA, +1 JdS. Le tank ultime.",
    usedBy: ["Sorcadin", "Bardadin"],
  },
  {
    id: "sang_de_lathandre",
    name: "Le Sang de Lathandre",
    wikiName: "The Blood of Lathander",
    type: "Arme",
    rarity: "Legendary",
    act: 2,
    location: "Monastère de Rosymorn — Puzzle du Vitrail",
    effect: "Masse +3. Lumière aveuglante (6m AoE). Si vos PV tombent à 0 : résurrection avec 2d6 PV 1×/repos long.",
    usedBy: ["Clerc Orbes"],
  },
  {
    id: "crimson_mischief",
    name: "Malice Écarlate",
    wikiName: "Crimson Mischief",
    type: "Arme",
    rarity: "Legendary",
    act: 3,
    location: "Vaincre Orin dans le Temple de Bhaal",
    effect: "Épée courte. Main dominante : +7 dégâts perforants sur cible à PV max. Main secondaire : +1d4 nécrotique + mod. de Charisme aux dégâts.",
    usedBy: ["Gloom Assassin", "Bardadin"],
  },
  {
    id: "helldusk_helmet",
    name: "Heaume du Crépuscule Infernal",
    wikiName: "Helldusk Helmet",
    type: "Tête",
    rarity: "Legendary",
    act: 3,
    location: "Maison de l'Espoir — Coffre de Raphaël",
    effect: "Immunité à l'Aveuglement, Critique et Étourdissement. +2 DD pour les JdS de sorts. Riposte de feu.",
    usedBy: ["Lockadin", "Fire Sorlock"],
  },
  {
    id: "helldusk_gloves",
    name: "Gants du Crépuscule Infernal",
    wikiName: "Helldusk Gloves",
    type: "Gants",
    rarity: "Legendary",
    act: 3,
    location: "Maison de l'Espoir — Coffre de Raphaël",
    effect: "+1 au DD des sorts. Les attaques d'arme infligent +1d6 dégâts de feu. Rayon Brûlant gratuit 1×/repos court.",
    usedBy: ["Sorcadin", "Throwzerker"],
  },
  {
    id: "helldusk_boots",
    name: "Bottes du Crépuscule Infernal",
    wikiName: "Helldusk Boots",
    type: "Bottes",
    rarity: "Legendary",
    act: 3,
    location: "Maison de l'Espoir — Coffre de Raphaël",
    effect: "Immunité au Déplacement Forcé. Téléportation infernale (Action Bonus). Réussite automatique aux JdS vs surfaces.",
    usedBy: ["Sorcadin", "Lockadin"],
  },
  {
    id: "gontr_mael",
    name: "Gontr Mael",
    wikiName: "Gontr Mael",
    type: "Arme",
    rarity: "Legendary",
    act: 3,
    location: "Fonderie d'Acier — Vaincre le Titan",
    effect: "Arc long +3. Les flèches infligent +1d4 tonnerre et provoquent Éblouissement (JdS CON). Confère Bénédiction 1×/repos court.",
    usedBy: ["Gloom Assassin"],
  },
  {
    id: "devotees_mace",
    name: "Masse du Dévot",
    wikiName: "Devotee's Mace",
    type: "Arme",
    rarity: "Legendary",
    act: 3,
    location: "Porte de Baldur — Quête du Temple de Lathander",
    effect: "Masse +3. Ajoute le mod. de CHA aux dégâts. Lumière Éblouissante en AoE (1×/repos court). Idéal Clerc/Paladin.",
    usedBy: ["Clerc Orbes", "Sorcadin"],
  },
];

// ============================================================================
// COLLECTION : TRÈS RARES
// ============================================================================

export const itemsVeryRare: readonly ArsenalItem[] = [
  {
    id: "casque_acuite_arcanique",
    name: "Casque d'Acuité Arcanique",
    wikiName: "Birthright",
    type: "Tête",
    rarity: "Very Rare",
    act: 1,
    location: "Grymforge — Gardien de la Forge",
    effect: "Chaque attaque d'arme applique Acuité Arcanique : -1 JdS par charge (cumul -7). Rend vos sorts imparables.",
    usedBy: ["Barde Contrôleur", "Bardadin", "Fire Sorlock"],
  },
  {
    id: "ring_mystic_scoundrel",
    name: "Anneau du Gredin Mystique",
    wikiName: "Risky Ring",
    type: "Anneau",
    rarity: "Very Rare",
    act: 3,
    location: "Sous-sol de l'Auberge Dernière Lumière",
    effect: "Après une attaque d'arme, permet de lancer un sort d'illusion/enchantement en Action Bonus.",
    usedBy: ["Barde Contrôleur", "Bardadin"],
  },
  {
    id: "legacy_masters",
    name: "Héritage des Maîtres",
    wikiName: "Legacy of the Masters",
    type: "Gants",
    rarity: "Very Rare",
    act: 3,
    location: "Chambres Funéraires — Porte de Baldur",
    effect: "+2 aux jets d'attaque et aux jets de dégâts d'arme. S'applique à TOUTES les attaques.",
    usedBy: ["Lockadin", "Gloom Assassin"],
  },
  {
    id: "diadem_arcane_synergy",
    name: "Diadème de Synergie Arcanique",
    wikiName: "Circlet of Fire",
    type: "Tête",
    rarity: "Very Rare",
    act: 2,
    location: "Crèche Y'llek — Inquisiteur",
    effect: "Infliger une condition active Synergie Arcanique : ajoute le mod. de Charisme aux dégâts d'arme.",
    usedBy: ["Lockadin"],
  },
  {
    id: "armor_persistence",
    name: "Armure de la Persévérance",
    wikiName: "Armour of Persistence",
    type: "Armure",
    rarity: "Very Rare",
    act: 3,
    location: "Porte de Baldur — Marchand Dammon",
    effect: "Armure lourde CA 20. Résistance Tranchant/Perforant/Contondant. Réduit les dégâts permanents.",
    usedBy: ["Lockadin"],
  },
  {
    id: "robe_de_la_trame",
    name: "Robe de la Trame",
    wikiName: "Robe of the Weave",
    type: "Armure",
    rarity: "Very Rare",
    act: 3,
    location: "Tour de Ramazith — Chambre de Lorroakan",
    effect: "CA 10 + DEX + 2. +1 au DD des sorts et jets d'attaque de sorts. Restaure des emplacements 1×/repos.",
    usedBy: ["Nuke Tempête", "Fire Sorlock"],
  },
  {
    id: "sword_of_chaos",
    name: "Épée du Chaos",
    wikiName: "Sword of Chaos",
    type: "Arme",
    rarity: "Very Rare",
    act: 3,
    location: "Tribunal du Meurtre — Sarevok",
    effect: "Épée à deux mains +2. Soigne 1d6 PV à chaque coup. Les soins + résistances du Paladin Parjure = quasi-immortel.",
    usedBy: ["Lockadin"],
  },
  {
    id: "anneau_regeneration",
    name: "Anneau de Régénération",
    wikiName: "Ring of Regeneration",
    type: "Anneau",
    rarity: "Very Rare",
    act: 3,
    location: "Magasin des Sorcelleries — Ville Basse",
    effect: "Régénère 1d4 PV au début de chaque tour. Se cumule avec le Heaume de Baldur.",
    usedBy: ["Sorcadin", "Lockadin"],
  },
  {
    id: "killer_sweetheart",
    name: "Killer's Sweetheart",
    wikiName: "Killer's Sweetheart",
    type: "Anneau",
    rarity: "Very Rare",
    act: 2,
    location: "Temple de la Lune Obscure — Gouffre sans Fond",
    effect: "Si vous tuez une créature, votre prochaine attaque est un coup critique automatique. 1×/repos court.",
    usedBy: ["Gloom Assassin", "Sorcadin"],
  },
  {
    id: "cloak_displacement",
    name: "Cape de Déplacement",
    wikiName: "Cloak of Displacement",
    type: "Cape",
    rarity: "Very Rare",
    act: 2,
    location: "Tours de Hautelune — Marchand",
    effect: "Les attaques contre vous ont le Désavantage. L'effet prend fin si vous êtes touché, puis revient au début de votre tour.",
    usedBy: ["Barde Contrôleur", "Fire Sorlock"],
  },
  {
    id: "gauntlets_hill_giant",
    name: "Gantelets de Force de Géant des Collines",
    wikiName: "Gauntlets of Hill Giant Strength",
    type: "Gants",
    rarity: "Very Rare",
    act: 1,
    location: "Crèche Githyanki — Pièce secrète",
    effect: "Fixe la Force à 23. Permet à n'importe quelle classe de frapper comme un Barbare sans élixir.",
    usedBy: ["Throwzerker", "Sorcadin"],
  },
  {
    id: "amulet_greater_health",
    name: "Amulette de Vigueur Supérieure",
    wikiName: "Amulet of Greater Health",
    type: "Amulette",
    rarity: "Very Rare",
    act: 3,
    location: "Maison de l'Espoir — Chambre de Raphaël",
    effect: "Fixe la Constitution à 23. +29 PV maximaux typiquement. Avantage aux JdS de Constitution.",
    usedBy: ["Barde Contrôleur", "Fire Sorlock"],
  },
  {
    id: "boots_of_speed",
    name: "Bottes de Vitesse",
    wikiName: "Boots of Speed",
    type: "Bottes",
    rarity: "Very Rare",
    act: 2,
    location: "Grymforge — Trésor caché",
    effect: "Action Bonus : vitesse de déplacement doublée. Les attaques d'opportunité contre vous ont le Désavantage.",
    usedBy: ["Gloom Assassin", "Throwzerker"],
  },
  {
    id: "shield_devotion",
    name: "Bouclier de la Dévotion",
    wikiName: "Shield of Devotion",
    type: "Bouclier",
    rarity: "Very Rare",
    act: 1,
    location: "Crèche Githyanki — Inquisiteur",
    effect: "+2 CA. Confère le sort Aide (niv. 2) 1×/repos long, +5 PV max à 3 alliés. Idéal tank Acte 1.",
    usedBy: ["Sorcadin", "Clerc Orbes"],
  },
];

// ============================================================================
// COLLECTION : ACTE 1 BiS (Meilleurs objets accessibles en Acte 1)
// ============================================================================

export const itemsAct1BiS: readonly ArsenalItem[] = [
  {
    id: "titanstring_bow",
    name: "Arc à Cordes de Titan",
    wikiName: "Titanstring Bow",
    type: "Arme",
    rarity: "Rare",
    act: 1,
    location: "Repaire des Zhentarim — Brem",
    effect: "Arc long. Ajoute le modificateur de Force AUX dégâts en plus de la Dextérité. Parfait avec Élixir de Force.",
    usedBy: ["Gloom Assassin"],
  },
  {
    id: "etincelle_electrique",
    name: "Étincelle Électrique",
    wikiName: "The Sparkle Hands",
    type: "Arme",
    rarity: "Rare",
    act: 1,
    location: "Camp Gobelin — Marchand Gobelin",
    effect: "Bâton. Octroie le sort mineur Éclair de Sorcière (1d8 foudre à distance). Excellent sur Gale dès l'Acte 1.",
    usedBy: ["Nuke Tempête"],
  },
  {
    id: "everburn_blade",
    name: "Lame Toujours Ardente",
    wikiName: "Everburn Blade",
    type: "Arme",
    rarity: "Uncommon",
    act: 1,
    location: "Nautiloïde — Piller le Cdt. Zhalk",
    effect: "Épée à deux mains. +1d4 feu par coup. Gratuite dès le tutoriel. Meilleure arme 2H de l'Acte 1.",
    usedBy: ["Sorcadin", "Bardadin"],
  },
  {
    id: "sword_justice",
    name: "Épée de la Justice",
    wikiName: "Sword of Justice",
    type: "Arme",
    rarity: "Uncommon",
    act: 1,
    location: "Anders — Toll House",
    effect: "Épée à deux mains +1. Confère Bouclier de la Foi (1×/repos long). Excellent combo tank dès l'Acte 1.",
    usedBy: ["Sorcadin"],
  },
  {
    id: "mourning_frost",
    name: "Givre du Deuil",
    wikiName: "Mourning Frost",
    type: "Arme",
    rarity: "Rare",
    act: 1,
    location: "Outre-Terre — Assembler 3 fragments",
    effect: "Bâton +1. Chaque sort de froid inflige +1d4 froid. En combinaison : permet de geler en chaîne.",
    usedBy: ["Nuke Tempête", "Fire Sorlock"],
  },
  {
    id: "ring_protection",
    name: "Anneau de Protection",
    wikiName: "Ring of Protection",
    type: "Anneau",
    rarity: "Rare",
    act: 1,
    location: "Tatie Ethel — Négociation à la Théière",
    effect: "+1 CA et +1 aux jets de sauvegarde. Le meilleur anneau défensif de l'Acte 1.",
    usedBy: ["Sorcadin", "Barde Contrôleur"],
  },
  {
    id: "amulet_misty_step",
    name: "Amulette de Pas Brumeux",
    wikiName: "Amulet of Misty Step",
    type: "Amulette",
    rarity: "Uncommon",
    act: 1,
    location: "Coffre du Druide Halsin — Bosquet des Druides",
    effect: "Confère Pas Brumeux 1×/repos court. Mobilité gratuite pour n'importe quelle classe.",
    usedBy: ["Nuke Tempête", "Fire Sorlock", "Barde Contrôleur"],
  },
  {
    id: "gloves_power",
    name: "Gants de Pouvoir",
    wikiName: "Gloves of Power",
    type: "Gants",
    rarity: "Uncommon",
    act: 1,
    location: "Camp Gobelin — Pillé sur le corps",
    effect: "Attaques d'arme infligent +1d4 nécrotique (nécessite la Marque de l'Absolue). Fonctionne avec Throwzerker.",
    usedBy: ["Throwzerker"],
  },
  {
    id: "spear_of_night",
    name: "Lance de la Nuit",
    wikiName: "Selûne's Spear of Night",
    type: "Arme",
    rarity: "Rare",
    act: 1,
    location: "Temple de Shar — Puzzle des Ombres",
    effect: "Lance +1, +1d6 psychique. Avantage aux JdS de Sagesse. Excellente arme de progression pour Shadowheart.",
    usedBy: ["Clerc Orbes"],
  },
  {
    id: "cloak_protection",
    name: "Cape de Protection",
    wikiName: "Cloak of Protection",
    type: "Cape",
    rarity: "Uncommon",
    act: 1,
    location: "Bosquet des Druides — Marchand Tiefelin",
    effect: "+1 CA et +1 aux jets de sauvegarde. Se cumule avec l'Anneau de Protection.",
    usedBy: ["Sorcadin", "Fire Sorlock"],
  },
  {
    id: "adamantine_splint",
    name: "Armure d'Adamantine (Éclisses)",
    wikiName: "Adamantine Splint Armour",
    type: "Armure",
    rarity: "Rare",
    act: 1,
    location: "Grymforge — Forge d'Adamantine",
    effect: "CA 18, réduction -2 sur tous les dégâts. Les attaquants ne peuvent pas réussir de critique. Meilleure armure Acte 1.",
    usedBy: ["Sorcadin", "Lockadin"],
  },
  {
    id: "adamantine_shield",
    name: "Bouclier d'Adamantine",
    wikiName: "Adamantine Shield",
    type: "Bouclier",
    rarity: "Rare",
    act: 1,
    location: "Grymforge — Forge d'Adamantine",
    effect: "+2 CA. Renvoie les coups critiques en attaques normales. Si touché : l'attaquant est Étourdi 1 tour.",
    usedBy: ["Sorcadin", "Clerc Orbes"],
  },
];

// ============================================================================
// COLLECTION : ACTE 2 BiS (Meilleurs objets des Terres Maudites)
// ============================================================================

export const itemsAct2BiS: readonly ArsenalItem[] = [
  {
    id: "ring_risky",
    name: "Anneau Risqué",
    wikiName: "Risky Ring",
    type: "Anneau",
    rarity: "Uncommon",
    act: 2,
    location: "Sous-sol du Dernier Havre de Lumière",
    effect: "Avantage permanent sur TOUS les jets d'attaque. Contrepartie : Désavantage aux jets de sauvegarde.",
    usedBy: ["Lockadin", "Gloom Assassin"],
  },
  {
    id: "moonlight_glaive",
    name: "Glaive de la Lune Sélénite",
    wikiName: "Selûne's Spear of Night",
    type: "Arme",
    rarity: "Rare",
    act: 2,
    location: "Gaveau de la Lune Obscure — Récompense de Shadowheart",
    effect: "Arme d'hast +2, +1d4 radiant. Avantage aux JdS de Sagesse. Évolue selon le choix de Shadowheart.",
    usedBy: ["Clerc Orbes"],
  },
  {
    id: "lanterne_lunaire",
    name: "Lanterne Lunaire",
    wikiName: "Moonlantern",
    type: "Arme",
    rarity: "Rare",
    act: 2,
    location: "Convoi de Kar'niss / Tours de Hautelune",
    effect: "Protection contre la Malédiction d'Ombre. Libérer la Pixie = immunité permanente pour tout le groupe.",
    usedBy: ["Clerc Orbes", "Barde Contrôleur"],
  },
  {
    id: "gloves_weapon_master",
    name: "Gants du Maître d'Armes",
    wikiName: "Gloves of Battlemage's Power",
    type: "Gants",
    rarity: "Rare",
    act: 2,
    location: "Araj Oblodra — Tours de Hautelune",
    effect: "Confèrent la maîtrise de TOUTES les armes. Idéal pour les lanceurs de sorts utilisant des armes martiales.",
    usedBy: ["Barde Contrôleur", "Fire Sorlock"],
  },
  {
    id: "halberd_vigilance",
    name: "Hallebarde de Vigilance",
    wikiName: "Halberd of Vigilance",
    type: "Arme",
    rarity: "Rare",
    act: 2,
    location: "Roah Moonglow — Tours de Hautelune",
    effect: "Hallebarde +2. Avantage aux jets d'initiative et immunité à la Surprise. Positionne parfaitement le DPS en premier.",
    usedBy: ["Sorcadin", "Bardadin"],
  },
  {
    id: "ring_of_free_action",
    name: "Anneau de Libre Action",
    wikiName: "Ring of Free Action",
    type: "Anneau",
    rarity: "Rare",
    act: 2,
    location: "Temple de la Lune Obscure — Coffre caché",
    effect: "Immunité au Ralentissement, Paralysie et restrictions de mouvement. Contre essentiel de Grym et des mages.",
    usedBy: ["Sorcadin", "Lockadin"],
  },
  {
    id: "boots_striding",
    name: "Bottes de Marche Assurée",
    wikiName: "Boots of Striding",
    type: "Bottes",
    rarity: "Uncommon",
    act: 2,
    location: "Tours de Hautelune — Marchand",
    effect: "Vitesse +3m. Immunité au terrain difficile si concentré sur un sort. Excellent pour les lanceurs de sorts.",
    usedBy: ["Nuke Tempête", "Barde Contrôleur"],
  },
  {
    id: "viconia_shield",
    name: "Bouclier de Viconia",
    wikiName: "Viconia's Walking Fortress",
    type: "Bouclier",
    rarity: "Rare",
    act: 2,
    location: "Temple de Shar — Quête de Shadowheart",
    effect: "+3 CA. Réfléchit les projectiles magiques. Avantage aux JdS contre les sorts. Le meilleur bouclier avant l'Acte 3.",
    usedBy: ["Sorcadin", "Clerc Orbes"],
  },
  {
    id: "flail_of_ages",
    name: "Fléau des Âges",
    wikiName: "Flail of Ages",
    type: "Arme",
    rarity: "Rare",
    act: 2,
    location: "Dammon — Auberge de la Dernière Lumière",
    effect: "Fléau +2. +1d6 feu par coup. Ralentit les ennemis touchés (JdS CON). Excellent DPS Acte 2.",
    usedBy: ["Lockadin"],
  },
  {
    id: "amulet_silvanus",
    name: "Amulette de Silvanus",
    wikiName: "Amulet of Silvanus",
    type: "Amulette",
    rarity: "Uncommon",
    act: 2,
    location: "Auberge de la Dernière Lumière — Halsin",
    effect: "Résistance au Poison. Sort Protection contre le Poison 1×/repos long. Utile contre les sbires de Balthazar.",
    usedBy: ["Clerc Orbes"],
  },
  {
    id: "shadow_lantern_amulet",
    name: "Amulette de l'Ombre Rampante",
    wikiName: "Shadow-Cloaked Ring",
    type: "Amulette",
    rarity: "Rare",
    act: 2,
    location: "Terres Maudites — Récompense de quête",
    effect: "Confère Invisibilité 1×/repos court. Permet un repositionnement furtif gratuit chaque combat.",
    usedBy: ["Gloom Assassin", "Barde Contrôleur"],
  },
  {
    id: "armor_moonbasking",
    name: "Armure de Bain de Lune",
    wikiName: "Armour of Moonbasking",
    type: "Armure",
    rarity: "Rare",
    act: 2,
    location: "Temple de la Lune Obscure — Coffre rituel",
    effect: "Armure intermédiaire CA 15 + DEX (max 2). +40 PV temporaires après un repos long. Énorme survie.",
    usedBy: ["Barde Contrôleur", "Clerc Orbes"],
  },
];

// ============================================================================
// COLLECTION FUSIONNÉE — Tous les objets
// ============================================================================

export const itemsBiS: readonly ArsenalItem[] = [
  ...itemsLegendary,
  ...itemsVeryRare,
  ...itemsAct1BiS,
  ...itemsAct2BiS,
];

// ============================================================================
// Helpers
// ============================================================================

export function getArsenalByAct(act: 1 | 2 | 3): readonly ArsenalItem[] {
  return itemsBiS.filter((item) => item.act === act);
}

export function getArsenalByRarity(rarity: ArsenalItem["rarity"]): readonly ArsenalItem[] {
  return itemsBiS.filter((item) => item.rarity === rarity);
}

// ============================================================================
// V2 — Format bilingue (migration progressive)
// ============================================================================

interface I18nText {
  readonly fr: string;
  readonly en: string;
}

export interface ArsenalItemV2 {
  readonly id: string;
  readonly wikiName: string;
  readonly name: I18nText;
  readonly type: I18nText;
  readonly description: I18nText;
  readonly rarity: "legendary" | "very_rare" | "rare" | "uncommon";
  readonly act: 1 | 2 | 3;
  readonly location: I18nText;
  readonly usedBy: readonly string[];
  readonly lore?: I18nText;
  readonly acquisition?: I18nText;
}

export const itemsBilingualV2: readonly ArsenalItemV2[] = [
  {
    id: "markoheshkir",
    wikiName: "Markoheshkir",
    name: { fr: "Markoheshkir", en: "Markoheshkir" },
    type: { fr: "Arme", en: "Weapon" },
    description: {
      fr: "Bâton légendaire. Faveur de Kereska : Éclair en Chaîne ou Boule de Feu gratuit 1×/repos court. +1 au DD des sorts.",
      en: "Legendary staff. Kereska's Favour: free Chain Lightning or Fireball 1×/short rest. +1 to spell save DC.",
    },
    rarity: "legendary",
    act: 3,
    location: { fr: "Tour de Ramazith — Chambre Forte", en: "Ramazith's Tower — Vault" },
    usedBy: ["Nuke Tempête", "Fire Sorlock", "Barde Contrôleur"],
    acquisition: { fr: "Acte 3 — Tour de Ramazith, Chambre Forte", en: "Act 3 — Ramazith's Tower, Vault" },
  },
  {
    id: "baldurans_giantslayer",
    wikiName: "Balduran's Giantslayer",
    name: { fr: "Pourfendeuse de Géant de Baldur", en: "Balduran's Giantslayer" },
    type: { fr: "Arme", en: "Weapon" },
    description: {
      fr: "Épée à deux mains. Double les dégâts bonus de Force. Avantage contre les créatures Grandes+. +3 enchantement.",
      en: "Two-handed sword. Doubles Strength bonus damage. Advantage against Large+ creatures. +3 enchantment.",
    },
    rarity: "legendary",
    act: 3,
    location: { fr: "Caverne de Wyrm — Vaincre Ansur", en: "Wyrm's Cave — Defeat Ansur" },
    usedBy: ["Sorcadin", "Bardadin"],
    acquisition: { fr: "Acte 3 — Caverne de Wyrm, vaincre Ansur", en: "Act 3 — Wyrm's Cave, defeat Ansur" },
  },
  {
    id: "nyrulna",
    wikiName: "Nyrulna",
    name: { fr: "Nyrulna", en: "Nyrulna" },
    type: { fr: "Arme", en: "Weapon" },
    description: {
      fr: "Trident légendaire de retour. +3, +1d6 tonnerre, immunité recul. Explosion de 3d4 tonnerre à l'impact.",
      en: "Legendary returning trident. +3, +1d6 thunder, knockback immunity. 3d4 thunder burst on impact.",
    },
    rarity: "legendary",
    act: 3,
    location: { fr: "Cirque du Dernier Jour — Génie Akabi", en: "Circus of the Last Days — Djinn Akabi" },
    usedBy: ["Throwzerker"],
    acquisition: { fr: "Acte 3 — Cirque du Dernier Jour, Génie Akabi", en: "Act 3 — Circus of the Last Days, Djinn Akabi" },
  },
  {
    id: "helldusk_armour",
    wikiName: "Helldusk Armour",
    name: { fr: "Armure du Crépuscule Infernal", en: "Helldusk Armour" },
    type: { fr: "Armure", en: "Heavy Armour" },
    description: {
      fr: "CA 21. Résistance au feu. Réduit tous les dégâts de 3. Sort Vol gratuit. Brûle les attaquants en mêlée (1d4 feu).",
      en: "AC 21. Fire resistance. Reduces all damage by 3. Free Fly spell. Burns melee attackers for 1d4 fire.",
    },
    rarity: "legendary",
    act: 3,
    location: { fr: "Maison de l'Espoir — Vaincre Raphaël", en: "House of Hope — Defeat Raphael" },
    usedBy: ["Sorcadin", "Lockadin", "Throwzerker"],
    acquisition: { fr: "Acte 3 — Maison de l'Espoir, vaincre Raphaël", en: "Act 3 — House of Hope, defeat Raphael" },
  },
  {
    id: "helmet_of_balduran",
    wikiName: "Helmet of Balduran",
    name: { fr: "Heaume de Baldur", en: "Helmet of Balduran" },
    type: { fr: "Tête", en: "Helmet" },
    description: {
      fr: "Guérit 2 PV/tour. Immunité critique et étourdissement. +1 CA, +1 JdS. Le tank ultime.",
      en: "Heals 2 HP/turn. Critical hit and stun immunity. +1 AC, +1 saving throws. The ultimate tank helmet.",
    },
    rarity: "legendary",
    act: 3,
    location: { fr: "Caverne de Wyrm — Vaincre Ansur", en: "Wyrm's Cave — Defeat Ansur" },
    usedBy: ["Sorcadin", "Bardadin"],
    acquisition: { fr: "Acte 3 — Caverne de Wyrm, vaincre Ansur", en: "Act 3 — Wyrm's Cave, defeat Ansur" },
  },
];
