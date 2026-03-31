"use client";

// ============================================================================
// ItemDetailCard — Fiche d'objet premium style BG3 tooltip
// ============================================================================

import { useState } from "react";
import Link from "next/link";
import { getBuildsUsingItem } from "@/data/registry";
import { Card } from "@/components/ui-system";
import type { Rarity } from "@/types";
import type { Locale } from "@/dictionaries";

interface ItemDetailCardProps {
  readonly name: string;
  readonly rarity: Rarity;
  readonly type: string;
  readonly description: string;
  readonly lore?: string;
  readonly acquisition?: string;
  readonly icon?: string;
  readonly itemId?: string;
  readonly lang?: Locale;
}

// ---------------------------------------------------------------------------
// Per-rarity text/badge colors (card border/glow/bar handled by Card)
// ---------------------------------------------------------------------------

const RARITY_CONTENT: Record<Rarity, { name: string; badge: string; label: string }> = {
  legendary: {
    name: "text-rarity-legendary",
    badge: "bg-rarity-legendary/20 text-rarity-legendary border-rarity-legendary/40",
    label: "Legendary",
  },
  very_rare: {
    name: "text-rarity-very_rare",
    badge: "bg-rarity-very_rare/20 text-rarity-very_rare border-rarity-very_rare/40",
    label: "Very Rare",
  },
  rare: {
    name: "text-rarity-rare",
    badge: "bg-rarity-rare/20 text-rarity-rare border-rarity-rare/40",
    label: "Rare",
  },
  uncommon: {
    name: "text-rarity-uncommon",
    badge: "bg-rarity-uncommon/20 text-rarity-uncommon border-rarity-uncommon/40",
    label: "Uncommon",
  },
  common: {
    name: "text-gray-300",
    badge: "bg-gray-500/20 text-gray-400 border-gray-500/40",
    label: "Common",
  },
};

export function ItemDetailCard({
  name,
  rarity,
  type,
  description,
  lore,
  acquisition,
  icon,
  itemId,
  lang = "fr",
}: ItemDetailCardProps) {
  const theme = RARITY_CONTENT[rarity];
  const relatedBuilds = itemId ? getBuildsUsingItem(itemId) : [];
  const [imgError, setImgError] = useState(false);

  return (
    <Card rarity={rarity} accentBar noPadding noAnimation>
      <div className="p-4">
        {/* Header */}
        <div className="mb-3 flex items-start gap-3">
          {icon && !imgError ? (
            <img
              src={icon}
              alt={name}
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-md border border-gray-700 object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#2a3048] bg-[#171b29]">
              <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
                <path d="M12 6L36 42M36 6L12 42" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M8 14h8M32 14h8M8 34h8M32 34h8" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <path d="M24 18L30 24L24 30L18 24Z" stroke="#d4af37" strokeWidth="1.5" fill="#d4af37" fillOpacity="0.15" opacity="0.7" />
              </svg>
            </div>
          )}
          <div className="min-w-0">
            <h3 className={`text-lg font-bold leading-tight break-words ${theme.name}`}>
              {name}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-gray-500">{type}</span>
              <span
                className={`inline-flex items-center rounded-xl border px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${theme.badge}`}
              >
                {theme.label}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-200">{description}</p>

        {/* Acquisition */}
        {acquisition && (
          <div className="mt-3 flex items-start gap-1.5 text-xs text-gray-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{acquisition}</span>
          </div>
        )}

        {/* Synergy badges — builds recommandés */}
        {relatedBuilds.length > 0 && (
          <div className="mt-3 border-t border-gray-800 pt-3">
            <p className="mb-1.5 text-xs font-semibold text-gray-400">
              {lang === "fr" ? "Recommande pour :" : "Best for:"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {relatedBuilds.map((build) => (
                <Link
                  key={build.id}
                  href={`/${lang}/builds/${build.id}`}
                  className="text-xs px-2 py-1 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 hover:border-gold transition-all text-gray-200"
                >
                  {build.title[lang]}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Lore */}
        {lore && (
          <p className="mt-3 border-t border-gray-800 pt-3 text-sm italic text-gray-500">
            {lore}
          </p>
        )}
      </div>
    </Card>
  );
}
