/**
 * ASTRO360 MARKETING BRAIN - Types & Schema Contracts
 * The Growth Intelligence Layer for ASTRO360.
 */

export type MarketingEventType =
  // Landing
  | 'landing_view'
  | 'hero_cta_clicked'
  | 'free_tools_clicked'
  | 'methodology_opened'
  | 'system_comparison_opened'
  | 'why_demo_opened'
  // Onboarding
  | 'birth_form_started'
  | 'birth_date_completed'
  | 'birth_time_completed'
  | 'birth_location_completed'
  | 'chart_generation_started'
  | 'chart_generation_completed'
  | 'onboarding_abandoned'
  // Dashboard
  | 'dashboard_view'
  | 'forecast_opened'
  | 'prediction_opened'
  | 'why_opened'
  | 'evidence_opened'
  | 'ask_started'
  | 'ask_completed'
  | 'chart_opened'
  | 'calendar_opened'
  // Free Tools
  | 'free_tool_view'
  | 'free_tool_started'
  | 'free_tool_completed'
  | 'free_tool_shared'
  | 'free_tool_save_started'
  // Conversion
  | 'account_created'
  | 'chart_saved'
  | 'report_created'
  | 'upgrade_viewed'
  | 'upgrade_started'
  | 'subscription_completed'
  // Behavior Friction
  | 'rage_click'
  | 'dead_click'
  | 'form_abandonment'
  | 'hesitation_alert'
  | 'rapid_bounce'
  // Errors
  | 'api_error'
  | 'chart_error'
  | 'prediction_error'
  | 'ai_error'
  | 'payment_error';

export interface MarketingEvent {
  id: string;
  type: MarketingEventType;
  timestamp: string;
  sessionId: string;
  userId?: string;
  page: string;
  device: 'mobile' | 'desktop' | 'tablet';
  country?: string;
  referrer?: string;
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  variantId?: string;
  durationMs?: number;
  properties?: Record<string, string | number | boolean>;
}

export type EpistemicStatus = 'OBSERVED' | 'INFERRED' | 'EXPERIMENTALLY_VALIDATED' | 'UNKNOWN' | 'INSUFFICIENT_DATA';

export type PriorityLevel = 'P0' | 'P1' | 'P2' | 'P3';

export type ActionApprovalLevel =
  | 'LEVEL_0_OBSERVE'
  | 'LEVEL_1_RECOMMEND'
  | 'LEVEL_2_PREPARE_DRAFT'
  | 'LEVEL_3_CREATE_PR'
  | 'LEVEL_4_PRE_APPROVED_AUTO';

export interface GrowthOpportunity {
  id: string;
  title: string;
  category: 'CONVERSION' | 'ONBOARDING' | 'SEO' | 'RETENTION' | 'PERFORMANCE' | 'FREE_TOOLS';
  priority: PriorityLevel;
  epistemicStatus: EpistemicStatus;
  evidence: string[];
  impactScore: number; // 1-10
  confidenceScore: number; // 1-10
  effortScore: number; // 1-10 (lower is easier)
  iceScore: number; // calculated (I * C) / E
  owner: string;
  status: 'DISCOVERED' | 'IN_REVIEW' | 'APPROVED' | 'IN_EXPERIMENT' | 'IMPLEMENTED' | 'REJECTED';
  recommendedFix: string;
  expectedOutcome: string;
  actionLevel: ActionApprovalLevel;
}

export interface FunnelStep {
  name: string;
  eventType: MarketingEventType;
  visitors: number;
  dropOffCount: number;
  dropOffRate: number; // 0-100%
  conversionRate: number; // 0-100%
  medianDurationSec: number;
}

export interface GrowthFunnel {
  id: string;
  name: string;
  description: string;
  totalStarted: number;
  totalCompleted: number;
  overallConversionRate: number;
  steps: FunnelStep[];
  deviceBreakdown: {
    desktopConversion: number;
    mobileConversion: number;
  };
}

export interface BehaviorIssue {
  id: string;
  type: 'RAGE_CLICK' | 'DEAD_CLICK' | 'FORM_ABANDONMENT' | 'HESITATION' | 'RAPID_BOUNCE';
  page: string;
  elementSelector?: string;
  incidentCount: number;
  deviceAffected: 'all' | 'mobile' | 'desktop';
  evidence: string;
  possibleCause: string;
  recommendedFix: string;
  severity: 'CRITICAL' | 'WARNING' | 'OPPORTUNITY';
}

export interface ExperimentVariant {
  id: string;
  name: string;
  trafficWeight: number; // e.g. 50
  conversions: number;
  visitors: number;
  conversionRate: number;
}

export interface GrowthExperiment {
  id: string;
  key: string;
  name: string;
  hypothesis: string;
  primaryMetric: string;
  guardrailMetrics: string[];
  status: 'DRAFT' | 'RUNNING' | 'CONCLUDED_WINNER' | 'CONCLUDED_NO_EFFECT' | 'ROLLED_BACK';
  variants: ExperimentVariant[];
  sampleSizeRequired: number;
  currentSampleSize: number;
  confidenceInterval: number; // e.g. 95%
  bayesianWinProb: number; // e.g. 94.2%
  winnerVariantId?: string;
  decisionRule: 'SHIP' | 'ITERATE' | 'REJECT';
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number; // 0 to 100
  targetDevices: ('mobile' | 'desktop' | 'tablet')[];
  targetCohorts?: string[];
  emergencyRollbackTriggered: boolean;
}

export interface SeoOpportunity {
  topic: string;
  searchIntent: 'INFORMATIONAL' | 'CALCULATOR' | 'COMMERCIAL' | 'TRANSACTIONAL';
  existingPage?: string;
  monthlyVolumeEst: number;
  contentGap: string;
  freeToolConnection: string;
  action: 'BUILD' | 'UPDATE' | 'MERGE' | 'REMOVE' | 'DO_NOT_BUILD';
  priority: PriorityLevel;
}

export interface MarketingCopilotResponse {
  query: string;
  answer: string;
  epistemicStatus: EpistemicStatus;
  evidence: string[];
  confidence: number; // 0 - 100%
  dataPeriod: string;
  recommendedAction: string;
  proposedExperiment?: Partial<GrowthExperiment>;
  actionLevel: ActionApprovalLevel;
}
