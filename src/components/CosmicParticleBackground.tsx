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
  gradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.4)'); // Richer gold
  gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.1)');
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
  gradient.addColorStop(0.15, 'rgba(255, 245, 210, 0.85)');
  gradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(64, 64, 64, 0, Math.PI * 2);
  ctx.fill();

  // 4 Subtle Diffraction Spikes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(64, 12);
  ctx.lineTo(64, 116);
  ctx.moveTo(12, 64);
  ctx.lineTo(116, 64);
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
    scene.fog = new THREE.FogExp2(0x02040a, 0.0008); // Deeper space fog

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    camera.position.set(0, 160, 420); // Closer and slightly lower angle
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
    renderer.toneMappingExposure = 1.25; // Slightly more cinematic pop
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x1a2035, 0.8); // Richer indigo/slate ambient
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xfff5d6, 3.5, 1400, 1.4);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // 4. Central Sun with Corona Glow
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    const sunGeo = new THREE.SphereGeometry(18, 48, 48);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xfff0b3,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Inner Corona Core
    const coronaCoreGeo = new THREE.SphereGeometry(21, 32, 32);
    const coronaCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const coronaCoreMesh = new THREE.Mesh(coronaCoreGeo, coronaCoreMat);
    sunGroup.add(coronaCoreMesh);

    // Outer Corona Glow Sphere
    const coronaGeo = new THREE.SphereGeometry(30, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37, // Rich Antique Gold
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunGroup.add(coronaMesh);

    // 5. Real Radial Glowing Starfield (Deep Space)
    const starCount = window.innerWidth < 768 ? 1500 : 4500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xffffff), // Pure white starlight
      new THREE.Color(0xd4af37), // Sacred Gold
      new THREE.Color(0x38bdf8), // Vibrant Blue
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xfef08a), // Warm Yellow
      new THREE.Color(0xfda4af), // Subtle Rose/Saffron hint
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = THREE.MathUtils.randFloat(200, 2200);
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
      size: 16,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 5B. Prominent Bright Navagraha / Pole Stars Layer
    const brightCount = 75;
    const brightGeo = new THREE.BufferGeometry();
    const brightPositions = new Float32Array(brightCount * 3);

    for (let i = 0; i < brightCount; i++) {
      const radius = THREE.MathUtils.randFloat(300, 1500);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      brightPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      brightPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      brightPositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    brightGeo.setAttribute('position', new THREE.BufferAttribute(brightPositions, 3));
    const brightTexture = createBrightStarTexture();
    const brightMaterial = new THREE.PointsMaterial({
      size: 36, // Larger diffraction spikes
      map: brightTexture,
      color: 0xfff6d9,
      transparent: true,
      opacity: 0.9,
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
      { name: 'Mercury', dist: 45, size: 2.2, color: 0xb5b5b5, speed: 0.015 },
      { name: 'Venus', dist: 70, size: 3.6, color: 0xf59e0b, speed: 0.011 },
      { name: 'Earth', dist: 105, size: 4.2, color: 0x0ea5e9, speed: 0.008 },
      { name: 'Mars', dist: 140, size: 3.0, color: 0xef4444, speed: 0.006 },
      { name: 'Jupiter', dist: 195, size: 9.5, color: 0xfb923c, speed: 0.0035 },
      { name: 'Saturn', dist: 255, size: 8.0, color: 0xfacc15, speed: 0.0025, hasRings: true },
      { name: 'Uranus', dist: 315, size: 5.8, color: 0x14b8a6, speed: 0.0018 },
      { name: 'Neptune', dist: 370, size: 5.5, color: 0x3b82f6, speed: 0.0012 }
    ];

    const planetMeshes: { group: THREE.Group; speed: number; angle: number; dist: number }[] = [];

    planetsData.forEach((p) => {
      // Orbit Line Geometry
      const orbitGeo = new THREE.RingGeometry(p.dist - 0.2, p.dist + 0.2, 128);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37, // Golden orbits
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
      orbitMesh.rotation.x = Math.PI / 2;
      scene.add(orbitMesh);

      // Planet Orbit Pivot Group
      const pivotGroup = new THREE.Group();
      scene.add(pivotGroup);

      // Planet Mesh (Using MeshPhysicalMaterial for premium glossy look)
      const pGeo = new THREE.SphereGeometry(p.size, 32, 32);
      const pMat = new THREE.MeshPhysicalMaterial({
        color: p.color,
        roughness: 0.4,
        metalness: 0.3,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        emissive: p.color,
        emissiveIntensity: 0.15
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set(p.dist, 0, 0);
      pivotGroup.add(pMesh);

      // Saturn Rings
      if (p.hasRings) {
        const ringGeo = new THREE.RingGeometry(p.size * 1.5, p.size * 2.4, 64);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xfde047,
          roughness: 0.6,
          metalness: 0.4,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.8;
        pMesh.add(ringMesh);
        
        // Add subtle shadow casting/receiving capabilities in the future
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
    const zodiacRadius = 450;
    for (let i = 0; i < zodiacSigns; i++) {
      const angle = (i / zodiacSigns) * Math.PI * 2;
      const x = Math.cos(angle) * zodiacRadius;
      const z = Math.sin(angle) * zodiacRadius;

      // Constellation Star Node
      const nodeGeo = new THREE.SphereGeometry(1.8, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffdf80 });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, 0, z);
      zodiacGroup.add(nodeMesh);

      // Outer glow for constellation node
      const nodeGlowGeo = new THREE.SphereGeometry(4.0, 16, 16);
      const nodeGlowMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      const nodeGlowMesh = new THREE.Mesh(nodeGlowGeo, nodeGlowMat);
      nodeGlowMesh.position.set(x, 0, z);
      zodiacGroup.add(nodeGlowMesh);

      // Connect to Next Node with Subtle Chord
      const nextAngle = ((i + 1) / zodiacSigns) * Math.PI * 2;
      const nextX = Math.cos(nextAngle) * zodiacRadius;
      const nextZ = Math.sin(nextAngle) * zodiacRadius;

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0, z),
        new THREE.Vector3(nextX, 0, nextZ)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(lineGeo, lineMat);
      zodiacGroup.add(line);
    }

    // 8. Mouse Parallax Easing
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 160;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.12;
      targetCameraX = mouseX;
      targetCameraY = 160 - mouseY;
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
        starField.rotation.y += 0.00015;
        starField.rotation.x += 0.00008;
        brightField.rotation.y += 0.00015;

        // Rotate Zodiac Ring
        zodiacGroup.rotation.y += 0.00025;

        // Sun Corona Pulse
        sunGroup.rotation.y += 0.0015;
        
        // Gentle pulsing effect on the outer corona scale
        const time = Date.now() * 0.001;
        const scale = 1.0 + Math.sin(time * 2) * 0.03;
        coronaMesh.scale.set(scale, scale, scale);

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
      {/* Darker, richer vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/95 via-[#040711]/60 to-[#02040a]/95 pointer-events-none" />
      
      {/* Radial soft glow in center to enhance the 3D Sun */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />
    </div>
  );
}
