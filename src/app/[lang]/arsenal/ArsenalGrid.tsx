"use client";

// ============================================================================
// ArsenalGrid — Hub d'Exposition avec filtres sticky et étagères par rareté
// ============================================================================

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  itemsBilingualV2,
  type ArsenalItemV2,
} from "@/data/arsenal";
import { ItemDetailCard } from "@/components/arsenal/ItemDetailCard";
import type { Locale } from "@/dictionaries";

type ActFilter = "all" | 1 | 2 | 3;
type RarityFilter = "all" | ArsenalItemV2["rarity"];
type TypeFilter = "all" | "Arme" | "Armure" | "Accessoire";

function getTypeCategory(typeFr: string): "Arme" | "Armure" | "Accessoire" {
  if (typeFr === "Arme" || typeFr === "Bouclier") return "Arme";
  if (typeFr === "Armure") return "Armure";
  return "Accessoire";
}

const TEXTS = {
  fr: {
    actLabel: "Acte",
    actAll: "Tous",
    act: (n: number) => `Acte ${n}`,
    typeLabel: "Type",
    typeAll: "Tous",
    typeWeapons: "Armes",
    typeArmor: "Armures",
    typeAccessories: "Accessoires",
    rarityLabel: "Rareté",
    rarityAll: "Toutes",
    rarityLegendary: "Légendaire",
    rarityVeryRare: "Très Rare",
    rarityRare: "Rare",
    rarityUncommon: "Peu Commun",
    searchPlaceholder: "Rechercher un objet, un effet, un build, un lieu...",
    resultCount: (n: number) => `${n} objet${n !== 1 ? "s" : ""} trouvé${n !== 1 ? "s" : ""}`,
    resetFilters: "Réinitialiser les filtres",
    emptyTitle: "Aucun objet trouvé",
    emptyDescription: "Essayez de modifier vos filtres ou votre recherche.",
    shelfLegendary: "Vestiges Légendaires",
    shelfLegendarySub: "Les artefacts qui forgent les légendes de Faerûn",
    shelfVeryRare: "Trésors Très Rares",
    shelfVeryRareSub: "Des reliques convoitées par les aventuriers les plus aguerris",
    shelfRare: "Artefacts Rares",
    shelfRareSub: "Des objets remarquables qui changent le cours d'un combat",
    shelfUncommon: "Trouvailles Peu Communes",
    shelfUncommonSub: "Les fondations solides d'un arsenal victorieux",
    itemCount: (n: number) => `${n} objet${n !== 1 ? "s" : ""}`,
  },
  en: {
    actLabel: "Act",
    actAll: "All",
    act: (n: number) => `Act ${n}`,
    typeLabel: "Type",
    typeAll: "All",
    typeWeapons: "Weapons",
    typeArmor: "Armor",
    typeAccessories: "Accessories",
    rarityLabel: "Rarity",
    rarityAll: "All",
    rarityLegendary: "Legendary",
    rarityVeryRare: "Very Rare",
    rarityRare: "Rare",
    rarityUncommon: "Uncommon",
    searchPlaceholder: "Search for an item, effect, build, location...",
    resultCount: (n: number) => `${n} item${n !== 1 ? "s" : ""} found`,
    resetFilters: "Reset filters",
    emptyTitle: "No items found",
    emptyDescription: "Try adjusting your filters or search terms.",
    shelfLegendary: "Legendary Vestiges",
    shelfLegendarySub: "The artifacts that forge the legends of Faerûn",
    shelfVeryRare: "Very Rare Treasures",
    shelfVeryRareSub: "Relics coveted by the most seasoned adventurers",
    shelfRare: "Rare Artifacts",
    shelfRareSub: "Remarkable items that turn the tide of battle",
    shelfUncommon: "Uncommon Finds",
    shelfUncommonSub: "The solid foundations of a victorious arsenal",
    itemCount: (n: number) => `${n} item${n !== 1 ? "s" : ""}`,
  },
} as const;

function getShelfConfig(lang: "fr" | "en") {
  const t = TEXTS[lang];
  return [
    {
      rarity: "legendary" as const,
      title: t.shelfLegendary,
      subtitle: t.shelfLegendarySub,
      gradient: "from-yellow-200 via-gold to-amber-600",
      barGradient: "from-transparent via-yellow-500/50 to-transparent",
    },
    {
      rarity: "very_rare" as const,
      title: t.shelfVeryRare,
      subtitle: t.shelfVeryRareSub,
      gradient: "from-fuchsia-300 via-fuchsia-400 to-purple-600",
      barGradient: "from-transparent via-fuchsia-500/50 to-transparent",
    },
    {
      rarity: "rare" as const,
      title: t.shelfRare,
      subtitle: t.shelfRareSub,
      gradient: "from-blue-300 via-blue-400 to-indigo-600",
      barGradient: "from-transparent via-blue-500/50 to-transparent",
    },
    {
      rarity: "uncommon" as const,
      title: t.shelfUncommon,
      subtitle: t.shelfUncommonSub,
      gradient: "from-green-300 via-green-400 to-emerald-600",
      barGradient: "from-transparent via-green-500/50 to-transparent",
    },
  ];
}

