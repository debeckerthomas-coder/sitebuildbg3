"use client";

// ============================================================================
// IconWithFallback — Displays an icon with rarity-colored border.
// On error (404), shows a gradient fallback with the item's initial.
// Uses next/image for automatic caching & optimization of bg3.wiki icons.
// ============================================================================

import { useState } from "react";
import Image from "next/image";
import type { Rarity } from "@/types";
import { getRarityFallbackStyle } from "@/lib/icons";

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
    const fallbackStyle = getRarityFallbackStyle(rarity);
    return (
      <div
        className={`rounded-md border-2 ${borderClass} shrink-0 ${className}`}
        style={{ ...fallbackStyle, width: size, height: size }}
        role="img"
        aria-label={alt}
      >
        {alt.charAt(0).toUpperCase()}
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
