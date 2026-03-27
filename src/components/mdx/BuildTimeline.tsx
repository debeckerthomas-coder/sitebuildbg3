"use client";

// ============================================================================
// BuildTimeline — Timeline visuelle des Power Spikes d'un build (pour MDX)
// ============================================================================

import { getBuildWithItems } from "@/data/registry";

interface BuildTimelineProps {
  readonly buildId: string;
  readonly lang?: string;
}

export function BuildTimeline({ buildId, lang = "fr" }: BuildTimelineProps) {
  const build = getBuildWithItems(buildId);
  if (!build || !build.powerSpikes || build.powerSpikes.length === 0) return null;

  const l = lang === "en" ? "en" : "fr";

  return (
    <div className="my-6">
      <h3 className="text-lg font-bold text-gray-100 mb-2">
        {l === "fr"
          ? "📈 Progression & Power Spikes"
          : "📈 Progression & Power Spikes"}
      </h3>

      <div className="border-l-2 border-gray-700 ml-3 md:ml-4 space-y-6 relative mt-6 mb-8">
        {build.powerSpikes.map((spike) => (
          <div key={spike.level} className="relative pl-6">
            {/* Dot lumineux sur la ligne */}
            <div className="absolute -left-[0.5625rem] top-1 w-4 h-4 rounded-full bg-[#fbbf24] border-4 border-[#0b0f19] shadow-[0_0_10px_rgba(251,191,36,0.5)]" />

            {/* Badge niveau */}
            <span className="inline-block text-xs font-bold px-2 py-0.5 rounded bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/30 mb-1">
              {l === "fr" ? `Niveau ${spike.level}` : `Level ${spike.level}`}
            </span>

            {/* Description */}
            <p className="text-sm leading-relaxed text-gray-300">
              {spike.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
