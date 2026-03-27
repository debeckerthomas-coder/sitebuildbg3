"use client";

// ============================================================================
// Sidebar — Navigation Rail rétractable + hamburger mobile
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
  readonly badge?: string;
  readonly children?: readonly NavItem[];
}

const NAV_ITEMS_FR: readonly NavItem[] = [
  { label: "Accueil", href: "/", icon: "🏠" },
  { label: "L'Armurerie", href: "/arsenal", icon: "🛡️" },
  {
    label: "Tier List Builds", icon: "⚔️",
    children: [
      { label: "Tous les Builds (9)", href: "/builds", icon: "📊" },
      { label: "Le Lockadin", href: "/builds/lockadin", icon: "🗡️" },
    ],
  },
  {
    label: "Walkthrough", icon: "🗺️",
    children: [
      { label: "Acte 1 (Survie)", href: "/walkthrough/acte-1", icon: "🏕️" },
      { label: "Acte 2 (Ombres)", href: "/walkthrough/acte-2", icon: "🌑" },
      { label: "Acte 3 (Endgame)", href: "/walkthrough/acte-3", icon: "🏰" },
    ],
  },
  {
    label: "Atelier", icon: "🔧",
    children: [
      { label: "Tous les Outils", href: "/outils", icon: "🔧" },
      { label: "Calculateur de Dégâts", href: "/outils/calculateur", icon: "🧮" },
    ],
  },
  { label: "Planificateur", href: "/planner", icon: "🔮", badge: "New" },
];

const NAV_ITEMS_EN: readonly NavItem[] = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "The Armory", href: "/arsenal", icon: "🛡️" },
  {
    label: "Build Tier List", icon: "⚔️",
    children: [
      { label: "All Builds (9)", href: "/builds", icon: "📊" },
      { label: "The Lockadin", href: "/builds/lockadin", icon: "🗡️" },
    ],
  },
  {
    label: "Walkthrough", icon: "🗺️",
    children: [
      { label: "Act 1 (Survival)", href: "/walkthrough/acte-1", icon: "🏕️" },
      { label: "Act 2 (Shadows)", href: "/walkthrough/acte-2", icon: "🌑" },
      { label: "Act 3 (Endgame)", href: "/walkthrough/acte-3", icon: "🏰" },
    ],
  },
  {
    label: "Workshop", icon: "🔧",
    children: [
      { label: "All Tools", href: "/outils", icon: "🔧" },
      { label: "Damage Calculator", href: "/outils/calculateur", icon: "🧮" },
    ],
  },
  { label: "Party Planner", href: "/planner", icon: "🔮", badge: "New" },
];

const NAV_BY_LANG: Record<string, readonly NavItem[]> = { fr: NAV_ITEMS_FR, en: NAV_ITEMS_EN };

/** Extract locale from pathname (e.g. "/en/builds" → "en") */
function extractLang(pathname: string): string {
  const seg = pathname.split("/")[1];
  return seg === "en" ? "en" : "fr";
}

/** Prefix nav hrefs with the current lang */
function prefixItems(items: readonly NavItem[], lang: string): NavItem[] {
  return items.map((item) => ({
    ...item,
    href: item.href ? `/${lang}${item.href === "/" ? "" : item.href}` : undefined,
    children: item.children ? prefixItems(item.children, lang) as readonly NavItem[] : undefined,
  }));
}

// ---------------------------------------------------------------------------
// Chevron Toggle Button
// ---------------------------------------------------------------------------

