/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070B14",
          900: "#0B1220",
          850: "#0F1729",
          800: "#121C2C",
          700: "#1A2740",
          600: "#243047",
        },
        accent: {
          DEFAULT: "#8B9CF8",
          soft: "#A5B4FC",
          muted: "rgba(139, 156, 248, 0.16)",
          ring: "rgba(139, 156, 248, 0.35)",
        },
        ink: {
          primary: "#F4F6FB",
          secondary: "#A7B0C3",
          muted: "#6B7589",
        },
        line: "rgba(255,255,255,0.08)",
        lineStrong: "rgba(255,255,255,0.12)",
        danger: "#F87171",
      },
      borderRadius: {
        "4xl": "1.75rem",
        "5xl": "2.25rem",
      },
      fontSize: {
        display: ["2rem", { lineHeight: "2.375rem", fontWeight: "700" }],
        title: ["1.25rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        subtitle: ["1.0625rem", { lineHeight: "1.35rem", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.375rem" }],
        caption: ["0.8125rem", { lineHeight: "1.125rem" }],
      },
    },
  },
  plugins: [],
};
