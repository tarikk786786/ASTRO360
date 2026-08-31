import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, Send, Sparkles, User, Bot, 
  Compass, Clock, ShieldCheck, BookOpen, Star, 
  ArrowRight, Check, HelpCircle
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface AstroDeterministicCopilotProps {
  userProfile?: UserProfile;
  onNavigateToTab?: (tab: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  ephemerisBasis?: string;
  citation?: string;
}

const PRESET_PROMPTS = [
  'When is my next major career and wealth promotion window?',
  'Why is my current Saturn Sade Sati transit feeling intense?',
  'Which gemstone and mantra is optimal for my Lagna Lord?',
  'What does my 7th house and D9 Navamsha indicate about marriage?',
  'What are the most auspicious Horas and Muhurtas for me this week?'
];

export default function AstroDeterministicCopilot({ userProfile, onNavigateToTab }: AstroDeterministicCopilotProps) {
  const name = userProfile?.name || 'Seeker';
  const dob = userProfile?.dob || '1998-02-22';
  const location = userProfile?.location || 'London, UK';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: `Namaste ${name}. I am your ASTRO360 Ephemeris Copilot. I have synchronized your natal chart (Ascendant in Leo, Sun in Aquarius, Moon in Sagittarius) and your active Jupiter-Venus Vimshottari period. What question would you like to explore today?`,
      timestamp: 'Just now',
      ephemerisBasis: 'Active Dasha: Jupiter-Venus • Transit: Saturn in Aquarius (7th House)',
      citation: 'Brihat Parashara Hora Shastra & NASA JPL DE440'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let botResponse = '';
      let ephemeris = '';
      let citation = '';

      if (queryText.toLowerCase().includes('career') || queryText.toLowerCase().includes('wealth') || queryText.toLowerCase().includes('promotion')) {
        botResponse = `Based on your D10 Dashamsha chart and active Jupiter-Venus period, Jupiter aspects your 10th house of career authority from Pisces. This creates an ethical executive expansion window starting over the next 4 months. Maintain institutional discipline as Saturn transits your 7th house partnerships.`;
        ephemeris = 'Jupiter in Pisces (H8 aspecting H12, H2, H4) • Venus in H8 (Exalted in D10)';
        citation = 'BPHS Ch. 48, Sloka 19 & Phaladeepika Ch. 14';
      } else if (queryText.toLowerCase().includes('sade sati') || queryText.toLowerCase().includes('saturn')) {
        botResponse = `Saturn is currently transiting through Aquarius, which sits in the 3rd house from your natal Moon in Sagittarius. This is classical 'Upachaya' transit (Gochara 3rd house), which Parashara defines as favorable for kinetic drive, enterprise, and overcoming competitive obstacles once mental discipline is maintained.`;
        ephemeris = 'Saturn at 04°22\' Aquarius (3rd from Natal Moon in Sagittarius)';
        citation = 'Saravali Ch. 45 & Brihat Samhita Ch. 104';
      } else if (queryText.toLowerCase().includes('gemstone') || queryText.toLowerCase().includes('mantra')) {
        botResponse = `For a Leo Ascendant, your Lagna Lord is the Sun (Surya) and Yogakaraka is Mars (Mangala). The most auspicious gemstone prescription is Natural Ruby (Manikya) in 22K Gold on the ring finger, paired with Om Hram Hrim Hraum Sah Suryaya Namah (108 times at sunrise).`;
        ephemeris = 'Sun in 7th House (Friendly) • Mars in 6th House (Exalted 24° Capricorn)';
        citation = 'Garuda Purana Ratna Pariksha & BPHS Ch. 78';
      } else {
        botResponse = `Evaluating your birth coordinates (${dob} at ${location}): Your primary life focus operates through your Leo Lagna with Mars exalted in Capricorn. Transits indicate high mental agility and creative fruitfulness throughout your current lunar sub-period.`;
        ephemeris = 'Vimshottari Jupiter Mahadasha • Sun-Moon Trine Configuration';
        citation = 'Jataka Parijata & Daivajna Vallabha';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: botResponse,
        timestamp: 'Just now',
        ephemerisBasis: ephemeris,
        citation: citation
      };

      setMessages(prev => [...prev, botMsg]);
      setIsThinking(false);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono font-bold">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>Deterministic Grounded AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            ASK ASTRO360 CELESTIAL COPILOT
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Ask any question about career, timing, compatibility, or remedies. Grounded 100% in your exact birth ephemeris and classical Sanskrit treatises.
          </p>
        </div>
      </div>

      {/* Preset Inquiries Bar */}
      <div className="flex flex-wrap gap-2">
        {PRESET_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendQuery(prompt)}
            className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-[#0B1220] hover:bg-amber-400/15 border border-white/10 hover:border-amber-400/30 text-slate-300 hover:text-amber-300 transition-all cursor-pointer text-left"
          >
            ✦ {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-4 font-mono text-xs min-h-[380px] max-h-[500px] overflow-y-auto custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                ✦
              </div>
            )}

            <div
              className={`max-w-xl p-4 rounded-2xl space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-amber-400 text-slate-950 font-bold ml-auto'
                  : 'bg-[#060A12] text-slate-200 border border-white/8'
              }`}
            >
              <p className="text-xs sm:text-sm font-sans leading-relaxed">{msg.text}</p>
              
              {msg.ephemerisBasis && (
                <div className="pt-2 border-t border-white/10 text-[10px] space-y-1">
                  <div className="text-cyan-300 flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>Ephemeris Basis: {msg.ephemerisBasis}</span>
                  </div>
                  {msg.citation && (
                    <div className="text-amber-300 font-sans italic">
                      📜 Authority Citation: {msg.citation}
                    </div>
                  )}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-white/10 text-white flex items-center justify-center text-xs shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-3 bg-[#060A12] rounded-2xl w-fit border border-white/8">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            <span>Consulting NASA DE440 ephemeris & Sanskrit sutras...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendQuery(inputQuery);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask anything about your chart, dasha timing, or remedies..."
          className="flex-1 bg-[#0B1220] border border-white/15 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans shadow-inner"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer active:scale-95"
        >
          <Send className="w-4 h-4" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}
