"use client";

import { useState, useEffect } from "react";
import { itemsBilingualV2 } from "@/data/arsenal";
import type { Locale } from "@/dictionaries";

// ---------------------------------------------------------------------------
// Dice faces options
// ---------------------------------------------------------------------------
const DICE_OPTIONS = [4, 6, 8, 10, 12] as const;

// ---------------------------------------------------------------------------
// Filter weapons only (type "Arme" / "Weapon")
// ---------------------------------------------------------------------------
const WEAPONS = itemsBilingualV2.filter(
  (item) => item.type.fr === "Arme" || item.type.en === "Weapon",
);

// ---------------------------------------------------------------------------
// Parse dice pattern & enchantment bonus from description
// ---------------------------------------------------------------------------
function parseDamageFromDescription(desc: string): {
  diceCount: number | null;
  diceFaces: number | null;
  flatBonus: number | null;
} {
  // Look for enchantment bonus like "+3" or "+2" or "+1" standalone
  const enchantMatch = desc.match(/\+(\d+)\s*(?:enchant|$)/i)
    ?? desc.match(/(?:^|\.\s|\s)\+(\d+)(?:\s|,|\.|$)/)
    ?? desc.match(/\+(\d+)\b/);
  const flatBonus = enchantMatch?.[1] ? parseInt(enchantMatch[1], 10) : null;

  // Look for primary dice pattern like "1d8", "2d6" — take the first one
  const diceMatch = desc.match(/(\d+)d(\d+)/);
  const diceCount = diceMatch?.[1] ? parseInt(diceMatch[1], 10) : null;
  const diceFaces = diceMatch?.[2] ? parseInt(diceMatch[2], 10) : null;

  return { diceCount, diceFaces, flatBonus };
}

