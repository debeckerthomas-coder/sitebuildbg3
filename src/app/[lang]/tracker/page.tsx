"use client";

// ============================================================================
// Smart Shopping List — Global loot tracker grouped by Act
// Reads party from usePartyStore, hydrates items via registry, deduplicates
// ============================================================================

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { usePartyStore } from "@/store/usePartyStore";
import { useTrackerStore } from "@/store/useTrackerStore";
import { getBuildWithItems, buildRegistry } from "@/data/registry";
import { Checkbox } from "@/components/ui-system";
import type { UnifiedItem } from "@/types/models";
import type { Act } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TrackedItem extends UnifiedItem {
  readonly claimedBy: readonly string[];
  readonly isCore: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getBuildTitle(buildId: string, lang: "fr" | "en"): string {
  const build = buildRegistry[buildId];
  return build ? build.title[lang] : buildId;
}

const ACT_HEADERS: Record<Act, { fr: string; en: string; icon: string }> = {
  1: { fr: "Acte 1 — Survie", en: "Act 1 — Survival", icon: "🏕️" },
  2: { fr: "Acte 2 — Les Terres Maudites", en: "Act 2 — Shadow-Cursed Lands", icon: "🌑" },
  3: { fr: "Acte 3 — Baldur's Gate", en: "Act 3 — Baldur's Gate", icon: "🏰" },
};

const RARITY_COLORS: Record<string, string> = {
  common: "text-gray-400 border-gray-600",
  uncommon: "text-green-400 border-green-700/40",
  rare: "text-blue-400 border-blue-700/40",
  very_rare: "text-purple-400 border-purple-700/40",
  legendary: "text-[#d4af37] border-[#d4af37]/40",
};

// ---------------------------------------------------------------------------
// Build the deduplicated shopping list
// ---------------------------------------------------------------------------

function buildShoppingList(partyIds: readonly (string | null)[]): Map<Act, TrackedItem[]> {
  const itemMap = new Map<string, TrackedItem>();

  for (const buildId of partyIds) {
    if (!buildId) continue;
    const hydrated = getBuildWithItems(buildId);
    if (!hydrated) continue;

    // Process core items
    for (const item of hydrated.coreItemsFull) {
      const existing = itemMap.get(item.id);
      if (existing) {
        itemMap.set(item.id, {
          ...existing,
          claimedBy: [...existing.claimedBy, buildId],
        });
      } else {
        itemMap.set(item.id, { ...item, claimedBy: [buildId], isCore: true });
      }
    }

    // Process alternative items
    for (const item of hydrated.alternativeItemsFull) {
      if (itemMap.has(item.id)) continue; // Don't overwrite core items
      itemMap.set(item.id, { ...item, claimedBy: [buildId], isCore: false });
    }
  }

  // Group by act
  const byAct = new Map<Act, TrackedItem[]>();
  for (const item of itemMap.values()) {
    const act = item.act ?? 1;
    const list = byAct.get(act) ?? [];
    list.push(item);
    byAct.set(act, list);
  }

  // Sort each act by rarity importance
  const rarityOrder = ["legendary", "very_rare", "rare", "uncommon", "common"];
  for (const list of byAct.values()) {
    list.sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
  }

  return byAct;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TrackerPage() {
  const { lang: rawLang } = useParams<{ lang: string }>();
  const lang = rawLang === "en" ? "en" : "fr";

  const party = usePartyStore((s) => s.party);
  const collected = useTrackerStore((s) => s.collected);
  const toggleItem = useTrackerStore((s) => s.toggleItem);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasParty = party.some(Boolean);

  const shoppingList = useMemo(
    () => buildShoppingList(party),
    [party],
  );

  const totalItems = useMemo(() => {
    let count = 0;
    for (const items of shoppingList.values()) count += items.length;
    return count;
  }, [shoppingList]);

  const collectedCount = useMemo(() => {
    let count = 0;
    for (const items of shoppingList.values()) {
      for (const item of items) {
        if (collected[item.id]) count++;
      }
    }
    return count;
  }, [shoppingList, collected]);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-3xl md:text-4xl text-gradient-gold uppercase tracking-wide">
          {lang === "fr" ? "📜 Liste de Courses" : "📜 Loot Tracker"}
        </h1>
        <p className="text-sm font-body text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed">
          {lang === "fr"
            ? "Tous les objets nécessaires pour votre groupe, organisés par Acte. Cochez au fur et à mesure de votre aventure."
            : "All items needed for your party, organized by Act. Check them off as you progress through your adventure."}
        </p>
        <div className="mx-auto mt-4 w-32 h-px bg-gradient-to-r from-transparent via-theme/50 to-transparent" />
      </div>

      {/* Empty state */}
      {!hasParty && (
        <div className="bg-[#1c2133]/50 border border-[#d4af37]/20 rounded-xl p-8 text-center space-y-4">
          <span className="text-4xl block" aria-hidden>🔮</span>
          <p className="text-sm font-body text-gray-300">
            {lang === "fr"
              ? "Aucune équipe configurée. Commencez par composer votre groupe dans le Planificateur."
              : "No party configured. Start by building your party in the Planner."}
          </p>
          <Link
            href={`/${lang}/planner`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-data font-bold
                       bg-[#111520] border-2 border-[#d4af37]/50 text-[#d4af37]
                       hover:border-[#d4af37] hover:bg-[#d4af37]/10
                       transition-all duration-200"
          >
            {lang === "fr" ? "Ouvrir le Planificateur" : "Open Party Planner"}
          </Link>
        </div>
      )}

      {/* Progress bar */}
      {hasParty && totalItems > 0 && (
        <div className="bg-[#111520]/60 border border-gray-700/40 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-data text-gray-400">
              {lang === "fr" ? "Progression globale" : "Overall progress"}
            </span>
            <span className="text-xs font-data font-bold text-[#d4af37]">
              {mounted ? collectedCount : 0} / {totalItems}
            </span>
          </div>
          <div className="h-2 rounded-full bg-[#1c2133] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#fbbf24] transition-all duration-500"
              style={{ width: mounted ? `${(collectedCount / totalItems) * 100}%` : "0%" }}
            />
          </div>
        </div>
      )}

      {/* Shopping list by Act */}
      {hasParty && ([1, 2, 3] as Act[]).map((act) => {
        const items = shoppingList.get(act);
        if (!items || items.length === 0) return null;

        const actInfo = ACT_HEADERS[act];

        return (
          <section key={act} className="space-y-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl" aria-hidden>{actInfo.icon}</span>
              <h2 className="font-heading text-xl text-gradient-gold uppercase tracking-wide">
                {actInfo[lang]}
              </h2>
              <span className="text-xs font-data text-gray-500 ml-auto">
                {items.filter((i) => mounted && collected[i.id]).length}/{items.length}
              </span>
            </div>

            <div className="space-y-2">
              {items.map((item) => {
                const isCollected = mounted && !!collected[item.id];
                const rarityClass = RARITY_COLORS[item.rarity] ?? "text-gray-400 border-gray-600";

                return (
                  <div
                    key={item.id}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
                      ${isCollected
                        ? "bg-[#111520]/40 border-gray-800/40 opacity-60"
                        : "bg-[#111520]/60 border-gray-700/40 hover:border-[#d4af37]/30"}
                    `}
                  >
                    <Checkbox
                      checked={isCollected}
                      onCheckedChange={() => toggleItem(item.id)}
                      strikethrough={false}
                    />

                    {/* Icon */}
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-md border border-gray-700 object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-md border border-gray-700 bg-[#1c2133] flex items-center justify-center shrink-0">
                        <span className="text-sm">⚔️</span>
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-data font-bold ${isCollected ? "text-gray-500 line-through" : rarityClass.split(" ")[0]}`}>
                          {item.name}
                        </span>
                        {!item.isCore && (
                          <span className="text-[9px] font-data uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#1c2133] border border-gray-700 text-gray-500">
                            Alt
                          </span>
                        )}
                        {item.claimedBy.length > 1 && (
                          <span className="text-[9px] font-data uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#8b0000]/10 border border-[#8b0000]/30 text-[#c43c3c]">
                            {lang === "fr" ? "Conflit" : "Conflict"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {item.acquisition || (lang === "fr" ? "Localisation inconnue" : "Unknown location")}
                      </p>
                      {item.claimedBy.length > 0 && (
                        <p className="text-[10px] text-gray-600 mt-0.5">
                          {item.claimedBy.map((id) => getBuildTitle(id, lang)).join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
