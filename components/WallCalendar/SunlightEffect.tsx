"use client";

import React, { useEffect, useState } from "react";

export default function SunlightEffect() {
  const [particles, setParticles] = useState<{ id: number; left: string; top: string; size: number; animationDuration: string; delay: string; opacity: number }[]>([]);

  useEffect(() => {
    // Generate soft glowing dust particles
    const arr = [];
    for (let i = 0; i < 40; i++) {
        arr.push({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 6 + 3, // slightly larger, 3px to 9px
            animationDuration: `${Math.random() * 15 + 10}s`, // slow floating
            delay: `-${Math.random() * 15}s`,
            opacity: Math.random() * 0.5 + 0.2, // brighter glow
        });
    }
    setParticles(arr);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-br-xl xl:rounded-tr-sm z-30">
      <style>{`
        @keyframes floatDustEnhanced {
          0% { transform: translate(0px, 0px) scale(0.8); opacity: 0; }
          20% { opacity: var(--max-op); }
          50% { transform: translate(40px, -60px) scale(1.2); }
          80% { opacity: var(--max-op); }
          100% { transform: translate(80px, -120px) scale(0.8); opacity: 0; }
        }
        @keyframes pulseRayEnhanced {
          0% { opacity: 0.4; transform: scale(1) rotate(-15deg); }
          50% { opacity: 0.7; transform: scale(1.05) rotate(-13deg); }
          100% { opacity: 0.4; transform: scale(1) rotate(-15deg); }
        }
      `}</style>
      
      {/* Primary Sunbeam from top-left */}
      <div 
        className="absolute -top-[30%] -left-[20%] w-[200%] h-[80%] origin-top-left pointer-events-none mix-blend-screen"
        style={{
          background: 'linear-gradient(105deg, rgba(255, 220, 150, 0.6) 0%, rgba(255, 180, 100, 0.15) 35%, transparent 60%)',
          filter: 'blur(40px)',
          animation: 'pulseRayEnhanced 12s ease-in-out infinite'
        }}
      />

      {/* Secondary Sunbeam */}
      <div 
        className="absolute -top-[10%] left-[10%] w-[150%] h-[70%] origin-top-left pointer-events-none mix-blend-overlay"
        style={{
          background: 'linear-gradient(110deg, rgba(255, 240, 200, 0.4) 0%, rgba(255, 200, 120, 0.1) 40%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'pulseRayEnhanced 9s ease-in-out infinite alternate-reverse'
        }}
      />
      
      {/* Warm Ambient Glow at top */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-orange-300/20 to-transparent mix-blend-plus-lighter pointer-events-none" />

      {/* Floating Dust Particles */}
      {particles.map((p) => (
        <div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-tr from-[#FFF6D5] to-orange-200 shadow-[0_0_8px_rgba(255,200,100,0.8)]"
            style={{
                left: p.left,
                top: p.top,
                width: p.size + 'px',
                height: p.size + 'px',
                '--max-op': p.opacity,
                opacity: 0,
                filter: 'blur(1px)',
                animation: `floatDustEnhanced ${p.animationDuration} linear infinite`,
                animationDelay: p.delay,
            } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
