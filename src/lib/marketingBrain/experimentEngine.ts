/**
 * ASTRO360 MARKETING BRAIN - Experiment & Feature Flag Engine
 * GrowthBook-inspired safe A/B experimentation with guardrails & Bayesian decision rules.
 */

import { GrowthExperiment, FeatureFlag } from './types';

export class ExperimentEngine {
  private static activeExperiments: GrowthExperiment[] = [
    {
      id: 'exp_hero_cta_copy',
      key: 'landing_hero_cta_v2',
      name: 'Hero CTA: Precision Value vs Generic Action',
      hypothesis: 'Phrasing CTA as "✨ Unlock Studio & Free Birth Chart →" creates stronger intent than "Generate Chart", lifting completion by >8%.',
      primaryMetric: 'chart_generation_completed',
      guardrailMetrics: ['landing_bounce_rate (< 35%)', 'js_error_rate (< 0.1%)', 'time_to_chart (< 45s)'],
      status: 'RUNNING',
      variants: [
        { id: 'control', name: 'Control: "Generate My Astrology"', trafficWeight: 50, conversions: 540, visitors: 2200, conversionRate: 24.5 },
        { id: 'variant_a', name: 'Variant A: "✨ Unlock Studio & Free Chart"', trafficWeight: 50, conversions: 624, visitors: 2250, conversionRate: 27.7 }
      ],
      sampleSizeRequired: 4000,
      currentSampleSize: 4450,
      confidenceInterval: 95,
      bayesianWinProb: 96.4,
      winnerVariantId: 'variant_a',
      decisionRule: 'SHIP',
      createdAt: '2026-08-20T00:00:00Z',
    },
    {
      id: 'exp_onboarding_step_model',
      key: 'onboarding_single_vs_multi',
      name: '1-Step Direct Form vs 4-Screen Step Wizard',
      hypothesis: 'Single-screen birth detail card reduces friction and increases completion rate on mobile by >12%.',
      primaryMetric: 'chart_generation_completed',
      guardrailMetrics: ['onboarding_abandonment (< 20%)', 'location_error_rate (< 1.5%)'],
      status: 'CONCLUDED_WINNER',
      variants: [
        { id: 'wizard', name: '5-Screen Wizard', trafficWeight: 50, conversions: 380, visitors: 1000, conversionRate: 38.0 },
        { id: 'single_step', name: '1-Step Clean Card', trafficWeight: 50, conversions: 520, visitors: 1000, conversionRate: 52.0 }
      ],
      sampleSizeRequired: 2000,
      currentSampleSize: 2000,
      confidenceInterval: 99,
      bayesianWinProb: 99.8,
      winnerVariantId: 'single_step',
      decisionRule: 'SHIP',
      createdAt: '2026-08-15T00:00:00Z',
    }
  ];

  private static featureFlags: FeatureFlag[] = [
    {
      id: 'flag_universe_canvas_webgl',
      key: 'universe_canvas_3d',
      name: 'Three.js 3D Interactive Cosmos Canvas',
      description: 'Enables high-performance starfield & planetary orbital canvas behind hero.',
      enabled: true,
      rolloutPercentage: 100,
      targetDevices: ['desktop', 'mobile', 'tablet'],
      emergencyRollbackTriggered: false,
    },
    {
      id: 'flag_executive_pdf_preview',
      key: 'executive_pdf_watermark_preview',
      name: 'Interactive Executive Report Watermarked Preview',
      description: 'Shows sample report dossier preview prior to checkout.',
      enabled: true,
      rolloutPercentage: 50,
      targetDevices: ['desktop'],
      emergencyRollbackTriggered: false,
    },
    {
      id: 'flag_ai_transit_alerts',
      key: 'ai_transit_alerts_stream',
      name: 'Real-Time Planetary Transit Ingress Alerts',
      description: 'Stream live cosmic alerts directly in home dashboard.',
      enabled: true,
      rolloutPercentage: 100,
      targetDevices: ['desktop', 'mobile', 'tablet'],
      emergencyRollbackTriggered: false,
    }
  ];

  public static getExperiments(): GrowthExperiment[] {
    return this.activeExperiments;
  }

  public static getFeatureFlags(): FeatureFlag[] {
    return this.featureFlags;
  }

  public static toggleFlag(flagKey: string, enabled: boolean): FeatureFlag | undefined {
    const flag = this.featureFlags.find(f => f.key === flagKey);
    if (flag) {
      flag.enabled = enabled;
    }
    return flag;
  }

  public static triggerEmergencyRollback(experimentId: string): GrowthExperiment | undefined {
    const exp = this.activeExperiments.find(e => e.id === experimentId);
    if (exp) {
      exp.status = 'ROLLED_BACK';
      exp.decisionRule = 'REJECT';
    }
    return exp;
  }
}
