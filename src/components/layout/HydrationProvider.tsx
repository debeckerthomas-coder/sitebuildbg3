"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store";
import { applyThemeToDocument } from "@/lib/theme";

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  const mainBuild = useAppStore((s) => s.party.main);

  // Hydrate store from IndexedDB on mount
  useEffect(() => {
    void useAppStore.getState().hydrate();
  }, []);

  // Interface Caméléon — sync CSS variables to party.main
  useEffect(() => {
    applyThemeToDocument(mainBuild);
  }, [mainBuild]);

  return <>{children}</>;
}
