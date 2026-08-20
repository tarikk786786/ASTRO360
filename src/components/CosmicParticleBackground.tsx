import React from 'react';

/**
 * Static Cosmic Deep-Space Background
 * Pure CSS with zero continuous canvas animation loops for 0% CPU / battery overhead and maximum UI clarity.
 */
export default function CosmicParticleBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* 🌌 DEEP SPACE NEBULA BACKDROP */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen brightness-100 contrast-105 pointer-events-none"
        style={{
          backgroundImage: `url('/cosmic-nebula-bg.jpg')`,
        }}
      />

      {/* VOLUMETRIC STELLAR GRADIENTS */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040711]/95 via-[#070b19]/80 to-[#040711]/95" />
      <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-cyan-500/[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] rounded-full bg-purple-600/[0.07] blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full bg-[#C9A86A]/[0.05] blur-[130px] pointer-events-none" />

      {/* STATIC CELESTIAL STARDUST GRID */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, rgba(56, 189, 248, 0.8), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 90px 40px, rgba(201, 168, 106, 0.9), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 160px 120px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 230px 190px, rgba(129, 140, 248, 0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 290px 80px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 340px 240px, rgba(201, 168, 106, 0.7), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 420px 160px, rgba(56, 189, 248, 0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 500px 310px, #ffffff, rgba(0,0,0,0))
          `,
          backgroundSize: '550px 550px',
        }}
      />
    </div>
  );
}
