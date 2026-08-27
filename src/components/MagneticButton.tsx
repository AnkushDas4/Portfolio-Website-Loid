import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  maxDistance?: number;
  pullFactor?: number;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  maxDistance = 15,
  pullFactor = 0.35,
  ariaLabel,
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Snappy, playful magnetic spring physics
  const springX = useSpring(x, { stiffness: 380, damping: 14, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 380, damping: 14, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * pullFactor;
    const deltaY = (e.clientY - centerY) * pullFactor;

    // Constrain maximum translation offset
    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.85 }}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 12,
        mass: 0.4,
      }}
      aria-label={ariaLabel}
      className={`cursor-pointer select-none ${className}`}
    >
      {children}
    </motion.button>
  );
};
