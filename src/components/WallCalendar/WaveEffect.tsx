"use client";

import React from "react";

export default function WaveEffect() {
  const waveSvg1 = `data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0 60 C300 120 300 0 600 60 C900 120 900 0 1200 60 L1200 120 L0 120 Z' fill='%23fff'/%3E%3C/svg%3E`;
  const waveSvg2 = `data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0 60 C300 0 300 120 600 60 C900 0 900 120 1200 60 L1200 120 L0 120 Z' fill='%23fff'/%3E%3C/svg%3E`;
  const waveSvg3 = `data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0 80 C200 20 400 120 600 80 C800 20 1000 120 1200 80 L1200 120 L0 120 Z' fill='%23fff'/%3E%3C/svg%3E`;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-br-xl xl:rounded-tr-sm z-30 flex items-end">
      <style>{`
        @keyframes slideWaveLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      <div className="relative w-full h-24 blur-[1px]">
        {/* Back dark wave */}
        <div 
          className="absolute bottom-0 left-0 w-[200%] h-16 opacity-30"
          style={{
            background: '#3F8FB1',
            maskImage: `url("${waveSvg1}")`,
            WebkitMaskImage: `url("${waveSvg1}")`,
            maskSize: '50% 100%',
            WebkitMaskSize: '50% 100%',
            maskRepeat: 'repeat-x',
            WebkitMaskRepeat: 'repeat-x',
            animation: 'slideWaveLeft 15s linear infinite'
          }}
        />

        {/* Middle soft cyan wave */}
        <div 
          className="absolute bottom-0 left-0 w-[200%] h-12 opacity-50 mix-blend-screen"
          style={{
            background: '#87C6E3',
            maskImage: `url("${waveSvg2}")`,
            WebkitMaskImage: `url("${waveSvg2}")`,
            maskSize: '50% 100%',
            WebkitMaskSize: '50% 100%',
            maskRepeat: 'repeat-x',
            WebkitMaskRepeat: 'repeat-x',
            animation: 'slideWaveLeft 10s linear infinite'
          }}
        />
        
        {/* Front deep aqua wave */}
        <div 
          className="absolute bottom-0 left-0 w-[200%] h-[30px] opacity-80"
          style={{
            background: 'linear-gradient(to bottom, #5FAF6B, #3F8FB1)',
            maskImage: `url("${waveSvg3}")`,
            WebkitMaskImage: `url("${waveSvg3}")`,
            maskSize: '50% 100%',
            WebkitMaskSize: '50% 100%',
            maskRepeat: 'repeat-x',
            WebkitMaskRepeat: 'repeat-x',
            animation: 'slideWaveLeft 6s linear infinite'
          }}
        />
      </div>
    </div>
  );
}
