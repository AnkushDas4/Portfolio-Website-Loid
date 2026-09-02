import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="pt-10 sm:pt-12 pb-4 sm:pb-6 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
        </div>

        {/* Narrative & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            {PORTFOLIO_DATA.about.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </motion.div>

          {/* Quick Info & Company Card */}
          <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 shadow-sm flex flex-col justify-between gap-5 sm:gap-6">
            <div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Organization
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Sednium Technologies
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2 leading-relaxed">
                Focused on decentralized communication protocols, developer productivity tools, and edge infrastructure.
              </p>
            </div>

            <a
              href={PORTFOLIO_DATA.personal.sedniumWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
            >
              <span>Visit sednium.com</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
