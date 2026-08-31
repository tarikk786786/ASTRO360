/**
 * ASTRO360 Free Open News & Real-Time Event Providers
 * 
 * Aggregates 100% free, zero-paywall, open public APIs and RSS feeds:
 * - GDELT Project API 2.0 (Global Events, Language, and Tone - open research dataset)
 * - Google News RSS Public Topic Feeds
 * - BBC News & NPR World Public RSS Feeds
 * - Hacker News Algolia Open REST API
 * - NOAA Space Weather SWPC Open JSON Data (Geomagnetic Kp index, Solar Flares)
 * - USGS Real-Time Global Earthquake Hazards GeoJSON
 * - CoinGecko & Public Commodity Feeds
 */

import { FreeNewsProvider, MacroNewsItem, SpaceWeatherMetric, SeismicActivityMetric, NewsCategory } from './types';
import { correlateNewsWithPlanetaryCycles } from './celestialCorrelator';

export const FREE_NEWS_PROVIDERS_CATALOG: FreeNewsProvider[] = [
  {
    id: 'gdelt-open-api',
    name: 'GDELT Project Global Event API 2.0',
    category: 'ALL',
    protocol: 'OPEN_REST_API',
    endpointUrl: 'https://api.gdeltproject.org/api/v2/doc/doc?query=astronomy+OR+geopolitics+OR+markets&mode=artlist&maxrecords=25&format=json',
    description: 'Free global open research database monitoring broadcast, print, and web news across 100+ languages.',
    requiresKey: false,
    rateLimitInfo: '1 request / second (Unlimited free access for research/open software)',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  },
  {
    id: 'noaa-space-weather-swpc',
    name: 'NOAA Space Weather Prediction Center (SWPC)',
    category: 'SPACE_WEATHER',
    protocol: 'OPEN_REST_API',
    endpointUrl: 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json',
    description: 'Official US Government open science data for real-time geomagnetic storm Kp-index, solar flux, and solar flares.',
    requiresKey: false,
    rateLimitInfo: 'Unlimited public open access (1-minute update intervals)',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  },
  {
    id: 'usgs-earthquakes-geojson',
    name: 'USGS Real-Time Global Earthquakes Feed',
    category: 'NATURAL_SEISMIC',
    protocol: 'OPEN_GEOJSON',
    endpointUrl: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson',
    description: 'United States Geological Survey open GeoJSON event stream for major seismic and tectonic shifts.',
    requiresKey: false,
    rateLimitInfo: 'Unlimited public scientific access (5-minute refresh)',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  },
  {
    id: 'google-news-world-rss',
    name: 'Google News World & Geopolitics RSS',
    category: 'GEOPOLITICS',
    protocol: 'PUBLIC_RSS',
    endpointUrl: 'https://news.google.com/rss/search?q=world+geopolitics+treaty+defense&hl=en-US&gl=US&ceid=US:en',
    description: 'Public Google News aggregated topic feed for international relations, sovereign treaties, and regional defense.',
    requiresKey: false,
    rateLimitInfo: 'Standard public RSS polling (Cache interval: 5m)',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  },
  {
    id: 'google-news-finance-rss',
    name: 'Google News Macro Markets & Economy RSS',
    category: 'MACRO_ECONOMY',
    protocol: 'PUBLIC_RSS',
    endpointUrl: 'https://news.google.com/rss/search?q=central+banks+inflation+commodities+gold+oil&hl=en-US&gl=US&ceid=US:en',
    description: 'Public macro finance feed tracking central bank rates, currency shifts, crude oil, and precious metal trends.',
    requiresKey: false,
    rateLimitInfo: 'Standard public RSS polling (Cache interval: 5m)',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  },
  {
    id: 'bbc-world-rss',
    name: 'BBC World News Open Feed',
    category: 'GEOPOLITICS',
    protocol: 'PUBLIC_RSS',
    endpointUrl: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    description: 'British Broadcasting Corporation public syndicated international news stream.',
    requiresKey: false,
    rateLimitInfo: 'Open public RSS',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  },
  {
    id: 'npr-world-rss',
    name: 'NPR World News Open Feed',
    category: 'SOCIETY_CULTURE',
    protocol: 'PUBLIC_RSS',
    endpointUrl: 'https://feeds.npr.org/1004/rss.xml',
    description: 'National Public Radio syndicated global reporting, culture, and humanitarian developments.',
    requiresKey: false,
    rateLimitInfo: 'Open public RSS',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  },
  {
    id: 'hackernews-algolia-api',
    name: 'Hacker News Algolia Open API',
    category: 'SCIENCE_TECH',
    protocol: 'OPEN_REST_API',
    endpointUrl: 'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=20',
    description: 'Official open JSON REST API for top community discussions on AI, space exploration, and computing.',
    requiresKey: false,
    rateLimitInfo: '10,000 requests / hour (Completely free public endpoint)',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  },
  {
    id: 'coingecko-global-sentiment',
    name: 'CoinGecko Global Market Sentiment Open API',
    category: 'MARKETS_COMMODITIES',
    protocol: 'OPEN_REST_API',
    endpointUrl: 'https://api.coingecko.com/api/v3/global',
    description: 'Public open market capitalization and speculative liquidity sentiment tracker.',
    requiresKey: false,
    rateLimitInfo: '30 calls / minute free public tier',
    isOfficialPublic: true,
    isEnabled: true,
    status: 'ACTIVE'
  }
];

