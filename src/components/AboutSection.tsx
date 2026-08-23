import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
        </div>

        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          {PORTFOLIO_DATA.about.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </motion.div>

        {/* Quick Links Card */}
        <div className="mt-8 p-5 rounded-xl bg-slate-50 dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              Sednium Technologies
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Secure distributed systems, developer tooling & P2P protocols.
            </div>
          </div>

          <a
            href={PORTFOLIO_DATA.personal.sedniumWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <span>Visit sednium.com</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
