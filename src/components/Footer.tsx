import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 sm:py-12 px-4 sm:px-6 md:px-8 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>

          <a
            href={PORTFOLIO_DATA.personal.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Telegram
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
