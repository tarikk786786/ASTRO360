import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Star3D {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  baseSize: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
  hasSpikes: boolean;
}

interface Meteor3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  length: number;
  color: string;
  opacity: number;
  active: boolean;
}

interface CosmicRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export default function CosmicParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<CosmicRipple[]>([]);

  // Smooth 3D layer parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 20 });

  const nebulaRotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const nebulaRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const nebulaTranslateX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const nebulaTranslateY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  // Click / Tap creates a glowing 3D cosmic ripple
  const handleCanvasClick = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }
    ripplesRef.current.push({
      x: clientX,
      y: clientY,
      radius: 0,
      maxRadius: 220,
      alpha: 0.8,
      color: ['#06B6D4', '#38BDF8', '#F59E0B', '#A855F7', '#EC4899'][Math.floor(Math.random() * 5)],
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let cx = width / 2;
    let cy = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cx = width / 2;
      cy = height / 2;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking
    let targetCamX = 0;
    let targetCamY = 0;
    let camX = 0;
    let camY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      targetCamX = normX * 160;
      targetCamY = normY * 120;
      mouseX.set(normX);
      mouseY.set(normY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleCanvasClick);
    window.addEventListener('touchstart', handleCanvasClick, { passive: true });

    // Mobile Gyroscope
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const normX = Math.max(-1, Math.min(1, e.gamma / 40));
        const normY = Math.max(-1, Math.min(1, (e.beta - 40) / 40));
        targetCamX = normX * 140;
        targetCamY = normY * 100;
        mouseX.set(normX * 0.5);
        mouseY.set(normY * 0.5);
      }
    };
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    // 3D Starfield Config
    const MAX_Z = 1800;
    const FOV = 480;
    const STAR_COLORS = ['#FFFFFF', '#CFFDFE', '#67E8F9', '#93C5FD', '#FEF08A', '#FDE047', '#E9D5FF', '#F472B6'];

    const stars: Star3D[] = Array.from({ length: 320 }).map((_, idx) => ({
      x: (Math.random() - 0.5) * width * 3.2,
      y: (Math.random() - 0.5) * height * 3.2,
      z: Math.random() * MAX_Z + 1,
      prevZ: 0,
      baseSize: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.65 + 0.35,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.015,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      hasSpikes: idx % 14 === 0, // Hero sparkling cross stars
    }));

    stars.forEach((s) => (s.prevZ = s.z));

    // Shooting Stars
    const meteors: Meteor3D[] = [];
    const spawnMeteor = () => {
      if (meteors.length < 3 && Math.random() < 0.035) {
        const startZ = Math.random() * 600 + 300;
        meteors.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.8) * height * 2,
          z: startZ,
          vx: Math.random() * 15 + 12,
          vy: Math.random() * 10 + 8,
          vz: -Math.random() * 10 - 6,
          length: Math.random() * 90 + 50,
          color: ['#06B6D4', '#38BDF8', '#F59E0B', '#A855F7', '#FFFFFF'][Math.floor(Math.random() * 5)],
          opacity: 1,
          active: true,
        });
      }
    };

    // Helper: Draw 4-Point Diffraction Cross Star (James Webb / Hubble Flare)
    const drawCrossStar = (
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number,
      flareLength: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;

      // Center core glow
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 12;
      ctx.shadowColor = color;
      ctx.fill();

      // 4-Point Diffraction Cross Spikes
      ctx.beginPath();
      // Horizontal Spike
      ctx.moveTo(x - flareLength, y);
      ctx.lineTo(x + flareLength, y);
      // Vertical Spike
      ctx.moveTo(x, y - flareLength);
      ctx.lineTo(x, y + flareLength);
      ctx.stroke();

      // Diagonal secondary mini spikes
      ctx.lineWidth = 0.6;
      const diag = flareLength * 0.45;
      ctx.beginPath();
      ctx.moveTo(x - diag, y - diag);
      ctx.lineTo(x + diag, y + diag);
      ctx.moveTo(x + diag, y - diag);
      ctx.lineTo(x - diag, y + diag);
      ctx.stroke();

      ctx.restore();
    };

    let tick = 0;
    const BASE_SPEED = 0.55;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Smooth Camera LERP
      camX += (targetCamX - camX) * 0.045;
      camY += (targetCamY - camY) * 0.045;

      // Process Cosmic Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 3.5;
        r.alpha -= 0.015;

        if (r.radius >= r.maxRadius || r.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.5 * (1 - r.radius / r.maxRadius);
        ctx.globalAlpha = r.alpha;
        ctx.shadowBlur = 15;
        ctx.shadowColor = r.color;
        ctx.stroke();
        ctx.restore();
      }

      // Draw Stars
      const projectedStars: { px: number; py: number; size: number; alpha: number; z: number; color: string; hasSpikes: boolean }[] = [];

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.prevZ = s.z;
        s.z -= BASE_SPEED;

        // Reset star when it flies behind camera
        if (s.z <= 1) {
          s.z = MAX_Z;
          s.prevZ = MAX_Z;
          s.x = (Math.random() - 0.5) * width * 3.2;
          s.y = (Math.random() - 0.5) * height * 3.2;
        }

        const k = FOV / s.z;
        const px = s.x * k + cx - camX * (1 - s.z / MAX_Z);
        const py = s.y * k + cy - camY * (1 - s.z / MAX_Z);

        const prevK = FOV / (s.prevZ + 0.1);
        const ppx = s.x * prevK + cx - camX * (1 - s.prevZ / MAX_Z);
        const ppy = s.y * prevK + cy - camY * (1 - s.prevZ / MAX_Z);

        if (px < -60 || px > width + 60 || py < -60 || py > height + 60) continue;

        const depthFactor = 1 - s.z / MAX_Z;
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = (Math.sin(s.twinklePhase) + 1) / 2;
        const alpha = Math.min(1, Math.max(0.15, s.baseAlpha * (0.35 + 0.65 * twinkle) * (0.4 + 0.6 * depthFactor)));
        const size = Math.max(0.6, s.baseSize * (0.6 + 2.0 * depthFactor));

        projectedStars.push({ px, py, size, alpha, z: s.z, color: s.color, hasSpikes: s.hasSpikes });

        // 3D Motion Streak
        ctx.beginPath();
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = alpha * 0.45;
        ctx.lineWidth = size * 0.85;
        ctx.stroke();

        // If hero cross star, render 4-point flare
        if (s.hasSpikes && depthFactor > 0.4) {
          const flareLen = size * 5.5 * depthFactor;
          drawCrossStar(px, py, size * 1.1, s.color, alpha, flareLen);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = alpha;
          if (depthFactor > 0.55) {
            ctx.shadowBlur = 10 * depthFactor;
            ctx.shadowColor = s.color;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Constellation Mesh Lines between spatial stars
      ctx.lineWidth = 0.6;
      const MAX_CONNECT_DIST = 95;
      for (let i = 0; i < projectedStars.length; i += 2) {
        const p1 = projectedStars[i];
        if (p1.z > 850) continue;
        for (let j = i + 1; j < projectedStars.length; j += 3) {
          const p2 = projectedStars[j];
          if (Math.abs(p1.z - p2.z) > 220) continue;
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_CONNECT_DIST) {
            const lineAlpha = (1 - dist / MAX_CONNECT_DIST) * 0.22 * (1 - p1.z / MAX_Z);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = '#38BDF8';
            ctx.globalAlpha = lineAlpha;
            ctx.stroke();
          }
        }
      }

      // Spawn & Draw Meteors
      if (tick % 70 === 0) {
        spawnMeteor();
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) {
          meteors.splice(i, 1);
          continue;
        }

        m.x += m.vx;
        m.y += m.vy;
        m.z += m.vz;
        m.opacity -= 0.016;

        if (m.z <= 10 || m.opacity <= 0) {
          m.active = false;
          continue;
        }

        const k = FOV / m.z;
        const mx = m.x * k + cx - camX;
        const my = m.y * k + cy - camY;

        const tailK = FOV / (m.z - m.vz * 4.5);
        const tx = (m.x - m.vx * 3.5) * tailK + cx - camX;
        const ty = (m.y - m.vy * 3.5) * tailK + cy - camY;

        const grad = ctx.createLinearGradient(mx, my, tx, ty);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
        grad.addColorStop(0.2, m.color);
        grad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1.2, 3.2 * (1 - m.z / MAX_Z));
        ctx.shadowBlur = 12;
        ctx.shadowColor = m.color;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('touchstart', handleCanvasClick);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, handleCanvasClick]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 🌌 GLOWING 3D PARALLAX NEBULA GALAXY LAYER */}
      <motion.div
        style={{
          rotateX: nebulaRotateX,
          rotateY: nebulaRotateY,
          x: nebulaTranslateX,
          y: nebulaTranslateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-[-12%] w-[124%] h-[124%] will-change-transform"
      >
        <motion.div
          animate={{
            scale: [1.02, 1.12, 1.06, 1.02],
            rotate: [0, 1.5, -1, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60 mix-blend-screen brightness-110 contrast-105"
          style={{
            backgroundImage: `url('/cosmic-nebula-bg.jpg')`,
            transform: 'translateZ(-180px)',
          }}
        />
      </motion.div>

      {/* VIBRANT VOLUMETRIC STELLAR NEBULA GLOWS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030611]/80 via-[#060b1b]/55 to-[#030611]/85" />
      <div className="absolute top-1/6 left-1/6 w-[34rem] h-[34rem] rounded-full bg-cyan-500/18 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-1/4 right-1/5 w-[38rem] h-[38rem] rounded-full bg-purple-600/18 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute top-1/2 right-1/3 w-[26rem] h-[26rem] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      {/* REAL-TIME 3D SPATIAL CANVAS (Stars with James Webb Flares + Constellations + Meteors + Ripples) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-95"
      />
    </div>
  );
}
