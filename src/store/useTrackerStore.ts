"use client";

// ============================================================================
// Tracker Store — Zustand store for Smart Shopping List checkboxes
// Persists collected items to localStorage
// ============================================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TrackerState {
  readonly collected: Record<string, boolean>;
  toggleItem: (itemId: string) => void;
  clearAll: () => void;
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set) => ({
      collected: {},

      toggleItem: (itemId: string) =>
        set((state) => ({
          collected: {
            ...state.collected,
            [itemId]: !state.collected[itemId],
          },
        })),

      clearAll: () => set({ collected: {} }),
    }),
    {
      name: "bg3-loot-tracker",
    },
  ),
);
