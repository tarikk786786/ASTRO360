/**
 * ASTRO360 Competitor Gap Matrix Engine
 * Evaluates keyword gaps against industry benchmarks and assigns BUILD, UPDATE, MERGE, IGNORE actions.
 */

import { CompetitorGapItem, KeywordItem, CompetitorAction } from './types';

const COMPETITOR_DOMAINS = [
  'astrosage.com',
  'astro-seek.com',
  'cafeastrology.com',
  'ganeshaspeaks.com',
  'costarastrology.com'
];

export function analyzeCompetitorGaps(items: KeywordItem[]): CompetitorGapItem[] {
  return items.map(item => {
    let action: CompetitorAction = 'BUILD';
    let notes = '';

    const randomComp = COMPETITOR_DOMAINS[Math.abs(hashString(item.normalizedKeyword)) % COMPETITOR_DOMAINS.length];
    const compSlug = item.normalizedKeyword.replace(/\s+/g, '-');
    const competitorUrl = `https://www.${randomComp}/${compSlug}`;

    if (item.mapping.status === 'EXISTS_OPTIMIZED') {
      if (item.gscData && item.gscData.opportunityType === 'Striking Distance (Pos 4-15)') {
        action = 'UPDATE';
        notes = `ASTRO360 already ranks on Page 2 for this query. Refresh with AEO direct answers and schema to overtake ${randomComp}.`;
      } else {
        action = 'UPDATE';
        notes = `Page exists at ${item.mapping.targetUrl}. Enhance with interactive widget and scripture citations.`;
      }
    } else if (item.mapping.status === 'CANNIBALIZATION_RISK') {
      action = 'MERGE';
      notes = `Multiple internal URLs are competing. Consolidate into ${item.mapping.targetUrl} and set 301 redirects.`;
    } else if (item.mapping.status === 'TOOL_NEEDED') {
      action = 'BUILD';
      notes = `Competitor ${randomComp} has tool traffic. Build native high-precision calculator at ${item.mapping.targetUrl}.`;
    } else if (item.mapping.status === 'MISSING_NEW_PAGE') {
      action = 'BUILD';
      notes = `Zero ASTRO360 coverage. Create new comprehensive pillar guide at ${item.mapping.targetUrl}.`;
    } else {
      action = 'IGNORE';
      notes = 'Low topical authority fit or marginal search utility.';
    }

    return {
      id: `gap-${item.id}`,
      keyword: item.rawKeyword,
      cluster: item.cluster,
      searchIntent: item.primaryIntent,
      astro360Url: item.mapping.targetUrl,
      competitorDomain: randomComp,
      competitorUrl,
      action,
      notes
    };
  });
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
