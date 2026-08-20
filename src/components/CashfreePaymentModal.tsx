import React, { useState, useEffect } from 'react';
import { 
  X, Check, Sparkles, ShieldCheck, Zap, Lock, ArrowRight, Star, Heart, 
  FileText, Users, CreditCard, QrCode, Building2, Wallet, Coins, Landmark, 
  ChevronRight, Smartphone, Copy, ExternalLink, Download, Clock, CheckCircle2, 
  AlertCircle, RefreshCw, CheckCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MONETIZATION_CATALOG, MonetizationItem, initiateCashfreeCheckout } from '../lib/cashfreeEngine';
import { useWalletStore } from '../stores/walletStore';
import { useUserStore } from '../stores/userStore';
import { UserProfile } from '../types';

interface CashfreePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
  initialCategory?: 'subscription' | 'report' | 'consultation';
  onPaymentSuccess?: (item: MonetizationItem) => void;
}

type PaymentMethodType = 'upi' | 'qr' | 'cards' | 'netbanking' | 'wallets' | 'crypto';

const PAYMENT_METHODS = [
  {
    id: 'upi' as PaymentMethodType,
    name: 'Instant UPI',
    subtitle: 'GPay, PhonePe, Paytm, CRED',
    icon: Smartphone,
    badge: '0% Surcharge',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'qr' as PaymentMethodType,
    name: 'Scan UPI QR',
    subtitle: 'Scan with any UPI camera app',
    icon: QrCode,
    badge: 'Instant QR',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 'cards' as PaymentMethodType,
    name: 'Debit / Credit Cards',
    subtitle: 'Visa, MasterCard, RuPay, Amex',
    icon: CreditCard,
    badge: 'Global & Domestic',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    id: 'netbanking' as PaymentMethodType,
    name: 'Net Banking',
    subtitle: 'HDFC, SBI, ICICI, Axis + 50 Banks',
    icon: Building2,
    badge: 'Direct Bank Transfer',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    id: 'crypto' as PaymentMethodType,
    name: 'Crypto / Web3',
    subtitle: 'USDT (TRC20/ERC20), BTC, ETH',
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
  const [upiVpa, setUpiVpa] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  
  const [customerName, setCustomerName] = useState(userProfile?.name || 'Tarik Islam');
  const [customerEmail, setCustomerEmail] = useState(userProfile?.email || 'tarik@astro.tarikislam.in');
  const [customerPhone, setCustomerPhone] = useState(userProfile?.phone || '9876543210');
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [copiedCrypto, setCopiedCrypto] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const { addCredits } = useWalletStore();

  useEffect(() => {
    if (userProfile?.name) setCustomerName(userProfile.name);
    if (userProfile?.email) setCustomerEmail(userProfile.email);
    if (userProfile?.phone) setCustomerPhone(userProfile.phone);
  }, [userProfile]);

  if (!isOpen) return null;

  const filteredItems = MONETIZATION_CATALOG.filter((m) => m.category === selectedCategory);

  // Real NPCI UPI URI string
  const upiPayUri = `upi://pay?pa=tarikislam786@okaxis&pn=ASTRO360%20Omni&am=${selectedItem.priceInr}&cu=INR&tn=ASTRO360_${selectedItem.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(upiPayUri)}`;

  // Strict Verification Handler (Requires Valid UTR or Real Gateway Callback)
  const handleVerifyAndConfirm = async () => {
    setVerifyError(null);
    const cleanUtr = utrNumber.trim();

    if (!cleanUtr || cleanUtr.length < 10) {
      setVerifyError('⚠️ Please enter the 12-digit UPI Transaction / UTR Reference Number from your payment app (Google Pay, PhonePe, Paytm, or BHIM) to verify.');
      return;
    }

    setVerifying(true);
    const orderRef = `ORD_ASTRO_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_utr',
          amount: selectedItem.priceInr,
          planId: selectedItem.id,
          utrNumber: cleanUtr,
          orderId: orderRef,
          customerName,
          customerEmail,
          customerPhone,
        }),
      });

      const data = await res.json();

      if (data && data.success && data.status === 'PAID') {
        setConfirmedOrderId(orderRef);
        setPaymentSuccess(true);
        setVerifying(false);

        try {
          const purchased = JSON.parse(localStorage.getItem('astro360_purchased_items') || '[]');
          purchased.push({
            itemId: selectedItem.id,
            name: selectedItem.name,
            category: selectedItem.category,
            amount: selectedItem.priceInr,
            date: new Date().toISOString(),
            orderId: orderRef,
            utr: cleanUtr,
          });
          localStorage.setItem('astro360_purchased_items', JSON.stringify(purchased));
        } catch (e) {}

        if (onPaymentSuccess) onPaymentSuccess(selectedItem);
      } else {
        setVerifyError(data?.message || 'Verification pending. Please check UTR number and retry.');
        setVerifying(false);
      }
    } catch (e) {
      setVerifyError('Unable to connect to verification server. Please retry in a moment.');
      setVerifying(false);
    }
  };

  const handleExecutePayment = async () => {
    setLoading(true);
    setVerifyError(null);

    try {
      const checkoutResult = await initiateCashfreeCheckout({
        item: selectedItem,
        customerName: customerName || 'Cosmic Seeker',
        customerEmail: customerEmail || 'seeker@astro.tarikislam.in',
        customerPhone: customerPhone || '9876543210',
        onSuccess: (paymentDetails) => {
          if (paymentDetails?.order_status === 'PAID' || paymentDetails?.order_id) {
            setConfirmedOrderId(paymentDetails?.order_id || `ORD_${Date.now()}`);
            setPaymentSuccess(true);
            setLoading(false);
            if (onPaymentSuccess) onPaymentSuccess(selectedItem);
          } else {
            setLoading(false);
            setVerifyError('Payment was not marked as PAID by Cashfree.');
          }
        },
        onFailure: (err) => {
          setLoading(false);
          // If Cashfree modal is closed or failed, switch to QR view with clean explanation
          setSelectedMethod('qr');
          setVerifyError('Cashfree direct portal is currently unavailable or was cancelled. Please scan the UPI QR code below and enter your UTR to verify.');
        },
      });

      if (checkoutResult?.orderId) {
        setConfirmedOrderId(checkoutResult.orderId);
      }
    } catch (err: any) {
      setLoading(false);
      setSelectedMethod('qr');
      setVerifyError('Could not open Cashfree PG modal. Please scan the QR code below and enter your UTR.');
    }
  };

  const handleDownloadInvoice = () => {
    const invoiceText = `=====================================================
               ASTRO360 OMNI • TAX INVOICE / RECEIPT
=====================================================
Invoice No:    ${confirmedOrderId || 'ORD_' + Date.now()}
Date:          ${new Date().toLocaleString('en-IN')}
Status:        PAID & VERIFIED (SUCCESS)
Gateway:       Cashfree Payments (Merchant AppID: 1003809f7024040e83e725d994c9083001)

BILLED TO:
Name:          ${customerName || 'Cosmic Seeker'}
Email:         ${customerEmail || 'seeker@astro.tarikislam.in'}
Phone:         ${customerPhone || '9876543210'}

PURCHASE DETAILS:
Plan / Service: ${selectedItem.name}
Category:       ${selectedItem.category.toUpperCase()}
Base Amount:    ₹${(selectedItem.priceInr * 0.82).toFixed(2)} INR
GST (18%):      ₹${(selectedItem.priceInr * 0.18).toFixed(2)} INR
-----------------------------------------------------
TOTAL PAID:     ₹${selectedItem.priceInr}.00 INR
-----------------------------------------------------
Payment Rail:   ${selectedMethod.toUpperCase()} (Instant UPI / Cards / NetBanking)
Security:       PCI-DSS Level 1 & 256-Bit SSL Encrypted

Thank you for choosing ASTRO360 Omni Global Platform!
https://astro.tarikislam.in
=====================================================`;

    const blob = new Blob([invoiceText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${confirmedOrderId || 'ASTRO360'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl rounded-3xl bg-[#0D1220] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-4 sm:my-6 text-slate-100"
      >
        {/* Top Header Ribbon */}
        <div className="p-5 sm:p-7 bg-gradient-to-r from-[#C9A86A]/20 via-purple-900/20 to-[#0D1220] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
                ASTRO360 <span className="text-[#C9A86A] text-xs sm:text-sm uppercase font-mono tracking-wider font-normal">Cashfree Checkout</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Official Cashfree Payments Gateway • Instant Verification & Fulfillment
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
          /* Payment Success & Automated Fulfillment Screen */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <Check className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase font-bold">
                ● Transaction Verified & Activated
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">Payment Verified Successfully!</h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{customerName}</strong>. Your purchase of <strong className="text-[#C9A86A]">{selectedItem.name} (₹{selectedItem.priceInr} INR)</strong> has been confirmed and activated.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#070A12] border border-white/[0.08] text-xs font-mono text-left space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Order Reference:</span>
                <span className="text-white font-bold">{confirmedOrderId || 'ORD_ASTRO_' + Date.now()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Amount Paid:</span>
                <span className="text-[#C9A86A] font-bold">₹{selectedItem.priceInr}.00 INR</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Verification Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5" /> 100% VERIFIED
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Feature Access:</span>
                <span className="text-cyan-400 font-bold">INSTANTLY UNLOCKED</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadInvoice}
                className="px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Tax Invoice</span>
              </button>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-[#C9A86A] hover:bg-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.4)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Enter Activated App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-7 space-y-6">
            
            {/* Step 1: Select Plan or Report */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#C9A86A] uppercase tracking-wider">
                  Step 1: Select Service / Plan
                </span>
                
                {/* Category Switcher Tabs */}
                <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px]">
                  <button
                    onClick={() => {
                      setSelectedCategory('subscription');
                      setSelectedItem(MONETIZATION_CATALOG.find((m) => m.category === 'subscription') || MONETIZATION_CATALOG[0]);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      selectedCategory === 'subscription' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
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
                      selectedCategory === 'report' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
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
                      selectedCategory === 'consultation' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Consultations
                  </button>
                </div>
              </div>

              {/* Items Cards */}
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
                          {isSelected ? '✓ Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Multi-Method Selector */}
            <div className="space-y-3 pt-2 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-[#C9A86A] uppercase tracking-wider block">
                Step 2: Choose Payment Instrument
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

              {verifyError && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">
                    <span>{verifyError}</span>
                  </div>
                </div>
              )}

              {/* Dynamic Interactive Payment Method Panel */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#070A12]/90 border border-white/[0.06] space-y-4">
                
                {/* Method 1: Instant UPI Apps */}
                {selectedMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-slate-200 font-medium flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-400" />
                        <span>Instant 1-Click UPI Apps (Mobile & Desktop)</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">Zero Gateway Surcharge</span>
                    </div>

                    {/* Direct UPI App Deep Link Launchers */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
                      <a
                        href={upiPayUri}
                        className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center gap-2 text-white hover:border-[#C9A86A] transition-all cursor-pointer"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>Google Pay</span>
                      </a>

                      <a
                        href={upiPayUri}
                        className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center gap-2 text-white hover:border-[#C9A86A] transition-all cursor-pointer"
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        <span>PhonePe</span>
                      </a>

                      <a
                        href={upiPayUri}
                        className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center gap-2 text-white hover:border-[#C9A86A] transition-all cursor-pointer"
                      >
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span>Paytm UPI</span>
                      </a>

                      <a
                        href={upiPayUri}
                        className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center gap-2 text-white hover:border-[#C9A86A] transition-all cursor-pointer"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>CRED / BHIM</span>
                      </a>
                    </div>

                    {/* Verification Panel */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2.5">
                      <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                        Verify UPI Payment
                      </span>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Enter 12-Digit UPI UTR / Reference No. (e.g. 423812345678)"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-[#C9A86A] text-xs text-slate-200 outline-none font-mono"
                        />
                        <button
                          onClick={handleVerifyAndConfirm}
                          disabled={verifying}
                          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                        >
                          {verifying ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Verifying with Bank...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Verify & Unlock Now</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Method 2: Live Dynamic UPI QR Code */}
                {selectedMethod === 'qr' && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                    <div className="p-3 rounded-2xl bg-white p-2.5 shadow-xl shrink-0">
                      <img
                        src={qrCodeUrl}
                        alt="Cashfree UPI QR Code"
                        className="w-44 h-44 rounded-lg select-none"
                      />
                    </div>

                    <div className="space-y-3 text-left w-full sm:max-w-md">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-[#C9A86A]" />
                          <span>Scan QR with Any UPI App</span>
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Scan with Google Pay, PhonePe, Paytm, CRED, or BHIM to pay <strong className="text-[#C9A86A]">₹{selectedItem.priceInr} INR</strong>.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono flex items-center justify-between gap-2">
                        <span className="text-slate-300 truncate">tarikislam786@okaxis</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('tarikislam786@okaxis');
                            setCopiedUpi(true);
                            setTimeout(() => setCopiedUpi(false), 2000);
                          }}
                          className="text-[#C9A86A] hover:underline cursor-pointer shrink-0 font-bold"
                        >
                          {copiedUpi ? 'Copied!' : 'Copy UPI'}
                        </button>
                      </div>

                      <div className="space-y-2 pt-1">
                        <input
                          type="text"
                          placeholder="Optional: Enter UPI UTR / Ref No."
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-200 outline-none"
                        />
                        <button
                          onClick={handleVerifyAndConfirm}
                          disabled={verifying}
                          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                        >
                          {verifying ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Verifying Payment...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>I Have Paid • Verify & Unlock</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Method 3: Cards */}
                {selectedMethod === 'cards' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Enter Card Details for Secure 3D-Secure Processing</span>
                      <span className="text-[10px] font-mono text-cyan-400">Visa / Mastercard / RuPay / Amex</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        className="sm:col-span-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 outline-none font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                          className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 outline-none font-mono"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                          className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Method 4: Net Banking */}
                {selectedMethod === 'netbanking' && (
                  <div className="space-y-3">
                    <span className="text-xs text-slate-300 block">Select Bank for Direct Net Banking:</span>
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

                {/* Method 5: Crypto */}
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
                        onClick={() => {
                          navigator.clipboard.writeText('T9xZ8yQ2mK4vW7nL3pJ1rS5uT8aB6cD4eF');
                          setCopiedCrypto(true);
                          setTimeout(() => setCopiedCrypto(false), 2000);
                        }}
                        className="flex items-center gap-1 text-[#C9A86A] hover:underline cursor-pointer ml-2 shrink-0 font-bold"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedCrypto ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Billing & Final Checkout Trigger */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 space-y-2">
                <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                  Step 3: Billing Details
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
                  onClick={handleExecutePayment}
                  disabled={loading || verifying}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Opening Cashfree Portal...</span>
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
                  <span>Cashfree PG (AppID: 1003809f...) • 256-Bit SSL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
