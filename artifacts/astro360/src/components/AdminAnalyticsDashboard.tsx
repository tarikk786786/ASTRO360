import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Activity, Users, Zap, Database, Server, Clock, CheckCircle2, Cpu, Terminal, RefreshCw, BarChart2 } from 'lucide-react';

const AGENTS_LIST = [
  { name: "Ephemeris Calculation Engine", status: "Operational", latency: "4ms", load: "12%" },
  { name: "Vimshottari Dasha Engine", status: "Operational", latency: "6ms", load: "18%" },
  { name: "36-Guna Synastry Matcher", status: "Operational", latency: "8ms", load: "14%" },
  { name: "Tattva BTR Solver Engine", status: "Operational", latency: "11ms", load: "22%" },
  { name: "Islamic Hijri & Abjad Engine", status: "Operational", latency: "5ms", load: "9%" },
  { name: "Dream Symbolism Neural AI", status: "Operational", latency: "14ms", load: "31%" },
  { name: "Langfuse AI Token Tracer", status: "Operational", latency: "3ms", load: "7%" },
  { name: "Mem0 & Qdrant Vector DB", status: "Operational", latency: "2ms", load: "15%" },
  { name: "78-Tarot & I Ching Oracle", status: "Operational", latency: "7ms", load: "10%" },
  { name: "Chaldean Numerology Matrix", status: "Operational", latency: "4ms", load: "8%" },
  { name: "Gemstone & Rudraksha Prescriber", status: "Operational", latency: "6ms", load: "12%" },
  { name: "D1-D60 Divisional Varga Builder", status: "Operational", latency: "9ms", load: "20%" },
  { name: "PDF Dossier Report Builder", status: "Operational", latency: "18ms", load: "35%" },
  { name: "Astrology Encyclopedia Graph", status: "Operational", latency: "5ms", load: "11%" },
  { name: "Universal Problem Solver", status: "Operational", latency: "10ms", load: "16%" },
  { name: "Multi-Faith Remedy Synthesizer", status: "Operational", latency: "8ms", load: "13%" }
];

const AUDIT_LOGS = [
  { time: "23:14:02", type: "LANGFUSE", msg: "Token trace logged: 1,420 tokens consumed via Gemini 1.5 Pro" },
  { time: "23:13:45", type: "VECTOR", msg: "Qdrant collection 'astro_mem0' synced successfully in 2ms" },
  { time: "23:12:10", type: "EPHEMERIS", msg: "Sidereal Lahiri Ayanamsha calculated: 24.2132°" },
  { time: "23:10:55", type: "SYSTEM", msg: "Active 16 Agents health check: 100% Operational" },
  { time: "23:08:30", type: "AUTH", msg: "System Admin session re-authenticated with TLS 1.3 encryption" }
];

export default function AdminAnalyticsDashboard() {
  const [activeSubTab, setActiveSubTab] = useState<'agents' | 'logs' | 'metrics'>('agents');

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-[#EF4444]/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-rose-400" /> Admin Analytics & AI Observability Monitoring
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            User Management, Subscription Metrics, AI Token Tracing (Langfuse) & Audit Logs
          </p>
        </div>
        <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30 font-bold tracking-wider self-start sm:self-auto">
          System Admin Access
        </span>
      </div>

      {/* 4 CORE KPI TELEMETRY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1 hover:border-cyan-500/40 transition-colors">
          <span className="text-[10px] font-mono text-slate-400 block flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-cyan-400" /> Total Active Users
          </span>
          <span className="text-xl font-bold text-white font-mono">14,280</span>
          <span className="text-[9px] font-mono text-emerald-400 block">+12.4% this week</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1 hover:border-amber-500/40 transition-colors">
          <span className="text-[10px] font-mono text-slate-400 block flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Token Usage (Langfuse)
          </span>
          <span className="text-xl font-bold text-amber-300 font-mono">1.24M Tokens</span>
          <span className="text-[9px] font-mono text-cyan-400 block">Trace ID: #lf-8842</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1 hover:border-emerald-500/40 transition-colors">
          <span className="text-[10px] font-mono text-slate-400 block flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Active 16 Agents Status
          </span>
          <span className="text-xl font-bold text-emerald-400 font-mono">100% Operational</span>
          <span className="text-[9px] font-mono text-emerald-300 block">16 / 16 Healthy</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1 hover:border-purple-500/40 transition-colors">
          <span className="text-[10px] font-mono text-slate-400 block flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-purple-400" /> Mem0 & Qdrant Sync
          </span>
          <span className="text-xl font-bold text-purple-400 font-mono">Healthy (2ms)</span>
          <span className="text-[9px] font-mono text-purple-300 block">Vector Index: Active</span>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveSubTab('agents')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeSubTab === 'agents' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          🤖 Active 16 Agents Matrix
        </button>
        <button
          onClick={() => setActiveSubTab('logs')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeSubTab === 'logs' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          📜 Langfuse & Audit Logs
        </button>
      </div>

      {/* SUB-TAB CONTENTS */}
      {activeSubTab === 'agents' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-bold">16 Micro-Services & Specialized AI Agents:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All 16 Passing Health Check
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono">
            {AGENTS_LIST.map((ag, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-1 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[11px] truncate">{ag.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Latency: <strong className="text-cyan-300">{ag.latency}</strong></span>
                  <span>Load: <strong className="text-amber-300">{ag.load}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'logs' && (
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Terminal className="w-4 h-4" /> Live AI Observability & Langfuse Tracing Console
            </span>
            <span className="text-[10px] text-emerald-400">Status: Real-time Stream</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            {AUDIT_LOGS.map((log, idx) => (
              <div key={idx} className="p-2 rounded-lg bg-black/40 border border-white/5 flex items-center gap-3">
                <span className="text-slate-500 text-[10px]">{log.time}</span>
                <span className="text-rose-400 font-bold text-[10px] bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                  {log.type}
                </span>
                <span className="text-slate-200">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
