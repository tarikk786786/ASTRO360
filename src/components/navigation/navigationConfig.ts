/**
 * ASTRO360 — Canonical Navigation Data Model & Configuration
 * 
 * Strict Principle:
 * Five Canonical Words:
 * 1. HOME     — What matters now?
 * 2. FORECAST — What comes next?
 * 3. ASK      — What do I want to know? (Central Action)
 * 4. CHARTS   — My astrology
 * 5. ME       — My account and saved things
 */

import { 
  Home, 
  Calendar, 
  Sparkles, 
  Compass, 
  User, 
  Layers, 
  Heart, 
  Clock, 
  FileText, 
  Activity, 
  MapPin, 
  Radar, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  Settings, 
  Bookmark, 
  Bell, 
  Globe2,
  Search,
  Radio,
  LucideIcon 
} from 'lucide-react';

export interface PrimaryNavItem {
  id: 'home' | 'forecast' | 'ask' | 'charts' | 'me';
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
  route: string;
  meaning: string;
  isHero?: boolean;
}

export interface MoreSheetItem {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  route: string;
  category: 'astrology' | 'tools' | 'advanced';
  badge?: string;
  tradition?: string;
}

export interface AstrologySystemOption {
  id: 'vedic' | 'western' | 'kp' | 'jaimini' | 'chinese' | 'islamic';
  name: string;
  subtitle: string;
  zodiac: 'Sidereal (Lahiri)' | 'Tropical' | 'Sidereal (KP Sub-Lord)' | 'Sidereal (Chara)' | 'Lunar 28 Mansions' | 'Kuwaiti Tabular / Prayer';
  description: string;
  traditionGroup: string;
}

export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    route: '/home',
    meaning: 'What matters now?',
  },
  {
    id: 'forecast',
    label: 'Forecast',
    icon: Calendar,
    route: '/forecast',
    meaning: 'What comes next?',
  },
  {
    id: 'ask',
    label: 'Ask',
    shortLabel: 'Ask',
    icon: Sparkles,
    route: '/ask',
    meaning: 'What do I want to know?',
    isHero: true,
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: Compass,
    route: '/charts',
    meaning: 'My astrology',
  },
  {
    id: 'me',
    label: 'Me',
    icon: User,
    route: '/me',
    meaning: 'My account & saved items',
  },
];

export const MORE_SHEET_ITEMS: MoreSheetItem[] = [
  // ── ASTROLOGY ──────────────────────────────────────────────
  {
    id: 'dasha',
    label: 'Dasha Timeline',
    description: '120-year Vimshottari Mahadasha, Antardasha & Pratyantar periods',
    icon: Clock,
    route: '/dasha',
    category: 'astrology',
    tradition: 'Vedic',
    badge: '120y',
  },
  {
    id: 'nakshatra',
    label: '27 Nakshatras & Padas',
    description: 'Lunar mansions, deity rulers, Gana, Yoni, Nadi and 108 Pada divisions',
    icon: Sparkles,
    route: '/nakshatra',
    category: 'astrology',
    tradition: 'Vedic',
  },
  {
    id: 'panchanga',
    label: '5-Limb Panchanga',
    description: 'Tithi, Vara, Nakshatra, Yoga, Karana, Abhijit & Rahu Kalam',
    icon: Calendar,
    route: '/panchanga',
    category: 'astrology',
    tradition: 'Vedic',
    badge: 'Daily',
  },
  {
    id: 'varga',
    label: 'Divisional Vargas (D1–D60)',
    description: 'Navamsha (D9), Dashamsha (D10), Saptamsha (D7) and harmonic charts',
    icon: Layers,
    route: '/varga',
    category: 'astrology',
    tradition: 'Vedic',
  },
  {
    id: 'kp',
    label: 'KP Cuspal Sub-Lords',
    description: 'Placidus 249 sub-lord divisions and stellar significator matrix',
    icon: Activity,
    route: '/kp',
    category: 'astrology',
    tradition: 'KP',
    badge: 'Precision',
  },
  {
    id: 'jaimini',
    label: 'Jaimini Chara Karakas',
    description: '7 Chara Karakas, Atmakaraka, Amatyakaraka and Karakamsha analysis',
    icon: Compass,
    route: '/jaimini',
    category: 'astrology',
    tradition: 'Jaimini',
  },
  {
    id: 'transits',
    label: 'Live Planetary Radar',
    description: 'Real-time ephemeris orbital radar with retrograde tracking',
    icon: Radar,
    route: '/transits',
    category: 'astrology',
    badge: 'Live',
  },
  {
    id: 'astrocartography',
    label: 'Astrocartography Matrix',
    description: 'Planetary angular power lines mapped to global geographic coordinates',
    icon: MapPin,
    route: '/astrocartography',
    category: 'astrology',
  },

  // ── TOOLS ──────────────────────────────────────────────────
  {
    id: 'compatibility',
    label: 'Relationship Compatibility',
    description: 'Ashta Koota 36-Guna matching and Western synastry cross-aspects',
    icon: Heart,
    route: '/compatibility',
    category: 'tools',
    badge: '36-Guna',
  },
  {
    id: 'calendar',
    label: 'Cosmic Transit Calendar',
    description: 'Interactive celestial calendar with monthly planetary ingresses',
    icon: Calendar,
    route: '/calendar',
    category: 'tools',
  },
  {
    id: 'reports',
    label: 'Executive Dossier Reports',
    description: 'Cryptographically-sealed PDF dossiers and deep astrological audits',
    icon: FileText,
    route: '/reports',
    category: 'tools',
    badge: 'PDF',
  },
  {
    id: 'muhurta',
    label: 'Electional Muhurta',
    description: 'Auspicious timing finder for marriage, business, travel, and ventures',
    icon: Clock,
    route: '/muhurta',
    category: 'tools',
  },
  {
    id: 'horas',
    label: 'Planetary Horas',
    description: 'Hourly planetary rulership clock calibrated to local sunrise/sunset',
    icon: Activity,
    route: '/horas',
    category: 'tools',
  },

  // ── ADVANCED ───────────────────────────────────────────────
  {
    id: 'studio',
    label: 'Astro Studio (152+ Engines)',
    description: 'Master computational studio catalog across all world traditions',
    icon: Cpu,
    route: '/studio',
    category: 'advanced',
    badge: '152+',
  },
  {
    id: 'research',
    label: 'Omni Research Suite',
    description: 'Multi-system convergence, uncertainty quantification and forensic tests',
    icon: BookOpen,
    route: '/research',
    category: 'advanced',
    badge: 'Forensic',
  },
  {
    id: 'rectification',
    label: 'Birth-Time Rectification',
    description: 'Historical milestone back-alignment and Tattwa Shodhana analysis',
    icon: ShieldCheck,
    route: '/rectification',
    category: 'advanced',
  },
  {
    id: 'seo-lab',
    label: 'SEO Keyword Research Lab',
    description: 'Free-first keyword discovery, Google Trends, clusters & content briefs',
    icon: Search,
    route: '/seo-lab',
    category: 'advanced',
    badge: 'Free',
  },
  {
    id: 'backlink-lab',
    label: 'Backlink Opportunity Lab',
    description: 'High-trust link discovery, unlinked mentions, digital PR & verification',
    icon: Globe2,
    route: '/backlink-lab',
    category: 'advanced',
    badge: 'PR Lab',
  },
  {
    id: 'news-intelligence',
    label: 'Cosmic News & Mundane Prediction Hub',
    description: 'Free open news APIs, NOAA space weather, USGS seismic & planetary correlations',
    icon: Radio,
    route: '/news-intelligence',
    category: 'advanced',
    badge: 'Real-Time',
  },
];

