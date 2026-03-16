"use client";

import { useState, useMemo } from "react";

// ============================================================================
// NovaCalculator — Calculateur de Burst (Nova) pour builds Châtiment Divin
// Mathématiques BG3 : Mod + (2d8 par Niv d'emplacement, max 5d8) + CHA bonus
// ============================================================================

/** Niveaux d'emplacement disponibles et dés de châtiment associés (BG3 rules) */
const SLOT_LEVELS = [
  { value: 1, label: "Niveau 1", dice: 2 },
  { value: 2, label: "Niveau 2", dice: 3 },
  { value: 3, label: "Niveau 3", dice: 4 },
  { value: 4, label: "Niveau 4", dice: 5 },
] as const;

/** Moyenne d'un d8 = 4.5 */
const D8_AVG = 4.5;

function calculateNovaDamage(
  statScore: number,
  slotLevel: number,
  multiclassed: boolean,
): { avg: number; min: number; max: number; diceCount: number; modifier: number } {
  const modifier = Math.floor((statScore - 10) / 2);
  const slot = SLOT_LEVELS.find((s) => s.value === slotLevel) ?? SLOT_LEVELS[0];
  const diceCount = slot.dice;

  const avg =
    modifier + diceCount * D8_AVG + (multiclassed ? modifier : 0);
  const min =
    modifier + diceCount * 1 + (multiclassed ? modifier : 0);
  const max =
    modifier + diceCount * 8 + (multiclassed ? modifier : 0);

  return { avg: Math.round(avg * 10) / 10, min, max, diceCount, modifier };
}

// ---------------------------------------------------------------------------
// Sous-composants
// ---------------------------------------------------------------------------

function OrbGlow({ avg }: { avg: number }) {
  // Intensité de la lueur proportionnelle aux dégâts
  const intensity = Math.min(avg / 60, 1);
  return (
    <div className="relative flex items-center justify-center py-10">
      {/* Cercle de lueur */}
      <div
        className="absolute w-56 h-56 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(212,175,55,${0.15 + intensity * 0.25}) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute w-36 h-36 rounded-full blur-xl"
        style={{
          background: `radial-gradient(circle, rgba(212,175,55,${0.2 + intensity * 0.3}) 0%, transparent 70%)`,
        }}
      />
      {/* Nombre central */}
      <span className="relative text-7xl font-heading text-gold animate-pulse tabular-nums select-none">
        {avg}
      </span>
    </div>
  );
}

function StatInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-data text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      <input
        type="number"
        min={1}
        max={30}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 1)}
        className="w-full rounded-card bg-abyss-100 border border-border
                   px-3 py-2 text-sm font-data text-gray-200
                   focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none
                   transition-colors"
      />
    </label>
  );
}

function SlotSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-data text-gray-400 uppercase tracking-wider">
        Niveau d&#39;emplacement
      </span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-card bg-abyss-100 border border-border
                   px-3 py-2 text-sm font-data text-gray-200 appearance-none
                   focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none
                   transition-colors cursor-pointer"
      >
        {SLOT_LEVELS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label} — {s.dice}d8
          </option>
        ))}
      </select>
    </label>
  );
}

function MulticlassToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className={`relative w-10 h-5 rounded-full transition-colors ${
          checked ? "bg-gold/40" : "bg-abyss-200"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all ${
            checked
              ? "translate-x-5 bg-gold shadow-md shadow-gold/40"
              : "bg-gray-500"
          }`}
        />
      </div>
      <div>
        <span className="text-sm font-data text-gray-200 group-hover:text-gold-light transition-colors">
          Multiclassé ?
        </span>
        <p className="text-[10px] font-data text-gray-500">
          Ajoute le mod. CHA aux dégâts
        </p>
      </div>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function NovaCalculator() {
  const [statScore, setStatScore] = useState(20);
  const [slotLevel, setSlotLevel] = useState(1);
  const [multiclassed, setMulticlassed] = useState(false);

  const result = useMemo(
    () => calculateNovaDamage(statScore, slotLevel, multiclassed),
    [statScore, slotLevel, multiclassed],
  );

  return (
    <div
      className="rounded-xl overflow-hidden
                 bg-[#111520]/80 backdrop-blur-md
                 border border-gold/20 shadow-lg shadow-gold/10"
    >
      {/* En-tête grimoire */}
      <div className="px-5 py-4 border-b border-gold/10 text-center">
        <h2 className="font-heading text-xl text-gold uppercase tracking-wide">
          L&#39;Orbe de Puissance
        </h2>
        <p className="text-xs font-body text-gray-400 mt-1">
          Calculateur de Burst — Châtiment Divin (Nova)
        </p>
      </div>

      {/* Orbe central */}
      <OrbGlow avg={result.avg} />

      {/* Breakdown */}
      <div className="flex justify-center gap-6 pb-4 text-center">
        <div>
          <p className="text-[10px] font-data text-gray-500 uppercase">Min</p>
          <p className="text-lg font-data text-gray-400 tabular-nums">{result.min}</p>
        </div>
        <div>
          <p className="text-[10px] font-data text-gray-500 uppercase">Moyenne</p>
          <p className="text-lg font-data text-gold-light tabular-nums">{result.avg}</p>
        </div>
        <div>
          <p className="text-[10px] font-data text-gray-500 uppercase">Max</p>
          <p className="text-lg font-data text-gray-400 tabular-nums">{result.max}</p>
        </div>
      </div>

      {/* Formule */}
      <div className="mx-5 mb-4 bg-abyss-100/60 rounded-card px-4 py-2 text-center">
        <p className="text-xs font-mono text-gray-400">
          <span className="text-gold-light">{result.modifier >= 0 ? `+${result.modifier}` : result.modifier}</span>
          {" + "}
          <span className="text-dmg-radiant">{result.diceCount}d8</span>
          {multiclassed && (
            <>
              {" + "}
              <span className="text-gold-light">{result.modifier >= 0 ? `+${result.modifier}` : result.modifier}</span>
              <span className="text-gray-500"> (CHA)</span>
            </>
          )}
        </p>
      </div>

      {/* Inputs */}
      <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatInput
          label="Score de Charisme / Force"
          value={statScore}
          onChange={setStatScore}
        />
        <SlotSelect value={slotLevel} onChange={setSlotLevel} />
        <div className="sm:col-span-2 pt-1">
          <MulticlassToggle checked={multiclassed} onChange={setMulticlassed} />
        </div>
      </div>
    </div>
  );
}
