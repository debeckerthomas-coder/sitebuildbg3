import type { ChecklistItem } from "@/types";

export const CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  // ---- ACTE 1 ----
  {
    id: "loot_everburn",
    label: "Récupérer la Lame Semper-Ardente sur le Commandant Zhalk",
    description: "Tuez ou fouillez Zhalk avant le crash du Nautiloïde. Le timing est serré.",
    act: 1,
    category: "item",
    setsFlag: "everburn_blade_looted",
  },
  {
    id: "recruit_karlach",
    label: "Recruter Karlach",
    description: "Trouvez Karlach près de la rivière dans la zone de la Route Levée. NE l'attaquez PAS.",
    act: 1,
    category: "companion",
    setsFlag: "karlach_recruited",
  },
  {
    id: "save_dammon",
    label: "Sauver Dammon pendant l'attaque des Gobelins",
    description: "Protégez Dammon au Bosquet d'Émeraude. Il se déplacera à l'Auberge de la Dernière Lumière à l'Acte 2.",
    act: 1,
    category: "quest",
    setsFlag: "dammon_alive",
  },

  // ---- ACTE 2 ----
  {
    id: "protect_last_light",
    label: "Protéger l'Auberge de la Dernière Lumière",
    description: "Défendez Isobel pendant l'assaut. Si elle tombe, l'Auberge est détruite.",
    act: 2,
    category: "quest",
  },
  {
    id: "free_nightsong",
    label: "Libérer le Chant Nocturne (Dame Aylin)",
    description: "Dans le Gantelet de Shar en Obscurcie, choisissez de libérer Dame Aylin.",
    act: 2,
    category: "quest",
    setsFlag: "nightsong_freed",
  },
  {
    id: "forge_flail",
    label: "Donner le Fer Infernal à Dammon",
    description: "Dammon forge les améliorations du moteur de Karlach. Disponible uniquement si Dammon a survécu.",
    act: 2,
    category: "item",
    requiredFlag: "dammon_alive",
  },

  // ---- ACTE 3 ----
  {
    id: "defeat_ansur",
    label: "Vaincre Ansur dans la Voie du Wyrm",
    description: "Complétez les épreuves de la Voie du Wyrm et terrassez le dragon mort-vivant. Récompenses : Pourfendeur de Géants de Balduran + Heaume de Balduran.",
    act: 3,
    category: "boss",
    setsFlag: "ansur_defeated",
  },
  {
    id: "defeat_raphael",
    label: "Vaincre Raphaël dans la Maison de l'Espoir",
    description: "Entrez dans la Maison de l'Espoir via le portail d'Helsik. Vainquez Raphaël pour l'armure Helldusk.",
    act: 3,
    category: "boss",
    setsFlag: "raphael_defeated",
  },
  {
    id: "defeat_netherbrain",
    label: "Vaincre le Cerveau Primitif",
    description: "La bataille finale. Utilisez les Pierres du Néant pour dominer ou détruire le Cerveau Primitif.",
    act: 3,
    category: "boss",
  },
];

export function getChecklistByAct(act: 1 | 2 | 3): ChecklistItem[] {
  return CHECKLIST_ITEMS.filter((item) => item.act === act);
}

export function getChecklistByCategory(category: ChecklistItem["category"]): ChecklistItem[] {
  return CHECKLIST_ITEMS.filter((item) => item.category === category);
}
