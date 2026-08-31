import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { discoverBacklinkOpportunities } from '../../src/lib/backlink-lab/prospectDiscoveryEngine';
import { evaluateQualitySignals } from '../../src/lib/backlink-lab/qualityScorer';
import { calculateOpportunityScore } from '../../src/lib/backlink-lab/opportunityScorer';
import { auditBacklinkForToxicity } from '../../src/lib/backlink-lab/toxicLinkEngine';
import { classifyAnchorText, analyzeAnchorDistribution } from '../../src/lib/backlink-lab/anchorAnalysisEngine';
import { isSsrfBlockedHost, verifyBacklinkOnPage } from '../../src/lib/backlink-lab/verificationCrawler';
import { detectLostLinkChanges } from '../../src/lib/backlink-lab/lostLinkMonitor';
import { mapBrokenBacklink } from '../../src/lib/backlink-lab/brokenLinkEngine';
import { generatePersonalizedOutreach } from '../../src/lib/backlink-lab/outreachEngine';
import { getDigitalPRStories } from '../../src/lib/backlink-lab/digitalPREngine';
import { generateBirthChartWidgetSnippet } from '../../src/lib/backlink-lab/embeddableWidgetEngine';
import { exportBacklinksToCSV, exportBacklinksToJSON, exportBacklinksToMarkdown } from '../../src/lib/backlink-lab/reportExportEngine';
import { backlinkApiHandlers } from '../../src/backend/backlinkApiRouter';

