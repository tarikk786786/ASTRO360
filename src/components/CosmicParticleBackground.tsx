import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Planet {
  name: string;
  distance: number;
  radius: number;
  speed: number;
  color: string;
  glowColor: string;
  angle: number;
  hasRings?: boolean;
  hasMoon?: boolean;
  ringsRadius?: number;
}

const ZODIAC_CONSTELLATIONS = [
  { name: 'Aries', stars: [[-180, -120], [-130, -90], [-90, -110], [-60, -80]] },
  { name: 'Taurus', stars: [[-120, 80], [-80, 50], [-40, 70], [-20, 100], [20, 90]] },
  { name: 'Gemini', stars: [[100, -140], [140, -120], [160, -80], [130, -60], [100, -80]] },
  { name: 'Cancer', stars: [[180, 40], [150, 70], [120, 60], [130, 90]] },
  { name: 'Leo', stars: [[-220, 150], [-190, 170], [-150, 140], [-120, 180], [-80, 150]] },
  { name: 'Virgo', stars: [[-40, 200], [0, 180], [30, 220], [70, 200], [110, 240]] },
  { name: 'Libra', stars: [[140, 160], [180, 140], [200, 180], [160, 210]] },
  { name: 'Scorpio', stars: [[220, -60], [250, -40], [270, -80], [260, -120], [230, -140]] },
  { name: 'Sagittarius', stars: [[60, -220], [100, -190], [130, -230], [90, -260]] },
  { name: 'Capricorn', stars: [[-60, -240], [-20, -210], [20, -230], [0, -260]] },
  { name: 'Aquarius', stars: [[-160, -200], [-120, -180], [-80, -210], [-100, -240]] },
  { name: 'Pisces', stars: [[-240, -40], [-210, -10], [-180, -30], [-190, -70]] }
];

export default function CosmicParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Interactive View Modes
  const [viewMode, setViewMode] = useState<'all' | 'solar' | 'stars'>('all');
  const [isHoveredPlanet, setIsHoveredPlanet] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse Parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Resize Listener
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Move for Parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.05;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 1. Generate Star Field with 3D Depth
    const isMobile = width < 768;
    const starCount = isMobile ? 350 : 800;
    const stars: Star[] = [];
    const starColors = ['#FFFFFF', '#C9A86A', '#38BDF8', '#818CF8', '#E2E8F0', '#FDE047'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000 + 100,
        size: Math.random() * 1.6 + 0.4,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // 2. Solar System Planets Configuration
    const planets: Planet[] = [
      { name: 'Mercury', distance: 65, radius: 2.2, speed: 0.018, color: '#A3A3A3', glowColor: 'rgba(163,163,163,0.4)', angle: 0.8 },
      { name: 'Venus', distance: 95, radius: 3.5, speed: 0.013, color: '#EAB308', glowColor: 'rgba(234,179,8,0.4)', angle: 2.1 },
      { name: 'Earth', distance: 135, radius: 3.8, speed: 0.01, color: '#38BDF8', glowColor: 'rgba(56,189,248,0.4)', angle: 3.6, hasMoon: true },
      { name: 'Mars', distance: 175, radius: 2.8, speed: 0.008, color: '#F87171', glowColor: 'rgba(248,113,113,0.4)', angle: 5.2 },
      { name: 'Jupiter', distance: 235, radius: 7.2, speed: 0.005, color: '#FDBA74', glowColor: 'rgba(253,186,116,0.4)', angle: 1.4 },
      { name: 'Saturn', distance: 295, radius: 5.8, speed: 0.0035, color: '#FDE047', glowColor: 'rgba(253,224,71,0.4)', angle: 4.1, hasRings: true, ringsRadius: 11 },
      { name: 'Uranus', distance: 350, radius: 4.5, speed: 0.0025, color: '#2DD4BF', glowColor: 'rgba(45,212,191,0.4)', angle: 0.3 },
      { name: 'Neptune', distance: 400, radius: 4.2, speed: 0.0018, color: '#60A5FA', glowColor: 'rgba(96,165,250,0.4)', angle: 2.8 }
    ];

    let time = 0;

    // 3. Render Loop
    const render = () => {
      time += 0.015;

      // Smooth mouse parallax easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouseRef.current.x;
      const centerY = height / 2 + mouseRef.current.y;

      // A. Draw 3D Perspective Starfield
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Move star forward slowly
        if (!prefersReducedMotion) {
          star.z -= 0.3;
          if (star.z <= 0) star.z = 1000;
        }

        const k = 400 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = prefersReducedMotion 
            ? 0.7 
            : 0.3 + 0.7 * Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset);
          
          ctx.beginPath();
          ctx.arc(px, py, star.size * k, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha * (1 - star.z / 1100)));
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // B. Draw Subtle Zodiac Constellations in Background
      if (viewMode !== 'solar') {
        ctx.save();
        ctx.strokeStyle = 'rgba(201, 168, 106, 0.12)';
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgba(201, 168, 106, 0.4)';

        ZODIAC_CONSTELLATIONS.forEach((c) => {
          ctx.beginPath();
          c.stars.forEach(([sx, sy], idx) => {
            const cx = centerX + sx * 1.8;
            const cy = centerY + sy * 1.8;
            if (idx === 0) ctx.moveTo(cx, cy);
            else ctx.lineTo(cx, cy);
          });
          ctx.stroke();

          // Draw constellation star nodes
          c.stars.forEach(([sx, sy]) => {
            const cx = centerX + sx * 1.8;
            const cy = centerY + sy * 1.8;
            ctx.beginPath();
            ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
            ctx.fill();
          });
        });
        ctx.restore();
      }

      // C. Draw 3D Solar System
      if (viewMode !== 'stars') {
        const tilt = 0.35; // 3D Elliptical tilt ratio

        // 1. Central Luminous Sun
        const sunRadius = isMobile ? 12 : 16;
        const sunGlow = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, sunRadius * 3.5);
        sunGlow.addColorStop(0, 'rgba(255, 235, 150, 0.9)');
        sunGlow.addColorStop(0.3, 'rgba(201, 168, 106, 0.5)');
        sunGlow.addColorStop(0.7, 'rgba(234, 88, 12, 0.15)');
        sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = sunGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FEF08A';
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;

        // 2. Planets and Orbits
        planets.forEach((p) => {
          if (!prefersReducedMotion) {
            p.angle += p.speed * 0.7;
          }

          const scale = isMobile ? 0.75 : 1.0;
          const dist = p.distance * scale;
          const px = centerX + Math.cos(p.angle) * dist;
          const py = centerY + Math.sin(p.angle) * (dist * tilt);

          // Orbit Line
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, dist, dist * tilt, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Planet Body
          ctx.beginPath();
          ctx.arc(px, py, p.radius * scale, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.glowColor;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Saturn Rings
          if (p.hasRings && p.ringsRadius) {
            ctx.beginPath();
            ctx.ellipse(px, py, p.ringsRadius * scale, (p.ringsRadius * scale) * 0.35, Math.PI / 6, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
            ctx.lineWidth = 1.6;
            ctx.stroke();
          }

          // Earth's Moon
          if (p.hasMoon) {
            const moonAngle = time * 2;
            const mx = px + Math.cos(moonAngle) * 9;
            const my = py + Math.sin(moonAngle) * 9 * tilt;
            ctx.beginPath();
            ctx.arc(mx, my, 1, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewMode, prefersReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 🌌 High-Performance 3D Celestial Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Volumetric Dark Atmosphere Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040711]/90 via-[#070b19]/75 to-[#040711]/90 pointer-events-none" />
    </div>
  );
}
