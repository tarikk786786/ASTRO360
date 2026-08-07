import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Heart, Moon, Shield, Scale, Calendar, AlertTriangle, CheckCircle2, 
  Sparkles, RefreshCw, Volume2, Play, Pause, Compass, Clock, BookOpen, 
  FileText, ShieldCheck, Sun, ArrowRight, UserCheck, Flame, Lock
} from 'lucide-react';
import type { UserProfile } from '../types';

interface UniversalProblemSolverSuiteProps {
  userProfile: UserProfile;
}

export default function UniversalProblemSolverSuite({ userProfile }: UniversalProblemSolverSuiteProps) {
  const [activeTool, setActiveTool] = useState<
    'deescalator' | 'timing' | 'dispute' | 'sleep' | 'shield'
  >('deescalator');

  const name = userProfile?.name || 'Tarik Islam';

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
      { date: targetDate, window: '09:15 AM - 11:30 AM', hora: 'Jupiter Hora (Expansion)', score: 94, status: 'Highly Auspicious', advice: 'Optimal for signing contracts and launching campaigns.' },
      { date: targetDate, window: '02:45 PM - 04:15 PM', hora: 'Mercury Hora (Commerce)', score: 88, status: 'Favorable', advice: 'Great for negotiations, publishing, and financial transfers.' },
      { date: targetDate, window: '06:00 PM - 07:30 PM', hora: 'Mars Hora (Conflict Risk)', score: 42, status: 'Avoid High Stakes', advice: 'Potential for heated disputes. Postpone legal agreements.' }
    ];
    setTimingResult(dates);
  };

  // --- TOOL 3: DISPUTE MEDIATOR STATE ---
  const [disputeType, setDisputeType] = useState<string>('property');
  const [disputeOpponent, setDisputeOpponent] = useState<string>('Relative / Family Member');
  const [generatedScript, setGeneratedScript] = useState<string>('');

  const generateMediationPlan = () => {
    let script = '';
    if (disputeType === 'property') {
      script = `"Peace be upon you. In the interest of fairness and preserving our family honor, I propose we review the documented entitlements according to established Sharia Fiqh rules. Let us involve an independent neutral mediator to arrive at an equitable resolution without enmity."`;
    } else if (disputeType === 'contract') {
      script = `"Thank you for bringing your concerns to my attention. I believe in fulfilling all covenants in good faith. Let us review Section X of our agreement together and schedule a 30-minute structured call to resolve any misunderstandings amicably."`;
    } else {
      script = `"I value our relationship above temporary misunderstandings. Let us take 24 hours to calm emotions, and then meet with the clear intention of seeking a fair solution that respects both parties' rights."`;
    }
    setGeneratedScript(script);
  };

  // --- TOOL 4: SLEEP CHAMBER STATE ---
  const [solfeggioFreq, setSolfeggioFreq] = useState<number>(528);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [sleepHabits, setSleepHabits] = useState<Record<string, boolean>>({
    wudu: true,
    screenOff: false,
    ayatulKursi: true,
    coolRoom: false
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

            {/* Calming Dhikr Anchor */}
            <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center space-y-2">
              <p className="text-xs text-rose-300 font-bold uppercase tracking-wider font-mono">Sacred Calming Anchor</p>
              <p className="text-2xl font-serif text-rose-100" style={{ direction: 'rtl' }}>لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ</p>
              <p className="text-xs text-slate-300 font-sans italic font-medium">"La hawla wa la quwwata illa billah" — There is no power nor strength except through Allah.</p>
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
                  <Clock className="w-6 h-6 text-amber-400" /> Business & Event Auspicious Timing (Muhurta)
                </h3>
                <p className="text-xs text-slate-400 mt-1">Calculate planetary hours (Hora) & ethical timing windows for major initiatives</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Electional Astrology
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
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Calculated Planetary Hora Windows</h4>
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
                <p className="text-xs text-slate-400 mt-1">Sharia Fiqh rules, astrological timing & de-escalation negotiation scripts</p>
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
                  <option value="property">Land / Real Estate / Inheritance Dispute</option>
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
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Recommended De-escalation Message Script</h4>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-emerald-100 font-mono leading-relaxed">
                  {generatedScript}
                </div>
                <p className="text-[11px] text-slate-400">
                  Tip: Send this message during Mercury Hora or Jupiter Hora on a Wednesday/Thursday for maximum peaceful reception.
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
                <p className="text-xs text-slate-400 mt-1">Sunnah sleep protocol, Solfeggio sound simulation & circadian tune-up</p>
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

            {/* Sunnah Sleep Readiness Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Sunnah Sleep Readiness Protocol</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'wudu', text: 'Perform Ablution (Wudu) before stepping into bed' },
                  { id: 'screenOff', text: 'Turn off all blue light screens 45 mins prior to sleep' },
                  { id: 'ayatulKursi', text: 'Recite Ayatul Kursi & The 3 Quls into palms and wipe' },
                  { id: 'coolRoom', text: 'Ensure room temperature is cool (65-68°F)' },
                ].map((hab) => {
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
                  <Shield className="w-6 h-6 text-cyan-400" /> Negative Energy & Aura Shield Diagnostic
                </h3>
                <p className="text-xs text-slate-400 mt-1">Assess spiritual drain, evil eye (Hasad) symptoms, and generate a 3-tier protection shield</p>
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
                { id: 4, q: 'Are you struggling to maintain regular spiritual routines or daily prayers?' },
                { id: 5, q: 'Do you feel irritable or defensive in your home environment for no clear reason?' },
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
                  <strong className="text-cyan-300 font-semibold block">Prescribed 3-Tier Protection Shield:</strong>
                  <ul className="space-y-1.5 text-slate-300">
                    <li>• <strong>Tier 1 (Spiritual):</strong> Recite Morning & Evening Sunnah Adhkar (The 3 Quls + Ayatul Kursi).</li>
                    <li>• <strong>Tier 2 (Physical Grounding):</strong> Bath with sea salt or Sidr water; sprinkle coarse salt in room corners.</li>
                    <li>• <strong>Tier 3 (Digital Privacy):</strong> Practice "Strategic Concealment"—keep unverified projects private until complete.</li>
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
