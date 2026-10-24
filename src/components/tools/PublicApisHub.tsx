import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Search, Sparkles, Code, Terminal, Check, Copy, ExternalLink, 
  Play, ShieldCheck, Database, Compass, Sun, Moon, CloudSun, Radio, 
  Layers, Cpu, BookOpen, RefreshCw, AlertCircle, Zap
} from 'lucide-react';
import { 
  ASTRO_PUBLIC_APIS, 
  filterPublicApis, 
  generateApiCodeSnippet,
  PublicApiEntry, 
  ApiCategory, 
  ApiCatalogSource 
} from '../../lib/publicApisRegistry';

const CATEGORIES: Array<{ id: ApiCategory | 'ALL'; label: string; icon: any }> = [
  { id: 'ALL', label: 'All Categories', icon: Layers },
  { id: 'ASTRONOMY_SPACE', label: 'Astronomy & Space', icon: Sun },
  { id: 'GEOCODING_MAPS', label: 'Geocoding & Maps', icon: Compass },
  { id: 'SPACE_WEATHER_GEOMAGNETIC', label: 'Space Weather & K-Index', icon: Radio },
  { id: 'SACRED_CULTURE_LANGUAGE', label: 'Sacred Culture & Text', icon: BookOpen },
  { id: 'CALENDAR_TIMEZONE', label: 'Calendar & Timezone', icon: Moon },
  { id: 'WEATHER_ENVIRONMENT', label: 'Atmosphere & Weather', icon: CloudSun },
  { id: 'DEVELOPER_OPENAPI', label: 'OpenAPI & Discovery', icon: Database },
];

const SOURCE_REPOSITORIES: Array<{
  id: ApiCatalogSource | 'ALL';
  name: string;
  repo: string;
  desc: string;
  url: string;
  badge: string;
}> = [
  {
    id: 'ALL',
    name: 'All 7 Catalogs',
    repo: 'Consolidated Directory',
    desc: 'Unified multi-source public API index',
    url: '#',
    badge: 'Unified'
  },
  {
    id: 'public-apis/public-apis',
    name: 'public-apis',
    repo: 'public-apis/public-apis',
    desc: 'The classic community-maintained list of public APIs across all developer categories.',
    url: 'https://github.com/public-apis/public-apis',
    badge: '1400+ APIs'
  },
  {
    id: 'public-api-lists/public-api-lists',
    name: 'public-api-lists',
    repo: 'public-api-lists/public-api-lists',
    desc: 'Searchable collection with a machine-readable directory listing 730+ free public APIs across 48 categories.',
    url: 'https://github.com/public-api-lists/public-api-lists',
    badge: '730+ APIs / 48 Categories'
  },
  {
    id: 'tools-collection/apis-collection',
    name: 'apis-collection',
    repo: 'tools-collection/apis-collection',
    desc: 'Broad catalog with API descriptions and documentation for AI/ML, analytics, and science.',
    url: 'https://github.com/tools-collection/apis-collection',
    badge: 'AI & Tools'
  },
  {
    id: 'cporter202/API-mega-list',
    name: 'API-mega-list',
    repo: 'cporter202/API-mega-list',
    desc: 'Wide-ranging resource list for AI, automation, geocoding, and developer data collection.',
    url: 'https://github.com/cporter202/API-mega-list',
    badge: 'Mega List'
  },
  {
    id: 'APIs-guru/openapi-directory',
    name: 'OpenAPI Directory',
    repo: 'APIs-guru/openapi-directory',
    desc: 'Wikipedia for Web APIs with machine-readable OpenAPI/Swagger formats and programmatic list.json access.',
    url: 'https://github.com/APIs-guru/openapi-directory',
    badge: '2500+ Specs'
  },
  {
    id: 'n0shake/Public-APIs',
    name: 'Public-APIs (n0shake)',
    repo: 'n0shake/Public-APIs',
    desc: 'Curated community-maintained list of verified services and endpoints for applications.',
    url: 'https://github.com/n0shake/Public-APIs',
    badge: 'Curated'
  },
  {
    id: 'marcelscruz/public-apis',
    name: 'public-apis (marcelscruz)',
    repo: 'marcelscruz/public-apis',
    desc: 'Collaborative, verified API directory used to cross-check uptime, endpoints, and authentication.',
    url: 'https://github.com/marcelscruz/public-apis',
    badge: 'Verified'
  }
];

