import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, BookOpen, Layers, Compass, ArrowRight, 
  CheckCircle2, ShieldCheck, Search, Star, Bookmark,
  ChevronRight, Scale, Eye, Activity
} from 'lucide-react';

interface LiveScriptureAndBhavaExplorerProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface ScriptureVerse {
  treatise: string;
  tradition: 'Vedic Jyotish' | 'Classical Hellenistic' | 'Medieval Islamic' | 'Panchanga';
  chapter: string;
  verse: string;
  originalText: string;
  transliteration?: string;
  translation: string;
  application: string;
}

const SCRIPTURE_VERSES_DATA: ScriptureVerse[] = [
  {
    treatise: 'Brihat Parashara Hora Shastra',
    tradition: 'Vedic Jyotish',
    chapter: 'Chapter 3 (Graha Gunas)',
    verse: 'Sloka 12',
    originalText: 'जीवो ज्ञानात्मको ज्ञेयः शुक्रः शुक्रप्रदः स्मृतः । शनैश्चरोऽतिदुःखस्य कारकः परिकीर्तितः ॥',
    transliteration: 'jīvo jñānātmako jñeyaḥ śukraḥ śukrapradaḥ smṛtaḥ | śanaiścaro\'tiduḥkhasya kārakaḥ parikīrtitaḥ ||',
    translation: 'Jupiter is the significator of divine wisdom and virtue; Venus bestows vitality, refinement, and beauty; Saturn is the master of endurance, patience, and karmic refinement through time.',
    application: 'Constitutes the core karakatwa principle used in ASTRO360 to evaluate life domains without algorithmic bias.'
  },
  {
    treatise: 'Phaladeepika by Mantreswara',
    tradition: 'Vedic Jyotish',
    chapter: 'Chapter 6 (Yogas)',
    verse: 'Sloka 28',
    originalText: 'केन्द्रे गुरौ लग्नगते शशाङ्कात् सौम्यैर्निरीक्षितयुते रिपुनीचहीनः ।',
    transliteration: 'kendre gurau lagnagate śaśāṅkāt saumyairnirīkṣitayute ripunīcahīnaḥ |',
    translation: 'When Jupiter occupies an angular house (Kendra) from the Moon or Ascendant, free from debilitation and aspected by benefics, it forms Gaja Kesari Yoga—granting enduring legacy, wisdom, and righteous prosperity.',
    application: 'Used in ASTRO360 to calculate high-tier leadership yogas and moral resilience indices.'
  },
  {
    treatise: 'Tetrabiblos by Claudius Ptolemy',
    tradition: 'Classical Hellenistic',
    chapter: 'Book I (Planetary Configurations)',
    verse: 'Section 13',
    originalText: 'Τῶν δὲ σχηματισμῶν οἱ μὲν συμφωνοῦσιν, οἱ δὲ ἀσυμφωνοῦσιν...',
    translation: 'Of the geometric aspects, the trine and sextile harmonize elemental affinities, while the square and opposition generate active dynamism requiring disciplined integration.',
    application: 'Governs our Western Hellenistic aspect engine and synastry cross-aspect algorithms.'
  },
  {
    treatise: 'Kitab al-Mawalid by Abu Ma\'shar',
    tradition: 'Medieval Islamic',
    chapter: 'Firdaria Cycles & Time Lords',
    verse: 'Chapter 4',
    originalText: 'فردارية الكواكب تحكم أزمنة العمر بحسب المواليد النهارية والليلية...',
    translation: 'The planetary Firdaria govern the distinct chapters of human life, dividing nocturnal and diurnal births into structured periods of growth and destiny fulfillment.',
    application: 'Provides the time-lord planetary cycle engine integrated into ASTRO360 multi-tradition timelines.'
  }
];

const BHAVAS_12_DATA = [
  { num: 1, name: 'Tanu Bhava (1st)', title: 'Self, Vitality & Physical Persona', ruler: 'Sun / Mars', desc: 'Governs constitution, self-agency, head, brain, and life direction.' },
  { num: 2, name: 'Dhana Bhava (2nd)', title: 'Wealth, Speech & Family Values', ruler: 'Jupiter / Venus', desc: 'Accumulated assets, family heritage, vocal tone, food, and truthfulness.' },
  { num: 3, name: 'Sahaja Bhava (3rd)', title: 'Courage, Siblings & Enterprise', ruler: 'Mars / Mercury', desc: 'Hands-on initiative, writing, communication channels, short travel, and siblings.' },
  { num: 4, name: 'Sukha Bhava (4th)', title: 'Home, Mother & Emotional Peace', ruler: 'Moon', desc: 'Real estate, vehicles, maternal connection, heart sanctuary, and inner contentment.' },
  { num: 5, name: 'Putra Bhava (5th)', title: 'Intellect, Creativity & Past Merit', ruler: 'Jupiter', desc: 'Genius insight, speculative wisdom, children, mantras, and Poorva Punya.' },
  { num: 6, name: 'Ari Bhava (6th)', title: 'Health, Service & Overcoming Friction', ruler: 'Mars / Saturn', desc: 'Daily discipline, immune strength, resolving disputes, and professional service.' },
  { num: 7, name: 'Yuvati Bhava (7th)', title: 'Partnership, Marriage & Public Trade', ruler: 'Venus', desc: 'Spousal harmony, legal contracts, business partnerships, and diplomacy.' },
  { num: 8, name: 'Randhra Bhava (8th)', title: 'Transformation, Longevity & Deep Research', ruler: 'Saturn / Mars', desc: 'Metaphysical discoveries, occult insight, joint finances, and regeneration.' },
  { num: 9, name: 'Dharma Bhava (9th)', title: 'Higher Wisdom, Fortune & Purpose', ruler: 'Jupiter', desc: 'Spiritual philosophy, higher education, father, pilgrimage, and divine grace.' },
  { num: 10, name: 'Karma Bhava (10th)', title: 'Career, Status & Executive Authority', ruler: 'Sun / Mercury / Saturn', desc: 'Public reputation, leadership achievements, professional career, and vocation.' },
  { num: 11, name: 'Labha Bhava (11th)', title: 'Gains, Aspirations & Global Networks', ruler: 'Jupiter / Sun', desc: 'Financial compounding, large-scale ambitions, influential friends, and elder siblings.' },
  { num: 12, name: 'Vyaya Bhava (12th)', title: 'Moksha, Subconscious & Global Travel', ruler: 'Ketu / Jupiter', desc: 'Spiritual liberation, deep meditation, foreign lands, sleep sanctuary, and charity.' },
];

