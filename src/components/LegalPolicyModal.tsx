import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Mail, MapPin, Phone, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type PolicyType = 'privacy' | 'terms' | 'refund' | 'contact' | 'shipping';

interface LegalPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPolicy?: PolicyType;
}

export default function LegalPolicyModal({
  isOpen,
  onClose,
  initialPolicy = 'privacy',
}: LegalPolicyModalProps) {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(initialPolicy);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#0D1220] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden my-4 text-slate-100 flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0D1220] via-purple-950/30 to-[#0D1220] border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
                ASTRO360 <span className="text-[#C9A86A] text-xs uppercase font-mono tracking-wider font-normal">Legal & Policies</span>
              </h2>
              <p className="text-xs text-slate-400">
                Transparent terms, consumer protections, and data privacy policies.
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

        {/* Policy Selector Tabs */}
        <div className="flex gap-1 p-2 bg-[#070A12] border-b border-white/[0.06] overflow-x-auto text-xs shrink-0 no-scrollbar">
          {[
            { id: 'privacy' as PolicyType, label: 'Privacy Policy', icon: Lock },
            { id: 'terms' as PolicyType, label: 'Terms of Service', icon: FileText },
            { id: 'refund' as PolicyType, label: 'Refund & Cancellations', icon: RefreshCw },
            { id: 'shipping' as PolicyType, label: 'Delivery & Shipping', icon: ShieldCheck },
            { id: 'contact' as PolicyType, label: 'Contact Us', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePolicy === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePolicy(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A86A] text-[#070A12] shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Policy Content Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed font-sans custom-scrollbar">
          
          {/* Privacy Policy */}
          {activePolicy === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Privacy Policy</h3>
              <p className="text-slate-400 text-[11px] font-mono">Effective Date: January 1, 2026 • Last Updated: February 2026</p>
              
              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs">1. Information We Collect</h4>
                <p>
                  We collect birth details (Date of Birth, Time of Birth, Place of Birth), name, and email address solely for the purpose of calculating astronomical ephemerides, natal horoscopes, and astrological charts.
                </p>

                <h4 className="font-bold text-white text-xs">2. Zero Data Selling & Encryption</h4>
                <p>
                  We do not sell, rent, or monetize your personal astrological data to any third-party advertisers. All payment transactions are processed securely through PCI-DSS Level 1 compliant Cashfree Payments with 256-bit SSL encryption.
                </p>

                <h4 className="font-bold text-white text-xs">3. Right to Delete (GDPR & DPDP Act 2023)</h4>
                <p>
                  You may request complete permanent deletion of your profile and calculated charts at any time by contacting our data protection officer at <strong className="text-[#C9A86A]">support@astro.tarikislam.in</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Terms of Service */}
          {activePolicy === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Terms of Service</h3>
              <p className="text-slate-400 text-[11px] font-mono">Governed under International Digital Services & Privacy Standards (GDPR, CCPA & Global E-Commerce Frameworks)</p>

              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs">1. Platform Services</h4>
                <p>
                  ASTRO360 provides computational astrological algorithms, divisional & harmonic charts (D1–D60), planetary dasha timelines, and global consultation matching services.
                </p>

                <h4 className="font-bold text-white text-xs">2. Astrological Disclaimer</h4>
                <p>
                  Astrology readings, horoscope calculations, and remedies are offered for self-discovery, spiritual reflection, and educational purposes. They do not substitute professional medical, legal, psychiatric, or financial counsel.
                </p>

                <h4 className="font-bold text-white text-xs">3. Subscriptions & Billing</h4>
                <p>
                  Pro memberships renew at the selected cadence (Monthly $4.99 / Annual $29.99). You can cancel your subscription at any time with one click in your account settings.
                </p>
              </div>
            </div>
          )}

          {/* Refund & Cancellation Policy */}
          {activePolicy === 'refund' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Refund & Cancellation Policy</h3>
              <p className="text-slate-400 text-[11px] font-mono">100% Satisfaction & Protection Commitment</p>

              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs">1. Digital Reports & Dossiers</h4>
                <p>
                  If you encounter any technical discrepancy or calculation error in your purchased Executive PDF Dossier, we provide a free astrological re-audit or full refund within <strong>7 days</strong> of purchase.
                </p>

                <h4 className="font-bold text-white text-xs">2. 1-on-1 Astrologer Consultations</h4>
                <p>
                  Appointments can be rescheduled or cancelled up to 2 hours prior to the scheduled session for a 100% refund or wallet credit.
                </p>

                <h4 className="font-bold text-white text-xs">3. Refund Processing Time</h4>
                <p>
                  Approved refunds are automatically credited back to your original payment source (Card / Digital Wallet / Bank) within <strong>3 to 5 business days</strong> via our secure payment partners.
                </p>
              </div>
            </div>
          )}

          {/* Delivery & Shipping Policy */}
          {activePolicy === 'shipping' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Delivery & Fulfillment Policy</h3>
              <p className="text-slate-400 text-[11px] font-mono">Digital Instant Access & Worldwide Physical Fulfillment</p>

              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs">1. Instant Digital Fulfillment (0-5 Minutes)</h4>
                <p>
                  All digital products (Cosmic Pro membership, 35-page PDF dossiers, compatibility reports, AI Oracle query credits) are unlocked immediately inside your dashboard upon payment verification and emailed to your registered email address.
                </p>

                <h4 className="font-bold text-white text-xs">2. Physical Remedial Goods (Gemstones & Yantras)</h4>
                <p>
                  Physical items undergoing ritual consecration and energization are dispatched within 2 to 3 business days and delivered with international worldwide express shipping (4 to 8 business days) with end-to-end tracking.
                </p>
              </div>
            </div>
          )}

          {/* Contact Us */}
          {activePolicy === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white font-serif">Contact & Merchant Details</h3>
              <p className="text-slate-400 text-[11px] font-mono">Global Celestial Support & Member Services</p>

              <div className="p-4 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C9A86A]" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Official Email</span>
                    <a href="mailto:support@astroverse.global" className="text-white font-bold hover:underline">
                      support@astroverse.global / contact@astro360.space
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Global Support Desk</span>
                    <span className="text-white font-bold font-mono">Available 24/7 via Priority Ticket & Live Chat</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Operating Studio</span>
                    <span className="text-white font-medium">ASTRO360 Global Celestial Studio & International Research Labs</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Close */}
        <div className="p-4 bg-[#070A12] border-t border-white/[0.06] flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-400 font-mono text-[10px]">Merchant AppID: 1003809f7024040e83e725d994c9083001</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#C9A86A] text-[#070A12] font-bold text-xs hover:scale-105 transition-all cursor-pointer"
          >
            Close Policy
          </button>
        </div>
      </motion.div>
    </div>
  );
}
