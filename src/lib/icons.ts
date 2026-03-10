// ============================================================================
// Icon URL Utility — BG3 Wiki sourcing + rarity-based CSS fallback
// ============================================================================

import type { Rarity } from "@/types";

/**
 * Maps an English item/spell name to its BG3 Wiki icon URL.
 * Format: spaces → underscores, each word capitalized, suffix `_Icon.png`.
 *
 * Example: "Magic Missile" → "Magic_Missile_Icon.png"
 */
export function getIconUrl(itemName: string): string {
  const formatted = itemName
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("_");

  return `https://bg3.wiki/wiki/Special:FilePath/${formatted}_Icon.png`;
}

/**
 * Rarity → CSS gradient mapping for icon fallback placeholders.
 */
const RARITY_GRADIENTS: Record<Rarity, string> = {
  common: "linear-gradient(135deg, #4a4a4a 0%, #6b6b6b 100%)",
  uncommon: "linear-gradient(135deg, #1a5c1a 0%, #3fbf3f 100%)",
  rare: "linear-gradient(135deg, #1a3a6b 0%, #4d94ff 100%)",
  very_rare: "linear-gradient(135deg, #4a1a6b 0%, #b366ff 100%)",
  legendary: "linear-gradient(135deg, #6b4a00 0%, #ff8c00 100%)",
};

/**
 * Returns inline style for a rarity-based fallback icon placeholder.
 */
export function getRarityFallbackStyle(rarity: Rarity): React.CSSProperties {
  return {
    background: RARITY_GRADIENTS[rarity],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Cinzel', serif",
    fontWeight: 700,
    color: "rgba(255,255,255,0.85)",
    fontSize: "1.25rem",
    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
  };
}
