/**
 * ASTRO360 Centralized Global Configuration & Dependency Resolver Engine
 * Single Source of Truth for Astrology, Ephemeris, Localization, Timezones, Islamic Rites, and UI Settings
 */

import { AyanamsaMode, ZodiacSystem, HouseSystem } from './astronomyEngine';

export type SupportedLanguage = 
  | 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa' 
  | 'ur' | 'ar' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' 
  | string;
export type AstrologySystemMode = 'vedic' | 'western' | 'islamic' | 'chinese';
export type DateFormatMode = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
export type AsrJuristicMethod = 'standard' | 'hanafi';
export type ThemeMode = 'dark' | 'cosmic' | 'gold';
export type UiDensity = 'comfortable' | 'compact' | 'spacious';

export interface GlobalConfigState {
  // 1. ASTROLOGY SYSTEM & CALCULATION PARAMETERS
  astrologySystem: AstrologySystemMode;
  faithPerspective: 'all' | 'vedic' | 'islamic' | 'western' | 'taoist' | 'buddhist' | 'kabbalah';
  zodiacSystem: ZodiacSystem;
  ayanamsaMode: AyanamsaMode;
  houseSystem: HouseSystem;
  dashaSystem: 'vimshottari';
  aspectMaxOrb: number; // 1.0° to 12.0°
  visiblePlanets: string[]; // ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu', 'Uranus', 'Neptune', 'Pluto', 'Chiron']

  // 2. LOCALIZATION & GLOBALIZATION
  language: SupportedLanguage;
  dateFormat: DateFormatMode;
  isRtl: boolean;
  timezoneId: string; // e.g. 'Europe/London', 'Asia/Kolkata', 'Mecca'

  // 3. ISLAMIC RITES & COMPUTATION
  prayerMethod: string; // 'MWL', 'ISNA', 'Egypt', 'Karachi', 'Umm_al_Qura'
  asrJuristic: AsrJuristicMethod;
  hijriAdjustmentDays: number; // -2 to +2

  // 4. PREDICTIONS & AI INTERPRETATION
  predictionTimeframe: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  predictionFocus: 'career' | 'finance' | 'love' | 'health' | 'spiritual' | 'general';
  predictionDetailLevel: 'brief' | 'standard' | 'detailed';

  // 5. UI APPEARANCE & ACCESSIBILITY
  themeMode: ThemeMode;
  uiDensity: UiDensity;
  reducedMotion: boolean;

  // 6. ACTIVE PROFILE POINTER
  activeProfileId: string;

  // CONFIGURATION METADATA
  configurationVersion: string;
  lastUpdated: string;
}

export const DEFAULT_GLOBAL_CONFIG: GlobalConfigState = {
  astrologySystem: 'vedic',
  faithPerspective: 'all',
  zodiacSystem: 'sidereal',
  ayanamsaMode: 'lahiri',
  houseSystem: 'wholesign',
  dashaSystem: 'vimshottari',
  aspectMaxOrb: 8.0,
  visiblePlanets: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu', 'Uranus', 'Neptune', 'Pluto', 'Chiron'],

  language: 'en',
  dateFormat: 'YYYY-MM-DD',
  isRtl: false,
  timezoneId: 'Asia/Kolkata',

  prayerMethod: 'MWL',
  asrJuristic: 'standard',
  hijriAdjustmentDays: 0,

  predictionTimeframe: 'Daily',
  predictionFocus: 'general',
  predictionDetailLevel: 'standard',

  themeMode: 'cosmic',
  uiDensity: 'comfortable',
  reducedMotion: false,

  activeProfileId: 'default_self',
  configurationVersion: '2026.1.0',
  lastUpdated: new Date().toISOString(),
};

type ConfigListener = (config: GlobalConfigState) => void;

export class GlobalConfigManager {
  private static STORAGE_KEY = 'astro360_global_config';
  private static listeners: Set<ConfigListener> = new Set();
  private static currentConfig: GlobalConfigState = this.loadFromStorage();

