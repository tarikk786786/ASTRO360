import {
  BacklinkOpportunity,
  CompetitorBacklinkGap,
  UnlinkedBrandMention,
  LinkableAsset,
  DigitalPRStory,
  OutreachRecord,
  LinkVerificationResult,
  ToxicAuditResult,
  BrokenBacklinkItem,
  BacklinkLabState
} from './types';
import {
  discoverBacklinkOpportunities,
  COMPETITOR_GAP_BENCHMARKS,
  UNLINKED_MENTIONS_DATA,
  ProspectQueryInput
} from './prospectDiscoveryEngine';
import { ASTRO360_LINKABLE_ASSETS } from './linkAssetEngine';
import { ASTRO360_DIGITAL_PR_STORIES } from './digitalPREngine';
import { generatePersonalizedOutreach } from './outreachEngine';
import { verifyBacklinkOnPage } from './verificationCrawler';
import { detectLostLinkChanges, LostLinkAlert } from './lostLinkMonitor';
import { auditBacklinkForToxicity } from './toxicLinkEngine';
import { analyzeAnchorDistribution } from './anchorAnalysisEngine';

const STORAGE_KEY_OUTREACH = 'astro_backlink_outreach';
const STORAGE_KEY_VERIFICATIONS = 'astro_backlink_verifications';

/**
 * Initializes the full Backlink Opportunity Lab state.
 */
export function getInitialBacklinkLabState(query: ProspectQueryInput = {}): BacklinkLabState {
  const opportunities = discoverBacklinkOpportunities(query);
  const competitorGaps = COMPETITOR_GAP_BENCHMARKS;
  const unlinkedMentions = UNLINKED_MENTIONS_DATA;
  const linkableAssets = ASTRO360_LINKABLE_ASSETS;
  const prStories = ASTRO360_DIGITAL_PR_STORIES;

  // Initial outreach records from qualified high opportunities
  const outreachRecords: OutreachRecord[] = [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_OUTREACH);
    if (saved) {
      outreachRecords.push(...JSON.parse(saved));
    }
  } catch {}

  if (outreachRecords.length === 0) {
    for (const opp of opportunities.slice(0, 3)) {
      outreachRecords.push(generatePersonalizedOutreach(opp));
    }
  }

  // Initial verification list
  const verifications: LinkVerificationResult[] = [
    {
      id: 'ver-1',
      sourceUrl: 'https://learnvedicastrology.org/resources',
      targetUrl: '/free-tools/birth-chart',
      httpStatus: 200,
      isIndexable: true,
      isLinkPresent: true,
      targetUrlFound: 'https://astro360.app/free-tools/birth-chart',
      anchorText: 'ASTRO360 Kundli Generator',
      isNofollow: false,
      isUgc: false,
      isSponsored: false,
      status: 'LIVE',
      firstSeen: '2026-08-20',
      lastSeen: '2026-08-27',
      changeNote: 'Active dofollow link in editorial list.'
    },
    {
      id: 'ver-2',
      sourceUrl: 'https://vedicwellnesshub.in/tools',
      targetUrl: '/free-tools/nakshatra',
      httpStatus: 200,
      isIndexable: true,
      isLinkPresent: true,
      targetUrlFound: 'https://astro360.app/free-tools/nakshatra',
      anchorText: '27 Nakshatras & Pada Deep Calculator',
      isNofollow: false,
      isUgc: false,
      isSponsored: false,
      status: 'LIVE',
      firstSeen: '2026-08-22',
      lastSeen: '2026-08-27',
      changeNote: 'Verified live on page.'
    }
  ];

  // Initial toxic audit list
  const toxicAudits: ToxicAuditResult[] = [
    auditBacklinkForToxicity({
      sourceDomain: 'spam-directory-list-2026.xyz',
      sourceUrl: 'https://spam-directory-list-2026.xyz/links',
      targetUrl: '/free-tools/birth-chart',
      anchorText: 'best birth chart calculator',
      outboundLinksCount: 240,
      wordCount: 80,
      isSitewide: true
    }),
    auditBacklinkForToxicity({
      sourceDomain: 'spaceandastronomyweekly.com',
      sourceUrl: 'https://spaceandastronomyweekly.com/ephemeris',
      targetUrl: '/transit-radar',
      anchorText: 'ASTRO360 Ingress Radar',
      outboundLinksCount: 18,
      wordCount: 1600,
      isSitewide: false
    })
  ];

  // Broken backlinks sample
  const brokenBacklinks: BrokenBacklinkItem[] = [
    {
      id: 'broken-1',
      sourceDomain: 'ancientjyotishblog.com',
      sourceUrl: 'https://ancientjyotishblog.com/old-tools-guide',
      brokenTargetUrl: '/tools/old-kundli-calculator',
      suggestedReplacementUrl: '/free-tools/birth-chart',
      httpStatus: 404,
      anchorText: 'Online Kundli Tool',
      actionRequired: 'CREATE_301_REDIRECT'
    }
  ];

  return {
    opportunities,
    competitorGaps,
    unlinkedMentions,
    linkableAssets,
    prStories,
    outreachRecords,
    verifications,
    toxicAudits,
    brokenBacklinks
  };
}

export function saveOutreachRecords(records: OutreachRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY_OUTREACH, JSON.stringify(records));
  } catch {}
}
