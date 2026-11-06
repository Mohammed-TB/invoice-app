/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Base
        background: "#F8FAFC",
        foreground: "#0F172A",

        // Card
        card: "#FFFFFF",
        "card-foreground": "#0F172A",

        // Primary
        primary: "#2563EB",
        "primary-foreground": "#FFFFFF",

        // Secondary
        secondary: "#F1F5F9",
        "secondary-foreground": "#0F172A",

        // Muted
        muted: "#E2E8F0",
        "muted-foreground": "#64748B",

        // Accent
        accent: "#DBEAFE",
        "accent-foreground": "#1E3A8A",

        // Status
        success: "#16A34A",
        warning: "#F59E0B",
        destructive: "#DC2626",

        // Border
        border: "#E2E8F0",
        input: "#CBD5E1",
        ring: "#2563EB",
      },

      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        full: "9999px",
      },

      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};

