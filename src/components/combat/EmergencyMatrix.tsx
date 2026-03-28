"use client";

// ============================================================================
// EmergencyMatrix — Boss Mechanic Alert System
// Pulsing danger borders, severity-based coloring, forced-read UX
// ============================================================================

import { motion } from "framer-motion";
import type { BossMechanic } from "@/types";
import { getBoss } from "@/data/bosses/bosses";
import { Badge } from "@/components/ui-system";

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
    label: "DANGER",
    labelColor: "text-yellow-400",
    animation: "animate-pulse-warning",
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
        rounded-card border-2 ${style.border} ${style.animation}
        bg-[#111520]/60 backdrop-blur-md shadow-lg shadow-black/50
        p-4 space-y-3
        transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/20
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
            <Badge variant={mechanic.severity === "lethal" ? "danger" : mechanic.severity === "warning" ? "warning" : "default"}>
              {style.label}
            </Badge>
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
// Supports two modes:
//   1. Boss mode:   <EmergencyMatrix bossId="gortash" />
//   2. Inline mode:  <EmergencyMatrix title="..." severity="warning">children</EmergencyMatrix>
// ---------------------------------------------------------------------------

type Severity = keyof typeof SEVERITY_STYLES;

interface EmergencyMatrixProps {
  readonly bossId?: string;
  readonly title?: string;
  readonly severity?: Severity;
  readonly children?: React.ReactNode;
}

function InlineMatrix({ title, severity, children }: { title: string; severity: Severity; children: React.ReactNode }) {
  const style = SEVERITY_STYLES[severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        my-8 rounded-card border-2 ${style.border} ${style.animation}
        bg-[#111520]/60 backdrop-blur-md shadow-lg shadow-black/50
        p-5 space-y-3
      `}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden>{style.icon}</span>
        <h4 className="font-display text-sm text-gray-100">{title}</h4>
        <Badge variant={severity === "lethal" ? "danger" : severity === "warning" ? "warning" : "default"}>
          {style.label}
        </Badge>
      </div>
      <div className="text-sm font-body text-gray-200 leading-relaxed prose-gold">
        {children}
      </div>
    </motion.div>
  );
}

export function EmergencyMatrix(props: EmergencyMatrixProps) {
  // Inline mode: title + severity + children
  if (props.title && props.severity && props.children) {
    return <InlineMatrix title={props.title} severity={props.severity}>{props.children}</InlineMatrix>;
  }

  // Boss mode: bossId
  const bossId = props.bossId ?? "";
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
