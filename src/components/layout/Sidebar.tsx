"use client";

// ============================================================================
// Sidebar — Navigation latérale responsive avec hamburger mobile
// ============================================================================

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BuildSelector } from "@/components/ui/BuildSelector";

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
    label: "Accueil",
    href: "/",
    icon: "🏠",
  },
  {
    label: "Le Codex",
    href: "/codex",
    icon: "📖",
  },
  {
    label: "L'Armurerie",
    href: "/arsenal",
    icon: "🛡️",
  },
  {
    label: "Tier List Builds",
    icon: "⚔️",
    children: [
      { label: "Tous les Builds (9)", href: "/builds", icon: "📊" },
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
      { label: "L'Atelier (Hub)", href: "/outils", icon: "🔧" },
      { label: "Conseil de Guerre", href: "/outils/groupe", icon: "👥" },
      { label: "Traqueur d'Inventaire", href: "/outils/traqueur", icon: "🎒" },
      { label: "Matrice Illithid", href: "/outils/illithid", icon: "🧠" },
      { label: "Simulateur de Dés", href: "/outils/des", icon: "🎲" },
      { label: "Initiative (d4)", href: "/outils/initiative", icon: "⚡" },
      { label: "Simulateur de Combat", href: "/outils/combat", icon: "💥" },
      { label: "Calculateur Nova", href: "/outils/nova", icon: "🔮" },
      { label: "Rituel de Préparation", href: "/outils/preparation", icon: "📜" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Composant NavGroup (avec sous-menus)
// ---------------------------------------------------------------------------

function NavGroup({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname || item.children?.some((c) => c.href === pathname);
  const [isOpen, setIsOpen] = useState(isActive || false);

  if (!hasChildren && item.href) {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-data transition-all duration-200
          ${active
            ? "bg-theme/10 text-theme border border-theme/20"
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
          ${isActive ? "text-theme" : "text-gray-400 hover:text-gray-200 hover:bg-surface-raised"}
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
                    onClick={onNavigate}
                    className={`
                      flex items-center gap-2.5 px-3 py-2 rounded text-xs font-data transition-all duration-200
                      ${childActive
                        ? "bg-theme/10 text-theme"
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
// Hamburger Icon (animated)
// ---------------------------------------------------------------------------

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-5 h-4 relative flex flex-col justify-between">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-0.5 w-full bg-theme rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        className="block h-0.5 w-full bg-theme rounded-full"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-0.5 w-full bg-theme rounded-full origin-center"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navigation Content (shared between desktop and mobile)
// ---------------------------------------------------------------------------

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="p-4 space-y-1">
        <div className="px-3 py-3 mb-2">
          <p className="text-[10px] font-data uppercase tracking-widest text-gray-500">
            Navigation
          </p>
        </div>

        {NAV_ITEMS.map((item) => (
          <NavGroup key={item.label} item={item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </div>

      <div className="px-4 py-3 border-t border-border">
        <p className="text-[10px] font-data uppercase tracking-widest text-gray-500 mb-2 px-1">
          Smart Guide
        </p>
        <BuildSelector />
      </div>

      <div className="p-4 mt-auto border-t border-border">
        <p className="text-[10px] font-data text-gray-600 text-center">
          BG3 Honor Companion v0.1
        </p>
        <p className="text-[10px] font-data text-gray-600 text-center mt-0.5">
          Mode Honneur — Aucun droit à l&apos;erreur
        </p>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Sidebar (Desktop + Mobile)
// ---------------------------------------------------------------------------

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Responding to external navigation event; no alternative without effect
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-3.5 right-4 z-50 p-2 rounded-card bg-surface border border-border hover:border-theme/30 transition-colors"
        aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <HamburgerIcon isOpen={mobileOpen} />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-border bg-surface h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto scrollbar-thin">
        <NavContent />
      </aside>

      {/* Mobile overlay + drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-abyss/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-14 left-0 bottom-0 z-50 w-72 bg-surface border-r border-border overflow-y-auto scrollbar-thin"
            >
              <NavContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
