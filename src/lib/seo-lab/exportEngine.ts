/**
 * ASTRO360 SEO Keyword Export Engine
 * Generates clean CSV, JSON, and Markdown formatted datasets.
 */

import { KeywordItem, ClusterGroup } from './types';

/**
 * Converts keyword items into formatted CSV text.
 */
export function exportKeywordsToCSV(items: KeywordItem[]): string {
  const headers = [
    'keyword',
    'intent',
    'source',
    'trend',
    'priority',
    'targetUrl',
    'cluster',
    'notes'
  ];

  const rows = items.map(item => {
    const note = item.gscData 
      ? `GSC: Pos ${item.gscData.position.toFixed(1)}, ${item.gscData.impressions} impr`
      : item.mapping.recommendation;

    return [
      escapeCSV(item.rawKeyword),
      escapeCSV(item.primaryIntent),
      escapeCSV(item.source),
      escapeCSV(`${item.trend.score}/100 (${item.trend.direction})`),
      escapeCSV(`${item.opportunity.tier} (${item.opportunity.total}/100)`),
      escapeCSV(item.mapping.targetUrl),
      escapeCSV(item.cluster),
      escapeCSV(note)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Converts keyword items and cluster groupings into formatted JSON.
 */
export function exportKeywordsToJSON(items: KeywordItem[], clusters?: ClusterGroup[]): string {
  const exportPayload = {
    metadata: {
      generatedAt: new Date().toISOString(),
      platform: 'ASTRO360 SEO Keyword Research Lab',
      version: '3.1.0',
      totalKeywords: items.length,
      metricStandard: 'Free-First Real Data & Directional Signals (No Fake Volumes)'
    },
    results: items.map(i => ({
      keyword: i.rawKeyword,
      normalized: i.normalizedKeyword,
      intent: i.primaryIntent,
      secondaryIntent: i.secondaryIntent,
      cluster: i.cluster,
      source: i.source,
      trend: {
        score: i.trend.score,
        direction: i.trend.direction,
        deltaPercent: i.trend.historicalDelta,
        sparkline: i.trend.sparkline
      },
      gsc: i.gscData ? {
        position: i.gscData.position,
        impressions: i.gscData.impressions,
        clicks: i.gscData.clicks,
        ctr: i.gscData.ctr,
        opportunity: i.gscData.opportunityType
      } : null,
      mapping: {
        status: i.mapping.status,
        targetUrl: i.mapping.targetUrl,
        targetType: i.mapping.targetType,
        pageTitle: i.mapping.pageTitle
      },
      opportunity: {
        score: i.opportunity.total,
        tier: i.opportunity.tier,
        explanation: i.opportunity.explanation
      },
      questions: i.questionVariants,
      relatedQueries: i.relatedQueries
    })),
    clusters: clusters?.map(c => ({
      pillar: c.pillar,
      pillarUrl: c.pillarUrl,
      primaryTool: c.primaryToolName,
      primaryToolUrl: c.primaryToolUrl,
      keywordCount: c.clusterKeywords.length,
      questions: c.questions
    }))
  };

  return JSON.stringify(exportPayload, null, 2);
}

/**
 * Converts keyword items into formatted GitHub-Flavored Markdown report.
 */
export function exportKeywordsToMarkdown(items: KeywordItem[], seedQuery = ''): string {
  const date = new Date().toLocaleDateString('en-US', { dateStyle: 'long' });

  let md = `# ASTRO360 Keyword Research Lab Report\n\n`;
  md += `**Seed Query**: \`${seedQuery || 'Astrology Multi-Cluster'}\`  \n`;
  md += `**Export Date**: ${date}  \n`;
  md += `**Total Keywords Analyzed**: ${items.length}  \n`;
  md += `**Methodology**: Free-First Directional Signals & ASTRO360 Architecture Mapping (No Fake Volumes)  \n\n`;

  md += `## 1. High-Priority Keyword Opportunities\n\n`;
  md += `| Keyword | Intent | Cluster | Trend | Priority | Target URL | Action |\n`;
  md += `|---|---|---|---|---|---|---|\n`;

  for (const item of items) {
    const trendStr = `${item.trend.score}/100 (${item.trend.direction === 'RISING' ? '▲ Rising' : item.trend.direction === 'DECLINING' ? '▼ Declining' : '▬ Stable'})`;
    md += `| **${item.rawKeyword}** | \`${item.primaryIntent}\` | ${item.cluster} | ${trendStr} | **${item.opportunity.tier}** (${item.opportunity.total}) | \`${item.mapping.targetUrl}\` | ${item.mapping.status} |\n`;
  }

  md += `\n## 2. Core Seeker Questions Identified\n\n`;
  const allQuestions = Array.from(new Set(items.flatMap(i => i.questionVariants))).slice(0, 15);
  for (const q of allQuestions) {
    md += `- ❓ ${q}\n`;
  }

  md += `\n---\n*Report compiled via ASTRO360 SEO Keyword Lab Core.*`;
  return md;
}

function escapeCSV(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}
