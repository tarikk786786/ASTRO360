import { BacklinkOpportunity, CompetitorBacklinkGap, OutreachRecord, LinkVerificationResult, ToxicAuditResult } from './types';

export function exportBacklinksToCSV(opportunities: BacklinkOpportunity[]): string {
  const headers = [
    'ID',
    'Source Domain',
    'Source URL',
    'Target ASTRO360 URL',
    'Topic',
    'Prospect Type',
    'Opportunity Score',
    'Tier',
    'Status',
    'Relevance',
    'Quality',
    'Editorial Fit',
    'Traffic Signal',
    'Contact Name',
    'Contact URL'
  ];

  const rows = opportunities.map(opp => [
    `"${opp.id}"`,
    `"${opp.sourceDomain}"`,
    `"${opp.sourceUrl}"`,
    `"${opp.targetUrl}"`,
    `"${opp.topic.replace(/"/g, '""')}"`,
    `"${opp.sourceType}"`,
    opp.opportunityScore.total,
    `"${opp.opportunityScore.tier}"`,
    `"${opp.status}"`,
    opp.opportunityScore.breakdown.relevance,
    opp.opportunityScore.breakdown.quality,
    opp.opportunityScore.breakdown.editorialFit,
    opp.opportunityScore.breakdown.trafficSignal,
    `"${opp.contactName || ''}"`,
    `"${opp.contactUrl || ''}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function exportBacklinksToJSON(data: {
  opportunities: BacklinkOpportunity[];
  gaps?: CompetitorBacklinkGap[];
  outreach?: OutreachRecord[];
  verifications?: LinkVerificationResult[];
}): string {
  return JSON.stringify(
    {
      generator: 'ASTRO360 Backlink Opportunity Lab',
      generatedAt: new Date().toISOString(),
      summary: {
        totalOpportunities: data.opportunities.length,
        highPriority: data.opportunities.filter(o => o.opportunityScore.tier === 'HIGH').length,
        gapsCount: data.gaps?.length || 0,
        outreachCount: data.outreach?.length || 0,
        verifiedLive: data.verifications?.filter(v => v.status === 'LIVE').length || 0
      },
      opportunities: data.opportunities,
      competitorGaps: data.gaps || [],
      outreachPipeline: data.outreach || [],
      verifications: data.verifications || []
    },
    null,
    2
  );
}

export function exportBacklinksToMarkdown(opportunities: BacklinkOpportunity[]): string {
  const highTier = opportunities.filter(o => o.opportunityScore.tier === 'HIGH');
  const mediumTier = opportunities.filter(o => o.opportunityScore.tier === 'MEDIUM');

  let md = `# ASTRO360 Backlink Opportunity & Digital PR Report\n\n`;
  md += `**Generated**: ${new Date().toLocaleDateString()} | **Total Qualified Prospects**: ${opportunities.length}\n\n`;

  md += `## 1. High-Priority Editorial & Resource Opportunities (${highTier.length})\n\n`;
  md += `| Source Domain | Type | Target URL | Score | Suggested Outreach Angle |\n`;
  md += `|---|---|---|---|---|\n`;
  for (const opp of highTier) {
    md += `| **${opp.sourceDomain}** | \`${opp.sourceType}\` | \`${opp.targetUrl}\` | **${opp.opportunityScore.total}/100** | ${opp.suggestedAngle || opp.notes} |\n`;
  }

  if (mediumTier.length > 0) {
    md += `\n## 2. Medium-Priority Opportunities (${mediumTier.length})\n\n`;
    md += `| Source Domain | Type | Target URL | Score | Topic |\n`;
    md += `|---|---|---|---|---|\n`;
    for (const opp of mediumTier) {
      md += `| ${opp.sourceDomain} | \`${opp.sourceType}\` | \`${opp.targetUrl}\` | ${opp.opportunityScore.total}/100 | ${opp.topic} |\n`;
    }
  }

  md += `\n---\n*Report generated via ASTRO360 Backlink Opportunity Lab. Free-First, ethical link earning.*`;
  return md;
}
