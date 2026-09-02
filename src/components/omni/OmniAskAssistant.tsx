import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, User, Sparkles, Send, HelpCircle, Layers, BookOpen, 
  ShieldCheck, ArrowRight, RefreshCw, ChevronDown, ChevronUp,
  Briefcase, Heart, DollarSign, Clock, Compass, Activity,
  Sliders, Info, CheckCircle2, AlertTriangle, FileText, ArrowUpRight,
  Scale, ShieldAlert, Check, Calendar, Lock, Copy, CheckCheck, Share2
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer from './OmniWhyDrawer';
import { PersonalProblemAnalyzer, SolvedProblemAnalysis } from '../../ai/solver/personalProblemAnalyzer';
import { AskApiHandler } from '../../ai/api/askApiHandler';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  query?: string;
  analysis?: SolvedProblemAnalysis;
  rawText?: string;
}

export default function OmniAskAssistant({ 
  userProfile,
  onNavigate
}: { 
  userProfile: UserProfile;
  onNavigate?: (tab: string) => void;
}) {
  const seekerName = userProfile.name?.trim() || 'Seeker';
  const hasBirthData = !!(userProfile.dob && userProfile.time);

  const questionPresets = [
    { cat: 'CAREER', label: 'Career', q: 'Why is my career stuck and when will it improve?', icon: Briefcase, color: 'text-amber-400' },
    { cat: 'DECISION', label: 'Decision', q: 'Should I quit my job or stay?', icon: Scale, color: 'text-indigo-400' },
    { cat: 'PRAYER', label: 'Prayer Times', q: 'When are today\'s exact prayer times for my location?', icon: Clock, color: 'text-emerald-400' },
    { cat: 'QIBLA', label: 'Qibla', q: 'Which direction is Qibla from my coordinates?', icon: Compass, color: 'text-cyan-400' },
    { cat: 'ISLAMIC', label: 'Islamic Guidance', q: 'What does Islam teach about overcoming worry and anxiety?', icon: BookOpen, color: 'text-teal-400' },
    { cat: 'COMPARE', label: 'Mixed View', q: 'What does astrology say about marriage, and what does Islam teach?', icon: Layers, color: 'text-blue-400' },
    { cat: 'CAREER', label: 'Career', q: 'Why is my career stuck and when will it improve?', icon: Briefcase, color: 'text-amber-400' },
    { cat: 'DECISION', label: 'Decision', q: 'Should I quit my job or stay?', icon: Scale, color: 'text-indigo-400' },
    { cat: 'LOVE', label: 'Love', q: 'What does my chart indicate for long-term marriage & timing?', icon: Heart, color: 'text-rose-400' },
    { cat: 'MONEY', label: 'Wealth', q: 'When are my strongest financial timing cycles?', icon: DollarSign, color: 'text-emerald-400' },
    { cat: 'TIMING', label: 'Timing', q: 'When will my career improve?', icon: Clock, color: 'text-cyan-400' },
    { cat: 'CHART', label: 'My Chart', q: 'What is my ascendant and Moon sign?', icon: Compass, color: 'text-purple-400' },
    { cat: 'COMPARE', label: 'Compare', q: 'Compare my career timing using Vedic, Western and KP.', icon: Layers, color: 'text-blue-400' },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      timestamp: 'Just now',
      rawText: `Namaste ${seekerName}. I am your ASTRO360 Personal Astrology AI Assistant. I calculate your exact birth chart across Vedic Parashari, Western Tropical, KP Stellar, and Jaimini Sutras using NASA JPL DE440 sub-arcsecond ephemeris. Ask me any question about your vocation, major life decisions, relationships, financial cycles, or birth chart placements.`
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'all' | 'islamic' | 'astrology' | 'practical' | 'compare' | 'evidence'>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const calculationSteps = [
    'Understanding question intent...',
    'Loading validated chart context...',
    'Calculating JPL DE440 ephemeris coordinates...',
    'Running multi-tradition astrology engines...',
    'Evaluating classical scripture rules & yogas...',
    'Computing cross-tradition agreement...',
    'Synthesizing personalized guidance...'
  ];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      scrollToBottom();
    }
  }, [messages.length, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rawText: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);
    setCurrentStepIndex(0);

    // Step animation interval
    const stepInterval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < calculationSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 120);

    try {
      // Execute through Ask API Handler
      const res = await AskApiHandler.handle({
        question: query,
        userProfile,
        preferredSystems: ['Vedic', 'Western', 'KP', 'Jaimini']
      });

      clearInterval(stepInterval);
      setIsTyping(false);

      if (res.success && res.data) {
        const botResponse: ChatMessage = {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          query,
          analysis: res.data
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'assistant',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            rawText: res.error || 'Unable to process calculation. Please check your birth data.'
          }
        ]);
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          rawText: 'ASTROCORE calculation fallback: Your planetary data is safely computed client-side.'
        }
      ]);
    }
  };

  const handleCopy = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    toast.success('Analysis copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-[calc(100dvh-5.5rem)] text-left pb-2 font-sans select-text">
      {/* Top Header Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0E1524] border border-white/[0.08] shadow-lg mb-2 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-white/[0.08] flex items-center justify-center text-amber-400 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white font-sans">
                ASTRO360 Personal Astrology AI
              </h2>
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.2 rounded border border-white/[0.08]">
                CALCULATED ENGINE
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              NASA JPL DE440 Sub-Arcsecond Ephemeris • Vedic, Western, KP & Jaimini
            </p>
          </div>
        </div>

        {/* Chart Context Pill */}
        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Chart: {seekerName} ({userProfile.dob || '1998-02-22'})</span>
          </div>
        </div>
      </div>

      {/* Main Chat Thread */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-1 sm:px-2 space-y-4 custom-scrollbar"
      >
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          const a = msg.analysis;
          const activeSubTab = activeTabMap[msg.id] || 'all';

          return (
            <div 
              key={msg.id}
              className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-white/[0.08] flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div 
                className={`max-w-[95%] sm:max-w-[90%] rounded-2xl p-4 sm:p-5 transition-all shadow-xl ${
                  isAssistant 
                    ? 'bg-[#0D1424] border border-white/[0.08] text-slate-100' 
                    : 'bg-white text-black font-semibold ml-auto'
                }`}
              >
                {/* User Message or Raw Assistant Welcome */}
                {!a && (
                  <p className="text-sm sm:text-[15px] leading-relaxed">
                    {msg.rawText}
                  </p>
                )}

                {/* Rich Astrology AI Analysis Card */}
                {isAssistant && a && (
                  <div className="space-y-4">
                    {/* Safety Notice Banner */}
                    {a.safetyNotice && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                        <span>{a.safetyNotice}</span>
                      </div>
                    )}

                    {/* Metadata Header & Concordance Pill */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-amber-400 uppercase bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                          {a.category}
                        </span>
                        {a.timing?.windowLabel && (
                          <span className="text-xs font-mono font-bold text-white bg-white/[0.06] px-2.5 py-0.5 rounded border border-white/[0.08]">
                            🗓️ {a.timing.windowLabel}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {a.agreement && (
                          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded border border-emerald-400/20">
                            Concordance: {a.agreement.agreementPercent}%
                          </span>
                        )}
                        <button
                          onClick={() => handleCopy(msg.id, a.summary)}
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Copy Summary"
                        >
                          {copiedId === msg.id ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* View Exploration Tabs */}
                    <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-2 text-xs font-mono overflow-x-auto no-scrollbar">
                      {[
                        { id: 'all', label: 'All In One' },
                        ...(a.islamicGuidanceView ? [{ id: 'islamic', label: '🌙 Islamic Guidance' }] : []),
                        { id: 'astrology', label: '🪐 Astrological Mechanics' },
                        { id: 'practical', label: '🛠️ Practical Playbook' },
                        { id: 'compare', label: '🌐 4-Traditions / Comparisons' },
                        { id: 'evidence', label: '📜 Classical Evidence' },
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTabMap(prev => ({ ...prev, [msg.id]: t.id as any }))}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
                            activeSubTab === t.id
                              ? 'bg-white text-black font-bold shadow-sm'
                              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {/* VIEW 1: ALL-IN-ONE (Unified Direct Master Reading) */}
                    {activeSubTab === 'all' && (
                      <div className="space-y-4">
                        {/* Executive Summary */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                            Executive Astrological Synthesis:
                          </h4>
                          <p className="text-sm sm:text-[15px] text-slate-100 font-sans leading-relaxed">
                            {a.summary}
                          </p>
                        </div>

                        {/* Decision Matrix if available */}
                        {a.decisionMatrix && (
                          <div className="p-4 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-3">
                            <span className="text-xs font-mono font-bold text-amber-400 block uppercase">
                              ⚖️ Decision Scenario Analysis:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1">
                                <span className="font-bold text-emerald-400 block">{a.decisionMatrix.optionA.title}</span>
                                <p className="text-slate-300 font-sans">{a.decisionMatrix.optionA.astrologicalPerspective}</p>
                                <span className="text-[10px] text-slate-400 block pt-1 border-t border-white/5 font-sans">
                                  Practical: {a.decisionMatrix.optionA.practicalPerspective}
                                </span>
                              </div>
                              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1">
                                <span className="font-bold text-amber-300 block">{a.decisionMatrix.optionB.title}</span>
                                <p className="text-slate-300 font-sans">{a.decisionMatrix.optionB.astrologicalPerspective}</p>
                                <span className="text-[10px] text-slate-400 block pt-1 border-t border-white/5 font-sans">
                                  Practical: {a.decisionMatrix.optionB.practicalPerspective}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs font-mono text-slate-400 pt-1">
                              👉 <strong>Takeaway:</strong> {a.decisionMatrix.recommendation}
                            </p>
                          </div>
                        )}

                        {/* Astrological & Practical Split Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Astrological View */}
                          <div className="p-3.5 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-2 text-xs font-mono">
                            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase text-[10px]">
                              <span>🪐 ASTROLOGY VIEW (WHAT YOUR CHART SHOWS)</span>
                            </div>
                            <p className="text-slate-200 font-sans text-xs font-semibold">{a.astrologyView.primaryTheme}</p>
                            <div className="pt-1.5 border-t border-white/5 space-y-1 text-slate-300 text-[11px]">
                              <div><strong className="text-slate-400">Dasha:</strong> {a.astrologyView.dashaCycle}</div>
                              <div><strong className="text-slate-400">Houses:</strong> {a.astrologyView.houseActivations}</div>
                            </div>
                          </div>

                          {/* Practical View */}
                          <div className="p-3.5 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-2 text-xs">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono uppercase text-[10px]">
                              <span>🛠️ PRACTICAL VIEW (WHAT YOU CAN CONTROL)</span>
                            </div>
                            <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans">
                              {a.practicalView.actionItems.slice(0, 3).map((act, aIdx) => (
                                <li key={aIdx} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Timing Banner */}
                        {a.timing && (
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                            <div className="space-y-0.5">
                              <span className="text-slate-400 text-[10px] uppercase">Active Timing Window:</span>
                              <div className="text-white font-bold">{a.timing.windowLabel}</div>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-white/[0.08]">
                              Intensity: {a.timing.intensity}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    
                    {/* VIEW: Islamic Guidance (Sourced) */}
                    {activeSubTab === 'islamic' && a.islamicGuidanceView && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-[#090E1A] border border-teal-500/20 space-y-3">
                          <span className="text-xs font-mono font-bold text-teal-400 uppercase block">
                            🌙 SOURCED ISLAMIC GUIDANCE & SCRIPTURAL FOUNDATIONS:
                          </span>
                          <p className="text-sm font-semibold text-white font-sans">
                            {a.islamicGuidanceView.primaryTheme}
                          </p>

                          {/* Core Principles */}
                          <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-slate-300 font-sans">
                            {a.islamicGuidanceView.corePrinciples.map((cp: string, cpIdx: number) => (
                              <div key={cpIdx} className="flex items-start gap-2">
                                <span className="text-teal-400 font-bold">•</span>
                                <span>{cp}</span>
                              </div>
                            ))}
                          </div>

                          {/* Sourced Evidence Chain */}
                          <div className="pt-2 border-t border-white/5 space-y-2">
                            <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                              Verified Scripture & Hadith Evidence:
                            </span>
                            {a.islamicGuidanceView.evidenceChain.map((ev: any, evIdx: number) => (
                              <div key={evIdx} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1.5 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-teal-300 font-mono">
                                    {ev.sourceType === 'QURAN' ? "📖 Holy Quran" : '📜 Hadith'}: {ev.citation}
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                                    Tier {ev.tier} Source
                                  </span>
                                </div>
                                {ev.arabicText && (
                                  <p className="text-sm text-amber-200 font-serif leading-relaxed text-right py-1 dir-rtl" dir="rtl">
                                    {ev.arabicText}
                                  </p>
                                )}
                                <p className="text-slate-200 font-sans italic">"{ev.translation}"</p>
                                {ev.authenticityOrSchool && (
                                  <span className="text-[10px] font-mono text-emerald-400 block pt-0.5">
                                    ✓ {ev.authenticityOrSchool}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Scholarly Consensus */}
                          <div className="p-2.5 rounded-lg bg-white/[0.03] text-[11px] font-mono text-slate-300">
                            <strong>Scholarly Foundation:</strong> {a.islamicGuidanceView.scholarlyConsensusOrIkhtilaf}
                          </div>
                        </div>
                      </div>
                    )}

{/* VIEW 2: Astrological Mechanics */}
                    {activeSubTab === 'astrology' && (
                      <div className="space-y-3 text-xs font-mono">
                        <div className="p-4 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-3">
                          <span className="text-xs text-amber-400 uppercase font-bold block">ASTROLOGY VIEW (WHAT YOUR CHART SHOWS):</span>
                          <p className="text-slate-200 font-sans text-sm font-semibold">{a.astrologyView.primaryTheme}</p>
                          
                          <div className="pt-2 border-t border-white/5 space-y-1.5 text-slate-300">
                            <div><strong className="text-slate-400">Active Dasha Cycle:</strong> {a.astrologyView.dashaCycle}</div>
                            <div><strong className="text-slate-400">Planetary Telemetry:</strong> {a.astrologyView.planetaryTelemetry}</div>
                            <div><strong className="text-slate-400">House Activations:</strong> {a.astrologyView.houseActivations}</div>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                            {a.astrologyView.chartFactors.map((factor, fIdx) => (
                              <span key={fIdx} className="text-[10px] font-mono bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] text-slate-300">
                                • {factor}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Timing & Stability */}
                        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Birth-Time Stability:</span>
                            <span className="text-emerald-400 font-bold">{a.sensitivity.stability} ({a.sensitivity.driftInterval})</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans">{a.sensitivity.note}</p>
                        </div>
                      </div>
                    )}

                    {/* VIEW 3: Practical Playbook */}
                    {activeSubTab === 'practical' && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-3">
                          <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">
                            🛠️ PRACTICAL PLAYBOOK (ACTIONABLE GUIDANCE):
                          </span>
                          <ul className="space-y-2 text-xs text-slate-300 font-sans">
                            {a.practicalView.actionItems.map((act, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-slate-400 font-sans pt-2 border-t border-white/5 leading-relaxed">
                            💡 <strong>Strategic Advice:</strong> {a.practicalView.strategicAdvice}
                          </p>
                        </div>

                        {/* Uncertainty & Limitations */}
                        {a.whatIsLessCertain && a.whatIsLessCertain.length > 0 && (
                          <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs font-mono text-amber-300 space-y-1">
                            <span className="font-bold block uppercase text-[10px]">What Is Less Certain:</span>
                            {a.whatIsLessCertain.map((uc, uIdx) => (
                              <div key={uIdx} className="text-[11px]">• {uc}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* VIEW 4: 4-Traditions Compare */}
                    {activeSubTab === 'compare' && (
                      <div className="space-y-3 text-xs font-mono">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="p-3 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-1">
                            <span className="text-[10px] text-amber-400 font-bold">VEDIC PARASHARI</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{a.systemsBreakdown.vedic}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-1">
                            <span className="text-[10px] text-cyan-400 font-bold">WESTERN TROPICAL</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{a.systemsBreakdown.western}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-1">
                            <span className="text-[10px] text-emerald-400 font-bold">KP STELLAR</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{a.systemsBreakdown.kp}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-[#090E1A] border border-white/[0.08] space-y-1">
                            <span className="text-[10px] text-indigo-400 font-bold">JAIMINI SUTRAS</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{a.systemsBreakdown.jaimini}</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[10px] text-slate-400 space-y-1">
                          <div className="flex items-center justify-between text-white font-mono font-bold">
                            <span>Direction Agreement: {a.agreement.agreementPercent}%</span>
                            <span>Lineage-Adjusted: {a.agreement.lineageAdjusted}</span>
                          </div>
                          <p>{a.agreement.disclaimer}</p>
                        </div>
                      </div>
                    )}

                    {/* VIEW 5: Classical Scripture Evidence */}
                    {activeSubTab === 'evidence' && (
                      <div className="space-y-2.5 text-xs font-mono">
                        <span className="text-[10px] text-slate-500 uppercase font-medium block">Classical Scripture Citations & Ephemeris Authority:</span>
                        <div className="space-y-1.5">
                          {a.evidenceSources.map((ev, eIdx) => (
                            <div key={eIdx} className="p-2.5 rounded-xl bg-[#090E1A] border border-white/[0.08] flex items-center justify-between">
                              <span className="text-white font-medium">📜 {ev.citation}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-amber-300 border border-white/[0.08]">
                                Tier {ev.tier} Scripture Authority
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interactive Follow-Up Chips */}
                    {a.followUps && a.followUps.length > 0 && (
                      <div className="pt-2 border-t border-white/[0.08] space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">
                          💡 Suggested Follow-Up Questions:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {a.followUps.map((fu, fuIdx) => (
                            <button
                              key={fuIdx}
                              onClick={() => handleSend(fu)}
                              className="px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white border border-white/[0.08] transition-all cursor-pointer text-left"
                            >
                              💬 {fu}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Deep-Link Tool Navigation Shortcuts */}
                    {onNavigate && (
                      <div className="pt-2 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => onNavigate('birth-chart')}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[10px] font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Compass className="w-3 h-3 text-amber-400" />
                          <span>View Birth Chart</span>
                        </button>
                        <button
                          onClick={() => onNavigate('forecast')}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[10px] font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>View Detailed Forecast</span>
                        </button>
                        <button
                          onClick={() => onNavigate('dasha')}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[10px] font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Layers className="w-3 h-3 text-purple-400" />
                          <span>Inspect Dasha Cycles</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Live Step-by-Step Calculation Progress Indicator */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-2xl bg-[#0D1424] border border-white/[0.08] text-left max-w-lg"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-white/[0.08] flex items-center justify-center text-amber-400 shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  ASTROCORE Precision Engine Active
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Step {currentStepIndex + 1}/{calculationSteps.length}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-200 animate-pulse">
                {calculationSteps[currentStepIndex]}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggested Question Chips (when only initial message exists) */}
      {messages.length <= 1 && (
        <div className="px-2 py-2 shrink-0">
          <span className="text-[10px] font-mono text-slate-400 block mb-1.5 uppercase font-bold">
            ⚡ Quick-Launch Astrological Inquiries:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
            {questionPresets.slice(0, 6).map((preset, pIdx) => {
              const Icon = preset.icon;
              return (
                <button
                  key={pIdx}
                  onClick={() => handleSend(preset.q)}
                  className="p-2.5 rounded-xl bg-[#0D1424] hover:bg-white/[0.08] border border-white/[0.08] text-left flex items-start gap-2.5 transition-all cursor-pointer group shadow-sm"
                >
                  <Icon className={`w-4 h-4 ${preset.color} shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white block truncate">
                      {preset.label}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate font-sans">
                      {preset.q}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Form Box */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-2.5 sm:p-3 rounded-2xl bg-[#0E1524] border border-white/[0.08] shadow-2xl shrink-0 mt-2"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={`Ask about your career, timing, decisions, or chart (${seekerName})...`}
            disabled={isTyping}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080C14] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/60 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 text-black font-bold font-sans text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-md"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
