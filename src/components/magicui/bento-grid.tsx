import React from 'react';

export interface BentoGridProps {
  children?: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

export interface BentoCardProps {
  name: string;
  className?: string;
  background?: React.ReactNode;
  Icon?: any;
  description: string;
  href?: string;
  cta?: string;
  onClick?: () => void;
}

export function BentoCard({
  name,
  className = '',
  background,
  Icon,
  description,
  cta = 'Explore Tool ↗',
  onClick,
}: BentoCardProps) {
  return (
    <div
      key={name}
      onClick={onClick}
      className={`group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl bg-[#111827] border border-white/10 p-6 shadow-2xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] cursor-pointer ${className}`}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-2 transition-all duration-300 group-hover:-translate-y-2">
        {Icon && <Icon className="h-8 w-8 origin-left transform-gpu text-[#06B6D4] transition-all duration-300 ease-in-out group-hover:scale-110" />}
        <h3 className="text-xl font-semibold text-white tracking-tight pt-2">
          {name}
        </h3>
        <p className="max-w-lg text-xs text-slate-400 font-mono leading-relaxed">{description}</p>
      </div>

      <div className="pointer-events-none z-10 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-mono font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-3 py-1 rounded-full border border-[#06B6D4]/30">
          {cta}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-cyan-500/5" />
    </div>
  );
}
