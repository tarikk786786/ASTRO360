import React, { useState } from 'react';
import { toast } from 'sonner';
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

import OwnPayPaymentModal from './OwnPayPaymentModal';
import { 
  createOwnPayPaymentIntent, 
  getMerchantPayoutSettings, 
  saveMerchantPayoutSettings, 
  type OwnPayTransaction, 
  type MerchantPayoutSettings 
} from '../lib/ownpayEngine';

export default function CommunityConsultationHub() {
  const [activeTab, setActiveTab] = useState<'astrologers' | 'forum'>('astrologers');
  const [bookingAstrologer, setBookingAstrologer] = useState<Astrologer | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'video' | 'chat' | 'written'>('video');
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow 10:00 AM');
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [showOwnPayModal, setShowOwnPayModal] = useState<boolean>(false);
  const [lastTransaction, setLastTransaction] = useState<OwnPayTransaction | null>(null);

  // Merchant Gateway Payout Settings State
  const [merchantSettings, setMerchantSettings] = useState<MerchantPayoutSettings>(getMerchantPayoutSettings());
  const [showMerchantConfigModal, setShowMerchantConfigModal] = useState<boolean>(false);
  const [editSettings, setEditSettings] = useState<MerchantPayoutSettings>(merchantSettings);

  // New Question State
  const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(INITIAL_THREADS);

  const handleOpenOwnPayCheckout = () => {
    setShowOwnPayModal(true);
  };

  const handleOwnPaySuccess = (tx: OwnPayTransaction) => {
    setLastTransaction(tx);
    setShowOwnPayModal(false);
    setIsBooked(true);
  };

  const handleSaveMerchantConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveMerchantPayoutSettings(editSettings);
    setMerchantSettings(updated);
    setShowMerchantConfigModal(false);
    toast.success('Merchant Gateway Settings Saved!');
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

        <div className="flex items-center gap-2">
          {/* MERCHANT GATEWAY CUSTOMISATION BUTTON */}
          <button
            onClick={() => {
              setEditSettings(merchantSettings);
              setShowMerchantConfigModal(true);
            }}
            className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Customise Gateway & Rates
          </button>

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
      </div>

      {/* 🏦 WHERE & WHEN PAYMENT IS RECEIVED TELEMETRY BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 via-[#0B1220] to-purple-950/40 border border-amber-500/30 space-y-2 text-xs font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
          <span className="font-bold text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> OwnPay Gateway Settlement Status & Payout Ledger
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
            Live Settlement Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-amber-400 font-bold block">📍 WHERE PAYMENTS ARE RECEIVED:</span>
            <p className="text-slate-300 text-[10px]">
              Direct to Merchant Payout Wallets: <strong className="text-amber-300 font-mono">USDT ({merchantSettings.payoutUsdtTrc20.slice(0, 10)}...)</strong>, BTC, ETH, SOL, or Bank IBAN (<strong className="text-cyan-300 font-mono">{merchantSettings.payoutBankIban.slice(0, 10)}...</strong>).
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-emerald-400 font-bold block">⚡ WHEN PAYMENTS ARE RECEIVED:</span>
            <p className="text-slate-300 text-[10px]">
              <strong className="text-emerald-300">Instant (&lt; 60 seconds)</strong> upon 1-block blockchain transaction receipt or card authorization, unlocking scholar consultation immediately.
            </p>
          </div>
        </div>
      </div>

      {/* TAB 1: CERTIFIED ASTROLOGERS DIRECTORY */}
      {activeTab === 'astrologers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ASTROLOGERS.map((astro) => (
            <motion.div
              key={astro.id}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-purple-500/40 transition-all space-y-3 shadow-lg group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Active Banner Badge */}
              <div className="absolute top-2 right-2">
                <span className="text-[9px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active
                </span>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-900/40 flex items-center justify-center text-xl border border-purple-500/30 shadow-inner">
                      {astro.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1">
                        {astro.name} 
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                      </h4>
                      <span className="text-[10px] font-mono text-purple-300/80 block">{astro.specialty}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 border-y border-white/5 py-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Client Satisfaction</span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-amber-400" /> {astro.rating} 
                      <span className="text-amber-400/70 font-normal">({astro.reviews} Verified)</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Lineage & Experience</span>
                    <span className="text-emerald-400/90 bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">{astro.experience}</span>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Fixed Fee (No hidden costs)</span>
                    <span className="font-bold text-lg text-emerald-400">
                      {astro.fee.split('/')[0]}<span className="text-[10px] text-emerald-400/60 font-normal">/{astro.fee.split('/')[1]}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setBookingAstrologer(astro);
                    toast.success(`Select a time slot with ${astro.name}`);
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Consultation <span className="text-[9px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded ml-1 border border-emerald-400/30">Available</span>
                </button>
              </div>
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
                    onClick={handleOpenOwnPayCheckout}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-500/20 mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-950" /> Pay {bookingAstrologer.fee} via OwnPay Gateway Protocol
                  </button>
                </>
              ) : (
                <div className="py-6 text-center space-y-3 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-base font-bold text-white">1-on-1 Consultation Booked via OwnPay!</h3>
                  <p className="text-xs text-slate-300">
                    Your appointment with <strong className="text-amber-300">{bookingAstrologer.name}</strong> is confirmed for <strong className="text-emerald-400">{selectedSlot}</strong>.
                  </p>
                  {lastTransaction && (
                    <div className="p-3 rounded-2xl bg-[#0B1220] border border-emerald-500/30 text-[10px] text-left space-y-1 text-slate-300">
                      <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-white/10 pb-1">
                        <span>OwnPay Protocol Receipt</span>
                        <span>Status: Verified</span>
                      </div>
                      <p><span className="text-slate-400">Payment ID:</span> <span className="text-white font-mono">{lastTransaction.paymentId}</span></p>
                      <p className="truncate"><span className="text-slate-400">Tx Hash:</span> <span className="text-amber-300 font-mono">{lastTransaction.txHash}</span></p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setIsBooked(false);
                      setBookingAstrologer(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold cursor-pointer transition-all"
                  >
                    Done & Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OWNPAY PAYMENT MODAL PROTOCOL */}
      {bookingAstrologer && (
        <OwnPayPaymentModal
          isOpen={showOwnPayModal}
          onClose={() => setShowOwnPayModal(false)}
          onPaymentSuccess={handleOwnPaySuccess}
          bookingDetails={{
            astrologerName: bookingAstrologer.name,
            specialty: bookingAstrologer.specialty,
            avatar: bookingAstrologer.avatar,
            format: selectedFormat,
            slot: selectedSlot,
            feeAmount: parseInt(bookingAstrologer.fee.replace(/[^0-9]/g, '')) || 45,
            feeCurrency: 'USD'
          }}
        />
      )}

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

      {/* MERCHANT PAYOUT GATEWAY CONFIGURATION MODAL */}
      <AnimatePresence>
        {showMerchantConfigModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-lg w-full rounded-3xl bg-[#111827] border border-amber-500/40 p-6 space-y-4 shadow-2xl relative text-left text-xs font-mono"
            >
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" /> Payment Gateway & Merchant Payout Control Panel
                  </h3>
                  <p className="text-[10px] text-slate-400">Configure Payout Wallet Addresses, Settlement Speed & Consultation Rates</p>
                </div>
                <button onClick={() => setShowMerchantConfigModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleSaveMerchantConfig} className="space-y-3">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <span className="text-amber-400 font-bold text-[11px] block">📍 Where Payments Will Be Received:</span>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block">USDT (TRC20 Wallet Address)</label>
                      <input
                        type="text"
                        value={editSettings.payoutUsdtTrc20}
                        onChange={(e) => setEditSettings({ ...editSettings, payoutUsdtTrc20: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white font-mono text-[10px]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block">Bitcoin (BTC Wallet Address)</label>
                      <input
                        type="text"
                        value={editSettings.payoutBtc}
                        onChange={(e) => setEditSettings({ ...editSettings, payoutBtc: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white font-mono text-[10px]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block">Ethereum / USDT (ERC20 Address)</label>
                      <input
                        type="text"
                        value={editSettings.payoutEth}
                        onChange={(e) => setEditSettings({ ...editSettings, payoutEth: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white font-mono text-[10px]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block">Bank IBAN / SWIFT Payout Account</label>
                      <input
                        type="text"
                        value={editSettings.payoutBankIban}
                        onChange={(e) => setEditSettings({ ...editSettings, payoutBankIban: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white font-mono text-[10px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <span className="text-emerald-400 font-bold text-[11px] block">⚡ When Payments Will Be Received:</span>
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>Settlement Mode:</span>
                    <select
                      value={editSettings.payoutSchedule}
                      onChange={(e) => setEditSettings({ ...editSettings, payoutSchedule: e.target.value as any })}
                      className="bg-slate-900 border border-white/10 text-amber-300 rounded px-2 py-1 font-bold"
                    >
                      <option value="instant">Instant (&lt; 60 sec upon 1-block receipt)</option>
                      <option value="daily">End of Day (Daily Batch)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                >
                  Save Payment Gateway Payout Configuration
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
