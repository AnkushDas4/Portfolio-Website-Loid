import React, { useEffect, useRef } from 'react';

interface SpotlightGridProps {
  children: React.ReactNode;
  className?: string;
  gridSize?: number;
  spotlightSize?: number;
}

export const SpotlightGrid: React.FC<SpotlightGridProps> = ({
  children,
  className = '',
  gridSize = 36,
  spotlightSize = 650,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;
    let isVisible = false;

    const updateCSSVariables = () => {
      if (!container) return;
      container.style.setProperty('--mouse-x', `${targetX}px`);
      container.style.setProperty('--mouse-y', `${targetY}px`);
      container.style.setProperty('--spotlight-opacity', isVisible ? '1' : '0');
      rafId = null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;

      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateCSSVariables);
      }
    };

    const handlePointerLeave = () => {
      isVisible = false;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateCSSVariables);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={
        {
          '--mouse-x': '-1000px',
          '--mouse-y': '-1000px',
          '--spotlight-opacity': '0',
          '--grid-size': `${gridSize}px`,
          '--spotlight-size': `${spotlightSize}px`,
        } as React.CSSProperties
      }
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
    >
      {/* 1. Base Subtle Ambient Grid Overlay (Fixed Viewport) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-30 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: `var(--grid-size) var(--grid-size)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-0 dark:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: `var(--grid-size) var(--grid-size)`,
        }}
      />

      {/* 2. Interactive Spotlight Mask & Illuminated Grid Beams (Zero-JS React Repaint) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `
            radial-gradient(
              var(--spotlight-size) circle at var(--mouse-x) var(--mouse-y),
              rgba(59, 130, 246, 0.12) 0%,
              rgba(99, 102, 241, 0.06) 35%,
              rgba(147, 51, 234, 0.02) 60%,
              transparent 80%
            )
          `,
          transform: 'translateZ(0)',
          willChange: 'background',
        }}
      />

      {/* 3. Glowing Grid Intersection Highlights Under Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: 'var(--spotlight-opacity)',
          backgroundImage: `
            radial-gradient(
              var(--spotlight-size) circle at var(--mouse-x) var(--mouse-y),
              rgba(59, 130, 246, 0.28) 0%,
              rgba(99, 102, 241, 0.12) 30%,
              transparent 70%
            ),
            linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: `100% 100%, var(--grid-size) var(--grid-size), var(--grid-size) var(--grid-size)`,
          backgroundBlendMode: 'screen',
          maskImage: `radial-gradient(var(--spotlight-size) circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(var(--spotlight-size) circle at var(--mouse-x) var(--mouse-y), black 10%, transparent 70%)`,
          transform: 'translateZ(0)',
        }}
      />

      {/* 4. Page Content Wrapper */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
