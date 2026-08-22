import React from 'react';

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
  colorFrom = '#C9A86A',
  colorTo = '#E5C788',
}: BorderBeamProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-[#C9A86A]/30 shadow-[inset_0_0_12px_rgba(201,168,106,0.12)] transition-all ${className}`}
    />
  );
}
