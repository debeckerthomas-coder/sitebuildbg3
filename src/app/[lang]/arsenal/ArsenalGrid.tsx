"use client";

// ============================================================================
// ArsenalGrid — Hub d'Exposition avec filtres sticky et étagères par rareté
// ============================================================================

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  itemsBiS,
  getTypeCategory,
  type ArsenalItem,
  type TypeCategory,
} from "@/data/arsenal";
import { LootCard } from "@/components/cards/LootCard";

type ActFilter = "all" | 1 | 2 | 3;
type RarityFilter = "all" | ArsenalItem["rarity"];
type TypeFilter = "all" | TypeCategory;

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

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "Arme", label: "Armes" },
  { value: "Armure", label: "Armures" },
  { value: "Accessoire", label: "Accessoires" },
];

// Rarity display config for shelf sections
const RARITY_SHELVES: {
  rarity: ArsenalItem["rarity"];
  title: string;
  subtitle: string;
  gradient: string;
  barGradient: string;
}[] = [
  {
    rarity: "Legendary",
    title: "Vestiges Légendaires",
    subtitle: "Les artefacts qui forgent les légendes de Faerûn",
    gradient: "from-yellow-200 via-gold to-amber-600",
    barGradient: "from-transparent via-yellow-500/50 to-transparent",
  },
  {
    rarity: "Very Rare",
    title: "Trésors Très Rares",
    subtitle: "Des reliques convoitées par les aventuriers les plus aguerris",
    gradient: "from-fuchsia-300 via-fuchsia-400 to-purple-600",
    barGradient: "from-transparent via-fuchsia-500/50 to-transparent",
  },
  {
    rarity: "Rare",
    title: "Artefacts Rares",
    subtitle: "Des objets remarquables qui changent le cours d'un combat",
    gradient: "from-blue-300 via-blue-400 to-indigo-600",
    barGradient: "from-transparent via-blue-500/50 to-transparent",
  },
  {
    rarity: "Uncommon",
    title: "Trouvailles Peu Communes",
    subtitle: "Les fondations solides d'un arsenal victorieux",
    gradient: "from-green-300 via-green-400 to-emerald-600",
    barGradient: "from-transparent via-green-500/50 to-transparent",
  },
];

export function ArsenalGrid() {
  const [actFilter, setActFilter] = useState<ActFilter>("all");
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return itemsBiS.filter((item) => {
      if (actFilter !== "all" && item.act !== actFilter) return false;
      if (rarityFilter !== "all" && item.rarity !== rarityFilter) return false;
      if (typeFilter !== "all" && getTypeCategory(item.type) !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.effect.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.usedBy.some((b) => b.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [actFilter, rarityFilter, typeFilter, search]);

  // Group filtered items by rarity for shelf display
  const shelves = useMemo(() => {
    return RARITY_SHELVES.map((shelf) => ({
      ...shelf,
      items: filtered.filter((item) => item.rarity === shelf.rarity),
    })).filter((shelf) => shelf.items.length > 0);
  }, [filtered]);

  return (
    <div className="space-y-8">
      {/* ===== STICKY FILTER BAR ===== */}
      <div className="sticky top-0 z-40 bg-[#0a0c13]/90 backdrop-blur-md border-b border-border/30 -mx-4 px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative max-w-lg mx-auto">
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
            placeholder="Rechercher un objet, un effet, un build, un lieu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm font-body text-gray-300 bg-[#111520]/80 border border-border rounded-lg
                       placeholder:text-gray-600
                       focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20
                       transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter row */}
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

          {/* Type filter */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-data text-gray-600 uppercase tracking-wider mr-1">
              Type
            </span>
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTypeFilter(opt.value)}
                className={`text-[11px] font-data px-3 py-1.5 rounded-md border transition-all duration-200 ${
                  typeFilter === opt.value
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
          {filtered.length} objet{filtered.length !== 1 ? "s" : ""} trouvé
          {filtered.length !== 1 ? "s" : ""}
          {(actFilter !== "all" || rarityFilter !== "all" || typeFilter !== "all" || search) && (
            <button
              onClick={() => {
                setActFilter("all");
                setRarityFilter("all");
                setTypeFilter("all");
                setSearch("");
              }}
              className="ml-2 text-gold/60 hover:text-gold transition-colors underline underline-offset-2"
            >
              Réinitialiser les filtres
            </button>
          )}
        </p>
      </div>

      {/* ===== SHELVES — Sections par rareté ===== */}
      <AnimatePresence mode="wait">
        {shelves.length > 0 ? (
          <div className="space-y-12">
            {shelves.map((shelf, shelfIdx) => (
              <motion.section
                key={shelf.rarity}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shelfIdx * 0.1, duration: 0.4 }}
                className="space-y-6"
              >
                {/* Shelf header */}
                <div className="text-center space-y-2">
                  {shelfIdx > 0 && (
                    <hr className={`border-0 h-[1px] bg-gradient-to-r ${shelf.barGradient} mb-8`} />
                  )}
                  <h2
                    className={`font-display text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r ${shelf.gradient}`}
                  >
                    {shelf.title}
                  </h2>
                  <p className="text-xs font-body text-gray-500 max-w-xl mx-auto">
                    {shelf.subtitle}
                  </p>
                  <p className="text-[10px] font-data text-gray-600">
                    {shelf.items.length} objet{shelf.items.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Shelf grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch auto-rows-fr">
                  {shelf.items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      className="h-full"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: shelfIdx * 0.1 + i * 0.03, duration: 0.35 }}
                    >
                      <LootCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 space-y-3"
          >
            <div className="text-4xl mb-2 opacity-30">&#9876;</div>
            <p className="text-lg font-display text-gray-500">
              Aucun objet trouvé
            </p>
            <p className="text-sm font-body text-gray-600">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
