"use client";

// ============================================================================
// Sidebar — Navigation latérale principale en français
// ============================================================================

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Structure de navigation
// ---------------------------------------------------------------------------

interface NavItem {
  readonly label: string;
  readonly href?: string;
  readonly icon: string;
  readonly children?: readonly NavItem[];
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Le Codex",
    href: "/",
    icon: "📖",
  },
  {
    label: "Tier List Builds",
    icon: "⚔️",
    children: [
      { label: "Le Lockadin", href: "/builds/lockadin", icon: "🗡️" },
    ],
  },
  {
    label: "Walkthrough",
    icon: "🗺️",
    children: [
      { label: "Acte 1 (Survie)", href: "/walkthrough/acte-1", icon: "🏕️" },
      { label: "Acte 2 (Ombres)", href: "/walkthrough/acte-2", icon: "🌑" },
      { label: "Acte 3 (Endgame)", href: "/walkthrough/acte-3", icon: "🏰" },
    ],
  },
  {
    label: "Méta & Outils",
    icon: "🔧",
    children: [
      { label: "Simulateur de Dés", href: "/outils/des", icon: "🎲" },
      { label: "Simulateur de Combat", href: "/outils/combat", icon: "💥" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Composant NavGroup (avec sous-menus)
// ---------------------------------------------------------------------------

function NavGroup({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname || item.children?.some((c) => c.href === pathname);
  const [isOpen, setIsOpen] = useState(isActive || false);

  if (!hasChildren && item.href) {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-data transition-all duration-200
          ${active
            ? "bg-gold/10 text-gold border border-gold/20"
            : "text-gray-400 hover:text-gray-200 hover:bg-surface-raised"}
        `}
      >
        <span className="text-base" aria-hidden>{item.icon}</span>
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-data transition-all duration-200
          ${isActive ? "text-gold" : "text-gray-400 hover:text-gray-200 hover:bg-surface-raised"}
        `}
      >
        <span className="text-base" aria-hidden>{item.icon}</span>
        <span className="flex-1 text-left">{item.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-gray-500"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-5 mt-1 space-y-0.5 border-l border-border ml-5">
              {item.children.map((child) => {
                const childActive = child.href === pathname;
                return (
                  <Link
                    key={child.href}
                    href={child.href!}
                    className={`
                      flex items-center gap-2.5 px-3 py-2 rounded text-xs font-data transition-all duration-200
                      ${childActive
                        ? "bg-gold/10 text-gold"
                        : "text-gray-500 hover:text-gray-300 hover:bg-surface-raised"}
                    `}
                  >
                    <span className="text-sm" aria-hidden>{child.icon}</span>
                    <span>{child.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-surface h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto scrollbar-thin">
      <div className="p-4 space-y-1">
        {/* Titre */}
        <div className="px-3 py-3 mb-2">
          <p className="text-[10px] font-data uppercase tracking-widest text-gray-500">
            Navigation
          </p>
        </div>

        {NAV_ITEMS.map((item) => (
          <NavGroup key={item.label} item={item} pathname={pathname} />
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 mt-auto border-t border-border">
        <p className="text-[10px] font-data text-gray-600 text-center">
          BG3 Honor Companion v0.1
        </p>
        <p className="text-[10px] font-data text-gray-600 text-center mt-0.5">
          Mode Honneur — Aucun droit à l&apos;erreur
        </p>
      </div>
    </aside>
  );
}
