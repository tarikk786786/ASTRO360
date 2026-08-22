import React from 'react';

export interface MagnetButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  magnetStrength?: number;
}

export function MagnetButton({
  children,
  className = '',
  ...props
}: MagnetButtonProps) {
  return (
    <div
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
