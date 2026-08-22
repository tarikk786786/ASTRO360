// ASTRO360 Premium Motion & Animation Presets (Super Smooth 60fps GPU Mode)
import type { Variants } from 'motion/react';

export const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

export const SPRING_SNAPPY = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 28,
  mass: 0.8,
};

export const SPRING_BOUNCY = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 18,
  mass: 0.9,
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: SMOOTH_EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: SMOOTH_EASE } }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: SMOOTH_EASE } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18, ease: 'easeIn' } }
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.26, ease: SMOOTH_EASE } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.18, ease: 'easeIn' } }
};

export const modalTransition: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: SPRING_SNAPPY },
  exit: { opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.16, ease: 'easeIn' } }
};

export const toastTransition: Variants = {
  initial: { opacity: 0, y: -12, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1, transition: SPRING_SNAPPY },
  exit: { opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.15 } }
};

export const cardHoverProps = {
  whileHover: { scale: 1.015, y: -3, transition: { duration: 0.2, ease: SMOOTH_EASE } },
  whileTap: { scale: 0.985 }
};

export const buttonPressProps = {
  whileHover: { scale: 1.03, transition: { duration: 0.16, ease: SMOOTH_EASE } },
  whileTap: { scale: 0.96 }
};
