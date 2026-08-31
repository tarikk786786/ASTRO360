/**
 * ASTRO360 Backlink Lab — Server & Client API Router Handlers
 * 
 * Provides typed handlers for:
 * POST /api/backlinks/discover
 * POST /api/backlinks/analyze
 * POST /api/backlinks/verify
 * POST /api/backlinks/prospects
 * POST /api/backlinks/opportunities
 * POST /api/backlinks/outreach
 * POST /api/backlinks/report
 */

import { discoverBacklinkOpportunities, ProspectQueryInput } from '../lib/backlink-lab/prospectDiscoveryEngine';
import { evaluateQualitySignals } from '../lib/backlink-lab/qualityScorer';
import { calculateOpportunityScore } from '../lib/backlink-lab/opportunityScorer';
import { verifyBacklinkOnPage, isSsrfBlockedHost } from '../lib/backlink-lab/verificationCrawler';
import { generatePersonalizedOutreach } from '../lib/backlink-lab/outreachEngine';
import { auditBacklinkForToxicity } from '../lib/backlink-lab/toxicLinkEngine';
import { exportBacklinksToCSV, exportBacklinksToJSON, exportBacklinksToMarkdown } from '../lib/backlink-lab/reportExportEngine';
import { BacklinkOpportunity, ProspectType } from '../lib/backlink-lab/types';

export interface BacklinkApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export const backlinkApiHandlers = {
  // 1. POST /api/backlinks/discover
  discover: async (query: ProspectQueryInput): Promise<BacklinkApiResponse<BacklinkOpportunity[]>> => {
    try {
      const opportunities = discoverBacklinkOpportunities(query);
      return { success: true, data: opportunities, timestamp: new Date().toISOString() };
    } catch (e: any) {
      return { success: false, error: e.message || 'Discovery failed', timestamp: new Date().toISOString() };
    }
  },

  // 2. POST /api/backlinks/analyze
  analyze: async (body: {
    url: string;
    domain: string;
    topic: string;
    sourceType: ProspectType;
    snippet?: string;
  }): Promise<BacklinkApiResponse> => {
    try {
      if (isSsrfBlockedHost(body.url)) {
        return { success: false, error: 'SSRF Protection: Blocked target domain', timestamp: new Date().toISOString() };
      }
      const quality = evaluateQualitySignals({
        url: body.url,
        domain: body.domain,
        topic: body.topic,
        sourceType: body.sourceType,
        pageContentSnippet: body.snippet
      });
      const score = calculateOpportunityScore({
        quality,
        sourceType: body.sourceType
      });
      const toxicity = auditBacklinkForToxicity({
        sourceDomain: body.domain,
        sourceUrl: body.url,
        targetUrl: '/free-tools/birth-chart',
        anchorText: 'ASTRO360',
        snippet: body.snippet
      });

      return {
        success: true,
        data: { quality, score, toxicity },
        timestamp: new Date().toISOString()
      };
    } catch (e: any) {
      return { success: false, error: e.message || 'Analysis failed', timestamp: new Date().toISOString() };
    }
  },

  // 3. POST /api/backlinks/verify
  verify: async (body: { sourceUrl: string; targetUrl: string; html?: string }): Promise<BacklinkApiResponse> => {
    try {
      if (isSsrfBlockedHost(body.sourceUrl)) {
        return { success: false, error: 'SSRF Protection: Host rejected', timestamp: new Date().toISOString() };
      }
      const result = await verifyBacklinkOnPage(body.sourceUrl, body.targetUrl, body.html);
      return { success: true, data: result, timestamp: new Date().toISOString() };
    } catch (e: any) {
      return { success: false, error: e.message || 'Verification failed', timestamp: new Date().toISOString() };
    }
  },

  // 4. POST /api/backlinks/prospects
  prospects: async (filter: ProspectQueryInput): Promise<BacklinkApiResponse> => {
    return backlinkApiHandlers.discover(filter);
  },

  // 5. POST /api/backlinks/opportunities
  opportunities: async (filter: ProspectQueryInput): Promise<BacklinkApiResponse> => {
    return backlinkApiHandlers.discover(filter);
  },

  // 6. POST /api/backlinks/outreach
  outreach: async (body: { opportunity: BacklinkOpportunity; contactName?: string }): Promise<BacklinkApiResponse> => {
    try {
      const draft = generatePersonalizedOutreach(body.opportunity, body.contactName);
      return { success: true, data: draft, timestamp: new Date().toISOString() };
    } catch (e: any) {
      return { success: false, error: e.message || 'Outreach generation failed', timestamp: new Date().toISOString() };
    }
  },

  // 7. POST /api/backlinks/report
  report: async (body: { opportunities: BacklinkOpportunity[]; format: 'csv' | 'json' | 'markdown' }): Promise<BacklinkApiResponse<string>> => {
    try {
      let content = '';
      if (body.format === 'csv') content = exportBacklinksToCSV(body.opportunities);
      else if (body.format === 'json') content = exportBacklinksToJSON({ opportunities: body.opportunities });
      else content = exportBacklinksToMarkdown(body.opportunities);

      return { success: true, data: content, timestamp: new Date().toISOString() };
    } catch (e: any) {
      return { success: false, error: e.message || 'Report generation failed', timestamp: new Date().toISOString() };
    }
  }
};
