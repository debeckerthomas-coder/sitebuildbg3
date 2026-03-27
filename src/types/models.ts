// ============================================================================
// Single Source of Truth — Unified Models & Relational Types
// Architecture: Graphe relationnel Builds <-> Items
// ============================================================================

import type { Rarity, ItemSlot, Act, BG3Class, BG3Subclass } from "./index";

// ---------------------------------------------------------------------------
// 1. Item — Modèle unifié (compatible avec les deux sources existantes)
// ---------------------------------------------------------------------------

export interface UnifiedItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly rarity: Rarity;
  readonly icon: string;
  readonly acquisition: string;
  readonly act: Act;
  readonly slot?: ItemSlot;
  readonly tags?: readonly string[];
}

// ---------------------------------------------------------------------------
// 2. Power Spike — Points de puissance clés d'un build
// ---------------------------------------------------------------------------

export interface PowerSpike {
  readonly level: number;
  readonly description: string;
}

// ---------------------------------------------------------------------------
// 3. Build — Modèle relationnel avec références aux Items par ID
// ---------------------------------------------------------------------------

export interface UnifiedBuild {
  readonly id: string;
  readonly title: string;
  readonly class: BG3Class;
  readonly subclass?: BG3Subclass;
  readonly role: "striker" | "controller" | "support" | "tank" | "face";

  /** IDs des objets absolument requis pour le build */
  readonly coreItems: readonly string[];

  /** IDs des objets optionnels / alternatifs */
  readonly alternativeItems: readonly string[];

  /** Moments-clés de montée en puissance */
  readonly powerSpikes: readonly PowerSpike[];
}

// ---------------------------------------------------------------------------
// 4. Build hydraté — Build avec ses Items peuplés (résultat de requête)
// ---------------------------------------------------------------------------

export interface HydratedBuild extends UnifiedBuild {
  readonly coreItemsFull: readonly UnifiedItem[];
  readonly alternativeItemsFull: readonly UnifiedItem[];
}
