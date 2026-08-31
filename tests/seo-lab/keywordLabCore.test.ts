import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { normalizeKeyword, stemKeyword, processKeywordNormalization, deduplicateKeywords } from '../../src/lib/seo-lab/keywordNormalizer';
import { classifyKeywordIntent } from '../../src/lib/seo-lab/intentClassifier';
import { classifyAstrologyCluster, ASTROLOGY_PILLAR_DEFINITIONS } from '../../src/lib/seo-lab/astrologyClusterEngine';
import { calculateDeterministicTrend } from '../../src/lib/seo-lab/trendsEngine';
import { parseGSCData, summarizeGSCData, findGSCMatch } from '../../src/lib/seo-lab/gscEngine';
import { generateAstrologyQuestions } from '../../src/lib/seo-lab/questionEngine';
import { mapKeywordToURL } from '../../src/lib/seo-lab/urlMappingEngine';
import { calculateOpportunityScore } from '../../src/lib/seo-lab/opportunityScorer';
import { generateContentBrief } from '../../src/lib/seo-lab/contentBriefEngine';
import { analyzeCompetitorGaps } from '../../src/lib/seo-lab/competitorGapEngine';
import { generateTrendAlerts } from '../../src/lib/seo-lab/trendMonitorEngine';
import { exportKeywordsToCSV, exportKeywordsToJSON, exportKeywordsToMarkdown } from '../../src/lib/seo-lab/exportEngine';
import { runKeywordResearchPipeline } from '../../src/lib/seo-lab/keywordLabCore';
import { seoLabCache, RateLimitedQueue } from '../../src/lib/seo-lab/rateLimiter';

