/**
 * ASTRO360 AstrologyJournalEngine
 * Personal astrology journal storing questions, predictions, saved events, and outcome feedback:
 * Outcomes: YES | PARTIAL | NO | NOT_SURE | SKIP
 * Evaluates historical cycle similarities (e.g. 'Shares timing characteristics with your 2019 cycle')
 * without exaggerating statistical certainty.
 */

export type OutcomeVerdict = 'YES' | 'PARTIAL' | 'NO' | 'NOT_SURE' | 'SKIP';

export interface JournalEntry {
  id: string;
  createdAt: string;
  question: string;
  domain: string;
  predictedWindow: string;
  agreementPercent: number;
  stability: string;
  outcome?: OutcomeVerdict;
  userNotes?: string;
  historicalSimilarityNote?: string;
}

export class AstrologyJournalEngine {
  private static mockEntries: JournalEntry[] = [
    {
      id: 'j-01',
      createdAt: '2026-08-15T10:00:00Z',
      question: 'When is a favorable window for career promotion?',
      domain: 'CAREER',
      predictedWindow: 'Sep 12 – Oct 28, 2026',
      agreementPercent: 82,
      stability: 'High',
      historicalSimilarityNote: 'This cycle shares structural Dasha characteristics with your 2019 career expansion phase.'
    },
    {
      id: 'j-02',
      createdAt: '2026-07-20T14:30:00Z',
      question: 'Will relocation abroad be supportive this year?',
      domain: 'RELOCATION',
      predictedWindow: 'Oct 01, 2026 – Jan 20, 2027',
      agreementPercent: 64,
      stability: 'Moderate',
      outcome: 'PARTIAL',
      userNotes: 'Received initial offer in target destination; finalizing visa paperwork.'
    }
  ];

  public static getEntries(): JournalEntry[] {
    return this.mockEntries;
  }

  public static recordOutcome(entryId: string, outcome: OutcomeVerdict, notes?: string): void {
    const entry = this.mockEntries.find(e => e.id === entryId);
    if (entry) {
      entry.outcome = outcome;
      if (notes) entry.userNotes = notes;
    }
  }

  public static addEntry(question: string, domain: string, window: string, agreement: number, stability: string): JournalEntry {
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      createdAt: new Date().toISOString(),
      question,
      domain,
      predictedWindow: window,
      agreementPercent: agreement,
      stability
    };
    this.mockEntries.unshift(newEntry);
    return newEntry;
  }
}
