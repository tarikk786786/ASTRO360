import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, Users, Code, Database, Shield, LineChart, Cpu, DollarSign, Calendar, Search, Map } from 'lucide-react';

const PRD_SECTIONS = [
  { id: 'executive', title: 'Executive Summary', icon: Target },
  { id: 'competitors', title: 'Competitive Analysis', icon: Users },
  { id: 'opensource', title: 'Open Source & LLMs', icon: Code },
  { id: 'systems', title: 'Worldwide Systems', icon: Map },
  { id: 'requirements', title: 'Product Requirements', icon: FileText },
  { id: 'architecture', title: 'Architecture & DB', icon: Database },
  { id: 'ai-security', title: 'AI & Security', icon: Cpu },
  { id: 'business', title: 'Business & SEO', icon: LineChart },
  { id: 'roadmap', title: 'Roadmap & Rollout', icon: Calendar }
];

export default function PRDViewer() {
  const [activeSection, setActiveSection] = useState('executive');

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 pb-12 h-[calc(100vh-8rem)]">
      {/* PRD Navigation */}
      <div className="w-full md:w-64 flex-shrink-0 overflow-y-auto custom-scrollbar border-r border-white/10 pr-4">
        <h2 className="text-xl font-bold text-white mb-6 sticky top-0 bg-slate-950/80 backdrop-blur-sm py-2">Master PRD</h2>
        <nav className="space-y-1">
          {PRD_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left text-sm \${
                  isActive 
                    ? 'bg-indigo-500/20 text-indigo-300 font-medium' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.title}
              </button>
            );
          })}
        </nav>
      </div>

      {/* PRD Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-12">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="prose prose-invert prose-indigo max-w-none prose-headings:text-slate-200 prose-a:text-indigo-400 prose-strong:text-indigo-300"
        >
          {activeSection === 'executive' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Executive Summary & Vision</h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                AstroVerse AI is poised to become the "GitHub + ChatGPT + TradingView" of Astrology. 
                It is a modular, enterprise-grade global astrology platform designed to support over 100+ traditions worldwide.
              </p>
              
              <div className="my-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-white font-medium mb-3 mt-0">Core Mission</h3>
                <p className="text-slate-400 mb-0">
                  To provide the world's most comprehensive open-source astrology platform that respects cultural heritage, 
                  utilizes precise astronomical calculations, and clearly distinguishes between evidence-based science and traditional interpretive systems.
                </p>
              </div>

              <h3>Primary Objectives</h3>
              <ul>
                <li><strong>Unification:</strong> Bring Vedic, Western, Chinese, Mayan, Numerology, and Tarot into a single unified interface without conflating their distinct rulesets.</li>
                <li><strong>AI-First:</strong> Leverage multi-agent LLMs (Gemini) to act as specialized practitioners for each tradition.</li>
                <li><strong>Scalability:</strong> Built on a robust, scalable microservices architecture suitable for millions of daily active users.</li>
                <li><strong>Open & Transparent:</strong> Transparent algorithms using established open-source astronomical engines (Swiss Ephemeris).</li>
              </ul>
            </div>
          )}

          {activeSection === 'competitors' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Competitive Analysis</h1>
              <p>An in-depth analysis of the current global astrology landscape.</p>
              
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20 text-left text-slate-300">
                      <th className="py-3 pr-4">Platform</th>
                      <th className="py-3 px-4">Strengths</th>
                      <th className="py-3 px-4">Weaknesses</th>
                      <th className="py-3 pl-4">AI Integration</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-400">
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4 font-medium text-white">Co-Star</td>
                      <td className="py-3 px-4">Hyper-personalized UI, strong GenZ brand, social features.</td>
                      <td className="py-3 px-4">Only Western tropical. Opaque algorithms. Snarky tone alienates some.</td>
                      <td className="py-3 pl-4">Rule-based templates, minimal generative AI.</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4 font-medium text-white">AstroSage</td>
                      <td className="py-3 px-4">Comprehensive Vedic calculations, massive user base in India.</td>
                      <td className="py-3 px-4">Cluttered UX, legacy UI, overwhelming data visualization.</td>
                      <td className="py-3 pl-4">Basic chatbot integrations.</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4 font-medium text-white">The Pattern</td>
                      <td className="py-3 px-4">Removes astrological jargon, focuses on psychological insights.</td>
                      <td className="py-3 px-4">Lack of transparency for enthusiasts who want to see their chart.</td>
                      <td className="py-3 pl-4">Predictive algorithms, limited GenAI.</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 pr-4 font-medium text-indigo-400">AstroVerse (Us)</td>
                      <td className="py-3 px-4">All global systems, premium UI, Multi-Agent AI.</td>
                      <td className="py-3 px-4">Complex to build and maintain multiple calculation engines.</td>
                      <td className="py-3 pl-4">Core platform feature (Gemini Pro integration).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'opensource' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Open Source & LLM Strategy</h1>
              
              <h3>Astronomical Engines</h3>
              <ul>
                <li><strong>Swiss Ephemeris (C/Python/Node bindings):</strong> The gold standard for astronomical calculations. High precision planetary positions, eclipses, and house cusps.</li>
                <li><strong>Skyfield / Astropy:</strong> Used for evidence-based astronomical fact-checking and generating visual sky maps.</li>
              </ul>

              <h3>LLM Framework Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-white mt-0 mb-2">Primary Generation Engine</h4>
                  <p className="text-sm mb-0"><strong>Gemini 3.1 Pro</strong> (via Google GenAI SDK). Selected for massive context window (essential for analyzing 100-page deep reports), exceptional reasoning, and multimodal capabilities.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-white mt-0 mb-2">Multi-Agent Orchestration</h4>
                  <p className="text-sm mb-0">Custom Node.js routing. Requests are classified and routed to specific "System Experts" (e.g., Vedic Agent, Tarot Agent) with specialized system instructions to prevent hallucinating rules across traditions.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'systems' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Worldwide Astrology Systems</h1>
              <p>The platform maintains strict taxonomic separation between over 100 distinct divinatory and astronomical systems.</p>
              
              <h3>Core Calculation Domains</h3>
              <div className="space-y-4">
                <div className="p-4 border-l-2 border-indigo-500 bg-indigo-500/5">
                  <h4 className="text-indigo-300 mt-0 mb-1">Vedic (Jyotish)</h4>
                  <p className="text-sm m-0">Sidereal zodiac, Lahiri Ayanamsa. Calculations for D-1 through D-60 charts, Vimshottari Dasha, Shadbala, and Ashtakavarga.</p>
                </div>
                <div className="p-4 border-l-2 border-purple-500 bg-purple-500/5">
                  <h4 className="text-purple-300 mt-0 mb-1">Western</h4>
                  <p className="text-sm m-0">Tropical zodiac. Placidus/Whole Sign houses. Transits, Progressions, Synastry, and Astrocartography.</p>
                </div>
                <div className="p-4 border-l-2 border-rose-500 bg-rose-500/5">
                  <h4 className="text-rose-300 mt-0 mb-1">Chinese (BaZi & Zi Wei Dou Shu)</h4>
                  <p className="text-sm m-0">Solar and lunar calendar conversions. Stems and Branches, Five Elements interactions, and Luck Pillars.</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <h4 className="text-yellow-400 mt-0 mb-2">Scientific Demarcation Protocol</h4>
                <p className="text-sm mb-0 text-slate-300">All outputs generated by these systems must be explicitly labeled as "Traditional Interpretations". Astronomical data (planetary coordinates, eclipse times) will be separated and labeled as "Astronomical Facts".</p>
              </div>
            </div>
          )}

          {activeSection === 'requirements' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Product Requirements</h1>
              
              <h3>1. User Onboarding Flow</h3>
              <p>Users must provide Name, Date of Birth (YYYY-MM-DD), Exact Time of Birth (HH:MM), and Location (Lat/Lng). Optional: Gender, Preferred System.</p>
              
              <h3>2. Daily Guidance Engine</h3>
              <ul>
                <li><strong>Input:</strong> Current daily planetary transits mapped against user's natal chart.</li>
                <li><strong>Output:</strong> 3 priority actions, lucky timing window, focus areas, and warnings.</li>
                <li><strong>Frequency:</strong> Refreshed daily at 00:00 user local time.</li>
              </ul>

              <h3>3. The "AI Oracle" Chat</h3>
              <p>A conversational interface allowing natural language queries. The AI must:</p>
              <ul>
                <li>Maintain conversation history (Memory).</li>
                <li>Access the user's computed chart data programmatically.</li>
                <li>Cite the specific astrological tradition used to form the answer.</li>
              </ul>

              <h3>4. Deep Report Generator</h3>
              <p>Generates 50-100 page PDF reports for specific verticals (Career, Romance, Saturn Return). Requires headless browser rendering of React components to PDF.</p>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">System Architecture & Database</h1>
              
              <div className="p-6 bg-black/50 border border-white/10 rounded-2xl my-6">
                <pre className="text-sm text-emerald-400 overflow-x-auto m-0 bg-transparent p-0">
{`Client (React 19 / Vite / PWA)
  │
  ├─> API Gateway (Express / Rate Limiter / Auth)
  │    │
  │    ├─> User Service (PostgreSQL)
  │    ├─> Ephemeris Engine (SwissEph C-bindings)
  │    │    └─> Calculates accurate planetary math
  │    │
  │    ├─> AI Orchestration Layer
  │    │    ├─> Prompt Templating & Guardrails
  │    │    └─> Gemini 3.1 Pro API
  │    │
  │    └─> Document Generation Service
  │         ├─> HTML to PDF renderer
  │         └─> S3 Object Storage
  │
  └─> Redis Cache (Daily transits & sessions)`}
                </pre>
              </div>

              <h3>Database Schema Highlights</h3>
              <ul>
                <li><code>users</code>: Core identity and birth data.</li>
                <li><code>natal_cache</code>: Pre-computed JSON blobs of exact planetary degrees to save Ephemeris compute.</li>
                <li><code>daily_guidance</code>: Partitioned by date, stores the daily AI-generated insights.</li>
                <li><code>chat_history</code>: Vector-enabled or JSONB storage for Oracle context.</li>
              </ul>
            </div>
          )}

          {activeSection === 'ai-security' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">AI Strategy & Security</h1>
              
              <h3>Prompt Engineering & Guardrails</h3>
              <p>The system utilizes strict system prompts to enforce safety and ethical guidelines.</p>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-sm font-mono text-slate-300">
                System: You are an expert astrologer. You must NEVER provide medical diagnoses, legal advice, or financial investment advice. If a user asks about health, state clearly that you are providing traditional astrological correlations, NOT medical advice, and instruct them to see a doctor.
              </div>

              <h3>Security (OWASP & Compliance)</h3>
              <ul>
                <li><strong>Data Privacy (GDPR/CCPA):</strong> Birth data is highly sensitive. Users can permanently delete their data with one click. Birth locations are resolved to coordinates and the raw string is discarded to prevent exact tracking.</li>
                <li><strong>Rate Limiting:</strong> Strict token limits per user per day on the AI Oracle to prevent abuse and manage inference costs.</li>
                <li><strong>Model Routing:</strong> Fallback logic to secondary models if the primary Gemini API experiences downtime.</li>
              </ul>
            </div>
          )}

          {activeSection === 'business' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Business Model & SEO</h1>
              
              <h3>Monetization Strategy</h3>
              <ul>
                <li><strong>Freemium Tier:</strong> Basic birth chart wheel, generalized daily horoscopes (cached for all users of a sun/moon sign), limited Oracle queries (3/day).</li>
                <li><strong>Premium Subscription ($9.99/mo):</strong> Highly personalized daily transit guidance, unlimited AI Oracle chat, advanced compatibility charts.</li>
                <li><strong>One-off Reports ($19.99 - $49.99):</strong> High-fidelity, 100-page deep-dive PDF reports generated by AI for major life events (marriage, career change).</li>
              </ul>

              <h3>Programmatic SEO Strategy</h3>
              <p>Generate millions of indexable pages based on planetary combinations:</p>
              <ul>
                <li><code>/astrology/sun-in-aries-moon-in-taurus</code></li>
                <li><code>/compatibility/leo-and-scorpio</code></li>
                <li><code>/transits/saturn-return-in-pisces</code></li>
              </ul>
              <p>These pages will feature statically generated AI content, drawing organic long-tail search traffic.</p>
            </div>
          )}

          {activeSection === 'roadmap' && (
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Roadmap & Deliverables</h1>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300/20 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-indigo-500 bg-slate-900 text-indigo-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    1
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 shadow-lg">
                    <h3 className="font-bold text-indigo-300 text-lg mt-0 mb-1">Phase 1: MVP & Architecture</h3>
                    <p className="text-sm text-slate-300 m-0">Core UI scaffold, User Onboarding, and initial Gemini AI integration. (Completed)</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-900 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    2
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 shadow-lg">
                    <h3 className="font-bold text-slate-300 text-lg mt-0 mb-1">Phase 2: Database & Ephemeris</h3>
                    <p className="text-sm text-slate-400 m-0">Integrate PostgreSQL via Supabase. Implement Swiss Ephemeris for exact charting.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-900 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    3
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 shadow-lg">
                    <h3 className="font-bold text-slate-300 text-lg mt-0 mb-1">Phase 3: Deep Reports & PDF</h3>
                    <p className="text-sm text-slate-400 m-0">Launch the 100-page PDF generation engine and payment gateways (Stripe).</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-900 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    4
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 shadow-lg">
                    <h3 className="font-bold text-slate-300 text-lg mt-0 mb-1">Phase 4: Global Enterprise Rollout</h3>
                    <p className="text-sm text-slate-400 m-0">Multi-language support, programmatic SEO scale-up, and marketplace for human astrologers.</p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
