/**
 * ASTRO360 — Shared Animation Hooks
 * Reusable motion primitives for scroll-reveal, parallax, magnetic hover,
 * count-up, and ambient cursor glow effects.
 */

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// ─── useScrollReveal ──────────────────────────────────────────────
// Intersection Observer-based reveal with stagger support
export function useScrollReveal(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionOk) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options?.once !== false) observer.unobserve(el);
        } else if (options?.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return { ref, isVisible };
}

// ─── useStaggerChildren ───────────────────────────────────────────
// Returns style objects for staggered child reveals
export function useStaggerChildren(count: number, baseDelay = 0.06) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        animationDelay: `${i * baseDelay}s`,
        animationFillMode: 'both' as const,
      })),
    [count, baseDelay]
  );
}

// ─── useParallax ──────────────────────────────────────────────────
// Scroll-linked parallax displacement
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionOk) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = ref.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
            setOffset((progress - 0.5) * speed * 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, style: { transform: `translateY(${offset}px)` } };
}

// ─── useMagneticHover ─────────────────────────────────────────────
// Cursor-magnetic button effect (subtle pull toward cursor)
export function useMagneticHover(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate(0px, 0px)');

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTransform(`translate(${x * strength}px, ${y * strength}px)`);
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('translate(0px, 0px)');
  }, []);

  return {
    ref,
    style: { transform, transition: 'transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)' },
    handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave },
  };
}

// ─── useCountUp ───────────────────────────────────────────────────
// Animated number counter that triggers on visibility
export function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });

  useEffect(() => {
    if (!isVisible || hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, hasStarted, target, duration]);

  return { ref, count };
}

// ─── useMouseGlow ─────────────────────────────────────────────────
// Ambient cursor glow follower via CSS custom properties
export function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionOk) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - 200;
      const y = e.clientY - rect.top - 200;
      el.style.setProperty('--glow-x', `${x}px`);
      el.style.setProperty('--glow-y', `${y}px`);
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  return { ref };
}

// ─── useTypewriter ────────────────────────────────────────────────
// Character-by-character text reveal
export function useTypewriter(text: string, speed = 50, startDelay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsDone(false);

    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionOk) {
      setDisplayed(text);
      setIsDone(true);
      return;
    }

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, isDone };
}

// ─── use3DTilt ────────────────────────────────────────────────────
// CSS 3D card tilt on mouse hover
export function use3DTilt(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  }, []);

  return {
    ref,
    handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave },
  };
}
