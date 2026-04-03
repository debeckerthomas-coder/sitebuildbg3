// ============================================================================
// Dynamic Build Page — /builds/[id]
// Renders Tier S build data + optional MDX deep-dive content
// ============================================================================

import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBuildTierS, BUILDS_TIER_S } from "@/data/builds/tier-s";
import { getBuildMDX } from "@/lib/builds-mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import type { Metadata } from "next";
import type { Locale } from "@/dictionaries";
import NewsletterCTA from "@/components/ui/NewsletterCTA";

// ---------------------------------------------------------------------------
// Map build ID → MDX slug (filename without .mdx)
// ---------------------------------------------------------------------------

const BUILD_MDX_SLUGS: Record<string, string> = {
  moine_bagarreur: "moine-bagarreur",
  barde_controleur: "barde-controleur",
  throwzerker: "throwzerker",
  clerc_irradiation: "clerc-orbes",
  nuke_tempete: "nuke-tempete",
  bardadin: "bardadin",
  sorcadin: "sorcadin",
  fire_sorlock: "fire-sorlock",
  gloom_assassin: "gloom-assassin",
  lockadin: "lockadin",
};

// ---------------------------------------------------------------------------
// i18n labels
// ---------------------------------------------------------------------------

const PAGE_TEXT = {
  fr: {
    notFound: "Build introuvable",
    role: "Rôle",
    keyMechanic: "Mécanique Clé",
    stats: "Caractéristiques",
    feats: "Progression des Dons",
    bis: "Équipement Best-in-Slot",
    act1: "Acte 1",
    act2: "Acte 2",
    act3: "Acte 3",
    failsafes: "Plans de Secours (Failsafes)",
    planB: "Plan B — Failsafe",
    missedItem: "Objet manqué",
    replaceWith: "Remplacer par",
    deepDive: "Guide Approfondi",
  },
  en: {
    notFound: "Build not found",
    role: "Role",
    keyMechanic: "Key Mechanic",
    stats: "Ability Scores",
    feats: "Feat Progression",
    bis: "Best-in-Slot Gear",
    act1: "Act 1",
    act2: "Act 2",
    act3: "Act 3",
    failsafes: "Backup Plans (Failsafes)",
    planB: "Plan B — Failsafe",
    missedItem: "Missed item",
    replaceWith: "Replace with",
    deepDive: "Deep Dive Guide",
  },
} as const;

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return BUILDS_TIER_S.map((b) => ({ id: b.id }));
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, lang } = await params;
  const build = getBuildTierS(id, lang);
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;
  if (!build) return { title: t.notFound };

  const title = `Build ${build.name} — Baldur's Gate 3 (${lang === "en" ? "Honour Mode" : "Mode Honneur"}) | BG3 Honor Companion`;
  const description = lang === "en"
    ? `Discover the best ${build.name} build (${build.classes}) for BG3 Honour Mode. ${build.coreRole}. Stats, gear, spells and full strategy.`
    : `Découvrez le meilleur build ${build.name} (${build.classes}) pour le Mode Honneur de BG3. ${build.coreRole}. Stats, équipement, sorts et stratégie complète.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

// ---------------------------------------------------------------------------
// Stat Badge
// ---------------------------------------------------------------------------

const STAT_COLORS: Record<string, string> = {
  STR: "text-red-400 border-red-500/30 bg-red-500/5",
  DEX: "text-green-400 border-green-500/30 bg-green-500/5",
  CON: "text-orange-400 border-orange-500/30 bg-orange-500/5",
  INT: "text-blue-400 border-blue-500/30 bg-blue-500/5",
  WIS: "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
  CHA: "text-purple-400 border-purple-500/30 bg-purple-500/5",
};

function StatBadge({ stat, value }: { stat: string; value: number }) {
  const colors = STAT_COLORS[stat] ?? "text-gray-400 border-border bg-surface-raised";
  return (
    <div className={`rounded-card border p-3 text-center ${colors}`}>
      <p className="text-[10px] font-data uppercase tracking-widest opacity-70">{stat}</p>
      <p className="text-2xl font-display mt-0.5">{value}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function BuildPage({ params }: PageProps) {
  const { id, lang } = await params;
  const build = getBuildTierS(id, lang);
  if (!build) notFound();
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;

  // Load optional MDX deep-dive (locale-aware)
  const mdxSlug = BUILD_MDX_SLUGS[id];
  const mdxData = mdxSlug ? getBuildMDX(mdxSlug, lang) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: build.name,
    description: lang === "en"
      ? `Discover the best ${build.name} build (${build.classes}) for BG3 Honour Mode. ${build.coreRole}. Stats, gear, spells and full strategy.`
      : `Découvrez le meilleur build ${build.name} (${build.classes}) pour le Mode Honneur de BG3. ${build.coreRole}. Stats, équipement, sorts et stratégie complète.`,
    author: { "@type": "Organization", name: "BG3 Honor Companion" },
    about: { "@type": "VideoGame", name: "Baldur's Gate 3" },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ────────────────────────────────────────────────── */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="font-display text-3xl sm:text-4xl text-gold leading-tight">
            {build.name}
          </h1>
          <span className="text-xs font-data font-bold px-2.5 py-1 rounded border bg-gold/20 text-gold border-gold/40">
            Tier S
          </span>
        </div>

        <p className="font-display text-sm text-gold-muted">{build.classes}</p>

        {/* Role + Key Mechanic pills */}
        <div className="flex flex-wrap gap-3 pt-1">
          <div className="bg-surface-raised rounded-card border border-border px-4 py-2.5">
            <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider mb-0.5">{t.role}</p>
            <p className="text-sm font-data text-gray-200">{build.coreRole}</p>
          </div>
        </div>

        {/* Key Mechanic */}
        <div className="bg-surface-raised rounded-card border border-gold/20 p-5">
          <p className="text-[10px] font-data text-gold uppercase tracking-wider mb-2">{t.keyMechanic}</p>
          <p className="text-sm font-body text-gray-300 leading-relaxed">{build.keyMechanic}</p>
        </div>
      </header>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">
          {t.stats}
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {(Object.entries(build.stats) as [string, number][]).map(([stat, val]) => (
            <StatBadge key={stat} stat={stat} value={val} />
          ))}
        </div>
      </section>

      {/* ── Feat Progression ──────────────────────────────────────── */}
      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">
          {t.feats}
        </h2>
        <div className="space-y-3">
          {build.featProgression.map((feat) => (
            <div
              key={feat.level}
              className="bg-surface-raised rounded-card border border-border p-4 flex items-start gap-4"
            >
              <span className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-sm font-display text-gold shrink-0">
                {feat.level}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-display text-gold-light">{feat.feat}</p>
                <p className="text-xs font-body text-gray-400 mt-1 leading-relaxed">{feat.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Équipement par Acte ────────────────────────────────────── */}
      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">
          {t.bis}
        </h2>
        <div className="space-y-4">
          {(["act1", "act2", "act3"] as const).map((act) => (
            <div key={act}>
              <h3 className="font-display text-sm text-gold-muted mb-2 uppercase tracking-wider">
                {act === "act1" ? t.act1 : act === "act2" ? t.act2 : t.act3}
              </h3>
              <div className="bg-surface-raised rounded-card border border-border p-4">
                <ul className="space-y-1.5">
                  {build.bestInSlot[act].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-data text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Failsafes ─────────────────────────────────────────────── */}
      {build.failsafes.length > 0 && (
        <section>
          <h2 className="font-display text-xl text-blood-light mb-4 border-b border-blood/30 pb-2">
            {t.failsafes}
          </h2>
          <div className="space-y-3">
            {build.failsafes.map((fs, i) => (
              <div
                key={i}
                className="rounded-card border border-gold-dark/40 bg-gradient-to-br from-surface-raised to-abyss overflow-hidden"
              >
                <div className="px-4 py-2 bg-gold-dark/10 border-b border-gold-dark/20 flex items-center gap-2">
                  <span className="text-sm">🔄</span>
                  <p className="text-[10px] font-data text-gold uppercase tracking-wider font-semibold">
                    {t.planB}
                  </p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-blood/20 flex items-center justify-center">
                      <span className="text-[10px] text-blood-light">✗</span>
                    </span>
                    <div>
                      <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">{t.missedItem}</p>
                      <p className="text-xs font-display text-blood-light">{fs.missingItem}</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-gray-600 text-xs">↓</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-gold/20 flex items-center justify-center">
                      <span className="text-[10px] text-gold">✓</span>
                    </span>
                    <div>
                      <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">{t.replaceWith}</p>
                      <p className="text-xs font-display text-gold-light">{fs.fallbackItem}</p>
                    </div>
                  </div>
                  <p className="text-[10px] font-data text-gray-600 italic pt-1 border-t border-border/30">
                    {fs.condition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Deep Dive MDX Zone ────────────────────────────────────── */}
      {mdxData && (
        <section className="pt-4">
          <div className="border-t-2 border-gold/20 pt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full bg-gold" />
              <h2 className="font-display text-2xl text-gold">
                {t.deepDive}
              </h2>
            </div>
            <article className="prose prose-invert prose-gold max-w-none
              prose-headings:font-display prose-headings:text-gold
              prose-p:font-body prose-p:text-gray-300 prose-p:leading-relaxed
              prose-strong:text-gold-light
              prose-blockquote:border-gold/30 prose-blockquote:bg-surface-raised
              prose-blockquote:rounded-card prose-blockquote:py-3 prose-blockquote:px-4
              prose-blockquote:not-italic prose-blockquote:text-gray-400
            ">
              <MDXRemote
                source={mdxData.source}
                components={mdxComponents}
              />
            </article>
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ──────────────────────────────────────── */}
      <NewsletterCTA />
    </div>
  );
}