export function ArsenalGrid({ lang = "fr" }: { lang?: Locale }) {
  const l = lang === "en" ? "en" : "fr";
  const t = TEXTS[l];
  const [actFilter, setActFilter] = useState<ActFilter>("all");
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");

  const actOptions: { value: ActFilter; label: string }[] = [
    { value: "all", label: t.actAll },
    { value: 1, label: t.act(1) },
    { value: 2, label: t.act(2) },
    { value: 3, label: t.act(3) },
  ];

  const rarityOptions: { value: RarityFilter; label: string; color: string }[] = [
    { value: "all", label: t.rarityAll, color: "text-gray-400 border-gray-600 hover:border-gray-400" },
    { value: "legendary", label: t.rarityLegendary, color: "text-yellow-400 border-yellow-500/40 hover:border-yellow-500" },
    { value: "very_rare", label: t.rarityVeryRare, color: "text-fuchsia-400 border-fuchsia-500/40 hover:border-fuchsia-500" },
    { value: "rare", label: t.rarityRare, color: "text-blue-400 border-blue-500/40 hover:border-blue-500" },
    { value: "uncommon", label: t.rarityUncommon, color: "text-green-400 border-green-500/40 hover:border-green-500" },
  ];

  const typeOptions: { value: TypeFilter; label: string }[] = [
    { value: "all", label: t.typeAll },
    { value: "Arme", label: t.typeWeapons },
    { value: "Armure", label: t.typeArmor },
    { value: "Accessoire", label: t.typeAccessories },
  ];

  // Filter all items
  const filtered = useMemo(() => {
    return itemsBilingualV2.filter((item) => {
      if (actFilter !== "all" && item.act !== actFilter) return false;
      if (rarityFilter !== "all" && item.rarity !== rarityFilter) return false;
      if (typeFilter !== "all" && getTypeCategory(item.type.fr) !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.name[l].toLowerCase().includes(q) ||
          item.description[l].toLowerCase().includes(q) ||
          item.type[l].toLowerCase().includes(q) ||
          item.location[l].toLowerCase().includes(q) ||
          item.usedBy.some((b) => b.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [l, actFilter, rarityFilter, typeFilter, search]);

  // Group filtered items by rarity for shelf display
  const rarityShelves = getShelfConfig(l);
  const shelves = useMemo(() => {
    return rarityShelves.map((shelf) => ({
      ...shelf,
      items: filtered.filter((item) => item.rarity === shelf.rarity),
    })).filter((shelf) => shelf.items.length > 0);
  }, [filtered, rarityShelves]);

  const hasActiveFilters = actFilter !== "all" || rarityFilter !== "all" || typeFilter !== "all" || search;

  return (
    <div className="space-y-8">
      {/* ===== STICKY FILTER BAR ===== */}
      <div
        className="sticky top-0 z-40 -mx-4 px-4 py-4 space-y-4
          bg-gradient-to-b from-[#0d0f18]/95 via-[#0d0f18]/90 to-[#0d0f18]/80
          backdrop-blur-xl
          border-b border-gold/10
          shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
      >
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
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm font-body text-gray-300
                       bg-white/[0.04] border border-white/[0.08] rounded-xl
                       placeholder:text-gray-600
                       focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/15
                       focus:bg-white/[0.06]
                       transition-all duration-200"
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
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          {/* Act filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-data text-gold/40 uppercase tracking-wider mr-0.5">
              {t.actLabel}
            </span>
            {actOptions.map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setActFilter(opt.value)}
                className={`text-[11px] font-data px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  actFilter === opt.value
                    ? "bg-gold/15 border-gold/40 text-gold shadow-[0_0_8px_-2px_rgba(212,175,55,0.2)]"
                    : "border-white/[0.06] text-gray-500 hover:border-white/[0.12] hover:text-gray-300 hover:bg-white/[0.03]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="w-[1px] h-5 bg-white/[0.06] hidden sm:block" />

          {/* Type filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-data text-gold/40 uppercase tracking-wider mr-0.5">
              {t.typeLabel}
            </span>
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTypeFilter(opt.value)}
                className={`text-[11px] font-data px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  typeFilter === opt.value
                    ? "bg-gold/15 border-gold/40 text-gold shadow-[0_0_8px_-2px_rgba(212,175,55,0.2)]"
                    : "border-white/[0.06] text-gray-500 hover:border-white/[0.12] hover:text-gray-300 hover:bg-white/[0.03]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="w-[1px] h-5 bg-white/[0.06] hidden sm:block" />

          {/* Rarity filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-data text-gold/40 uppercase tracking-wider mr-0.5">
              {t.rarityLabel}
            </span>
            {rarityOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRarityFilter(opt.value)}
                className={`text-[11px] font-data px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  rarityFilter === opt.value
                    ? `${opt.color} bg-white/5 shadow-[0_0_8px_-2px_rgba(255,255,255,0.1)]`
                    : `border-white/[0.06] text-gray-500 hover:border-white/[0.12] hover:text-gray-300 hover:bg-white/[0.03]`
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-center text-[11px] font-data text-gray-500">
          {t.resultCount(filtered.length)}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setActFilter("all");
                setRarityFilter("all");
                setTypeFilter("all");
                setSearch("");
              }}
              className="ml-2 text-gold/50 hover:text-gold transition-colors underline underline-offset-2 decoration-gold/20 hover:decoration-gold/40"
            >
              {t.resetFilters}
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
                    {t.itemCount(shelf.items.length)}
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
                      <ItemDetailCard
                        name={item.name[l]}
                        rarity={item.rarity}
                        type={item.type[l]}
                        description={item.description[l]}
                        acquisition={item.acquisition?.[l]}
                        icon={item.icon}
                        itemId={item.id}
                        lang={l}
                      />
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
              {t.emptyTitle}
            </p>
            <p className="text-sm font-body text-gray-600">
              {t.emptyDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
