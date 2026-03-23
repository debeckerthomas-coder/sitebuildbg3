import Link from "next/link";
import { getDictionary, type Locale } from "@/dictionaries";

// ============================================================================
// Landing Page — Hero Header + Feature Showcase
// ============================================================================

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FEATURES_FR: Feature[] = [
  { icon: "📋", title: "Checklists Interactives", description: "Suivez votre progression étape par étape à travers les 3 Actes. Chaque checkpoint est sauvegardé localement — reprenez où vous en étiez." },
  { icon: "💎", title: "Tooltips Dynamiques", description: "Survolez n'importe quel objet, sort ou capacité pour afficher ses statistiques complètes. Plus de 40 entrées de Codex référencées." },
  { icon: "🎲", title: "Simulateur de Dés", description: "Calculez vos probabilités de réussite avant chaque jet critique. Simulez des centaines de lancers pour optimiser vos décisions." },
  { icon: "🛡️", title: "Failsafe Chains", description: "Raté un objet clé ? Chaque item critique a un Plan B documenté. Les chaînes de failsafe garantissent qu'aucun oubli ne ruine votre run." },
  { icon: "💀", title: "Matrices d'Urgence Boss", description: "Chaque boss majeur décomposé phase par phase. Mécaniques Mode Honneur exclusives, contre-stratégies, et pièges mortels identifiés." },
  { icon: "⚔️", title: "9 Builds Tier S", description: "Du Lockadin au Throwzerker, chaque build est optimisé pour le Mode Honneur avec progression niveau par niveau et équipement BiS." },
];

const FEATURES_EN: Feature[] = [
  { icon: "📋", title: "Interactive Checklists", description: "Track your progress step by step across all 3 Acts. Every checkpoint is saved locally — pick up right where you left off." },
  { icon: "💎", title: "Dynamic Tooltips", description: "Hover over any item, spell or ability to see its full stats. Over 40 Codex entries referenced throughout." },
  { icon: "🎲", title: "Dice Simulator", description: "Calculate your odds before every critical roll. Simulate hundreds of throws to optimize your decisions." },
  { icon: "🛡️", title: "Failsafe Chains", description: "Missed a key item? Every critical piece of gear has a documented Plan B. Failsafe chains ensure no oversight ruins your run." },
  { icon: "💀", title: "Boss Emergency Matrices", description: "Every major boss broken down phase by phase. Honour Mode exclusive mechanics, counter-strategies, and lethal traps identified." },
  { icon: "⚔️", title: "9 Tier S Builds", description: "From the Lockadin to the Throwzerker, every build is optimized for Honour Mode with level-by-level progression and BiS gear." },
];

