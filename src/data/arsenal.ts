// ============================================================================
// L'Armurerie — Best-in-Slot items referenced across all Tier S builds
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

export const itemsBiS: readonly ArsenalItem[] = [
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
];

export function getArsenalByAct(act: 1 | 2 | 3): readonly ArsenalItem[] {
  return itemsBiS.filter((item) => item.act === act);
}

export function getArsenalByRarity(rarity: ArsenalItem["rarity"]): readonly ArsenalItem[] {
  return itemsBiS.filter((item) => item.rarity === rarity);
}
