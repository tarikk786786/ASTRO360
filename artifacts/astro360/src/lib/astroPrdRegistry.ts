export interface PrdModule {
  id: number;
  name: string;
  category: 'core' | 'astrology' | 'divination' | 'remedies' | 'learning' | 'system';
  description: string;
  features: string[];
  status: 'active' | 'ready' | 'enhanced';
}

export const ASTRO360_PRD_MODULES: PrdModule[] = [
  { id: 1, name: 'Birth Data Engine', category: 'core', description: 'Birth details collection, location autocomplete, time zone, lat/long & saved profiles.', features: ['DST & Lat/Long', 'Timezone Detection', 'Multiple Profiles'], status: 'active' },
  { id: 2, name: 'Astronomical Calculation Engine', category: 'core', description: 'Julian Day, Sidereal Time, Lahiri Ayanamsha, 9 Planet positions & Sunrise/Sunset.', features: ['Lahiri Ayanamsha', 'Planetary Speed & Degrees', 'Combustion & Retrograde'], status: 'active' },
  { id: 3, name: 'Kundli Engine', category: 'astrology', description: 'North Indian, South Indian, East Indian & Western Wheel interactive chart rendering.', features: ['North & South Styles', 'SVG Rendering', 'Aspect Geometry'], status: 'active' },
  { id: 4, name: 'Divisional Chart Engine', category: 'astrology', description: 'Comprehensive Varga charts: D1 (Rasi), D9 (Navamsa), D10 (Dasamsa), D60 (Shashtiamsa).', features: ['D1 to D60 Support', 'Navamsa Breakdown', 'Varga Strength'], status: 'active' },
  { id: 5, name: 'Planet Engine', category: 'astrology', description: 'Sign, House, Degree, Motion, Exaltation, Debilitation & Shadbala planet metrics.', features: ['Exaltation & Debilitation', 'Shadbala Strengths', 'Natural & Functional Roles'], status: 'active' },
  { id: 6, name: 'House Engine', category: 'astrology', description: 'Bhavas 1-12 analysis, house lords, occupants, aspects, and strength ratings.', features: ['12 Bhava Analysis', 'House Lord Occupancy', 'Aspect Multipliers'], status: 'active' },
  { id: 7, name: 'Nakshatra Engine', category: 'astrology', description: '27 Nakshatras, 4 Padas, Ruling Deities, Animals, Trees & Lunar Mansion Archetypes.', features: ['27 Nakshatras & 108 Padas', 'Ruling Deities & Trees', 'Symbolism & Temperament'], status: 'active' },
  { id: 8, name: 'Yoga Detection Engine', category: 'astrology', description: 'Detects Raja Yogas, Gaja Kesari, Dhana Yogas, Budhaditya, Sunapha & Anapha.', features: ['Hundreds of Traditional Yogas', 'Condition Validation', 'Priority Scoring'], status: 'active' },
  { id: 9, name: 'Dosha Engine', category: 'astrology', description: 'Identifies Manglik, Kaal Sarp, Pitra, Guru Chandal, Grahan & Shrapit Doshas.', features: ['Manglik & Kaal Sarp', 'Severity Rating', 'Traditional Belief Remedies'], status: 'active' },
  { id: 10, name: 'Dasha Engine', category: 'astrology', description: 'Vimshottari, Yogini, Ashtottari, Kalachakra & Chara Dasha timeline engine.', features: ['Vimshottari 120-Yr Cycle', 'Major Mahadasha & Antardasha', 'Visual Timeline'], status: 'active' },
  { id: 11, name: 'Transit Engine', category: 'astrology', description: 'Daily, Weekly, Monthly & Yearly planet transits, ingresses & retrograde alerts.', features: ['Live Planetary Transits', 'Gochar Analysis', 'Retrograde Tracking'], status: 'active' },
  { id: 12, name: 'Panchang Engine', category: 'astrology', description: 'Tithi, Paksha, Vara, Nakshatra, Yoga, Karana, Abhijit & Rahu Kaal daily metrics.', features: ['Daily 5 Limb Telemetry', 'Abhijit Muhurta', 'Rahu Kaal Alert'], status: 'active' },
  { id: 13, name: 'Compatibility Engine', category: 'astrology', description: 'Ashta Koota 36-Point Guna Milan, Nadi, Bhakoot, Manglik & Synastry matching.', features: ['36 Guna Score', 'Ashta Koota Breakdown', 'Nadi & Bhakoot Check'], status: 'active' },
  { id: 14, name: 'Muhurta Engine', category: 'astrology', description: 'Auspicious timing finder for Marriage, Business, Travel, Property & Vehicle.', features: ['Auspicious Windows', 'Choghadiya Timings', 'Custom Intent Search'], status: 'active' },
  { id: 15, name: 'Numerology Engine', category: 'divination', description: 'Life Path, Expression, Destiny, Soul Urge & Personal Year Pythagorean metrics.', features: ['Life Path 1-9 & 11/22/33', 'Pythagorean Gematria', 'Personal Year Cycles'], status: 'active' },
  { id: 16, name: 'Dream Interpretation Engine', category: 'divination', description: 'Multi-perspective dream analysis: Psychological, Islamic, Vedic, Cultural & Science.', features: ['Multi-Tradition Matrix', 'Sleep Science REM Data', 'Lucid Dreaming Guide'], status: 'active' },
  { id: 17, name: 'Palmistry Engine', category: 'divination', description: 'Life Line, Heart Line, Head Line, Fate Line & Mounts educational analyzer.', features: ['Major & Minor Lines', 'Mount of Jupiter/Venus', 'Hand Types'], status: 'active' },
  { id: 18, name: 'Face Reading Engine', category: 'divination', description: 'Physiognomy analysis: Face shape, Forehead, Eyes, Nose, Lips & Chin traits.', features: ['Face Shape Types', 'Forehead & Eye Analysis', 'Educational Guide'], status: 'active' },
  { id: 19, name: 'Gemstone Engine', category: 'remedies', description: 'Planet associations, traditional gemstone recommendations & substitute gems.', features: ['Navaratna Stones', 'Weight & Wearing Rules', 'Substitute Gems'], status: 'active' },
  { id: 20, name: 'Rudraksha Engine', category: 'remedies', description: '1 to 21 Mukhi Rudraksha beads, ruling planets, deities & traditional wearing guide.', features: ['1-21 Mukhi Beads', 'Deity & Planet Alignment', 'Authenticity Checks'], status: 'active' },
  { id: 21, name: 'Yantra Engine', category: 'remedies', description: 'Shri Yantra, Kuber Yantra, Navagraha & Maha Mrityunjaya sacred geometry.', features: ['Sacred Geometry Vector Maps', 'Consecration Guide', 'Meditation Focus'], status: 'active' },
  { id: 22, name: 'Mantra Engine', category: 'remedies', description: 'Vedic & Quranic mantras/adhkar with Arabic/Sanskrit text, audio & meanings.', features: ['Sanskrit & Arabic Script', 'Transliterations & Meanings', 'Recitation Audio'], status: 'active' },
  { id: 23, name: 'Learning Engine', category: 'learning', description: 'Planet, Nakshatra, House & Astrology encyclopedias, quizzes & articles.', features: ['Encyclopedias', 'Interactive Quizzes', 'Beginner to Advanced'], status: 'active' },
  { id: 24, name: 'AI Research Engine', category: 'learning', description: 'RAG Knowledge search across NASA data, Quran/Hadith, and ancient manuscripts.', features: ['Multi-Source RAG', 'Official Citation Links', 'NASA & Quran Integration'], status: 'active' },
  { id: 25, name: 'Report Engine', category: 'system', description: 'Professional PDF report generator with planet tables, charts & executive summaries.', features: ['PDF Exporting', 'Print-Ready Layouts', 'Custom Branding'], status: 'active' },
  { id: 26, name: 'Dashboard Engine', category: 'system', description: 'Consolidated master dashboard with 3D Solar Orrery, NASA Telemetry & Quick Actions.', features: ['3D Solar Orrery', 'NASA Live Feeds', 'Master Ephemeris Banner'], status: 'active' },
  { id: 27, name: 'Notification Engine', category: 'system', description: 'Transit alerts, festival notifications, lunar phase alerts & prayer reminders.', features: ['Real-Time Alerts', 'Festival Calendars', 'Lunar Reminders'], status: 'active' },
  { id: 28, name: 'Search Engine', category: 'system', description: 'Global instant search across Articles, Saved Charts, Planets, Nakshatras & Dreams.', features: ['Global Instant Search', 'Category Filtering', 'Keyboard Shortcuts'], status: 'active' },
  { id: 29, name: 'User Engine', category: 'system', description: 'User profiles, saved chart management, favorites, settings & InsForge cloud sync.', features: ['Profile Management', 'Saved Kundlis', 'InsForge Cloud Sync'], status: 'active' },
  { id: 30, name: 'Admin Engine', category: 'system', description: 'Platform analytics, user management, error logs & AI prompt management.', features: ['System Telemetry', 'AI Prompt Control', 'Error & Performance Audit'], status: 'active' }
];

export function getModuleById(id: number): PrdModule | undefined {
  return ASTRO360_PRD_MODULES.find(m => m.id === id);
}

export function getModulesByCategory(category: PrdModule['category']): PrdModule[] {
  return ASTRO360_PRD_MODULES.filter(m => m.category === category);
}
