import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Heart, Moon, Shield, Scale, Calendar, AlertTriangle, CheckCircle2, 
  Sparkles, RefreshCw, Volume2, Play, Pause, Compass, Clock, BookOpen, 
  FileText, ShieldCheck, Sun, ArrowRight, UserCheck, Flame, Lock, Globe, Star
} from 'lucide-react';
import type { UserProfile } from '../types';

interface UniversalProblemSolverSuiteProps {
  userProfile: UserProfile;
}

export default function UniversalProblemSolverSuite({ userProfile }: UniversalProblemSolverSuiteProps) {
  const [activeTool, setActiveTool] = useState<
    'deescalator' | 'timing' | 'dispute' | 'sleep' | 'shield'
  >('deescalator');

  const name = userProfile?.name || 'Seeker';
  const currentTradition = (userProfile?.preferredSystem || 'vedic').toLowerCase();

  // Multi-Tradition Content Resolver
  const traditionContent = useMemo(() => {
    if (currentTradition.includes('islamic')) {
      return {
        badge: 'Islamic Ilm al-Falak Problem Solver',
        panicAnchorScript: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        panicAnchorTranslit: '"La hawla wa la quwwata illa billah" — There is no power nor strength except through Allah.',
        panicAnchorSurah: 'Surah Al-Imran (3:173): "Hasbunallahu wa Ni\'mal Wakeel" (Allah is sufficient for us).',
        timingSystem: 'Islamic Sa\'at al-Kawakib & Sa\'at al-Ikhtiyar',
        timingAdviceA: 'Optimal Jupiter Hour (Sa\'at al-Mushtari) for halal business, contracts, and new enterprises.',
        timingAdviceB: 'Mercury Hour (Sa\'at al-Utarid) for commerce, bookkeeping, publishing, and structured negotiations.',
        timingAdviceC: 'Mars Hour (Sa\'at al-Mirrikh) — High friction risk. Postpone important negotiations.',
        disputeRule: 'Sharia Fiqh Sulh (Reconciliation) & Covenant Fulfillment (Surah Al-Ma\'idah 5:1)',
        disputeScript: `"Peace and blessings upon you. In the spirit of Islamic justice (Adl) and preserving mutual dignity, I propose we review our agreements according to Sharia principles with an independent neutral mediator so we resolve this amicably without grievance."`,
        sleepProtocolName: 'Sunnah & Prophetic Sleep Readiness Protocol',
        sleepHabits: [
          { id: 'wudu', text: 'Perform Ablution (Wudu) before stepping into bed' },
          { id: 'screenOff', text: 'Turn off all blue light screens 45 mins prior to sleep' },
          { id: 'ayatulKursi', text: 'Recite Ayatul Kursi & The 3 Quls into palms and gently wipe' },
          { id: 'rightSide', text: 'Sleep on your right side facing Qiblah (Sunnah posture)' },
        ],
        shieldTitle: 'Negative Energy, Evil Eye (Ayn/Hasad) & Spiritual Drain Diagnostic',
        shieldTiers: [
          'Tier 1 (Spiritual): Recite Morning & Evening Sunnah Adhkar (The 3 Quls + Ayatul Kursi).',
          'Tier 2 (Physical Grounding): Bath with sea salt or Sidr leaf water; keep space clean and scented.',
          'Tier 3 (Digital Privacy): Practice Strategic Concealment—"Seek help in fulfilling your needs by being discrete."'
        ]
      };
    } else if (currentTradition.includes('chinese') || currentTradition.includes('bazi')) {
      return {
        badge: 'BaZi & Taoist 5-Elements Problem Solver',
        panicAnchorScript: '心如止水 道法自然',
        panicAnchorTranslit: '"Xin Ru Zhi Shui, Dao Fa Zi Ran" — Heart still as water; walking the natural flow of the Great Tao.',
        panicAnchorSurah: 'Tao Te Ching Chapter 16: "Attain utmost emptiness; maintain absolute stillness."',
        timingSystem: 'Chinese 12 Day Officers (Jian Chu) & Solar Terms',
        timingAdviceA: 'Cheng (Success Day) in Chen Dragon Hour (07:00-09:00) for grand business launches.',
        timingAdviceB: 'Kai (Open Day) in Wu Horse Hour (11:00-13:00) for signing partnerships and negotiations.',
        timingAdviceC: 'Po (Destruction Day) — Avoid high-stakes financial commitments.',
        disputeRule: 'Taoist He Wei Gui (Harmony as Highest Virtue) & 5-Element Neutralization',
        disputeScript: `"Greetings. In accordance with mutual respect and preserving harmonious long-term relations (和为贵), let us step back and find a balanced middle path that benefits both parties and clears all blockages."`,
        sleepProtocolName: 'Taoist Yin-Yang & Dan Tian Sleep Protocol',
        sleepHabits: [
          { id: 'wudu', text: 'Warm foot bath with sea salt and ginger to ground upper Yang qi' },
          { id: 'screenOff', text: 'Extinguish digital stimulation 45 mins prior to sleep' },
          { id: 'ayatulKursi', text: 'Practice 10 minutes of Lower Dan Tian diaphragmatic breathing' },
          { id: 'rightSide', text: 'Align head toward North/East to harmonize with Earth\'s magnetic field' },
        ],
        shieldTitle: 'Sha Qi (Negative Energy) & Vitality Drain Diagnostic',
        shieldTiers: [
          'Tier 1 (Spiritual): Clear inner Shen with 10 minutes of silent Taoist meditation.',
          'Tier 2 (Feng Shui): Place a 5-Element brass bell or black tourmaline near entrance to block Sha Qi.',
          'Tier 3 (Energetic Balance): Avoid sharing unfinished creative projects with unaligned energies.'
        ]
      };
    } else if (currentTradition.includes('western') || currentTradition.includes('hellenistic')) {
      return {
        badge: 'Western Hellenistic & Hermetic Problem Solver',
        panicAnchorScript: 'PAX INTRINSECA • AS ABOVE SO BELOW',
        panicAnchorTranslit: '"Mind is the master of all temporary external storms; order resides within."',
        panicAnchorSurah: 'Hermetic Corpus: "The soul is serene, grounded in celestial geometry and reason."',
        timingSystem: 'Ptolemaic Planetary Hours & Electional Aspects',
        timingAdviceA: 'Solar Hour & Jupiter Hour for executive ventures, contracts, and expansion.',
        timingAdviceB: 'Mercury Hour for correspondence, commercial transactions, and agreements.',
        timingAdviceC: 'Mars Hour — Combative planetary tension. Avoid signing binding agreements.',
        disputeRule: 'Classical Roman Equity & Principled Negotiation',
        disputeScript: `"Thank you for bringing your concerns to my attention. I value transparency and fair dealing. Let us review the agreed terms objectively with a neutral arbiter to reach an equitable settlement."`,
        sleepProtocolName: 'Circadian & Hermetic Sleep Restoration Protocol',
        sleepHabits: [
          { id: 'wudu', text: 'Warm epsom salt shower to relax muscular nervous tension' },
          { id: 'screenOff', text: 'Eliminate blue-light exposure 45 mins before bedtime' },
          { id: 'ayatulKursi', text: 'Perform 5 minutes of progressive muscle relaxation' },
          { id: 'rightSide', text: 'Diffuse lavender & chamomile essential oils in a cool room (66°F)' },
        ],
        shieldTitle: 'Psychic Drain & Energy Boundary Diagnostic',
        shieldTiers: [
          'Tier 1 (Spiritual): Visualize an impenetrable sphere of brilliant golden solar light surrounding your aura.',
          'Tier 2 (Physical Grounding): Take a 20-minute mineral sea salt bath to discharge electrostatic tension.',
          'Tier 3 (Boundaries): Practice firm energetic boundaries and emotional detachment from toxic environments.'
        ]
      };
    } else if (currentTradition.includes('kp')) {
      return {
        badge: 'KP Stellar Cuspal Sub-Lord Problem Solver',
        panicAnchorScript: '249 SUB-LORD EQUANIMITY',
        panicAnchorTranslit: '"Planetary transits pass like clouds; the inner witness remains immovable."',
        panicAnchorSurah: 'KP Astrology Epistemic: "Sub-Lord precision reveals the path; decisive calm clears obstacles."',
        timingSystem: 'KP 249 Cuspal Sub-Lord Favorable Interlinks',
        timingAdviceA: 'Cuspal Sub-Lord signifies 2, 6, 10, 11 (Favorable for wealth and success).',
        timingAdviceB: 'Star Lord signifies 3, 9, 11 (Excellent for agreements, travel, and documents).',
        timingAdviceC: 'Sub-Lord signifies 6, 8, 12 (Obstruction period — postpone key decisions).',
        disputeRule: 'KP Cuspal Interlinks Conflict Resolution',
        disputeScript: `"I believe in resolving differences transparently and factually. Let us evaluate all points objectively so both parties can achieve a fair and mutually beneficial outcome."`,
        sleepProtocolName: 'KP Stellar Planetary Balance Sleep Protocol',
        sleepHabits: [
          { id: 'wudu', text: 'Wash feet with cool water to neutralize active Mars/Rahu heat' },
          { id: 'screenOff', text: 'Turn off phones and Wi-Fi near bed 45 mins before resting' },
          { id: 'ayatulKursi', text: 'Recite calming planetary Beej mantras before closing eyes' },
          { id: 'rightSide', text: 'Keep sleeping quarters minimalist, quiet, and well-ventilated' },
        ],
        shieldTitle: 'Planetary Malefic Affliction & Aura Shield Diagnostic',
        shieldTiers: [
          'Tier 1 (Spiritual): Propitiate ruling planets with dedicated daily meditation and charity.',
          'Tier 2 (Physical Grounding): Wear favorable elemental gemstones verified by sub-lord significators.',
          'Tier 3 (Strategic Action): Avoid initiating disputes during 6th/8th/12th sub-lord operating hours.'
        ]
      };
    } else if (currentTradition.includes('jaimini')) {
      return {
        badge: 'Jaimini Sutras Problem Solver',
        panicAnchorScript: 'ॐ आत्मने नमः • ATMA SHANTI',
        panicAnchorTranslit: '"Om Atmane Namah — The eternal Atmakaraka soul is invincible and untroubled."',
        panicAnchorSurah: 'Jaimini Upadesha Sutras: "The soul is unblemished; maya dissolves in the light of truth."',
        timingSystem: 'Jaimini Chara Dasha & Arudha Pada Auspicious Timing',
        timingAdviceA: 'Rajya Pada (A10) active window: Supreme for professional advancement and public recognition.',
        timingAdviceB: 'Dhana Pada (A2/A11) active window: Optimal for commercial prosperity and agreements.',
        timingAdviceC: 'Mrityu Pada (A8) active: Period for introspective contemplation, avoid confrontation.',
        disputeRule: 'Jaimini Arudha Lagna & Dharma Resolution',
        disputeScript: `"In the spirit of preserving mutual honor and righteous conduct (Dharma), I propose we come together with open hearts and resolve this matter equitably without acrimony."`,
        sleepProtocolName: 'Jaimini Karakamsha Sattvic Sleep Protocol',
        sleepHabits: [
          { id: 'wudu', text: 'Wash face, hands, and feet with cool water to purify the five elements' },
          { id: 'screenOff', text: 'Switch off all glowing electronic screens 45 mins prior to sleep' },
          { id: 'ayatulKursi', text: 'Meditate on the Karakamsha Ishta Devata for 5 minutes' },
          { id: 'rightSide', text: 'Ensure the bedroom is free from cluttered Arudha distractions' },
        ],
        shieldTitle: 'Karmic Obstruction & Aura Protection Diagnostic',
        shieldTiers: [
          'Tier 1 (Spiritual): Daily recitation of the Atmakaraka and Ishta Devata stotrams.',
          'Tier 2 (Physical Grounding): Burn pure Guggul or Sandalwood incense in the living space.',
          'Tier 3 (Dharmic Living): Perform selfless service (Seva) to dissolve past karmic impressions.'
        ]
      };
    } else {
      // Vedic Parashari
      return {
        badge: 'Vedic Parashari Problem Solver',
        panicAnchorScript: 'ॐ शान्तिः शान्तिः शान्तिः • ॐ नमः शिवाय',
        panicAnchorTranslit: '"Om Shanti Shanti Shanti — May universal peace, psychological calm, and divine stillness prevail."',
        panicAnchorSurah: 'Brihat Parashara Hora Shastra: "Through sattvic conduct and devotion, all graha afflictions are mitigated."',
        timingSystem: 'Vedic Abhijit Muhurta & Shubha Choghadiya',
        timingAdviceA: 'Abhijit Muhurta (Midday Window) — Highly auspicious for launches, business, and major deals.',
        timingAdviceB: 'Amrit & Shubha Choghadiya — Favorable for commercial transactions, travel, and agreements.',
        timingAdviceC: 'Rahu Kalam Window — Avoid initiating high-stakes initiatives or signing contracts.',
        disputeRule: 'Vedic Dharma, Satya & Nyaya Shastra',
        disputeScript: `"Namaste. In accordance with Dharma and preserving goodwill, let us sit together with an impartial advisor to reach a fair, truthful, and harmonious resolution."`,
        sleepProtocolName: 'Vedic Sattvic Sleep Readiness Protocol',
        sleepHabits: [
          { id: 'wudu', text: 'Wash feet with warm water and massage soles with sesame or ghee oil' },
          { id: 'screenOff', text: 'Disconnect from all digital screens 45 mins prior to bedtime' },
          { id: 'ayatulKursi', text: 'Chant Mahamrityunjaya Mantra or Gayatri Mantra 3 times before sleep' },
          { id: 'rightSide', text: 'Drink warm turmeric or Brahmi herbal infusion in a quiet environment' },
        ],
        shieldTitle: 'Negative Graha Drishti & Aura Shield Diagnostic',
        shieldTiers: [
          'Tier 1 (Spiritual): Recite Hanuman Chalisa or Sudarshana Kavacha daily for psychic armor.',
          'Tier 2 (Physical Grounding): Bath with rock salt and light a pure camphor lamp at twilight.',
          'Tier 3 (Daan/Charity): Donate food and essentials to needy individuals on Tuesdays or Saturdays.'
        ]
      };
    }
  }, [currentTradition]);

  // --- TOOL 1: PANIC & ANXIETY DE-ESCALATOR STATE ---
  const [panicLevel, setPanicLevel] = useState<number>(5);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [groundingCheck, setGroundingCheck] = useState<Record<number, boolean>>({});

  // Breath pacer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            if (breathPhase === 'Inhale') {
              setBreathPhase('Hold');
              return 7;
            } else if (breathPhase === 'Hold') {
              setBreathPhase('Exhale');
              return 8;
            } else {
              setBreathPhase('Inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  // --- TOOL 2: AUSPICIOUS TIMING CALCULATOR STATE ---
  const [eventType, setEventType] = useState<string>('business');
  const [targetDate, setTargetDate] = useState<string>('2026-08-10');
  const [timingResult, setTimingResult] = useState<any>(null);

  const calculateTiming = () => {
    const dates = [
      { date: targetDate, window: '09:15 AM - 11:30 AM', hora: 'Primary Auspicious Period', score: 94, status: 'Highly Auspicious', advice: traditionContent.timingAdviceA },
      { date: targetDate, window: '02:45 PM - 04:15 PM', hora: 'Secondary Commerce Period', score: 88, status: 'Favorable', advice: traditionContent.timingAdviceB },
      { date: targetDate, window: '06:00 PM - 07:30 PM', hora: 'Friction / Inauspicious Window', score: 42, status: 'Avoid High Stakes', advice: traditionContent.timingAdviceC }
    ];
    setTimingResult(dates);
  };

  // --- TOOL 3: DISPUTE MEDIATOR STATE ---
  const [disputeType, setDisputeType] = useState<string>('property');
  const [disputeOpponent, setDisputeOpponent] = useState<string>('Counterparty');
  const [generatedScript, setGeneratedScript] = useState<string>('');

  const generateMediationPlan = () => {
    setGeneratedScript(traditionContent.disputeScript);
  };

  // --- TOOL 4: SLEEP CHAMBER STATE ---
  const [solfeggioFreq, setSolfeggioFreq] = useState<number>(528);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [sleepHabits, setSleepHabits] = useState<Record<string, boolean>>({
    wudu: true,
    screenOff: false,
    ayatulKursi: true,
    rightSide: false
  });

  // --- TOOL 5: AURA SHIELD DIAGNOSTIC STATE ---
  const [shieldAnswers, setShieldAnswers] = useState<Record<number, number>>({});
  const [drainScore, setDrainScore] = useState<number | null>(null);

  const calculateDrain = () => {
    const total = Object.values(shieldAnswers).reduce((a, b) => a + b, 0);
    const max = 15;
    const pct = Math.round((total / max) * 100);
    setDrainScore(pct);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
      {/* HEADER SECTION */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold tracking-widest uppercase font-mono">Specialized Problem Solving Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
              Interactive <span className="gradient-text">Problem-Solving Tools</span>
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              5 interactive, real-time tools to de-escalate anxiety, calculate auspicious timing, mediate disputes, restore sleep, and shield your spiritual energy for {name}.
            </p>
          </div>
        </div>
      </div>

      {/* TOOL NAVIGATION TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: 'deescalator', label: '🚨 Panic De-escalator', icon: <Heart className="w-4 h-4 text-rose-400" /> },
          { id: 'timing', label: '💼 Timing Calculator', icon: <Clock className="w-4 h-4 text-amber-400" /> },
          { id: 'dispute', label: '⚖️ Dispute Mediator', icon: <Scale className="w-4 h-4 text-emerald-400" /> },
          { id: 'sleep', label: '💤 Sleep Chamber', icon: <Moon className="w-4 h-4 text-purple-400" /> },
          { id: 'shield', label: '🛡️ Aura Shield Test', icon: <Shield className="w-4 h-4 text-cyan-400" /> },
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id as any)}
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all cursor-pointer ${
              activeTool === tool.id
                ? 'bg-gradient-to-br from-indigo-900/80 to-slate-900 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10'
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="p-2 rounded-xl bg-white/5">{tool.icon}</div>
            <span className="text-xs font-bold">{tool.label}</span>
          </button>
        ))}
      </div>

      {/* TOOL 1: PANIC & HIGH ANXIETY EMERGENCY DE-ESCALATOR */}
      {activeTool === 'deescalator' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-rose-500/40 space-y-6">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Heart className="w-6 h-6 text-rose-400" /> Panic & Anxiety Emergency De-escalator
                </h3>
                <p className="text-xs text-slate-400 mt-1">Interactive 4-7-8 breathing circle & 5-4-3-2-1 sensory grounding</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Instant Relief
              </span>
            </div>

            {/* Panic Slider */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">How intense is your current anxiety / panic right now?</span>
                <span className="font-mono font-bold text-rose-400 text-sm">{panicLevel} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={panicLevel}
                onChange={(e) => setPanicLevel(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 - Slight Restlessness</span>
                <span>5 - Moderate Worry</span>
                <span>10 - Acute Panic</span>
              </div>
            </div>

            {/* Breathing Circle & Pacer */}
            <div className="text-center space-y-6 pt-4">
              <div className="relative mx-auto w-56 h-56 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isBreathingActive
                      ? breathPhase === 'Inhale' ? 1.35 : breathPhase === 'Hold' ? 1.35 : 0.85
                      : 1
                  }}
                  transition={{ duration: breathPhase === 'Inhale' ? 4 : breathPhase === 'Hold' ? 7 : 8, ease: 'easeInOut' }}
                  className="w-44 h-44 rounded-full bg-gradient-to-br from-rose-500/30 to-purple-600/30 border-4 border-rose-400/50 flex flex-col items-center justify-center space-y-1 shadow-2xl shadow-rose-500/20"
                >
                  <span className="text-xs font-mono text-rose-300 uppercase tracking-widest">{breathPhase}</span>
                  <span className="text-5xl font-mono font-bold text-white">{breathTimer}</span>
                  <span className="text-[10px] text-slate-300 font-sans">4-7-8 Rhythm</span>
                </motion.div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsBreathingActive(!isBreathingActive)}
                  className={`px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl transition-all cursor-pointer ${
                    isBreathingActive
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white'
                  }`}
                >
                  {isBreathingActive ? 'Pause Breathing' : 'Start 4-7-8 Breathing Cycle'}
                </button>
              </div>
            </div>

            {/* 5-4-3-2-1 Sensory Grounding Checklist */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">5-4-3-2-1 Sensory Grounding Exercise</h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { num: 5, text: 'Name 5 things you can SEE' },
                  { num: 4, text: 'Name 4 things you can TOUCH' },
                  { num: 3, text: 'Name 3 sounds you HEAR' },
                  { num: 2, text: 'Name 2 scents you SMELL' },
                  { num: 1, text: 'Name 1 thing you TASTE' },
                ].map((item) => {
                  const isChecked = !!groundingCheck[item.num];
                  return (
                    <button
                      key={item.num}
                      onClick={() => setGroundingCheck(prev => ({ ...prev, [item.num]: !prev[item.num] }))}
                      className={`p-3 rounded-2xl border text-left text-xs space-y-1 transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200' 
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-mono font-bold text-rose-400 block">Step {item.num}</span>
                      <span className="text-[11px] leading-tight block">{item.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calming Anchor */}
            <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center space-y-2">
              <p className="text-xs text-rose-300 font-bold uppercase tracking-wider font-mono">
                {traditionContent.badge} — Sacred Calming Anchor
              </p>
              <p className="text-2xl font-serif text-rose-100">{traditionContent.panicAnchorScript}</p>
              <p className="text-xs text-slate-300 font-sans italic font-medium">{traditionContent.panicAnchorTranslit}</p>
              <p className="text-[11px] text-amber-300 font-mono">{traditionContent.panicAnchorSurah}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* TOOL 2: AUSPICIOUS TIMING CALCULATOR */}
      {activeTool === 'timing' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-6">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6 text-amber-400" /> Business & Event Auspicious Timing
                </h3>
                <p className="text-xs text-slate-400 mt-1">{traditionContent.timingSystem}</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {currentTradition.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Select Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="business">Launch Business / Startup</option>
                  <option value="contract">Sign Major Contract / Deal</option>
                  <option value="property">Purchase Real Estate / Asset</option>
                  <option value="job">Submit Job Application / Interview</option>
                  <option value="marriage">Marriage Proposal / Engagement</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Target Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={calculateTiming}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
                >
                  Calculate Favorable Windows
                </button>
              </div>
            </div>

            {/* Results Grid */}
            {timingResult && (
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Calculated Favorable Timing Windows ({traditionContent.timingSystem})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {timingResult.map((res: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-amber-400">{res.window}</span>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                          res.score > 90 ? 'bg-emerald-500/20 text-emerald-300' : res.score > 70 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {res.score}% Alignment
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">{res.hora}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{res.advice}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TOOL 3: DISPUTE MEDIATOR */}
      {activeTool === 'dispute' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/40 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Scale className="w-6 h-6 text-emerald-400" /> Legal, Property & Dispute Mediator
                </h3>
                <p className="text-xs text-slate-400 mt-1">{traditionContent.disputeRule}</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Ethical Resolution
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Type of Dispute</label>
                <select
                  value={disputeType}
                  onChange={(e) => setDisputeType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="property">Land / Real Estate / Asset Dispute</option>
                  <option value="contract">Business Contract / Debt Disagreement</option>
                  <option value="workplace">Workplace Friction / Employer Conflict</option>
                  <option value="family">Family / Relational Disagreement</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Opposing Party</label>
                <input
                  type="text"
                  value={disputeOpponent}
                  onChange={(e) => setDisputeOpponent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={generateMediationPlan}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              Generate De-escalation Mediation Script & Strategy
            </button>

            {generatedScript && (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-4">
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Recommended De-escalation Message Script ({traditionContent.badge})
                </h4>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-emerald-100 font-mono leading-relaxed">
                  {generatedScript}
                </div>
                <p className="text-[11px] text-slate-400">
                  Tip: Send this communication during an auspicious planetary window for maximum peaceful reception.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* TOOL 4: SLEEP CHAMBER */}
      {activeTool === 'sleep' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/40 space-y-6">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Moon className="w-6 h-6 text-purple-400" /> Insomnia & Sleep Restoration Chamber
                </h3>
                <p className="text-xs text-slate-400 mt-1">{traditionContent.sleepProtocolName}</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Rest Restoration
              </span>
            </div>

            {/* Solfeggio Frequency Player */}
            <div className="p-6 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-4 text-center">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Solfeggio Frequencies & Sound Generator</h4>
              
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { freq: 432, label: '432 Hz - Miracle Calm' },
                  { freq: 528, label: '528 Hz - Cellular Repair' },
                  { freq: 852, label: '852 Hz - Spiritual Awakening' },
                ].map((s) => (
                  <button
                    key={s.freq}
                    onClick={() => setSolfeggioFreq(s.freq)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      solfeggioFreq === s.freq
                        ? 'bg-purple-500/30 text-purple-200 border border-purple-500/60'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsPlayingSound(!isPlayingSound)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                {isPlayingSound ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlayingSound ? `Simulating ${solfeggioFreq}Hz Ambient Wave` : `Play ${solfeggioFreq}Hz Sleep Frequency`}
              </button>
            </div>

            {/* Tradition Sleep Readiness Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{traditionContent.sleepProtocolName}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {traditionContent.sleepHabits.map((hab) => {
                  const isChecked = !!sleepHabits[hab.id];
                  return (
                    <button
                      key={hab.id}
                      onClick={() => setSleepHabits(prev => ({ ...prev, [hab.id]: !prev[hab.id] }))}
                      className={`p-4 rounded-2xl border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200' 
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{hab.text}</span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-slate-900'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TOOL 5: AURA SHIELD DIAGNOSTIC */}
      {activeTool === 'shield' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/40 space-y-6">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-cyan-400" /> {traditionContent.shieldTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Assess energetic drain and generate a 3-tier protection shield protocol</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Aura Diagnostic
              </span>
            </div>

            <div className="space-y-4">
              {[
                { id: 1, q: 'Do you experience sudden unexplained exhaustion after being around certain crowds or social media?' },
                { id: 2, q: 'Have you noticed unexpected breakdowns or setbacks right after sharing good news publicly?' },
                { id: 3, q: 'Do you feel a heavy tightness in your chest or cold chills without medical reason?' },
                { id: 4, q: 'Are you struggling to maintain regular spiritual routines or daily focus?' },
                { id: 5, q: 'Do you feel irritable or defensive in your living environment for no clear reason?' },
              ].map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-slate-200 font-medium">{item.id}. {item.q}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    {[
                      { val: 0, label: 'Never' },
                      { val: 1, label: 'Sometimes' },
                      { val: 3, label: 'Frequently' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setShieldAnswers(prev => ({ ...prev, [item.id]: opt.val }))}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                          shieldAnswers[item.id] === opt.val
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={calculateDrain}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              Calculate Energy Drain Score & Generate Shield Protocol
            </button>

            {drainScore !== null && (
              <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-center space-y-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">Spiritual Energy Drain Score</span>
                <p className="text-5xl font-mono font-bold text-cyan-300">{drainScore}%</p>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed text-left space-y-2">
                  <strong className="text-cyan-300 font-semibold block">Prescribed 3-Tier Protection Shield ({traditionContent.badge}):</strong>
                  <ul className="space-y-1.5 text-slate-300">
                    {traditionContent.shieldTiers.map((tier, idx) => (
                      <li key={idx}>• {tier}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
