import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Search, Sparkles, Star, Award, 
  Volume2, Check, Copy, ShieldCheck, Compass, 
  Flame, Layers, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface ShlokaEntry {
  id: string;
  treatise: string;
  chapter: string;
  slokaNumber: string;
  topic: string;
  category: 'Raja Yoga' | 'Dignity' | 'Remedy' | 'Dasha' | 'Muhurta' | 'Longevity';
  devanagari: string;
  transliteration: string;
  wordByWord: Array<{ word: string; meaning: string }>;
  translation: string;
  practicalCommentary: string;
}

const CLASSICAL_SHLOKAS: ShlokaEntry[] = [
  {
    id: 'bphs-1',
    treatise: 'Brihat Parashara Hora Shastra',
    chapter: 'Chapter 35: Raja Yoga Adhyaya',
    slokaNumber: 'Sloka 1–2',
    topic: 'Kendra-Trikona Lord Association (Sovereign Authority)',
    category: 'Raja Yoga',
    devanagari: 'केन्द्राधिपाश्च त्रिकोणाधिपाश्च परस्परं सम्बन्धेन राजयोगा भवन्ति।',
    transliteration: 'kendrādhipāśca trikoṇādhipāśca parasparaṁ sambandhena rājayogā bhavanti.',
    wordByWord: [
      { word: 'kendrādhipāḥ', meaning: 'Lords of Quadrants (1, 4, 7, 10)' },
      { word: 'trikoṇādhipāḥ', meaning: 'Lords of Trines (1, 5, 9)' },
      { word: 'parasparaṁ', meaning: 'Mutually / Together' },
      { word: 'sambandhena', meaning: 'Through conjunction, aspect, or mutual reception' },
      { word: 'rājayogāḥ', meaning: 'Royal / Sovereign Yoga (Supreme prosperity and power)' },
      { word: 'bhavanti', meaning: 'Are produced' },
    ],
    translation: 'When the lords of the Kendra houses (Vishnu sthanas: 1, 4, 7, 10) and Trikona houses (Lakshmi sthanas: 1, 5, 9) establish a mutual connection through conjunction, mutual aspect, or sign exchange, supreme Raja Yoga is formed.',
    practicalCommentary: 'This is the universal foundation of Vedic prosperity. Kendra lords provide executive action and structural capacity, while Trikona lords supply divine grace (Bhagya) and merit from past lives (Purva Punya).'
  },
  {
    id: 'phaladeepika-1',
    treatise: 'Phaladeepika by Mantreswara',
    chapter: 'Chapter 6: Yoga Adhyaya',
    slokaNumber: 'Sloka 26–27',
    topic: 'Neechabhanga Raja Yoga (Cancellation of Debilitation into Exaltation)',
    category: 'Raja Yoga',
    devanagari: 'नीचस्थितो जन्मनि यो ग्रहस्तद्राशीश्वरो वा तदुच्चनाथः। चन्द्राल्लग्नादपि केन्द्रवर्ती राजा भवेद् धार्मिकचक्रवर्ती॥',
    transliteration: 'nīcasthito janmani yo grahastadrāśīśvaro vā taduccanāthaḥ, candrāllagnādapi kendravartī rājā bhaved dhārmikacakravartī.',
    wordByWord: [
      { word: 'nīcasthitaḥ', meaning: 'A planet situated in its sign of debilitation' },
      { word: 'rāśīśvaraḥ', meaning: 'The dispositor lord of that debilitation sign' },
      { word: 'taduccanāthaḥ', meaning: 'The exaltation lord of that same sign' },
      { word: 'kendravartī', meaning: 'Placed in Kendra (1, 4, 7, 10) from Lagna or Moon' },
      { word: 'rājā bhavet', meaning: 'The native becomes an imperial sovereign leader' },
    ],
    translation: 'If a planet is debilitated at birth, but either the lord of that sign or the planet that gets exalted in that sign is in a Kendra (1, 4, 7, 10) from the Ascendant or the Moon, the debilitation is completely cancelled and transforms into an imperial Raja Yoga.',
    practicalCommentary: 'Explains why luminaries like Albert Einstein (debilitated Mercury cancelled by exalted Venus in 10th) rise from intense early friction to monumental historical triumph.'
  },
  {
    id: 'saravali-1',
    treatise: 'Saravali by Kalyana Varma',
    chapter: 'Chapter 35: Pancha Mahapurusha Yogas',
    slokaNumber: 'Sloka 1–4',
    topic: 'Ruchaka Yoga (Exalted Mars in Quadrant)',
    category: 'Dignity',
    devanagari: 'स्वक्षेत्रे यदि वोच्चसंस्थिते कुजे केन्द्रगते रुचकसंज्ञको योगः। दीर्घास्यो बहुसाहसी विजयवान् सेनापतिर्भूपतिः॥',
    transliteration: 'svakṣetre yadi voccasaṁsthite kuje kendragate rucakasaṁjñako yogaḥ, dīrghāsyo bahusāhasī vijayavān senāpatirbhūpatiḥ.',
    wordByWord: [
      { word: 'svakṣetre', meaning: 'In its own sign (Aries or Scorpio)' },
      { word: 'voccasaṁsthite', meaning: 'Or in its sign of exaltation (Capricorn)' },
      { word: 'kendragate', meaning: 'Situated in a Kendra quadrant (1, 4, 7, 10)' },
      { word: 'rucakasaṁjñakaḥ', meaning: 'Known by the name Ruchaka' },
      { word: 'bahusāhasī', meaning: 'Endowed with supreme courage and daring conquest' },
    ],
    translation: 'When Mars occupies its own sign (Aries/Scorpio) or its exaltation sign (Capricorn) in a Kendra from the Ascendant, Ruchaka Mahapurusha Yoga is created. The person possesses extraordinary valor, physical endurance, strategic mastery, and supreme leadership.',
    practicalCommentary: 'Gives relentless stamina in business, military leadership, competitive sports, and engineering conquest.'
  },
  {
    id: 'tetrabiblos-1',
    treatise: 'Tetrabiblos by Claudius Ptolemy',
    chapter: 'Book III: On the Native Quality of the Soul',
    slokaNumber: 'Chapter 13',
    topic: 'Mercury-Moon Angular Aspect Dynamics',
    category: 'Dignity',
    devanagari: '— Classical Greek Hellenistic Treatise —',
    transliteration: 'Mercury and Moon in configuration to the Ascendant determine the rational intellectual and psychic constitution of the soul.',
    wordByWord: [
      { word: 'Mercury (Hermes)', meaning: 'Rational calculation, language, commerce and logic' },
      { word: 'Moon (Selene)', meaning: 'Instinctual memory, subconscious impressions and empathy' },
      { word: 'Trine / Sextile', meaning: 'Harmonious integration of intellect with emotional depth' },
      { word: 'Square / Opposition', meaning: 'Sharp internal friction generating revolutionary discoveries' },
    ],
    translation: 'When Mercury and the Moon are in harmonious configuration while well-placed from the Angles (Cardinals), the native possesses remarkable intellectual sharpness, rapid linguistic comprehension, and profound communicative eloquence.',
    practicalCommentary: 'Ptolemy established that the rational soul operates via the dual balance between mercurial calculation and lunar subconscious intuition.'
  }
];

