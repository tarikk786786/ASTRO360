import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Compass } from 'lucide-react';

interface Universe3DProps {
  interactive?: boolean;
  systemMode?: string;
  isFullBackground?: boolean;
}

interface PlanetStatusInfo {
  name: string;
  symbol: string;
  deg: number;
  sign: string;
  speed: string;
  dignity: string;
  impact: string;
  color: string;
}

// 🪐 REAL-TIME ASTRONOMICAL EPHEMERIS CALCULATION
function getLiveAstrologicalStatus(ayanamsha: string = 'lahiri'): PlanetStatusInfo[] {
  const ayanamshaOffsets: Record<string, number> = {
    tropical: 0,
    lahiri: -24.12,
    raman: -22.71,
    kp: -23.84
  };
  const offset = ayanamshaOffsets[ayanamsha] ?? -24.12;

  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const hourFrac = now.getHours() / 24;

  const rawSunDeg = ((dayOfYear + hourFrac) * 0.9856 + 280) % 360;
  const rawMoonDeg = ((dayOfYear * 13.176) + 40) % 360;
  const rawMarsDeg = ((dayOfYear * 0.524) + 120) % 360;
  const rawMercuryDeg = (rawSunDeg + Math.sin(dayOfYear / 10) * 18 + 360) % 360;
  const rawJupiterDeg = ((dayOfYear * 0.083) + 75) % 360;
  const rawVenusDeg = (rawSunDeg + Math.cos(dayOfYear / 8) * 42 + 360) % 360;
  const rawSaturnDeg = ((dayOfYear * 0.033) + 325) % 360;

  const sunDeg = (rawSunDeg + offset + 3600) % 360;
  const moonDeg = (rawMoonDeg + offset + 3600) % 360;
  const marsDeg = (rawMarsDeg + offset + 3600) % 360;
  const mercuryDeg = (rawMercuryDeg + offset + 3600) % 360;
  const jupiterDeg = (rawJupiterDeg + offset + 3600) % 360;
  const venusDeg = (rawVenusDeg + offset + 3600) % 360;
  const saturnDeg = (rawSaturnDeg + offset + 3600) % 360;

  const signs = ['Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'];

  const getSignStr = (deg: number) => {
    const idx = Math.floor(deg / 30) % 12;
    const rem = (deg % 30).toFixed(1);
    return `${signs[idx]} ${rem}°`;
  };

  return [
    { name: 'Sun', symbol: '☉', deg: sunDeg, sign: getSignStr(sunDeg), speed: 'Direct (+0°59\'/d)', dignity: 'Solar Vitality', impact: 'High mental clarity & spiritual energy.', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
    { name: 'Moon', symbol: '☽', deg: moonDeg, sign: getSignStr(moonDeg), speed: 'Direct (+13°10\'/d)', dignity: 'Exalted Mind', impact: 'Peaceful subconscious rhythm & prayer intuition.', color: 'text-purple-300 border-purple-500/40 bg-purple-500/10' },
    { name: 'Mercury', symbol: '☿', deg: mercuryDeg, sign: getSignStr(mercuryDeg), speed: 'Direct (+1°20\'/d)', dignity: 'Intellect Focus', impact: 'Sharp business communication & quick learning.', color: 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10' },
    { name: 'Venus', symbol: '♀', deg: venusDeg, sign: getSignStr(venusDeg), speed: 'Direct (+1°12\'/d)', dignity: 'Harmony & Grace', impact: 'Relationship bonding & creative artistic flow.', color: 'text-pink-300 border-pink-500/40 bg-pink-500/10' },
    { name: 'Mars', symbol: '♂', deg: marsDeg, sign: getSignStr(marsDeg), speed: 'Direct (+0°31\'/d)', dignity: 'Courage & Power', impact: 'Physical stamina & driven goal execution.', color: 'text-red-400 border-red-500/40 bg-red-500/10' },
    { name: 'Jupiter', symbol: '♃', deg: jupiterDeg, sign: getSignStr(jupiterDeg), speed: 'Direct (+0°05\'/d)', dignity: 'Great Benefic', impact: 'Spiritual wisdom, expansion, and prosperity.', color: 'text-yellow-300 border-yellow-500/40 bg-yellow-500/10' },
    { name: 'Saturn', symbol: '♄', deg: saturnDeg, sign: getSignStr(saturnDeg), speed: 'Direct (+0°02\'/d)', dignity: 'Karma Discipline', impact: 'Perseverance & structural progress.', color: 'text-indigo-300 border-indigo-500/40 bg-indigo-500/10' }
  ];
}

// PURE ADDITIVE SUN SPRITE GENERATOR
function createAdditiveSunSprite() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const cx = 256;
  const cy = 256;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.18, 'rgba(254, 240, 138, 0.95)');
  grad.addColorStop(0.42, 'rgba(249, 115, 22, 0.65)');
  grad.addColorStop(0.72, 'rgba(239, 68, 68, 0.22)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, 256, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

// HIGH-RESOLUTION PROCEDURAL PLANETARY TEXTURES
function createEarthTextures() {
  const width = 1024;
  const height = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const cCtx = colorCanvas.getContext('2d')!;

  const oceanGrad = cCtx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#092552');
  oceanGrad.addColorStop(0.5, '#0b398a');
  oceanGrad.addColorStop(1, '#051838');
  cCtx.fillStyle = oceanGrad;
  cCtx.fillRect(0, 0, width, height);

  cCtx.fillStyle = '#1e7532';
  cCtx.beginPath();
  cCtx.ellipse(580, 170, 170, 110, 0.15, 0, Math.PI * 2);
  cCtx.fill();

  cCtx.fillStyle = '#c29227';
  cCtx.beginPath();
  cCtx.ellipse(550, 210, 110, 56, 0, 0, Math.PI * 2);
  cCtx.fill();

  cCtx.fillStyle = '#176329';
  cCtx.beginPath();
  cCtx.ellipse(250, 150, 80, 96, -0.2, 0, Math.PI * 2);
  cCtx.ellipse(310, 350, 64, 104, 0.3, 0, Math.PI * 2);
  cCtx.fill();

  cCtx.fillStyle = '#ad6b1d';
  cCtx.beginPath();
  cCtx.ellipse(860, 370, 64, 44, 0, 0, Math.PI * 2);
  cCtx.fill();

  cCtx.fillStyle = '#f8fafc';
  cCtx.fillRect(0, 0, width, 48);
  cCtx.fillRect(0, height - 48, width, 48);

  return new THREE.CanvasTexture(colorCanvas);
}

function createJupiterTexture() {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const bandColors = ['#f4d9a6', '#c4854f', '#965a2e', '#e2af77', '#f7ead7', '#9e5a30', '#d4985c', '#fceee0'];
  const bandHeight = height / bandColors.length;

  for (let i = 0; i < bandColors.length; i++) {
    ctx.fillStyle = bandColors[i];
    ctx.fillRect(0, i * bandHeight, width, bandHeight + 2);
  }

  ctx.fillStyle = '#b32d19';
  ctx.beginPath();
  ctx.ellipse(640, 340, 76, 44, 0, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

function createSaturnTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const colors = ['#f7e7b7', '#e8cb82', '#dbae60', '#fdeebf', '#d1a447', '#f2dfa7'];
  const h = 256 / colors.length;

  for (let i = 0; i < colors.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(0, i * h, 512, h + 2);
  }

  return new THREE.CanvasTexture(canvas);
}

function createSaturnRingTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.15, 'rgba(190, 160, 95, 0.45)');
  grad.addColorStop(0.38, 'rgba(245, 205, 130, 0.98)');
  grad.addColorStop(0.68, 'rgba(15, 15, 25, 0.98)');
  grad.addColorStop(0.72, 'rgba(225, 185, 110, 0.9)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 32);

  return new THREE.CanvasTexture(canvas);
}

function createMarsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#c44223';
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = '#732310';
  for (let i = 0; i < 30; i++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 200 + 28;
    const rx = Math.random() * 55 + 18;
    const ry = Math.random() * 28 + 9;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, Math.random() * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 24);
  ctx.fillRect(0, 232, 512, 24);

  return new THREE.CanvasTexture(canvas);
}

function createNeptuneTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#60a5fa');
  grad.addColorStop(0.5, '#1d4ed8');
  grad.addColorStop(1, '#172554');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  return new THREE.CanvasTexture(canvas);
}

function createUranusTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#67e8f9');
  grad.addColorStop(0.5, '#06b6d4');
  grad.addColorStop(1, '#0e7490');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  return new THREE.CanvasTexture(canvas);
}

function createMoonTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#abb5bd';
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = '#5c6670';
  for (let i = 0; i < 20; i++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 512;
    const r = Math.random() * 50 + 15;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

export function Universe3DCanvas({ interactive = true, systemMode = 'universal', isFullBackground = false }: Universe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetStatusInfo | null>(null);
  const [liveEphemeris, setLiveEphemeris] = useState<PlanetStatusInfo[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const isPlayingRef = useRef<boolean>(true);
  const verticalScaleRef = useRef<number>(0.55); // Mayank Garg inclination scale factor

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const liveData = getLiveAstrologicalStatus(systemMode === 'vedic' ? 'lahiri' : 'tropical');
    setLiveEphemeris(liveData);
  }, [systemMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const isMobile = window.innerWidth <= 768;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.0002);

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 60 : 40,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    
    camera.position.set(0, isMobile ? 22 : 16, isMobile ? 48 : 38);
    camera.lookAt(0, -1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    const solSystemGroup = new THREE.Group();

    // Textures
    const earthTex = createEarthTextures();
    const jupiterTex = createJupiterTexture();
    const saturnTex = createSaturnTexture();
    const saturnRingTex = createSaturnRingTexture();
    const marsTex = createMarsTexture();
    const neptuneTex = createNeptuneTexture();
    const uranusTex = createUranusTexture();
    const moonTex = createMoonTexture();
    const sunSpriteTex = createAdditiveSunSprite();

    // 2. CENTRAL SUN WITH ADDITIVE SPRITE FLARE
    const sunRadius = isMobile ? 4.8 : 6.2;
    const sunGeo = new THREE.SphereGeometry(sunRadius, 64, 64);
    
    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = 512;
    sunCanvas.height = 512;
    const sCtx = sunCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#fef08a');
    grad.addColorStop(0.6, '#f97316');
    grad.addColorStop(0.9, '#ea580c');
    grad.addColorStop(1, '#dc2626');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 512, 512);

    const sunTexture = new THREE.CanvasTexture(sunCanvas);

    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTexture,
      color: 0xffbb00,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.userData = { planetName: 'Sun' };
    solSystemGroup.add(sunMesh);

    const spriteMat = new THREE.SpriteMaterial({
      map: sunSpriteTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const sunSprite = new THREE.Sprite(spriteMat);
    const spriteScale = sunRadius * 4.2;
    sunSprite.scale.set(spriteScale, spriteScale, 1);
    solSystemGroup.add(sunSprite);

    const sunLight = new THREE.PointLight(0xfffae0, 8.0, 320);
    sunLight.position.set(0, 0, 0);
    solSystemGroup.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    // 3. MAYANK GARG REALISTIC PLANETARY SPEEDS & ORBITS
    // Speed values based on Mayank Garg formula: Merc=47.87, Venus=35.02, Earth=29.78, Mars=24.07, Jup=13.07, Sat=9.69, Ura=6.81, Nep=5.43
    const planetData = [
      { name: 'Mercury', r: 10, size: 1.1, tex: moonTex, speed: 47.87, initAngle: 3.8, isEarth: false, isSaturn: false, isUranus: false },
      { name: 'Venus', r: 15, size: 1.5, tex: saturnTex, speed: 35.02, initAngle: 2.8, isEarth: false, isSaturn: false, isUranus: false },
      { name: 'Earth', r: 22, size: 2.6, tex: earthTex, speed: 29.78, initAngle: -0.6, isEarth: true, isSaturn: false, isUranus: false },
      { name: 'Mars', r: 29, size: 2.0, tex: marsTex, speed: 24.07, initAngle: -1.5, isEarth: false, isSaturn: false, isUranus: false },
      { name: 'Jupiter', r: 38, size: 3.5, tex: jupiterTex, speed: 13.07, initAngle: 0.7, isEarth: false, isSaturn: false, isUranus: false },
      { name: 'Saturn', r: 46, size: 2.5, tex: saturnTex, speed: 9.69, initAngle: 2.4, isEarth: false, isSaturn: true, isUranus: false },
      { name: 'Uranus', r: 54, size: 2.1, tex: uranusTex, speed: 6.81, initAngle: 1.8, isEarth: false, isSaturn: false, isUranus: true },
      { name: 'Neptune', r: 62, size: 2.0, tex: neptuneTex, speed: 5.43, initAngle: 1.2, isEarth: false, isSaturn: false, isUranus: false },
    ];

    const planetMeshesList: THREE.Mesh[] = [sunMesh];
    const planetObjects: { group: THREE.Group; mesh: THREE.Mesh; moonGroup?: THREE.Group; r: number; speed: number; angle: number }[] = [];

    planetData.forEach((p) => {
      const orbitGeo = new THREE.BufferGeometry();
      const points = [];
      const segs = 128;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * p.r, 0, Math.sin(theta) * p.r));
      }
      orbitGeo.setFromPoints(points);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: isFullBackground ? 0.35 : 0.6,
      });
      const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
      solSystemGroup.add(orbitLine);

      const pGroup = new THREE.Group();
      const pGeo = new THREE.SphereGeometry(p.size, 32, 32);
      const pMat = new THREE.MeshStandardMaterial({
        map: p.tex,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0x222222,
      });

      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.userData = { planetName: p.name };
      pGroup.add(pMesh);
      planetMeshesList.push(pMesh);

      let moonGroup: THREE.Group | undefined;

      if (p.isEarth) {
        const atmosphereGeo = new THREE.SphereGeometry(p.size * 1.08, 32, 32);
        const atmosphereMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        pGroup.add(new THREE.Mesh(atmosphereGeo, atmosphereMat));

        moonGroup = new THREE.Group();
        const moonGeo = new THREE.SphereGeometry(0.7, 24, 24);
        const moonMat = new THREE.MeshStandardMaterial({ map: moonTex, roughness: 0.4, emissive: 0x111111 });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.userData = { planetName: 'Moon' };
        moonMesh.position.set(-3.4, 0, 1.2);
        moonGroup.add(moonMesh);
        planetMeshesList.push(moonMesh);
        pGroup.add(moonGroup);
      }

      if (p.isSaturn) {
        const ringGeo = new THREE.RingGeometry(p.size * 1.4, p.size * 2.8, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          map: saturnRingTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
        });
        const saturnRing = new THREE.Mesh(ringGeo, ringMat);
        saturnRing.rotation.x = Math.PI / 2.8;
        pGroup.add(saturnRing);
      }

      if (p.isUranus) {
        const uRingGeo = new THREE.RingGeometry(p.size * 1.3, p.size * 1.6, 48);
        const uRingMat = new THREE.MeshBasicMaterial({
          color: 0x93c5fd,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        });
        const uRing = new THREE.Mesh(uRingGeo, uRingMat);
        uRing.rotation.y = Math.PI / 2.5;
        pGroup.add(uRing);
      }

      pGroup.position.x = Math.cos(p.initAngle) * p.r;
      pGroup.position.z = Math.sin(p.initAngle) * p.r;

      solSystemGroup.add(pGroup);
      planetObjects.push({ group: pGroup, mesh: pMesh, moonGroup, r: p.r, speed: p.speed, angle: p.initAngle });
    });

    // 4. 3D ASTEROID BELT BETWEEN MARS & JUPITER
    const asteroidCount = 650;
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidPos = new Float32Array(asteroidCount * 3);
    const beltMinR = 32;
    const beltMaxR = 36;

    for (let a = 0; a < asteroidCount; a++) {
      const theta = Math.random() * Math.PI * 2;
      const r = beltMinR + Math.random() * (beltMaxR - beltMinR);
      const y = (Math.random() - 0.5) * 1.8;

      asteroidPos[a * 3] = Math.cos(theta) * r;
      asteroidPos[a * 3 + 1] = y;
      asteroidPos[a * 3 + 2] = Math.sin(theta) * r;
    }

    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
    const asteroidMat = new THREE.PointsMaterial({
      size: 0.65,
      color: 0xd1d5db,
      transparent: true,
      opacity: 0.8,
    });
    const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
    solSystemGroup.add(asteroidBelt);

    solSystemGroup.rotation.x = 0.55;
    scene.add(solSystemGroup);

    // 5. MAYANK GARG INTERACTIVE DRAG INCLINATION TILT HANDLER
    let isDragging = false;
    let startY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = (startY - e.clientY) * 0.005;
      solSystemGroup.rotation.x = Math.min(Math.max(solSystemGroup.rotation.x + deltaY, 0.1), 1.2);
      startY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    // 6. RAYCASTER FOR INTERACTIVE PLANET CLICKING
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseVec.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects(planetMeshesList, false);

      if (intersects.length > 0) {
        const targetName = intersects[0].object.userData?.planetName;
        if (targetName) {
          const liveData = getLiveAstrologicalStatus(systemMode === 'vedic' ? 'lahiri' : 'tropical');
          const found = liveData.find(p => p.name.toLowerCase() === targetName.toLowerCase());
          if (found) {
            setSelectedPlanet(found);
          }
        }
      }
    };

    if (interactive) {
      renderer.domElement.addEventListener('click', handleCanvasClick);
    }

    // 7. ANIMATION LOOP WITH START / PAUSE CONTROLS
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Sun Pulse
      const spritePulse = spriteScale * (1 + Math.sin(elapsedTime * 2.5) * 0.03);
      sunSprite.scale.set(spritePulse, spritePulse, 1);

      // Rotate Asteroid Belt
      asteroidBelt.rotation.y = elapsedTime * 0.05;

      // Orbit Planets if Playing
      if (isPlayingRef.current) {
        planetObjects.forEach(p => {
          // Mayank Garg orbit delta calculation (speed / 250)
          p.angle += (p.speed / 250) * delta;
          p.group.position.x = Math.cos(p.angle) * p.r;
          p.group.position.z = Math.sin(p.angle) * p.r;

          p.mesh.rotation.y += 0.8 * delta;

          if (p.moonGroup) {
            p.moonGroup.rotation.y += 2.5 * delta;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const mob = window.innerWidth <= 768;
      camera.fov = mob ? 60 : 40;
      camera.position.set(0, mob ? 22 : 16, mob ? 48 : 38);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        if (renderer.domElement) {
          renderer.domElement.removeEventListener('click', handleCanvasClick);
        }
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      sunGeo.dispose();
      sunMat.dispose();
      spriteMat.dispose();
      sunSpriteTex.dispose();
      asteroidGeo.dispose();
      asteroidMat.dispose();
      earthTex.dispose();
      jupiterTex.dispose();
      saturnTex.dispose();
      saturnRingTex.dispose();
      marsTex.dispose();
      neptuneTex.dispose();
      uranusTex.dispose();
      moonTex.dispose();
      renderer.dispose();
    };
  }, [interactive, systemMode, isFullBackground]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className={`inset-0 cursor-grab active:cursor-grabbing overflow-hidden ${
          isFullBackground ? 'fixed z-0 opacity-95' : 'absolute z-0'
        }`}
      />

      {/* MAYANK GARG INTERACTIVE CONTROLS (START / PAUSE & EPHEMERIS TICKER) */}
      <div className="absolute top-3 left-4 right-4 z-10 pointer-events-none flex items-center justify-between gap-2 overflow-x-auto custom-scrollbar pb-1">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 bg-slate-950/90 hover:bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-amber-400 transition-all shadow-lg cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" /> Pause Motion
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" /> Start Motion
              </>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 text-[11px] font-mono text-slate-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="text-slate-400">Drag vertical to tilt inclination</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {liveEphemeris.slice(0, 5).map((p) => (
            <button
              key={p.name}
              onClick={() => setSelectedPlanet(p)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${p.color} hover:scale-105 cursor-pointer`}
            >
              <span>{p.symbol}</span>
              <span>{p.name}:</span>
              <span className="font-bold">{p.sign}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CLICKED PLANET LIVE ASTROLOGICAL DETAILED MODAL CARD */}
      {selectedPlanet && (
        <div className="absolute bottom-4 left-6 z-20 pointer-events-auto bg-slate-950/95 backdrop-blur-xl p-4 rounded-2xl border border-amber-500/40 shadow-2xl max-w-sm text-left animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedPlanet.symbol}</span>
              <div>
                <h4 className="text-base font-bold font-display text-white">{selectedPlanet.name} Status</h4>
                <p className="text-xs font-mono text-amber-400 font-semibold">{selectedPlanet.sign}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-slate-400 hover:text-white text-xs bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between border-b border-slate-800/80 pb-1">
              <span className="text-slate-400 font-mono">Motion Speed:</span>
              <span className="font-bold text-emerald-400">{selectedPlanet.speed}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1">
              <span className="text-slate-400 font-mono">Astrological Dignity:</span>
              <span className="font-bold text-purple-300">{selectedPlanet.dignity}</span>
            </div>
            <div className="pt-1">
              <span className="text-slate-400 font-mono block mb-1">Personal Impact & Status:</span>
              <p className="text-[11px] leading-relaxed text-slate-200 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                {selectedPlanet.impact}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Universe3DCanvas;
