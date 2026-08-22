import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Star, Sparkles, MessageCircle, FileText, Compass, Globe2 } from 'lucide-react';
import type { CategoryInfo } from '../types';

interface TraditionViewProps {
  tradition?: CategoryInfo;
  category?: CategoryInfo;
  onNavigate?: (tab: string) => void;
  userProfile?: any;
  onUpdateProfile?: (profile: any) => void;
}

export default function TraditionView({
  tradition: traditionProp,
  category: categoryProp,
  onNavigate,
}: TraditionViewProps) {
  const tradition = traditionProp || categoryProp || {
    id: 'vedic',
    name: 'Vedic Jyotish',
    group: 'Asian & Eastern',
    description: 'Ancient Indian system of astrology focusing on karma, nakshatras, and planetary dashas.',
    systems: ['D1-D60 Vargas', 'Vimshottari Dasha', 'Ashta Koota', 'Yogas & Remedies'],
  };

  const [generatedReport, setGeneratedReport] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const getConcepts = (group?: string) => {
    switch (group) {
      case 'Asian & Eastern': return ['Karma & Rebirth', 'Elemental Balance', 'Cyclical Time'];
      case 'Western & European': return ['Planetary Influence', 'House System', 'Aspect Geometry'];
      case 'Middle Eastern & African': return ['Divine Order', 'Sacred Geometry', 'Celestial Omens'];
      case 'Americas & Oceanic': return ['Calendar Cycles', 'Nature Spirits', 'Sacred Directions'];
      case 'Divination & Reading': return ['Symbolic Language', 'Pattern Recognition', 'Intuitive Flow'];
      case 'Spiritual & Astronomy': return ['Energy Fields', 'Consciousness', 'Universal Connection'];
      default: return ['Cosmic Alignment', 'Symbolic Archetypes', 'Energy Flow'];
    }
  };

  const traditionGroup = tradition?.group || 'Universal Astronomy';
  const traditionName = tradition?.name || 'Cosmic Tradition';
  const concepts = getConcepts(traditionGroup);

  const handleGenerateReport = () => {
    setGeneratedReport(`## Personalized ${traditionName} Report\n\n**Cosmic Group:** ${traditionGroup}\n\n### 1. Planetary & Archetypal Alignments\nYour birth signature resonates with the foundational tenets of ${traditionName}. Key planetary dynamics indicate high intuitive clarity and strong structural focus.\n\n### 2. Core Philosophy & Growth Guidance\n- **Primary Focus:** Harmonizing ${concepts[0]} with daily routine.\n- **Growth Axis:** Cultivating ${concepts[1]} to unlock long-term abundance.\n- **Spiritual Alignment:** Grounding in ${concepts[2]}.\n\n### 3. Practical Remedy & Action Plan\nFocus 20 minutes daily on quiet reflection, align major decisions with morning power hours, and practice conscious gratitude.`);
    setIsGenerating(false);
  };

  const handleAction = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto p-6 space-y-12"
    >
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-purple-500/30 text-purple-300 text-sm font-medium"
        >
          <Globe2 className="w-4 h-4" />
          {traditionGroup}
        </motion.div>
        
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text tracking-tight">
          {traditionName}
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
          {tradition.description || `Explore the ancient wisdom and cosmic insights of ${tradition.name}, uncovering paths guided by the stars.`}
        </p>
      </div>

      {/* Systems Grid */}
      {tradition.systems && tradition.systems.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Compass className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-display font-semibold text-white">Prominent Systems & Sub-Options</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradition.systems.map((systemName, idx) => (
              <motion.div
                key={systemName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  if (tradition.id === 'arabic') handleAction('islamic-astrology');
                  else if (tradition.id === 'vedic') handleAction('birth-chart');
                  else handleAction('master-chart');
                }}
                className="glass-card-hover p-6 rounded-2xl group border border-white/10 hover:border-purple-500/30 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{systemName}</h3>
                    <p className="text-xs text-white/50 mt-1">
                      Click to launch specialized {systemName} calculation tool
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Key Concepts */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <BookOpen className="w-6 h-6 text-pink-400" />
          <h2 className="text-2xl font-display font-semibold text-white">Core Philosophy</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((concept, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center space-y-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-purple-300">
                <span className="font-display font-bold text-lg">{idx + 1}</span>
              </div>
              <h4 className="font-medium text-white text-lg">{concept}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Report Display */}
      {generatedReport && (
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl border border-amber-500/30 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-2xl font-display font-bold text-amber-300">Personalized {tradition.name} Reading</h3>
            <button 
              onClick={() => setGeneratedReport(null)}
              className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-slate-800"
            >
              Close Report
            </button>
          </div>
          <div className="prose prose-invert max-w-none text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {generatedReport}
          </div>
        </motion.div>
      )}

      {/* AI CTA Card */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="relative rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shimmer"
      >
        <div className="relative bg-zinc-950 rounded-[23px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="space-y-4 z-10">
            <h3 className="font-display text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
              <Sparkles className="text-purple-400" />
              Generate a {tradition.name} Report
            </h3>
            <p className="text-white/60 max-w-xl text-lg">
              Unlock profound insights. Explore traditional calculations and personalized astrological readings derived from {tradition.name}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full md:w-auto">
            <button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              <FileText className="w-5 h-5" />
              {isGenerating ? 'Generating Reading...' : 'Generate Full Report'}
            </button>
            <button 
              onClick={() => handleAction('chat')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl glass-card border border-white/20 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              Ask Astrologer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
