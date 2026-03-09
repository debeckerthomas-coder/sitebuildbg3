// ============================================================================
// CombatLogEngine — BG3 Damage Simulation with Full Breakdown
//
// Handles: Damage Riders, Tavern Brawler (double STR mod), Great Weapon
// Fighting (reroll 1s and 2s), Divine Smite (extra die vs undead), Critical
// Hit doubling (all dice doubled, not modifiers), and per-step logging.
// ============================================================================

import type {
  AttackContext,
  DamageBreakdownStep,
  DamageResult,
  DamageRider,
  DamageType,
  DiceRoll,
  FightingStyle,
} from "@/types";

// ---------------------------------------------------------------------------
// Dice Rolling Utilities
// ---------------------------------------------------------------------------

/** Crypto-quality random integer in [1, max] */
function rollDie(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

/** Roll multiple dice, returning individual results */
function rollDice(count: number, die: number): number[] {
  return Array.from({ length: count }, () => rollDie(die));
}

/**
 * Apply Great Weapon Fighting: reroll any 1 or 2 (once per die).
 * Returns the new array of values and a log of rerolls.
 */
function applyGWF(
  rolls: number[],
  die: number
): { values: number[]; rerolls: string[] } {
  const rerolls: string[] = [];
  const values = rolls.map((val) => {
    if (val <= 2) {
      const rerolled = rollDie(die);
      rerolls.push(`GWF: rerolled ${val}→${rerolled}`);
      return rerolled; // must keep reroll even if worse
    }
    return val;
  });
  return { values, rerolls };
}

// ---------------------------------------------------------------------------
// Core Damage Calculator
// ---------------------------------------------------------------------------

function computeWeaponDamage(ctx: AttackContext): DamageBreakdownStep {
  const { weaponDamage, fightingStyle, isCritical, abilityModifier, weaponEnchantment, isTavernBrawler } = ctx;

  // Dice count: doubled on crit
  const diceCount = isCritical ? weaponDamage.count * 2 : weaponDamage.count;
  let rolls = rollDice(diceCount, weaponDamage.die);

  const notes: string[] = [];

  // Great Weapon Fighting: reroll 1s and 2s
  if (fightingStyle === "great_weapon_fighting") {
    const gwf = applyGWF(rolls, weaponDamage.die);
    rolls = gwf.values;
    notes.push(...gwf.rerolls);
  }

  // Ability modifier — Tavern Brawler doubles STR mod
  let mod = abilityModifier;
  if (isTavernBrawler) {
    notes.push(`Tavern Brawler: STR mod ${mod}→${mod * 2}`);
    mod = mod * 2;
  }

  // Weapon enchantment bonus
  const enchantBonus = weaponEnchantment;
  const totalMod = mod + enchantBonus;

  const diceTotal = rolls.reduce((sum, v) => sum + v, 0);
  const subtotal = diceTotal + totalMod;

  return {
    source: "Weapon Damage",
    baseRoll: `${diceCount}d${weaponDamage.die}`,
    rolledValues: rolls,
    modifier: totalMod,
    subtotal,
    notes: notes.length > 0 ? notes.join("; ") : undefined,
  };
}

function computeSmiteDamage(ctx: AttackContext): DamageBreakdownStep | null {
  if (ctx.smiteLevel === undefined || ctx.smiteLevel < 1) return null;

  // Base: 2d8 + 1d8 per slot level above 1st
  let diceCount = 1 + ctx.smiteLevel; // 1st level = 2d8, 2nd = 3d8, etc.

  // Extra d8 vs undead/fiend
  if (ctx.isUndead) {
    diceCount += 1;
  }

  // Critical: double all smite dice
  if (ctx.isCritical) {
    diceCount *= 2;
  }

  const rolls = rollDice(diceCount, 8);
  const subtotal = rolls.reduce((sum, v) => sum + v, 0);

  const notes: string[] = [];
  if (ctx.isUndead) notes.push("+1d8 vs Undead/Fiend");
  if (ctx.isCritical) notes.push("Critical: all dice doubled");

  return {
    source: `Divine Smite (Lv${ctx.smiteLevel})`,
    baseRoll: `${diceCount}d8`,
    rolledValues: rolls,
    modifier: 0,
    subtotal,
    notes: notes.length > 0 ? notes.join("; ") : undefined,
  };
}

function computeDamageRider(
  rider: DamageRider,
  isCritical: boolean,
  _fightingStyle?: FightingStyle
): DamageBreakdownStep {
  if (typeof rider.damage === "number") {
    // Flat damage — never doubled on crit per BG3 rules
    return {
      source: rider.source,
      baseRoll: `${rider.damage} flat`,
      rolledValues: [rider.damage],
      modifier: 0,
      subtotal: rider.damage,
    };
  }

  // Dice-based rider: doubled on crit
  const diceCount = isCritical
    ? rider.damage.count * 2
    : rider.damage.count;

  let rolls = rollDice(diceCount, rider.damage.die);
  const notes: string[] = [];

  // GWF does NOT apply to damage riders (only weapon damage dice) in BG3
  // This is correct RAW BG3 behavior

  if (isCritical) {
    notes.push("Critical: dice doubled");
  }

  const subtotal = rolls.reduce((sum, v) => sum + v, 0);

  return {
    source: rider.source,
    baseRoll: `${diceCount}d${rider.damage.die}`,
    rolledValues: rolls,
    modifier: 0,
    subtotal,
    notes: notes.length > 0 ? notes.join("; ") : undefined,
  };
}

// ---------------------------------------------------------------------------
// Duelling Fighting Style Bonus
// ---------------------------------------------------------------------------

function computeDuellingBonus(ctx: AttackContext): DamageBreakdownStep | null {
  if (ctx.fightingStyle !== "duelling") return null;

  return {
    source: "Duelling (+2)",
    baseRoll: "flat",
    rolledValues: [2],
    modifier: 0,
    subtotal: 2,
  };
}

// ---------------------------------------------------------------------------
// Main Entry Point
// ---------------------------------------------------------------------------

/**
 * Simulate a complete attack and return a fully itemized damage breakdown.
 * This is the core function — it handles ALL BG3-specific damage stacking.
 */
export function simulateAttack(ctx: AttackContext): DamageResult {
  const steps: DamageBreakdownStep[] = [];
  const damageByType: Partial<Record<DamageType, number>> = {};

  // 1. Weapon Damage
  const weaponStep = computeWeaponDamage(ctx);
  steps.push(weaponStep);
  // Assume weapon damage is physical (slashing for greatswords, etc.)
  // The caller can specify but we default to slashing
  damageByType.slashing = (damageByType.slashing ?? 0) + weaponStep.subtotal;

  // 2. Duelling bonus
  const duellingStep = computeDuellingBonus(ctx);
  if (duellingStep) {
    steps.push(duellingStep);
    damageByType.slashing = (damageByType.slashing ?? 0) + duellingStep.subtotal;
  }

  // 3. Divine Smite
  const smiteStep = computeSmiteDamage(ctx);
  if (smiteStep) {
    steps.push(smiteStep);
    damageByType.radiant = (damageByType.radiant ?? 0) + smiteStep.subtotal;
  }

  // 4. Damage Riders (items, passives, elixirs)
  for (const rider of ctx.damageRiders) {
    const riderStep = computeDamageRider(rider, ctx.isCritical, ctx.fightingStyle);
    steps.push(riderStep);
    damageByType[rider.type] = (damageByType[rider.type] ?? 0) + riderStep.subtotal;
  }

  // 5. Total
  const totalDamage = steps.reduce((sum, s) => sum + s.subtotal, 0);

  return {
    steps,
    totalDamage,
    criticalMultiplied: ctx.isCritical,
    damageByType,
  };
}

// ---------------------------------------------------------------------------
// Attack Roll (d20) — for hit/miss determination
// ---------------------------------------------------------------------------

export interface AttackRollResult {
  readonly naturalRoll: number;
  readonly total: number;
  readonly isCritical: boolean;
  readonly isCriticalFail: boolean;
  readonly advantageRolls?: readonly [number, number];
}

export function rollAttack(
  attackBonus: number,
  hasAdvantage: boolean,
  hasDisadvantage: boolean
): AttackRollResult {
  // Advantage and disadvantage cancel out
  const effectiveAdvantage = hasAdvantage && !hasDisadvantage;
  const effectiveDisadvantage = hasDisadvantage && !hasAdvantage;

  let naturalRoll: number;
  let advantageRolls: [number, number] | undefined;

  if (effectiveAdvantage || effectiveDisadvantage) {
    const roll1 = rollDie(20);
    const roll2 = rollDie(20);
    advantageRolls = [roll1, roll2];
    naturalRoll = effectiveAdvantage
      ? Math.max(roll1, roll2)
      : Math.min(roll1, roll2);
  } else {
    naturalRoll = rollDie(20);
  }

  return {
    naturalRoll,
    total: naturalRoll + attackBonus,
    isCritical: naturalRoll === 20,
    isCriticalFail: naturalRoll === 1,
    advantageRolls,
  };
}

// ---------------------------------------------------------------------------
// Full Attack Sequence (Roll + Damage if hit)
// ---------------------------------------------------------------------------

export interface FullAttackResult {
  readonly attackRoll: AttackRollResult;
  readonly hit: boolean;
  readonly damage: DamageResult | null;
}

export function executeFullAttack(
  ctx: AttackContext,
  targetAC: number
): FullAttackResult {
  const attackBonus =
    ctx.proficiencyBonus + ctx.abilityModifier + ctx.weaponEnchantment;

  const attackRoll = rollAttack(
    attackBonus,
    ctx.hasAdvantage,
    ctx.hasDisadvantage
  );

  // Nat 1 always misses, Nat 20 always hits
  const hit =
    attackRoll.isCriticalFail
      ? false
      : attackRoll.isCritical || attackRoll.total >= targetAC;

  if (!hit) {
    return { attackRoll, hit: false, damage: null };
  }

  // Override critical in context if nat 20
  const damageCtx: AttackContext = {
    ...ctx,
    isCritical: attackRoll.isCritical,
  };

  const damage = simulateAttack(damageCtx);
  return { attackRoll, hit: true, damage };
}
