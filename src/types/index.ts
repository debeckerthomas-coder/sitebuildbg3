// ============================================================================
// BG3 Honor Companion — Master Type Definitions
// Architecture: Relational, Conditional, Fully Typed
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Core Primitives & Enums
// ---------------------------------------------------------------------------

/** D&D 5e / BG3 ability scores */
export type AbilityScore =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

export type DamageType =
  | "bludgeoning"
  | "piercing"
  | "slashing"
  | "fire"
  | "cold"
  | "lightning"
  | "thunder"
  | "acid"
  | "poison"
  | "necrotic"
  | "radiant"
  | "force"
  | "psychic";

export type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "very_rare"
  | "legendary";

export type ItemSlot =
  | "helmet"
  | "cloak"
  | "armour"
  | "gloves"
  | "boots"
  | "amulet"
  | "ring_1"
  | "ring_2"
  | "main_hand"
  | "off_hand"
  | "ranged";

export type SpellSchool =
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "evocation"
  | "illusion"
  | "necromancy"
  | "transmutation";

export type Act = 1 | 2 | 3;

export type BG3Class =
  | "barbarian"
  | "bard"
  | "cleric"
  | "druid"
  | "fighter"
  | "monk"
  | "paladin"
  | "ranger"
  | "rogue"
  | "sorcerer"
  | "warlock"
  | "wizard";

export type BG3Subclass = string; // extensible — e.g. "berserker", "oathbreaker"

export type FightingStyle =
  | "great_weapon_fighting"
  | "duelling"
  | "defence"
  | "archery"
  | "two_weapon_fighting"
  | "protection";

// ---------------------------------------------------------------------------
// 2. Dice & Math Primitives
// ---------------------------------------------------------------------------

export type DieSize = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export interface DiceRoll {
  readonly count: number;
  readonly die: DieSize;
}

export interface DamageRider {
  readonly id: string;
  readonly source: string; // item or spell name
  readonly damage: DiceRoll | number; // flat or dice
  readonly type: DamageType;
  readonly condition?: FailsafeCondition; // only active when condition met
}

// ---------------------------------------------------------------------------
// 3. Failsafe / Conditional Engine Types
// ---------------------------------------------------------------------------

/**
 * A world-state flag that can be true/false during a run.
 * Used for the conditional failsafe arborescence.
 */
export interface WorldStateFlag {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly act: Act;
  readonly default: boolean;
}

/**
 * A condition that references one or more world-state flags.
 * Supports AND / OR / NOT logic for complex conditionals.
 */
export type FailsafeCondition =
  | { readonly type: "flag"; readonly flagId: string; readonly value: boolean }
  | { readonly type: "and"; readonly conditions: readonly FailsafeCondition[] }
  | { readonly type: "or"; readonly conditions: readonly FailsafeCondition[] }
  | { readonly type: "not"; readonly condition: FailsafeCondition };

/**
 * A failsafe chain: primary item → fallback 1 → fallback 2 → ...
 * Each entry has an optional condition that must be met for it to be valid.
 */
export interface FailsafeEntry<T extends string = string> {
  readonly itemId: T;
  readonly condition?: FailsafeCondition;
  readonly reason?: string; // e.g. "Dammon died — Flail of Ages unavailable"
}

export interface FailsafeChain<T extends string = string> {
  readonly slot: ItemSlot;
  readonly primary: FailsafeEntry<T>;
  readonly fallbacks: readonly FailsafeEntry<T>[];
}

// ---------------------------------------------------------------------------
// 4. Item System
// ---------------------------------------------------------------------------

export interface ItemPassive {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly damageRider?: DamageRider;
}

export interface Item {
  readonly id: string;
  readonly name: string;
  readonly icon: string; // path to icon asset
  readonly rarity: Rarity;
  readonly slot: ItemSlot;
  readonly description: string;
  readonly flavourText?: string;
  readonly act: Act;
  readonly location: string; // where to find it
  readonly requirements?: string;
  readonly armourClass?: number;
  readonly passives: readonly ItemPassive[];
  readonly damageRiders: readonly DamageRider[];
  readonly weaponDamage?: DiceRoll;
  readonly weaponEnchantment?: number; // +1, +2, +3
  readonly tags: readonly string[];
}

// ---------------------------------------------------------------------------
// 5. Spell / Action System
// ---------------------------------------------------------------------------

export interface SpellResource {
  readonly type: "spell_slot" | "charge" | "short_rest" | "long_rest" | "bonus_action" | "reaction" | "free";
  readonly level?: number; // spell slot level
  readonly charges?: number;
}

