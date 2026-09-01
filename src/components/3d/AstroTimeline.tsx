import React from 'react';
import { Clock } from 'lucide-react';

interface AstroTimelineProps {
  currentDate?: string;
  isTimeLapse?: boolean;
  className?: string;
}

export const AstroTimeline: React.FC<AstroTimelineProps> = ({
  currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  isTimeLapse = false,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070D1A]/85 backdrop-blur-md border border-white/10 text-xs font-mono select-none ${className}`}>
      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <span className="text-slate-200 font-bold">{currentDate}</span>
      {isTimeLapse ? (
        <span className="text-[9.5px] uppercase font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
          TIME-LAPSE REPRESENTATION
        </span>
      ) : (
        <span className="text-[9.5px] uppercase font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
          ASTRONOMICAL REAL-TIME
        </span>
      )}
    </div>
  );
};

export default AstroTimeline;
