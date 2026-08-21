import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Users, CreditCard, ShieldCheck, ArrowUpRight, 
  ArrowDownRight, RefreshCw, Download, FileText, CheckCircle2, AlertCircle, 
  Lock, Calendar, Filter, Search, Tag, Eye, RotateCcw, Award 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DIGITAL_REPORTS, ASTRO_CREDIT_PACKS, SUBSCRIPTION_PLANS, VERIFIED_ASTROLOGERS, PROMO_COUPONS } from '../lib/monetizationEngine';

interface AdminFinanceCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminFinanceCenter({ isOpen, onClose }: AdminFinanceCenterProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'astrologers' | 'webhooks' | 'coupons'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [refundModalOrder, setRefundModalOrder] = useState<any | null>(null);
  const [refundSuccess, setRefundSuccess] = useState(false);

  if (!isOpen) return null;

  // Mock Financial Ledger Data
  const sampleOrders = [
    { id: 'ORD_ASTRO_948192', customer: 'Ananya Sharma', product: 'Career, Promotion & Wealth Forecast', amount: 149, gateway: 'Cashfree PG', status: 'PAID', date: '2026-08-21 21:45' },
    { id: 'ORD_ASTRO_817264', customer: 'Rahul Verma', product: 'Astro Pro (Monthly Membership)', amount: 499, gateway: 'Cashfree PG', status: 'PAID', date: '2026-08-21 20:12' },
    { id: 'ORD_ASTRO_726190', customer: 'Vikram Malhotra', product: '1-on-1 Astrologer Consultation (30 Min)', amount: 599, gateway: 'Direct UPI', status: 'PAID', date: '2026-08-21 19:30' },
    { id: 'ORD_ASTRO_625189', customer: 'Pooja Iyer', product: '270 Astro Credits Pack', amount: 199, gateway: 'Cashfree PG', status: 'PAID', date: '2026-08-21 18:05' },
    { id: 'ORD_ASTRO_514098', customer: 'Devendra Patel', product: 'Marriage & Kundli Milan Compatibility', amount: 99, gateway: 'Direct UPI', status: 'PAID', date: '2026-08-21 16:40' },
  ];

  const astrologerPayouts = [
    { id: 'PAY_01', astrologer: 'Pt. Rajesh Shastri', sessions: 24, gross: 14376, platformFee: 3594, netPayout: 10782, status: 'SETTLED' },
    { id: 'PAY_02', astrologer: 'Acharya Sunita Devi', sessions: 19, gross: 11381, platformFee: 2845, netPayout: 8536, status: 'SETTLED' },
    { id: 'PAY_03', astrologer: 'Dr. Arvind Joshi', sessions: 14, gross: 9786, platformFee: 2446, netPayout: 7340, status: 'PENDING' },
    { id: 'PAY_04', astrologer: 'Vidushi Meera Sharma', sessions: 16, gross: 7984, platformFee: 1996, netPayout: 5988, status: 'SETTLED' },
  ];

  const webhookLogs = [
    { id: 'EVT_CF_91823', event: 'PAYMENT_SUCCESS', provider: 'Cashfree PG', signature: 'VALID (SHA-256)', status: 'PROCESSED', time: '2026-08-21 21:45:02' },
    { id: 'EVT_CF_91822', event: 'SUBSCRIPTION_RENEWAL', provider: 'Cashfree PG', signature: 'VALID (SHA-256)', status: 'PROCESSED', time: '2026-08-21 20:12:15' },
    { id: 'EVT_CF_91821', event: 'ORDER_CREATED', provider: 'Cashfree PG', signature: 'VALID (SHA-256)', status: 'PROCESSED', time: '2026-08-21 19:30:40' },
    { id: 'EVT_UPI_8172', event: 'UTR_VERIFIED', provider: 'Direct UPI (NPCI)', signature: 'VERIFIED (UTR)', status: 'PROCESSED', time: '2026-08-21 18:05:11' },
  ];

  const handleProcessRefund = () => {
    setRefundSuccess(true);
    setTimeout(() => {
      setRefundSuccess(false);
      setRefundModalOrder(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-6xl rounded-3xl bg-[#0D1220] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-4 text-slate-100"
      >
        {/* Header Ribbon */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-950/30 via-[#C9A86A]/20 to-[#0D1220] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
                ASTRO360 <span className="text-emerald-400 text-xs uppercase font-mono tracking-wider font-normal">Finance & Reconciliation Center</span>
              </h2>
              <p className="text-xs text-slate-300">
                Real-Time MRR, Gateway Reconciliation, Astrologer Payouts & Webhook Audit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4 sm:px-6 bg-[#070A12] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono">
            {[
              { id: 'overview' as const, label: '📊 Financial KPIs' },
              { id: 'orders' as const, label: '💳 Orders Ledger' },
              { id: 'astrologers' as const, label: '🧘 Astrologer Payouts' },
              { id: 'webhooks' as const, label: '🛡️ Webhook Security' },
              { id: 'coupons' as const, label: '🏷️ Coupons & Offers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
                  activeTab === tab.id
                    ? 'bg-[#C9A86A] text-[#070A12]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Cashfree Gateway: Connected</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[520px] overflow-y-auto custom-scrollbar">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { label: 'Gross Revenue (MTD)', val: '₹2,48,590', change: '+28.4%', isPositive: true, sub: 'All payment rails' },
                  { label: 'Net Platform Profit', val: '₹1,31,219', change: '+31.2%', isPositive: true, sub: 'Post 25% commission' },
                  { label: 'Monthly Recurring (MRR)', val: '₹68,400', change: '+18.7%', isPositive: true, sub: '428 Active Pro Users' },
                  { label: 'Avg Order Value (AOV)', val: '₹312', change: '+8.1%', isPositive: true, sub: '₹299 Median' },
                ].map((kpi, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-1">
                    <span className="text-[10.5px] font-mono text-slate-400 block">{kpi.label}</span>
                    <div className="text-xl font-bold font-serif text-white">{kpi.val}</div>
                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono">
                      <span className={kpi.isPositive ? 'text-emerald-400 flex items-center' : 'text-rose-400 flex items-center'}>
                        {kpi.change}
                      </span>
                      <span className="text-slate-500">{kpi.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Revenue Streams Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <span className="text-xs font-bold text-white font-serif flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" /> Digital PDF Dossiers
                  </span>
                  <div className="text-2xl font-bold font-serif text-[#C9A86A]">₹98,450</div>
                  <p className="text-[11px] text-slate-400">Career & Life Reports constitute 62% of one-time purchases.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <span className="text-xs font-bold text-white font-serif flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" /> Astrologer Consultations
                  </span>
                  <div className="text-2xl font-bold font-serif text-purple-300">₹81,740</div>
                  <p className="text-[11px] text-slate-400">Platform retained ₹20,435 in 25% hosting commissions.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <span className="text-xs font-bold text-white font-serif flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" /> Pro Subscriptions
                  </span>
                  <div className="text-2xl font-bold font-serif text-emerald-400">₹68,400</div>
                  <p className="text-[11px] text-slate-400">Annual retention rate: 94.2% with 2.1% low churn.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS LEDGER */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#070A12] border border-white/[0.08] overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-slate-400 border-b border-white/[0.06] pb-2">
                      <th className="p-2">Order ID</th>
                      <th className="p-2">Customer</th>
                      <th className="p-2">Product</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Gateway</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {sampleOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/[0.02]">
                        <td className="p-2 text-[#C9A86A] font-bold">{ord.id}</td>
                        <td className="p-2 text-white">{ord.customer}</td>
                        <td className="p-2 text-slate-300 truncate max-w-[200px]">{ord.product}</td>
                        <td className="p-2 text-emerald-400 font-bold">₹{ord.amount}</td>
                        <td className="p-2 text-slate-400">{ord.gateway}</td>
                        <td className="p-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px]">
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => setRefundModalOrder(ord)}
                            className="text-slate-400 hover:text-rose-400 underline cursor-pointer text-[10px]"
                          >
                            Refund
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ASTROLOGER PAYOUTS */}
          {activeTab === 'astrologers' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#070A12] border border-white/[0.08] overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-slate-400 border-b border-white/[0.06] pb-2">
                      <th className="p-2">Scholar</th>
                      <th className="p-2">Sessions</th>
                      <th className="p-2">Gross Bookings</th>
                      <th className="p-2">Platform Fee (25%)</th>
                      <th className="p-2">Net Astrologer Payout</th>
                      <th className="p-2">Payout Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {astrologerPayouts.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02]">
                        <td className="p-2 text-white font-bold">{p.astrologer}</td>
                        <td className="p-2 text-slate-300">{p.sessions} Calls</td>
                        <td className="p-2 text-slate-400">₹{p.gross}</td>
                        <td className="p-2 text-[#C9A86A] font-bold">₹{p.platformFee}</td>
                        <td className="p-2 text-emerald-400 font-bold">₹{p.netPayout}</td>
                        <td className="p-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            p.status === 'SETTLED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: WEBHOOK AUDIT LOGS */}
          {activeTab === 'webhooks' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-2 font-mono text-xs">
                {webhookLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">{log.event}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300">{log.id}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{log.provider} • {log.time}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-cyan-400 text-[10px] block">{log.signature}</span>
                      <span className="text-emerald-400 text-[10px] font-bold">✓ {log.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COUPONS & OFFERS */}
          {activeTab === 'coupons' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROMO_COUPONS.map((coupon) => (
                <div key={coupon.code} className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-2 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#C9A86A]">{coupon.code}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <p className="text-xs text-slate-300">{coupon.description}</p>
                  <div className="text-[10px] text-slate-500 pt-2 border-t border-white/[0.04]">
                    Min Order: ₹{coupon.minOrderAmount} INR
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Refund Modal */}
        {refundModalOrder && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="p-6 rounded-3xl bg-[#0D1220] border border-white/[0.1] max-w-sm w-full space-y-4 text-center font-mono">
              <h3 className="text-base font-bold text-white">Process Order Refund</h3>
              <p className="text-xs text-slate-400">
                Refund <strong className="text-white">₹{refundModalOrder.amount}</strong> to <strong className="text-white">{refundModalOrder.customer}</strong>?
              </p>
              {refundSuccess ? (
                <div className="text-emerald-400 text-xs font-bold">✓ Refund Processed Successfully!</div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setRefundModalOrder(null)}
                    className="flex-1 py-2 rounded-xl bg-white/[0.05] text-slate-300 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProcessRefund}
                    className="flex-1 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs cursor-pointer"
                  >
                    Confirm Refund
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
