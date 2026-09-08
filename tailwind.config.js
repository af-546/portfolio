/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        ink: "#0a0a0a",
        paper: "#f3eee4",
        gold: {
          DEFAULT: "#e8c547",
          dim: "#b4922f",
          flare: "#ffe38a",
        },
        signal: "#ff4d2e",
        aqua: "#7af0c6",
        mist: "#9c9588",
      },
      fontFamily: {
        display: ['"Unbounded"', "system-ui", "sans-serif"],
        body: ['"Manrope"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        marqueeReverse: "marqueeReverse 42s linear infinite",
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        spinSlow: "spin 28s linear infinite",
        flicker: "flicker 4s steps(2) infinite",
        scan: "scan 6s linear infinite",
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
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        flicker: {
          "0%, 19%, 21%, 100%": { opacity: "1" },
          "20%": { opacity: "0.72" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      boxShadow: {
        gold: "0 0 40px rgba(232, 197, 71, 0.18)",
        signal: "0 0 30px rgba(255, 77, 46, 0.28)",
      },
    },
  },
  plugins: [],
};
