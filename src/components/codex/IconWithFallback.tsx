"use client";

// ============================================================================
// IconWithFallback — Displays an icon with rarity-colored border.
// On error (404), shows a styled inline SVG placeholder (never a broken image).
// ============================================================================

import { useState } from "react";
import Image from "next/image";
import type { Rarity } from "@/types";

// Rarity → solid border color for the icon wrapper
const RARITY_BORDER: Record<Rarity, string> = {
  common: "border-[#9d9d9d]",
  uncommon: "border-[#3fbf3f]",
  rare: "border-[#4d94ff]",
  very_rare: "border-[#b366ff]",
  legendary: "border-[#ff8c00]",
};

interface IconWithFallbackProps {
  readonly src: string;
  readonly alt: string;
  readonly rarity: Rarity;
  readonly className?: string;
  readonly size?: number;
}

/** Styled inline fallback — crossed swords icon in gold */
function FallbackPlaceholder({ size, alt }: { size: number; alt: string }) {
  return (
    <div
      className="flex items-center justify-center bg-[#171b29] w-full h-full"
      role="img"
      aria-label={alt}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        style={{ width: size * 0.55, height: size * 0.55 }}
      >
        {/* Crossed swords */}
        <path
          d="M12 6L36 42M36 6L12 42"
          stroke="#d4af37"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Sword guards */}
        <path
          d="M8 14h8M32 14h8M8 34h8M32 34h8"
          stroke="#d4af37"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Center diamond */}
        <path
          d="M24 18L30 24L24 30L18 24Z"
          stroke="#d4af37"
          strokeWidth="1.5"
          fill="#d4af37"
          fillOpacity="0.15"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

export function IconWithFallback({
  src,
  alt,
  rarity,
  className = "",
  size = 48,
}: IconWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const borderClass = RARITY_BORDER[rarity];

  if (hasError || !src) {
    return (
      <div
        className={`rounded-md border-2 ${borderClass} shrink-0 overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        <FallbackPlaceholder size={size} alt={alt} />
      </div>
    );
  }

  return (
    <div
      className={`rounded-md border-2 ${borderClass} bg-abyss-100 shrink-0 overflow-hidden flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain"
        unoptimized={false}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
