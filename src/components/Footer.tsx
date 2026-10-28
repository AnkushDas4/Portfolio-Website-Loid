import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 sm:py-12 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[40px] flex items-center"
          >
            GitHub
          </a>

          <a
            href={PORTFOLIO_DATA.personal.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[40px] flex items-center"
          >
            Telegram
          </a>

          <a
            href="/launchpad"
            className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[40px] flex items-center"
          >
            Launchpad
          </a>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[40px]"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </footer>
  );
};
