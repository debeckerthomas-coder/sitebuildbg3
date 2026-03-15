"use client";

// ============================================================================
// ArsenalGrid — Filterable loot shelf for Best-in-Slot items
// ============================================================================

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { itemsBiS, type ArsenalItem } from "@/data/arsenal";
import { LootCard } from "@/components/cards/LootCard";

type ActFilter = "all" | 1 | 2 | 3;
type RarityFilter = "all" | ArsenalItem["rarity"];

const ACT_OPTIONS: { value: ActFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: 1, label: "Acte 1" },
  { value: 2, label: "Acte 2" },
  { value: 3, label: "Acte 3" },
];

const RARITY_OPTIONS: { value: RarityFilter; label: string; color: string }[] = [
  { value: "all", label: "Toutes", color: "text-gray-400 border-gray-600 hover:border-gray-400" },
  { value: "Legendary", label: "Légendaire", color: "text-yellow-400 border-yellow-500/40 hover:border-yellow-500" },
  { value: "Very Rare", label: "Très Rare", color: "text-fuchsia-400 border-fuchsia-500/40 hover:border-fuchsia-500" },
  { value: "Rare", label: "Rare", color: "text-blue-400 border-blue-500/40 hover:border-blue-500" },
  { value: "Uncommon", label: "Peu Commun", color: "text-green-400 border-green-500/40 hover:border-green-500" },
];

export function ArsenalGrid() {
  const [actFilter, setActFilter] = useState<ActFilter>("all");
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return itemsBiS.filter((item) => {
      if (actFilter !== "all" && item.act !== actFilter) return false;
      if (rarityFilter !== "all" && item.rarity !== rarityFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.effect.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.usedBy.some((b) => b.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [actFilter, rarityFilter, search]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un objet, un effet, un build..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm font-body text-gray-300 bg-[#111520]/80 border border-border rounded-lg
                       placeholder:text-gray-600
                       focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20
                       transition-colors"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Act filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-data text-gray-600 uppercase tracking-wider mr-1">
              Acte
            </span>
            {ACT_OPTIONS.map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setActFilter(opt.value)}
                className={`text-[11px] font-data px-3 py-1.5 rounded-md border transition-all duration-200 ${
                  actFilter === opt.value
                    ? "bg-gold/20 border-gold/50 text-gold"
                    : "border-border/50 text-gray-500 hover:border-gold/30 hover:text-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="w-[1px] h-6 bg-border/50 hidden sm:block" />

          {/* Rarity filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-data text-gray-600 uppercase tracking-wider mr-1">
              Rareté
            </span>
            {RARITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRarityFilter(opt.value)}
                className={`text-[11px] font-data px-3 py-1.5 rounded-md border transition-all duration-200 ${
                  rarityFilter === opt.value
                    ? `${opt.color} bg-white/5`
                    : `border-border/50 text-gray-500 hover:${opt.color}`
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-center text-[11px] font-data text-gray-600">
          {filtered.length} objet{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <LootCard item={item} />
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 space-y-2">
          <p className="text-lg font-display text-gray-500">Aucun objet trouvé</p>
          <p className="text-sm font-body text-gray-600">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      )}
    </div>
  );
}
