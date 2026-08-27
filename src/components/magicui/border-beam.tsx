import React from 'react';
import { motion } from 'motion/react';

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className = '',
  size = 200,
  duration = 12,
  borderWidth = 1.5,
  colorFrom = '#F59E0B',
  colorTo = '#6366F1',
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          '--size': `${size}px`,
          '--duration': `${duration}s`,
          '--border-width': `${borderWidth}px`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
    >
      <motion.div
        className="absolute aspect-square w-[var(--size)] bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent blur-[1px]"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: '100%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          offsetPath: `rect(0 auto auto 0 round calc(var(--border-width) + 1.5rem))`,
        }}
      />
    </div>
  );
}

export default BorderBeam;
