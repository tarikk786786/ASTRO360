import React from 'react';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  onLetterAnimationComplete?: () => void;
}

export function SplitText({
  text,
  className = '',
  textAlign = 'left',
}: SplitTextProps) {
  return (
    <span
      className={`inline-block ${className}`}
      style={{ textAlign }}
    >
      {text}
    </span>
  );
}
