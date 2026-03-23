"use client";

// ============================================================================
// SearchPalette — Command Palette globale (Ctrl+K / Cmd+K)
// Recherche rapide : Pages, Builds Tier S, Outils, Codex, Arsenal
// ============================================================================

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SearchEntry {
  readonly id: string;
  readonly label: string;
  readonly category: string;
  readonly href: string;
  readonly icon: string;
  readonly keywords: string;
}

// ---------------------------------------------------------------------------
// Searchable data — all major routes, builds, tools
// ---------------------------------------------------------------------------

const SEARCH_DATA_FR: readonly SearchEntry[] = [
  // Pages principales
  { id: "home", label: "Accueil", category: "Page", href: "/", icon: "🏠", keywords: "accueil home" },
  { id: "arsenal", label: "L'Armurerie", category: "Page", href: "/arsenal", icon: "🛡️", keywords: "armurerie arsenal équipement loot" },
  { id: "builds", label: "Tier List — Tous les Builds", category: "Page", href: "/builds", icon: "📊", keywords: "builds tier list classement" },
  { id: "codex", label: "Le Codex", category: "Page", href: "/codex", icon: "📖", keywords: "codex encyclopédie objets sorts" },

  // 10 Builds Tier S
  { id: "b_moine", label: "Le Moine Bagarreur", category: "Build Tier S", href: "/builds/moine_bagarreur", icon: "⚔️", keywords: "moine tavern brawler monk bagarreur" },
  { id: "b_barde", label: "Le Barde Contrôleur", category: "Build Tier S", href: "/builds/barde_controleur", icon: "⚔️", keywords: "barde contrôleur controller" },
  { id: "b_throw", label: "Le Lanceur Fou (Throwzerker)", category: "Build Tier S", href: "/builds/throwzerker", icon: "⚔️", keywords: "throwzerker lanceur barbare" },
  { id: "b_clerc", label: "Le Clerc Orbes d'Irradiation", category: "Build Tier S", href: "/builds/clerc_irradiation", icon: "⚔️", keywords: "clerc irradiation radiant orbs" },
  { id: "b_nuke", label: "Le Nuke Tempête", category: "Build Tier S", href: "/builds/nuke_tempete", icon: "⚔️", keywords: "nuke tempête storm sorcerer" },
  { id: "b_barda", label: "Le Bardadin « Dieu du Smite »", category: "Build Tier S", href: "/builds/bardadin", icon: "⚔️", keywords: "bardadin smite paladin barde" },
  { id: "b_sorca", label: "Le Sorcadin", category: "Build Tier S", href: "/builds/sorcadin", icon: "⚔️", keywords: "sorcadin sorcerer paladin" },
  { id: "b_fire", label: "La Mitrailleuse de Feu (Fire Sorlock)", category: "Build Tier S", href: "/builds/fire_sorlock", icon: "⚔️", keywords: "fire sorlock mitrailleuse feu eldritch blast" },
  { id: "b_gloom", label: "L'Alpha Strike (Gloom Assassin)", category: "Build Tier S", href: "/builds/gloom_assassin", icon: "⚔️", keywords: "gloom stalker assassin alpha strike" },
  { id: "b_locka", label: "Le Lockadin", category: "Build Tier S", href: "/builds/lockadin", icon: "⚔️", keywords: "lockadin warlock paladin" },

  // Walkthrough
  { id: "wt_1", label: "Walkthrough — Acte 1", category: "Guide", href: "/walkthrough/acte-1", icon: "🏕️", keywords: "acte 1 survie walkthrough guide" },
  { id: "wt_2", label: "Walkthrough — Acte 2", category: "Guide", href: "/walkthrough/acte-2", icon: "🌑", keywords: "acte 2 ombres walkthrough guide" },
  { id: "wt_3", label: "Walkthrough — Acte 3", category: "Guide", href: "/walkthrough/acte-3", icon: "🏰", keywords: "acte 3 endgame walkthrough guide" },

  // Outils
  { id: "t_atelier", label: "Atelier (Tous les Outils)", category: "Outil", href: "/outils", icon: "🔧", keywords: "atelier outils workshop tools" },
  { id: "t_combat", label: "Simulateur de Combat", category: "Outil", href: "/outils/combat", icon: "⚔️", keywords: "combat log simulateur" },
  { id: "t_des", label: "Simulateur de Dés", category: "Outil", href: "/outils/des", icon: "🎲", keywords: "dés dice simulateur" },
  { id: "t_group", label: "Composition de Groupe", category: "Outil", href: "/outils/group", icon: "👥", keywords: "groupe composition party" },
  { id: "t_illi", label: "Traqueur Illithide", category: "Outil", href: "/outils/illithid", icon: "🧠", keywords: "illithid tadpole traqueur" },
  { id: "t_init", label: "Traqueur d'Initiative", category: "Outil", href: "/outils/initiative", icon: "⚡", keywords: "initiative tracker ordre" },
  { id: "t_nova", label: "Calculateur Nova", category: "Outil", href: "/outils/nova", icon: "💥", keywords: "nova dégâts calculateur damage" },
  { id: "t_prep", label: "Checklist de Préparation", category: "Outil", href: "/outils/preparation", icon: "✅", keywords: "préparation checklist" },
  { id: "t_traq", label: "Traqueur de Run", category: "Outil", href: "/outils/traqueur", icon: "📋", keywords: "run traqueur tracker" },
  { id: "t_forge", label: "La Forge des Caractéristiques", category: "Outil", href: "/outils/forge", icon: "🔨", keywords: "forge caractéristiques point buy stats statistiques" },
];

