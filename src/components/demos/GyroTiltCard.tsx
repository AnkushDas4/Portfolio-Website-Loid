import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GyroTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const GyroTiltCard: React.FC<GyroTiltCardProps> = ({
  children,
  className = '',
  maxTilt = 15,
}) => {
  const [hasGyro, setHasGyro] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);

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

  // Desktop mouse parallax fallback
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

  return (
    <div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full"
    >
      <motion.div
        animate={
          !hasGyro && !isSupported
            ? {
                rotateX: [0, 4, -4, 0],
                rotateY: [0, -6, 6, 0],
              }
            : undefined
        }
        transition={
          !hasGyro && !isSupported
            ? {
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }
            : undefined
        }
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f121a] p-6 shadow-md hover:shadow-xl transition-shadow ${className}`}
      >
        {/* Subtle dynamic sheen reflection */}
        <motion.div
          style={{
            transform: 'translateZ(10px)',
            opacity: 0.5,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 dark:via-cyan-500/5 to-transparent"
        />

        <div style={{ transform: 'translateZ(25px)' }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
