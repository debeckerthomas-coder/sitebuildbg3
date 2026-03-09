import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ----------------------------------------------------------------
      // BG3 Dark Fantasy Color Palette
      // ----------------------------------------------------------------
      colors: {
        // Primary background tones
        abyss: {
          DEFAULT: "#0a0a0f",
          50: "#16161f",
          100: "#1c1c28",
          200: "#252535",
          300: "#2e2e42",
        },
        // Gold accent (BG3 signature)
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e4cc7a",
          dark: "#8b6914",
          muted: "#7a6530",
        },
        // Blood red for danger / Honor Mode
        blood: {
          DEFAULT: "#8b1a1a",
          light: "#c43c3c",
          dark: "#5c0e0e",
          glow: "#ff3333",
        },
        // Rarity colors (exact BG3 match)
        rarity: {
          common: "#9d9d9d",
          uncommon: "#3fbf3f",
          rare: "#4d94ff",
          very_rare: "#b366ff",
          legendary: "#ff8c00",
        },
        // Damage type accent colors
        dmg: {
          fire: "#ff6633",
          cold: "#66ccff",
          lightning: "#ffdd44",
          thunder: "#9966cc",
          acid: "#66ff66",
          poison: "#33cc33",
          necrotic: "#88cc88",
          radiant: "#ffffaa",
          force: "#cc66ff",
          psychic: "#ff66cc",
          bludgeoning: "#cccccc",
          piercing: "#cccccc",
          slashing: "#cccccc",
        },
        // UI semantic
        surface: {
          DEFAULT: "#12121a",
          raised: "#1a1a26",
          overlay: "#22222e",
        },
        border: {
          DEFAULT: "#2a2a3a",
          hover: "#3a3a52",
          active: "#c9a84c",
        },
      },

      // ----------------------------------------------------------------
      // Typography — Dark Fantasy + Data-Dense
      // ----------------------------------------------------------------
      fontFamily: {
        display: ["Cinzel", "serif"],         // Titles, boss names
        body: ["Lora", "serif"],              // Narrative text
        data: ["Inter", "sans-serif"],        // Stats, numbers, UI
        mono: ["JetBrains Mono", "monospace"],// Code, dice notation
      },

      // ----------------------------------------------------------------
      // Custom Animations
      // ----------------------------------------------------------------
      keyframes: {
        "pulse-danger": {
          "0%, 100%": {
            borderColor: "#8b1a1a",
            boxShadow: "0 0 8px 0 rgba(139, 26, 26, 0.3)",
          },
          "50%": {
            borderColor: "#c43c3c",
            boxShadow: "0 0 20px 4px rgba(196, 60, 60, 0.5)",
          },
        },
        "glow-rarity": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "checkmark-strike": {
          "0%": { width: "0%", opacity: "0" },
          "100%": { width: "100%", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "progress-fill": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "pulse-danger": "pulse-danger 2s ease-in-out infinite",
        "glow-rarity": "glow-rarity 3s ease-in-out infinite",
        "checkmark-strike": "checkmark-strike 0.4s ease-out forwards",
        "fade-in-up": "fade-in-up 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "progress-fill": "progress-fill 0.8s ease-out forwards",
      },

      // ----------------------------------------------------------------
      // Spacing & Sizing
      // ----------------------------------------------------------------
      borderRadius: {
        card: "0.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
