"use client";

// ============================================================================
// CoachAlert — Alerte contextuelle liee a la composition du groupe
// S'affiche UNIQUEMENT si le build requis est present dans le party store.
// Usage MDX : <CoachAlert requiredBuild="sorcadin" priority="warning">...</CoachAlert>
// ============================================================================

import { type ReactNode } from "react";
import { usePartyStore } from "@/store/usePartyStore";

interface CoachAlertProps {
  /** ID du build requis (doit etre present dans le groupe pour afficher l'alerte) */
  readonly requiredBuild: string;
  /** Niveau de priorite visuelle */
  readonly priority?: "info" | "warning" | "critical";
  /** Contenu de l'alerte */
  readonly children: ReactNode;
}

const PRIORITY_CONFIG = {
  info: {
    icon: "\u{1F4A1}",
    borderColor: "border-[#d4af37]",
    bgColor: "bg-[#1c2133]",
    labelColor: "text-[#d4af37]",
    label: "CONSEIL",
  },
  warning: {
    icon: "\u26A0\uFE0F",
    borderColor: "border-[#d4af37]",
    bgColor: "bg-[#1c2133]",
    labelColor: "text-[#d4af37]",
    label: "ATTENTION",
  },
  critical: {
    icon: "\u26A0\uFE0F",
    borderColor: "border-[#8b0000]",
    bgColor: "bg-[#8b0000]/10",
    labelColor: "text-[#c43c3c]",
    label: "CRITIQUE",
  },
} as const;

export function CoachAlert({
  requiredBuild,
  priority = "info",
  children,
}: CoachAlertProps) {
  const party = usePartyStore((s) => s.party);

  // Ne rien afficher si le build requis n'est pas dans le groupe actuel
  if (!party.includes(requiredBuild)) {
    return null;
  }

  const config = PRIORITY_CONFIG[priority];

  return (
    <div
      className={`
        my-4 rounded-lg border-l-4 ${config.borderColor} ${config.bgColor}
        p-4 not-prose
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg shrink-0 mt-0.5" aria-hidden>
          {config.icon}
        </span>
        <div className="min-w-0 flex-1">
          <span
            className={`text-[10px] font-data uppercase tracking-widest font-bold ${config.labelColor}`}
          >
            {config.label}
          </span>
          <div className="mt-1 text-sm font-body text-gray-300 leading-relaxed [&_strong]:text-gray-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
