import type { WorldStateFlag } from "@/types";

/**
 * All trackable world-state flags that affect failsafe chains.
 * These are toggled by player checklist actions during a run.
 */
export const WORLD_STATE_FLAGS: readonly WorldStateFlag[] = [
  // ---- ACTE 1 ----
  {
    id: "everburn_blade_looted",
    label: "Épée de Flammes Éternelles récupérée",
    description: "L'Épée de Flammes Éternelles a été récupérée sur le Commandant Zhalk dans le Nautiloïde.",
    act: 1,
    default: false,
  },
  {
    id: "dammon_alive",
    label: "Dammon en vie",
    description: "Dammon a survécu au conflit Tieffelins/Gobelins et peut forger des objets en fer infernal.",
    act: 1,
    default: true,
  },
  {
    id: "karlach_recruited",
    label: "Karlach recrutée",
    description: "Karlach a été recrutée comme compagnonne.",
    act: 1,
    default: false,
  },

  // ---- ACTE 2 ----
  {
    id: "dammon_dead",
    label: "Dammon mort",
    description: "Dammon est mort — ses objets forgés sont définitivement indisponibles.",
    act: 2,
    default: false,
  },
  {
    id: "nightsong_freed",
    label: "Chantsenuit libérée",
    description: "Dame Aylin a été libérée de la prison du Gisombre.",
    act: 2,
    default: false,
  },
  {
    id: "last_light_destroyed",
    label: "Auberge de la Dernière Lumière détruite",
    description: "La protection magique de l'Auberge de la Dernière Lumière a été brisée. Plusieurs PNJ tués.",
    act: 2,
    default: false,
  },

  // ---- ACTE 3 ----
  {
    id: "ansur_defeated",
    label: "Ansur vaincu",
    description: "Le dragon mort-vivant Ansur dans la Voie du Wyrm a été vaincu.",
    act: 3,
    default: false,
  },
  {
    id: "raphael_defeated",
    label: "Raphaël vaincu",
    description: "Raphaël a été vaincu dans la Maison de l'Espoir.",
    act: 3,
    default: false,
  },
  {
    id: "orpheus_freed",
    label: "Orphée libéré",
    description: "Orphée a été libéré du Prisme Astral.",
    act: 3,
    default: false,
  },
];

export function getWorldStateFlag(id: string): WorldStateFlag | undefined {
  return WORLD_STATE_FLAGS.find((f) => f.id === id);
}
