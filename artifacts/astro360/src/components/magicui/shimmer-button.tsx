import React from 'react';

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = '#06B6D4',
  shimmerSize = '0.05em',
  shimmerDuration = '3s',
  borderRadius = '1rem',
  background = 'rgba(17, 24, 39, 0.9)',
  className = '',
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={{
        '--spread': '90deg',
        '--shimmer-color': shimmerColor,
        '--radius': borderRadius,
        '--speed': shimmerDuration,
        '--cut': shimmerSize,
        '--bg': background,
      } as React.CSSProperties}
      className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden font-mono whitespace-nowrap px-5 py-2.5 text-white border border-white/10 [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${className}`}
      {...props}
    >
      {/* Sparkle Glow Layer */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#06B6D4]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Shimmer Ring Effect */}
      <div className="absolute inset-0 -z-10 [border-radius:var(--radius)] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]">
        <div className="absolute inset-0 animate-[spin_var(--speed)_linear_infinite] bg-[conic-gradient(from_calc(270deg-(var(--spread)/2)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
      </div>

      <div className="flex items-center gap-2 z-10 font-bold text-xs">
        {children}
      </div>
    </button>
  );
}
