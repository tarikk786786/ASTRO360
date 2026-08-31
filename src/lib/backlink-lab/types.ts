/**
 * ASTRO360 Backlink Opportunity Lab — Core TypeScript Interfaces & Types
 * 
 * Strict Principle:
 * Ethical, editorial link-earning. Zero mass spam, zero fake authority metrics.
 */

export type ProspectType =
  | 'RESOURCE_PAGE'
  | 'EDITORIAL'
  | 'DIGITAL_PR'
  | 'INDUSTRY_PUBLICATION'
  | 'EDUCATION'
  | 'RESEARCH'
  | 'COMMUNITY'
  | 'DIRECTORY'
  | 'LOCAL'
  | 'PARTNERSHIP'
  | 'TOOL_LIST'
  | 'ROUNDUP'
  | 'PODCAST'
  | 'INTERVIEW'
  | 'GUEST_CONTRIBUTION'
  | 'DATA_CITATION'
  | 'UNLINKED_MENTION';

export type LinkType =
  | 'DOFOLLOW'
  | 'NOFOLLOW'
  | 'UGC'
  | 'SPONSORED'
  | 'UNLINKED_MENTION'
  | 'EMBED'
  | 'UNKNOWN';

export type OpportunityTier = 'HIGH' | 'MEDIUM' | 'LOW';

export type OutreachStatus =
  | 'PROSPECT'
  | 'QUALIFIED'
  | 'CONTACT_IDENTIFIED'
  | 'DRAFT_READY'
  | 'CONTACTED'
  | 'REPLIED'
  | 'ACCEPTED'
  | 'LIVE'
  | 'REJECTED'
  | 'LOST';

export type VerificationStatus =
  | 'LIVE'
  | 'MODIFIED'
  | 'NOFOLLOW_ADDED'
  | 'TARGET_CHANGED'
  | 'ANCHOR_CHANGED'
  | 'REMOVED'
  | 'PAGE_404'
  | 'UNVERIFIED';

export type ToxicRiskLevel = 'CLEAN' | 'REVIEW' | 'AVOID' | 'POTENTIALLY_TOXIC';

export type AnchorClassification =
  | 'BRAND'
  | 'URL'
  | 'PARTIAL_MATCH'
  | 'EXACT_MATCH'
  | 'GENERIC'
  | 'IMAGE'
  | 'OTHER';

export interface QualitySignals {
  topicalRelevance: number; // 0 to 25
  contentQuality: number;   // 0 to 25
  indexability: boolean;
  realEditorialContext: boolean;
  outboundLinkDensity: 'LOW' | 'NORMAL' | 'HIGH' | 'EXCESSIVE';
  spamFlags: string[];
  domainHealth: 'HEALTHY' | 'NEEDS_REVIEW' | 'FLAGGED';
  sslValid: boolean;
  httpStatus: number;
}

export interface OpportunityScoreBreakdown {
  relevance: number;      // 0 to 25
  quality: number;        // 0 to 25
  editorialFit: number;   // 0 to 20
  trafficSignal: number;  // 0 to 15 (directional only)
  effortRisk: number;     // 0 to 15 (ease of acquisition vs risk)
}

export interface OpportunityScore {
  total: number; // 0 to 100
  tier: OpportunityTier;
  breakdown: OpportunityScoreBreakdown;
  factors: string[];
  explanation: string;
}

export interface BacklinkOpportunity {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  topic: string;
  relevance: number; // 0 to 100
  country: string;
  language: string;
  sourceType: ProspectType;
  linkType: LinkType;
  status: OutreachStatus;
  qualitySignals: QualitySignals;
  opportunityScore: OpportunityScore;
  confidence: number; // 0 to 1
  discoveredAt: string;
  lastChecked: string;
  notes: string;
  contactName?: string;
  contactEmail?: string;
  contactUrl?: string;
  suggestedAngle?: string;
  isSaved?: boolean;
}

