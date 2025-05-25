'use client';
import { useEffect, useRef } from 'react';

interface SplashCursorProps {
  size?: number;
  color?: string;
  trailLength?: number;
}

export default function SplashCursor({ 
  size = 35, 
  color = '#3b82f6',
  trailLength = 40 
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let trail: Array<{ x: number; y: number; life: number }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Add new trail point
      trail.push({
        x: mouseX,
        y: mouseY,
        life: 1
      });

      // Limit trail length
      if (trail.length > trailLength) {
        trail.shift();
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create splash effect on click
      const splashCount = 20;
      for (let i = 0; i < splashCount; i++) {
        const angle = (i / splashCount) * Math.PI * 2;
        const velocity = 8 + Math.random() * 12;
        
        // Create multiple rings of particles
        for (let ring = 1; ring <= 3; ring++) {
          trail.push({
            x: e.clientX + Math.cos(angle) * velocity * ring * 3,
            y: e.clientY + Math.sin(angle) * velocity * ring * 3,
            life: 1
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trail
      trail.forEach((point, index) => {
        point.life -= 0.03;
        
        if (point.life <= 0) {
          trail.splice(index, 1);
          return;
        }

        const alpha = point.life;
        const currentSize = size * alpha;
        
        // Create gradient for each trail point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, currentSize * 1.5
        );
        
        gradient.addColorStop(0, `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${color}${Math.floor(alpha * 128).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [size, color, trailLength]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
