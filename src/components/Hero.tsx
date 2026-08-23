import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Mail, MapPin, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 md:px-8 relative w-full">
      <div className="max-w-3xl mx-auto">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for projects & engineering collaborations</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-3"
        >
          {PORTFOLIO_DATA.personal.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300 mb-6"
        >
          {PORTFOLIO_DATA.personal.title}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl"
        >
          {PORTFOLIO_DATA.personal.bio}
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center gap-3.5 mb-10"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors shadow-sm cursor-pointer"
          >
            <span>Get in Touch</span>
          </button>
        </motion.div>

        {/* Social / Direct Links & Location Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400"
        >
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{PORTFOLIO_DATA.personal.location}</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
