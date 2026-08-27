import React from 'react';

interface SpotlightGridProps {
  children: React.ReactNode;
  className?: string;
  gridSize?: number;
}

export const SpotlightGrid: React.FC<SpotlightGridProps> = ({
  children,
  className = '',
  gridSize = 36,
}) => {
  return (
    <div
      style={
        {
          '--grid-size': `${gridSize}px`,
        } as React.CSSProperties
      }
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
    >
      {/* Subtle Ambient Grid Overlay (Fixed Viewport) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-20 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: `var(--grid-size) var(--grid-size)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-0 dark:opacity-15 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: `var(--grid-size) var(--grid-size)`,
        }}
      />

      {/* Page Content Wrapper */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
