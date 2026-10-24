/**
 * ASTRO360 Master Public APIs Registry & Directory
 * 
 * Curated and synchronized from 7 authoritative open-source API catalogs:
 * 1. public-apis/public-apis (Community-maintained master repository)
 * 2. public-api-lists/public-api-lists (Searchable machine-readable collection with 730+ APIs across 48 categories)
 * 3. tools-collection/apis-collection (Broad catalog for AI/ML, science, analytics, geocoding)
 * 4. cporter202/API-mega-list (Wide-ranging API resource list for AI, data collection, automation)
 * 5. APIs-guru/openapi-directory (Machine-readable OpenAPI/Swagger formats with programmatic list.json access)
 * 6. n0shake/Public-APIs (Curated verified active endpoints for developers and side projects)
 * 7. marcelscruz/public-apis (Collaborative API directory for cross-verification)
 */

export type ApiCategory = 
  | 'ASTRONOMY_SPACE'
  | 'GEOCODING_MAPS'
  | 'SPACE_WEATHER_GEOMAGNETIC'
  | 'SACRED_CULTURE_LANGUAGE'
  | 'AI_MACHINE_LEARNING'
  | 'CALENDAR_TIMEZONE'
  | 'WEATHER_ENVIRONMENT'
  | 'DEVELOPER_OPENAPI';

export type ApiCatalogSource =
  | 'public-apis/public-apis'
  | 'public-api-lists/public-api-lists'
  | 'tools-collection/apis-collection'
  | 'cporter202/API-mega-list'
  | 'APIs-guru/openapi-directory'
  | 'n0shake/Public-APIs'
  | 'marcelscruz/public-apis';

export interface PublicApiEntry {
  id: string;
  name: string;
  description: string;
  category: ApiCategory;
  baseUrl: string;
  docsUrl: string;
  authType: 'None' | 'apiKey' | 'OAuth';
  cors: 'yes' | 'no' | 'unknown';
  https: boolean;
  freeTier: string;
  sourceCatalogs: ApiCatalogSource[];
  sampleEndpoint: string;
  sampleMethod: 'GET' | 'POST';
  openApiSpecUrl?: string;
  astroUseCases: string[];
}

