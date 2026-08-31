/**
 * ASTRO360 Celestial-Terrestrial Correlator Engine
 * 
 * Grounds real-world geopolitical, financial, scientific, and seismic events in
 * classical Mundane Astrology (Samhita Jyotish & Western Mundane Cycles).
 * References: Varahamihira's Brihat Samhita, Ptolemy's Tetrabiblos (Book II),
 * and planetary cycle correlation models.
 */

import { PlanetaryRuler, PlanetaryCorrelation, NewsCategory, SentimentDirection } from './types';

interface PlanetaryKeywordRule {
  planet: PlanetaryRuler;
  keywords: string[];
  categoryWeight: Record<NewsCategory, number>;
  classicalSignificator: string;
  governedDomains: string[];
}

export const PLANETARY_SIGNIFICATORS: Record<PlanetaryRuler, PlanetaryKeywordRule> = {
  Mars: {
    planet: 'Mars',
    keywords: [
      'military', 'conflict', 'defense', 'war', 'army', 'weapons', 'energy', 
      'oil', 'gas', 'pipeline', 'metals', 'steel', 'mining', 'fire', 'explosions', 
      'cyberattack', 'aggression', 'sanctions', 'border', 'tensions', 'drilling'
    ],
    categoryWeight: {
      GEOPOLITICS: 0.95,
      MARKETS_COMMODITIES: 0.75,
      NATURAL_SEISMIC: 0.70,
      SPACE_WEATHER: 0.60,
      MACRO_ECONOMY: 0.40,
      SCIENCE_TECH: 0.30,
      SOCIETY_CULTURE: 0.35
    },
    classicalSignificator: 'Bhauma / Kuja — Commander of armies, mineral extraction, thermal energy, and boundary defense (Brihat Samhita Ch. 16).',
    governedDomains: ['Defense & Geopolitics', 'Crude Oil & Energy', 'Base Metals & Heavy Industry', 'Volcanic & Thermal Activity']
  },
  Saturn: {
    planet: 'Saturn',
    keywords: [
      'recession', 'inflation', 'debt', 'infrastructure', 'labor', 'unemployment', 
      'regulations', 'supply chain', 'shortages', 'manufacturing', 'agriculture', 
      'housing', 'real estate', 'austerity', 'restructuring', 'demographics', 'aging', 'slowdown'
    ],
    categoryWeight: {
      MACRO_ECONOMY: 0.95,
      MARKETS_COMMODITIES: 0.80,
      GEOPOLITICS: 0.65,
      NATURAL_SEISMIC: 0.55,
      SOCIETY_CULTURE: 0.60,
      SCIENCE_TECH: 0.30,
      SPACE_WEATHER: 0.20
    },
    classicalSignificator: 'Shani — Lord of structure, physical labor, agriculture, macroeconomic friction, and generational endurance (Brihat Samhita Ch. 18).',
    governedDomains: ['Macro Debt & Interest Rates', 'Infrastructure & Construction', 'Agriculture & Grain Reserves', 'Labor Markets & Supply Chains']
  },
  Jupiter: {
    planet: 'Jupiter',
    keywords: [
      'banking', 'central bank', 'fed', 'rate cuts', 'wealth', 'treasury', 'growth', 
      'gdp', 'trade treaty', 'legal', 'supreme court', 'treaty', 'accord', 'diplomacy', 
      'education', 'universities', 'philanthropy', 'bull market', 'optimism', 'liquidity'
    ],
    categoryWeight: {
      MACRO_ECONOMY: 0.90,
      MARKETS_COMMODITIES: 0.85,
      GEOPOLITICS: 0.70,
      SOCIETY_CULTURE: 0.75,
      SCIENCE_TECH: 0.50,
      NATURAL_SEISMIC: 0.10,
      SPACE_WEATHER: 0.20
    },
    classicalSignificator: 'Guru / Brihaspati — Great Benefic, lord of judiciary, sovereign treasury, global expansion, and international agreements (Brihat Samhita Ch. 17).',
    governedDomains: ['Global Banking & Liquidity', 'International Law & Treaties', 'Asset Growth & Sovereign Wealth', 'Higher Education & Philosophy']
  },
  Mercury: {
    planet: 'Mercury',
    keywords: [
      'trade', 'commerce', 'shipping', 'telecom', 'internet', 'semiconductors', 'chips', 
      'software', 'media', 'communications', 'satellites', 'logistics', 'transport', 
      'crypto', 'fintech', 'data centers', 'information', 'journalism'
    ],
    categoryWeight: {
      SCIENCE_TECH: 0.90,
      MARKETS_COMMODITIES: 0.80,
      MACRO_ECONOMY: 0.75,
      SOCIETY_CULTURE: 0.70,
      GEOPOLITICS: 0.40,
      SPACE_WEATHER: 0.45,
      NATURAL_SEISMIC: 0.20
    },
    classicalSignificator: 'Budha — Lord of commerce, communications, rapid data exchange, mathematical computation, and logistical networks (Brihat Samhita Ch. 15).',
    governedDomains: ['Semiconductors & Computing', 'Global Trade & Shipping', 'Media & Digital Networks', 'Fintech & Algorithmic Markets']
  },
  Venus: {
    planet: 'Venus',
    keywords: [
      'currency', 'foreign exchange', 'forex', 'consumer spending', 'luxury', 'retail', 
      'arts', 'entertainment', 'diplomacy', 'cultural', 'peace agreement', 'fashion', 
      'tourism', 'hospitality', 'silver', 'bonds'
    ],
    categoryWeight: {
      MARKETS_COMMODITIES: 0.75,
      SOCIETY_CULTURE: 0.90,
      MACRO_ECONOMY: 0.65,
      GEOPOLITICS: 0.55,
      SCIENCE_TECH: 0.35,
      NATURAL_SEISMIC: 0.10,
      SPACE_WEATHER: 0.10
    },
    classicalSignificator: 'Shukra — Lord of liquid currency, artistic culture, diplomatic reconciliation, and refined commodities (Brihat Samhita Ch. 19).',
    governedDomains: ['Currencies & Foreign Exchange', 'Consumer Discretionary & Retail', 'Diplomatic Peace & Treaties', 'Arts, Entertainment & Media']
  },
  Sun: {
    planet: 'Sun',
    keywords: [
      'president', 'prime minister', 'leadership', 'sovereign', 'government', 'elections', 
      'state visit', 'summit', 'power grid', 'energy', 'solar', 'space weather', 'solar flare', 
      'geomagnetic', 'central authority', 'monarchy'
    ],
    categoryWeight: {
      GEOPOLITICS: 0.90,
      SPACE_WEATHER: 0.95,
      MACRO_ECONOMY: 0.60,
      SCIENCE_TECH: 0.55,
      SOCIETY_CULTURE: 0.50,
      MARKETS_COMMODITIES: 0.45,
      NATURAL_SEISMIC: 0.40
    },
    classicalSignificator: 'Surya — Soul of the cosmos, king of planets, governing heads of state, sovereign authority, and electromagnetic energy (Brihat Samhita Ch. 4).',
    governedDomains: ['Heads of State & Sovereign Governance', 'Solar Physics & Space Weather', 'Power Infrastructure & High Energy', 'National Identity & Morale']
  },
  Moon: {
    planet: 'Moon',
    keywords: [
      'public sentiment', 'consumer confidence', 'agriculture', 'food supply', 'water', 
      'oceans', 'maritime', 'weather', 'floods', 'tides', 'migration', 'housing market', 
      'healthcare', 'social mood', 'fertility'
    ],
    categoryWeight: {
      SOCIETY_CULTURE: 0.85,
      NATURAL_SEISMIC: 0.80,
      MACRO_ECONOMY: 0.60,
      MARKETS_COMMODITIES: 0.55,
      GEOPOLITICS: 0.45,
      SPACE_WEATHER: 0.35,
      SCIENCE_TECH: 0.20
    },
    classicalSignificator: 'Chandra — Ruler of public mass psychology, tidal oceans, water supplies, and seasonal harvests (Brihat Samhita Ch. 5).',
    governedDomains: ['Mass Consumer Psychology', 'Oceans, Water Resources & Rainfall', 'Agricultural Commodities & Grains', 'Public Healthcare & Wellness']
  },
  Rahu: {
    planet: 'Rahu',
    keywords: [
      'artificial intelligence', 'ai', 'disruption', 'crypto', 'virtual', 'breakthrough', 
      'mania', 'bubble', 'speculation', 'unprecedented', 'unforeseen', 'cybersecurity', 
      'biotech', 'synthetic', 'autonomous', 'drones', 'eclipses'
    ],
    categoryWeight: {
      SCIENCE_TECH: 0.95,
      MARKETS_COMMODITIES: 0.85,
      GEOPOLITICS: 0.75,
      SOCIETY_CULTURE: 0.80,
      MACRO_ECONOMY: 0.60,
      NATURAL_SEISMIC: 0.50,
      SPACE_WEATHER: 0.40
    },
    classicalSignificator: 'Rahu (North Lunar Node) — Agent of synthetic innovations, disruptive technologies, speculative bubbles, and unforeseen shifts (Brihat Samhita Ch. 6).',
    governedDomains: ['Artificial Intelligence & Deep Tech', 'Speculative Asset Manias & Crypto', 'Unconventional Geopolitics & Hybrid Warfare', 'Viral Global Phenomena']
  },
  Ketu: {
    planet: 'Ketu',
    keywords: [
      'separation', 'secession', 'divestment', 'cyber blackout', 'outage', 'collapse', 
      'renunciation', 'decoupling', 'sanctions', 'nuclear', 'quantum', 'seismic', 
      'earthquake', 'tsunami', 'epidemic', 'subtle forces'
    ],
    categoryWeight: {
      NATURAL_SEISMIC: 0.90,
      SCIENCE_TECH: 0.70,
      GEOPOLITICS: 0.75,
      MACRO_ECONOMY: 0.50,
      MARKETS_COMMODITIES: 0.45,
      SOCIETY_CULTURE: 0.65,
      SPACE_WEATHER: 0.60
    },
    classicalSignificator: 'Ketu (South Lunar Node) — Signifies sudden dissolution, seismic fracturing, quantum mechanics, and geopolitical decoupling (Brihat Samhita Ch. 11).',
    governedDomains: ['Seismic & Geophysical Events', 'Quantum Computing & Sub-atomic Physics', 'Geopolitical Decoupling & Divestment', 'Systemic Outages & Reductions']
  },
  Uranus: {
    planet: 'Uranus',
    keywords: [
      'breakthrough', 'revolution', 'electric vehicles', 'grid', 'aerospace', 'rockets', 
      'quantum', 'innovation', 'protest', 'rebellion', 'sudden shock', 'volatility'
    ],
    categoryWeight: {
      SCIENCE_TECH: 0.90,
      MARKETS_COMMODITIES: 0.70,
      SOCIETY_CULTURE: 0.80,
      GEOPOLITICS: 0.65,
      MACRO_ECONOMY: 0.50,
      NATURAL_SEISMIC: 0.40,
      SPACE_WEATHER: 0.30
    },
    classicalSignificator: 'Uranus (Herschel) — Archetype of revolutionary technological invention, sudden disruption, and paradigm shifts in collective consciousness.',
    governedDomains: ['Aerospace, Satellites & Space Tech', 'Grid Electrification & Clean Tech', 'Sudden Market Volatility', 'Social Reform Movements']
  },
  Neptune: {
    planet: 'Neptune',
    keywords: [
      'oil slick', 'ocean', 'pharma', 'drugs', 'vaccine', 'synthetic chemicals', 'mirage', 
      'fraud', 'scam', 'crypto fraud', 'streaming', 'film', 'climate crisis', 'floods'
    ],
    categoryWeight: {
      SOCIETY_CULTURE: 0.85,
      SCIENCE_TECH: 0.60,
      MARKETS_COMMODITIES: 0.65,
      MACRO_ECONOMY: 0.55,
      NATURAL_SEISMIC: 0.50,
      GEOPOLITICS: 0.40,
      SPACE_WEATHER: 0.20
    },
    classicalSignificator: 'Neptune — Ruler of maritime oceans, pharmaceutical chemistry, synthetic illusions, liquidity tides, and mass entertainment media.',
    governedDomains: ['Pharmaceuticals & Biotechnology', 'Maritime Affairs & Ocean Governance', 'Financial Illusions & Speculative Hype', 'Global Media Streaming']
  },
  Pluto: {
    planet: 'Pluto',
    keywords: [
      'nuclear', 'uranium', 'transformation', 'deep state', 'covert', 'monopoly', 'antitrust', 
      'sovereign debt', 'currency reset', 'underground', 'volcano', 'geothermal', 'power shift'
    ],
    categoryWeight: {
      GEOPOLITICS: 0.90,
      MACRO_ECONOMY: 0.80,
      MARKETS_COMMODITIES: 0.75,
      SCIENCE_TECH: 0.60,
      NATURAL_SEISMIC: 0.70,
      SOCIETY_CULTURE: 0.65,
      SPACE_WEATHER: 0.30
    },
    classicalSignificator: 'Pluto (Yama / Hades) — Force of generational systemic restructuring, nuclear power, resource monopolies, and institutional rebirth.',
    governedDomains: ['Nuclear Energy & Uranium Supply', 'Antitrust & Institutional Reform', 'Global Power Hegemony Shifts', 'Deep Earth Geothermal Processes']
  }
};

