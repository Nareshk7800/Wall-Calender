"use client";

import React, { useEffect, useState } from "react";

export default function FogEffect() {
  const [mistClouds, setMistClouds] = useState<{ id: number; top: string; delay: string; duration: string; scale: number; opacity: number; yOffset: string }[]>([]);

  useEffect(() => {
    // Generate soft, wide mist blobs moving left to right
    const arr = [];
    for (let i = 0; i < 15; i++) {
        arr.push({
            id: i,
            top: `${Math.random() * 100}%`,
            delay: `-${Math.random() * 20}s`, // start off-cycle
            duration: `${Math.random() * 25 + 20}s`, // extremely slow (20-45s)
            scale: Math.random() * 2 + 1, // large horizontal stretch
            opacity: Math.random() * 0.15 + 0.05, // very faint, max 0.2
            yOffset: `${Math.random() * 60 - 30}px`,
        });
    }
    setMistClouds(arr);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-br-xl xl:rounded-tr-sm z-30">
      <style>{`
        @keyframes driftFog {
          0% { transform: translateX(-150%) translateY(0px) scaleX(var(--h-scale)); opacity: 0; }
          10% { opacity: var(--fog-op); }
          50% { transform: translateX(0%) translateY(var(--y-off)) scaleX(calc(var(--h-scale) * 1.5)); }
          90% { opacity: var(--fog-op); }
          100% { transform: translateX(150%) translateY(0px) scaleX(var(--h-scale)); opacity: 0; }
        }
      `}</style>
      
      {/* Background hazy overlay base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D6E4EC]/10 via-[#F4F9FB]/10 to-transparent pointer-events-none mix-blend-screen" />

      {/* Drifting Mist Clouds */}
      {mistClouds.map((mc) => (
        <div
            key={mc.id}
            className="absolute -left-1/4 w-[150%] h-[150px] bg-gradient-to-b from-transparent via-[#87C6E3] to-transparent rounded-full blur-[40px] mix-blend-screen"
            style={{
                top: mc.top,
                opacity: 0,
                '--fog-op': mc.opacity,
                '--h-scale': mc.scale,
                '--y-off': mc.yOffset,
                animation: `driftFog ${mc.duration} ease-in-out infinite`,
                animationDelay: mc.delay,
            } as React.CSSProperties}
        />
      ))}
      
      {/* Additional front-layer crisp white mist */}
      {mistClouds.slice(0, 5).map((mc, idx) => (
        <div
            key={`front-${mc.id}`}
            className="absolute -left-1/4 w-[100%] h-[80px] bg-gradient-to-b from-transparent via-[#ffffff] to-transparent rounded-full blur-[30px] mix-blend-screen"
            style={{
                top: `${(idx + 1) * 15}%`,
                opacity: 0,
                '--fog-op': mc.opacity * 1.5,
                '--h-scale': mc.scale * 0.8,
                '--y-off': `${parseInt(mc.yOffset) * -1}px`,
                animation: `driftFog ${parseInt(mc.duration) * 0.8}s ease-in-out infinite reverse`,
                animationDelay: mc.delay,
            } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
