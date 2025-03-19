/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          100: "#DEEFB",
          200: "#C52F8",
          300: "#9CD0F4",
          400: "#6EB4EC",
          500: "#4C97E5",
          600: "#377CD9",
          700: "#2E67C7",
          800: "#284980",
          900: "#192845",
        },
        secondary: {
          100: "#F2FBFE",
          500: "#239AC4",
        }, // 그린(보조)

        accent: {
          200: "#FFD92C",
          300: "#F6B500",
          400: "#F6A818",
        }, // 옐로우(강조)

        muted: {
          100: "#f1f1f1",
          200: "#dddddd",
          300: "#aaaaaa",
          400: "#666666",
          500: "#444444",
          600: "#222222",
        }, // 그레이
      },
      fontFamily: {
        Pretendard: ["var(--font-pretendard)", "sans-serif"],
      },
      backgroundImage: {
        mainImage: "url('../assets/images/main.jpg')",
        landingImage: "url('..assets/images/explanationimg.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
