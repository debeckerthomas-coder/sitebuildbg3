// ============================================================================
// DATABASE UNIFIÉE — Codex BG3 en français
// Objets, sorts, et boss accessibles via getEntry(id)
// ============================================================================

import type { Rarity } from "@/types";

// ---------------------------------------------------------------------------
// Types du Codex
// ---------------------------------------------------------------------------

export interface CodexEntry {
  readonly id: string;
  readonly name: string;
  readonly type: "objet" | "sort" | "boss" | "capacité";
  readonly rarity: Rarity;
  readonly description: string;
  readonly stats: readonly { readonly label: string; readonly value: string }[];
  readonly iconUrl: string;
  readonly tags: readonly string[];
}

// ---------------------------------------------------------------------------
// Dictionnaire principal — 15+ entrées réelles BG3
// ---------------------------------------------------------------------------

export const CODEX: Record<string, CodexEntry> = {
  // ===== OBJETS =====
  markoheshkir: {
    id: "markoheshkir",
    name: "Markoheshkir",
    type: "objet",
    rarity: "legendary",
    description:
      "Un bâton légendaire qui permet de choisir un type de dégâts élémentaires. Accorde le sort Projection de Globe d'Invulnérabilité une fois par long repos.",
    stats: [
      { label: "Dégâts", value: "1d8+3 contondants" },
      { label: "Enchantement", value: "+3" },
      { label: "Emplacement", value: "Deux mains" },
      { label: "Capacité", value: "Élément de Karsus (1×/long repos)" },
      { label: "Localisation", value: "Tour de Ramazith — Acte 3" },
    ],
    iconUrl: "/assets/icons/markoheshkir.webp",
    tags: ["bâton", "légendaire", "acte-3", "magicien"],
  },

  nyrulna: {
    id: "nyrulna",
    name: "Nyrulna",
    type: "objet",
    rarity: "legendary",
    description:
      "Trident légendaire qui revient automatiquement après un lancer. Inflige des dégâts de tonnerre supplémentaires et crée une explosion de 6m de rayon à l'impact.",
    stats: [
      { label: "Dégâts", value: "1d8+3 perforants" },
      { label: "Bonus", value: "+1d6 tonnerre" },
      { label: "Enchantement", value: "+3" },
      { label: "Spécial", value: "Retour automatique, Explosion AoE" },
      { label: "Localisation", value: "Cirque Ambulant d'Akabi — Acte 3" },
    ],
    iconUrl: "/assets/icons/nyrulna.webp",
    tags: ["trident", "légendaire", "acte-3", "lancer"],
  },

  baldurans_giantslayer: {
    id: "baldurans_giantslayer",
    name: "Pourfendeuse de Géant de Baldur",
    type: "objet",
    rarity: "legendary",
    description:
      "Cette épée à deux mains légendaire double le modificateur de Force sur les jets de dégâts. Confère l'Avantage aux jets d'attaque contre les créatures Grande, Énorme ou Gargantuesque.",
    stats: [
      { label: "Dégâts", value: "2d6+3 tranchants" },
      { label: "Enchantement", value: "+3" },
      { label: "Passif", value: "Double le mod. de Force" },
      { label: "Capacité", value: "Forme de Géant (27 PV temp.)" },
      { label: "Localisation", value: "Voie du Wyrm — vaincre Ansur" },
    ],
    iconUrl: "/assets/icons/giantslayer.webp",
    tags: ["épée-à-deux-mains", "légendaire", "acte-3", "force"],
  },

  helmet_of_balduran: {
    id: "helmet_of_balduran",
    name: "Heaume de Baldur",
    type: "objet",
    rarity: "legendary",
    description:
      "Régénère 2 PV au début de chaque tour. Confère +1 à la CA et aux jets de sauvegarde. Empêche les coups critiques contre le porteur.",
    stats: [
      { label: "CA", value: "+1" },
      { label: "Sauvegardes", value: "+1" },
      { label: "Régénération", value: "2 PV/tour" },
      { label: "Passif", value: "Anti-critique" },
      { label: "Localisation", value: "Voie du Wyrm — vaincre Ansur" },
    ],
    iconUrl: "/assets/icons/helmet_balduran.webp",
    tags: ["casque", "légendaire", "acte-3", "défensif"],
  },

  everburn_blade: {
    id: "everburn_blade",
    name: "Lame Toujours Ardente",
    type: "objet",
    rarity: "uncommon",
    description:
      "Cette lame est enveloppée de flammes magiques. Elle inflige 1d4 dégâts de feu supplémentaires à chaque coup.",
    stats: [
      { label: "Dégâts", value: "2d6 tranchants + 1d4 feu" },
      { label: "Emplacement", value: "Deux mains" },
      { label: "Localisation", value: "Nautiloïde — piller le Cdt. Zhalk" },
    ],
    iconUrl: "/assets/icons/everburn_blade.webp",
    tags: ["épée-à-deux-mains", "inhabituel", "acte-1", "feu"],
  },

  flail_of_ages: {
    id: "flail_of_ages",
    name: "Fléau des Âges",
    type: "objet",
    rarity: "very_rare",
    description:
      "Fléau légendaire forgé par Dammon à partir de fer infernal. Inflige des dégâts de feu supplémentaires et ralentit les ennemis.",
    stats: [
      { label: "Dégâts", value: "1d8+2 contondants + 1d6 feu" },
      { label: "Enchantement", value: "+2" },
      { label: "Passif", value: "Lenteur Brûlante (JdS CON)" },
      { label: "Localisation", value: "Dammon — Auberge de la Dernière Lumière" },
    ],
    iconUrl: "/assets/icons/flail_of_ages.webp",
    tags: ["fléau", "très-rare", "acte-2", "feu", "dammon"],
  },

  helldusk_armour: {
    id: "helldusk_armour",
    name: "Armure Infernale",
    type: "objet",
    rarity: "legendary",
    description:
      "Armure lourde légendaire. Réduit tous les dégâts de 2, inflige des dégâts de feu aux attaquants en mêlée. Le porteur ne peut pas être Brûlé. Réussite automatique aux JdS contre les sorts de niveau 3 ou moins.",
    stats: [
      { label: "CA", value: "21" },
      { label: "Réduction", value: "-2 à tous les dégâts" },
      { label: "Résistance", value: "Feu" },
      { label: "Passif", value: "Contre-attaque de feu en mêlée" },
      { label: "Localisation", value: "Maison de l'Espoir — vaincre Raphaël" },
    ],
    iconUrl: "/assets/icons/helldusk_armour.webp",
    tags: ["armure-lourde", "légendaire", "acte-3", "feu"],
  },

  // ===== OBJETS (Acte 1 — Route Pacifique) =====

  epee_flammes_eternelles: {
    id: "epee_flammes_eternelles",
    name: "Épée de Flammes Éternelles",
    type: "objet",
    rarity: "uncommon",
    description:
      "Épée à deux mains enveloppée de flammes magiques. Volée au Commandant Zhalk sur le Nautiloïde, c'est la meilleure arme de l'Acte 1.",
    stats: [
      { label: "Dégâts", value: "2d6 tranchants + 1d4 feu" },
      { label: "Emplacement", value: "Deux mains" },
      { label: "Localisation", value: "Nautiloïde — Cdt. Zhalk" },
    ],
    iconUrl: "/assets/icons/everburn_blade.webp",
    tags: ["épée-à-deux-mains", "inhabituel", "acte-1", "feu", "nautiloïde"],
  },

  elixir_geant_collines: {
    id: "elixir_geant_collines",
    name: "Élixir de Force de Géant des Collines",
    type: "objet",
    rarity: "uncommon",
    description:
      "Fixe la Force à 21 jusqu'au prochain Long Repos. Empilable avec d'autres buffs, ce qui permet aux classes non-martiales de frapper aussi fort qu'un Barbare. Disponible chez Tatie Ethel via le Vendor Refresh.",
    stats: [
      { label: "Effet", value: "Force → 21" },
      { label: "Durée", value: "Jusqu'au Long Repos" },
      { label: "Source", value: "Tatie Ethel (Vendor Refresh)" },
    ],
    iconUrl: "/assets/icons/elixir_giant.webp",
    tags: ["consommable", "inhabituel", "acte-1", "force", "élixir"],
  },

  etincelle_electrique: {
    id: "etincelle_electrique",
    name: "Étincelle Électrique",
    type: "objet",
    rarity: "uncommon",
    description:
      "Bâton qui octroie le tour de magie Éclair de Sorcière et le sort Aiguille de Sorcière. Excellent pour les lanceurs de sorts en début de partie.",
    stats: [
      { label: "Dégâts", value: "1d6 contondants" },
      { label: "Sort octroyé", value: "Éclair de Sorcière, Aiguille de Sorcière" },
      { label: "Localisation", value: "Camp Gobelin — Marchand" },
    ],
    iconUrl: "/assets/icons/lightning_spark.webp",
    tags: ["bâton", "inhabituel", "acte-1", "foudre"],
  },

  ombrecoeur: {
    id: "ombrecoeur",
    name: "Ombrecœur",
    type: "objet",
    rarity: "rare",
    description:
      "Masse +1 accordée par Shar à Shadowheart. Inflige 1d6 dégâts nécrotiques supplémentaires contre les ennemis non protégés par la lumière. Essentielle pour l'Acte 2.",
    stats: [
      { label: "Dégâts", value: "1d6+1 contondants + 1d6 nécrotique" },
      { label: "Enchantement", value: "+1" },
      { label: "Passif", value: "Bonus nécrotique hors lumière" },
    ],
    iconUrl: "/assets/icons/shadowheart_mace.webp",
    tags: ["masse", "rare", "acte-1", "nécrotique", "shadowheart"],
  },

  // ===== SORTS (Acte 1) =====

  injonction: {
    id: "injonction",
    name: "Injonction",
    type: "sort",
    rarity: "common",
    description:
      "Sort de niveau 1. Ordonne à une cible de Fuir, s'Approcher, S'arrêter, Lâcher son arme, ou Tomber à terre. 'Lâcher' force un ennemi à laisser tomber son arme — crucial pour voler l'Épée de Flammes Éternelles sur le Nautiloïde.",
    stats: [
      { label: "Niveau", value: "1" },
      { label: "JdS", value: "Sagesse" },
      { label: "Options", value: "Fuir, Approcher, Arrêter, Lâcher, Terre" },
      { label: "Portée", value: "18m" },
    ],
    iconUrl: "/assets/icons/command.webp",
    tags: ["enchantement", "clerc", "contrôle", "acte-1"],
  },

  fletrir: {
    id: "fletrir",
    name: "Flétrissure",
    type: "sort",
    rarity: "rare",
    description:
      "Sort de niveau 4. Draine l'énergie vitale de la cible, infligeant 8d8 dégâts nécrotiques (JdS CON pour moitié). Les plantes et les créatures aquatiques subissent le maximum de dégâts.",
    stats: [
      { label: "Niveau", value: "4" },
      { label: "Dégâts", value: "8d8 nécrotique" },
      { label: "JdS", value: "Constitution (moitié)" },
      { label: "Spécial", value: "Dégâts max vs plantes" },
    ],
    iconUrl: "/assets/icons/blight.webp",
    tags: ["nécromancie", "occultiste", "dégâts", "nécrotique"],
  },

  // ===== SORTS (existants) =====
  divine_smite: {
    id: "divine_smite",
    name: "Châtiment Divin",
    type: "sort",
    rarity: "rare",
    description:
      "Dépensez un emplacement de sort pour infliger 2d8 dégâts radiants (+1d8 par niveau au-dessus du 1er). +1d8 supplémentaire contre les Morts-vivants/Fiélons. Tous les dés sont doublés sur un coup critique.",
    stats: [
      { label: "Dégâts", value: "2d8 radiants (base)" },
      { label: "Scaling", value: "+1d8/niveau" },
      { label: "Bonus", value: "+1d8 vs Mort-vivant/Fiélon" },
      { label: "Critique", value: "Tous les dés doublés" },
      { label: "Ressource", value: "Emplacement de sort" },
    ],
    iconUrl: "/assets/icons/divine_smite.webp",
    tags: ["paladin", "mêlée", "radiant", "châtiment"],
  },

  haste: {
    id: "haste",
    name: "Hâte",
    type: "sort",
    rarity: "rare",
    description:
      "La cible gagne +2 CA, l'Avantage aux JdS de Dextérité, et une Action supplémentaire par tour. Quand le sort prend fin, la cible est Léthargique pendant 1 tour.",
    stats: [
      { label: "Niveau", value: "3" },
      { label: "Concentration", value: "Oui" },
      { label: "Portée", value: "9m" },
      { label: "Bonus CA", value: "+2" },
      { label: "Action", value: "Action supplémentaire" },
    ],
    iconUrl: "/assets/icons/haste.webp",
    tags: ["transmutation", "buff", "concentration", "action-economy"],
  },

  eldritch_blast: {
    id: "eldritch_blast",
    name: "Décharge Occulte",
    type: "sort",
    rarity: "common",
    description:
      "Projette un rayon d'énergie crépitante. Aux niveaux supérieurs, projette des rayons supplémentaires (2 au niv. 5, 3 au niv. 10).",
    stats: [
      { label: "Dégâts", value: "1d10 force" },
      { label: "Portée", value: "36m" },
      { label: "Type", value: "Tour de magie" },
      { label: "Scaling", value: "Rayons multiples" },
    ],
    iconUrl: "/assets/icons/eldritch_blast.webp",
    tags: ["occultiste", "tour-de-magie", "force", "distance"],
  },

  counterspell: {
    id: "counterspell",
    name: "Contresort",
    type: "sort",
    rarity: "rare",
    description:
      "Interrompt une créature en train de lancer un sort. Si le sort est de niveau 3 ou inférieur, il échoue automatiquement. Les sorts de niveau supérieur nécessitent un jet de caractéristique.",
    stats: [
      { label: "Niveau", value: "3" },
      { label: "Temps", value: "Réaction" },
      { label: "Portée", value: "18m" },
      { label: "Auto-réussite", value: "Sort ≤ niv. 3" },
    ],
    iconUrl: "/assets/icons/counterspell.webp",
    tags: ["abjuration", "réaction", "contre"],
  },

  vow_of_enmity: {
    id: "vow_of_enmity",
    name: "Vœu d'Inimitié",
    type: "capacité",
    rarity: "rare",
    description:
      "Action Bonus. Gagnez l'Avantage à tous les jets d'attaque contre une cible pendant 1 minute. La capacité signature du Serment de Vengeance.",
    stats: [
      { label: "Action", value: "Action Bonus" },
      { label: "Durée", value: "1 minute" },
      { label: "Effet", value: "Avantage aux attaques" },
      { label: "Sous-classe", value: "Serment de Vengeance" },
    ],
    iconUrl: "/assets/icons/vow_of_enmity.webp",
    tags: ["paladin", "vengeance", "avantage", "cible-unique"],
  },

  great_weapon_master: {
    id: "great_weapon_master",
    name: "Maître des Armes à Deux Mains",
    type: "capacité",
    rarity: "uncommon",
    description:
      "Quand vous infligez un coup critique ou tuez une créature, vous pouvez effectuer une attaque supplémentaire en Action Bonus. Vous pouvez aussi choisir de subir -5 au jet d'attaque pour infliger +10 dégâts.",
    stats: [
      { label: "Bonus dégâts", value: "+10 (optionnel)" },
      { label: "Malus attaque", value: "-5 (optionnel)" },
      { label: "Spécial", value: "Attaque bonus sur crit/kill" },
    ],
    iconUrl: "/assets/icons/gwm.webp",
    tags: ["don", "mêlée", "dégâts", "arme-lourde"],
  },

  sanctuary: {
    id: "sanctuary",
    name: "Sanctuaire",
    type: "sort",
    rarity: "common",
    description:
      "Protège une créature. Les ennemis qui ciblent la créature protégée doivent réussir un JdS de Sagesse ou choisir une autre cible. Le sort se termine si la créature protégée attaque ou lance un sort offensif.",
    stats: [
      { label: "Niveau", value: "1" },
      { label: "Action", value: "Action Bonus" },
      { label: "Durée", value: "10 tours" },
      { label: "JdS", value: "Sagesse" },
    ],
    iconUrl: "/assets/icons/sanctuary.webp",
    tags: ["abjuration", "protection", "clerc"],
  },

  // ===== OBJETS (Acte 2 — Terres Maudites) =====

  hallebarde_vigilance: {
    id: "hallebarde_vigilance",
    name: "Hallebarde de Vigilance",
    type: "objet",
    rarity: "very_rare",
    description:
      "Hallebarde +2 qui confère l'Avantage aux jets d'initiative et empêche d'être Surpris. Achetable chez Roah Moonglow dans les Tours de Hautelune.",
    stats: [
      { label: "Dégâts", value: "1d10+2 tranchants" },
      { label: "Enchantement", value: "+2" },
      { label: "Passif", value: "Avantage à l'initiative, anti-Surprise" },
      { label: "Source", value: "Roah Moonglow — Tours de Hautelune" },
    ],
    iconUrl: "/assets/icons/halberd_vigilance.webp",
    tags: ["hallebarde", "très-rare", "acte-2", "initiative"],
  },

  sang_de_lathandre: {
    id: "sang_de_lathandre",
    name: "Le Sang de Lathandre",
    type: "objet",
    rarity: "legendary",
    description:
      "Masse légendaire bénie par Lathandre. Inflige des dégâts radiants supplémentaires et aveugle les Morts-vivants à proximité. Essentielle contre l'Apôtre de Myrkul pour désactiver ses attaques de zone.",
    stats: [
      { label: "Dégâts", value: "1d6+3 contondants + 1d6 radiant" },
      { label: "Enchantement", value: "+3" },
      { label: "Passif", value: "Aura aveuglante (Morts-vivants, 6m)" },
      { label: "Capacité", value: "Bouclier Solaire (1×/long repos)" },
      { label: "Localisation", value: "Monastère de Rosymorn — Acte 2" },
    ],
    iconUrl: "/assets/icons/blood_of_lathander.webp",
    tags: ["masse", "légendaire", "acte-2", "radiant", "anti-mort-vivant"],
  },

  lanterne_lunaire: {
    id: "lanterne_lunaire",
    name: "Lanterne Lunaire",
    type: "objet",
    rarity: "rare",
    description:
      "Lanterne enchantée qui protège contre la malédiction d'ombre des Terres Maudites. Contient une Pixie prisonnière — la libérer octroie une bénédiction permanente à tout le groupe.",
    stats: [
      { label: "Effet", value: "Protection contre la Malédiction d'Ombre" },
      { label: "Spécial", value: "Libérer la Pixie = immunité permanente" },
      { label: "Source", value: "Convoi de Kar'niss / Tours de Hautelune" },
    ],
    iconUrl: "/assets/icons/moonlantern.webp",
    tags: ["lumière", "rare", "acte-2", "protection"],
  },

  gants_maitre_armes: {
    id: "gants_maitre_armes",
    name: "Gants du Maître d'Armes",
    type: "objet",
    rarity: "very_rare",
    description:
      "Confèrent la maîtrise de TOUTES les armes. Idéal pour les lanceurs de sorts qui veulent utiliser des armes martiales sans multiclassage.",
    stats: [
      { label: "Effet", value: "Maîtrise de toutes les armes" },
      { label: "Source", value: "Araj Oblodra — Tours de Hautelune" },
    ],
    iconUrl: "/assets/icons/gloves_weapon_master.webp",
    tags: ["gants", "très-rare", "acte-2", "maîtrise"],
  },

  // ===== SORTS (Acte 2 — Combat) =====

  silence: {
    id: "silence",
    name: "Silence",
    type: "sort",
    rarity: "uncommon",
    description:
      "Crée une sphère de silence de 6m de rayon. Aucun sort à composante verbale ne peut être lancé dans la zone. Essentiel contre les lanceurs de sorts comme Balthazar.",
    stats: [
      { label: "Niveau", value: "2" },
      { label: "Zone", value: "Sphère 6m" },
      { label: "Concentration", value: "Oui" },
      { label: "Effet", value: "Bloque les sorts verbaux" },
    ],
    iconUrl: "/assets/icons/silence.webp",
    tags: ["illusion", "contrôle", "anti-mage", "acte-2"],
  },

  tenebres: {
    id: "tenebres",
    name: "Ténèbres",
    type: "sort",
    rarity: "uncommon",
    description:
      "Crée une sphère d'obscurité magique de 4,5m de rayon. Les créatures non-aveugles à l'intérieur sont Aveuglées. Contre l'Apôtre de Myrkul, désactive ses attaques de zone dévastatrices.",
    stats: [
      { label: "Niveau", value: "2" },
      { label: "Zone", value: "Sphère 4,5m" },
      { label: "Concentration", value: "Oui" },
      { label: "Effet", value: "Aveuglement dans la zone" },
    ],
    iconUrl: "/assets/icons/darkness.webp",
    tags: ["évocation", "contrôle", "aveuglement", "acte-2"],
  },

  invisibilite: {
    id: "invisibilite",
    name: "Invisibilité",
    type: "sort",
    rarity: "uncommon",
    description:
      "Rend une créature invisible jusqu'à ce qu'elle attaque ou lance un sort. Permet le repositionnement tactique avant un combat crucial.",
    stats: [
      { label: "Niveau", value: "2" },
      { label: "Concentration", value: "Oui" },
      { label: "Durée", value: "10 tours" },
      { label: "Effet", value: "Invisible (fin si attaque/sort)" },
    ],
    iconUrl: "/assets/icons/invisibility.webp",
    tags: ["illusion", "furtivité", "repositionnement"],
  },

  cecite: {
    id: "cecite",
    name: "Cécité",
    type: "sort",
    rarity: "uncommon",
    description:
      "Aveugle une créature (JdS CON). La créature aveuglée a le Désavantage aux attaques et les attaques contre elle ont l'Avantage. Crucial contre l'Apôtre de Myrkul.",
    stats: [
      { label: "Niveau", value: "2" },
      { label: "JdS", value: "Constitution" },
      { label: "Durée", value: "10 tours" },
      { label: "Pas de Concentration", value: "Oui" },
    ],
    iconUrl: "/assets/icons/blindness.webp",
    tags: ["nécromancie", "contrôle", "aveuglement"],
  },

  pas_brumeux: {
    id: "pas_brumeux",
    name: "Pas Brumeux",
    type: "sort",
    rarity: "uncommon",
    description:
      "Téléportation courte (18m) en Action Bonus. Permet de repositionner instantanément un personnage hors de danger ou sur une position tactique.",
    stats: [
      { label: "Niveau", value: "2" },
      { label: "Action", value: "Action Bonus" },
      { label: "Portée", value: "18m" },
      { label: "Effet", value: "Téléportation" },
    ],
    iconUrl: "/assets/icons/misty_step.webp",
    tags: ["conjonction", "mobilité", "action-bonus"],
  },

  doigt_de_mort: {
    id: "doigt_de_mort",
    name: "Doigt de Mort",
    type: "sort",
    rarity: "legendary",
    description:
      "Sort de niveau 7. Inflige 7d8+30 dégâts nécrotiques (JdS CON pour moitié). Si la cible meurt, elle se relève en zombie sous votre contrôle. Utilisé par l'Apôtre de Myrkul en Mode Honneur.",
    stats: [
      { label: "Niveau", value: "7" },
      { label: "Dégâts", value: "7d8+30 nécrotique" },
      { label: "JdS", value: "Constitution (moitié)" },
      { label: "Spécial", value: "Zombie si la cible meurt" },
    ],
    iconUrl: "/assets/icons/finger_of_death.webp",
    tags: ["nécromancie", "dégâts", "nécrotique", "mort-vivant"],
  },

  lumiere_du_jour: {
    id: "lumiere_du_jour",
    name: "Lumière du Jour",
    type: "sort",
    rarity: "rare",
    description:
      "Crée une sphère de lumière vive de 18m de rayon. Dissipe toute obscurité magique de niveau 3 ou inférieur. Plan B contre la malédiction d'ombre si la Lanterne Lunaire est perdue.",
    stats: [
      { label: "Niveau", value: "3" },
      { label: "Zone", value: "Sphère 18m" },
      { label: "Durée", value: "10 tours" },
      { label: "Spécial", value: "Dissipe l'obscurité magique" },
    ],
    iconUrl: "/assets/icons/daylight.webp",
    tags: ["évocation", "lumière", "protection", "acte-2"],
  },

  // ===== OBJETS (Acte 3 — Endgame) =====

  anneau_regeneration: {
    id: "anneau_regeneration",
    name: "Anneau de Régénération",
    type: "objet",
    rarity: "very_rare",
    description:
      "Régénère 1d4 PV au début de chaque tour. Se cumule avec le Heaume de Baldur pour une régénération massive. Disponible au Magasin des Sorcelleries.",
    stats: [
      { label: "Régénération", value: "1d4 PV/tour" },
      { label: "Source", value: "Magasin des Sorcelleries — Ville Basse" },
    ],
    iconUrl: "/assets/icons/ring_regen.webp",
    tags: ["anneau", "très-rare", "acte-3", "régénération"],
  },

  heritage_maitres: {
    id: "heritage_maitres",
    name: "Héritage des Maîtres",
    type: "objet",
    rarity: "very_rare",
    description:
      "Gants qui confèrent +2 aux jets d'attaque et de dégâts avec les armes. Achetables chez Dammon à la Forge des Neuf (s'il a survécu).",
    stats: [
      { label: "Bonus attaque", value: "+2" },
      { label: "Bonus dégâts", value: "+2" },
      { label: "Source", value: "Dammon — Forge des Neuf (Acte 3)" },
    ],
    iconUrl: "/assets/icons/legacy_masters.webp",
    tags: ["gants", "très-rare", "acte-3", "dégâts"],
  },

  globe_invulnerabilite: {
    id: "globe_invulnerabilite",
    name: "Globe d'Invulnérabilité",
    type: "sort",
    rarity: "legendary",
    description:
      "Sort de niveau 6. Crée une barrière immobile qui annule tout sort de niveau 5 ou inférieur dans la zone. Contre obligatoire pour Stormheart Nova d'Ansur et les AoE de Raphaël.",
    stats: [
      { label: "Niveau", value: "6" },
      { label: "Zone", value: "Sphère 3m" },
      { label: "Concentration", value: "Oui" },
      { label: "Effet", value: "Immunité sorts ≤ niv. 5" },
    ],
    iconUrl: "/assets/icons/globe_invuln.webp",
    tags: ["abjuration", "protection", "acte-3", "boss"],
  },

  delivrance_maledictions: {
    id: "delivrance_maledictions",
    name: "Délivrance des Malédictions",
    type: "sort",
    rarity: "uncommon",
    description:
      "Sort de niveau 3. Purge toutes les malédictions d'une créature. Contre OBLIGATOIRE du Marquage Tyrannique de Gortash (~110 dégâts de force = mort instantanée si non purgé).",
    stats: [
      { label: "Niveau", value: "3" },
      { label: "Action", value: "Action" },
      { label: "Portée", value: "Contact" },
      { label: "Effet", value: "Purge toutes les malédictions" },
    ],
    iconUrl: "/assets/icons/remove_curse.webp",
    tags: ["abjuration", "purge", "acte-3", "gortash"],
  },

  immobilisation_personne: {
    id: "immobilisation_personne",
    name: "Immobilisation de Personne",
    type: "sort",
    rarity: "uncommon",
    description:
      "Sort de niveau 2. Paralyse un humanoïde (JdS SAG). La cible paralysée est automatiquement critiquée en mêlée. Fonctionne sur Gortash (humanoïde).",
    stats: [
      { label: "Niveau", value: "2" },
      { label: "JdS", value: "Sagesse" },
      { label: "Concentration", value: "Oui" },
      { label: "Spécial", value: "Critiques automatiques en mêlée" },
    ],
    iconUrl: "/assets/icons/hold_person.webp",
    tags: ["enchantement", "contrôle", "paralysie", "humanoïde"],
  },

  projectile_magique: {
    id: "projectile_magique",
    name: "Projectile Magique",
    type: "sort",
    rarity: "common",
    description:
      "Sort de niveau 1. Projette 3 missiles qui touchent automatiquement (pas de jet d'attaque). Upcasté au niveau 5-6, génère assez de missiles pour briser les 12 charges d'Implacable d'Orin en une action.",
    stats: [
      { label: "Niveau", value: "1+" },
      { label: "Dégâts", value: "1d4+1 force × 3 (base)" },
      { label: "Touche", value: "Automatique (pas de JdA)" },
      { label: "Upcast", value: "+1 missile/niveau" },
    ],
    iconUrl: "/assets/icons/magic_missile.webp",
    tags: ["évocation", "force", "auto-touche", "acte-3", "orin"],
  },

  casque_acuite_arcanique: {
    id: "casque_acuite_arcanique",
    name: "Casque d'Acuité Arcanique",
    type: "objet",
    rarity: "very_rare",
    description:
      "Casque qui applique Acuité Arcanique sur les cibles touchées par des sorts de contrôle. La cible subit -1 aux JdS par charge (cumul jusqu'à -7). Rend les sorts de contrôle quasi-imparables.",
    stats: [
      { label: "Effet", value: "Acuité Arcanique (-1 JdS/charge)" },
      { label: "Cumul max", value: "7 charges" },
      { label: "Localisation", value: "Grymforge — Acte 1" },
    ],
    iconUrl: "/assets/icons/arcane_acuity.webp",
    tags: ["casque", "très-rare", "contrôle", "acuité"],
  },

  robe_de_la_trame: {
    id: "robe_de_la_trame",
    name: "Robe de la Trame",
    type: "objet",
    rarity: "very_rare",
    description:
      "Robe qui confère +1 au DD de sort, +1 aux jets d'attaque des sorts, et le sort Armure de Mage permanent. Trouvée dans la Chambre Forte des Sorcelleries, Acte 3.",
    stats: [
      { label: "CA", value: "10 + DEX + Armure de Mage (+3)" },
      { label: "DD sort", value: "+1" },
      { label: "Attaque sort", value: "+1" },
      { label: "Passif", value: "Armure de Mage permanent" },
      { label: "Localisation", value: "Chambre Forte des Sorcelleries" },
    ],
    iconUrl: "/assets/icons/robe_weave.webp",
    tags: ["robe", "très-rare", "acte-3", "lanceur-de-sorts"],
  },

  liberte_de_mouvement: {
    id: "liberte_de_mouvement",
    name: "Liberté de Mouvement",
    type: "sort",
    rarity: "rare",
    description:
      "Sort de niveau 4. Immunise la cible aux effets qui restreignent le mouvement : paralysie, agrippement, ralentissement, terrain difficile. Dure 1 heure, pas de concentration.",
    stats: [
      { label: "Niveau", value: "4" },
      { label: "Durée", value: "1 heure" },
      { label: "Concentration", value: "Non" },
      { label: "Effet", value: "Immunité aux restrictions de mouvement" },
    ],
    iconUrl: "/assets/icons/freedom_of_movement.webp",
    tags: ["abjuration", "protection", "anti-contrôle"],
  },

  eclair: {
    id: "eclair",
    name: "Éclair",
    type: "sort",
    rarity: "rare",
    description:
      "Sort de niveau 3. Projette un trait de foudre de 30m de long sur 1,5m de large. Inflige 8d6 dégâts de foudre (JdS DEX pour moitié). Excellent contre le Titan de la Garde d'Acier (vulnérabilité Foudre).",
    stats: [
      { label: "Niveau", value: "3" },
      { label: "Dégâts", value: "8d6 foudre" },
      { label: "Zone", value: "Ligne 30m × 1,5m" },
      { label: "JdS", value: "Dextérité (moitié)" },
    ],
    iconUrl: "/assets/icons/lightning_bolt.webp",
    tags: ["évocation", "foudre", "dégâts", "AoE"],
  },

  diadem_arcane_synergy: {
    id: "diadem_arcane_synergy",
    name: "Diadème de Synergie Arcanique",
    type: "objet",
    rarity: "very_rare",
    description:
      "Lorsque vous infligez une condition, vous gagnez Synergie Arcanique : votre modificateur de Charisme s'ajoute aux dégâts d'arme. Essentiel pour le Lockadin — triple Charisme aux dégâts.",
    stats: [
      { label: "Effet", value: "Synergie Arcanique (+CHA aux dégâts)" },
      { label: "Déclencheur", value: "Infliger une condition" },
      { label: "Localisation", value: "Crèche Y'llek — Acte 1.5" },
    ],
    iconUrl: "/assets/icons/diadem_arcane_synergy.webp",
    tags: ["casque", "très-rare", "acte-1", "charisme", "lockadin"],
  },

  sword_of_chaos: {
    id: "sword_of_chaos",
    name: "Épée du Chaos",
    type: "objet",
    rarity: "very_rare",
    description:
      "Épée à deux mains qui soigne le porteur de 1d6 PV à chaque coup. Les soins combinés aux résistances du Paladin Parjure rendent le porteur quasi-immortel.",
    stats: [
      { label: "Dégâts", value: "2d6+2 tranchants" },
      { label: "Enchantement", value: "+2" },
      { label: "Passif", value: "Soigne 1d6 PV par coup" },
      { label: "Localisation", value: "Tribunal du Meurtre — Acte 3" },
    ],
    iconUrl: "/assets/icons/sword_of_chaos.webp",
    tags: ["épée-à-deux-mains", "très-rare", "acte-3", "soin", "lockadin"],
  },

  armor_persistence: {
    id: "armor_persistence",
    name: "Armure de la Persévérance",
    type: "objet",
    rarity: "very_rare",
    description:
      "Armure lourde qui réduit tous les dégâts subis de 2 de façon permanente et confère l'Avantage aux jets de sauvegarde. Achetable chez Dammon à l'Acte 3.",
    stats: [
      { label: "CA", value: "19" },
      { label: "Réduction", value: "-2 à tous les dégâts" },
      { label: "Passif", value: "Avantage aux JdS" },
      { label: "Source", value: "Dammon — Acte 3" },
    ],
    iconUrl: "/assets/icons/armor_persistence.webp",
    tags: ["armure-lourde", "très-rare", "acte-3", "défensif"],
  },

  shield_of_faith: {
    id: "shield_of_faith",
    name: "Bouclier de la Foi",
    type: "sort",
    rarity: "common",
    description:
      "Un champ scintillant entoure une créature, lui conférant +2 à la CA pendant toute la durée. Nécessite la concentration.",
    stats: [
      { label: "Niveau", value: "1" },
      { label: "Bonus CA", value: "+2" },
      { label: "Concentration", value: "Oui" },
      { label: "Durée", value: "10 tours" },
    ],
    iconUrl: "/assets/icons/shield_of_faith.webp",
    tags: ["abjuration", "buff", "CA", "paladin", "clerc"],
  },
};

// ---------------------------------------------------------------------------
// API d'accès
// ---------------------------------------------------------------------------

export function getEntry(id: string): CodexEntry | undefined {
  return CODEX[id];
}

export function getEntriesByType(type: CodexEntry["type"]): CodexEntry[] {
  return Object.values(CODEX).filter((e) => e.type === type);
}

export function getEntriesByRarity(rarity: Rarity): CodexEntry[] {
  return Object.values(CODEX).filter((e) => e.rarity === rarity);
}

export function getAllEntries(): CodexEntry[] {
  return Object.values(CODEX);
}
