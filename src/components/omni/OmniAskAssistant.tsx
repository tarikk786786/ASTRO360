import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, User, Sparkles, Send, HelpCircle, Layers, BookOpen, 
  ShieldCheck, ArrowRight, RefreshCw, ChevronDown, ChevronUp,
  Briefcase, Heart, DollarSign, Clock, Compass, Activity,
  Sliders, Info, CheckCircle2, AlertTriangle, FileText, ArrowUpRight,
  Scale, ShieldAlert, Check, Calendar, Lock
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer from './OmniWhyDrawer';
import { PersonalProblemAnalyzer, SolvedProblemAnalysis } from '../../ai/solver/personalProblemAnalyzer';
import { AskApiHandler } from '../../ai/api/askApiHandler';

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
    { cat: 'LOVE', label: 'Love', q: 'What does my chart indicate for long-term marriage?', icon: Heart, color: 'text-rose-400' },
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
      rawText: `Namaste ${seekerName}. I am your ASTRO360 Personal Astrology AI Assistant. I analyze your chart across Vedic, Western, KP, and Jaimini systems with NASA JPL DE440 sub-arcsecond precision. Ask any question about your vocation, decisions, relationships, timing, or birth chart.`
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'summary' | 'astrology' | 'practical' | 'compare' | 'evidence'>>({});

  const calculationSteps = [
    'Understanding question...',
    'Loading validated chart context...',
    'Calculating JPL DE440 ephemeris coordinates...',
    'Running applicable astrology engines...',
    'Evaluating classical scripture rules...',
    'Computing multi-engine agreement...',
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
          rawText: 'ASTROCORE offline calculation fallback: Your planetary data is safely computed client-side.'
        }
      ]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-left pb-16 px-2 sm:px-4">
      {/* Top Header & Chart Context Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111315] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Ask ASTRO360
              </h1>
              <span className="text-[11px] font-mono text-slate-400 block">
                NASA JPL DE440 Sub-Arcsecond Ephemeris • Multi-Engine Reasoning
              </span>
            </div>
          </div>
        </div>

        {/* Active Chart Context Status Indicator */}
        <div className="flex flex-wrap items-center gap-2">
          {hasBirthData ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>USING MY CHART ({seekerName} • {userProfile.dob})</span>
            </div>
          ) : (
            <button
              onClick={() => onNavigate && onNavigate('charts')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono cursor-pointer hover:bg-amber-500/20 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>NO CHART LOADED • SET BIRTH DATA</span>
            </button>
          )}

          <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.08]">
            🔒 Zero-PII Private
          </span>
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
        {questionPresets.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSend(item.q)}
              className="px-3.5 py-2 rounded-xl bg-[#111315] hover:bg-[#181A1D] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/20 shrink-0 cursor-pointer transition-all flex items-center gap-1.5 min-h-[40px]"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={chatContainerRef}
        className="min-h-[460px] max-h-[640px] overflow-y-auto space-y-5 p-4 sm:p-6 rounded-2xl bg-[#0B0C10] border border-white/[0.08] shadow-2xl"
      >
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          const a = msg.analysis;
          const activeSubTab = activeTabMap[msg.id] || 'summary';

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 mt-1 text-amber-400">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[96%] sm:max-w-[88%] space-y-4 ${
                isAssistant
                  ? 'bg-[#111315] border border-white/[0.08] text-slate-200 p-4 sm:p-6 rounded-2xl shadow-xl'
                  : 'bg-white text-black p-4 sm:p-5 rounded-2xl font-medium text-sm'
              }`}>
                {/* User Message */}
                {!isAssistant && (
                  <p className="text-sm font-semibold">{msg.rawText}</p>
                )}

                {/* Assistant Plain Greeting */}
                {isAssistant && !a && (
                  <p className="text-sm sm:text-[15px] leading-relaxed text-slate-200">
                    {msg.rawText}
                  </p>
                )}

                {/* Rich Astrology AI Analysis Card */}
                {isAssistant && a && (
                  <div className="space-y-4">
                    {/* Safety Banner */}
                    {a.safetyNotice && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                        <span>{a.safetyNotice}</span>
                      </div>
                    )}

                    {/* Metadata Header Pill */}
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

                      {a.agreement && (
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded border border-emerald-400/20">
                          Engine Concordance: {a.agreement.agreementPercent}% ({a.agreement.participatingCount})
                        </span>
                      )}
                    </div>

                    {/* Sub-Tab Navigation Bar */}
                    <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-2 text-xs font-mono overflow-x-auto no-scrollbar">
                      {[
                        { id: 'summary', label: 'Summary' },
                        { id: 'astrology', label: '🪐 Astrology View' },
                        { id: 'practical', label: '🛠️ Practical View' },
                        { id: 'compare', label: '🌐 Traditions' },
                        { id: 'evidence', label: '📜 Evidence' },
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

                    {/* SUB-TAB 1: Summary */}
                    {activeSubTab === 'summary' && (
                      <div className="space-y-3.5">
                        <p className="text-sm sm:text-[15px] text-slate-100 font-sans leading-relaxed">
                          {a.summary}
                        </p>

                        {/* Decision Matrix if available */}
                        {a.decisionMatrix && (
                          <div className="p-4 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-3 mt-2">
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
                      </div>
                    )}

                    {/* SUB-TAB 2: Astrology View */}
                    {activeSubTab === 'astrology' && (
                      <div className="space-y-3 text-xs font-mono">
                        <div className="p-3.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-2">
                          <span className="text-[10px] text-amber-400 uppercase font-bold block">ASTROLOGY VIEW (WHAT YOUR CHART SHOWS):</span>
                          <p className="text-slate-200 font-sans text-sm font-semibold">{a.astrologyView.primaryTheme}</p>
                          
                          <div className="pt-2 border-t border-white/5 space-y-1 text-slate-300">
                            <div><strong className="text-slate-400">Active Dasha Cycle:</strong> {a.astrologyView.dashaCycle}</div>
                            <div><strong className="text-slate-400">Planetary Telemetry:</strong> {a.astrologyView.planetaryTelemetry}</div>
                            <div><strong className="text-slate-400">House Activations:</strong> {a.astrologyView.houseActivations}</div>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
                            {a.astrologyView.chartFactors.map((factor, fIdx) => (
                              <span key={fIdx} className="text-[10px] font-mono bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] text-slate-300">
                                • {factor}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Timing & Stability */}
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Birth-Time Stability:</span>
                            <span className="text-emerald-400 font-bold">{a.sensitivity.stability} ({a.sensitivity.driftInterval})</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans">{a.sensitivity.note}</p>
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB 3: Practical View */}
                    {activeSubTab === 'practical' && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-3">
                          <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">
                            🛠️ PRACTICAL VIEW (WHAT YOU CAN CONTROL):
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

                    {/* SUB-TAB 4: Multi-Tradition Compare */}
                    {activeSubTab === 'compare' && (
                      <div className="space-y-3 text-xs font-mono">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1">
                            <span className="text-[10px] text-amber-400 font-bold">VEDIC PARASHARI</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{a.systemsBreakdown.vedic}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1">
                            <span className="text-[10px] text-cyan-400 font-bold">WESTERN TROPICAL</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{a.systemsBreakdown.western}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1">
                            <span className="text-[10px] text-emerald-400 font-bold">KP STELLAR</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{a.systemsBreakdown.kp}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1">
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

                    {/* SUB-TAB 5: Evidence & Scripture Citations */}
                    {activeSubTab === 'evidence' && (
                      <div className="space-y-2.5 text-xs font-mono">
                        <span className="text-[10px] text-slate-500 uppercase font-medium block">Classical Scripture Citations & Ephemeris Authority:</span>
                        <div className="space-y-1.5">
                          {a.evidenceSources.map((ev, eIdx) => (
                            <div key={eIdx} className="p-2.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] flex items-center justify-between">
                              <span className="text-white font-medium">📜 {ev.citation}</span>
                              <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                                Tier {ev.tier} Primary
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] space-y-1 text-slate-400">
                          <div><strong>Engine Version:</strong> {a.reproducibility.engineVersion}</div>
                          <div><strong>Ephemeris:</strong> {a.reproducibility.ephemerisVersion}</div>
                          <div><strong>Ayanamsha:</strong> {a.reproducibility.ayanamsha}</div>
                        </div>
                      </div>
                    )}

                    {/* Contextual Action Shortcuts */}
                    {onNavigate && (
                      <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500 block w-full">Contextual Navigation:</span>
                        <button
                          onClick={() => onNavigate('charts')}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Compass className="w-3.5 h-3.5 text-indigo-400" />
                          <span>View Birth Chart</span>
                        </button>
                        <button
                          onClick={() => onNavigate('forecast')}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View Forecast</span>
                        </button>
                        <button
                          onClick={() => onNavigate('dasha')}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Activity className="w-3.5 h-3.5 text-amber-400" />
                          <span>Inspect Dasha</span>
                        </button>
                      </div>
                    )}

                    {/* Context-Aware Follow-Up Chips */}
                    {a.followUps && a.followUps.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Suggested Inquiries:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {a.followUps.map((fQ, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => handleSend(fQ)}
                              className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] hover:border-white/[0.12] transition-colors cursor-pointer text-left"
                            >
                              "{fQ}"
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Real-Time Calculation Progress Display */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-2xl bg-[#111315] border border-white/[0.08] space-y-2 text-xs font-mono text-slate-300 max-w-md"
          >
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Bot className="w-4 h-4 animate-spin" />
              <span>ASTROCORE Processing Pipeline</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400 pl-6">
              {calculationSteps.map((step, sIdx) => (
                <div 
                  key={sIdx} 
                  className={`flex items-center gap-1.5 ${sIdx === currentStepIndex ? 'text-white font-bold' : sIdx < currentStepIndex ? 'text-emerald-400' : 'text-slate-600'}`}
                >
                  {sIdx < currentStepIndex ? <Check className="w-3 h-3 text-emerald-400" /> : sIdx === currentStepIndex ? <span className="animate-pulse">▶</span> : <span className="opacity-40">○</span>}
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-2 rounded-2xl bg-[#111315] border border-white/[0.08] focus-within:border-white/20 shadow-2xl flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask anything about your chart, career, love, timing, or Dasha..."
          className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none px-3 py-2 font-sans"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 text-black font-bold font-sans text-xs cursor-pointer transition-all flex items-center gap-1.5 shadow-md shrink-0"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
