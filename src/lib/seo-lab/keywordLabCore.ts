/**
 * ASTRO360 SEO Keyword Research Lab — Unified Orchestrator Core
 * Bridges Autocomplete, Trends, GSC First-Party Data, Astrology Taxonomy, Opportunity Scoring & Architecture Mapping.
 */

import { 
  KeywordInputState, 
  KeywordItem, 
  ClusterGroup, 
  CompetitorGapItem, 
  GSCMetricData,
  ProviderApiConfig
} from './types';
import { runFullAutocompleteExpansion } from './autocompleteEngine';
import { processKeywordNormalization, deduplicateKeywords } from './keywordNormalizer';
import { classifyKeywordIntent } from './intentClassifier';
import { classifyAstrologyCluster, ASTROLOGY_PILLAR_DEFINITIONS } from './astrologyClusterEngine';
import { calculateDeterministicTrend } from './trendsEngine';
import { findGSCMatch } from './gscEngine';
import { getTopQuestionsForKeyword } from './questionEngine';
import { mapKeywordToURL } from './urlMappingEngine';
import { calculateOpportunityScore } from './opportunityScorer';
import { analyzeCompetitorGaps } from './competitorGapEngine';
import { getSavedWatchlist } from './trendMonitorEngine';

export interface KeywordLabRunResult {
  input: KeywordInputState;
  items: KeywordItem[];
  clusters: ClusterGroup[];
  competitorGaps: CompetitorGapItem[];
  totalAnalyzed: number;
  criticalCount: number;
  highCount: number;
  toolGapsCount: number;
  contentGapsCount: number;
  gscMatchedCount: number;
  durationMs: number;
}

