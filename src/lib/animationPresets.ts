// ASTRO360 Shared Motion & Animation Presets
// Standardized high-performance framer-motion variants for hardware-accelerated visual feedback.

import type { Variants } from 'motion/react';

const SMOOTH_EASE = [0.16, 1, 0.3, 1];

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
      staggerChildren: 0.03,
      delayChildren: 0.01
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

export const cardHoverProps = {
  whileHover: { scale: 1.015, y: -2, transition: { duration: 0.2, ease: SMOOTH_EASE } },
  whileTap: { scale: 0.985 }
};

export const buttonPressProps = {
  whileTap: { scale: 0.96 },
  whileHover: { scale: 1.02, transition: { duration: 0.15, ease: SMOOTH_EASE } }
};
