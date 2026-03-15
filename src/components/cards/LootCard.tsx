"use client";

// ============================================================================
// LootCard "Prestige" — Panneau d'Exposition deux colonnes
// Icône wiki avec lueur de rareté + infos détaillées + CodexTooltip au clic
// ============================================================================

import { useState, useCallback } from "react";
import Image from "next/image";
import { getBg3WikiIconUrl } from "@/lib/iconHelper";
import { CodexTooltip } from "@/components/codex/CodexTooltip";
import { getEntry } from "@/data/database";
import type { ArsenalItem } from "@/data/arsenal";
import type { Rarity } from "@/types";

// ---------------------------------------------------------------------------
// Rarity theming — intensified for Exhibition Panel
// ---------------------------------------------------------------------------

const RARITY_STYLES = {
  Legendary: {
    card: "border-yellow-500/50 hover:border-yellow-400/80",
    glow: "hover:shadow-[0_0_40px_rgba(234,179,8,0.2),inset_0_0_30px_rgba(234,179,8,0.06)]",
    iconBorder: "border-yellow-500/70 shadow-[0_0_20px_rgba(234,179,8,0.35),inset_0_0_12px_rgba(234,179,8,0.15)]",
    iconGlowBg: "bg-yellow-500/10",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    text: "text-yellow-400",
    bar: "from-yellow-500/70 via-yellow-400/40 to-yellow-500/70",
    label: "Légendaire",
    codexRarity: "legendary" as Rarity,
  },
  "Very Rare": {
    card: "border-fuchsia-500/40 hover:border-fuchsia-400/70",
    glow: "hover:shadow-[0_0_40px_rgba(217,70,239,0.2),inset_0_0_30px_rgba(217,70,239,0.06)]",
    iconBorder: "border-fuchsia-500/70 shadow-[0_0_20px_rgba(217,70,239,0.35),inset_0_0_12px_rgba(217,70,239,0.15)]",
    iconGlowBg: "bg-fuchsia-500/10",
    badge: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
    text: "text-fuchsia-400",
    bar: "from-fuchsia-500/70 via-fuchsia-400/40 to-fuchsia-500/70",
    label: "Très Rare",
    codexRarity: "very_rare" as Rarity,
  },
  Rare: {
    card: "border-blue-500/40 hover:border-blue-400/70",
    glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.2),inset_0_0_30px_rgba(59,130,246,0.06)]",
    iconBorder: "border-blue-500/70 shadow-[0_0_20px_rgba(59,130,246,0.35),inset_0_0_12px_rgba(59,130,246,0.15)]",
    iconGlowBg: "bg-blue-500/10",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    text: "text-blue-400",
    bar: "from-blue-500/70 via-blue-400/40 to-blue-500/70",
    label: "Rare",
    codexRarity: "rare" as Rarity,
  },
  Uncommon: {
    card: "border-green-500/40 hover:border-green-400/70",
    glow: "hover:shadow-[0_0_40px_rgba(34,197,94,0.2),inset_0_0_30px_rgba(34,197,94,0.06)]",
    iconBorder: "border-green-500/70 shadow-[0_0_20px_rgba(34,197,94,0.35),inset_0_0_12px_rgba(34,197,94,0.15)]",
    iconGlowBg: "bg-green-500/10",
    badge: "bg-green-500/20 text-green-300 border-green-500/40",
    text: "text-green-400",
    bar: "from-green-500/70 via-green-400/40 to-green-500/70",
    label: "Peu Commun",
    codexRarity: "uncommon" as Rarity,
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
  const style = RARITY_STYLES[item.rarity];
  const [imgError, setImgError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Check if codex entry exists for tooltip
  const codexEntry = getEntry(item.id);

  const handleClick = useCallback(() => {
    if (codexEntry) {
      setShowTooltip((prev) => !prev);
    }
  }, [codexEntry]);

  // Truncate effect to ~120 chars for compact display
  const compactEffect =
    item.effect.length > 120 ? item.effect.slice(0, 117) + "..." : item.effect;

  const cardContent = (
    <div
      onClick={handleClick}
      className={`group relative flex rounded-xl overflow-hidden
                  bg-[#111520]/70 backdrop-blur-md
                  border ${style.card}
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 ${style.glow}
                  ${codexEntry ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* Top rarity bar */}
      <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${style.bar}`} />

      {/* ===== LEFT COLUMN — Icon Showcase (~40%) ===== */}
      <div className="relative flex items-center justify-center p-4 pr-0 shrink-0">
        {/* Ambient glow behind icon */}
        <div
          className={`absolute inset-0 ${style.iconGlowBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
        />

        {/* Icon container with rarity border and glow */}
        <div
          className={`relative w-24 h-24 rounded-xl border-2 ${style.iconBorder}
                      bg-abyss/80 flex items-center justify-center overflow-hidden
                      transition-all duration-300
                      group-hover:scale-105`}
        >
          {/* Inner radial glow */}
          <div
            className={`absolute inset-0 ${style.iconGlowBg} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
            style={{
              background: `radial-gradient(circle at center, ${
                item.rarity === "Legendary"
                  ? "rgba(234,179,8,0.15)"
                  : item.rarity === "Very Rare"
                    ? "rgba(217,70,239,0.15)"
                    : item.rarity === "Rare"
                      ? "rgba(59,130,246,0.15)"
                      : "rgba(34,197,94,0.15)"
              } 0%, transparent 70%)`,
            }}
          />

          {!imgError ? (
            <Image
              src={getBg3WikiIconUrl(item.wikiName)}
              alt={item.name}
              width={96}
              height={96}
              className="relative z-10 w-full h-full object-contain p-1"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className={`relative z-10 text-3xl font-display ${style.text} opacity-40`}>
              {item.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* ===== RIGHT COLUMN — Info Panel (~60%) ===== */}
      <div className="flex-1 min-w-0 p-4 pl-3 flex flex-col justify-between gap-2">
        {/* Title */}
        <h3
          className={`font-display text-sm leading-tight ${style.text} group-hover:brightness-125 transition-all duration-200`}
        >
          {item.name}
        </h3>

        {/* Badge row: Rarity + Type + Act */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`inline-flex items-center text-[8px] font-data font-bold px-1.5 py-0.5 rounded border uppercase tracking-[0.15em] ${style.badge}`}
          >
            {style.label}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[9px] font-data text-gray-500">
            <TypeIcon type={item.type} />
            {item.type}
          </span>
          <span className="text-[9px] font-data text-gold/60 bg-gold/8 px-1.5 py-0.5 rounded">
            Acte {item.act}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-[10px] font-data text-gray-500">
          <LocationIcon />
          <span className="truncate" title={item.location}>
            {item.location}
          </span>
        </div>

        {/* Compact effect */}
        <p className="text-[11px] font-body text-gray-400 leading-relaxed line-clamp-3">
          {compactEffect}
        </p>

        {/* Used by builds */}
        {item.usedBy.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {item.usedBy.map((build) => (
              <span
                key={build}
                className="text-[9px] font-data text-gray-400/80 bg-abyss/80 px-1.5 py-0.5 rounded border border-border/30"
              >
                {build}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Codex indicator dot */}
      {codexEntry && (
        <div className="absolute top-2.5 right-2.5">
          <div
            className={`w-2 h-2 rounded-full ${style.text} opacity-40 group-hover:opacity-80 transition-opacity`}
            style={{ backgroundColor: "currentColor" }}
            title="Cliquer pour plus de détails"
          />
        </div>
      )}
    </div>
  );

  // Wrap in CodexTooltip if codex entry exists
  if (codexEntry) {
    return (
      <CodexTooltip
        name={codexEntry.name}
        icon={getBg3WikiIconUrl(item.wikiName)}
        rarity={style.codexRarity}
        description={codexEntry.description}
        stats={codexEntry.stats}
        tags={codexEntry.tags}
        placement="top"
      >
        {cardContent}
      </CodexTooltip>
    );
  }

  return cardContent;
}
