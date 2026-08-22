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

const iconMap = {
  Cpu: Cpu,
  Network: Network,
  ShieldCheck: ShieldCheck,
  Terminal: Terminal
};

export const IdentityPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>CORE ARCHITECTURAL DOCTRINE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            {PORTFOLIO_DATA.identityPhilosophy.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg leading-relaxed font-light"
          >
            {PORTFOLIO_DATA.identityPhilosophy.intro}
          </motion.p>
        </div>

        {/* Engineering Philosophy Quote / Highlight Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl glass-panel-glow p-8 md:p-10 border border-cyan-500/30 mb-16 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                <span>The Mobile-Native Axiom</span>
              </div>
              <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed italic">
                "{PORTFOLIO_DATA.identityPhilosophy.coreArgument}"
              </p>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-cyan-500/20 text-center min-w-[200px]">
              <Award className="w-8 h-8 text-cyan-400 mb-2" />
              <span className="text-xs font-mono text-slate-400">DISCIPLINE</span>
              <span className="text-sm font-bold text-white font-mono">Zero Bloat</span>
            </div>
          </div>
        </motion.div>

        {/* Mobile-Native vs Conventional Comparison Matrix */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              &gt; THE ARCHITECTURAL ADVANTAGE MATRIX
            </h3>
            <p className="text-slate-400 text-sm mt-1 font-mono">
              Why constraint-driven mobile engineering outperforms traditional desktop bloat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.identityPhilosophy.comparison.map((item, idx) => (
              <motion.div
                key={item.aspect}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                onMouseEnter={() => sound.playHoverBlip()}
                className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                    {item.aspect}
                  </div>

                  {/* Mobile-Native Superpower */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mobile-Native Philosophy</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed pl-5">
                      {item.mobileNative}
                    </p>
                  </div>

                  {/* Conventional Desktop Bloat */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-rose-400/80 font-semibold mb-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Conventional Approach</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-5">
                      {item.conventional}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>SEDNIUM STANDARD</span>
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 Core Architectural Pillars */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              The 4 Pillars of Sednium Engineering
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTFOLIO_DATA.identityPhilosophy.pillars.map((pillar, idx) => {
              const Icon = iconMap[pillar.icon as keyof typeof iconMap] || Cpu;

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => sound.playHoverBlip()}
                  className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all flex flex-col group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-mono">
                    {pillar.title}
                  </h4>

                  <p className="text-sm text-slate-400 leading-relaxed font-light mt-auto">
                    {pillar.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400/60">
                    <span>PILLAR 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
