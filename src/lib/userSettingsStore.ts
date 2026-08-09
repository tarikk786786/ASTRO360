import { GlobalConfigManager } from './globalConfig';

export interface CustomUserSettings {
  zodiacSystem: 'tropical' | 'sidereal';
  ayanamsaMode: 'lahiri' | 'raman' | 'kp' | 'fagan_bradley' | 'yukteshwar';
  houseSystem: 'placidus' | 'wholesign' | 'equal' | 'koch' | 'porphyry' | 'regiomontanus' | 'campanus';
  aspectMaxOrb: number; // e.g. 8° default
  dashaSystem: 'vimshottari';
  preferredLanguage: string; // 'en', 'ar', 'hi', 'ur', 'bn', 'fr'
  themeMode: 'dark' | 'cosmic' | 'gold';
}

export interface BirthProfile {
  id: string;
  name: string;
  relationship: 'Self' | 'Partner' | 'Child' | 'Parent' | 'Friend' | 'Custom';
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  isTimeUnknown: boolean;
  locationName: string;
  latitude: number;
  longitude: number;
  timezoneId: string;
  notes?: string;
}

export const DEFAULT_USER_SETTINGS: CustomUserSettings = {
  zodiacSystem: 'sidereal',
  ayanamsaMode: 'lahiri',
  houseSystem: 'wholesign',
  aspectMaxOrb: 8.0,
  dashaSystem: 'vimshottari',
  preferredLanguage: 'en',
  themeMode: 'cosmic',
};

export class UserSettingsStore {
  private static SETTINGS_KEY = 'astro360_user_settings';
  private static PROFILES_KEY = 'astro360_birth_profiles';

  public static loadSettings(): CustomUserSettings {
    try {
      const config = GlobalConfigManager.getConfig();
      return {
        zodiacSystem: config.zodiacSystem,
        ayanamsaMode: config.ayanamsaMode,
        houseSystem: config.houseSystem,
        aspectMaxOrb: config.aspectMaxOrb,
        dashaSystem: config.dashaSystem,
        preferredLanguage: config.language,
        themeMode: config.themeMode,
      };
    } catch {
      return DEFAULT_USER_SETTINGS;
    }
  }

  public static saveSettings(settings: Partial<CustomUserSettings>): CustomUserSettings {
    const patch: any = {};
    if (settings.zodiacSystem) patch.zodiacSystem = settings.zodiacSystem;
    if (settings.ayanamsaMode) patch.ayanamsaMode = settings.ayanamsaMode;
    if (settings.houseSystem) patch.houseSystem = settings.houseSystem;
    if (settings.aspectMaxOrb) patch.aspectMaxOrb = settings.aspectMaxOrb;
    if (settings.dashaSystem) patch.dashaSystem = settings.dashaSystem;
    if (settings.preferredLanguage) patch.language = settings.preferredLanguage as any;
    if (settings.themeMode) patch.themeMode = settings.themeMode;

    GlobalConfigManager.updateConfig(patch);
    return this.loadSettings();
  }

  public static loadProfiles(): BirthProfile[] {
    try {
      const stored = localStorage.getItem(this.PROFILES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public static saveProfile(profile: BirthProfile): BirthProfile[] {
    const profiles = this.loadProfiles();
    const idx = profiles.findIndex(p => p.id === profile.id);
    if (idx >= 0) profiles[idx] = profile;
    else profiles.push(profile);

    localStorage.setItem(this.PROFILES_KEY, JSON.stringify(profiles));
    return profiles;
  }

  public static deleteProfile(profileId: string): BirthProfile[] {
    const updated = this.loadProfiles().filter(p => p.id !== profileId);
    localStorage.setItem(this.PROFILES_KEY, JSON.stringify(updated));
    return updated;
  }
}
