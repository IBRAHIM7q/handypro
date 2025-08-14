"use client";

import { useEffect, useRef } from "react";

export default function AnimatedLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Animation variables
    let animationFrameId: number;
    let rotation = 0;

    // Colors based on the logo
    const colors = {
      primary: "#64748B", // Slate-500
      secondary: "#6B7280", // Gray-500
      accent: "#71717A", // Zinc-500
      background: "#000000", // Black
      text: "#FFFFFF", // White
    };

    // Draw phone shape
    const drawPhone = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Phone body
      ctx.fillStyle = colors.background;
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-size/2, -size*0.8, size, size*1.6, size*0.1);
      ctx.fill();
      ctx.stroke();

      // Screen
      ctx.fillStyle = colors.secondary;
      ctx.beginPath();
      ctx.roundRect(-size*0.4, -size*0.6, size*0.8, size*1.2, size*0.05);
      ctx.fill();

      // Home button
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(0, size*0.65, size*0.08, 0, Math.PI * 2);
      ctx.fill();

      // Speaker
      ctx.fillStyle = colors.background;
      ctx.beginPath();
      ctx.roundRect(-size*0.15, -size*0.7, size*0.3, size*0.05, size*0.025);
      ctx.fill();

      // Wings
      ctx.fillStyle = colors.primary;
      
      // Left wing
      ctx.beginPath();
      ctx.moveTo(-size*0.6, -size*0.2);
      ctx.lineTo(-size*1.2, -size*0.5);
      ctx.lineTo(-size*1.2, size*0.1);
      ctx.lineTo(-size*0.6, size*0.2);
      ctx.closePath();
      ctx.fill();

      // Right wing
      ctx.beginPath();
      ctx.moveTo(size*0.6, -size*0.2);
      ctx.lineTo(size*1.2, -size*0.5);
      ctx.lineTo(size*1.2, size*0.1);
      ctx.lineTo(size*0.6, size*0.2);
      ctx.closePath();
      ctx.fill();

      // Wing details
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      
      // Left wing details
      ctx.beginPath();
      ctx.moveTo(-size*0.8, -size*0.3);
      ctx.lineTo(-size*1.0, -size*0.4);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(-size*0.8, 0);
      ctx.lineTo(-size*1.0, 0);
      ctx.stroke();

      // Right wing details
      ctx.beginPath();
      ctx.moveTo(size*0.8, -size*0.3);
      ctx.lineTo(size*1.0, -size*0.4);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(size*0.8, 0);
      ctx.lineTo(size*1.0, 0);
      ctx.stroke();

      // Tools inside phone
      ctx.fillStyle = colors.text;
      
      // Wrench
      ctx.save();
      ctx.translate(-size*0.15, -size*0.2);
      ctx.rotate(Math.PI/4);
      ctx.fillRect(-size*0.03, -size*0.15, size*0.06, size*0.3);
      ctx.fillRect(-size*0.15, -size*0.03, size*0.3, size*0.06);
      ctx.restore();

      // Gear
      ctx.beginPath();
      ctx.arc(size*0.15, size*0.1, size*0.1, 0, Math.PI * 2);
      ctx.fill();
      
      // Gear teeth
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.save();
        ctx.translate(size*0.15, size*0.1);
        ctx.rotate(angle);
        ctx.fillRect(-size*0.03, -size*0.15, size*0.06, size*0.05);
        ctx.restore();
      }

      ctx.restore();
    };

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update rotation
      rotation += 0.01;

      // Draw animated phone
      drawPhone(ctx, width/2, height/2, Math.min(width, height) * 0.3, Math.sin(rotation) * 0.1);

      // Draw text
      ctx.fillStyle = colors.text;
      ctx.font = "bold 24px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("HandyPro", width/2, height * 0.85);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width="200" 
      height="200" 
      className="w-full h-full"
    />
  );
}