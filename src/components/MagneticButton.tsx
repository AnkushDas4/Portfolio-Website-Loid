import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sound } from '../utils/audio';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  strength?: number; // 0 to 1, default 0.35
  enableSound?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 0.35,
  enableSound = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 15, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Parallax shift for text/icon inside
  const innerX = useTransform(springX, (val) => val * 0.4);
  const innerY = useTransform(springY, (val) => val * 0.4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseEnter = () => {
    if (enableSound) sound.playHoverBlip();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (enableSound) sound.playClickSound();
    if (onClick) onClick(e);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      className={`inline-block cursor-pointer ${className}`}
    >
      <motion.div style={{ x: innerX, y: innerY }}>
        {children}
      </motion.div>
    </motion.div>
  );
};
