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
    let trail: Array<{ x: number; y: number; life: number; vx?: number; vy?: number; isClick?: boolean }> = [];

    // 定义多种颜色
    const colors = [
      '#3b82f6', // 蓝色
      '#8b5cf6', // 紫色
      '#ec4899', // 粉色
      '#06b6d4', // 青色
      '#10b981', // 绿色
      '#f59e0b'  // 橙色
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // 随机选择颜色
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Add new trail point with random color
      trail.push({
        x: mouseX + (Math.random() - 0.5) * 4, // 添加轻微随机偏移
        y: mouseY + (Math.random() - 0.5) * 4,
        life: 1
      });

      // Limit trail length
      if (trail.length > trailLength) {
        trail.shift();
      }
    };

    const handleClick = (e: MouseEvent) => {
      // 创建更精致的点击特效
      const clickParticles = 12; // 减少粒子数量
      const rings = 2; // 减少环数
      
      for (let ring = 1; ring <= rings; ring++) {
        for (let i = 0; i < clickParticles; i++) {
          const angle = (i / clickParticles) * Math.PI * 2;
          const baseVelocity = 3 + Math.random() * 2; // 减少初始速度
          const velocity = baseVelocity * ring * 0.8; // 减少环间速度差
          
          // 随机选择颜色
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          
          trail.push({
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1,
            isClick: true
          });
        }
      }
      
      // 添加中心爆发效果
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 1 + Math.random() * 2;
        
        trail.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1.2,
          isClick: true
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trail
      trail.forEach((point, index) => {
        // 更新点击粒子的位置
        if (point.isClick && point.vx !== undefined && point.vy !== undefined) {
          point.x += point.vx;
          point.y += point.vy;
          point.vx *= 0.95; // 添加阻力
          point.vy *= 0.95;
          point.life -= 0.02; // 点击粒子衰减更快
        } else {
          point.life -= 0.025; // 普通轨迹衰减稍慢
        }
        
        if (point.life <= 0) {
          trail.splice(index, 1);
          return;
        }

        const alpha = point.life;
        const currentSize = point.isClick ? size * 0.6 * alpha : size * alpha;
        
        // 为每个点随机选择颜色，创建彩虹效果
        const colorIndex = Math.floor((point.x + point.y + Date.now() * 0.001) * 0.01) % colors.length;
        const currentColor = colors[colorIndex];
        
        // 创建多色渐变
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, currentSize * 2
        );
        
        // 使用多种颜色创建渐变
        const color1 = colors[colorIndex];
        const color2 = colors[(colorIndex + 1) % colors.length];
        const color3 = colors[(colorIndex + 2) % colors.length];
        
        gradient.addColorStop(0, `${color1}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.4, `${color2}${Math.floor(alpha * 180).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.7, `${color3}${Math.floor(alpha * 120).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${color1}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // 添加内部发光效果
        if (alpha > 0.5) {
          const innerGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, currentSize * 0.5
          );
          
          innerGradient.addColorStop(0, `#ffffff${Math.floor(alpha * 100).toString(16).padStart(2, '0')}`);
          innerGradient.addColorStop(1, `#ffffff00`);
          
          ctx.fillStyle = innerGradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, currentSize * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
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
