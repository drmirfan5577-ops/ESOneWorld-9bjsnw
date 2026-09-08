import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
      colors: {
        brand: {
          emerald: "#00C896",
          crimson: "#E8003D",
          gold: "#FFB800",
          pearl: "#F8FAFF",
          crystal: "#EEF4FF",
          glass: "rgba(255,255,255,0.72)",
        },
        glass: {
          white: "rgba(255,255,255,0.85)",
          emerald: "rgba(0,200,150,0.15)",
          crimson: "rgba(232,0,61,0.12)",
          gold: "rgba(255,184,0,0.15)",
          blue: "rgba(100,180,255,0.15)",
        },
      },
      backgroundImage: {
        "crystal-white": "linear-gradient(135deg, #ffffff 0%, #f0f8ff 30%, #e8f4ff 60%, #f5f0ff 100%)",
        "emerald-glass": "linear-gradient(135deg, #e0fff5 0%, #b2ffe8 40%, #d4f7ef 70%, #ffffff 100%)",
        "crimson-glass": "linear-gradient(135deg, #fff0f3 0%, #ffd6de 40%, #ffe8ec 70%, #ffffff 100%)",
        "arctic-ice": "linear-gradient(135deg, #e8f4ff 0%, #c8e8ff 40%, #d8f0ff 70%, #f0faff 100%)",
        "holographic": "linear-gradient(135deg, #f0e8ff 0%, #e8f0ff 25%, #e8fff4 50%, #fff4e8 75%, #ffe8f0 100%)",
        "golden-dawn": "linear-gradient(135deg, #fffbe8 0%, #fff0b2 40%, #fff5cc 70%, #ffffff 100%)",
        "nebula-space": "linear-gradient(135deg, #f0e8ff 0%, #e0d0ff 40%, #ece8ff 70%, #f8f4ff 100%)",
        "tube-glow": "linear-gradient(90deg, transparent, rgba(0,200,150,0.3), transparent)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        "glass-lg": "0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.95)",
        glow: "0 0 20px rgba(0,200,150,0.4), 0 0 40px rgba(0,200,150,0.2)",
        "glow-crimson": "0 0 20px rgba(232,0,61,0.4), 0 0 40px rgba(232,0,61,0.2)",
        "glow-gold": "0 0 20px rgba(255,184,0,0.5), 0 0 40px rgba(255,184,0,0.25)",
        "inner-glass": "inset 0 2px 8px rgba(255,255,255,0.8), inset 0 -1px 4px rgba(0,0,0,0.04)",
        tube: "0 0 8px currentColor, 0 0 16px currentColor, 0 0 32px currentColor",
      },
      animation: {
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "tube-flow": "tubeFlow 3s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "ticker": "ticker 20s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "breathe": "breathe 3s ease-in-out infinite",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "fade-up": "fadeUp 0.4s ease-out",
        "pulse-ring": "pulseRing 2s ease-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.8", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.2)" },
        },
        tubeFlow: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        ticker: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
