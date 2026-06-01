import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Jost", "sans-serif"],
        // v2 foundation
        display: ["GT Sectra", "Tiempos Headline", "Cormorant Garamond", "serif"],
        body: ["Inter Tight", "Söhne", "Jost", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      // v2 typography tokens
      fontSize: {
        "display-1": ["clamp(3.5rem, 7vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.75rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "h2-v2": ["clamp(2rem, 4vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "h3-v2": ["clamp(1.375rem, 2.5vw, 1.75rem)", { lineHeight: "1.3" }],
        "body-lg-v2": ["1.25rem", { lineHeight: "1.6" }],
        "body-v2": ["1.0625rem", { lineHeight: "1.65" }],
        "body-sm-v2": ["0.875rem", { lineHeight: "1.55" }],
        "mono-v2": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
        "eyebrow-v2": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
      },
      // v2 spacing (additive to existing)
      spacing: {
        "section-y": "clamp(6rem, 12vw, 8rem)",
        "section-y-tight": "clamp(4.5rem, 8vw, 6rem)",
      },
      maxWidth: {
        prose: "680px",
        "prose-narrow": "560px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ivory: "hsl(var(--ivory))",
        bone: "hsl(var(--bone))",
        dark: "hsl(var(--dark))",
        "dark-footer": "hsl(var(--dark-footer))",
        amber: "hsl(var(--amber))",
        "amber-light": "hsl(var(--amber-light))",
        matcha: "hsl(var(--matcha))",
        eclipse: "hsl(var(--eclipse))",
        almond: "hsl(var(--almond))",
        // v2 foundation palette
        "v2-paper": "var(--v2-paper)",
        "v2-paper-deep": "var(--v2-paper-deep)",
        "v2-paper-line": "var(--v2-paper-line)",
        "v2-ink": "var(--v2-ink)",
        "v2-ink-mute": "var(--v2-ink-mute)",
        "v2-sage": "var(--v2-sage)",
        "v2-sage-deep": "var(--v2-sage-deep)",
        "v2-moss": "var(--v2-moss)",
        "v2-terracotta": "var(--v2-terracotta)",
        "v2-terracotta-deep": "var(--v2-terracotta-deep)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
