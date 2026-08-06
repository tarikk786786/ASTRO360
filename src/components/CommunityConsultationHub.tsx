import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Calendar, MessageSquare, Star, Award, CheckCircle2, Video, MessageCircle, FileText, Clock, Send, Sparkles } from 'lucide-react';

interface Astrologer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  badge: string;
  fee: string;
  avatar: string;
}

interface ForumThread {
  id: string;
  question: string;
  askedBy: string;
  timeAgo: string;
  answeredBy: string;
  answer: string;
  category: 'Vedic' | 'Islamic' | 'BaZi' | 'General';
  upvotes: number;
}

const ASTROLOGERS: Astrologer[] = [
  { id: '1', name: 'Dr. Parashara Vedant', specialty: 'Vedic Jyotish & Vimshottari Dasha', rating: 4.9, reviews: 412, experience: '22 Yrs Exp', badge: 'Master Scholar', fee: '$45 / 30 Min', avatar: '🕉️' },
  { id: '2', name: 'Sheikh Al-Mansoor', specialty: 'Ilm al-Nujum & 28 Manazil al-Qamar', rating: 4.95, reviews: 389, experience: '19 Yrs Exp', badge: 'Islamic Scholar', fee: '$40 / 30 Min', avatar: '🕌' },
  { id: '3', name: 'Master Wu Chen', specialty: 'BaZi 4 Pillars & Feng Shui Wu Xing', rating: 4.88, reviews: 294, experience: '16 Yrs Exp', badge: 'BaZi Grandmaster', fee: '$42 / 30 Min', avatar: '☯️' }
];

const INITIAL_THREADS: ForumThread[] = [
  {
    id: 't1',
    question: 'How will Jupiter transit into Gemini affect Leo Lagna career in late 2026?',
    askedBy: 'Aarav M.',
    timeAgo: '2 hours ago',
    answeredBy: 'Dr. Parashara Vedant',
    answer: 'Jupiter transiting your 11th House of Gains from Leo Lagna creates a powerful Dhana Yoga. Expect major revenue expansion and corporate recognition.',
    category: 'Vedic',
    upvotes: 42
  },
  {
    id: 't2',
    question: 'What are the best Du\'as to recite when the Moon transits Al-Nathrah lunar mansion?',
    askedBy: 'Zayd K.',
    timeAgo: '5 hours ago',
    answeredBy: 'Sheikh Al-Mansoor',
    answer: 'Al-Nathrah brings Barakah in commerce. Recite Surah Al-Waqi\'ah after Maghrib & "Ya Razzaq" 308x for trade success.',
    category: 'Islamic',
    upvotes: 38
  },
  {
    id: 't3',
    question: 'How do I harmonize weak Fire Chi in the South-East sector of my office?',
    askedBy: 'Lin W.',
    timeAgo: '1 day ago',
    answeredBy: 'Master Wu Chen',
    answer: 'Introduce vibrant warm lighting, a red crystal cluster, or healthy green plants to feed the Fire element through Wood.',
    category: 'BaZi',
    upvotes: 29
  }
];

