import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, User, Sparkles, Send, Mic, HelpCircle, Layers, BookOpen, 
  ShieldCheck, ArrowRight, CornerDownLeft, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer from './OmniWhyDrawer';

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

export default function OmniAskAssistant({ userProfile }: { userProfile: UserProfile }) {
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

    // Simulate multi-tradition synthesis AI response with 3 levels of progressive disclosure
    setTimeout(() => {
      let botResponse: ChatMessage;

      const lower = query.toLowerCase();
      if (lower.includes('career') || lower.includes('job') || lower.includes('work')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          summary: "Your strongest upcoming career window peaks between September 12 and October 28, 2026.",
          explanation: {
            why: "Three independent astrology traditions show synchronized professional expansion during this period.",
            mainTheme: "Leadership growth, executive responsibility, and elevated public visibility.",
            supportedSystems: ["Vedic (Jyotish) ➔ Jupiter 10th Kendra", "Western Tropical ➔ Sun trine MC", "KP Astrology ➔ 10th Sub-lord"]
          },
          technical: {
            planetaryDegrees: "Jupiter at 18°24' Cancer, Sun at 22°10' Leo, Saturn at 14°02' Pisces",
            activeHouse: "10th House (Karma/Profession) & 11th House (Labhasthana/Gains)",
            dashaCycle: "Jupiter Mahadasha / Mercury Antardasha",
            ruleIds: ["BPHS-CH24-V12", "TETRA-BK4-C3", "KP-R4-S10"]
          },
          followUps: [
            "What specific days are best for interviews?",
            "What challenges should I avoid during this career window?",
            "How does my Chinese BaZi pillar align with this?"
          ]
        };
      } else if (lower.includes('love') || lower.includes('relationship') || lower.includes('marriage')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          summary: "Your relationship energy is in a harmonious growth phase, especially active over the upcoming 6 weeks.",
          explanation: {
            why: "Venus transit forms a gentle trine with your natal Moon, softening communication and deepening trust.",
            mainTheme: "Emotional safety, shared life goals, and mutual vulnerability.",
            supportedSystems: ["Vedic ➔ 7th Lord Venus Kendra Transit", "Western ➔ Solar progression through 7th House"]
          },
          technical: {
            planetaryDegrees: "Venus at 12°45' Libra, Moon at 08°19' Taurus",
            activeHouse: "7th House (Kalatra/Partnership)",
            dashaCycle: "Venus Sub-cycle in D9 Navamsha",
            ruleIds: ["BPHS-D9-VENUS", "VALENS-BK2-REL"]
          },
          followUps: [
            "What is my Ashta Koota compatibility profile?",
            "When is the most auspicious window for commitment?",
            "What does my D9 Navamsha say about my spouse?"
          ]
        };
      } else {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          summary: `Analyzing your natal chart for ${userProfile.name || 'your profile'}: You are currently experiencing an active period of personal integration and mental clarity.`,
          explanation: {
            why: "Your ascendant ruler is in a supportive angular position relative to the transiting planets.",
            mainTheme: "Personal alignment, decisive strategy, and long-term foundation building.",
            supportedSystems: ["Vedic Jyotish", "Western Modern", "Chinese 4 Pillars"]
          },
          technical: {
            planetaryDegrees: "Sun (Leo), Moon (Taurus), Ascendant (Sagittarius)",
            activeHouse: "1st & 9th House Dharma axis",
            dashaCycle: "Active Vimshottari period",
            ruleIds: ["BPHS-LAGNA-GEN", "PTOL-ASPECT-TRINE"]
          },
          followUps: [
            "When is my next major life transition?",
            "What are my greatest astrological strengths?",
            "Show my full multi-system comparison"
          ]
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 900);
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
      <div className="min-h-[420px] max-h-[560px] overflow-y-auto space-y-4 p-4 rounded-3xl bg-[#0B1220] border border-white/10">
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

        <div ref={messagesEndRef} />
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
