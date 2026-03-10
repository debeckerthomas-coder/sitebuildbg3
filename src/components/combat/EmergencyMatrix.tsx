"use client";

// ============================================================================
// EmergencyMatrix — Boss Mechanic Alert System
// Pulsing danger borders, severity-based coloring, forced-read UX
// ============================================================================

import { motion } from "framer-motion";
import type { BossMechanic } from "@/types";
import { getBoss } from "@/data/bosses/bosses";

// ---------------------------------------------------------------------------
// Severity Styling
// ---------------------------------------------------------------------------

const SEVERITY_STYLES = {
  info: {
    border: "border-blue-500/40",
    bg: "bg-blue-950/30",
    icon: "ℹ️",
    label: "Info",
    labelColor: "text-blue-400",
    animation: "",
  },
  warning: {
    border: "border-yellow-500/50",
    bg: "bg-yellow-950/20",
    icon: "⚠️",
    label: "Danger",
    labelColor: "text-yellow-400",
    animation: "",
  },
  lethal: {
    border: "border-blood/60",
    bg: "bg-blood-dark/20",
    icon: "💀",
    label: "LÉTAL",
    labelColor: "text-blood-light",
    animation: "animate-pulse-danger",
  },
} as const;

// ---------------------------------------------------------------------------
// Single Mechanic Card
// ---------------------------------------------------------------------------

interface MechanicCardProps {
  readonly mechanic: BossMechanic;
  readonly index: number;
}

function MechanicCard({ mechanic, index }: MechanicCardProps) {
  const style = SEVERITY_STYLES[mechanic.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.4, ease: "easeOut" }}
      className={`
        rounded-card border-2 ${style.border} ${style.bg} ${style.animation}
        p-4 space-y-3
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden>{style.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-display text-sm text-gray-100">
              {mechanic.name}
            </h4>
            <span
              className={`
                text-[10px] font-data font-bold uppercase tracking-widest
                px-1.5 py-0.5 rounded ${style.labelColor}
                ${mechanic.severity === "lethal" ? "bg-blood/20" : "bg-white/5"}
              `}
            >
              {style.label}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Description */}
      <div className="space-y-2">
        <div>
          <p className="text-xs font-data text-gray-400 uppercase tracking-wider mb-1">
            Menace
          </p>
          <p className="text-sm font-body text-gray-200 leading-relaxed">
            {mechanic.description}
          </p>
        </div>

        {/* Counterplay — visually distinct */}
        <div className="bg-abyss/60 rounded px-3 py-2 border border-gold-dark/30">
          <p className="text-xs font-data text-gold uppercase tracking-wider mb-1">
            Contre-mesure
          </p>
          <p className="text-sm font-body text-gold-light leading-relaxed">
            {mechanic.counterplay}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// EmergencyMatrix Component
// ---------------------------------------------------------------------------

interface EmergencyMatrixProps {
  readonly bossId: string;
}

export function EmergencyMatrix({ bossId }: EmergencyMatrixProps) {
  const boss = getBoss(bossId);

  if (!boss) {
    return (
      <div className="text-sm text-gray-500 font-data">
        Boss &quot;{bossId}&quot; introuvable.
      </div>
    );
  }

  // Sort: lethal first, then warning, then info
  const sortedMechanics = [...boss.mechanics].sort((a, b) => {
    const order = { lethal: 0, warning: 1, info: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <div className="my-8 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 rounded-full bg-blood" />
        <div>
          <h3 className="font-display text-base text-blood-light">
            Matrice d&apos;Urgence — {boss.name}
          </h3>
          <p className="text-xs font-data text-gray-400">
            {sortedMechanics.filter((m) => m.severity === "lethal").length} mécanique(s)
            létale(s) détectée(s)
          </p>
        </div>
      </div>

      {/* Mechanic Cards */}
      <div className="space-y-3">
        {sortedMechanics.map((mechanic, i) => (
          <MechanicCard key={mechanic.id} mechanic={mechanic} index={i} />
        ))}
      </div>
    </div>
  );
}
