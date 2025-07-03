/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "#1daa97",
        default: "#282A2F",
        "foreground-primary": "#202227",

        // Core Brand Palette
        lightseagreen: {
          50: "#f0fdfa", // Very light tint
          100: "#36c4b0", // Light
          200: "#1daa97", // Primary brand color
          300: "#0d9488", // Darker shade
        },

        // Status Colors (Bootstrap-compatible)
        success: "#28a745",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#007bff",

        // Background Colors
        background: {
          primary: "#ffffff",
          secondary: "#f8f9fa",
          muted: "#f1f5f9",
        },

        // Legacy colors (keep for backward compatibility, but organized)
        // TODO: Gradually migrate these to standard Tailwind grays
        whitesmoke: {
          100: "#f9f9f9", // ≈ gray-50
          200: "#f8f4f0", // Custom beige tint
          300: "#eeeeee", // ≈ gray-200
        },

        // Note: Removed redundant 'neutral' colors as they overlap with default 'gray'
        // Use standard Tailwind gray-50, gray-100, etc. instead
      },
      spacing: {},
      fontFamily: {
        "source-sans-pro": "'Source Sans Pro'",
        montserrat: "Montserrat",
        poppins: "Poppins",
        inter: "Inter",
        nunito: "Nunito",
        roboto: "Roboto",
        "roboto-condensed": "'Roboto Condensed'",
      },
      borderRadius: {
        // Keep Tailwind defaults and add meaningful extensions
        "4xl": "2rem", // 32px
        "5xl": "2.5rem", // 40px
        "6xl": "3rem", // 48px

        // Legacy custom radius (keep for backward compatibility)
        // TODO: Gradually migrate to standard naming
        "3xs": "10px",
        "10xs-6": "2.6px",
        "base-2": "16.2px",
        "10xs": "3px",
        "5xs-2": "7.2px",
        "31xl": "50px",
        "10xs-5": "2.5px",
        "23xl": "42px",
      },
    },
    fontSize: {
      // Standard Tailwind scale (keep defaults)
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px

      // Custom extensions (organized)
      "xs-sm": "0.8125rem", // 13px - between xs and sm
      "lg-xl": "1.1875rem", // 19px - between lg and xl

      // Large display sizes
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px

      // Keep only essential custom sizes
      inherit: "inherit",
    },
    screens: {
      // Standard Tailwind breakpoints (min-width)
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      // Legacy custom breakpoints (keep for backward compatibility)
      // TODO: Gradually migrate to standard breakpoints
      mq1325: {
        raw: "screen and (max-width: 1325px)",
      },
      mq1225: {
        raw: "screen and (max-width: 1225px)",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq1000: {
        raw: "screen and (max-width: 1000px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq725: {
        raw: "screen and (max-width: 725px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
