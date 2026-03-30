"use client";

// ============================================================================
// HeaderBuildSelector — Compact global build selector shown in the top header
// Displays the active build name or a prompt to select one.
// ============================================================================

import { useState, useEffect } from "react";
import { useAppStore } from "@/store";
import { BUILDS_TIER_S } from "@/data/builds/tier-s";

const BUILDS = BUILDS_TIER_S.map((b) => ({ id: b.id, name: b.name }));

export function HeaderBuildSelector() {
  const mainBuild = useAppStore((s) => s.party.main);
  const setMainBuild = useAppStore((s) => s.setMainBuild);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeName = BUILDS.find((b) => b.id === mainBuild)?.name;

  return (
    <div className="hidden md:flex items-center gap-1.5">
      <span className="text-[10px] font-data text-gray-500 uppercase tracking-wider shrink-0">
        Mon Build
      </span>
      <select
        value={mounted ? (mainBuild ?? "") : ""}
        onChange={(e) => setMainBuild(e.target.value)}
        className="
          px-2 py-1 rounded-md text-[11px] font-data
          bg-[#111520] border border-[#2a3048]
          text-[#d4af37] hover:border-[#d4af37]/40
          focus:border-[#d4af37]/60 focus:outline-none
          transition-colors appearance-none cursor-pointer
          max-w-[160px] truncate
        "
        aria-label="Build actif"
      >
        <option value="">-- Choisir --</option>
        {BUILDS.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  );
}
