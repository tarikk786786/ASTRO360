import React, { useState } from 'react';
import { 
  X, Check, Sparkles, ShieldCheck, Zap, Lock, ArrowRight, Star, Heart, 
  FileText, Users, CreditCard, QrCode, Building2, Wallet, Coins, Landmark, 
  ChevronRight, Smartphone, Copy, ExternalLink 
} from 'lucide-react';
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

type PaymentMethodType = 'upi' | 'cards' | 'netbanking' | 'wallets' | 'crypto' | 'paylater';

const PAYMENT_METHODS = [
  {
    id: 'upi' as PaymentMethodType,
    name: 'UPI / QR',
    subtitle: 'Google Pay, PhonePe, Paytm, CRED, BHIM',
    icon: Smartphone,
    badge: 'Fastest (0% Fee)',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'cards' as PaymentMethodType,
    name: 'Debit & Credit Cards',
    subtitle: 'Visa, Mastercard, RuPay, Amex',
    icon: CreditCard,
    badge: 'International & Domestic',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    id: 'netbanking' as PaymentMethodType,
    name: 'Net Banking',
    subtitle: 'HDFC, SBI, ICICI, Axis, Kotak + 50 Banks',
    icon: Building2,
    badge: 'Direct Bank Transfer',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 'wallets' as PaymentMethodType,
    name: 'Wallets & Pay Later',
    subtitle: 'Paytm, Amazon Pay, Simpl, Mobikwik',
    icon: Wallet,
    badge: 'Instant Checkout',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    id: 'crypto' as PaymentMethodType,
    name: 'Crypto / Web3',
    subtitle: 'USDT (TRC20/ERC20), BTC, ETH, SOL',
    icon: Coins,
    badge: 'Global Anonymous',
    badgeColor: 'text-[#C9A86A] bg-[#C9A86A]/10 border-[#C9A86A]/20',
  },
];

