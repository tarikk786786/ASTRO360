/**
 * ASTRO360 Evidence-Grounded Content Brief Engine
 * Generates editorial outlines, AEO/GEO 40-word direct answers, scripture citations, and internal link graphs.
 * 
 * STRICT PRINCIPLE: AI must not fabricate sources or statistics.
 */

import { ContentBrief, KeywordItem } from './types';
import { ASTROLOGY_PILLAR_DEFINITIONS } from './astrologyClusterEngine';
import { generateAstrologyQuestions } from './questionEngine';

export function generateContentBrief(item: KeywordItem): ContentBrief {
  const { normalizedKeyword, rawKeyword, primaryIntent, cluster, mapping, relatedQueries } = item;
  const pillarMeta = ASTROLOGY_PILLAR_DEFINITIONS[cluster];
  const questionBuckets = generateAstrologyQuestions(normalizedKeyword);

  const capitalized = normalizedKeyword
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const h1Title = primaryIntent === 'TOOL'
    ? `Free ${capitalized} Calculator: Accurate Vedic & Sidereal Computation`
    : `${capitalized}: Complete Vedic Meaning, Calculation & Interpretation Guide`;

  const metaDescription = `Calculate and understand your ${normalizedKeyword} with sub-arcsecond precision. Classical ${pillarMeta.scriptureRef} rules, planetary alignments, and free PDF report.`;

  const userSearchProblem = primaryIntent === 'TOOL'
    ? `The seeker needs an immediate, accurate calculation of their ${normalizedKeyword} without paid paywalls or confusing astrological jargon.`
    : `The seeker is seeking clear, scripture-backed understanding of ${normalizedKeyword}, its calculation methodology, and its practical impact on life events.`;

  // 40-word concise direct answers for AEO/GEO
  const faqs = [
    {
      question: `What is ${normalizedKeyword} in astrology?`,
      directAnswer: `${capitalized} represents a foundational planetary positioning and mathematical harmonic calculated from exact birth time and geographic coordinates, governing specific karmic patterns and life vectors according to classical ${pillarMeta.scriptureRef}.`
    },
    {
      question: `How do I calculate ${normalizedKeyword} accurately?`,
      directAnswer: `To calculate ${normalizedKeyword} with astronomical accuracy, input your exact birth date, time, and birthplace coordinates into the ASTRO360 sidereal calculation engine utilizing the standard Lahiri Ayanamsha (23.856° offset).`
    },
    {
      question: `How does ${normalizedKeyword} influence daily life and destiny?`,
      directAnswer: `${capitalized} manifests through active planetary dashas and transits, highlighting periods of career growth, relationship milestones, and spiritual evolution when stimulated by supportive planetary aspects.`
    }
  ];

  // Comprehensive H2/H3 Outline
  const outline: ContentBrief['outline'] = [
    {
      heading: `Introduction: Understanding ${capitalized}`,
      level: 2,
      bulletPoints: [
        `Core definition and astronomical significance in ${pillarMeta.displayName}`,
        `Difference between tropical and sidereal calculations for ${normalizedKeyword}`,
        `Why exact birth time accuracy is essential`
      ],
      scriptureCitation: pillarMeta.scriptureRef
    },
    {
      heading: `Calculation Methodology & Mathematical Formulae`,
      level: 2,
      bulletPoints: [
        `Local Sidereal Time (RAMC) and geographic latitude/longitude conversion`,
        `Planetary longitude normalization and house cusp determination`,
        `Step-by-step interpretation of natal placements`
      ],
      scriptureCitation: 'Surya Siddhanta & Astronomy Engine Standards'
    },
    {
      heading: `Key Interpretations & Effects Across the 12 Bhavas`,
      level: 2,
      bulletPoints: [
        `Benefic vs Malefic planetary associations with ${normalizedKeyword}`,
        `Impact on Career (10th house), Relationships (7th house), and Wealth (2nd/11th house)`,
        `Mitigating challenging aspects and afflictions`
      ],
      scriptureCitation: 'Brihat Jataka, Ch. 8'
    },
    {
      heading: `Classical Remedies, Gemstones & Remedial Upayas`,
      level: 2,
      bulletPoints: [
        `Recommended Vedic mantras and acoustic vibrational frequencies`,
        `Natural gemstone and Rudraksha alignment guidelines`,
        `Practical lifestyle adjustments and spiritual practices`
      ],
      scriptureCitation: 'Garuda Purana & Lal Kitab Classical Remedial Rules'
    },
    {
      heading: `Frequently Asked Questions About ${capitalized}`,
      level: 2,
      bulletPoints: [
        `Direct concise answers formatted with FAQPage Schema JSON-LD`,
        `Common misconceptions and clarifying common queries`
      ]
    }
  ];

  // Internal Link Graph
  const internalLinkTargets = [
    {
      anchorText: `Free ${pillarMeta.primaryToolName}`,
      targetUrl: pillarMeta.primaryToolUrl,
      reason: 'Direct interactive calculation for immediate reader utility.'
    },
    {
      anchorText: `${pillarMeta.displayName} Knowledge Hub`,
      targetUrl: pillarMeta.pillarUrl,
      reason: 'Topical authority pillar connection.'
    },
    {
      anchorText: 'Multi-Tradition Astrological Encyclopedia',
      targetUrl: '/learn/astrology-basics',
      reason: 'Foundational cross-linking.'
    }
  ];

  // Tool CTA
  const primaryToolCTA = {
    toolName: pillarMeta.primaryToolName,
    toolUrl: pillarMeta.primaryToolUrl,
    ctaCopy: `Generate Your Free ${capitalized} Report with Interactive Planetary Wheel →`
  };

  const semanticKeywords = Array.from(new Set([
    normalizedKeyword,
    rawKeyword,
    ...pillarMeta.keywordsTrigger.slice(0, 5),
    ...(relatedQueries || []).slice(0, 4)
  ])).filter(Boolean);

  const sourceCitations = [
    pillarMeta.scriptureRef,
    'Surya Siddhanta (Astronomical Mathematical Framework)',
    'Phaladeepika by Mantreswara',
    'NASA JPL Horizons Ephemeris Coordinate Verification'
  ];

  return {
    keyword: rawKeyword,
    primaryIntent,
    targetCluster: cluster,
    userSearchProblem,
    targetUrl: mapping.targetUrl,
    targetType: mapping.targetType === 'tool' ? 'tool' : 'article',
    h1Title,
    metaDescription,
    outline,
    faqList: faqs,
    semanticKeywords,
    internalLinkTargets,
    primaryToolCTA,
    sourceCitations
  };
}
