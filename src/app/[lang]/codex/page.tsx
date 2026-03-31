import type { Metadata } from "next";
import Link from "next/link";
import { getAllEntries, type CodexEntry } from "@/data/database";

export const metadata: Metadata = {
  title: "Le Codex — Baldur's Gate 3 (Mode Honneur) | BG3 Honor Companion",
  description:
    "Encyclopédie complète des objets, sorts et capacités référencés dans le guide du Mode Honneur de BG3. Statistiques détaillées et synergies.",
  openGraph: {
    title: "Le Codex — Baldur's Gate 3 (Mode Honneur) | BG3 Honor Companion",
    description:
      "Encyclopédie complète des objets, sorts et capacités référencés dans le guide du Mode Honneur de BG3. Statistiques détaillées et synergies.",
    type: "website",
  },
};

const PAGE_TEXT = {
  fr: {
    title: "Le Codex",
    description: "Bienvenue, Commandant. Ce Codex contient l'intégralité des objets, sorts et capacités référencés dans le guide. Survolez n'importe quel nom pour voir ses statistiques détaillées.",
    items: "Objets",
    spells: "Sorts",
    abilities: "Capacités",
    rarityLabels: {
      common: "Commun",
      uncommon: "Inhabituel",
      rare: "Rare",
      very_rare: "Très Rare",
      legendary: "Légendaire",
    } as Record<string, string>,
    quickLinks: {
      lockadin: { title: "Le Lockadin", sub: "Paladin 7 / Occultiste 5 — Tier S" },
      act1: { title: "Acte 1", sub: "Route Pacifique vers le Niveau 4" },
      simulator: { title: "Simulateur", sub: "Calculs de dégâts en temps réel" },
      dice: { title: "Dés", sub: "Simulateur 3D avec probabilités" },
    },
  },
  en: {
    title: "The Codex",
    description: "Welcome, Commander. This Codex contains every item, spell and ability referenced in the guide. Hover over any name to see its detailed statistics.",
    items: "Items",
    spells: "Spells",
    abilities: "Abilities",
    rarityLabels: {
      common: "Common",
      uncommon: "Uncommon",
      rare: "Rare",
      very_rare: "Very Rare",
      legendary: "Legendary",
    } as Record<string, string>,
    quickLinks: {
      lockadin: { title: "The Lockadin", sub: "Paladin 7 / Warlock 5 — Tier S" },
      act1: { title: "Act 1", sub: "Pacifist Route to Level 4" },
      simulator: { title: "Simulator", sub: "Real-time damage calculations" },
      dice: { title: "Dice", sub: "3D simulator with probabilities" },
    },
  },
} as const;

function CodexCard({ entry, rarityLabels }: { entry: CodexEntry; rarityLabels: Record<string, string> }) {
  const rarityColors: Record<string, string> = {
    common: "border-rarity-common/30 text-rarity-common",
    uncommon: "border-rarity-uncommon/30 text-rarity-uncommon",
    rare: "border-rarity-rare/30 text-rarity-rare",
    very_rare: "border-rarity-very_rare/30 text-rarity-very_rare",
    legendary: "border-rarity-legendary/30 text-rarity-legendary",
  };

  const typeIcons: Record<string, string> = {
    objet: "⚔️",
    sort: "✨",
    boss: "💀",
    capacité: "🔶",
  };

  return (
    <div className={`rounded-card border ${rarityColors[entry.rarity]} bg-surface-raised p-4 hover:bg-abyss-200 transition-all duration-200`}>
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5" aria-hidden>{typeIcons[entry.type]}</span>
        <div className="flex-1 min-w-0">
          <h3 className={`font-display text-sm ${rarityColors[entry.rarity]}`}>{entry.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] font-data uppercase tracking-wider ${rarityColors[entry.rarity]}`}>
              {rarityLabels[entry.rarity] ?? entry.rarity}
            </span>
            <span className="text-[10px] font-data text-gray-500 uppercase tracking-wider">{entry.type}</span>
          </div>
          <p className="text-xs font-body text-gray-400 mt-2 line-clamp-2">{entry.description}</p>
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function CodexPage({ params }: PageProps) {
  const { lang } = await params;
  const t = lang === "en" ? PAGE_TEXT.en : PAGE_TEXT.fr;
  const prefix = `/${lang}`;

  const allEntries = getAllEntries();
  const objets = allEntries.filter((e) => e.type === "objet");
  const sorts = allEntries.filter((e) => e.type === "sort");
  const capacites = allEntries.filter((e) => e.type === "capacité");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Le Codex",
    description:
      "Encyclopédie complète des objets, sorts et capacités référencés dans le guide du Mode Honneur de BG3.",
    author: { "@type": "Organization", name: "BG3 Honor Companion" },
    about: { "@type": "VideoGame", name: "Baldur's Gate 3" },
  };

  return (
    <div className="max-w-5xl space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-3">
        <h1 className="font-display text-3xl text-gold tracking-wide">{t.title}</h1>
        <p className="font-body text-base text-gray-400 max-w-2xl leading-relaxed">
          {t.description}
        </p>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Link href={`${prefix}/builds/lockadin`} className="group rounded-card border border-border bg-surface-raised p-4 hover:border-gold/40 transition-all">
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">{t.quickLinks.lockadin.title}</h3>
          <p className="text-xs font-data text-gray-500 mt-1">{t.quickLinks.lockadin.sub}</p>
        </Link>
        <Link href={`${prefix}/walkthrough/acte-1`} className="group rounded-card border border-border bg-surface-raised p-4 hover:border-gold/40 transition-all">
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">{t.quickLinks.act1.title}</h3>
          <p className="text-xs font-data text-gray-500 mt-1">{t.quickLinks.act1.sub}</p>
        </Link>
        <Link href={`${prefix}/outils/combat`} className="group rounded-card border border-border bg-surface-raised p-4 hover:border-gold/40 transition-all">
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">{t.quickLinks.simulator.title}</h3>
          <p className="text-xs font-data text-gray-500 mt-1">{t.quickLinks.simulator.sub}</p>
        </Link>
        <Link href={`${prefix}/outils/des`} className="group rounded-card border border-border bg-surface-raised p-4 hover:border-gold/40 transition-all">
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">{t.quickLinks.dice.title}</h3>
          <p className="text-xs font-data text-gray-500 mt-1">{t.quickLinks.dice.sub}</p>
        </Link>
      </div>

      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">{t.items} ({objets.length})</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {objets.map((entry) => <CodexCard key={entry.id} entry={entry} rarityLabels={t.rarityLabels} />)}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">{t.spells} ({sorts.length})</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {sorts.map((entry) => <CodexCard key={entry.id} entry={entry} rarityLabels={t.rarityLabels} />)}
        </div>
      </section>

      {capacites.length > 0 && (
        <section>
          <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">{t.abilities} ({capacites.length})</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {capacites.map((entry) => <CodexCard key={entry.id} entry={entry} rarityLabels={t.rarityLabels} />)}
          </div>
        </section>
      )}
    </div>
  );
}
