// ============================================================================
// Zustand Store — Global App State with IndexedDB Persistence
// ============================================================================

"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type {
  Act,
  AppStore,
  CodexTooltipData,
  CompanionSlot,
  Party,
  Run,
  RunBuildSelection,
} from "@/types";
import {
  saveRun as persistRun,
  deleteRun as persistDeleteRun,
  getAllRuns,
  getMetaValue,
  setMetaValue,
  onSyncChange,
} from "@/lib/persistence";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createEmptyRun(
  name: string,
  builds: readonly RunBuildSelection[]
): Run {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name,
    createdAt: now,
    updatedAt: now,
    currentAct: 1,
    builds,
    checklist: {},
    worldState: {},
    notes: "",
  };
}

const EMPTY_PARTY: Party = { main: null, comp1: null, comp2: null, comp3: null };

export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set, get) => ({
    // State
    activeRunId: null,
    runs: [],
    sidebarOpen: true,
    activeTooltip: null,
    currentAct: 1,
    party: { ...EMPTY_PARTY },
    activeBuild: null, // synced alias for party.main (backwards compat)

    // Run Management
    createRun(name: string, builds: readonly RunBuildSelection[]): string {
      const run = createEmptyRun(name, builds);
      set((state) => ({
        runs: [...state.runs, run],
        activeRunId: run.id,
      }));
      void persistRun(run);
      void setMetaValue("activeRunId", run.id);
      return run.id;
    },

    deleteRun(runId: string): void {
      set((state) => ({
        runs: state.runs.filter((r) => r.id !== runId),
        activeRunId:
          state.activeRunId === runId ? null : state.activeRunId,
      }));
      void persistDeleteRun(runId);
    },

    setActiveRun(runId: string): void {
      set({ activeRunId: runId });
      void setMetaValue("activeRunId", runId);
    },

    updateRunChecklist(
      runId: string,
      itemId: string,
      checked: boolean
    ): void {
      set((state) => ({
        runs: state.runs.map((run) => {
          if (run.id !== runId) return run;
          const updated: Run = {
            ...run,
            updatedAt: new Date().toISOString(),
            checklist: { ...run.checklist, [itemId]: checked },
          };
          void persistRun(updated);
          return updated;
        }),
      }));
    },

    setWorldStateFlag(
      runId: string,
      flagId: string,
      value: boolean
    ): void {
      set((state) => ({
        runs: state.runs.map((run) => {
          if (run.id !== runId) return run;
          const updated: Run = {
            ...run,
            updatedAt: new Date().toISOString(),
            worldState: { ...run.worldState, [flagId]: value },
          };
          void persistRun(updated);
          return updated;
        }),
      }));
    },

    setCurrentAct(act: Act): void {
      set({ currentAct: act });
    },

    // UI
    toggleSidebar(): void {
      set((state) => ({ sidebarOpen: !state.sidebarOpen }));
    },

    setActiveTooltip(data: CodexTooltipData | null): void {
      set({ activeTooltip: data });
    },

    // Party management
    setMainBuild(buildId: string): void {
      const main = buildId || null;
      set((state) => ({
        party: { ...state.party, main },
        activeBuild: main,
      }));
      void setMetaValue("activeBuild", buildId);
    },

    setCompanion(slot: CompanionSlot, buildId: string | null): void {
      set((state) => ({
        party: { ...state.party, [slot]: buildId || null },
      }));
      void setMetaValue(`party_${slot}`, buildId ?? "");
    },

    clearParty(): void {
      set({ party: { ...EMPTY_PARTY }, activeBuild: null });
      void setMetaValue("activeBuild", "");
      void setMetaValue("party_comp1", "");
      void setMetaValue("party_comp2", "");
      void setMetaValue("party_comp3", "");
    },

    /** @deprecated Use setMainBuild instead. */
    setActiveBuild(buildId: string): void {
      get().setMainBuild(buildId);
    },

    // Persistence Hydration
    async hydrate(): Promise<void> {
      const [runs, activeRunId, activeBuild, comp1, comp2, comp3] =
        await Promise.all([
          getAllRuns(),
          getMetaValue("activeRunId"),
          getMetaValue("activeBuild"),
          getMetaValue("party_comp1"),
          getMetaValue("party_comp2"),
          getMetaValue("party_comp3"),
        ]);
      const main = activeBuild || null;
      set({
        runs,
        activeRunId: activeRunId ?? null,
        party: {
          main,
          comp1: comp1 || null,
          comp2: comp2 || null,
          comp3: comp3 || null,
        },
        activeBuild: main,
      });

      // Multi-tab sync
      onSyncChange(async () => {
        const freshRuns = await getAllRuns();
        const freshActiveId = await getMetaValue("activeRunId");
        set({
          runs: freshRuns,
          activeRunId: freshActiveId ?? get().activeRunId,
        });
      });
    },
  }))
);
