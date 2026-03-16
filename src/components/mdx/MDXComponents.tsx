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
import { FailsafeCard } from "@/components/cards/FailsafeCard";
import { CodexTooltipById } from "./CodexTooltipById";
import { SingleStepTracker } from "./SingleStepTracker";
import { CombatLogMDX } from "./CombatLogMDX";
import { ChecklistTrackerMDX } from "./ChecklistTrackerMDX";
import { CombatLogSimulatorMDX } from "./CombatLogSimulatorMDX";
import { InteractiveMap } from "@/components/media/InteractiveMap";
import { BossTacticMedia } from "@/components/media/BossTacticMedia";
import { ParallelRoutes, Route } from "./ParallelRoutes";
import { ZoneBanner } from "./ZoneBanner";
import { Accordion } from "./Accordion";
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
 * <FailsafeCard missing="Objet raté" fallback="Plan B" condition="..." />
 * <CodexTooltipById id="elixir_geant_collines" text="Élixir de Force" />
 * <SingleStepTracker stepId="moine_feat" label="Niveau 4 : Prendre le don" />
 * <CombatLogMDX base="1d6" statModifier={5} label="Simuler une attaque" />
 * <ChecklistTracker checklistId="leveling_bard" />
 * <CombatLogSimulator baseDice="1d8" statModifier="5" extraDamage={[...]} />
 */
export const mdxComponents: MDXComponentMap & Record<string, React.ComponentType<any>> = {
  BossCard,
  ItemTooltip,
  SpellTooltip,
  Checklist,
  Failsafe,
  EmergencyMatrix,
  FailsafeCard,
  CodexTooltipById,
  SingleStepTracker,
  CombatLogMDX,
  ChecklistTracker: ChecklistTrackerMDX,
  CombatLogSimulator: CombatLogSimulatorMDX,
  InteractiveMap,
  BossTacticMedia,
  ParallelRoutes,
  Route,
  ZoneBanner,
  Accordion,
};
