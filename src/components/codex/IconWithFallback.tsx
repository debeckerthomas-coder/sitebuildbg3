"use client";

// ============================================================================
// IconWithFallback — Displays an icon with rarity gradient fallback on error
// ============================================================================

import { useState } from "react";
import type { Rarity } from "@/types";
import { getRarityFallbackStyle } from "@/lib/icons";

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
  size = 40,
}: IconWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const fallbackStyle = getRarityFallbackStyle(rarity);
    return (
      <div
        className={`rounded ${className}`}
        style={{ ...fallbackStyle, width: size, height: size }}
        role="img"
        aria-label={alt}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
