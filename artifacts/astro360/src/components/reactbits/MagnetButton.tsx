import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export interface MagnetButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  children: React.ReactNode;
  className?: string;
  magnetStrength?: number;
}

export function MagnetButton({
  children,
  className = '',
  magnetStrength = 0.35,
  ...props
}: MagnetButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * magnetStrength;
    const distanceY = (e.clientY - centerY) * magnetStrength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.1 }}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
