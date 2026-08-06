import React from 'react';
import { motion } from 'motion/react';

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
}

export function OrbitingCircles({
  className = '',
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-[#06B6D4]/30 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      <motion.div
        animate={{
          rotate: reverse ? [-360, 0] : [0, 360],
        }}
        transition={{
          duration,
          delay: -delay,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
        className={`pointer-events-none absolute inset-0 m-auto flex size-full items-center justify-center rounded-full ${className}`}
      >
        <div className="absolute flex items-center justify-center" style={{ transform: `translateY(-${radius}px)` }}>
          {children}
        </div>
      </motion.div>
    </>
  );
}
