/**
 * ASTRO360 Kalimat Arabic NLP & Quranic Analysis Engine
 * Official Integration for Kalimat Platform (https://api.kalimat.dev)
 *
 * The API key is NOT held here. Requests go through /api/proxy, which reads
 * KALIMAT_API_KEY server-side. Do not reintroduce a key into this file — it is
 * bundled and served to every visitor.
 */

import { searchKalimat, analyzeKalimatMorphology } from './apiProxy';

export interface KalimatSearchResult {
  query: string;
  totalResults: number;
  results: {
    surahNumber: number;
    ayahNumber: number;
    textArabic: string;
    textNormalized: string;
    root: string;
    lemma: string;
    score: number;
  }[];
}

export interface KalimatMorphologyAnalysis {
  word: string;
  root: string;
  lemma: string;
  pattern: string;
  partOfSpeech: string;
  diacritics: string;
}

export class KalimatEngine {
  /**
   * Search Quran text or Arabic roots via Kalimat API
   */
  public static async searchArabicText(query: string): Promise<KalimatSearchResult | null> {
    try {
      const data = await searchKalimat(query);
      if (data) {
        return {
          query,
          totalResults: data.total || data.count || (data.results ? data.results.length : 0),
          results: (data.results || data.items || []).map((item: any) => ({
            surahNumber: item.surah_number || item.surah || 1,
            ayahNumber: item.ayah_number || item.ayah || 1,
            textArabic: item.text_arabic || item.text || '',
            textNormalized: item.text_normalized || item.normalized || '',
            root: item.root || '',
            lemma: item.lemma || '',
            score: item.score || 1.0,
          })),
        };
      }
    } catch (e) {
      console.error('Kalimat API search error:', e);
    }
    return null;
  }

  /**
   * Perform Morphological & Root Analysis on an Arabic Word/Phrase
   */
  public static async analyzeMorphology(arabicText: string): Promise<KalimatMorphologyAnalysis | null> {
    try {
      const data = await analyzeKalimatMorphology(arabicText);
      if (data) {
        return {
          word: arabicText,
          root: data.root || '',
          lemma: data.lemma || '',
          pattern: data.pattern || '',
          partOfSpeech: data.pos || data.part_of_speech || 'noun',
          diacritics: data.diacritics || arabicText,
        };
      }
    } catch (e) {
      console.error('Kalimat API morphology error:', e);
    }
    return null;
  }
}
