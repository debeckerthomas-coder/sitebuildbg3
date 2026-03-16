// ============================================================================
// ZoneBanner — Full-width zone separator for walkthrough MDX content
// Usage: <ZoneBanner title="Le Bosquet d'Émeraude" subtitle="Sanctuaire des Druides" />
// ============================================================================

interface ZoneBannerProps {
  readonly title: string;
  readonly subtitle?: string;
}

export function ZoneBanner({ title, subtitle }: ZoneBannerProps) {
  return (
    <div className="relative bg-black/80 border-y border-gold/50 py-8 my-10 -mx-4 px-4 text-center">
      {/* Decorative gold line accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.2em] text-gradient-gold m-0 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm font-data uppercase tracking-[0.3em] text-gold/50">
          {subtitle}
        </p>
      )}
    </div>
  );
}