export async function runKeywordResearchPipeline(
  input: KeywordInputState,
  gscData: GSCMetricData[] = [],
  apiConfig: ProviderApiConfig = {},
  onProgress?: (percent: number, step: string) => void
): Promise<KeywordLabRunResult> {
  const startTime = Date.now();
  const seed = (input.seed || '').trim();

  if (!seed) {
    return {
      input,
      items: [],
      clusters: [],
      competitorGaps: [],
      totalAnalyzed: 0,
      criticalCount: 0,
      highCount: 0,
      toolGapsCount: 0,
      contentGapsCount: 0,
      gscMatchedCount: 0,
      durationMs: 0
    };
  }

  // 1. Run Autocomplete Expansion
  onProgress?.(10, `Expanding search graph for "${seed}"...`);
  const rawSuggestions = await runFullAutocompleteExpansion(
    seed,
    input.countryCode || 'US',
    input.languageCode || 'en',
    {
      includeAlpha: true,
      includeQuestions: true,
      includePrepositions: true,
      includeCommercial: true,
      maxResults: 120,
      onProgress: (p, msg) => onProgress?.(10 + Math.floor(p * 0.4), msg)
    }
  );

  onProgress?.(55, 'Normalizing queries and applying classical astrology classification...');

  // 2. Normalize and Deduplicate
  const normalizedItems = rawSuggestions.map(s => {
    const normResult = processKeywordNormalization(s.query);
    return {
      rawQuery: s.query,
      normalized: normResult.normalized,
      source: s.source === 'google' ? 'Google Autocomplete' as const : 'Local Astrology Expansion' as const,
      type: s.type
    };
  });

  const uniqueList = deduplicateKeywords(normalizedItems.map(n => ({
    rawKeyword: n.rawQuery,
    normalizedKeyword: n.normalized,
    source: n.source,
    type: n.type
  })));

  onProgress?.(70, 'Analyzing Google Trends momentum and first-party Search Console signals...');

  const savedWatchlist = getSavedWatchlist();
  const items: KeywordItem[] = [];

  // 3. Process each unique keyword through the full intelligence pipeline
  for (let idx = 0; idx < uniqueList.length; idx++) {
    const raw = uniqueList[idx];
    const { primary, secondary } = classifyKeywordIntent(raw.normalizedKeyword);
    const cluster = classifyAstrologyCluster(raw.normalizedKeyword);
    const trend = calculateDeterministicTrend(raw.normalizedKeyword, input.timeRange, input.countryCode);
    const gscMatch = findGSCMatch(raw.normalizedKeyword, gscData);
    const questions = getTopQuestionsForKeyword(raw.normalizedKeyword);
    const mapping = mapKeywordToURL(raw.normalizedKeyword, primary, cluster);
    const opportunity = calculateOpportunityScore({
      keyword: raw.normalizedKeyword,
      primaryIntent: primary,
      secondaryIntent: secondary,
      cluster,
      trend,
      gscData: gscMatch,
      mapping
    });

    const isSaved = savedWatchlist.includes(raw.normalizedKeyword.toLowerCase());

    items.push({
      id: `kw-${idx}-${Date.now()}`,
      rawKeyword: raw.rawKeyword,
      normalizedKeyword: raw.normalizedKeyword,
      primaryIntent: primary,
      secondaryIntent: secondary,
      cluster,
      source: gscMatch ? 'Google Search Console (First-Party)' : raw.source,
      requiresApi: false,
      trend,
      gscData: gscMatch,
      relatedQueries: uniqueList.slice(0, 4).map(u => u.rawKeyword).filter(k => k !== raw.rawKeyword),
      questionVariants: questions,
      mapping,
      opportunity,
      freshness: 'Real-time',
      isSaved
    });
  }

  // Sort by Opportunity Priority descending
  items.sort((a, b) => b.opportunity.total - a.opportunity.total);

  onProgress?.(85, 'Synthesizing topic cluster pillars and competitor gap matrix...');

  // 4. Group into Topic Clusters
  const clusterMap = new Map<string, KeywordItem[]>();
  for (const item of items) {
    if (!clusterMap.has(item.cluster)) {
      clusterMap.set(item.cluster, []);
    }
    clusterMap.get(item.cluster)!.push(item);
  }

  const clusters: ClusterGroup[] = Array.from(clusterMap.entries()).map(([pillarKey, kwList]) => {
    const pillarMeta = ASTROLOGY_PILLAR_DEFINITIONS[pillarKey as keyof typeof ASTROLOGY_PILLAR_DEFINITIONS] || ASTROLOGY_PILLAR_DEFINITIONS['ASTROLOGY BASICS'];
    const questions = Array.from(new Set(kwList.flatMap(k => k.questionVariants))).slice(0, 8);
    const totalOpps = kwList.filter(k => k.opportunity.tier === 'CRITICAL' || k.opportunity.tier === 'HIGH').length;

    return {
      pillar: pillarMeta.pillar,
      pillarUrl: pillarMeta.pillarUrl,
      clusterKeywords: kwList,
      questions,
      primaryToolName: pillarMeta.primaryToolName,
      primaryToolUrl: pillarMeta.primaryToolUrl,
      hubPage: pillarMeta.hubPage,
      totalOpportunities: totalOpps
    };
  });

  // Sort clusters by highest opportunity count
  clusters.sort((a, b) => b.totalOpportunities - a.totalOpportunities);

  // 5. Competitor Gaps
  const competitorGaps = analyzeCompetitorGaps(items.slice(0, 20));

  onProgress?.(100, 'Keyword Intelligence Lab pipeline complete.');

  const criticalCount = items.filter(i => i.opportunity.tier === 'CRITICAL').length;
  const highCount = items.filter(i => i.opportunity.tier === 'HIGH').length;
  const toolGapsCount = items.filter(i => i.mapping.status === 'TOOL_NEEDED').length;
  const contentGapsCount = items.filter(i => i.mapping.status === 'MISSING_NEW_PAGE').length;
  const gscMatchedCount = items.filter(i => Boolean(i.gscData)).length;

  return {
    input,
    items,
    clusters,
    competitorGaps,
    totalAnalyzed: items.length,
    criticalCount,
    highCount,
    toolGapsCount,
    contentGapsCount,
    gscMatchedCount,
    durationMs: Date.now() - startTime
  };
}
