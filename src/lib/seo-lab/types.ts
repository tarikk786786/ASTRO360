/**
 * ASTRO360 SEO Keyword Research Lab — Unified Type Definitions
 * 
 * Free-First, Real-Data, Zero-Fake-Metrics Architectural Standard.
 */

export type SearchEngine = 'google' | 'bing' | 'youtube';
export type DeviceType = 'desktop' | 'mobile' | 'all';
export type TimeRange = 'now 7-d' | 'today 1-m' | 'today 3-m' | 'today 12-m' | 'today 5-y';

export type PrimaryIntent = 
  | 'INFORMATIONAL'
  | 'TOOL'
  | 'COMMERCIAL'
  | 'TRANSACTIONAL'
  | 'NAVIGATIONAL'
  | 'LOCAL';

export type SecondaryIntent = 
  | 'QUESTION'
  | 'COMPARISON'
  | 'HOW-TO'
  | 'DEFINITION'
  | 'GENERAL';

export type AstrologyClusterPillar = 
  | 'BIRTH CHART'
  | 'MOON SIGN'
  | 'RISING SIGN'
  | 'NAKSHATRA'
  | 'DASHA'
  | 'PANCHANGA'
  | 'COMPATIBILITY'
  | 'TRANSITS'
  | 'VEDIC ASTROLOGY'
  | 'WESTERN ASTROLOGY'
  | 'KP'
  | 'JAIMINI'
  | 'MUHURTA'
  | 'ASTROCARTOGRAPHY'
  | 'ASTROLOGY BASICS'
  | 'REMEDIES';

export type KeywordSource = 
  | 'Google Autocomplete'
  | 'Google Trends'
  | 'Google Search Console (First-Party)'
  | 'Local Astrology Expansion'
  | 'ASTRO360 Internal Database'
  | 'People Also Ask (PAA)'
  | 'DataForSEO (External)'
  | 'SerpApi (External)';

export type TrendDirection = 'RISING' | 'STABLE' | 'DECLINING';

export type PriorityTier = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type CompetitorAction = 'BUILD' | 'UPDATE' | 'MERGE' | 'IGNORE';

export interface KeywordInputState {
  seed: string;
  country: string;
  countryCode: string;
  language: string;
  languageCode: string;
  engine: SearchEngine;
  device: DeviceType;
  category: string;
  timeRange: TimeRange;
}

export interface GSCMetricData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number; // e.g. 0.045 = 4.5%
  position: number; // e.g. 8.2
  page?: string;
  opportunityType?: 'Striking Distance (Pos 4-15)' | 'High Impression / Low CTR' | 'Top Performer' | 'Underperforming';
}

export interface TrendSignal {
  score: number; // 0-100 relative
  direction: TrendDirection;
  sparkline: number[]; // e.g. 14 or 30 normalized points
  historicalDelta: number; // percentage change vs baseline
  isBreakout?: boolean;
  label: 'DIRECTIONAL SIGNAL ONLY' | 'RAW TREND INDEX';
}

export interface URLMapping {
  status: 'EXISTS_OPTIMIZED' | 'MISSING_NEW_PAGE' | 'TOOL_NEEDED' | 'CANNIBALIZATION_RISK' | 'INTENT_MISMATCH';
  targetUrl: string;
  targetType: 'tool' | 'article' | 'guide' | 'faq' | 'landing' | 'hub';
  pageTitle: string;
  toolName?: string;
  toolTab?: string;
  cannibalizingUrls?: string[];
  recommendation: string;
}

export interface KeywordOpportunityScore {
  total: number; // 0-100
  tier: PriorityTier;
  breakdown: {
    relevance: number; // 0-25
    intentStrength: number; // 0-20
    trendMomentum: number; // 0-20
    firstPartyGscGap: number; // 0-20
    toolConversionFit: number; // 0-15
  };
  explanation: string;
}

export interface KeywordItem {
  id: string;
  rawKeyword: string;
  normalizedKeyword: string;
  primaryIntent: PrimaryIntent;
  secondaryIntent: SecondaryIntent;
  cluster: AstrologyClusterPillar;
  source: KeywordSource;
  requiresApi: boolean;
  
  // Real Signals (Zero Fake Volumes)
  trend: TrendSignal;
  gscData?: GSCMetricData;
  
  // Semantic Relations
  relatedQueries: string[];
  questionVariants: string[];
  
  // ASTRO360 Architecture Mapping
  mapping: URLMapping;
  opportunity: KeywordOpportunityScore;
  
  freshness: string; // ISO date or "Real-time"
  isSaved?: boolean;
}

export interface ClusterGroup {
  pillar: AstrologyClusterPillar;
  pillarUrl: string;
  clusterKeywords: KeywordItem[];
  questions: string[];
  primaryToolName: string;
  primaryToolUrl: string;
  hubPage: string;
  totalOpportunities: number;
}

export interface CompetitorGapItem {
  id: string;
  keyword: string;
  cluster: AstrologyClusterPillar;
  searchIntent: PrimaryIntent;
  astro360Url?: string;
  competitorDomain: string;
  competitorUrl: string;
  action: CompetitorAction;
  notes: string;
}

export interface ContentBrief {
  keyword: string;
  primaryIntent: PrimaryIntent;
  targetCluster: AstrologyClusterPillar;
  userSearchProblem: string;
  targetUrl: string;
  targetType: 'article' | 'tool' | 'guide' | 'faq';
  h1Title: string;
  metaDescription: string;
  outline: {
    heading: string;
    level: 2 | 3;
    bulletPoints: string[];
    scriptureCitation?: string;
  }[];
  faqList: {
    question: string;
    directAnswer: string; // 40-word concise for AEO/GEO
  }[];
  semanticKeywords: string[];
  internalLinkTargets: { anchorText: string; targetUrl: string; reason: string }[];
  primaryToolCTA: { toolName: string; toolUrl: string; ctaCopy: string };
  sourceCitations: string[];
}

export interface TrendAlertItem {
  id: string;
  keyword: string;
  changeType: 'TREND_SURGE' | 'TREND_DECLINE' | 'NEW_RELATED_QUERY' | 'BREAKOUT';
  previousScore: number;
  currentScore: number;
  timestamp: string;
  notes: string;
}

export interface ProviderApiConfig {
  dataForSeoApiKey?: string;
  serpApiKey?: string;
  pangolinToken?: string;
  useClientProxy?: boolean;
}
