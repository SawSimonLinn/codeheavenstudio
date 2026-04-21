import type { Config } from "tailwindcss";
import {
  ADMIN_BG, ADMIN_SURFACE, ADMIN_SURFACE_ALT, ADMIN_SURFACE2,
  ADMIN_CARD, ADMIN_INPUT, ADMIN_BADGE_BG, ADMIN_LOGO_BG,
  ADMIN_BTN, ADMIN_BTN_HOVER, ADMIN_NAV_HOVER, ADMIN_ROW_HOVER,
  ADMIN_SKELETON, ADMIN_SKELETON2,
  ADMIN_BORDER, ADMIN_BORDER_SOFT, ADMIN_BORDER_CARD,
  ADMIN_BORDER_BRIGHT, ADMIN_BORDER_NAV_HOVER, ADMIN_BORDER_HERO,
  ADMIN_TEXT, ADMIN_TEXT_BRIGHT, ADMIN_HIGHLIGHT,
  ADMIN_BTN_TEXT, ADMIN_BTN_TEXT_ALT, ADMIN_ICON_HOVER, ADMIN_LINK_HOVER,
  ADMIN_LABEL, ADMIN_SECONDARY, ADMIN_MID_TEXT, ADMIN_DESCRIPTION,
  ADMIN_OVERVIEW_LABEL, ADMIN_MUTED, ADMIN_LINK, ADMIN_LINK2,
  ADMIN_ICON, ADMIN_DIM, ADMIN_DIM_ICON, ADMIN_EMPTY_ICON, ADMIN_PLACEHOLDER,
  ADMIN_ACCENT_TEXT, ADMIN_ACCENT_TEXT_HOVER,
} from "./src/lib/colors";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
      fontFamily: {
        body: ["var(--font-inter)", "sans-serif"],
        headline: ["var(--font-inter)", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        admin: {
          bg:                ADMIN_BG,
          surface:           ADMIN_SURFACE,
          "surface-alt":     ADMIN_SURFACE_ALT,
          surface2:          ADMIN_SURFACE2,
          card:              ADMIN_CARD,
          input:             ADMIN_INPUT,
          "badge-bg":        ADMIN_BADGE_BG,
          "logo-bg":         ADMIN_LOGO_BG,
          btn:               ADMIN_BTN,
          "btn-hover":       ADMIN_BTN_HOVER,
          "nav-hover":       ADMIN_NAV_HOVER,
          "row-hover":       ADMIN_ROW_HOVER,
          skeleton:          ADMIN_SKELETON,
          skeleton2:         ADMIN_SKELETON2,
          border:            ADMIN_BORDER,
          "border-soft":     ADMIN_BORDER_SOFT,
          "border-card":     ADMIN_BORDER_CARD,
          "border-bright":   ADMIN_BORDER_BRIGHT,
          "border-nav-hover":ADMIN_BORDER_NAV_HOVER,
          "border-hero":     ADMIN_BORDER_HERO,
          text:              ADMIN_TEXT,
          "text-bright":     ADMIN_TEXT_BRIGHT,
          highlight:         ADMIN_HIGHLIGHT,
          "btn-text":        ADMIN_BTN_TEXT,
          "btn-text-alt":    ADMIN_BTN_TEXT_ALT,
          "icon-hover":      ADMIN_ICON_HOVER,
          "link-hover":      ADMIN_LINK_HOVER,
          label:             ADMIN_LABEL,
          secondary:         ADMIN_SECONDARY,
          "mid-text":        ADMIN_MID_TEXT,
          description:       ADMIN_DESCRIPTION,
          "overview-label":  ADMIN_OVERVIEW_LABEL,
          muted:             ADMIN_MUTED,
          link:              ADMIN_LINK,
          link2:             ADMIN_LINK2,
          icon:              ADMIN_ICON,
          dim:               ADMIN_DIM,
          "dim-icon":        ADMIN_DIM_ICON,
          "empty-icon":      ADMIN_EMPTY_ICON,
          placeholder:       ADMIN_PLACEHOLDER,
          "accent-text":     ADMIN_ACCENT_TEXT,
          "accent-text-hover": ADMIN_ACCENT_TEXT_HOVER,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 7s infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
