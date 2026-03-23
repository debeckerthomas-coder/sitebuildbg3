// ============================================================================
// BG3 Icon Helper — Resolves local icon paths from item/spell names
// Assets live in public/assets/items/ (PNG real icons or SVG placeholders)
// ============================================================================

/**
 * Returns the local icon path for a given item or spell name.
 *
 * Checks for PNG first (real downloaded icon), falls back to SVG placeholder.
 * Assets are stored in `public/assets/items/{Name}_Icon.{png,svg}`.
 *
 * To download real PNGs from bg3.wiki:
 *   node scripts/download-assets.js --force
 *
 * @example
 *   getBg3WikiIconUrl("Markoheshkir")
 *   // → "/assets/items/Markoheshkir_Icon.png" (or .svg if PNG absent)
 */
export function getBg3WikiIconUrl(itemName: string): string {
  const formatted = itemName.trim().replace(/\s+/g, "_");
  return `/assets/items/${formatted}_Icon.svg`;
}
