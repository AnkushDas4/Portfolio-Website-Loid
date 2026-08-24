import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-[1px] ${className}`}>
      {/* Animated Colorful Ambient Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 180, 360],
          x: [-20, 20, -20],
          y: [-10, 15, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: 'easeInOut',
        }}
        className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/50 via-indigo-500/40 to-pink-500/50 blur-2xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          x: [20, -20, 20],
          y: [15, -10, 15],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/40 via-cyan-500/30 to-purple-500/40 blur-2xl pointer-events-none"
      />

      {/* Frosted Glass Content Panel (Vision Pro style) */}
      <div className="relative z-10 h-full rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/40 dark:border-slate-700/50 p-6 shadow-lg shadow-purple-500/5 flex flex-col justify-between transition-colors">
        {children}
      </div>
    </div>
  );
};
