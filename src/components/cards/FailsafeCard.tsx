"use client";

// ============================================================================
// FailsafeCard — Composant visuel "Plan B" autonome
// Affiche un encart élégant quand un objet clé est raté,
// avec l'alternative recommandée et la condition déclencheuse.
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

export function FailsafeCard({ missing, fallback, condition }: FailsafeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="my-5 rounded-card border border-gold/20 bg-[#111520]/60 backdrop-blur-md shadow-lg shadow-black/50 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-2 bg-gold-dark/10 border-b border-gold-dark/20 flex items-center gap-2">
        <span className="text-sm">🔄</span>
        <p className="text-[10px] font-data text-gold uppercase tracking-wider font-semibold">
          Plan B — Failsafe
        </p>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-2">
        {/* Missing item */}
        <div className="flex items-start gap-2">
          <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-blood/20 flex items-center justify-center">
            <span className="text-[10px] text-blood-light">✗</span>
          </span>
          <div>
            <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">Objet manqué</p>
            <p className="text-xs font-display text-blood-light">{missing}</p>
          </div>
        </div>

        {/* Arrow separator */}
        <div className="flex justify-center">
          <span className="text-gray-600 text-xs">↓</span>
        </div>

        {/* Fallback item */}
        <div className="flex items-start gap-2">
          <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-gold/20 flex items-center justify-center">
            <span className="text-[10px] text-gold">✓</span>
          </span>
          <div>
            <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">Remplacer par</p>
            <p className="text-xs font-display text-gold-light">{fallback}</p>
          </div>
        </div>

        {/* Condition */}
        {condition && (
          <p className="text-[10px] font-data text-gray-600 italic pt-1 border-t border-border/30">
            {condition}
          </p>
        )}
      </div>
    </motion.div>
  );
}
