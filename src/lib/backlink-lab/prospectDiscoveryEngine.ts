import { BacklinkOpportunity, CompetitorBacklinkGap, UnlinkedBrandMention, ProspectType } from './types';
import { evaluateQualitySignals } from './qualityScorer';
import { calculateOpportunityScore } from './opportunityScorer';
import { recommendBestAssetForTopic } from './linkAssetEngine';

export interface ProspectQueryInput {
  topic?: string;
  sourceType?: ProspectType | 'ALL';
  country?: string;
  minScore?: number;
}

// Curated high-relevance prospects catalog
const CURATED_PROSPECT_DATABASE: Array<{
  domain: string;
  url: string;
  topic: string;
  type: ProspectType;
  country: string;
  language: string;
  contactName?: string;
  contactEmail?: string;
  contactUrl?: string;
  snippet?: string;
  wordCount?: number;
  outboundLinks?: number;
}> = [
  {
    domain: 'learnvedicastrology.org',
    url: 'https://learnvedicastrology.org/free-learning-tools-and-resources',
    topic: 'Vedic Astrology Education & Calculators',
    type: 'RESOURCE_PAGE',
    country: 'United States',
    language: 'English',
    contactName: 'Editorial Desk',
    contactUrl: 'https://learnvedicastrology.org/contact',
    snippet: 'Curated collection of free planetary calculators, Swiss ephemeris charts, and beginner guides for Vedic astrology practitioners.',
    wordCount: 1400,
    outboundLinks: 28
  },
  {
    domain: 'spaceandastronomyweekly.com',
    url: 'https://spaceandastronomyweekly.com/ephemeris-and-celestial-events-2026',
    topic: 'Planetary Transits & Swiss Ephemeris',
    type: 'EDITORIAL',
    country: 'United Kingdom',
    language: 'English',
    contactName: 'Sarah Jenkins (Science Editor)',
    contactUrl: 'https://spaceandastronomyweekly.com/editors',
    snippet: 'An overview of digital tools offering planetary transit tracking and sub-arcsecond astronomical calculations.',
    wordCount: 1850,
    outboundLinks: 19
  },
  {
    domain: 'vedicwellnesshub.in',
    url: 'https://vedicwellnesshub.in/nakshatra-deities-and-panchanga-calendar',
    topic: '27 Nakshatras & Panchanga Calendar',
    type: 'RESOURCE_PAGE',
    country: 'India',
    language: 'English',
    contactName: 'Pandit Sharma / Content Team',
    contactUrl: 'https://vedicwellnesshub.in/contribute',
    snippet: 'Comprehensive directory of classical Indian Panchanga calculators and 27 Nakshatra deity references.',
    wordCount: 2100,
    outboundLinks: 34
  },
  {
    domain: 'astrodossier.net',
    url: 'https://astrodossier.net/classical-astrology-chart-software-reviews',
    topic: 'Astrology Software & Natal Chart Generators',
    type: 'TOOL_LIST',
    country: 'Global',
    language: 'English',
    contactName: 'Alex Thorne',
    contactUrl: 'https://astrodossier.net/submit-tool',
    snippet: 'Independent comparisons of the best free birth chart generators, compatibility tools, and divisional harmonic charts.',
    wordCount: 3200,
    outboundLinks: 42
  },
  {
    domain: 'indologyresearchjournal.edu',
    url: 'https://indologyresearchjournal.edu/resources/ancient-jyotisha-texts',
    topic: 'Classical Sanskrit Texts & BPHS Citations',
    type: 'RESEARCH',
    country: 'United States',
    language: 'English',
    contactName: 'Prof. David Vance',
    contactUrl: 'https://indologyresearchjournal.edu/faculty',
    snippet: 'Academic citations and digital archives referencing classical Brihat Parashara Hora Shastra, Phaladeepika, and Surya Siddhanta manuscripts.',
    wordCount: 4500,
    outboundLinks: 15
  },
  {
    domain: 'modernweddingsmag.com',
    url: 'https://modernweddingsmag.com/cultural-marriage-traditions-and-kundli-matching',
    topic: 'Kundli Matching & 36-Guna Compatibility',
    type: 'ROUNDUP',
    country: 'Canada',
    language: 'English',
    contactName: 'Emma Watson',
    contactUrl: 'https://modernweddingsmag.com/contact-us',
    snippet: 'Guide to cultural wedding traditions including the mathematical logic behind Ashta Koota 36-Guna compatibility scoring.',
    wordCount: 1600,
    outboundLinks: 22
  },
  {
    domain: 'spiritualtechtrends.com',
    url: 'https://spiritualtechtrends.com/the-evolution-of-astronomy-in-modern-astrology',
    topic: 'ASTRO360 Platform Mention',
    type: 'UNLINKED_MENTION',
    country: 'United States',
    language: 'English',
    contactName: 'Editorial Staff',
    contactUrl: 'https://spiritualtechtrends.com/contact',
    snippet: 'Modern platforms like ASTRO360 are redefining the field by utilizing sub-arcsecond Swiss Ephemeris calculations without subscription barriers.',
    wordCount: 1250,
    outboundLinks: 12
  }
];