/**
 * Correlates an incoming news article with its primary and secondary planetary rulers.
 */
export function correlateNewsWithPlanetaryCycles(
  title: string,
  summary: string,
  category: NewsCategory
): {
  primaryPlanet: PlanetaryRuler;
  secondaryPlanet?: PlanetaryRuler;
  correlations: PlanetaryCorrelation[];
  sentimentScore: number;
  sentimentLabel: SentimentDirection;
} {
  const combinedText = `${title} ${summary}`.toLowerCase();
  
  // 1. Calculate Score for Each Planet
  const scores: Array<{ planet: PlanetaryRuler; score: number; matchedKeywords: string[] }> = [];

  for (const [planetName, config] of Object.entries(PLANETARY_SIGNIFICATORS) as [PlanetaryRuler, PlanetaryKeywordRule][]) {
    let matchCount = 0;
    const matched: string[] = [];

    for (const kw of config.keywords) {
      if (combinedText.includes(kw)) {
        matchCount++;
        matched.push(kw);
      }
    }

    const categoryWeight = config.categoryWeight[category] || 0.5;
    const totalScore = matchCount * 25 * categoryWeight;

    scores.push({
      planet: planetName,
      score: totalScore,
      matchedKeywords: matched
    });
  }

  // Sort descending by score
  scores.sort((a, b) => b.score - a.score);

  const top = scores[0] && scores[0].score > 0 ? scores[0] : { planet: 'Jupiter' as PlanetaryRuler, score: 35, matchedKeywords: [] };
  const second = scores[1] && scores[1].score >= 20 ? scores[1] : undefined;

  // 2. Derive Sentiment Score (-1.0 to +1.0)
  const positiveWords = ['surge', 'growth', 'accord', 'peace', 'rally', 'record', 'breakthrough', 'approval', 'gain', 'profit', 'expansion', 'recovery', 'cure'];
  const negativeWords = ['crisis', 'crash', 'conflict', 'war', 'plunge', 'strike', 'outage', 'collapse', 'deficit', 'drop', 'earthquake', 'storm', 'sanctions', 'threat'];

  let posCount = 0;
  let negCount = 0;
  for (const w of positiveWords) if (combinedText.includes(w)) posCount++;
  for (const w of negativeWords) if (combinedText.includes(w)) negCount++;

  let sentimentScore = 0;
  if (posCount + negCount > 0) {
    sentimentScore = Math.max(-1.0, Math.min(1.0, (posCount - negCount) / (posCount + negCount)));
  }

  let sentimentLabel: SentimentDirection = 'NEUTRAL';
  if (sentimentScore >= 0.5) sentimentLabel = 'VERY_BULLISH';
  else if (sentimentScore > 0.1) sentimentLabel = 'BULLISH';
  else if (sentimentScore <= -0.5) sentimentLabel = 'CRISIS_ALERT';
  else if (sentimentScore < -0.1) sentimentLabel = 'BEARISH';

  // 3. Assemble Structured Correlation Explanations
  const correlations: PlanetaryCorrelation[] = [
    {
      planet: top.planet,
      transitCycle: getActiveTransitCycleDescription(top.planet),
      correlationStrength: Math.min(98, Math.max(55, Math.round(top.score + 40))),
      classicalPrinciple: PLANETARY_SIGNIFICATORS[top.planet].classicalSignificator,
      explanation: `Event keywords (${top.matchedKeywords.slice(0, 3).join(', ') || 'macro indicators'}) align directly with ${top.planet}'s classical dominion over ${PLANETARY_SIGNIFICATORS[top.planet].governedDomains[0]}.`
    }
  ];

  if (second) {
    correlations.push({
      planet: second.planet,
      transitCycle: getActiveTransitCycleDescription(second.planet),
      correlationStrength: Math.min(85, Math.max(40, Math.round(second.score + 25))),
      classicalPrinciple: PLANETARY_SIGNIFICATORS[second.planet].classicalSignificator,
      explanation: `Secondary resonance with ${second.planet} governs the underlying systemic effect on ${PLANETARY_SIGNIFICATORS[second.planet].governedDomains[0]}.`
    });
  }

  return {
    primaryPlanet: top.planet,
    secondaryPlanet: second?.planet,
    correlations,
    sentimentScore,
    sentimentLabel
  };
}

