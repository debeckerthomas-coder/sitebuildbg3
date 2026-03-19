"use client";

// ============================================================================
// FailsafeCard — Composant visuel "Plan B" AAA Dark Fantasy Warning
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

function WarningTriangle() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-5 h-5 shrink-0 text-red-500"
    >
      <path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0 text-red-400/60">
      <path
        d="M9 5l7 7-7 7"
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="my-6 rounded-r-lg overflow-hidden
                 bg-red-950/30 backdrop-blur-sm
                 border-l-4 border-red-500
                 shadow-lg shadow-red-950/30"
    >
      <div className="p-5">
        {/* Header — Warning + missing item */}
        <div className="flex items-start gap-3 mb-3">
          <WarningTriangle />
          <div className="min-w-0">
            <p className="text-red-400 font-bold text-lg leading-snug">
              {missing}
            </p>
          </div>
        </div>

        {/* Fallback — Plan B */}
        <div className="flex items-start gap-3 pl-1 mt-4">
          <ArrowIcon />
          <div className="min-w-0">
            <p className="text-[10px] font-data uppercase tracking-widest text-red-400/50 mb-1">
              Plan B
            </p>
            <p className="text-gray-300 leading-relaxed text-sm">
              {fallback}
            </p>
          </div>
        </div>

        {/* Condition optionnelle */}
        {condition && (
          <p className="mt-4 pt-3 border-t border-red-500/10 text-xs text-gray-500 italic pl-1">
            {condition}
          </p>
        )}
      </div>
    </motion.div>
  );
}
