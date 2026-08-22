import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck,
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
    <section id="radar" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>MOLECULAR RADAR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Core Technical Proficiencies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light">
            Engineered under extreme hardware constraints for maximum efficiency and execution speed.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClickSound();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sound.playHoverBlip()}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => handleSelectSkill(skill)}
              onMouseEnter={() => sound.playHoverBlip()}
              className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    {skill.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300">
                    {skill.years}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-mono mb-2">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                  {skill.highlight}
                </p>
              </div>

              <div>
                {/* Percentage & Level Meter */}
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">{skill.level}</span>
                  <span className="text-cyan-300 font-bold">{skill.percentage}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
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
                className="relative w-full max-w-lg glass-panel-glow border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
              >
                <button
                  onClick={() => setActiveSkill(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                  {activeSkill.category} • {activeSkill.years}
                </div>

                <h3 className="text-2xl font-bold text-white font-mono mb-4">
                  {activeSkill.name}
                </h3>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
                  <div className="text-xs font-mono text-slate-400 mb-1">ARCHITECTURAL ROLE</div>
                  <div className="text-sm text-slate-200">{activeSkill.highlight}</div>
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
