import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Sparkles, Compass, Zap, ShieldCheck, ChevronRight, Filter } from 'lucide-react';

interface MindNode {
  id: string;
  label: string;
  category: 'Planet' | 'Sign' | 'House' | 'Outcome';
  chain: 'Career' | 'Wealth' | 'Love' | 'Wisdom';
  x: number;
  y: number;
  color: string;
  description: string;
  remedy: string;
}

const NODES: MindNode[] = [
  // Chain 1: Career & Power (Sun ➔ Leo ➔ 10th House ➔ Executive Power)
  { id: 'sun', label: 'Sun ☉', category: 'Planet', chain: 'Career', x: 50, y: 70, color: '#F59E0B', description: 'Lagna / 10th Lord Solar vitality, executive focus & self-realization.', remedy: 'Recite Aditya Hrudayam Stotram during sunrise.' },
  { id: 'leo', label: 'Leo ♌', category: 'Sign', chain: 'Career', x: 160, y: 50, color: '#F59E0B', description: 'Fire Sign of Royal Authority, creativity & leadership.', remedy: 'Wear copper or ruby gemstones.' },
  { id: 'h10', label: '10th House', category: 'House', chain: 'Career', x: 270, y: 70, color: '#F59E0B', description: 'Karma Bhava of Public Reputation, authority & executive achievements.', remedy: 'Execute key decisions during solar hours.' },
  { id: 'leadership', label: 'Executive Power', category: 'Outcome', chain: 'Career', x: 380, y: 60, color: '#10B981', description: 'Career recognition, command over teams & organizational authority.', remedy: 'Lead strategic initiatives with high integrity.' },

  // Chain 2: Wealth & Assets (Moon ➔ Taurus ➔ 2nd/11th House ➔ Asset Expansion)
  { id: 'moon', label: 'Moon ☽', category: 'Planet', chain: 'Wealth', x: 50, y: 170, color: '#06B6D4', description: 'Exalted 10th Lord in Taurus — Emotional resilience & intuitive wealth.', remedy: 'Chant Om Som Somaya Namah on Mondays.' },
  { id: 'taurus', label: 'Taurus ♉', category: 'Sign', chain: 'Wealth', x: 160, y: 150, color: '#06B6D4', description: 'Earth Sign of Financial Stability, art & tangible assets.', remedy: 'Maintain financial prudence & silver accents.' },
  { id: 'h2', label: '2nd House', category: 'House', chain: 'Wealth', x: 270, y: 170, color: '#06B6D4', description: 'Dhana Bhava of Accumulated Wealth, liquid assets & speech.', remedy: 'Recite Sri Suktam for asset stability.' },
  { id: 'wealth', label: 'Asset Expansion', category: 'Outcome', chain: 'Wealth', x: 380, y: 160, color: '#10B981', description: 'Steady wealth accumulation, high public reputation & luxury.', remedy: 'Invest in real estate & precious metals.' },

  // Chain 3: Tech Commerce (Mercury ➔ Virgo ➔ 11th House ➔ Tech & Commerce)
  { id: 'mercury', label: 'Mercury ☿', category: 'Planet', chain: 'Wealth', x: 50, y: 270, color: '#10B981', description: 'Exalted 2nd/11th Lord in Virgo — Analytical genius & trading speed.', remedy: 'Donate green mung beans on Wednesdays.' },
  { id: 'virgo', label: 'Virgo ♍', category: 'Sign', chain: 'Wealth', x: 160, y: 250, color: '#10B981', description: 'Earth Sign of Precision, data analytics & problem solving.', remedy: 'Keep green plants in workspace.' },
  { id: 'h11', label: '11th House', category: 'House', chain: 'Wealth', x: 270, y: 270, color: '#10B981', description: 'Laabha Bhava of Gains, global networks & enterprise scale.', remedy: 'Network with industry leaders.' },
  { id: 'analytics', label: 'Tech Commerce', category: 'Outcome', chain: 'Wealth', x: 380, y: 260, color: '#10B981', description: 'Software engineering, trade success & financial contracts.', remedy: 'Automate business workflows.' },

  // Chain 4: Love & Harmony (Venus ➔ Libra ➔ 7th House ➔ Marriage Harmony)
  { id: 'venus', label: 'Venus ♀', category: 'Planet', chain: 'Love', x: 50, y: 370, color: '#EC4899', description: 'Malavya Yoga Venus in Libra — Relationship elegance & aesthetic creation.', remedy: 'Wear white silk or silver rings.' },
  { id: 'libra', label: 'Libra ♎', category: 'Sign', chain: 'Love', x: 160, y: 350, color: '#EC4899', description: 'Air Sign of Harmony, balance, justice & legal contracts.', remedy: 'Practice active listening & win-win terms.' },
  { id: 'h7', label: '7th House', category: 'House', chain: 'Love', x: 270, y: 370, color: '#EC4899', description: 'Kalatra Bhava of Marriage, business partnerships & alliances.', remedy: 'Perform annual Gauri Puja.' },
  { id: 'marriage', label: 'Marriage Harmony', category: 'Outcome', chain: 'Love', x: 380, y: 360, color: '#10B981', description: 'Deep marital affection, mutual trust & financial co-growth.', remedy: 'Schedule weekly quality time.' }
];

