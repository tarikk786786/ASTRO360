import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Procedural Radial Soft Star Texture (No Square Box Points)
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.85)');
  gradient.addColorStop(0.4, 'rgba(201, 168, 106, 0.35)');
  gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.08)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Procedural Bright Star with Diffraction Cross Spikes
function createBrightStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Core Glow
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 245, 210, 0.7)');
  gradient.addColorStop(0.5, 'rgba(201, 168, 106, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(64, 64, 64, 0, Math.PI * 2);
  ctx.fill();

  // 4 Subtle Diffraction Spikes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(64, 16);
  ctx.lineTo(64, 112);
  ctx.moveTo(16, 64);
  ctx.lineTo(112, 64);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function CosmicParticleBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040711, 0.0007);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    camera.position.set(0, 180, 480);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x334155, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xfff1b8, 2.5, 1200, 1.2);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 4. Central Sun with Corona Glow
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    const sunGeo = new THREE.SphereGeometry(18, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffe885,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Outer Corona Glow Sphere
    const coronaGeo = new THREE.SphereGeometry(24, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xc9a86a,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunGroup.add(coronaMesh);

    // 5. Real Radial Glowing Starfield (Deep Space)
    const starCount = window.innerWidth < 768 ? 1200 : 3500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xffffff), // Pure white starlight
      new THREE.Color(0xc9a86a), // Sacred Gold
      new THREE.Color(0x7dd3fc), // Sirius Blue
      new THREE.Color(0xa5b4fc), // Vega Indigo
      new THREE.Color(0xfef08a), // Warm Yellow
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = THREE.MathUtils.randFloat(250, 2000);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starTexture = createStarTexture();
    const starMaterial = new THREE.PointsMaterial({
      size: 14,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 5B. Prominent Bright Navagraha / Pole Stars Layer
    const brightCount = 60;
    const brightGeo = new THREE.BufferGeometry();
    const brightPositions = new Float32Array(brightCount * 3);

    for (let i = 0; i < brightCount; i++) {
      const radius = THREE.MathUtils.randFloat(400, 1600);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      brightPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      brightPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      brightPositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    brightGeo.setAttribute('position', new THREE.BufferAttribute(brightPositions, 3));
    const brightTexture = createBrightStarTexture();
    const brightMaterial = new THREE.PointsMaterial({
      size: 28,
      map: brightTexture,
      color: 0xfff3c4,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const brightField = new THREE.Points(brightGeo, brightMaterial);
    scene.add(brightField);

    // 6. Solar System Planetary Spheres & Orbits
    interface PlanetData {
      name: string;
      dist: number;
      size: number;
      color: number;
      speed: number;
      hasRings?: boolean;
    }

    const planetsData: PlanetData[] = [
      { name: 'Mercury', dist: 45, size: 2.2, color: 0xa3a3a3, speed: 0.015 },
      { name: 'Venus', dist: 70, size: 3.6, color: 0xeab308, speed: 0.011 },
      { name: 'Earth', dist: 105, size: 4.0, color: 0x38bdf8, speed: 0.008 },
      { name: 'Mars', dist: 140, size: 3.0, color: 0xf87171, speed: 0.006 },
      { name: 'Jupiter', dist: 195, size: 9.0, color: 0xfdba74, speed: 0.0035 },
      { name: 'Saturn', dist: 255, size: 7.5, color: 0xfde047, speed: 0.0025, hasRings: true },
      { name: 'Uranus', dist: 315, size: 5.5, color: 0x2dd4bf, speed: 0.0018 },
      { name: 'Neptune', dist: 370, size: 5.2, color: 0x60a5fa, speed: 0.0012 }
    ];

    const planetMeshes: { group: THREE.Group; speed: number; angle: number; dist: number }[] = [];

    planetsData.forEach((p) => {
      // Orbit Line Geometry
      const orbitGeo = new THREE.RingGeometry(p.dist - 0.4, p.dist + 0.4, 96);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0xc9a86a,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide
      });
      const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
      orbitMesh.rotation.x = Math.PI / 2;
      scene.add(orbitMesh);

      // Planet Orbit Pivot Group
      const pivotGroup = new THREE.Group();
      scene.add(pivotGroup);

      // Planet Mesh
      const pGeo = new THREE.SphereGeometry(p.size, 24, 24);
      const pMat = new THREE.MeshStandardMaterial({
        color: p.color,
        roughness: 0.6,
        metalness: 0.2,
        emissive: p.color,
        emissiveIntensity: 0.12
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set(p.dist, 0, 0);
      pivotGroup.add(pMesh);

      // Saturn Rings
      if (p.hasRings) {
        const ringGeo = new THREE.RingGeometry(p.size * 1.4, p.size * 2.3, 48);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xfde047,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 3;
        pMesh.add(ringMesh);
      }

      const initialAngle = Math.random() * Math.PI * 2;
      pivotGroup.rotation.y = initialAngle;

      planetMeshes.push({
        group: pivotGroup,
        speed: p.speed,
        angle: initialAngle,
        dist: p.dist
      });
    });

    // 7. Zodiac Constellation Geometry Layer
    const zodiacGroup = new THREE.Group();
    scene.add(zodiacGroup);

    const zodiacSigns = 12;
    const zodiacRadius = 460;
    for (let i = 0; i < zodiacSigns; i++) {
      const angle = (i / zodiacSigns) * Math.PI * 2;
      const x = Math.cos(angle) * zodiacRadius;
      const z = Math.sin(angle) * zodiacRadius;

      // Constellation Star Node
      const nodeGeo = new THREE.SphereGeometry(1.5, 8, 8);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xc9a86a });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, 0, z);
      zodiacGroup.add(nodeMesh);

      // Connect to Next Node with Subtle Chord
      const nextAngle = ((i + 1) / zodiacSigns) * Math.PI * 2;
      const nextX = Math.cos(nextAngle) * zodiacRadius;
      const nextZ = Math.sin(nextAngle) * zodiacRadius;

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0, z),
        new THREE.Vector3(nextX, 0, nextZ)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xc9a86a,
        transparent: true,
        opacity: 0.08
      });
      const line = new THREE.Line(lineGeo, lineMat);
      zodiacGroup.add(line);
    }

    // 8. Mouse Parallax Easing
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 180;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
      targetCameraX = mouseX;
      targetCameraY = 180 - mouseY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 9. Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 10. Animation Loop
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth Camera Parallax Easing
      camera.position.x += (targetCameraX - camera.position.x) * 0.02;
      camera.position.y += (targetCameraY - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        // Slow Cosmic Starfield Rotation
        starField.rotation.y += 0.0002;
        starField.rotation.x += 0.0001;
        brightField.rotation.y += 0.0002;

        // Rotate Zodiac Ring
        zodiacGroup.rotation.y += 0.0003;

        // Sun Corona Pulse
        sunGroup.rotation.y += 0.002;

        // Orbit Planets
        planetMeshes.forEach((p) => {
          p.group.rotation.y += p.speed * 0.35;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      starTexture.dispose();
      brightTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 🌌 Three.js Hyper-Realistic WebGL Canvas with Real Circular Gaussian Stars */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Volumetric Dark Vignette for High Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040711]/85 via-[#070b19]/70 to-[#040711]/90 pointer-events-none" />
    </div>
  );
}
