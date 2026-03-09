"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store";

/**
 * Hydrate the Zustand store from IndexedDB on first mount.
 * Should be called once in the root layout or a provider.
 */
export function useHydration(): void {
  const hydrated = useRef(false);
  const hydrate = useAppStore((s) => s.hydrate);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      void hydrate();
    }
  }, [hydrate]);
}
