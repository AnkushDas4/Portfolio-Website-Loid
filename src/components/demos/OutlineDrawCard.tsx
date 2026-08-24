import React from 'react';

interface OutlineDrawCardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}

export const OutlineDrawCard: React.FC<OutlineDrawCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0f121a] p-6 shadow-sm hover:shadow-lg transition-all ${className}`}
    >
      {/* 4 Staggered Animated Border Segments (Draw Path Effect) */}
      {/* Top Border: Left -> Right */}
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-blue-500 group-hover:w-full transition-all duration-300 ease-in-out pointer-events-none" />

      {/* Right Border: Top -> Bottom */}
      <span className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-blue-500 to-purple-500 group-hover:h-full transition-all duration-300 ease-in-out delay-75 pointer-events-none" />

      {/* Bottom Border: Right -> Left */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-gradient-to-l from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300 ease-in-out delay-150 pointer-events-none" />

      {/* Left Border: Bottom -> Top */}
      <span className="absolute bottom-0 left-0 w-[2px] h-0 bg-gradient-to-t from-indigo-500 to-blue-500 group-hover:h-full transition-all duration-300 ease-in-out delay-200 pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
