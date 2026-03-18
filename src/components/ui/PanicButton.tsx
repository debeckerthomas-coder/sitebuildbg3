"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Survival rules data
// ---------------------------------------------------------------------------

const RULES = [
  {
    icon: "🏃",
    title: "Règle 1 — La Fuite",
    body: "Il suffit d'UN SEUL personnage en vie au campement pour ressusciter tout le monde via Flétrissure. Gardez toujours une Potion d'Invisibilité sur votre personnage le plus mobile.",
  },
  {
    icon: "💀",
    title: "Règle 2 — L'Escamotage",
    body: "Si un personnage est à terre (Death Saves), laissez-le mourir ! Vous ne pouvez pas fuir le combat si un allié est inconscient dans la zone.",
  },
  {
    icon: "⛔",
    title: "Règle 3 — Zones de Non-Retour",
    body: "Attention, vous NE POUVEZ PAS fuir ces combats : Ketheric/Myrkul, L'Inquisiteur Ch'r'ai W'wargaz (Crèche), Le Cerveau Infernal. Combattez jusqu'à la mort.",
  },
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PanicButton() {
  const [open, setOpen] = useState(false);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    },
    [open],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Protocole d'urgence Mode Honneur"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center
                   rounded-full bg-gradient-to-br from-blood to-blood-dark
                   border-2 border-blood-light/30 shadow-lg shadow-blood/30
                   hover:shadow-xl hover:shadow-blood/40 hover:scale-105
                   transition-shadow duration-300 cursor-pointer"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-2xl" aria-hidden>
          🚨
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Protocole d'urgence Mode Honneur"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-lg bg-[#111520] border-2 border-blood/40
                           rounded-xl shadow-2xl shadow-blood/10 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-blood/10 border-b border-blood/30 px-6 py-5">
                  <h2 className="font-heading text-xl text-blood-light uppercase tracking-wide flex items-center gap-2">
                    <span aria-hidden>⚠️</span>
                    Protocole d&apos;Urgence
                  </h2>
                  <p className="text-xs font-data text-blood-light/60 mt-1 uppercase tracking-wider">
                    Mode Honneur — Procédures de Survie
                  </p>
                </div>

                {/* Rules */}
                <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
                  {RULES.map((rule) => (
                    <div key={rule.title} className="flex items-start gap-3">
                      <span className="text-xl mt-0.5 shrink-0" aria-hidden>
                        {rule.icon}
                      </span>
                      <div>
                        <h3 className="font-heading text-sm text-theme uppercase tracking-wide">
                          {rule.title}
                        </h3>
                        <p className="text-sm font-body text-gray-300 mt-1.5 leading-relaxed">
                          {rule.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-blood/20 px-6 py-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-xs font-data uppercase tracking-wider px-5 py-2.5 rounded-lg
                               border border-blood/30 text-blood-light/80
                               hover:bg-blood/10 hover:text-blood-light
                               transition-colors cursor-pointer"
                  >
                    Compris, Soldat
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