export interface CompetitorBacklinkGap {
  id: string;
  competitor: string;
  sourceDomain: string;
  sourcePage: string;
  topic: string;
  linkType: LinkType;
  astro360Mentioned: boolean;
  astro360RelevantAsset: string;
  astro360TargetUrl: string;
  actionRecommendation: 'OUTREACH_REPLACEMENT' | 'CREATE_BETTER_ASSET' | 'CLAIM_UNLINKED' | 'IGNORE';
  notes: string;
}

export interface UnlinkedBrandMention {
  id: string;
  sourceDomain: string;
  sourcePage: string;
  mentionSnippet: string;
  targetAstroUrl: string;
  authorOrEditor?: string;
  contactUrl?: string;
  outreachAngle: string;
  discoveredAt: string;
}

export interface LinkableAsset {
  id: string;
  title: string;
  path: string;
  type: 'CALCULATOR' | 'RESEARCH_DATASET' | 'INTERACTIVE_CHART' | 'CLASSICAL_LIBRARY' | 'CALENDAR_TOOL' | 'EDUCATIONAL_GUIDE';
  whyLinkable: string;
  targetAudience: string[];
  conversionValue: 'HIGH' | 'VERY_HIGH' | 'CRITICAL';
  recommendedPitch: string;
  suggestedProspectTypes: ProspectType[];
}

export interface DigitalPRStory {
  id: string;
  storyAngle: string;
  supportingAstroAsset: string;
  targetAstroUrl: string;
  targetPublications: string[];
  relevanceReason: string;
  seasonalHook: string;
  statisticalDataPoint: string;
  samplePitchHook: string;
}

export interface OutreachRecord {
  id: string;
  prospectId: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  organization: string;
  contactName: string;
  contactEmail: string;
  contactPageUrl?: string;
  submissionPageUrl?: string;
  status: OutreachStatus;
  draftSubject: string;
  draftBody: string;
  personalizedReason: string;
  lastContactedAt?: string;
  followUpDate?: string;
  notes: string;
  history: Array<{
    date: string;
    action: string;
    note: string;
  }>;
}

export interface LinkVerificationResult {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  httpStatus: number;
  canonicalUrl?: string;
  isIndexable: boolean;
  isLinkPresent: boolean;
  targetUrlFound?: string;
  anchorText?: string;
  isNofollow: boolean;
  isUgc: boolean;
  isSponsored: boolean;
  surroundingContext?: string;
  status: VerificationStatus;
  firstSeen: string;
  lastSeen: string;
  changeNote?: string;
}

export interface AnchorDistributionStats {
  totalAnchors: number;
  brandCount: number;
  brandPercent: number;
  urlCount: number;
  urlPercent: number;
  partialMatchCount: number;
  partialMatchPercent: number;
  exactMatchCount: number;
  exactMatchPercent: number;
  genericCount: number;
  genericPercent: number;
  imageCount: number;
  imagePercent: number;
  unnaturalFlags: string[];
  recommendation: string;
}

export interface ToxicAuditResult {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  riskLevel: ToxicRiskLevel;
  reasons: string[];
  linkFarmSignal: boolean;
  adultOrGamblingContext: boolean;
  scrapedContentSignal: boolean;
  parkedDomainSignal: boolean;
  excessiveExactMatch: boolean;
  sitewideUnnatural: boolean;
  recommendedAction: 'KEEP' | 'MONITOR' | 'REQUEST_REMOVAL' | 'DISAVOW_REVIEW';
}

export interface BrokenBacklinkItem {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  brokenTargetUrl: string;
  suggestedReplacementUrl: string;
  httpStatus: number;
  anchorText: string;
  actionRequired: 'CREATE_301_REDIRECT' | 'OUTREACH_UPDATE';
}

export interface BacklinkLabState {
  opportunities: BacklinkOpportunity[];
  competitorGaps: CompetitorBacklinkGap[];
  unlinkedMentions: UnlinkedBrandMention[];
  linkableAssets: LinkableAsset[];
  prStories: DigitalPRStory[];
  outreachRecords: OutreachRecord[];
  verifications: LinkVerificationResult[];
  toxicAudits: ToxicAuditResult[];
  brokenBacklinks: BrokenBacklinkItem[];
}
