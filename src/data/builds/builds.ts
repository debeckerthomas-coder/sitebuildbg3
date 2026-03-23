import type { Build } from "@/types";

export const BUILDS: Record<string, Build> = {
  honour_paladin: {
    id: "honour_paladin",
    name: "Paladin Honneur — Châtiment Nucléaire",
    subtitle: "Vengeance 7 / Barde Épées 5 — La Machine à Tuer en Un Tour",
    description:
      "Le mètre-étalon du Mode Honneur. Empilez tous les bonus de dégâts du jeu sur un seul Châtiment Divin critique. Variante Lancer Bagarreur disponible pour la sécurité à distance.",
    thumbnail: "/thumbnails/honour_paladin.webp",
    tier: "S",
    role: "striker",
    race: "Demi-Orc",
    background: "Soldat",
    abilityScores: {
      base: {
        strength: 17,
        dexterity: 10,
        constitution: 14,
        intelligence: 8,
        wisdom: 10,
        charisma: 14,
      },
      racial: { strength: 2, constitution: 1 },
      final: {
        strength: 20,
        dexterity: 10,
        constitution: 16,
        intelligence: 8,
        wisdom: 10,
        charisma: 14,
      },
    },
    levelProgression: [
      { level: 1, class: "paladin", notes: "Paladin au départ pour armure lourde + jets SAG/CHA" },
      { level: 2, class: "paladin", notes: "Châtiment Divin débloqué" },
      { level: 3, class: "paladin", subclass: "vengeance", notes: "Vœu d'Inimitié = Avantage garanti" },
      { level: 4, class: "paladin", feat: "Great Weapon Master", notes: "Maître des Armes Lourdes — attaque bonus sur crit/kill" },
      { level: 5, class: "paladin", notes: "Attaque Supplémentaire" },
      { level: 6, class: "paladin", notes: "Aura de Protection — +CHA à tous les jets dans un rayon de 3m" },
      { level: 7, class: "paladin", notes: "Vengeur Implacable — poursuivez les ennemis en fuite" },
      { level: 8, class: "bard", notes: "Multiclassage Barde pour les emplacements de sorts" },
      { level: 9, class: "bard", notes: "Touche-à-Tout" },
      { level: 10, class: "bard", subclass: "swords", notes: "Barde des Épées — Style de Combat + Floriture de Lame" },
      { level: 11, class: "bard", abilityScoreImprovement: { strength: 1, constitution: 1 }, notes: "FOR à 20 via Amélioration de Caractéristique" },
      { level: 12, class: "bard", notes: "Emplacements de sorts niv. 3 pour Châtiments max" },
    ],
    equipment: [
      {
        slot: "main_hand",
        failsafeChain: {
          slot: "main_hand",
          primary: {
            itemId: "baldurans_giantslayer",
            condition: {
              type: "flag",
              flagId: "ansur_defeated",
              value: true,
            },
          },
          fallbacks: [
            {
              itemId: "flail_of_ages",
              condition: {
                type: "flag",
                flagId: "dammon_alive",
                value: true,
              },
              reason:
                "Pourfendeur de Géants de Balduran indisponible — Ansur pas encore vaincu",
            },
            {
              itemId: "fallback_greatsword",
              reason:
                "Dammon est mort — Fléau des Âges indisponible. Épée du Chaos utilisée à la place.",
            },
          ],
        },
      },
      {
        slot: "helmet",
        failsafeChain: {
          slot: "helmet",
          primary: {
            itemId: "helmet_of_balduran",
            condition: {
              type: "flag",
              flagId: "ansur_defeated",
              value: true,
            },
          },
          fallbacks: [
            {
              itemId: "helldusk_helmet",
              reason: "Ansur pas encore vaincu. Utilisez le Heaume du Crépuscule Infernal en attendant.",
            },
          ],
        },
      },
    ],
    comboCycle: [
      "Vœu d'Inimitié (Action Bonus)",
      "Attaque 1 — Châtiment sur critique (Action)",
      "Attaque 2 — Châtiment (Attaque Supplémentaire)",
      "Floriture de Lame (si niveaux de Barde)",
    ],
    fightingStyle: "great_weapon_fighting",
    tags: ["paladin", "bard", "multiclass", "melee", "burst", "honor-mode"],
  },
};

export function getBuild(id: string): Build | undefined {
  return BUILDS[id];
}
