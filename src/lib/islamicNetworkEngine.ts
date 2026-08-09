/**
 * ASTRO360 Islamic Network Unified Engine
 * Official Integration of ALL APIs from Islamic Network (https://islamic.network)
 * Covers: AlQuran Cloud API v1 & Aladhan API v1
 */

export interface QuranSurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface QuranAyahDetail {
  number: number;
  audio?: string;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
}

export interface PrayerTimingData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface QiblaData {
  latitude: number;
  longitude: number;
  direction: number; // Bearing degrees from True North
}

export interface HijriDateConversion {
  hijriDay: string;
  hijriMonthEn: string;
  hijriMonthAr: string;
  hijriYear: string;
  gregorianDate: string;
  designation: string;
}

export class IslamicNetworkEngine {
  private static ALQURAN_BASE_URL = 'https://api.alquran.cloud/v1';
  private static ALADHAN_BASE_URL = 'https://api.aladhan.com/v1';

  // ==================================================
  // 1. ALQURAN CLOUD API INTEGRATIONS (islamic.network)
  // ==================================================

  /**
   * Fetches full list of 114 Surahs with English & Arabic metadata
   */
  public static async fetchSurahList(): Promise<QuranSurahMeta[]> {
    try {
      const res = await fetch(`${this.ALQURAN_BASE_URL}/surah`);
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch (e) {
      console.error('Islamic Network AlQuran Cloud surah list error:', e);
    }
    return [];
  }

  /**
   * Fetches complete Surah text with optional edition (e.g. 'quran-uthmani', 'en.sahih', 'ar.alafasy')
   */
  public static async fetchSurah(surahNumber: number, edition: string = 'quran-uthmani'): Promise<{ meta: QuranSurahMeta; ayahs: QuranAyahDetail[] } | null> {
    try {
      const res = await fetch(`${this.ALQURAN_BASE_URL}/surah/${surahNumber}/${edition}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          return {
            meta: {
              number: json.data.number,
              name: json.data.name,
              englishName: json.data.englishName,
              englishNameTranslation: json.data.englishNameTranslation,
              numberOfAyahs: json.data.numberOfAyahs,
              revelationType: json.data.revelationType,
            },
            ayahs: json.data.ayahs || [],
          };
        }
      }
    } catch (e) {
      console.error(`Islamic Network AlQuran Cloud surah ${surahNumber} error:`, e);
    }
    return null;
  }

  /**
   * Fetches a single Ayah by reference (e.g. "2:255" or "255")
   */
  public static async fetchAyah(reference: string | number, edition: string = 'quran-uthmani'): Promise<QuranAyahDetail | null> {
    try {
      const res = await fetch(`${this.ALQURAN_BASE_URL}/ayah/${reference}/${edition}`);
      if (res.ok) {
        const json = await res.json();
        return json.data || null;
      }
    } catch (e) {
      console.error(`Islamic Network AlQuran Cloud ayah ${reference} error:`, e);
    }
    return null;
  }

  /**
   * Searches Quranic text across all verses for a keyword
   */
  public static async searchQuran(query: string, language: string = 'en'): Promise<{ count: number; matches: any[] }> {
    try {
      const res = await fetch(`${this.ALQURAN_BASE_URL}/search/${encodeURIComponent(query)}/all/${language}`);
      if (res.ok) {
        const json = await res.json();
        return {
          count: json.data?.count || 0,
          matches: json.data?.matches || [],
        };
      }
    } catch (e) {
      console.error('Islamic Network AlQuran Cloud search error:', e);
    }
    return { count: 0, matches: [] };
  }

  // ==================================================
  // 2. ALADHAN PRAYER & ASTRONOMY API INTEGRATIONS
  // ==================================================

  /**
   * Fetches high-precision Prayer Timings for specific latitude and longitude coordinates
   */
  public static async fetchPrayerTimings(lat: number, lng: number, methodId: number = 2): Promise<PrayerTimingData | null> {
    try {
      const res = await fetch(`${this.ALADHAN_BASE_URL}/timings?latitude=${lat}&longitude=${lng}&method=${methodId}`);
      if (res.ok) {
        const json = await res.json();
        return json.data?.timings || null;
      }
    } catch (e) {
      console.error('Islamic Network Aladhan timings error:', e);
    }
    return null;
  }

  /**
   * Fetches Prayer Timings by City and Country name
   */
  public static async fetchPrayerTimingsByCity(city: string, country: string, methodId: number = 2): Promise<PrayerTimingData | null> {
    try {
      const res = await fetch(`${this.ALADHAN_BASE_URL}/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${methodId}`);
      if (res.ok) {
        const json = await res.json();
        return json.data?.timings || null;
      }
    } catch (e) {
      console.error('Islamic Network Aladhan timingsByCity error:', e);
    }
    return null;
  }

  /**
   * Fetches exact Qibla direction (great circle bearing to Mecca 21.4225° N, 39.8262° E)
   */
  public static async fetchQiblaDirection(lat: number, lng: number): Promise<QiblaData | null> {
    try {
      const res = await fetch(`${this.ALADHAN_BASE_URL}/qibla/${lat}/${lng}`);
      if (res.ok) {
        const json = await res.json();
        return {
          latitude: json.data?.latitude || lat,
          longitude: json.data?.longitude || lng,
          direction: json.data?.direction || 257.5,
        };
      }
    } catch (e) {
      console.error('Islamic Network Aladhan Qibla error:', e);
    }
    return null;
  }

  /**
   * Converts Gregorian date string (DD-MM-YYYY) to Hijri Date
   */
  public static async convertGregorianToHijri(dateStr: string): Promise<HijriDateConversion | null> {
    try {
      const res = await fetch(`${this.ALADHAN_BASE_URL}/gToH/${dateStr}`);
      if (res.ok) {
        const json = await res.json();
        const h = json.data?.hijri;
        if (h) {
          return {
            hijriDay: h.day,
            hijriMonthEn: h.month?.en || '',
            hijriMonthAr: h.month?.ar || '',
            hijriYear: h.year,
            gregorianDate: json.data?.gregorian?.date || dateStr,
            designation: h.designation?.abbreviation || 'AH',
          };
        }
      }
    } catch (e) {
      console.error('Islamic Network Aladhan Gregorian to Hijri error:', e);
    }
    return null;
  }

  /**
   * Fetches 99 Names of Allah (Asma Al-Husna)
   */
  public static async fetchAsmaAlHusna(): Promise<any[]> {
    try {
      const res = await fetch(`${this.ALADHAN_BASE_URL}/asmaAlHusna`);
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch (e) {
      console.error('Islamic Network Aladhan Asma Al-Husna error:', e);
    }
    return [];
  }
}
