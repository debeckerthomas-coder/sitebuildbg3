"use client";

// ============================================================================
// BossTacticMedia — Autoplay video with IntersectionObserver + dark frame
// Usage: <BossTacticMedia src="/assets/videos/tactic.webm" />
// ============================================================================

import { useRef, useEffect, useState } from "react";

interface BossTacticMediaProps {
  /** Video source URL */
  readonly src: string;
  /** Optional poster image */
  readonly poster?: string;
  /** Optional caption */
  readonly caption?: string;
  /** Loop the video (default: true) */
  readonly loop?: boolean;
}

export function BossTacticMedia({
  src,
  poster,
  caption,
  loop = true,
}: BossTacticMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.3 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {
        // Autoplay blocked — silent fail, user can click to play
      });
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className="my-6">
      {/* Dark fantasy frame */}
      <div className="relative rounded-card overflow-hidden border-2 border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
        {/* Corner ornaments */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-card z-10" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-card z-10" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-card z-10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-card z-10" />

        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent z-10" />

        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop={loop}
          muted
          playsInline
          preload="metadata"
          className="w-full h-auto block bg-abyss"
          aria-label={caption ?? "Vidéo tactique"}
        />

        {/* Bottom vignette overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-abyss/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Caption */}
      {caption && (
        <p className="mt-2 text-center text-xs font-data text-gray-500 italic">
          {caption}
        </p>
      )}
    </div>
  );
}
