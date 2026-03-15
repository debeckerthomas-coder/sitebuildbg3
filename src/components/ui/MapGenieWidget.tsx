"use client";

// ============================================================================
// MapGenieWidget — Floating Action Button + Slide-over with MapGenie iframe
// Scoped to walkthrough pages for contextual map access.
// ============================================================================

import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const MAP_BY_ACT: Record<string, { url: string; label: string }> = {
  "acte-1": { url: "https://mapgenie.io/baldurs-gate-3/maps/wilderness", label: "Wilderness — Acte 1" },
  "acte-2": { url: "https://mapgenie.io/baldurs-gate-3/maps/shadow-cursed-lands", label: "Terres Maudites — Acte 2" },
  "acte-3": { url: "https://mapgenie.io/baldurs-gate-3/maps/baldurs-gate", label: "Porte de Baldur — Acte 3" },
};

const DEFAULT_MAP = { url: "https://mapgenie.io/baldurs-gate-3/maps/faerun", label: "Faerûn" };

function useCurrentMap(): { url: string; label: string } {
  const pathname = usePathname();
  for (const [key, map] of Object.entries(MAP_BY_ACT)) {
    if (pathname.includes(key)) return map;
  }
  return DEFAULT_MAP;
}

export function MapGenieWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const currentMap = useCurrentMap();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* FAB — Floating Action Button                                      */}
      {/* ----------------------------------------------------------------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={open}
            className="fixed bottom-8 right-8 z-50
                       flex items-center gap-2.5 px-5 py-3
                       bg-[#111520] border border-gold/30 rounded-full
                       text-gold text-sm font-display
                       shadow-lg shadow-black/40
                       hover:border-gold/60 hover:shadow-[0_0_24px_rgba(212,175,55,0.2)]
                       hover:-translate-y-0.5
                       active:translate-y-0
                       transition-all duration-200
                       group"
            aria-label="Ouvrir la carte MapGenie"
          >
            {/* Map icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-gold group-hover:text-yellow-300 transition-colors"
            >
              <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
              <path d="M8 2v16" />
              <path d="M16 6v16" />
            </svg>
            <span className="hidden sm:inline">Carte Interactive</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------------------- */}
      {/* Slide-over Panel                                                  */}
      {/* ----------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-3/4 lg:w-2/3
                         bg-[#0a0c13] border-l border-gold/30
                         z-[70] shadow-2xl
                         flex flex-col"
            >
              {/* Header bar */}
              <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-gold/20 bg-[#111520]">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-gold"
                  >
                    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
                    <path d="M8 2v16" />
                    <path d="M16 6v16" />
                  </svg>
                  <h2 className="font-display text-sm text-gold">
                    {currentMap.label} — MapGenie
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {/* External link */}
                  <a
                    href={currentMap.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-data text-gray-500 hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Nouvel onglet
                  </a>

                  {/* Close button */}
                  <button
                    onClick={close}
                    className="flex items-center justify-center w-8 h-8 rounded-lg
                               border border-border/50 text-gray-500
                               hover:text-gold hover:border-gold/40
                               transition-colors"
                    aria-label="Fermer la carte"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Iframe container */}
              <div className="flex-1 relative">
                <iframe
                  src={currentMap.url}
                  title="MapGenie — Baldur's Gate 3"
                  className="w-full h-full border-0"
                  allow="fullscreen"
                  loading="lazy"
                />

                {/* Fallback overlay for blocked iframes */}
                <noscript>
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0a0c13] text-center p-8">
                    <div className="space-y-3">
                      <p className="font-display text-gold">Carte non disponible</p>
                      <a
                        href={currentMap.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 underline"
                      >
                        Ouvrir MapGenie dans un nouvel onglet
                      </a>
                    </div>
                  </div>
                </noscript>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
