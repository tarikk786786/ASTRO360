import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Sparkles, CheckCircle2, ShieldCheck, Activity, Layers, Terminal, BookOpen, Send, RefreshCw, ChevronDown, ChevronUp, Bot, Brain } from 'lucide-react';
import { astroBrain, BrainExecutionResult } from '../lib/astroCoreBrain';

export default function AstroCoreBrainConsole() {
  const [prompt, setPrompt] = useState<string>('Analyze my natal birth chart with Nakshatra alignment, NASA solar telemetry & Quranic astronomy references');
  const [selectedSystem, setSelectedSystem] = useState<'universal' | 'vedic' | 'western' | 'islamic'>('universal');
  const [result, setResult] = useState<BrainExecutionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showPromptDoc, setShowPromptDoc] = useState<boolean>(false);

  const runPipeline = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const res = astroBrain.executePipeline(prompt, selectedSystem);
      setResult(res);
      setIsProcessing(false);
    }, 600);
  };

  React.useEffect(() => {
    runPipeline();
  }, []);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl space-y-8 text-left">
      {/* HEADER & MULTI-AGENT ARCHITECTURE BADGE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4 text-purple-400" />
            ASTRO360 Intelligent Multi-Agent Operating System
          </div>
          <h3 className="text-2xl font-bold font-display text-white">ASTRO360 Core Brain Console</h3>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400" /> Multi-Agent Orchestrator
          </span>

          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
          >
            <option value="universal">Universal Mode</option>
            <option value="vedic">Vedic Mode</option>
            <option value="western">Western Mode</option>
            <option value="islamic">Islamic Mode</option>
          </select>
        </div>
      </div>

      {/* INPUT PROMPT CONSOLE */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>Enter Multi-Agent Task Directive:</span>
          <button
            onClick={() => setShowPromptDoc(!showPromptDoc)}
            className="text-purple-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {showPromptDoc ? 'Hide Master Brain System Prompt' : 'View Master Brain System Prompt'}
          </button>
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runPipeline()}
            placeholder="Ask Core Brain to coordinate astrology agents..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-purple-500 placeholder:text-slate-600"
          />
          <button
            onClick={runPipeline}
            disabled={isProcessing}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{isProcessing ? 'Thinking...' : 'Execute Brain'}</span>
          </button>
        </div>
      </div>

      {/* MASTER BRAIN SYSTEM PROMPT ACCORDION */}
      <AnimatePresence>
        {showPromptDoc && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 text-xs font-mono text-slate-300 space-y-3 max-h-80 overflow-y-auto custom-scrollbar"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-purple-400 font-bold">
              <span>ASTRO360 MASTER CORE BRAIN SPECIFICATION</span>
              <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded">SYSTEM PROMPT</span>
            </div>
            <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-300 font-mono">
{`You are ASTRO360 CORE BRAIN.
You are NOT a chatbot.
You are the intelligent operating system of the ASTRO360 platform.

CORE MODULES:
Planner | Reasoning Engine | Memory Engine | Knowledge Engine | Workflow Engine | Calculation Engine | Validation Engine | Reflection Engine | Reporting Engine

SPECIALIZED AGENTS:
Planner Agent | Birth Chart Agent | Planet Agent | House Agent | Nakshatra Agent | Yoga Agent | Dosha Agent | Dasha Agent | Transit Agent | Dream Agent | Islamic Knowledge Agent | Learning Agent | Research Agent | SEO Agent | Report Agent | UI Agent | Notification Agent`}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BRAIN EXECUTION PIPELINE RESULTS */}
      {result && (
        <div className="space-y-6">
          {/* TOP METRICS BAR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Active Agents</span>
                <span className="text-sm font-bold font-mono text-purple-300">{result.plan.assignedAgents.length} Agents Coordinated</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Calculation Integrity</span>
                <span className="text-sm font-bold font-mono text-emerald-300">
                  {result.validationPassed ? '100% Validated' : 'Check Required'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Reflection Quality Score</span>
                <span className="text-sm font-bold font-mono text-amber-300">{result.reflectionScore}/100 Grade</span>
              </div>
            </div>
          </div>

          {/* ACTIVE SPECIALIZED AGENTS PIPELINE GRID */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" /> Active Specialized AI Agents
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {result.plan.tasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-slate-900/90 border border-purple-500/20 flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-purple-300">{t.agentName}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded w-fit">
                    {t.durationMs}ms
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SYNTHESIZED EXECUTIVE REPORT */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                {result.finalReport.title}
              </h4>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/30">
                Core Brain Output
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono italic">{result.finalReport.summary}</p>

            <div className="space-y-3 pt-2">
              {result.finalReport.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <h5 className="text-xs font-bold text-emerald-300 font-mono">{sec.heading}</h5>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">{sec.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