export interface Spell {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly school: SpellSchool;
  readonly level: number; // 0 = cantrip
  readonly castingTime: "action" | "bonus_action" | "reaction" | "ritual";
  readonly range: number | "self" | "touch";
  readonly description: string;
  readonly damage?: DiceRoll;
  readonly damageType?: DamageType;
  readonly savingThrow?: AbilityScore;
  readonly concentration: boolean;
  readonly resource: SpellResource;
  readonly tags: readonly string[];
}

// ---------------------------------------------------------------------------
// 6. Boss / Encounter System
// ---------------------------------------------------------------------------

export interface BossAction {
  readonly name: string;
  readonly description: string;
  readonly damage?: string; // display string e.g. "3d10+5 necrotic"
  readonly recharge?: string; // e.g. "5-6"
  readonly isLegendary: boolean;
}

export interface BossPhase {
  readonly name: string;
  readonly hpThreshold?: number; // percentage (e.g. 50 = below 50%)
  readonly description: string;
  readonly actions: readonly BossAction[];
  readonly immunities?: readonly DamageType[];
  readonly resistances?: readonly DamageType[];
  readonly vulnerabilities?: readonly DamageType[];
}

export interface BossMechanic {
  readonly id: string;
  readonly name: string;
  readonly severity: "info" | "warning" | "lethal";
  readonly description: string;
  readonly counterplay: string;
}

export interface Boss {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly act: Act;
  readonly location: string;
  readonly hitPoints: number;
  readonly armourClass: number;
  readonly initiativeBonus: number;
  readonly abilities: Record<AbilityScore, number>;
  readonly phases: readonly BossPhase[];
  readonly mechanics: readonly BossMechanic[];
  readonly loot: readonly string[]; // item IDs
  readonly tags: readonly string[];
}

// ---------------------------------------------------------------------------
// 7. Build System (Relational)
// ---------------------------------------------------------------------------

export interface LevelProgression {
  readonly level: number;
  readonly class: BG3Class;
  readonly subclass?: BG3Subclass;
  readonly abilityScoreImprovement?: Partial<Record<AbilityScore, number>>;
  readonly feat?: string;
  readonly spellsLearned?: readonly string[]; // spell IDs
  readonly notes?: string;
}

export interface BuildEquipmentSlot {
  readonly slot: ItemSlot;
  readonly failsafeChain: FailsafeChain;
}

export interface BuildAbilityScores {
  readonly base: Record<AbilityScore, number>;
  readonly racial: Partial<Record<AbilityScore, number>>;
  readonly final: Record<AbilityScore, number>;
}

export interface Build {
  readonly id: string;
  readonly name: string;
  readonly subtitle: string;
  readonly description: string;
  readonly thumbnail: string;
  readonly tier: "S" | "A" | "B" | "C";
  readonly role: "striker" | "controller" | "support" | "tank" | "face";
  readonly race: string;
  readonly background: string;
  readonly abilityScores: BuildAbilityScores;
  readonly levelProgression: readonly LevelProgression[];
  readonly equipment: readonly BuildEquipmentSlot[];
  readonly comboCycle: readonly string[]; // ordered action IDs for optimal turn
  readonly fightingStyle?: FightingStyle;
  readonly tags: readonly string[];
}

// ---------------------------------------------------------------------------
// 8. Run Tracker (Player Progression State)
// ---------------------------------------------------------------------------

export interface ChecklistItem {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly act: Act;
  readonly category: "quest" | "item" | "companion" | "boss" | "secret";
  readonly setsFlag?: string; // world-state flag ID toggled on completion
  readonly requiredFlag?: string; // only visible if this flag is set
}

export interface RunChecklistState {
  readonly [itemId: string]: boolean;
}

export interface RunWorldState {
  readonly [flagId: string]: boolean;
}

export interface RunBuildSelection {
  readonly slot: "player" | "companion_1" | "companion_2" | "companion_3";
  readonly buildId: string;
  readonly customName?: string;
}

export interface Run {
  readonly id: string;
  readonly name: string;
  readonly createdAt: string; // ISO date
  readonly updatedAt: string;
  readonly currentAct: Act;
  readonly builds: readonly RunBuildSelection[];
  readonly checklist: RunChecklistState;
  readonly worldState: RunWorldState;
  readonly notes: string;
}

// ---------------------------------------------------------------------------
// 9. Combat Log / Damage Simulation Types
// ---------------------------------------------------------------------------

export interface AttackContext {
  readonly attackerLevel: number;
  readonly abilityModifier: number;
  readonly proficiencyBonus: number;
  readonly weaponEnchantment: number;
  readonly isCritical: boolean;
  readonly hasAdvantage: boolean;
  readonly hasDisadvantage: boolean;
  readonly fightingStyle?: FightingStyle;
  readonly isTavernBrawler: boolean;
  readonly weaponDamage: DiceRoll;
  readonly damageRiders: readonly DamageRider[];
  readonly smiteLevel?: number; // 1-5 for divine smite spell slot level
  readonly isUndead?: boolean; // extra smite die vs undead/fiend
  readonly elixir?: string;
}

