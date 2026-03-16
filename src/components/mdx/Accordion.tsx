"use client";

// ============================================================================
// Accordion — Collapsible section for optional quests / secondary content
// Usage: <Accordion title="Quête Optionnelle : Sauver le chat">children</Accordion>
// ============================================================================

import { useState, type ReactNode } from "react";

interface AccordionProps {
  readonly title: string;
  readonly children: ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-4 rounded-lg border border-border/50 bg-surface/60 backdrop-blur-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-raised/40 transition-colors duration-200"
      >
        {/* Chevron */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 shrink-0 text-gold/70 transition-transform duration-200 ${
            open ? "rotate-90" : "rotate-0"
          }`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="font-display text-sm text-gold/90 tracking-wide">
          {title}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-border/30">
          {children}
        </div>
      )}
    </div>
  );
}
