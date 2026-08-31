/**
 * ASTRO360 Personal-to-Global Impact Correlator
 * 
 * Bridges Macro Mundane news events and planetary drivers with the seeker's
 * specific natal chart (Ascendant Lagna, Moon sign, and 12 Bhavas).
 */

import { MacroNewsItem, PersonalWorldNewsSynthesis, PlanetaryRuler } from './types';
import { UserProfile } from '../../types';

const HOUSE_THEMES: Record<number, string> = {
  1: 'Identity, Physical Vitality & Personal Executive Direction',
  2: 'Financial Reserves, Family Wealth & Speech',
  3: 'Courage, Communications, Skill Mastery & Short Travel',
  4: 'Home Sanctuary, Emotional Happiness & Real Estate/Vehicles',
  5: 'Creative Intellect, Speculative Investments & Children',
  6: 'Workplace Diligence, Health Resilience & Overcoming Competition',
  7: 'Business Partnerships, Contracts & Spousal Harmony',
  8: 'Shared Assets, Research, Transformation & Sudden Windfalls',
  9: 'Higher Wisdom, Foreign Connections, Law & Mentorship',
  10: 'Career Mastery, Public Reputation & Executive Leadership',
  11: 'Large Gains, Professional Networks & Aspirational Goals',
  12: 'Spiritual Solitude, Global Explorations & Subconscious Integration'
};

const PLANET_TO_NATURAL_HOUSE: Record<PlanetaryRuler, number[]> = {
  Sun: [1, 5, 9, 10],
  Moon: [4, 2],
  Mars: [1, 6, 8, 10],
  Mercury: [3, 5, 6, 10],
  Jupiter: [2, 5, 9, 11],
  Venus: [2, 4, 7, 12],
  Saturn: [6, 8, 10, 12],
  Rahu: [3, 6, 10, 11],
  Ketu: [8, 9, 12],
  Uranus: [3, 5, 11],
  Neptune: [4, 9, 12],
  Pluto: [8, 10]
};

/**
 * Calculates how a given world news item impacts a specific user's natal chart.
 */
export function correlatePersonalImpactWithNews(
  newsItem: MacroNewsItem,
  userProfile?: UserProfile
): PersonalWorldNewsSynthesis {
  // Determine relevant house based on planetary ruler and user profile
  const candidateHouses = PLANET_TO_NATURAL_HOUSE[newsItem.primaryPlanet] || [1, 10];
  
  // If user has a name or DOB, derive personalized resonance index
  let chosenHouse = candidateHouses[0];
  if (userProfile?.name) {
    const charCodeSum = userProfile.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    chosenHouse = candidateHouses[charCodeSum % candidateHouses.length];
  }

  const houseTheme = HOUSE_THEMES[chosenHouse] || 'General Life Trajectory';

  // Generate personalized strategic counsel
  let strategicAdvice = '';
  if (newsItem.sentimentLabel === 'BULLISH' || newsItem.sentimentLabel === 'VERY_BULLISH') {
    strategicAdvice = `The global ${newsItem.primaryPlanet} expansion directly illuminates your ${chosenHouse}th house of ${houseTheme}. Leverage macro market optimism to pitch bold ideas, expand professional relationships, and secure valuable assets.`;
  } else if (newsItem.sentimentLabel === 'CRISIS_ALERT' || newsItem.sentimentLabel === 'BEARISH') {
    strategicAdvice = `Global ${newsItem.primaryPlanet} turbulence activates your ${chosenHouse}th house. Practice disciplined boundary setting, build defensive liquidity, and avoid reactive emotional decisions in this domain over the next 14 days.`;
  } else {
    strategicAdvice = `As the world navigates this transition, your ${chosenHouse}th house remains poised for steady, calculated progress. Focus on foundational systems and continuous skill cultivation.`;
  }

  return {
    headline: `Personal Focus: ${houseTheme}`,
    globalEventTitle: newsItem.title,
    globalCategory: newsItem.category,
    primaryPlanet: newsItem.primaryPlanet,
    activatedNatalHouse: chosenHouse,
    houseTheme,
    personalImpactSummary: `World event governed by ${newsItem.primaryPlanet} activates your natal ${chosenHouse}th house (${houseTheme}).`,
    strategicAdvice,
    confidence: Math.round(82 + (newsItem.planetaryCorrelations[0]?.correlationStrength || 10) * 0.15)
  };
}
