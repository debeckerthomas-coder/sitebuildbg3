"use client";

// ============================================================================
// LootCard — Premium item display card with rarity glow and wiki icon
// ============================================================================

import { useState } from "react";
import Image from "next/image";
import { getBg3WikiIconUrl } from "@/lib/iconHelper";
import type { ArsenalItem } from "@/data/arsenal";

// ---------------------------------------------------------------------------
// Rarity theming
// ---------------------------------------------------------------------------

const RARITY_STYLES = {
  Legendary: {
    border: "border-yellow-500/40",
    hoverBorder: "hover:border-yellow-500/70",
    glow: "hover:shadow-[0_0_30px_rgba(234,179,8,0.15),inset_0_0_20px_rgba(234,179,8,0.05)]",
    badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    text: "text-yellow-400",
    bar: "from-yellow-500/60 via-yellow-400/30 to-yellow-500/60",
  },
  "Very Rare": {
    border: "border-fuchsia-500/30",
    hoverBorder: "hover:border-fuchsia-500/60",
    glow: "hover:shadow-[0_0_30px_rgba(217,70,239,0.15),inset_0_0_20px_rgba(217,70,239,0.05)]",
    badge: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
    text: "text-fuchsia-400",
    bar: "from-fuchsia-500/60 via-fuchsia-400/30 to-fuchsia-500/60",
  },
  Rare: {
    border: "border-blue-500/30",
    hoverBorder: "hover:border-blue-500/60",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15),inset_0_0_20px_rgba(59,130,246,0.05)]",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    text: "text-blue-400",
    bar: "from-blue-500/60 via-blue-400/30 to-blue-500/60",
  },
  Uncommon: {
    border: "border-green-500/30",
    hoverBorder: "hover:border-green-500/60",
    glow: "hover:shadow-[0_0_30px_rgba(34,197,94,0.15),inset_0_0_20px_rgba(34,197,94,0.05)]",
    badge: "bg-green-500/20 text-green-400 border-green-500/30",
    text: "text-green-400",
    bar: "from-green-500/60 via-green-400/30 to-green-500/60",
  },
} as const;

// ---------------------------------------------------------------------------
// Item type icons (inline SVG)
// ---------------------------------------------------------------------------

function TypeIcon({ type }: { type: ArsenalItem["type"] }) {
  const cls = "w-3.5 h-3.5";
  switch (type) {
    case "Arme":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M14.5 2L20 7.5 7.5 20 2 14.5 14.5 2z" />
          <path d="M2 22l4-4" />
        </svg>
      );
    case "Armure":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M12 2L4 7v5c0 5.25 3.4 10.15 8 11.4 4.6-1.25 8-6.15 8-11.4V7l-8-5z" />
        </svg>
      );
    case "Tête":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <circle cx="12" cy="10" r="7" />
          <path d="M5 17h14" />
          <path d="M7 20h10" />
        </svg>
      );
    case "Anneau":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "Gants":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M6 14v-3a2 2 0 0 1 4 0v-2a2 2 0 0 1 4 0v-1a2 2 0 0 1 4 0v6c0 4-3 6-6 6H9c-3 0-5-2-5-5v-2a2 2 0 0 1 2-2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      );
  }
}

// ---------------------------------------------------------------------------
// LootCard
// ---------------------------------------------------------------------------

interface LootCardProps {
  readonly item: ArsenalItem;
}

export function LootCard({ item }: LootCardProps) {
  const style = RARITY_STYLES[item.rarity];
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group relative flex flex-col rounded-xl overflow-hidden
                  bg-[#111520]/60 backdrop-blur-md
                  border ${style.border} ${style.hoverBorder}
                  transition-all duration-300
                  hover:-translate-y-1 ${style.glow}`}
    >
      {/* Top rarity bar */}
      <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${style.bar}`} />

      {/* Icon + info header */}
      <div className="p-4 pb-3 flex items-start gap-4">
        {/* Wiki icon */}
        <div className={`shrink-0 w-16 h-16 rounded-lg border bg-abyss/60 flex items-center justify-center overflow-hidden ${style.border}`}>
          {!imgError ? (
            <Image
              src={getBg3WikiIconUrl(item.wikiName)}
              alt={item.name}
              width={64}
              height={64}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className={`text-2xl font-display ${style.text} opacity-40`}>
              {item.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-display text-sm leading-tight mb-1 ${style.text}`}>
            {item.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-[9px] font-data font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${style.badge}`}>
              {item.rarity === "Very Rare" ? "Très Rare" : item.rarity === "Legendary" ? "Légendaire" : item.rarity === "Uncommon" ? "Peu Commun" : item.rarity}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-data text-gray-500">
              <TypeIcon type={item.type} />
              {item.type}
            </span>
          </div>
        </div>
      </div>

      {/* Effect */}
      <div className="px-4 pb-3 flex-1">
        <p className="text-xs font-body text-gray-400 leading-relaxed">
          {item.effect}
        </p>
      </div>

      {/* Footer: location + act */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between gap-2 text-[10px] font-data">
          <span className="text-gray-500 truncate" title={item.location}>
            {item.location}
          </span>
          <span className="shrink-0 text-gold/70 bg-gold/10 px-2 py-0.5 rounded">
            Acte {item.act}
          </span>
        </div>
      </div>

      {/* Used by builds */}
      {item.usedBy.length > 0 && (
        <div className="px-4 pb-4 border-t border-border/30 pt-3">
          <p className="text-[9px] font-data text-gray-600 uppercase tracking-wider mb-1.5">
            Utilisé par
          </p>
          <div className="flex flex-wrap gap-1">
            {item.usedBy.map((build) => (
              <span
                key={build}
                className="text-[10px] font-data text-gray-400 bg-abyss/80 px-1.5 py-0.5 rounded border border-border/40"
              >
                {build}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
