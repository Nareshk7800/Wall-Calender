"use client";

import React, { useEffect, useRef } from "react";

export default function FogRainEffect() {
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

    // -- Rain Drops --
    class RainDrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      thickness: number;

      constructor(startY?: number) {
        this.x = Math.random() * width;
        this.y = startY ?? Math.random() * height;
        this.length = 10 + Math.random() * 15; // thin, subtle
        this.speed = 1.5 + Math.random() * 2; // falling vertically, varying speeds
        this.opacity = 0.15 + Math.random() * 0.2; // slight transparency
        this.thickness = 0.5 + Math.random() * 0.5;
      }

      update() {
        this.y += this.speed;
        if (this.y > height + this.length) {
          this.y = -this.length;
          this.x = Math.random() * width;
          this.speed = 1.5 + Math.random() * 2;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = `rgba(200, 210, 220, ${this.opacity})`;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
      }
    }

    // -- Fog Particles --
    class FogParticle {
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
        this.radius = 80 + Math.random() * 120; // large, diffused
        // drifting horizontally with slight vertical var
        this.vx = 0.1 + Math.random() * 0.3; // slow horizontal drift
        this.vy = -0.05 + Math.random() * 0.1; // slight vertical drift
        
        this.maxOpacity = 0.03 + Math.random() * 0.04; // semi-transparent
        this.opacity = Math.random() * this.maxOpacity;
        this.growSpeed = 0.0001 + Math.random() * 0.0002;
        this.shrinking = Math.random() > 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around horizontally
        if (this.x - this.radius > width) {
          this.x = -this.radius;
          this.y = Math.random() * height;
        }
        
        // Wrap vertically if drifts too far
        if (this.y + this.radius < 0) {
          this.y = height + this.radius;
        } else if (this.y - this.radius > height) {
          this.y = -this.radius;
        }

        // Pulse opacity slightly
        if (this.shrinking) {
          this.opacity -= this.growSpeed;
          if (this.opacity <= 0) {
            this.shrinking = false;
            this.opacity = 0;
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
        
        // Soft mist: cool muted greys and bluish tones
        gradient.addColorStop(0, `rgba(230, 235, 240, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(200, 210, 220, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(180, 190, 200, 0)`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const raindrops = Array.from({ length: 80 }, () => new RainDrop());
    const fogParticles = Array.from({ length: 15 }, () => new FogParticle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Fog layer first (background mist)
      for (const fog of fogParticles) {
        fog.update();
        fog.draw();
      }

      // Draw Rain layer (front)
      for (const drop of raindrops) {
        drop.update();
        drop.draw();
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
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-90"
      // Soft blur to blend the layers naturally
      style={{ filter: "blur(1px)" }} 
    />
  );
}
