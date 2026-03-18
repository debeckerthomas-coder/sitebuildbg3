// ============================================================================
// Build Theme Dictionary — Interface Caméléon
// Maps build IDs to accent colors (HSL for Tailwind opacity modifiers)
// ============================================================================

export interface BuildTheme {
  /** CSS color value for --theme-color */
  readonly color: string;
  /** Lighter variant for --theme-color-light */
  readonly light: string;
  /** Darker variant for --theme-color-dark */
  readonly dark: string;
  /** Muted variant for --theme-color-muted */
  readonly muted: string;
}

/** Default gold theme (no build selected) */
const GOLD_THEME: BuildTheme = {
  color: "#d4af37",
  light: "#e8cc6e",
  dark: "#9b7e1e",
  muted: "#7a6530",
};

const BUILD_THEMES: Record<string, BuildTheme> = {
  // Lockadin — Blood Red
  lockadin: {
    color: "#dc2626",
    light: "#f87171",
    dark: "#991b1b",
    muted: "#7f1d1d",
  },
  // Storm Sorcerer — Electric Blue
  storm_sorcerer: {
    color: "#2563eb",
    light: "#60a5fa",
    dark: "#1d4ed8",
    muted: "#1e3a5f",
  },
  // Throwzerker — Barbarian Orange
  throwzerker: {
    color: "#ea580c",
    light: "#fb923c",
    dark: "#c2410c",
    muted: "#7c2d12",
  },
  // Barde Contrôleur — Royal Purple
  barde_controleur: {
    color: "#9333ea",
    light: "#c084fc",
    dark: "#7e22ce",
    muted: "#581c87",
  },
  // Moine Bagarreur — Jade Green
  moine_bagarreur: {
    color: "#059669",
    light: "#34d399",
    dark: "#047857",
    muted: "#064e3b",
  },
  // Clerc Lumière — Holy Gold-White
  clerc_lumiere: {
    color: "#eab308",
    light: "#fde047",
    dark: "#a16207",
    muted: "#713f12",
  },
  // Gloom Assassin — Shadow Violet
  gloom_assassin: {
    color: "#7c3aed",
    light: "#a78bfa",
    dark: "#6d28d9",
    muted: "#4c1d95",
  },
  // Sorcadin — Infernal Crimson
  sorcadin: {
    color: "#be123c",
    light: "#fb7185",
    dark: "#9f1239",
    muted: "#881337",
  },
};

/** Get theme for a build ID, falling back to gold */
export function getBuildTheme(buildId: string | null): BuildTheme {
  if (!buildId) return GOLD_THEME;
  return BUILD_THEMES[buildId] ?? GOLD_THEME;
}

/** Apply theme CSS variables to the document root */
export function applyThemeToDocument(buildId: string | null): void {
  const theme = getBuildTheme(buildId);
  const root = document.documentElement;
  root.style.setProperty("--theme-color", theme.color);
  root.style.setProperty("--theme-color-light", theme.light);
  root.style.setProperty("--theme-color-dark", theme.dark);
  root.style.setProperty("--theme-color-muted", theme.muted);
}