const EDGES = [
  { from: 'sun', to: 'leo' }, { from: 'leo', to: 'h10' }, { from: 'h10', to: 'leadership' },
  { from: 'moon', to: 'taurus' }, { from: 'taurus', to: 'h2' }, { from: 'h2', to: 'wealth' },
  { from: 'mercury', to: 'virgo' }, { from: 'virgo', to: 'h11' }, { from: 'h11', to: 'analytics' },
  { from: 'venus', to: 'libra' }, { from: 'libra', to: 'h7' }, { from: 'h7', to: 'marriage' }
];

export default function AstrologicalMindMap() {
  const [selectedChain, setSelectedChain] = useState<'All' | 'Career' | 'Wealth' | 'Love'>('All');
  const [selectedNode, setSelectedNode] = useState<MindNode | null>(NODES[0]);

  const filteredNodes = useMemo(() => {
    if (selectedChain === 'All') return NODES;
    return NODES.filter(n => n.chain === selectedChain);
  }, [selectedChain]);

  const filteredEdges = useMemo(() => {
    const validIds = new Set(filteredNodes.map(n => n.id));
    return EDGES.filter(e => validIds.has(e.from) && validIds.has(e.to));
  }, [filteredNodes]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-400" /> Astrological Mind Map Node Graph
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Interactive Causality Graph: Planets ➔ Signs ➔ Houses ➔ Life Outcomes
          </p>
        </div>

        {/* Chain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {['All', 'Career', 'Wealth', 'Love'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedChain(c as any)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedChain === c
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Interactive Node Graph */}
        <div className="lg:col-span-7 relative bg-[#0B1220] rounded-2xl border border-white/10 p-4">
          <svg viewBox="0 0 450 430" className="w-full h-80 sm:h-96">
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Edges */}
            {filteredEdges.map((edge, i) => {
              const source = NODES.find(n => n.id === edge.from)!;
              const target = NODES.find(n => n.id === edge.to)!;
              if (!source || !target) return null;

              return (
                <line
                  key={i}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="url(#edgeGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              );
            })}

            {/* Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(node)}
                >
                  <circle
                    r={isSelected ? 22 : 17}
                    fill="#111827"
                    stroke={node.color}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300"
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#FFFFFF"
                    fontFamily="monospace"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Details */}
        <div className="lg:col-span-5 space-y-3 text-xs">
          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-[#0B1220] border border-emerald-500/40 space-y-2.5 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono font-bold text-sm text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> {selectedNode.label}
                </span>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {selectedNode.category} Node ({selectedNode.chain})
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedNode.description}
              </p>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300 space-y-1">
                <span className="font-bold block">Optimized Remedy & Action Step:</span>
                <p className="text-slate-300 text-[10px] leading-relaxed">
                  {selectedNode.remedy}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 text-slate-400 text-center font-mono">
              Click any node in the graph to inspect astrological causality.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
