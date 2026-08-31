import { OpportunityScore, OpportunityTier, QualitySignals, ProspectType } from './types';

interface ScorerInput {
  quality: QualitySignals;
  sourceType: ProspectType;
  relevanceScore?: number;
  hasDirectContact?: boolean;
  isUnlinkedMention?: boolean;
}

/**
 * Calculates a transparent Opportunity Priority score (0 to 100).
 * Does NOT pretend to predict exact Google ranking algorithm weight.
 */
export function calculateOpportunityScore(input: ScorerInput): OpportunityScore {
  const factors: string[] = [];

  // 1. Relevance Dimension (0 to 25)
  let relevance = input.quality.topicalRelevance;
  if (input.relevanceScore !== undefined) {
    relevance = Math.min(25, Math.round((input.relevanceScore / 100) * 25));
  }
  if (relevance >= 20) factors.push('High topical alignment with ASTRO360 core pillars');

  // 2. Quality Dimension (0 to 25)
  let quality = input.quality.contentQuality;
  if (input.quality.sslValid && input.quality.indexability) {
    quality = Math.min(25, quality + 2);
  }
  if (input.quality.spamFlags.length > 0) {
    quality = Math.max(0, quality - input.quality.spamFlags.length * 6);
    factors.push(`Spam penalty applied (-${input.quality.spamFlags.length * 6}pts)`);
  } else {
    factors.push('Clean domain health with zero detected spam signals');
  }

  // 3. Editorial Fit (0 to 20)
  let editorialFit = 10;
  switch (input.sourceType) {
    case 'RESEARCH':
    case 'EDUCATION':
    case 'DATA_CITATION':
      editorialFit = 20;
      factors.push('Authoritative academic / research citation environment');
      break;
    case 'EDITORIAL':
    case 'DIGITAL_PR':
    case 'INDUSTRY_PUBLICATION':
      editorialFit = 18;
      factors.push('High-trust editorial publication environment');
      break;
    case 'RESOURCE_PAGE':
    case 'TOOL_LIST':
    case 'ROUNDUP':
      editorialFit = 15;
      factors.push('Curated resource hub with direct utility link context');
      break;
    case 'PODCAST':
    case 'INTERVIEW':
    case 'GUEST_CONTRIBUTION':
      editorialFit = 14;
      factors.push('Thought-leadership and founder interview opportunity');
      break;
    case 'DIRECTORY':
    case 'COMMUNITY':
    case 'LOCAL':
      editorialFit = 8;
      factors.push('Standard directory / community profile context');
      break;
    default:
      editorialFit = 10;
  }

  // 4. Traffic Signal (0 to 15) - Directional only
  let trafficSignal = 10;
  if (input.quality.domainHealth === 'HEALTHY' && input.quality.indexability) {
    trafficSignal = 12;
  }
  if (input.isUnlinkedMention) {
    trafficSignal = 15;
    factors.push('Existing brand awareness (unlinked mention ready for conversion)');
  }

  // 5. Effort & Risk (0 to 15)
  let effortRisk = 10;
  if (input.hasDirectContact || input.isUnlinkedMention) {
    effortRisk += 3;
    factors.push('Verified public editorial contact or submission form available');
  }
  if (input.quality.spamFlags.length > 0) {
    effortRisk = Math.max(0, effortRisk - 5);
  }

  // Calculate Total
  const total = Math.max(0, Math.min(100, relevance + quality + editorialFit + trafficSignal + effortRisk));

  // Determine Tier
  let tier: OpportunityTier = 'LOW';
  if (total >= 75) {
    tier = 'HIGH';
  } else if (total >= 50) {
    tier = 'MEDIUM';
  }

  const explanation = `Opportunity priority: ${tier} (${total}/100). Relevance: ${relevance}/25, Quality: ${quality}/25, Editorial Fit: ${editorialFit}/20, Traffic Signal: ${trafficSignal}/15, Effort/Risk: ${effortRisk}/15.`;

  return {
    total,
    tier,
    breakdown: {
      relevance,
      quality,
      editorialFit,
      trafficSignal,
      effortRisk
    },
    factors,
    explanation
  };
}
