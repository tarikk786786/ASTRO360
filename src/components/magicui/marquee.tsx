import React from 'react';

export interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className = '',
  children,
}: MarqueeProps) {
  return (
    <div
      className={`flex overflow-x-auto custom-scrollbar p-2 gap-4 items-center ${className}`}
    >
      <div className="flex shrink-0 gap-4 items-center">
        {children}
      </div>
    </div>
  );
}
