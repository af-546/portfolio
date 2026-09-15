/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "rgb(var(--void-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        gold: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          dim: "rgb(var(--accent-dim-rgb) / <alpha-value>)",
          flare: "rgb(var(--accent-flare-rgb) / <alpha-value>)",
        },
        signal: "rgb(var(--signal-rgb) / <alpha-value>)",
        aqua: "rgb(var(--aqua-rgb) / <alpha-value>)",
        mist: "rgb(var(--mist-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Newsreader"', "Georgia", "serif"],
        body: ['"Manrope"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        marqueeReverse: "marqueeReverse 42s linear infinite",
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 3.2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.28" },
          "50%": { opacity: "0.85" },
        },
      },
      boxShadow: {
        gold: "0 18px 50px rgb(var(--accent-rgb) / 0.16)",
        signal: "0 0 30px rgb(var(--signal-rgb) / 0.24)",
      },
    },
  },
  plugins: [],
};
