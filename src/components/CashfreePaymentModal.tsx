import React, { useState, useEffect } from 'react';
import { 
  X, Check, Sparkles, ShieldCheck, Zap, Lock, ArrowRight, Star, 
  FileText, CreditCard, QrCode, Building2, Wallet, Coins, 
  Smartphone, Copy, ExternalLink, Download, Clock, CheckCircle2, 
  AlertCircle, RefreshCw, CheckCheck, HelpCircle, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MONETIZATION_CATALOG, MonetizationItem, initiateCashfreeCheckout } from '../lib/cashfreeEngine';
import { useWalletStore } from '../stores/walletStore';
import { UserProfile } from '../types';

interface CashfreePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
  initialCategory?: 'subscription' | 'report' | 'consultation';
  onPaymentSuccess?: (item: MonetizationItem) => void;
}

type PaymentRail = 'upi_qr' | 'cashfree_pg' | 'crypto';

export default function CashfreePaymentModal({
  isOpen,
  onClose,
  userProfile,
  initialCategory = 'subscription',
  onPaymentSuccess,
}: CashfreePaymentModalProps) {
  // All hooks declared unconditionally at the very top
  const [selectedCategory, setSelectedCategory] = useState<'subscription' | 'report' | 'consultation'>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<MonetizationItem>(
    MONETIZATION_CATALOG.find((m) => m.category === initialCategory) || MONETIZATION_CATALOG[0]
  );
  
  const [activeRail, setActiveRail] = useState<PaymentRail>('upi_qr');
  const [utrNumber, setUtrNumber] = useState('');
  
  const [customerName, setCustomerName] = useState(userProfile?.name || 'Tarik Islam');
  const [customerEmail, setCustomerEmail] = useState(userProfile?.email || 'tarik@astro.tarikislam.in');
  const [customerPhone, setCustomerPhone] = useState(userProfile?.phone || '9876543210');
  
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedCrypto, setCopiedCrypto] = useState(false);

  const { addCredits } = useWalletStore();

  useEffect(() => {
    if (userProfile?.name) setCustomerName(userProfile.name);
    if (userProfile?.email) setCustomerEmail(userProfile.email);
    if (userProfile?.phone) setCustomerPhone(userProfile.phone);
  }, [userProfile]);

  useEffect(() => {
    const item = MONETIZATION_CATALOG.find((m) => m.category === selectedCategory);
    if (item) setSelectedItem(item);
  }, [selectedCategory]);

  if (!isOpen) return null;

  const filteredItems = MONETIZATION_CATALOG.filter((m) => m.category === selectedCategory);

  // Real NPCI UPI URI string
  const upiPayUri = `upi://pay?pa=tarikislam786@okaxis&pn=ASTRO360%20Omni&am=${selectedItem.priceInr}&cu=INR&tn=ASTRO360_${selectedItem.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(upiPayUri)}`;

  // Strict UPI UTR Verification Handler
  const handleVerifyUtr = async () => {
    setVerifyError(null);
    const cleanUtr = utrNumber.trim();

    if (!cleanUtr || cleanUtr.length < 10) {
      setVerifyError('⚠️ Please enter the valid 12-digit UPI UTR / Reference Number from your payment app (Google Pay, PhonePe, Paytm, or BHIM).');
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

  // Launch Cashfree Direct PG
  const handleLaunchCashfreePg = async () => {
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
          setActiveRail('upi_qr');
          setVerifyError(err?.message || 'Cashfree Merchant Account Activation Pending on merchant.cashfree.com. Please scan the Instant UPI QR code below to pay.');
        },
      });

      if (checkoutResult?.orderId) {
        setConfirmedOrderId(checkoutResult.orderId);
      }
    } catch (err: any) {
      setLoading(false);
      setActiveRail('upi_qr');
      setVerifyError(err?.message || 'Cashfree PG is pending account activation. Please use the Instant UPI QR code to complete payment.');
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
Base Amount:    ₹${(selectedItem.priceInr * 0.8475).toFixed(2)} INR
GST (18%):      ₹${(selectedItem.priceInr * 0.1525).toFixed(2)} INR
-----------------------------------------------------
TOTAL PAID:     ₹${selectedItem.priceInr}.00 INR
-----------------------------------------------------
Payment Rail:   ${activeRail.toUpperCase()} (Instant UPI / Cards / NetBanking)
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
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-5xl rounded-3xl bg-[#0D1220] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-4 text-slate-100"
      >
        {/* Top Header Ribbon */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#C9A86A]/20 via-purple-950/20 to-[#0D1220] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
                ASTRO360 <span className="text-[#C9A86A] text-xs uppercase font-mono tracking-wider font-normal">Payment Terminal</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Official Cashfree Payments Gateway • 256-Bit SSL Encrypted
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
          /* Payment Success & Receipt Screen */
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
                Thank you, <strong className="text-white">{customerName}</strong>. Your purchase of <strong className="text-[#C9A86A]">{selectedItem.name} (₹{selectedItem.priceInr} INR)</strong> has been confirmed.
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
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* Category Selector Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-mono text-[#C9A86A] uppercase tracking-wider">
                Select Service Package
              </span>
              
              <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
                {(['subscription', 'report', 'consultation'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                      selectedCategory === cat ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'subscription' ? 'Pro Subscriptions' : cat === 'report' ? 'PDF Dossiers' : 'Consultations'}
                  </button>
                ))}
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {filteredItems.map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#070A12] border-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.15)] ring-1 ring-[#C9A86A]/50'
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
                        <span className="text-lg sm:text-xl font-bold font-serif text-[#C9A86A]">₹{item.priceInr}</span>
                        {item.originalPriceInr && (
                          <span className="text-[10px] text-slate-500 line-through font-mono">₹{item.originalPriceInr}</span>
                        )}
                        {item.discountPercentage && (
                          <span className="text-[9px] font-mono text-emerald-400 font-semibold">({item.discountPercentage}% OFF)</span>
                        )}
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-snug line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono">
                      <span className={isSelected ? 'text-[#C9A86A] font-bold' : 'text-slate-500'}>
                        {isSelected ? '✓ Selected' : 'Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Error Message Alert */}
            {verifyError && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">
                  <span>{verifyError}</span>
                </div>
              </div>
            )}

            {/* Main 2-Column Payment Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 border-t border-white/[0.06]">
              
              {/* Left Column: Order Summary & Customer Details */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-3">
                  <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                    Order Summary
                  </span>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>Item:</span>
                      <span className="text-white font-bold truncate max-w-[180px]">{selectedItem.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Base Amount:</span>
                      <span>₹{(selectedItem.priceInr * 0.8475).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>GST (18%):</span>
                      <span>₹{(selectedItem.priceInr * 0.1525).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.08] flex justify-between text-sm">
                      <span className="text-white font-bold">Total Amount:</span>
                      <span className="text-[#C9A86A] font-bold text-base">₹{selectedItem.priceInr}.00 INR</span>
                    </div>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
                  <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block">
                    Billing Details
                  </span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-xs text-slate-200 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-xs text-slate-200 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp / Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] text-xs text-slate-200 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 px-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Satisfaction Guarantee • 7-Day Refund Policy</span>
                </div>
              </div>

              {/* Right Column: Payment Method Terminal */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveRail('upi_qr')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeRail === 'upi_qr'
                        ? 'bg-[#070A12] border-[#C9A86A] text-white shadow-[0_0_15px_rgba(201,168,106,0.15)] ring-1 ring-[#C9A86A]/50'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <QrCode className="w-4 h-4 text-[#C9A86A]" />
                      <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">0% Fee</span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white mt-1">Instant UPI / QR</h5>
                      <p className="text-[9px] text-slate-400">GPay, PhonePe, Paytm</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveRail('cashfree_pg')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeRail === 'cashfree_pg'
                        ? 'bg-[#070A12] border-[#C9A86A] text-white shadow-[0_0_15px_rgba(201,168,106,0.15)] ring-1 ring-[#C9A86A]/50'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span className="text-[8px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Cards & Banks</span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white mt-1">Cashfree PG</h5>
                      <p className="text-[9px] text-slate-400">Cards, NetBanking</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveRail('crypto')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      activeRail === 'crypto'
                        ? 'bg-[#070A12] border-[#C9A86A] text-white shadow-[0_0_15px_rgba(201,168,106,0.15)] ring-1 ring-[#C9A86A]/50'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span className="text-[8px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">Global</span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white mt-1">Crypto / USDT</h5>
                      <p className="text-[9px] text-slate-400">TRC20 & ERC20</p>
                    </div>
                  </button>
                </div>

                {/* Panel 1: Instant UPI & Scan QR Code */}
                {activeRail === 'upi_qr' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      {/* High-Resolution QR Code */}
                      <div className="p-2.5 rounded-2xl bg-white shrink-0 shadow-lg">
                        <img
                          src={qrCodeUrl}
                          alt="Instant UPI QR Code"
                          className="w-36 h-36 sm:w-40 sm:h-40 rounded-lg select-none"
                        />
                      </div>

                      {/* Instructions & UPI ID */}
                      <div className="space-y-3 flex-1 text-left">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Smartphone className="w-4 h-4 text-emerald-400" />
                            <span>Scan with any UPI Camera or App</span>
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Open Google Pay, PhonePe, Paytm, CRED, or BHIM and scan this QR code to pay <strong className="text-[#C9A86A]">₹{selectedItem.priceInr} INR</strong>.
                          </p>
                        </div>

                        {/* Copyable UPI ID */}
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono flex items-center justify-between gap-2">
                          <span className="text-slate-300 truncate">tarikislam786@okaxis</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText('tarikislam786@okaxis');
                              setCopiedUpi(true);
                              setTimeout(() => setCopiedUpi(false), 2000);
                            }}
                            className="text-[#C9A86A] hover:underline cursor-pointer font-bold shrink-0"
                          >
                            {copiedUpi ? 'Copied!' : 'Copy UPI'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 1-Step UTR Verification Box */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                      <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                        Step 2: Enter 12-Digit UPI Reference (UTR)
                      </span>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="e.g. 423812345678 (from payment receipt)"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-[#C9A86A] text-xs text-slate-200 outline-none font-mono"
                        />
                        <button
                          onClick={handleVerifyUtr}
                          disabled={verifying}
                          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
                        >
                          {verifying ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Verifying...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Submit UTR & Activate</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Panel 2: Official Cashfree PG */}
                {activeRail === 'cashfree_pg' && (
                  <div className="p-6 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white font-serif">Cashfree Online Payment Gateway</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Pay securely with Credit Cards, Debit Cards, NetBanking (50+ Banks), or Mobile Wallets.
                      </p>
                    </div>

                    <button
                      onClick={handleLaunchCashfreePg}
                      disabled={loading}
                      className="w-full max-w-sm mx-auto py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Connecting to Cashfree...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Launch Cashfree Secure Checkout (₹{selectedItem.priceInr})</span>
                        </>
                      )}
                    </button>

                    <div className="text-[10px] font-mono text-slate-500">
                      Cashfree Merchant AppID: 1003809f7024040e83e725d994c9083001
                    </div>
                  </div>
                )}

                {/* Panel 3: Crypto USDT */}
                {activeRail === 'crypto' && (
                  <div className="p-5 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-4">
                    <div className="space-y-1 text-left">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <span>Decentralized USDT Payment (TRC20)</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Transfer equivalent USDT to the address below and submit transaction hash for activation.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-200 truncate mr-2">T9xZ8yQ2mK4vW7nL3pJ1rS5uT8aB6cD4eF</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('T9xZ8yQ2mK4vW7nL3pJ1rS5uT8aB6cD4eF');
                          setCopiedCrypto(true);
                          setTimeout(() => setCopiedCrypto(false), 2000);
                        }}
                        className="text-[#C9A86A] font-bold text-xs shrink-0 cursor-pointer hover:underline"
                      >
                        {copiedCrypto ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Enter Transaction Hash / TxID"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-200 outline-none"
                      />
                      <button
                        onClick={handleVerifyUtr}
                        disabled={verifying}
                        className="px-6 py-2.5 rounded-xl bg-[#C9A86A] text-[#070A12] font-bold text-xs transition-all cursor-pointer shadow-md shrink-0"
                      >
                        Confirm TxID
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
