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

export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set, get) => ({
    // State
    activeRunId: null,
    runs: [],
    sidebarOpen: true,
    activeTooltip: null,
    currentAct: 1,
    activeBuild: null,

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

    setActiveBuild(buildId: string): void {
      set({ activeBuild: buildId || null });
      void setMetaValue("activeBuild", buildId);
    },

    // Persistence Hydration
    async hydrate(): Promise<void> {
      const [runs, activeRunId, activeBuild] = await Promise.all([
        getAllRuns(),
        getMetaValue("activeRunId"),
        getMetaValue("activeBuild"),
      ]);
      set({
        runs,
        activeRunId: activeRunId ?? null,
        activeBuild: activeBuild ?? null,
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
