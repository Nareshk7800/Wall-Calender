"use client";

import React, { useEffect, useRef } from "react";

export default function RainEffect() {
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

    class Drop {
      x: number;
      y: number;
      vy: number;
      l: number;
      a: number;
      thickness: number;
      color: string;

      constructor(resetY = false) {
        this.x = Math.random() * width;
        this.y = resetY ? Math.random() * height * -1 : Math.random() * height;
        this.vy = 2 + Math.random() * 2; // Different speeds (light rainfall)
        this.l = 15 + Math.random() * 20; // Thin droplets
        this.a = 0.2 + Math.random() * 0.3; // Slight transparency
        this.thickness = 0.5 + Math.random() * 0.8;
        
        // Soft blues, light greys, faint white tones
        const colors = ["200, 215, 230", "220, 225, 230", "230, 240, 245", "180, 200, 215"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(ripples: Ripple[]) {
        this.y += this.vy;
        
        // Reach the bottom section of the calendar
        if (this.y > height - (10 + Math.random() * 40)) {
          // Softly generate ripple circles
          if (Math.random() > 0.4) {
            ripples.push(new Ripple(this.x, this.y));
          }
          // Seamless start from the top
          this.y = Math.random() * -100 - 50;
          this.x = Math.random() * width;
          this.vy = 2 + Math.random() * 2;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.l);
        ctx.strokeStyle = `rgba(${this.color}, ${this.a})`;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
      }
    }

    class Ripple {
      x: number;
      y: number;
      r: number;
      maxR: number;
      a: number;
      color: string;
      speed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = 1;
        this.maxR = 15 + Math.random() * 25; // Expands outward
        this.a = 0.3 + Math.random() * 0.3;
        this.speed = 0.2 + Math.random() * 0.2;
        
        const colors = ["200, 215, 230", "220, 225, 230"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.r += this.speed;
        this.a -= 0.006; // Fade smoothly
      }

      draw() {
        if (!ctx || this.a <= 0) return;
        ctx.beginPath();
        // Subtle minimal oval ripple mimicking water surface
        ctx.ellipse(this.x, this.y, this.r, this.r * 0.25, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${this.color}, ${Math.max(0, this.a)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Gentle rhythm: maintain a clean steady amount of particles
    const drops: Drop[] = Array.from({ length: 60 }, () => new Drop(false));
    let ripples: Ripple[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (const drop of drops) {
        drop.update(ripples);
        drop.draw();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.update();
        ripple.draw();
        
        if (ripple.a <= 0 || ripple.r >= ripple.maxR) {
          ripples.splice(i, 1);
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
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-70"
      // Soft blur to maintain refined visual quality
      style={{ filter: "blur(0.8px)" }} 
    />
  );
}
