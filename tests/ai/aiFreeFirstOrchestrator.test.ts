/**
 * ASTRO360 Free-First AI Orchestrator Test Suite
 * Tests Level 0 deterministic routing, tool authority, MCP protocol,
 * hybrid RAG search, lineage agreement, and personal problem solving.
 */

import { AIComplexityRouter } from '../../src/ai/router/aiComplexityRouter';
import { AstrologyToolRegistry } from '../../src/ai/tools/astrologyToolRegistry';
import { AstroMcpServer } from '../../src/ai/mcp/astroMcpServer';
import { KnowledgeEngine } from '../../src/ai/rag/knowledgeEngine';
import { PersonalProblemSolver } from '../../src/ai/solver/personalProblemSolver';
import { UserProfile } from '../../src/types';

console.log('🧪 Running ASTRO360 Free-First AI Orchestrator Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ Passed [${testName}] ${detail ? `➔ ${detail}` : ''}`);
    passedTests++;
  } else {
    console.error(`❌ FAILED [${testName}] ${detail ? `➔ ${detail}` : ''}`);
    process.exit(1);
  }
}

const mockProfile: UserProfile = {
  id: 'test_user_ai',
  name: 'Tarik Islam',
  gender: 'male',
  dob: '1998-02-22',
  time: '12:00',
  location: 'New Delhi, India',
  preferredSystem: 'vedic'
};

async function runTests() {
  // 1. Deterministic Router (Level 0)
  console.log('--- 1. AI COMPLEXITY ROUTER (LEVEL 0 vs LEVEL 2) ---');
  const r0 = AIComplexityRouter.route('What is my Ascendant sign?');
  assert(r0.level === 0, 'Level 0 for Ascendant question', `Level: ${r0.level}`);
  assert(r0.requiresLLM === false, 'Requires zero LLM tokens');
  assert(r0.directTool === 'getAscendant', 'Directly targets getAscendant tool');

  const r2 = AIComplexityRouter.route('Compare my marriage timing across Vedic and Western systems');
  assert(r2.level === 2, 'Level 2 for multi-engine comparison', `Level: ${r2.level}`);
  assert(r2.requiresLLM === true, 'Requires LLM synthesis');
  assert(r2.modelTier === 'REASONING_LOCAL', 'Targets REASONING_LOCAL tier');

  // 2. Astrology Tool Registry
  console.log('\n--- 2. ASTROLOGY TOOL REGISTRY ---');
  const toolList = AstrologyToolRegistry.listTools();
  assert(toolList.length >= 4, 'Tool registry has >= 4 deterministic tools', `Count: ${toolList.length}`);

  const ascResult = await AstrologyToolRegistry.executeTool('getAscendant', {}, mockProfile);
  assert(ascResult.ascendantSign !== undefined, 'getAscendant returns calculated sign', ascResult.ascendantSign);

  const planResult = await AstrologyToolRegistry.executeTool('getPlanetaryPositions', {}, mockProfile);
  assert(planResult.planets.length > 0, 'getPlanetaryPositions returns planetary array', `${planResult.planets.length} planets`);

  // 3. MCP Server Protocol
  console.log('\n--- 3. MCP SERVER PROTOCOL ---');
  const mcpList = await AstroMcpServer.handleRequest({ method: 'tools/list' });
  assert(mcpList.result?.tools?.length > 0, 'MCP server lists tools');

  const mcpCall = await AstroMcpServer.handleRequest({
    method: 'tools/call',
    params: { name: 'getAscendant', profile: mockProfile }
  });
  assert(mcpCall.result?.ascendantSign !== undefined, 'MCP tools/call executes getAscendant cleanly');

  // 4. Hybrid RAG Search
  console.log('\n--- 4. HYBRID RAG KNOWLEDGE ENGINE ---');
  const ragResults = KnowledgeEngine.hybridSearch('career 10th lord promotion', {}, 2);
  assert(ragResults.length > 0, 'RAG hybrid search returns relevant chunks', `${ragResults.length} chunks`);
  assert(ragResults[0].citation !== undefined, 'RAG chunk includes source citation');

  // 5. Personal Problem Solver
  console.log('\n--- 5. PERSONAL PROBLEM SOLVER ---');
  const solved = await PersonalProblemSolver.solve('My career feels stuck. What does astrology indicate?', mockProfile);
  assert(solved.timing.start !== undefined, 'Generates timing window', `${solved.timing.start} - ${solved.timing.end}`);
  assert(solved.agreement.agreementPercent > 0, 'Calculates multi-engine agreement', `${solved.agreement.agreementPercent}%`);
  assert(solved.whatYouCanControl.length === 3, 'Provides 3 practical user agency control actions');
  assert(solved.whatIsLessCertain.length > 0, 'Discloses birth-time and timing uncertainties');
  assert(solved.reproducibility.ephemerisVersion === 'NASA_JPL_DE440_IAU_2006', 'Includes cryptographic ephemeris reproducibility');

  console.log(`\n============================================================`);
  console.log(`🏆 ALL ${passedTests}/${totalTests} FREE-FIRST AI ORCHESTRATOR TESTS PASSED!`);
  console.log(`============================================================\n`);
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
