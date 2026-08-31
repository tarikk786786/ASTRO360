import { LinkableAsset } from './types';

/**
 * ASTRO360 High-Value Linkable Assets Catalog
 * Answers: "WHY WOULD SOMEONE WANT TO LINK TO THIS?"
 */
export const ASTRO360_LINKABLE_ASSETS: LinkableAsset[] = [
  {
    id: 'asset-birth-chart',
    title: 'Free High-Precision Birth Chart (Kundli) & Planetary Positions',
    path: '/free-tools/birth-chart',
    type: 'CALCULATOR',
    whyLinkable: 'Sub-arcsecond Swiss Ephemeris calculation with dual Sidereal/Tropical zodiac support, North & South Indian visual charts, and instant ascendant breakdown without paywalls or required signups.',
    targetAudience: ['Astrology bloggers', 'Spiritual lifestyle portals', 'Wellness directories', 'Horoscope enthusiasts'],
    conversionValue: 'CRITICAL',
    recommendedPitch: 'A free, ad-free natal chart generator that readers can use directly to calculate their Lagna, Moon sign, and planetary degrees with sub-arcsecond astronomical precision.',
    suggestedProspectTypes: ['RESOURCE_PAGE', 'EDITORIAL', 'TOOL_LIST', 'ROUNDUP']
  },
  {
    id: 'asset-nakshatra',
    title: '27 Nakshatras & 108 Pada Deep Finder',
    path: '/free-tools/nakshatra',
    type: 'CALCULATOR',
    whyLinkable: 'Complete lunar mansion calculator that returns Pada divisions, ruling Vedic deities, Yoni, Gana, Nadi, and gemstone affinities backed by BPHS chapter citations.',
    targetAudience: ['Vedic astrology researchers', 'Yoga and Ayurveda teachers', 'Vedic culture publications'],
    conversionValue: 'VERY_HIGH',
    recommendedPitch: 'An authoritative 27 Nakshatra directory with exact Pada calculations and classical Sanskrit scripture citations.',
    suggestedProspectTypes: ['RESOURCE_PAGE', 'EDUCATION', 'EDITORIAL', 'RESEARCH']
  },
  {
    id: 'asset-panchanga',
    title: 'Daily 5-Limb Vedic Panchanga & Ingress Calendar',
    path: '/panchanga',
    type: 'CALENDAR_TOOL',
    whyLinkable: 'Real-time calculation of Tithi, Vara, Nakshatra, Yoga, Karana, Abhijit Muhurta, and Rahu Kalam calibrated precisely to any global geographic coordinate.',
    targetAudience: ['Hindu community portals', 'Cultural event organizers', 'Vedic calendar publishers'],
    conversionValue: 'VERY_HIGH',
    recommendedPitch: 'A high-accuracy global Panchanga tool that updates daily with precise sunrise/sunset and Rahu Kalam timings for any city worldwide.',
    suggestedProspectTypes: ['RESOURCE_PAGE', 'COMMUNITY', 'LOCAL', 'DIRECTORY']
  },
  {
    id: 'asset-compatibility',
    title: '36-Guna Ashta Koota Kundli Matching Engine',
    path: '/free-tools/compatibility',
    type: 'CALCULATOR',
    whyLinkable: 'Transparent mathematical breakdown across all 8 classical Kootas (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi) with dosha exception rules.',
    targetAudience: ['Wedding directories', 'Relationship blogs', 'Cultural marriage publications'],
    conversionValue: 'HIGH',
    recommendedPitch: 'A transparent 36-Guna matching tool that explains the mathematical reasoning and classical dosha cancellations behind compatibility scores.',
    suggestedProspectTypes: ['TOOL_LIST', 'ROUNDUP', 'EDITORIAL', 'RESOURCE_PAGE']
  },
  {
    id: 'asset-dasha-timeline',
    title: '120-Year Vimshottari Dasha Interactive Timeline',
    path: '/dasha',
    type: 'INTERACTIVE_CHART',
    whyLinkable: 'Full visual roadmap of Mahadasha, Antardasha, and Pratyantardasha lifecycles with planetary periods rendered in a responsive, interactive SVG timeline.',
    targetAudience: ['Vedic astrology students', 'Spiritual counseling practitioners', 'Astrology forums'],
    conversionValue: 'VERY_HIGH',
    recommendedPitch: 'An interactive 120-year Vimshottari timeline that lets readers explore planetary sub-periods visually with astronomical exactness.',
    suggestedProspectTypes: ['EDUCATION', 'RESOURCE_PAGE', 'RESEARCH', 'COMMUNITY']
  },
  {
    id: 'asset-scripture-library',
    title: 'Classical Sanskrit Astrology Scripture & Sloka Index',
    path: '/learn/vedic-astrology',
    type: 'CLASSICAL_LIBRARY',
    whyLinkable: 'Searchable library of verified Sanskrit verses with English translations from Brihat Parashara Hora Shastra, Phaladeepika, Saravali, and Surya Siddhanta.',
    targetAudience: ['Academic researchers', 'Indology departments', 'Vedic philosophy scholars'],
    conversionValue: 'HIGH',
    recommendedPitch: 'An open educational reference library citing classical astrological scriptures with verifiable chapter and verse citations.',
    suggestedProspectTypes: ['EDUCATION', 'RESEARCH', 'DATA_CITATION', 'INDUSTRY_PUBLICATION']
  },
  {
    id: 'asset-transit-radar',
    title: 'Real-Time Planetary Transit Ingress Radar',
    path: '/transit-radar',
    type: 'INTERACTIVE_CHART',
    whyLinkable: 'Live astronomical radar tracking planetary speed, retrograde motions, and upcoming sign ingresses for Saturn, Jupiter, Rahu, and Ketu.',
    targetAudience: ['Science & astronomy writers', 'Astrological forecasters', 'Podcast creators'],
    conversionValue: 'HIGH',
    recommendedPitch: 'A real-time planetary ingress radar visualizing celestial orbital positions and retrograde status across the 360° ecliptic.',
    suggestedProspectTypes: ['DIGITAL_PR', 'EDITORIAL', 'PODCAST', 'TOOL_LIST']
  }
];

export function getLinkableAssetByPath(path: string): LinkableAsset | undefined {
  return ASTRO360_LINKABLE_ASSETS.find(a => a.path === path || path.includes(a.path));
}

export function recommendBestAssetForTopic(topic: string): LinkableAsset {
  const norm = topic.toLowerCase();
  if (norm.includes('nakshatra') || norm.includes('pada') || norm.includes('lunar mansion')) {
    return ASTRO360_LINKABLE_ASSETS[1];
  }
  if (norm.includes('panchang') || norm.includes('tithi') || norm.includes('calendar') || norm.includes('muhurta')) {
    return ASTRO360_LINKABLE_ASSETS[2];
  }
  if (norm.includes('compat') || norm.includes('match') || norm.includes('marriage') || norm.includes('love') || norm.includes('guna')) {
    return ASTRO360_LINKABLE_ASSETS[3];
  }
  if (norm.includes('dasha') || norm.includes('period') || norm.includes('timing') || norm.includes('transit')) {
    return ASTRO360_LINKABLE_ASSETS[4];
  }
  if (norm.includes('scripture') || norm.includes('research') || norm.includes('history') || norm.includes('vedic')) {
    return ASTRO360_LINKABLE_ASSETS[5];
  }
  return ASTRO360_LINKABLE_ASSETS[0]; // Default Birth Chart
}
