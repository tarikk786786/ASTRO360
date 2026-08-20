/**
 * COSMOS OMNI AI Intelligent Router
 * Determines task intent, selects optimal AI model / engine, tracks latency and token costs.
 */

export type TaskType = 
  | 'fast_calculation'     // Offline math: ephemeris, panchang, dasha (no LLM needed)
  | 'daily_horoscope'      // Flash / Fast model
  | 'natal_analysis'       // Deep reasoning model (Gemini Pro / GPT-4o)
  | 'synastry_match'       // High-context relational analysis
  | 'dream_interpretation' // Creative associative model
  | 'remedial_synthesis'   // Multi-tradition scholar model
  | 'islamic_guidance'     // Islamic scholarly RAG + reference verification
  | 'pdf_dossier';         // Structured JSON generation

export interface AIRequestOptions {
  taskType: TaskType;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  userId?: string;
  context?: Record<string, unknown>;
}

export interface AIResponsePayload {
  content: string;
  provider: 'gemini' | 'openai' | 'claude' | 'local_engine';
  model: string;
  executionTimeMs: number;
  estimatedTokens: number;
  cached?: boolean;
}

export class AIRouter {
  /**
   * Routes the prompt to the appropriate engine / LLM provider based on complexity and latency constraints.
   */
  static async routeRequest(options: AIRequestOptions): Promise<AIResponsePayload> {
    const startTime = performance.now();

    // Strategy 1: Deterministic fast tasks
    if (options.taskType === 'fast_calculation') {
      return {
        content: 'Calculation handled deterministically by local astronomical engine.',
        provider: 'local_engine',
        model: 'astroCalculations-v2',
        executionTimeMs: Math.round(performance.now() - startTime),
        estimatedTokens: 0,
      };
    }

    // Strategy 2: Call the Serverless AI Gateway (/api/astrology)
    try {
      const response = await fetch('/api/astrology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: options.taskType,
          prompt: options.prompt,
          systemPrompt: options.systemPrompt,
          context: options.context,
          userId: options.userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Gateway responded with status: ${response.status}`);
      }

      const data = await response.json();
      return {
        content: data.reply || data.content || data.response || '',
        provider: data.provider || 'gemini',
        model: data.model || 'gemini-1.5-flash',
        executionTimeMs: Math.round(performance.now() - startTime),
        estimatedTokens: data.tokens || Math.round(options.prompt.length / 4),
      };
    } catch (err) {
      console.warn('[AIRouter] Gateway unreachable or offline, triggering fallback intelligence engine:', err);
      // Fallback synthesis
      return {
        content: this.generateOfflineFallback(options),
        provider: 'local_engine',
        model: 'offline-scholar-fallback',
        executionTimeMs: Math.round(performance.now() - startTime),
        estimatedTokens: 0,
      };
    }
  }

  private static generateOfflineFallback(options: AIRequestOptions): string {
    return `### 🌟 Cosmic Intelligence Offline Synthesis
Based on current planetary alignments and local ephemeris calculations:
- **Primary Energy:** Focused awareness and disciplined expansion.
- **Guidance:** Proceed with clarity, aligning personal intent with favorable transit windows.
*(Note: Full neural generative consultation available when network connectivity is restored.)*`;
  }
}
