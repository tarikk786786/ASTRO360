/**
 * ASTRO360 MARKETING BRAIN - Marketing Knowledge Base & Brand Guardrails
 * Canonical rules, forbidden claims, approved value propositions & positioning intelligence.
 */

export interface BrandRule {
  id: string;
  category: 'POSITIONING' | 'CLAIM_GUARDRAIL' | 'TONE' | 'COMPETITOR_DIFFERENTIATION';
  rule: string;
  allowedExamples: string[];
  forbiddenExamples: string[];
  rationale: string;
}

export const MARKETING_BRAND_RULES: BrandRule[] = [
  {
    id: 'rule_no_absolute_accuracy_claims',
    category: 'CLAIM_GUARDRAIL',
    rule: 'Never make unscientific claims of guaranteed predictions or 100% predictive accuracy.',
    allowedExamples: [
      'High-precision astronomical ephemeris calculations based on JPL & Swiss Ephemeris algorithms',
      'Multi-tradition consensus analysis comparing Vedic, Western & Hellenistic models',
      'Explainable astrological timing derived from classical scripture rules'
    ],
    forbiddenExamples: [
      '100% accurate future predictions',
      'Scientifically proven destiny',
      'Guaranteed lottery or wealth forecast',
      'Magic life-changing results'
    ],
    rationale: 'ASTRO360 is an engineering-grade computational platform. Transparency and epistemic integrity are core brand trust anchors.'
  },
  {
    id: 'rule_privacy_first',
    category: 'CLAIM_GUARDRAIL',
    rule: 'Prominently emphasize client-side privacy and zero selling of personal birth data.',
    allowedExamples: [
      'Client-side encrypted calculations',
      'Zero ads and zero selling of personal birth coordinates',
      'Saved permanently to your browser localStorage with full export & delete control'
    ],
    forbiddenExamples: [
      'We track everything you do',
      'Sell user profile data to ad brokers'
    ],
    rationale: 'User trust in astrology software is directly proportional to data privacy and respect.'
  },
  {
    id: 'rule_multi_tradition_differentiation',
    category: 'COMPETITOR_DIFFERENTIATION',
    rule: 'Highlight ASTRO360\'s unique multi-tradition convergence over single-system silos.',
    allowedExamples: [
      'Compare Vedic Sidereal, Western Tropical, Hellenistic & Chinese BaZi side-by-side',
      'Unified astronomical dataset powering 152+ specialized calculation tools'
    ],
    forbiddenExamples: [
      'Only Vedic is correct',
      'Western astrology is fake'
    ],
    rationale: 'Respect all classical systems; let mathematical comparison provide objective insight.'
  }
];

export const COMPETITOR_BENCHMARKS = [
  {
    name: 'Astrodienst (astro.com)',
    strength: 'High calculation precision, deep classical legacy',
    weakness: 'Dated 1990s web interface, complex navigation, steep learning curve',
    astro360Advantage: 'Modern reactive glass UI, real-time AI explainability, 1-click modern tools, instant interactive charts'
  },
  {
    name: 'Co-Star / Sanctuary',
    strength: 'Strong social brand, aesthetic mobile typography',
    weakness: 'Vague AI-generated horoscope prose, zero computational transparency, single Western system only',
    astro360Advantage: 'Deterministic multi-tradition AstroCore ephemeris, explicit classical scripture citations, 152+ deep studio tools'
  },
  {
    name: 'AstroSage / Vedic Kundli Apps',
    strength: 'Comprehensive Vedic charts and doshas',
    weakness: 'Overwhelming ads, spam notifications, fear-based remedies, no Western/Hellenistic support',
    astro360Advantage: 'Zero spam ads, modern UX, multi-tradition consensus, constructive psychological & classical guidance'
  }
];