export interface DamageBreakdownStep {
  readonly source: string;
  readonly baseRoll: string; // e.g. "2d6"
  readonly rolledValues: readonly number[];
  readonly modifier: number;
  readonly subtotal: number;
  readonly notes?: string; // e.g. "GWF: rerolled 1→4"
}

export interface DamageResult {
  readonly steps: readonly DamageBreakdownStep[];
  readonly totalDamage: number;
  readonly criticalMultiplied: boolean;
  readonly damageByType: Partial<Record<DamageType, number>>;
}

// ---------------------------------------------------------------------------
// 10. Initiative System Types
// ---------------------------------------------------------------------------

export interface InitiativeActor {
  readonly name: string;
  readonly dexterity: number;
  readonly bonuses: number; // feats, items, etc.
  readonly hasAlertFeat: boolean;
}

export interface InitiativeResult {
  readonly order: readonly {
    readonly name: string;
    readonly roll: number;
    readonly total: number;
  }[];
  readonly probabilityOfExactOrder: number;
  readonly sharedInitiativeGroups: readonly string[][];
}

// ---------------------------------------------------------------------------
// 11. Dice Simulator Types
// ---------------------------------------------------------------------------

export interface DiceSimulatorInput {
  readonly die: DieSize;
  readonly count: number;
  readonly advantage: boolean;
  readonly disadvantage: boolean;
  readonly karmicDice: boolean;
  readonly modifier: number;
  readonly dc?: number; // difficulty class for success check
}

export interface DiceSimulatorResult {
  readonly rolls: readonly number[];
  readonly finalValue: number;
  readonly succeeded?: boolean;
  readonly successProbability: number;
  readonly histogram: readonly { readonly value: number; readonly probability: number }[];
}

// ---------------------------------------------------------------------------
// 12. UI / Component Prop Types
// ---------------------------------------------------------------------------

export interface CodexTooltipData {
  readonly type: "item" | "spell" | "boss";
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly rarity?: Rarity;
  readonly description: string;
  readonly stats?: readonly { readonly label: string; readonly value: string }[];
}

export interface TableOfContentsEntry {
  readonly id: string;
  readonly label: string;
  readonly depth: number; // heading level: 1, 2, 3
  readonly isActive: boolean;
}

// ---------------------------------------------------------------------------
// 13. Store Types
// ---------------------------------------------------------------------------

export interface AppState {
  // Current run
  readonly activeRunId: string | null;
  readonly runs: readonly Run[];

  // UI state
  readonly sidebarOpen: boolean;
  readonly activeTooltip: CodexTooltipData | null;
  readonly currentAct: Act;

  // Smart Guide — active build filter
  readonly activeBuild: string | null;
}

export interface AppActions {
  // Run management
  createRun: (name: string, builds: readonly RunBuildSelection[]) => string;
  deleteRun: (runId: string) => void;
  setActiveRun: (runId: string) => void;
  updateRunChecklist: (runId: string, itemId: string, checked: boolean) => void;
  setWorldStateFlag: (runId: string, flagId: string, value: boolean) => void;
  setCurrentAct: (act: Act) => void;

  // UI
  toggleSidebar: () => void;
  setActiveTooltip: (data: CodexTooltipData | null) => void;

  // Smart Guide
  setActiveBuild: (buildId: string) => void;

  // Persistence
  hydrate: () => Promise<void>;
}

export type AppStore = AppState & AppActions;

// ---------------------------------------------------------------------------
// 14. MDX / Content Types
// ---------------------------------------------------------------------------

export interface WalkthroughMeta {
  readonly title: string;
  readonly act: Act;
  readonly slug: string;
  readonly description: string;
  readonly order: number;
}

export interface MDXComponentMap {
  readonly BossCard: React.ComponentType<{ readonly id: string }>;
  readonly ItemTooltip: React.ComponentType<{ readonly id: string; readonly children?: React.ReactNode }>;
  readonly SpellTooltip: React.ComponentType<{ readonly id: string; readonly children?: React.ReactNode }>;
  readonly Checklist: React.ComponentType<{ readonly category: string; readonly act: Act }>;
  readonly Failsafe: React.ComponentType<{ readonly slot: ItemSlot; readonly buildId: string }>;
  readonly EmergencyMatrix: React.ComponentType<{ readonly bossId?: string; readonly title?: string; readonly severity?: "info" | "warning" | "lethal"; readonly children?: React.ReactNode }>;
}
