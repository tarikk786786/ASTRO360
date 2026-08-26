---
name: premium-frontend
description: Production-grade React, TypeScript, Tailwind, and Design System engineering standards for ASTRO360.
---

# Premium Frontend Engineering Standards

## Principles
1. **Human & Authentic Aesthetic**: Avoid generic AI gradients, neon overuse, or template-like card farms. Utilize refined typography (`Cormorant Garamond`, `Playfair Display`, `Inter`), deep midnight obsidian backgrounds (`#060A12`, `#090D16`), and subtle gold/cyan celestial accents (`amber-400`, `cyan-400`).
2. **Type Safety**: Enforce strict TypeScript types for all components, props, state, and API models. Zero `any` usage.
3. **Component Architecture**:
   - Reusable modular UI primitives (`src/components/ui/`).
   - Clean separation of presentation from mathematical/business logic.
   - Dynamic code-splitting for heavy suites using `React.lazy()` and `<Suspense>`.
4. **Accessibility (WCAG AA)**:
   - High color contrast ratios.
   - Proper form element associations (`id`, `htmlFor`, `aria-label`).
   - Keyboard navigable menus, dialogs, and tabs with visible focus rings.
