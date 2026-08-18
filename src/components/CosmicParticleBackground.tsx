import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export default function CosmicParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 160 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 160 Star Particles with varying twinkle phases
    const particles = Array.from({ length: 160 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.2,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.008,
      twinklePhase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      color: ['#ffffff', '#67E8F9', '#93C5FD', '#FDE047', '#D8B4FE', '#F472B6'][
        Math.floor(Math.random() * 6)
      ],
    }));

    // Shooting stars pool
    const shootingStars: ShootingStar[] = [];
    const createShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() < 0.025) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 12 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 degrees diagonal
          opacity: 1,
          active: true,
        });
      }
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Render Twinkling Stars
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Twinkle sinusoidal brightness
        p.twinklePhase += p.twinkleSpeed;
        const twinkleFactor = (Math.sin(p.twinklePhase) + 1) / 2;
        let currentAlpha = p.baseAlpha * (0.4 + 0.6 * twinkleFactor);

        // Proximity glow to cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let currentSize = p.size;
        if (dist < mouse.radius) {
          const factor = 1 - dist / mouse.radius;
          currentSize = p.size + factor * 2.2;
          currentAlpha = Math.min(1, currentAlpha + factor * 0.7);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        if (dist < mouse.radius) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        }
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      // Spawn & Render Shooting Stars
      if (tick % 60 === 0) {
        createShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        if (!star.active) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.3, `rgba(6, 182, 212, ${star.opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Move star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        if (star.opacity <= 0 || star.x > width + 100 || star.y > height + 100) {
          star.active = false;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 🌌 CINEMATIC KEN BURNS ANIMATED NEBULA BACKGROUND IMAGE */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1.04, 1],
          x: [0, -20, 15, 0],
          y: [0, -15, 20, 0],
          rotate: [0, 0.8, -0.6, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `url('/cosmic-nebula-bg.jpg')`,
        }}
      />

      {/* RADIANT NEBULA GLOW OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913]/90 via-[#0a0f1d]/75 to-[#060913]/95" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-amber-600/8 blur-[100px] pointer-events-none" />

      {/* CANVAS TWINKLING STARS & METEORS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      />
    </div>
  );
}
