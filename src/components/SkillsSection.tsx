import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Layout, Server, Terminal, Sparkles, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Category Icon Mapping
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <Code2 className="w-4 h-4 text-blue-500" />,
  Frontend: <Layout className="w-4 h-4 text-cyan-500" />,
  'Backend & Systems': <Server className="w-4 h-4 text-indigo-500" />,
  'DevOps & Tooling': <Terminal className="w-4 h-4 text-emerald-500" />,
};

// Category Theme Accent Styles
const CATEGORY_THEMES: Record<string, { ring: string; glow: string; badge: string }> = {
  Languages: {
    ring: 'hover:border-blue-500/50 dark:hover:border-blue-400/50',
    glow: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    badge: 'group-hover:bg-blue-500 group-hover:text-white',
  },
  Frontend: {
    ring: 'hover:border-cyan-500/50 dark:hover:border-cyan-400/50',
    glow: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    badge: 'group-hover:bg-cyan-500 group-hover:text-white',
  },
  'Backend & Systems': {
    ring: 'hover:border-indigo-500/50 dark:hover:border-indigo-400/50',
    glow: 'from-indigo-500/10 via-purple-500/5 to-transparent',
    badge: 'group-hover:bg-indigo-500 group-hover:text-white',
  },
  'DevOps & Tooling': {
    ring: 'hover:border-emerald-500/50 dark:hover:border-emerald-400/50',
    glow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    badge: 'group-hover:bg-emerald-500 group-hover:text-white',
  },
};

export const SkillsSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleSkillTouch = (skill: string) => {
    setActiveSkill(activeSkill === skill ? null : skill);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch (_) {}
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Proficiencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Languages, frameworks, and distributed systems tooling. Tap or hover over any skill pill to inspect.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.skills.map((category, catIdx) => {
            const theme = CATEGORY_THEMES[category.title] || {
              ring: 'hover:border-blue-500/50',
              glow: 'from-blue-500/10 to-transparent',
              badge: 'group-hover:bg-blue-500 group-hover:text-white',
            };
            const icon = CATEGORY_ICONS[category.title] || <Sparkles className="w-4 h-4 text-blue-500" />;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: catIdx * 0.08 }}
                className={`group relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-xl transition-all duration-300 ${theme.ring}`}
              >
                {/* Dynamic Ambient Background Glow on Hover / Focus */}
                <div
                  className={`pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${theme.glow}`}
                />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {category.skills.length} core proficiencies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Skill Pills (Both Phone Tap & PC Hover Support) */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => {
                    const isSelected = activeSkill === skill;

                    return (
                      <motion.button
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 20,
                          delay: catIdx * 0.05 + sIdx * 0.02,
                        }}
                        whileHover={{
                          scale: 1.08,
                          y: -2,
                          transition: { type: 'spring', stiffness: 500, damping: 15 },
                        }}
                        whileTap={{
                          scale: 0.92,
                          transition: { type: 'spring', stiffness: 500, damping: 20 },
                        }}
                        onClick={() => handleSkillTouch(skill)}
                        className={`group/pill relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200 select-none ${
                          isSelected
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md ring-2 ring-blue-500/30'
                            : 'bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm'
                        }`}
                      >
                        {/* Shimmer sweep on hover */}
                        <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/pill:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/20 dark:via-cyan-400/20 to-transparent" />

                        {/* Interactive selection indicator dot */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                            isSelected
                              ? 'bg-emerald-400 scale-125'
                              : 'bg-slate-400 dark:bg-slate-500 group-hover/pill:bg-blue-500 group-hover/pill:scale-110'
                          }`}
                        />

                        <span className="relative z-10">{skill}</span>

                        {isSelected && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative z-10 ml-0.5 text-emerald-400"
                          >
                            <Check className="w-3 h-3" />
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
