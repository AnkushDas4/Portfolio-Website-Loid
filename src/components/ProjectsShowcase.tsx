import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Github, 
  Layers, 
  Cpu, 
  Radio
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ArchitectureModal } from './ArchitectureModal';
import { sound } from '../utils/audio';
import { SpotlightCard } from './SpotlightCard';
import { MagneticButton } from './MagneticButton';

export const ProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Decentralized', 'Security Infrastructure', 'Developer Tooling', 'Design Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);

  const handleOpenModal = (project: Project) => {
    sound.playClickSound();
    setActiveProject(project);
  };

  return (
    <section id="projects" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6 w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 sm:mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>SYSTEMS PORTFOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured Production Architectures
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-light">
              High-performance decentralized protocols, edge security layers, and mobile-native developer platforms.
            </p>
          </div>

          {/* Category Filter Pills (Scrollable on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
            {categories.map((cat) => (
              <MagneticButton key={cat} strength={0.2}>
                <button
                  onClick={() => {
                    sound.playClickSound();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                      : 'glass-panel border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with Spotlight Physics */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 w-full">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              spotlightColor="rgba(0, 240, 255, 0.18)"
              className="glass-panel border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 p-5 sm:p-8 hover:shadow-[0_0_40px_rgba(0,240,255,0.18)] w-full"
            >
              <div className="absolute top-0 right-0 w-40 sm:w-48 h-40 sm:h-48 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all pointer-events-none" />

              <div>
                {/* Top Bar: Category & Status */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-widest truncate">
                    {project.category}
                  </span>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400 font-semibold shrink-0">
                    <Radio className="w-2.5 sm:w-3 h-2.5 sm:h-3 animate-pulse text-emerald-400" />
                    <span>{project.statusLabel}</span>
                  </div>
                </div>

                {/* Title & Logo */}
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <motion.img
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    src={project.logo}
                    alt={project.name}
                    className="w-10 sm:w-12 h-10 sm:h-12 p-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 object-contain shadow-md shrink-0 cursor-pointer"
                  />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                      {project.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-mono text-slate-400">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light">
                  {project.description}
                </p>

                {/* Quick Metric Badges */}
                <div className="grid grid-cols-3 gap-2 mb-5 sm:mb-6">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="p-2 sm:p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center hover:border-cyan-500/30 transition-colors">
                      <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 truncate">{m.label}</div>
                      <div className="text-[11px] sm:text-xs font-bold font-mono text-cyan-300 mt-0.5 truncate">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 sm:mb-8">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-mono text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <MagneticButton strength={0.3}>
                  <button 
                    onClick={() => handleOpenModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors py-1"
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Inspect Blueprint</span>
                  </button>
                </MagneticButton>

                <div className="flex items-center gap-2">
                  <MagneticButton strength={0.3}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 transition-colors inline-flex items-center justify-center shadow-sm"
                      title="Live Project"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </MagneticButton>

                  <MagneticButton strength={0.3}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:p-2.5 rounded-xl glass-panel border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-colors inline-flex items-center justify-center"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Modal Drawer with AnimatePresence */}
        <AnimatePresence>
          {activeProject && (
            <ArchitectureModal
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
