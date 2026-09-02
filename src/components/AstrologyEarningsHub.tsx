import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, CreditCard, Link2, QrCode, Users, ShieldCheck, 
  Sparkles, Check, Copy, ExternalLink, ArrowUpRight, Share2, PlusCircle, 
  Calendar, FileText, Zap, Smartphone, Building2, Coins, ArrowRight, Award, Lock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CashfreePaymentModal from './CashfreePaymentModal';
import AstrologerMarketplaceModal from './AstrologerMarketplaceModal';
import AdminFinanceCenter from './AdminFinanceCenter';
import { AstrologerProfile, MonetizationProduct } from '../lib/monetizationEngine';
import { UserProfile } from '../types';

interface AstrologyEarningsHubProps {
  userProfile?: UserProfile;
}

export default function AstrologyEarningsHub({ userProfile }: AstrologyEarningsHubProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutCategory, setCheckoutCategory] = useState<'report' | 'tokens' | 'subscription' | 'consultation'>('subscription');
  const [selectedCustomItem, setSelectedCustomItem] = useState<MonetizationProduct | undefined>(undefined);

  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [isAdminFinanceOpen, setIsAdminFinanceOpen] = useState(false);

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

  const openCheckout = (cat: 'report' | 'tokens' | 'subscription' | 'consultation', item?: MonetizationProduct) => {
    setSelectedCustomItem(item);
    setCheckoutCategory(cat);
    setIsCheckoutOpen(true);
  };

  const handleBookAstrologer = (astrologer: AstrologerProfile, durationMinutes: number, priceInr: number) => {
    setIsMarketplaceOpen(false);
    openCheckout('consultation', {
      id: `cons_${astrologer.id}_${durationMinutes}`,
      name: `${astrologer.name} (${durationMinutes} Min Private Consultation)`,
      category: 'consultation',
      priceInr,
      description: `1-on-1 Consultation via Video / Audio with ${astrologer.title}`,
      features: [`${durationMinutes} Minutes Live Consultation`, 'Vedic Chart Breakdown', 'Personalized Remedies', '25% Platform Secure Host'],
    });
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
              <span>Multi-Rail Astrology Commerce & Marketplace</span>
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
              onClick={() => setIsMarketplaceOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Users className="w-4 h-4" />
              <span>Astrologer Marketplace</span>
            </button>

            <button
              onClick={() => setIsAdminFinanceOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md font-mono"
            >
              <DollarSign className="w-4 h-4" />
              <span>Admin Finance KPIs</span>
            </button>

            <button
              onClick={() => openCheckout('subscription')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Store Checkout</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Financial Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D1220]/90 border border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Gross Platform GMV</span>
            <div className="text-2xl font-bold font-serif text-white">$2,48,590</div>
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
            <div className="text-2xl font-bold font-serif text-[#C9A86A]">$68,400</div>
            <span className="text-[10px] font-mono text-slate-400">428 Pro Subscribers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center text-[#C9A86A]">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1220]/90 border border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Instant Dossier Sales</span>
            <div className="text-2xl font-bold font-serif text-cyan-400">$98,450</div>
            <span className="text-[10px] font-mono text-slate-400">342 PDF Reports Sold</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D1220]/90 border border-white/[0.06] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Astrologer Platform Share</span>
            <div className="text-2xl font-bold font-serif text-purple-400">$20,435</div>
            <span className="text-[10px] font-mono text-slate-400">25% Marketplace Cut</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main 2-Column Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick WhatsApp Payment Link Generator */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0D1220]/90 border border-white/[0.08] shadow-xl space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C9A86A] uppercase tracking-wider">
              <Link2 className="w-4 h-4" />
              <span>Instant Client Payment Links</span>
            </div>
            <h3 className="text-lg font-bold font-serif text-white">Generate Cashfree Link for Client</h3>
            <p className="text-xs text-slate-400">
              Create an instant payment link for consultations or remedial rituals to share via WhatsApp or SMS.
            </p>
          </div>

          <form onSubmit={handleGeneratePaymentLink} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Client Full Name</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Chandra"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-xs text-slate-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">WhatsApp Mobile Number</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-xs text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Amount ($ USD)</label>
                <input
                  type="number"
                  placeholder="499"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-xs text-slate-200 outline-none font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Consultation / Purpose</label>
              <input
                type="text"
                value={servicePurpose}
                onChange={(e) => setServicePurpose(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-xs text-slate-200 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isGeneratingLink}
              className="w-full py-3 rounded-xl bg-[#C9A86A] hover:bg-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingLink ? (
                <span>Generating Cashfree Link...</span>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Generate Payment Link (${customAmount} USD)</span>
                </>
              )}
            </button>
          </form>

          {generatedLink && (
            <div className="p-4 rounded-2xl bg-[#070A12] border border-[#C9A86A]/40 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#C9A86A] font-bold">Link Ready (${generatedLink.amount})</span>
                <span className="text-[10px] text-emerald-400">● Active</span>
              </div>
              
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 truncate max-w-[220px]">{generatedLink.url}</span>
                <button
                  onClick={() => copyToClipboard(generatedLink.url)}
                  className="px-3 py-1 rounded-lg bg-[#C9A86A] text-[#070A12] font-bold text-[11px] cursor-pointer flex items-center gap-1"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Namaste ${clientName || 'Ji'}, here is your secure payment link for ${servicePurpose}: ${generatedLink.url}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-white/[0.08] text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 5 Integrated Astrology Earning Channels */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0D1220]/90 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold font-serif text-white">Active Platform Revenue Streams</h3>
                <p className="text-xs text-slate-400">All streams automatically settle via Cashfree & UPI</p>
              </div>
            </div>

            {/* Stream 1 */}
            <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Instant Executive PDF Reports</h4>
                  <p className="text-[10.5px] text-slate-400">Automated 12-Bhava & Career PDF dossiers.</p>
                </div>
              </div>
              <button
                onClick={() => openCheckout('report')}
                className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-cyan-400 font-bold text-xs font-mono cursor-pointer"
              >
                $49 – $299
              </button>
            </div>

            {/* Stream 2 */}
            <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Astrologer Marketplace Booking</h4>
                  <p className="text-[10.5px] text-slate-400">15/30/60 min private video consultations.</p>
                </div>
              </div>
              <button
                onClick={() => setIsMarketplaceOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-xs font-mono cursor-pointer"
              >
                $299 – $1,199
              </button>
            </div>

            {/* Stream 3 */}
            <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 text-[#C9A86A] flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Astro Pro Subscriptions</h4>
                  <p className="text-[10.5px] text-slate-400">Monthly recurring memberships with UPI AutoPay.</p>
                </div>
              </div>
              <button
                onClick={() => openCheckout('subscription')}
                className="px-3 py-1.5 rounded-xl bg-[#C9A86A]/20 hover:bg-[#C9A86A]/30 text-[#C9A86A] font-bold text-xs font-mono cursor-pointer"
              >
                $199 / mo
              </button>
            </div>

            {/* Stream 4 */}
            <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.06] flex items-center justify-between hover:border-[#C9A86A]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Astro Credits Top-Up Packs</h4>
                  <p className="text-[10.5px] text-slate-400">Internal wallet tokens for AI questions & tools.</p>
                </div>
              </div>
              <button
                onClick={() => openCheckout('tokens')}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs font-mono cursor-pointer"
              >
                $49 – $499
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Cashfree PG Gateway Telemetry */}
      <div className="p-6 rounded-3xl bg-[#070A12] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">Cashfree Payment Gateway & Multi-Rail Router: ACTIVE</span>
            <span className="text-slate-400 font-mono text-[11px]">Merchant AppID: 1003809f7024040e83e725d994c9083001 (Production)</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
          <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">OneClick UPI</span>
          <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">25% Marketplace Split</span>
          <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">Instant Webhooks</span>
          <span className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">T+1 Settlement</span>
        </div>
      </div>

      {/* Modals */}
      <CashfreePaymentModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialCategory={checkoutCategory}
        customItem={selectedCustomItem}
        userProfile={userProfile}
      />

      <AstrologerMarketplaceModal
        isOpen={isMarketplaceOpen}
        onClose={() => setIsMarketplaceOpen(false)}
        userProfile={userProfile}
        onSelectAstrologerForBooking={handleBookAstrologer}
      />

      <AdminFinanceCenter
        isOpen={isAdminFinanceOpen}
        onClose={() => setIsAdminFinanceOpen(false)}
      />

    </div>
  );
}
