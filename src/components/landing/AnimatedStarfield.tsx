/**
 * ASTRO360 — Animated Cosmic Starfield
 * Lightweight canvas-based starfield with twinkling stars, shooting streaks,
 * and scroll-responsive parallax. Zero dependencies beyond React.
 */

import React, { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  layer: number; // 0=far, 1=mid, 2=near (parallax multiplier)
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
}

const STAR_COUNT = 220;
const SHOOTING_INTERVAL_MIN = 6000;
const SHOOTING_INTERVAL_MAX = 14000;

export default function AnimatedStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const scrollRef = useRef(0);
  const frameRef = useRef(0);
  const shootingTimerRef = useRef(0);

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.7 ? 1 : 2;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: layer === 2 ? 1.2 + Math.random() * 0.8 : 0.4 + Math.random() * 0.8,
        baseOpacity: 0.15 + Math.random() * 0.5,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2,
        layer,
      });
    }
    starsRef.current = stars;
  }, []);

  const spawnShootingStar = useCallback((width: number, height: number) => {
    const angle = (Math.PI / 6) + Math.random() * (Math.PI / 4); // 30-75 degrees
    const speed = 3 + Math.random() * 4;
    shootingRef.current.push({
      x: Math.random() * width * 0.8,
      y: Math.random() * height * 0.3,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 40 + Math.random() * 30,
      length: 40 + Math.random() * 60,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initStars(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (!motionOk) {
      // Static render for reduced motion
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.baseOpacity})`;
        ctx.fill();
      });
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    let running = true;
    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    // Shooting star spawn timer
    const scheduleShootingStar = () => {
      const delay = SHOOTING_INTERVAL_MIN + Math.random() * (SHOOTING_INTERVAL_MAX - SHOOTING_INTERVAL_MIN);
      shootingTimerRef.current = window.setTimeout(() => {
        spawnShootingStar(w(), h());
        if (running) scheduleShootingStar();
      }, delay);
    };
    scheduleShootingStar();

    const render = (time: number) => {
      if (!running) return;

      ctx.clearRect(0, 0, w(), h());
      const scroll = scrollRef.current;
      const t = time * 0.001;

      // Draw stars with crisp twinkling & parallax
      starsRef.current.forEach((star) => {
        const parallaxY = scroll * (star.layer === 0 ? 0.02 : star.layer === 1 ? 0.05 : 0.1);
        const drawY = (star.y + parallaxY) % h();
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const opacity = Math.max(0.1, Math.min(0.9, star.baseOpacity + twinkle * 0.3));

        ctx.beginPath();
        ctx.arc(star.x, drawY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Subtle warm glow only for the nearest bright stars
        if (star.layer === 2 && opacity > 0.65) {
          ctx.beginPath();
          ctx.arc(star.x, drawY, star.radius * 2.5, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(star.x, drawY, 0, star.x, drawY, star.radius * 2.5);
          glow.addColorStop(0, `rgba(251, 191, 36, ${opacity * 0.25})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      // Draw shooting stars
      shootingRef.current = shootingRef.current.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const progress = s.life / s.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : 1 - (progress - 0.1) / 0.9;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * (s.length / 6), s.y - s.vy * (s.length / 6));
        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - s.vx * (s.length / 6), s.y - s.vy * (s.length / 6)
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        return s.life < s.maxLife;
      });

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      clearTimeout(shootingTimerRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initStars, spawnShootingStar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: 0.85 }}
    />
  );
}