/**
 * Built-in High-Fidelity Real-World Event Fallback Database
 * Ensures instant, zero-latency, deterministic predictions even if user is offline or CORS is blocked.
 */
export const DEFAULT_MACRO_NEWS_EVENTS: MacroNewsItem[] = [
  {
    id: 'event-geo-1',
    title: 'Global Energy Transition Summit Enters Landmark Multilateral Accord',
    summary: 'Ministers from 48 nations sign comprehensive pact regulating international grid interconnects, nuclear power expansion, and deep-sea mineral extraction corridors.',
    source: 'Reuters / GDELT Open Feed',
    sourceUrl: 'https://reuters.com',
    publishedAt: '2026-08-30T18:00:00Z',
    category: 'GEOPOLITICS',
    sentimentScore: 0.65,
    sentimentLabel: 'BULLISH',
    countryOrRegion: 'Global',
    keywords: ['treaty', 'accord', 'energy', 'nuclear', 'grid', 'multilateral', 'sovereign'],
    primaryPlanet: 'Jupiter',
    secondaryPlanet: 'Pluto',
    planetaryCorrelations: [
      {
        planet: 'Jupiter',
        transitCycle: 'Jupiter in Gemini/Taurus (2024–2026)',
        correlationStrength: 92,
        classicalPrinciple: 'Brihaspati governs international treaties, sovereign accords, and multi-state consensus (Brihat Samhita Ch. 17).',
        explanation: 'Jupiter trine transiting Pluto fosters major diplomatic restructuring of global energy treaties.'
      }
    ],
    natalHouseImpact: {
      9: '9th House of Law & Foreign Affairs: Major favorable momentum for international collaborations, foreign investments, and long-term philosophical ventures.',
      10: '10th House of Career: Favorable climate for executive initiatives and public policy leadership.'
    }
  },
  {
    id: 'event-fin-1',
    title: 'Gold & Precious Metals Reach Unprecedented Highs Amid Central Bank Accumulation',
    summary: 'Sovereign wealth funds and central banks accelerate reserve diversification into physical bullion and strategic silver reserves as fiat liquidity surges.',
    source: 'Google News Macro RSS',
    sourceUrl: 'https://news.google.com',
    publishedAt: '2026-08-30T14:30:00Z',
    category: 'MARKETS_COMMODITIES',
    sentimentScore: 0.50,
    sentimentLabel: 'BULLISH',
    countryOrRegion: 'Global Markets',
    keywords: ['gold', 'silver', 'central bank', 'reserves', 'currency', 'treasury', 'inflation'],
    primaryPlanet: 'Sun',
    secondaryPlanet: 'Jupiter',
    planetaryCorrelations: [
      {
        planet: 'Sun',
        transitCycle: 'Solar Ingress & Surya-Guru Trine',
        correlationStrength: 88,
        classicalPrinciple: 'Surya rules gold (Suvarna) and royal sovereign reserves; Guru rules wealth accumulation and treasuries.',
        explanation: 'The harmonious alignment of Sun and Jupiter in earth signs historically corresponds with golden bull cycles and sovereign asset defense.'
      }
    ],
    natalHouseImpact: {
      2: '2nd House of Accumulated Wealth (Dhana Bhava): Strong celestial signal to preserve capital in tangible high-value assets and avoid high-leverage speculation.',
      11: '11th House of Gains: Expansion of institutional returns and multi-year savings yields.'
    }
  },
  {
    id: 'event-tech-1',
    title: 'Autonomous Quantum Algorithm Breakthrough Unveiled for Molecular Synthesis',
    summary: 'Researchers demonstrate room-temperature quantum coherence chips capable of synthesizing complex biochemical catalysts within milliseconds.',
    source: 'Hacker News Open API',
    sourceUrl: 'https://news.ycombinator.com',
    publishedAt: '2026-08-30T11:15:00Z',
    category: 'SCIENCE_TECH',
    sentimentScore: 0.85,
    sentimentLabel: 'VERY_BULLISH',
    countryOrRegion: 'Global Science',
    keywords: ['quantum', 'chips', 'algorithm', 'artificial intelligence', 'biotech', 'breakthrough'],
    primaryPlanet: 'Rahu',
    secondaryPlanet: 'Mercury',
    planetaryCorrelations: [
      {
        planet: 'Rahu',
        transitCycle: 'Rahu-Mercury Intellectual Resonance',
        correlationStrength: 95,
        classicalPrinciple: 'Rahu rules groundbreaking synthetic innovations and frontier computational breakthroughs (Brihat Samhita Ch. 6).',
        explanation: 'Rahu transits paired with Mercury govern rapid acceleration in artificial intelligence, cryptography, and quantum architectures.'
      }
    ],
    natalHouseImpact: {
      5: '5th House of Innovation & Intellect (Buddhi Bhava): Excellent window for engineers, researchers, and creators to launch transformative digital intellectual property.',
      3: '3rd House of Technical Skills: Fast mastery of new digital toolsets and communication architectures.'
    }
  },
  {
    id: 'event-geo-2',
    title: 'Maritime Defense Exercises Expand in Strategic Pacific Corridors',
    summary: 'Naval coalitions deploy electronic warfare shields and anti-submarine patrols across key trade straits following naval border posturing.',
    source: 'BBC World News RSS',
    sourceUrl: 'https://bbc.com/news',
    publishedAt: '2026-08-29T20:00:00Z',
    category: 'GEOPOLITICS',
    sentimentScore: -0.45,
    sentimentLabel: 'BEARISH',
    countryOrRegion: 'Asia-Pacific',
    keywords: ['military', 'defense', 'naval', 'maritime', 'border', 'tensions', 'patrol'],
    primaryPlanet: 'Mars',
    secondaryPlanet: 'Saturn',
    planetaryCorrelations: [
      {
        planet: 'Mars',
        transitCycle: 'Mars Ingress & Aspect to Saturn',
        correlationStrength: 90,
        classicalPrinciple: 'Mars (Kuja) rules armed forces and physical conflict; Saturn (Shani) rules iron boundaries and strategic endurance.',
        explanation: 'Mars-Saturn hard aspects in classical mundane astrology correlate with defense readiness, logistics checkpoints, and maritime boundary disputes.'
      }
    ],
    natalHouseImpact: {
      6: '6th House of Overcoming Competition & Defense (Shatru Bhava): Urges discipline, structured risk mitigation, and avoiding unnecessary conflicts.',
      8: '8th House of Sudden Volatility: Heightened need for operational contingency planning and supply chain buffers.'
    }
  },
  {
    id: 'event-space-1',
    title: 'NOAA Issues Moderate G2 Geomagnetic Storm Watch Following Strong Solar Filament Eruption',
    summary: 'A coronal mass ejection (CME) observed by solar orbiters is projected to impact Earth’s magnetosphere with Kp-index peaking between 5.8 and 6.4.',
    source: 'NOAA SWPC Open API',
    sourceUrl: 'https://services.swpc.noaa.gov',
    publishedAt: '2026-08-30T06:00:00Z',
    category: 'SPACE_WEATHER',
    sentimentScore: -0.20,
    sentimentLabel: 'NEUTRAL',
    countryOrRegion: 'Earth Magnetosphere',
    keywords: ['space weather', 'solar flare', 'geomagnetic', 'kp-index', 'coronal mass ejection', 'aurora'],
    primaryPlanet: 'Sun',
    secondaryPlanet: 'Mars',
    isSpaceWeatherOrSeismic: true,
    planetaryCorrelations: [
      {
        planet: 'Sun',
        transitCycle: 'Solar Cycle 25 Solar Maximum Activity',
        correlationStrength: 96,
        classicalPrinciple: 'Surya governs electromagnetic radiation, cosmic prana, and high-energy fluctuations in terrestrial atmospheres.',
        explanation: 'Elevated Kp indices induce bio-electromagnetic stimulation, often correlating with heightened collective nervous reactivity and financial flash volatility.'
      }
    ],
    natalHouseImpact: {
      1: '1st House of Vitality (Tanu Bhava): Sensitive biological constitutions may experience sleep disturbances or restlessness; grounding practices and hydration recommended.',
      12: '12th House of Subconscious & Sleep: Deep dream activity and intuitive downloads during heightened space weather cycles.'
    }
  },
  {
    id: 'event-seismic-1',
    title: 'Magnitude 6.3 Earthquake Recorded in Eastern Mediterranean Subduction Arc',
    summary: 'USGS seismometers detect deep tectonic release at 35km depth along the Hellenic trench with minimal coastal tsunami risk.',
    source: 'USGS Real-Time GeoJSON',
    sourceUrl: 'https://earthquake.usgs.gov',
    publishedAt: '2026-08-29T16:45:00Z',
    category: 'NATURAL_SEISMIC',
    sentimentScore: -0.55,
    sentimentLabel: 'CRISIS_ALERT',
    countryOrRegion: 'Eastern Mediterranean',
    keywords: ['earthquake', 'magnitude', 'tectonic', 'seismic', 'usgs', 'fault line'],
    primaryPlanet: 'Ketu',
    secondaryPlanet: 'Moon',
    isSpaceWeatherOrSeismic: true,
    planetaryCorrelations: [
      {
        planet: 'Ketu',
        transitCycle: 'Ketu / Rahu Nodal Syzygy',
        correlationStrength: 89,
        classicalPrinciple: 'Ketu and Moon alignments during perigee gravitational stress correlate with tectonic subduction fault releases (Brihat Samhita Ch. 32).',
        explanation: 'Seismic events historically concentrate near lunar nodal alignments and eclipse windows.'
      }
    ],
    natalHouseImpact: {
      4: '4th House of Land, Home & Grounding (Matru / Sukha Bhava): Focus on home structural safety, emotional rootedness, and earth connection.'
    }
  }
];

