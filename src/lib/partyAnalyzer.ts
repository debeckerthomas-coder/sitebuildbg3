// ============================================================================
// Party Analyzer — Moteur de détection des conflits d'équipement
// Basé sur le Single Source of Truth (registry.ts)
// ============================================================================

import { getBuildWithItems, getUnifiedItem, getRegistryBuild } from "@/data/registry";
import { itemsBilingualV2 } from "@/data/arsenal";
import type { HydratedBuild } from "@/types/models";

// ---------------------------------------------------------------------------
// Types de sortie
// ---------------------------------------------------------------------------

export interface ItemConflict {
  readonly itemId: string;
  readonly itemName: { readonly fr: string; readonly en: string };
  readonly itemIcon: string;
  readonly conflictingBuilds: readonly string[];
}

export interface RoleDiagnostic {
  readonly presentRoles: readonly string[];
  readonly missingRoles: readonly string[];
  readonly balanced: boolean;
}

// Les rôles clés qu'un groupe devrait idéalement couvrir
const KEY_ROLES = ["tank", "striker", "support", "controller"] as const;

// ---------------------------------------------------------------------------
// Résolution du nom bilingue d'un item
// ---------------------------------------------------------------------------

function getItemBilingualName(itemId: string): { fr: string; en: string } {
  const arsenalItem = itemsBilingualV2.find((i) => i.id === itemId);
  if (arsenalItem) {
    return { fr: arsenalItem.name.fr, en: arsenalItem.name.en };
  }
  const unified = getUnifiedItem(itemId);
  if (unified) {
    return { fr: unified.name, en: unified.name };
  }
  return { fr: itemId, en: itemId };
}

function getItemIcon(itemId: string): string {
  const arsenalItem = itemsBilingualV2.find((i) => i.id === itemId);
  if (arsenalItem?.icon) return arsenalItem.icon;
  const unified = getUnifiedItem(itemId);
  return unified?.icon ?? "";
}

// ---------------------------------------------------------------------------
// Moteur d'analyse des conflits
// ---------------------------------------------------------------------------

export function analyzePartyConflicts(
  partyIds: readonly (string | null)[],
): readonly ItemConflict[] {
  // 1. Hydrate les builds non-null
  const builds: { buildId: string; hydrated: HydratedBuild }[] = [];
  for (const id of partyIds) {
    if (!id) continue;
    const hydrated = getBuildWithItems(id);
    if (hydrated) builds.push({ buildId: id, hydrated });
  }

  if (builds.length < 2) return [];

  // 2. Crée un index : itemId -> liste de buildIds qui le réclament (coreItems)
  const itemToBuildIds = new Map<string, string[]>();
  for (const { buildId, hydrated } of builds) {
    for (const itemId of hydrated.coreItems) {
      const existing = itemToBuildIds.get(itemId);
      if (existing) {
        existing.push(buildId);
      } else {
        itemToBuildIds.set(itemId, [buildId]);
      }
    }
  }

  // 3. Filtre les doublons (items réclamés par 2+ builds)
  const conflicts: ItemConflict[] = [];
  for (const [itemId, buildIds] of itemToBuildIds) {
    if (buildIds.length >= 2) {
      conflicts.push({
        itemId,
        itemName: getItemBilingualName(itemId),
        itemIcon: getItemIcon(itemId),
        conflictingBuilds: buildIds,
      });
    }
  }

  return conflicts;
}

// ---------------------------------------------------------------------------
// Analyse de composition — diagnostic des rôles
// ---------------------------------------------------------------------------

export function analyzePartyRoles(
  partyIds: readonly (string | null)[],
): RoleDiagnostic {
  const roles = new Set<string>();

  for (const id of partyIds) {
    if (!id) continue;
    const build = getRegistryBuild(id);
    if (build) roles.add(build.role);
  }

  const presentRoles = Array.from(roles);
  const missingRoles = KEY_ROLES.filter((r) => !roles.has(r));
  const balanced = missingRoles.length === 0;

  return { presentRoles, missingRoles, balanced };
}
