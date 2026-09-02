/**
 * ASTRO360 Model Context Protocol (MCP) Server
 * Exposes controlled, read-only tools:
 * chart.read, chart.calculate, transit.read, dasha.read, engine.run,
 * rules.search, evidence.search, agreement.calculate, timeline.build, research.run
 */

import { AstrologyToolRegistry } from '../tools/astrologyToolRegistry';
import { UserProfile } from '../../types';

export interface McpToolRequest {
  method: 'tools/list' | 'tools/call';
  params?: {
    name?: string;
    arguments?: any;
    profile?: UserProfile;
  };
}

export interface McpToolResponse {
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

export class AstroMcpServer {
  private static readOnlyWhitelist = new Set([
    'chart.read',
    'chart.calculate',
    'transit.read',
    'dasha.read',
    'engine.run',
    'rules.search',
    'evidence.search',
    'agreement.calculate',
    'timeline.build',
    'research.run',
    'getPlanetaryPositions',
    'getAscendant',
    'runPanchanga',
    'getVimshottariDasha'
  ]);

  public static async handleRequest(req: McpToolRequest): Promise<McpToolResponse> {
    if (req.method === 'tools/list') {
      const tools = AstrologyToolRegistry.listTools().map(t => ({
        name: t.name,
        description: t.description,
        inputSchema: t.parameters,
        permission: 'READ_ONLY'
      }));
      return { result: { tools } };
    }

    if (req.method === 'tools/call') {
      const toolName = req.params?.name;
      if (!toolName || !this.readOnlyWhitelist.has(toolName)) {
        return {
          error: {
            code: 403,
            message: `Permission denied: Tool '${toolName}' is not in the read-only whitelist.`
          }
        };
      }

      try {
        const fallbackProfile: UserProfile = req.params?.profile || {
          id: 'mcp_user',
          name: 'Seeker',
          gender: 'other',
          dob: '1998-02-22',
          time: '12:00',
          location: 'New Delhi, India',
          preferredSystem: 'vedic'
        };

        const output = await AstrologyToolRegistry.executeTool(toolName, req.params?.arguments || {}, fallbackProfile);
        return { result: output };
      } catch (err: any) {
        return {
          error: {
            code: 500,
            message: err.message || 'Tool execution failed'
          }
        };
      }
    }

    return {
      error: { code: 400, message: `Unsupported method: ${req.method}` }
    };
  }
}
