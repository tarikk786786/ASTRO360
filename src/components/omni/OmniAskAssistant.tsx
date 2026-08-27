import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, User, Sparkles, Send, Mic, HelpCircle, Layers, BookOpen, 
  ShieldCheck, ArrowRight, CornerDownLeft, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer from './OmniWhyDrawer';
import { QuestionIntentEngine } from '../../lib/questionRouter';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  // Level 1: Simple concise answer
  summary: string;
  // Level 2: Explanation
  explanation?: {
    why: string;
    mainTheme: string;
    supportedSystems: string[];
  };
  // Level 3: Technical
  technical?: {
    planetaryDegrees: string;
    activeHouse: string;
    dashaCycle: string;
    ruleIds: string[];
  };
  followUps?: string[];
}

export default function OmniAskAssistant({ 
  userProfile,
  onNavigate
}: { 
  userProfile: UserProfile;
  onNavigate?: (tab: string) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      timestamp: 'Just now',
      summary: `Hello ${userProfile.name?.trim() || 'Seeker'}, I am your ASTRO360 astrological assistant. I analyze your chart across Vedic, Western, KP, and BaZi systems simultaneously. What would you like to know about your life or timing?`,
      followUps: [
        "When is my strongest career period?",
        "What does this month mean for love?",
        "Compare my Vedic and Western chart"
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedTechId, setExpandedTechId] = useState<string | null>(null);
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
    // Only scroll within the chat container when user sends or receives messages
    if (messages.length > 1 || isTyping) {
      scrollToBottom();
    }
  }, [messages.length, isTyping]);

  const handleSend = (textToSend?: string) => {
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

    // Leverage ASTRO360 Universal Question Intent Engine for calculated multi-tradition synthesis
    setTimeout(() => {
      const solved = QuestionIntentEngine.routeAndSolve(query, userProfile);
      const botResponse: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        summary: solved.answer.summary,
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
        followUps: solved.followUpQuestions
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 text-left pb-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400" />
            Ask ASTRO360
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Direct, Concise Answers First • Deep Progressive Disclosure When Needed
          </p>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" /> 4 Traditions Active
        </span>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
        <span className="text-slate-500 shrink-0">Try:</span>
        {[
          "When is my strongest career period?",
          "What does this month mean for love?",
          "Compare my Vedic and Western chart",
          "What are my best months for travel?"
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 shrink-0 cursor-pointer transition-colors"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={chatContainerRef}
        className="min-h-[420px] max-h-[560px] overflow-y-auto space-y-4 p-4 rounded-3xl bg-[#0B1220] border border-white/10"
      >
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          const isTechExpanded = expandedTechId === msg.id;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-indigo-400" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] space-y-3 ${
                isAssistant
                  ? 'bg-[#0F172A] border border-white/10 text-slate-200 p-4 sm:p-5 rounded-3xl rounded-tl-sm'
                  : 'bg-indigo-600 text-white p-4 rounded-3xl rounded-tr-sm'
              }`}>
                {/* Level 1: Simple Concise Answer */}
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {msg.summary}
                </p>

                {/* Level 2: Explanation (Why & Themes) */}
                {msg.explanation && (
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                        Why This Timing:
                      </span>
                      <p className="text-slate-300 leading-snug">{msg.explanation.why}</p>
                    </div>

                    <div className="space-y-1 pt-1 border-t border-white/5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                        Main Theme:
                      </span>
                      <p className="text-slate-300 font-medium">{msg.explanation.mainTheme}</p>
                    </div>

                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {msg.explanation.supportedSystems.map((sys, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 text-slate-300">
                          ✓ {sys}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Level 3: Technical Details Accordion */}
                {msg.technical && (
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => setExpandedTechId(isTechExpanded ? null : msg.id)}
                      className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {isTechExpanded ? 'Hide Technical Evidence' : 'View Technical Details (Level 3)'}
                      {isTechExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isTechExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 rounded-xl bg-[#080E1A] border border-indigo-500/30 space-y-1.5 text-[11px] font-mono text-slate-300"
                      >
                        <div><strong className="text-slate-400">Planetary Positions:</strong> {msg.technical.planetaryDegrees}</div>
                        <div><strong className="text-slate-400">House Activation:</strong> {msg.technical.activeHouse}</div>
                        <div><strong className="text-slate-400">Dasha Cycle:</strong> {msg.technical.dashaCycle}</div>
                        <div><strong className="text-slate-400">Rule IDs:</strong> {msg.technical.ruleIds.join(', ')}</div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Contextual Deep Link Actions (1-tap access to relevant engine) */}
                {isAssistant && onNavigate && (
                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-amber-400 font-bold block w-full mb-0.5">
                      Contextual Actions:
                    </span>
                    {(msg.summary.toLowerCase().includes('dasha') || (msg.technical?.dashaCycle && msg.technical.dashaCycle !== 'N/A')) && (
                      <button
                        onClick={() => onNavigate('dasha')}
                        className="px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10.5px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>[Open Dasha]</span>
                      </button>
                    )}
                    {(msg.summary.toLowerCase().includes('chart') || msg.summary.toLowerCase().includes('vedic') || msg.summary.toLowerCase().includes('western')) && (
                      <button
                        onClick={() => onNavigate('charts')}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10.5px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>[View Chart]</span>
                      </button>
                    )}
                    {(msg.summary.toLowerCase().includes('love') || msg.summary.toLowerCase().includes('relationship') || msg.summary.toLowerCase().includes('partner')) && (
                      <button
                        onClick={() => onNavigate('compatibility')}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10.5px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>[Open Compatibility]</span>
                      </button>
                    )}
                    {(msg.summary.toLowerCase().includes('career') || msg.summary.toLowerCase().includes('timing') || msg.summary.toLowerCase().includes('month')) && (
                      <button
                        onClick={() => onNavigate('forecast')}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10.5px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>[Explore Timing]</span>
                      </button>
                    )}
                    <button
                      onClick={() => onNavigate('studio')}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[10.5px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>[Open in Studio →]</span>
                    </button>
                  </div>
                )}

                {/* Suggested Follow-Ups */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-500 block">Suggested Follow-ups:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.followUps.map((fUp, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => handleSend(fUp)}
                          className="text-[11px] font-mono bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 text-left transition-colors cursor-pointer"
                        >
                          → {fUp}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/40 border border-indigo-500/60 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 p-2">
            <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>ASTRO360 synthesizing multi-tradition ephemeris...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-2 rounded-2xl bg-[#0F172A] border border-white/15 focus-within:border-indigo-500/60 shadow-xl transition-all"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask anything about your astrology, timing, or comparisons..."
          className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Voice input"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <Mic className="w-4 h-4" />
        </button>
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Universal Explainability Drawer Modal */}
      <OmniWhyDrawer
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
        {...selectedWhyPayload}
      />
    </div>
  );
}
