import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BorderBeamCardProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeamCard: React.FC<BorderBeamCardProps> = ({
  children,
  className = '',
  duration = 6,
  borderWidth = 1.5,
  colorFrom = '#3b82f6',
  colorTo = '#8b5cf6',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl p-[1px] overflow-hidden bg-slate-200 dark:bg-slate-800 transition-colors ${className}`}
    >
      {/* Animated Glowing Border Beam Sweep */}
      <motion.div
        animate={{
          rotate: isHovered ? [0, 360] : 0,
        }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: 'linear',
        }}
        style={{
          width: '200%',
          height: '200%',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${colorFrom} 350deg, ${colorTo} 360deg)`,
          opacity: isHovered ? 1 : 0.4,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Inner Card Container */}
      <div className="relative z-10 rounded-[15px] bg-white dark:bg-[#0f121a] p-6 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
