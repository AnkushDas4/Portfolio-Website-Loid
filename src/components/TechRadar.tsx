import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  X
} from 'lucide-react';
import { PORTFOLIO_DATA, SkillItem } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const TechRadar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories = ['All', 'Mobile Native', 'Decentralized & Security', 'Languages & Core', 'DevOps & Cloud'];

  const filteredSkills = selectedCategory === 'All'
    ? PORTFOLIO_DATA.techStack
    : PORTFOLIO_DATA.techStack.filter(s => s.category === selectedCategory);

  const handleSelectSkill = (skill: SkillItem) => {
    sound.playClickSound();
    setActiveSkill(skill);
  };

  return (
    <section id="radar" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>MOLECULAR RADAR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            Core Technical Proficiencies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Engineered under extreme hardware constraints for maximum efficiency and execution speed.
          </p>
        </div>

        {/* Filter Tabs (Scrollable on Mobile) */}
        <div className="flex items-center sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 sm:mb-12 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClickSound();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sound.playHoverBlip()}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'glass-panel border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Radar Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              onClick={() => handleSelectSkill(skill)}
              onMouseEnter={() => sound.playHoverBlip()}
              className="p-5 sm:p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    {skill.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                    {skill.years}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-mono mb-2">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-light mb-5 sm:mb-6">
                  {skill.highlight}
                </p>
              </div>

              <div>
                {/* Percentage & Level Meter */}
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400 text-[11px] sm:text-xs">{skill.level}</span>
                  <span className="text-cyan-300 font-bold text-xs sm:text-sm">{skill.percentage}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.08 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full shadow-[0_0_8px_#00f0ff]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {activeSkill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveSkill(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                className="relative w-full max-w-lg glass-panel-glow border border-cyan-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl z-10"
              >
                <button
                  onClick={() => setActiveSkill(null)}
                  className="absolute top-4 sm:top-5 right-4 sm:top-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                  {activeSkill.category} • {activeSkill.years}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono mb-4 pr-8">
                  {activeSkill.name}
                </h3>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
                  <div className="text-[10px] sm:text-xs font-mono text-slate-400 mb-1">ARCHITECTURAL ROLE</div>
                  <div className="text-xs sm:text-sm text-slate-200">{activeSkill.highlight}</div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-slate-800">
                  <span>SEDNIUM PRODUCTION ENGINE</span>
                  <span className="text-cyan-300 font-bold">{activeSkill.level} ({activeSkill.percentage}%)</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
