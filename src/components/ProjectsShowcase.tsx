import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ArrowUpRight, Github } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ProjectsShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Selected Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Real-world systems, protocols, and developer tools built with a focus on performance and reliability.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header & Direct Links */}
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Live Demo / Website"
                      aria-label="Live Demo / Website"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* 1-sentence value proposition */}
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Architecture Highlights */}
                <ul className="space-y-1.5 mb-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {project.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tech Tags */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 ml-auto"
                >
                  <span>Visit project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
