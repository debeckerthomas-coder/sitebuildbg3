import type { ChecklistItem } from "@/types";

export const CHECKLIST_ITEMS: readonly ChecklistItem[] = [
  // ---- ACT 1 ----
  {
    id: "loot_everburn",
    label: "Loot Everburn Blade from Commander Zhalk",
    description: "Kill or loot Zhalk before the Nautiloid crashes. Requires careful timing.",
    act: 1,
    category: "item",
    setsFlag: "everburn_blade_looted",
  },
  {
    id: "recruit_karlach",
    label: "Recruit Karlach",
    description: "Find Karlach near the river in the Risen Road area. Do NOT attack her.",
    act: 1,
    category: "companion",
    setsFlag: "karlach_recruited",
  },
  {
    id: "save_dammon",
    label: "Save Dammon during the Goblin attack",
    description: "Protect Dammon at the Emerald Grove. He will move to Last Light Inn in Act 2.",
    act: 1,
    category: "quest",
    setsFlag: "dammon_alive",
  },

  // ---- ACT 2 ----
  {
    id: "protect_last_light",
    label: "Protect Last Light Inn",
    description: "Defend Isobel during the assault. If she falls, Last Light is destroyed.",
    act: 2,
    category: "quest",
  },
  {
    id: "free_nightsong",
    label: "Free the Nightsong (Dame Aylin)",
    description: "In the Shadowfell Gauntlet of Shar, choose to free Dame Aylin.",
    act: 2,
    category: "quest",
    setsFlag: "nightsong_freed",
  },
  {
    id: "forge_flail",
    label: "Give Infernal Iron to Dammon",
    description: "Dammon forges Karlach's engine upgrades. Available only if Dammon survived.",
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
