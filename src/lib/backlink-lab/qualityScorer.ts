import { QualitySignals, ProspectType } from './types';

interface QualityEvaluationInput {
  url: string;
  domain: string;
  topic: string;
  sourceType: ProspectType;
  pageContentSnippet?: string;
  outboundLinksCount?: number;
  totalWordCount?: number;
  isNoindex?: boolean;
  httpStatus?: number;
  hasSsl?: boolean;
}

/**
 * Evaluates the real quality and spam signals of a prospective backlink source.
 * Does NOT rely on fake single-metric DA scores.
 */
export function evaluateQualitySignals(input: QualityEvaluationInput): QualitySignals {
  const flags: string[] = [];
  const domainLower = input.domain.toLowerCase();
  const snippetLower = (input.pageContentSnippet || '').toLowerCase();
  const topicLower = input.topic.toLowerCase();

  // 1. Indexability Check
  const indexability = input.isNoindex !== true && (input.httpStatus === undefined || input.httpStatus === 200);
  if (!indexability) {
    flags.push('Page has noindex tag or non-200 HTTP status');
  }

  // 2. SSL Check
  const sslValid = input.hasSsl !== false && (input.url.startsWith('https://') || !input.url.startsWith('http://'));
  if (!sslValid) {
    flags.push('Missing valid HTTPS SSL certificate');
  }

  // 3. Link Farm & Outbound Link Density Heuristic
  const outboundLinks = input.outboundLinksCount ?? 25;
  const wordCount = input.totalWordCount ?? 800;
  const linkRatio = outboundLinks / Math.max(wordCount, 100);

  let outboundLinkDensity: QualitySignals['outboundLinkDensity'] = 'NORMAL';
  if (outboundLinks > 150 || linkRatio > 0.15) {
    outboundLinkDensity = 'EXCESSIVE';
    flags.push('Excessive outbound link density (potential link farm / directory directory farm)');
  } else if (outboundLinks > 60 || linkRatio > 0.08) {
    outboundLinkDensity = 'HIGH';
  } else if (outboundLinks < 15) {
    outboundLinkDensity = 'LOW';
  }

  // 4. Spam / Suspicious TLD / Contextual Flags
  const suspiciousTlds = ['.xyz', '.top', '.click', '.loan', '.work', '.gq', '.cf', '.tk', '.buzz'];
  if (suspiciousTlds.some(tld => domainLower.endsWith(tld))) {
    flags.push('Suspicious low-trust top-level domain (TLD)');
  }

  const toxicKeywords = ['casino', 'gambling', 'poker', 'crypto-bonus', 'viagra', 'essay-writing-service', 'buy-backlinks', 'pbn'];
  if (toxicKeywords.some(w => domainLower.includes(w) || snippetLower.includes(w))) {
    flags.push('Presence of commercial spam/toxic keywords in domain or context');
  }

  // 5. Topical Relevance Calculation (0 to 25)
  let topicalRelevance = 15;
  const astrologyKeywords = ['astrology', 'horoscope', 'zodiac', 'kundli', 'vedic', 'nakshatra', 'tarot', 'panchang', 'spiritual', 'wellness', 'astronomy', 'space', 'planetary'];
  const matchingKeywords = astrologyKeywords.filter(k => domainLower.includes(k) || snippetLower.includes(k) || topicLower.includes(k));
  topicalRelevance = Math.min(25, 10 + matchingKeywords.length * 3);

  // 6. Content Quality Calculation (0 to 25)
  let contentQuality = 15;
  if (wordCount >= 1200) contentQuality += 5;
  if (wordCount < 300) contentQuality -= 5;
  if (outboundLinkDensity === 'NORMAL' || outboundLinkDensity === 'LOW') contentQuality += 3;
  if (flags.length === 0) contentQuality += 2;
  contentQuality = Math.max(5, Math.min(25, contentQuality));

  // 7. Real Editorial Context
  const isEditorialType = ['EDITORIAL', 'EDUCATION', 'RESEARCH', 'DIGITAL_PR', 'INDUSTRY_PUBLICATION', 'GUEST_CONTRIBUTION', 'DATA_CITATION'].includes(input.sourceType);
  const realEditorialContext = isEditorialType && outboundLinkDensity !== 'EXCESSIVE' && flags.length === 0;

  // 8. Overall Domain Health
  let domainHealth: QualitySignals['domainHealth'] = 'HEALTHY';
  if (flags.length >= 2 || outboundLinkDensity === 'EXCESSIVE') {
    domainHealth = 'FLAGGED';
  } else if (flags.length === 1 || !sslValid) {
    domainHealth = 'NEEDS_REVIEW';
  }

  return {
    topicalRelevance,
    contentQuality,
    indexability,
    realEditorialContext,
    outboundLinkDensity,
    spamFlags: flags,
    domainHealth,
    sslValid,
    httpStatus: input.httpStatus ?? 200
  };
}
