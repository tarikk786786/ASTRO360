/**
 * ASTRO360 Cosmic News & Mundane Prediction Intelligence Types
 * 
 * Defines schemas for real-time news integration, free open API providers,
 * space weather metrics, planetary correlation models, and personal chart impact synthesis.
 */

export type NewsCategory = 
  | 'GEOPOLITICS'
  | 'MACRO_ECONOMY'
  | 'MARKETS_COMMODITIES'
  | 'SCIENCE_TECH'
  | 'NATURAL_SEISMIC'
  | 'SPACE_WEATHER'
  | 'SOCIETY_CULTURE';

export type SentimentDirection = 'VERY_BULLISH' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'CRISIS_ALERT';

export type PlanetaryRuler = 
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Mercury'
  | 'Jupiter'
  | 'Venus'
  | 'Saturn'
  | 'Rahu'
  | 'Ketu'
  | 'Uranus'
  | 'Neptune'
  | 'Pluto';

export interface PlanetaryCorrelation {
  planet: PlanetaryRuler;
  sign?: string;
  houseInfluence?: number; // 1-12
  aspect?: string;
  transitCycle: string;
  correlationStrength: number; // 0-100%
  classicalPrinciple: string;
  explanation: string;
}

export interface MacroNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: NewsCategory;
  sentimentScore: number; // -1.0 (extreme crisis) to +1.0 (extreme boom)
  sentimentLabel: SentimentDirection;
  countryOrRegion?: string;
  keywords: string[];
  primaryPlanet: PlanetaryRuler;
  secondaryPlanet?: PlanetaryRuler;
  planetaryCorrelations: PlanetaryCorrelation[];
  natalHouseImpact?: Record<number, string>; // 1-12 house relevance
  isSpaceWeatherOrSeismic?: boolean;
}

export interface SpaceWeatherMetric {
  kpIndex: number; // 0-9 geomagnetic storm index (NOAA SWPC)
  stormLevel: 'G0_QUIET' | 'G1_MINOR' | 'G2_MODERATE' | 'G3_STRONG' | 'G4_SEVERE' | 'G5_EXTREME';
  solarFlux: number; // sfu
  solarFlareClass: 'A' | 'B' | 'C' | 'M' | 'X';
  solarWindSpeedKmS: number;
  lastUpdated: string;
  astrologicalSignificance: string;
  recommendedAction: string;
}

export interface SeismicActivityMetric {
  id: string;
  magnitude: number;
  location: string;
  coordinates: [number, number];
  depthKm: number;
  timestamp: string;
  lunarPhaseCorrelation: string;
  planetaryTrigger: string;
}

export interface MundaneForecast {
  id: string;
  domain: 'FINANCIAL_MARKETS' | 'GEOPOLITICS' | 'TECHNOLOGY_AI' | 'CLIMATE_EARTH' | 'GLOBAL_HEALTH';
  title: string;
  timeWindow: string;
  primaryDrivers: PlanetaryRuler[];
  activeAspects: string[];
  macroTrend: string;
  sentiment: SentimentDirection;
  confidenceScore: number; // 0-100%
  classicalSource: string;
  realWorldEvidence: string;
  historicalPrecedents: Array<{
    year: number;
    planetarySetup: string;
    historicalEvent: string;
  }>;
  actionableInsights: string[];
}

export interface PersonalWorldNewsSynthesis {
  headline: string;
  globalEventTitle: string;
  globalCategory: NewsCategory;
  primaryPlanet: PlanetaryRuler;
  activatedNatalHouse: number;
  houseTheme: string;
  personalImpactSummary: string;
  strategicAdvice: string;
  confidence: number;
}

export type ProviderProtocol = 'OPEN_REST_API' | 'PUBLIC_RSS' | 'OPEN_GEOJSON' | 'PUBLIC_METRIC';

export interface FreeNewsProvider {
  id: string;
  name: string;
  category: NewsCategory | 'ALL';
  protocol: ProviderProtocol;
  endpointUrl: string;
  description: string;
  requiresKey: boolean;
  rateLimitInfo: string;
  isOfficialPublic: boolean;
  isEnabled: boolean;
  status: 'ACTIVE' | 'IDLE' | 'ERROR';
  lastPingMs?: number;
}

export interface NewsPredictionState {
  newsItems: MacroNewsItem[];
  spaceWeather: SpaceWeatherMetric;
  recentSeismic: SeismicActivityMetric[];
  mundaneForecasts: MundaneForecast[];
  providers: FreeNewsProvider[];
  selectedCategory: NewsCategory | 'ALL';
  selectedPlanet: PlanetaryRuler | 'ALL';
  searchQuery: string;
  isLoading: boolean;
  lastRefreshed: string;
}