export default function ClassicalShlokaLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedShloka, setSelectedShloka] = useState<ShlokaEntry>(CLASSICAL_SHLOKAS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredShlokas = CLASSICAL_SHLOKAS.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.treatise.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.devanagari.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleCopy = (shloka: ShlokaEntry) => {
    const text = `${shloka.treatise} (${shloka.chapter}, ${shloka.slokaNumber})\n${shloka.devanagari}\n${shloka.transliteration}\n\nTranslation: ${shloka.translation}\n\nCommentary: ${shloka.practicalCommentary}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(shloka.id);
      toast.success('Classical scripture citation copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-bold">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Classical Scripture & Sutra Repository</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            CLASSICAL SHLOKA & TREATISE LIBRARY
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Original Devanagari Sanskrit verses, romanized transliterations, and word-by-word grammatical breakdowns from foundational scriptures.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex flex-wrap gap-1.5 bg-[#060A12] p-1.5 rounded-2xl border border-white/10">
          {['all', 'Raja Yoga', 'Dignity', 'Remedy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-sm font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sutras, treatises, or topics..."
            className="w-full bg-[#0B1220] border border-white/12 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
          />
        </div>
      </div>

      {/* Main Two-Column Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Shloka Selector List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[540px] overflow-y-auto custom-scrollbar pr-1 font-mono text-xs">
          {filteredShlokas.map((shloka) => {
            const isSelected = selectedShloka.id === shloka.id;
            return (
              <button
                key={shloka.id}
                onClick={() => setSelectedShloka(shloka)}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-white text-black font-semibold shadow-sm border-amber-400 shadow-lg font-bold'
                    : 'bg-[#0B1220] text-slate-300 hover:text-white border-white/8 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                    isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-white/5 text-amber-300'
                  }`}>
                    {shloka.category}
                  </span>
                  <span className="text-[10px] opacity-80">{shloka.slokaNumber}</span>
                </div>
                <strong className="text-xs block leading-tight truncate">{shloka.topic}</strong>
                <span className="text-[11px] font-sans opacity-80 block truncate">{shloka.treatise}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Shloka Breakdown Viewer */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-5 font-mono text-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase block">{selectedShloka.treatise} • {selectedShloka.chapter}</span>
              <h3 className="text-sm sm:text-base font-bold text-white font-sans">{selectedShloka.topic}</h3>
            </div>
            <button
              onClick={() => handleCopy(selectedShloka)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 w-fit"
            >
              {copiedId === selectedShloka.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === selectedShloka.id ? 'Copied' : 'Cite Verse'}</span>
            </button>
          </div>

          {/* Original Devanagari Box */}
          <div className="p-4 rounded-2xl bg-[#060A12] border border-white/[0.08] text-center space-y-2">
            <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest block">Original Sanskrit Devanagari</span>
            <p className="text-base sm:text-lg font-serif text-amber-200 leading-relaxed font-bold tracking-wide">
              {selectedShloka.devanagari}
            </p>
            <p className="text-xs text-slate-400 font-sans italic">
              {selectedShloka.transliteration}
            </p>
          </div>

          {/* Word-by-Word Sanskrit Breakdown */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Word-by-Word Grammatical Etymology:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedShloka.wordByWord.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#060A12] border border-white/6 space-y-0.5">
                  <strong className="text-amber-300 text-xs block">{item.word}</strong>
                  <span className="text-slate-300 text-[11px] font-sans block">{item.meaning}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Translation */}
          <div className="p-4 rounded-2xl bg-white/3 border border-white/6 space-y-1 font-sans">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Canonical English Translation:</span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{selectedShloka.translation}</p>
          </div>

          {/* Practical Astrological Application */}
          <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/15 space-y-1 font-sans">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">Practical Predictive Commentary:</span>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedShloka.practicalCommentary}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
