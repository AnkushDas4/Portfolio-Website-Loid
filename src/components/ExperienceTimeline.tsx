import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="pt-12 pb-6 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career & Work History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Previous and current roles in software engineering, architecture, and open-source systems.
          </p>
        </div>

        {/* Chronological List with Spacious Layout */}
        <div className="space-y-12 sm:space-y-14">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-10 border-l border-slate-200 dark:border-slate-800"
            >
              {/* Timeline Bullet */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white dark:ring-[#0b0d13]" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Company & Location */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium mb-4">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{exp.company}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-slate-800 dark:text-slate-200">{exp.company}</span>
                )}
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-slate-500 flex items-center gap-1 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>{exp.location}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5 max-w-4xl">
                {exp.description}
              </p>

              {/* Key Achievements */}
              <ul className="space-y-2 mb-6 text-sm text-slate-700 dark:text-slate-300 max-w-4xl">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">→</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
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
