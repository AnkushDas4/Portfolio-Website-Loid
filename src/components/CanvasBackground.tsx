import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL / 2D context loss protection
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('Canvas context lost. Preventing crash.');
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = Math.max(320, window.innerWidth));
    let height = (canvas.height = Math.max(480, window.innerHeight));

    const isMobile = width < 768;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.max(320, window.innerWidth);
      height = canvas.height = Math.max(480, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Adaptive particle count based on screen dimensions
    const particleCount = isMobile
      ? Math.min(Math.floor((width * height) / 24000), 36)
      : Math.min(Math.floor((width * height) / 14000), 80);

    const particles: Particle[] = [];
    const colors = ['#00f0ff', '#06b6d4', '#6366f1', '#3b82f6'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
        size: Math.random() * (isMobile ? 1.5 : 2.0) + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    // Touch & Mouse coordinates with strict validation
    let targetX = width / 2;
    let targetY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      if (Number.isFinite(e.clientX) && Number.isFinite(e.clientY)) {
        targetX = e.clientX;
        targetY = e.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        if (Number.isFinite(touch.clientX) && Number.isFinite(touch.clientY)) {
          targetX = touch.clientX;
          targetY = touch.clientY;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const maxDist = isMobile ? 80 : 120;

    // Animation Loop with Finite Value Assertions
    const render = () => {
      if (!ctx || width <= 0 || height <= 0) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Sanitize position values
        if (!Number.isFinite(p1.x)) p1.x = Math.random() * width;
        if (!Number.isFinite(p1.y)) p1.y = Math.random() * height;

        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce on screen boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Attraction / repulsion with division-by-zero protection
        if (Number.isFinite(targetX) && Number.isFinite(targetY)) {
          const dx = targetX - p1.x;
          const dy = targetY - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100 && dist > 1) {
            p1.x -= (dx / dist) * 0.25;
            p1.y -= (dy / dist) * 0.25;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(0.5, p1.size), 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = Math.min(1, Math.max(0, p1.alpha));
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!Number.isFinite(p2.x) || !Number.isFinite(p2.y)) continue;

          const pDx = p1.x - p2.x;
          const pDy = p1.y - p2.y;
          const pDist = Math.sqrt(pDx * pDx + pDy * pDy);

          if (pDist < maxDist && pDist > 0) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = Math.min(1, Math.max(0, (1 - pDist / maxDist) * 0.12));
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
      <canvas ref={canvasRef} className="w-full h-full block opacity-60" />
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 sm:w-[28rem] h-80 sm:h-[28rem] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
};
