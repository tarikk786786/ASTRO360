import React from 'react';
import { 
  ShieldCheck, Lock, Award, Sparkles, CheckCircle2, 
  Cpu, Compass, Database, Globe, Scale, BookOpen 
} from 'lucide-react';
import { motion } from 'motion/react';

const GUARANTEES = [
  {
    icon: Award,
    title: '100% Mathematical Precision Guarantee',
    subtitle: '64-Bit Swiss Ephemeris Standard',
    badge: 'Zero Approximation',
    description: 'Every planetary longitude, house cusp, and dasha fraction is calculated using 64-bit celestial mechanics accurate to arc-seconds. We never invent or approximate celestial coordinates.',
    metrics: 'J2000 Reduction • Lahiri Sidereal • Arc-Second Precision'
  },
  {
    icon: Lock,
    title: '100% Privacy & Data Sovereignty Guarantee',
    subtitle: 'Zero Data Sharing Policy',
    badge: 'Client-Side Encrypted',
    description: 'Your sacred birth date, time, and coordinates are never sold, rented, or used for third-party advertising. All calculations are executed securely with client-side persistence.',
    metrics: 'TLS 1.3 Encryption • No Ad Trackers • Private Session'
  },
  {
    icon: ShieldCheck,
    title: '100% Ethical & Non-Fatalistic Guarantee',
    subtitle: 'Constructive Guidance Standard',
    badge: 'Strict Anti-Fear Policy',
    description: 'We strictly prohibit manipulative or fatalistic fear-based predictions. Every dosha and difficult transit is paired with classical mitigation, practical remedies, and psychological empowerment.',
    metrics: 'No Death Claims • Mitigating Factors • Classical Remedies'
  }
];

const TRUST_PILLARS = [
  {
    icon: Compass,
    title: 'Classical Lineage',
    desc: 'Codified directly from Brihat Parashara Hora Shastra, Jaimini Sutras, Phaladeepika, and Saravali.',
  },
  {
    icon: Cpu,
    title: 'Multi-Methodology Engine',
    desc: 'Seamlessly switch between Vedic Sidereal, KP Sub-Lords, Jaimini, Tajika, and Western Tropical frameworks.',
  },
  {
    icon: Database,
    title: 'Divisional Vargas (D1-D60)',
    desc: 'Full harmonic calculations from D1 Rashi and D9 Navamsha to D10 Dashamsha and D60 Shashtiamsha.',
  },
  {
    icon: Scale,
    title: 'Traceable Rule Evidence',
    desc: 'Every interpretation cites its astronomical placement, house lordships, and traditional Sanskrit root source.',
  }
];

export default function TrustSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-y border-white/[0.06] bg-gradient-to-b from-[#070A12] via-[#090E1A] to-[#070A12] backdrop-blur-2xl text-left">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-[#C9A86A]" />
            <span>The ASTRO360 Triple Guarantee Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Authentic, Rigorous & Guaranteed.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Built for seekers and scholars who demand uncompromising mathematical accuracy, total data privacy, and ethical clarity.
          </p>
        </div>

        {/* 3 Core Gold Guarantees */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {GUARANTEES.map((g, idx) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#0D1220]/80 hover:bg-[#0D1220] border border-[#C9A86A]/30 hover:border-[#C9A86A]/60 transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col justify-between group"
              >
                {/* Background ambient glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#C9A86A]/10 rounded-full blur-2xl group-hover:bg-[#C9A86A]/20 transition-colors pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#C9A86A]/15 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C9A86A]/15 text-[#C9A86A] border border-[#C9A86A]/30">
                      {g.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-serif">
                      {g.title}
                    </h3>
                    <span className="text-xs font-mono text-[#C9A86A] block mt-0.5">
                      {g.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {g.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{g.metrics}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4 Trust & Methodological Pillars */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Why Astrologers & Seekers Trust Us
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="space-y-2 text-left">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#C9A86A]" />
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Telemetry Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-bold text-white font-mono">14,280+</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Charts Calculated Today</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-bold text-[#C9A86A] font-mono">64-Bit</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Swiss Ephemeris Math</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">100%</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">Data Privacy Guarantee</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono">D1–D60</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">All 16 Classical Vargas</div>
          </div>
        </div>

      </div>
    </section>
  );
}

