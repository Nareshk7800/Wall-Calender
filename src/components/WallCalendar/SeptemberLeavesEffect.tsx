"use client";

import React, { useEffect, useRef } from "react";

export default function SeptemberLeavesEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let globalWind = 0;

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", resize);
    resize();

    class Leaf {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      spinSpeed: number;
      swayOffset: number;
      swaySpeed: number;
      color: string;
      opacity: number;
      windFactor: number;

      constructor(resetY = false) {
        this.x = Math.random() * width;
        this.y = resetY ? -50 - Math.random() * 100 : Math.random() * height;
        this.size = 12 + Math.random() * 14; 
        
        // Gentle downward fall
        this.speedY = 0.5 + Math.random() * 1.2;
        // Natural drift
        this.speedX = -0.5 + Math.random() * 1.5;
        
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() - 0.5) * 0.04; // Slow rotation
        
        this.swayOffset = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.01 + Math.random() * 0.02; // Sway side to side
        
        this.opacity = 0.6 + Math.random() * 0.3;
        this.windFactor = 0.5 + Math.random() * 0.8;

        // Natural color palette: soft greens, light yellows, subtle earthy tones
        const colors = [
          "122, 148, 101", // calm green
          "154, 143, 122", // earthy tone
          "180, 190, 130", // light greenish yellow
          "95, 122, 79",   // deeper nature
          "210, 205, 160"  // soft yellow/gold
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        // Sway calculation + global wind drift
        const currentSway = Math.sin(this.swayOffset) * 0.5;
        this.x += this.speedX + currentSway + (globalWind * this.windFactor);
        
        this.angle += this.spinSpeed;
        this.swayOffset += this.swaySpeed;

        // Wrap around smoothly when leaving bounds
        if (this.y > height + this.size) {
          this.reset(true);
        }
        if (this.x > width + this.size) {
          this.x = -this.size;
        } else if (this.x < -this.size) {
          this.x = width + this.size;
        }
      }

      reset(top: boolean) {
        this.y = top ? -this.size * 2 : height + this.size * 2;
        this.x = Math.random() * width;
        this.speedY = 0.5 + Math.random() * 1.2;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Soft shadow/blur to blend seamlessly
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(0, 0, 0, ${this.opacity * 0.2})`;

        ctx.beginPath();
        // Drawing a smooth, organic leaf shape
        ctx.moveTo(0, -this.size / 2);
        ctx.bezierCurveTo(this.size / 2, -this.size / 3, this.size / 2, this.size / 3, 0, this.size / 2);
        ctx.bezierCurveTo(-this.size / 2, this.size / 3, -this.size / 2, -this.size / 3, 0, -this.size / 2);
        
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
        
        // Leaf center vein for subtle detail
        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2 + 2);
        ctx.lineTo(0, this.size / 2 - 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }
    }

    // Not too overcrowded (maintain clean UI)
    const leaves = Array.from({ length: 35 }, () => new Leaf(false));

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.005;
      // Gentle global wind drift that waves back and forth smoothly
      globalWind = Math.sin(time) * 0.8 + 0.2; // slightly biased towards right

      for (const leaf of leaves) {
        leaf.update();
        leaf.draw();
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
      className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-80"
      style={{ filter: "blur(0.5px)" }}
    />
  );
}
