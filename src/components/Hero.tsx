import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Mail, MapPin, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16 px-4 sm:px-6 md:px-8 relative w-full">
      <div className="max-w-3xl mx-auto flex flex-col items-start gap-3 sm:gap-4 w-full">
        {/* [1] Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 w-fit mb-1"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for projects & collaborations</span>
        </motion.div>

        {/* [2] Main Title with Clean Gradient & Isolated Ambient Glow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative group block w-fit"
        >
          {/* Background Ambient Glow */}
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blur-xl group-hover:opacity-40 transition duration-500 pointer-events-none" />

          {/* Title */}
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500 dark:from-white dark:via-blue-300 dark:to-blue-500 bg-clip-text text-transparent">
            {PORTFOLIO_DATA.personal.name}
          </h1>
        </motion.div>

        {/* [3] Subtitle / Role */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-600 dark:text-slate-300"
        >
          {PORTFOLIO_DATA.personal.title}
        </motion.p>

        {/* [4] Description paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl my-2"
        >
          {PORTFOLIO_DATA.personal.bio}
        </motion.p>

        {/* [5] CTA Buttons with Magnetic Pull & Bouncy Squish */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap items-center gap-4 my-3"
        >
          {/* Primary Magnetic Button ("View Projects") with Shimmer & Animated Arrow */}
          <MagneticButton
            onClick={() => scrollTo('projects')}
            maxDistance={14}
            pullFactor={0.3}
            className="group relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-md hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 transition-shadow"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 dark:via-slate-900/15 to-transparent" />
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1.5" />
          </MagneticButton>

          {/* Secondary Magnetic Button ("Get in Touch") */}
          <MagneticButton
            onClick={() => scrollTo('contact')}
            maxDistance={12}
            pullFactor={0.25}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/90 dark:hover:bg-slate-800/90 font-medium text-sm transition-colors shadow-sm"
          >
            <span>Get in Touch</span>
          </MagneticButton>
        </motion.div>

        {/* [6] Social / Direct Links & Location Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 w-full mt-2"
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
