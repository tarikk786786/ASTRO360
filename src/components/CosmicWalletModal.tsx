import React, { useState } from 'react';
import { 
  X, Wallet, Sparkles, Check, ArrowRight, ShieldCheck, Zap, 
  TrendingUp, CreditCard, History, Gift, Smartphone, Lock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useWalletStore } from '../stores/walletStore';
import { initiateCashfreeCheckout } from '../lib/cashfreeEngine';
import { UserProfile } from '../types';

interface CosmicWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
}

const RECHARGE_PACKS = [
  {
    id: 'pack-199',
    amount: 199,
    credit: 220,
    bonus: 21,
    tag: 'Starter',
    features: ['Instant AI Oracle queries', '1 Detailed Compatibility check'],
  },
  {
    id: 'pack-499',
    amount: 499,
    credit: 600,
    bonus: 101,
    tag: 'Most Popular 🔥',
    isPopular: true,
    features: ['1 Full 2026 Executive Career Dossier', '15-min Astrologer chat credits', 'Bonus ₹101 extra credits'],
  },
  {
    id: 'pack-999',
    amount: 999,
    credit: 1350,
    bonus: 351,
    tag: 'Best Value 💎',
    features: ['2 Comprehensive Dossiers (PDF)', '30-min Astrologer audio call', 'Forensic BTR access', 'Bonus ₹351 extra'],
  },
  {
    id: 'pack-2499',
    amount: 2499,
    credit: 3600,
    bonus: 1101,
    tag: 'VIP Scholar 👑',
    features: ['Unlimited Executive Dossiers', '1 Free Live Video Astrologer Call', 'Lifetime Muhurta Calendar', 'Bonus ₹1,101 extra'],
  },
];

export default function CosmicWalletModal({ isOpen, onClose, userProfile }: CosmicWalletModalProps) {
  const { balance, transactions, addCredits, getFormattedBalance } = useWalletStore();
  const [selectedPack, setSelectedPack] = useState(RECHARGE_PACKS[1]);
  const [activeTab, setActiveTab] = useState<'recharge' | 'history'>('recharge');
  const [loading, setLoading] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRecharge = async () => {
    setLoading(true);
    try {
      await initiateCashfreeCheckout({
        item: {
          id: selectedPack.id,
          name: `Cosmic Wallet Recharge: ₹${selectedPack.amount} (Get ₹${selectedPack.credit})`,
          category: 'tokens',
          priceInr: selectedPack.amount,
          description: `Add ₹${selectedPack.credit} Cosmic Credits to your balance.`,
          features: selectedPack.features,
        },
        customerName: userProfile?.name || 'Cosmic Seeker',
        customerEmail: userProfile?.email || 'seeker@astro.tarikislam.in',
        customerPhone: userProfile?.phone || '9876543210',
        onSuccess: (orderData) => {
          addCredits(selectedPack.credit, `Wallet Recharge (+₹${selectedPack.credit} Credits)`, orderData?.order_id);
          setRechargeSuccess(true);
          setLoading(false);
        },
        onFailure: (err) => {
          setLoading(false);
          console.error('Wallet recharge error:', err);
        },
      });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0D1220] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden my-4 text-slate-100"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#C9A86A]/25 via-cyan-900/20 to-[#0D1220] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                Cosmic Wallet <span className="text-[#C9A86A] text-xs uppercase font-mono tracking-wider">Credits</span>
              </h2>
              <p className="text-xs text-slate-300">
                Use your wallet balance for 1-click reports, instant AI queries, and live Astrologer calls.
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

        {/* Current Balance Banner */}
        <div className="p-6 bg-[#070A12]/80 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Available Balance</span>
            <div className="text-3xl font-bold font-serif text-[#C9A86A]">{getFormattedBalance()}</div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
              <Gift className="w-3 h-3" /> Includes ₹50 welcome bonus
            </span>
          </div>

          <div className="flex gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
            <button
              onClick={() => setActiveTab('recharge')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'recharge' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Add Money
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'history' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          </div>
        </div>

        {rechargeSuccess ? (
          <div className="p-10 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-serif text-white">Wallet Recharged Successfully!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Added <strong className="text-[#C9A86A]">₹{selectedPack.credit} credits</strong> to your Cosmic Wallet. Your updated balance is {getFormattedBalance()}.
            </p>
            <button
              onClick={() => {
                setRechargeSuccess(false);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-[#C9A86A] text-[#070A12] font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              Done & Continue
            </button>
          </div>
        ) : activeTab === 'recharge' ? (
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C9A86A] uppercase tracking-wider block">
                Select Quick Recharge Pack (Extra Bonus Credits Included)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RECHARGE_PACKS.map((pack) => {
                  const isSelected = selectedPack.id === pack.id;
                  return (
                    <div
                      key={pack.id}
                      onClick={() => setSelectedPack(pack)}
                      className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#070A12] border-[#C9A86A] shadow-[0_0_15px_rgba(201,168,106,0.2)] ring-1 ring-[#C9A86A]/40'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06]'
                      }`}
                    >
                      {pack.tag && (
                        <span className={`absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          pack.isPopular ? 'bg-[#C9A86A] text-[#070A12]' : 'bg-white/[0.08] text-slate-300 border border-white/[0.1]'
                        }`}>
                          {pack.tag}
                        </span>
                      )}

                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold font-serif text-white">Pay ₹{pack.amount}</span>
                          <span className="text-xs font-mono text-emerald-400 font-bold">Get ₹{pack.credit}</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300 block">
                          Includes +₹{pack.bonus} extra free credits
                        </span>
                        <ul className="mt-2 space-y-1 text-[10.5px] text-slate-300">
                          {pack.features.slice(0, 2).map((feat, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#C9A86A] shrink-0" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/[0.04] text-[10.5px] font-mono text-right">
                        <span className={isSelected ? 'text-[#C9A86A] font-bold' : 'text-slate-500'}>
                          {isSelected ? '✓ Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recharge Trigger */}
            <div className="space-y-3 pt-3 border-t border-white/[0.06]">
              <button
                onClick={handleRecharge}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.4)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Processing Cashfree Checkout...</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4" />
                    <span>Add ₹{selectedPack.credit} Credits (Pay ₹{selectedPack.amount} via UPI/Cards)</span>
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Auto-Credit via Cashfree Payments Gateway</span>
              </div>
            </div>
          </div>
        ) : (
          /* Transaction History View */
          <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto custom-scrollbar">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Recent Transactions & Deductions
            </span>

            {transactions.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No transactions recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white block">{tx.description}</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(tx.timestamp).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <span className={`font-mono font-bold text-sm ${
                      tx.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {tx.type === 'credit' ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
