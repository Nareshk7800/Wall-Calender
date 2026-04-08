"use client";

import React, { useEffect, useState } from "react";

export default function FlowerEffect({ currentDate }: { currentDate: Date }) {
  const [petals, setPetals] = useState<{ id: number; left: string; animationDuration: string; swayDuration: string; delay: string; scale: number; rotation: string; color: string }[]>([]);

  useEffect(() => {
    // Generate falling cherry blossom petals
    const arr = [];
    const colors = ["#FFD1DC", "#FDE0E9", "#FAE5F2", "#FFF0F5", "#FFE4E1"]; // Soft pinks, peach, subtle white tones
    for (let i = 0; i < 35; i++) {
        arr.push({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 8 + 8}s`, // Slow, peaceful fall
            swayDuration: `${Math.random() * 4 + 3}s`,
            delay: `${Math.random() * 10}s`,
            scale: Math.random() * 0.5 + 0.3, // Delicate size
            rotation: `${Math.random() * 360}deg`,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
    setPetals(arr);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-br-xl xl:rounded-tr-sm z-30">
      <style>{`
        @keyframes floatDown {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          80% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes sway {
          0%, 100% { margin-left: 0px; }
          50% { margin-left: 20px; }
        }
      `}</style>
      
      {/* Falling Cherry Blossom Petals */}
      {petals.map((p) => (
        <div
            key={p.id}
            className="absolute -top-10 origin-center"
            style={{
                left: p.left,
                opacity: 0,
                animation: `floatDown ${p.animationDuration} linear infinite, sway ${p.swayDuration} ease-in-out infinite alternate`,
                animationDelay: `${p.delay}, 0s`,
                transform: `scale(${p.scale}) rotate(${p.rotation})`,
            } as React.CSSProperties}
        >
            {/* Simple elegant petal shape */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill={p.color} opacity={0.8} style={{ filter: 'drop-shadow(0 2px 2px rgba(255,182,193,0.3))' }}>
              <path d="M12 2C8 6 6 12 12 22C18 12 16 6 12 2Z" />
            </svg>
        </div>
      ))}
    </div>
  );
}