function CollapseToggle({
  isCollapsed,
  onClick,
}: {
  isCollapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-7 h-7 rounded-md text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-all duration-200"
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Composant NavGroup (avec sous-menus) — collapse-aware
// ---------------------------------------------------------------------------

function NavGroup({
  item,
  pathname,
  isCollapsed,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  isCollapsed: boolean;
  onNavigate?: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === pathname || item.children?.some((c) => c.href === pathname);
  const [isOpen, setIsOpen] = useState(isActive || false);

  // Simple link (no children)
  if (!hasChildren && item.href) {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        title={isCollapsed ? item.label : undefined}
        className={`
          flex items-center gap-3 rounded-card text-sm font-data transition-all duration-200
          ${isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"}
          ${active
            ? "bg-theme/10 text-theme border border-theme/20"
            : "text-gray-400 hover:text-gray-200 hover:bg-surface-raised"}
        `}
      >
        <span className="text-base shrink-0" aria-hidden>{item.icon}</span>
        {!isCollapsed && (
          <>
            <span className="truncate">{item.label}</span>
            {item.badge && (
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-1.5 py-0.5 rounded shrink-0">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );
  }

  // Group with children
  return (
    <div>
      <button
        onClick={() => {
          if (isCollapsed) {
            // In collapsed mode, toggle open and let the parent handle expansion
            setIsOpen(!isOpen);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        title={isCollapsed ? item.label : undefined}
        className={`
          w-full flex items-center gap-3 rounded-card text-sm font-data transition-all duration-200
          ${isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"}
          ${isActive ? "text-theme" : "text-gray-400 hover:text-gray-200 hover:bg-surface-raised"}
        `}
      >
        <span className="text-base shrink-0" aria-hidden>{item.icon}</span>
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-gray-500"
            >
              ▼
            </motion.span>
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && item.children && !isCollapsed && (
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

      {/* Collapsed mode: show children as a tooltip-style popover on hover */}
      {isCollapsed && isOpen && item.children && (
        <div className="pl-1 mt-1 space-y-0.5">
          {item.children.map((child) => {
            const childActive = child.href === pathname;
            return (
              <Link
                key={child.href}
                href={child.href!}
                onClick={onNavigate}
                title={child.label}
                className={`
                  flex items-center justify-center py-1.5 rounded text-sm transition-all duration-200
                  ${childActive
                    ? "bg-theme/10 text-theme"
                    : "text-gray-500 hover:text-gray-300 hover:bg-surface-raised"}
                `}
              >
                <span aria-hidden>{child.icon}</span>
              </Link>
            );
          })}
        </div>
      )}
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

const FOOTER_TEXT = {
  fr: { version: "BG3 Honor Companion v0.1", subtitle: "Mode Honneur \u2014 Aucun droit \u00e0 l\u2019erreur" },
  en: { version: "BG3 Honor Companion v0.1", subtitle: "Honour Mode \u2014 No margin for error" },
} as const;

function NavContent({
  onNavigate,
  isCollapsed = false,
}: {
  onNavigate?: () => void;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();
  const lang = extractLang(pathname);
  const navItems = prefixItems(NAV_BY_LANG[lang] ?? NAV_ITEMS_FR, lang);
  const footer = (lang === "en" ? FOOTER_TEXT.en : FOOTER_TEXT.fr);

  return (
    <>
      <div className={`space-y-1 ${isCollapsed ? "p-2" : "p-4"}`}>
        {!isCollapsed && (
          <div className="px-3 py-3 mb-2">
            <p className="text-[10px] font-data uppercase tracking-widest text-gray-500">
              Navigation
            </p>
          </div>
        )}

        {navItems.map((item) => (
          <NavGroup
            key={item.label}
            item={item}
            pathname={pathname}
            isCollapsed={isCollapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-border">
          <p className="text-[10px] font-data uppercase tracking-widest text-gray-500 mb-2 px-1">
            Smart Guide
          </p>
          <BuildSelector />
        </div>
      )}

      {!isCollapsed && (
        <div className="p-4 mt-auto border-t border-border">
          <p className="text-[10px] font-data text-gray-600 text-center">
            {footer.version}
          </p>
          <p className="text-[10px] font-data text-gray-600 text-center mt-0.5">
            {footer.subtitle}
          </p>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Sidebar (Desktop + Mobile)
// ---------------------------------------------------------------------------

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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

      {/* Desktop sidebar — Navigation Rail */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 border-r border-border bg-surface h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto overflow-x-hidden scrollbar-thin transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Toggle button */}
        <div className={`flex items-center border-b border-border/50 ${isCollapsed ? "justify-center p-2" : "justify-end px-3 py-2"}`}>
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </div>

        <NavContent isCollapsed={isCollapsed} />
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
