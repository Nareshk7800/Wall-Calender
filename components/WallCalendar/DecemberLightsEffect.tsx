"use client";

import React, { useEffect, useRef } from "react";

export default function DecemberLightsEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initBulbs();
    };

    // Festive glow colors (warm white, golden yellow, faint red)
    const bulbColors = [
      "255, 250, 240", // warm white
      "255, 215, 0",   // golden yellow
      "255, 180, 100", // warm gold
      "255, 100, 100", // faint red/pinkish
    ];

    class Bulb {
      x: number;
      y: number;
      color: string;
      phase: number;
      pulseSpeed: number;
      size: number;
      maxOpacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.color = bulbColors[Math.floor(Math.random() * bulbColors.length)];
        this.phase = Math.random() * Math.PI * 2;
        // Slow cinematic pulse (no harsh flickering)
        this.pulseSpeed = 0.005 + Math.random() * 0.01;
        this.size = 2 + Math.random() * 1.5;
        this.maxOpacity = 0.6 + Math.random() * 0.4;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const currentOpacity = (Math.sin(this.phase + time * this.pulseSpeed) + 1) / 2 * this.maxOpacity;
        
        ctx.save();
        // Bulb core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8 + 0.2})`; // Always slightly lit
        
        // Gentle bloom / glow spread
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.color}, ${currentOpacity})`;
        ctx.fill();

        // Extra soft diffusion layer for premium atmospheric look
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${currentOpacity * 0.15})`;
        ctx.fill();

        ctx.restore();
      }
    }

    let bulbs: Bulb[] = [];
    
    // Natural wire curve control points
    let wirePoints: { x: number, y: number }[] = [];

    const initBulbs = () => {
      bulbs = [];
      wirePoints = [];
      
      const segments = Math.max(3, Math.floor(width / 300));
      
      // Starting point of wire
      wirePoints.push({ x: -50, y: 30 });
      
      for (let i = 1; i <= segments; i++) {
        const targetX = width * (i / segments);
        wirePoints.push({ 
          x: targetX, 
          // Natural droop in the middle of segments
          y: 20 + Math.random() * 30 + (i % 2 === 0 ? 0 : 40)
        });
      }
      // End point
      wirePoints.push({ x: width + 50, y: 30 });

      // Add bulbs along the approximated curve
      const totalBulbs = Math.floor(width / 40); // 1 bulb roughly every 40px
      
      for (let i = 0; i < totalBulbs; i++) {
        const t = i / totalBulbs;
        const xPos = width * t;
        
        // Simple approximation for droop logic based on distance to segment endpoints
        const segmentSize = width / segments;
        const segmentIndex = Math.floor(xPos / segmentSize);
        const segmentT = (xPos % segmentSize) / segmentSize;
        
        // Parabolic droop equation
        const droop = Math.sin(segmentT * Math.PI) * 40; 
        
        // Linear interpolation between the anchor points
        const startY = wirePoints[segmentIndex]?.y || 30;
        const endY = wirePoints[segmentIndex + 1]?.y || 30;
        const baseLineY = startY + (endY - startY) * segmentT;
        
        const yPos = baseLineY + droop;
        
        bulbs.push(new Bulb(xPos, yPos));
      }
    };

    window.addEventListener("resize", resize);
    resize();

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Draw thin, slightly visible wire
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-50, 30);
      
      const segments = Math.max(3, Math.floor(width / 300));
      const segmentSize = width / segments;
      
      for (let x = 0; x <= width + 50; x += 10) {
        const segmentIndex = Math.floor(x / segmentSize);
        const segmentT = (x % segmentSize) / segmentSize;
        const droop = Math.sin(segmentT * Math.PI) * 40;
        
        const startY = wirePoints[segmentIndex]?.y || 30;
        const endY = wirePoints[segmentIndex + 1]?.y || 30;
        const baseLineY = startY + (endY - startY) * segmentT;
        
        ctx.lineTo(x, baseLineY + droop);
      }
      
      ctx.strokeStyle = "rgba(40, 50, 70, 0.4)"; // subtle dark wire integrating with night sky
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Draw bulbs
      // Use lighten blend mode for realistic luminous overlapping
      ctx.globalCompositeOperation = "screen";
      for (const bulb of bulbs) {
        bulb.draw(ctx, time);
      }
      ctx.globalCompositeOperation = "source-over";

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
