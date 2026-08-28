import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  className = '',
  children,
  showIcon = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      sound.playClickSound();

      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(12);
        } catch (_) {}
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // Fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`group relative inline-flex items-center gap-1.5 cursor-pointer select-none transition-all ${className}`}
      title={`Copy "${text}" to clipboard`}
      aria-label={`Copy ${label || text} to clipboard`}
    >
      {children ? (
        children
      ) : (
        <>
          {showIcon && (
            <span className="shrink-0 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </span>
          )}
          {label && <span>{label}</span>}
        </>
      )}

      {/* Floating Animated Copied Badge Tooltip */}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: -24, scale: 1 }}
            exit={{ opacity: 0, y: -28, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 z-50 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold shadow-lg shadow-black/20 whitespace-nowrap"
          >
            <Check className="w-3 h-3 text-emerald-400 dark:text-emerald-600" />
            <span>Copied!</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
