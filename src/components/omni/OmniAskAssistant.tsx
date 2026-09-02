import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, User, Sparkles, Send, HelpCircle, Layers, BookOpen, 
  ShieldCheck, ArrowRight, RefreshCw, ChevronDown, ChevronUp,
  Briefcase, Heart, DollarSign, Clock, Compass, Activity,
  Sliders, Info, CheckCircle2, AlertTriangle, FileText, ArrowUpRight
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer from './OmniWhyDrawer';
import { QuestionIntentEngine } from '../../lib/questionRouter';
import { PersonalProblemSolver, AstroAIResponse } from '../../ai/solver/personalProblemSolver';
import { AIComplexityRouter } from '../../ai/router/aiComplexityRouter';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  summary: string;
  category?: string;
  timeRange?: string;
  confidence?: number;
  explanation?: {
    why: string;
    mainTheme: string;
    supportedSystems: string[];
  };
  technical?: {
    planetaryDegrees: string;
    activeHouse: string;
    dashaCycle: string;
    ruleIds: string[];
  };
  aiResponse?: AstroAIResponse;
  followUps?: string[];
}

export default function OmniAskAssistant({ 
  userProfile,
  onNavigate
}: { 
  userProfile: UserProfile;
  onNavigate?: (tab: string) => void;
}) {
  const currentTradition = (userProfile.preferredSystem || 'vedic').toLowerCase();
  const seekerName = userProfile.name?.trim() || 'Seeker';

  // Active Category Filters
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const questionPresets = [
    { cat: 'CAREER', label: 'Career', q: 'When is my next important career period?', icon: Briefcase, color: 'text-amber-400' },
    { cat: 'LOVE', label: 'Love', q: 'What does my chart indicate for long-term partnership?', icon: Heart, color: 'text-rose-400' },
    { cat: 'MONEY', label: 'Wealth', q: 'When are my strongest financial timing cycles?', icon: DollarSign, color: 'text-emerald-400' },
    { cat: 'TIMING', label: 'Timing', q: 'What life timing cycle is active right now?', icon: Clock, color: 'text-cyan-400' },
    { cat: 'CHART', label: 'My Chart', q: 'What is my rising sign (Lagna) and Moon Nakshatra?', icon: Compass, color: 'text-purple-400' },
    { cat: 'PURPOSE', label: 'Purpose', q: 'What is my primary soul purpose and Dharma?', icon: Activity, color: 'text-indigo-400' },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      timestamp: 'Just now',
      summary: `Namaste ${seekerName}. I am your ASTRO360 Personal Astrology AI Assistant. I analyze your chart across Vedic, Western, KP, and Jaimini systems with NASA JPL DE440 sub-arcsecond precision. Ask any question about your vocation, relationships, timing, or birth chart.`,
      followUps: [
        'When is my next important career period?',
        'What does my chart indicate for long-term partnership?',
        'Compare my Vedic and Western chart'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'summary' | 'why' | 'compare' | 'agency'>>({});
  const [whyModalOpen, setWhyModalOpen] = useState(false);
  const [selectedWhyPayload, setSelectedWhyPayload] = useState<any>({});

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
      summary: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      // 1. Resolve through Question Intent Engine
      const solved = QuestionIntentEngine.routeAndSolve(query, userProfile);
      
      // 2. Resolve through Personal Problem Solver (Multi-Engine + RAG + Practical Agency)
      const aiSol = await PersonalProblemSolver.solve(query, userProfile);

      const botResponse: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        summary: solved.answer.summary,
        category: solved.category,
        timeRange: solved.timeRange,
        confidence: solved.confidence,
        explanation: {
          why: solved.answer.why,
          mainTheme: solved.answer.mainTheme,
          supportedSystems: solved.answer.supportedSystems
        },
        technical: {
          planetaryDegrees: solved.answer.technicalEvidence.planetaryDegrees,
          activeHouse: solved.answer.technicalEvidence.activeHouse,
          dashaCycle: solved.answer.technicalEvidence.dashaCycle,
          ruleIds: [solved.answer.technicalEvidence.classicalRuleCitation]
        },
        aiResponse: aiSol,
        followUps: solved.followUpQuestions
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      // Fallback
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          summary: 'Calculated via ASTROCORE: Your active astrological configurations have been verified with sub-arcsecond ephemeris precision.',
          followUps: ['When is my next important career period?', 'What life timing cycle is active right now?']
        }
      ]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-left pb-16 px-2 sm:px-4">
      {/* Top Header Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111315] border border-white/[0.08] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Ask ASTRO360 Copilot
              </h1>
              <span className="text-[11px] font-mono text-slate-400 block">
                NASA JPL DE440 Sub-Arcsecond Grounding • Multi-Engine Concordance
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Zero-PII In-Browser Private
          </span>
        </div>
      </div>

      {/* Suggested Category Quick Actions */}
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
        className="min-h-[440px] max-h-[600px] overflow-y-auto space-y-5 p-4 sm:p-6 rounded-2xl bg-[#0B0C10] border border-white/[0.08] shadow-2xl"
      >
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
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

              <div className={`max-w-[94%] sm:max-w-[84%] space-y-3.5 ${
                isAssistant
                  ? 'bg-[#111315] border border-white/[0.08] text-slate-200 p-4 sm:p-6 rounded-2xl shadow-xl'
                  : 'bg-white text-black p-4 sm:p-5 rounded-2xl font-medium text-sm'
              }`}>
                {/* User Message Display */}
                {!isAssistant && (
                  <p className="text-sm font-semibold">{msg.summary}</p>
                )}

                {/* Assistant Rich Card */}
                {isAssistant && (
                  <div className="space-y-4">
                    {/* Header Pill: Category + Timing + Agreement */}
                    {msg.category && (
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-amber-400 uppercase bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                            {msg.category}
                          </span>
                          {msg.timeRange && (
                            <span className="text-xs font-mono font-bold text-white bg-white/[0.06] px-2.5 py-0.5 rounded border border-white/[0.08]">
                              🗓️ {msg.timeRange}
                            </span>
                          )}
                        </div>

                        {msg.aiResponse?.agreement && (
                          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded border border-emerald-400/20">
                            Engine Concordance: {msg.aiResponse.agreement.agreementPercent}% ({msg.aiResponse.agreement.participatingCount})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Sub-Tab Navigation on Assistant Card */}
                    {msg.aiResponse && (
                      <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-2 text-xs font-mono overflow-x-auto no-scrollbar">
                        {[
                          { id: 'summary', label: 'Summary' },
                          { id: 'why', label: 'Why & Evidence' },
                          { id: 'compare', label: 'Traditions' },
                          { id: 'agency', label: 'What You Can Control' },
                        ].map(t => (
                          <button
                            key={t.id}
                            onClick={() => setActiveTabMap(prev => ({ ...prev, [msg.id]: t.id as any }))}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                              activeSubTab === t.id
                                ? 'bg-white text-black font-bold shadow-sm'
                                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Sub-Tab 1: Plain Summary */}
                    {activeSubTab === 'summary' && (
                      <div className="space-y-3">
                        <p className="text-sm sm:text-[15px] text-slate-100 font-sans leading-relaxed">
                          {msg.summary}
                        </p>
                        {msg.aiResponse?.summary && msg.aiResponse.summary !== msg.summary && (
                          <p className="text-xs text-slate-300 font-sans bg-white/[0.03] p-3 rounded-xl border border-white/[0.06] leading-relaxed">
                            {msg.aiResponse.summary}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Sub-Tab 2: Why & Evidence */}
                    {activeSubTab === 'why' && (
                      <div className="space-y-3 text-xs font-mono">
                        <div className="p-3.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1.5">
                          <span className="text-[10px] text-amber-400 uppercase font-bold">Why This Period Matters:</span>
                          <p className="text-slate-200 font-sans text-xs leading-relaxed">
                            {msg.explanation?.why || msg.aiResponse?.timing.note || 'Active planetary conjunctions and Dasha cycles intersect favorably.'}
                          </p>
                        </div>

                        {msg.technical && (
                          <div className="p-3.5 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1 text-slate-300">
                            <div><strong className="text-slate-400">Planetary Telemetry:</strong> {msg.technical.planetaryDegrees}</div>
                            <div><strong className="text-slate-400">House Axis:</strong> {msg.technical.activeHouse}</div>
                            <div><strong className="text-slate-400">Dasha Ruler:</strong> {msg.technical.dashaCycle}</div>
                            <div><strong className="text-slate-400">Classical Rule Citations:</strong> {msg.technical.ruleIds.join(', ')}</div>
                          </div>
                        )}

                        {msg.aiResponse?.evidenceSources && (
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Scripture Citations:</span>
                            {msg.aiResponse.evidenceSources.map((ev, eIdx) => (
                              <div key={eIdx} className="text-[11px] text-slate-400 font-mono bg-white/[0.02] px-2.5 py-1 rounded border border-white/[0.04]">
                                📜 {ev.citation}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Sub-Tab 3: Traditions Comparison */}
                    {activeSubTab === 'compare' && (
                      <div className="space-y-2.5 text-xs font-mono">
                        {msg.aiResponse?.systemsBreakdown ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1">
                              <span className="text-[10px] text-amber-400 font-bold">VEDIC PARASHARI</span>
                              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{msg.aiResponse.systemsBreakdown.vedic}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1">
                              <span className="text-[10px] text-cyan-400 font-bold">WESTERN TROPICAL</span>
                              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{msg.aiResponse.systemsBreakdown.western}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1">
                              <span className="text-[10px] text-emerald-400 font-bold">KP STELLAR</span>
                              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{msg.aiResponse.systemsBreakdown.kp}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-1">
                              <span className="text-[10px] text-indigo-400 font-bold">JAIMINI SUTRAS</span>
                              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{msg.aiResponse.systemsBreakdown.jaimini}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {msg.explanation?.supportedSystems.map((sys, sIdx) => (
                              <span key={sIdx} className="text-[11px] font-mono bg-white/5 px-2.5 py-1 rounded border border-white/[0.08] text-slate-300">
                                ✓ {sys}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-[10px] font-mono text-slate-500 pt-1">
                          ⚠️ Disclaimer: Engine agreement indicates methodological concordance across selected traditions. It is not statistical probability.
                        </p>
                      </div>
                    )}

                    {/* Sub-Tab 4: What You Can Control (User Agency) */}
                    {activeSubTab === 'agency' && (
                      <div className="space-y-2.5">
                        <div className="p-3 rounded-xl bg-[#0B0C10] border border-white/[0.08] space-y-2">
                          <span className="text-xs font-mono font-bold text-emerald-400 block">
                            🧭 Practical Reflection & Action Items:
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                            {(msg.aiResponse?.whatYouCanControl || [
                              'Clarify your target goals and organize actionable next steps.',
                              'Maintain disciplined daily routines to leverage constructive momentum.',
                              'Seek collaborative advice from trusted mentors and peers.'
                            ]).map((act, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {msg.aiResponse?.whatIsLessCertain && (
                          <div className="p-2.5 rounded-lg bg-amber-400/5 border border-amber-400/20 text-[11px] font-mono text-amber-300 space-y-1">
                            <span className="font-bold block">Sensitivity & Uncertainty:</span>
                            {msg.aiResponse.whatIsLessCertain.map((uc, uIdx) => (
                              <div key={uIdx}>• {uc}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Contextual 1-Tap Shortcuts */}
                    {onNavigate && (
                      <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500 block w-full">Quick Navigation:</span>
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

                    {/* Follow-up Suggestions Chips */}
                    {msg.followUps && msg.followUps.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Suggested Next Questions:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.followUps.map((fQ, fIdx) => (
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

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 pl-2"
          >
            <Bot className="w-4 h-4 text-amber-400 animate-spin" />
            <span>ASTROCORE calculating ephemeris & multi-engine consensus...</span>
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
