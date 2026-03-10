"use client";

// ============================================================================
// InteractiveMap — Zoomable map with pin markers that reveal CodexTooltips
// Usage: <InteractiveMap mapId="act1_surface" pins={[...]} />
// ============================================================================

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CodexTooltipById } from "@/components/mdx/CodexTooltipById";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MapPin {
  /** Unique pin ID */
  readonly id: string;
  /** X position as percentage (0-100) */
  readonly x: number;
  /** Y position as percentage (0-100) */
  readonly y: number;
  /** Pin label shown on hover */
  readonly label: string;
  /** Codex entry ID to show in tooltip */
  readonly codexId?: string;
  /** Pin type for styling */
  readonly type?: "item" | "boss" | "quest" | "merchant";
}

interface InteractiveMapProps {
  /** Map identifier — used for loading the background image */
  readonly mapId: string;
  /** Optional background image src (overrides mapId-based path) */
  readonly src?: string;
  /** Map pins to display */
  readonly pins?: readonly MapPin[];
  /** Alt text for accessibility */
  readonly alt?: string;
  /** Optional children for custom overlays */
  readonly children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Pin type → color mapping
// ---------------------------------------------------------------------------

const PIN_COLORS: Record<string, { bg: string; ring: string; glow: string }> = {
  item: {
    bg: "bg-gold",
    ring: "ring-gold/40",
    glow: "shadow-[0_0_8px_rgba(212,175,55,0.5)]",
  },
  boss: {
    bg: "bg-red-600",
    ring: "ring-red-500/40",
    glow: "shadow-[0_0_8px_rgba(220,38,38,0.5)]",
  },
  quest: {
    bg: "bg-blue-500",
    ring: "ring-blue-400/40",
    glow: "shadow-[0_0_8px_rgba(59,130,246,0.5)]",
  },
  merchant: {
    bg: "bg-emerald-500",
    ring: "ring-emerald-400/40",
    glow: "shadow-[0_0_8px_rgba(52,211,153,0.5)]",
  },
};

// ---------------------------------------------------------------------------
// Pin Component
// ---------------------------------------------------------------------------

function Pin({ pin }: { pin: MapPin }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const pinType = pin.type ?? "item";
  const colors = PIN_COLORS[pinType] as { bg: string; ring: string; glow: string };

  const pinContent = (
    <button
      onClick={() => setShowTooltip(!showTooltip)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`
        absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2
        ${colors.bg} rounded-full ring-2 ${colors.ring} ${colors.glow}
        cursor-pointer transition-transform duration-150 hover:scale-150
        z-10
      `}
      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
      aria-label={pin.label}
    >
      {/* Pulse animation */}
      <span
        className={`absolute inset-0 rounded-full ${colors.bg} animate-ping opacity-30`}
      />
    </button>
  );

  // If there's a codex entry, wrap with tooltip
  if (pin.codexId) {
    return (
      <div className="contents">
        {pinContent}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 pointer-events-none"
              style={{ left: `${pin.x}%`, top: `${pin.y - 2}%` }}
            >
              <div className="-translate-x-1/2 -translate-y-full mb-2">
                <CodexTooltipById id={pin.codexId} text={pin.label} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Simple label tooltip
  return (
    <div className="contents">
      {pinContent}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 pointer-events-none"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div className="-translate-x-1/2 -translate-y-full -mt-3 px-2 py-1 bg-surface border border-border rounded text-xs font-data text-gray-300 whitespace-nowrap">
              {pin.label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InteractiveMap
// ---------------------------------------------------------------------------

export function InteractiveMap({
  mapId,
  src,
  pins = [],
  alt,
  children,
}: InteractiveMapProps) {
  const imageSrc = src ?? `/assets/maps/${mapId}.webp`;

  return (
    <div className="relative w-full rounded-card border-2 border-border overflow-hidden bg-abyss-100 group">
      {/* Dark fantasy frame */}
      <div className="absolute inset-0 border-4 border-gold/10 rounded-card pointer-events-none z-30" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent z-30" />

      {/* Map image */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={alt ?? `Carte interactive — ${mapId}`}
          className="w-full h-auto block"
          loading="lazy"
        />

        {/* Pins overlay */}
        {pins.map((pin) => (
          <Pin key={pin.id} pin={pin} />
        ))}

        {/* Custom overlays */}
        {children}
      </div>

      {/* Map ID label */}
      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-abyss/80 rounded text-[10px] font-data text-gray-500 z-30">
        {mapId}
      </div>
    </div>
  );
}
