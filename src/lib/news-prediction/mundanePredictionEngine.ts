/**
 * ASTRO360 Mundane World Prediction Engine
 * 
 * Synthesizes planetary ingress ephemeris calculations with real-world news trends
 * to generate rigorous, classical-backed mundane astrological forecasts.
 */

import { MundaneForecast, MacroNewsItem, PlanetaryRuler } from './types';

export const MUNDANE_FORECASTS_CATALOG: MundaneForecast[] = [
  {
    id: 'mundane-fin-1',
    domain: 'FINANCIAL_MARKETS',
    title: 'Global Precious Metals & Energy Commodity Cycle (2025–2027)',
    timeWindow: 'Q3 2025 – Q2 2027 (Peak: April 2026)',
    primaryDrivers: ['Jupiter', 'Sun', 'Mars', 'Uranus'],
    activeAspects: ['Jupiter trine Pluto', 'Uranus in Taurus final degrees', 'Mars-Saturn conjunction'],
    macroTrend: 'Structural commodity re-pricing: Gold and silver outperform fiat instruments while renewable grid infrastructure and nuclear fuels experience high institutional capital inflows.',
    sentiment: 'VERY_BULLISH',
    confidenceScore: 88,
    classicalSource: 'Brihat Samhita (Ch. 41: Dravya Pariksha — Commodity Rulers & Price Fluctuations)',
    realWorldEvidence: 'Central bank gold net purchases hit all-time highs; strategic uranium reserve stockpiling increases across G20 nations.',
    historicalPrecedents: [
      {
        year: 1994,
        planetarySetup: 'Jupiter in Scorpio with Uranus in Capricorn',
        historicalEvent: 'Massive surge in international commodity pacts and sovereign debt modernization.'
      },
      {
        year: 1973,
        planetarySetup: 'Jupiter-Uranus hard aspect with Saturn in Gemini',
        historicalEvent: 'Global monetary realignment following gold window closure and commodity repricing.'
      }
    ],
    actionableInsights: [
      'Maintain strategic allocations in physical precious metals and defensive tangible assets.',
      'Anticipate heightened commodity price volatility during Mars solar ingresses.',
      'Look for sovereign wealth reallocations toward energy grid resilience.'
    ]
  },
  {
    id: 'mundane-geo-1',
    domain: 'GEOPOLITICS',
    title: 'Multipolar Treaty Reshuffling & Maritime Transit Security',
    timeWindow: 'Late 2025 – Late 2026',
    primaryDrivers: ['Mars', 'Saturn', 'Rahu', 'Jupiter'],
    activeAspects: ['Saturn in Pisces closing degrees', 'Rahu in Pisces/Aquarius shift', 'Jupiter sextile Saturn'],
    macroTrend: 'Establishment of regional maritime security alliances and bilateral currency settlement channels, reducing single-corridor dependency.',
    sentiment: 'NEUTRAL',
    confidenceScore: 84,
    classicalSource: 'Bhavishya Phalam & Tetrabiblos (Book II: National Boundaries & Sovereign Conflicts)',
    realWorldEvidence: 'Expansion of alternative international trade corridors and joint naval defense patrols across critical maritime straits.',
    historicalPrecedents: [
      {
        year: 1996,
        planetarySetup: 'Saturn in Pisces with Mars in Aries',
        historicalEvent: 'Major maritime treaty agreements and regional peacekeeping task force deployments.'
      }
    ],
    actionableInsights: [
      'Supply chain operators should maintain dual-routing redundancy for ocean freight.',
      'Organizations with international exposure should hedge foreign exchange volatility across emerging trade corridors.'
    ]
  },
  {
    id: 'mundane-tech-1',
    domain: 'TECHNOLOGY_AI',
    title: 'Autonomous Synthetic Intelligence & Quantum Cryptography Leap',
    timeWindow: '2025 – 2028',
    primaryDrivers: ['Rahu', 'Mercury', 'Uranus', 'Pluto'],
    activeAspects: ['Pluto in Aquarius entry', 'Uranus sextile Neptune', 'Rahu intellectual dasha currents'],
    macroTrend: 'Transition from text-based AI models to physical world embodiment (robotics, autonomous industrial agents, quantum chemical simulation).',
    sentiment: 'VERY_BULLISH',
    confidenceScore: 92,
    classicalSource: 'Yavana Jataka & Brihat Parashara (Rahu-Budha Sambandha in 5th/11th Bhavas)',
    realWorldEvidence: 'Hyperscalers deploying gigawatt data center clusters; breakthrough room-temperature quantum coherence trials.',
    historicalPrecedents: [
      {
        year: 1845,
        planetarySetup: 'Pluto in Aries with Uranus-Neptune alignment',
        historicalEvent: 'Telegraph global network expansion and industrial computing revolution origins.'
      }
    ],
    actionableInsights: [
      'Prioritize early adoption of autonomous workflow agents and verifiable cryptographic security.',
      'Prepare for rapid legislative standardizations around synthetic data governance.'
    ]
  },
  {
    id: 'mundane-climate-1',
    domain: 'CLIMATE_EARTH',
    title: 'Solar Maximum Geomagnetic Waves & Geophysical Activity Windows',
    timeWindow: '2025 – 2026 Solar Maximum Peak',
    primaryDrivers: ['Sun', 'Moon', 'Ketu'],
    activeAspects: ['Solar Cycle 25 Maximum', 'Total Solar Eclipse Syzygies', 'Lunar Nodal Perigee alignments'],
    macroTrend: 'High coronal mass ejection frequencies triggering localized telecommunication/power grid anomalies and heightened atmospheric auroral activity.',
    sentiment: 'CRISIS_ALERT',
    confidenceScore: 86,
    classicalSource: 'Brihat Samhita (Ch. 3: Surya Chara & Ch. 32: Bhukampa Lakshana — Earthquakes & Solar Omens)',
    realWorldEvidence: 'NOAA SWPC records consecutive G4/G5 geomagnetic storm events with visible auroras at lower latitudes.',
    historicalPrecedents: [
      {
        year: 2003,
        planetarySetup: 'Solar Maximum with Mars perigee close approach',
        historicalEvent: 'The Halloween Solar Storms of 2003 causing satellite tracking delays and grid disruptions.'
      }
    ],
    actionableInsights: [
      'Telecommunications and data centers should verify redundant satellite failovers.',
      'Utilize periods of elevated solar energy for intense creative production while maintaining biological grounding.'
    ]
  }
];

/**
 * Dynamically synthesizes live news items into active mundane forecasts.
 */
export function generateDynamicMundaneForecasts(newsItems: MacroNewsItem[]): MundaneForecast[] {
  // Combine static classical catalog with dynamic real-time news synthesis
  return MUNDANE_FORECASTS_CATALOG.map(forecast => {
    const relevantNews = newsItems.filter(n => 
      forecast.primaryDrivers.includes(n.primaryPlanet) || 
      (n.secondaryPlanet && forecast.primaryDrivers.includes(n.secondaryPlanet))
    );

    if (relevantNews.length > 0) {
      const latestNews = relevantNews[0];
      return {
        ...forecast,
        realWorldEvidence: `${latestNews.title} (${latestNews.source}, ${latestNews.publishedAt.slice(0, 10)}) — confirms ongoing ${forecast.primaryDrivers.join('-')} celestial trajectory.`
      };
    }

    return forecast;
  });
}
