import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career & Work History</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Previous and current roles in software engineering, architecture, and open-source systems.
          </p>
        </div>

        {/* Chronological List */}
        <div className="space-y-10 sm:space-y-12">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-8 border-l border-slate-200 dark:border-slate-800"
            >
              {/* Timeline Bullet */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white dark:ring-[#0b0d13]" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{exp.period}</span>
                </span>
              </div>

              {/* Company & Location */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{exp.company}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-medium text-slate-800 dark:text-slate-200">{exp.company}</span>
                )}
                <span>•</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{exp.location}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2 mb-4 text-sm text-slate-700 dark:text-slate-300">
                {exp.achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
