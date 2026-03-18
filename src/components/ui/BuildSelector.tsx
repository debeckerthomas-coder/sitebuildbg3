"use client";

import { useAppStore } from "@/store";
import { BUILDS_TIER_S } from "@/data/builds/tier-s";

const BUILDS = BUILDS_TIER_S.map((b) => ({ id: b.id, name: b.name }));

export function BuildSelector() {
  const mainBuild = useAppStore((s) => s.party.main);
  const setMainBuild = useAppStore((s) => s.setMainBuild);

  return (
    <select
      value={mainBuild ?? ""}
      onChange={(e) => setMainBuild(e.target.value)}
      className="w-full px-3 py-2 rounded-card text-xs font-data bg-[#111520] text-theme border border-theme/20 hover:border-theme/40 focus:border-theme/60 focus:outline-none transition-colors appearance-none cursor-pointer"
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
