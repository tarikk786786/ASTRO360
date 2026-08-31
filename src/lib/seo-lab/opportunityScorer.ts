/**
 * ASTRO360 Opportunity Priority Scoring Engine
 * Evaluates real transparent signals to assign an OPPORTUNITY PRIORITY (0-100).
 * 
 * STRICT PRINCIPLE: Never claims to calculate "ranking probability" or "search volume".
 */

import { 
  KeywordOpportunityScore, 
  PriorityTier, 
  PrimaryIntent, 
  SecondaryIntent, 
  AstrologyClusterPillar, 
  TrendSignal, 
  GSCMetricData, 
  URLMapping 
} from './types';

export function calculateOpportunityScore(params: {
  keyword: string;
  primaryIntent: PrimaryIntent;
  secondaryIntent: SecondaryIntent;
  cluster: AstrologyClusterPillar;
  trend: TrendSignal;
  gscData?: GSCMetricData;
  mapping: URLMapping;
}): KeywordOpportunityScore {
  const { keyword, primaryIntent, secondaryIntent, cluster, trend, gscData, mapping } = params;

  // 1. Domain Relevance (0 to 25)
  let relevance = 15;
  if (cluster !== 'ASTROLOGY BASICS') relevance += 5;
  if (keyword.length > 5 && keyword.length < 40) relevance += 5;

  // 2. Intent Strength (0 to 20)
  let intentStrength = 10;
  if (primaryIntent === 'TOOL') intentStrength = 20;
  else if (primaryIntent === 'COMMERCIAL') intentStrength = 17;
  else if (primaryIntent === 'TRANSACTIONAL') intentStrength = 18;
  else if (secondaryIntent === 'HOW-TO' || secondaryIntent === 'QUESTION') intentStrength = 15;
  else if (primaryIntent === 'NAVIGATIONAL') intentStrength = 6;

  // 3. Trend Momentum (0 to 20)
  let trendMomentum = 8;
  if (trend.isBreakout) trendMomentum = 20;
  else if (trend.direction === 'RISING') trendMomentum = 16 + Math.min(4, Math.floor(trend.historicalDelta / 25));
  else if (trend.direction === 'STABLE') trendMomentum = 12;
  else if (trend.direction === 'DECLINING') trendMomentum = 5;

  // 4. First-Party GSC Gap (0 to 20)
  let firstPartyGscGap = 5; // default baseline when GSC not connected
  if (gscData) {
    if (gscData.opportunityType === 'Striking Distance (Pos 4-15)') {
      firstPartyGscGap = 20; // Highest leverage opportunity
    } else if (gscData.opportunityType === 'High Impression / Low CTR') {
      firstPartyGscGap = 18;
    } else if (gscData.opportunityType === 'Top Performer') {
      firstPartyGscGap = 12;
    } else {
      firstPartyGscGap = 8;
    }
  }

  // 5. Tool & Conversion Fit (0 to 15)
  let toolConversionFit = 7;
  if (mapping.status === 'TOOL_NEEDED' || mapping.targetType === 'tool') {
    toolConversionFit = 15;
  } else if (mapping.status === 'MISSING_NEW_PAGE') {
    toolConversionFit = 12;
  } else if (mapping.status === 'CANNIBALIZATION_RISK') {
    toolConversionFit = 10; // High urgency to resolve
  }

  // Total calculation (0 - 100)
  const total = Math.min(100, Math.max(0, relevance + intentStrength + trendMomentum + firstPartyGscGap + toolConversionFit));

  let tier: PriorityTier = 'LOW';
  if (total >= 80) tier = 'CRITICAL';
  else if (total >= 65) tier = 'HIGH';
  else if (total >= 45) tier = 'MEDIUM';

  const explanation = generateScoreExplanation(tier, {
    relevance,
    intentStrength,
    trendMomentum,
    firstPartyGscGap,
    toolConversionFit,
    total
  }, gscData, trend, mapping);

  return {
    total,
    tier,
    breakdown: {
      relevance,
      intentStrength,
      trendMomentum,
      firstPartyGscGap,
      toolConversionFit
    },
    explanation
  };
}

function generateScoreExplanation(
  tier: PriorityTier,
  breakdown: any,
  gsc?: GSCMetricData,
  trend?: TrendSignal,
  mapping?: URLMapping
): string {
  const parts: string[] = [];

  if (gsc?.opportunityType === 'Striking Distance (Pos 4-15)') {
    parts.push(`First-party GSC signals high impressions at average rank ${gsc.position.toFixed(1)} with high breakthrough potential.`);
  }

  if (trend?.direction === 'RISING') {
    parts.push(`Google Trends shows positive relative momentum (+${trend.historicalDelta}% delta).`);
  }

  if (mapping?.status === 'TOOL_NEEDED') {
    parts.push('High conversion calculator gap identified in ASTRO360 suite.');
  } else if (mapping?.status === 'MISSING_NEW_PAGE') {
    parts.push('Clean indexable educational guide gap with zero current cannibalization.');
  }

  if (!parts.length) {
    parts.push(`Balanced demand profile across ${tier} priority bracket.`);
  }

  return parts.join(' ');
}
