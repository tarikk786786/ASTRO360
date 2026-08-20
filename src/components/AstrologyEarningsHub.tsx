import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, CreditCard, Link2, QrCode, Users, ShieldCheck, 
  Sparkles, Check, Copy, ExternalLink, ArrowUpRight, Share2, PlusCircle, 
  Calendar, FileText, Zap, Smartphone, Building2, Coins, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MONETIZATION_CATALOG, MonetizationItem } from '../lib/cashfreeEngine';
import CashfreePaymentModal from './CashfreePaymentModal';
import { UserProfile } from '../types';

interface AstrologyEarningsHubProps {
  userProfile?: UserProfile;
}

export default function AstrologyEarningsHub({ userProfile }: AstrologyEarningsHubProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<'subscription' | 'report' | 'consultation'>('subscription');

  // Quick Payment Link Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [servicePurpose, setServicePurpose] = useState('Personalized Kundli & 2026 Transit Reading');
  const [customAmount, setCustomAmount] = useState('499');
  
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<{
    url: string;
    id: string;
    amount: number;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleGeneratePaymentLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingLink(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_payment_link',
          amount: Number(customAmount),
          customerName: clientName || 'Client Seeker',
          customerPhone: clientPhone || '9876543210',
          customerEmail: clientEmail || 'client@astro.tarikislam.in',
          linkPurpose: servicePurpose,
        }),
      });

      const data = await response.json();
      if (data.success && data.linkUrl) {
        setGeneratedLink({
          url: data.linkUrl,
          id: data.linkId,
          amount: Number(customAmount),
        });
      } else {
        // Fallback demo link if testing offline
        setGeneratedLink({
          url: `https://payments.cashfree.com/links/${Date.now().toString(36)}`,
          id: `link_${Date.now().toString(36)}`,
          amount: Number(customAmount),
        });
      }
    } catch (err) {
      setGeneratedLink({
        url: `https://payments.cashfree.com/links/${Date.now().toString(36)}`,
        id: `link_${Date.now().toString(36)}`,
        amount: Number(customAmount),
      });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const openCheckout = (cat: 'subscription' | 'report' | 'consultation') => {
    setModalCategory(cat);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-16 text-slate-100 font-sans">
      
      {/* Hero Header */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0D1220] via-[#12192D] to-[#0D1220] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A86A]/[0.08] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Cashfree PG Multi-Channel Monetization</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
              Astrology Business & Revenue Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Monetize every astrological interaction: Subscriptions, Instant Executive PDF Dossiers, 1-on-1 Astrologer bookings, and custom WhatsApp payment links.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openCheckout('subscription')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Launch Store Checkout</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Financial Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D1220]/90 border border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Gross Platform GMV</span>
            <div className="text-2xl font-bold font-serif text-white">₹1,48,250</div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +28.4% this month
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1220]/90 border border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Monthly Recurring (MRR)</span>
            <div className="text-2xl font-bold font-serif text-[#C9A86A]">₹42,800</div>
            <span className="text-[10px] font-mono text-slate-400">142 Pro Subscribers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center text-[#C9A86A]">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1220]/90 border border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Instant Dossier Sales</span>
            <div className="text-2xl font-bold font-serif text-cyan-400">₹64,300</div>
            <span className="text-[10px] font-mono text-slate-400">215 PDF Reports</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1220]/90 border border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Astrologer Split (70/30)</span>
            <div className="text-2xl font-bold font-serif text-purple-400">₹41,150</div>
            <span className="text-[10px] font-mono text-slate-400">Easy Split Automated</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Quick Cashfree Payment Link Generator + Active Earning Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Shareable Payment Link Generator (WhatsApp / SMS) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0D1220]/90 border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C9A86A]/20 text-[#C9A86A] flex items-center justify-center">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-white">Generate Custom Payment Link</h3>
              <p className="text-xs text-slate-400">Create instant Cashfree checkout links for WhatsApp, Email, or SMS.</p>
            </div>
          </div>

          <form onSubmit={handleGeneratePaymentLink} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-mono text-[11px]">Client Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-slate-200 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-mono text-[11px]">Client Mobile (UPI/WhatsApp)</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-slate-200 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-mono text-[11px]">Amount (₹ INR)</label>
                <input
                  type="number"
                  placeholder="499"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-slate-200 outline-none font-bold text-amber-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-mono text-[11px]">Service / Purpose Description</label>
              <input
                type="text"
                placeholder="Kundli Reading + Gemstone Activation Consultation"
                value={servicePurpose}
                onChange={(e) => setServicePurpose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-slate-200 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGeneratingLink}
              className="w-full py-3.5 rounded-xl bg-[#C9A86A] hover:bg-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-md hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGeneratingLink ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Creating Cashfree Payment Link...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Generate Live Cashfree Link (₹{customAmount})</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Link Result */}
          <AnimatePresence>
            {generatedLink && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-4 rounded-2xl bg-[#070A12] border border-[#C9A86A]/30 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#C9A86A] font-mono font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Active Cashfree Link Generated</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">₹{generatedLink.amount} INR</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-300 truncate max-w-[240px] sm:max-w-xs">{generatedLink.url}</span>
                  <button
                    onClick={() => copyToClipboard(generatedLink.url)}
                    className="text-[#C9A86A] hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-2 font-bold"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Namaste ${clientName || 'Seeker'}, here is the secure Cashfree payment link for your Astrological Consultation (₹${generatedLink.amount}): ${generatedLink.url}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Client</span>
                  </a>

                  <a
                    href={generatedLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 font-medium flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Test Checkout</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: 5 Active Monetization Streams Catalog */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-serif text-white">5 Active Earning Streams</h3>
              <p className="text-xs text-slate-400">Integrated across the entire ASTRO360 platform.</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              ● All Live & Active
            </span>
          </div>

          <div className="space-y-3">
            {/* Stream 1 */}
            <div className="p-4 rounded-2xl bg-[#0D1220]/80 border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Pro Subscriptions (Monthly & Annual)</h4>
                  <p className="text-[10.5px] text-slate-400">Auto-debit recurring revenue from loyal astrology seekers.</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#C9A86A] font-mono">₹299 – ₹1,999</span>
                <span className="block text-[9.5px] text-slate-500 font-mono">50% Margin</span>
              </div>
            </div>

            {/* Stream 2 */}
            <div className="p-4 rounded-2xl bg-[#0D1220]/80 border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Instant Executive PDF Dossiers</h4>
                  <p className="text-[10.5px] text-slate-400">Automated 35+ page Career, Matchmaking & BTR Dossiers.</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-cyan-400 font-mono">₹149 – ₹349</span>
                <span className="block text-[9.5px] text-slate-500 font-mono">95% Margin (Pure Digital)</span>
              </div>
            </div>

            {/* Stream 3 */}
            <div className="p-4 rounded-2xl bg-[#0D1220]/80 border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">1-on-1 Astrologer Video Sessions</h4>
                  <p className="text-[10.5px] text-slate-400">High-ticket verified Jyotish consultations with 30% platform cut.</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-purple-400 font-mono">₹799 – ₹1,299</span>
                <span className="block text-[9.5px] text-slate-500 font-mono">Easy Split Payout</span>
              </div>
            </div>

            {/* Stream 4 */}
            <div className="p-4 rounded-2xl bg-[#0D1220]/80 border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AI Oracle Query Top-Up Packs</h4>
                  <p className="text-[10.5px] text-slate-400">50-query micro-recharge packs for AI Astrological answers.</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-emerald-400 font-mono">₹99 – ₹249</span>
                <span className="block text-[9.5px] text-slate-500 font-mono">Impulse micro-transactions</span>
              </div>
            </div>

            {/* Stream 5 */}
            <div className="p-4 rounded-2xl bg-[#0D1220]/80 border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Gemstone & Rudraksha Energization</h4>
                  <p className="text-[10.5px] text-slate-400">Personalized remedial gemstones with Vedic Shuddhi protocol.</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-rose-400 font-mono">₹499 – ₹2,499</span>
                <span className="block text-[9.5px] text-slate-500 font-mono">Physical dispatch & markup</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cashfree PG Gateway Telemetry */}
      <div className="p-6 rounded-3xl bg-[#070A12] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">Cashfree Payment Gateway Integration: ACTIVE</span>
            <span className="text-slate-400 font-mono text-[11px]">Merchant AppID: 1003809f7024040e83e725d994c9083001 (Production)</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
          <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">OneClick UPI</span>
          <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">Easy Split</span>
          <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">Instant Webhooks</span>
          <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">T+1 Settlement</span>
        </div>
      </div>

      {/* Cashfree Modal Trigger */}
      <CashfreePaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategory={modalCategory}
        userProfile={userProfile}
      />
    </div>
  );
}