export default function LiveScriptureAndBhavaExplorer({
  onNavigateToTab,
  onStartOnboarding,
}: LiveScriptureAndBhavaExplorerProps) {
  const [activeTab, setActiveTab] = useState<'bhavas' | 'scriptures'>('bhavas');
  const [selectedBhavaNum, setSelectedBhavaNum] = useState<number>(10);
  const [selectedScriptureIndex, setSelectedScriptureIndex] = useState<number>(0);

  const selectedBhava = BHAVAS_12_DATA.find(b => b.num === selectedBhavaNum) || BHAVAS_12_DATA[9];
  const selectedScripture = SCRIPTURE_VERSES_DATA[selectedScriptureIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Classical Shastra & House Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            12 BHAVAS & SCRIPTURE REFERENCE LIBRARY
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Explore the 12 houses of life architecture and inspect word-for-word classical Sanskrit and Hellenistic scriptures backing every calculation.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {[
            { id: 'bhavas', label: '12 Life Houses (Bhavas)', icon: Layers },
            { id: 'scriptures', label: 'Scripture Verses Library', icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md'
                    : 'bg-[#0B1220] text-slate-400 hover:text-white border-white/8'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Box */}
        <div className="p-6 sm:p-9 rounded-2xl bg-[#0B1220] border border-white/12 shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: 12 BHAVAS LIFE NAVIGATOR */}
            {activeTab === 'bhavas' && (
              <motion.div
                key="bhavas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* 12 House Selector Buttons */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {BHAVAS_12_DATA.map((b) => {
                    const isSelected = selectedBhavaNum === b.num;
                    return (
                      <button
                        key={b.num}
                        onClick={() => setSelectedBhavaNum(b.num)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer min-h-[58px] ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8 hover:border-white/15'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold block">{b.name}</span>
                        <span className="text-[10px] font-sans opacity-80 block truncate mt-0.5">{b.title.split(',')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected House Deep-Dive Card */}
                <div className="p-6 sm:p-8 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-semibold">House Life Domain</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{selectedBhava.name} — {selectedBhava.title}</h3>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded bg-white/5 border border-white/10 text-cyan-300 w-fit">
                      Natural Karaka: {selectedBhava.ruler}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {selectedBhava.desc}
                  </p>

                  <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                    <span>Evaluates Kendra, Trikona, Dusthana & Upachaya Classifications</span>
                    <button
                      onClick={() => onNavigateToTab('birth-chart')}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Analyze All 12 Houses in Your Birth Chart</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SCRIPTURE REFERENCE LIBRARY */}
            {activeTab === 'scriptures' && (
              <motion.div
                key="scriptures"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SCRIPTURE_VERSES_DATA.map((s, idx) => {
                    const isSelected = selectedScriptureIndex === idx;
                    return (
                      <button
                        key={s.treatise}
                        onClick={() => setSelectedScriptureIndex(idx)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer min-h-[64px] ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8'
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold block truncate">{s.treatise}</span>
                        <span className="text-[10px] font-mono opacity-80 block truncate mt-0.5">{s.tradition}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-[#060A12] border border-white/8 space-y-4 text-left font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-semibold">Treatise Citation</span>
                      <h3 className="text-base font-bold text-white">{selectedScripture.treatise}</h3>
                      <span className="text-[11px] text-slate-400">{selectedScripture.chapter} • {selectedScripture.verse}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white text-xs font-bold w-fit">
                      {selectedScripture.tradition}
                    </span>
                  </div>

                  {/* Sanskrit / Greek / Arabic Original */}
                  <div className="p-4 rounded-xl bg-white/4 border border-white/8 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Original Shastra Text:</span>
                    <p className="text-sm text-amber-200 font-serif leading-relaxed">
                      {selectedScripture.originalText}
                    </p>
                    {selectedScripture.transliteration && (
                      <p className="text-[11px] text-slate-400 font-sans italic border-t border-white/6 pt-2">
                        {selectedScripture.transliteration}
                      </p>
                    )}
                  </div>

                  {/* English Translation */}
                  <div className="space-y-1.5 font-sans">
                    <span className="text-slate-400 text-[10px] font-mono uppercase font-bold block">Authoritative Translation:</span>
                    <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-white/2 border-l-2 border-amber-400 pl-3 py-2 rounded-r-lg">
                      "{selectedScripture.translation}"
                    </blockquote>
                  </div>

                  <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                    <span className="text-slate-400 font-sans text-xs">
                      ⚡ <strong>ASTRO360 Application:</strong> {selectedScripture.application}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