export const ASTRO_PUBLIC_APIS: PublicApiEntry[] = [
  // ==========================================
  // 1. ASTRONOMY & SPACE
  // ==========================================
  {
    id: 'nasa-apod',
    name: 'NASA Astronomy Picture of the Day (APOD)',
    description: 'Daily cosmic imagery, metadata, and astronomical discoveries curated by professional astronomers.',
    category: 'ASTRONOMY_SPACE',
    baseUrl: 'https://api.nasa.gov/planetary/apod',
    docsUrl: 'https://api.nasa.gov/',
    authType: 'apiKey',
    cors: 'yes',
    https: true,
    freeTier: '1,000 req/hr with free key; DEMO_KEY available',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'tools-collection/apis-collection',
      'APIs-guru/openapi-directory',
      'n0shake/Public-APIs'
    ],
    sampleEndpoint: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
    sampleMethod: 'GET',
    openApiSpecUrl: 'https://api.apis.guru/v2/specs/nasa.gov/planetary/apod/1.0.0/openapi.json',
    astroUseCases: ['Daily celestial background in Cosmic Intelligence Center', 'Educational deep space imagery']
  },
  {
    id: 'nasa-neows',
    name: 'NASA Near Earth Object Web Service (NeoWs)',
    description: 'RESTful web service for near earth asteroid information and planetary close approach telemetry.',
    category: 'ASTRONOMY_SPACE',
    baseUrl: 'https://api.nasa.gov/neo/rest/v1/feed',
    docsUrl: 'https://api.nasa.gov/',
    authType: 'apiKey',
    cors: 'yes',
    https: true,
    freeTier: '1,000 req/hr free',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'APIs-guru/openapi-directory'
    ],
    sampleEndpoint: 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-10-24&end_date=2026-10-24&api_key=DEMO_KEY',
    sampleMethod: 'GET',
    astroUseCases: ['Tracking asteroid conjunctions and rare cosmic transits', 'Asteroid astrology research']
  },
  {
    id: 'sunrise-sunset-org',
    name: 'Sunrise-Sunset.org API',
    description: 'Free REST API providing astronomical sunrise, sunset, solar noon, civil/nautical/astronomical twilight times for any latitude/longitude.',
    category: 'ASTRONOMY_SPACE',
    baseUrl: 'https://api.sunrise-sunset.org/json',
    docsUrl: 'https://sunrise-sunset.org/api',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '100% Free, Unlimited Keyless',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'cporter202/API-mega-list',
      'n0shake/Public-APIs',
      'marcelscruz/public-apis'
    ],
    sampleEndpoint: 'https://api.sunrise-sunset.org/json?lat=28.6139&lng=77.2090&formatted=0',
    sampleMethod: 'GET',
    astroUseCases: ['Vedic Suryodaya/Suryasta calculations for Dinamana', 'Abhijit Muhurta and Brahma Muhurta calibration']
  },
  {
    id: 'open-meteo-solar',
    name: 'Open-Meteo Solar & Sun Position API',
    description: 'High-precision solar irradiance, direct beam, diffuse radiation, and solar elevation angle calculations.',
    category: 'ASTRONOMY_SPACE',
    baseUrl: 'https://api.open-meteo.com/v1/forecast',
    docsUrl: 'https://open-meteo.com/en/docs',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: 'Free for non-commercial up to 10,000 daily calls',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'tools-collection/apis-collection',
      'marcelscruz/public-apis'
    ],
    sampleEndpoint: 'https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&daily=sunrise,sunset,daylight_duration&timezone=auto',
    sampleMethod: 'GET',
    astroUseCases: ['Real-time solar radiance alignment for Surya Arghya remedies', 'Planetary Hora daylight partitions']
  },
  {
    id: 'jpl-horizons',
    name: 'NASA JPL Horizons Ephemeris API',
    description: 'High-precision Solar System bodies ephemeris and orbital vectors covering planets, moons, comets, and major asteroids.',
    category: 'ASTRONOMY_SPACE',
    baseUrl: 'https://ssd.jpl.nasa.gov/api/horizons.api',
    docsUrl: 'https://ssd-api.jpl.nasa.gov/doc/horizons.html',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: 'Free public access for scientific research',
    sourceCatalogs: [
      'public-apis/public-apis',
      'tools-collection/apis-collection',
      'cporter202/API-mega-list'
    ],
    sampleEndpoint: 'https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND=%27499%27&QUANTITIES=%271,19%27',
    sampleMethod: 'GET',
    astroUseCases: ['Benchmarking ASTRO360 astronomical calculations against JPL DE440 standards']
  },

  // ==========================================
  // 2. GEOCODING & GLOBAL MAPS
  // ==========================================
  {
    id: 'nominatim-osm',
    name: 'OpenStreetMap Nominatim Geocoding',
    description: 'Search OpenStreetMap data by name and address (geocoding) and generate synthetic addresses from coordinates (reverse geocoding).',
    category: 'GEOCODING_MAPS',
    baseUrl: 'https://nominatim.openstreetmap.org/search',
    docsUrl: 'https://nominatim.org/release-docs/latest/api/Overview/',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '1 req/sec with descriptive User-Agent',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'cporter202/API-mega-list',
      'n0shake/Public-APIs',
      'marcelscruz/public-apis'
    ],
    sampleEndpoint: 'https://nominatim.openstreetmap.org/search?q=Bhubaneswar,India&format=json&limit=1',
    sampleMethod: 'GET',
    astroUseCases: ['Birthplace city-to-coordinate lookup', 'Astrocartography relocation coordinates']
  },
  {
    id: 'bigdatacloud-reverse-geocode',
    name: 'BigDataCloud Client-side Reverse Geocoding',
    description: 'Free client-side reverse geocoding API converting latitude and longitude into locality, administrative area, and country name.',
    category: 'GEOCODING_MAPS',
    baseUrl: 'https://api.bigdatacloud.net/data/reverse-geocode-client',
    docsUrl: 'https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: 'Free unlimited client-side queries',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'tools-collection/apis-collection'
    ],
    sampleEndpoint: 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=28.6139&longitude=77.2090&localityLanguage=en',
    sampleMethod: 'GET',
    astroUseCases: ['Automatic user GPS detection for daily transit calculations and local Panchang']
  },
  {
    id: 'open-elevation',
    name: 'Open-Elevation API',
    description: 'Free and open-source alternative to the Google Elevation API, providing altitude values for any geocoordinates.',
    category: 'GEOCODING_MAPS',
    baseUrl: 'https://api.open-elevation.com/api/v1/lookup',
    docsUrl: 'https://open-elevation.com/',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '100% Free Open-Source API',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'cporter202/API-mega-list'
    ],
    sampleEndpoint: 'https://api.open-elevation.com/api/v1/lookup?locations=28.6139,77.2090',
    sampleMethod: 'GET',
    astroUseCases: ['Topocentric parallax correction for Moon and Ascendant based on observer elevation above sea level']
  },
  {
    id: 'geojs',
    name: 'GeoJS IP Geolocation API',
    description: 'Fast, free, keyless IP geolocation lookup providing user country, region, city, coordinates, and timezone.',
    category: 'GEOCODING_MAPS',
    baseUrl: 'https://get.geojs.io/v1/ip/geo.json',
    docsUrl: 'https://www.geojs.io/docs/v1/endpoints/geo/',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '100% Free with no API key',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'n0shake/Public-APIs'
    ],
    sampleEndpoint: 'https://get.geojs.io/v1/ip/geo.json',
    sampleMethod: 'GET',
    astroUseCases: ['Zero-friction local coordinates detection for anonymous first-time visitors']
  },

  // ==========================================
  // 3. SPACE WEATHER & GEOMAGNETIC
  // ==========================================
  {
    id: 'noaa-swpc-k-index',
    name: 'NOAA SWPC Planetary K-Index & Geomagnetic Activity',
    description: 'Live geomagnetic disturbance indices (Kp-index), solar wind flux, and aurora forecasts updated every 15 minutes by NOAA.',
    category: 'SPACE_WEATHER_GEOMAGNETIC',
    baseUrl: 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json',
    docsUrl: 'https://www.swpc.noaa.gov/products-and-data',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: 'Free US Government open data',
    sourceCatalogs: [
      'public-apis/public-apis',
      'tools-collection/apis-collection',
      'cporter202/API-mega-list'
    ],
    sampleEndpoint: 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json',
    sampleMethod: 'GET',
    astroUseCases: ['Correlating geomagnetic storms with planetary retrogrades, Gochar, and bio-emotional rhythms']
  },
  {
    id: 'nasa-donki',
    name: 'NASA Space Weather Database Of Notifications, Knowledge, Information (DONKI)',
    description: 'Comprehensive record of Coronal Mass Ejections (CMEs), Solar Flares, and Geomagnetic Storms (GST).',
    category: 'SPACE_WEATHER_GEOMAGNETIC',
    baseUrl: 'https://api.nasa.gov/DONKI/FLR',
    docsUrl: 'https://api.nasa.gov/',
    authType: 'apiKey',
    cors: 'yes',
    https: true,
    freeTier: '1,000 req/hr with free NASA key or DEMO_KEY',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'APIs-guru/openapi-directory'
    ],
    sampleEndpoint: 'https://api.nasa.gov/DONKI/FLR?startDate=2026-10-01&endDate=2026-10-24&api_key=DEMO_KEY',
    sampleMethod: 'GET',
    astroUseCases: ['Cosmic storm alerts during sensitive solar/lunar eclipse windows']
  },
  {
    id: 'usgs-earthquakes',
    name: 'USGS Real-Time Earthquake Catalog',
    description: 'Real-time seismic activity, magnitude, and coordinates from the United States Geological Survey.',
    category: 'SPACE_WEATHER_GEOMAGNETIC',
    baseUrl: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    docsUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '100% Free Public USGS Data',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'cporter202/API-mega-list',
      'n0shake/Public-APIs'
    ],
    sampleEndpoint: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson',
    sampleMethod: 'GET',
    astroUseCases: ['Mundane astrology correlation studies between celestial alignments and tectonic events']
  },

  // ==========================================
  // 4. SACRED TRADITIONS, CULTURE & LANGUAGE
  // ==========================================
  {
    id: 'aladhan-timings',
    name: 'Aladhan Islamic Timings & Hijri Calendar API',
    description: 'Global Islamic prayer times calculation using 15+ international calculation methods, Hijri calendar conversion, and Qibla direction.',
    category: 'SACRED_CULTURE_LANGUAGE',
    baseUrl: 'https://api.aladhan.com/v1/timings',
    docsUrl: 'https://aladhan.com/prayer-times-api',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '100% Free, Keyless, Community Supported',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'cporter202/API-mega-list',
      'n0shake/Public-APIs',
      'marcelscruz/public-apis'
    ],
    sampleEndpoint: 'https://api.aladhan.com/v1/timings?latitude=28.6139&longitude=77.2090&method=4',
    sampleMethod: 'GET',
    openApiSpecUrl: 'https://api.apis.guru/v2/specs/aladhan.com/1.0.0/openapi.json',
    astroUseCases: ['Islamic Falak astronomical prayer times and Hijri lunar month tracking in ASTRO360 Islamic Suite']
  },
  {
    id: 'quran-cloud',
    name: 'Al-Quran Cloud REST API',
    description: 'Complete Quran text in Uthmani script, multi-lingual translations, audio recitations by authentic Qaris, and Ayah search.',
    category: 'SACRED_CULTURE_LANGUAGE',
    baseUrl: 'https://api.alquran.cloud/v1',
    docsUrl: 'https://alquran.cloud/api',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '100% Free Open API',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'cporter202/API-mega-list',
      'n0shake/Public-APIs'
    ],
    sampleEndpoint: 'https://api.alquran.cloud/v1/ayah/1:1/editions/quran-uthmani,en.sahih',
    sampleMethod: 'GET',
    astroUseCases: ['Islamic spiritual contemplation module and authentic Quranic recitation audio player']
  },
  {
    id: 'wikipedia-api',
    name: 'Wikipedia REST API (Astrological & Mythological Lore)',
    description: 'Structured summaries, deity lore, Sanskrit definitions, and historical records from Wikipedia.',
    category: 'SACRED_CULTURE_LANGUAGE',
    baseUrl: 'https://en.wikipedia.org/api/rest_v1/page/summary',
    docsUrl: 'https://en.wikipedia.org/api/rest_v1/',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '200 req/sec with descriptive User-Agent',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'tools-collection/apis-collection',
      'APIs-guru/openapi-directory'
    ],
    sampleEndpoint: 'https://en.wikipedia.org/api/rest_v1/page/summary/Navagraha',
    sampleMethod: 'GET',
    astroUseCases: ['Instant educational context for Nakshatra deities, planetary rulers, and Vedic Rishis']
  },

  // ==========================================
  // 5. CALENDAR, TIMEZONE & EPHEMERIS TIME
  // ==========================================
  {
    id: 'world-time-api',
    name: 'World Time API',
    description: 'Simple REST API to get current local time for any IANA timezone, Daylight Saving Time (DST) status, and UTC offsets.',
    category: 'CALENDAR_TIMEZONE',
    baseUrl: 'https://worldtimeapi.org/api/timezone',
    docsUrl: 'http://worldtimeapi.org/',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: 'Free public service',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'tools-collection/apis-collection',
      'cporter202/API-mega-list',
      'n0shake/Public-APIs',
      'marcelscruz/public-apis'
    ],
    sampleEndpoint: 'https://worldtimeapi.org/api/timezone/Asia/Kolkata',
    sampleMethod: 'GET',
    astroUseCases: ['DST status verification and UTC offset cross-check for high-precision natal chart calculations']
  },
  {
    id: 'rest-countries',
    name: 'REST Countries API',
    description: 'Get information about world countries: currencies, languages, capital cities, timezones, and geographic coordinates.',
    category: 'CALENDAR_TIMEZONE',
    baseUrl: 'https://restcountries.com/v3.1/all',
    docsUrl: 'https://restcountries.com/',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '100% Free Open API',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'cporter202/API-mega-list',
      'n0shake/Public-APIs',
      'marcelscruz/public-apis'
    ],
    sampleEndpoint: 'https://restcountries.com/v3.1/name/India?fields=name,capital,currencies,languages,timezones',
    sampleMethod: 'GET',
    astroUseCases: ['Multi-lingual localization, currency formatting, and country-level birth chart defaults']
  },

  // ==========================================
  // 6. WEATHER & ATMOSPHERE
  // ==========================================
  {
    id: 'open-meteo-weather',
    name: 'Open-Meteo Weather Forecast API',
    description: 'Free open-source weather forecast API for any coordinate on Earth with hourly temperature, cloud cover, and atmospheric pressure.',
    category: 'WEATHER_ENVIRONMENT',
    baseUrl: 'https://api.open-meteo.com/v1/forecast',
    docsUrl: 'https://open-meteo.com/en/docs',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: 'Free for non-commercial up to 10,000 daily calls',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'tools-collection/apis-collection',
      'marcelscruz/public-apis'
    ],
    sampleEndpoint: 'https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current=temperature_2m,surface_pressure,cloud_cover',
    sampleMethod: 'GET',
    astroUseCases: ['Atmospheric refraction corrections for Ascendant calculations', 'Stargazing / night sky visibility score']
  },
  {
    id: 'openaq-air-quality',
    name: 'OpenAQ Global Air Quality API',
    description: 'Community-driven global platform providing open real-time and historical air quality data from 100+ countries.',
    category: 'WEATHER_ENVIRONMENT',
    baseUrl: 'https://api.openaq.org/v2/latest',
    docsUrl: 'https://docs.openaq.org/',
    authType: 'apiKey',
    cors: 'yes',
    https: true,
    freeTier: 'Free tier available for public health and environmental research',
    sourceCatalogs: [
      'public-apis/public-apis',
      'public-api-lists/public-api-lists',
      'tools-collection/apis-collection'
    ],
    sampleEndpoint: 'https://api.openaq.org/v2/latest?limit=1&city=Delhi',
    sampleMethod: 'GET',
    astroUseCases: ['Ayurvedic Vata/Pitta/Kapha seasonal health and environmental alignment suggestions']
  },

  // ==========================================
  // 7. DEVELOPER & OPENAPI DISCOVERY
  // ==========================================
  {
    id: 'apis-guru-directory',
    name: 'APIs.guru OpenAPI Master Catalog',
    description: 'Wikipedia for Web APIs — machine-readable OpenAPI/Swagger specifications for over 2,500+ public REST APIs.',
    category: 'DEVELOPER_OPENAPI',
    baseUrl: 'https://api.apis.guru/v2/list.json',
    docsUrl: 'https://apis.guru/openapi-directory/',
    authType: 'None',
    cors: 'yes',
    https: true,
    freeTier: '100% Free Open-Source API specification registry',
    sourceCatalogs: [
      'APIs-guru/openapi-directory',
      'tools-collection/apis-collection',
      'cporter202/API-mega-list'
    ],
    sampleEndpoint: 'https://api.apis.guru/v2/list.json',
    sampleMethod: 'GET',
    astroUseCases: ['Dynamic discovery, schema validation, and OpenAPI client generation for third-party developers']
  }
];