const POPULAR_BANKS = [
  { name: 'HDFC Bank', code: 'HDFC' },
  { name: 'State Bank of India', code: 'SBIN' },
  { name: 'ICICI Bank', code: 'ICIC' },
  { name: 'Axis Bank', code: 'UTIB' },
  { name: 'Kotak Mahindra', code: 'KKBK' },
  { name: 'Punjab National Bank', code: 'PUNB' },
];

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
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  
  const [customerName, setCustomerName] = useState(userProfile?.name || '');
  const [customerEmail, setCustomerEmail] = useState(userProfile?.email || '');
  const [customerPhone, setCustomerPhone] = useState(userProfile?.phone || '');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedCrypto, setCopiedCrypto] = useState(false);

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

  const copyCryptoAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedCrypto(true);
    setTimeout(() => setCopiedCrypto(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl rounded-3xl bg-[#0D1220] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden my-4 sm:my-6 text-slate-100"
      >
        {/* Header Ribbon */}
        <div className="p-5 sm:p-7 bg-gradient-to-r from-[#C9A86A]/20 via-purple-900/20 to-[#0D1220] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
                ASTRO360 <span className="text-[#C9A86A] text-xs sm:text-sm uppercase font-mono tracking-wider font-normal">Payment & Store</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Unlock high-precision Vedic calculations, executive PDF dossiers, and 1-on-1 consultations with instant checkout.
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
              Your order for <strong className="text-[#C9A86A]">{selectedItem.name}</strong> is confirmed. All features and downloadable dossiers are now activated in your account.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl bg-[#C9A86A] text-[#070A12] font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              Enter Activated Dashboard
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-7 space-y-6">
            {/* Step 1: Select Plan or Report */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#C9A86A] uppercase tracking-wider">
                  Step 1: Choose Your Plan or Executive Report
                </span>
                {/* Category Switcher Tabs */}
                <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px]">
                  <button
                    onClick={() => {
                      setSelectedCategory('subscription');
                      setSelectedItem(MONETIZATION_CATALOG.find((m) => m.category === 'subscription') || MONETIZATION_CATALOG[0]);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      selectedCategory === 'subscription'
                        ? 'bg-[#C9A86A] text-[#070A12]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Subscriptions
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('report');
                      setSelectedItem(MONETIZATION_CATALOG.find((m) => m.category === 'report') || MONETIZATION_CATALOG[3]);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      selectedCategory === 'report'
                        ? 'bg-[#C9A86A] text-[#070A12]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Reports
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('consultation');
                      setSelectedItem(MONETIZATION_CATALOG.find((m) => m.category === 'consultation') || MONETIZATION_CATALOG[7]);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      selectedCategory === 'consultation'
                        ? 'bg-[#C9A86A] text-[#070A12]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Consultations
                  </button>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filteredItems.map((item) => {
                  const isSelected = selectedItem.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#070A12] border-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.2)] scale-[1.01]'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06]'
                      }`}
                    >
                      {item.badge && (
                        <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-[#C9A86A] text-[#070A12] text-[9px] font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}

                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-serif mb-1">{item.name}</h4>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="text-xl font-bold font-serif text-[#C9A86A]">₹{item.priceInr}</span>
                          {item.originalPriceInr && (
                            <span className="text-[10px] text-slate-500 line-through font-mono">₹{item.originalPriceInr}</span>
                          )}
                          {item.discountPercentage && (
                            <span className="text-[9px] font-mono text-emerald-400 font-semibold">({item.discountPercentage}% OFF)</span>
                          )}
                        </div>
                        <p className="text-[10.5px] text-slate-400 leading-snug mb-3 line-clamp-2">{item.description}</p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono">
                        <span className={isSelected ? 'text-[#C9A86A] font-bold' : 'text-slate-400'}>
                          {isSelected ? '✓ Selected' : 'Select Plan'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Payment Method Selection */}
            <div className="space-y-3 pt-2 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-[#C9A86A] uppercase tracking-wider block">
                Step 2: Select Your Preferred Payment Method
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'bg-[#070A12] border-[#C9A86A] shadow-[0_0_15px_rgba(201,168,106,0.15)] ring-1 ring-[#C9A86A]/40'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#C9A86A]/20 text-[#C9A86A]' : 'bg-white/[0.05] text-slate-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#C9A86A]" />}
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-white leading-tight">{method.name}</h5>
                        <p className="text-[9.5px] text-slate-400 leading-tight mt-0.5 truncate">{method.subtitle}</p>
                      </div>

                      <span className={`inline-block px-1.5 py-0.5 rounded text-[8.5px] font-mono border ${method.badgeColor}`}>
                        {method.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Method Sub-Panel */}
              <div className="p-4 rounded-2xl bg-[#070A12]/80 border border-white/[0.06] space-y-3">
                {selectedMethod === 'upi' && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Instant UPI Payment (Any App or UPI ID)</span>
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <span>Google Pay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>CRED</span> • <span>BHIM</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g. name@okhdfcbank, mobile@ybl, username@paytm)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-[#C9A86A] text-xs text-slate-200 outline-none font-mono"
                      />
                      <button
                        onClick={handlePayNow}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md disabled:opacity-50"
                      >
                        Verify & Pay
                      </button>
                    </div>
                  </div>
                )}

                {selectedMethod === 'cards' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Enter Card Details or Continue to Secure 3D-Secure Portal</span>
                      <span className="text-[10px] font-mono text-cyan-400">Visa / Mastercard / RuPay / Amex</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                        maxLength={19}
                        className="sm:col-span-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 outline-none font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 outline-none font-mono"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength={4}
                          className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === 'netbanking' && (
                  <div className="space-y-3">
                    <span className="text-xs text-slate-300 block">Select Your Bank for Direct Net Banking:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs font-medium">
                      {POPULAR_BANKS.map((b) => (
                        <button
                          key={b.code}
                          onClick={() => setSelectedBank(b.code)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            selectedBank === b.code
                              ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-[#C9A86A]'
                              : 'bg-white/[0.03] border-white/[0.06] text-slate-300 hover:text-white'
                          }`}
                        >
                          {b.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMethod === 'wallets' && (
                  <div className="space-y-2 text-xs text-slate-300">
                    <span>Supported Mobile Wallets & Pay Later Providers:</span>
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">Paytm Wallet</span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">Amazon Pay Balance</span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">MobiKwik ZIP</span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">Simpl Pay Later</span>
                    </div>
                  </div>
                )}

                {selectedMethod === 'crypto' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Decentralized Web3 Instant Transfer (USDT / Crypto):</span>
                      <span className="text-[10px] font-mono text-[#C9A86A]">USDT (TRC20)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between font-mono text-[11px]">
                      <span className="text-slate-300 truncate max-w-[280px] sm:max-w-md">
                        T9xZ8yQ2mK4vW7nL3pJ1rS5uT8aB6cD4eF
                      </span>
                      <button
                        onClick={() => copyCryptoAddress('T9xZ8yQ2mK4vW7nL3pJ1rS5uT8aB6cD4eF')}
                        className="flex items-center gap-1 text-[#C9A86A] hover:underline cursor-pointer ml-2 shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedCrypto ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Billing Info & Final Cashfree Checkout Trigger */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 space-y-2">
                <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                  Step 3: Billing Info (For Instant Receipt & Feature Activation)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
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
                    placeholder="Mobile / WhatsApp"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-5 flex flex-col justify-end space-y-2">
                <button
                  onClick={handlePayNow}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Processing Cashfree Checkout...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Proceed to Pay ₹{selectedItem.priceInr} ({selectedMethod.toUpperCase()})</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Cashfree Payments • PCI-DSS Level 1 & 256-Bit SSL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
