const svgToDataUri = require("mini-svg-data-uri");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Light Mode
        light: {
          background: "#FFFFFF",
          foreground: "#000000",
          card: "#F9FAFB",
          border: "#E5E7EB",
          accent: "#6B46C1",
          accentForeground: "#FFFFFF",
          primary: "#DFF6FB",
          secondary: "#FFFFFF",
        },
        // Dark Mode
        dark: {
          background: "#0D0D0D",
          foreground: "#F3F4F6",
          card: "#1A1A1A",
          border: "#27272A",
          accent: "#A855F7",
          accentForeground: "#0D0D0D",
          primary: "#1A1A1A",
          secondary: "#0D0D0D",
        },

        // General tokens (for Tailwind usage)
        background: "#FFFFFF",
        foreground: "#000000",
        card: "#F9FAFB",
        border: "#E5E7EB",
        accent: "#6B46C1",
        accentForeground: "#FFFFFF",
        primary: "#DFF6FB",
        secondary: "#FFFFFF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" cx="10" cy="10" r="1.6"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": {
      "--background": "#FFFFFF",
      "--foreground": "#000000",
      "--card": "#F9FAFB",
      "--border": "#E5E7EB",
      "--accent": "#6B46C1",
      "--accent-foreground": "#FFFFFF",
      "--primary": "#DFF6FB",
      "--secondary": "#FFFFFF",
    },
    ".dark": {
      "--background": "#0D0D0D",
      "--foreground": "#F3F4F6",
      "--card": "#1A1A1A",
      "--border": "#27272A",
      "--accent": "#A855F7",
      "--accent-foreground": "#0D0D0D",
      "--primary": "#1A1A1A",
      "--secondary": "#0D0D0D",
    },
  });
}
