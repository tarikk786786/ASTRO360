# ASTRO360 OMNI — UI/UX Design System & Theme Specification

## 1. Design Philosophy
ASTRO360 OMNI provides a state-of-the-art, human-crafted cosmic interface. It avoids generic AI UI cliches by adopting:
- **Palette Tailoring**: Midnight Slate (`#0B1220`, `#111827`), Electric Cyan (`#06B6D4`), Royal Blue (`#2563EB`), Radiant Gold (`#D4AF37`), Emerald Green (`#22C55E`), and Deep Purple (`#7C3AED`).
- **Typography Hierarchy**:
  - Headings & Titles: Clean Sans-Serif (`Inter`, `System-UI`) with explicit tracking (`tracking-tight`).
  - Technical Ephemeris & Astronomical Telemetry: `JetBrains Mono` / `ui-monospace` (`font-mono`).
- **Dark Mode (Default)**: Deep midnight starfield background with subtle particle animations, neon borders (`border-white/10`, `border-cyan-500/30`), and glassmorphism backdrops (`backdrop-blur-xl`).
- **Light Mode**: Warm neutral ivory background (`#F8FAFC`), crisp high-contrast cards (`#FFFFFF`), dark slate typography (`#0F172A`), and dark borders (`border-slate-200`).

---

## 2. Color System Tokens

```css
/* Color Tokens */
--color-bg-dark: #0B1220;
--color-card-dark: #111827;
--color-border-dark: rgba(255, 255, 255, 0.1);

--color-bg-light: #F8FAFC;
--color-card-light: #FFFFFF;
--color-border-light: #E2E8F0;

--color-accent-cyan: #06B6D4;
--color-accent-blue: #2563EB;
--color-accent-gold: #D4AF37;
--color-accent-emerald: #22C55E;
--color-accent-purple: #7C3AED;
```

---

## 3. Responsive Breakpoints & Mobile Touch Target Guidelines
- **320px–375px (Compact Mobile)**: Single-column stacked cards, 44px minimum touch targets, touch scroll horizontal overflow containers for ephemeris tables.
- **768px (Tablet)**: Dual-column grid layouts with collapsible sidebar drawer.
- **1024px+ (Desktop)**: Full enterprise dashboard with fixed 72-wide sidebar navigation, top bar controls, and multi-card BentoGrid layout.

---

## 4. Accessibility (WCAG 2.1 AA)
- All interactive buttons and inputs have high-contrast focus rings (`focus-ring` utility).
- SVG Birth Chart components feature tabular keyboard inspection alternatives.
- Screen readers receive explicit ARIA labels and live region announcements for real-time astronomical updates.
