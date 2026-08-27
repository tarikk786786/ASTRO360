import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Markdown from 'react-markdown';
import { Send, Loader2, Sparkles, Bot, User, MessageCircle, Trash2, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "✨ Read my full birth chart & planetary dignities",
  "🌙 What are my current transit influences & power hours?",
  "❤️ Deep Synastry & relationship compatibility reading",
  "💼 Career, wealth & life purpose forecast",
  "🔮 Daily Tarot & Numerology guidance",
  "🛡️ Custom remedial remedies & planetary peace"
];

interface Persona {
  id: 'vedic' | 'islamic' | 'western' | 'bazi';
  name: string;
  title: string;
  icon: string;
  badgeColor: string;
  greeting: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'vedic',
    name: 'Sage Parashara',
    title: 'Vedic Jyotish Rishi',
    icon: '🕉️',
    badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    greeting: 'Namaste, seeker. I am **Sage Parashara**, master of Vedic Sidereal Jyotish, Vimshottari Dasha, and Navaratna Gemstones. Let us analyze your karma and planetary alignment.'
  },
  {
    id: 'islamic',
    name: 'Al-Biruni',
    title: 'Islamic Astronomy & Abjad Scholar',
    icon: '🕌',
    badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    greeting: 'Assalamu Alaikum. I am **Al-Biruni**, scholar of 28 Manazil al-Qamar (Lunar Mansions), Ilm al-Nujum, Abjad numerology, and Istikhara. Ask me for sacred guidance and Barakah.'
  },
  {
    id: 'western',
    name: 'Claudius Ptolemy',
    title: 'Hellenistic & Tropical Master',
    icon: '🏛️',
    badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    greeting: 'Greetings. I am **Claudius Ptolemy**, architect of the Tetrabiblos, Tropical transits, and Planetary Hours. Let us examine your natal houses and planetary aspects.'
  },
  {
    id: 'bazi',
    name: 'Grandmaster Wu',
    title: 'BaZi 4 Pillars & Wu Xing Master',
    icon: '☯️',
    badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    greeting: 'Welcome. I am **Grandmaster Wu**, keeper of the BaZi 4 Pillars of Destiny (八字) and Wu Xing 5-Element Feng Shui balance. Let us harmonize your Yin & Yang Chi.'
  }
];

