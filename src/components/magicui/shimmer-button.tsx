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
  background = 'rgba(17, 24, 39, 0.9)',
  className = '',
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={`group relative flex cursor-pointer items-center justify-center font-mono whitespace-nowrap px-5 py-2.5 text-white bg-[#0D1220] border border-[#C9A86A]/40 rounded-2xl shadow-md ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2 font-bold text-xs">
        {children}
      </div>
    </button>
  );
}
