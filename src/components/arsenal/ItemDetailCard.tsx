"use client";

// ============================================================================
// ItemDetailCard — Fiche d'objet premium style BG3 tooltip
// ============================================================================

interface ItemDetailCardProps {
  readonly name: string;
  readonly rarity: "common" | "uncommon" | "rare" | "very_rare" | "legendary";
  readonly type: string;
  readonly description: string;
  readonly lore?: string;
  readonly acquisition?: string;
  readonly icon?: string;
}

const RARITY_THEME = {
  legendary: {
    border: "border-orange-500/50",
    shadow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]",
    name: "text-orange-400",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    label: "Legendary",
    bar: "from-orange-500/60 via-yellow-500/40 to-orange-500/60",
  },
  very_rare: {
    border: "border-fuchsia-500/50",
    shadow: "shadow-[0_0_15px_rgba(192,38,211,0.3)]",
    name: "text-fuchsia-400",
    badge: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
    label: "Very Rare",
    bar: "from-fuchsia-500/60 via-purple-500/40 to-fuchsia-500/60",
  },
  rare: {
    border: "border-blue-500/50",
    shadow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    name: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    label: "Rare",
    bar: "from-blue-500/60 via-blue-400/40 to-blue-500/60",
  },
  uncommon: {
    border: "border-green-500/50",
    shadow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    name: "text-green-400",
    badge: "bg-green-500/20 text-green-300 border-green-500/40",
    label: "Uncommon",
    bar: "from-green-500/60 via-green-400/40 to-green-500/60",
  },
  common: {
    border: "border-gray-600/50",
    shadow: "shadow-none",
    name: "text-gray-300",
    badge: "bg-gray-500/20 text-gray-400 border-gray-500/40",
    label: "Common",
    bar: "from-gray-500/60 via-gray-400/40 to-gray-500/60",
  },
} as const;

export function ItemDetailCard({
  name,
  rarity,
  type,
  description,
  lore,
  acquisition,
  icon,
}: ItemDetailCardProps) {
  const theme = RARITY_THEME[rarity];

  return (
    <div
      className={`relative overflow-hidden rounded-lg border bg-[#0b0f19]/90 p-3 md:p-4 backdrop-blur-sm ${theme.border} ${theme.shadow}`}
    >
      {/* Rarity bar — top edge */}
      <div
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${theme.bar}`}
      />

      {/* Header */}
      <div className="mb-3 flex items-start gap-3">
        {icon ? (
          <img
            src={icon}
            alt={name}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-md border border-gray-700 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gray-700 bg-gray-800">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-gray-600">
              <path
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
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
            className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${theme.badge}`}
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

      {/* Lore */}
      {lore && (
        <p className="mt-3 border-t border-gray-800 pt-3 text-sm italic text-gray-500">
          {lore}
        </p>
      )}
    </div>
  );
}
