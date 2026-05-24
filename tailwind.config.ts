import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDFCF8",
        sage: "#E8EFE8",
        lavender: "#EFEDF4",
        coral: "#261091",
        dark: "#292524",
        muted: "#78716C",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        reenie: ["var(--font-reenie)", "cursive"],
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "reveal-scroll": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "reveal-scroll": "reveal-scroll 0.8s ease-out forwards",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
