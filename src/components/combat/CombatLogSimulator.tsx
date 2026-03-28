"use client";

// ============================================================================
// CombatLogSimulator — Détail mathématique d'une attaque D&D 5e / BG3
// Accordéon interactif avec breakdown pas-à-pas en français
// ============================================================================

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { simulateAttack, type AttackRollResult, rollAttack } from "@/engine/CombatLogEngine";
import { Badge, Button } from "@/components/ui-system";
import type { AttackContext, DamageBreakdownStep, DamageType, FightingStyle } from "@/types";

// ---------------------------------------------------------------------------
// Types de dégâts en français
// ---------------------------------------------------------------------------

const DMG_LABELS: Partial<Record<DamageType, string>> = {
  slashing: "Tranchants",
  bludgeoning: "Contondants",
  piercing: "Perforants",
  fire: "Feu",
  cold: "Froid",
  lightning: "Foudre",
  thunder: "Tonnerre",
  radiant: "Radiants",
  necrotic: "Nécrotiques",
  force: "Force",
  psychic: "Psychiques",
  acid: "Acide",
  poison: "Poison",
};

const DMG_COLORS: Partial<Record<DamageType, string>> = {
  slashing: "text-gray-300",
  bludgeoning: "text-gray-300",
  piercing: "text-gray-300",
  fire: "text-dmg-fire",
  cold: "text-dmg-cold",
  lightning: "text-dmg-lightning",
  thunder: "text-dmg-thunder",
  radiant: "text-dmg-radiant",
  necrotic: "text-dmg-necrotic",
  force: "text-dmg-force",
  psychic: "text-dmg-psychic",
  acid: "text-dmg-acid",
  poison: "text-dmg-poison",
};

// ---------------------------------------------------------------------------
// Presets de combat en français
// ---------------------------------------------------------------------------

interface CombatPreset {
  readonly id: string;
  readonly nom: string;
  readonly description: string;
  readonly contexte: AttackContext;
  readonly caAdversaire: number;
}

const PRESETS: readonly CombatPreset[] = [
  {
    id: "lockadin_smite_crit",
    nom: "Lockadin — Châtiment Critique",
    description: "Pourfendeuse de Géant + Châtiment Divin niv. 3, coup critique, GWF",
    contexte: {
      attackerLevel: 12,
      abilityModifier: 5,
      proficiencyBonus: 4,
      weaponEnchantment: 3,
      isCritical: true,
      hasAdvantage: true,
      hasDisadvantage: false,
      fightingStyle: "great_weapon_fighting" as FightingStyle,
      isTavernBrawler: false,
      weaponDamage: { count: 2, die: 6 },
      damageRiders: [
        { id: "giant_form", source: "Forme de Géant", damage: { count: 1, die: 6 }, type: "bludgeoning" as DamageType },
      ],
      smiteLevel: 3,
      isUndead: false,
    },
    caAdversaire: 18,
  },
  {
    id: "lockadin_smite_normal",
    nom: "Lockadin — Châtiment Standard",
    description: "Pourfendeuse de Géant + Châtiment Divin niv. 2, coup normal, GWF",
    contexte: {
      attackerLevel: 12,
      abilityModifier: 5,
      proficiencyBonus: 4,
      weaponEnchantment: 3,
      isCritical: false,
      hasAdvantage: true,
      hasDisadvantage: false,
      fightingStyle: "great_weapon_fighting" as FightingStyle,
      isTavernBrawler: false,
      weaponDamage: { count: 2, die: 6 },
      damageRiders: [],
      smiteLevel: 2,
      isUndead: false,
    },
    caAdversaire: 17,
  },
  {
    id: "lockadin_vs_undead",
    nom: "Lockadin vs Mort-Vivant (Ansur)",
    description: "Châtiment niv. 3 contre Ansur — +1d8 bonus vs Mort-Vivant",
    contexte: {
      attackerLevel: 12,
      abilityModifier: 5,
      proficiencyBonus: 4,
      weaponEnchantment: 3,
      isCritical: false,
      hasAdvantage: true,
      hasDisadvantage: false,
      fightingStyle: "great_weapon_fighting" as FightingStyle,
      isTavernBrawler: false,
      weaponDamage: { count: 2, die: 6 },
      damageRiders: [],
      smiteLevel: 3,
      isUndead: true,
    },
    caAdversaire: 17,
  },
];

