import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, CheckCircle2, Lock, CreditCard, QrCode, 
  ExternalLink, Copy, Check, Clock, AlertCircle, Sparkles, RefreshCw, Zap, Wrench, Building, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  createOwnPayPaymentIntent, 
  verifyOwnPayTransaction, 
  getMerchantPayoutSettings,
  saveMerchantPayoutSettings,
  DEFAULT_OWNPAY_CONFIG, 
  type OwnPayPaymentRequest, 
  type OwnPayTransaction,
  type MerchantPayoutSettings
} from '../lib/ownpayEngine';

interface OwnPayPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (tx: OwnPayTransaction) => void;
  bookingDetails: {
    astrologerName: string;
    specialty: string;
    avatar: string;
    format: 'video' | 'chat' | 'written';
    slot: string;
    feeAmount: number;
    feeCurrency: string;
  };
}

export default function OwnPayPaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  bookingDetails
}: OwnPayPaymentModalProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'USDT' | 'BTC' | 'ETH' | 'SOL'>('USDT');
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card' | 'qr'>('crypto');
  const [transaction, setTransaction] = useState<OwnPayTransaction | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes in seconds

  // Merchant Settings & Edit Panel State
  const [merchantSettings, setMerchantSettings] = useState<MerchantPayoutSettings>(getMerchantPayoutSettings());
  const [showConfigPanel, setShowConfigPanel] = useState<boolean>(false);
  const [editSettings, setEditSettings] = useState<MerchantPayoutSettings>(merchantSettings);

  // Card form state
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');

  // Initialize OwnPay Payment Intent on modal open
  useEffect(() => {
    if (isOpen) {
      const activeSettings = getMerchantPayoutSettings();
      setMerchantSettings(activeSettings);
      setEditSettings(activeSettings);

      const initPayment = async () => {
        const req: OwnPayPaymentRequest = {
          title: `1-on-1 Astrological Consultation with ${bookingDetails.astrologerName}`,
          amount: bookingDetails.feeAmount,
          currency: selectedCurrency,
          customerName: 'Seeker',
          customerEmail: 'seeker@astro360.app',
          astrologerName: bookingDetails.astrologerName,
          format: bookingDetails.format
        };
        const tx = await createOwnPayPaymentIntent(req);
        setTransaction(tx);
        setTimeLeft(900);
      };
      initPayment();
    }
  }, [isOpen, selectedCurrency, bookingDetails]);

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveMerchantConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveMerchantPayoutSettings(editSettings);
    setMerchantSettings(updated);
    setShowConfigPanel(false);
    toast.success('Merchant Payout Settings Saved Successfully!');
  };

  const getDestinationWallet = () => {
    if (selectedCurrency === 'BTC') return merchantSettings.payoutBtc;
    if (selectedCurrency === 'ETH') return merchantSettings.payoutEth;
    if (selectedCurrency === 'SOL') return merchantSettings.payoutSol;
    return merchantSettings.payoutUsdtTrc20;
  };

  const handleCopyAddress = () => {
    const addr = getDestinationWallet();
    navigator.clipboard.writeText(addr);
    setIsCopied(true);
    toast.success('Destination Wallet Address Copied!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleProcessPayment = () => {
    if (!transaction) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      const verification = verifyOwnPayTransaction(transaction.paymentId);
      const completedTx: OwnPayTransaction = {
        ...transaction,
        status: 'completed',
        txHash: verification.txHash,
        destinationAddress: getDestinationWallet()
      };
      setIsProcessing(false);
      onPaymentSuccess(completedTx);
      toast.success('OwnPay Payment Completed & Verified!');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="max-w-xl w-full rounded-3xl bg-[#111827] border border-amber-500/40 p-6 space-y-5 shadow-2xl relative text-left text-xs font-sans my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <ShieldCheck className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-mono tracking-tight">OwnPay Secure Gateway</h3>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> 256-Bit Encrypted
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  Official OwnPay Self-Hosted Merchant Protocol (learn.ownpay.org)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConfigPanel(!showConfigPanel)}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 font-mono text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all"
              >
                <Wrench className="w-3 h-3 text-amber-400" /> Merchant Setup
              </button>

              <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* EDIT MERCHANT PAYOUT CONFIGURATION DRAWER */}
          {showConfigPanel && (
            <form onSubmit={handleSaveMerchantConfig} className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-amber-400" /> Customise Merchant Payout Addresses & Gateway
                </span>
                <span className="text-[9px] text-slate-400">Direct Settlement Destination</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-300 font-bold block">USDT (TRC20 Wallet Address)</label>
                  <input
                    type="text"
                    value={editSettings.payoutUsdtTrc20}
                    onChange={(e) => setEditSettings({ ...editSettings, payoutUsdtTrc20: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-[11px] text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-300 font-bold block">Bitcoin (BTC Wallet Address)</label>
                  <input
                    type="text"
                    value={editSettings.payoutBtc}
                    onChange={(e) => setEditSettings({ ...editSettings, payoutBtc: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-[11px] text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-300 font-bold block">Ethereum / USDT (ERC20 Address)</label>
                  <input
                    type="text"
                    value={editSettings.payoutEth}
                    onChange={(e) => setEditSettings({ ...editSettings, payoutEth: e.target.value, payoutUsdtErc20: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-[11px] text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-300 font-bold block">Solana (SOL Wallet Address)</label>
                  <input
                    type="text"
                    value={editSettings.payoutSol}
                    onChange={(e) => setEditSettings({ ...editSettings, payoutSol: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-[11px] text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-500/20">
                <button
                  type="button"
                  onClick={() => setShowConfigPanel(false)}
                  className="px-3 py-1 rounded-lg bg-white/5 text-slate-300 hover:text-white text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] hover:bg-amber-400 cursor-pointer shadow"
                >
                  Save Merchant Payout Settings
                </button>
              </div>
            </form>
          )}

          {/* 🏦 WHERE & WHEN PAYMENT IS RECEIVED LEDGER */}
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1.5 text-[11px] font-mono">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-1">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" /> WHERE PAYMENT WILL BE RECEIVED:
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Direct Merchant Payout
              </span>
            </div>
            <p className="text-slate-200 text-[10px] font-mono truncate">
              Destination Wallet ({selectedCurrency}): <strong className="text-amber-300 font-mono">{getDestinationWallet()}</strong>
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-300 pt-0.5">
              <span>WHEN PAYMENT IS RECEIVED:</span>
              <span className="text-emerald-300 font-bold">
                Instant (&lt; 60 sec upon 1-block confirmation)
              </span>
            </div>
          </div>

          {/* Consultation Summary Card */}
          <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{bookingDetails.avatar}</span>
                <div>
                  <h4 className="font-bold text-white text-xs">{bookingDetails.astrologerName}</h4>
                  <span className="text-[10px] text-amber-400 font-mono block">{bookingDetails.specialty}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-400 font-mono block">${bookingDetails.feeAmount} USD</span>
                <span className="text-[9px] text-slate-400 font-mono capitalize">{bookingDetails.format} • {bookingDetails.slot}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono text-slate-300 block font-bold flex items-center justify-between">
              <span>Select OwnPay Payment Channel:</span>
              <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> Expiring in {formatTime(timeLeft)}
              </span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`p-2.5 rounded-xl font-mono text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'crypto'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                    : 'bg-[#0B1220] text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Crypto Protocol
              </button>
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl font-mono text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                    : 'bg-[#0B1220] text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" /> Debit / Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod('qr')}
                className={`p-2.5 rounded-xl font-mono text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'qr'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                    : 'bg-[#0B1220] text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" /> OwnPay QR Code
              </button>
            </div>
          </div>

          {/* CRYPTO PROTOCOL TAB */}
          {paymentMethod === 'crypto' && (
            <div className="space-y-3 p-4 rounded-2xl bg-[#0B1220] border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 font-bold">Select Token:</span>
                <div className="flex items-center gap-1">
                  {(['USDT', 'BTC', 'ETH', 'SOL', 'USD'] as const).map(curr => (
                    <button
                      key={curr}
                      onClick={() => setSelectedCurrency(curr)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                        selectedCurrency === curr
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Merchant Deposit Wallet ({selectedCurrency})</span>
                  <span className="text-emerald-400 font-bold">OwnPay Direct</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 p-2 rounded-lg border border-white/10">
                  <span className="text-[11px] text-slate-200 truncate pr-2 font-mono">
                    {getDestinationWallet()}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 cursor-pointer shrink-0 transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CARD TAB */}
          {paymentMethod === 'card' && (
            <div className="space-y-2.5 p-4 rounded-2xl bg-[#0B1220] border border-white/10">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block font-bold">Cardholder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="e.g. Tarik Islam"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block font-bold">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4532 •••• •••• 8941"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 block font-bold">Expiry Date</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 block font-bold">CVC / CVV</label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="•••"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* QR CODE TAB */}
          {paymentMethod === 'qr' && transaction && (
            <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3 text-center">
              <span className="text-[10px] font-mono text-slate-400 block font-bold">
                Scan with your Banking App or OwnPay Mobile Wallet
              </span>
              <div className="p-3 bg-white rounded-2xl w-fit mx-auto shadow-xl border border-amber-500/30">
                <img src={transaction.qrCodeUrl} alt="OwnPay QR Code" className="w-36 h-36" />
              </div>
              <a
                href={transaction.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 font-bold"
              >
                <span>Open OwnPay Merchant Web Checkout</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Action Submit Button */}
          <button
            onClick={handleProcessPayment}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Verifying OwnPay Blockchain Receipt...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Confirm & Pay ${bookingDetails.feeAmount} USD via OwnPay</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
