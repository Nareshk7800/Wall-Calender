"use client";

import React, { useEffect, useRef } from "react";

export default function OctoberDiwaliEffect() {
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

    // Utility: Warm color randomizer
    const getRandomFestiveColor = () => {
      const colors = [
        "255, 209, 102",  // Gold / yellow (accent)
        "255, 122, 47",   // Festive orange (primary)
        "255, 170, 50",   // Soft orange
        "232, 67, 147",   // Pinkish hint
        "255, 230, 150"   // Bright soft yellow
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
      friction: number;
      gravity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        
        // Circular explosion radiation
        const angle = Math.random() * Math.PI * 2;
        // Soft controlled bursts (low speed)
        const speed = Math.random() * 2 + 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.color = getRandomFestiveColor();
        this.size = Math.random() * 2 + 0.5; // Small, refined
        this.life = 0;
        this.maxLife = 60 + Math.random() * 40; // Fade out smoothly
        this.friction = 0.94; // Slow down naturally
        this.gravity = 0.02; // Very slight droop
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.life++;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const remainingLife = Math.max(0, 1 - this.life / this.maxLife);
        
        ctx.save();
        ctx.globalAlpha = remainingLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${this.color})`;
        
        // Slight glow
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgb(${this.color})`;
        
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      particles: Particle[];
      isDead: boolean;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.isDead = false;
        
        // Create an elegant burst
        const particleCount = 40 + Math.random() * 20;
        for (let i = 0; i < particleCount; i++) {
          this.particles.push(new Particle(this.x, this.y));
        }
      }

      update() {
        this.isDead = true;
        for (const p of this.particles) {
          p.update();
          if (p.life < p.maxLife) {
            this.isDead = false;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Use lighten blend mode for vibrant overlapping glows without whitening everything
        ctx.globalCompositeOperation = "screen";
        for (const p of this.particles) {
          p.draw(ctx);
        }
        ctx.globalCompositeOperation = "source-over"; // reset
      }
    }

    class Sparkle {
      x: number;
      y: number;
      size: number;
      pulseRate: number;
      phase: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.pulseRate = 0.01 + Math.random() * 0.03;
        this.phase = Math.random() * Math.PI * 2;
        this.color = getRandomFestiveColor();
      }

      update() {
        this.phase += this.pulseRate;
        // Float very subtly
        this.y -= 0.1;
        if (this.y < 0) this.y = height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = (Math.sin(this.phase) + 1) / 2 * 0.6; // max 60% opacity to remain subtle background
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${opacity})`;
        ctx.fill();
      }
    }

    let fireworks: Firework[] = [];
    const backgroundSparkles = Array.from({ length: 40 }, () => new Sparkle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background sparkles (twinkling)
      for (const sparkle of backgroundSparkles) {
        sparkle.update();
        sparkle.draw(ctx);
      }

      // Occasionally launch a firecracker burst
      // Natural spacing -> probability is quite low
      if (Math.random() < 0.015) { // Roughly 1 burst per second on average at 60fps
        // Primarily near top and sides
        let rx = Math.random() * width;
        // force to sides if it's in the middle
        if (rx > width * 0.25 && rx < width * 0.75) {
            rx = Math.random() > 0.5 ? Math.random() * width * 0.25 : width - Math.random() * width * 0.25;
        }
        const ry = Math.random() * height * 0.5; // Top half
        fireworks.push(new Firework(rx, ry));
      }

      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.update();
        fw.draw(ctx);
        if (fw.isDead) {
          fireworks.splice(i, 1);
        }
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
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
      style={{ filter: "blur(0.4px)" }}
    />
  );
}