const PAGE_TEXT = {
  fr: {
    heroSub: 'Le guide ultime pour survivre au <span class="text-gold-light font-semibold">Mode Honneur</span> de Baldur\'s Gate 3. Une seule sauvegarde. Aucun droit à l\'erreur. Chaque décision compte.',
    ctaBuilds: "Découvrir les Builds Tier S",
    ctaWalkthrough: "Lancer le Walkthrough",
    stats: [{ value: "3", label: "Actes Couverts" }, { value: "9", label: "Builds Optimisés" }, { value: "40+", label: "Entrées Codex" }, { value: "0", label: "Droit à l'Erreur" }],
    featuresTitle: "Tout Ce Dont Vous Avez Besoin",
    featuresSub: "Chaque outil a été conçu pour éliminer l'incertitude du Mode Honneur.",
    bottomTitle: "Prêt à commencer votre run ?",
    bottomSub: "Choisissez votre build, suivez le walkthrough, et que les dés soient en votre faveur.",
    ctaCodex: "Explorer le Codex",
    ctaDice: "Simulateur de Dés",
    features: FEATURES_FR,
  },
  en: {
    heroSub: 'The ultimate guide to surviving <span class="text-gold-light font-semibold">Honour Mode</span> in Baldur\'s Gate 3. One save file. No margin for error. Every decision matters.',
    ctaBuilds: "Discover Tier S Builds",
    ctaWalkthrough: "Start the Walkthrough",
    stats: [{ value: "3", label: "Acts Covered" }, { value: "9", label: "Optimized Builds" }, { value: "40+", label: "Codex Entries" }, { value: "0", label: "Margin for Error" }],
    featuresTitle: "Everything You Need",
    featuresSub: "Every tool is designed to eliminate uncertainty from Honour Mode.",
    bottomTitle: "Ready to start your run?",
    bottomSub: "Pick your build, follow the walkthrough, and may the dice be ever in your favour.",
    ctaCodex: "Explore the Codex",
    ctaDice: "Dice Simulator",
    features: FEATURES_EN,
  },
} as const;

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;
  const prefix = `/${lang}`;

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* ---- Hero Section ---- */}
      <section className="pt-16 pb-20 text-center">
        <div className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-10" />

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gold tracking-wide leading-tight">
          BG3 Honor Companion
        </h1>

        <p
          className="mt-6 font-body text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t.heroSub }}
        />

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`${prefix}/builds`}
            className="
              inline-flex items-center gap-2 px-8 py-3.5
              bg-gradient-to-r from-gold to-gold-dark
              text-abyss font-display text-sm font-semibold tracking-wide
              rounded-card
              shadow-[0_0_20px_rgba(212,175,55,0.3)]
              hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
              hover:brightness-110
              transition-all duration-200
            "
          >
            {t.ctaBuilds}
          </Link>

          <Link
            href={`${prefix}/walkthrough/acte-1`}
            className="
              inline-flex items-center gap-2 px-8 py-3.5
              border-2 border-gold/40
              text-gold font-display text-sm font-semibold tracking-wide
              rounded-card
              hover:border-gold/70 hover:bg-gold/5
              transition-all duration-200
            "
          >
            {t.ctaWalkthrough}
          </Link>
        </div>

        <div className="mx-auto w-48 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-16" />
      </section>

      {/* ---- Stats bar ---- */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-16">
        {t.stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center py-4 rounded-card border border-border bg-surface-raised"
          >
            <p className="font-display text-2xl text-gold">{stat.value}</p>
            <p className="text-[11px] font-data text-gray-500 mt-1 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* ---- Features Grid ---- */}
      <section className="pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl text-gold">
            {t.featuresTitle}
          </h2>
          <p className="mt-3 font-body text-sm text-gray-500 max-w-lg mx-auto">
            {t.featuresSub}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.map((feature) => (
            <div
              key={feature.title}
              className="
                group rounded-card border border-border bg-surface-raised p-6
                hover:border-gold/30 hover:bg-abyss-200
                transition-all duration-200
              "
            >
              <span className="text-2xl" aria-hidden>
                {feature.icon}
              </span>
              <h3 className="font-display text-sm text-gold mt-3 group-hover:text-gold-light transition-colors">
                {feature.title}
              </h3>
              <p className="font-body text-xs text-gray-400 mt-2 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section className="pb-20 text-center">
        <div className="rounded-card border border-gold/20 bg-gradient-to-br from-surface-raised to-abyss p-10">
          <h2 className="font-display text-xl sm:text-2xl text-gold">
            {t.bottomTitle}
          </h2>
          <p className="mt-3 font-body text-sm text-gray-400 max-w-md mx-auto">
            {t.bottomSub}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${prefix}/codex`}
              className="
                inline-flex items-center gap-2 px-6 py-3
                border border-gold/30 text-gold font-display text-xs tracking-wide
                rounded-card hover:border-gold/50 hover:bg-gold/5
                transition-all duration-200
              "
            >
              {t.ctaCodex}
            </Link>
            <Link
              href={`${prefix}/outils/des`}
              className="
                inline-flex items-center gap-2 px-6 py-3
                border border-border text-gray-400 font-display text-xs tracking-wide
                rounded-card hover:border-gold/30 hover:text-gold
                transition-all duration-200
              "
            >
              {t.ctaDice}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
