"use client";

// ============================================================================
// FailsafeCard — Composant visuel "Plan B" Glassmorphism Prestige
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

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-amber-400"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ChainIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-amber-500"
    >
      <path d="M15 7h3a5 5 0 0 1 0 10h-3m-6 0H6a5 5 0 0 1 0-10h3" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

export function FailsafeCard({ missing, fallback, condition }: FailsafeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="my-5 rounded-xl overflow-hidden
                 bg-[#111520]/80 backdrop-blur-md
                 border-l-4 border-l-amber-500 border-y border-r border-amber-500/20
                 shadow-lg shadow-amber-900/20
                 transition-transform hover:-translate-y-1"
    >
      {/* ===== EN-TÊTE — Ce qui vous manque ===== */}
      <div className="px-4 py-3 flex items-center gap-2.5">
        <WarningIcon />
        <div className="min-w-0">
          <p className="text-[10px] font-data text-gray-400 uppercase tracking-wider">
            Si vous avez manqué
          </p>
          <p className="text-sm font-display text-red-400 truncate">
            {missing}
          </p>
        </div>
      </div>

      {/* ===== CONTENU — Le Plan B ===== */}
      <div className="mx-4 mb-4 bg-amber-900/10 p-3 rounded">
        <div className="flex items-center gap-2 mb-1">
          <ChainIcon />
          <p className="text-[10px] font-data text-amber-400/80 uppercase tracking-wider font-semibold">
            Plan B — Remplacer par
          </p>
        </div>
        <p className="text-sm font-display text-amber-100 pl-6">
          {fallback}
        </p>
      </div>

      {/* Condition optionnelle */}
      {condition && (
        <div className="px-4 pb-3">
          <p className="text-[10px] font-data text-gray-500 italic border-t border-amber-500/10 pt-2">
            {condition}
          </p>
        </div>
      )}
    </motion.div>
  );
}
