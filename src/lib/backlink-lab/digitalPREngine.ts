import { DigitalPRStory } from './types';

export const ASTRO360_DIGITAL_PR_STORIES: DigitalPRStory[] = [
  {
    id: 'pr-eclipse-2026',
    storyAngle: 'The Astronomy & Astrology of Upcoming Solar & Lunar Eclipses: Planetary Alignments & Historical Trends',
    supportingAstroAsset: 'Ephemeris Radar & Eclipse Ingress Visualizer',
    targetAstroUrl: '/transit-radar',
    targetPublications: ['Science & Tech News', 'Space & Astronomy Outlets', 'Lifestyle & Spiritual Media'],
    relevanceReason: 'Major celestial events drive massive public interest, news coverage, and search volume surges every eclipse cycle.',
    seasonalHook: 'Seasonal Eclipse Cycle & Equinox Alignments',
    statisticalDataPoint: '360° sidereal degree tracking with precise timing down to milliseconds for global coordinates.',
    samplePitchHook: 'With the upcoming eclipse approaching, our team analyzed celestial coordinate deviations and historical transit records to create a free, interactive visualization.'
  },
  {
    id: 'pr-saturn-transit',
    storyAngle: 'Major Saturn (Shani) & Jupiter Ingresses: Why Search Volume for Sade Sati & Karmic Cycles Hits 5-Year Peaks',
    supportingAstroAsset: '120-Year Vimshottari Timeline & Sade Sati Engine',
    targetAstroUrl: '/dasha',
    targetPublications: ['Culture & Society Magazines', 'Digital Trends Publications', 'Spiritual Philosophy Journals'],
    relevanceReason: 'Saturn and Jupiter sign shifts mark major multi-year astrological turning points with broad demographic interest.',
    seasonalHook: 'Planetary Ingress & Retrograde Season',
    statisticalDataPoint: 'Analysis of 120-year cycle transitions across 16 classical Parashari divisional harmonic charts.',
    samplePitchHook: 'As Saturn initiates its major orbital ingress, our open data engine mapped search momentum and classical astrological interpretations.'
  },
  {
    id: 'pr-compatibility-data',
    storyAngle: 'The Mathematics of Relationship Astrology: Analyzing 36-Guna Compatibility Across 8 Classical Dimensions',
    supportingAstroAsset: 'Ashta Koota 36-Guna Kundli Matchmaker',
    targetAstroUrl: '/free-tools/compatibility',
    targetPublications: ['Relationship & Dating Blogs', 'Wedding Media', 'Psychology & Wellness Portals'],
    relevanceReason: 'Valentine’s season, wedding planning cycles, and relationship dynamics generate consistent editorial demand for mathematical compatibility breakdowns.',
    seasonalHook: 'Wedding Season & Relationship Feature Trends',
    statisticalDataPoint: '36-point algorithmic distribution across Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi.',
    samplePitchHook: 'We decoded the ancient mathematical algorithms behind 36-Guna matchmaking to create a transparent, educational tool for modern couples.'
  }
];

export function getDigitalPRStories(): DigitalPRStory[] {
  return ASTRO360_DIGITAL_PR_STORIES;
}
