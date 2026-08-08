// ASTRO360 Shared Motion & Animation Presets
// Standardized high-performance framer-motion variants for hardware-accelerated visual feedback.

import type { Variants } from 'motion/react';

export const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

export const SPRING_SNAPPY = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 26,
  mass: 0.8,
};

export const SPRING_BOUNCY = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 18,
  mass: 0.9,
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: SMOOTH_EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
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
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: SMOOTH_EASE } }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: SMOOTH_EASE } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18, ease: 'easeIn' } }
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: SMOOTH_EASE } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.18, ease: 'easeIn' } }
};

export const modalTransition: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0, transition: SPRING_SNAPPY },
  exit: { opacity: 0, scale: 0.97, y: 4, transition: { duration: 0.15, ease: 'easeIn' } }
};

export const toastTransition: Variants = {
  initial: { opacity: 0, y: -12, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1, transition: SPRING_SNAPPY },
  exit: { opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.15 } }
};

export const cardHoverProps = {
  whileHover: { scale: 1.012, y: -3, transition: { duration: 0.2, ease: SMOOTH_EASE } },
  whileTap: { scale: 0.985 }
};

export const buttonPressProps = {
  whileTap: { scale: 0.96 },
  whileHover: { scale: 1.02, transition: { duration: 0.15, ease: SMOOTH_EASE } }
};