describe('ASTRO360 Backlink Opportunity Lab Test Suite', () => {

  // ── 1. Prospect Discovery & Qualification ─────────────────────────
  describe('Prospect Discovery Engine', () => {
    it('discovers and qualifies legitimate prospects with non-empty results', () => {
      const opportunities = discoverBacklinkOpportunities();
      assert.ok(opportunities.length > 0, 'Should discover qualified opportunities');
      for (const opp of opportunities) {
        assert.ok(opp.opportunityScore.total >= 0 && opp.opportunityScore.total <= 100);
        assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(opp.opportunityScore.tier));
        assert.ok(opp.targetUrl.startsWith('/'), 'Target URL should be valid local route');
        assert.ok(opp.sourceDomain.length > 3);
      }
    });

    it('filters opportunities by prospect type and minimum score', () => {
      const filtered = discoverBacklinkOpportunities({ sourceType: 'RESOURCE_PAGE', minScore: 50 });
      for (const opp of filtered) {
        assert.equal(opp.sourceType, 'RESOURCE_PAGE');
        assert.ok(opp.opportunityScore.total >= 50);
      }
    });
  });

  // ── 2. Quality Scoring & Spam Detection ───────────────────────────
  describe('Quality Scoring Engine', () => {
    it('evaluates clean, high-quality editorial pages accurately', () => {
      const signals = evaluateQualitySignals({
        url: 'https://learnastronomy.edu/ephemeris-tools',
        domain: 'learnastronomy.edu',
        topic: 'Swiss Ephemeris & Planetary Transits',
        sourceType: 'EDUCATION',
        totalWordCount: 1600,
        outboundLinksCount: 12,
        hasSsl: true,
        httpStatus: 200
      });

      assert.equal(signals.indexability, true);
      assert.equal(signals.sslValid, true);
      assert.equal(signals.outboundLinkDensity, 'LOW');
      assert.equal(signals.domainHealth, 'HEALTHY');
      assert.equal(signals.spamFlags.length, 0);
    });

    it('flags spam, low-quality TLDs, and excessive outbound links', () => {
      const signals = evaluateQualitySignals({
        url: 'http://free-backlink-directory.xyz/links',
        domain: 'free-backlink-directory.xyz',
        topic: 'free links',
        sourceType: 'DIRECTORY',
        totalWordCount: 100,
        outboundLinksCount: 300,
        hasSsl: false,
        httpStatus: 200
      });

      assert.equal(signals.outboundLinkDensity, 'EXCESSIVE');
      assert.equal(signals.domainHealth, 'FLAGGED');
      assert.ok(signals.spamFlags.length >= 2);
    });
  });

  // ── 3. Opportunity Priority Scorer ────────────────────────────────
  describe('Opportunity Priority Scorer', () => {
    it('computes transparent scores with factors and breakdown', () => {
      const quality = evaluateQualitySignals({
        url: 'https://vedicjournal.org/nakshatra-research',
        domain: 'vedicjournal.org',
        topic: '27 Nakshatras in Vedic Astrology',
        sourceType: 'RESEARCH',
        totalWordCount: 2200,
        outboundLinksCount: 18,
        hasSsl: true,
        httpStatus: 200
      });

      const score = calculateOpportunityScore({
        quality,
        sourceType: 'RESEARCH',
        hasDirectContact: true
      });

      assert.ok(score.total >= 70);
      assert.equal(score.tier, 'HIGH');
      assert.ok(score.breakdown.relevance > 0);
      assert.ok(score.breakdown.editorialFit > 0);
      assert.ok(score.factors.length > 0);
    });
  });

  // ── 4. Toxic & Bad Link Review ────────────────────────────────────
  describe('Toxic Link Audit Engine', () => {
    it('flags link farms and casino/adult contextual mismatches', () => {
      const audit = auditBacklinkForToxicity({
        sourceDomain: 'best-casino-poker-links.com',
        sourceUrl: 'https://best-casino-poker-links.com/directory',
        targetUrl: '/free-tools/birth-chart',
        anchorText: 'free kundli calculator',
        outboundLinksCount: 220,
        snippet: 'Play online casino and poker games with bonuses',
        isSitewide: true
      });

      assert.equal(audit.riskLevel, 'POTENTIALLY_TOXIC');
      assert.equal(audit.recommendedAction, 'DISAVOW_REVIEW');
      assert.equal(audit.adultOrGamblingContext, true);
      assert.equal(audit.linkFarmSignal, true);
    });

    it('clears legitimate editorial links with clean health', () => {
      const audit = auditBacklinkForToxicity({
        sourceDomain: 'spaceandastronomyweekly.com',
        sourceUrl: 'https://spaceandastronomyweekly.com/ephemeris-tools',
        targetUrl: '/transit-radar',
        anchorText: 'ASTRO360 Ingress Radar',
        outboundLinksCount: 15,
        wordCount: 1400
      });

      assert.equal(audit.riskLevel, 'CLEAN');
      assert.equal(audit.recommendedAction, 'KEEP');
    });
  });

  // ── 5. Anchor Text Analysis ───────────────────────────────────────
  describe('Anchor Text Analysis Engine', () => {
    it('classifies anchor texts correctly', () => {
      assert.equal(classifyAnchorText('ASTRO360', '/free-tools/birth-chart'), 'BRAND');
      assert.equal(classifyAnchorText('https://astro360.app', '/free-tools/birth-chart'), 'URL');
      assert.equal(classifyAnchorText('birth chart calculator', '/free-tools/birth-chart'), 'EXACT_MATCH');
      assert.equal(classifyAnchorText('ASTRO360 birth chart calculation', '/free-tools/birth-chart'), 'PARTIAL_MATCH');
      assert.equal(classifyAnchorText('click here', '/free-tools/birth-chart'), 'GENERIC');
      assert.equal(classifyAnchorText('', '/free-tools/birth-chart'), 'IMAGE');
    });

    it('analyzes anchor distribution and flags excessive exact match ratio', () => {
      const anchors = [
        { text: 'birth chart calculator', targetUrl: '/free-tools/birth-chart' },
        { text: 'birth chart calculator', targetUrl: '/free-tools/birth-chart' },
        { text: 'birth chart calculator', targetUrl: '/free-tools/birth-chart' },
        { text: 'ASTRO360', targetUrl: '/free-tools/birth-chart' }
      ];

      const stats = analyzeAnchorDistribution(anchors);
      assert.equal(stats.totalAnchors, 4);
      assert.equal(stats.exactMatchPercent, 75);
      assert.ok(stats.unnaturalFlags.length > 0);
    });
  });

  // ── 6. SSRF Protection & Verification Crawler ─────────────────────
  describe('SSRF Protection & Link Verification', () => {
    it('blocks internal, private, and cloud metadata hosts strictly', () => {
      assert.equal(isSsrfBlockedHost('http://localhost:3000/api'), true);
      assert.equal(isSsrfBlockedHost('http://127.0.0.1/admin'), true);
      assert.equal(isSsrfBlockedHost('http://10.0.1.5/page'), true);
      assert.equal(isSsrfBlockedHost('http://192.168.1.1/router'), true);
      assert.equal(isSsrfBlockedHost('http://169.254.169.254/latest/meta-data'), true);
      assert.equal(isSsrfBlockedHost('file:///etc/passwd'), true);
      assert.equal(isSsrfBlockedHost('https://spaceandastronomyweekly.com/page'), false);
    });

    it('verifies backlink presence and detects rel="nofollow" or dofollow', async () => {
      const htmlDofollow = `<html><body><p>Check out <a href="https://astro360.app/free-tools/birth-chart">ASTRO360 Kundli Generator</a> for free.</p></body></html>`;
      const resLive = await verifyBacklinkOnPage('https://example.com/blog', '/free-tools/birth-chart', htmlDofollow);
      assert.equal(resLive.status, 'LIVE');
      assert.equal(resLive.isNofollow, false);
      assert.equal(resLive.anchorText, 'ASTRO360 Kundli Generator');

      const htmlNofollow = `<html><body><p>See <a href="https://astro360.app/free-tools/birth-chart" rel="nofollow ugc">ASTRO360</a>.</p></body></html>`;
      const resNofollow = await verifyBacklinkOnPage('https://example.com/blog', '/free-tools/birth-chart', htmlNofollow);
      assert.equal(resNofollow.status, 'NOFOLLOW_ADDED');
      assert.equal(resNofollow.isNofollow, true);
    });
  });

  // ── 7. Lost Link Monitor ──────────────────────────────────────────
  describe('Lost Link Monitor', () => {
    it('detects dropped links and converts to actionable alerts', () => {
      const prev = [{
        id: '1',
        sourceUrl: 'https://example.com/post',
        targetUrl: '/free-tools/birth-chart',
        httpStatus: 200,
        isIndexable: true,
        isLinkPresent: true,
        isNofollow: false,
        isUgc: false,
        isSponsored: false,
        status: 'LIVE' as const,
        firstSeen: '2026-08-01',
        lastSeen: '2026-08-20'
      }];

      const curr = [{
        ...prev[0],
        status: 'REMOVED' as const,
        isLinkPresent: false,
        lastSeen: '2026-08-27'
      }];

      const alerts = detectLostLinkChanges(prev, curr);
      assert.equal(alerts.length, 1);
      assert.equal(alerts[0].alertType, 'LINK_DROPPED');
    });
  });

  // ── 8. Broken Backlink 301 Mapper ─────────────────────────────────
  describe('Broken Backlink Engine', () => {
    it('maps broken incoming target URLs to the closest live ASTRO360 tool', () => {
      const mapped = mapBrokenBacklink({
        sourceDomain: 'oldblog.com',
        sourceUrl: 'https://oldblog.com/links',
        brokenTargetUrl: '/tools/old-nakshatra-calculator-v1'
      });

      assert.equal(mapped.suggestedReplacementUrl, '/free-tools/nakshatra');
      assert.equal(mapped.actionRequired, 'CREATE_301_REDIRECT');
    });
  });

  // ── 9. Ethical Personalized Outreach Drafts ───────────────────────
  describe('Outreach Engine', () => {
    it('generates personalized, value-first drafts without spam phrasing', () => {
      const opp = discoverBacklinkOpportunities()[0];
      const draft = generatePersonalizedOutreach(opp, 'Dr. Aris Thorne');

      assert.ok(draft.draftSubject.length > 10);
      assert.ok(draft.draftBody.includes('Dr. Aris Thorne'));
      assert.ok(draft.draftBody.includes('https://astro360.app'));
      assert.ok(!draft.draftBody.toLowerCase().includes('dear webmaster'));
      assert.equal(draft.status, 'DRAFT_READY');
    });
  });

  // ── 10. Digital PR & Embed Widget ─────────────────────────────────
  describe('Digital PR & Embed Widget Engine', () => {
    it('provides structured astronomical story angles', () => {
      const stories = getDigitalPRStories();
      assert.ok(stories.length >= 3);
      assert.ok(stories[0].storyAngle.length > 10);
      assert.ok(stories[0].targetPublications.length > 0);
    });

    it('generates transparent embed snippet with visible attribution', () => {
      const widget = generateBirthChartWidgetSnippet({
        theme: 'dark',
        width: '100%',
        height: '500px',
        defaultZodiac: 'sidereal',
        showAttribution: true
      });

      assert.ok(widget.htmlSnippet.includes('<iframe'));
      assert.ok(widget.htmlSnippet.includes('Powered by ASTRO360') || widget.htmlSnippet.includes('ASTRO360 Swiss Ephemeris'));
      assert.ok(!widget.htmlSnippet.includes('display: none'));
      assert.ok(!widget.htmlSnippet.includes('opacity: 0'));
    });
  });

  // ── 11. Multi-Format Reporting ────────────────────────────────────
  describe('Report Export Engine', () => {
    it('exports clean CSV, JSON, and Markdown reports', () => {
      const opps = discoverBacklinkOpportunities();
      const csv = exportBacklinksToCSV(opps);
      assert.ok(csv.includes('Source Domain,Source URL,Target ASTRO360 URL'));

      const json = exportBacklinksToJSON({ opportunities: opps });
      assert.ok(json.includes('ASTRO360 Backlink Opportunity Lab'));

      const md = exportBacklinksToMarkdown(opps);
      assert.ok(md.includes('# ASTRO360 Backlink Opportunity & Digital PR Report'));
    });
  });

  // ── 12. API Router Handlers ───────────────────────────────────────
  describe('Backlink API Router Handlers', () => {
    it('executes discover, analyze, verify, and report endpoints cleanly', async () => {
      const disc = await backlinkApiHandlers.discover({});
      assert.equal(disc.success, true);
      assert.ok((disc.data || []).length > 0);

      const analyze = await backlinkApiHandlers.analyze({
        url: 'https://learnastronomy.org/resources',
        domain: 'learnastronomy.org',
        topic: 'Ephemeris Calculators',
        sourceType: 'RESOURCE_PAGE'
      });
      assert.equal(analyze.success, true);
      assert.ok(analyze.data?.score?.total >= 0);

      const ssrfBlocked = await backlinkApiHandlers.verify({
        sourceUrl: 'http://127.0.0.1:8080',
        targetUrl: '/free-tools/birth-chart'
      });
      assert.equal(ssrfBlocked.success, false);
      assert.ok(ssrfBlocked.error?.includes('SSRF'));
    });
  });

});
