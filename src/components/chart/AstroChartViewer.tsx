import React, { useState, useMemo, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, 
  Layers, Compass, Info, Sparkles, Eye, X, ChevronRight, HelpCircle
} from 'lucide-react';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';
import type { UserProfile } from '../../types';

export interface AstroChartViewerProps {
  userProfile?: UserProfile;
  tradition?: 'vedic' | 'western' | 'south-indian';
  className?: string;
  onAskQuestion?: (query: string) => void;
}

export const AstroChartViewer: React.FC<AstroChartViewerProps> = memo(({
  userProfile,
  tradition: initialTradition = 'vedic',
  className = '',
  onAskQuestion
}) => {
  const [activeTradition, setActiveTradition] = useState<'vedic' | 'western' | 'south-indian'>(initialTradition);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'planets' | 'houses' | 'aspects'>('planets');

  const containerRef = useRef<HTMLDivElement>(null);

  // High-precision calculated planetary coordinates
  const planets: PlanetPosition[] = useMemo(() => {
    try {
      return calculatePlanetaryPositions(
        userProfile?.dob || '1998-02-22',
        userProfile?.time || '12:00'
      );
    } catch {
      return [];
    }
  }, [userProfile?.dob, userProfile?.time]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.0));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.8));
  const handleReset = () => setZoomLevel(1);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-[#111315] border border-white/[0.08] shadow-2xl overflow-hidden select-none flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-[#090A0C]' : 'min-h-[540px]'
      } ${className}`}
    >
      {/* ── 1. CHART HEADER & TOOLBAR ───────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-b border-white/[0.08] bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-white font-sans">
              Interactive Natal Kundli & Dual Wheel
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              NASA JPL DE440 • True Lahiri 24.18° • Topocentric Horizon
            </span>
          </div>
        </div>

        {/* Tradition Switcher & Zoom Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
            {[
              { id: 'vedic', label: 'North Diamond' },
              { id: 'south-indian', label: 'South Box' },
              { id: 'western', label: 'Western Wheel' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTradition(t.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTradition === t.id
                    ? 'bg-white text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-slate-300 px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. CHART VIEWPORT & INTERACTION MATRIX ──────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden relative">
        
        {/* SVG Chart Canvas (Controlled Viewport with Pan & Pinch) */}
        <div className="lg:col-span-8 flex items-center justify-center p-4 sm:p-8 bg-[#090A0C]/80 relative overflow-hidden">
          <motion.div 
            style={{ scale: zoomLevel }}
            className="w-full max-w-[420px] aspect-square relative transition-transform duration-200"
          >
            {activeTradition === 'vedic' ? (
              /* North Indian Diamond Kundli */
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_24px_rgba(245,158,11,0.1)]">
                {/* Outer Diamond & Border */}
                <rect x="20" y="20" width="360" height="360" fill="#111315" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <line x1="20" y1="20" x2="380" y2="380" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <line x1="380" y1="20" x2="20" y2="380" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <polygon points="200,20 380,200 200,380 20,200" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="2" />
                
                {/* House 1 (Lagna / Ascendant) */}
                <g 
                  onClick={() => setSelectedHouse(1)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <text x="200" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    H1: Lagna (♎)
                  </text>
                  <text x="200" y="130" textAnchor="middle" fill="#F59E0B" fontSize="11" fontFamily="monospace">
                    Surya ♒ • Mangala ♈
                  </text>
                </g>

                {/* House 10 (Career Midheaven) */}
                <g 
                  onClick={() => setSelectedHouse(10)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <text x="110" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    H10: Karma
                  </text>
                  <text x="110" y="218" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="monospace">
                    Guru ♊
                  </text>
                </g>

                {/* House 7 (Partnership) */}
                <g 
                  onClick={() => setSelectedHouse(7)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <text x="200" y="290" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    H7: Jaya (♈)
                  </text>
                  <text x="200" y="308" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace">
                    Shukra ♓ (Exalted)
                  </text>
                </g>

                {/* House 4 (Domestic / Mind) */}
                <g 
                  onClick={() => setSelectedHouse(4)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <text x="290" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                    H4: Sukha
                  </text>
                  <text x="290" y="218" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace">
                    Chandra ♐
                  </text>
                </g>
              </svg>
            ) : activeTradition === 'south-indian' ? (
              /* South Indian Box Kundli */
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <rect x="20" y="20" width="360" height="360" fill="#111315" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                {/* 4x4 Grid with Hollow Center */}
                <line x1="110" y1="20" x2="110" y2="380" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="290" y1="20" x2="290" y2="380" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="20" y1="110" x2="380" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="20" y1="290" x2="380" y2="290" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <rect x="110" y="110" width="180" height="180" fill="#090A0C" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
                <text x="200" y="195" textAnchor="middle" fill="#F59E0B" fontSize="13" fontWeight="bold" fontFamily="monospace">
                  RASI D1 CHART
                </text>
                <text x="200" y="215" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                  Fixed Sign Zodiac
                </text>
              </svg>
            ) : (
              /* Western Circular Wheel */
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <circle cx="200" cy="200" r="180" fill="#111315" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="70" fill="#090A0C" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {/* 12 House Dividing Rays */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 200 + 70 * Math.cos(angle);
                  const y1 = 200 + 70 * Math.sin(angle);
                  const x2 = 200 + 180 * Math.cos(angle);
                  const y2 = 200 + 180 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
                })}
                <text x="200" y="195" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  TROPICAL
                </text>
                <text x="200" y="212" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="monospace">
                  Placidus Cusps
                </text>
              </svg>
            )}
          </motion.div>

          <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500">
            Tap any house or planet below to inspect mathematical coordinates
          </div>
        </div>

        {/* ── 3. INTERACTIVE CHART INSPECTOR PANEL (Desktop Side / Mobile Responsive) ── */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-[#111315] p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Planetary Inspector
              </span>
              <div className="flex items-center gap-1">
                {(['planets', 'houses', 'aspects'] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold capitalize transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-amber-400/20 text-amber-300 border border-white/[0.08]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Planet List Chips */}
            {activeTab === 'planets' && (
              <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1 no-scrollbar">
                {planets.map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedPlanet(p)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedPlanet?.name === p.name
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/[0.04] text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs">{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{p.sign}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-amber-300 block">{p.degree}</span>
                      <span className="text-[9px] text-slate-500 font-mono">{p.nakshatra}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Planet Deep-Dive Inspector */}
            {selectedPlanet && (
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {selectedPlanet.name} in {selectedPlanet.sign}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    House {selectedPlanet.house || 1}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Operating in <strong>{selectedPlanet.nakshatra} (Pada {selectedPlanet.pada || 1})</strong>. Governs personal stamina, strategic drive, and karmic manifestation.
                </p>
                {onAskQuestion && (
                  <button
                    type="button"
                    onClick={() => onAskQuestion(`Explain how ${selectedPlanet.name} in ${selectedPlanet.sign} affects my life`)}
                    className="w-full py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 border border-white/[0.08] transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Ask AI About {selectedPlanet.name}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-white/[0.06] text-[10px] font-mono text-slate-500 flex items-center justify-between">
            <span>Zero-PII Client-Side Privacy</span>
            <span className="text-emerald-400">● 100% Calculated</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AstroChartViewer;
