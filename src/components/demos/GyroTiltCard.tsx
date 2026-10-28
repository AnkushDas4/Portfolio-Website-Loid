import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GyroTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  enableHapticSquish?: boolean;
}

export const GyroTiltCard: React.FC<GyroTiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  enableHapticSquish = true,
}) => {
  const [hasGyro, setHasGyro] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const rawBeta = useMotionValue(0);  // Front-to-back tilt (-180 to 180)
  const rawGamma = useMotionValue(0); // Left-to-right tilt (-90 to 90)

  const springBeta = useSpring(rawBeta, { stiffness: 120, damping: 20 });
  const springGamma = useSpring(rawGamma, { stiffness: 120, damping: 20 });

  // Map pitch & roll degrees to 3D rotation angles
  const rotateX = useTransform(springBeta, [-45, 45], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springGamma, [-45, 45], [-maxTilt, maxTilt]);

  useEffect(() => {
    let gyroTriggered = false;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        gyroTriggered = true;
        setHasGyro(true);
        // Normalize typical holding posture (around 45 deg pitch)
        const calibratedBeta = Math.max(-45, Math.min(45, (e.beta || 0) - 45));
        const calibratedGamma = Math.max(-45, Math.min(45, e.gamma || 0));

        rawBeta.set(calibratedBeta);
        rawGamma.set(calibratedGamma);
      }
    };

    // On mobile devices (< 640px), skip continuous gyro polling to conserve GPU/battery
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobileViewport) {
      setHasGyro(false);
      return;
    }

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      setIsSupported(false);
    }

    // Timeout fallback if no orientation event fires (e.g. desktop or iOS permissions)
    const timeout = setTimeout(() => {
      if (!gyroTriggered) {
        setHasGyro(false);
      }
    }, 1200);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      clearTimeout(timeout);
    };
  }, [rawBeta, rawGamma]);

  // Desktop mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasGyro) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    rawGamma.set(xPct * 45);
    rawBeta.set(-yPct * 45);
  };

  const handleMouseLeave = () => {
    if (hasGyro) return;
    rawBeta.set(0);
    rawGamma.set(0);
  };

  // Impulsive Haptic Press Feedback (Safe on mobile page scroll)
  const handleMouseDown = () => {
    if (!enableHapticSquish) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (!enableHapticSquish) return;
    setIsPressed(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableHapticSquish) return;
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    setIsPressed(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.touches[0];
    const diffX = Math.abs(touch.clientX - touchStartPos.current.x);
    const diffY = Math.abs(touch.clientY - touchStartPos.current.y);

    // If user is scrolling the page, cancel squish state and don't trigger haptic
    if (diffX > 10 || diffY > 10) {
      setIsPressed(false);
      touchStartPos.current = null;
    }
  };

  const handleTouchEnd = () => {
    if (isPressed && enableHapticSquish) {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(12);
        } catch (_) {}
      }
    }
    setIsPressed(false);
    touchStartPos.current = null;
  };

  return (
    <div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97, y: 2 }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 24,
          mass: 0.7,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative select-none rounded-2xl border transition-all duration-150 h-full flex flex-col justify-between ${
          isPressed
            ? 'bg-slate-50 dark:bg-[#0a0d14] border-blue-500/60 shadow-inner ring-2 ring-blue-500/20'
            : 'bg-white dark:bg-[#0f121a] border-slate-200 dark:border-slate-800/90 shadow-md hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700'
        } ${className}`}
      >
        {/* Subtle dynamic sheen reflection */}
        <motion.div
          style={{
            transform: 'translateZ(10px)',
            opacity: isPressed ? 0.2 : 0.6,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/15 dark:via-cyan-500/5 to-transparent transition-opacity duration-150"
        />

        {/* Tactile Z-depth cushion glow */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-150 ${
            isPressed ? 'opacity-100 bg-gradient-to-b from-blue-500/10 to-transparent' : 'opacity-0'
          }`}
        />

        {/* 3D Elevated Layer Content */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
