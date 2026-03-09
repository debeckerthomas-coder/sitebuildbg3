export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="font-display text-4xl sm:text-5xl text-gold tracking-wide">
          BG3 Honor Companion
        </h1>
        <p className="font-body text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate Baldur&apos;s Gate 3 Honor Mode companion. God-tier builds,
          interactive walkthroughs, failsafe equipment chains, and combat
          simulations — everything you need to survive your Honor run.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <a
          href="/walkthrough/act3-walkthrough"
          className="group rounded-card border border-border bg-surface-raised p-6 hover:border-gold/40 transition-all duration-200"
        >
          <div className="text-2xl mb-2">📜</div>
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">
            Walkthroughs
          </h3>
          <p className="text-xs font-data text-gray-500 mt-1">
            Step-by-step guides with interactive checklists
          </p>
        </a>

        <a
          href="/dice"
          className="group rounded-card border border-border bg-surface-raised p-6 hover:border-gold/40 transition-all duration-200"
        >
          <div className="text-2xl mb-2">🎲</div>
          <h3 className="font-display text-sm text-gold group-hover:text-gold-light transition-colors">
            Dice Simulator
          </h3>
          <p className="text-xs font-data text-gray-500 mt-1">
            Roll with advantage, karmic dice, and exact probabilities
          </p>
        </a>

        <a
          href="/bosses/netherbrain"
          className="group rounded-card border border-border bg-surface-raised p-6 hover:border-blood/40 transition-all duration-200"
        >
          <div className="text-2xl mb-2">💀</div>
          <h3 className="font-display text-sm text-blood-light group-hover:text-blood-glow transition-colors">
            Boss Guides
          </h3>
          <p className="text-xs font-data text-gray-500 mt-1">
            Emergency matrices and lethal mechanic breakdowns
          </p>
        </a>
      </div>
    </div>
  );
}