export default function PublicApisHub() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'tester' | 'sources' | 'openapi'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<ApiCategory | 'ALL'>('ALL');
  const [selectedSource, setSelectedSource] = useState<ApiCatalogSource | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [authFilter, setAuthFilter] = useState<'None' | 'apiKey' | 'ALL'>('ALL');
  
  // Active selected API for testing / snippets
  const [activeApi, setActiveApi] = useState<PublicApiEntry>(ASTRO_PUBLIC_APIS[0]);
  const [codeLang, setCodeLang] = useState<'curl' | 'javascript' | 'python'>('javascript');
  const [copied, setCopied] = useState(false);

  // Live Tester State
  const [testEndpoint, setTestEndpoint] = useState(activeApi.sampleEndpoint);
  const [testLoading, setTestLoading] = useState(false);
  const [testResponse, setTestResponse] = useState<any>(null);
  const [testLatency, setTestLatency] = useState<number | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  // APIs.guru Live Search State
  const [guruSearch, setGuruSearch] = useState('');
  const [guruLoading, setGuruLoading] = useState(false);
  const [guruSpecs, setGuruSpecs] = useState<Array<{ name: string; title: string; version: string; url: string }>>([
    { name: 'nasa.gov:planetary', title: 'NASA Planetary APOD API', version: '1.0.0', url: 'https://api.apis.guru/v2/specs/nasa.gov/planetary/apod/1.0.0/openapi.json' },
    { name: 'aladhan.com', title: 'Aladhan Islamic Timings', version: '1.0.0', url: 'https://api.apis.guru/v2/specs/aladhan.com/1.0.0/openapi.json' },
    { name: 'weather.gov', title: 'US National Weather Service (NOAA)', version: '2.0.0', url: 'https://api.apis.guru/v2/specs/weather.gov/2.0.0/openapi.json' },
    { name: 'usgs.gov:earthquake', title: 'USGS Earthquake Realtime Catalog', version: '1.0.0', url: 'https://earthquake.usgs.gov/fdsnws/event/1/' }
  ]);

  const filteredApis = useMemo(() => {
    return filterPublicApis({
      query: searchQuery,
      category: selectedCategory,
      source: selectedSource,
      authType: authFilter
    });
  }, [searchQuery, selectedCategory, selectedSource, authFilter]);

  const handleSelectApi = (api: PublicApiEntry) => {
    setActiveApi(api);
    setTestEndpoint(api.sampleEndpoint);
    setTestResponse(null);
    setTestError(null);
    setTestLatency(null);
  };

  const handleCopyCode = () => {
    const code = generateApiCodeSnippet(activeApi, codeLang);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunLiveTest = async () => {
    setTestLoading(true);
    setTestError(null);
    setTestResponse(null);
    const start = performance.now();

    try {
      const res = await fetch(testEndpoint, {
        headers: { Accept: 'application/json' }
      });
      const end = performance.now();
      setTestLatency(Math.round(end - start));

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setTestResponse(data);
    } catch (err: any) {
      const end = performance.now();
      setTestLatency(Math.round(end - start));
      setTestError(err.message || 'Network error or CORS restriction on direct browser call');
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* 1. Header Banner */}
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Source Public APIs Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              ASTRO360 Public APIs & Ephemeris Directory
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Curated, verified, and cross-referenced from 7 community-standard open-source API repositories.
              Explore space telemetry, geocoding, solar radiance, sacred texts, and machine-readable OpenAPI specs.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xl font-mono font-bold text-amber-400">{ASTRO_PUBLIC_APIS.length}+</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Verified APIs</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xl font-mono font-bold text-emerald-400">7</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Git Sources</div>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xl font-mono font-bold text-cyan-400">100%</div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Free Tiers</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.02] border border-white/5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Interactive API Catalog ({filteredApis.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'tester'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Live API Tester & Console</span>
          </button>
          <button
            onClick={() => setActiveTab('openapi')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'openapi'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>APIs.guru OpenAPI Registry (2,500+)</span>
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'sources'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>7 Source Repositories</span>
          </button>
        </div>
      </div>

      {/* 2. Main Tab View */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Search and Filters Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search APIs, coordinates, NASA, ephemeris, weather..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div className="md:col-span-4">
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-amber-400/50 cursor-pointer"
                >
                  {SOURCE_REPOSITORIES.map(src => (
                    <option key={src.id} value={src.id}>
                      Catalog: {src.name} ({src.badge})
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <select
                  value={authFilter}
                  onChange={(e) => setAuthFilter(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-amber-400/50 cursor-pointer"
                >
                  <option value="ALL">All Auth Modes</option>
                  <option value="None">Keyless (100% Free / No Key)</option>
                  <option value="apiKey">Free API Key</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm shadow-amber-400/10'
                        : 'bg-white/[0.02] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* API Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApis.map(api => (
                <div
                  key={api.id}
                  className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-amber-400/30 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 uppercase tracking-wider">
                        {api.category.replace(/_/g, ' ')}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        api.authType === 'None'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {api.authType === 'None' ? 'Keyless Free' : 'Free Key'}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {api.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {api.description}
                    </p>

                    {/* Astrological Use Case */}
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                      <span className="text-[9px] font-mono font-bold text-amber-300/80 uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 text-amber-400" /> ASTRO360 Use Case
                      </span>
                      <p className="text-[11px] text-slate-300 italic">
                        {api.astroUseCases[0]}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>CORS: <span className="text-slate-200">{api.cors}</span></span>
                      <span>HTTPS: <span className="text-emerald-400">✓</span></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleSelectApi(api);
                          setActiveTab('tester');
                        }}
                        className="flex-1 py-1.5 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 font-mono text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>Test API</span>
                      </button>

                      <a
                        href={api.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all"
                        title="Documentation"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Live Tester & Console Tab */}
        {activeTab === 'tester' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Endpoint Selector & Request Config */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Endpoint Configuration
                </h3>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-mono">Selected Public API</label>
                  <select
                    value={activeApi.id}
                    onChange={(e) => {
                      const found = ASTRO_PUBLIC_APIS.find(a => a.id === e.target.value);
                      if (found) handleSelectApi(found);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400/50 cursor-pointer"
                  >
                    {ASTRO_PUBLIC_APIS.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-mono">Sample Request URL</label>
                  <input
                    type="text"
                    value={testEndpoint}
                    onChange={(e) => setTestEndpoint(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 font-mono text-xs text-amber-300 border border-white/10 focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRunLiveTest}
                    disabled={testLoading}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {testLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{testLoading ? 'Sending HTTP Request...' : 'Execute Live Query'}</span>
                  </button>
                </div>

                {/* API Specs & Sourcing */}
                <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400 font-mono">
                    <span>Source Catalogs:</span>
                    <span className="text-slate-200">{activeApi.sourceCatalogs.length} Repositories</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-mono">
                    <span>Free Tier Quota:</span>
                    <span className="text-slate-200 text-right">{activeApi.freeTier}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-mono">
                    <span>Authentication:</span>
                    <span className="text-emerald-400 font-bold">{activeApi.authType}</span>
                  </div>
                </div>
              </div>

              {/* Developer Code Snippet Generator */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-amber-400" /> Integration Code Snippet
                  </h4>
                  <div className="flex items-center gap-1">
                    {(['curl', 'javascript', 'python'] as const).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setCodeLang(lang)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-all ${
                          codeLang === lang
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <pre className="p-3.5 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                    {generateApiCodeSnippet(activeApi, codeLang)}
                  </pre>
                  <button
                    onClick={handleCopyCode}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Response Output Console */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 min-h-[480px] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-slate-200">Response Console</span>
                    </div>

                    {testLatency !== null && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {testLatency} ms latency
                      </span>
                    )}
                  </div>

                  {testError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Request Notification:</p>
                        <p className="mt-0.5 text-rose-200/90">{testError}</p>
                        <p className="mt-1.5 text-[10px] text-slate-400">
                          Tip: Browsers block direct CORS calls for some legacy APIs. In production ASTRO360 uses its serverless proxy (/api/proxy) to safely route keys and bypass CORS.
                        </p>
                      </div>
                    </div>
                  )}

                  {testResponse ? (
                    <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 overflow-x-auto max-h-[380px] overflow-y-auto leading-relaxed border border-white/5">
                      {JSON.stringify(testResponse, null, 2)}
                    </pre>
                  ) : !testLoading && !testError ? (
                    <div className="text-center py-24 space-y-2">
                      <Terminal className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs font-mono text-slate-400">Ready to test {activeApi.name}</p>
                      <p className="text-[11px] text-slate-500">Click "Execute Live Query" to send a real HTTP request and inspect returned JSON telemetry.</p>
                    </div>
                  ) : null}
                </div>

                <div className="text-[10px] font-mono text-slate-500 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span>Method: GET</span>
                  <span>Payload Format: application/json</span>
                  <span>Transport: HTTPS/TLS 1.3</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. APIs.guru OpenAPI Master Registry */}
        {activeTab === 'openapi' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Code className="w-4 h-4" /> APIs-guru / openapi-directory Integration
              </div>
              <h2 className="text-xl font-bold text-white font-serif">
                Machine-Readable OpenAPI & Swagger Specifications Catalog
              </h2>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                ASTRO360 natively integrates with the APIs.guru OpenAPI Directory, the world's largest repository of standardized REST API specifications. Developers can retrieve OpenAPI schemas programmatically via <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">https://api.apis.guru/v2/list.json</code> to generate SDKs and validate contract types.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://api.apis.guru/v2/list.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-mono text-xs font-bold hover:bg-amber-300 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Inspect Master list.json (2,500+ APIs)</span>
                </a>
                <a
                  href="https://apis.guru/openapi-directory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-mono text-xs transition-all"
                >
                  <span>OpenAPI Directory Web UI</span>
                </a>
              </div>
            </div>

            {/* Curated OpenAPI Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guruSpecs.map(spec => (
                <div key={spec.name} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      OpenAPI v{spec.version}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{spec.name}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{spec.title}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[260px]">{spec.url}</span>
                    <a
                      href={spec.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-amber-300 hover:text-white flex items-center gap-1"
                    >
                      <span>View Spec</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. 7 Source Repositories Tab */}
        {activeTab === 'sources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOURCE_REPOSITORIES.filter(s => s.id !== 'ALL').map((source, idx) => (
              <div
                key={source.id}
                className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-amber-400/30 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400">#0{idx + 1} SOURCE</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {source.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{source.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{source.desc}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[180px]">
                    github.com/{source.repo}
                  </span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 hover:text-white"
                  >
                    <span>Open GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