// ---------------------------------------------------------------------------
// Composant de détail d'un pas de dégât
// ---------------------------------------------------------------------------

function DamageStepRow({ step, index }: { step: DamageBreakdownStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="flex items-center justify-between py-1.5 px-3 rounded bg-abyss-50 border border-border/50"
    >
      <div className="flex-1 min-w-0">
        <span className="text-xs font-data font-medium text-gray-200">{step.source}</span>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-mono text-gold-muted">{step.baseRoll}</span>
          <span className="text-[10px] font-mono text-gray-500">
            [{step.rolledValues.join(", ")}]
          </span>
          {step.modifier !== 0 && (
            <span className="text-[10px] font-mono text-gray-400">
              {step.modifier > 0 ? "+" : ""}{step.modifier}
            </span>
          )}
          {step.notes && (
            <span className="text-[10px] font-data italic text-gold-muted">
              ({step.notes})
            </span>
          )}
        </div>
      </div>
      <span className="text-sm font-data font-bold text-gold ml-3">
        {step.subtotal}
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// CombatLogSimulator
// ---------------------------------------------------------------------------

export function CombatLogSimulator() {
  const [activePreset, setActivePreset] = useState(PRESETS[0]!.id);
  const [results, setResults] = useState<{
    attackRoll: AttackRollResult;
    steps: readonly DamageBreakdownStep[];
    totalDamage: number;
    criticalMultiplied: boolean;
    damageByType: Partial<Record<DamageType, number>>;
  } | null>(null);

  const preset = useMemo(() => PRESETS.find((p) => p.id === activePreset)!, [activePreset]);

  const handleSimulate = useCallback(() => {
    const attackBonus = preset.contexte.proficiencyBonus + preset.contexte.abilityModifier + preset.contexte.weaponEnchantment;
    const attackRoll = rollAttack(attackBonus, preset.contexte.hasAdvantage, preset.contexte.hasDisadvantage);

    const ctx: AttackContext = {
      ...preset.contexte,
      isCritical: attackRoll.isCritical || preset.contexte.isCritical,
    };

    const damage = simulateAttack(ctx);
    setResults({
      attackRoll,
      steps: damage.steps,
      totalDamage: damage.totalDamage,
      criticalMultiplied: damage.criticalMultiplied,
      damageByType: damage.damageByType,
    });
  }, [preset]);

  return (
    <div className="bg-surface-raised border border-border rounded-card overflow-hidden">
      {/* En-tête */}
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-display text-base text-gold">Simulateur de Combat</h3>
        <p className="text-xs font-data text-gray-400 mt-1">
          Détail mathématique complet d&apos;une attaque — conforme aux règles BG3 / D&D 5e
        </p>
      </div>

      {/* Sélection de preset */}
      <div className="px-5 py-3 border-b border-border/50">
        <p className="text-xs font-data text-gray-500 uppercase tracking-wider mb-2">Scénario</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => { setActivePreset(p.id); setResults(null); }}
              className={`
                px-3 py-1.5 rounded text-xs font-data transition-all border
                ${activePreset === p.id
                  ? "bg-gold/20 border-gold text-gold"
                  : "bg-transparent border-border text-gray-500 hover:border-gray-500"}
              `}
            >
              {p.nom}
            </button>
          ))}
        </div>
        <p className="text-xs font-data text-gray-500 mt-2 italic">{preset.description}</p>
      </div>

      {/* Bouton Simuler */}
      <div className="px-5 py-3 border-b border-border/50">
        <Button onClick={handleSimulate} fullWidth>
          Simuler l&apos;Attaque
        </Button>
      </div>

      {/* Résultats */}
      <AnimatePresence mode="wait">
        {results && (
          <motion.div
            key={`${activePreset}-${results.totalDamage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="px-5 py-4 space-y-4"
          >
            {/* Jet d'attaque */}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs font-data text-gray-500 uppercase tracking-wider">Jet d&apos;attaque</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-2xl font-display ${results.attackRoll.isCritical ? "text-gold" : results.attackRoll.isCriticalFail ? "text-blood-light" : "text-gray-200"}`}>
                    {results.attackRoll.naturalRoll}
                  </span>
                  <span className="text-sm font-data text-gray-400">
                    (Total: {results.attackRoll.total})
                  </span>
                  {results.attackRoll.isCritical && (
                    <Badge variant="warning" className="animate-pulse">CRITIQUE !</Badge>
                  )}
                  {results.attackRoll.isCriticalFail && (
                    <Badge variant="danger">ÉCHEC CRITIQUE</Badge>
                  )}
                </div>
                {results.attackRoll.advantageRolls && (
                  <p className="text-[10px] font-mono text-gray-500 mt-0.5">
                    Avantage : [{results.attackRoll.advantageRolls[0]}, {results.attackRoll.advantageRolls[1]}] → {results.attackRoll.naturalRoll}
                  </p>
                )}
              </div>

              <div className="flex-1" />

              <div className="text-right">
                <p className="text-xs font-data text-gray-500 uppercase tracking-wider">vs CA</p>
                <span className="text-lg font-data text-gray-300">{preset.caAdversaire}</span>
                <p className={`text-xs font-data font-bold mt-0.5 ${results.attackRoll.total >= preset.caAdversaire || results.attackRoll.isCritical ? "text-green-400" : "text-blood-light"}`}>
                  {results.attackRoll.isCriticalFail ? "RATÉ" :
                    results.attackRoll.isCritical || results.attackRoll.total >= preset.caAdversaire ? "TOUCHÉ" : "RATÉ"}
                </p>
              </div>
            </div>

            {/* Breakdown des dégâts (accordéon) */}
            <Accordion.Root type="single" defaultValue="breakdown" collapsible>
              <Accordion.Item value="breakdown">
                <Accordion.Trigger className="flex items-center justify-between w-full py-2 group">
                  <span className="text-xs font-data text-gray-400 uppercase tracking-wider group-hover:text-gold transition-colors">
                    Détail des dégâts ({results.steps.length} composantes)
                  </span>
                  <span className="text-xs text-gray-500 group-data-[state=open]:rotate-180 transition-transform">▼</span>
                </Accordion.Trigger>
                <Accordion.Content className="space-y-1.5 pb-2 overflow-hidden data-[state=open]:animate-fade-in-up">
                  {results.steps.map((step, i) => (
                    <DamageStepRow key={`${step.source}-${i}`} step={step} index={i} />
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>

            {/* Total */}
            <div className="bg-abyss rounded-card p-4 border border-gold/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-data text-gray-500 uppercase tracking-wider">Dégâts Totaux</p>
                  {results.criticalMultiplied && (
                    <p className="text-[10px] font-data text-gold-muted italic">Dés doublés (critique)</p>
                  )}
                </div>
                <span className="text-4xl font-display text-gold">{results.totalDamage}</span>
              </div>

              {/* Répartition par type */}
              <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-border/50">
                {Object.entries(results.damageByType).map(([type, amount]) => (
                  <span key={type} className={`text-xs font-data ${DMG_COLORS[type as DamageType] ?? "text-gray-400"}`}>
                    {amount} {DMG_LABELS[type as DamageType] ?? type}
                  </span>
                ))}
              </div>
            </div>

            {/* Formule résumée */}
            <div className="bg-abyss-50 rounded px-3 py-2 border border-border/30">
              <p className="text-[11px] font-mono text-gray-400 leading-relaxed">
                {results.steps.map((s) => `${s.baseRoll}${s.modifier > 0 ? ` + ${s.modifier}` : s.modifier < 0 ? ` ${s.modifier}` : ""}`).join(" + ")}
                {" = "}
                <span className="text-gold font-bold">{results.totalDamage} dégâts</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
