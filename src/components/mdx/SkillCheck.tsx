"use client";

// ============================================================================
// SkillCheck — Inline badge showing a D&D skill check (e.g. Persuasion DD 15)
// Hovering reveals a spinning D20 SVG icon
// ============================================================================

import { useState } from "react";

// Inline D20 SVG (icosahedron silhouette)
function D20Icon() {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      stroke="#d4af37"
      strokeWidth="2.5"
      className="w-6 h-6 animate-roll-dice drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]"
    >
      <polygon points="50,5 95,30 80,95 20,95 5,30" />
      <polygon points="50,5 5,30 50,55 95,30" />
      <line x1="50" y1="55" x2="20" y2="95" />
      <line x1="50" y1="55" x2="80" y2="95" />
      <line x1="5" y1="30" x2="20" y2="95" />
      <line x1="95" y1="30" x2="80" y2="95" />
      <text
        x="50"
        y="82"
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontSize="24"
        fill="#d4af37"
        stroke="none"
      >
        20
      </text>
    </svg>
  );
}

export function SkillCheck({
  skill,
  dc,
}: {
  skill: string;
  dc: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline-flex items-center gap-1.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* D20 icon — appears on hover */}
      {hovered && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-50">
          <D20Icon />
        </span>
      )}

      {/* Badge */}
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md
                   bg-[#1a1f2e] border border-amber-400/30
                   text-xs font-data font-bold tracking-wide
                   text-amber-400 transition-all duration-200
                   hover:border-amber-400/60 hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
        tabIndex={0}
        role="note"
        aria-label={`Jet de ${skill}, Degré de Difficulté ${dc}`}
      >
        <span className="text-gray-400">[</span>
        <span className="text-amber-300">{skill}</span>
        <span className="text-gray-500">DD</span>
        <span className="text-amber-400">{dc}</span>
        <span className="text-gray-400">]</span>
      </span>
    </span>
  );
}
