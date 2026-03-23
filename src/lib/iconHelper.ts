// ============================================================================
// BG3 Icon Helper — Resolves local icon paths from item/spell names
// Assets live in public/assets/items/ (SVG icons served locally)
// ============================================================================

/**
 * Returns the local icon path for a given item or spell name.
 *
 * Assets are stored in `public/assets/items/{Name}_Icon.svg`.
 *
 * @example
 *   getBg3WikiIconUrl("Markoheshkir")
 *   // → "/assets/items/Markoheshkir_Icon.svg"
 */
export function getBg3WikiIconUrl(itemName: string): string {
  const formatted = itemName.trim().replace(/\s+/g, "_");
  return `/assets/items/${formatted}_Icon.svg`;
}
