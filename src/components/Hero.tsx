import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Mail, MapPin, Send, Phone } from 'lucide-react';
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
    <section className="pt-20 sm:pt-24 md:pt-28 pb-4 relative w-full">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start gap-4">
        {/* [1] Status Badge (Dedicated Full Row) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full flex"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for projects & collaborations</span>
          </div>
        </motion.div>

        {/* [2] Main Heading (Dedicated Full Row with Animated Gradient Shine) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full relative group"
        >
          {/* Subtle Ambient Glow Behind Name */}
          <div className="absolute -inset-x-2 -inset-y-1 rounded-2xl bg-gradient-to-r from-blue-600/15 via-cyan-500/15 to-blue-600/15 blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

          <h1 className="relative text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
            <span className="inline-block bg-gradient-to-r from-slate-900 via-blue-600 via-sky-500 to-slate-900 dark:from-white dark:via-blue-300 dark:via-cyan-300 dark:to-white bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </h1>
        </motion.div>

        {/* [3] Subtitle / Role (Dedicated Full Row) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="w-full"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-slate-600 dark:text-slate-300">
            {PORTFOLIO_DATA.personal.title}
          </p>
        </motion.div>

        {/* [4] Description Paragraph (Dedicated Full Row) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full"
        >
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {PORTFOLIO_DATA.personal.bio}
          </p>
        </motion.div>

        {/* [5] CTA Buttons (Dedicated Full Row) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="w-full flex flex-wrap items-center gap-4 pt-2"
        >
          {/* Primary Magnetic Button ("View Projects") */}
          <MagneticButton
            onClick={() => scrollTo('projects')}
            maxDistance={14}
            pullFactor={0.3}
            className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm shadow-md hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 transition-shadow"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/90 dark:hover:bg-slate-800/90 font-medium text-sm transition-colors shadow-sm"
          >
            <span>Get in Touch</span>
          </MagneticButton>
        </motion.div>

        {/* [6] Social / Direct Links & Location Bar (Dedicated Full Row) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 mt-4"
        >
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{PORTFOLIO_DATA.personal.location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
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
              href={PORTFOLIO_DATA.personal.emailLink}
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.phoneLink}
              className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
