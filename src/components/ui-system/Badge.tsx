// ============================================================================
// Badge — Design System badge/tag component
// Standardized: text-xs px-2 py-0.5 tracking-wider rounded-xl
// Supports rarity coloring and semantic variants.
// ============================================================================

import type { Rarity } from "@/types";

// ---------------------------------------------------------------------------
// Variant styles
// ---------------------------------------------------------------------------

type BadgeVariant = "default" | "rarity" | "danger" | "success" | "warning";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: "bg-abyss-200 text-gray-400 border-transparent",
  rarity: "", // handled dynamically via RARITY_CLASSES
  danger: "bg-blood/20 text-blood-light border-blood/30",
  success: "bg-emerald-900/20 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-900/20 text-amber-400 border-amber-500/30",
};

const RARITY_CLASSES: Record<Rarity, string> = {
  common: "bg-rarity-common/10 text-rarity-common border-rarity-common/30",
  uncommon: "bg-rarity-uncommon/10 text-rarity-uncommon border-rarity-uncommon/30",
  rare: "bg-rarity-rare/10 text-rarity-rare border-rarity-rare/30",
  very_rare: "bg-rarity-very_rare/10 text-rarity-very_rare border-rarity-very_rare/30",
  legendary: "bg-rarity-legendary/10 text-rarity-legendary border-rarity-legendary/30",
};

const RARITY_LABELS: Record<Rarity, string> = {
  common: "Commun",
  uncommon: "Inhabituel",
  rare: "Rare",
  very_rare: "Tres Rare",
  legendary: "Legendaire",
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface BadgeBaseProps {
  readonly className?: string;
}

interface BadgeDefaultProps extends BadgeBaseProps {
  readonly variant?: Exclude<BadgeVariant, "rarity">;
  readonly rarity?: never;
  readonly children: React.ReactNode;
}

interface BadgeRarityProps extends BadgeBaseProps {
  readonly variant: "rarity";
  readonly rarity: Rarity;
  /** Override the default rarity label */
  readonly children?: React.ReactNode;
}

type BadgeProps = BadgeDefaultProps | BadgeRarityProps;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Badge({
  variant = "default",
  className = "",
  ...rest
}: BadgeProps) {
  if (variant === "rarity") {
    const { rarity, children } = rest as BadgeRarityProps;
    return (
      <span
        className={`
          inline-flex items-center
          text-xs font-data font-bold uppercase
          px-2 py-0.5 tracking-wider
          rounded-xl border
          ${RARITY_CLASSES[rarity]}
          ${className}
        `}
      >
        {children ?? RARITY_LABELS[rarity]}
      </span>
    );
  }

  const { children } = rest as BadgeDefaultProps;
  return (
    <span
      className={`
        inline-flex items-center
        text-xs font-data font-bold uppercase
        px-2 py-0.5 tracking-wider
        rounded-xl border
        ${VARIANT_CLASSES[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
