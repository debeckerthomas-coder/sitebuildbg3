"use client";

// ============================================================================
// LootCard "Prestige" — Panneau d'Exposition deux colonnes
// Icône wiki avec lueur de rareté + infos détaillées (no tooltip)
// ============================================================================

import { useState } from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { getBg3WikiIconUrl } from "@/lib/iconHelper";
import { Card, Badge } from "@/components/ui-system";
import type { Rarity } from "@/types";

// Legacy interface kept locally — LootCard is no longer actively used
interface ArsenalItem {
  readonly id: string;
  readonly name: string;
  readonly wikiName: string;
  readonly type: "Arme" | "Armure" | "Tête" | "Gants" | "Bottes" | "Anneau" | "Amulette" | "Cape" | "Bouclier";
  readonly rarity: "Legendary" | "Very Rare" | "Rare" | "Uncommon";
  readonly act: 1 | 2 | 3;
  readonly location: string;
  readonly effect: string;
  readonly usedBy: readonly string[];
}

// ---------------------------------------------------------------------------
// Map legacy PascalCase rarity to design system Rarity
// ---------------------------------------------------------------------------

const RARITY_MAP: Record<ArsenalItem["rarity"], Rarity> = {
  Legendary: "legendary",
  "Very Rare": "very_rare",
  Rare: "rare",
  Uncommon: "uncommon",
};

// ---------------------------------------------------------------------------
// Per-rarity styles for content elements (icon border, badge, text)
// Card-level border/glow/bar are now handled by the design system Card.
// ---------------------------------------------------------------------------

const RARITY_CONTENT = {
  Legendary: {
    iconBorder: "border-yellow-500/70 shadow-[0_0_20px_rgba(234,179,8,0.35),inset_0_0_12px_rgba(234,179,8,0.15)]",
    iconGlowBg: "bg-yellow-500/10",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    text: "text-yellow-400",
    label: "Légendaire",
  },
  "Very Rare": {
    iconBorder: "border-fuchsia-500/70 shadow-[0_0_20px_rgba(217,70,239,0.35),inset_0_0_12px_rgba(217,70,239,0.15)]",
    iconGlowBg: "bg-fuchsia-500/10",
    badge: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
    text: "text-fuchsia-400",
    label: "Très Rare",
  },
  Rare: {
    iconBorder: "border-blue-500/70 shadow-[0_0_20px_rgba(59,130,246,0.35),inset_0_0_12px_rgba(59,130,246,0.15)]",
    iconGlowBg: "bg-blue-500/10",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    text: "text-blue-400",
    label: "Rare",
  },
  Uncommon: {
    iconBorder: "border-green-500/70 shadow-[0_0_20px_rgba(34,197,94,0.35),inset_0_0_12px_rgba(34,197,94,0.15)]",
    iconGlowBg: "bg-green-500/10",
    badge: "bg-green-500/20 text-green-300 border-green-500/40",
    text: "text-green-400",
    label: "Peu Commun",
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
    case "Bottes":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M7 21h10l2-6-3-1V8a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v6l-3 1 2 6z" />
        </svg>
      );
    case "Cape":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M12 3c-4 0-7 2-7 5v8c0 2 3 5 7 5s7-3 7-5V8c0-3-3-5-7-5z" />
        </svg>
      );
    case "Amulette":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M12 2v4" />
          <circle cx="12" cy="14" r="6" />
          <circle cx="12" cy="14" r="2" />
          <path d="M8 6h8" />
        </svg>
      );
    case "Bouclier":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M12 2L4 7v5c0 5.25 3.4 10.15 8 11.4 4.6-1.25 8-6.15 8-11.4V7l-8-5z" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
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
// Location icon
// ---------------------------------------------------------------------------

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// LootCard — Exhibition Panel
// ---------------------------------------------------------------------------

interface LootCardProps {
  readonly item: ArsenalItem;
}

export function LootCard({ item }: LootCardProps) {
  const content = RARITY_CONTENT[item.rarity];
  const mappedRarity = RARITY_MAP[item.rarity];
  const [imgError, setImgError] = useState(false);

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#fbbf24"
      glarePosition="all"
      scale={1.02}
      transitionSpeed={2000}
      className="h-full"
    >
      <Card
        rarity={mappedRarity}
        accentBar
        noPadding
        noAnimation
        className="h-full transition-transform duration-300 ease-out hover:-translate-y-1"
      >
        <div className="flex flex-row h-full w-full">
          {/* ===== LEFT COLUMN — Image (1/3) ===== */}
          <div className="w-1/3 min-w-[100px] flex-shrink-0 flex items-center justify-center bg-black/50 p-4 relative">
            <div
              className={`absolute inset-0 ${content.iconGlowBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
            />
            <div
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 ${content.iconBorder}
                          bg-abyss/80 flex items-center justify-center overflow-hidden
                          transition-all duration-300 group-hover:scale-105`}
            >
              {imgError ? (
                <div className="flex items-center justify-center bg-[#171b29] border border-[#2a3048] w-full h-full rounded-lg">
                  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                    <path d="M12 6L36 42M36 6L12 42" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <path d="M8 14h8M32 14h8M8 34h8M32 34h8" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                    <path d="M24 18L30 24L24 30L18 24Z" stroke="#d4af37" strokeWidth="1.5" fill="#d4af37" fillOpacity="0.15" opacity="0.7" />
                  </svg>
                </div>
              ) : (
                <Image
                  src={getBg3WikiIconUrl(item.wikiName)}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="relative z-10 w-full h-full object-contain p-1"
                  onError={() => setImgError(true)}
                  unoptimized
                />
              )}
            </div>
          </div>

          {/* ===== RIGHT COLUMN — Text (2/3) ===== */}
          <div className="w-2/3 flex flex-col p-4 overflow-hidden">
            <h3 className="font-display text-sm leading-tight text-gradient-gold">
              {item.name}
            </h3>
            <p className="text-sm font-body text-gray-300 leading-relaxed mt-1.5 line-clamp-3 text-ellipsis overflow-hidden">
              {item.effect}
            </p>

            <div className="mt-auto pt-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[10px] font-data text-gray-500">
                <LocationIcon />
                <span className="truncate">{item.location}</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="rarity" rarity={mappedRarity}>
                  {content.label}
                </Badge>
                <span className="inline-flex items-center gap-0.5 text-[9px] font-data text-gray-500">
                  <TypeIcon type={item.type} />
                  {item.type}
                </span>
                <Badge className="bg-gold/10 text-gold/60 border-gold/20">
                  Acte {item.act}
                </Badge>
              </div>

              {item.usedBy.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.usedBy.map((build) => (
                    <Badge key={build}>{build}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Tilt>
  );
}
