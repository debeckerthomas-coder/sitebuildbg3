import { LOCKADIN } from "@/data/builds/lockadin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Lockadin — Paladin 7 / Occultiste 5 | BG3 Honor Companion",
  description: "Build Tier S pour le Mode Honneur. Châtiment Divin à volonté grâce aux emplacements rechargés de l'Occultiste.",
};

function TierBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    S: "bg-gold/20 text-gold border-gold/40",
    A: "bg-green-900/30 text-green-400 border-green-500/40",
    B: "bg-blue-900/30 text-blue-400 border-blue-500/40",
    C: "bg-gray-800/30 text-gray-400 border-gray-500/40",
  };
  return (
    <span className={`text-xs font-data font-bold px-2 py-1 rounded border ${colors[tier]}`}>
      Tier {tier}
    </span>
  );
}

export default function LockBuildPage() {
  const build = LOCKADIN;

  return (
    <div className="max-w-4xl space-y-8">
      {/* En-tête */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="font-display text-3xl text-gold">{build.nom}</h1>
          <TierBadge tier={build.tier} />
        </div>
        <p className="font-display text-sm text-gold-muted">{build.sousTitre}</p>
        <p className="font-body text-sm text-gray-400 leading-relaxed max-w-2xl">{build.description}</p>

        <div className="flex flex-wrap gap-4 pt-2">
          <div className="bg-surface-raised rounded-card border border-border px-4 py-2">
            <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">Race</p>
            <p className="text-sm font-data text-gray-200">{build.race}</p>
          </div>
          <div className="bg-surface-raised rounded-card border border-border px-4 py-2">
            <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">Rôle</p>
            <p className="text-sm font-data text-gray-200">{build.role}</p>
          </div>
          <div className="bg-surface-raised rounded-card border border-border px-4 py-2">
            <p className="text-[10px] font-data text-gray-500 uppercase tracking-wider">Multiclasse</p>
            <p className="text-sm font-data text-gray-200">{build.multiclasse}</p>
          </div>
        </div>
      </div>

      {/* Caractéristiques */}
      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">Caractéristiques</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(build.scoreCaracteristiques.final).map(([stat, val]) => (
            <div key={stat} className="bg-surface-raised rounded-card border border-border p-3 text-center">
              <p className="text-xs font-data text-gray-500 uppercase tracking-wider">{stat}</p>
              <p className="text-2xl font-display text-gold mt-1">{val}</p>
              <p className="text-[10px] font-data text-gray-500">
                (base: {build.scoreCaracteristiques.base[stat]})
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Progression Niveau 1→12 */}
      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">Progression (Niveau 1 → 12)</h2>
        <div className="space-y-3">
          {build.progression.map((level) => (
            <div key={level.level} className="bg-surface-raised rounded-card border border-border p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded bg-gold/10 border border-gold/30 flex items-center justify-center text-sm font-display text-gold">
                  {level.level}
                </span>
                <div>
                  <p className="text-sm font-data font-medium text-gray-200">
                    {level.classe}
                    {level.sousClasse && <span className="text-gold-muted"> — {level.sousClasse}</span>}
                  </p>
                  {level.don && <p className="text-xs font-data text-rarity-legendary">Don : {level.don}</p>}
                </div>
              </div>
              <p className="text-xs font-body text-gray-400 leading-relaxed">{level.notes}</p>
              {level.capacites.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {level.capacites.map((cap) => (
                    <span key={cap} className="text-[10px] font-data px-2 py-0.5 rounded bg-abyss-200 text-gray-400 border border-border/50">
                      {cap}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Équipement par Acte */}
      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">Équipement par Acte</h2>
        <div className="space-y-4">
          {build.equipement.map((equip) => (
            <div key={equip.acte}>
              <h3 className="font-display text-sm text-gold-muted mb-2">{equip.label}</h3>
              <div className="space-y-2">
                {equip.items.map((item) => (
                  <div key={item.itemId} className="bg-surface-raised rounded border border-border p-3 flex items-start gap-3">
                    <span className="text-xs font-data text-gray-500 uppercase tracking-wider w-28 shrink-0">{item.emplacement}</span>
                    <div>
                      <p className="text-sm font-data text-gold">{item.nom}</p>
                      <p className="text-xs font-body text-gray-400 mt-0.5">{item.raison}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Failsafes */}
      <section>
        <h2 className="font-display text-xl text-blood-light mb-4 border-b border-blood/30 pb-2">Chaînes de Failsafe</h2>
        <p className="text-xs font-data text-gray-500 mb-4">
          Si un objet Best-in-Slot est inaccessible (boss non vaincu, PNJ mort), le système redirige automatiquement vers le meilleur remplacement disponible.
        </p>
        <div className="space-y-3">
          {build.failsafes.map((fs) => (
            <div key={fs.id} className="bg-surface-raised rounded-card border border-border p-4 space-y-2">
              <p className="text-xs font-data text-gray-500 uppercase tracking-wider">{fs.emplacement}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-data px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20">1. {fs.prioritaire}</span>
                <span className="text-gray-500">→</span>
                <span className="text-xs font-data px-2 py-0.5 rounded bg-abyss-200 text-gray-300 border border-border">2. {fs.fallback}</span>
                <span className="text-gray-500">→</span>
                <span className="text-xs font-data px-2 py-0.5 rounded bg-abyss-300 text-gray-400 border border-border/50">3. {fs.fallbackUltime}</span>
              </div>
              <p className="text-[10px] font-data text-gray-500 italic">Condition prioritaire : {fs.condition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cycle de Combat */}
      <section>
        <h2 className="font-display text-xl text-gold mb-4 border-b border-border pb-2">Cycle de Combat Optimal</h2>
        <div className="bg-surface-raised rounded-card border border-border p-5 space-y-2">
          {build.cycleCombat.map((step, i) => (
            <div key={i} className="flex items-start gap-3 py-1">
              <span className="text-sm font-body text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Conseils Mode Honneur */}
      <section>
        <h2 className="font-display text-xl text-blood-light mb-4 border-b border-blood/30 pb-2">Conseils Mode Honneur</h2>
        <div className="space-y-2">
          {build.conseilsModeHonneur.map((conseil, i) => (
            <div key={i} className="flex items-start gap-3 bg-blood-dark/10 rounded border border-blood/20 p-3">
              <span className="text-blood-light font-display text-sm shrink-0">!</span>
              <p className="text-xs font-body text-gray-300 leading-relaxed">{conseil}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
