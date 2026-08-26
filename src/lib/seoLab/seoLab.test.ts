/**
 * ASTRO360 SEO LAB - Comprehensive Verification Test Suite
 * Validates Technical Audit, Crawler, Schema Lab, Intent Classification, Backlinks & CWV.
 */

import { SeoAuditEngine } from './seoAuditEngine';
import { SiteCrawlerEngine } from './siteCrawlerEngine';
import { SchemaLabEngine } from './schemaLabEngine';
import { KeywordWorkspaceEngine } from './keywordWorkspaceEngine';
import { BacklinkExplorerEngine } from './backlinkExplorerEngine';
import { PerformanceMobileLabEngine } from './performanceMobileLabEngine';
import { AiAeoCopilotEngine } from './aiAeoCopilotEngine';
import { SeoReportGenerator } from './seoReportGenerator';

console.log('🧪 Running ASTRO360 SEO LAB Verification Suite...\n');

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

// ─────────────────────────────────────────────────────────────────────────────
// 1. COMPREHENSIVE SEO AUDIT ENGINE
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- 1. TECHNICAL AUDIT ENGINE ---');

const audit = SeoAuditEngine.runAudit('https://astro.tarikislam.in/');
assert(audit.overallHealthScore >= 90, 'Overall health score satisfies Google Search Essentials (>=90%)', `${audit.overallHealthScore}%`);
assert(audit.pages.length >= 4, 'Audit scans multiple canonical routes');
assert(audit.issues.length >= 3, 'Identified prioritized technical issues with actionable fixes');

const p0Issue = audit.issues.find(i => i.priority === 'P0');
assert(p0Issue !== undefined, 'P0 Critical Issue identified');
assert(p0Issue?.whyItMatters.length! > 20, 'Issue includes comprehensive "Why It Matters" rationale');
assert(p0Issue?.howToFix.length! > 20, 'Issue includes specific "How to Fix" engineering instructions');
assert(p0Issue?.evidence.length! > 10, 'Issue includes empirical evidence');

// ─────────────────────────────────────────────────────────────────────────────
// 2. SITE CRAWLER & SSRF SECURITY GUARDRAILS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 2. SITE CRAWLER & SECURITY GUARDRAILS ---');

const internalIpCheck = SiteCrawlerEngine.validateTargetUrl('http://127.0.0.1:8080');
assert(!internalIpCheck.valid, 'SSRF Protection strictly blocks private IP addresses (127.0.0.1)');

const validUrlCheck = SiteCrawlerEngine.validateTargetUrl('https://astro.tarikislam.in/');
assert(validUrlCheck.valid, 'Valid public domain allowed for crawling');

const crawlResult = SiteCrawlerEngine.crawlSite({
  targetUrl: 'https://astro.tarikislam.in/',
  maxPages: 20,
  maxDepth: 2,
  concurrency: 4,
  timeoutMs: 5000,
  userAgent: 'ASTRO360-Bot',
  respectRobots: true,
  renderJavaScript: true
});
assert(crawlResult.totalCrawled >= 4, 'Site crawler discovers and inspects canonical indexable URLs');
assert(crawlResult.crawlDurationMs > 0, 'Crawl execution time measured cleanly', `${crawlResult.crawlDurationMs}ms`);

// ─────────────────────────────────────────────────────────────────────────────
// 3. SCHEMA LAB VALIDATION & GENERATION
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 3. SCHEMA LAB VALIDATION & GENERATION ---');

const softwareSchema = SchemaLabEngine.generateSchema('SoftwareApplication');
const validationResult = SchemaLabEngine.validateJsonLd(softwareSchema);
assert(validationResult.valid, 'Generated SoftwareApplication Schema is valid JSON-LD');
assert(validationResult.type === 'SoftwareApplication', 'Identifies correct Schema @type');

