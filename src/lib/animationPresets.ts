// ASTRO360 Shared Motion & Animation Presets (Instantaneous / Zero-Lag Mode)
import type { Variants } from 'motion/react';

export const SMOOTH_EASE = [0, 0, 1, 1] as const;

export const SPRING_SNAPPY = {
  duration: 0,
};

export const SPRING_BOUNCY = {
  duration: 0,
};

export const fadeInUp: Variants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0, transition: { duration: 0 } },
  exit: { opacity: 1, y: 0, transition: { duration: 0 } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } }
};

export const scaleIn: Variants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0 } },
  exit: { opacity: 1, scale: 1, transition: { duration: 0 } }
};

export const slideInLeft: Variants = {
  initial: { opacity: 1, x: 0 },
  animate: { opacity: 1, x: 0, transition: { duration: 0 } },
  exit: { opacity: 1, x: 0, transition: { duration: 0 } }
};

export const modalTransition: Variants = {
  initial: { opacity: 1, scale: 1, y: 0 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0 } },
  exit: { opacity: 1, scale: 1, y: 0, transition: { duration: 0 } }
};

export const toastTransition: Variants = {
  initial: { opacity: 1, y: 0, scale: 1 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
  exit: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } }
};

export const cardHoverProps = {};

export const buttonPressProps = {};
