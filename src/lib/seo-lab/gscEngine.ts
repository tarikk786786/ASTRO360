/**
 * ASTRO360 Google Search Console (GSC) First-Party Data Engine
 * Ingests, parses, and identifies high-confidence first-party SEO growth opportunities.
 */

import { GSCMetricData } from './types';
import { normalizeKeyword } from './keywordNormalizer';

export interface GSCImportSummary {
  totalQueries: number;
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  strikingDistanceCount: number;
  lowCtrHighImpressionCount: number;
  topPerformersCount: number;
  queries: GSCMetricData[];
}

/**
 * Parses raw CSV string or JSON array from Google Search Console Performance Export.
 */
export function parseGSCData(rawInput: string): GSCMetricData[] {
  if (!rawInput || !rawInput.trim()) return [];

  const trimmed = rawInput.trim();

  // 1. Try parsing as JSON first
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      const items = Array.isArray(parsed) ? parsed : parsed.rows || parsed.queries || [];
      return items.map((row: any) => classifyGSCRow({
        query: String(row.query || row.Query || row.keys?.[0] || '').trim(),
        clicks: Number(row.clicks || row.Clicks || 0),
        impressions: Number(row.impressions || row.Impressions || 0),
        ctr: parsePercentageOrFloat(row.ctr || row.CTR || 0),
        position: Number(row.position || row.Position || 0),
        page: row.page || row.Page || row.keys?.[1] || undefined
      })).filter((r: GSCMetricData) => Boolean(r.query));
    } catch {
      // Fall through to CSV parsing
    }
  }

  // 2. Parse as CSV / TSV
  const lines = trimmed.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const header = lines[0].split(delimiter).map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));

  const queryIdx = header.findIndex(h => h.includes('query') || h.includes('keyword') || h.includes('top queries'));
  const clicksIdx = header.findIndex(h => h.includes('click'));
  const impIdx = header.findIndex(h => h.includes('impression'));
  const ctrIdx = header.findIndex(h => h.includes('ctr'));
  const posIdx = header.findIndex(h => h.includes('position'));
  const pageIdx = header.findIndex(h => h.includes('page') || h.includes('url'));

  if (queryIdx === -1) return [];

  const results: GSCMetricData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawCols = splitCSVRow(lines[i], delimiter);
    const query = (rawCols[queryIdx] || '').trim();
    if (!query) continue;

    const clicks = clicksIdx !== -1 ? Number(rawCols[clicksIdx]?.replace(/,/g, '') || 0) : 0;
    const impressions = impIdx !== -1 ? Number(rawCols[impIdx]?.replace(/,/g, '') || 0) : 0;
    const ctr = ctrIdx !== -1 ? parsePercentageOrFloat(rawCols[ctrIdx]) : (impressions > 0 ? clicks / impressions : 0);
    const position = posIdx !== -1 ? Number(rawCols[posIdx]?.replace(/,/g, '') || 0) : 0;
    const page = pageIdx !== -1 ? rawCols[pageIdx]?.trim() : undefined;

    results.push(classifyGSCRow({
      query,
      clicks: isNaN(clicks) ? 0 : clicks,
      impressions: isNaN(impressions) ? 0 : impressions,
      ctr: isNaN(ctr) ? 0 : ctr,
      position: isNaN(position) ? 0 : position,
      page
    }));
  }

  return results;
}

function parsePercentageOrFloat(val: any): number {
  if (typeof val === 'number') return val > 1 ? val / 100 : val;
  const str = String(val).trim();
  if (str.endsWith('%')) {
    return parseFloat(str.replace('%', '')) / 100;
  }
  const f = parseFloat(str);
  return f > 1 ? f / 100 : f || 0;
}

function splitCSVRow(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim().replace(/^["']|["']$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^["']|["']$/g, ''));
  return result;
}

/**
 * Classifies GSC opportunities: Striking Distance, Low CTR, Top Performer.
 */
export function classifyGSCRow(row: GSCMetricData): GSCMetricData {
  let opportunityType: GSCMetricData['opportunityType'] = 'Underperforming';

  if (row.position >= 4 && row.position <= 15.5 && row.impressions >= 50) {
    opportunityType = 'Striking Distance (Pos 4-15)';
  } else if (row.impressions >= 100 && row.ctr < 0.025) {
    opportunityType = 'High Impression / Low CTR';
  } else if (row.position <= 3.5 && row.clicks >= 20) {
    opportunityType = 'Top Performer';
  }

  return {
    ...row,
    opportunityType
  };
}

/**
 * Summarizes the imported GSC Dataset.
 */
export function summarizeGSCData(data: GSCMetricData[]): GSCImportSummary {
  if (!data.length) {
    return {
      totalQueries: 0,
      totalClicks: 0,
      totalImpressions: 0,
      avgCtr: 0,
      avgPosition: 0,
      strikingDistanceCount: 0,
      lowCtrHighImpressionCount: 0,
      topPerformersCount: 0,
      queries: []
    };
  }

  let totalClicks = 0;
  let totalImpressions = 0;
  let totalPos = 0;
  let striking = 0;
  let lowCtr = 0;
  let top = 0;

  for (const row of data) {
    totalClicks += row.clicks;
    totalImpressions += row.impressions;
    totalPos += row.position;
    if (row.opportunityType === 'Striking Distance (Pos 4-15)') striking++;
    if (row.opportunityType === 'High Impression / Low CTR') lowCtr++;
    if (row.opportunityType === 'Top Performer') top++;
  }

  return {
    totalQueries: data.length,
    totalClicks,
    totalImpressions,
    avgCtr: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
    avgPosition: +(totalPos / data.length).toFixed(1),
    strikingDistanceCount: striking,
    lowCtrHighImpressionCount: lowCtr,
    topPerformersCount: top,
    queries: data
  };
}

/**
 * Matches a keyword against the active GSC performance dataset.
 */
export function findGSCMatch(keyword: string, gscQueries: GSCMetricData[]): GSCMetricData | undefined {
  if (!gscQueries || !gscQueries.length) return undefined;

  const norm = normalizeKeyword(keyword);
  // Exact match first
  const exact = gscQueries.find(q => normalizeKeyword(q.query) === norm);
  if (exact) return exact;

  // Substring match
  return gscQueries.find(q => {
    const qNorm = normalizeKeyword(q.query);
    return qNorm.includes(norm) || norm.includes(qNorm);
  });
}