// Competitor Gap Database
export const COMPETITOR_GAP_BENCHMARKS: CompetitorBacklinkGap[] = [
  {
    id: 'gap-1',
    competitor: 'AstroSage',
    sourceDomain: 'vedicculturetoday.com',
    sourcePage: 'https://vedicculturetoday.com/best-free-kundli-software',
    topic: 'Free Kundli & Birth Chart Generator',
    linkType: 'DOFOLLOW',
    astro360Mentioned: false,
    astro360RelevantAsset: 'Free High-Precision Birth Chart (Kundli)',
    astro360TargetUrl: '/free-tools/birth-chart',
    actionRecommendation: 'OUTREACH_REPLACEMENT',
    notes: 'Source lists older flash-based tools with ads. Pitch ASTRO360 as an ad-free Swiss Ephemeris alternative.'
  },
  {
    id: 'gap-2',
    competitor: 'Astro-Seek',
    sourceDomain: 'horoscopedirectory.org',
    sourcePage: 'https://horoscopedirectory.org/nakshatra-calculators',
    topic: '27 Nakshatras & Lunar Mansions',
    linkType: 'DOFOLLOW',
    astro360Mentioned: false,
    astro360RelevantAsset: '27 Nakshatras & 108 Pada Deep Finder',
    astro360TargetUrl: '/free-tools/nakshatra',
    actionRecommendation: 'OUTREACH_REPLACEMENT',
    notes: 'Page actively curates 27 Nakshatra tools. ASTRO360 offers deeper Pada and scripture references.'
  },
  {
    id: 'gap-3',
    competitor: 'CafeAstrology',
    sourceDomain: 'wellnessandstars.com',
    sourcePage: 'https://wellnessandstars.com/relationship-compatibility-guides',
    topic: 'Astrological Compatibility & Synastry',
    linkType: 'DOFOLLOW',
    astro360Mentioned: false,
    astro360RelevantAsset: '36-Guna Ashta Koota Matchmaker',
    astro360TargetUrl: '/free-tools/compatibility',
    actionRecommendation: 'OUTREACH_REPLACEMENT',
    notes: 'Suggest adding ASTRO360’s dual Eastern (Ashta Koota) and Western synastry calculator.'
  }
];

// Unlinked Mentions Database
export const UNLINKED_MENTIONS_DATA: UnlinkedBrandMention[] = [
  {
    id: 'unlinked-1',
    sourceDomain: 'spiritualtechtrends.com',
    sourcePage: 'https://spiritualtechtrends.com/the-evolution-of-astronomy-in-modern-astrology',
    mentionSnippet: 'Platforms like ASTRO360 are redefining the field by utilizing sub-arcsecond Swiss Ephemeris calculations without subscription barriers.',
    targetAstroUrl: '/free-tools/birth-chart',
    authorOrEditor: 'Marcus Sterling',
    contactUrl: 'https://spiritualtechtrends.com/contact',
    outreachAngle: 'Politely thank the author for the mention and provide direct link for reader convenience.',
    discoveredAt: '2026-08-27'
  },
  {
    id: 'unlinked-2',
    sourceDomain: 'vedicastronomyforum.org',
    sourcePage: 'https://vedicastronomyforum.org/discussion/sub-arcsecond-ephemeris-engines',
    mentionSnippet: 'Has anyone tested the ASTRO360 ephemeris engine against NASA JPL Horizons data? The results show zero arcsecond deviation.',
    targetAstroUrl: '/panchanga',
    authorOrEditor: 'Community Moderator',
    contactUrl: 'https://vedicastronomyforum.org/contact',
    outreachAngle: 'Acknowledge scientific validation on forum and offer open API documentation link.',
    discoveredAt: '2026-08-26'
  }
];

/**
 * Discovers and qualifies prospective backlink opportunities.
 */
export function discoverBacklinkOpportunities(input: ProspectQueryInput = {}): BacklinkOpportunity[] {
  const filterTopic = (input.topic || '').toLowerCase();
  const filterType = input.sourceType || 'ALL';
  const filterCountry = input.country;
  const minScore = input.minScore || 0;

  return CURATED_PROSPECT_DATABASE.filter(item => {
    if (filterTopic && !item.topic.toLowerCase().includes(filterTopic) && !item.snippet?.toLowerCase().includes(filterTopic)) {
      return false;
    }
    if (filterType !== 'ALL' && item.type !== filterType) {
      return false;
    }
    if (filterCountry && item.country !== filterCountry && item.country !== 'Global') {
      return false;
    }
    return true;
  }).map((item, index) => {
    const recommendedAsset = recommendBestAssetForTopic(item.topic);
    const qualitySignals = evaluateQualitySignals({
      url: item.url,
      domain: item.domain,
      topic: item.topic,
      sourceType: item.type,
      pageContentSnippet: item.snippet,
      outboundLinksCount: item.outboundLinks,
      totalWordCount: item.wordCount,
      hasSsl: true,
      httpStatus: 200
    });

    const isUnlinked = item.type === 'UNLINKED_MENTION';
    const opportunityScore = calculateOpportunityScore({
      quality: qualitySignals,
      sourceType: item.type,
      hasDirectContact: Boolean(item.contactEmail || item.contactUrl),
      isUnlinkedMention: isUnlinked
    });

    return {
      id: `opp-${index + 1}`,
      sourceDomain: item.domain,
      sourceUrl: item.url,
      targetUrl: recommendedAsset.path,
      topic: item.topic,
      relevance: qualitySignals.topicalRelevance * 4,
      country: item.country,
      language: item.language,
      sourceType: item.type,
      linkType: isUnlinked ? ('UNLINKED_MENTION' as const) : ('DOFOLLOW' as const),
      status: isUnlinked ? ('QUALIFIED' as const) : ('PROSPECT' as const),
      qualitySignals,
      opportunityScore,
      confidence: 0.94,
      discoveredAt: '2026-08-27',
      lastChecked: '2026-08-27',
      notes: `Targeting ${recommendedAsset.title}. ${item.snippet || ''}`,
      contactName: item.contactName,
      contactEmail: item.contactEmail,
      contactUrl: item.contactUrl,
      suggestedAngle: recommendedAsset.recommendedPitch
    };
  }).filter(opp => opp.opportunityScore.total >= minScore);
}