function getActiveTransitCycleDescription(planet: PlanetaryRuler): string {
  const currentTransitMap: Record<PlanetaryRuler, string> = {
    Saturn: 'Saturn in Pisces (2023–2026) — Finalizing 29.5-year structural cleanups, water/maritime borders & financial debt restructuring.',
    Jupiter: 'Jupiter in Taurus / Gemini (2024–2026) — Expansions in AI multimodal communications, global trade logistics & agricultural tech.',
    Mars: 'Mars Ingress Cycles (45-Day Waves) — High-velocity energetic trigger for kinetic tensions, defense mobilizations & commodity shifts.',
    Rahu: 'Rahu in Pisces (2023–2025) — Unconventional financial assets, synthetic intelligence, and global decentralization surges.',
    Ketu: 'Ketu in Virgo (2023–2025) — Systemic auditing of healthcare, administrative efficiency, and supply-chain disengagements.',
    Sun: 'Solar Ingress (Monthly Sign Gates) — Sovereign governance policy shifts, executive decree cycles & solar magnetic flux.',
    Moon: 'Lunar Syzygy (29.5-Day Waxing/Waning) — Rapid fluctuations in mass consumer sentiment, social viral trends & tidal pressures.',
    Mercury: 'Mercury Retrograde & Direct Stations (3x/year) — Re-evaluations of trade contracts, communication infrastructure & semiconductor flows.',
    Venus: 'Venus Ingresses (24-Day Transit Rhythm) — Forex currency balances, luxury demand, and bilateral diplomatic treaties.',
    Uranus: 'Uranus in Taurus (2018–2026) — Radical overhaul of traditional monetary systems, decentralized tokens & agricultural automation.',
    Neptune: 'Neptune in Pisces (2011–2026) — Cultural spiritualization, maritime energy disputes & pharmaceutical advancements.',
    Pluto: 'Pluto in Aquarius (2024–2044) — Generational 20-year democratization of compute power, energy decentralization & space logistics.'
  };

  return currentTransitMap[planet] || `${planet} Active Celestial Cycle`;
}
