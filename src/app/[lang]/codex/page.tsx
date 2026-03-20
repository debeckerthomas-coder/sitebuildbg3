import Link from "next/link";
import { getAllEntries, type CodexEntry } from "@/data/database";

function CodexCard({ entry }: { entry: CodexEntry }) {
  const rarityColors: Record<string, string> = {
    common: "border-rarity-common/30 text-rarity-common",
    uncommon: "border-rarity-uncommon/30 text-rarity-uncommon",
    rare: "border-rarity-rare/30 text-rarity-rare",
    very_rare: "border-rarity-very_rare/30 text-rarity-very_rare",
    legendary: "border-rarity-legendary/30 text-rarity-legendary",
  };

  const rarityLabels: Record<string, string> = {
    common: "Commun",
    uncommon: "Inhabituel",
    rare: "Rare",
    very_rare: "Très Rare",
    legendary: "Légendaire",
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
              {rarityLabels[entry.rarity]}
            </span>
            <span className="text-[10px] font-data text-gray-500 uppercase tracking-wider">{entry.type}</span>
          </div>
          <p className="text-xs font-body text-gray-400 mt-2 line-clamp-2">{entry.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function CodexPage() {
  const allEntries = getAllEntries();
  const objets = allEntries.filter((e) => e.type === "objet");
  const sorts = allEntries.filter((e) => e.type === "sort");
  const capacites = allEntries.filter((e) => e.type === "capacité");

  return (
    <div className="max-w-5xl space-y-8">
      <div className="space-y-3">
        <h1 className="font-display text-3xl text-gold tracking-wide">Le Codex</h1>
        <p className="font-body text-base text-gray-400 max-w-2xl leading-relaxed">
          Bienvenue, Commandant. Ce Codex contient l&apos;intégralité des objets, sorts et capacités
          référencés dans le guide. Survolez n&apos;importe quel nom pour voir ses statistiques détaillées.
        </p>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Link href="/builds/lockadin" className="group rounded-card border border-border bg-surface-raised p-4 hover:border-gold/40 transition-all">
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">Le Lockadin</h3>
          <p className="text-xs font-data text-gray-500 mt-1">Paladin 7 / Occultiste 5 — Tier S</p>
        </Link>
        <Link href="/walkthrough/acte-1" className="group rounded-card border border-border bg-surface-raised p-4 hover:border-gold/40 transition-all">
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">Acte 1</h3>
          <p className="text-xs font-data text-gray-500 mt-1">Route Pacifique vers le Niveau 4</p>
        </Link>
        <Link href="/outils/combat" className="group rounded-card border border-border bg-surface-raised p-4 hover:border-gold/40 transition-all">
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">Simulateur</h3>
          <p className="text-xs font-data text-gray-500 mt-1">Calculs de dégâts en temps réel</p>
        </Link>
        <Link href="/outils/des" className="group rounded-card border border-border bg-surface-raised p-4 hover:border-gold/40 transition-all">
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">Dés</h3>
          <p className="text-xs font-data text-gray-500 mt-1">Simulateur 3D avec probabilités</p>
        </Link>
      </div>

      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">Objets ({objets.length})</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {objets.map((entry) => <CodexCard key={entry.id} entry={entry} />)}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">Sorts ({sorts.length})</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {sorts.map((entry) => <CodexCard key={entry.id} entry={entry} />)}
        </div>
      </section>

      {capacites.length > 0 && (
        <section>
          <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">Capacités ({capacites.length})</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {capacites.map((entry) => <CodexCard key={entry.id} entry={entry} />)}
          </div>
        </section>
      )}
    </div>
  );
}
