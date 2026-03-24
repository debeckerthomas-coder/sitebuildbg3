// ============================================================================
// Progress Store — Lightweight persistent checklist (Zustand + localStorage)
// Key: "bg3-honor-tracker"
// ============================================================================

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  checkedItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      checkedItems: {},

      toggleItem: (id: string) =>
        set((state) => ({
          checkedItems: {
            ...state.checkedItems,
            [id]: !state.checkedItems[id],
          },
        })),

      resetProgress: () => set({ checkedItems: {} }),
    }),
    { name: "bg3-honor-tracker" },
  ),
);
