"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store";

export function HydrationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useAppStore.getState().hydrate();
  }, []);

  return <>{children}</>;
}
