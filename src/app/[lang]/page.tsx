import Link from "next/link";
import { getDictionary, type Locale } from "@/dictionaries";

// ============================================================================
// Landing Page — Dark Fantasy SaaS — Full Immersive Hero + Glassmorphism Cards
// ============================================================================

interface Feature {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

const FEATURES_FR: Feature[] = [
  { icon: "⚔️", title: "10 Builds Tier S", description: "Du Lockadin au Throwzerker, chaque build est optimisé pour le Mode Honneur avec progression niveau par niveau et équipement BiS.", href: "/builds" },
  { icon: "🔮", title: "Planificateur de Groupe", description: "Composez votre groupe de 4 personnages, détectez les synergies et conflits d'objets, et optimisez votre composition.", href: "/planner" },
  { icon: "📜", title: "Liste de Courses", description: "Suivez chaque objet Best-in-Slot à récupérer acte par acte. Cochez au fur et à mesure pour ne jamais rien oublier.", href: "/tracker" },
  { icon: "🧮", title: "Calculateur de Dégâts", description: "Simulez vos combos de dégâts avec les dés, modificateurs et effets exacts. Calculez votre DPR avant chaque combat.", href: "/outils/calculateur" },
  { icon: "💀", title: "Matrices d'Urgence Boss", description: "Chaque boss majeur décomposé phase par phase. Mécaniques Mode Honneur exclusives et contre-stratégies." },
  { icon: "🛡️", title: "Failsafe Chains", description: "Raté un objet clé ? Chaque item critique a un Plan B documenté. Les chaînes de failsafe garantissent votre run." },
];

const FEATURES_EN: Feature[] = [
  { icon: "⚔️", title: "10 Tier S Builds", description: "From the Lockadin to the Throwzerker, every build is optimized for Honour Mode with level-by-level progression and BiS gear.", href: "/builds" },
  { icon: "🔮", title: "Party Planner", description: "Compose your 4-character party, detect item synergies and conflicts, and optimize your composition.", href: "/planner" },
  { icon: "📜", title: "Loot Tracker", description: "Track every Best-in-Slot item to collect act by act. Check them off as you go so you never miss a thing.", href: "/tracker" },
  { icon: "🧮", title: "Damage Calculator", description: "Simulate your damage combos with exact dice, modifiers and effects. Calculate your DPR before every critical fight.", href: "/outils/calculateur" },
  { icon: "💀", title: "Boss Emergency Matrices", description: "Every major boss broken down phase by phase. Honour Mode exclusive mechanics and counter-strategies." },
  { icon: "🛡️", title: "Failsafe Chains", description: "Missed a key item? Every critical piece of gear has a documented Plan B. Failsafe chains protect your run." },
];

const PAGE_TEXT = {
  fr: {
    heroTitle: "Dominez le Mode Honneur",
    heroSub: "Le compagnon ultime pour Baldur's Gate 3. Une seule sauvegarde. Aucun droit à l'erreur. Chaque décision compte.",
    ctaBuilds: "Voir les Builds Tier S",
    ctaPlanner: "Ouvrir le Planificateur",
    stats: [{ value: "3", label: "Actes Couverts" }, { value: "10", label: "Builds Optimisés" }, { value: "40+", label: "Entrées Codex" }, { value: "0", label: "Droit à l'Erreur" }],
    toolsTitle: "Arsenal Tactique",
    toolsSub: "Chaque outil a été forgé pour éliminer l'incertitude du Mode Honneur.",
    bottomTitle: "Prêt à commencer votre run ?",
    bottomSub: "Choisissez votre build, suivez le walkthrough, et que les dés soient en votre faveur.",
    ctaWalkthrough: "Lancer le Walkthrough",
    ctaArsenal: "Explorer l'Armurerie",
    features: FEATURES_FR,
  },
  en: {
    heroTitle: "Dominate Honour Mode",
    heroSub: "The ultimate companion for Baldur's Gate 3. One save file. No margin for error. Every decision matters.",
    ctaBuilds: "View Tier S Builds",
    ctaPlanner: "Open the Planner",
    stats: [{ value: "3", label: "Acts Covered" }, { value: "10", label: "Optimized Builds" }, { value: "40+", label: "Codex Entries" }, { value: "0", label: "Margin for Error" }],
    toolsTitle: "Tactical Arsenal",
    toolsSub: "Every tool is forged to eliminate uncertainty from Honour Mode.",
    bottomTitle: "Ready to start your run?",
    bottomSub: "Pick your build, follow the walkthrough, and may the dice be ever in your favour.",
    ctaWalkthrough: "Start the Walkthrough",
    ctaArsenal: "Explore the Armory",
    features: FEATURES_EN,
  },
} as const;

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;
  const prefix = `/${lang}`;

