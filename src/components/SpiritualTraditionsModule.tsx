import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, BookOpen, Globe2, Sparkles, HelpCircle, Search, 
  Info, Compass, Feather, History, Flame, Moon, Sun, Scroll, CheckCircle2, 
  Send, AlertCircle, ChevronDown, ChevronUp, Layers, Heart, MessageSquare
} from 'lucide-react';
import type { UserProfile } from '../types';

interface SpiritualTraditionsModuleProps {
  userProfile: UserProfile;
}

interface RegionalTradition {
  id: string;
  region: string;
  icon: string;
  title: string;
  summary: string;
  keyPractices: string[];
  historicalTexts: string[];
  ethicalNotes: string;
}

interface ProtectiveSymbol {
  name: string;
  origin: string;
  symbol: string;
  historicalMeaning: string;
  traditionalUse: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function SpiritualTraditionsModule({ userProfile }: SpiritualTraditionsModuleProps) {
  // Navigation Subsections
  const [activeSubsection, setActiveSubsection] = useState<string>('overview');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // AI Knowledge Assistant State
  const [aiPromptInput, setAiPromptInput] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // FAQ Accordion Toggle State
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Disclaimer Text
  const DISCLAIMER = "This section is provided for educational and cultural purposes. The platform does not claim to detect, confirm, or verify supernatural activity or black magic. If you are experiencing significant distress, fear, or mental health concerns, consider speaking with a trusted religious leader, counselor, or healthcare professional as appropriate.";

  // 10 Cultural Regions Catalog
  const regionalTraditions: RegionalTradition[] = [
    {
      id: 'islamic',
      region: 'Islamic Traditions',
      icon: '🌙',
      title: 'Islamic Perspectives on Protection & Rukyah (الرقية الشرعية)',
      summary: 'Focuses on Tawhid (Monotheism), recitation of Quranic verses (Ayat al-Kursi, Surah Al-Falaq, Surah An-Nas), morning & evening Adhkar, and Ruqyah Shar\'iyyah as traditional faith-based spiritual protection.',
      keyPractices: ['Recitation of Al-Mu\'awwidhatayn', 'Daily Morning/Evening Adhkar', 'Giving Sadaqah (Charity)', 'Invocation of Ayat al-Kursi'],
      historicalTexts: ['Quran', 'Sahih al-Bukhari', 'Kitab al-Tawhid', 'Hisn al-Muslim'],
      ethicalNotes: 'Strict prohibition of sorcery (Sihr) or reliance on fortune-tellers; complete reliance placed solely on God (Tawakkul).'
    },
    {
      id: 'hindu',
      region: 'Hindu Traditions',
      icon: '🕉️',
      title: 'Vedic & Hindu Protective Mantras & Yantras',
      summary: 'Utilizes Vedic mantras (Gayatri Mantra, Mahamrityunjaya Mantra), sacred geometry (Yantras), and ritual offerings (Puja) to maintain energetic purity and dispel negative forces (Nazar/Buri Nazar).',
      keyPractices: ['Mahamrityunjaya Mantra Chanting', 'Wearing Kavach / Sacred Threads', 'Lighting Diya Lamps', 'Sanskrit Yantra Meditation'],
      historicalTexts: ['Rigveda', 'Atharvaveda', 'Agni Purana', 'Garuda Purana'],
      ethicalNotes: 'Adherence to Satya (truthfulness) and Ahimsa (non-harming); spiritual purification as a path to Moksha.'
    },
    {
      id: 'eastern-folk',
      region: 'Eastern & Asian Folk Traditions',
      icon: '🪔',
      title: 'Eastern Folk Healing, Protective Symbols & Earth Remedies',
      summary: 'Employs regional folk practices such as herbal warding, energetic salt cleanses, mineral protection, and protective amulets across traditional worldwide communities.',
      keyPractices: ['Energetic Cleansing with Rock Salt & Herbs', 'Protective Mineral Amulets & Talismans', 'Sacred Protective Threads', 'Natural Botanical Herb Diffusions'],
      historicalTexts: ['Traditional Pharmacopoeias', 'Regional Healing Epics', 'Ancient Herbal Compendiums'],
      ethicalNotes: 'Ancestral folk traditions passed down through generations to cultivate domestic harmony and grounding.'
    },
    {
      id: 'buddhist',
      region: 'Buddhist Traditions',
      icon: '☸️',
      title: 'Buddhist Paritta Recitations & Mindfulness Protection',
      summary: 'Emphasizes Paritta (protective chants), Metta (loving-kindness meditation), and mindfulness to cultivate inner peacefulness, dissolve fear, and radiate compassion to all sentient beings.',
      keyPractices: ['Metta Bhavana (Loving-Kindness Meditation)', 'Karaniya Metta Sutta Recitation', 'Tibetan Prayer Wheels', 'Blessed Sacred Cord (Sai Sin)'],
      historicalTexts: ['Pali Canon (Sutta Pitaka)', 'Visuddhimagga', 'Tibetan Book of the Dead'],
      ethicalNotes: 'Protection is achieved by purifying one\'s own mind and harboring goodwill toward all beings.'
    },
    {
      id: 'christian',
      region: 'Christian Historical Perspectives',
      icon: '✝️',
      title: 'Christian Historical Traditions & Scriptural Prayers',
      summary: 'Historical practices centered around the Lord\'s Prayer, Psalms of David (e.g. Psalm 91), the Sign of the Cross, and traditional saintly intercessions for spiritual defense.',
      keyPractices: ['Recitation of Psalm 91 & Psalm 23', 'Sign of the Cross', 'Anointing with Olive Oil', 'Lighting Votive Candles'],
      historicalTexts: ['The Holy Bible', 'Early Church Fathers Canon', 'Book of Common Prayer'],
      ethicalNotes: 'Emphasis on faith, grace, forgiveness, and moral integrity without engagement in folk divination.'
    },
    {
      id: 'african',
      region: 'African Traditional Beliefs',
      icon: '🌍',
      title: 'African Ancestral Reverence & Botanical Protection',
      summary: 'Rich traditions celebrating ancestral veneration, community drumming rituals, herbal baths, and protective talismans to preserve village harmony and spiritual alignment.',
      keyPractices: ['Ancestral Libations & Prayers', 'Herbal Cleansing Baths (Smudging)', 'Gris-Gris Protective Pouches', 'Community Drumming Circles'],
      historicalTexts: ['Ifa Divination Corpus', 'Oral Ancestral Histories', 'Ethnobotanical Folklore'],
      ethicalNotes: 'Reverence for nature elders, ancestral lineage, and communal equilibrium.'
    },
    {
      id: 'european',
      region: 'European Folklore',
      icon: '🏰',
      title: 'European Folklore & Traditional Folk Magic',
      summary: 'Historical European folk customs including rowan wood charms, horseshoe placements over doorways, salt lines, and seasonal hearth blessings across Celtic, Slavic, and Germanic lands.',
      keyPractices: ['Hanging Iron Horseshoes (Open Upward)', 'Rowan & Elderberry Charms', 'Sprinkling Salt at Thresholds', 'St. John\'s Wort Harvest Rituals'],
      historicalTexts: ['Grimm\'s Fairy Tales Folklore Collection', 'Carmina Gadelica', 'Slavic Folk Medicine Texts'],
      ethicalNotes: 'Historical domestic protection customs reflecting agricultural rhythms and household safety.'
    },
    {
      id: 'middle-eastern',
      region: 'Middle Eastern Traditions',
      icon: '🧿',
      title: 'Middle Eastern Nazar Amulets & Talismans',
      summary: 'Historical customs spanning the Mediterranean and Levant using cobalt blue Glass Nazar Boncuğu eyes, Hamsa hands, and aromatic frankincense (Bakhour) smoke cleansing.',
      keyPractices: ['Displaying Blue Glass Nazar Beads', 'Burning Frankincense / Sage Bakhour', 'Hamsa / Hand of Fatima Symbolism', 'Rosewater Hand Cleansing'],
      historicalTexts: ['Ottoman Cultural Records', 'Levantine Folk Documents', 'Mesopotamian Astronomical Tablets'],
      ethicalNotes: 'Cultural art forms and aesthetic traditions created to ward off envy and foster welcoming hospitality.'
    },
    {
      id: 'east-asian',
      region: 'East Asian Traditions',
      icon: '☯️',
      title: 'East Asian Feng Shui & Taoist Fulu Talismans',
      summary: 'Incorporates Taoist Fulu paper talismans, Bagua mirrors, cinnabar seals, and 5-element spatial Feng Shui to harmonize home environments and balance Yin-Yang energies.',
      keyPractices: ['Hanging Convex Bagua Mirrors', 'Burning Ceremonial Sage / Incense', 'Displaying Jade Amulets', 'Taoist Fulu Yellow Paper Calligraphy'],
      historicalTexts: ['I Ching (Book of Changes)', 'Tao Te Ching', 'Yellow Emperor\'s Inner Canon'],
      ethicalNotes: 'Harmonizing human environment with cosmic order (Dao) and natural elemental flows.'
    },
    {
      id: 'indigenous',
      region: 'Indigenous Traditions',
      icon: '🪶',
      title: 'Indigenous Native Traditions & Sacred Herbs',
      summary: 'Sacred ceremonies using White Sage smudging, Sweetgrass braiding, Feather cleansing, and Medicine Wheel meditations honoring Mother Earth and the Four Cardinal Directions.',
      keyPractices: ['Sage & Sweetgrass Smudging', 'Medicine Wheel Meditation', 'Sacred Pipe Ceremony', 'Dreamcatcher Weaving'],
      historicalTexts: ['Indigenous Oral Stories', 'Tribal Elder Knowledge', 'Ethnobotanical Wisdom'],
      ethicalNotes: 'Deep reverence for all living relatives (Mitakuye Oyasin), nature conservation, and sacred earth stewardship.'
    }
  ];

  // Protective Symbol Library
  const protectiveSymbols: ProtectiveSymbol[] = [
    { name: 'Nazar Amulet (Eye Bead)', origin: 'Middle East & Mediterranean', symbol: '🧿', historicalMeaning: 'Cobalt blue glass eye designed to reflect envious looks back to the sender.', traditionalUse: 'Hung over front doors or worn as jewelry to symbolize protection against malicious envy.' },
    { name: 'Hamsa / Hand of Fatima', origin: 'Middle East & North Africa', symbol: '✋', historicalMeaning: 'Open right hand representing protection, strength, and blessings across Islamic & Levantine cultures.', traditionalUse: 'Carved into wall plaques or worn as amulets for peace and security.' },
    { name: 'Sacred Om (Aum 🕉️)', origin: 'India & Vedic Tradition', symbol: '🕉️', historicalMeaning: 'Primordial cosmic sound vibration of the universe, embodying creation and divine presence.', traditionalUse: 'Inscribed on altars, doorways, and worn as pendant to promote spiritual harmony.' },
    { name: 'Endless Knot (Srivatsa)', origin: 'Buddhist & Himalayan', symbol: '♾️', historicalMeaning: 'Intertwined line representing infinite wisdom, compassion, and the interconnectedness of all things.', traditionalUse: 'Used in sacred banners and wall art to invite eternal auspiciousness.' },
    { name: 'Triquetra (Trinity Knot)', origin: 'Celtic & European', symbol: '☘️', historicalMeaning: 'Three interconnected loops symbolizing mind-body-spirit and land-sea-sky triplicities.', traditionalUse: 'Carved on stone monuments and wooden charms for ancestral protection.' },
    { name: 'Seal of Solomon / Hexagram', origin: 'Levantine & Middle Eastern', symbol: '✡️', historicalMeaning: 'Interlocking triangles representing the harmony between heaven and earth.', traditionalUse: 'Inscribed in medieval manuscripts and talismans for wisdom and protection.' }
  ];

  // FAQ Accordions
  const faqItems: FAQItem[] = [
    {
      category: 'General Understanding',
      question: 'What is the historical meaning of the Evil Eye (Nazar)?',
      answer: 'The Evil Eye is one of humanity\'s oldest and most widespread folklore concepts, dating back to ancient Mesopotamia and Greece. It refers to the traditional belief that a glance of intense envy or unexpressed jealousy can cause unintentional misfortune. Cultural remedies such as the blue glass Nazar bead or Hamsa hand evolved as symbolic shields to express community solidarity and encouragement of modesty.'
    },
    {
      category: 'Cultural Context',
      question: 'How is black magic described in different historical cultures?',
      answer: 'Historically, black magic was defined in various cultures as any ritual practice intended to harm others, manipulate free will, or cause illness. Anthropologists note that these historical concepts often reflected societal anxieties, agricultural uncertainty, or unexplained medical conditions prior to modern medicine. Most spiritual traditions strictly condemn black magic and advocate positive, ethical living.'
    },
    {
      category: 'Faith & Tradition',
      question: 'What are Islamic perspectives on spiritual harm and protection?',
      answer: 'In Islamic theology, spiritual harm is acknowledged, but believers are taught that nothing can occur except by God\'s ultimate permission. Protection relies on Tawhid (faith in One God), recitation of Quranic chapters (such as Surah Al-Falaq and Surah An-Nas), daily Adhkar prayers, giving charity (Sadaqah), and maintaining ethical conduct.'
    },
    {
      category: 'Vedic Practices',
      question: 'What protective traditions exist in Hinduism?',
      answer: 'Hindu traditions include chanting Vedic mantras (such as the Mahamrityunjaya Mantra), placing Nazar Battu symbols at home entryways, wearing protective threads (Kala Dhaga), performing Pujas, and lighting brass oil lamps (Diyas). These practices aim to purify the home\'s energetic atmosphere and promote peace (Shanti).'
    },
    {
      category: 'Symbolism',
      question: 'What does folklore say about protective symbols like horseshoes or sage?',
      answer: 'In European folklore, iron horseshoes were hung over doors because iron was traditionally believed to repel ill-intentioned spirits. In Native American and indigenous traditions, burning white sage or sweetgrass is a sacred ceremonial practice used to cleanse spaces and promote spiritual clarity.'
    }
  ];

  // Filtered Regional Traditions
  const filteredTraditions = useMemo(() => {
    return regionalTraditions.filter(item => {
      const matchesRegion = selectedRegionFilter === 'all' || item.id === selectedRegionFilter;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegionFilter, searchQuery]);

  // AI Knowledge Assistant Query Handler
  const handleAskAiAssistant = (queryPrompt?: string) => {
    const promptToUse = queryPrompt || aiPromptInput;
    if (!promptToUse.trim()) return;

    setIsAiLoading(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsAiLoading(false);
      const lower = promptToUse.toLowerCase();
      
      if (lower.includes('evil eye') || lower.includes('nazar')) {
        setAiResponse(`📜 **Historical & Cultural Context of the Evil Eye (Nazar):**\n\nThe concept of the Evil Eye spans over 5,000 years across Middle Eastern, Mediterranean, South Asian, and Latin American cultures. Historically, it reflects a human psychological response to unexplained misfortune or perceived envy. Cultural protections—such as the cobalt blue Nazar bead, the Hamsa hand, or salt-cleansing rituals—serve as symbolic cultural markers promoting modesty, gratitude, and community protection.\n\n*Note: This platform presents this content strictly from a historical and comparative cultural perspective.*`);
      } else if (lower.includes('black magic') || lower.includes('dark magic')) {
        setAiResponse(`📜 **Comparative Cultural History of Black Magic:**\n\nAcross ancient European, Middle Eastern, and Asian historical records, "black magic" denoted any secret or forbidden ritual intended to cause harm or coercion. In historical anthropological studies, claims of black magic often arose during periods of crop failure, unexplained epidemics, or social conflict. Major world religions (Islam, Hinduism, Christianity, Buddhism) historically prohibited sorcery and instead promoted ethical spiritual practices, prayer, and charity.\n\n*Note: This platform presents this content strictly from an educational and historical perspective.*`);
      } else if (lower.includes('hindu') || lower.includes('vedic')) {
        setAiResponse(`📜 **Hindu & Vedic Protective Traditions:**\n\nHindu traditions feature a rich tapestry of protective practices grounded in Vedic literature:\n1. **Sacred Mantras**: Recitation of the Mahamrityunjaya Mantra and Gayatri Mantra for peace and vitality.\n2. **Yantras & Geometry**: Visual concentration on copper or gold-plated Yantras.\n3. **Folk Customs**: Nazar Battu (lemon-chili charms) and rock-salt cleansing (Nazar Utarna).\n4. **Ethical Living**: Emphasis on Satya (truth) and Ahimsa (non-violence).\n\n*Note: All practices are documented as faith-based traditional customs.*`);
      } else if (lower.includes('islam') || lower.includes('quran')) {
        setAiResponse(`📜 **Islamic Perspectives on Spiritual Protection:**\n\nIn Islamic tradition, spiritual well-being is rooted in Tawhid (monotheism) and reliance on Allah alone (Tawakkul):\n1. **Quranic Verses**: Recitation of Ayat al-Kursi, Surah Al-Falaq, and Surah An-Nas.\n2. **Prophetic Prayers (Rukyah)**: Authentic supplications from Hadith literature.\n3. **Charity (Sadaqah)**: Giving to those in need to seek divine favor.\n4. **Prohibition**: Strict rejection of amulets claiming independent magic power, astrologers, or sorcery.\n\n*Note: Documented for educational and comparative religious studies.*`);
      } else {
        setAiResponse(`📜 **Educational Response for "${promptToUse}":**\n\nSpiritual and cultural traditions around the world share universal human themes: a desire for safety, inner peace, moral grounding, and community connection. Across historical eras, different cultures developed unique symbols, prayers, and rituals to express their faith and navigate life's uncertainties.\n\n*This section provides historical, comparative, and cultural context without making supernatural assertions.*`);
      }
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-left">
      {/* 📜 ANCIENT MANUSCRIPT HEADER */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-600/20 via-orange-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Scroll className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Educational & Cultural Module</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Spiritual Traditions & <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Cultural Beliefs</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Explore humanity\'s rich heritage of traditional beliefs, protective symbols, historical rituals, and regional folklore across 10 world cultural traditions. Presented strictly from an educational and comparative perspective.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-white/[0.12] text-xs font-mono font-bold">
              📚 EDUCATIONAL ENCYCLOPEDIA
            </span>
          </div>
        </div>

        {/* ⚠️ REQUIRED DISCLAIMER BANNER */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-white/[0.08] text-amber-200/90 text-xs flex items-start gap-3 relative z-10 leading-relaxed font-sans shadow-inner">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 block mb-1 uppercase font-mono tracking-wider text-[11px]">Educational Disclaimer</span>
            {DISCLAIMER}
          </div>
        </div>

        {/* 11 SUBSECTIONS NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 relative z-10">
          {[
            { id: 'overview', label: '📜 Overview & Traditions' },
            { id: 'nazar', label: '🧿 Evil Eye (Nazar)' },
            { id: 'symbols', label: '🛡️ Protective Symbols' },
            { id: 'prayers', label: '🤲 Prayers & Mantras' },
            { id: 'cleansing', label: '🌿 Cleansing Rituals' },
            { id: 'world-practices', label: '🌍 World Practices' },
            { id: 'black-magic-history', label: '📜 Black Magic History' },
            { id: 'white-magic-history', label: '🕊️ White Magic Traditions' },
            { id: 'folk-healing', label: '🪔 Folk Healing' },
            { id: 'glossary', label: '📖 Spiritual Glossary' },
            { id: 'faq', label: '❓ FAQ Accordion' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubsection(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSubsection === tab.id
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-500/10'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🤖 AI KNOWLEDGE ASSISTANT SECTION */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider font-mono">
          <Sparkles className="w-5 h-5" /> AI Spiritual & Cultural Knowledge Assistant
        </div>
        <p className="text-xs text-slate-300">
          Ask questions regarding historical practices, comparative religious beliefs, or folklore symbols. The assistant provides historical context without supernatural verification.
        </p>

        {/* Quick Question Presets */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            "What is the historical meaning of the evil eye?",
            "How is black magic described in different cultures?",
            "What protective traditions exist in Hinduism?",
            "What are Islamic perspectives on spiritual harm?",
            "What does folklore say about protective symbols?"
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleAskAiAssistant(preset)}
              className="text-[11px] px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 transition-all text-left cursor-pointer"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={aiPromptInput}
            onChange={(e) => setAiPromptInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskAiAssistant()}
            placeholder="Ask a historical or cultural question..."
            className="flex-1 bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500/50"
          />
          <button
            onClick={() => handleAskAiAssistant()}
            disabled={isAiLoading}
            className="px-5 py-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-white/[0.12] hover:bg-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Ask AI
          </button>
        </div>

        {/* AI Output Response Box */}
        <AnimatePresence>
          {isAiLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-2xl bg-slate-950 border border-white/[0.08] text-xs text-amber-300 flex items-center gap-3">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Analyzing historical manuscripts and folklore databases...</span>
            </motion.div>
          )}

          {aiResponse && !isAiLoading && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-slate-950 border border-white/[0.08] text-xs text-slate-200 leading-relaxed font-sans space-y-2 whitespace-pre-line">
              {aiResponse}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SUBSECTION VIEWS SWITCHER */}
      {/* 📜 SUBSECTION 1: OVERVIEW & 10 CULTURAL REGIONS */}
      {(activeSubsection === 'overview' || activeSubsection === 'world-practices') && (
        <div className="space-y-6">
          {/* Region Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-white">Filter by Cultural Region:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedRegionFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                  selectedRegionFilter === 'all' ? 'bg-amber-500/25 text-amber-300 border border-white/[0.12]' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                All 10 Regions
              </button>
              {regionalTraditions.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegionFilter(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    selectedRegionFilter === r.id ? 'bg-amber-500/25 text-amber-300 border border-white/[0.12]' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {r.icon} {r.region}
                </button>
              ))}
            </div>
          </div>

          {/* Regional Traditions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTraditions.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 hover:border-white/[0.12] transition-all"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-white text-base">{item.title}</h3>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">{item.region}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.summary}</p>

                {/* Key Traditional Practices */}
                <div className="space-y-1.5 border-t border-white/10 pt-3">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Traditional Practices (Faith-Based):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.keyPractices.map((practice, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                        {practice}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Historical Texts & Ethical Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Historical Texts</span>
                    <p className="text-slate-300">{item.historicalTexts.join(', ')}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-amber-400 uppercase font-bold block">Ethical Perspective</span>
                    <p className="text-slate-300">{item.ethicalNotes}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 🧿 SUBSECTION 2: EVIL EYE (NAZAR) TRADITIONS */}
      {activeSubsection === 'nazar' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="text-4xl">🧿</span>
            <div>
              <h2 className="text-2xl font-bold text-white">Evil Eye (Nazar) Traditions Across History</h2>
              <p className="text-xs text-slate-300 mt-1">Comparative study of Nazar amulets, folklore remedies, and cultural intentions worldwide.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono">1. Historical Origins</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Earliest records trace back to Sumerian cuneiform tablets (3000 BCE) and classical Mediterranean literature. Believed to arise from unconscious envy or excessive praise.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase font-mono">2. Symbolic Artifacts</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                The cobalt-blue glass Nazar Boncuğu (Turkey/Greece) and the Hamsa Hand (Middle East/North Africa) are widely used decorative items designed to promote gratitude and safety.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase font-mono">3. Cultural Cleansing Customs</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Traditional practices include burning frankincense, salt-waving customs (Nazar Utarna in India), and reciting protective prayers in Abrahamic and Eastern faiths.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 🛡️ SUBSECTION 3: PROTECTIVE SYMBOLS GALLERY */}
      {activeSubsection === 'symbols' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-amber-400" /> Historical Protective Symbol Library
            </h2>
            <p className="text-xs text-slate-300">Detailed historical meaning and traditional usage of ancient global protective emblems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protectiveSymbols.map((sym, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 hover:border-white/[0.12] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{sym.symbol}</span>
                  <span className="text-[10px] font-mono text-amber-400 uppercase bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">{sym.origin}</span>
                </div>
                <h3 className="font-bold text-lg text-white">{sym.name}</h3>
                <div className="space-y-2 text-xs">
                  <p className="text-slate-300"><strong className="text-amber-300">Historical Meaning:</strong> {sym.historicalMeaning}</p>
                  <p className="text-slate-300"><strong className="text-emerald-300">Traditional Use:</strong> {sym.traditionalUse}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 📜 SUBSECTION 7 & 8: HISTORICAL BLACK & WHITE MAGIC TRADITIONS */}
      {(activeSubsection === 'black-magic-history' || activeSubsection === 'white-magic-history') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white">
              {activeSubsection === 'black-magic-history' ? '📜 History of Black Magic Traditions' : '🕊️ History of White Magic & Folk Healing'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">Educational analysis of historical beliefs, grimoires, social perspectives, and ethical codes.</p>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
            <p>
              In academic history and religious studies, magic traditions are generally categorized by intent and social perception. Historical "black magic" denoted rituals intended to cause harm, coercion, or illness, whereas "white magic" and folk healing referred to beneficial practices like herbal remedies, harvest blessings, and protective charms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                <span className="font-bold text-rose-400 uppercase font-mono text-xs block">Historical Black Magic Concepts</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Attributed to illness or crop failure before modern medicine.</li>
                  <li>Strictly prohibited in major world religious codes.</li>
                  <li>Studied by historians to understand societal anxieties.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                <span className="font-bold text-emerald-400 uppercase font-mono text-xs block">White Magic & Folk Healing</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Incorporated herbalism, midwives\' lore, and seasonal prayers.</li>
                  <li>Focused on household protection, curing livestock, and peace.</li>
                  <li>Formed the historical foundation for modern botanical medicine.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 📖 SUBSECTION 10: SPIRITUAL GLOSSARY */}
      {activeSubsection === 'glossary' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" /> Spiritual & Folklore Glossary
            </h2>
            <p className="text-xs text-slate-300 mt-1">Key terms and historical definitions across global spiritual traditions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              { term: 'Rukyah (الرقية)', def: 'Islamic faith-based practice of reciting Quranic verses and authentic supplications for spiritual comfort.' },
              { term: 'Nazar Battu', def: 'North Indian folk amulet (such as a black thread or demon mask) used to ward off the evil eye.' },
              { term: 'Paritta', def: 'Buddhist Pali term for protective suttas recited to evoke peace and benevolent energy.' },
              { term: 'Smudging', def: 'Indigenous American ceremonial practice of burning sacred herbs (sage, cedar) to purify a space.' },
              { term: 'Yantra', def: 'Vedic sacred geometric diagrams used in meditation to focus spiritual attention.' },
              { term: 'Hamsa Hand', def: 'Middle Eastern palm-shaped amulet representing divine protection and blessing.' },
              { term: 'Fulu (符錄)', def: 'Taoist paper talismans inscribed with calligraphy for environmental harmony.' },
              { term: 'Tawakkul (توكل)', def: 'Islamic concept of complete trust and reliance on God alone for protection and provision.' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                <span className="font-bold text-amber-400 font-mono">{item.term}</span>
                <p className="text-slate-300">{item.def}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ❓ SUBSECTION 11: FREQUENTLY ASKED QUESTIONS */}
      {(activeSubsection === 'faq' || activeSubsection === 'prayers' || activeSubsection === 'cleansing' || activeSubsection === 'folk-healing') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-amber-400" /> Frequently Asked Questions & Traditions
            </h2>
            <p className="text-xs text-slate-300 mt-1">Educational answers regarding traditional beliefs and practices.</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => {
              const isExpanded = expandedFaqIndex === index;
              return (
                <div key={index} className="rounded-2xl bg-slate-950 border border-white/10 overflow-hidden transition-all">
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-300 transition-all cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                  </button>
                  {isExpanded && (
                    <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/5">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">Category: {faq.category}</span>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
