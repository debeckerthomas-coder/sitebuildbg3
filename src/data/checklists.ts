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

  // ---- ACT 3 ----
  {
    id: "defeat_ansur",
    label: "Defeat Ansur in the Wyrmway",
    description: "Complete the Wyrmway trials and defeat the undead dragon. Rewards: Balduran's Giantslayer + Helmet of Balduran.",
    act: 3,
    category: "boss",
    setsFlag: "ansur_defeated",
  },
  {
    id: "defeat_raphael",
    label: "Defeat Raphael in the House of Hope",
    description: "Enter the House of Hope via Helsik's portal. Defeat Raphael for the Helldusk armour set.",
    act: 3,
    category: "boss",
    setsFlag: "raphael_defeated",
  },
  {
    id: "defeat_netherbrain",
    label: "Defeat the Netherbrain",
    description: "The final battle. Use the Netherstones to dominate or destroy the Elder Brain.",
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
