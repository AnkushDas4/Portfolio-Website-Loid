import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className = '',
  maxDistance = 16,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth physical spring physics
  const springX = useSpring(rawX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Calculate percentage offset from center normalized between -1 and 1
    const xRatio = deltaX / (rect.width / 2);
    const yRatio = deltaY / (rect.height / 2);

    rawX.set(xRatio * maxDistance);
    rawY.set(yRatio * maxDistance);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={`relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f121a] p-6 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};
