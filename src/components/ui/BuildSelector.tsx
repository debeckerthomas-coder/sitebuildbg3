"use client";

import { useAppStore } from "@/store";
import { BUILDS_TIER_S } from "@/data/builds/tier-s";

const BUILDS = BUILDS_TIER_S.map((b) => ({ id: b.id, name: b.name }));

export function BuildSelector() {
  const activeBuild = useAppStore((s) => s.activeBuild);
  const setActiveBuild = useAppStore((s) => s.setActiveBuild);

  return (
    <select
      value={activeBuild ?? ""}
      onChange={(e) => setActiveBuild(e.target.value)}
      className="w-full px-3 py-2 rounded-card text-xs font-data bg-[#111520] text-gold border border-gold/20 hover:border-gold/40 focus:border-gold/60 focus:outline-none transition-colors appearance-none cursor-pointer"
      aria-label="Sélecteur de build actif"
    >
      <option value="">🧙‍♂️ Choisissez votre Destinée</option>
      {BUILDS.map((b) => (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      ))}
    </select>
  );
}
