/**
 * ASTRO360 SEO LAB - Types & Data Contracts
 * Serious free SEO toolkit for technical, content, performance and search visibility.
 */

export type SeoPriority = 'P0' | 'P1' | 'P2' | 'P3';
export type SeoIssueCategory = 
  | 'Technical' 
  | 'On-Page' 
  | 'Mobile' 
  | 'Performance' 
  | 'Accessibility' 
  | 'Security' 
  | 'Indexability' 
  | 'Schema' 
  | 'Links';

export type SearchIntentType = 'INFORMATIONAL' | 'CALCULATOR' | 'COMMERCIAL' | 'TRANSACTIONAL' | 'COMPARISON';

export interface SeoIssueItem {
  id: string;
  category: SeoIssueCategory;
  priority: SeoPriority;
  problem: string;
  whyItMatters: string;
  howToFix: string;
  evidence: string;
  affectedUrls: string[];
  impactScore: number; // 1-10
  status: 'OPEN' | 'IN_PROGRESS' | 'FIXED' | 'IGNORED';
}

export interface SeoPageAudit {
  url: string;
  path: string;
  httpStatus: number;
  indexable: boolean;
  canonicalUrl: string;
  canonicalStatus: 'self' | 'canonicalized' | 'missing' | 'conflict';
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  h1: string;
  h2Count: number;
  wordCount: number;
  inSitemap: boolean;
  hasSchema: boolean;
  schemaTypes: string[];
  ogComplete: boolean;
  twitterComplete: boolean;
  mobileViewportValid: boolean;
  brokenLinksCount: number;
  cwv: {
    lcp: number; // in seconds
    inp: number; // in milliseconds
    cls: number; // score
    ttfb: number; // in milliseconds
    rating: 'GOOD' | 'NEEDS_IMPROVEMENT' | 'POOR';
  };
  issues: SeoIssueItem[];
}

export interface SeoAuditReport {
  targetUrl: string;
  domain: string;
  auditTimestamp: string;
  overallHealthScore: number; // 0 - 100
  totalPagesScanned: number;
  criticalIssuesCount: number;
  warningsCount: number;
  passedChecksCount: number;
  pages: SeoPageAudit[];
  issues: SeoIssueItem[];
  schemaSummary: {
    validCount: number;
    errorCount: number;
    detectedTypes: string[];
  };
  performanceSummary: {
    avgLcp: number;
    avgInp: number;
    avgCls: number;
    score: number;
  };
  mobileSummary: {
    responsiveScore: number;
    tapTargetIssues: number;
    overflowIssues: number;
  };
}

export interface CrawlSettings {
  targetUrl: string;
  maxPages: number;
  maxDepth: number;
  concurrency: number;
  timeoutMs: number;
  userAgent: string;
  respectRobots: boolean;
  renderJavaScript: boolean;
  includePatterns?: string[];
  excludePatterns?: string[];
}

export interface CrawledUrlResult {
  url: string;
  depth: number;
  status: number;
  responseTimeMs: number;
  contentType: string;
  sizeKb: number;
  inlinksCount: number;
  outlinksCount: number;
  canonical: string;
  isOrphan: boolean;
  isRedirect: boolean;
  redirectTarget?: string;
  isBroken: boolean;
  isNoindex: boolean;
  isRobotsBlocked: boolean;
}

export interface SchemaValidationResult {
  type: string;
  valid: boolean;
  jsonLdSnippet: string;
  errors: string[];
  warnings: string[];
  visibleContentMatched: boolean;
}

export interface KeywordInsight {
  keyword: string;
  intent: SearchIntentType;
  topicGroup: string;
  dataSource: 'OBSERVED_SEARCH_CONSOLE' | 'CALCULATOR_DEMAND' | 'SUGGESTED_EXPANSION';
  recommendedPagePath: string;
  existingRankingUrl?: string;
  isCannibalized: boolean;
  relevanceScore: number;
}

export interface ContentBrief {
  targetKeyword: string;
  primaryIntent: SearchIntentType;
  recommendedTitle: string;
  recommendedWordCount: number;
  recommendedH2s: string[];
  mustIncludeEntities: string[];
  suggestedFaqs: { question: string; answerSummary: string }[];
  connectedToolPath: string;
}

export interface BacklinkItem {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  isDofollow: boolean;
  qualityRating: 'HIGH_TRUST' | 'EDUCATIONAL' | 'COMMUNITY' | 'LOW';
  category: string;
  firstSeen: string;
  spamRisk: 'ZERO' | 'LOW';
}

export interface BacklinkProspectItem {
  domain: string;
  type: 'EDITORIAL_RESOURCE' | 'DIRECTORY' | 'ASTRONOMY_PORTAL' | 'DEVELOPER_HUB';
  relevanceScore: number; // 1 - 100
  suggestedAssetToPitch: string;
  pitchSubject: string;
  pitchBody: string;
  contactChannel: string;
  status: 'IDENTIFIED' | 'PITCH_PREPARED' | 'OUTREACH_SENT' | 'EARNED';
}

export interface AeoReadinessScore {
  directAnswerReadiness: number; // 0 - 100
  entityConsistency: number; // 0 - 100
  citationIndexability: number; // 0 - 100
  aiVisibilityScore: number; // 0 - 100
  recommendedImprovements: string[];
}
