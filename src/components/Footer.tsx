import React from 'react';
import { ChevronUp, Radio, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { MagneticButton } from './MagneticButton';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-12 sm:pt-16 pb-28 sm:pb-24 px-4 sm:px-6 md:px-8 border-t border-slate-900 bg-black/80 relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-12 w-full">
          {/* Brand & CTO Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <MagneticButton strength={0.25} onClick={scrollToTop}>
              <div className="flex items-center gap-2 mb-1.5 cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                <span className="font-mono font-bold tracking-wider text-sm sm:text-base text-white hover:text-cyan-300 transition-colors">
                  {PORTFOLIO_DATA.hero.handle} // {PORTFOLIO_DATA.hero.name}
                </span>
              </div>
            </MagneticButton>
            <p className="text-xs font-mono text-slate-400 max-w-sm">
              {PORTFOLIO_DATA.hero.title} • {PORTFOLIO_DATA.company.name}
            </p>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-1">
              Forged under mobile hardware constraints. Optimized for zero bloat.
            </p>
          </div>

          {/* Node Diagnostics & Edge Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-slate-400">
            <div className="px-3 py-1.5 rounded-xl glass-panel border border-slate-800 flex items-center gap-1.5 sm:gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>NODE: <span className="text-emerald-400 font-bold">100% OPERATIONAL</span></span>
            </div>

            <div className="px-3 py-1.5 rounded-xl glass-panel border border-slate-800 flex items-center gap-1.5 sm:gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>EDGE LATENCY: <span className="text-cyan-400 font-bold">{PORTFOLIO_DATA.hero.telemetry.nodeLatency}</span></span>
            </div>
          </div>

          {/* Back to Top with Magnetic Physics */}
          <MagneticButton strength={0.4} onClick={scrollToTop}>
            <button
              className="p-2.5 sm:p-3 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] text-slate-400 hover:text-white transition-all shadow-md group"
              title="Back to Top"
            >
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </MagneticButton>
        </div>

        {/* Copyright & Engine Details */}
        <div className="pt-6 sm:pt-8 border-t border-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-slate-500 text-center sm:text-left w-full">
          <div>
            © {new Date().getFullYear()} Ankush Das ({PORTFOLIO_DATA.hero.handle}) & Sednium Technologies. All rights reserved.
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-400">
            <span>React 19 • Vite • Tailwind • Framer Motion • Web Audio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
