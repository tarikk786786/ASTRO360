import React from 'react';

/**
 * AstroWebGLFallback — High-Elegance 2D Canvas & CSS Celestial Sphere
 * Activated when WebGL is unsupported, crashed, or prefers-reduced-motion is active.
 * Zero CPU overhead, zero WebGL dependencies.
 */
export const AstroWebGLFallback: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div 
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#020612] via-[#050B19] to-[#020612] ${className}`}
    >
      {/* Subtle Ambient Radial Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(56,189,248,0.08) 50%, transparent 70%)'
        }}
      />

      {/* Decorative SVG Celestial Meridian */}
      <svg 
        viewBox="0 0 800 800" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-15"
      >
        <circle cx="400" cy="400" r="350" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="400" cy="400" r="260" fill="none" stroke="#38BDF8" strokeWidth="0.8" />
        <circle cx="400" cy="400" r="140" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="400" y1="50" x2="400" y2="750" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="50" y1="400" x2="750" y2="400" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

export default AstroWebGLFallback;
