'use client';
import { useEffect, useRef } from 'react';

interface HyperspeedProps {
  speed?: number;
  effectOpacity?: number;
  starCount?: number;
}

export default function Hyperspeed({ 
  speed = 1, 
  effectOpacity = 0.8,
  starCount = 800 
}: HyperspeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: Array<{
      x: number;
      y: number;
      z: number;
      prevX: number;
      prevY: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          prevX: 0,
          prevY: 0,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - effectOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      stars.forEach((star) => {
        star.prevX = star.x / star.z * 100;
        star.prevY = star.y / star.z * 100;

        star.z -= speed * 2;

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = 1000;
          star.prevX = star.x / star.z * 100;
          star.prevY = star.y / star.z * 100;
        }

        const x = star.x / star.z * 100;
        const y = star.y / star.z * 100;

        const opacity = 1 - star.z / 1000;
        const size = (1 - star.z / 1000) * 2;

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(star.prevX, star.prevY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Add some color variation
        const hue = (star.z / 1000) * 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed, effectOpacity, starCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)' }}
    />
  );
}
