"use client";

import type { ReactNode } from "react";
import { useAppStore } from "@/store";

interface BuildTacticProps {
  readonly target: string;
  readonly children: ReactNode;
}

export function BuildTactic({ target, children }: BuildTacticProps) {
  const activeBuild = useAppStore((s) => s.activeBuild);

  // No build selected → show everything
  if (!activeBuild) {
    return <>{children}</>;
  }

  // Build matches → highlight
  if (activeBuild === target) {
    return (
      <div className="border-l-2 border-gold/40 bg-gold/5 pl-4 py-1 rounded-r">
        {children}
      </div>
    );
  }

  // Different build selected → hide
  return null;
}
