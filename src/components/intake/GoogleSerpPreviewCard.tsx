import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tld } from '../../utils/intake';

interface GoogleSerpPreviewCardProps {
  brandName: string;
  cityState: string;
  description: string;
  primaryDomain: string;
  tld: Tld;
  keywords: string[];
}

export const GoogleSerpPreviewCard: React.FC<GoogleSerpPreviewCardProps> = ({
  brandName,
  cityState,
  description,
  primaryDomain,
  tld,
  keywords,
}) => {
  // Compute clean display URL
  const computeDomain = (): string => {
    const raw = primaryDomain.trim().toLowerCase().replace(/^[a-z]+:\/\//i, '').replace(/\/.*$/, '');
    const cleanBrand = (brandName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'yourbrand').replace(/^-+|-+$/g, '');

    if (tld === 'sednium-subdomain') {
      const slug = raw ? raw.split('.')[0] : cleanBrand;
      return `${slug || 'yourbrand'}.sednium.com`;
    }

    if (!raw) {
      if (tld === 'in') return `${cleanBrand}.in`;
      if (tld === 'com') return `${cleanBrand}.com`;
      return `${cleanBrand}.in`;
    }

    if (raw.includes('.')) return raw;
    if (tld === 'in') return `${raw}.in`;
    if (tld === 'com') return `${raw}.com`;
    return `${raw}.in`;
  };

  const domain = computeDomain();
  const titleBrand = brandName.trim() || 'Your Business Name';
  const locationTag = cityState.trim() ? ` — ${cityState.trim()}` : '';
  const serpTitle = `${titleBrand}${locationTag} | Official Website`;

  // Optimal description length is ~150-160 characters
  const defaultSnippet = 'Explore official business services, products, and verified customer support. Dedicated domain setup, speed optimization, and direct search indexing.';
  const snippet = description.trim() || defaultSnippet;
  const descLength = description.trim().length;

  // Count matched keywords in description
  const matchedKeywords = keywords.filter((k) => 
    k.trim() && description.toLowerCase().includes(k.trim().toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Google Search (SERP) Live Snippet
          </span>
        </div>

        <div className="flex items-center gap-2">
          {descLength >= 120 && descLength <= 160 ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <CheckCircle2 className="w-3 h-3" />
              <span>Optimal Length ({descLength} chars)</span>
            </span>
          ) : (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              {descLength}/160 target chars
            </span>
          )}
        </div>
      </div>

      {/* Simulated Google Search Result */}
      <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/60 space-y-1.5 select-text">
        {/* Favicon & Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[11px] font-bold text-slate-700 dark:text-slate-300">
            {titleBrand.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-900 dark:text-slate-200 leading-tight">
              {titleBrand}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono leading-tight truncate max-w-xs sm:max-w-md">
              https://{domain}
            </span>
          </div>
        </div>

        {/* Title Link */}
        <h3 className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-snug pt-0.5">
          {serpTitle}
        </h3>

        {/* Snippet */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
          {snippet}
        </p>
      </div>

      {/* Keyword Matching Telemetry */}
      {keywords.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="text-[11px] font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Keyword indexing:</span>
          </span>
          {keywords.map((kw) => {
            const isMatched = description.toLowerCase().includes(kw.toLowerCase());
            return (
              <span
                key={kw}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                  isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {kw} {isMatched && '✓'}
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
