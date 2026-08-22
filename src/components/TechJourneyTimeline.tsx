import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Calendar, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const TechJourneyTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <GitCommit className="w-3.5 h-3.5" />
            <span>CIRCUIT ODYSSEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineering & Career Timeline
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light">
            The path from writing code on a mobile device to architecting scalable, secure decentralized infrastructure.
          </p>
        </div>

        {/* Timeline Circuit Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Circuit Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-slate-800" />
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-indigo-500 to-cyan-400 shadow-[0_0_10px_#00f0ff] opacity-60" />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {PORTFOLIO_DATA.timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    onMouseEnter={() => sound.playHoverBlip()}
                    className={`ml-12 md:ml-0 md:w-[45%] p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.12)] group`}
                  >
                    {/* Header: Date & Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-mono mb-1">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-slate-400 mb-4">
                      {item.role}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed font-light mb-5">
                      {item.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="space-y-2 mb-5">
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
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