  return (
    <div className="relative">
      {/* ================================================================
          HERO — Full viewport, immersive dark fantasy
          ================================================================ */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden -mt-14 pt-14">
        {/* Multi-layer radial glow background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#d4af37]/[0.03] blur-[160px]" />
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/[0.06] blur-[100px]" />
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-amber-500/[0.08] blur-[60px]" />
        </div>

        {/* Decorative top divider */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-[10px] font-data uppercase tracking-[0.4em] text-[#d4af37]/50 mb-6">
            Baldur&apos;s Gate 3 &mdash; Honour Mode Companion
          </p>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-[1.1]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-[#d4af37] to-amber-700 drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              {t.heroTitle}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 font-body text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href={`${prefix}/builds`}
              className="
                inline-flex items-center gap-3 px-10 py-4
                bg-gradient-to-r from-[#d4af37] to-[#9b7e1e]
                text-[#111520] font-display text-base font-bold tracking-wide
                rounded-xl
                shadow-[0_0_30px_rgba(212,175,55,0.35),0_4px_16px_rgba(0,0,0,0.4)]
                hover:shadow-[0_0_50px_rgba(212,175,55,0.55),0_4px_24px_rgba(0,0,0,0.5)]
                hover:brightness-110 hover:scale-[1.02]
                transition-all duration-300
              "
            >
              {t.ctaBuilds}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>

            <Link
              href={`${prefix}/planner`}
              className="
                inline-flex items-center gap-3 px-10 py-4
                border-2 border-[#d4af37]/40 bg-[#111520]/60 backdrop-blur-sm
                text-[#d4af37] font-display text-base font-bold tracking-wide
                rounded-xl
                hover:border-[#d4af37]/70 hover:bg-[#d4af37]/10
                hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]
                transition-all duration-300
              "
            >
              {t.ctaPlanner}
            </Link>
          </div>
        </div>

        {/* Stats bar — floating at bottom of hero */}
        <div className="relative z-10 mt-20 w-full max-w-3xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center py-5 rounded-2xl border border-[#d4af37]/15 bg-[#111520]/40 backdrop-blur-md"
              >
                <p className="font-display text-4xl text-[#d4af37] drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]">{stat.value}</p>
                <p className="text-[10px] font-data text-gray-500 mt-1.5 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ================================================================
          FEATURES — Glassmorphism Cards Grid
          ================================================================ */}
      <section className="relative py-28 px-6">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#d4af37]/[0.02] blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="mx-auto w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mb-6" />
            <p className="text-[10px] font-data uppercase tracking-[0.4em] text-[#d4af37]/40 mb-4">
              Tools &amp; Guides
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-[#d4af37] to-amber-600">
              {t.toolsTitle}
            </h2>
            <p className="mt-4 font-body text-base text-gray-500 max-w-xl mx-auto">
              {t.toolsSub}
            </p>
          </div>

          {/* Glassmorphism Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature) => {
              const content = (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl" aria-hidden>{feature.icon}</span>
                    <h3 className="font-display text-base text-[#d4af37] group-hover:text-yellow-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                  {feature.href && (
                    <div className="mt-4 flex items-center gap-1.5 text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors duration-300">
                      <span className="text-xs font-data uppercase tracking-wider">
                        {lang === "fr" ? "Ouvrir" : "Open"}
                      </span>
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </>
              );

              const cardClasses = `
                group relative rounded-2xl p-6
                border border-white/[0.06]
                bg-white/[0.02] backdrop-blur-xl
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]
                hover:border-[#d4af37]/25 hover:bg-white/[0.04]
                hover:shadow-[0_0_40px_rgba(212,175,55,0.06),inset_0_1px_0_0_rgba(212,175,55,0.1)]
                transition-all duration-300
              `;

              if (feature.href) {
                return (
                  <Link
                    key={feature.title}
                    href={`${prefix}${feature.href}`}
                    className={`${cardClasses} block`}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div key={feature.title} className={cardClasses}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          BOTTOM CTA — Cinematic call to action
          ================================================================ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto relative rounded-2xl border border-[#d4af37]/20 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c2133] via-[#141825] to-[#111520]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#d4af37]/[0.04] blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

          <div className="relative z-10 p-12 md:p-16 text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-[#d4af37] to-amber-600">
              {t.bottomTitle}
            </h2>
            <p className="mt-4 font-body text-base text-gray-400 max-w-md mx-auto">
              {t.bottomSub}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`${prefix}/walkthrough/acte-1`}
                className="
                  inline-flex items-center gap-2 px-8 py-3.5
                  bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10
                  border border-[#d4af37]/30 text-[#d4af37] font-display text-sm tracking-wide
                  rounded-xl hover:from-[#d4af37]/30 hover:to-[#d4af37]/20 hover:border-[#d4af37]/50
                  hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]
                  transition-all duration-300
                "
              >
                {t.ctaWalkthrough}
              </Link>
              <Link
                href={`${prefix}/arsenal`}
                className="
                  inline-flex items-center gap-2 px-8 py-3.5
                  border border-[#2a3048] text-gray-400 font-display text-sm tracking-wide
                  rounded-xl hover:border-[#d4af37]/30 hover:text-[#d4af37]
                  transition-all duration-300
                "
              >
                {t.ctaArsenal}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