  private static loadFromStorage(): GlobalConfigState {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_GLOBAL_CONFIG, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to parse GlobalConfig from localStorage:', e);
    }
    return DEFAULT_GLOBAL_CONFIG;
  }

  public static getConfig(): GlobalConfigState {
    return { ...this.currentConfig };
  }

  /**
   * Updates global configuration settings with dependency resolution & cache invalidation
   */
  public static updateConfig(partial: Partial<GlobalConfigState>): GlobalConfigState {
    const prev = { ...this.currentConfig };
    let next = { ...this.currentConfig, ...partial, lastUpdated: new Date().toISOString() };

    // DEPENDENCY RESOLVER PIPELINE
    // 1. Language ➔ RTL resolution
    if (partial.language !== undefined) {
      next.isRtl = ['ar', 'ur'].includes(partial.language);
      document.documentElement.dir = next.isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = partial.language;
    }

    // 2. Astrology System ➔ Zodiac defaults
    if (partial.astrologySystem !== undefined) {
      if (partial.astrologySystem === 'western') {
        next.zodiacSystem = 'tropical';
        next.houseSystem = 'placidus';
      } else if (partial.astrologySystem === 'vedic') {
        next.zodiacSystem = 'sidereal';
        next.houseSystem = 'wholesign';
        next.ayanamsaMode = 'lahiri';
      }
    }

    // 3. Zodiac System ➔ Ayanamsa consistency
    if (partial.zodiacSystem === 'tropical') {
      // In tropical mode, planetary longitudes are direct without ayanamsa subtraction
    } else if (partial.zodiacSystem === 'sidereal' && !next.ayanamsaMode) {
      next.ayanamsaMode = 'lahiri';
    }

    // 4. UI Theme & Motion Document Classes
    if (partial.themeMode !== undefined) {
      document.documentElement.setAttribute('data-theme', partial.themeMode);
      if (partial.themeMode === 'dark' || partial.themeMode === 'cosmic') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    if (partial.reducedMotion !== undefined) {
      if (partial.reducedMotion) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    }

    this.currentConfig = next;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed to persist GlobalConfig to localStorage:', e);
    }

    // Notify reactive subscribers
    this.listeners.forEach(listener => listener(next));

    return { ...this.currentConfig };
  }

  public static subscribe(listener: ConfigListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public static resetConfig(category?: 'all' | 'astrology' | 'localization' | 'islamic' | 'ui'): GlobalConfigState {
    if (!category || category === 'all') {
      return this.updateConfig(DEFAULT_GLOBAL_CONFIG);
    }
    if (category === 'astrology') {
      return this.updateConfig({
        astrologySystem: DEFAULT_GLOBAL_CONFIG.astrologySystem,
        zodiacSystem: DEFAULT_GLOBAL_CONFIG.zodiacSystem,
        ayanamsaMode: DEFAULT_GLOBAL_CONFIG.ayanamsaMode,
        houseSystem: DEFAULT_GLOBAL_CONFIG.houseSystem,
        dashaSystem: DEFAULT_GLOBAL_CONFIG.dashaSystem,
        aspectMaxOrb: DEFAULT_GLOBAL_CONFIG.aspectMaxOrb,
        visiblePlanets: DEFAULT_GLOBAL_CONFIG.visiblePlanets,
      });
    }
    if (category === 'localization') {
      return this.updateConfig({
        language: DEFAULT_GLOBAL_CONFIG.language,
        dateFormat: DEFAULT_GLOBAL_CONFIG.dateFormat,
        timezoneId: DEFAULT_GLOBAL_CONFIG.timezoneId,
      });
    }
    if (category === 'islamic') {
      return this.updateConfig({
        prayerMethod: DEFAULT_GLOBAL_CONFIG.prayerMethod,
        asrJuristic: DEFAULT_GLOBAL_CONFIG.asrJuristic,
        hijriAdjustmentDays: DEFAULT_GLOBAL_CONFIG.hijriAdjustmentDays,
      });
    }
    if (category === 'ui') {
      return this.updateConfig({
        themeMode: DEFAULT_GLOBAL_CONFIG.themeMode,
        uiDensity: DEFAULT_GLOBAL_CONFIG.uiDensity,
        reducedMotion: DEFAULT_GLOBAL_CONFIG.reducedMotion,
      });
    }
    return this.getConfig();
  }
}
