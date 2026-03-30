import Link from "next/link";
import { getDictionary, type Locale } from "@/dictionaries";

// ============================================================================
// Landing Page — Dark Fantasy SaaS Vitrine
// Hero + Radial Glow + Features (Atelier) + Bottom CTA
// ============================================================================

interface Feature {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

const FEATURES_FR: Feature[] = [
  { icon: "⚔️", title: "10 Builds Tier S", description: "Du Lockadin au Throwzerker, chaque build est optimisé pour le Mode Honneur avec progression niveau par niveau et équipement BiS.", href: "/builds" },
  { icon: "🔮", title: "Planificateur de Groupe", description: "Composez votre groupe de 4 personnages, détectez les synergies et conflits d'objets, et optimisez votre composition avant de vous lancer.", href: "/planner" },
  { icon: "📜", title: "Liste de Courses", description: "Suivez chaque objet Best-in-Slot à récupérer acte par acte. Cochez au fur et à mesure pour ne jamais rien oublier.", href: "/tracker" },
  { icon: "🧮", title: "Calculateur de Dégâts", description: "Simulez vos combos de dégâts avec les dés, modificateurs et effets exacts. Calculez votre DPR avant chaque combat critique.", href: "/outils/calculateur" },
  { icon: "💀", title: "Matrices d'Urgence Boss", description: "Chaque boss majeur décomposé phase par phase. Mécaniques Mode Honneur exclusives, contre-stratégies, et pièges mortels identifiés." },
  { icon: "🛡️", title: "Failsafe Chains", description: "Raté un objet clé ? Chaque item critique a un Plan B documenté. Les chaînes de failsafe garantissent qu'aucun oubli ne ruine votre run." },
];

const FEATURES_EN: Feature[] = [
  { icon: "⚔️", title: "10 Tier S Builds", description: "From the Lockadin to the Throwzerker, every build is optimized for Honour Mode with level-by-level progression and BiS gear.", href: "/builds" },
  { icon: "🔮", title: "Party Planner", description: "Compose your 4-character party, detect item synergies and conflicts, and optimize your composition before jumping in.", href: "/planner" },
  { icon: "📜", title: "Loot Tracker", description: "Track every Best-in-Slot item to collect act by act. Check them off as you go so you never miss a thing.", href: "/tracker" },
  { icon: "🧮", title: "Damage Calculator", description: "Simulate your damage combos with exact dice, modifiers and effects. Calculate your DPR before every critical fight.", href: "/outils/calculateur" },
  { icon: "💀", title: "Boss Emergency Matrices", description: "Every major boss broken down phase by phase. Honour Mode exclusive mechanics, counter-strategies, and lethal traps identified." },
  { icon: "🛡️", title: "Failsafe Chains", description: "Missed a key item? Every critical piece of gear has a documented Plan B. Failsafe chains ensure no oversight ruins your run." },
];

const PAGE_TEXT = {
  fr: {
    heroTitle: "Dominez le Mode Honneur",
    heroSub: "Le compagnon ultime pour Baldur's Gate 3. Une seule sauvegarde. Aucun droit à l'erreur. Chaque décision compte.",
    ctaBuilds: "Voir les Builds Tier S",
    ctaPlanner: "Ouvrir le Planificateur",
    stats: [{ value: "3", label: "Actes Couverts" }, { value: "10", label: "Builds Optimisés" }, { value: "40+", label: "Entrées Codex" }, { value: "0", label: "Droit à l'Erreur" }],
    atelierTitle: "L'Atelier du Chasseur",
    atelierSub: "Chaque outil a été forgé pour éliminer l'incertitude du Mode Honneur.",
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
    atelierTitle: "The Hunter's Workshop",
    atelierSub: "Every tool is forged to eliminate uncertainty from Honour Mode.",
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
    <div className="max-w-5xl mx-auto px-4">
      {/* ---- Hero Section with Radial Glow ---- */}
      <section className="relative pt-20 pb-24 text-center overflow-hidden">
        {/* Radial glow background effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/[0.04] blur-[120px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#d4af37]/[0.06] blur-[80px]" />
        </div>

        <div className="relative z-10">
          <div className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mb-10" />

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-wide leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-[#d4af37] to-amber-600">
              {t.heroTitle}
            </span>
          </h1>

          <p className="mt-6 font-body text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA — Gold */}
            <Link
              href={`${prefix}/builds`}
              className="
                inline-flex items-center gap-2 px-8 py-3.5
                bg-gradient-to-r from-[#d4af37] to-[#9b7e1e]
                text-[#111520] font-display text-sm font-semibold tracking-wide
                rounded-lg
                shadow-[0_0_24px_rgba(212,175,55,0.3)]
                hover:shadow-[0_0_36px_rgba(212,175,55,0.5)]
                hover:brightness-110
                transition-all duration-200
              "
            >
              {t.ctaBuilds}
            </Link>

            {/* Secondary CTA — Dark/Outline */}
            <Link
              href={`${prefix}/planner`}
              className="
                inline-flex items-center gap-2 px-8 py-3.5
                border-2 border-[#d4af37]/40 bg-[#111520]/50
                text-[#d4af37] font-display text-sm font-semibold tracking-wide
                rounded-lg
                hover:border-[#d4af37]/70 hover:bg-[#d4af37]/5
                transition-all duration-200
              "
            >
              {t.ctaPlanner}
            </Link>
          </div>

          <div className="mx-auto w-48 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mt-16" />
        </div>
      </section>

      {/* ---- Stats bar ---- */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-16">
        {t.stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center py-5 rounded-xl border border-[#2a3048] bg-[#111520]/60 backdrop-blur-sm"
          >
            <p className="font-display text-3xl text-[#d4af37]">{stat.value}</p>
            <p className="text-[11px] font-data text-gray-500 mt-1 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* ---- Atelier / Features Grid ---- */}
      <section className="pb-20">
        <div className="text-center mb-12">
          <p className="text-[10px] font-data uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Workshop
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-[#d4af37] to-amber-600">
            {t.atelierTitle}
          </h2>
          <p className="mt-3 font-body text-sm text-gray-500 max-w-lg mx-auto">
            {t.atelierSub}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.map((feature) => {
            const content = (
              <>
                <span className="text-2xl" aria-hidden>
                  {feature.icon}
                </span>
                <h3 className="font-display text-sm text-[#d4af37] mt-3 group-hover:text-yellow-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="font-body text-xs text-gray-400 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </>
            );

            const cardClasses = `
              group rounded-xl border border-[#2a3048] bg-[#111520]/60 backdrop-blur-sm p-6
              hover:border-[#d4af37]/30 hover:bg-[#1c2133]
              transition-all duration-200
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
      </section>

      {/* ---- Bottom CTA ---- */}
      <section className="pb-20 text-center">
        <div className="relative rounded-xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1c2133] to-[#111520] p-10 overflow-hidden">
          {/* Subtle radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#d4af37]/[0.03] blur-[80px] pointer-events-none" aria-hidden="true" />

          <h2 className="relative font-display text-xl sm:text-2xl text-[#d4af37]">
            {t.bottomTitle}
          </h2>
          <p className="relative mt-3 font-body text-sm text-gray-400 max-w-md mx-auto">
            {t.bottomSub}
          </p>
          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${prefix}/walkthrough/acte-1`}
              className="
                inline-flex items-center gap-2 px-6 py-3
                bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10
                border border-[#d4af37]/30 text-[#d4af37] font-display text-xs tracking-wide
                rounded-lg hover:from-[#d4af37]/30 hover:to-[#d4af37]/20 hover:border-[#d4af37]/50
                transition-all duration-200
              "
            >
              {t.ctaWalkthrough}
            </Link>
            <Link
              href={`${prefix}/arsenal`}
              className="
                inline-flex items-center gap-2 px-6 py-3
                border border-[#2a3048] text-gray-400 font-display text-xs tracking-wide
                rounded-lg hover:border-[#d4af37]/30 hover:text-[#d4af37]
                transition-all duration-200
              "
            >
              {t.ctaArsenal}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
