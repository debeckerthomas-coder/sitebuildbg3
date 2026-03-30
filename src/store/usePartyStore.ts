"use client";

// ============================================================================
// Party Store — Zustand store for Party Analyzer with Multi-Run Profiles
// Each profile stores a 4-character party. Persisted via localStorage.
//
// `party` is kept as a top-level field synced to the active profile so
// that all existing selectors like `s.party` continue to work unchanged.
// ============================================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PartyProfile {
  readonly id: string;
  readonly name: string;
  readonly party: readonly (string | null)[];
}

interface PartyState {
  /** All saved profiles */
  readonly profiles: Record<string, PartyProfile>;
  /** Currently active profile ID */
  readonly activeProfileId: string;
  /** Party array of the active profile (kept in sync) */
  readonly party: readonly (string | null)[];

  // --- Slot-level actions (operate on active profile) ---
  setSlot: (index: number, buildId: string | null) => void;
  clearParty: () => void;

  // --- Profile management ---
  createProfile: (name: string) => string;
  switchProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EMPTY_PARTY: readonly (string | null)[] = [null, null, null, null];
const DEFAULT_PROFILE_ID = "default";

let profileCounter = 0;
function generateProfileId(): string {
  return `run_${Date.now()}_${++profileCounter}`;
}

const DEFAULT_PROFILE: PartyProfile = {
  id: DEFAULT_PROFILE_ID,
  name: "Partie 1",
  party: EMPTY_PARTY,
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const usePartyStore = create<PartyState>()(
  persist(
    (set) => ({
      profiles: { [DEFAULT_PROFILE_ID]: DEFAULT_PROFILE },
      activeProfileId: DEFAULT_PROFILE_ID,
      party: EMPTY_PARTY,

      setSlot: (index: number, buildId: string | null) =>
        set((state) => {
          const profile = state.profiles[state.activeProfileId];
          if (!profile) return state;
          const nextParty = [...profile.party];
          nextParty[index] = buildId;
          return {
            party: nextParty,
            profiles: {
              ...state.profiles,
              [state.activeProfileId]: { ...profile, party: nextParty },
            },
          };
        }),

      clearParty: () =>
        set((state) => {
          const profile = state.profiles[state.activeProfileId];
          if (!profile) return state;
          return {
            party: EMPTY_PARTY,
            profiles: {
              ...state.profiles,
              [state.activeProfileId]: { ...profile, party: EMPTY_PARTY },
            },
          };
        }),

      createProfile: (name: string) => {
        const id = generateProfileId();
        set((state) => ({
          profiles: {
            ...state.profiles,
            [id]: { id, name, party: EMPTY_PARTY },
          },
          activeProfileId: id,
          party: EMPTY_PARTY,
        }));
        return id;
      },

      switchProfile: (id: string) =>
        set((state) => {
          const profile = state.profiles[id];
          if (!profile) return state;
          return { activeProfileId: id, party: profile.party };
        }),

      deleteProfile: (id: string) =>
        set((state) => {
          if (id === DEFAULT_PROFILE_ID) return state;
          const { [id]: _removed, ...rest } = state.profiles;
          const switchToDefault = state.activeProfileId === id;
          const newActiveId = switchToDefault ? DEFAULT_PROFILE_ID : state.activeProfileId;
          const newParty = switchToDefault
            ? (rest[DEFAULT_PROFILE_ID]?.party ?? EMPTY_PARTY)
            : state.party;
          return { profiles: rest, activeProfileId: newActiveId, party: newParty };
        }),
    }),
    {
      name: "bg3-party-analyzer",
      version: 1,
      migrate: (persisted: unknown) => {
        const raw = persisted as Record<string, unknown>;
        // Migrate old single-party format (v0) to profiles (v1)
        if (raw && Array.isArray(raw.party) && !raw.profiles) {
          const oldParty = raw.party as (string | null)[];
          const migratedProfile: PartyProfile = {
            id: DEFAULT_PROFILE_ID,
            name: "Partie 1",
            party: oldParty,
          };
          return {
            profiles: { [DEFAULT_PROFILE_ID]: migratedProfile },
            activeProfileId: DEFAULT_PROFILE_ID,
            party: oldParty,
          };
        }
        return raw;
      },
    },
  ),
);
