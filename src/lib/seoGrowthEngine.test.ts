/**
 * Automated Verification Suite for ASTRO360 SEO Growth Engine & Auditor
 */

import { 
  runFullSEOCrawlerAudit, 
  ASTRO360_INDEXABLE_PAGES, 
  ASTRO360_TOPIC_CLUSTERS, 
  ASTRO360_BACKLINK_PROSPECTS 
} from './seoGrowthEngine';

console.log('🧪 Running ASTRO360 SEO Growth Engine & Auditor Verification Suite...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ Passed [${testName}]`);
    passedTests++;
  } else {
    console.error(`❌ FAILED [${testName}]`);
    process.exit(1);
  }
}

// 1. Audit Health & Indexable Pages Test
const audit = runFullSEOCrawlerAudit();
assert(audit.totalPages > 0, 'Audit returns valid indexable public pages');
assert(audit.healthScore >= 90, `SEO health score is high standard: ${audit.healthScore}%`);

// 2. Canonical & Title Standards
audit.pages.forEach((page) => {
  assert(page.status === 200, `Page ${page.path} returns HTTP 200 OK`);
  assert(page.titleLength >= 30 && page.titleLength <= 80, `Page ${page.path} title length within optimal range (30-80 chars): ${page.titleLength}ch`);
  assert(page.descriptionLength >= 100 && page.descriptionLength <= 180, `Page ${page.path} description length within optimal range (100-180 chars): ${page.descriptionLength}ch`);
  assert(page.canonicalStatus === 'self', `Page ${page.path} has self-referential canonical tag`);
  assert(page.hasSchema && page.schemaTypes.length > 0, `Page ${page.path} contains valid JSON-LD schema graphs`);
});

// 3. Topic Clusters & GEO/AEO Verification
assert(ASTRO360_TOPIC_CLUSTERS.length >= 5, 'At least 5 core topic clusters defined');
ASTRO360_TOPIC_CLUSTERS.forEach((cluster) => {
  assert(cluster.geoDirectAnswer.length >= 40, `Cluster ${cluster.name} has substantial direct-answer text for AI search engines`);
  assert(cluster.supportingPages.length >= 2, `Cluster ${cluster.name} has at least 2 supporting educational sub-pages`);
});

// 4. White-Hat Backlink Prospector Safety
assert(ASTRO360_BACKLINK_PROSPECTS.length >= 4, 'Ethical backlink prospects catalog populated');
ASTRO360_BACKLINK_PROSPECTS.forEach((prospect) => {
  assert(prospect.spamRisk === 'Zero (White-Hat)', `Prospect ${prospect.targetDomain} verified as zero spam risk`);
  assert(prospect.relevanceScore >= 80, `Prospect ${prospect.targetDomain} has high relevance score (>=80%)`);
});

console.log(`\n🎉 All ${passedTests}/${totalTests} SEO Growth Engine Verification Tests Passed Cleanly!\n`);