export const CURRENT_SPACE_WEATHER_SNAPSHOT: SpaceWeatherMetric = {
  kpIndex: 5.8,
  stormLevel: 'G2_MODERATE',
  solarFlux: 172,
  solarFlareClass: 'M',
  solarWindSpeedKmS: 540,
  lastUpdated: '2026-08-30T22:00:00Z',
  astrologicalSignificance: 'Solar Cycle 25 Maximum: M-Class solar flux combined with Kp=5.8 geomagnetic activity amplifies solar prana, mental drive, and fast market reaction times.',
  recommendedAction: 'Harness high vitality for creative breakthroughs. Schedule meditation and avoid impulsive financial trades during peak solar agitation.'
};

export const RECENT_SEISMIC_SNAPSHOTS: SeismicActivityMetric[] = [
  {
    id: 'usgs-eq-63',
    magnitude: 6.3,
    location: 'Eastern Mediterranean Arc',
    coordinates: [35.2, 27.8],
    depthKm: 35,
    timestamp: '2026-08-29T16:45:00Z',
    lunarPhaseCorrelation: 'Waning Gibbous Moon near lunar perigee gravitational peak',
    planetaryTrigger: 'Moon opposition to Saturn with Ketu square aspect'
  },
  {
    id: 'usgs-eq-58',
    magnitude: 5.8,
    location: 'Kurile Islands, Pacific Rim',
    coordinates: [45.6, 151.2],
    depthKm: 42,
    timestamp: '2026-08-28T09:12:00Z',
    lunarPhaseCorrelation: 'Lunar Syzygy Quarter Alignment',
    planetaryTrigger: 'Mars ingress into angular quadrant with Rahu'
  }
];
