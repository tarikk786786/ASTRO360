import { AnchorDistributionStats, AnchorClassification } from './types';

export function classifyAnchorText(anchor: string, targetUrl: string): AnchorClassification {
  const normAnchor = anchor.trim().toLowerCase();
  const normTarget = targetUrl.toLowerCase();

  if (!normAnchor || normAnchor === '[image]' || normAnchor.includes('<img')) {
    return 'IMAGE';
  }

  if (
    normAnchor === 'astro360' ||
    normAnchor === 'astro 360' ||
    normAnchor === 'astro360 platform' ||
    normAnchor === 'astro360.app'
  ) {
    return 'BRAND';
  }

  if (
    normAnchor.startsWith('http://') ||
    normAnchor.startsWith('https://') ||
    normAnchor.startsWith('www.') ||
    normAnchor.includes('.com') ||
    normAnchor.includes('.app') ||
    normAnchor === normTarget
  ) {
    return 'URL';
  }

  const exactMatchKeywords = [
    'birth chart calculator',
    'free kundli',
    'nakshatra finder',
    'panchanga calendar',
    'kundli matching',
    'dasha calculator',
    'vedic astrology chart'
  ];

  if (exactMatchKeywords.includes(normAnchor)) {
    return 'EXACT_MATCH';
  }

  const genericAnchors = [
    'click here',
    'here',
    'website',
    'link',
    'source',
    'learn more',
    'visit website',
    'read more',
    'this tool',
    'page'
  ];

  if (genericAnchors.includes(normAnchor)) {
    return 'GENERIC';
  }

  if (normAnchor.includes('astro360') || exactMatchKeywords.some(kw => normAnchor.includes(kw))) {
    return 'PARTIAL_MATCH';
  }

  return 'OTHER';
}

export function analyzeAnchorDistribution(anchors: Array<{ text: string; targetUrl: string }>): AnchorDistributionStats {
  const total = anchors.length;
  if (total === 0) {
    return {
      totalAnchors: 0,
      brandCount: 0,
      brandPercent: 0,
      urlCount: 0,
      urlPercent: 0,
      partialMatchCount: 0,
      partialMatchPercent: 0,
      exactMatchCount: 0,
      exactMatchPercent: 0,
      genericCount: 0,
      genericPercent: 0,
      imageCount: 0,
      imagePercent: 0,
      unnaturalFlags: [],
      recommendation: 'No anchor text data available yet.'
    };
  }

  let brandCount = 0;
  let urlCount = 0;
  let partialMatchCount = 0;
  let exactMatchCount = 0;
  let genericCount = 0;
  let imageCount = 0;

  for (const item of anchors) {
    const classification = classifyAnchorText(item.text, item.targetUrl);
    if (classification === 'BRAND') brandCount++;
    else if (classification === 'URL') urlCount++;
    else if (classification === 'PARTIAL_MATCH') partialMatchCount++;
    else if (classification === 'EXACT_MATCH') exactMatchCount++;
    else if (classification === 'GENERIC') genericCount++;
    else if (classification === 'IMAGE') imageCount++;
  }

  const brandPercent = Math.round((brandCount / total) * 100);
  const urlPercent = Math.round((urlCount / total) * 100);
  const partialMatchPercent = Math.round((partialMatchCount / total) * 100);
  const exactMatchPercent = Math.round((exactMatchCount / total) * 100);
  const genericPercent = Math.round((genericCount / total) * 100);
  const imagePercent = Math.round((imageCount / total) * 100);

  const unnaturalFlags: string[] = [];

  if (exactMatchPercent > 20) {
    unnaturalFlags.push(`Exact Match anchor percentage (${exactMatchPercent}%) is unnaturally high (Recommended threshold < 15%)`);
  }
  if (brandPercent < 30 && total >= 10) {
    unnaturalFlags.push(`Brand anchor percentage (${brandPercent}%) is low for an organic profile (Recommended > 40%)`);
  }
  if (genericPercent > 35) {
    unnaturalFlags.push(`Generic 'click here' style anchors (${genericPercent}%) dilute contextual relevance`);
  }

  let recommendation = 'Natural and balanced anchor text profile conforming to Google Search Essentials.';
  if (unnaturalFlags.length > 0) {
    recommendation = `Rebalance outreach anchor strategies: prioritize branded mentions (e.g. "ASTRO360's Nakshatra Finder") and natural editorial citations over repetitive commercial exact matches.`;
  }

  return {
    totalAnchors: total,
    brandCount,
    brandPercent,
    urlCount,
    urlPercent,
    partialMatchCount,
    partialMatchPercent,
    exactMatchCount,
    exactMatchPercent,
    genericCount,
    genericPercent,
    imageCount,
    imagePercent,
    unnaturalFlags,
    recommendation
  };
}
