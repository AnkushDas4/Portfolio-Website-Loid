import React from 'react';
import { ChevronUp, Shield, Radio, Heart, Cpu, Code2, Globe } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-28 md:pb-16 px-4 border-t border-slate-900 bg-black/80 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Brand & CTO Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              <span className="font-mono font-bold tracking-wider text-base text-white">
                {PORTFOLIO_DATA.hero.handle} // {PORTFOLIO_DATA.hero.name}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm">
              {PORTFOLIO_DATA.hero.title} • {PORTFOLIO_DATA.company.name}
            </p>
            <p className="text-[11px] font-mono text-slate-500 mt-1">
              Forged under mobile hardware constraints. Optimized for zero bloat.
            </p>
          </div>

          {/* Node Diagnostics & Edge Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <div className="px-3 py-1.5 rounded-xl glass-panel border border-slate-800 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>NODE STATUS: <span className="text-emerald-400 font-bold">100% OPERATIONAL</span></span>
            </div>

            <div className="px-3 py-1.5 rounded-xl glass-panel border border-slate-800 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>EDGE LATENCY: <span className="text-cyan-400 font-bold">{PORTFOLIO_DATA.hero.telemetry.nodeLatency}</span></span>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHoverBlip()}
            className="p-3 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-white transition-all shadow-md group"
            title="Back to Top"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Copyright & Engine Details */}
        <div className="pt-8 border-t border-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Ankush Das ({PORTFOLIO_DATA.hero.handle}) & Sednium Technologies. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Engineered with React 19 • Vite • Tailwind • Motion • Web Audio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
