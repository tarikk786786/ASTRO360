import React, { useEffect, useRef, useState } from 'react';
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

export default function CosmicParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Motion values for smooth 3D layer parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const nebulaRotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const nebulaRotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const nebulaTranslateX = useTransform(springX, [-0.5, 0.5], [-35, 35]);
  const nebulaTranslateY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

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

    // 3D Camera & Mouse Parallax
    let targetCamX = 0;
    let targetCamY = 0;
    let camX = 0;
    let camY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      targetCamX = normX * 180;
      targetCamY = normY * 140;
      mouseX.set(normX);
      mouseY.set(normY);
      setTilt({ x: normY * 10, y: normX * 10 });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Device Orientation support for Mobile 3D Gyroscope
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const normX = Math.max(-1, Math.min(1, e.gamma / 45));
        const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
        targetCamX = normX * 160;
        targetCamY = normY * 120;
        mouseX.set(normX * 0.5);
        mouseY.set(normY * 0.5);
      }
    };
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    // Initialize 280 Real 3D Spatial Stars
    const MAX_Z = 1600;
    const FOV = 450;
    const STAR_COLORS = ['#FFFFFF', '#A5F3FC', '#67E8F9', '#93C5FD', '#FDE047', '#E9D5FF', '#F472B6'];

    const stars: Star3D[] = Array.from({ length: 280 }).map(() => ({
      x: (Math.random() - 0.5) * width * 3,
      y: (Math.random() - 0.5) * height * 3,
      z: Math.random() * MAX_Z + 1,
      prevZ: 0,
      baseSize: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.7 + 0.3,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }));

    stars.forEach(s => s.prevZ = s.z);

    // 3D Shooting Stars Pool
    const meteors: Meteor3D[] = [];
    const spawnMeteor = () => {
      if (meteors.length < 3 && Math.random() < 0.035) {
        const startZ = Math.random() * 800 + 400;
        meteors.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.8) * height * 2,
          z: startZ,
          vx: Math.random() * 14 + 10,
          vy: Math.random() * 10 + 8,
          vz: -Math.random() * 8 - 4,
          length: Math.random() * 70 + 40,
          color: ['#06B6D4', '#38BDF8', '#F59E0B', '#A855F7', '#FFFFFF'][Math.floor(Math.random() * 5)],
          opacity: 1,
          active: true,
        });
      }
    };

    let tick = 0;
    const BASE_SPEED = 0.65; // Gentle 3D forward flight

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // Smooth Camera LERP
      camX += (targetCamX - camX) * 0.04;
      camY += (targetCamY - camY) * 0.04;

      // Project and draw 3D Stars
      const projectedStars: { px: number; py: number; size: number; alpha: number; z: number; color: string }[] = [];

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.prevZ = s.z;
        s.z -= BASE_SPEED;

        // Reset if star passes camera
        if (s.z <= 1) {
          s.z = MAX_Z;
          s.prevZ = MAX_Z;
          s.x = (Math.random() - 0.5) * width * 3;
          s.y = (Math.random() - 0.5) * height * 3;
        }

        // 3D Perspective Projection
        const k = FOV / s.z;
        const px = s.x * k + cx - camX * (1 - s.z / MAX_Z);
        const py = s.y * k + cy - camY * (1 - s.z / MAX_Z);

        // Previous point for subtle 3D motion streak
        const prevK = FOV / (s.prevZ + 0.1);
        const ppx = s.x * prevK + cx - camX * (1 - s.prevZ / MAX_Z);
        const ppy = s.y * prevK + cy - camY * (1 - s.prevZ / MAX_Z);

        // Bounds Check
        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) continue;

        // Depth-based sizing & alpha
        const depthFactor = 1 - s.z / MAX_Z;
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = (Math.sin(s.twinklePhase) + 1) / 2;
        const alpha = Math.min(1, Math.max(0.1, s.baseAlpha * (0.3 + 0.7 * twinkle) * (0.3 + 0.7 * depthFactor)));
        const size = Math.max(0.5, s.baseSize * (0.5 + 2.2 * depthFactor));

        projectedStars.push({ px, py, size, alpha, z: s.z, color: s.color });

        // Draw 3D Motion Streak
        ctx.beginPath();
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = alpha * 0.4;
        ctx.lineWidth = size * 0.8;
        ctx.stroke();

        // Draw Star Core
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        if (depthFactor > 0.6) {
          ctx.shadowBlur = 8 * depthFactor;
          ctx.shadowColor = s.color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3D Constellation Mesh Connections between nearby spatial stars
      ctx.lineWidth = 0.5;
      const MAX_CONNECT_DIST = 90;
      for (let i = 0; i < projectedStars.length; i += 2) {
        const p1 = projectedStars[i];
        if (p1.z > 800) continue; // Only connect foreground/midground stars
        for (let j = i + 1; j < projectedStars.length; j += 3) {
          const p2 = projectedStars[j];
          if (Math.abs(p1.z - p2.z) > 250) continue; // Must be close in 3D depth
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_CONNECT_DIST) {
            const lineAlpha = (1 - dist / MAX_CONNECT_DIST) * 0.18 * (1 - p1.z / MAX_Z);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = '#06B6D4';
            ctx.globalAlpha = lineAlpha;
            ctx.stroke();
          }
        }
      }

      // Spawn & Render 3D Meteors / Comets
      if (tick % 75 === 0) {
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
        m.opacity -= 0.018;

        if (m.z <= 10 || m.opacity <= 0) {
          m.active = false;
          continue;
        }

        const k = FOV / m.z;
        const mx = m.x * k + cx - camX;
        const my = m.y * k + cy - camY;

        const tailK = FOV / (m.z - m.vz * 4);
        const tx = (m.x - m.vx * 3) * tailK + cx - camX;
        const ty = (m.y - m.vy * 3) * tailK + cy - camY;

        const grad = ctx.createLinearGradient(mx, my, tx, ty);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
        grad.addColorStop(0.3, m.color === '#FFFFFF' ? `rgba(6, 182, 212, ${m.opacity * 0.8})` : m.color);
        grad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1, 2.5 * (1 - m.z / MAX_Z));
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 🌌 TRUE 3D PARALLAX NEBULA BACKDROP */}
      <motion.div
        style={{
          rotateX: nebulaRotateX,
          rotateY: nebulaRotateY,
          x: nebulaTranslateX,
          y: nebulaTranslateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-[-15%] w-[130%] h-[130%] will-change-transform"
      >
        {/* Animated High-Resolution Galaxy Image */}
        <motion.div
          animate={{
            scale: [1.02, 1.1, 1.05, 1.02],
            rotate: [0, 1.2, -0.8, 0],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-45 mix-blend-screen"
          style={{
            backgroundImage: `url('/cosmic-nebula-bg.jpg')`,
            transform: 'translateZ(-200px)',
          }}
        />
      </motion.div>

      {/* 3D VOLUMETRIC STELLAR NEBULA GLOWS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050811]/92 via-[#090e1c]/78 to-[#050811]/95" />
      <div className="absolute top-1/4 left-1/5 w-[32rem] h-[32rem] rounded-full bg-cyan-500/12 blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] rounded-full bg-purple-600/12 blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      {/* REAL-TIME 3D SPATIAL CANVAS (Stars + Constellation Mesh + Meteors) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
      />
    </div>
  );
}
