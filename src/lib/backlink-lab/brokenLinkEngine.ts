import { BrokenBacklinkItem } from './types';
import { ASTRO360_LINKABLE_ASSETS } from './linkAssetEngine';

export function mapBrokenBacklink(input: {
  sourceDomain: string;
  sourceUrl: string;
  brokenTargetUrl: string;
  httpStatus?: number;
  anchorText?: string;
}): BrokenBacklinkItem {
  const brokenPath = input.brokenTargetUrl.toLowerCase();

  // Find closest live ASTRO360 replacement
  let replacement = '/free-tools/birth-chart';

  if (brokenPath.includes('nakshatra') || brokenPath.includes('pada') || brokenPath.includes('star')) {
    replacement = '/free-tools/nakshatra';
  } else if (brokenPath.includes('panchang') || brokenPath.includes('tithi') || brokenPath.includes('calendar')) {
    replacement = '/panchanga';
  } else if (brokenPath.includes('match') || brokenPath.includes('compat') || brokenPath.includes('guna')) {
    replacement = '/free-tools/compatibility';
  } else if (brokenPath.includes('dasha') || brokenPath.includes('mahadasha')) {
    replacement = '/dasha';
  } else if (brokenPath.includes('learn') || brokenPath.includes('guide') || brokenPath.includes('article')) {
    replacement = '/learn/vedic-astrology';
  }

  return {
    id: `broken-${Math.random().toString(36).substring(2, 9)}`,
    sourceDomain: input.sourceDomain,
    sourceUrl: input.sourceUrl,
    brokenTargetUrl: input.brokenTargetUrl,
    suggestedReplacementUrl: replacement,
    httpStatus: input.httpStatus ?? 404,
    anchorText: input.anchorText || 'Astrology Tool',
    actionRequired: 'CREATE_301_REDIRECT'
  };
}
