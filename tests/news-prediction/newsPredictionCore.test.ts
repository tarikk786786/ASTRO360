import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { FREE_NEWS_PROVIDERS_CATALOG, DEFAULT_MACRO_NEWS_EVENTS, CURRENT_SPACE_WEATHER_SNAPSHOT, RECENT_SEISMIC_SNAPSHOTS } from '../../src/lib/news-prediction/freeNewsProviders';
import { correlateNewsWithPlanetaryCycles, PLANETARY_SIGNIFICATORS } from '../../src/lib/news-prediction/celestialCorrelator';
import { generateDynamicMundaneForecasts, MUNDANE_FORECASTS_CATALOG } from '../../src/lib/news-prediction/mundanePredictionEngine';
import { correlatePersonalImpactWithNews } from '../../src/lib/news-prediction/personalImpactCorrelator';
import { filterMacroNewsItems, getPersonalizedNewsSyntheses, getInitialNewsPredictionState } from '../../src/lib/news-prediction/newsPredictionCore';

describe('ASTRO360 Cosmic News & Mundane Prediction Intelligence Test Suite', () => {

  // ── 1. Free News Providers Catalog ────────────────────────────────
  describe('Free News Providers Catalog', () => {
    it('contains all free open APIs and public RSS feeds with zero key requirements', () => {
      assert.ok(FREE_NEWS_PROVIDERS_CATALOG.length >= 8, 'Must have at least 8 free providers');
      for (const provider of FREE_NEWS_PROVIDERS_CATALOG) {
        assert.equal(provider.requiresKey, false, `Provider [${provider.name}] must not require private API key`);
        assert.ok(provider.endpointUrl.startsWith('http'), `Provider [${provider.name}] must have valid URL`);
        assert.ok(provider.name.length > 3);
        assert.ok(provider.rateLimitInfo.length > 5);
      }
    });

    it('includes core open science feeds: GDELT, NOAA Space Weather, and USGS Earthquakes', () => {
      const ids = FREE_NEWS_PROVIDERS_CATALOG.map(p => p.id);
      assert.ok(ids.includes('gdelt-open-api'));
      assert.ok(ids.includes('noaa-space-weather-swpc'));
      assert.ok(ids.includes('usgs-earthquakes-geojson'));
      assert.ok(ids.includes('hackernews-algolia-api'));
    });
  });

  // ── 2. Celestial-Terrestrial Correlator ────────────────────────────
  describe('Celestial-Terrestrial Correlator', () => {
    it('correlates military and defense news to Mars (Mangala)', () => {
      const result = correlateNewsWithPlanetaryCycles(
        'Defense ministers sign maritime security patrol treaty',
        'Naval forces increase readiness along contested border straits',
        'GEOPOLITICS'
      );

      assert.equal(result.primaryPlanet, 'Mars');
      assert.ok(result.correlations.length > 0);
      assert.ok(result.correlations[0].correlationStrength >= 70);
      assert.ok(result.correlations[0].classicalPrinciple.includes('Bhauma'));
    });

    it('correlates artificial intelligence and quantum tech to Rahu and Mercury', () => {
      const result = correlateNewsWithPlanetaryCycles(
        'Autonomous Artificial Intelligence and Quantum Neural Network Breakthrough',
        'Engineers synthesize complex cryptographic chips at room temperature',
        'SCIENCE_TECH'
      );

      assert.equal(result.primaryPlanet, 'Rahu');
      assert.ok(result.correlations[0].classicalPrinciple.includes('Rahu'));
    });

    it('correlates central banks and gold accumulation to Sun and Jupiter', () => {
      const result = correlateNewsWithPlanetaryCycles(
        'Central banks accelerate physical gold accumulation and sovereign wealth reserves',
        'Treasury yields stabilize as global liquidity expands',
        'MARKETS_COMMODITIES'
      );

      assert.ok(['Sun', 'Jupiter'].includes(result.primaryPlanet));
    });

    it('derives directional sentiment scores accurately', () => {
      const bullish = correlateNewsWithPlanetaryCycles(
        'Record growth and surge in global trade accord recovery',
        'Economy records historic profits and expansion',
        'MACRO_ECONOMY'
      );
      assert.ok(bullish.sentimentScore > 0);
      assert.ok(['BULLISH', 'VERY_BULLISH'].includes(bullish.sentimentLabel));

      const bearish = correlateNewsWithPlanetaryCycles(
        'Severe crisis and crash triggers market collapse and conflict',
        'Threat of deep deficit and economic plunge',
        'MACRO_ECONOMY'
      );
      assert.ok(bearish.sentimentScore < 0);
      assert.ok(['BEARISH', 'CRISIS_ALERT'].includes(bearish.sentimentLabel));
    });
  });

  // ── 3. Mundane World Prediction Engine ────────────────────────────
  describe('Mundane World Prediction Engine', () => {
    it('provides multi-domain mundane forecasts with historical precedents', () => {
      assert.ok(MUNDANE_FORECASTS_CATALOG.length >= 4);
      for (const forecast of MUNDANE_FORECASTS_CATALOG) {
        assert.ok(forecast.confidenceScore >= 75);
        assert.ok(forecast.primaryDrivers.length > 0);
        assert.ok(forecast.historicalPrecedents.length > 0);
        assert.ok(forecast.actionableInsights.length >= 2);
        assert.ok(forecast.classicalSource.length > 5);
      }
    });

    it('dynamically updates mundane forecasts with real-world news evidence', () => {
      const dynamic = generateDynamicMundaneForecasts(DEFAULT_MACRO_NEWS_EVENTS);
      assert.equal(dynamic.length, MUNDANE_FORECASTS_CATALOG.length);
      const fin = dynamic.find(d => d.domain === 'FINANCIAL_MARKETS');
      assert.ok(fin);
      assert.ok(fin.realWorldEvidence.length > 10);
    });
  });

  // ── 4. Personal Natal Chart Impact Correlator ─────────────────────
  describe('Personal Natal Chart Impact Correlator', () => {
    it('maps world news to activated natal house with constructive guidance', () => {
      const testItem = DEFAULT_MACRO_NEWS_EVENTS[0];
      const synthesis = correlatePersonalImpactWithNews(testItem, {
        id: 'u1',
        name: 'Alex Rivera',
        dob: '1990-05-15',
        time: '14:30',
        location: 'New York, USA',
        gender: 'male',
        tradition: 'vedic'
      });

      assert.ok(synthesis.activatedNatalHouse >= 1 && synthesis.activatedNatalHouse <= 12);
      assert.ok(synthesis.houseTheme.length > 5);
      assert.ok(synthesis.strategicAdvice.includes(testItem.primaryPlanet));
      assert.ok(synthesis.confidence >= 75);
    });
  });

  // ── 5. Filtering & Querying Core ──────────────────────────────────
  describe('News Prediction Core Orchestration', () => {
    it('filters news items by category, planet, and search query', () => {
      const geoOnly = filterMacroNewsItems(DEFAULT_MACRO_NEWS_EVENTS, 'GEOPOLITICS', 'ALL', '');
      for (const item of geoOnly) {
        assert.equal(item.category, 'GEOPOLITICS');
      }

      const marsOnly = filterMacroNewsItems(DEFAULT_MACRO_NEWS_EVENTS, 'ALL', 'Mars', '');
      for (const item of marsOnly) {
        assert.ok(item.primaryPlanet === 'Mars' || item.secondaryPlanet === 'Mars');
      }

      const searched = filterMacroNewsItems(DEFAULT_MACRO_NEWS_EVENTS, 'ALL', 'ALL', 'gold');
      assert.ok(searched.length > 0);
      assert.ok(searched[0].title.toLowerCase().includes('gold') || searched[0].keywords.includes('gold'));
    });

    it('initializes full state with space weather and seismic snapshots', () => {
      const state = getInitialNewsPredictionState();
      assert.ok(state.newsItems.length > 0);
      assert.ok(state.spaceWeather.kpIndex >= 0);
      assert.ok(state.recentSeismic.length > 0);
      assert.ok(state.mundaneForecasts.length > 0);
      assert.ok(state.providers.length >= 8);
    });
  });

});