// ---------------------------------------------------------------------------
// Stepper control component
// ---------------------------------------------------------------------------
function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-data text-gray-400">{label}</span>
        <span className="text-sm font-data text-gold">
          {format ? format(value) : value}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-10 h-10 rounded-lg bg-surface-raised border border-border text-gray-300
            hover:border-gold/40 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed
            transition-colors font-semibold text-lg"
        >
          &minus;
        </button>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 appearance-none rounded-full bg-gray-700 accent-[#fbbf24] cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#fbbf24]
            [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(251,191,36,0.5)]"
        />
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-10 h-10 rounded-lg bg-surface-raised border border-border text-gray-300
            hover:border-gold/40 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed
            transition-colors font-semibold text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dice selector component
// ---------------------------------------------------------------------------
function DiceSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-data text-gray-400">Type de dé</span>
      <div className="flex gap-2">
        {DICE_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => onChange(d)}
            className={`flex-1 py-2.5 rounded-lg border text-sm font-data transition-all duration-200
              ${
                value === d
                  ? "bg-[#fbbf24]/15 border-[#fbbf24]/60 text-[#fbbf24] shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                  : "bg-surface-raised border-border text-gray-400 hover:border-gray-600 hover:text-gray-300"
              }`}
          >
            d{d}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main calculator
// ---------------------------------------------------------------------------
export default function DamageCalculator({ lang }: { lang: Locale }) {
  const [diceCount, setDiceCount] = useState(1);
  const [diceFaces, setDiceFaces] = useState(8);
  const [statModifier, setStatModifier] = useState(3);
  const [flatBonus, setFlatBonus] = useState(1);
  const [selectedWeaponId, setSelectedWeaponId] = useState<string | null>(null);

  const selectedWeapon = selectedWeaponId
    ? WEAPONS.find((w) => w.id === selectedWeaponId) ?? null
    : null;

  // Auto-fill stats when a weapon is selected
  useEffect(() => {
    if (!selectedWeapon) return;
    const desc = selectedWeapon.description[lang];
    const parsed = parseDamageFromDescription(desc);
    if (parsed.diceCount !== null) setDiceCount(parsed.diceCount);
    if (parsed.diceFaces !== null) setDiceFaces(parsed.diceFaces);
    if (parsed.flatBonus !== null) setFlatBonus(parsed.flatBonus);
  }, [selectedWeaponId, selectedWeapon, lang]);

  // Derived values
  const minDamage = diceCount * 1 + statModifier + flatBonus;
  const maxDamage = diceCount * diceFaces + statModifier + flatBonus;
  const avgDamage = diceCount * ((diceFaces + 1) / 2) + statModifier + flatBonus;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── COLONNE GAUCHE : Contrôles ─────────────────────────── */}
      <div className="space-y-6 bg-[#0b0f19] border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 rounded-full bg-gold" />
          <h3 className="font-display text-lg text-gold">Paramètres</h3>
        </div>

        {/* Weapon selector */}
        <div className="space-y-2">
          <span className="text-sm font-data text-gray-400">
            {lang === "fr" ? "Arme de l'Armurerie" : "Weapon from the Armory"}
          </span>
          <select
            value={selectedWeaponId ?? ""}
            onChange={(e) =>
              setSelectedWeaponId(e.target.value || null)
            }
            className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-gray-700 text-gray-200
              focus:outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]/50
              transition-colors appearance-none cursor-pointer text-sm font-data"
          >
            <option value="">
              {lang === "fr"
                ? "— Choisir une arme de l'Armurerie —"
                : "— Choose a weapon from the Armory —"}
            </option>
            {WEAPONS.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name[lang]}
              </option>
            ))}
          </select>
        </div>

        <Stepper
          label={lang === "fr" ? "Nombre de dés" : "Dice count"}
          value={diceCount}
          min={1}
          max={10}
          onChange={setDiceCount}
          format={(v) => `${v}d${diceFaces}`}
        />

        <DiceSelector value={diceFaces} onChange={setDiceFaces} />

        <Stepper
          label={lang === "fr" ? "Modificateur de caractéristique" : "Ability modifier"}
          value={statModifier}
          min={-1}
          max={8}
          onChange={setStatModifier}
          format={(v) => (v >= 0 ? `+${v}` : `${v}`)}
        />

        <Stepper
          label={lang === "fr" ? "Bonus fixe (arme / enchantement)" : "Flat bonus (weapon / enchantment)"}
          value={flatBonus}
          min={0}
          max={10}
          onChange={setFlatBonus}
          format={(v) => `+${v}`}
        />

        {/* Formula recap */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs font-data text-gray-500 text-center">
            {lang === "fr" ? "Formule" : "Formula"} : {diceCount}d{diceFaces}{" "}
            {statModifier >= 0 ? `+ ${statModifier}` : `- ${Math.abs(statModifier)}`}{" "}
            {flatBonus > 0 && `+ ${flatBonus}`}
          </p>
        </div>
      </div>

      {/* ── COLONNE DROITE : HUD de résultat ──────────────────── */}
      <div className="relative overflow-hidden bg-[#0b0f19] border border-[#fbbf24]/30 rounded-xl p-6 flex flex-col items-center justify-center min-h-[320px]">
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-radial from-[#fbbf24]/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbbf24]/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 text-center space-y-6">
          {/* Selected weapon display */}
          {selectedWeapon && (
            <div className="flex flex-col items-center gap-2">
              {selectedWeapon.icon && (
                <img
                  src={selectedWeapon.icon}
                  alt={selectedWeapon.name[lang]}
                  width={64}
                  height={64}
                  className="rounded-lg border-2 border-[#fbbf24]/40 bg-[#111827]"
                />
              )}
              <p className="text-sm font-display text-[#fbbf24]/80">
                {selectedWeapon.name[lang]}
              </p>
            </div>
          )}

          <p className="text-xs font-data uppercase tracking-[0.25em] text-gray-500">
            {lang === "fr" ? "Dégâts Moyens" : "Average Damage"}
          </p>

          {/* Big average number */}
          <div className="relative">
            <span
              className="block text-7xl lg:text-8xl font-display text-[#fbbf24] leading-none"
              style={{
                textShadow:
                  "0 0 20px rgba(251,191,36,0.4), 0 0 40px rgba(251,191,36,0.2), 0 0 80px rgba(251,191,36,0.1)",
              }}
            >
              {avgDamage % 1 === 0 ? avgDamage : avgDamage.toFixed(1)}
            </span>
          </div>

          {/* Range */}
          <div className="flex items-center gap-4 justify-center">
            <div className="text-center">
              <p className="text-[10px] font-data uppercase tracking-widest text-gray-600">
                Min
              </p>
              <p className="text-2xl font-display text-red-400">{minDamage}</p>
            </div>

            <div className="w-16 h-px bg-gradient-to-r from-red-400/50 via-gray-600 to-emerald-400/50" />

            <div className="text-center">
              <p className="text-[10px] font-data uppercase tracking-widest text-gray-600">
                Max
              </p>
              <p className="text-2xl font-display text-emerald-400">
                {maxDamage}
              </p>
            </div>
          </div>

          {/* DPR label */}
          <p className="text-xs font-data text-gray-500">
            {diceCount}d{diceFaces}{" "}
            {statModifier >= 0 ? `+${statModifier}` : statModifier}{" "}
            {flatBonus > 0 && `+${flatBonus}`}
          </p>
        </div>
      </div>
    </div>
  );
}
