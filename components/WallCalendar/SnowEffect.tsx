"use client";

import React, { useEffect, useState } from "react";

export default function SnowEffect({ currentDate }: { currentDate: Date }) {
  const [particles, setParticles] = useState<{ id: number; left: string; animationDuration: string; delay: string; opacity: number; size: number }[]>([]);

  useEffect(() => {
    // Generate random snow particles
    const arr = [];
    for (let i = 0; i < 40; i++) {
        arr.push({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 4 + 4}s`,
            delay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.6 + 0.2,
            size: Math.random() * 6 + 2 // px
        });
    }
    setParticles(arr);
  }, []);

  const dayOfMonth = currentDate.getDate();
  // Calculate accumulation height (max around 60px on the 31st)
  // Day-wise accumulation!
  const accumulationHeight = Math.min((dayOfMonth / 31) * 60, 60);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-br-xl xl:rounded-tr-sm z-30">
      <style>{`
        @keyframes fallAndSway {
          0% { transform: translateY(-20px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(50vh) translateX(15px) rotate(180deg); }
          100% { transform: translateY(100vh) translateX(-10px) rotate(360deg); }
        }
        @keyframes drift {
          0% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
          100% { transform: translateX(0px); }
        }
      `}</style>
      
      {/* Falling Snow */}
      {particles.map((p) => (
        <div
            key={p.id}
            className="absolute -top-10 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            style={{
                left: p.left,
                width: p.size + 'px',
                height: p.size + 'px',
                opacity: p.opacity,
                animation: `fallAndSway ${p.animationDuration} linear infinite`,
                animationDelay: p.delay,
            }}
        />
      ))}

      {/* Accumulated Snow Pile on the bottom of the calendar frame */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-white/80 transition-all duration-[2000ms] ease-out shadow-[0_-4px_15px_rgba(255,255,255,0.5)]"
        style={{
            height: accumulationHeight + 'px',
            borderTopLeftRadius: '30% 10px',
            borderTopRightRadius: '20% 15px',
            opacity: accumulationHeight > 0 ? 0.95 : 0
        }}
      >
        <div className="absolute -top-2 left-1/4 right-1/4 h-4 bg-white rounded-[100%] opacity-80 blur-[2px]" />
      </div>
    </div>
  );
}
