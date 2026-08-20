import React, { useEffect, useRef, useCallback } from 'react';

interface Star3D {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
  isHeroStar: boolean;
  spikeLength: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
  active: boolean;
}

interface TouchRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export default function CosmicParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<TouchRipple[]>([]);

  const handleInteraction = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }
    const colors = ['#38BDF8', '#818CF8', '#F59E0B', '#C084FC', '#34D399'];
    ripplesRef.current.push({
      x: clientX,
      y: clientY,
      radius: 4,
      maxRadius: 180,
      alpha: 0.7,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    const isMobile = window.innerWidth < 768;

    // Retina display resolution scaling (max 2 for performance)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    ctx.scale(dpr, dpr);

    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;
    let cx = displayWidth / 2;
    let cy = displayHeight / 2;

    const handleResize = () => {
      if (!canvas) return;
      displayWidth = window.innerWidth;
      displayHeight = window.innerHeight;
      width = canvas.width = displayWidth * dpr;
      height = canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
      cx = displayWidth / 2;
      cy = displayHeight / 2;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Smooth Parallax Camera
    let targetCamX = 0;
    let targetCamY = 0;
    let camX = 0;
    let camY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / displayWidth) * 2 - 1;
      const ny = (e.clientY / displayHeight) * 2 - 1;
      targetCamX = nx * 45;
      targetCamY = ny * 35;
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const nx = Math.max(-1, Math.min(1, e.gamma / 30));
        const ny = Math.max(-1, Math.min(1, (e.beta - 35) / 30));
        targetCamX = nx * 35;
        targetCamY = ny * 25;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });

    // Tab Visibility Handler (Stop rendering when tab is hidden to save 100% CPU/Battery)
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Star Catalog Configuration
    const STAR_COUNT = isMobile ? 120 : 220;
    const MAX_Z = 1200;
    const FOV = 420;
    const STAR_PALETTE = [
      '#FFFFFF', '#F8FAFC', '#E2E8F0', // Class A / F (Pure White)
      '#67E8F9', '#38BDF8', '#93C5FD', // Class O / B (Cyan Blue)
      '#FEF08A', '#FDE047',             // Class G (Golden Yellow)
      '#F472B6', '#E9D5FF', '#C084FC', // Class M / Nebula (Rose Violet)
    ];

    const stars: Star3D[] = Array.from({ length: STAR_COUNT }).map((_, idx) => {
      const isHero = idx % 12 === 0;
      return {
        x: (Math.random() - 0.5) * displayWidth * 2.6,
        y: (Math.random() - 0.5) * displayHeight * 2.6,
        z: Math.random() * MAX_Z + 1,
        size: isHero ? Math.random() * 1.5 + 1.2 : Math.random() * 1.1 + 0.5,
        baseAlpha: isHero ? Math.random() * 0.4 + 0.6 : Math.random() * 0.5 + 0.25,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        color: STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)],
        isHeroStar: isHero,
        spikeLength: isHero ? Math.random() * 6 + 4 : 0,
      };
    });

    // Shooting Stars / Meteors
    const meteors: Meteor[] = [];
    let meteorTimer = 0;

    const spawnMeteor = () => {
      if (meteors.length < 2) {
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3; // ~45 deg downward
        meteors.push({
          x: Math.random() * displayWidth * 0.9,
          y: Math.random() * displayHeight * 0.4,
          length: Math.random() * 120 + 80,
          speed: Math.random() * 10 + 14,
          angle,
          opacity: 1,
          color: ['#38BDF8', '#67E8F9', '#F59E0B', '#FFFFFF', '#A855F7'][Math.floor(Math.random() * 5)],
          active: true,
        });
      }
    };

    // Helper: Draw James Webb Diffraction Cross Star
    const drawDiffractionStar = (x: number, y: number, r: number, color: string, alpha: number, len: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      
      // Core bright center
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Soft glow ring
      ctx.beginPath();
      ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha * 0.35;
      ctx.fill();

      // 4-Point Cross Flare
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.9;
      ctx.globalAlpha = alpha * 0.75;
      ctx.beginPath();
      ctx.moveTo(x - len, y);
      ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len);
      ctx.lineTo(x, y + len);
      ctx.stroke();

      // Diagonal micro spikes
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = alpha * 0.4;
      const diag = len * 0.4;
      ctx.beginPath();
      ctx.moveTo(x - diag, y - diag);
      ctx.lineTo(x + diag, y + diag);
      ctx.moveTo(x + diag, y - diag);
      ctx.lineTo(x - diag, y + diag);
      ctx.stroke();

      ctx.restore();
    };

    // Main 60 FPS Render Loop
    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, displayWidth, displayHeight);

        // Smooth Camera LERP
        camX += (targetCamX - camX) * 0.04;
        camY += (targetCamY - camY) * 0.04;

        // 1. Process Touch Ripples
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += 2.8;
          r.alpha -= 0.018;

          if (r.alpha <= 0 || r.radius >= r.maxRadius) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 1.8 * (1 - r.radius / r.maxRadius);
          ctx.globalAlpha = r.alpha;
          ctx.stroke();
          ctx.restore();
        }

        // 2. Draw Stars & Slow Majestic Cosmic Drift
        const projected: { x: number; y: number; size: number; alpha: number; z: number; color: string; isHero: boolean; spikeLen: number }[] = [];

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.z -= 0.18; // Very slow, graceful, relaxing stellar drift

          if (s.z <= 1) {
            s.z = MAX_Z;
            s.x = (Math.random() - 0.5) * displayWidth * 2.6;
            s.y = (Math.random() - 0.5) * displayHeight * 2.6;
          }

          const k = FOV / s.z;
          const px = s.x * k + cx - camX * (1 - s.z / MAX_Z);
          const py = s.y * k + cy - camY * (1 - s.z / MAX_Z);

          if (px < -30 || px > displayWidth + 30 || py < -30 || py > displayHeight + 30) continue;

          const depth = 1 - s.z / MAX_Z;
          s.twinklePhase += s.twinkleSpeed;
          const twinkle = (Math.sin(s.twinklePhase) + 1) * 0.5;
          const alpha = Math.min(1, Math.max(0.1, s.baseAlpha * (0.4 + 0.6 * twinkle) * (0.3 + 0.7 * depth)));
          const size = Math.max(0.4, s.size * (0.5 + 1.2 * depth));

          projected.push({ x: px, y: py, size, alpha, z: s.z, color: s.color, isHero: s.isHeroStar, spikeLen: s.spikeLength });

          if (s.isHeroStar && depth > 0.45) {
            drawDiffractionStar(px, py, size, s.color, alpha, s.spikeLength * (0.8 + 1.2 * depth));
          } else {
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = alpha;
            ctx.fill();
          }
        }

        // 3. Subtle Constellation Geometry Lines (Low complexity, high aesthetics)
        ctx.lineWidth = 0.5;
        const maxDistSq = 75 * 75;
        const step = isMobile ? 3 : 2;

        for (let i = 0; i < projected.length; i += step) {
          const p1 = projected[i];
          if (p1.z > 700) continue;
          for (let j = i + 1; j < projected.length; j += step + 1) {
            const p2 = projected[j];
            if (Math.abs(p1.z - p2.z) > 180) continue;
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const lineAlpha = (1 - distSq / maxDistSq) * 0.16 * (1 - p1.z / MAX_Z);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = '#38BDF8';
              ctx.globalAlpha = lineAlpha;
              ctx.stroke();
            }
          }
        }

        // 4. Occasional Meteors / Shooting Stars
        meteorTimer++;
        if (meteorTimer % 180 === 0 && Math.random() < 0.6) {
          spawnMeteor();
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          if (!m.active) {
            meteors.splice(i, 1);
            continue;
          }

          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.opacity -= 0.014;

          if (m.opacity <= 0 || m.x > displayWidth + 100 || m.y > displayHeight + 100) {
            m.active = false;
            continue;
          }

          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y - Math.sin(m.angle) * m.length;

          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
          grad.addColorStop(0.3, m.color);
          grad.addColorStop(1, 'rgba(6, 182, 212, 0)');

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Glowing meteor head spark
          ctx.beginPath();
          ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = m.opacity;
          ctx.fill();
          ctx.restore();
        }

        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('deviceorientation', handleOrientation);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, [handleInteraction]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* 🌌 DEEP SPACE NEBULA DUST (Atmospheric ambient glow) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen brightness-105 contrast-105 pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url('/cosmic-nebula-bg.jpg')`,
        }}
      />

      {/* VOLUMETRIC STELLAR NEBULA LIGHTS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#060b1b]/60 to-[#020617]/95" />
      <div className="absolute -top-20 -left-20 w-[36rem] h-[36rem] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[40rem] h-[40rem] rounded-full bg-purple-600/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full bg-amber-500/08 blur-[130px] pointer-events-none" />

      {/* HIGH-PRECISION 60FPS 3D STARFIELD CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