const faqSchema = SchemaLabEngine.generateSchema('FAQPage');
const faqValidation = SchemaLabEngine.validateJsonLd(faqSchema);
assert(faqValidation.valid, 'Generated FAQPage Schema passes syntax verification');

// ─────────────────────────────────────────────────────────────────────────────
// 4. KEYWORD INTENT & CONTENT BRIEF GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 4. KEYWORD INTENT & CONTENT BRIEF ENGINE ---');

const calcIntent = KeywordWorkspaceEngine.classifyIntent('free birth chart calculator');
assert(calcIntent === 'CALCULATOR', 'Classifies calculator search intent accurately', calcIntent);

const infoIntent = KeywordWorkspaceEngine.classifyIntent('what is rohini nakshatra');
assert(infoIntent === 'INFORMATIONAL', 'Classifies informational query intent accurately', infoIntent);

const brief = KeywordWorkspaceEngine.generateContentBrief('free birth chart calculator');
assert(brief.recommendedH2s.length >= 4, 'Generates structured H2 outlines for content writers');
assert(brief.mustIncludeEntities.length >= 3, 'Identifies core topical entities for AEO visibility');

// ─────────────────────────────────────────────────────────────────────────────
// 5. ETHICAL BACKLINK DISCOVERY & PROSPECTING
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 5. ETHICAL BACKLINK DISCOVERY & PR OUTREACH ---');

const backlinks = BacklinkExplorerEngine.getBacklinks();
assert(backlinks.every(b => b.spamRisk === 'ZERO'), 'All tracked backlinks are zero spam risk');

const prospects = BacklinkExplorerEngine.getProspects();
assert(prospects.length >= 2, 'Curates high-trust editorial backlink prospects');
assert(prospects.every(p => p.pitchBody.length > 20), 'Generates personalized non-spam outreach pitch');

// ─────────────────────────────────────────────────────────────────────────────
// 6. CORE WEB VITALS & MULTI-SCREEN MOBILE AUDIT
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 6. CORE WEB VITALS & MULTI-SCREEN MOBILE AUDIT ---');

const cwv = PerformanceMobileLabEngine.getCoreWebVitalsMetrics();
assert(cwv.lcp.value < 2.5, 'LCP satisfies Google "Good" threshold (< 2.5s)', `${cwv.lcp.value}s`);
assert(cwv.inp.value < 200, 'INP satisfies Google "Good" threshold (< 200ms)', `${cwv.inp.value}ms`);
assert(cwv.cls.value < 0.1, 'CLS satisfies Google "Good" threshold (< 0.1)', `${cwv.cls.value}`);

const mobileScreens = PerformanceMobileLabEngine.auditMobileViewports();
assert(mobileScreens.length === 6, 'Audits across 6 standard mobile viewport widths (320px to 430px)');
assert(mobileScreens.every(s => s.minTouchTargetPassed), 'Enforces >=44x44px touch targets across all mobile breakpoints');

// ─────────────────────────────────────────────────────────────────────────────
// 7. AI SEARCH / GEO / AEO & MULTI-FORMAT REPORT EXPORTS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 7. AI SEARCH AEO & REPORT EXPORTS ---');

const aeo = AiAeoCopilotEngine.evaluateAeoReadiness();
assert(aeo.aiVisibilityScore >= 90, 'AI search visibility score satisfies high direct-answer threshold', `${aeo.aiVisibilityScore}%`);

const markdownReport = SeoReportGenerator.generateMarkdownReport(audit);
assert(markdownReport.includes('ASTRO360 SEO LAB AUDIT REPORT'), 'Generates complete Markdown executive audit report');

const csvReport = SeoReportGenerator.generateCsvReport(audit);
assert(csvReport.includes('URL,Status,Title'), 'Generates valid CSV URL matrix with correct header schema');

console.log(`\n🎉 All ${passedTests}/${totalTests} ASTRO360 SEO LAB Verification Tests Passed Cleanly!\n`);
