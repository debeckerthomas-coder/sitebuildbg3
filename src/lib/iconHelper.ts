// ============================================================================
// BG3 Wiki Icon Helper — Generates official icon URLs from item/spell names
// ============================================================================

/**
 * Returns the official BG3 wiki icon URL for a given item or spell name.
 *
 * The BG3 wiki stores icons at a predictable path:
 *   https://bg3.wiki/wiki/Special:FilePath/{Name}_Icon.png
 *
 * Spaces are replaced by underscores to match MediaWiki file naming.
 *
 * @example
 *   getBg3WikiIconUrl("Markoheshkir")
 *   // → "https://bg3.wiki/wiki/Special:FilePath/Markoheshkir_Icon.png"
 *
 *   getBg3WikiIconUrl("Magic Missile")
 *   // → "https://bg3.wiki/wiki/Special:FilePath/Magic_Missile_Icon.png"
 */
export function getBg3WikiIconUrl(itemName: string): string {
  const formatted = itemName.trim().replace(/\s+/g, "_");
  return `https://bg3.wiki/wiki/Special:FilePath/${formatted}_Icon.png`;
}
