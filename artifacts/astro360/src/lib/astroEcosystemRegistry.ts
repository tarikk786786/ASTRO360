export interface EcosystemTool {
  id: string;
  name: string;
  category: 
    | 'Astrology Engine'
    | 'AI Brain'
    | 'Search & RAG'
    | 'Astronomy'
    | 'Charts & 3D'
    | 'UI Framework'
    | 'Reports'
    | 'Database & Auth'
    | 'Automation'
    | 'Browser Automation'
    | 'Analytics'
    | 'CMS & Admin';
  purpose: string;
  repositoryUrl: string;
  status: 'integrated' | 'active' | 'ready';
}

export const ASTRO360_ECOSYSTEM: EcosystemTool[] = [
  // 1. ASTROLOGY ENGINES
  { id: 'vedastro', name: 'VedAstro', category: 'Astrology Engine', purpose: 'Vedic Astrology Engine (Dasha, Yogas, Planet Strength)', repositoryUrl: 'https://github.com/VedAstro/VedAstro', status: 'integrated' },
  { id: 'kerykeion', name: 'Kerykeion', category: 'Astrology Engine', purpose: 'Western Astrology Engine (Placidus, Whole Sign, Synastry)', repositoryUrl: 'https://github.com/g-battaglia/kerykeion', status: 'integrated' },
  { id: 'swisseph-node', name: 'swisseph (Node.js)', category: 'Astrology Engine', purpose: 'Swiss Ephemeris Node.js Wrapper', repositoryUrl: 'https://github.com/mivion/swisseph', status: 'integrated' },
  { id: 'pyswisseph', name: 'pyswisseph', category: 'Astrology Engine', purpose: 'Swiss Ephemeris Python Bindings', repositoryUrl: 'https://github.com/astrorigin/pyswisseph', status: 'integrated' },
  { id: 'swisseph-c', name: 'Swiss Ephemeris (C)', category: 'Astrology Engine', purpose: 'Official Swiss Ephemeris Core Library', repositoryUrl: 'https://github.com/aloistr/swisseph', status: 'integrated' },
  { id: 'flatlib', name: 'Flatlib', category: 'Astrology Engine', purpose: 'Python Traditional & Hellenistic Astrology Library', repositoryUrl: 'https://github.com/flatangle/flatlib', status: 'integrated' },
  { id: 'hora-prakash', name: 'Hora Prakash', category: 'Astrology Engine', purpose: 'Vedic Hora & Divisional Chart Calculations', repositoryUrl: 'https://github.com/PriyankGahtori/hora-prakash', status: 'integrated' },
  { id: 'panchangam', name: 'panchangam', category: 'Astrology Engine', purpose: 'Panchang Engine (Tithi, Nakshatra, Yoga, Karana)', repositoryUrl: 'https://github.com/fusionstrings/panchangam', status: 'integrated' },
  { id: 'astrology-api', name: 'astrology-api', category: 'Astrology Engine', purpose: 'Astrology REST API Service', repositoryUrl: 'https://github.com/ryuphi/astrology-api', status: 'integrated' },
  
  // 2. AI BRAIN
  { id: 'langgraph', name: 'LangGraph', category: 'AI Brain', purpose: 'Multi-Agent Graph Orchestration', repositoryUrl: 'https://github.com/langchain-ai/langgraph', status: 'integrated' },
  { id: 'openai-agents', name: 'OpenAI Agents SDK', category: 'AI Brain', purpose: 'Autonomous Agent Framework', repositoryUrl: 'https://github.com/openai/openai-agents-python', status: 'integrated' },
  { id: 'pydantic-ai', name: 'PydanticAI', category: 'AI Brain', purpose: 'Typed Validation AI Agents', repositoryUrl: 'https://github.com/pydantic/pydantic-ai', status: 'integrated' },
  { id: 'llamaindex', name: 'LlamaIndex', category: 'AI Brain', purpose: 'Data RAG & Knowledge Indexing', repositoryUrl: 'https://github.com/run-llama/llama_index', status: 'integrated' },
  { id: 'mem0', name: 'Mem0', category: 'AI Brain', purpose: 'Long-Term Cross-Session Agent Memory', repositoryUrl: 'https://github.com/mem0ai/mem0', status: 'integrated' },
  { id: 'qdrant', name: 'Qdrant', category: 'AI Brain', purpose: 'Vector Database for Semantic Search', repositoryUrl: 'https://github.com/qdrant/qdrant', status: 'integrated' },
  { id: 'langfuse', name: 'Langfuse', category: 'AI Brain', purpose: 'AI Observability & Trace Logging', repositoryUrl: 'https://github.com/langfuse/langfuse', status: 'integrated' },

  // 3. SEARCH & KNOWLEDGE
  { id: 'meilisearch', name: 'Meilisearch', category: 'Search & RAG', purpose: 'Fast Full-Text Search Engine', repositoryUrl: 'https://github.com/meilisearch/meilisearch', status: 'integrated' },
  { id: 'typesense', name: 'Typesense', category: 'Search & RAG', purpose: 'Typo-Tolerant Search Engine', repositoryUrl: 'https://github.com/typesense/typesense', status: 'integrated' },
  { id: 'searxng', name: 'SearXNG', category: 'Search & RAG', purpose: 'Self-Hosted Metasearch Engine', repositoryUrl: 'https://github.com/searxng/searxng', status: 'integrated' },

  // 4. ASTRONOMY
  { id: 'astropy', name: 'Astropy', category: 'Astronomy', purpose: 'IAU Astronomy & Celestial Mechanics', repositoryUrl: 'https://github.com/astropy/astropy', status: 'integrated' },
  { id: 'skyfield', name: 'Skyfield', category: 'Astronomy', purpose: 'JPL Planetary Positions & Ephemeris', repositoryUrl: 'https://github.com/skyfielders/python-skyfield', status: 'integrated' },
  { id: 'nasa-api', name: 'NASA Open APIs', category: 'Astronomy', purpose: 'APOD, DONKI Solar Flares & JWST Data', repositoryUrl: 'https://api.nasa.gov', status: 'integrated' },

  // 5. CHARTS & VISUALIZATION
  { id: 'echarts', name: 'Apache ECharts', category: 'Charts & 3D', purpose: 'Interactive Charting & Aspect Geometry Graphs', repositoryUrl: 'https://github.com/apache/echarts', status: 'integrated' },
  { id: 'recharts', name: 'Recharts', category: 'Charts & 3D', purpose: 'React Charting Library', repositoryUrl: 'https://github.com/recharts/recharts', status: 'integrated' },
  { id: 'r3f', name: 'React Three Fiber & Three.js', category: 'Charts & 3D', purpose: '3D Solar System Orrery & Celestial Sphere', repositoryUrl: 'https://github.com/pmndrs/react-three-fiber', status: 'integrated' },

  // 6. UI & REPORTS
  { id: 'shadcn', name: 'shadcn/ui', category: 'UI Framework', purpose: 'Modern UI Component System', repositoryUrl: 'https://github.com/shadcn-ui/ui', status: 'integrated' },
  { id: 'framer-motion', name: 'Framer Motion', category: 'UI Framework', purpose: 'Fluid UI & Layout Animations', repositoryUrl: 'https://github.com/motiondivision/motion', status: 'integrated' },
  { id: 'react-pdf', name: 'React PDF & Puppeteer', category: 'Reports', purpose: 'Enterprise PDF Report Generation', repositoryUrl: 'https://github.com/diegomura/react-pdf', status: 'integrated' },

  // 7. DATABASE, AUTOMATION & INFRASTRUCTURE
  { id: 'prisma', name: 'Prisma ORM & PostgreSQL', category: 'Database & Auth', purpose: 'Type-Safe ORM & Database Persistence', repositoryUrl: 'https://github.com/prisma/prisma', status: 'integrated' },
  { id: 'n8n', name: 'n8n & Trigger.dev', category: 'Automation', purpose: 'Workflow Automation & Scheduled Jobs', repositoryUrl: 'https://github.com/n8n-io/n8n', status: 'integrated' },
  { id: 'browser-use', name: 'browser-use & Playwright', category: 'Browser Automation', purpose: 'Browser Automation & QA Verification', repositoryUrl: 'https://github.com/browser-use/browser-use', status: 'integrated' },
  { id: 'novu', name: 'Novu', category: 'CMS & Admin', purpose: 'Universal Notification Hub (Email, Push, SMS)', repositoryUrl: 'https://github.com/novuhq/novu', status: 'integrated' }
];

export function getToolsByCategory(cat: EcosystemTool['category']): EcosystemTool[] {
  return ASTRO360_ECOSYSTEM.filter(t => t.category === cat);
}
