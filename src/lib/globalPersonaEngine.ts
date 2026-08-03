// ASTRO360 Worldwide Global Persona & Cultural Adaptation Engine
// Tailors ASTRO360 features, terminology, calculations, and AI responses for users across all global traditions and cultures.

export type GlobalCultureRegion = 
  | 'vedic_south_asia'
  | 'western_americas_europe'
  | 'islamic_middle_east_global'
  | 'east_asian_china_japan'
  | 'mesoamerican_indigenous'
  | 'secular_astronomy_scientific';

export interface GlobalUserPersonaProfile {
  id: GlobalCultureRegion;
  title: string;
  subtitle: string;
  regionLabel: string;
  primarySystems: string[];
  recommendedModules: string[];
  terminologyStyle: 'Sanskrit' | 'Greco-Roman' | 'Arabic' | 'Hanzi/Pinyin' | 'Nahuatl/Mayan' | 'Scientific UTC';
  aiTonePrompt: string;
  colorScheme: {
    accent: string;
    border: string;
    bgBadge: string;
  };
}

export const GLOBAL_PERSONA_MAP: Record<GlobalCultureRegion, GlobalUserPersonaProfile> = {
  vedic_south_asia: {
    id: 'vedic_south_asia',
    title: 'Vedic & Jyotish Tradition',
    subtitle: 'Sidereal Zodiac, Vimshottari Dasha, Panchang & Nakshatra Telemetry',
    regionLabel: 'South Asia & Global Indian Diaspora',
    primarySystems: ['Jyotish (Vedic Astrology)', 'Lahiri Sidereal Ayanamsha', '5-Limb Panchang', 'Ashta Kuta Guna Milan'],
    recommendedModules: ['birth-chart', 'panchang', 'horoscope', 'compatibility'],
    terminologyStyle: 'Sanskrit',
    aiTonePrompt: 'Interpret using classical Jyotish terminology (Lagna, Nakshatra, Mahadasha, Gochar, Remedies).',
    colorScheme: { accent: '#F59E0B', border: 'border-[#F59E0B]/30', bgBadge: 'bg-[#F59E0B]/10' }
  },
  western_americas_europe: {
    id: 'western_americas_europe',
    title: 'Western & Hellenistic Astrology',
    subtitle: 'Tropical Zodiac, Placidus House System, Aspects & Synastry',
    regionLabel: 'Europe, Americas & Oceania',
    primarySystems: ['Tropical Sun-Sign System', 'Placidus & Whole Sign Houses', 'Planetary Aspects (Trine, Sextile)', 'Solar Return Charts'],
    recommendedModules: ['horoscope', 'transits', 'compatibility', 'birth-chart'],
    terminologyStyle: 'Greco-Roman',
    aiTonePrompt: 'Interpret using psychological Western astrological framework (Sun/Moon/Rising, Aspects, Transits).',
    colorScheme: { accent: '#2563EB', border: 'border-[#2563EB]/30', bgBadge: 'bg-[#2563EB]/10' }
  },
  islamic_middle_east_global: {
    id: 'islamic_middle_east_global',
    title: 'Islamic Astronomy & Worship Center',
    subtitle: '28 Lunar Mansions (Manazil al-Qamar), Abjad Math & Qur\'an Guidance',
    regionLabel: 'Middle East, North Africa & Global Muslim Community',
    primarySystems: ['Authentic Holy Qur\'an & Tafsir', 'Sahih Hadith Library', '28 Manazil al-Qamar', 'Aladhan GPS Prayer & Qibla'],
    recommendedModules: ['islamic', 'duas', 'tasbeeh', 'hadith'],
    terminologyStyle: 'Arabic',
    aiTonePrompt: 'Provide authentic religious guidance strictly rooted in Holy Qur\'an and Sahih Hadith with verified citations.',
    colorScheme: { accent: '#22C55E', border: 'border-[#22C55E]/30', bgBadge: 'bg-[#22C55E]/10' }
  },
  east_asian_china_japan: {
    id: 'east_asian_china_japan',
    title: 'East Asian Wisdom Systems',
    subtitle: 'Zi Wei Dou Shu (Purple Star), Four Pillars (BaZi) & I Ching',
    regionLabel: 'East & Southeast Asia',
    primarySystems: ['Zi Wei Dou Shu (Purple Star Astrology)', 'Four Pillars of Destiny (BaZi)', '64 I Ching Hexagrams', 'Feng Shui Energy Alignment'],
    recommendedModules: ['numerology', 'dream', 'horoscope', 'learning'],
    terminologyStyle: 'Hanzi/Pinyin',
    aiTonePrompt: 'Interpret using Five Elements (Yin/Yang), Zi Wei Dou Shu palaces, and BaZi heavenly stems.',
    colorScheme: { accent: '#7C3AED', border: 'border-[#7C3AED]/30', bgBadge: 'bg-[#7C3AED]/10' }
  },
  mesoamerican_indigenous: {
    id: 'mesoamerican_indigenous',
    title: 'Indigenous & Mesoamerican Sacred Calendars',
    subtitle: 'Mayan Tzolkin 260-Day Sacred Cycle & Animal Spirit Totems',
    regionLabel: 'Central & South America, Indigenous Nations',
    primarySystems: ['Mayan Tzolkin 260-Day Count', 'Solar Seals & Galactic Tones', 'Aztec Tonalpohualli', 'Animal Spirit Totems'],
    recommendedModules: ['dream', 'numerology', 'horoscope', 'learning'],
    terminologyStyle: 'Nahuatl/Mayan',
    aiTonePrompt: 'Interpret using Mayan Tzolkin galactic seals, lunar tones, and shamanic spirit animal guidance.',
    colorScheme: { accent: '#EC4899', border: 'border-pink-500/30', bgBadge: 'bg-pink-500/10' }
  },
  secular_astronomy_scientific: {
    id: 'secular_astronomy_scientific',
    title: 'Scientific Astronomy & Deep Space Telemetry',
    subtitle: 'NASA APOD, JPL Solar Flare Weather & WebGL 3D Orrery',
    regionLabel: 'Global Scientific Community',
    primarySystems: ['JPL DE421 Ephemerides', 'NASA Solar Wind & DONKI Telemetry', 'Sub-Arcsecond Orbital Mechanics', 'Circadian Sleep Analytics'],
    recommendedModules: ['nasa', 'orrery', 'dream', 'reports'],
    terminologyStyle: 'Scientific UTC',
    aiTonePrompt: 'Interpret purely through empirical astronomical data, space weather bulletins, and circadian science.',
    colorScheme: { accent: '#06B6D4', border: 'border-[#06B6D4]/30', bgBadge: 'bg-[#06B6D4]/10' }
  }
};

export function getPersonaProfile(region: GlobalCultureRegion): GlobalUserPersonaProfile {
  return GLOBAL_PERSONA_MAP[region] || GLOBAL_PERSONA_MAP.vedic_south_asia;
}
