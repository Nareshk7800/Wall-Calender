"use client";

import React, { useEffect, useRef } from "react";

export default function AugustFogGlowEffect() {
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

    // -- Fog Layer --
    class DenseFog {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      maxOpacity: number;
      growSpeed: number;
      shrinking: boolean;

      constructor(startX?: number) {
        this.x = startX ?? Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 120 + Math.random() * 200; // Larger and denser than July's light mist
        // Drifting horizonally with slight vertical variation
        this.vx = 0.08 + Math.random() * 0.2;
        this.vy = -0.04 + Math.random() * 0.08;
        
        this.maxOpacity = 0.05 + Math.random() * 0.06; // Slightly denser
        this.opacity = Math.random() * this.maxOpacity;
        this.growSpeed = 0.0001 + Math.random() * 0.0002;
        this.shrinking = Math.random() > 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrapping
        if (this.x - this.radius > width) {
          this.x = -this.radius;
          this.y = Math.random() * height;
        }
        if (this.y + this.radius < 0) {
          this.y = height + this.radius;
        } else if (this.y - this.radius > height) {
          this.y = -this.radius;
        }

        // Pulse opacity
        if (this.shrinking) {
          this.opacity -= this.growSpeed;
          if (this.opacity <= 0.01) {
            this.shrinking = false;
          }
        } else {
          this.opacity += this.growSpeed;
          if (this.opacity >= this.maxOpacity) {
            this.shrinking = true;
          }
        }
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        // Cool muted palette with soft greys and bluish tones
        gradient.addColorStop(0, `rgba(215, 225, 235, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(180, 195, 210, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(150, 160, 175, 0)`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // -- Floating Glow Particles --
    class GlowParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 1 + Math.random() * 3; // Small varying sizes
        // Random gentle motion simulating moisture
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3 - 0.1; // Slight upward tendency
        
        this.maxOpacity = 0.2 + Math.random() * 0.4;
        this.opacity = Math.random() * this.maxOpacity;
        this.pulseSpeed = 0.002 + Math.random() * 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around smoothly
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Sine wave for smooth pulsing opacity (faint white highlights)
        this.opacity = (Math.sin(Date.now() * this.pulseSpeed + this.x) + 1) / 2 * this.maxOpacity;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 252, 255, ${this.opacity})`;
        // Slight glow/blur handled inherently by drawing small semi-transparent circles
        // We can add soft halo directly:
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const fogLayers = Array.from({ length: 20 }, () => new DenseFog());
    const glowParticles = Array.from({ length: 70 }, () => new GlowParticle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dense fog patches first
      for (const fog of fogLayers) {
        fog.update();
        fog.draw();
      }

      // Draw subtle glow particles (light reflections)
      for (const particle of glowParticles) {
        particle.update();
        particle.draw();
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
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-95"
      // Added blur to blend everything seamlessly
      style={{ filter: "blur(1.5px)" }} 
    />
  );
}
