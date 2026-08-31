import { ToxicAuditResult, ToxicRiskLevel } from './types';

export function auditBacklinkForToxicity(input: {
  id?: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  outboundLinksCount?: number;
  wordCount?: number;
  snippet?: string;
  isSitewide?: boolean;
}): ToxicAuditResult {
  const reasons: string[] = [];
  const domainLower = input.sourceDomain.toLowerCase();
  const urlLower = input.sourceUrl.toLowerCase();
  const anchorLower = input.anchorText.toLowerCase();
  const snippetLower = (input.snippet || '').toLowerCase();

  // 1. Link Farm Detection
  const linkFarmSignal = (input.outboundLinksCount ?? 0) > 180 ||
    /directory-submit|free-links|link-exchange|auto-seo|pbn-network/i.test(domainLower);
  if (linkFarmSignal) {
    reasons.push('High probability of link farm or automated link-exchange scheme');
  }

  // 2. Adult or Gambling contextual mismatch
  const adultOrGamblingContext = /casino|gambling|betting|poker|slots|viagra|cialis|adult|xxx/i.test(domainLower) ||
    /casino|gambling|betting|poker|slots/i.test(snippetLower);
  if (adultOrGamblingContext) {
    reasons.push('Unrelated adult, gambling, or pharmaceutical commercial context');
  }

  // 3. Scraped Content / Splog signal
  const scrapedContentSignal = /free-article-directory|content-aggregator-feed|autoblog|rss-feed-repost/i.test(domainLower) ||
    (input.wordCount !== undefined && input.wordCount < 100);
  if (scrapedContentSignal) {
    reasons.push('Low-value scraped content or thin automated splog profile');
  }

  // 4. Parked Domain Signal
  const parkedDomainSignal = /domain-for-sale|parked-page|godaddy-parked|sedo-parking|hugedomains/i.test(urlLower) ||
    /buy this domain|domain is for sale/i.test(snippetLower);
  if (parkedDomainSignal) {
    reasons.push('Parked, inactive or expired domain landing page');
  }

  // 5. Excessive Exact Match Anchor
  const commercialKeywords = ['best birth chart calculator', 'buy gemstones online', 'free kundli software', 'astrology predictions 2026'];
  const excessiveExactMatch = commercialKeywords.includes(anchorLower) && (input.isSitewide || false);
  if (excessiveExactMatch) {
    reasons.push('Sitewide repetitive commercial exact-match anchor text pattern');
  }

  // 6. Sitewide unnatural
  const sitewideUnnatural = input.isSitewide === true && (linkFarmSignal || adultOrGamblingContext || excessiveExactMatch);
  if (sitewideUnnatural) {
    reasons.push('Sitewide footer or sidebar injection pattern');
  }

  // Determine Risk Level
  let riskLevel: ToxicRiskLevel = 'CLEAN';
  let recommendedAction: ToxicAuditResult['recommendedAction'] = 'KEEP';

  const criticalIssuesCount = [linkFarmSignal, adultOrGamblingContext, parkedDomainSignal].filter(Boolean).length;

  if (criticalIssuesCount >= 2 || (linkFarmSignal && adultOrGamblingContext)) {
    riskLevel = 'POTENTIALLY_TOXIC';
    recommendedAction = 'DISAVOW_REVIEW';
  } else if (criticalIssuesCount === 1 || excessiveExactMatch || scrapedContentSignal) {
    riskLevel = 'AVOID';
    recommendedAction = 'REQUEST_REMOVAL';
  } else if (reasons.length > 0) {
    riskLevel = 'REVIEW';
    recommendedAction = 'MONITOR';
  }

  return {
    id: input.id || `toxic-${Math.random().toString(36).substring(2, 9)}`,
    sourceDomain: input.sourceDomain,
    sourceUrl: input.sourceUrl,
    targetUrl: input.targetUrl,
    anchorText: input.anchorText,
    riskLevel,
    reasons,
    linkFarmSignal,
    adultOrGamblingContext,
    scrapedContentSignal,
    parkedDomainSignal,
    excessiveExactMatch,
    sitewideUnnatural,
    recommendedAction
  };
}