export default function AstrologyChat() {
  const [activePersonaId, setActivePersonaId] = useState<'vedic' | 'islamic' | 'western' | 'bazi'>('vedic');
  const activePersona = PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      content: activePersona.greeting,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Only scroll within the chat box when user actively messages
    if (messages.length > 1 || isLoading) {
      scrollToBottom();
    }
  }, [messages.length, isLoading]);

  const handleSubmit = async (e?: React.FormEvent, promptOverride?: string) => {
    e?.preventDefault();
    const prompt = promptOverride || input;
    if (!prompt.trim() || isLoading) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      let aiText = '';
      try {
        const response = await fetch('/api/astrology', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: newUserMsg.content })
        });

        const contentType = response.headers.get('content-type');
        if (response.ok && contentType && contentType.includes('application/json')) {
          const data = await response.json();
          aiText = data.text;
        }
      } catch (e) {
        console.warn('Endpoint unavailable, using master astrologer consultation engine:', e);
      }

      if (!aiText) {
        // Master Multi-Dimensional 360° Astrological Solution Synthesis Engine
        const q = newUserMsg.content.toLowerCase();
        
        let title = "✨ Master Astrologer Comprehensive 360° Solution";
        let planetaryRoot = "Planetary Alignment Friction between 10th House Lord & Transiting Saturn";
        let vedicSolution = "Wear Yellow Sapphire (5.25 Carat) or Yellow Topaz on Index Finger; chant Guru Beej Mantra 108x on Thursday.";
        let islamicSolution = "Recite Surah Al-Waqi'ah after Maghrib & 'Hasbunallahu wa ni'mal wakeel' (70x daily post-Fajr); give morning Sadaqah.";
        let westernSolution = "Harmonize Sun-Jupiter trine during morning solar hours (08:00 AM - 10:30 AM). Practice visualization.";
        let chineseSolution = "Enhance Wood/Earth 5-Element balance; place green jade or fountain in East sector of your workspace.";
        let actionableSteps = [
          "1. **Morning Alignment (07:00 AM):** Spend 10 minutes in quiet meditation / prayer.",
          "2. **Midday Action:** Execute key negotiations or important calls during planetary Hora of Jupiter.",
          "3. **Evening Shielding:** Perform evening gratitude and avoid stressful financial decisions late at night."
        ];

        if (q.includes('love') || q.includes('marriage') || q.includes('relationship')) {
          title = "❤️ Comprehensive Relationship & Match Solution";
          planetaryRoot = "Venus-Mars aspect tension in 7th House of Partnerships";
          vedicSolution = "Wear Diamond or Zircon; chant Venus Beej Mantra ('Om Shum Shukraya Namah') 108x on Friday; perform Guna Milan check.";
          islamicSolution = "Recite Surah Al-Furqan Ayah 74 ('Rabbana hab lana min azwajina...') 33x after Isha prayer for marital harmony.";
          westernSolution = "Venus energy alignment; practice open empathetic communication during Venus Hora hours.";
          chineseSolution = "Enhance Southwest relationship corner with dual rose quartz crystals and warm ambient lighting.";
        } else if (q.includes('money') || q.includes('wealth') || q.includes('finance') || q.includes('career') || q.includes('job')) {
          title = "💼 Complete Career & Wealth Manifestation Solution";
          planetaryRoot = "2nd & 11th House Lord transit interaction with Rahu/Jupiter axis";
          vedicSolution = "Wear Emerald (Panna 4.5 Carat) for Mercury; chant 'Om Sreem Hreem Kleem Mahalaxmiyei Namah' 108x daily.";
          islamicSolution = "Recite Du'a of Musa ('Rabbi inni lima anzalta ilayya min khayrin faqeer') + Ya Razzaq (308x daily).";
          westernSolution = "Leverage Jupiter 10th house solar hours for financial expansion and strategic investments.";
          chineseSolution = "Activate Wealth Sector (Southeast) with Water Feature & Jade Tree.";
        } else if (q.includes('health') || q.includes('anxiety') || q.includes('peace') || q.includes('stress')) {
          title = "🌿 Holisitc Physical & Emotional Vitality Solution";
          planetaryRoot = "Moon-Saturn or Rahu influence on 6th House of Health & Mind";
          vedicSolution = "Wear Pearl (Moti) in Silver; chant Mahamrityunjaya Mantra 108x at sunrise.";
          islamicSolution = "Prophetic Health Ruqyah: Recite 3 Quls (Surah Ikhlas, Falaq, Naas) over water; drink on empty stomach.";
          westernSolution = "Mindfulness grounding; align sleep rhythm with natural lunar illumination cycles.";
          chineseSolution = "Clear stagnant Chi in East sector; incorporate green tea and Tai Chi energy flow exercises.";
        }

        aiText = `### ${title}\n\n**🔍 Planetary Root Cause Analysis:**\n${planetaryRoot}\n\n---\n\n### 🌟 Complete Multi-Tradition Solution Matrix:\n\n- **🕉️ Vedic Solution:** ${vedicSolution}\n- **🌙 Islamic Solution:** ${islamicSolution}\n- **⭐ Western Solution:** ${westernSolution}\n- **☯️ Chinese Feng Shui Solution:** ${chineseSolution}\n\n---\n\n### 📋 Daily Action Plan:\n${actionableSteps.join('\n')}\n\n*Note: Your free will combined with targeted remedies aligns celestial energies in your favor.*`;
      }

      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAiMsg]);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred during your consultation.';
      console.error('API Call Error:', err);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'ai',
        content: "Welcome, seeker. I am your personal astrologer and cosmic guide. Ask me about your birth chart, transit influences, or relationship dynamics.",
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full max-h-[800px] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden glass-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-purple-500/20 text-purple-400 glow-purple">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-1.5">
              <span>{activePersona.icon}</span> {activePersona.name} ({activePersona.title})
            </h2>
            <p className="text-xs text-white/50">Personalized Chart Reading & Multi-Persona Oracle</p>
          </div>
        </div>

        {/* Persona Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {PERSONAS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setActivePersonaId(p.id);
                setMessages(prev => [
                  ...prev,
                  {
                    id: Date.now().toString(),
                    role: 'ai',
                    content: `*Switched consultation to **${p.name}** (${p.title})*\n\n${p.greeting}`,
                    timestamp: new Date()
                  }
                ]);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                activePersonaId === p.id
                  ? 'bg-white/20 text-white border border-white/40 shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>{p.icon}</span>
              <span className="hidden sm:inline">{p.name}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const text = messages.map(m => `[${m.role.toUpperCase()}] (${m.timestamp.toLocaleTimeString()}):\n${m.content}`).join('\n\n---\n\n');
              const blob = new Blob([text], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Cosmos_Astrology_Consultation_${Date.now()}.md`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-xl hover:bg-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Download Consultation Transcript"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Export
          </button>
          <button 
            onClick={handleClear}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Clear Conversation"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 glow-purple">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-sm' 
                  : 'glass-card text-white/90 rounded-tl-sm'
              }`}>
                <div className="prose prose-invert prose-sm max-w-none">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                  <User className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 justify-start"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 glow-purple">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="glass-card rounded-2xl rounded-tl-sm p-4 flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-purple-200/70">Consulting the cosmos...</span>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <div className="glass-card bg-red-500/10 border-red-500/20 px-4 py-3 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                <span>{error}</span>
                <button 
                  onClick={() => handleSubmit(undefined, messages[messages.length - 1]?.content)}
                  className="flex items-center gap-1 hover:text-red-300 transition-colors bg-red-500/20 px-2 py-1 rounded"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="p-4 flex flex-wrap gap-2 justify-center">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSubmit(undefined, prompt)}
              className="text-xs px-3 py-1.5 rounded-full glass-card-hover border border-purple-500/30 text-purple-200 hover:text-white transition-all hover:scale-105"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask your astrologer a question..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-500 hover:bg-purple-400 disabled:bg-white/10 text-white disabled:text-white/30 rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-white/30">
            Astrological guidance offers symbolic insights for personal growth. Planetary transits illuminate tendencies, while your free will shapes your destiny.
          </p>
        </div>
      </div>
    </div>
  );
}
