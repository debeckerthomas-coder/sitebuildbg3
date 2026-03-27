"use client";

// ============================================================================
// QuickDecision — Bloc d'aide à la décision "Dark Fantasy / AAA"
// Scannable en 5 secondes : À choisir si / À éviter si / Risque / Pic de puissance
// ============================================================================

import { motion } from "framer-motion";

interface QuickDecisionProps {
  /** Profil idéal du joueur pour ce build */
  readonly bestFor?: string;
  /** Cas où ce build n'est pas recommandé */
  readonly avoidIf?: string;
  /** Niveau de risque en Mode Honneur */
  readonly risk?: string;
  /** Moment clé où le build devient puissant */
  readonly powerSpike?: string;
}

const sections = [
  {
    key: "bestFor" as const,
    label: "À choisir si",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.08"
        />
      </svg>
    ),
    iconColor: "text-emerald-400",
    glowColor: "bg-emerald-500/10",
    labelColor: "text-emerald-500/70",
    textColor: "text-emerald-100/80",
    borderColor: "border-emerald-500/20",
  },
  {
    key: "avoidIf" as const,
    label: "À éviter si",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.08"
        />
        <path
          d="M15 9l-6 6M9 9l6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    iconColor: "text-red-400",
    glowColor: "bg-red-500/10",
    labelColor: "text-red-500/70",
    textColor: "text-red-100/80",
    borderColor: "border-red-500/20",
  },
  {
    key: "risk" as const,
    label: "Risque (Mode Honneur)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path
          d="M12 2L2 20h20L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.08"
        />
        <path
          d="M12 9v4M12 16h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    iconColor: "text-amber-400",
    glowColor: "bg-amber-500/10",
    labelColor: "text-amber-500/70",
    textColor: "text-amber-100/80",
    borderColor: "border-amber-500/20",
  },
  {
    key: "powerSpike" as const,
    label: "Pic de puissance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path
          d="M12 2l2.09 6.26L20 9.27l-4.91 3.82L16.18 20 12 16.77 7.82 20l1.09-6.91L4 9.27l5.91-1.01L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.15"
        />
      </svg>
    ),
    iconColor: "text-yellow-300",
    glowColor: "bg-yellow-400/10",
    labelColor: "text-yellow-400/70",
    textColor: "text-yellow-100/80",
    borderColor: "border-yellow-400/20",
  },
] as const;

export function QuickDecision(props: QuickDecisionProps) {
  const visibleSections = sections.filter((s) => props[s.key]);

  if (visibleSections.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="my-6 rounded-lg overflow-hidden
                 bg-[#0b0f19]/80 backdrop-blur-sm
                 border border-slate-700/40
                 shadow-lg shadow-black/30
                 font-sans [&_p]:!font-sans [&_span]:!font-sans"
    >
      {/* Top accent bar */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />

      {/* Header */}
      <div className="px-3 pt-3 pb-2 sm:px-5 sm:pt-4 flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-slate-400">
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
        <span className="text-[10px] font-data uppercase tracking-[0.2em] text-slate-400/80">
          Décision rapide
        </span>
      </div>

      {/* Grid */}
      <div
        className="grid gap-px bg-slate-700/15 px-3 pb-4 sm:px-5 sm:pb-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {visibleSections.map((section) => (
          <div
            key={section.key}
            className={`flex items-start gap-3 rounded-md p-3
                        border ${section.borderColor}
                        bg-slate-900/40`}
          >
            {/* Icon with glow */}
            <div className="relative flex items-center justify-center w-7 h-7 shrink-0 mt-0.5">
              <div className={`absolute inset-0 rounded-full ${section.glowColor} blur-sm`} />
              <div className={`relative ${section.iconColor}`}>{section.icon}</div>
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className={`text-[10px] font-data uppercase tracking-[0.15em] ${section.labelColor} mb-0.5`}>
                {section.label}
              </p>
              <p className={`text-sm leading-relaxed ${section.textColor}`}>
                {props[section.key]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