/**
 * Filter public APIs by keyword query, category, or source catalog
 */
export function filterPublicApis(params: {
  query?: string;
  category?: ApiCategory | 'ALL';
  source?: ApiCatalogSource | 'ALL';
  authType?: 'None' | 'apiKey' | 'ALL';
}): PublicApiEntry[] {
  let list = [...ASTRO_PUBLIC_APIS];

  if (params.category && params.category !== 'ALL') {
    list = list.filter(api => api.category === params.category);
  }

  if (params.source && params.source !== 'ALL') {
    list = list.filter(api => api.sourceCatalogs.includes(params.source as ApiCatalogSource));
  }

  if (params.authType && params.authType !== 'ALL') {
    list = list.filter(api => api.authType === params.authType);
  }

  if (params.query && params.query.trim()) {
    const q = params.query.trim().toLowerCase();
    list = list.filter(api => 
      api.name.toLowerCase().includes(q) ||
      api.description.toLowerCase().includes(q) ||
      api.category.toLowerCase().includes(q) ||
      api.astroUseCases.some(u => u.toLowerCase().includes(q))
    );
  }

  return list;
}

/**
 * Generate ready-to-run developer code snippets
 */
export function generateApiCodeSnippet(api: PublicApiEntry, language: 'curl' | 'javascript' | 'python'): string {
  switch (language) {
    case 'curl':
      return `curl -X ${api.sampleMethod} "${api.sampleEndpoint}" \\\n  -H "Accept: application/json"`;

    case 'javascript':
      return `// Query ${api.name}\nasync function queryApi() {\n  const response = await fetch("${api.sampleEndpoint}", {\n    headers: { "Accept": "application/json" }\n  });\n  const data = await response.json();\n  console.log("${api.name} telemetry:", data);\n  return data;\n}\n\nqueryApi();`;

    case 'python':
      return `# Query ${api.name}\nimport requests\n\nurl = "${api.sampleEndpoint}"\nheaders = {"Accept": "application/json"}\n\nresponse = requests.get(url, headers=headers)\ndata = response.json()\nprint("${api.name} data:", data)`;
  }
}
