---
name: mobile-ux
description: Mobile-first UX, responsive breakpoints, touch ergonomics, and safe area standards for ASTRO360.
---

# Mobile-First UX Engineering Standards

## Viewport Standards
Must be tested and flawless across all mobile viewport widths:
- **320px** (iPhone SE 1st gen / small devices)
- **360px – 375px** (Standard Android / iPhone Mini)
- **390px – 393px** (iPhone 12/13/14/15/16)
- **414px – 430px** (iPhone Plus / Pro Max / large Android)
- **768px – 1024px** (Tablets)
- **1280px+** (Desktop)

## Core Ergonomics
1. **Touch Targets**: Minimum $44\times 44\text{px}$, preferred $48\times 48\text{px}$ for all primary buttons, tab triggers, and navigation links.
2. **iOS Anti-Zoom**: Computed `font-size: 16px` minimum on all form inputs and selects to prevent unwanted auto-zooming on iOS Safari.
3. **Zero Horizontal Overflow**: Ensure `overflow-x: hidden` on viewport roots, with horizontal scrolling constrained to explicit snap rails (`overflow-x-auto snap-x mandatory scrollbar-none`).
4. **Thumb Zone Ergonomics**:
   - Place primary actions in bottom sticky docks (`sm:hidden fixed bottom-0 left-0 right-0`).
   - Floating quick-action buttons easily reachable with one hand.
5. **Passive Scroll Listeners**: Use `{ passive: true }` on all window scroll and touch event handlers to guarantee 60/120fps smooth scrolling.
