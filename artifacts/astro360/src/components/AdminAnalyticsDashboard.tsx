import React from 'react';
import { motion } from 'motion/react';
import { Shield, Activity, Users, Zap, Database, Server, Clock } from 'lucide-react';

export default function AdminAnalyticsDashboard() {
  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-rose-400" /> Admin Analytics & AI Observability Monitoring
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            User Management, Subscription Metrics, AI Token Tracing (Langfuse) & Audit Logs
          </p>
        </div>
        <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30 font-bold">
          System Admin Access
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 block">Total Active Users</span>
          <span className="text-lg font-bold text-white font-mono">14,280</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 block">AI Token Usage (Langfuse)</span>
          <span className="text-lg font-bold text-cyan-400 font-mono">1.24M Tokens</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 block">Active 16 Agents Status</span>
          <span className="text-lg font-bold text-emerald-400 font-mono">100% Operational</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 block">Mem0 & Qdrant Sync</span>
          <span className="text-lg font-bold text-purple-400 font-mono">Healthy (2ms)</span>
        </div>
      </div>
    </div>
  );
}
