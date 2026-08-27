import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <section id="skills" className="pt-12 pb-6 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Languages, frameworks, and distributed systems tooling. Tap or hover over any skill pill to inspect.
          </p>
        </div>

        {/* 4-Column Responsive Grid on Large Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className={`group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${theme.ring}`}
              >
                {/* Dynamic Ambient Background Glow on Hover / Focus */}
                <div
                  className={`pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${theme.glow}`}
                />

                <div>
                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between pb-3.5 mb-5 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/50">
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                          {category.title}
                        </h3>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {category.skills.length} core proficiencies
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Skill Pills with Layout Animation & Zero Width Shift */}
                  <motion.div layout className="relative z-10 flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => {
                      const isSelected = activeSkill === skill;

                      return (
                        <motion.button
                          layout
                          key={skill}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            layout: { type: 'spring', stiffness: 400, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 },
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                            transition: { type: 'spring', stiffness: 500, damping: 15 },
                          }}
                          whileTap={{
                            scale: 0.94,
                            transition: { type: 'spring', stiffness: 600, damping: 20 },
                          }}
                          onClick={() => handleSkillTouch(skill)}
                          className={`group/pill relative overflow-hidden px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none border ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border-blue-500 ring-2 ring-blue-500/40'
                              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-950 dark:hover:text-white hover:shadow-sm'
                          }`}
                        >
                          {/* Hover Light Sweep */}
                          <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/pill:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/20 dark:via-blue-400/15 to-transparent" />

                          {/* Fixed-width Status Icon Container (Prevents Layout Shift) */}
                          <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                            {isSelected ? (
                              <Check className="w-3.5 h-3.5 text-emerald-300 animate-in zoom-in-50 duration-150" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 group-hover/pill:bg-blue-500 transition-colors" />
                            )}
                          </span>

                          <span className="relative z-10">{skill}</span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
