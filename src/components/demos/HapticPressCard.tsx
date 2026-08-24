import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HapticPressCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const HapticPressCard: React.FC<HapticPressCardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressStart = () => {
    setIsPressed(true);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch (_) {}
    }
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.94, y: 4 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 24,
        mass: 0.8,
      }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={onClick}
      className={`relative cursor-pointer select-none rounded-2xl border transition-all duration-150 p-6 ${
        isPressed
          ? 'bg-slate-100/90 dark:bg-[#0a0d14] border-blue-500/60 shadow-inner ring-2 ring-blue-500/20'
          : 'bg-white dark:bg-[#0f121a] border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700'
      } ${className}`}
    >
      {/* Visual Depth Cushion Ring */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-150 ${
          isPressed ? 'opacity-100 bg-gradient-to-b from-blue-500/10 to-transparent' : 'opacity-0'
        }`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {children}
      </div>
    </motion.div>
  );
};
