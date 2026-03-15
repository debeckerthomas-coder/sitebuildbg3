"use client";

// ============================================================================
// BossCard — MDX-embeddable Boss Stat Block Component
// Usage in MDX: <BossCard id="netherbrain" />
// ============================================================================

import { motion } from "framer-motion";
import { getBoss } from "@/data/bosses/bosses";
import type { Boss, DamageType } from "@/types";

const DAMAGE_TYPE_COLORS: Partial<Record<DamageType, string>> = {
  fire: "text-dmg-fire",
  cold: "text-dmg-cold",
  lightning: "text-dmg-lightning",
  poison: "text-dmg-poison",
  necrotic: "text-dmg-necrotic",
  radiant: "text-dmg-radiant",
  psychic: "text-dmg-psychic",
  force: "text-dmg-force",
};

function AbilityScoreRow({ boss }: { readonly boss: Boss }) {
  const abilities = [
    { key: "STR", value: boss.abilities.strength },
    { key: "DEX", value: boss.abilities.dexterity },
    { key: "CON", value: boss.abilities.constitution },
    { key: "INT", value: boss.abilities.intelligence },
    { key: "WIS", value: boss.abilities.wisdom },
    { key: "CHA", value: boss.abilities.charisma },
  ] as const;

  return (
    <div className="grid grid-cols-6 gap-1 text-center">
      {abilities.map(({ key, value }) => (
        <div key={key} className="bg-abyss-100 rounded px-1 py-1.5">
          <div className="text-[10px] font-data text-gray-500 uppercase">{key}</div>
          <div className="text-sm font-data font-bold text-gray-200">{value}</div>
          <div className="text-[10px] font-data text-gold-muted">
            {value >= 10 ? "+" : ""}
            {Math.floor((value - 10) / 2)}
          </div>
        </div>
      ))}
    </div>
  );
}

export function BossCard({ id }: { readonly id: string }) {
  const boss = getBoss(id);

  if (!boss) {
    return (
      <div className="text-sm text-blood-light font-data p-4 border border-blood/30 rounded-card">
        Boss &quot;{id}&quot; not found in database.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-2 border-blood/40 rounded-card bg-[#111520]/60 backdrop-blur-md shadow-lg shadow-black/50 overflow-hidden my-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blood-dark/60 to-abyss-200/80 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl text-blood-light">{boss.name}</h3>
            <p className="font-data text-xs text-gray-400">
              Act {boss.act} — {boss.location}
            </p>
          </div>
          <div className="text-right">
            <div className="font-data text-sm text-gray-200">
              HP <span className="font-bold text-blood-light">{boss.hitPoints}</span>
            </div>
            <div className="font-data text-xs text-gray-400">
              AC {boss.armourClass}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Ability Scores */}
        <AbilityScoreRow boss={boss} />

        {/* Phases */}
        {boss.phases.map((phase) => (
          <div key={phase.name} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-blood" />
              <h4 className="font-display text-sm text-gray-100">
                {phase.name}
              </h4>
              {phase.hpThreshold && (
                <span className="text-[10px] font-data text-blood-light bg-blood/10 px-1.5 py-0.5 rounded">
                  Below {phase.hpThreshold}% HP
                </span>
              )}
            </div>
            <p className="text-xs font-body text-gray-400 pl-3">
              {phase.description}
            </p>

            {/* Actions */}
            <div className="space-y-1.5 pl-3">
              {phase.actions.map((action) => (
                <div
                  key={action.name}
                  className="bg-abyss/50 rounded px-3 py-2 border border-border/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-display text-gray-200 font-semibold">
                      {action.name}
                    </span>
                    {action.isLegendary && (
                      <span className="text-[9px] font-data text-rarity-legendary bg-rarity-legendary/10 px-1 py-0.5 rounded uppercase">
                        Legendary
                      </span>
                    )}
                    {action.recharge && (
                      <span className="text-[9px] font-data text-gray-500">
                        Recharge {action.recharge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-data text-gray-400 mt-0.5">
                    {action.description}
                  </p>
                  {action.damage && (
                    <p className="text-xs font-mono text-blood-light mt-0.5">
                      {action.damage}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Immunities / Resistances */}
            <div className="flex flex-wrap gap-3 pl-3">
              {phase.immunities && phase.immunities.length > 0 && (
                <div>
                  <span className="text-[10px] font-data text-gray-500 uppercase">Immune: </span>
                  {phase.immunities.map((type) => (
                    <span
                      key={type}
                      className={`text-[10px] font-data ${DAMAGE_TYPE_COLORS[type] ?? "text-gray-300"} mr-1`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}
              {phase.vulnerabilities && phase.vulnerabilities.length > 0 && (
                <div>
                  <span className="text-[10px] font-data text-gray-500 uppercase">Vulnerable: </span>
                  {phase.vulnerabilities.map((type) => (
                    <span
                      key={type}
                      className={`text-[10px] font-data ${DAMAGE_TYPE_COLORS[type] ?? "text-gray-300"} mr-1`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 pt-2 border-t border-border/30">
          {boss.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-data px-1.5 py-0.5 rounded bg-abyss-200 text-gray-500 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
