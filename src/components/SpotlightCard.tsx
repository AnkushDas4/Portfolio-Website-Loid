import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sound } from '../utils/audio';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  enableTilt?: boolean;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  onClick,
  enableTilt = true,
  spotlightColor = 'rgba(0, 240, 255, 0.12)',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Mouse relative coordinates for spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -5;
      const tiltY = ((x - centerX) / centerX) * 5;

      rotateX.set(tiltX);
      rotateY.set(tiltY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHoverBlip();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: 1000,
        rotateX: enableTilt ? smoothRotateX : 0,
        rotateY: enableTilt ? smoothRotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-3xl transition-colors duration-300 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`
            ),
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};
