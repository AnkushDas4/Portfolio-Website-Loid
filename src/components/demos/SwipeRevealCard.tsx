import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';
import { Share2, Star, Copy, Check } from 'lucide-react';

interface SwipeRevealCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SwipeRevealCard: React.FC<SwipeRevealCardProps> = ({
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [starred, setStarred] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });

  const handleDragEnd = (_: any, info: PanInfo) => {
    // If dragged left past -50px or fast velocity left
    if (info.offset.x < -50 || info.velocity.x < -300) {
      x.set(-130);
      setIsOpen(true);
    } else {
      x.set(0);
      setIsOpen(false);
    }
  };

  const toggleOpen = () => {
    if (isOpen) {
      x.set(0);
      setIsOpen(false);
    } else {
      x.set(-130);
      setIsOpen(true);
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred(!starred);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: 'Ankush Das Portfolio', url: window.location.href }).catch(() => {});
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 ${className}`}>
      {/* Background Drawer Layer with Action Buttons */}
      <div className="absolute inset-y-0 right-0 w-[130px] flex items-center justify-end px-2 gap-1.5 z-0 bg-slate-900 dark:bg-slate-950 text-white rounded-r-2xl">
        <button
          onClick={handleStar}
          className={`p-2.5 rounded-xl transition-all active:scale-90 ${
            starred ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-300 hover:text-amber-400'
          }`}
          title="Star"
          aria-label="Star"
        >
          <Star className={`w-4 h-4 ${starred ? 'fill-white' : ''}`} />
        </button>

        <button
          onClick={handleCopy}
          className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 transition-all active:scale-90"
          title="Copy Link"
          aria-label="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all active:scale-90"
          title="Share"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Draggable Top Card Layer */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -130, right: 0 }}
        dragElastic={0.08}
        onDragEnd={handleDragEnd}
        style={{ x: springX }}
        onClick={() => {
          if (isOpen) {
            x.set(0);
            setIsOpen(false);
          }
        }}
        className="relative z-10 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f121a] p-6 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>SWIPE LEFT TO REVEAL ACTIONS</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            {isOpen ? 'Close' : 'Swipe ➔'}
          </button>
        </div>

        {children}
      </motion.div>
    </div>
  );
};
