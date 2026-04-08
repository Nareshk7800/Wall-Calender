"use client";

import React, { useEffect, useRef } from "react";

export default function NovemberColdFogEffect() {
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
    };
    
    window.addEventListener("resize", resize);
    resize();

    // -- Early Winter Cold Fog --
    class FrostFog {
      x: number;
      y: number;
      radius: number;
      vx: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;
      pulseAngle: number;
      colorIndex: number;

      constructor(startX?: number) {
        this.x = startX ?? Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 150 + Math.random() * 250; // Vast smooth fog patches
        // Very lazy, gentle horizontal drift
        this.vx = 0.05 + Math.random() * 0.15;
        
        this.maxOpacity = 0.03 + Math.random() * 0.04; // Low contrast
        this.opacity = Math.random() * this.maxOpacity;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.001 + Math.random() * 0.002;
        this.colorIndex = Math.floor(Math.random() * 3);
      }

      update() {
        this.x += this.vx;

        // Wrap around smoothly
        if (this.x - this.radius > width) {
          this.x = -this.radius;
          this.y = Math.random() * height;
        }

        // Slow smooth breathing effect (cinematic lighting feel)
        this.pulseAngle += this.pulseSpeed;
        this.opacity = (Math.sin(this.pulseAngle) + 1) / 2 * this.maxOpacity;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Cold mist cool tones: ice blue, silver gray, soft white
        const colors = [
          `rgba(215, 225, 235, ${this.opacity})`, // ice blueish grey
          `rgba(230, 235, 240, ${this.opacity})`, // soft white
          `rgba(190, 200, 215, ${this.opacity})`  // silver grey
        ];

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, colors[this.colorIndex]);
        gradient.addColorStop(0.5, `rgba(200, 210, 225, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(180, 190, 210, 0)`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // -- Tiny Mist Shimmer Particles --
    class ShimmerParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      pulseAngle: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 0.5 + Math.random() * 1.5; // Tiny
        
        // Drifting slowly up or diagonally
        this.vx = -0.1 + Math.random() * 0.2;
        this.vy = -0.05 - Math.random() * 0.15;
        
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.opacity = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Reset if drifted far off screen
        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }

        // Shimmer softly
        this.pulseAngle += this.pulseSpeed;
        this.opacity = (Math.sin(this.pulseAngle) + 1) / 2 * 0.4; // Max 40% opacity
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Soft white glow point
        ctx.fillStyle = `rgba(240, 245, 255, ${this.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(240, 245, 255, ${this.opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const fogLayers = Array.from({ length: 15 }, () => new FrostFog());
    const shimmerParticles = Array.from({ length: 60 }, () => new ShimmerParticle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render cold fog layers
      for (const fog of fogLayers) {
        fog.update();
        fog.draw(ctx);
      }

      // Render delicate mist shimmers
      for (const p of shimmerParticles) {
        p.update();
        p.draw(ctx);
      }

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
      className="absolute inset-0 pointer-events-none z-0 opacity-80 mix-blend-screen"
      // Added blur to create cinematic frosted ambiance
      style={{ filter: "blur(2px)" }}
    />
  );
}
