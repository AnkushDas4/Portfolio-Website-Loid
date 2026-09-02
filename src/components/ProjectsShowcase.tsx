import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ArrowUpRight, Github, Layers } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { GyroTiltCard } from './demos/GyroTiltCard';
import { ProjectModal } from './ProjectModal';
import { sound } from '../utils/audio';

export const ProjectsShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="pt-10 sm:pt-12 pb-4 sm:pb-6 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Selected Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base mt-1">
            Real-world systems, protocols, and developer tools built with a focus on performance and reliability.
          </p>
        </div>

        {/* 2-Column Wide Grid for Modern Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="h-full flex"
            >
              <GyroTiltCard
                maxTilt={8}
                className="p-5 sm:p-7 md:p-8 h-full flex flex-col justify-between w-full"
              >
                <div>
                  {/* Header & Direct Links */}
                  <div className="flex items-start justify-between gap-3 mb-2.5 sm:mb-3">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {project.name}
                    </h3>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                        title="GitHub Repository"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                        title="Live Demo / Website"
                        aria-label="Live Demo / Website"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2.5 sm:mb-3">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4 sm:mb-5">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <ul className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {project.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold shrink-0 leading-relaxed">•</span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Bar: Tech Tags + Architecture Trigger Button */}
                <div className="pt-4 sm:pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                    {/* Architecture Deep Dive Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClickSound();
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200/80 dark:border-blue-800/50 transition-all cursor-pointer shadow-sm min-h-[36px]"
                    >
                      <Layers className="w-3.5 h-3.5 shrink-0" />
                      <span>Architecture</span>
                    </button>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[36px]"
                    >
                      <span>Visit</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </GyroTiltCard>
            </motion.div>
          ))}
        </div>

        {/* Deep Dive Architecture Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
