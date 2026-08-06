import React from 'react';
import { motion } from 'motion/react';

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
  delay = 40,
  animationFrom = { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  easing = 'easeOutCubic',
  textAlign = 'left',
}: SplitTextProps) {
  const words = text.split(' ');

  return (
    <div
      className={`inline-block font-sans ${className}`}
      style={{ textAlign }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + charIndex;

            return (
              <motion.span
                key={charIndex}
                initial={animationFrom}
                animate={animationTo}
                transition={{
                  duration: 0.5,
                  delay: (index * delay) / 1000,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
