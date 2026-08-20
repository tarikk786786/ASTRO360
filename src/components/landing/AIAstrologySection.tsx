import React, { useState } from 'react';
import { Sparkles, MessageCircle, Bot, User, ArrowRight, ShieldAlert, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAstrologySectionProps {
  onOpenChat: () => void;
}

const SAMPLE_PROMPTS = [
  'Why do I feel a career shift coming?',
  'What does my Moon in Taurus mean?',
  'How do I make the most of my Jupiter Dasha?',
  'What are my key relationship strengths?',
];

const PROMPT_RESPONSES: Record<string, string> = {
  'Why do I feel a career shift coming?':
    'Your chart shows Saturn transiting your 10th house of public career while entering a dynamic sub-period of Mercury. This combination naturally prompts a desire for greater autonomy, skill expansion, and alignment with your authentic long-term purpose.',
  'What does my Moon in Taurus mean?':
    'Moon in Taurus is considered exalted (Ucha) in Vedic astrology. It reflects strong emotional resilience, a deep appreciation for tranquility and sensory beauty, and a grounded instinct for financial stability and steadfast loyalty.',
  'How do I make the most of my Jupiter Dasha?':
    'Jupiter Mahadasha emphasizes wisdom, mentorship, and ethical expansion. It is an optimal multi-year period to pursue higher education, travel, establish philanthropic contributions, and step into senior advisory roles.',
  'What are my key relationship strengths?':
    'With Venus well-placed in the 7th house and receiving beneficial aspects from Jupiter, your relationship strengths include deep empathy, natural mediation skills, and the capacity to nurture emotional safety in your partnership.',
};

export default function AIAstrologySection({ onOpenChat }: AIAstrologySectionProps) {
  const [selectedPrompt, setSelectedPrompt] = useState(SAMPLE_PROMPTS[0]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05] bg-[#070A12]/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Intelligent Chart Companion
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Technology helps you understand your chart.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal">
            Astrology can be complex. Our intelligent assistant translates technical Sanskrit ephemeris and planetary periods into explanations that are straightforward and empowering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Sample Questions */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold text-slate-100 font-serif">
              Ask meaningful questions about your life:
            </h3>
            <p className="text-xs text-slate-400">
              Select an inquiry below to see how our AI translates astrological data into practical guidance:
            </p>

            <div className="space-y-2.5 pt-2">
              {SAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setSelectedPrompt(prompt)}
                  className={`w-full text-left p-3.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedPrompt === prompt
                      ? 'bg-[#C9A86A]/15 border border-[#C9A86A]/40 text-slate-100 font-medium'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9A86A] flex-shrink-0 ml-2" />
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenChat}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] text-xs font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Live With Astrological AI</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Chat Interface Preview */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0D1220]/90 border border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col justify-between min-h-[380px]">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A]/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#C9A86A]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sage Parashara AI</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Synchronized with your Natal Chart</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400">
                Vedic RAG Engine
              </span>
            </div>

            {/* Conversation Messages */}
            <div className="space-y-4 my-2">
              {/* User Bubble */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="max-w-[80%] p-3.5 rounded-2xl rounded-tr-sm bg-white/[0.06] border border-white/[0.08] text-xs text-slate-200">
                  {selectedPrompt}
                </div>
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              </div>

              {/* AI Response Bubble */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPrompt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A]/30 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
                  </div>
                  <div className="max-w-[85%] p-4 rounded-2xl rounded-tl-sm bg-[#070A12] border border-[#C9A86A]/25 text-xs text-slate-200 leading-relaxed font-normal shadow-lg">
                    {PROMPT_RESPONSES[selectedPrompt]}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Disclaimer Footer */}
            <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed font-mono">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500/70 flex-shrink-0 mt-0.5" />
              <span>
                AI interpretations are for educational and self-reflection purposes and should not be treated as professional medical, legal, or financial advice.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
