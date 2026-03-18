"use client";

import type { ReactNode } from "react";
import { useAppStore } from "@/store";

interface BuildTacticProps {
  readonly target: string;
  readonly children: ReactNode;
}

export function BuildTactic({ target, children }: BuildTacticProps) {
  const mainBuild = useAppStore((s) => s.party.main);

  // No build selected → show everything
  if (!mainBuild) {
    return <>{children}</>;
  }

  // Build matches → highlight
  if (mainBuild === target) {
    return (
      <div className="border-l-2 border-theme/40 bg-theme/5 pl-4 py-1 rounded-r">
        {children}
      </div>
    );
  }

  // Different build selected → hide
  return null;
}
