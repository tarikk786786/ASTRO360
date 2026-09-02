import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Compass, Heart, Calendar, Layers, ShieldCheck, 
  HelpCircle, ChevronDown, ChevronUp, ArrowRight, CheckCircle2, 
  BookOpen, Clock, Activity, Cpu 
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SEOTopicHubProps {
  hubId: 'birth-chart' | 'vedic-astrology' | 'western-astrology' | 'compatibility' | 'panchanga' | 'methodology';
  onStartChart: () => void;
  onNavigate: (tab: string) => void;
  userProfile?: UserProfile;
}

const HUB_CONTENT: Record<string, {
  title: string;
  eyebrow: string;
  headline: string;
  lead: string;
  keyConcepts: Array<{ title: string; desc: string; icon: any }>;
  howItWorks: Array<{ step: string; title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
  relatedHubs: Array<{ id: string; label: string }>;
}> = {
  'birth-chart': {
    title: 'Free Birth Chart Calculator',
    eyebrow: 'CALCULATE YOUR CELESTIAL BLUEPRINT',
    headline: 'High-Precision Natal Chart with Planetary Degrees & Rising Sign',
    lead: 'Generate your comprehensive natal birth chart (Kundli) with exact planetary longitudes, house cusps, lunar mansions, and cross-tradition interpretations.',
    keyConcepts: [
      { title: '☀️ Sun Sign (Atmakaraka)', desc: 'Represents core identity, vital purpose, and executive willpower.', icon: Sparkles },
      { title: '🌙 Moon Sign (Chandra Lagna)', desc: 'Governs emotional psychology, intuition, and mental response patterns.', icon: Heart },
      { title: '↑ Ascendant (Lagna)', desc: 'The exact rising constellation on the eastern horizon at birth, determining the 12 life houses.', icon: Compass },
      { title: '🏛️ 12 Astrological Houses', desc: 'Detailed division of life domains: identity, wealth, career, relationships, and higher wisdom.', icon: Layers },
    ],
    howItWorks: [
      { step: '01', title: 'Enter Exact Birth Coordinates', desc: 'Date, local time, and birthplace are converted to UTC and Greenwich Sidereal Time.' },
      { step: '02', title: 'JPL DE440 Ephemeris Calculation', desc: 'Deterministic celestial algorithms compute true longitudes with ±0.0001° accuracy.' },
      { step: '03', title: 'Synthesize Multi-Tradition Guidance', desc: 'Receive instant insights across both Vedic Sidereal and Western Tropical traditions.' }
    ],
    faqs: [
      { q: 'What is a birth chart?', a: 'A birth chart is an astronomical snapshot of the sky at your moment of birth, mapping planetary positions against the 12 zodiac signs and houses.' },
      { q: 'Why is exact birth time necessary?', a: 'Because the Earth rotates 1 degree every 4 minutes, an exact birth time is essential to accurately establish the Ascendant and house boundaries.' },
      { q: 'What if I do not know my exact birth time?', a: 'ASTRO360 calculates chart positions using Solar Noon (12:00) and provides sign-based insights while flagging house interpretations with an approximate badge.' }
    ],
    relatedHubs: [
      { id: 'vedic-astrology', label: 'Vedic Astrology' },
      { id: 'western-astrology', label: 'Western Astrology' },
      { id: 'compatibility', label: 'Compatibility & Synastry' }
    ]
  },
  'vedic-astrology': {
    title: 'Vedic Astrology (Jyotish)',
    eyebrow: 'CLASSICAL SIDEREAL ASTROLOGY',
    headline: 'Janam Kundli, 27 Nakshatras & Vimshottari Dasha Timeline',
    lead: 'Rooted in ancient Vedic treatises (Brihat Parashara Hora Shastra), Jyotish uses the sidereal zodiac (Lahiri Ayanamsha) and the 120-year Vimshottari Dasha timing system.',
    keyConcepts: [
      { title: '⭐ 27 Lunar Nakshatras', desc: '27 distinct 13°20\' stellar mansions revealing deeper psychological traits and life destiny.', icon: Sparkles },
      { title: '⏳ Vimshottari Dasha Engine', desc: '120-year planetary timing cycles divided into Mahadasha, Antardasha, and Pratyantar periods.', icon: Clock },
      { title: '📊 D1–D60 Divisional Vargas', desc: 'Harmonic charts including Navamsha (D9 for marriage/soul purpose) and Dashamsha (D10 for career).', icon: Layers },
      { title: '🧘 Planetary Remedies', desc: 'Grounded prescriptive remedial gemstones, rudraksha, and sound vibrations.', icon: ShieldCheck }
    ],
    howItWorks: [
      { step: '01', title: 'Lahiri Ayanamsha Precession', desc: 'The vernal equinox shift is applied to calculate true sidereal planetary longitudes.' },
      { step: '02', title: 'Ascendant & House Cusps', desc: 'Calculates the 12 Bhavas (houses) determining wealth, dharma, karma, and moksha.' },
      { step: '03', title: 'Dasha & Transit Correlation', desc: 'Correlates your current Mahadasha period with real-time planetary transits (Gochar).' }
    ],
    faqs: [
      { q: 'How does Vedic astrology differ from Western astrology?', a: 'Vedic astrology uses the Sidereal zodiac which aligns with actual physical constellations, accounting for the precession of equinoxes (Ayanamsha).' },
      { q: 'What is Vimshottari Dasha?', a: 'It is a 120-year predictive timing system based on the exact Nakshatra degree of your natal Moon at birth.' }
    ],
    relatedHubs: [
      { id: 'birth-chart', label: 'Birth Chart Calculator' },
      { id: 'panchanga', label: 'Daily Panchang' },
      { id: 'methodology', label: 'ASTRO360 Methodology' }
    ]
  },
  'western-astrology': {
    title: 'Western Tropical Astrology',
    eyebrow: 'MODERN PSYCHOLOGICAL ASTROLOGY',
    headline: 'Natal Wheel, Placidus Houses & Planetary Aspect Matrices',
    lead: 'Western astrology uses the Tropical zodiac linked to seasonal equinoxes and solstices, focusing on psychological archetypes, geometric aspects, and life progressions.',
    keyConcepts: [
      { title: '📐 Major Planetary Aspects', desc: 'Trines (120°), Sextiles (60°), Squares (90°), Oppositions (180°), and Conjunctions (0°).', icon: Activity },
      { title: '🏛️ Placidus House System', desc: 'Time-proportional house division reflecting diurnal planetary movement across the quadrants.', icon: Layers },
      { title: '🔄 Secondary Progressions', desc: 'Symbolic day-for-a-year progression system highlighting internal psychological evolution.', icon: Clock },
      { title: '🌍 Solar Return Charts', desc: 'Annual birthday ingress charts mapping the dominant themes for the upcoming 12 months.', icon: Sparkles }
    ],
    howItWorks: [
      { step: '01', title: 'Tropical Ingress Reference', desc: 'Positions are calculated relative to the Vernal Equinox (0° Aries).' },
      { step: '02', title: 'Aspect Orbs Evaluation', desc: 'Harmonic angles between celestial bodies are computed within tight orb limits.' },
      { step: '03', title: 'Psychological Synthesis', desc: 'Synthesizes elemental and modal balance (Fire/Earth/Air/Water & Cardinal/Fixed/Mutable).' }
    ],
    faqs: [
      { q: 'What is the Tropical Zodiac?', a: 'The Tropical zodiac defines 0° Aries as the exact point of the spring equinox in the Northern Hemisphere.' },
      { q: 'What are planetary aspects?', a: 'Aspects are specific geometric angles between planets that indicate energetic synergy or dynamic tension.' }
    ],
    relatedHubs: [
      { id: 'birth-chart', label: 'Birth Chart Calculator' },
      { id: 'compatibility', label: 'Synastry & Aspects' }
    ]
  },
  compatibility: {
    title: 'Astrology Compatibility & Synastry',
    eyebrow: 'RELATIONSHIP HARMONY & DYNAMICS',
    headline: '36-Guna Vedic Matching & Western Synastry Overlays',
    lead: 'Analyze relationship compatibility with dual-perspective intelligence: Vedic Ashta Koota 36-point scoring and Western geometric aspect overlays.',
    keyConcepts: [
      { title: '❤️ 36-Guna Ashta Koota', desc: 'Eight-fold Vedic compatibility checking mental, emotional, physiological, and spiritual harmony.', icon: Heart },
      { title: '🔄 Synastry Aspect Overlay', desc: 'Direct planetary angles between two natal charts (Venus-Mars, Sun-Moon, Saturn bonds).', icon: Activity },
      { title: '🐉 Chinese BaZi Match', desc: 'Four Pillars branch harmony (Trines, 6 Combinations, and Clashes).', icon: Sparkles },
      { title: '💬 Communication Rhythm', desc: 'Mercury and 3rd/7th house connections indicating conversation compatibility.', icon: BookOpen }
    ],
    howItWorks: [
      { step: '01', title: 'Input Partner Birth Data', desc: 'Both partners\' celestial positions are computed and aligned in UTC.' },
      { step: '02', title: 'Dual-Tradition Evaluation', desc: 'Calculates both Ashta Koota points (out of 36) and exact cross-chart aspects.' },
      { step: '03', title: 'Constructive Relationship Guidance', desc: 'Provides actionable insights to navigate natural differences harmoniously.' }
    ],
    faqs: [
      { q: 'What is a good Ashta Koota score?', a: 'Traditionally, 18+ points out of 36 is considered compatible, with 28+ points indicating very high emotional resonance.' },
      { q: 'Can incompatible charts still build a great relationship?', a: 'Yes. Astrology highlights natural tendencies; mutual commitment, communication, and emotional maturity are primary.' }
    ],
    relatedHubs: [
      { id: 'birth-chart', label: 'Birth Chart Calculator' },
      { id: 'vedic-astrology', label: 'Vedic Astrology' }
    ]
  },
  panchanga: {
    title: 'Live Vedic Panchanga Ephemeris',
    eyebrow: 'DAILY CELESTIAL TIMING & ALMANAC',
    headline: 'Tithi, Nakshatra, Yoga, Karana & Auspicious Muhurta Times',
    lead: 'The 5 limbs of the Vedic calendar calculated in real-time for any city worldwide using precise solar-lunar angular separations.',
    keyConcepts: [
      { title: '🌙 Tithi (Lunar Phase Day)', desc: '12° longitudinal separation between Sun and Moon across Shukla & Krishna pakshas.', icon: Sparkles },
      { title: '⭐ Nakshatra (Moon Mansion)', desc: 'The exact lunar constellation active during the current 24-hour window.', icon: Clock },
      { title: '⚡ Yoga (Luni-Solar Harmony)', desc: '27 mathematical additions of Sun and Moon longitudes indicating atmospheric vitality.', icon: Activity },
      { title: '🛡️ Rahu Kalam & Abhijit', desc: 'Daily planetary hour divisions indicating optimal and cautious action windows.', icon: ShieldCheck }
    ],
    howItWorks: [
      { step: '01', title: 'Geographic Solar Synchronization', desc: 'Computes local sunrise, sunset, and solar noon for the selected city coordinates.' },
      { step: '02', title: '5-Element Ephemeris Evaluation', desc: 'Deterministically evaluates the active Tithi, Nakshatra, Yoga, Karana, and Vaara.' },
      { step: '03', title: 'Daily Timing Windows', desc: 'Identifies Abhijit Muhurta (golden hour) and Rahu Kalam (caution hour).' }
    ],
    faqs: [
      { q: 'What are the 5 limbs of Panchanga?', a: 'Tithi (Lunar Day), Vaara (Solar Day), Nakshatra (Constellation), Yoga (Harmony), and Karana (Half-Tithi).' },
      { q: 'Does Panchanga vary by city?', a: 'Yes. Because sunrise and sunset times vary with latitude and longitude, Panchanga timing is location-specific.' }
    ],
    relatedHubs: [
      { id: 'vedic-astrology', label: 'Vedic Astrology' },
      { id: 'birth-chart', label: 'Birth Chart Calculator' }
    ]
  },
  methodology: {
    title: 'ASTRO360 Calculation Methodology',
    eyebrow: 'SCIENTIFIC INTEGRITY & TRANSPARENCY',
    headline: 'Deterministic Astronomical Computation & Explainable AI',
    lead: 'Discover how ASTRO360 calculates celestial positions and strictly separates mathematical astronomy from traditional symbolic interpretations.',
    keyConcepts: [
      { title: '🔭 JPL DE440 Ephemeris', desc: 'NASA JPL standard numerical ephemerides computing exact planetary coordinates.', icon: Cpu },
      { title: '🌐 UTC & Local Sidereal Time', desc: 'Accurate geographic timezone normalization and Greenwich Mean Sidereal Time conversion.', icon: Clock },
      { title: '📜 Classical Rule Verification', desc: 'Direct citation of Tier 1/2 classical texts (BPHS, Tetrabiblos, KP Reader).', icon: BookOpen },
      { title: '🤖 Explainable Translation AI', desc: 'AI summarizes calculated data in human language; it never invents chart values.', icon: ShieldCheck }
    ],
    howItWorks: [
      { step: '01', title: 'Input Normalization', desc: 'Birth data is converted into Julian Ephemeris Date and Delta T corrected coordinates.' },
      { step: '02', title: 'Astronomical Core', desc: 'Computes planetary longitudes, latitudes, declinations, and orbital velocities.' },
      { step: '03', title: 'Tradition Frameworks', desc: 'Applies user-selected system rules (Sidereal Lahiri, Tropical, KP Sub-Lords, BaZi).' }
    ],
    faqs: [
      { q: 'Does AI create or hallucinate my chart?', a: 'No. All planetary coordinates and mathematical houses are computed by deterministic ephemeris algorithms. AI is strictly used to translate the results into clear prose.' },
      { q: 'Are predictions guaranteed?', a: 'No. ASTRO360 presents astrological timing as symbolic cycles and probability themes, never as guaranteed deterministic fate.' }
    ],
    relatedHubs: [
      { id: 'birth-chart', label: 'Birth Chart Calculator' },
      { id: 'vedic-astrology', label: 'Vedic Astrology' },
      { id: 'western-astrology', label: 'Western Astrology' }
    ]
  }
};

export default function SEOTopicHub({
  hubId,
  onStartChart,
  onNavigate,
  userProfile
}: SEOTopicHubProps) {
  const content = HUB_CONTENT[hubId] || HUB_CONTENT['birth-chart'];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-left space-y-10">
      
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs font-mono text-slate-400 flex items-center gap-1.5 flex-wrap">
        <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">Home</button>
        <span>/</span>
        <span className="text-amber-400 font-bold">{content.title}</span>
      </nav>

      {/* 2. Hub Header */}
      <div className="space-y-3 border-b border-white/10 pb-6">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          {content.eyebrow}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {content.headline}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-mono">
          {content.lead}
        </p>
      </div>

      {/* 3. Primary Action Card (Interactive Quick Launcher) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/[0.08] shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Calculate Your Personalized {content.title}
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Deterministic calculations with instant multi-tradition insights.
            </p>
          </div>
          <button
            onClick={onStartChart}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm font-mono flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer shrink-0"
          >
            <span>Create My Chart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Key Concepts Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Key Concepts & Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.keyConcepts.map((concept, idx) => {
            const Icon = concept.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{concept.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{concept.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. How It Works Steps */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">How the Calculation Engine Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {content.howItWorks.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-2">
              <span className="text-xl font-black text-amber-400 font-mono">{step.step}</span>
              <h3 className="text-sm font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Accordion FAQs (Mobile-Optimized) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-2.5">
          {content.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-[#0F172A] border border-white/10">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <p className="pt-2.5 text-xs text-slate-300 leading-relaxed border-t border-white/5 mt-2.5">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Related Hubs */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block">
          EXPLORE RELATED TOPIC HUBS
        </span>
        <div className="flex flex-wrap gap-2">
          {content.relatedHubs.map((hub) => (
            <button
              key={hub.id}
              onClick={() => onNavigate(hub.id)}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              {hub.label} →
            </button>
          ))}
        </div>
      </div>

      {/* 8. Sticky Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-3 bg-[#090d16]/95 backdrop-blur-xl border-t border-white/10 z-30 flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-left">
          <span className="text-[11px] font-bold text-white block">Ready to explore?</span>
          <span className="text-[9px] font-mono text-slate-400 block">Instant calculation</span>
        </div>
        <button
          onClick={onStartChart}
          className="px-4 py-2 rounded-xl bg-white text-black font-semibold shadow-sm font-bold font-mono text-xs flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
        >
          <span>Calculate Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
