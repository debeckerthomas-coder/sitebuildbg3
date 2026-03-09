import type { WorldStateFlag } from "@/types";

/**
 * All trackable world-state flags that affect failsafe chains.
 * These are toggled by player checklist actions during a run.
 */
export const WORLD_STATE_FLAGS: readonly WorldStateFlag[] = [
  // ---- ACT 1 ----
  {
    id: "everburn_blade_looted",
    label: "Everburn Blade Looted",
    description: "Picked up the Everburn Blade from Commander Zhalk on the Nautiloid.",
    act: 1,
    default: false,
  },
  {
    id: "dammon_alive",
    label: "Dammon Alive",
    description: "Dammon survived the Tiefling/Goblin conflict and can forge infernal iron items.",
    act: 1,
    default: true,
  },
  {
    id: "karlach_recruited",
    label: "Karlach Recruited",
    description: "Karlach was recruited as a companion.",
    act: 1,
    default: false,
  },

  // ---- ACT 2 ----
  {
    id: "dammon_dead",
    label: "Dammon Dead",
    description: "Dammon died — his forged items are permanently unavailable.",
    act: 2,
    default: false,
  },
  {
    id: "nightsong_freed",
    label: "Nightsong Freed",
    description: "Dame Aylin was freed from the Shadowfell prison.",
    act: 2,
    default: false,
  },
  {
    id: "last_light_destroyed",
    label: "Last Light Inn Destroyed",
    description: "The protective ward at Last Light Inn was broken. Multiple NPCs killed.",
    act: 2,
    default: false,
  },

  // ---- ACT 3 ----
  {
    id: "ansur_defeated",
    label: "Ansur Defeated",
    description: "The undead dragon Ansur in the Wyrmway has been defeated.",
    act: 3,
    default: false,
  },
  {
    id: "raphael_defeated",
    label: "Raphael Defeated",
    description: "Raphael was defeated in the House of Hope.",
    act: 3,
    default: false,
  },
  {
    id: "orpheus_freed",
    label: "Orpheus Freed",
    description: "Orpheus was freed from the Astral Prism.",
    act: 3,
    default: false,
  },
];

export function getWorldStateFlag(id: string): WorldStateFlag | undefined {
  return WORLD_STATE_FLAGS.find((f) => f.id === id);
}
