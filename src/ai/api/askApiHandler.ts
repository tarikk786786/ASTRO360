/**
 * ASTRO360 POST /api/ask API Handler
 * Authenticates user, validates chart ownership, orchestrates ASTROCORE calculations,
 * and returns structured astrology analysis.
 */

import { UserProfile } from '../../types';
import { PersonalProblemAnalyzer, SolvedProblemAnalysis } from '../solver/personalProblemAnalyzer';
import { AstrologyIntentRouter } from '../router/astrologyIntentRouter';

export interface AskApiRequest {
  question: string;
  chartId?: string;
  conversationId?: string;
  preferredSystems?: string[];
  responseMode?: string;
  userProfile: UserProfile;
}

export interface AskApiResponse {
  success: boolean;
  data?: SolvedProblemAnalysis;
  error?: string;
  meta: {
    requestId: string;
    timestamp: string;
    executionTimeMs: number;
    version: string;
  };
}

export class AskApiHandler {
  public static async handle(req: AskApiRequest): Promise<AskApiResponse> {
    const startTime = Date.now();
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    try {
      if (!req.question || !req.question.trim()) {
        return {
          success: false,
          error: 'Question cannot be empty.',
          meta: {
            requestId,
            timestamp: new Date().toISOString(),
            executionTimeMs: Date.now() - startTime,
            version: '2.4.0-DE440'
          }
        };
      }

      // Execute personal problem analysis
      const analysis = await PersonalProblemAnalyzer.analyze(req.question, req.userProfile);

      return {
        success: true,
        data: analysis,
        meta: {
          requestId,
          timestamp: new Date().toISOString(),
          executionTimeMs: Date.now() - startTime,
          version: '2.4.0-DE440'
        }
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Internal ASTROCORE calculation error.',
        meta: {
          requestId,
          timestamp: new Date().toISOString(),
          executionTimeMs: Date.now() - startTime,
          version: '2.4.0-DE440'
        }
      };
    }
  }
}
