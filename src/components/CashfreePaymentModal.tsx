import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck, Zap, Lock, ArrowRight, Star, Heart, FileText, Users, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MONETIZATION_CATALOG, MonetizationItem, initiateCashfreeCheckout } from '../lib/cashfreeEngine';
import { UserProfile } from '../types';

interface CashfreePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
  initialCategory?: 'subscription' | 'report' | 'consultation';
  onPaymentSuccess?: (item: MonetizationItem) => void;
}

export default function CashfreePaymentModal({
  isOpen,
  onClose,
  userProfile,
  initialCategory = 'subscription',
  onPaymentSuccess,
}: CashfreePaymentModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<'subscription' | 'report' | 'consultation'>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<MonetizationItem>(
    MONETIZATION_CATALOG.find((m) => m.category === initialCategory) || MONETIZATION_CATALOG[0]
  );
  
  const [customerName, setCustomerName] = useState(userProfile?.name || '');
  const [customerEmail, setCustomerEmail] = useState(userProfile?.email || '');
  const [customerPhone, setCustomerPhone] = useState(userProfile?.phone || '');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredItems = MONETIZATION_CATALOG.filter((m) => m.category === selectedCategory);

  const handlePayNow = async () => {
    setLoading(true);
    try {
      await initiateCashfreeCheckout({
        item: selectedItem,
        customerName: customerName || userProfile?.name || 'Cosmic Seeker',
        customerEmail: customerEmail || userProfile?.email || 'seeker@astro.tarikislam.in',
        customerPhone: customerPhone || userProfile?.phone || '9876543210',
        onSuccess: (paymentDetails) => {
          setPaymentSuccess(true);
          setLoading(false);
          if (onPaymentSuccess) onPaymentSuccess(selectedItem);
        },
        onFailure: (err) => {
          setLoading(false);
          console.error('Payment failure callback:', err);
        },
      });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#0D1220] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden my-6 text-slate-100"
      >
        {/* Header Ribbon */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#C9A86A]/20 via-purple-900/20 to-[#0D1220] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
                ASTRO360 <span className="text-[#C9A86A] text-sm uppercase font-mono tracking-wider font-normal">Cosmic Store</span>
              </h2>
              <p className="text-xs text-slate-300">
                Unlock high-precision Vedic calculations, personalized executive dossiers, and 1-on-1 scholar sessions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          /* Payment Success Celebration View */
          <div className="p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-white">Payment Successful!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your purchase of <strong className="text-[#C9A86A]">{selectedItem.name}</strong> has been confirmed. All features and downloadable dossiers are now activated in your account.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl bg-[#C9A86A] text-[#070A12] font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              Enter Activated Dashboard
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Category Switcher Tabs */}
            <div className="flex gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] max-w-xl mx-auto">
              <button
                onClick={() => {
                  setSelectedCategory('subscription');
                  setSelectedItem(MONETIZATION_CATALOG.find((m) => m.category === 'subscription') || MONETIZATION_CATALOG[0]);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  selectedCategory === 'subscription'
                    ? 'bg-[#C9A86A] text-[#070A12] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Subscriptions</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('report');
                  setSelectedItem(MONETIZATION_CATALOG.find((m) => m.category === 'report') || MONETIZATION_CATALOG[3]);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  selectedCategory === 'report'
                    ? 'bg-[#C9A86A] text-[#070A12] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Instant Reports</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('consultation');
                  setSelectedItem(MONETIZATION_CATALOG.find((m) => m.category === 'consultation') || MONETIZATION_CATALOG[7]);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  selectedCategory === 'consultation'
                    ? 'bg-[#C9A86A] text-[#070A12] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>1-on-1 Consultations</span>
              </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#070A12] border-[#C9A86A] shadow-[0_0_25px_rgba(201,168,106,0.2)] scale-[1.02]'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06]'
                    }`}
                  >
                    {item.badge && (
                      <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#C9A86A] text-[#070A12] text-[9.5px] font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}

                    <div>
                      <h4 className="text-sm font-bold text-white font-serif mb-1">{item.name}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug mb-4">{item.description}</p>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold font-serif text-[#C9A86A]">₹{item.priceInr}</span>
                        {item.originalPriceInr && (
                          <span className="text-xs text-slate-500 line-through font-mono">₹{item.originalPriceInr}</span>
                        )}
                        {item.discountPercentage && (
                          <span className="text-[10px] font-mono text-emerald-400">({item.discountPercentage}% OFF)</span>
                        )}
                      </div>

                      <ul className="space-y-2 text-[11px] text-slate-300">
                        {item.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#C9A86A] flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono">
                      <span className={isSelected ? 'text-[#C9A86A] font-bold' : 'text-slate-400'}>
                        {isSelected ? '✓ Selected' : 'Select Plan'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customer Details Form & Checkout CTA */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-8 space-y-3">
                <span className="text-xs font-mono text-[#C9A86A] uppercase tracking-wider block">
                  Quick Billing Details (For Instant Invoice & Access)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-slate-200 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-slate-200 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (UPI / SMS)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 flex flex-col justify-end space-y-2">
                <button
                  onClick={handlePayNow}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Opening Secure Checkout...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pay ₹{selectedItem.priceInr} via UPI / Cards</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Secured by Cashfree Payments (256-Bit SSL)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
