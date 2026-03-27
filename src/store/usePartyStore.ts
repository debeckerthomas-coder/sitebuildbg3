// ============================================================================
// Party Store — Zustand store for Party Analyzer (4 character slots)
// ============================================================================

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PartyState {
  readonly party: readonly (string | null)[];
  setSlot: (index: number, buildId: string | null) => void;
  clearParty: () => void;
}

export const usePartyStore = create<PartyState>()(
  persist(
    (set) => ({
      party: [null, null, null, null],

      setSlot: (index: number, buildId: string | null) =>
        set((state) => {
          const next = [...state.party];
          next[index] = buildId;
          return { party: next };
        }),

      clearParty: () => set({ party: [null, null, null, null] }),
    }),
    {
      name: "bg3-party-analyzer",
    },
  ),
);