export const ASTROLOGY_SYSTEMS: AstrologySystemOption[] = [
  {
    id: 'vedic',
    name: 'Vedic / Parashari',
    subtitle: 'Sidereal Zodiac • Lahiri Ayanamsha (23.856°)',
    zodiac: 'Sidereal (Lahiri)',
    description: 'Classical Brihat Parashara Hora Shastra, 120-year Vimshottari Dasha, 27 Nakshatras & Vargas.',
    traditionGroup: 'Eastern Classical',
  },
  {
    id: 'western',
    name: 'Western / Modern & Hellenistic',
    subtitle: 'Tropical Zodiac • Placidus / Equal Quadrants',
    zodiac: 'Tropical',
    description: 'Equinoctial seasonal frame, transit aspects, essential dignities, and secondary progressions.',
    traditionGroup: 'Western Hellenistic',
  },
  {
    id: 'kp',
    name: 'KP System (Krishnamurti Padhdhati)',
    subtitle: 'Placidus Cusps • 249 Sub-Lord Stellar Theory',
    zodiac: 'Sidereal (KP Sub-Lord)',
    description: 'Sub-division of Nakshatras into 249 sub-lords for precise yes/no event timing.',
    traditionGroup: 'Stellar Astrology',
  },
  {
    id: 'jaimini',
    name: 'Jaimini Astrology',
    subtitle: 'Sign-Based Aspects • Chara Karakas',
    zodiac: 'Sidereal (Chara)',
    description: 'Variable planetary significators (Atmakaraka, Amatyakaraka) and Chara Dasha sign periods.',
    traditionGroup: 'Sutra Tradition',
  },
  {
    id: 'chinese',
    name: 'Chinese BaZi (Four Pillars)',
    subtitle: 'Solar Terms (Jie Qi) • Heavenly Stems & Earthly Branches',
    zodiac: 'Lunar 28 Mansions',
    description: 'Year, Month, Day, and Hour pillars, Five Elements balance, 10 Gods, and 10-Year Luck Pillars.',
    traditionGroup: 'East Asian Taoist',
  },
  {
    id: 'islamic',
    name: 'Islamic Astrology (Ilm al-Falak)',
    subtitle: 'Kuwaiti Tabular Calendar • Astronomical Prayer Times',
    zodiac: 'Kuwaiti Tabular / Prayer',
    description: 'Arabic Parts, Lunar Mansions (Manazil al-Qamar), Qibla bearing, and astronomical prayer windows.',
    traditionGroup: 'Islamic Medieval',
  },
];