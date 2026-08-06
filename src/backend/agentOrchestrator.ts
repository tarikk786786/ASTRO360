/**
 * LangGraph Master Supervisor State Graph Orchestrator
 * Routes prompts dynamically across 16 specialized agents, queries Mem0 memory & LlamaIndex RAG knowledge base.
 */

import {
  AgentRequest,
  AgentResult,
  executeBirthChartAgent,
  executeHoroscopeAgent,
  executeTransitAgent,
  executeDashaAgent,
  executeCompatibilityAgent,
  executePanchangAgent,
  executeMuhurtaAgent,
  executeNumerologyAgent,
  executePalmistryAgent,
  executeFaceReadingAgent,
  executeTarotAgent,
  executeReportGeneratorAgent,
  executeResearchAgent,
  executeSEOAgent,
  executeNotificationAgent,
  executeMasterSupervisor
} from './specializedAgents';

import { memoryManager } from './memoryManager';
import { searchRAGKnowledgeBase } from './ragKnowledgeBase';

export interface OrchestrationResult {
  primaryAgent: AgentResult;
  secondaryAgents: AgentResult[];
  ragSources: string[];
  memoryContext: string;
  synthesizedResponse: string;
}

export async function orchestrateAstrologyRequest(req: AgentRequest): Promise<OrchestrationResult> {
  const p = req.prompt.toLowerCase();
  const userId = req.userContext?.name || 'anonymous_user';

  // 1. Query Mem0 Memory Layer
  const memoryContext = await memoryManager.getContextString(userId);

  // 2. Query LlamaIndex RAG Vector Search
  const ragDocs = await searchRAGKnowledgeBase(req.prompt);
  const ragSources = ragDocs.map(d => `${d.source}: ${d.title}`);

  // 3. Supervisor Agent State Graph Selection
  let primaryAgent: AgentResult;
  let secondaryAgents: AgentResult[] = [];

  if (p.includes('chart') || p.includes('kundli') || p.includes('lagna') || p.includes('birth')) {
    primaryAgent = await executeBirthChartAgent(req);
    secondaryAgents.push(await executeDashaAgent(req));
  } else if (p.includes('horoscope') || p.includes('transit') || p.includes('today')) {
    primaryAgent = await executeHoroscopeAgent(req);
    secondaryAgents.push(await executeTransitAgent(req));
  } else if (p.includes('compatibility') || p.includes('love') || p.includes('match') || p.includes('marriage')) {
    primaryAgent = await executeCompatibilityAgent(req);
    secondaryAgents.push(await executeBirthChartAgent(req));
  } else if (p.includes('panchang') || p.includes('tithi') || p.includes('nakshatra')) {
    primaryAgent = await executePanchangAgent(req);
    secondaryAgents.push(await executeMuhurtaAgent(req));
  } else if (p.includes('muhurta') || p.includes('time') || p.includes('rahu') || p.includes('window')) {
    primaryAgent = await executeMuhurtaAgent(req);
    secondaryAgents.push(await executePanchangAgent(req));
  } else if (p.includes('numerology') || p.includes('number') || p.includes('life path')) {
    primaryAgent = await executeNumerologyAgent(req);
  } else if (p.includes('palm') || p.includes('hand')) {
    primaryAgent = await executePalmistryAgent(req);
  } else if (p.includes('face') || p.includes('mian xiang')) {
    primaryAgent = await executeFaceReadingAgent(req);
  } else if (p.includes('tarot') || p.includes('card')) {
    primaryAgent = await executeTarotAgent(req);
  } else if (p.includes('dasha') || p.includes('mahadasha')) {
    primaryAgent = await executeDashaAgent(req);
  } else {
    // Default: Multi-Agent Synthesis via Master Supervisor
    primaryAgent = await executeMasterSupervisor(req);
    secondaryAgents.push(await executeBirthChartAgent(req));
    secondaryAgents.push(await executeHoroscopeAgent(req));
  }

  // 4. Synthesize Final Multi-Agent Output
  const synthesizedResponse = `⚡ **[LangGraph Multi-Agent Engine Executed]**\n` +
    `• **Primary Agent**: ${primaryAgent.agentName} (${primaryAgent.agentRole})\n` +
    `• **Mem0 Memory Context**: ${memoryContext}\n` +
    `• **LlamaIndex RAG Citations**: ${ragSources.join(' | ')}\n\n` +
    `---\n\n` +
    `${primaryAgent.content}\n\n` +
    (secondaryAgents.length > 0 ? `---\n\n### 👥 Secondary Agent Insights:\n` + secondaryAgents.map(a => `**${a.agentName}**: ${a.content}`).join('\n\n') : '');

  return {
    primaryAgent,
    secondaryAgents,
    ragSources,
    memoryContext,
    synthesizedResponse
  };
}
