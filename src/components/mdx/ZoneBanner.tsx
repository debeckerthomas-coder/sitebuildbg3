// ============================================================================
// ZoneBanner — Full-width zone separator for walkthrough MDX content
// Usage: <ZoneBanner title="Le Bosquet d'Émeraude" subtitle="Sanctuaire des Druides" />
// Usage with image: <ZoneBanner title="..." image="/assets/banners/emerald-grove.webp" />
// ============================================================================

interface ZoneBannerProps {
  readonly title: string;
  readonly subtitle?: string;
  /** Optional background image URL for immersive banner */
  readonly image?: string;
}

/** Zone-to-default-image mapping for immersive banners */
const ZONE_IMAGES: Record<string, string> = {
  "Le Bosquet d'Émeraude": "/assets/banners/emerald-grove.webp",
  "The Emerald Grove": "/assets/banners/emerald-grove.webp",
  "Le Camp Gobelin": "/assets/banners/goblin-camp.webp",
  "Goblin Camp": "/assets/banners/goblin-camp.webp",
  "La Grymforge": "/assets/banners/grymforge.webp",
  "Grymforge": "/assets/banners/grymforge.webp",
  "Tours de Hautelune": "/assets/banners/moonrise-towers.webp",
  "Moonrise Towers": "/assets/banners/moonrise-towers.webp",
  "La Porte de Baldur": "/assets/banners/baldurs-gate.webp",
  "Baldur's Gate": "/assets/banners/baldurs-gate.webp",
};

export function ZoneBanner({ title, subtitle, image }: ZoneBannerProps) {
  const bgImage = image ?? ZONE_IMAGES[title];

  return (
    <div
      className="relative border-y border-gold/50 py-8 my-10 -mx-4 px-4 text-center overflow-hidden bg-black/80"
    >
      {/* Background image layer */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay — guarantees text readability over any image */}
      {bgImage && (
        <div className="absolute inset-0 bg-[#111520]/70" aria-hidden="true" />
      )}

      {/* Decorative gold line accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent z-10" />

      <h2 className="relative z-10 font-heading text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.2em] text-gradient-gold m-0 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="relative z-10 mt-2 text-sm font-data uppercase tracking-[0.3em] text-gold/50">
          {subtitle}
        </p>
      )}
    </div>
  );
}
