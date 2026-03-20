"use client";

// ============================================================================
// FailsafeCard — Composant visuel "Plan B" Dark Fantasy Warning
// Bouée de sauvetage stylisée : affiche l'objet manqué + l'alternative
// ============================================================================

import { motion } from "framer-motion";

interface FailsafeCardProps {
  /** Objet manqué */
  readonly missing: string;
  /** Objet de remplacement (Plan B) */
  readonly fallback: string;
  /** Condition optionnelle qui explique pourquoi l'objet est manqué */
  readonly condition?: string;
}

function ShieldIcon() {
  return (
    <div className="relative flex items-center justify-center w-9 h-9 shrink-0">
      {/* Glow backdrop */}
      <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-sm" />
      <svg viewBox="0 0 24 24" fill="none" className="relative w-5 h-5 text-amber-400">
        <path
          d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 8v4M12 15h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-amber-500/50">
      <path
        d="M12 5v14M5 12l7 7 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FailsafeCard({ missing, fallback, condition }: FailsafeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="my-6 rounded-lg overflow-hidden
                 bg-gradient-to-br from-amber-950/25 via-surface-raised to-surface
                 border border-amber-700/20
                 shadow-lg shadow-amber-950/20
                 font-sans [&_p]:!font-sans [&_span]:!font-sans"
    >
      {/* Top accent bar */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="p-5">
        {/* Header — Shield icon + missing item */}
        <div className="flex items-center gap-3">
          <ShieldIcon />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-data uppercase tracking-[0.15em] text-amber-500/50 mb-0.5">
              Objet manqué
            </p>
            <p className="text-amber-200 font-semibold text-base leading-snug tracking-wide">
              {missing}
            </p>
          </div>
        </div>

        {/* Separator with arrow */}
        <div className="flex items-center gap-3 my-3 pl-[14px]">
          <ArrowDown />
          <div className="flex-1 h-px bg-gradient-to-r from-amber-700/20 to-transparent" />
        </div>

        {/* Fallback — Plan B */}
        <div className="flex items-start gap-3 pl-1">
          <div className="relative flex items-center justify-center w-9 h-9 shrink-0">
            <div className="absolute inset-0 rounded-full bg-emerald-500/8 blur-sm" />
            <svg viewBox="0 0 24 24" fill="none" className="relative w-5 h-5 text-emerald-400">
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12" cy="12" r="9"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.08"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-data uppercase tracking-[0.15em] text-emerald-500/50 mb-0.5">
              Plan B — Alternative
            </p>
            <p className="text-gray-200 leading-relaxed text-sm">
              {fallback}
            </p>
          </div>
        </div>

        {/* Condition optionnelle */}
        {condition && (
          <div className="mt-4 pt-3 border-t border-amber-700/10 flex items-start gap-2 pl-1">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-500">
              <path
                d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 018 4zm0 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                fill="currentColor"
                fillOpacity="0.5"
              />
            </svg>
            <p className="text-xs text-gray-500 leading-relaxed">
              {condition}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
