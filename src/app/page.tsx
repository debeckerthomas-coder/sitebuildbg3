import Link from "next/link";

// ============================================================================
// Landing Page — Hero Header + Feature Showcase
// ============================================================================

const FEATURES = [
  {
    icon: "📋",
    title: "Checklists Interactives",
    description:
      "Suivez votre progression étape par étape à travers les 3 Actes. Chaque checkpoint est sauvegardé localement — reprenez où vous en étiez.",
  },
  {
    icon: "💎",
    title: "Tooltips Dynamiques",
    description:
      "Survolez n'importe quel objet, sort ou capacité pour afficher ses statistiques complètes. Plus de 40 entrées de Codex référencées.",
  },
  {
    icon: "🎲",
    title: "Simulateur de Dés",
    description:
      "Calculez vos probabilités de réussite avant chaque jet critique. Simulez des centaines de lancers pour optimiser vos décisions.",
  },
  {
    icon: "🛡️",
    title: "Failsafe Chains",
    description:
      "Raté un objet clé ? Chaque item critique a un Plan B documenté. Les chaînes de failsafe garantissent qu'aucun oubli ne ruine votre run.",
  },
  {
    icon: "💀",
    title: "Matrices d'Urgence Boss",
    description:
      "Chaque boss majeur décomposé phase par phase. Mécaniques Mode Honneur exclusives, contre-stratégies, et pièges mortels identifiés.",
  },
  {
    icon: "⚔️",
    title: "9 Builds Tier S",
    description:
      "Du Lockadin au Throwzerker, chaque build est optimisé pour le Mode Honneur avec progression niveau par niveau et équipement BiS.",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* ---- Hero Section ---- */}
      <section className="pt-16 pb-20 text-center">
        {/* Decorative top line */}
        <div className="mx-auto w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-10" />

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gold tracking-wide leading-tight">
          BG3 Honor Companion
        </h1>

        <p className="mt-6 font-body text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Le guide ultime pour survivre au <span className="text-gold-light font-semibold">Mode Honneur</span> de
          Baldur&apos;s Gate 3. Une seule sauvegarde. Aucun droit à l&apos;erreur.
          Chaque décision compte.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/builds"
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
            Découvrir les Builds Tier S
          </Link>

          <Link
            href="/walkthrough/acte-1"
            className="
              inline-flex items-center gap-2 px-8 py-3.5
              border-2 border-gold/40
              text-gold font-display text-sm font-semibold tracking-wide
              rounded-card
              hover:border-gold/70 hover:bg-gold/5
              transition-all duration-200
            "
          >
            Lancer le Walkthrough
          </Link>
        </div>

        {/* Decorative bottom line */}
        <div className="mx-auto w-48 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-16" />
      </section>

      {/* ---- Stats bar ---- */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-16">
        {[
          { value: "3", label: "Actes Couverts" },
          { value: "9", label: "Builds Optimisés" },
          { value: "40+", label: "Entrées Codex" },
          { value: "0", label: "Droit à l'Erreur" },
        ].map((stat) => (
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
            Tout Ce Dont Vous Avez Besoin
          </h2>
          <p className="mt-3 font-body text-sm text-gray-500 max-w-lg mx-auto">
            Chaque outil a été conçu pour éliminer l&apos;incertitude du Mode Honneur.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
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
            Prêt à commencer votre run ?
          </h2>
          <p className="mt-3 font-body text-sm text-gray-400 max-w-md mx-auto">
            Choisissez votre build, suivez le walkthrough, et que les dés soient en votre faveur.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/codex"
              className="
                inline-flex items-center gap-2 px-6 py-3
                border border-gold/30 text-gold font-display text-xs tracking-wide
                rounded-card hover:border-gold/50 hover:bg-gold/5
                transition-all duration-200
              "
            >
              Explorer le Codex
            </Link>
            <Link
              href="/outils/des"
              className="
                inline-flex items-center gap-2 px-6 py-3
                border border-border text-gray-400 font-display text-xs tracking-wide
                rounded-card hover:border-gold/30 hover:text-gold
                transition-all duration-200
              "
            >
              Simulateur de Dés
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
