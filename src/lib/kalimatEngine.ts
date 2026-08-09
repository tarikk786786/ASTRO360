/**
 * ASTRO360 Kalimat Arabic NLP & Quranic Analysis Engine
 * Official Integration for Kalimat Platform (https://api.kalimat.dev)
 * Key: 6c2fd11b-e07a-4e21-955e-1e887ed865fe
 */

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
  private static API_KEY = import.meta.env.VITE_KALIMAT_API_KEY || '6c2fd11b-e07a-4e21-955e-1e887ed865fe';
  private static BASE_URL = 'https://api.kalimat.dev';

  /**
   * Search Quran text or Arabic roots via Kalimat API
   */
  public static async searchArabicText(query: string): Promise<KalimatSearchResult | null> {
    try {
      const res = await fetch(`${this.BASE_URL}/search?q=${encodeURIComponent(query)}&apikey=${this.API_KEY}`, {
        headers: {
          'x-api-key': this.API_KEY,
          'Authorization': `Bearer ${this.API_KEY}`,
          'Accept': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
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
      const res = await fetch(`${this.BASE_URL}/analyze?text=${encodeURIComponent(arabicText)}&apikey=${this.API_KEY}`, {
        headers: {
          'x-api-key': this.API_KEY,
          'Authorization': `Bearer ${this.API_KEY}`,
          'Accept': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
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
