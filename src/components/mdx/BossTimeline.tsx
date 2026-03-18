"use client";

// ============================================================================
// BossTimeline — Vertical tactical timeline for boss encounters
// Shows turn-by-turn combat breakdowns with a glowing red timeline
// ============================================================================

import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Turn — Single turn marker along the timeline
// ---------------------------------------------------------------------------

export function Turn({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {/* Marker on the timeline */}
      <div
        className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-red-900
                    border-2 border-[#111520] flex items-center justify-center
                    text-xs font-bold text-white
                    shadow-[0_0_10px_rgba(220,38,38,0.5)]"
      >
        {number}
      </div>

      {/* Content */}
      <h4 className="text-base font-heading text-white/90 mb-2">
        Tour {number} — {title}
      </h4>
      <div
        className="text-sm text-gray-300 leading-relaxed font-body
                    prose prose-invert prose-sm max-w-none
                    prose-strong:text-theme prose-em:text-gray-200
                    prose-p:text-gray-300"
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BossTimeline — Parent container with vertical red timeline
// ---------------------------------------------------------------------------

export function BossTimeline({ children }: { children: ReactNode }) {
  return (
    <div
      className="border-l-2 border-red-900/50 pl-6 ml-4 space-y-8 my-8
                  not-prose"
    >
      {children}
    </div>
  );
}