describe('ASTRO360 SEO Keyword Research Lab Test Suite', () => {

  // ── 1. Keyword Normalization & Stemming ───────────────────────────
  describe('Keyword Normalization Engine', () => {
    it('normalizes case, whitespace, and punctuation', () => {
      const raw = '  Birth   Chart:   Online & Free??  ';
      const norm = normalizeKeyword(raw);
      assert.equal(norm, 'birth chart online free');
    });

    it('preserves domain-specific astrology plurals correctly', () => {
      assert.equal(stemKeyword('birth charts'), 'birth chart');
      assert.equal(stemKeyword('nakshatras'), 'nakshatra');
      assert.equal(stemKeyword('vimshottari dashas'), 'vimshottari dasha');
      assert.equal(stemKeyword('gemstones'), 'gemstone');
      assert.equal(stemKeyword('panchangas'), 'panchanga');
    });

    it('handles Unicode and foreign languages (Hindi, Arabic, Chinese)', () => {
      const hindi = 'जन्म कुंडली कैलकुलेटर';
      const normHindi = normalizeKeyword(hindi);
      assert.ok(normHindi.length > 0);

      const arabic = 'خريطة الأبراج الفلكية';
      const normArabic = normalizeKeyword(arabic);
      assert.ok(normArabic.length > 0);

      const chinese = '生辰八字算命';
      const normChinese = normalizeKeyword(chinese);
      assert.ok(normChinese.length > 0);
    });

    it('handles empty and extreme inputs gracefully', () => {
      assert.equal(normalizeKeyword(''), '');
      assert.equal(normalizeKeyword('   '), '');
      const veryLong = 'a'.repeat(2000);
      assert.equal(normalizeKeyword(veryLong), veryLong);
    });

    it('deduplicates keyword arrays preserving unique stems', () => {
      const list = [
        { rawKeyword: 'Birth Chart' },
        { rawKeyword: 'birth charts' },
        { rawKeyword: 'BIRTH CHART calculator' }
      ];
      const deduped = deduplicateKeywords(list);
      assert.equal(deduped.length, 2);
    });
  });

  // ── 2. Search Intent Classification ───────────────────────────────
  describe('Intent Classification Engine', () => {
    it('classifies TOOL intent correctly', () => {
      assert.equal(classifyKeywordIntent('birth chart calculator').primary, 'TOOL');
      assert.equal(classifyKeywordIntent('free kundli generator online').primary, 'TOOL');
      assert.equal(classifyKeywordIntent('ashta koota matching score').primary, 'TOOL');
    });

    it('classifies COMMERCIAL and TRANSACTIONAL intent', () => {
      assert.equal(classifyKeywordIntent('best astrologer in india').primary, 'COMMERCIAL');
      assert.equal(classifyKeywordIntent('buy certified yellow sapphire gemstone').primary, 'TRANSACTIONAL');
      assert.equal(classifyKeywordIntent('astrology reading service cost').primary, 'TRANSACTIONAL');
    });

    it('classifies INFORMATIONAL, QUESTION, and HOW-TO intents', () => {
      const q1 = classifyKeywordIntent('what is nakshatra meaning');
      assert.equal(q1.primary, 'INFORMATIONAL');
      assert.equal(q1.secondary, 'DEFINITION');

      const q2 = classifyKeywordIntent('how to calculate lagna in kundli');
      assert.equal(q2.primary, 'INFORMATIONAL');
      assert.equal(q2.secondary, 'HOW-TO');

      const q3 = classifyKeywordIntent('vedic vs western astrology difference');
      assert.equal(q3.primary, 'INFORMATIONAL');
      assert.equal(q3.secondary, 'COMPARISON');
    });

    it('classifies NAVIGATIONAL and LOCAL intents', () => {
      assert.equal(classifyKeywordIntent('astro360 login portal').primary, 'NAVIGATIONAL');
      assert.equal(classifyKeywordIntent('astrologer near me in london').primary, 'LOCAL');
    });
  });

  // ── 3. Classical Astrology Taxonomy Clusters ──────────────────────
  describe('Astrology Cluster Engine', () => {
    it('maps 16 classical pillars accurately', () => {
      assert.equal(classifyAstrologyCluster('janam kundli birth chart'), 'BIRTH CHART');
      assert.equal(classifyAstrologyCluster('chandra rashi calculator'), 'MOON SIGN');
      assert.equal(classifyAstrologyCluster('first house rising sign lagna'), 'RISING SIGN');
      assert.equal(classifyAstrologyCluster('rohini nakshatra pada 2'), 'NAKSHATRA');
      assert.equal(classifyAstrologyCluster('shani mahadasha rahu antardasha'), 'DASHA');
      assert.equal(classifyAstrologyCluster('today panchang tithi rahu kalam'), 'PANCHANGA');
      assert.equal(classifyAstrologyCluster('36 guna ashta koota matching'), 'COMPATIBILITY');
      assert.equal(classifyAstrologyCluster('saturn transit gochara 2026'), 'TRANSITS');
      assert.equal(classifyAstrologyCluster('navamsha d9 varga chart'), 'VEDIC ASTROLOGY');
      assert.equal(classifyAstrologyCluster('placidus houses tropical aspects'), 'WESTERN ASTROLOGY');
      assert.equal(classifyAstrologyCluster('kp cuspal sub lord 249'), 'KP');
      assert.equal(classifyAstrologyCluster('jaimini atmakaraka chara dasha'), 'JAIMINI');
      assert.equal(classifyAstrologyCluster('shubh vivah muhurta 2026'), 'MUHURTA');
      assert.equal(classifyAstrologyCluster('astrocartography relocation sun line'), 'ASTROCARTOGRAPHY');
      assert.equal(classifyAstrologyCluster('sade sati gemstone remedy'), 'REMEDIES');
      assert.equal(classifyAstrologyCluster('astrology for beginners'), 'ASTROLOGY BASICS');
    });

    it('provides valid scripture citations for every pillar', () => {
      for (const pillar of Object.values(ASTROLOGY_PILLAR_DEFINITIONS)) {
        assert.ok(pillar.scriptureRef.length > 5, `Missing citation for ${pillar.pillar}`);
        assert.ok(pillar.pillarUrl.startsWith('/'), `Invalid pillarUrl for ${pillar.pillar}`);
        assert.ok(pillar.primaryToolUrl.startsWith('/'), `Invalid toolUrl for ${pillar.pillar}`);
      }
    });
  });

  // ── 4. Google Trends Deterministic Relative Engine ────────────────
  describe('Google Trends Engine', () => {
    it('calculates deterministic relative interest score (0-100)', () => {
      const trend = calculateDeterministicTrend('birth chart calculator', 'today 1-m', 'US');
      assert.ok(trend.score >= 0 && trend.score <= 100);
      assert.ok(trend.sparkline.length > 0);
      assert.ok(['RISING', 'STABLE', 'DECLINING'].includes(trend.direction));
      assert.equal(trend.label, 'DIRECTIONAL SIGNAL ONLY');
    });

    it('maintains strict "No Fake Volumes" principle', () => {
      const trend = calculateDeterministicTrend('nakshatra', 'today 3-m', 'IN');
      assert.equal(typeof (trend as any).monthlySearchVolume, 'undefined');
    });
  });

  // ── 5. Search Console (GSC) First-Party Engine ─────────────────────
  describe('Google Search Console Engine', () => {
    it('parses CSV data and flags striking distance opportunities', () => {
      const csv = `Top queries,Clicks,Impressions,CTR,Position\nbirth chart calculator,150,3000,5.0%,5.2\nrare nakshatra,2,1200,0.16%,18.4`;
      const parsed = parseGSCData(csv);
      assert.equal(parsed.length, 2);
      assert.equal(parsed[0].query, 'birth chart calculator');
      assert.equal(parsed[0].opportunityType, 'Striking Distance (Pos 4-15)');
    });

    it('summarizes GSC performance metrics cleanly', () => {
      const csv = `Top queries,Clicks,Impressions,CTR,Position\nbirth chart,100,2000,5.0%,3.0\nnakshatra,50,1000,5.0%,8.0`;
      const parsed = parseGSCData(csv);
      const summary = summarizeGSCData(parsed);
      assert.equal(summary.totalQueries, 2);
      assert.equal(summary.totalClicks, 150);
      assert.equal(summary.totalImpressions, 3000);
      assert.equal(summary.avgPosition, 5.5);
    });

    it('matches incoming keywords against GSC first-party data', () => {
      const gscQueries = parseGSCData(`Top queries,Clicks,Impressions,CTR,Position\nbirth chart calculator,100,2000,5.0%,4.5`);
      const match = findGSCMatch('birth chart calculator online', gscQueries);
      assert.ok(match !== undefined);
      assert.equal(match?.query, 'birth chart calculator');
    });
  });

  // ── 6. Keyword-to-URL Mapping & Cannibalization ────────────────────
  describe('Keyword-to-URL Engine', () => {
    it('maps existing tool and guide routes properly', () => {
      const map1 = mapKeywordToURL('birth chart calculator', 'TOOL', 'BIRTH CHART');
      assert.equal(map1.status, 'EXISTS_OPTIMIZED');
      assert.equal(map1.targetUrl, '/free-tools/birth-chart');

      const map2 = mapKeywordToURL('today panchang tithi', 'TOOL', 'PANCHANGA');
      assert.equal(map2.targetUrl, '/panchanga');
    });

    it('identifies content gaps and tool needs', () => {
      const mapGap = mapKeywordToURL('ancient babylonian planetary aspect table', 'INFORMATIONAL', 'WESTERN ASTROLOGY');
      assert.equal(mapGap.status, 'MISSING_NEW_PAGE');
      assert.ok(mapGap.targetUrl.startsWith('/learn/'));

      const mapToolGap = mapKeywordToURL('custom tarot spread simulator', 'TOOL', 'ASTROLOGY BASICS');
      assert.equal(mapToolGap.status, 'TOOL_NEEDED');
      assert.ok(mapToolGap.targetUrl.startsWith('/free-tools/'));
    });
  });

  // ── 7. Transparent Opportunity Priority Scorer ────────────────────
  describe('Opportunity Priority Scorer', () => {
    it('scores keywords transparently between 0 and 100', () => {
      const trend = calculateDeterministicTrend('nakshatra calculator', 'today 1-m', 'US');
      const mapping = mapKeywordToURL('nakshatra calculator', 'TOOL', 'NAKSHATRA');
      const opp = calculateOpportunityScore({
        keyword: 'nakshatra calculator',
        primaryIntent: 'TOOL',
        secondaryIntent: 'GENERAL',
        cluster: 'NAKSHATRA',
        trend,
        mapping
      });

      assert.ok(opp.total >= 0 && opp.total <= 100);
      assert.ok(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].includes(opp.tier));
      assert.ok(opp.explanation.length > 10);
    });

    it('gives maximum boost to First-Party GSC Striking Distance queries', () => {
      const trend = calculateDeterministicTrend('kundli online', 'today 1-m', 'IN');
      const mapping = mapKeywordToURL('kundli online', 'TOOL', 'BIRTH CHART');
      const gscData = {
        query: 'kundli online',
        clicks: 80,
        impressions: 2500,
        ctr: 0.032,
        position: 6.4,
        opportunityType: 'Striking Distance (Pos 4-15)' as const
      };

      const opp = calculateOpportunityScore({
        keyword: 'kundli online',
        primaryIntent: 'TOOL',
        secondaryIntent: 'GENERAL',
        cluster: 'BIRTH CHART',
        trend,
        gscData,
        mapping
      });

      assert.equal(opp.breakdown.firstPartyGscGap, 20);
      assert.ok(opp.total >= 70);
    });
  });

  // ── 8. Evidence-Grounded Content Brief Engine ─────────────────────
  describe('Content Brief Generator', () => {
    it('generates structured outlines with AEO 40-word answers and scripture citations', () => {
      const trend = calculateDeterministicTrend('birth chart', 'today 1-m', 'US');
      const mapping = mapKeywordToURL('birth chart', 'INFORMATIONAL', 'BIRTH CHART');
      const item = {
        id: 'test-kw-1',
        rawKeyword: 'birth chart meaning',
        normalizedKeyword: 'birth chart meaning',
        primaryIntent: 'INFORMATIONAL' as const,
        secondaryIntent: 'DEFINITION' as const,
        cluster: 'BIRTH CHART' as const,
        source: 'Google Autocomplete' as const,
        requiresApi: false,
        trend,
        relatedQueries: ['birth chart calculator', 'kundli in vedic'],
        questionVariants: ['What is a birth chart?'],
        mapping,
        opportunity: { total: 85, tier: 'CRITICAL' as const, breakdown: {} as any, explanation: 'Test' },
        freshness: 'Real-time'
      };

      const brief = generateContentBrief(item);
      assert.ok(brief.h1Title.length > 5);
      assert.ok(brief.outline.length >= 4);
      assert.ok(brief.faqList.length >= 2);
      assert.ok(brief.sourceCitations.length >= 2);
      assert.ok(brief.internalLinkTargets.length >= 2);
      assert.ok(brief.primaryToolCTA.ctaCopy.length > 10);
    });
  });

  // ── 9. Multi-Format Exporter ──────────────────────────────────────
  describe('Multi-Format Export Engine', () => {
    it('exports clean CSV, JSON, and Markdown reports', () => {
      const trend = calculateDeterministicTrend('nakshatra', 'today 1-m', 'US');
      const mapping = mapKeywordToURL('nakshatra', 'INFORMATIONAL', 'NAKSHATRA');
      const items = [{
        id: 'test-1',
        rawKeyword: 'nakshatra finder',
        normalizedKeyword: 'nakshatra finder',
        primaryIntent: 'TOOL' as const,
        secondaryIntent: 'GENERAL' as const,
        cluster: 'NAKSHATRA' as const,
        source: 'Google Autocomplete' as const,
        requiresApi: false,
        trend,
        relatedQueries: [],
        questionVariants: ['How to find my nakshatra?'],
        mapping,
        opportunity: { total: 82, tier: 'CRITICAL' as const, breakdown: {} as any, explanation: 'Test' },
        freshness: 'Real-time'
      }];

      const csv = exportKeywordsToCSV(items);
      assert.ok(csv.includes('keyword,intent,source,trend,priority,targetUrl,cluster,notes'));
      assert.ok(csv.includes('nakshatra finder'));

      const json = exportKeywordsToJSON(items);
      assert.ok(json.includes('ASTRO360 SEO Keyword Research Lab'));

      const md = exportKeywordsToMarkdown(items, 'nakshatra');
      assert.ok(md.includes('# ASTRO360 Keyword Research Lab Report'));
      assert.ok(md.includes('nakshatra finder'));
    });
  });

  // ── 10. End-to-End Orchestrator Pipeline ──────────────────────────
  describe('Full Keyword Research Pipeline', () => {
    it('executes full pipeline on "birth chart" returning items, clusters, and gaps', async () => {
      const result = await runKeywordResearchPipeline({
        seed: 'birth chart',
        country: 'United States',
        countryCode: 'US',
        language: 'English',
        languageCode: 'en',
        engine: 'google',
        device: 'desktop',
        category: 'Astrology',
        timeRange: 'today 1-m'
      });

      assert.ok(result.items.length > 0, 'Should return mined keywords');
      assert.ok(result.clusters.length > 0, 'Should categorize into clusters');
      assert.ok(result.competitorGaps.length > 0, 'Should analyze competitor gaps');
      assert.equal(result.input.seed, 'birth chart');
    });

    it('handles empty seed query cleanly', async () => {
      const result = await runKeywordResearchPipeline({
        seed: '',
        country: 'United States',
        countryCode: 'US',
        language: 'English',
        languageCode: 'en',
        engine: 'google',
        device: 'desktop',
        category: 'Astrology',
        timeRange: 'today 1-m'
      });

      assert.equal(result.items.length, 0);
      assert.equal(result.clusters.length, 0);
    });
  });

  // ── 11. Rate Limiter and Caching ──────────────────────────────────
  describe('Rate Limiter & Caching', () => {
    it('caches and retrieves items reliably', () => {
      seoLabCache.set('test_key_1', { hello: 'world' }, 10000);
      const val = seoLabCache.get<{ hello: string }>('test_key_1');
      assert.deepEqual(val, { hello: 'world' });
    });

    it('schedules tasks within concurrency limits', async () => {
      const queue = new RateLimitedQueue(2, 50);
      const results: number[] = [];
      const promises = [1, 2, 3, 4].map(n => 
        queue.schedule(async () => {
          results.push(n);
          return n;
        })
      );
      const resolved = await Promise.all(promises);
      assert.deepEqual(resolved, [1, 2, 3, 4]);
    });
  });

});
