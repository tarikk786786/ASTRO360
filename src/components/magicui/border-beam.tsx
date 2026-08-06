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
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = '#06B6D4',
  colorTo = '#3B82F6',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={{
        '--size': size,
        '--duration': duration,
        '--anchor': anchor,
        '--border-width': borderWidth,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--delay': delay,
      } as React.CSSProperties}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] overflow-hidden ${className}`}
    >
      <motion.div
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay,
        }}
        style={{
          offsetPath: 'rect(0 auto auto 0 round calc(var(--border-width) * 1px))',
        }}
        className="absolute aspect-square w-[calc(var(--size)*1px)] rounded-full bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent opacity-80 filter blur-[2px]"
      />
    </div>
  );
}
