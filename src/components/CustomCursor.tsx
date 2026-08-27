import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer trailing circle
  const ringX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Only activate on devices with a fine pointer/mouse
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleInteractiveOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleInteractiveOver, { passive: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleInteractiveOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.5 : 1,
          borderColor: isHovered ? 'rgba(59, 130, 246, 0.85)' : 'rgba(148, 163, 184, 0.45)',
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-slate-400/40 dark:border-slate-500/40"
      />

      {/* Inner Crisp Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm"
      />
    </div>
  );
};