export default function CommunityConsultationHub() {
  const [activeTab, setActiveTab] = useState<'astrologers' | 'forum'>('astrologers');
  const [bookingAstrologer, setBookingAstrologer] = useState<Astrologer | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'video' | 'chat' | 'written'>('video');
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow 10:00 AM');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // New Question State
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(INITIAL_THREADS);

  const handleConfirmBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setBookingAstrologer(null);
    }, 2500);
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newThread: ForumThread = {
      id: `t-${Date.now()}`,
      question: newQuestionText.trim(),
      askedBy: 'You (Seeker)',
      timeAgo: 'Just now',
      answeredBy: 'Master AI Scholar',
      answer: 'Your question has been broadcast to verified astrologers. You will receive scholar answers within 1 hour.',
      category: 'General',
      upvotes: 1
    };

    setForumThreads([newThread, ...forumThreads]);
    setNewQuestionText('');
    setShowQuestionModal(false);
  };

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" /> Astrologer Consultation & Community Q&A Hub
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Book 1-on-1 Consultations with Certified Scholars & Engage in Sacred Q&A Forums
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-[#0B1220] p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('astrologers')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'astrologers'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Certified Scholars
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'forum'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Q&A Forum
          </button>
        </div>
      </div>

      {/* TAB 1: CERTIFIED ASTROLOGERS DIRECTORY */}
      {activeTab === 'astrologers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ASTROLOGERS.map((astro) => (
            <motion.div
              key={astro.id}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-lg group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{astro.avatar}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{astro.name}</h4>
                      <span className="text-[10px] font-mono text-purple-400 block">{astro.specialty}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" /> {astro.rating} ({astro.reviews} reviews)
                  </span>
                  <span className="font-bold text-emerald-400">{astro.fee}</span>
                </div>
              </div>

              <button
                onClick={() => setBookingAstrologer(astro)}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md mt-2"
              >
                <Calendar className="w-3.5 h-3.5" /> Book 1-on-1 Consultation
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* TAB 2: COMMUNITY Q&A FORUM */}
      {activeTab === 'forum' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Community Astrological Q&A Threads</span>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-all shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" /> Ask a Question
            </button>
          </div>

          <div className="space-y-3">
            {forumThreads.map((thread) => (
              <div key={thread.id} className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <h4 className="font-bold text-white leading-tight">{thread.question}</h4>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                    {thread.category}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-[11px]">
                  <span className="text-amber-300 font-mono font-bold block">Answered by {thread.answeredBy}:</span>
                  <p className="text-slate-300 leading-relaxed">{thread.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKING MODAL DRAWER */}
      <AnimatePresence>
        {bookingAstrologer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-md w-full rounded-3xl bg-[#111827] border border-purple-500/40 p-6 space-y-4 shadow-2xl relative text-left"
            >
              {!isBooked ? (
                <>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{bookingAstrologer.avatar}</span>
                      <div>
                        <h3 className="text-sm font-bold text-white font-mono">{bookingAstrologer.name}</h3>
                        <span className="text-[10px] text-purple-400 font-mono">{bookingAstrologer.specialty}</span>
                      </div>
                    </div>
                    <button onClick={() => setBookingAstrologer(null)} className="text-slate-400 hover:text-white">✕</button>
                  </div>

                  {/* Format Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block font-bold">Select Consultation Format:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'video', label: 'Video Call', icon: <Video className="w-3.5 h-3.5" /> },
                        { id: 'chat', label: 'Live Chat', icon: <MessageCircle className="w-3.5 h-3.5" /> },
                        { id: 'written', label: 'Written PDF', icon: <FileText className="w-3.5 h-3.5" /> }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFormat(f.id as any)}
                          className={`p-2.5 rounded-xl text-xs font-mono font-bold border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            selectedFormat === f.id
                              ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                              : 'bg-[#0B1220] text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {f.icon}
                          <span>{f.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slot Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-400 block font-bold">Select Available Time Slot:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Tomorrow 10:00 AM', 'Tomorrow 02:00 PM', 'Tomorrow 06:00 PM'].map(s => (
                        <button
                          key={s}
                          onClick={() => setSelectedSlot(s)}
                          className={`p-2 rounded-xl text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                            selectedSlot === s
                              ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-md'
                              : 'bg-[#0B1220] text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Confirm Booking ({bookingAstrologer.fee})
                  </button>
                </>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-base font-bold text-white font-mono">1-on-1 Consultation Booked!</h3>
                  <p className="text-xs text-slate-300">
                    Your appointment with <strong className="text-purple-300">{bookingAstrologer.name}</strong> is confirmed for <strong className="text-emerald-400">{selectedSlot}</strong>.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ASK QUESTION MODAL */}
      <AnimatePresence>
        {showQuestionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-md w-full rounded-3xl bg-[#111827] border border-purple-500/40 p-6 space-y-4 shadow-2xl relative text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Post Public Astrological Question
                </h3>
                <button onClick={() => setShowQuestionModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handlePostQuestion} className="space-y-3">
                <textarea
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Ask certified scholars about birth charts, transits, remedies, or relationship synastry..."
                  className="w-full h-28 p-3 rounded-xl bg-[#0B1220] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg"
                >
                  <Send className="w-4 h-4" /> Broadcast Question to Scholars
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
