import { LinkVerificationResult, VerificationStatus } from './types';

export interface LostLinkAlert {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  alertType: 'LINK_DROPPED' | 'NOFOLLOW_APPLIED' | 'PAGE_REMOVED' | 'TARGET_MODIFIED';
  previousStatus: VerificationStatus;
  currentStatus: VerificationStatus;
  detectedAt: string;
  message: string;
  recommendedAction: string;
}

export function detectLostLinkChanges(
  previousList: LinkVerificationResult[],
  currentList: LinkVerificationResult[]
): LostLinkAlert[] {
  const alerts: LostLinkAlert[] = [];
  const currentMap = new Map(currentList.map(item => [item.sourceUrl, item]));

  for (const prev of previousList) {
    const curr = currentMap.get(prev.sourceUrl);
    if (!curr) continue;

    // 1. Link completely dropped
    if (prev.status === 'LIVE' && curr.status === 'REMOVED') {
      alerts.push({
        id: `alert-${Math.random().toString(36).substring(2, 9)}`,
        sourceUrl: prev.sourceUrl,
        targetUrl: prev.targetUrl,
        alertType: 'LINK_DROPPED',
        previousStatus: prev.status,
        currentStatus: curr.status,
        detectedAt: new Date().toISOString(),
        message: `Backlink on ${prev.sourceUrl} was removed during the latest audit.`,
        recommendedAction: 'Review source page context. If recently updated, draft polite inquiry to author.'
      });
    }

    // 2. Nofollow applied
    if (prev.status === 'LIVE' && curr.status === 'NOFOLLOW_ADDED') {
      alerts.push({
        id: `alert-${Math.random().toString(36).substring(2, 9)}`,
        sourceUrl: prev.sourceUrl,
        targetUrl: prev.targetUrl,
        alertType: 'NOFOLLOW_APPLIED',
        previousStatus: prev.status,
        currentStatus: curr.status,
        detectedAt: new Date().toISOString(),
        message: `Backlink on ${prev.sourceUrl} was converted from dofollow to rel="nofollow".`,
        recommendedAction: 'Editorial policy shift on publisher domain. Keep on watchlist, no aggressive outreach needed.'
      });
    }

    // 3. Page became 404
    if (prev.status === 'LIVE' && curr.status === 'PAGE_404') {
      alerts.push({
        id: `alert-${Math.random().toString(36).substring(2, 9)}`,
        sourceUrl: prev.sourceUrl,
        targetUrl: prev.targetUrl,
        alertType: 'PAGE_REMOVED',
        previousStatus: prev.status,
        currentStatus: curr.status,
        detectedAt: new Date().toISOString(),
        message: `Hosting page ${prev.sourceUrl} now returns a 404/410 HTTP error code.`,
        recommendedAction: 'Monitor domain for potential URL restructuring or migration.'
      });
    }
  }

  return alerts;
}
