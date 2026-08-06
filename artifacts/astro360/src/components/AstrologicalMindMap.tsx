import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Sparkles, Compass, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

interface MindNode {
  id: string;
  label: string;
  category: 'Planet' | 'Sign' | 'House' | 'Outcome';
  x: number;
  y: number;
  color: string;
  description: string;
}

const NODES: MindNode[] = [
  { id: 'sun', label: 'Sun ☉', category: 'Planet', x: 60, y: 100, color: '#F59E0B', description: 'Lagna Lord in 1st House — Solar vitality, executive focus & self-realization.' },
  { id: 'leo', label: 'Leo ♌', category: 'Sign', x: 200, y: 70, color: '#F59E0B', description: 'Fire Sign of Royal Authority, creativity & leadership.' },
  { id: 'leadership', label: 'Executive Power', category: 'Outcome', x: 340, y: 80, color: '#10B981', description: 'Career recognition, command over teams & organizational authority.' },

  { id: 'moon', label: 'Moon ☽', category: 'Planet', x: 60, y: 220, color: '#06B6D4', description: 'Exalted 10th Lord in Taurus — Emotional resilience & intuitive wealth.' },
  { id: 'taurus', label: 'Taurus ♉', category: 'Sign', x: 200, y: 200, color: '#06B6D4', description: 'Earth Sign of Financial Stability, art & tangible assets.' },
  { id: 'wealth', label: 'Asset Expansion', category: 'Outcome', x: 340, y: 210, color: '#10B981', description: 'Steady wealth accumulation, high public reputation & luxury.' },

  { id: 'mercury', label: 'Mercury ☿', category: 'Planet', x: 60, y: 340, color: '#10B981', description: 'Exalted 2nd/11th Lord in Virgo — Analytical genius & trading speed.' },
  { id: 'virgo', label: 'Virgo ♍', category: 'Sign', x: 200, y: 330, color: '#10B981', description: 'Earth Sign of Precision, data analytics & problem solving.' },
  { id: 'analytics', label: 'Tech & Commerce', category: 'Outcome', x: 340, y: 340, color: '#10B981', description: 'Software engineering, trade success & financial contracts.' },
];

const EDGES = [
  { from: 'sun', to: 'leo' },
  { from: 'leo', to: 'leadership' },
  { from: 'moon', to: 'taurus' },
  { from: 'taurus', to: 'wealth' },
  { from: 'mercury', to: 'virgo' },
  { from: 'virgo', to: 'analytics' }
];

export default function AstrologicalMindMap() {
  const [selectedNode, setSelectedNode] = useState<MindNode | null>(NODES[0]);

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
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
          XYFlow Node Engine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Interactive Node Graph */}
        <div className="lg:col-span-7 relative bg-[#0B1220] rounded-2xl border border-white/10 p-4">
          <svg viewBox="0 0 440 420" className="w-full h-72 sm:h-80">
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Edges */}
            {EDGES.map((edge, i) => {
              const source = NODES.find(n => n.id === edge.from)!;
              const target = NODES.find(n => n.id === edge.to)!;
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
            {NODES.map((node) => {
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(node)}
                >
                  <circle
                    r={isSelected ? 22 : 18}
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
                  {selectedNode.category} Node
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedNode.description}
              </p>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300 space-y-1">
                <span className="font-bold block">Optimized Action Step:</span>
                <p className="text-slate-300 text-[10px]">
                  Focus key energy during corresponding planetary Horas to maximize outcome.
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
