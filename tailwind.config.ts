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
      // Fond #111520, Or #d4af37, Rouge sang #8b0000
      // ----------------------------------------------------------------
      colors: {
        abyss: {
          DEFAULT: "#111520",
          50: "#171b29",
          100: "#1c2133",
          200: "#252b3d",
          300: "#2e354a",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#e8cc6e",
          dark: "#9b7e1e",
          muted: "#7a6530",
        },
        blood: {
          DEFAULT: "#8b0000",
          light: "#c43c3c",
          dark: "#5c0000",
          glow: "#ff3333",
        },
        rarity: {
          common: "#9d9d9d",
          uncommon: "#3fbf3f",
          rare: "#4d94ff",
          very_rare: "#b366ff",
          legendary: "#ff8c00",
        },
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
        surface: {
          DEFAULT: "#151a28",
          raised: "#1c2236",
          overlay: "#242a3e",
        },
        border: {
          DEFAULT: "#2a3048",
          hover: "#3a4262",
          active: "#d4af37",
        },
      },

      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Lora", "serif"],
        data: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      keyframes: {
        "pulse-danger": {
          "0%, 100%": {
            borderColor: "#8b0000",
            boxShadow: "0 0 8px 0 rgba(139, 0, 0, 0.3)",
          },
          "50%": {
            borderColor: "#c43c3c",
            boxShadow: "0 0 20px 4px rgba(196, 60, 60, 0.5)",
          },
        },
        "pulse-warning": {
          "0%, 100%": {
            borderColor: "rgba(234, 179, 8, 0.5)",
            boxShadow: "0 0 8px 0 rgba(234, 179, 8, 0.2)",
          },
          "50%": {
            borderColor: "rgba(250, 204, 21, 0.7)",
            boxShadow: "0 0 16px 2px rgba(250, 204, 21, 0.35)",
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
        "pulse-warning": "pulse-warning 2.5s ease-in-out infinite",
        "glow-rarity": "glow-rarity 3s ease-in-out infinite",
        "checkmark-strike": "checkmark-strike 0.4s ease-out forwards",
        "fade-in-up": "fade-in-up 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "progress-fill": "progress-fill 0.8s ease-out forwards",
      },

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
