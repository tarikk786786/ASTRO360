export type TraditionGroup = 
  | 'Asian & Eastern' 
  | 'Middle Eastern & African' 
  | 'Western & European' 
  | 'Americas & Oceanic' 
  | 'Divination & Reading' 
  | 'Spiritual & Astronomy';

export type NotificationFrequency = 'hourly' | 'daily' | 'weekly' | 'custom' | 'off';
export type NotificationChannel = 'apprise' | 'ntfy' | 'webhook' | 'email' | 'browser';

export interface NotificationTopics {
  dailyHoroscope: boolean;
  transitAlerts: boolean;
  difficultWarningAlerts: boolean;
  lunarPhases: boolean;
  powerHours: boolean;
  numerologyDay: boolean;
  decisionHelper: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  frequency: NotificationFrequency;
  channel: NotificationChannel;
  customTime: string; // e.g. '08:00'
  email?: string;
  webhookUrl?: string;
  topics: NotificationTopics;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  gender: string;
  dob: string;
  time: string;
  location: string;
  preferredSystem: string;
  experienceMode?: 'normal' | 'astrologer';
  careerGoal?: string;
  relationshipStatus?: string;
  primaryLifeFocus?: string;
  notifications?: NotificationSettings;
}

export interface CategoryInfo {
  id: string;
  name: string;
  group: TraditionGroup;
  description: string;
  systems: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface DailyGuidance {
  focusArea: string;
  avoidance: string;
  actions: string[];
  luckyTime: string;
  quote: string;
  energy: number;
  element: string;
}

export interface ZodiacSign {
  sign: string;
  emoji: string;
  element: string;
  quality: string;
  ruler: string;
  dates: string;
}

export const ZODIAC_DATA: Record<string, ZodiacSign> = {
  Aries:       { sign: 'Aries',       emoji: '♈', element: 'Fire',  quality: 'Cardinal', ruler: 'Mars',    dates: 'Mar 21 – Apr 19' },
  Taurus:      { sign: 'Taurus',      emoji: '♉', element: 'Earth', quality: 'Fixed',    ruler: 'Venus',   dates: 'Apr 20 – May 20' },
  Gemini:      { sign: 'Gemini',      emoji: '♊', element: 'Air',   quality: 'Mutable',  ruler: 'Mercury', dates: 'May 21 – Jun 20' },
  Cancer:      { sign: 'Cancer',      emoji: '♋', element: 'Water', quality: 'Cardinal', ruler: 'Moon',    dates: 'Jun 21 – Jul 22' },
  Leo:         { sign: 'Leo',         emoji: '♌', element: 'Fire',  quality: 'Fixed',    ruler: 'Sun',     dates: 'Jul 23 – Aug 22' },
  Virgo:       { sign: 'Virgo',       emoji: '♍', element: 'Earth', quality: 'Mutable',  ruler: 'Mercury', dates: 'Aug 23 – Sep 22' },
  Libra:       { sign: 'Libra',       emoji: '♎', element: 'Air',   quality: 'Cardinal', ruler: 'Venus',   dates: 'Sep 23 – Oct 22' },
  Scorpio:     { sign: 'Scorpio',     emoji: '♏', element: 'Water', quality: 'Fixed',    ruler: 'Pluto',   dates: 'Oct 23 – Nov 21' },
  Sagittarius: { sign: 'Sagittarius', emoji: '♐', element: 'Fire',  quality: 'Mutable',  ruler: 'Jupiter', dates: 'Nov 22 – Dec 21' },
  Capricorn:   { sign: 'Capricorn',   emoji: '♑', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn',  dates: 'Dec 22 – Jan 19' },
  Aquarius:    { sign: 'Aquarius',    emoji: '♒', element: 'Air',   quality: 'Fixed',    ruler: 'Uranus',  dates: 'Jan 20 – Feb 18' },
  Pisces:      { sign: 'Pisces',      emoji: '♓', element: 'Water', quality: 'Mutable',  ruler: 'Neptune', dates: 'Feb 19 – Mar 20' },
};

export function getZodiacSign(month: number, day: number): ZodiacSign {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return ZODIAC_DATA.Aries;
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return ZODIAC_DATA.Taurus;
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return ZODIAC_DATA.Gemini;
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return ZODIAC_DATA.Cancer;
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return ZODIAC_DATA.Leo;
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return ZODIAC_DATA.Virgo;
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return ZODIAC_DATA.Libra;
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return ZODIAC_DATA.Scorpio;
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return ZODIAC_DATA.Sagittarius;
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return ZODIAC_DATA.Capricorn;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return ZODIAC_DATA.Aquarius;
  return ZODIAC_DATA.Pisces;
}

export function getMoonPhase(): { phase: string; emoji: string } {
  const now = new Date();
  const synodicMonth = 29.53058770576;
  const knownNewMoon = new Date(2000, 0, 6, 18, 14);
  const diff = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const age = ((diff % synodicMonth) + synodicMonth) % synodicMonth;
  if (age < 1.85) return { phase: 'New Moon', emoji: '🌑' };
  if (age < 7.38) return { phase: 'Waxing Crescent', emoji: '🌒' };
  if (age < 9.23) return { phase: 'First Quarter', emoji: '🌓' };
  if (age < 14.77) return { phase: 'Waxing Gibbous', emoji: '🌔' };
  if (age < 16.61) return { phase: 'Full Moon', emoji: '🌕' };
  if (age < 22.15) return { phase: 'Waning Gibbous', emoji: '🌖' };
  if (age < 23.99) return { phase: 'Last Quarter', emoji: '🌗' };
  return { phase: 'Waning Crescent', emoji: '🌘' };
}

export const TRADITIONS: Record<string, CategoryInfo> = {
  // Asian & Eastern
  vedic: {
    id: 'vedic',
    name: 'Indian (Vedic) Systems',
    group: 'Asian & Eastern',
    description: 'Ancient Indian systems of astrology, timing, and body reading based on sidereal calculations and karmic principles.',
    systems: ['Vedic Astrology (Jyotish)', 'Parashara Astrology', 'Jaimini Astrology', 'KP Astrology', 'Nadi Astrology', 'Bhrigu Astrology', 'Tajika Astrology', 'Prashna (Horary)', 'Muhurta Astrology', 'Panchang', 'Varshaphal', 'Lal Kitab', 'Numerology (Indian)', 'Samudrika Shastra', 'Hasta Samudrika (Palmistry)', 'Mukh Samudrika (Face Reading)', 'Swar Shastra', 'Ramal Shastra']
  },
  chinese: {
    id: 'chinese',
    name: 'Chinese Systems',
    group: 'Asian & Eastern',
    description: 'Systems based on traditional Chinese astronomy, calendars, and the Five Elements (Wu Xing).',
    systems: ['Chinese Zodiac', 'BaZi (Four Pillars)', 'Zi Wei Dou Shu', 'Feng Shui', 'Flying Star Feng Shui', 'I Ching Divination', 'Qi Men Dun Jia', 'Liu Yao', 'Mei Hua Yi Shu', 'Tong Shu Almanac', 'Face Reading (Mian Xiang)', 'Palmistry', 'Eight Mansions Feng Shui']
  },
  japanese: {
    id: 'japanese',
    name: 'Japanese Systems',
    group: 'Asian & Eastern',
    description: 'Japanese esoteric cosmology, astrology, and geomancy practices.',
    systems: ['Nine Star Ki', 'Onmyodo', 'Japanese Zodiac', 'Kaso (House Divination)']
  },
  korean: {
    id: 'korean',
    name: 'Korean Systems',
    group: 'Asian & Eastern',
    description: 'Traditional Korean fortune-telling and destiny analysis methods.',
    systems: ['Saju (Four Pillars)', 'Korean Face Reading', 'Korean Feng Shui (Pungsu-jiri)']
  },
  thai: {
    id: 'thai',
    name: 'Thai Systems',
    group: 'Asian & Eastern',
    description: 'Thai astrological and numerological systems deeply intertwined with local beliefs.',
    systems: ['Thai Astrology', 'Thai Lunar Astrology', 'Thai Numerology']
  },
  taiwanese: {
    id: 'taiwanese',
    name: 'Taiwanese Systems',
    group: 'Asian & Eastern',
    description: 'Astrology and divination practices prominent in Taiwan.',
    systems: ['Zi Wei Dou Shu', 'Feng Shui', 'Temple Divination']
  },
  vietnamese: {
    id: 'vietnamese',
    name: 'Vietnamese Systems',
    group: 'Asian & Eastern',
    description: 'Vietnamese cultural astrology and spatial arrangement systems.',
    systems: ['Vietnamese Zodiac', 'Tu Vi Astrology', 'Feng Shui']
  },
  tibetan: {
    id: 'tibetan',
    name: 'Tibetan Systems',
    group: 'Asian & Eastern',
    description: 'Astrology blending Indian and Chinese concepts with Tibetan Buddhist philosophy.',
    systems: ['Tibetan Astrology', 'Kalachakra Astrology', 'Tibetan Mo Divination']
  },
  mongolian: {
    id: 'mongolian',
    name: 'Mongolian Systems',
    group: 'Asian & Eastern',
    description: 'Astrological traditions influenced by Tibetan and local shamanic practices.',
    systems: ['Mongolian Astrology', 'Tibetan-influenced Astrology']
  },
  persian: {
    id: 'persian',
    name: 'Persian / Iranian Systems',
    group: 'Middle Eastern & African',
    description: 'Historical astrological practices from ancient Persia and Zoroastrianism.',
    systems: ['Persian Astrology', 'Zoroastrian Astrology']
  },
  babylonian: {
    id: 'babylonian',
    name: 'Babylonian Systems',
    group: 'Middle Eastern & African',
    description: 'Some of the oldest recorded astrological omens and star systems.',
    systems: ['Babylonian Astrology', 'Chaldean Astrology']
  },
  egyptian: {
    id: 'egyptian',
    name: 'Egyptian Systems',
    group: 'Middle Eastern & African',
    description: 'Ancient Egyptian stellar and calendrical divination.',
    systems: ['Egyptian Astrology', 'Egyptian Decans', 'Temple Astrology']
  },
  arabic: {
    id: 'arabic',
    name: 'Arabic & Islamic Astronomy & Astrology (Ilm al-Nujum)',
    group: 'Middle Eastern & African',
    description: 'Historical Islamic astronomy, celestial science, and planetary timing systems developed during the Islamic Golden Age by scholars such as Al-Biruni, Al-Kindi, Albumasar, and Al-Battani.',
    systems: [
      'Ilm al-Nujum (Science of the Stars)',
      'Manazil al-Qamar (28 Lunar Mansions)',
      'Ilm al-Jafr & Abjad (Sacred Letter & Number Vibrations)',
      'Ramal / Khatt al-Raml (Islamic Geomancy)',
      'Firdaria (Planetary Life Period Cycles)',
      'Arabic Parts / Lots (Lot of Fortune, Spirit & Destiny)',
      'Istikhara & Spiritual Timing Guidance',
      'Tasyir (Primary Directions & Ingresses)',
      'Falnama (Book of Omens & Guidance)'
    ]
  },
  jewish: {
    id: 'jewish',
    name: 'Jewish Traditions',
    group: 'Middle Eastern & African',
    description: 'Mystical and numerological traditions based on the Kabbalah and Hebrew alphabet.',
    systems: ['Kabbalistic Astrology', 'Gematria', 'Hebrew Numerology']
  },
  ethiopian: {
    id: 'ethiopian',
    name: 'Ethiopian Traditions',
    group: 'Middle Eastern & African',
    description: 'Unique astrological traditions from Ethiopia.',
    systems: ['Ethiopian Zodiac']
  },
  african: {
    id: 'african',
    name: 'African Traditions',
    group: 'Middle Eastern & African',
    description: 'Diverse indigenous divination and spiritual reading practices across Africa.',
    systems: ['Yoruba Ifá Divination', 'Cowrie Shell Divination', 'Bone Throwing', 'Zulu Divination', 'Akan Divination']
  },
  western: {
    id: 'western',
    name: 'Western Astrology',
    group: 'Western & European',
    description: 'The predominant astrological system in the West, utilizing the tropical zodiac.',
    systems: ['Tropical Astrology', 'Sidereal Astrology', 'Natal Astrology', 'Horary', 'Electional', 'Mundane', 'Medical', 'Financial', 'Psychological', 'Evolutionary', 'Esoteric', 'Hellenistic', 'Medieval', 'Renaissance', 'Uranian', 'Cosmobiology', 'Harmonic', 'Draconic', 'Astrocartography', 'Synastry', 'Composite Charts', 'Solar/Lunar Return', 'Progressions', 'Fixed Stars', 'Asteroids']
  },
  greek: {
    id: 'greek',
    name: 'Greek Systems',
    group: 'Western & European',
    description: 'Ancient Hellenistic astrology and oracle traditions.',
    systems: ['Hellenistic Astrology', 'Greek Oracle Traditions']
  },
  roman: {
    id: 'roman',
    name: 'Roman Systems',
    group: 'Western & European',
    description: 'Omens and divinatory practices of ancient Rome.',
    systems: ['Roman Astrology', 'Augury', 'Haruspicy']
  },
  celtic: {
    id: 'celtic',
    name: 'Celtic Systems',
    group: 'Western & European',
    description: 'Nature-based astrology and divination from Celtic traditions.',
    systems: ['Celtic Tree Astrology', 'Ogham Divination']
  },
  norse: {
    id: 'norse',
    name: 'Norse Systems',
    group: 'Western & European',
    description: 'Nordic divinatory practices utilizing runes and mythology.',
    systems: ['Rune Divination', 'Nordic Astrology']
  },
  finnish: {
    id: 'finnish',
    name: 'Finnish Traditions',
    group: 'Western & European',
    description: 'Folk omens and reading practices from Finland.',
    systems: ['Rune-based Divination', 'Folk Omens']
  },
  slavic: {
    id: 'slavic',
    name: 'Slavic Systems',
    group: 'Western & European',
    description: 'Slavic mythological zodiac and folk divination.',
    systems: ['Slavic Zodiac', 'Slavic Folk Divination']
  },
  armenian: {
    id: 'armenian',
    name: 'Armenian Traditions',
    group: 'Western & European',
    description: 'Historical zodiac traditions of Armenia.',
    systems: ['Armenian Zodiac Traditions']
  },
  georgian: {
    id: 'georgian',
    name: 'Georgian Traditions',
    group: 'Western & European',
    description: 'Folk astrology and lore from Georgia.',
    systems: ['Folk Astrology']
  },
  native_american: {
    id: 'native_american',
    name: 'Native American Traditions',
    group: 'Americas & Oceanic',
    description: 'Indigenous North American spiritual and symbolic reading systems.',
    systems: ['Medicine Wheel', 'Animal Totem Systems', 'Dream Interpretation']
  },
  aztec: {
    id: 'aztec',
    name: 'Aztec Systems',
    group: 'Americas & Oceanic',
    description: 'Mesoamerican calendrical divination based on the Aztec calendar.',
    systems: ['Aztec Calendar', 'Tonalpohualli', 'Day Sign Divination']
  },
  mayan: {
    id: 'mayan',
    name: 'Mayan Systems',
    group: 'Americas & Oceanic',
    description: 'Complex calendrical and astrological systems of the ancient Maya.',
    systems: ['Tzolkin Calendar', 'Haab Calendar', 'Long Count', 'Mayan Day Sign Reading']
  },
  inca: {
    id: 'inca',
    name: 'Inca Traditions',
    group: 'Americas & Oceanic',
    description: 'Andean spiritual divination methods.',
    systems: ['Andean Divination', 'Coca Leaf Reading']
  },
  polynesian: {
    id: 'polynesian',
    name: 'Polynesian Traditions',
    group: 'Americas & Oceanic',
    description: 'Oceanic stellar navigation and reading omens.',
    systems: ['Polynesian Star Navigation', 'Oceanic Omens']
  },
  hawaiian: {
    id: 'hawaiian',
    name: 'Hawaiian Traditions',
    group: 'Americas & Oceanic',
    description: 'Hawaiian esoteric practices and lunar tracking.',
    systems: ['Huna', 'Hawaiian Lunar Calendar']
  },
  numerology: {
    id: 'numerology',
    name: 'Numerology Systems',
    group: 'Divination & Reading',
    description: 'Analysis of numbers, dates, and names across various traditions.',
    systems: ['Pythagorean', 'Chaldean', 'Kabbalah', 'Tamil', 'Chinese', 'Vedic']
  },
  body_reading: {
    id: 'body_reading',
    name: 'Body Reading Systems',
    group: 'Divination & Reading',
    description: 'Interpretation of physical characteristics to determine fate or personality.',
    systems: ['Palmistry (Chiromancy)', 'Face Reading', 'Mole Reading', 'Ear Reading', 'Foot Reading', 'Body Mark Interpretation', 'Hand Shape Analysis']
  },
  cards: {
    id: 'cards',
    name: 'Card-Based Divination',
    group: 'Divination & Reading',
    description: 'Cartomancy using structured decks of symbolic cards.',
    systems: ['Tarot', 'Lenormand', 'Oracle Cards', 'Playing Card Divination', 'Angel Cards']
  },
  symbolic: {
    id: 'symbolic',
    name: 'Symbolic Divination',
    group: 'Divination & Reading',
    description: 'Casting or drawing objects to interpret patterns and outcomes.',
    systems: ['I Ching', 'Runes', 'Ogham', 'Dice Divination', 'Domino Divination', 'Coin Divination']
  },
  geomancy: {
    id: 'geomancy',
    name: 'Geomancy',
    group: 'Divination & Reading',
    description: 'Earth-based or systematic pattern divination.',
    systems: ['European Geomancy', 'Arabic Ramal', 'African Geomancy']
  },
  energy: {
    id: 'energy',
    name: 'Crystal & Energy Practices',
    group: 'Spiritual & Astronomy',
    description: 'Intuitive readings based on energy, aura, and physical objects.',
    systems: ['Crystal Reading', 'Pendulum Divination', 'Aura Reading', 'Chakra Analysis', 'Reiki Intuitive Reading']
  },
  dreams: {
    id: 'dreams',
    name: 'Dream & Symbol Interpretation',
    group: 'Spiritual & Astronomy',
    description: 'Analyzing subconscious imagery and real-world omens.',
    systems: ['Dream Interpretation', 'Lucid Dream Analysis', 'Symbol Interpretation', 'Animal Omens']
  },
  spiritual: {
    id: 'spiritual',
    name: 'Spiritual & Modern Systems',
    group: 'Spiritual & Astronomy',
    description: 'Contemporary and metaphysical frameworks for self-discovery.',
    systems: ['Human Design', 'Gene Keys', 'Akashic Records', 'Angel Numbers', 'Spirit Animal Readings', 'Twin Flame Readings', 'Soul Contract', 'Past Life Readings']
  },
  ai_vision: {
    id: 'ai_vision',
    name: 'AI Computer Vision & Biometrics',
    group: 'Divination & Reading',
    description: 'Open-source computer vision models for automated palmistry, facial feature reading, and graphology.',
    systems: ['MediaPipe Hand Landmarks', 'InsightFace Analysis', 'DeepFace Biometrics', 'PaddleOCR Graphology', 'EasyOCR Signature Verification']
  },
  astronomy: {
    id: 'astronomy',
    name: 'Astronomy-Based Tools',
    group: 'Spiritual & Astronomy',
    description: 'Scientific computational engines used to calculate planetary positions for astrology.',
    systems: ['Swiss Ephemeris', 'NASA JPL Ephemerides', 'Astropy', 'Skyfield', 'PyEphem', 'VedAstro Engine', 'Flatlib']
  }
};

export const GROUP_ICONS: Record<TraditionGroup, string> = {
  'Asian & Eastern': '🏯',
  'Middle Eastern & African': '🕌',
  'Western & European': '🏛️',
  'Americas & Oceanic': '🌎',
  'Divination & Reading': '🔮',
  'Spiritual & Astronomy': '✨',
};
