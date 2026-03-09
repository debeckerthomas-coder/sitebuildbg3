// ============================================================================
// MDX Component Map — Server-compatible map referencing client components
// NO "use client" here — this is imported by the RSC MDXRemote
// ============================================================================

import { BossCard } from "./BossCard";
import { ItemTooltip } from "./ItemTooltip";
import { SpellTooltip } from "./SpellTooltip";
import { Checklist } from "./Checklist";
import { Failsafe } from "./Failsafe";
import { EmergencyMatrix } from "@/components/combat/EmergencyMatrix";
import type { MDXComponentMap } from "@/types";

/**
 * The complete MDX component map.
 * In .mdx files, authors can use these as JSX tags:
 *
 * <BossCard id="netherbrain" />
 * <ItemTooltip id="baldurans_giantslayer">Giantslayer</ItemTooltip>
 * <SpellTooltip id="divine_smite">Divine Smite</SpellTooltip>
 * <Checklist category="item" act={2} />
 * <Failsafe slot="main_hand" buildId="honour_paladin" />
 * <EmergencyMatrix bossId="netherbrain" />
 */
export const mdxComponents: MDXComponentMap & Record<string, React.ComponentType<any>> = {
  BossCard,
  ItemTooltip,
  SpellTooltip,
  Checklist,
  Failsafe,
  EmergencyMatrix,
};
