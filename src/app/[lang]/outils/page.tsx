import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "L'Atelier de l'Artificier : Outils Stratégiques | BG3 Honor Companion",
  description:
    "Calculateurs, simulateurs et checklists pour dominer le Mode Honneur de Baldur's Gate 3. Tous les outils du parfait aventurier.",
};

// ---------------------------------------------------------------------------
// Données des cartes
// ---------------------------------------------------------------------------

interface ToolCard {
  href: string;
  icon: string;
  title: string;
  description: string;
}

const TOOLS: readonly ToolCard[] = [
  {
    href: "/planner",
    icon: "🔮",
    title: "Le Planificateur",
    description:
      "Planifiez votre groupe idéal, vos builds et votre progression. L'outil stratégique ultime pour le Mode Honneur.",
  },
  {
    href: "/tracker",
    icon: "📜",
    title: "La Liste de Courses",
    description:
      "Suivez les objets essentiels à récupérer acte par acte. Ne manquez plus jamais un équipement clé.",
  },
  {
    href: "/outils/groupe",
    icon: "👥",
    title: "Le Conseil de Guerre",
    description:
      "Composez votre groupe de 4 et analysez la répartition des reliques uniques, les synergies et les conflits de butin.",
  },
  {
    href: "/outils/traqueur",
    icon: "🎒",
    title: "Le Traqueur d'Inventaire",
    description:
      "Checklist anti-oubli acte par acte. Vérifiez chaque objet vital avant les points de non-retour. Sauvegarde automatique.",
  },
  {
    href: "/outils/illithid",
    icon: "🧠",
    title: "La Matrice Illithid",
    description:
      "Arbre de compétences des Têtards avec recommandations dynamiques selon votre build. Planifiez vos pouvoirs Illithids.",
  },
  {
    href: "/outils/des",
    icon: "🎲",
    title: "Les Dés du Destin",
    description:
      "Lancez les dés avec Avantage, Désavantage et Dés Karmiques. Calculez vos probabilités exactes de réussite.",
  },
  {
    href: "/outils/nova",
    icon: "🔮",
    title: "L'Orbe de Puissance",
    description:
      "Calculateur de burst Nova pour les builds Châtiment Divin. Lockadin, Bardadin, Sorcadin — optimisez vos dégâts.",
  },
  {
    href: "/outils/preparation",
    icon: "📜",
    title: "Le Rituel de Préparation",
    description:
      "Checklist interactive de buffs après un Repos Long. Ne partez jamais au combat sans vos enchantements essentiels.",
  },
  {
    href: "/outils/combat",
    icon: "⚔️",
    title: "Le Simulateur de Combat",
    description:
      "Détail mathématique complet d'une attaque. GWF, Châtiment Divin, critiques, Damage Riders et plus encore.",
  },
  {
    href: "/outils/initiative",
    icon: "⚡",
    title: "Le Calculateur d'Initiative",
    description:
      "BG3 utilise un d4 pour l'initiative. Analysez vos probabilités de jouer en premier face à vos ennemis.",
  },
  {
    href: "/outils/forge",
    icon: "🔨",
    title: "La Forge des Caractéristiques",
    description:
      "Calculateur Point Buy 27 interactif. Répartissez vos points et bonus raciaux pour forger le héros parfait.",
  },
  {
    href: "/outils/calculateur",
    icon: "🧮",
    title: "Theorycraft Engine",
    description:
      "Calculateur de dégâts interactif. Paramétrez vos dés, modificateurs et bonus pour visualiser min, max et moyenne en temps réel.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OutilsPage() {
  return (
    <div className="max-w-5xl space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-4xl text-gradient-gold uppercase tracking-wide">
          L&apos;Atelier de l&apos;Artificier
        </h1>
        <p className="text-sm font-body text-gray-400 mt-3 max-w-xl mx-auto leading-relaxed">
          Bienvenue dans la forge secrète. Ici sont réunis les instruments de
          précision forgés pour ceux qui refusent de laisser le Mode Honneur au
          hasard. Choisissez votre outil et préparez-vous.
        </p>
        <div className="mx-auto mt-4 w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block bg-[#111520]/60 backdrop-blur-md border border-gold/20
                       p-6 rounded-xl transition-all duration-300
                       hover:-translate-y-2 hover:border-gold/50
                       hover:shadow-2xl hover:shadow-gold/20"
          >
            <span className="text-4xl block mb-4" aria-hidden>
              {tool.icon}
            </span>
            <h3 className="font-heading text-lg text-gold uppercase tracking-wide group-hover:text-gold-light transition-colors">
              {tool.title}
            </h3>
            <p className="text-sm font-body text-gray-400 mt-2 leading-relaxed">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