const SEARCH_DATA_EN: readonly SearchEntry[] = [
  // Main pages
  { id: "home", label: "Home", category: "Page", href: "/", icon: "🏠", keywords: "home accueil" },
  { id: "arsenal", label: "The Armory", category: "Page", href: "/arsenal", icon: "🛡️", keywords: "armory arsenal equipment loot" },
  { id: "builds", label: "Tier List — All Builds", category: "Page", href: "/builds", icon: "📊", keywords: "builds tier list ranking" },
  { id: "codex", label: "The Codex", category: "Page", href: "/codex", icon: "📖", keywords: "codex encyclopedia items spells" },

  // 10 Tier S Builds
  { id: "b_moine", label: "Tavern Brawler Monk", category: "Build Tier S", href: "/builds/moine_bagarreur", icon: "⚔️", keywords: "monk tavern brawler moine" },
  { id: "b_barde", label: "Controller Bard", category: "Build Tier S", href: "/builds/barde_controleur", icon: "⚔️", keywords: "bard controller contrôleur" },
  { id: "b_throw", label: "Throwzerker", category: "Build Tier S", href: "/builds/throwzerker", icon: "⚔️", keywords: "throwzerker barbarian thrower" },
  { id: "b_clerc", label: "Radiant Orb Cleric", category: "Build Tier S", href: "/builds/clerc_irradiation", icon: "⚔️", keywords: "cleric radiant orbs irradiation" },
  { id: "b_nuke", label: "Storm Nuke Sorcerer", category: "Build Tier S", href: "/builds/nuke_tempete", icon: "⚔️", keywords: "nuke storm sorcerer tempête" },
  { id: "b_barda", label: "Bardadin « Smite God »", category: "Build Tier S", href: "/builds/bardadin", icon: "⚔️", keywords: "bardadin smite paladin bard" },
  { id: "b_sorca", label: "Sorcadin", category: "Build Tier S", href: "/builds/sorcadin", icon: "⚔️", keywords: "sorcadin sorcerer paladin" },
  { id: "b_fire", label: "Fire Sorlock", category: "Build Tier S", href: "/builds/fire_sorlock", icon: "⚔️", keywords: "fire sorlock eldritch blast" },
  { id: "b_gloom", label: "Alpha Strike (Gloom Assassin)", category: "Build Tier S", href: "/builds/gloom_assassin", icon: "⚔️", keywords: "gloom stalker assassin alpha strike" },
  { id: "b_locka", label: "Lockadin", category: "Build Tier S", href: "/builds/lockadin", icon: "⚔️", keywords: "lockadin warlock paladin" },

  // Walkthrough
  { id: "wt_1", label: "Walkthrough — Act 1", category: "Guide", href: "/walkthrough/acte-1", icon: "🏕️", keywords: "act 1 survival walkthrough guide" },
  { id: "wt_2", label: "Walkthrough — Act 2", category: "Guide", href: "/walkthrough/acte-2", icon: "🌑", keywords: "act 2 shadows walkthrough guide" },
  { id: "wt_3", label: "Walkthrough — Act 3", category: "Guide", href: "/walkthrough/acte-3", icon: "🏰", keywords: "act 3 endgame walkthrough guide" },

  // Tools
  { id: "t_atelier", label: "Workshop (All Tools)", category: "Tool", href: "/outils", icon: "🔧", keywords: "workshop tools atelier outils" },
  { id: "t_combat", label: "Combat Simulator", category: "Tool", href: "/outils/combat", icon: "⚔️", keywords: "combat log simulator" },
  { id: "t_des", label: "Dice Simulator", category: "Tool", href: "/outils/des", icon: "🎲", keywords: "dice simulator" },
  { id: "t_group", label: "Party Composition", category: "Tool", href: "/outils/group", icon: "👥", keywords: "group party composition" },
  { id: "t_illi", label: "Illithid Tracker", category: "Tool", href: "/outils/illithid", icon: "🧠", keywords: "illithid tadpole tracker" },
  { id: "t_init", label: "Initiative Tracker", category: "Tool", href: "/outils/initiative", icon: "⚡", keywords: "initiative tracker order" },
  { id: "t_nova", label: "Nova Calculator", category: "Tool", href: "/outils/nova", icon: "💥", keywords: "nova damage calculator" },
  { id: "t_prep", label: "Preparation Checklist", category: "Tool", href: "/outils/preparation", icon: "✅", keywords: "preparation checklist" },
  { id: "t_traq", label: "Run Tracker", category: "Tool", href: "/outils/traqueur", icon: "📋", keywords: "run tracker" },
  { id: "t_forge", label: "Character Stat Forge", category: "Tool", href: "/outils/forge", icon: "🔨", keywords: "forge character point buy stats abilities" },
];

