/**
 * ASTRO360 Islamic API Handler
 * Handles `/api/islamic/*` and `/api/ask/islamic` REST endpoints
 */

import { IslamicGuidanceAssistant, IslamicGuidanceResponse } from './IslamicGuidanceAssistant';
import { IslamicToolRegistry, IslamicToolExecutionResult } from './IslamicToolRegistry';
import { UserProfile } from '../../types';

export interface IslamicApiRequest {
  action?: string;
  toolName?: string;
  question?: string;
  params?: Record<string, any>;
  userProfile?: UserProfile;
}

export interface IslamicApiResponse {
  success: boolean;
  data?: IslamicGuidanceResponse | IslamicToolExecutionResult | any;
  error?: string;
  timestamp: string;
}

export class IslamicApiHandler {
  public static async handle(req: IslamicApiRequest): Promise<IslamicApiResponse> {
    const timestamp = new Date().toISOString();

    try {
      // 1. Tool execution endpoint (/api/islamic/tool)
      if (req.toolName) {
        const result = await IslamicToolRegistry.executeTool(req.toolName, req.params || {});
        return {
          success: result.success,
          data: result,
          timestamp
        };
      }

      // 2. High-level Islamic Guidance Assistant query (/api/islamic/ask)
      if (req.question) {
        const guidance = await IslamicGuidanceAssistant.answer(req.question, req.userProfile);
        return {
          success: true,
          data: guidance,
          timestamp
        };
      }

      return {
        success: false,
        error: 'Missing required `question` or `toolName` parameter.',
        timestamp
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Internal Islamic engine calculation error.',
        timestamp
      };
    }
  }
}
