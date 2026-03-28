"use client";

// ============================================================================
// BuildTimeline — Timeline visuelle des Power Spikes d'un build (pour MDX)
// ============================================================================

import { getBuildWithItems } from "@/data/registry";
import { Badge } from "@/components/ui-system";

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
            <div className="absolute -left-[0.5625rem] top-1 w-4 h-4 rounded-full bg-gold border-4 border-abyss shadow-[0_0_10px_rgba(212,175,55,0.5)]" />

            {/* Badge niveau */}
            <Badge className="bg-gold/15 text-gold border-gold/30 mb-1">
              {l === "fr" ? `Niveau ${spike.level}` : `Level ${spike.level}`}
            </Badge>

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
