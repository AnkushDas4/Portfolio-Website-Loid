import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Network, 
  ShieldCheck, 
  Terminal, 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Flame, 
  Award 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { SpotlightCard } from './SpotlightCard';

const iconMap = {
  Cpu: Cpu,
  Network: Network,
  ShieldCheck: ShieldCheck,
  Terminal: Terminal
};

export const IdentityPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => sound.playHoverBlip()}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 cursor-default"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>CORE ARCHITECTURAL DOCTRINE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4"
          >
            {PORTFOLIO_DATA.identityPhilosophy.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-light px-2"
          >
            {PORTFOLIO_DATA.identityPhilosophy.intro}
          </motion.p>
        </div>

        {/* Engineering Philosophy Quote / Highlight Box */}
        <SpotlightCard
          spotlightColor="rgba(0, 240, 255, 0.15)"
          className="glass-panel-glow p-5 sm:p-8 md:p-10 border border-cyan-500/30 mb-12 sm:mb-16 w-full"
        >
          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-6 sm:gap-8 items-center w-full">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                <span>The Mobile-Native Axiom</span>
              </div>
              <p className="text-slate-200 text-base sm:text-lg md:text-xl font-medium leading-relaxed italic">
                "{PORTFOLIO_DATA.identityPhilosophy.coreArgument}"
              </p>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-cyan-500/20 text-center min-w-[180px]">
              <Award className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-xs font-mono text-slate-400">DISCIPLINE</span>
              <span className="text-sm font-bold text-white font-mono">Zero Bloat</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Mobile-Native vs Conventional Comparison Matrix */}
        <div className="mb-14 sm:mb-20 w-full">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-2xl font-bold text-white font-mono">
              &gt; THE ARCHITECTURAL ADVANTAGE MATRIX
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-mono">
              Why constraint-driven mobile engineering outperforms traditional desktop bloat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 w-full">
            {PORTFOLIO_DATA.identityPhilosophy.comparison.map((item) => (
              <SpotlightCard
                key={item.aspect}
                spotlightColor="rgba(0, 240, 255, 0.18)"
                className="p-5 sm:p-6 glass-panel border border-slate-800 hover:border-cyan-500/50 transition-all w-full"
              >
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-3 sm:mb-4 pb-2 border-b border-slate-800">
                    {item.aspect}
                  </div>

                  {/* Mobile-Native Superpower */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Mobile-Native Philosophy</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-5">
                      {item.mobileNative}
                    </p>
                  </div>

                  {/* Conventional Desktop Bloat */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-rose-400/80 font-semibold mb-1">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Conventional Approach</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-5">
                      {item.conventional}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>SEDNIUM STANDARD</span>
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* 4 Core Architectural Pillars */}
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              The 4 Pillars of Sednium Engineering
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {PORTFOLIO_DATA.identityPhilosophy.pillars.map((pillar, idx) => {
              const Icon = iconMap[pillar.icon as keyof typeof iconMap] || Cpu;

              return (
                <SpotlightCard
                  key={pillar.id}
                  spotlightColor="rgba(0, 240, 255, 0.22)"
                  className="p-5 sm:p-6 glass-panel border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all cursor-default group w-full"
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 sm:mb-5 group-hover:scale-110 group-hover:bg-cyan-500/25 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-mono">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mt-auto">
                    {pillar.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400/60">
                    <span>PILLAR 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_#00f0ff]" />
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
