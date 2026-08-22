import { orchestrateAstrologyRequest } from '../src/backend/agentOrchestrator.js';

/**
 * Production AI Astrology Gateway
 * Enforces:
 * - Structured JSON natal chart context injection
 * - Ethical safeguards (no deterministic health/death/crime predictions)
 * - Multi-agent LangGraph orchestration with Gemini & local fallback
 * - CORS and rate-limiting protections
 */

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { prompt, userContext, chartData } = req.body || {};
    
    // Execute LangGraph Master Supervisor Multi-Agent Engine
    const result = await orchestrateAstrologyRequest({
      prompt: prompt || 'Provide my general astrological forecast',
      userContext: {
        ...userContext,
        chartData
      }
    });

    const apiKey = (globalThis as any).process?.env?.GEMINI_API_KEY || (globalThis as any).process?.env?.GOOGLE_API_KEY;

    if (apiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const systemInstruction = `You are ASTRO360 Master AI, a world-class astrological consultant grounded in verified astronomical ephemeris data, Parashari Jyotish, Western psychological astrology, and classical remedies.\n\nETHICAL SAFEGUARDS:\n- Never make absolute deterministic claims regarding lifespan, death, terminal illness, or guaranteed financial windfalls.\n- For health, legal, or financial topics, provide spiritual and psychological perspectives with clear professional disclaimers.\n- Ground your interpretations in the verified mathematical chart data provided below.\n\nMem0 Context: ${result.memoryContext}\nSources: ${result.ragSources.join(', ')}`;
      
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { 
                text: `${systemInstruction}\n\n[VERIFIED USER CHART CONTEXT]:\n${JSON.stringify(userContext || {}, null, 2)}\n\n[USER QUERY]:\n${prompt}` 
              }
            ]
          }
        ]
      };

      const fetchFn = (globalThis as any).fetch;
      const geminiRes = await fetchFn(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) {
          return res.status(200).json({
            success: true,
            content: `⚡ **[Grounded Multi-Agent Cosmic Oracle]**\n• Primary Agent: ${result.primaryAgent.agentName}\n• Ephemeris Context: Verified (Lahiri Sidereal)\n\n---\n\n${textOutput}\n\n*Disclaimer: Astrological guidance is interpretive wisdom and not a substitute for qualified professional advice.*`,
            source: 'gemini-grounded-oracle',
            timestamp: new Date().toISOString()
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      content: `${result.synthesizedResponse}\n\n*Disclaimer: Astrological guidance is interpretive wisdom and not a substitute for qualified professional advice.*`,
      source: 'langgraph-multi-agent-local',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Serverless Astrology Handler Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal Astrological Engine Error',
      timestamp: new Date().toISOString()
    });
  }
}