const SEARCH_BY_LANG: Record<string, readonly SearchEntry[]> = {
  fr: SEARCH_DATA_FR,
  en: SEARCH_DATA_EN,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function SearchPaletteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const lang = pathname.split("/")[1] === "en" ? "en" : "fr";
  const searchData = SEARCH_BY_LANG[lang] ?? SEARCH_DATA_FR;

  // Filtered results
  const results = useMemo(() => {
    if (!query.trim()) return [...searchData];
    const q = query.toLowerCase();
    return searchData.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.keywords.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  }, [query, searchData]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results.length]);

  // Scroll active item into view
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const activeEl = container.children[activeIndex] as HTMLElement | undefined;
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  // Navigate to selected result
  const navigate = useCallback(
    (entry: SearchEntry) => {
      const href = entry.href === "/" ? `/${lang}` : `/${lang}${entry.href}`;
      close();
      router.push(href);
    },
    [lang, router, close]
  );

  // Focus input when opened
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation inside the palette
  const onInputKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (results[activeIndex]) navigate(results[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  // Group results by category for display
  const grouped = useMemo(() => {
    const map = new Map<string, SearchEntry[]>();
    for (const entry of results) {
      const arr = map.get(entry.category) ?? [];
      arr.push(entry);
      map.set(entry.category, arr);
    }
    return map;
  }, [results]);

  // Flat index counter for keyboard navigation
  let flatIdx = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-abyss/70 backdrop-blur-sm"
            onClick={close}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-4 top-[12vh] z-[101] mx-auto max-w-xl"
          >
            <div className="rounded-xl border border-border bg-surface/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.08)] overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                {/* Magnifier icon */}
                <svg
                  className="w-5 h-5 text-gray-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder={lang === "en" ? "Search pages, builds, tools..." : "Rechercher pages, builds, outils..."}
                  className="flex-1 bg-transparent text-sm font-body text-gray-200 placeholder:text-gray-500 outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />

                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-data text-gray-500 bg-abyss/60 border border-border">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[50vh] overflow-y-auto scrollbar-thin p-2">
                {results.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm font-body text-gray-500">
                    {lang === "en" ? "No results found." : "Aucun résultat trouvé."}
                  </p>
                )}

                {[...grouped.entries()].map(([category, entries]) => (
                  <div key={category} className="mb-1">
                    <p className="px-3 py-1.5 text-[10px] font-data uppercase tracking-widest text-gray-500">
                      {category}
                    </p>
                    {entries.map((entry) => {
                      const idx = flatIdx++;
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={entry.id}
                          onClick={() => navigate(entry)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-body
                            transition-colors duration-100
                            ${isActive
                              ? "bg-theme/10 text-theme"
                              : "text-gray-300 hover:bg-surface-raised"}
                          `}
                        >
                          <span className="text-base shrink-0" aria-hidden>{entry.icon}</span>
                          <span className="flex-1 truncate">{entry.label}</span>
                          {isActive && (
                            <span className="text-[10px] font-data text-gray-500">
                              {lang === "en" ? "Enter ↵" : "Entrée ↵"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border text-[10px] font-data text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5">
                    <kbd className="px-1 py-0.5 rounded bg-abyss/60 border border-border">↑</kbd>
                    <kbd className="px-1 py-0.5 rounded bg-abyss/60 border border-border">↓</kbd>
                    {lang === "en" ? " navigate" : " naviguer"}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <kbd className="px-1 py-0.5 rounded bg-abyss/60 border border-border">↵</kbd>
                    {lang === "en" ? " open" : " ouvrir"}
                  </span>
                </div>
                <span className="flex items-center gap-0.5">
                  <kbd className="px-1 py-0.5 rounded bg-abyss/60 border border-border">Esc</kbd>
                  {lang === "en" ? " close" : " fermer"}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// SearchButton — Trigger button for the header
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// GlobalSearch — Self-contained button + palette (mount once in header)
// ---------------------------------------------------------------------------

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface/60
                   text-gray-400 hover:text-gray-200 hover:border-theme/30
                   transition-colors duration-200 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-xs font-data hidden sm:inline">
          Rechercher...
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-data text-gray-500 bg-abyss/60 border border-border">
          {isMac ? "⌘" : "Ctrl+"}K
        </kbd>
      </button>

      <SearchPaletteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
